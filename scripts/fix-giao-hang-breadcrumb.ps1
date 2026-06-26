# Cập nhật breadcrumb mockup Giao hàng → Giám sát / Giao hàng
$root = Join-Path $PSScriptRoot '..\mockups\web\giam-sat\giao-hang' | Resolve-Path
Get-ChildItem $root -Recurse -Filter '*.html' | ForEach-Object {
    $c = [IO.File]::ReadAllText($_.FullName)
    $orig = $c
    $c = $c.Replace('<a href="#">Trang chủ</a> / <a href="#">Giao hàng</a> /', 'Giám sát / Giao hàng /')
    $c = $c.Replace('<a href="#">Trang chủ</a> / <a href="#">Giao hàng</a>', 'Giám sát / Giao hàng')
    $c = $c.Replace('<a href="#">Trang chủ</a> / Phân bổ thủ công', 'Giám sát / Giao hàng / Phân bổ thủ công')
    if ($c -ne $orig) {
        [IO.File]::WriteAllText($_.FullName, $c, [Text.UTF8Encoding]::new($false))
        Write-Host "Updated: $($_.Name)"
    }
}
