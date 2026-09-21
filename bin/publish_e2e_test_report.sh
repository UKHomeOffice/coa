#!/bin/bash

set -euo pipefail

: "${GITHUB_APP_TOKEN:?Missing GITHUB_APP_TOKEN}"
: "${DRONE_PULL_REQUEST:?Missing DRONE_PULL_REQUEST}"
: "${DRONE_REPO:?Missing DRONE_REPO}"
: "${DRONE_BUILD_NUMBER:?Missing DRONE_BUILD_NUMBER}"
: "${DRONE_BUILD_LINK:?Missing DRONE_BUILD_LINK}"

test -d playwright-report || { echo "Missing playwright-report directory"; exit 1; }
REPORT_ARCHIVE="playwright-report-pr-${DRONE_PULL_REQUEST}-${DRONE_BUILD_NUMBER}.zip"
zip -r "$REPORT_ARCHIVE" playwright-report
GH_API="https://api.github.com/repos/${DRONE_REPO}"
TAG_NAME="pr-${DRONE_PULL_REQUEST}-playwright-report"
RELEASE_FILE="$(mktemp)"
RELEASE_CODE="$(curl -sS -o "$RELEASE_FILE" -w "%{http_code}" -H "Authorization: Bearer ${GITHUB_APP_TOKEN}" -H "Accept: application/vnd.github+json" "${GH_API}/releases/tags/${TAG_NAME}")"
if [ "$RELEASE_CODE" = "404" ]; then
  RELEASE_CODE="$(curl -sS -o "$RELEASE_FILE" -w "%{http_code}" -X POST -H "Authorization: Bearer ${GITHUB_APP_TOKEN}" -H "Accept: application/vnd.github+json" "${GH_API}/releases" -d "$(jq -n --arg tag "$TAG_NAME" --arg name "Playwright Report PR #${DRONE_PULL_REQUEST}" '{tag_name:$tag,name:$name,prerelease:true,draft:false}')")"
fi
[[ "$RELEASE_CODE" =~ ^2 ]] || { echo "Failed to fetch/create release (HTTP ${RELEASE_CODE})"; exit 1; }
RELEASE_ID="$(jq -r '.id // empty' "$RELEASE_FILE")"
test -n "$RELEASE_ID" || { echo "Release response missing id"; exit 1; }
for asset_id in $(jq -r --arg prefix "playwright-report-pr-${DRONE_PULL_REQUEST}-" '.assets[]? | select(.name | startswith($prefix)) | .id' "$RELEASE_FILE"); do
  curl -sS -X DELETE -H "Authorization: Bearer ${GITHUB_APP_TOKEN}" -H "Accept: application/vnd.github+json" "${GH_API}/releases/assets/${asset_id}" >/dev/null
done
ASSET_FILE="$(mktemp)"
UPLOAD_CODE="$(curl -sS -o "$ASSET_FILE" -w "%{http_code}" -X POST -H "Authorization: Bearer ${GITHUB_APP_TOKEN}" -H "Content-Type: application/zip" --data-binary @"${REPORT_ARCHIVE}" "https://uploads.github.com/repos/${DRONE_REPO}/releases/${RELEASE_ID}/assets?name=${REPORT_ARCHIVE}")"
[[ "$UPLOAD_CODE" =~ ^2 ]] || { echo "Failed to upload report asset (HTTP ${UPLOAD_CODE})"; exit 1; }
DOWNLOAD_URL="$(jq -r '.browser_download_url // empty' "$ASSET_FILE")"
test -n "$DOWNLOAD_URL" || { echo "Upload response missing browser_download_url"; exit 1; }
COMMENT_BODY="Playwright HTML report for this PR build is available here:
* ${DOWNLOAD_URL}

Drone build: ${DRONE_BUILD_LINK}"
curl -sS -X POST -H "Authorization: Bearer ${GITHUB_APP_TOKEN}" -H "Accept: application/vnd.github+json" "${GH_API}/issues/${DRONE_PULL_REQUEST}/comments" -d "$(jq -n --arg body "$COMMENT_BODY" '{body: $body}')" | jq -e '.html_url' >/dev/null