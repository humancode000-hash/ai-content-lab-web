param(
    [Parameter(Mandatory=$true)][string]$ClientName,
    [string]$Amount = "14 900 ₸",
    [string]$PackageOrService = "ТЕСТ-СПРИНТ",
    [string]$KaspiPhone = "+7 (777) 000-00-00",
    [string]$KaspiHolder = "Имя Фамилия"
)

$closeText = @"
$ClientName, фиксируем задачу по пакету «$PackageOrService».

К оплате: $Amount
Реквизиты Kaspi перевод:
• Номер: $KaspiPhone
• Получатель: $KaspiHolder

Сразу после перевода скиньте скрин чека сюда и отправьте фото/ссылку на товар — и мы запускаем работу в очередь.
"@

Set-Clipboard -Value $closeText
Write-Host "=== СКРИПТ ОПЛАТЫ KASPI СКОПИРОВАН В БУФЕР ОБМЕНА ===" -ForegroundColor Green
Write-Output $closeText
