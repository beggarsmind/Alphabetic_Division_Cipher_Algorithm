const divisionTable = {
  a: 26.0,
  b: 13.0,
  c: 8.67,
  d: 6.5,
  e: 5.2,
  f: 4.33,
  g: 3.71,
  h: 3.25,
  i: 2.89,
  j: 2.6,
  k: 2.36,
  l: 2.17,
  m: 2.0,
  n: 1.86,
  o: 1.73,
  p: 1.63,
  q: 1.53,
  r: 1.44,
  s: 1.37,
  t: 1.3,
  u: 1.24,
  v: 1.18,
  w: 1.13,
  x: 1.08,
  y: 1.04,
  z: 1.0,
};

// Precompute lookup tables
const divisionResults = {};
const reverseTable = {};

for (let char in divisionTable) {
  const transformedValue = Math.round(26 / divisionTable[char]);
  divisionResults[char] = transformedValue;
  reverseTable[transformedValue] = char;
}

// Generate a random key between 1 and 25
function generateKey() {
  return Math.floor(Math.random() * 25) + 1;
}

// Encrypt function
function encrypt(text, key = generateKey()) {
  if (!text) {
    alert('Please enter text to encrypt.');
    return '';
  }

  let encryptedText = '';

  for (let char of text) {
    let isUpperCase = char === char.toUpperCase();
    char = char.toLowerCase();

    if (char >= 'a' && char <= 'z') {
      const encryptedNum = (divisionResults[char] + key) % 26 || 26;
      let encryptedChar = String.fromCharCode(encryptedNum + 96);
      encryptedText += isUpperCase
        ? encryptedChar.toUpperCase()
        : encryptedChar;
    } else {
      encryptedText += char;
    }
  }

  const finalText = key.toString().padStart(2, '0') + encryptedText;
  saveToLocalStorage(finalText);
  return finalText;
}

// Decrypt function
function decrypt(text) {
  if (!text || text.length < 3) {
    alert('Invalid encrypted text. Make sure it includes the encryption key.');
    return '';
  }

  let key = parseInt(text.substring(0, 2));
  text = text.substring(2);
  let decryptedText = '';

  for (let char of text) {
    let isUpperCase = char === char.toUpperCase();
    char = char.toLowerCase();

    if (char >= 'a' && char <= 'z') {
      const encryptedNum = (char.charCodeAt(0) - 96 - key + 26) % 26 || 26;
      decryptedText += isUpperCase
        ? reverseTable[encryptedNum].toUpperCase()
        : reverseTable[encryptedNum];
    } else {
      decryptedText += char;
    }
  }

  return decryptedText;
}

// Save encrypted text to LocalStorage
function saveToLocalStorage(encryptedText) {
  let savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
  savedMessages.push(encryptedText);
  localStorage.setItem('messages', JSON.stringify(savedMessages));
  displaySavedMessages();
}

// Display saved messages
function displaySavedMessages() {
  let savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
  let list = document.getElementById('savedMessages');
  list.innerHTML = savedMessages.map((msg) => `<li>${msg}</li>`).join('');
}

// Encrypt input text
function encryptText() {
  let input = document.getElementById('textInput').value;
  let encrypted = encrypt(input);
  document.getElementById('output').value = encrypted;
}

// Decrypt input text
function decryptText() {
  let input = document.getElementById('output').value;
  let decrypted = decrypt(input);
  document.getElementById('output').value = decrypted;
}

// Generate QR Code
function generateQRCode() {
  let text = document.getElementById('output').value;
  document.getElementById('qrcode').innerHTML = '';
  new QRCode(document.getElementById('qrcode'), text);
}

//saved messages
// Example messages array (Replace with actual data)
const messages = Array.from({ length: 30 }, (_, i) => `Message ${i + 1}`);

function loadMessages() {
  const list = document.getElementById('savedMessages');
  list.innerHTML = ''; // Clear previous data

  messages.forEach((message) => {
    const listItem = document.createElement('li');
    listItem.textContent = message;
    list.appendChild(listItem);
  });
}

// Load messages on page load
window.onload = loadMessages;

// Load saved messages on page load
window.onload = displaySavedMessages;
