param(
    [Parameter(Mandatory=$true)][string]$ClientName,
    [ValidateSet("GROWTH ПОДПИСКА", "SCALE ПОДПИСКА")][string]$TargetPlan = "GROWTH ПОДПИСКА",
    [string]$LastResultNote = "сдали первый пакет карточек/контента",
    [switch]$LogLead
)

$cfgPath = Join-Path $PSScriptRoot "catalog.json"
$cfg = Get-Content $cfgPath -Raw -Encoding UTF8 | ConvertFrom-Json

$planData = $cfg.packages.$TargetPlan
$priceNum = ($planData.price -replace '[^\d]', '')
if (-not $priceNum) { $priceNum = 39900 }

$upsellText = @"
$ClientName, добрый день! По итогам работы ($LastResultNote) — в AI CONTENT LAB готовы подключить вас на регулярный поток без лишней рутины.

Предлагаю формат: $TargetPlan
• Стоимость: $($planData.price)
• Что входит: $($planData.scope)
• Условия: $($planData.sla)

Плюсы для магазина: не нужно каждый раз собирать ТЗ с нуля и ждать новую очередь — карточки, тексты, SEO и ролики идут системно под новые товары и акции.

Подключаем на этот месяц по тарифу $($planData.price)?
"@

Set-Clipboard -Value $upsellText
Write-Host "=== АПСЕЙЛ НА ПОДПИСКУ СКОПИРОВАН В БУФЕР ОБМЕНА ===" -ForegroundColor Green
Write-Output $upsellText

if ($LogLead) {
    $logScript = Join-Path $PSScriptRoot "log_order.ps1"
    if (Test-Path $logScript) {
        & $logScript -ClientName $ClientName -PackageOrService $TargetPlan -AmountKZT ([int]$priceNum) -Status "Новый" -Note "Апсейл после сдачи" | Out-Null
        Write-Host "Апсейл зафиксирован в orders.csv как 'Новый'." -ForegroundColor Cyan
    }
}
