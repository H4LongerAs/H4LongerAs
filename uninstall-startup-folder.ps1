$ErrorActionPreference = "Stop"

$startup = [Environment]::GetFolderPath("Startup")
$shortcutPath = Join-Path $startup "Personal Market Dashboard.lnk"

if (Test-Path -LiteralPath $shortcutPath) {
  Remove-Item -LiteralPath $shortcutPath
  Write-Host "Removed startup shortcut: $shortcutPath"
} else {
  Write-Host "Startup shortcut not found: $shortcutPath"
}
