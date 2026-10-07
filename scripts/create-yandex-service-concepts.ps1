Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

$projectRoot = (Get-Location).Path
$sourceRoot = 'C:\Users\avtos\.codex\generated_images\01a057bc-4631-7890-887c-60dae462538d'
$outputRoot = Join-Path $projectRoot 'assets\yandex-service-card-concepts\common-hall'
New-Item -ItemType Directory -Force -Path $outputRoot | Out-Null

$cards = @(
    @{ Source = 'exec-778c3126-6bbe-4b92-882e-81e0afb77c96.png'; Output = '01-neon-portal-common-hall-1h.png'; Variant = 1 },
    @{ Source = 'exec-b87f892f-9578-4c99-89c1-133e278ba969.png'; Output = '02-energy-core-common-hall-1h.png'; Variant = 2 },
    @{ Source = 'exec-4ad8ddaa-7ed5-4a1e-825c-e2ec55896103.png'; Output = '03-liquid-chrome-common-hall-1h.png'; Variant = 3 },
    @{ Source = 'exec-f2795919-2446-4557-8744-ab8f917a8855.png'; Output = '04-arena-lights-common-hall-1h.png'; Variant = 4 }
)

function New-RoundedRectanglePath {
    param(
        [Parameter(Mandatory)] [System.Drawing.RectangleF] $Rectangle,
        [Parameter(Mandatory)] [single] $Radius
    )

    $diameter = $Radius * 2
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.AddArc($Rectangle.X, $Rectangle.Y, $diameter, $diameter, 180, 90)
    $path.AddArc($Rectangle.Right - $diameter, $Rectangle.Y, $diameter, $diameter, 270, 90)
    $path.AddArc($Rectangle.Right - $diameter, $Rectangle.Bottom - $diameter, $diameter, $diameter, 0, 90)
    $path.AddArc($Rectangle.X, $Rectangle.Bottom - $diameter, $diameter, $diameter, 90, 90)
    $path.CloseFigure()
    return $path
}

function Draw-Text {
    param(
        [Parameter(Mandatory)] [System.Drawing.Graphics] $Graphics,
        [Parameter(Mandatory)] [string] $Text,
        [Parameter(Mandatory)] [string] $FontFamily,
        [Parameter(Mandatory)] [single] $FontSize,
        [Parameter(Mandatory)] [System.Drawing.RectangleF] $Bounds,
        [Parameter(Mandatory)] [System.Drawing.Color] $Color,
        [System.Drawing.StringAlignment] $Alignment = [System.Drawing.StringAlignment]::Near,
        [single] $ShadowOffset = 8
    )

    $font = New-Object System.Drawing.Font($FontFamily, $FontSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $format = New-Object System.Drawing.StringFormat
    $format.Alignment = $Alignment
    $format.LineAlignment = [System.Drawing.StringAlignment]::Near
    $format.Trimming = [System.Drawing.StringTrimming]::None
    $format.FormatFlags = [System.Drawing.StringFormatFlags]::NoClip
    $shadowBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(210, 0, 0, 0))
    $textBrush = New-Object System.Drawing.SolidBrush $Color

    try {
        if ($ShadowOffset -gt 0) {
            $shadowBounds = [System.Drawing.RectangleF]::new($Bounds.X + $ShadowOffset, $Bounds.Y + $ShadowOffset, $Bounds.Width, $Bounds.Height)
            $Graphics.DrawString($Text, $font, $shadowBrush, $shadowBounds, $format)
        }
        $Graphics.DrawString($Text, $font, $textBrush, $Bounds, $format)
    }
    finally {
        $font.Dispose()
        $format.Dispose()
        $shadowBrush.Dispose()
        $textBrush.Dispose()
    }
}

