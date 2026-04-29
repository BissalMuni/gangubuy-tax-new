# AGENTS.md — AI Agent Instructions

This file provides instructions for AI coding agents (Claude Code, GitHub Copilot, Gemini, etc.) working on this project.

## Project

**세금 정보 시스템** — 한국 세금 정보를 관리하고 조회하는 웹 애플리케이션.

## Spec-Driven Workflow

Always follow this order:

1. Read `.spec/constitution.md` — understand immutable principles
2. Read `.spec/spec.md` — understand WHAT and WHY
3. Read `.spec/plan.md` — understand HOW
4. Read `.spec/tasks.md` (if exists) — execute tasks in order

## Key Rules

- Package manager: **pnpm only**
- Testing: **Vitest only**
- Language: **TypeScript strict**
- Components: **Server Components by default**, `"use client"` only when needed
- Code comments: **Korean**
- Commit messages: **English**
- Imports: use `@/` absolute paths

## Do Not

- Use `npm` or `yarn`
- Use `any` type in TypeScript
- Add `"use client"` without necessity
- Modify `.spec/constitution.md` without explicit user approval
