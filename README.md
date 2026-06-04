# Harness Jira Bug Dummy App

This is a small React/Vite dummy app with intentionally seeded bugs that match the Jira issues you shared.

## Run

```bash
npm install
npm run dev
```

## Bug Mapping

- Fix harness dashboard refresh issue: `src/App.jsx`
- Dashboard mandatory fields are not validated: `src/components/AddAgentModal.jsx`, `src/api/agentApi.js`
- Add duplicate check while adding agents to dashboard: `src/components/AddAgentModal.jsx`, `src/api/agentApi.js`
- Add agent modal is not closing: `src/App.jsx`
- Agent list table title font is not the correct font size: `src/styles/app.css`
- List agents is taking too much time: `src/api/agentApi.js`
- Delete agent is throwing error: `src/App.jsx`, `src/api/agentApi.js`
- List agent table is not in the middle of the screen: `src/styles/app.css`
