# Tổ chức mockups/web theo cây menu Menu_DMS.xlsx
# Chạy: powershell -File DMS_Salesman_mockup/scripts/reorganize-mockup-web.ps1

$ErrorActionPreference = 'Stop'
$webRoot = (Join-Path $PSScriptRoot '..\mockups\web' | Resolve-Path).Path
$jsonPath = Join-Path $webRoot 'menu_data.json'
$outJs = Join-Path $webRoot 'menu-tree.js'
$specsDir = Join-Path $webRoot '_specs'

function Get-Slug([string]$s) {
    if (-not $s) { return '' }
    $t = $s.ToLower().Replace([char]0x0111, 'd').Replace([char]0x0110, 'd')
    $normalized = $t.Normalize([Text.NormalizationForm]::FormD)
    $sb = New-Object System.Text.StringBuilder
    foreach ($c in $normalized.ToCharArray()) {
        $cat = [Globalization.CharUnicodeInfo]::GetUnicodeCategory($c)
        if ($cat -ne [Globalization.UnicodeCategory]::NonSpacingMark) {
            [void]$sb.Append($c)
        }
    }
    return ($sb.ToString() -replace '[^a-z0-9]+', '-').Trim('-')
}

$fileFolderMap = @{
    'MS-W-DTCH01-dieu-chinh-tan-suat-ngay-di-tuyen.html'              = 'giam-sat/dinh-tuyen'
    'MS-W-BC01-ton-kho-tai-san.html'                                  = 'danh-muc/tai-san/bao-cao-tai-san/bao-cao-ton-kho-hien-tai-tai-san'
    'MS-W-CK01-danh-sach-chuyen-kho.html'                              = 'danh-muc/tai-san/chuyen-kho-tai-san'
    'MS-W-CK02-chi-tiet-chuyen-kho.html'                              = 'danh-muc/tai-san/chuyen-kho-tai-san'
    'MS-W-CK03-tao-moi-chuyen-kho.html'                               = 'danh-muc/tai-san/chuyen-kho-tai-san'
    'MS-W-CK04-chinh-sua-chuyen-kho.html'                             = 'danh-muc/tai-san/chuyen-kho-tai-san'
    'MS-W-DKTS01-duyet-dang-ky-cap-phat-tai-san.html'                 = 'danh-muc/tai-san/duyet-dang-ky-cap-phat-thu-hoi-tai-san'
    'MS-W-CTTB01-cai-dat-phan-thuong-bo-sung.html'                    = 'danh-muc/chuong-trinh-trung-bay/thong-tin-tra-thuong-theo-giai-doan'
    'MS-W-CTTB02-phan-thuong-bo-sung-theo-han-muc.html'               = 'danh-muc/chuong-trinh-trung-bay/thong-tin-tra-thuong-theo-giai-doan'
    'MS-W-DL01-phan-bo-thu-cong-gan-tai-xe.html'                      = 'giam-sat/giao-hang/quan-ly-don-giao-hang'
    'WEB-CP-B3-don-giao-hang-phan-bo.html'                            = 'giam-sat/giao-hang/quan-ly-don-giao-hang'
    'WEB-CP-B4-phan-bo-thu-cong-gan-tai-xe.html'                      = 'giam-sat/giao-hang/phan-bo-thu-cong-gan-tai-xe'
    'MS-W-DL02-cai-dat-vung-giao-hang-tai-xe.html'                    = 'giam-sat/giao-hang/cai-dat-vung-giao-hang-cho-tai-xe'
    'WEB-CP-A4-cau-hinh-khu-vuc-tai-xe.html'                          = 'giam-sat/giao-hang/cau-hinh-khu-vuc-giao-hang-theo-tuyen'
    'MS-W-DL03-bao-cao-doi-soat-tien-thu-giao-hang.html'              = 'giam-sat/giao-hang/bao-cao-doi-soat-tien-thu-giao-hang'
    'US-AI-check-button-states.html'                                  = 'danh-muc/xac-minh/yeu-cau-xac-minh'
    'MS-W-BCNXT01-nhap-xuat-ton-tai-san.html'                         = 'danh-muc/tai-san/bao-cao-tai-san/bao-cao-nhap-xuat-ton-tai-san'
    'MS-W-BCKKTTTS01-bao-cao-kiem-ke-tinh-trang-tai-san.html'         = 'danh-muc/tai-san/bao-cao-tai-san/bao-cao-kiem-ke-tai-san'
    'MS-W-BCKTTKSP01-bao-cao-lich-su-kiem-tra-ton-kho-san-pham.html' = 'danh-muc/tai-san/bao-cao-tai-san/bao-cao-kiem-ke-tai-san'
}

