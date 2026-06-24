# Gắn portal header (ecodms) vào file HTML mockup con
param(
    [string]$TargetDir = ""
)

$ErrorActionPreference = 'Stop'
$webRoot = (Join-Path $PSScriptRoot '..\mockups\web' | Resolve-Path).Path
if ($TargetDir) { $searchRoot = $TargetDir } else { $searchRoot = $webRoot }

$fontLink = '<link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap" rel="stylesheet"/>'

$portalMarker = 'id="portal-chrome-root"'

Get-ChildItem $searchRoot -Filter '*.html' -Recurse -File | Where-Object {
    $_.Name -ne 'main.html' -and $_.FullName -notlike '*\_shared\*'
} | ForEach-Object {
    $file = $_.FullName
    $rel = $_.FullName.Substring($webRoot.Length).TrimStart('\', '/')
    $depth = ($rel -split '[\\/]').Count - 1
    $base = if ($depth -le 0) { '' } else { ('../' * $depth) }
    $hasSwitcher = (Select-String -Path $file -Pattern 'class="switcher"' -Quiet)

    $html = Get-Content $file -Raw -Encoding UTF8
    if ($html -match [regex]::Escape($portalMarker)) {
        Write-Host "Skip (da co portal): $rel"
        return
    }

  # head: font + portal css
    if ($html -notmatch 'portal-chrome\.css') {
        $cssLink = '<link rel="stylesheet" href="' + $base + '_shared/portal-chrome.css"/>'
        if ($html -match '</head>') {
            $injectHead = $fontLink + "`n" + $cssLink + "`n"
            if ($html -notmatch 'fonts\.googleapis\.com') { $html = $html -replace '</head>', ($injectHead + '</head>') }
            else { $html = $html -replace '</head>', ($cssLink + "`n</head>") }
        }
    }

  # body attributes
    $bodyClass = 'portal-page' + $(if ($hasSwitcher) { ' has-portal-switcher' } else { '' })
    if ($html -match '<body[^>]*>') {
        $html = $html -replace '<body[^>]*>', ('<body class="' + $bodyClass + '" data-portal-base="' + $base + '">')
    }

  # portal mount + wrap content
    $chromeMount = '<div id="portal-chrome-root"></div>' + "`n" + '<div class="portal-page-body">' + "`n"
    $html = $html -replace '<body class="[^"]*" data-portal-base="[^"]*">', ('<body class="' + $bodyClass + '" data-portal-base="' + $base + '">' + "`n" + $chromeMount)

  # scripts before </body>
    $scripts = @(
        '<script src="' + $base + 'menu-tree.js"></script>'
        '<script src="' + $base + '_shared/portal-menu.js"></script>'
        '<script src="' + $base + '_shared/portal-chrome.js"></script>'
    ) -join "`n"
    if ($html -notmatch 'portal-chrome\.js') {
        $html = $html -replace '</body>', ($scripts + "`n</body>")
    }

  # close portal-page-body
    if ($html -notmatch '</div>\s*</body>' -or $html -notmatch 'portal-page-body') {
        $html = $html -replace '</body>', ('</div><!-- /portal-page-body -->' + "`n</body>")
    }

    [System.IO.File]::WriteAllText($file, $html, [System.Text.UTF8Encoding]::new($false))
    Write-Host "Patched: $rel (depth=$depth)"
}

Write-Host 'Done patch portal chrome.'
