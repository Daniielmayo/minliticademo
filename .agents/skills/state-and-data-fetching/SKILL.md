---
name: state-and-data-fetching
description: Defines API communication, HTTP client usage, custom hooks, and server state management standards for the Minlitica Frontend application. Use this skill whenever creating API services, fetching asynchronous data, handling mutations, or configuring TanStack Query hooks.
---

# State & Data Fetching Standards

## Purpose

This document establishes the architecture for asynchronous data fetching, HTTP API calls, and server state management in `minlitica-frontend`.
The goal is to maintain a strict separation between raw HTTP communication, feature-level data orchestration, and React presentation components.

---

## Architecture & Layer Responsibilities

```text
[Component / UI Layer]
       │
       ▼ (invokes custom hook)
[Feature Hooks Layer]         ──> (e.g., useTitlesQuery in features/Titles/hooks/)
       │
       ▼ (calls API service)
[Feature Service Layer]       ──> (e.g., titleService.ts in features/Titles/services/)
       │
       ▼ (uses generic client)
[Global HTTP Client Layer]   ──> (e.g., httpClient.ts in services/http/)
