Planner Agent Prompt (use with planner.agent.md via plan.prompt.md )

Goal: Produce a Playwright/MCP UI testing strategy (no implementation).
Inputs to provide: target flows to cover, environments (dev/preview), browsers/devices, MCP tools to expose (data seeding, auth), CI target (GitHub Actions), flaky-test policy, reporting needs (HTML/JSON/JUnit), coverage priorities (smoke vs. regression).
Ask the agent to deliver: scope, test matrix, fixtures (auth, data reset), selectors strategy, MCP tool calls, CI steps, risk list, and a task breakdown for handoff.
Remind: planning-only; no code.

Dev Agent Prompt (use with dev.agent.md via implement.prompt.md )

Goal: Implement the approved Playwright/MCP UI test plan.
Inputs to provide: plan link, repo paths, env vars (base URL, auth creds/tokens), MCP endpoints/tools, CI target, flakes policy, artifacts (reports, screenshots, videos), priority scenarios.
Ask the agent to: scaffold Playwright config, fixtures, selectors, tests; wire MCP tools; add npm scripts; integrate CI job; add docs in specs/tasks or docs; and run tests if possible.
Remind: follow plan, update docs (no new summary files), ensure idempotent fixtures and stable selectors.