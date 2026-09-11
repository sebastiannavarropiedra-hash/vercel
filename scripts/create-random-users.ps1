$apiUrl = 'https://backendportfolio-8r5l.onrender.com/api/usuarios'
$created = 0
$failed = 0
$failures = @()

1..100 | ForEach-Object {
    $index = $_
    $suffix = [Guid]::NewGuid().ToString('N').Substring(0, 8)
    $body = @{
        Nombre_Usuario = "UsuarioRandom_${index}_${suffix}"
        Credencial_Espacial = "PerfilRandom_${index}_${suffix}"
        ID_Perfil = Get-Random -Minimum 1 -Maximum 4
    } | ConvertTo-Json

    try {
        Invoke-RestMethod -Uri $apiUrl -Method Post -ContentType 'application/json' -Body $body | Out-Null
        $created++
    }
    catch {
        $failed++
        $failures += "${index}: $($_.Exception.Message)"
    }
}

Write-Output "Created: $created"
Write-Output "Failed: $failed"
if ($failures.Count -gt 0) {
    $failures | Select-Object -First 10
}
