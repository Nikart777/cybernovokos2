Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

$projectRoot = (Get-Location).Path
$sourceRoot = 'C:\Users\avtos\.codex\generated_images\01a057bc-4631-7890-887c-60dae462538d'
$outputRoot = Join-Path $projectRoot 'assets\yandex-maps-showcase-novokosino'
New-Item -ItemType Directory -Force -Path $outputRoot | Out-Null

$cards = @(
    @{ Source = 'exec-9225a8e4-04b7-44c5-a38a-0b9687b2066b.png'; Output = '01-solo-pro-rooms-bright-v1.png'; Text = "2 ПРИВАТНЫЕ`nSOLO PRO"; FontSize = 158 },
    @{ Source = 'exec-13fb214d-457b-4367-88ee-f19020f5d5c2.png'; Output = '02-solo-premium-rooms-bright-v1.png'; Text = "2 ПРИВАТНЫЕ`nSOLO PREMIUM"; FontSize = 138 },
    @{ Source = 'exec-035d048b-bf9d-437e-8f0b-27a1fd1f5e3c.png'; Output = '03-duo-zone-bright-v1.png'; Text = 'DUO-ЗОНА'; FontSize = 194 },
    @{ Source = 'exec-f3c16130-66f7-462c-bc9d-a1c47aefe45c.png'; Output = '04-esports-bootcamp-bright-v1.png'; Text = 'БУТКЕМП-ЗОНА'; FontSize = 128 },
    @{ Source = 'exec-5f43d269-f15a-4fdb-9e43-c341b04c9820.png'; Output = '05-four-racing-simulators-bright-v1.png'; Text = "4 АВТО-`nСИМУЛЯТОРА"; FontSize = 150 },
    @{ Source = 'exec-e90d38a0-d072-4323-bd61-c42ef1de0508.png'; Output = '06-private-tv-ps5-bright-v1.png'; Text = "ПРИВАТНАЯ`nКОМНАТА С TV`nИ PS5"; FontSize = 118 }
)

function New-ShowcaseCard {
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
            [System.Drawing.Color]::FromArgb(235, 7, 2, 7),
            [System.Drawing.Color]::FromArgb(28, 7, 2, 7),
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
        $textBox = [System.Drawing.RectangleF]::new(80, 140, 1340, 470)
        $shadowBox = [System.Drawing.RectangleF]::new(88, 148, 1340, 470)
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
    New-ShowcaseCard -InputPath $inputPath -OutputPath $outputPath -Text $card.Text -FontSize $card.FontSize
}

Get-ChildItem -LiteralPath $outputRoot -File | Select-Object Name, Length
