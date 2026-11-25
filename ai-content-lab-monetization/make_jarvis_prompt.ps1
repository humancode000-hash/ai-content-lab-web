param(
    [Parameter(Mandatory=$true)][string]$RawLead
)

$cfgPath = Join-Path $PSScriptRoot "catalog.json"
$cfgRaw = Get-Content $cfgPath -Raw -Encoding UTF8

$prompt = @"
Ты — менеджер продаж студии $($cfgRaw | ConvertFrom-Json | Select-Object -ExpandProperty brand).
Сформируй короткий, убедительный и деловой ответ клиенту в WhatsApp на основе заявки.
Не пиши длинных полотен, сразу дай цену, сроки, состав и простой шаг к оплате (Kaspi / счёт) + 1 вопрос для старта.

Справочник тарифов и услуг:
$cfgRaw

Данные заявки клиента:
$RawLead
"@

Set-Clipboard -Value $prompt
Write-Host "=== ПРОМПТ ДЛЯ ДЖАРВИСА СКОПИРОВАН В БУФЕР ОБМЕНА ===" -ForegroundColor Yellow
Write-Output $prompt
