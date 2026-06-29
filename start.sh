#!/usr/bin/env bash
# Claude Home — dev server launcher
# Usage: ./start.sh [--build|--preview]

set -euo pipefail
cd "$(dirname "$0")"

MODE="${1:---dev}"

case "$MODE" in
  --build)
    echo "🔨 Building for production..."
    npm run build
    ;;
  --preview)
    echo "👁  Previewing production build..."
    npm run preview -- --host
    ;;
  --dev|*)
    echo "🚀 Starting dev server..."
    echo "   http://localhost:5173/"
    echo ""
    npm run dev -- --host
    ;;
esac
