# Tổ chức mockups/mobile theo 4 tab bottom nav
# Chạy: powershell -File DMS_Salesman_mockup/scripts/reorganize-mockup-mobile.ps1

$ErrorActionPreference = 'Stop'
$mobileRoot = (Join-Path $PSScriptRoot '..\mockups\mobile' | Resolve-Path).Path
$jsonPath = Join-Path $mobileRoot 'menu_data.json'
$outJs = Join-Path $mobileRoot 'menu-tree.js'

$fileFolderMap = @{
    'MS-A-VT01-chi-tiet-vieng-tham-cua-hang.html'         = 'vieng-tham/chi-tiet-cua-hang'
    'MS-A-CH01-tao-sua-cua-hang-tuyen-khong-bat-buoc.html' = 'vieng-tham/tuyen-ban-hang'
    'MS-A-GH01-giao-hang-don-hang.html'                    = 'tai-xe'
    'MS-A-DL03-ocr-don-giao-hang.html'                     = 'tai-xe'
    'MS-01-bao-cao-vieng-tham-cua-hang.html'               = 'bao-cao/vieng-tham'
    'MS-A-CH02-danh-sach-cua-hang.html'                     = 'khac/cua-hang'
    'MS-A-CH03-tac-vu-cua-hang.html'                         = 'khac/cua-hang'
    # Tài sản — gom full flow: MS-A-TS00 tại vieng-tham/tai-san/ (không map subfolder)
}

function Ensure-Dir([string]$rel) {
    $full = Join-Path $mobileRoot ($rel -replace '/', [IO.Path]::DirectorySeparatorChar)
    if (-not (Test-Path $full)) {
        New-Item -ItemType Directory -Path $full -Force | Out-Null
        Write-Host "Created: $rel"
    }
}

$fileFolderMap.Values | Select-Object -Unique | ForEach-Object { Ensure-Dir $_ }

# Di chuyển mọi file HTML (trừ main.html, _archive) theo map
Get-ChildItem $mobileRoot -Filter '*.html' -Recurse -File | ForEach-Object {
    $name = $_.Name
    if ($name -eq 'main.html') { return }
    if ($_.FullName -match '[\\/]_archive[\\/]') { return }
    if (-not $fileFolderMap.ContainsKey($name)) {
        return
    }
    $destDir = Join-Path $mobileRoot ($fileFolderMap[$name] -replace '/', [IO.Path]::DirectorySeparatorChar)
    $dest = Join-Path $destDir $name
    if ($_.FullName -eq $dest) {
        Write-Host "Already in place: $name"
        return
    }
    if (Test-Path $dest) { Remove-Item $dest -Force }
    Move-Item $_.FullName $dest -Force
    Write-Host "Moved: $name -> $($fileFolderMap[$name])/"
}

# Xóa folder khac/tai-san nếu rỗng
$oldTaiSan = Join-Path $mobileRoot 'khac\tai-san'
if (Test-Path $oldTaiSan) {
    $remaining = Get-ChildItem $oldTaiSan -Recurse -File -ErrorAction SilentlyContinue
    if (-not $remaining) {
        Remove-Item $oldTaiSan -Recurse -Force -ErrorAction SilentlyContinue
        Write-Host "Removed empty: khac/tai-san"
    }
}

if (Test-Path $jsonPath) {
    $json = Get-Content $jsonPath -Raw -Encoding UTF8 | ConvertFrom-Json
    $tabs = $json.tabs
    $compact = ($tabs | ConvertTo-Json -Depth 20 -Compress)
    $js = "var MENU = $compact;"
    [IO.File]::WriteAllText($outJs, $js, [Text.UTF8Encoding]::new($false))
    Write-Host "Updated: menu-tree.js"
}

Write-Host "Done."
