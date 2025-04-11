# Run the first script, exit if it fails
node populateSpecialRules.js
if ($?) {
    Write-Host "populateSpecialRules.js completed successfully"
} else {
    Write-Host "Error running populateSpecialRules.js" -ForegroundColor Red
    exit
}

node populateUnitTypes.js
if ($?) {
    Write-Host "populateUnitTypes.js completed successfully"
} else {
    Write-Host "Error running populateUnitTypes.js" -ForegroundColor Red
    exit
}

node populateTerrainTypes.js
if ($?) {
    Write-Host "populateTerrainTypes.js completed successfully"
} else {
    Write-Host "Error running populateTerrainTypes.js" -ForegroundColor Red
    exit
}

node populateArmies.js
if ($?) {
    Write-Host "populateArmies.js completed successfully"
} else {
    Write-Host "Error running populateArmies.js" -ForegroundColor Red
    exit
}

node populateUnits.js
if ($?) {
    Write-Host "populateUnits.js completed successfully"
} else {
    Write-Host "Error running populateUnits.js" -ForegroundColor Red
    exit
}