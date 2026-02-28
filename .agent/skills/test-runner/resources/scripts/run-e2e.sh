#!/bin/bash
set -e

# Run root build
echo "🚀 Running test:build..."
yarn run test:build

# Run frontend e2e
echo "🧪 Running frontend test:e2e..."
cd apps/frontend
yarn run test:e2e
