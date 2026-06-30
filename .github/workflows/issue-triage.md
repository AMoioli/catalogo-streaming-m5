---
name: Issue Triage
on:
  issues:
    types: [opened]
permissions:
  contents: read
  issues: read
engine: copilot
network:
  allowed: [defaults, github]
tools:
  github:
    mode: gh-proxy
    toolsets: [default]
safe-outputs:
  add-labels:
    max: 3
  add-comment:
---