#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
PACKAGE_JSON="$ROOT_DIR/package.json"

if [[ ! -f "$PACKAGE_JSON" ]]; then
  echo "Could not find package.json in: $ROOT_DIR" >&2
  exit 1
fi

LIB_LABEL="lib"
LIB_DIR="$ROOT_DIR/lib"

node - "$PACKAGE_JSON" "$LIB_DIR" "$LIB_LABEL" <<'NODE'
const fs = require('fs');
const path = require('path');

const packageJsonPath = process.argv[2];
const libDir = process.argv[3];
const libLabel = process.argv[4];

const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const scripts = (pkg && pkg.scripts) || {};

function extractDescriptionFromJsFile(filePath) {
  if (!fs.existsSync(filePath)) return null;

  const src = fs.readFileSync(filePath, 'utf8');

  const blockMatch = src.match(/\/\*([\s\S]*?)\*\//);
  if (!blockMatch) return null;

  const lines = blockMatch[1]
    .split('\n')
    .map((line) => line.replace(/^\s*\*?\s?/, '').trim())
    .filter(Boolean)
    .filter((line) => !/^usage\s*:/i.test(line))
    .filter((line) => !/^[A-Z\s\-]+\s*->/.test(line));

  return lines[0] || null;
}

function describeScript(scriptName, command) {
  const nodeLibMatch = command.match(/^node\s+lib\/([^\s]+)$/);

  if (nodeLibMatch) {
    const relativeScriptPath = nodeLibMatch[1];
    const fallbackByFile = {
      'index.js': 'Start dev mode: watches files, rebuilds, and serves the site locally.',
      'all.js': 'Rebuild all posts and regenerate archive output.',
      'makePage.js': 'Rebuild one page from /pages by name.',
      'newpost.js': 'Create a new post interactively.',
      'rename.js': 'Rename a post file based on its current title front-matter.',
      'renew.js': 'Move a post to today by renaming its date prefix.',
      'redate.js': 'Change a post date interactively by entering year/month/day.',
      'relink.js': 'Rebuild a selected post and its neighbors to refresh timeline links.'
    };

    if (fallbackByFile[relativeScriptPath]) {
      return fallbackByFile[relativeScriptPath];
    }

    const absolutePath = path.join(libDir, relativeScriptPath);
    const descriptionFromComment = extractDescriptionFromJsFile(absolutePath);
    if (descriptionFromComment) return descriptionFromComment;

    return fallbackByFile[relativeScriptPath] || `Run ${relativeScriptPath}.`;
  }

  if (/echo\s+"Error: no test specified"/.test(command)) {
    return 'Placeholder test script (currently exits with error).';
  }

  return 'Custom npm script command.';
}

function needsFilenamePart(command) {
  const nodeLibMatch = command.match(/^node\s+lib\/([^\s]+)$/);
  if (!nodeLibMatch) return false;

  const relativeScriptPath = nodeLibMatch[1];
  const absolutePath = path.join(libDir, relativeScriptPath);
  if (!fs.existsSync(absolutePath)) return false;

  const src = fs.readFileSync(absolutePath, 'utf8');

  // These scripts use the shared file selector and require a post filename fragment.
  return /findFile\s*\(/.test(src) && /process\.argv\s*\[\s*2\s*\]/.test(src);
}

const scriptEntries = Object.entries(scripts);
const longest = scriptEntries.reduce((max, [name]) => {
  const fullName = `npm run ${name}`;
  const command = scripts[name];
  const shownCommand = needsFilenamePart(command)
    ? `${fullName} <part-of-filename>`
    : fullName;
  return Math.max(max, shownCommand.length);
}, 'Command'.length);

console.log(`NPM Script Manual (source: package.json + /${libLabel})`);
console.log('');
console.log(`${'Command'.padEnd(longest)}  What it does`);
console.log(`${'-'.repeat(longest)}  ${'-'.repeat(60)}`);

for (const [name, command] of scriptEntries) {
  const fullCommand = `npm run ${name}`;
  const shownCommand = needsFilenamePart(command)
    ? `${fullCommand} <part-of-filename>`
    : fullCommand;
  const description = describeScript(name, command);
  console.log(`${shownCommand.padEnd(longest)}  ${description}`);
}

NODE
