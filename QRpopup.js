function showPopup() {
  let popup = document.getElementById('qrPopup');
  let popupContent = document.querySelector('.popup-content');

  popup.style.display = 'flex'; // Show popup background
  popupContent.style.display = 'block'; // Show popup content

  // Generate QR code inside the popup
  let popupQR = document.getElementById('popupQRCode');
  popupQR.innerHTML = ''; // Clear previous QR code

  new QRCode(popupQR, {
    text: 'Your QR Code Data Here', // Replace with actual data
    width: 200,
    height: 200,
  });
}

function closePopup() {
  document.getElementById('qrPopup').style.display = 'none';
  document.querySelector('.popup-content').style.display = 'none';
}
