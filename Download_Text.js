// Function to download encrypted text as a file
function downloadText() {
  let text = document.getElementById('output').value.trim(); // Trim spaces

  if (!text) {
    alert(
      'No content to download! Please generate an encrypted message first.'
    );
    return;
  }

  // Get current date & time
  let now = new Date();
  let day = String(now.getDate()).padStart(2, '0'); // Get day with leading zero
  let month = now.toLocaleString('en-US', { month: 'short' }).toUpperCase(); // Get month in uppercase (e.g., "FEB")
  let year = now.getFullYear();
  let time = now.toTimeString().split(' ')[0].replace(/:/g, ''); // Get HHMMSS format

  // Filename in the requested format
  let fileName = `Encrypted_Message_${day}_${month}_${year}_${time}.txt`;

  // Create the file and trigger download
  let blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  let link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link); // Cleanup

  URL.revokeObjectURL(link.href); // Free memory

  // Show success message
  setTimeout(() => alert(`Download Successful!\nFile: ${fileName}`), 500);
}
