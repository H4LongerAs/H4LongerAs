$ErrorActionPreference = "Stop"

$root = $PSScriptRoot
$startup = [Environment]::GetFolderPath("Startup")
$shortcutPath = Join-Path $startup "Personal Market Dashboard.lnk"
$target = Join-Path $root "start-dashboard.cmd"

if (-not (Test-Path -LiteralPath $target)) {
  throw "Missing start-dashboard.cmd at $target"
}

$shell = New-Object -ComObject WScript.Shell
$shortcut = $shell.CreateShortcut($shortcutPath)
$shortcut.TargetPath = $target
$shortcut.WorkingDirectory = $root
$shortcut.Description = "Start Personal Market Dashboard"
$shortcut.Save()

Write-Host "Created startup shortcut: $shortcutPath"
