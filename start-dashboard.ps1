$ErrorActionPreference = "Stop"

$root = $PSScriptRoot
$port = 4173
$python = "python"
$bundledPython = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
$updater = Join-Path $root "dashboard-updater.ps1"
$logDir = Join-Path $root "logs"
$stdoutLog = Join-Path $logDir "dashboard-updater.stdout.log"
$stderrLog = Join-Path $logDir "dashboard-updater.stderr.log"
if (Test-Path -LiteralPath $bundledPython) {
  $python = $bundledPython
}

if (-not (Test-Path -LiteralPath $logDir)) {
  New-Item -ItemType Directory -Path $logDir | Out-Null
}

function Test-LocalPort {
  param([int] $Port)
  try {
    $client = New-Object Net.Sockets.TcpClient
    $async = $client.BeginConnect("127.0.0.1", $Port, $null, $null)
    $connected = $async.AsyncWaitHandle.WaitOne(600)
    if ($connected) {
      $client.EndConnect($async)
    }
    $client.Close()
    return $connected
  } catch {
    return $false
  }
}

if (-not (Test-LocalPort -Port $port)) {
  Start-Process -WindowStyle Hidden -FilePath $python -ArgumentList "-m","http.server","$port","--bind","127.0.0.1" -WorkingDirectory $root
  Start-Sleep -Seconds 2
}

$updaterRunning = Get-CimInstance Win32_Process |
  Where-Object { $_.CommandLine -like "*dashboard-updater.ps1*" }

if (-not $updaterRunning) {
  Start-Process -WindowStyle Hidden `
    -FilePath "powershell.exe" `
    -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$updater`"" `
    -WorkingDirectory $root `
    -RedirectStandardOutput $stdoutLog `
    -RedirectStandardError $stderrLog
}

Write-Host "Dashboard: http://127.0.0.1:$port/"
Write-Host "Server and background updater are running. Logs: $logDir"
