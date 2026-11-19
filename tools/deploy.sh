#!/bin/sh
# Build and publish dist/ to the gh-pages branch (GitHub Pages).
set -e
npx vite build
cd dist
rm -rf .git
git init -q -b gh-pages
touch .nojekyll
git add -A
git commit -qm "Deploy"
git push -f -q "$(cd .. && git remote get-url origin)" gh-pages
rm -rf .git
echo deployed
