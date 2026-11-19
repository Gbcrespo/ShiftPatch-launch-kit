# Renders template.html to docs/gtm/assets/linkedin-template.png (1200x627).
# Usage: .\render.ps1 [-Headline "text"] [-Source "text"] [-Out path]
param(
  [string]$Headline = "",
  $Source = $null,
  [string]$Out = ""
)
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$repo = (Resolve-Path (Join-Path $here "..\..")).Path
if (-not $Out) { $Out = Join-Path $repo "docs\gtm\assets\linkedin-template.png" }
New-Item -ItemType Directory -Force (Split-Path -Parent $Out) | Out-Null
$tpl = Join-Path $here "template.html"
$url = "file:///" + $tpl.Replace('\','/').Replace(' ','%20')
$q = @()
if ($Headline) { $q += "h=" + [uri]::EscapeDataString($Headline) }
if ($null -ne $Source) { $q += "s=" + [uri]::EscapeDataString($Source) }
if ($q.Count) { $url += "?" + ($q -join "&") }
& $chrome --headless=new "--screenshot=$Out" --window-size=1200,627 --hide-scrollbars --default-background-color=FFFFFFFF $url | Out-Null
Start-Sleep -Milliseconds 500
Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile($Out)
"{0} -> {1}x{2}" -f $Out, $img.Width, $img.Height
$img.Dispose()