$explicitHrefsById = @{
    'dinh-tuyen'                                    = 'giam-sat/dinh-tuyen/MS-W-DTCH01-dieu-chinh-tan-suat-ngay-di-tuyen.html'
    'chuyen-kho-tai-san'                            = 'danh-muc/tai-san/chuyen-kho-tai-san/MS-W-CK01-danh-sach-chuyen-kho.html'
    'duyet-dang-ky-cap-phat-thu-hoi-tai-san'        = 'danh-muc/tai-san/duyet-dang-ky-cap-phat-thu-hoi-tai-san/MS-W-DKTS01-duyet-dang-ky-cap-phat-tai-san.html'
    'bao-cao-ton-kho-hien-tai-tai-san'              = 'danh-muc/tai-san/bao-cao-tai-san/bao-cao-ton-kho-hien-tai-tai-san/MS-W-BC01-ton-kho-tai-san.html'
    'bao-cao-kiem-ke-tai-san'                       = 'danh-muc/tai-san/bao-cao-tai-san/bao-cao-kiem-ke-tai-san/MS-W-BCKKTTTS01-bao-cao-kiem-ke-tinh-trang-tai-san.html'
    'bao-cao-nhap-xuat-ton-tai-san'                 = 'danh-muc/tai-san/bao-cao-tai-san/bao-cao-nhap-xuat-ton-tai-san/MS-W-BCNXT01-nhap-xuat-ton-tai-san.html'
    'yeu-cau-xac-minh'                              = 'danh-muc/xac-minh/yeu-cau-xac-minh/US-AI-check-button-states.html'
    'thong-tin-tra-thuong-theo-giai-doan'           = 'danh-muc/chuong-trinh-trung-bay/thong-tin-tra-thuong-theo-giai-doan/MS-W-CTTB01-cai-dat-phan-thuong-bo-sung.html'
    'quan-ly-don-giao-hang'                         = 'giam-sat/giao-hang/quan-ly-don-giao-hang/WEB-CP-B3-don-giao-hang-phan-bo.html'
    'cau-hinh-khu-vuc-giao-hang-theo-tuyen'         = 'giam-sat/giao-hang/cau-hinh-khu-vuc-giao-hang-theo-tuyen/WEB-CP-A4-cau-hinh-khu-vuc-tai-xe.html'
    'bao-cao-doi-soat-tien-thu-giao-hang'           = 'giam-sat/giao-hang/bao-cao-doi-soat-tien-thu-giao-hang/MS-W-DL03-bao-cao-doi-soat-tien-thu-giao-hang.html'
}

function Ensure-Dir([string]$relPath) {
    if (-not $relPath) { return }
    $full = Join-Path $webRoot ($relPath -replace '/', [IO.Path]::DirectorySeparatorChar)
    if (-not (Test-Path $full)) { New-Item -ItemType Directory -Path $full -Force | Out-Null }
}

function Get-HrefForPath([string]$folderPath) {
    if (-not $folderPath) { return $null }
    $full = Join-Path $webRoot ($folderPath -replace '/', [IO.Path]::DirectorySeparatorChar)
    if (-not (Test-Path $full)) { return $null }
    $htmls = Get-ChildItem $full -Filter '*.html' -File | Sort-Object Name
    if ($htmls.Count -eq 1) { return ($folderPath + '/' + $htmls[0].Name) -replace '\\', '/' }
    return $null
}

function Set-Hrefs($nodes) {
    foreach ($n in $nodes) {
        if ($n.children -and $n.children.Count -gt 0) {
            Set-Hrefs $n.children
        } elseif ($n.path -and -not $n.href) {
            $n.href = Get-HrefForPath $n.path
        }
    }
}

