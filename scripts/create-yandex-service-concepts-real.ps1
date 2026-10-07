Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Drawing

$projectRoot = (Get-Location).Path
$outputRoot = Join-Path $projectRoot 'assets\yandex-service-card-concepts\common-hall-real'
$photoRoot = Join-Path $outputRoot 'source-png'
New-Item -ItemType Directory -Force -Path $outputRoot | Out-Null

function Draw-ImageCover {
    param(
        [Parameter(Mandatory)] [System.Drawing.Graphics] $Graphics,
        [Parameter(Mandatory)] [System.Drawing.Image] $Image,
        [Parameter(Mandatory)] [System.Drawing.Rectangle] $Destination,
        [single] $HorizontalFocus = 0.5,
        [single] $VerticalFocus = 0.5
    )

    $sourceRatio = $Image.Width / $Image.Height
    $destinationRatio = $Destination.Width / $Destination.Height

    if ($sourceRatio -gt $destinationRatio) {
        $sourceHeight = $Image.Height
        $sourceWidth = [int]($sourceHeight * $destinationRatio)
        $availableX = $Image.Width - $sourceWidth
        $sourceX = [int]($availableX * $HorizontalFocus)
        $sourceY = 0
    }
    else {
        $sourceWidth = $Image.Width
        $sourceHeight = [int]($sourceWidth / $destinationRatio)
        $availableY = $Image.Height - $sourceHeight
        $sourceX = 0
        $sourceY = [int]($availableY * $VerticalFocus)
    }

    $source = [System.Drawing.Rectangle]::new($sourceX, $sourceY, $sourceWidth, $sourceHeight)
    $Graphics.DrawImage($Image, $Destination, $source, [System.Drawing.GraphicsUnit]::Pixel)
}

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
        [Parameter(Mandatory)] [single] $FontSize,
        [Parameter(Mandatory)] [System.Drawing.RectangleF] $Bounds,
        [Parameter(Mandatory)] [System.Drawing.Color] $Color,
        [System.Drawing.StringAlignment] $Alignment = [System.Drawing.StringAlignment]::Near,
        [single] $ShadowOffset = 8
    )

    $font = New-Object System.Drawing.Font('Bahnschrift SemiBold', $FontSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $format = New-Object System.Drawing.StringFormat
    $format.Alignment = $Alignment
    $format.LineAlignment = [System.Drawing.StringAlignment]::Near
    $format.Trimming = [System.Drawing.StringTrimming]::None
    $format.FormatFlags = [System.Drawing.StringFormatFlags]::NoClip
    $shadowBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(220, 0, 0, 0))
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

function New-CardCanvas {
    $bitmap = New-Object System.Drawing.Bitmap 1500, 1500
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    return @{ Bitmap = $bitmap; Graphics = $graphics }
}

function Save-And-Dispose {
    param(
        [Parameter(Mandatory)] $Canvas,
        [Parameter(Mandatory)] [string] $OutputPath
    )

    try {
        $Canvas.Bitmap.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    }
    finally {
        $Canvas.Graphics.Dispose()
        $Canvas.Bitmap.Dispose()
    }
}

$photo1 = [System.Drawing.Image]::FromFile((Join-Path $photoRoot 'common-1.png'))
$photo3 = [System.Drawing.Image]::FromFile((Join-Path $photoRoot 'common-3.png'))
$photo5 = [System.Drawing.Image]::FromFile((Join-Path $photoRoot 'common-5.png'))

