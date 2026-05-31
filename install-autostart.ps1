$ErrorActionPreference = "Stop"

$root = $PSScriptRoot
$taskName = "PersonalMarketDashboard"
$cmdPath = Join-Path $root "start-dashboard.cmd"

if (-not (Test-Path -LiteralPath $cmdPath)) {
  throw "Missing start-dashboard.cmd at $cmdPath"
}

$action = New-ScheduledTaskAction -Execute $cmdPath -WorkingDirectory $root
$trigger = New-ScheduledTaskTrigger -AtLogOn
$settings = New-ScheduledTaskSettingsSet `
  -AllowStartIfOnBatteries `
  -DontStopIfGoingOnBatteries `
  -ExecutionTimeLimit (New-TimeSpan -Days 365) `
  -RestartCount 3 `
  -RestartInterval (New-TimeSpan -Minutes 1)

Register-ScheduledTask `
  -TaskName $taskName `
  -Action $action `
  -Trigger $trigger `
  -Settings $settings `
  -Description "Starts the personal market dashboard server and delayed data refresher at Windows logon." `
  -Force | Out-Null

Write-Host "Registered scheduled task: $taskName"
