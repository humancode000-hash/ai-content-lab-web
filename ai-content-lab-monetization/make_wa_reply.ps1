param(
    [Parameter(Mandatory=$true)][string]$ClientName,
    [string]$PackageOrService = "ТЕСТ-СПРИНТ",
    [string]$TaskDetails = "Нужна упаковка под маркетплейс",
    [string]$Phone = ""
)

$cfgPath = Join-Path $PSScriptRoot "catalog.json"
$cfg = Get-Content $cfgPath -Raw -Encoding UTF8 | ConvertFrom-Json

$priceInfo = ""
$scopeInfo = ""
$slaInfo = ""

if ($cfg.packages.PSObject.Properties.Name -contains $PackageOrService) {
    $p = $cfg.packages.$PackageOrService
    $priceInfo = "$($p.price) ($($p.type))"
    $scopeInfo = $p.scope
    $slaInfo = $p.sla
} elseif ($cfg.services.PSObject.Properties.Name -contains $PackageOrService) {
    $priceInfo = $cfg.services.$PackageOrService
    $scopeInfo = "Индивидуальная задача по направлению '$PackageOrService'"
    $slaInfo = "уточняется по объёму"
} else {
    $priceInfo = "по тарифу выбранного пакета"
    $scopeInfo = $PackageOrService
    $slaInfo = "2-4 рабочих дня для тест-спринта"
}

$replyText = @"
Здравствуйте, $ClientName! На связи $($cfg.brand).

Подобрали вариант под вашу задачу ($TaskDetails):
• Формат: $PackageOrService
• Стоимость: $priceInfo
• Что входит: $scopeInfo
• Сроки: $slaInfo

Чтобы мы сразу запустили разбор и сборку, напишите в ответ 3 короткие вещи:
1. Площадка и ссылка на товар / магазин (Kaspi, Wildberries, Ozon и др.)
2. Сколько штук / роликов / текстов нужно сейчас
3. Удобный способ оплаты ($($cfg.kaspi_note))
"@

Set-Clipboard -Value $replyText
Write-Host "=== ГОТОВЫЙ ОТВЕТ ДЛЯ WHATSAPP (УЖЕ В БУФЕРЕ ОБМЕНА) ===" -ForegroundColor Green
Write-Output $replyText

$cleanPhone = ($Phone -replace '[^\d]', '')
$encoded = [uri]::EscapeDataString($replyText)

if ($cleanPhone.Length -ge 10) {
    $waUrl = "https://wa.me/$cleanPhone" + "?text=" + $encoded
    Write-Host "`nСсылка для открытия чата с клиентом:" -ForegroundColor Cyan
    Write-Output $waUrl
} else {
    $waUrl = "https://wa.me/?text=" + $encoded
    Write-Host "`nУниверсальная ссылка (выберешь чат в WhatsApp):" -ForegroundColor Cyan
    Write-Output $waUrl
}
