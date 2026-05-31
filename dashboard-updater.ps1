$ErrorActionPreference = "Continue"

$root = $PSScriptRoot
$python = "python"
$bundledPython = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
$logDir = Join-Path $root "logs"
$logPath = Join-Path $logDir "dashboard-updater.log"

if (Test-Path -LiteralPath $bundledPython) {
  $python = $bundledPython
}

if (-not (Test-Path -LiteralPath $logDir)) {
  New-Item -ItemType Directory -Path $logDir | Out-Null
}

function Write-Log {
  param([string] $Message)
  $stamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
  Add-Content -LiteralPath $logPath -Value "[$stamp] $Message"
}

Write-Log "Updater started."

$krSectorRefreshTimes = @(
  @{ Hour = 16; Minute = 0 }
)
$usSectorRefreshTimes = @(
  @{ Hour = 8; Minute = 0 }
)
$lastKrSectorRefreshKey = ""
$lastUsSectorRefreshKey = ""
$krMarketHolidays = @(
  "2026-01-01",
  "2026-02-16",
  "2026-02-17",
  "2026-02-18",
  "2026-03-02",
  "2026-05-01",
  "2026-05-05",
  "2026-05-25",
  "2026-06-06",
  "2026-08-15",
  "2026-09-24",
  "2026-09-25",
  "2026-09-26",
  "2026-10-03",
  "2026-10-09",
  "2026-12-25",
  "2026-12-31"
)
$usMarketHolidays = @(
  "2026-01-01",
  "2026-01-19",
  "2026-02-16",
  "2026-04-03",
  "2026-05-25",
  "2026-06-19",
  "2026-07-03",
  "2026-09-07",
  "2026-11-26",
  "2026-12-25"
)

function Test-BusinessDay {
  param([datetime] $Date)
  return $Date.DayOfWeek -ne [DayOfWeek]::Saturday -and $Date.DayOfWeek -ne [DayOfWeek]::Sunday
}

function Test-KrMarketOpenDay {
  param([datetime] $Now)
  $dateKey = $Now.ToString("yyyy-MM-dd")
  return (Test-BusinessDay -Date $Now) -and ($krMarketHolidays -notcontains $dateKey)
}

function Get-EasternNow {
  param([datetime] $Now)
  try {
    $tz = [System.TimeZoneInfo]::FindSystemTimeZoneById("Eastern Standard Time")
    return [System.TimeZoneInfo]::ConvertTime($Now, $tz)
  } catch {
    return $Now.ToUniversalTime().AddHours(-5)
  }
}

function Test-UsMarketOpenDay {
  param([datetime] $EasternNow)
  $dateKey = $EasternNow.ToString("yyyy-MM-dd")
  return (Test-BusinessDay -Date $EasternNow) -and ($usMarketHolidays -notcontains $dateKey)
}

function Test-TimeWindow {
  param(
    [datetime] $Date,
    [string] $Start,
    [string] $End
  )
  $startTime = [TimeSpan]::Parse($Start)
  $endTime = [TimeSpan]::Parse($End)
  return $Date.TimeOfDay -ge $startTime -and $Date.TimeOfDay -le $endTime
}

function Get-DueRefreshKey {
  param(
    [datetime] $Now,
    [array] $Slots
  )
  foreach ($slot in $Slots) {
    $candidate = Get-Date -Year $Now.Year -Month $Now.Month -Day $Now.Day -Hour $slot.Hour -Minute $slot.Minute -Second 0
    $minutesSince = (New-TimeSpan -Start $candidate -End $Now).TotalMinutes
    if ($minutesSince -ge 0 -and $minutesSince -le 20) {
      return $candidate.ToString("yyyyMMdd-HHmm")
    }
  }
  return ""
}

while ($true) {
  $now = Get-Date
  $easternNow = Get-EasternNow -Now $now
  $krMarketOpenDay = Test-KrMarketOpenDay -Now $now
  $usMarketOpenDay = Test-UsMarketOpenDay -EasternNow $easternNow
  $shouldUpdateMarketDashboard =
    ($krMarketOpenDay -and (Test-TimeWindow -Date $now -Start "08:45" -End "16:30")) -or
    ($usMarketOpenDay -and (Test-TimeWindow -Date $easternNow -Start "09:30" -End "20:15"))
  $krSectorRefreshKey = Get-DueRefreshKey -Now $now -Slots $krSectorRefreshTimes
  $usSectorRefreshKey = Get-DueRefreshKey -Now $now -Slots $usSectorRefreshTimes
  $shouldRefreshKrSector = $krMarketOpenDay -and $krSectorRefreshKey -and $krSectorRefreshKey -ne $lastKrSectorRefreshKey
  $shouldRefreshUsSector = $usMarketOpenDay -and $usSectorRefreshKey -and $usSectorRefreshKey -ne $lastUsSectorRefreshKey
  try {
    if ($shouldRefreshKrSector -or $shouldRefreshUsSector) {
      $args = @()
      if ($shouldRefreshKrSector) {
        $args += "--sector-kr"
      }
      if ($shouldRefreshUsSector) {
        $args += "--sector-us"
      }
      Write-Log "Sector refresh started. Args: $($args -join ' ')"
      $output = & $python "$root\fetch_market_data.py" $args 2>&1
      if ($shouldRefreshKrSector) {
        $lastKrSectorRefreshKey = $krSectorRefreshKey
      }
      if ($shouldRefreshUsSector) {
        $lastUsSectorRefreshKey = $usSectorRefreshKey
      }
    } elseif ($shouldUpdateMarketDashboard) {
      Write-Log "Market dashboard refresh started. Sector market maps kept."
      $output = & $python "$root\fetch_market_data.py" "--market-only" 2>&1
    } else {
      Write-Log "Refresh skipped. Markets closed or outside update window. KRX open day: $krMarketOpenDay, US open day: $usMarketOpenDay, ET: $($easternNow.ToString('yyyy-MM-dd HH:mm'))."
      $output = @()
    }
    foreach ($line in $output) {
      Write-Log $line
    }
    Write-Log "Refresh finished."
  } catch {
    Write-Log "Refresh failed: $_"
  }

  Start-Sleep -Seconds 300
}
