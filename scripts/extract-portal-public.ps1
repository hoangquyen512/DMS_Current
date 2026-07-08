# Trích token/class từ umi.css public (không cần SSO)
$ErrorActionPreference = 'Stop'
$baseUrl = 'https://dms-portal-dev.finviet.com.vn'
$outDir = Join-Path $PSScriptRoot '..\design-system\web\extract' | Resolve-Path -ErrorAction SilentlyContinue
if (-not $outDir) {
    $outDir = (Join-Path $PSScriptRoot '..\design-system\web\extract')
    New-Item -ItemType Directory -Force -Path $outDir | Out-Null
} else { $outDir = $outDir.Path }

$css = (Invoke-WebRequest -Uri "$baseUrl/umi.css" -UseBasicParsing).Content

$hexColors = [regex]::Matches($css, '#[0-9a-fA-F]{3,8}') |
    ForEach-Object { $_.Value.ToUpper() } |
    Group-Object | Sort-Object Count -Descending |
    Select-Object -First 40 Name, Count

$antClasses = [regex]::Matches($css, '\.ant-[a-zA-Z0-9_-]+') |
    ForEach-Object { $_.Value.TrimStart('.') } |
    Sort-Object -Unique

$antProClasses = [regex]::Matches($css, '\.ant-pro-[a-zA-Z0-9_-]+') |
    ForEach-Object { $_.Value.TrimStart('.') } |
    Sort-Object -Unique

$custom = @{
    syncButton = '#22AED1'
    antPrimaryLink = '#1677FF'
    antPrimaryHover = '#69B1FF'
    successText = '#52C41A'
    pageBg = '#FAFAFA'
}

$snapshot = [ordered]@{
    extractedAt = (Get-Date).ToString('o')
    source = "$baseUrl/umi.css"
    note = 'Public bundle only — sau SSO chạy extract-portal-design để lấy computed styles'
    topHexColors = $hexColors
    antClassCount = $antClasses.Count
    antProClassCount = $antProClasses.Count
    antClassesSample = $antClasses | Select-Object -First 80
    antProClassesSample = $antProClasses | Select-Object -First 40
    finvietCustom = $custom
    typography = @{
        fontFamily = '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif'
        fontSize14 = '14px'
        lineHeight = '1.5715'
    }
    layout = @{
        headerHeight = '56px (ant-pro-global-header)'
        contentPadding = '16px (ant-pro-layout-content)'
        pageHeaderPadding = '16px (ant-pro-page-container)'
    }
}

$outFile = Join-Path $outDir 'public-css-snapshot.json'
$snapshot | ConvertTo-Json -Depth 6 | Set-Content $outFile -Encoding UTF8
Write-Host "Saved: $outFile"
