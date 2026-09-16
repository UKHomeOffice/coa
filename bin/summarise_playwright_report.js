'use strict';

const fs = require('node:fs');

function parseCount(text, label) {
  const match = text.match(new RegExp(String.raw`(\d+)\s+${label}`, 'i'));
  return match ? Number(match[1]) : 0;
}

function main() {
  const [inputPath, outputPath] = process.argv.slice(2);
  if (!inputPath || !outputPath) {
    throw new Error('Usage: node bin/summarise_playwright_report.js <input-text> <output-txt>');
  }

  let summary;
  try {
    const output = fs.readFileSync(inputPath, 'utf8');
    const passed = parseCount(output, 'passed');
    const failed = parseCount(output, 'failed');
    const flaky = parseCount(output, 'flaky');
    const skipped = parseCount(output, 'skipped');
    summary = ['Playwright Nightly Summary', `Total: ${passed + failed + flaky + skipped}`, `Passed: ${passed}`, `Failed: ${failed}`, `Flaky: ${flaky}`, `Skipped: ${skipped}`].join('\n');
  } catch (error) {
    summary = `Playwright Nightly Summary\nUnable to parse run output: ${error.message || error}`;
  }
  fs.writeFileSync(outputPath, `${summary}\n`, 'utf8');
  console.log(summary);
}

main();