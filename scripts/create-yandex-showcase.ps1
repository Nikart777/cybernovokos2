param(
    [switch] $SoloBrightExample,
    [switch] $BrightSet,
    [switch] $EnergyCard
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

$projectRoot = (Get-Location).Path
$sourceRoot = 'C:\Users\avtos\.codex\generated_images\01a057bc-4631-7890-887c-60dae462538d'
$outputRoot = Join-Path $projectRoot 'assets\yandex-maps-showcase'
New-Item -ItemType Directory -Force -Path $outputRoot | Out-Null

$cards = if ($EnergyCard) {
    @(
        @{ Source = 'exec-c5744fc8-77ed-4805-9223-b93210db28b0.png'; Output = '06-energy-drinks-18plus-bright-v1.png'; Text = "ЭНЕРГЕТИКИ`n18+"; FontSize = 150 }
    )
}
elseif ($BrightSet) {
    @(
        @{ Source = 'exec-61fe7944-42f4-40e1-a17b-ab4da51a59cc.png'; Output = '01-private-solo-rooms-bright-v2.png'; Text = "3 ПРИВАТНЫЕ`nСОЛО-КОМНАТЫ"; FontSize = 150 },
        @{ Source = 'exec-08aaef29-ede7-4b4c-ad6c-a0d8406f4f88.png'; Output = '02-duo-rooms-bright-v2.png'; Text = "2 ДУО-`nКОМНАТЫ"; FontSize = 150 },
        @{ Source = 'exec-aff6b86c-89fe-4558-b580-f35062c597a3.png'; Output = '03-private-tv-ps5-bright-v2.png'; Text = "ПРИВАТНАЯ`nКОМНАТА С TV`nИ PS5"; FontSize = 118 },
        @{ Source = 'exec-84e5f3b3-1271-445f-a181-68a0190524a8.png'; Output = '04-racing-simulators-bright-v2.png'; Text = '2 АВТОСИМУЛЯТОРА'; FontSize = 107 },
        @{ Source = 'exec-8b13d840-1b6f-47a1-a162-1c51486f1269.png'; Output = '05-esports-bootcamp-zone-bright-v2.png'; Text = "БУТКЕМП-ЗОНА`nДЛЯ`nКИБЕРСПОРТСМЕНОВ"; FontSize = 87 }
    )
}
elseif ($SoloBrightExample) {
    @(
        @{ Source = 'exec-61fe7944-42f4-40e1-a17b-ab4da51a59cc.png'; Output = '01-private-solo-rooms-bright-v2.png'; Text = "3 ПРИВАТНЫЕ`nСОЛО-КОМНАТЫ"; FontSize = 150 }
    )
}
else {
@(
    @{ Source = 'exec-82635e62-a664-4829-94bd-b75f84e87d4f.png'; Output = '01-private-solo-rooms.png'; Text = "3 ПРИВАТНЫЕ`nСОЛО-КОМНАТЫ"; FontSize = 150 },
    @{ Source = 'exec-38042f77-7073-44f2-906d-d57331366d63.png'; Output = '02-duo-rooms.png'; Text = "2 ДУО-`nКОМНАТЫ"; FontSize = 150 },
    @{ Source = 'exec-c575c364-8070-4012-aaf9-75463e3a762d.png'; Output = '03-private-tv-ps5.png'; Text = "ПРИВАТНАЯ`nКОМНАТА С TV`nИ PS5"; FontSize = 118 },
    @{ Source = 'exec-d0c5adde-091d-49b9-9ba9-8aa558011404.png'; Output = '04-racing-simulators.png'; Text = '2 АВТОСИМУЛЯТОРА'; FontSize = 107 },
    @{ Source = 'exec-aba8919a-f44e-44f4-ae2e-2c6de139e698.png'; Output = '05-esports-bootcamp-zone.png'; Text = "БУТКЕМП-ЗОНА`nДЛЯ`nКИБЕРСПОРТСМЕНОВ"; FontSize = 87 }
)
}

function New-Card {
    param(
        [Parameter(Mandatory)] [string] $InputPath,
        [Parameter(Mandatory)] [string] $OutputPath,
        [Parameter(Mandatory)] [string] $Text,
        [Parameter(Mandatory)] [single] $FontSize
    )

    $original = [System.Drawing.Image]::FromFile($InputPath)
    $canvasWidth = 1500
    $canvasHeight = 1500
    $bitmap = New-Object System.Drawing.Bitmap $canvasWidth, $canvasHeight
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    try {
        $graphics.DrawImage($original, [System.Drawing.Rectangle]::new(0, 0, $canvasWidth, $canvasHeight))

        $panel = [System.Drawing.Rectangle]::new(0, 0, 1500, 645)
        $panelBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
            $panel,
            [System.Drawing.Color]::FromArgb(230, 8, 2, 7),
            [System.Drawing.Color]::FromArgb(25, 8, 2, 7),
            0.0
        )
        $graphics.FillRectangle($panelBrush, $panel)
        $panelBrush.Dispose()

        $accent = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 237, 27, 63))
        $graphics.FillRectangle($accent, 80, 92, 185, 12)
        $accent.Dispose()

        $font = New-Object System.Drawing.Font('Bahnschrift SemiBold', $FontSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
        $format = New-Object System.Drawing.StringFormat
        $format.Alignment = [System.Drawing.StringAlignment]::Near
        $format.LineAlignment = [System.Drawing.StringAlignment]::Near
        $format.Trimming = [System.Drawing.StringTrimming]::None
        $format.FormatFlags = [System.Drawing.StringFormatFlags]::NoClip
        $shadow = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(220, 0, 0, 0))
        $foreground = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
        $textBox = [System.Drawing.RectangleF]::new(80, 140, 1340, 460)
        $shadowBox = [System.Drawing.RectangleF]::new(88, 148, 1340, 460)
        $graphics.DrawString($Text, $font, $shadow, $shadowBox, $format)
        $graphics.DrawString($Text, $font, $foreground, $textBox, $format)
        $font.Dispose()
        $format.Dispose()
        $shadow.Dispose()
        $foreground.Dispose()

        $bitmap.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    }
    finally {
        $graphics.Dispose()
        $bitmap.Dispose()
        $original.Dispose()
    }
}

foreach ($card in $cards) {
    $inputPath = Join-Path $sourceRoot $card.Source
    $outputPath = Join-Path $outputRoot $card.Output
    if (-not (Test-Path -LiteralPath $inputPath)) {
        throw "Missing generated source image: $inputPath"
    }
    New-Card -InputPath $inputPath -OutputPath $outputPath -Text $card.Text -FontSize $card.FontSize
}

Get-ChildItem -LiteralPath $outputRoot -File | Select-Object Name, Length
