$ErrorActionPreference = "Stop"

$python = "python"
$bundledPython = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
if (Test-Path -LiteralPath $bundledPython) {
  $python = $bundledPython
}

& $python "$PSScriptRoot\fetch_market_data.py"