function New-ServiceCard {
    param(
        [Parameter(Mandatory)] [string] $InputPath,
        [Parameter(Mandatory)] [string] $OutputPath,
        [Parameter(Mandatory)] [int] $Variant
    )

    $original = [System.Drawing.Image]::FromFile($InputPath)
    $bitmap = New-Object System.Drawing.Bitmap 1500, 1500
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    try {
        $graphics.DrawImage($original, [System.Drawing.Rectangle]::new(0, 0, 1500, 1500))

        if ($Variant -eq 1) {
            $shade = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
                [System.Drawing.Rectangle]::new(0, 0, 980, 1500),
                [System.Drawing.Color]::FromArgb(210, 13, 2, 27),
                [System.Drawing.Color]::FromArgb(15, 13, 2, 27),
                0.0
            )
            $graphics.FillRectangle($shade, 0, 0, 980, 1500)
            $shade.Dispose()

            $labelPath = New-RoundedRectanglePath -Rectangle ([System.Drawing.RectangleF]::new(86, 98, 655, 128)) -Radius 34
            $labelBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(225, 255, 22, 100))
            $graphics.FillPath($labelBrush, $labelPath)
            $labelBrush.Dispose()
            $labelPath.Dispose()
            Draw-Text -Graphics $graphics -Text 'ОБЩИЙ ЗАЛ' -FontFamily 'Bahnschrift SemiBold' -FontSize 64 -Bounds ([System.Drawing.RectangleF]::new(125, 120, 575, 95)) -Color ([System.Drawing.Color]::White) -ShadowOffset 0
            Draw-Text -Graphics $graphics -Text "1`nЧАС" -FontFamily 'Bahnschrift SemiBold' -FontSize 330 -Bounds ([System.Drawing.RectangleF]::new(70, 320, 820, 900)) -Color ([System.Drawing.Color]::White)
        }
        elseif ($Variant -eq 2) {
            $shade = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
                [System.Drawing.Rectangle]::new(0, 0, 920, 1500),
                [System.Drawing.Color]::FromArgb(150, 60, 0, 28),
                [System.Drawing.Color]::FromArgb(0, 60, 0, 28),
                0.0
            )
            $graphics.FillRectangle($shade, 0, 0, 920, 1500)
            $shade.Dispose()

            Draw-Text -Graphics $graphics -Text 'ОБЩИЙ ЗАЛ' -FontFamily 'Bahnschrift SemiBold' -FontSize 82 -Bounds ([System.Drawing.RectangleF]::new(85, 105, 610, 110)) -Color ([System.Drawing.Color]::FromArgb(255, 255, 224, 238))
            Draw-Text -Graphics $graphics -Text '1' -FontFamily 'Bahnschrift SemiBold' -FontSize 650 -Bounds ([System.Drawing.RectangleF]::new(30, 230, 600, 720)) -Color ([System.Drawing.Color]::White)
            Draw-Text -Graphics $graphics -Text 'ЧАС' -FontFamily 'Bahnschrift SemiBold' -FontSize 170 -Bounds ([System.Drawing.RectangleF]::new(85, 980, 610, 240)) -Color ([System.Drawing.Color]::FromArgb(255, 255, 224, 238))
        }
        elseif ($Variant -eq 3) {
            $panelPath = New-RoundedRectanglePath -Rectangle ([System.Drawing.RectangleF]::new(68, 75, 730, 1350)) -Radius 58
            $panelBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(170, 18, 0, 35))
            $graphics.FillPath($panelBrush, $panelPath)
            $panelBrush.Dispose()
            $panelPath.Dispose()

            $accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 51, 224, 255))
            $graphics.FillRectangle($accentBrush, 118, 126, 175, 16)
            $accentBrush.Dispose()
            Draw-Text -Graphics $graphics -Text 'ОБЩИЙ ЗАЛ' -FontFamily 'Bahnschrift SemiBold' -FontSize 78 -Bounds ([System.Drawing.RectangleF]::new(112, 185, 620, 110)) -Color ([System.Drawing.Color]::White)
            Draw-Text -Graphics $graphics -Text "1`nЧАС" -FontFamily 'Bahnschrift SemiBold' -FontSize 240 -Bounds ([System.Drawing.RectangleF]::new(100, 405, 650, 760)) -Color ([System.Drawing.Color]::White)
        }
        else {
            $topShade = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
                [System.Drawing.Rectangle]::new(0, 0, 1500, 760),
                [System.Drawing.Color]::FromArgb(235, 6, 1, 18),
                [System.Drawing.Color]::FromArgb(15, 6, 1, 18),
                90.0
            )
            $graphics.FillRectangle($topShade, 0, 0, 1500, 760)
            $topShade.Dispose()

            Draw-Text -Graphics $graphics -Text 'ОБЩИЙ ЗАЛ' -FontFamily 'Bahnschrift SemiBold' -FontSize 90 -Bounds ([System.Drawing.RectangleF]::new(0, 95, 1500, 120)) -Color ([System.Drawing.Color]::FromArgb(255, 255, 191, 220)) -Alignment ([System.Drawing.StringAlignment]::Center)
            Draw-Text -Graphics $graphics -Text '1 ЧАС' -FontFamily 'Bahnschrift SemiBold' -FontSize 300 -Bounds ([System.Drawing.RectangleF]::new(0, 260, 1500, 400)) -Color ([System.Drawing.Color]::White) -Alignment ([System.Drawing.StringAlignment]::Center)
            $lineBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 255, 28, 94))
            $graphics.FillRectangle($lineBrush, 560, 695, 380, 14)
            $lineBrush.Dispose()
        }

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
    New-ServiceCard -InputPath $inputPath -OutputPath $outputPath -Variant $card.Variant
}

$finalCards = Get-ChildItem -LiteralPath $outputRoot -Filter '*.png' -File | Where-Object { $_.Name -ne '00-contact-sheet.png' } | Sort-Object Name
$contact = New-Object System.Drawing.Bitmap 3080, 3080
$contactGraphics = [System.Drawing.Graphics]::FromImage($contact)
$contactGraphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$contactGraphics.Clear([System.Drawing.Color]::FromArgb(255, 12, 8, 18))
$positions = @(
    [System.Drawing.Rectangle]::new(40, 40, 1480, 1480),
    [System.Drawing.Rectangle]::new(1560, 40, 1480, 1480),
    [System.Drawing.Rectangle]::new(40, 1560, 1480, 1480),
    [System.Drawing.Rectangle]::new(1560, 1560, 1480, 1480)
)
try {
    for ($i = 0; $i -lt $finalCards.Count; $i++) {
        $image = [System.Drawing.Image]::FromFile($finalCards[$i].FullName)
        try {
            $contactGraphics.DrawImage($image, $positions[$i])
        }
        finally {
            $image.Dispose()
        }
    }
    $contact.Save((Join-Path $outputRoot '00-contact-sheet.png'), [System.Drawing.Imaging.ImageFormat]::Png)
}
finally {
    $contactGraphics.Dispose()
    $contact.Dispose()
}

Get-ChildItem -LiteralPath $outputRoot -File | Select-Object Name, Length
