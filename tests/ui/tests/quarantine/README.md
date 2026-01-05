# Quarantine Directory

This directory contains flaky tests that have been temporarily quarantined.

## Quarantine Policy

Tests are quarantined when:
- They fail > 5% of runs over a 10-run sample
- They have intermittent failures unrelated to code changes

## Process

1. Move flaky test file to this directory
2. Create an issue with the `flaky-test` label
3. Investigate and fix root cause
4. Validate 10 consecutive passes locally
5. Move test back to main suite
6. Close the issue

## Current Quarantined Tests

None currently quarantined.
