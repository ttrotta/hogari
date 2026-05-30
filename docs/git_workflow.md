# Git Branching & Workflow Guide for Hogari

This guide details a clean, professional Git workflow tailored to Hogari's modular Screaming Architecture team.

---

## 1. Branch Naming Conventions

Branches should be named after the domain they modify to make ownership clear and prevent overlaps.

```
<type>/<domain>-<short-description>
```

### Types

- `feature/` : New features or pages.
- `fix/` : Bug fixes.
- `refactor/` : Code reorganizing, no behavior changes.
- `chore/` : Dependency updates, configuration changes.
- `docs/` : Documentation updates.

### Domains (from `docs/architecture.md`)

- `properties`
- `search`
- `map`
- `ai`
- `scraping`
- `shared` (for `components/ui/`, `lib/`, or global assets)

### Examples

- `feature/properties-filters`
- `feature/scraping-zonaprop`
- `fix/map-markers-load`
- `refactor/ai-prompt-tuning`
- `chore/pnpm-lock-update`

---

## 2. The Development Lifecycle

Follow these steps for every change.

### Step 1: Update your local `main`

Always start with the latest codebase.

```bash
git checkout main
git pull origin main
```

### Step 2: Create your feature branch

```bash
git checkout -b feature/properties-search
```

### Step 3: Work and Commit

Make atomic, descriptive commits. Use Conventional Commits format:

```
<type>(<domain>): <short-description>
```

- `feat(properties): add split-screen listing card`
- `fix(map): fix custom marker click handler`
- `refactor(ai): extract search prompt template`

```bash
# Stage your changes
git add src/features/properties/components/PropertyCard.tsx

# Commit with a clear message
git commit -m "feat(properties): add property card components"
```

### Step 4: Keep your branch up to date

If someone else merged changes to `main` while you were working, pull the latest changes and rebase your branch on top of `main`:

```bash
# Fetch latest remote changes
git fetch origin

# Rebase your current branch onto main
git rebase origin/main
```

> [!NOTE]
> Rebasing keeps a linear history, making it easier to read and debug.

### Step 5: Push and Open a Pull Request

```bash
git push -u origin feature/properties-search
```

- Go to GitHub/GitLab and open a Pull Request.
- Request reviews from the domain owner or secondary owner defined in `docs/architecture.md`.

### Step 6: Merge and Cleanup

- Once approved, use **Squash and Merge** on GitHub/GitLab to keep a clean, single-commit history on `main`.
- Delete the remote branch via the GitHub UI.
- Clean up locally:

```bash
git checkout main
git pull origin main
git branch -d feature/properties-search
```

---

## 3. Git Command Reference Sheet

### Creating & Navigating

| Action                          | Command                         |
| :------------------------------ | :------------------------------ |
| Clone the repository            | `git clone <repo-url>`          |
| Create and switch to new branch | `git checkout -b <branch-name>` |
| Switch to existing branch       | `git checkout <branch-name>`    |
| List local branches             | `git branch`                    |
| List remote & local branches    | `git branch -a`                 |

### Committing & Saving State

| Action                                 | Command                        |
| :------------------------------------- | :----------------------------- |
| Show status of changed files           | `git status`                   |
| See diff of unstaged changes           | `git diff`                     |
| Stage specific file                    | `git add <path/to/file>`       |
| Stage all changes                      | `git add .`                    |
| Commit staged changes                  | `git commit -m "<message>"`    |
| Add new changes to the previous commit | `git commit --amend --no-edit` |
| Save dirty working state temporarily   | `git stash`                    |
| Retrieve stashed state                 | `git stash pop`                |

### Syncing & Rebasing

| Action                                       | Command                            |
| :------------------------------------------- | :--------------------------------- |
| Fetch updates without merging                | `git fetch origin`                 |
| Pull updates into current branch             | `git pull origin <branch-name>`    |
| Rebase current branch onto main              | `git rebase main`                  |
| Push new branch to remote                    | `git push -u origin <branch-name>` |
| Force push after rebasing (use with caution) | `git push --force-with-lease`      |

### Undoing Mistakes

| Action                                      | Command                       |
| :------------------------------------------ | :---------------------------- |
| Discard unstaged changes in a file          | `git checkout -- <file-path>` |
| Unstage a file (keep changes)               | `git reset HEAD <file-path>`  |
| Undo last commit (keep files modified)      | `git reset --soft HEAD~1`     |
| Nuke last commit and all modifications      | `git reset --hard HEAD~1`     |
| Create a new commit that reverts an old one | `git revert <commit-hash>`    |

---

## 4. Resolving Conflicts During Rebase

If git flags a conflict during `git rebase origin/main`:

1. Check which files are in conflict:
   ```bash
   git status
   ```
2. Open the files, locate the conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`), and resolve the code.
3. Stage the resolved files:
   ```bash
   git add <resolved-file>
   ```
4. Continue the rebase:
   ```bash
   git rebase --continue
   ```
   _(If you want to abort the rebase and go back to before it started, run `git rebase --abort`)_

---

## 5. Team Coordination Best Practices

### Monorepo Isolation

- **Dev D** (scraping) works inside `packages/scraping/`. Since this is a separate workspace, their branches (`feature/scraping-*`) will rarely conflict with the Next.js app (`src/`).
- **Dev A, B, and C** work in `src/features/`. Keep features self-contained. Do not import files from another feature module. If components need to share data, share them via props in `src/app/` or create a shared utility/type in `src/lib/`.

### Database Migrations (`lib/db/migrations/`)

- Database schemas are shared.
- When creating a migration, prefix the migration file with a timestamp (e.g. `YYYYMMDDHHMMSS_add_properties_table.sql`).
- Commit migrations early. If two devs create migrations at the same time, resolve the ordering by renaming the files or merging carefully.
