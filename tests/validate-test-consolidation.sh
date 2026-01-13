#!/bin/bash

echo "🔍 Validating Test-UI Portfolio Consolidation..."
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0

# Check 1: MCP configuration exists and is valid JSON
echo "✓ Checking .vscode/mcp.json..."
if [ -f ".vscode/mcp.json" ]; then
  if node -e "require('./.vscode/mcp.json')" 2>/dev/null; then
    echo -e "${GREEN}  ✅ .vscode/mcp.json is valid JSON${NC}"
  else
    echo -e "${RED}  ❌ .vscode/mcp.json is invalid JSON${NC}"
    ERRORS=$((ERRORS + 1))
  fi
else
  echo -e "${RED}  ❌ .vscode/mcp.json not found${NC}"
  ERRORS=$((ERRORS + 1))
fi

# Check 2: Verify MCP servers are defined
echo ""
echo "✓ Checking MCP servers definition..."
if grep -q '"playwright"' .vscode/mcp.json && grep -q '"playwright-tests"' .vscode/mcp.json; then
  echo -e "${GREEN}  ✅ Both MCP servers defined${NC}"
else
  echo -e "${RED}  ❌ Missing MCP server definitions${NC}"
  ERRORS=$((ERRORS + 1))
fi

# Check 3: Global setup file exists
echo ""
echo "✓ Checking tests/ui/global-setup.ts..."
if [ -f "tests/ui/global-setup.ts" ]; then
  echo -e "${GREEN}  ✅ Global setup file exists${NC}"
else
  echo -e "${RED}  ❌ Global setup file missing${NC}"
  ERRORS=$((ERRORS + 1))
fi

# Check 4: Global teardown file exists
echo ""
echo "✓ Checking tests/ui/global-teardown.ts..."
if [ -f "tests/ui/global-teardown.ts" ]; then
  echo -e "${GREEN}  ✅ Global teardown file exists${NC}"
else
  echo -e "${RED}  ❌ Global teardown file missing${NC}"
  ERRORS=$((ERRORS + 1))
fi

# Check 5: Playwright config references global setup
echo ""
echo "✓ Checking playwright.config.ts references global-setup..."
if grep -q "global-setup.ts" tests/ui/playwright.config.ts; then
  echo -e "${GREEN}  ✅ Global setup referenced in config${NC}"
else
  echo -e "${RED}  ❌ Global setup not referenced${NC}"
  ERRORS=$((ERRORS + 1))
fi

# Check 6: MCP server build exists
echo ""
echo "✓ Checking compiled MCP server..."
if [ -f "tests/ui/mcp-server/dist/index.js" ]; then
  echo -e "${GREEN}  ✅ MCP server compiled${NC}"
else
  echo -e "${YELLOW}  ⚠️  MCP server not built (run: cd tests/ui/mcp-server && npm run build)${NC}"
fi

# Check 7: Verify no duplicate MCP configs in .github
echo ""
echo "✓ Checking for deprecated .github/mcp configs..."
if [ -f ".github/mcp/playwright.json" ]; then
  echo -e "${YELLOW}  ⚠️  Deprecated .github/mcp/playwright.json exists (can be removed)${NC}"
else
  echo -e "${GREEN}  ✅ No deprecated configs${NC}"
fi

# Check 8: Documentation exists
echo ""
echo "✓ Checking documentation..."
DOCS_FOUND=0
[ -f "docs/TEST-UI-PORTFOLIO.md" ] && DOCS_FOUND=$((DOCS_FOUND + 1))
[ -f "docs/TEST-UI-QUICK-START.md" ] && DOCS_FOUND=$((DOCS_FOUND + 1))
[ -f "CONSOLIDATION-SUMMARY.md" ] && DOCS_FOUND=$((DOCS_FOUND + 1))

if [ $DOCS_FOUND -eq 3 ]; then
  echo -e "${GREEN}  ✅ All documentation files present ($DOCS_FOUND/3)${NC}"
else
  echo -e "${YELLOW}  ⚠️  Missing documentation ($DOCS_FOUND/3 found)${NC}"
fi

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $ERRORS -eq 0 ]; then
  echo -e "${GREEN}✅ Test-UI Portfolio Consolidation Valid${NC}"
  echo ""
  echo "Next steps:"
  echo "1. Start services: backend (dotnet run) & frontend (npm run preview)"
  echo "2. Run tests: cd tests/ui && npx playwright test --grep @smoke"
  echo "3. Use agent: /test-ui run smoke (in Copilot Chat)"
  exit 0
else
  echo -e "${RED}❌ Consolidation has $ERRORS errors${NC}"
  exit 1
fi
