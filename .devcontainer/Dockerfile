FROM quay.io/ukhomeofficedigital/hof-nodejs:24.21.0-alpine3.24-v7@sha256:793f595eb64064ab6d007ca3509c731a1ff9d36728aa12e127e19271075575a1

USER root

# Setup nodejs group & nodejs user
RUN addgroup --system nodejs --gid 998 && \
    adduser --system nodejs --uid 999 --home /app/ && \
    chown -R 999:998 /app/

USER 999

WORKDIR /app
