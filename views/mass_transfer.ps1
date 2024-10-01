# Define source and destination base directories
$sourceBase = "C:\Users\MattS\dev-src-local"
$destinationBase = "Z:"

# List of relative paths to be transferred
$files = @(
    "\pyramid\config\asbCases\asb_case.json",
    "\pyramid\config\asbCases\asb_config.json",
    "\pyramid\config\asbCases\asb_menu.json",
    "\pyramid\config\asbCases\asb_points.json",
    "\pyramid\config\asbCases\asb_route.json",
    "\pyramid\config\callLog\cl_config.json",
    "\pyramid\config\callLog\cl_content.json",
    "\pyramid\config\callLog\cl_log.json",
    "\pyramid\config\ccc\ccc_config.json",
    "\pyramid\config\ccc\ccc_log.json",
    "\pyramid\config\ccc\ccc_menu.json",
    "\pyramid\config\ccc\setup\ccc_points.json",
    "\pyramid\config\incidentLogs\il_config.json",
    "\pyramid\config\incidentLogs\il_log.json",
    "\pyramid\config\nominalLedger\nl_hmvatr.json",
    "\pyramid\config\nominalLedger\nl_mtd.json",
    "\pyramid\config\propertyComponents\pc_route.json",
    "\pyramid\config\propertyComponents\pc_stage.json",
    "\pyramid\config\repairOrders\ro_repair.json",
    "\pyramid\config\repairOrders\setup\ro_qc_points.json",
    "\pyramid\config\repairOrders\setup\ro_qs_points.json",
    "\pyramid\config\safeguardingLogs\sc_config.json",
    "\pyramid\config\safeguardingLogs\sc_log.json",
    "\pyramid\config\supportingPeople\sp_client.json",
    "\pyramid\config\supportingPeople\sp_clients.json",
    "\pyramid\config\supportingPeople\sp_clients_breakdown.json",
    "\pyramid\config\supportingPeople\sp_config.json",
    "\pyramid\config\supportingPeople\sp_menu.json",
    "\pyramid\config\supportingPeople\sp_scheme.json",
    "\pyramid\config\system\partner.json",
    "\pyramid\config\system\stranger.json",
    "\pyramid\config\voidMonitoring\vm_routes.json",
    "\pyramid\config\voidMonitoring\vm_stdroute.json",
    "\pyramid\config\waitingList\setup\wait_points.json",
    "\pyramid\config\waitingList\wlapp_details.json"
)

# Loop through each file, create necessary directories, and copy the file
foreach ($file in $files) {
    # Construct full paths for source and destination
    $sourcePath = Join-Path $sourceBase $file
    $destinationPath = Join-Path $destinationBase $file

    # Ensure the destination directory exists
    $destinationDir = Split-Path $destinationPath
    if (!(Test-Path $destinationDir)) {
        New-Item -Path $destinationDir -ItemType Directory -Force
    }

    # Copy the file from source to destination
    Copy-Item -Path $sourcePath -Destination $destinationPath -Force
}

Write-Host "File transfer completed."
