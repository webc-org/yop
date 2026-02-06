#!/bin/bash
set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

cd "$(dirname "$0")/.."

# Get commit message
if [ -z "$1" ]; then
  echo -e "${YELLOW}Enter commit message:${NC}"
  read -r MESSAGE
else
  MESSAGE="$1"
fi

if [ -z "$MESSAGE" ]; then
  echo -e "${RED}Commit message required${NC}"
  exit 1
fi

# Check if there are changes to commit
git add .
if git diff --cached --quiet; then
  echo -e "${YELLOW}No changes to commit${NC}"
  exit 0
fi

echo -e "${GREEN}[1/5] Running tests...${NC}"
if ! pnpm test; then
  echo -e "${RED}Tests failed!${NC}"
  git reset HEAD . > /dev/null 2>&1
  exit 1
fi

echo -e "${GREEN}[2/5] Building packages...${NC}"
if ! pnpm build > /dev/null 2>&1; then
  echo -e "${RED}Build failed!${NC}"
  git reset HEAD . > /dev/null 2>&1
  exit 1
fi

echo -e "${GREEN}[3/5] Building storybook...${NC}"
if ! pnpm build-storybook > /dev/null 2>&1; then
  echo -e "${RED}Storybook build failed!${NC}"
  git reset HEAD . > /dev/null 2>&1
  exit 1
fi

echo -e "${GREEN}[4/5] Bumping versions...${NC}"

# Bump @yop/styles
cd packages/styles
CURRENT_PATCH=$(node -p "require('./package.json').version.split('.')[2]")
if [ "$CURRENT_PATCH" -ge 99 ]; then
  pnpm version minor --no-git-tag-version > /dev/null
else
  pnpm version patch --no-git-tag-version > /dev/null
fi
STYLES_VERSION=$(node -p "require('./package.json').version")
echo -e "  @yop/styles: ${YELLOW}${STYLES_VERSION}${NC}"
cd ../..

# Bump @yop/react
cd packages/react
CURRENT_PATCH=$(node -p "require('./package.json').version.split('.')[2]")
if [ "$CURRENT_PATCH" -ge 99 ]; then
  pnpm version minor --no-git-tag-version > /dev/null
else
  pnpm version patch --no-git-tag-version > /dev/null
fi
REACT_VERSION=$(node -p "require('./package.json').version")
echo -e "  @yop/react:  ${YELLOW}${REACT_VERSION}${NC}"
cd ../..

git add .
git commit -m "$MESSAGE (v$REACT_VERSION)"

echo -e "${GREEN}[5/5] Pushing...${NC}"
if ! git push; then
  echo -e "${RED}Push failed! Rolling back...${NC}"
  git reset --hard HEAD~1
  exit 1
fi

echo -e "${GREEN}✅ Released @yop/styles@${STYLES_VERSION} and @yop/react@${REACT_VERSION}${NC}"