try {
    # Вариант 1: крупный тариф сверху, реальный зал занимает большую часть карточки.
    $canvas = New-CardCanvas
    Draw-ImageCover -Graphics $canvas.Graphics -Image $photo3 -Destination ([System.Drawing.Rectangle]::new(0, 0, 1500, 1500)) -HorizontalFocus 0.5 -VerticalFocus 0.5
    $topPanel = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        [System.Drawing.Rectangle]::new(0, 0, 1500, 660),
        [System.Drawing.Color]::FromArgb(245, 15, 2, 20),
        [System.Drawing.Color]::FromArgb(40, 15, 2, 20),
        90.0
    )
    $canvas.Graphics.FillRectangle($topPanel, 0, 0, 1500, 660)
    $topPanel.Dispose()
    $accent = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 255, 24, 88))
    $canvas.Graphics.FillRectangle($accent, 82, 90, 210, 16)
    $accent.Dispose()
    Draw-Text -Graphics $canvas.Graphics -Text 'ОБЩИЙ ЗАЛ' -FontSize 96 -Bounds ([System.Drawing.RectangleF]::new(80, 135, 1320, 125)) -Color ([System.Drawing.Color]::FromArgb(255, 255, 190, 216))
    Draw-Text -Graphics $canvas.Graphics -Text '1 ЧАС' -FontSize 290 -Bounds ([System.Drawing.RectangleF]::new(70, 280, 1360, 360)) -Color ([System.Drawing.Color]::White)
    Save-And-Dispose -Canvas $canvas -OutputPath (Join-Path $outputRoot '01-real-hall-top-title-1h.png')

    # Вариант 2: текстовая полоса слева, оборудование хорошо видно справа.
    $canvas = New-CardCanvas
    Draw-ImageCover -Graphics $canvas.Graphics -Image $photo1 -Destination ([System.Drawing.Rectangle]::new(0, 0, 1500, 1500)) -HorizontalFocus 0.55 -VerticalFocus 0.5
    $leftPanel = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        [System.Drawing.Rectangle]::new(0, 0, 930, 1500),
        [System.Drawing.Color]::FromArgb(238, 40, 0, 35),
        [System.Drawing.Color]::FromArgb(45, 40, 0, 35),
        0.0
    )
    $canvas.Graphics.FillRectangle($leftPanel, 0, 0, 930, 1500)
    $leftPanel.Dispose()
    Draw-Text -Graphics $canvas.Graphics -Text 'ОБЩИЙ ЗАЛ' -FontSize 92 -Bounds ([System.Drawing.RectangleF]::new(82, 105, 760, 125)) -Color ([System.Drawing.Color]::FromArgb(255, 255, 205, 226))
    Draw-Text -Graphics $canvas.Graphics -Text "1`nЧАС" -FontSize 325 -Bounds ([System.Drawing.RectangleF]::new(70, 285, 760, 870)) -Color ([System.Drawing.Color]::White)
    Save-And-Dispose -Canvas $canvas -OutputPath (Join-Path $outputRoot '02-real-hall-side-panel-1h.png')

    # Вариант 3: эмоциональная фотография внутри клуба и компактная яркая плашка.
    $canvas = New-CardCanvas
    Draw-ImageCover -Graphics $canvas.Graphics -Image $photo5 -Destination ([System.Drawing.Rectangle]::new(0, 0, 1500, 1500)) -HorizontalFocus 0.5 -VerticalFocus 0.42
    $bottomPanel = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        [System.Drawing.Rectangle]::new(0, 760, 1500, 740),
        [System.Drawing.Color]::FromArgb(10, 13, 0, 28),
        [System.Drawing.Color]::FromArgb(245, 13, 0, 28),
        90.0
    )
    $canvas.Graphics.FillRectangle($bottomPanel, 0, 760, 1500, 740)
    $bottomPanel.Dispose()
    $labelPath = New-RoundedRectanglePath -Rectangle ([System.Drawing.RectangleF]::new(72, 82, 670, 132)) -Radius 34
    $labelBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(235, 244, 20, 90))
    $canvas.Graphics.FillPath($labelBrush, $labelPath)
    $labelBrush.Dispose()
    $labelPath.Dispose()
    Draw-Text -Graphics $canvas.Graphics -Text 'ОБЩИЙ ЗАЛ' -FontSize 70 -Bounds ([System.Drawing.RectangleF]::new(118, 110, 590, 95)) -Color ([System.Drawing.Color]::White) -ShadowOffset 0
    Draw-Text -Graphics $canvas.Graphics -Text '1 ЧАС' -FontSize 280 -Bounds ([System.Drawing.RectangleF]::new(75, 1010, 1350, 350)) -Color ([System.Drawing.Color]::White)
    Save-And-Dispose -Canvas $canvas -OutputPath (Join-Path $outputRoot '03-real-hall-atmosphere-1h.png')

    # Вариант 4: фотография зала в рамке, тариф как главный яркий элемент.
    $canvas = New-CardCanvas
    $canvas.Graphics.Clear([System.Drawing.Color]::FromArgb(255, 18, 3, 23))
    Draw-ImageCover -Graphics $canvas.Graphics -Image $photo3 -Destination ([System.Drawing.Rectangle]::new(70, 70, 1360, 970)) -HorizontalFocus 0.5 -VerticalFocus 0.5
    $tint = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(42, 255, 20, 87))
    $canvas.Graphics.FillRectangle($tint, 70, 70, 1360, 970)
    $tint.Dispose()
    $border = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255, 255, 28, 95)), 14
    $canvas.Graphics.DrawRectangle($border, 70, 70, 1360, 970)
    $border.Dispose()
    $tariffPanel = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 242, 18, 82))
    $canvas.Graphics.FillRectangle($tariffPanel, 70, 1040, 1360, 390)
    $tariffPanel.Dispose()
    Draw-Text -Graphics $canvas.Graphics -Text 'ОБЩИЙ ЗАЛ' -FontSize 88 -Bounds ([System.Drawing.RectangleF]::new(0, 105, 1500, 120)) -Color ([System.Drawing.Color]::White) -Alignment ([System.Drawing.StringAlignment]::Center)
    Draw-Text -Graphics $canvas.Graphics -Text '1 ЧАС' -FontSize 265 -Bounds ([System.Drawing.RectangleF]::new(0, 1085, 1500, 315)) -Color ([System.Drawing.Color]::White) -Alignment ([System.Drawing.StringAlignment]::Center) -ShadowOffset 0
    Save-And-Dispose -Canvas $canvas -OutputPath (Join-Path $outputRoot '04-real-hall-poster-frame-1h.png')
}
finally {
    $photo1.Dispose()
    $photo3.Dispose()
    $photo5.Dispose()
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
