param(
    [string]$FilterStatus = ""
)

$csvPath = Join-Path $PSScriptRoot "orders.csv"
if (-not (Test-Path $csvPath)) {
    Write-Host "Файл orders.csv пока не создан." -ForegroundColor Yellow
    exit
}

$rows = Import-Csv -Path $csvPath -Encoding UTF8 | ForEach-Object {
    [PSCustomObject]@{
        Date             = $_.Date
        ClientName       = $_.ClientName
        PackageOrService = $_.PackageOrService
        AmountKZT        = [int]$_.AmountKZT
        Status           = $_.Status
        Note             = $_.Note
    }
}

# Берём последнюю запись по каждому клиенту+пакету, чтобы не задваивать суммы при смене статуса
$latestOrders = $rows | Group-Object ClientName, PackageOrService | ForEach-Object {
    $_.Group[-1]
}

if ($FilterStatus -ne "") {
    $latestOrders = $latestOrders | Where-Object { $_.Status -eq $FilterStatus }
}

$totalAll = ($latestOrders | Measure-Object -Property AmountKZT -Sum).Sum
if (-not $totalAll) { $totalAll = 0 }

$realRevenue = ($latestOrders | Where-Object { $_.Status -in @("Оплачен", "В работе", "Сдан") } | Measure-Object -Property AmountKZT -Sum).Sum
if (-not $realRevenue) { $realRevenue = 0 }

$deliveredSum = ($latestOrders | Where-Object { $_.Status -eq "Сдан" } | Measure-Object -Property AmountKZT -Sum).Sum
if (-not $deliveredSum) { $deliveredSum = 0 }

Write-Host "=== СВОДКА AI CONTENT LAB (ПО АКТУАЛЬНОМУ СТАТУСУ КАЖДОГО ЗАКАЗА) ===" -ForegroundColor Green
Write-Output "Актуальных заказов: $($latestOrders.Count)"
Write-Output "Реальная выручка (Оплачен / В работе / Сдан): $realRevenue ₸"
Write-Output "Сдано на сумму: $deliveredSum ₸"
Write-Output "Всего по всем заказам (включая 'Новый'): $totalAll ₸"

Write-Host "`nПо статусам:" -ForegroundColor Cyan
$latestOrders | Group-Object Status | ForEach-Object {
    $sumStatus = ($_.Group | Measure-Object -Property AmountKZT -Sum).Sum
    Write-Output "• $($_.Name): $($_.Count) шт. ($sumStatus ₸)"
}

Write-Host "`nАктуальный список заказов:" -ForegroundColor Yellow
$latestOrders | Format-Table -AutoSize
