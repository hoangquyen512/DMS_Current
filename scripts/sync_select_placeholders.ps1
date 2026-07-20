# Sync select placeholders to field labels (SAFE).
# Only updates <select id="..."> linked via label[for], or tight
# label → portal-select-wrap → select blocks (no cross-page backtracking).
$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..\mockups')).Path
$Chon = 'Ch' + [char]0x1ECD + 'n'  # Chọn

function Clean-Label([string]$html) {
  $t = [regex]::Replace($html, '<[^>]+>', '')
  $t = $t.Replace('*', '').Replace([char]0xA0, ' ').Trim()
  $t = [regex]::Replace($t, '\s+', ' ')
  $t = [regex]::Replace($t, '\s*MỚI\s*$', '').Trim()
  return $t
}

function Test-GenericPh([string]$ph) {
  $p = $ph.Trim()
  if ([string]::IsNullOrEmpty($p)) { return $true }
  if ($p -eq $script:Chon) { return $true }
  if ($p.StartsWith($script:Chon) -and $p.Length -lt 40) { return $true }
  return $false
}

$ignoreCase = [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
# IMPORTANT: do NOT use Singleline on patterns that can span multiple labels
$changed = New-Object System.Collections.Generic.List[string]
$utf8NoBom = New-Object System.Text.UTF8Encoding $false

Get-ChildItem -Path $root -Recurse -Filter '*.html' | ForEach-Object {
  if ($_.FullName -match '\\_archive\\') { return }
  $text = [IO.File]::ReadAllText($_.FullName, [Text.Encoding]::UTF8)
  $orig = $text

  # 1) label.portal-field__label[for=id] → select#id first placeholder
  $labelRx = New-Object System.Text.RegularExpressions.Regex(
    '<label([^>]*)class="[^"]*portal-field__label[^"]*"([^>]*)>([^<]*(?:<[^/][^>]*>[^<]*</[^>]+>[^<]*)*)</label>',
    $ignoreCase)

  foreach ($lm in $labelRx.Matches($orig)) {
    $attrs = $lm.Groups[1].Value + $lm.Groups[2].Value
    $label = Clean-Label $lm.Groups[3].Value
    if ([string]::IsNullOrEmpty($label)) { continue }
    $idm = [regex]::Match($attrs, 'for="([^"]+)"')
    if (-not $idm.Success) { continue }
    $sid = [regex]::Escape($idm.Groups[1].Value)
    $pat = '(<select[^>]*\bid="' + $sid + '"[^>]*>\s*)(<option\s+value=""\s+(?:selected\s+)?hidden\s*>)([^<]*)(</option>)'
    $selRx = New-Object System.Text.RegularExpressions.Regex($pat, $ignoreCase)
    $sm = $selRx.Match($text)
    if ($sm.Success) {
      $cur = $sm.Groups[3].Value.Trim()
      if (($cur -ne $label) -and (Test-GenericPh $cur)) {
        $rep = $sm.Groups[1].Value + $sm.Groups[2].Value + $label + $sm.Groups[4].Value
        $text = $text.Remove($sm.Index, $sm.Length).Insert($sm.Index, $rep)
      }
    }
  }

  # 2) Tight block: label → optional wrap → select (same field only; no Singleline)
  $tightRx = New-Object System.Text.RegularExpressions.Regex(
    '<label class="portal-field__label">([^<]*(?:<span[^>]*>[^<]*</span>[^<]*)*)</label>\s*<div class="portal-field__control[^"]*"[^>]*>\s*<select[^>]*>\s*(<option\s+value=""\s+(?:selected\s+)?hidden\s*>)([^<]*)(</option>)',
    $ignoreCase)
  $sb = New-Object System.Text.StringBuilder
  $last = 0
  foreach ($m in $tightRx.Matches($text)) {
    [void]$sb.Append($text.Substring($last, $m.Index - $last))
    $lab = Clean-Label $m.Groups[1].Value
    $ph = $m.Groups[3].Value
    if ((-not [string]::IsNullOrEmpty($lab)) -and (Test-GenericPh $ph) -and ($ph.Trim() -ne $lab)) {
      $chunk = $m.Value.Remove($m.Groups[3].Index - $m.Index, $m.Groups[3].Length).Insert($m.Groups[3].Index - $m.Index, $lab)
      [void]$sb.Append($chunk)
    } else {
      [void]$sb.Append($m.Value)
    }
    $last = $m.Index + $m.Length
  }
  [void]$sb.Append($text.Substring($last))
  $text = $sb.ToString()

  # 3) filter-label → select (same field; no Singleline)
  $filterRx = New-Object System.Text.RegularExpressions.Regex(
    '<div class="filter-label">([^<]*)</div>\s*<select[^>]*>\s*(<option\s+value=""\s+(?:selected\s+)?hidden\s*>)([^<]*)(</option>)',
    $ignoreCase)
  $sb2 = New-Object System.Text.StringBuilder
  $last2 = 0
  foreach ($m in $filterRx.Matches($text)) {
    [void]$sb2.Append($text.Substring($last2, $m.Index - $last2))
    $lab = Clean-Label $m.Groups[1].Value
    $ph = $m.Groups[3].Value
    if ((-not [string]::IsNullOrEmpty($lab)) -and (Test-GenericPh $ph) -and ($ph.Trim() -ne $lab)) {
      $chunk = $m.Value.Remove($m.Groups[3].Index - $m.Index, $m.Groups[3].Length).Insert($m.Groups[3].Index - $m.Index, $lab)
      [void]$sb2.Append($chunk)
    } else {
      [void]$sb2.Append($m.Value)
    }
    $last2 = $m.Index + $m.Length
  }
  [void]$sb2.Append($text.Substring($last2))
  $text = $sb2.ToString()

  # 4) Strip disabled on filter* selects (cascade must stay clickable)
  $disRx = New-Object System.Text.RegularExpressions.Regex(
    '(<select[^>]*\bid="filter[^"]*"[^>]*)\s+disabled(\s|>)',
    $ignoreCase)
  $text = $disRx.Replace($text, '$1$2')

  if ($text -ne $orig) {
    [IO.File]::WriteAllText($_.FullName, $text, $utf8NoBom)
    $rel = $_.FullName.Substring($root.Length).TrimStart('\')
    $changed.Add($rel) | Out-Null
  }
}

Write-Output ("updated " + $changed.Count)
$changed | ForEach-Object { Write-Output $_ }
