document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('accountForm');
    const saveButton = document.getElementById('saveButton');
    const loadingSpinner = document.getElementById('loadingSpinner');
  
    form.addEventListener('submit', function() {
      // Show the spinner
      loadingSpinner.style.display = 'inline-block';
      // Disable the save button to prevent multiple submissions
      saveButton.disabled = true;
    });
});