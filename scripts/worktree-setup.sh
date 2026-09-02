#!/usr/bin/env sh

   set -eu

   if [ "${SKIP_WORKTREE_SETUP:-}" = "1" ]; then
     echo "Skipping worktree setup because SKIP_WORKTREE_SETUP=1"
     exit 0
   fi

   WORKTREE_ROOT="$(git rev-parse --show-toplevel)"
   GIT_COMMON_DIR="$(git rev-parse --path-format=absolute --git-common-dir)"
   MAIN_WORKTREE="$(dirname "$GIT_COMMON_DIR")"

   echo "Setting up worktree: $WORKTREE_ROOT"

   # Share local environment files with the main worktree.
   for ENV_FILE in .env .env.local; do
     SOURCE="$MAIN_WORKTREE/$ENV_FILE"
     TARGET="$WORKTREE_ROOT/$ENV_FILE"

     if [ -f "$SOURCE" ] && [ ! -e "$TARGET" ] && [ ! -L "$TARGET" ]; then
       ln -s "$SOURCE" "$TARGET"
       echo "Linked $ENV_FILE from main worktree"
     fi
   done

   if [ ! -f "$WORKTREE_ROOT/package.json" ]; then
     echo "No package.json found, skipping dependency installation"
     exit 0
   fi

   cd "$WORKTREE_ROOT"

   if command -v pnpm >/dev/null 2>&1; then
     if [ -f "pnpm-lock.yaml" ]; then
       pnpm install --frozen-lockfile
     else
       pnpm install
     fi
   elif command -v npm >/dev/null 2>&1; then
     if [ -f "package-lock.json" ]; then
       npm ci
     else
       npm install
     fi
   else
     echo "warning: neither pnpm nor npm is installed" >&2
     exit 0
   fi

   echo "Worktree setup complete"
