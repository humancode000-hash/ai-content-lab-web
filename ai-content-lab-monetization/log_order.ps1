param(
    [Parameter(Mandatory=$true)][string]$ClientName,
    [string]$PackageOrService = "ТЕСТ-СПРИНТ",
    [int]$AmountKZT = 14900,
    [ValidateSet("Новый", "Оплачен", "В работе", "Сдан")][string]$Status = "Новый",
    [string]$Note = ""
)

$csvPath = Join-Path $PSScriptRoot "orders.csv"
$dateStr = (Get-Date).ToString("yyyy-MM-dd HH:mm")

if (-not (Test-Path $csvPath)) {
    "Date,ClientName,PackageOrService,AmountKZT,Status,Note" | Set-Content -Path $csvPath -Encoding UTF8
}

$safeClient = $ClientName -replace '"', "'"
$safePkg = $PackageOrService -replace '"', "'"
$safeNote = $Note -replace '"', "'"

$line = "`"$dateStr`",`"$safeClient`",`"$safePkg`",$AmountKZT,`"$Status`",`"$safeNote`""
Add-Content -Path $csvPath -Value $line -Encoding UTF8

$rows = Import-Csv -Path $csvPath -Encoding UTF8
$paidSum = ($rows | Where-Object { $_.Status -eq "Оплачен" -or $_.Status -eq "В работе" -or $_.Status -eq "Сдан" } | Measure-Object -Property AmountKZT -Sum).Sum
if (-not $paidSum) { $paidSum = 0 }

Write-Host "=== ЗАКАЗ ЗАПИСАН В orders.csv ===" -ForegroundColor Green
Write-Output "$dateStr | $ClientName | $PackageOrService | $AmountKZT ₸ | Статус: $Status"
Write-Host "Итого в оплаченных/активных заказах: $paidSum ₸" -ForegroundColor Cyan
