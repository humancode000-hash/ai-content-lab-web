param(
    [Parameter(Mandatory=$true)][string]$ClientName,
    [string]$PackageOrService = "ТЕСТ-СПРИНТ",
    [int]$AmountKZT = 14900,
    [string]$Marketplace = "Kaspi",
    [string]$ProductInfo = "Карточки товара + выгоды для покупателей",
    [string]$Note = "Запущено в работу после оплаты"
)

$logScript = Join-Path $PSScriptRoot "log_order.ps1"
if (Test-Path $logScript) {
    & $logScript -ClientName $ClientName -PackageOrService $PackageOrService -AmountKZT $AmountKZT -Status "В работе" -Note $Note | Out-Null
}

$brief = @"
ЗАДАЧА В РАБОТЕ — AI CONTENT LAB
• Клиент: $ClientName
• Пакет / услуга: $PackageOrService ($AmountKZT ₸)
• Площадка: $Marketplace
• Вводные по задаче: $ProductInfo

ЧТО СОБРАТЬ ДЛЯ ДЖАРВИСА И СБОРКИ:
1. Главный оффер и боли клиента на площадке ($Marketplace)
2. Структура слайдов / кадров и ключевые выгоды (без воды)
3. Заголовки, текст на макетах и SEO-фразы / акценты

Промпт для Джарвиса:
"Собери подробное ТЗ, список выгод покупателей, структуру слайдов/сценария и черновики текстов под задачу '$ProductInfo' на площадке '$Marketplace' для пакета '$PackageOrService'."
"@

Set-Clipboard -Value $brief
Write-Host "=== ЗАДАЧА ПЕРЕВЕДЕНА В СТАТУС 'В РАБОТЕ', БРИФ В БУФЕРЕ ОБМЕНА ===" -ForegroundColor Green
Write-Output $brief
