// Copy encrypted text to clipboard
function copyToClipboard() {
  let output = document.getElementById('output');
  output.select();
  document.execCommand('copy');
  alert('Copied to clipboard!');
}
