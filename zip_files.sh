#!/bin/bash

# Ensure the downloads directory exists
mkdir -p downloads

# Create or overwrite the automating-component-releases.zip
zip -j downloads/automating-component-releases.zip \
    scripts/bit-init.js \
    scripts/commit-bitmap.js \
    scripts/pull-request.js \
    scripts/lane-cleanup.js \
    scripts/tag-export.js \
    scripts/verify.js

# Zip other individual files
zip -j downloads/branch-lane.zip scripts/branch-lane.js
zip -j downloads/dependency-update.zip scripts/dependency-update.js
