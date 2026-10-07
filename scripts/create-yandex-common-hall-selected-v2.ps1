Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

$canvasSize = 1500
$projectRoot = 'E:\cyberxnovokos2'
$sourcePath = Join-Path $projectRoot 'assets\yandex-service-card-concepts\common-hall-real\source-png\common-3.png'
$outputPath = Join-Path $projectRoot 'assets\yandex-service-card-concepts\common-hall-real\05-selected-tactic-sans-v2.png'

function New-Color {
    param(
        [Parameter(Mandatory = $true)][string]$Hex,
        [int]$Alpha = 255
    )

    $value = $Hex.TrimStart('#')
    return [System.Drawing.Color]::FromArgb(
        $Alpha,
        [Convert]::ToInt32($value.Substring(0, 2), 16),
        [Convert]::ToInt32($value.Substring(2, 2), 16),
        [Convert]::ToInt32($value.Substring(4, 2), 16)
    )
}

function Draw-ImageCover {
    param(
        [Parameter(Mandatory = $true)][System.Drawing.Graphics]$Graphics,
        [Parameter(Mandatory = $true)][System.Drawing.Image]$Image,
        [Parameter(Mandatory = $true)][System.Drawing.RectangleF]$Target
    )

    $sourceRatio = $Image.Width / $Image.Height
    $targetRatio = $Target.Width / $Target.Height

    if ($sourceRatio -gt $targetRatio) {
        $sourceHeight = $Image.Height
        $sourceWidth = $sourceHeight * $targetRatio
        $sourceX = ($Image.Width - $sourceWidth) / 2
        $sourceY = 0
    }
    else {
        $sourceWidth = $Image.Width
        $sourceHeight = $sourceWidth / $targetRatio
        $sourceX = 0
        $sourceY = ($Image.Height - $sourceHeight) / 2
    }

    $source = [System.Drawing.RectangleF]::new($sourceX, $sourceY, $sourceWidth, $sourceHeight)
    $Graphics.DrawImage($Image, $Target, $source, [System.Drawing.GraphicsUnit]::Pixel)
}

function Draw-CenteredText {
    param(
        [Parameter(Mandatory = $true)][System.Drawing.Graphics]$Graphics,
        [Parameter(Mandatory = $true)][string]$Text,
        [Parameter(Mandatory = $true)][System.Drawing.RectangleF]$Bounds,
        [Parameter(Mandatory = $true)][float]$Size,
        [Parameter(Mandatory = $true)][string]$FontFamily,
        [Parameter(Mandatory = $true)][System.Drawing.Color]$Color
    )

    $font = [System.Drawing.Font]::new($FontFamily, $Size, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
    $brush = [System.Drawing.SolidBrush]::new($Color)
    $format = [System.Drawing.StringFormat]::new()
    $format.Alignment = [System.Drawing.StringAlignment]::Center
    $format.LineAlignment = [System.Drawing.StringAlignment]::Center
    $format.FormatFlags = [System.Drawing.StringFormatFlags]::NoWrap

    try {
        $Graphics.DrawString($Text, $font, $brush, $Bounds, $format)
    }
    finally {
        $format.Dispose()
        $brush.Dispose()
        $font.Dispose()
    }
}

$bitmap = [System.Drawing.Bitmap]::new($canvasSize, $canvasSize, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$photo = [System.Drawing.Image]::FromFile($sourcePath)

try {
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    $backgroundBrush = [System.Drawing.SolidBrush]::new((New-Color '#120216'))
    $graphics.FillRectangle($backgroundBrush, 0, 0, $canvasSize, $canvasSize)
    $backgroundBrush.Dispose()

    $photoBounds = [System.Drawing.RectangleF]::new(60, 60, 1380, 985)
    Draw-ImageCover -Graphics $graphics -Image $photo -Target $photoBounds

    $photoTint = [System.Drawing.SolidBrush]::new((New-Color '#5C0928' 38))
    $graphics.FillRectangle($photoTint, $photoBounds)
    $photoTint.Dispose()

    $framePen = [System.Drawing.Pen]::new((New-Color '#FF1458'), 16)
    $graphics.DrawRectangle($framePen, 60, 60, 1380, 985)
    $framePen.Dispose()

    # A solid plaque keeps the zone name readable even in a small Yandex Maps thumbnail.
    $plaqueBounds = [System.Drawing.RectangleF]::new(135, 105, 1230, 180)
    $plaqueBrush = [System.Drawing.SolidBrush]::new((New-Color '#120216' 236))
    $graphics.FillRectangle($plaqueBrush, $plaqueBounds)
    $plaqueBrush.Dispose()

    $plaquePen = [System.Drawing.Pen]::new((New-Color '#FF1458'), 5)
    $graphics.DrawRectangle($plaquePen, 135, 105, 1230, 180)
    $plaquePen.Dispose()

    $accentBrush = [System.Drawing.SolidBrush]::new((New-Color '#FF1458'))
    $graphics.FillRectangle($accentBrush, 135, 105, 26, 180)
    $accentBrush.Dispose()

    Draw-CenteredText -Graphics $graphics -Text 'ОБЩИЙ ЗАЛ' -Bounds ([System.Drawing.RectangleF]::new(165, 112, 1170, 165)) -Size 118 -FontFamily 'Tactic Sans Black' -Color ([System.Drawing.Color]::White)

    $offerBounds = [System.Drawing.RectangleF]::new(60, 1045, 1380, 395)
    $offerBrush = [System.Drawing.SolidBrush]::new((New-Color '#F70D4F'))
    $graphics.FillRectangle($offerBrush, $offerBounds)
    $offerBrush.Dispose()

    Draw-CenteredText -Graphics $graphics -Text '1 ЧАС' -Bounds ([System.Drawing.RectangleF]::new(90, 1080, 1320, 310)) -Size 276 -FontFamily 'Tactic Sans Ultra' -Color ([System.Drawing.Color]::White)

    $bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
}
finally {
    $photo.Dispose()
    $graphics.Dispose()
    $bitmap.Dispose()
}

Write-Output $outputPath
