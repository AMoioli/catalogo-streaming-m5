---
name: Issue Triage
on:
  issues:
    types: [opened, reopened]
permissions:
  contents: read
  issues: read
  pull-requests: read
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

When a new issue is opened or reopened, triage it using only the issue title and body.

Goals:
- Propose up to 3 relevant labels.
- Add one concise triage comment in Italian.
- Keep the response actionable and avoid unnecessary verbosity.

Triage rules:
- If reproduction steps are missing, ask for exact steps, expected behavior, and actual behavior.
- If environment details are missing, ask for Node version, OS, and command used.
- If logs or stack traces are missing, ask for the minimal relevant excerpt.
- Do not request sensitive data or secrets.

Output format:
- labels: comma-separated list with max 3 labels.
- comment: short markdown comment with:
  1. Summary of the issue.
  2. Missing information checklist.
  3. Next step requested from the reporter.