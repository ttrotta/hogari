# AGENTS.md

This file serves as the **Constitution and Context Guide** for autonomous software development agents (such as Antigravity, or other MCP-based clients) operating on this repository.

By reading this file, the agent will understand the project architecture, the predefined technology stack, and the mandatory coding standards.

---

## 1. Project Context and Overview

We are building a real estate platform/startup in Argentina. Its main purpose is to mitigate market fragmentation by centralizing rental listings via scraping, and adding an intelligent geospatial recommendation layer based on AI.

The application design requires a classic **Split-Screen** layout similar to Airbnb:

- **Left:** Dynamic list of properties with information cards and AI justifications.
- **Right:** Fixed interactive map showing the exact location of the properties and nearby points of interest (universities, transport, shops).

---

## 2. Mandatory Technology Stack

The agent must strictly adhere to the following technologies when generating or modifying code:

- **Frontend & API:** Next.js (App Router) with TypeScript.
  - Prioritize _React Server Components_ (RSC) for static views or initial loading.
  - _Client Components_ only for interactive elements like the map or dynamic forms.
- **UI Styling:** Tailwind CSS. Heavy component libraries or traditional CSS are not allowed.
- **Database:** PostgreSQL with the **PostGIS** spatial extension enabled.
- **Map Visualization:** MapLibre GL. The use of the traditional Google Maps API is **FORBIDDEN** due to budget and rendering performance constraints.
- **AI Orchestration:** Vercel AI SDK to interact with Language Model (LLM) providers via streaming and structured outputs (JSON).

---

## 3. System Architecture (3 Layers)

The project is logically decoupled into three independent components that the agent must respect when structuring folders or files:

1. **Extraction Layer (Scrapers):** Independent scripts (in Node.js/Playwright or Python) dedicated exclusively to data collection, normalization, and insertion into the DB. _This layer must not be mixed with Next.js routes._
2. **Data Layer (PostgreSQL Core):** Relational tables optimized with spatial indexing (`GIST`) on geographic data types to resolve proximity queries efficiently.
3. **Application Layer (Next.js):** Responsible for serving the user interface, interacting with the database, and consuming AI services securely.

---

## 4. Specific Instructions for the Agent (Repo System Prompts)

When asked to write code, you must follow these guidelines:

### Data Handling and Queries

- Any natural language search must use a **Hybrid** strategy. Never pass thousands of raw records to an LLM.
- **Step 1:** Write spatial SQL queries using PostGIS (e.g., `ST_DWithin` or `ST_Distance`) to reduce the data universe based on hard geographic coordinates (like a university's radius).
- **Step 2:** The filtered result (maximum 30-50 properties) is what will be sent to the language model for qualitative re-ranking.

### Code Style and Best Practices

- Keep functions small, pure, and strictly typed with TypeScript.
- Explicitly handle Next.js native loading states (`loading.tsx`) and errors (`error.tsx`).
- Ensure the map reuses instances or is mounted correctly within a `useEffect` in an isolated client component to avoid memory leaks or unnecessary re-renders.

---

## 5. Skill Environment Configuration (MCP Workflow)

For the agent to execute tasks autonomously with system tools (Skills), it is recommended to connect the following **Model Context Protocol (MCP)** servers in the local development environment:

- **mcp-server-filesystem:** Allows the agent to read the folder structure, examine existing components, and write code directly in the correct place.
- **mcp-server-postgres:** Grants the agent the ability to inspect the local database schema, verify that the PostGIS extension is active, and validate the structure of real estate tables before writing SQL or Prisma/Drizzle code.
- **Command Execution (Terminal Skill):** Ability to run `npm run dev`, `bun test`, or linters directly in the Fedora environment (Kitty/Zsh) to verify that changes don't break the application.

---

_Note: This document must be updated if critical decisions regarding the startup's architecture or stack are modified._
