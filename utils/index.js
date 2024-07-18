// Use regex to replace the middle part of the filename with **REDACTED**,
// keeping the first 2 and last 2 characters before the extension
const sanitiseFilename = filename => filename.replace(/^(.{2}).*(.{2}\.[^.]+)$/, '$1**REDACTED**$2');

module.exports = { sanitiseFilename };
