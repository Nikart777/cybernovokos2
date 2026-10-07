Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$handoffDoc = 'C:\Users\avtos\YandexDisk\CYBERX\Клуб3\Инженерные проекты\00_Передача_новой_сессии_2026-10-02\Клуб3_Задание_АР_ЭОМ_ОВ_для_новой_сессии.docx'
$handoffPdf = 'E:\cyberxnovokos2\output\club3-engineering-handoff-20261002\render\handoff.pdf'
$handoffDir = Split-Path -Parent $handoffPdf
$null = New-Item -ItemType Directory -Path $handoffDir -Force
$wordApp = $null
$wordDocument = $null
try {
    $wordApp = New-Object -ComObject Word.Application
    $wordApp.Visible = $false
    $wordApp.DisplayAlerts = 0
    $wordDocument = $wordApp.Documents.Open($handoffDoc, $false, $true, $false)
    $wordDocument.Repaginate()
    $pageCount = $wordDocument.ComputeStatistics(2)
    $wordDocument.ExportAsFixedFormat($handoffPdf, 17)
    [pscustomobject]@{ renderer = 'Microsoft Word COM, separate hidden instance'; pages = $pageCount; pdf = $handoffPdf } | ConvertTo-Json
}
finally {
    if ($null -ne $wordDocument) { $wordDocument.Close(0); $null = [Runtime.InteropServices.Marshal]::FinalReleaseComObject($wordDocument) }
    if ($null -ne $wordApp) { $wordApp.Quit(0); $null = [Runtime.InteropServices.Marshal]::FinalReleaseComObject($wordApp) }
}
