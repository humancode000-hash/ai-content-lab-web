while ($true) {
    Clear-Host
    Write-Host "=== AI CONTENT LAB — МЕНЮ МОНЕТИЗАЦИИ ===" -ForegroundColor Cyan
    Write-Host "1. Разобрать заявку с сайта и подготовить ответ в WhatsApp"
    Write-Host "2. Закрыть клиента на оплату Kaspi"
    Write-Host "3. Записать / обновить заказ в orders.csv"
    Write-Host "4. Запустить задачу в работу + бриф для Джарвиса"
    Write-Host "5. Предложить подписку (GROWTH / SCALE)"
    Write-Host "6. Показать реальную сводку выручки и заказов"
    Write-Host "0. Выход"
    Write-Host ""

    $choice = Read-Host "Выбери пункт (0-6)"

    switch ($choice) {
        "1" {
            $n = Read-Host "Имя клиента"
            $p = Read-Host "Пакет или услуга [ТЕСТ-СПРИНТ]"
            if ([string]::IsNullOrWhiteSpace($p)) { $p = "ТЕСТ-СПРИНТ" }
            $t = Read-Host "Задача / ссылка [Заявка с сайта]"
            if ([string]::IsNullOrWhiteSpace($t)) { $t = "Заявка с сайта" }
            $ph = Read-Host "Телефон клиента (необязательно)"
            .\parse_site_lead.ps1 -ClientName $n -PackageOrService $p -TaskDetails $t -Phone $ph
            Read-Host "`nНажми Enter для продолжения..."
        }
        "2" {
            $n = Read-Host "Имя клиента"
            $a = Read-Host "Сумма к оплате [14 900 ₸]"
            if ([string]::IsNullOrWhiteSpace($a)) { $a = "14 900 ₸" }
            $p = Read-Host "Пакет или услуга [ТЕСТ-СПРИНТ]"
            if ([string]::IsNullOrWhiteSpace($p)) { $p = "ТЕСТ-СПРИНТ" }
            $kp = Read-Host "Номер Kaspi [+7 700 033 89 78]"
            if ([string]::IsNullOrWhiteSpace($kp)) { $kp = "+7 700 033 89 78" }
            $kh = Read-Host "Получатель Kaspi [AI CONTENT LAB]"
            if ([string]::IsNullOrWhiteSpace($kh)) { $kh = "AI CONTENT LAB" }
            .\make_kaspi_close.ps1 -ClientName $n -Amount $a -PackageOrService $p -KaspiPhone $kp -KaspiHolder $kh
            Read-Host "`nНажми Enter для продолжения..."
        }
        "3" {
            $n = Read-Host "Имя клиента"
            $p = Read-Host "Пакет или услуга [ТЕСТ-СПРИНТ]"
            if ([string]::IsNullOrWhiteSpace($p)) { $p = "ТЕСТ-СПРИНТ" }
            $amt = Read-Host "Сумма числом в тенге [14900]"
            if ([string]::IsNullOrWhiteSpace($amt)) { $amt = "14900" }
            $st = Read-Host "Статус (Новый / Оплачен / В работе / Сдан) [Оплачен]"
            if ([string]::IsNullOrWhiteSpace($st)) { $st = "Оплачен" }
            $nt = Read-Host "Комментарий"
            .\log_order.ps1 -ClientName $n -PackageOrService $p -AmountKZT ([int]$amt) -Status $st -Note $nt
            Read-Host "`nНажми Enter для продолжения..."
        }
        "4" {
            $n = Read-Host "Имя клиента"
            $p = Read-Host "Пакет или услуга [ТЕСТ-СПРИНТ]"
            if ([string]::IsNullOrWhiteSpace($p)) { $p = "ТЕСТ-СПРИНТ" }
            $amt = Read-Host "Сумма числом в тенге [14900]"
            if ([string]::IsNullOrWhiteSpace($amt)) { $amt = "14900" }
            $mp = Read-Host "Площадка [Kaspi]"
            if ([string]::IsNullOrWhiteSpace($mp)) { $mp = "Kaspi" }
            $info = Read-Host "Вводные по товару и задаче"
            .\start_task.ps1 -ClientName $n -PackageOrService $p -AmountKZT ([int]$amt) -Marketplace $mp -ProductInfo $info
            Read-Host "`nНажми Enter для продолжения..."
        }
        "5" {
            $n = Read-Host "Имя клиента"
            $pl = Read-Host "Тариф (GROWTH ПОДПИСКА / SCALE ПОДПИСКА) [GROWTH ПОДПИСКА]"
            if ([string]::IsNullOrWhiteSpace($pl)) { $pl = "GROWTH ПОДПИСКА" }
            $res = Read-Host "Итог прошлой работы [сдали первый пакет]"
            if ([string]::IsNullOrWhiteSpace($res)) { $res = "сдали первый пакет" }
            .\make_upsell.ps1 -ClientName $n -TargetPlan $pl -LastResultNote $res -LogLead
            Read-Host "`nНажми Enter для продолжения..."
        }
        "6" {
            .\summary.ps1
            Read-Host "`nНажми Enter для продолжения..."
        }
        "0" {
            break
        }
    }
}