function Apply-ExplicitHrefs($nodes) {
    foreach ($n in $nodes) {
        if ($explicitHrefsById.ContainsKey($n.id)) { $n.href = $explicitHrefsById[$n.id] }
        if ($n.children) { Apply-ExplicitHrefs $n.children }
    }
}

function Strip-Path($nodes) {
    foreach ($n in $nodes) {
        if ($null -ne $n.PSObject.Properties['path']) {
            $n.PSObject.Properties.Remove('path')
        }
        if ($n.children -and $n.children.Count -gt 0) { Strip-Path $n.children }
    }
}

# --- 1. Spec .md → _specs ---
if (-not (Test-Path $specsDir)) { New-Item -ItemType Directory -Path $specsDir | Out-Null }
Get-ChildItem $webRoot -Filter '*.md' -File | ForEach-Object {
    Move-Item $_.FullName (Join-Path $specsDir $_.Name) -Force
}

# --- 2. Di chuyển HTML (tìm cả file đã nằm trong subfolder) ---
foreach ($kv in $fileFolderMap.GetEnumerator()) {
    $found = Get-ChildItem $webRoot -Filter $kv.Key -Recurse -File -ErrorAction SilentlyContinue | Select-Object -First 1
    if (-not $found) { continue }
    $destDir = Join-Path $webRoot ($kv.Value -replace '/', [IO.Path]::DirectorySeparatorChar)
    if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir -Force | Out-Null }
    $dest = Join-Path $destDir $kv.Key
    if (Test-Path $dest) {
        $srcLen = (Get-Item $found.FullName).Length
        $destLen = (Get-Item $dest).Length
        if ($destLen -ge $srcLen) { continue }
    }
    if ($found.FullName -ne $dest) { Move-Item $found.FullName $dest -Force }
}

# --- 3. Tạo folder + menu-tree.js ---
$rows = Get-Content $jsonPath -Raw -Encoding UTF8 | ConvertFrom-Json
$menu = [System.Collections.ArrayList]@()
$l1 = $null; $l2 = $null; $l3 = $null

foreach ($row in $rows) {
    if ($row.A -eq 'Level 1' -or ($row.A -eq '' -and $row.B -eq '' -and $row.C -eq '' -and $row.D -eq '')) { continue }

    if ($row.A) {
        $l1slug = Get-Slug $row.A
        $l1 = [ordered]@{ label = $row.A; id = $l1slug; path = $l1slug; children = @() }
        [void]$menu.Add($l1)
        Ensure-Dir $l1slug
        $l2 = $null; $l3 = $null
    }
    if ($row.B) {
        $l2slug = Get-Slug $row.B
        $l2path = "$($l1.path)/$l2slug"
        $l2 = [ordered]@{ label = $row.B; id = $l2slug; path = $l2path; children = @(); href = $null }
        $l1.children += $l2
        Ensure-Dir $l2path
        $l3 = $null
    }
    if ($row.C) {
        $l3slug = Get-Slug $row.C
        $l3path = "$($l2.path)/$l3slug"
        $l3 = [ordered]@{ label = $row.C; id = $l3slug; path = $l3path; children = @(); href = (Get-HrefForPath $l3path) }
        $l2.children += $l3
        Ensure-Dir $l3path
    }
    if ($row.D) {
        $l4slug = Get-Slug $row.D
        $l4path = "$($l3.path)/$l4slug"
        $n = [ordered]@{ label = $row.D; id = $l4slug; path = $l4path; href = (Get-HrefForPath $l4path) }
        $l3.children += $n
        Ensure-Dir $l4path
    }
}

Set-Hrefs $menu
Apply-ExplicitHrefs $menu
Strip-Path $menu

$js = 'var MENU = ' + ($menu | ConvertTo-Json -Depth 25 -Compress) + ';'
[System.IO.File]::WriteAllText($outJs, $js, [System.Text.UTF8Encoding]::new($false))

Write-Host "Done. Web root: $webRoot"
Write-Host "L1 folders: $($menu.Count)"
