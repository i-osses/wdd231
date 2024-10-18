// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
document.getElementById('display-first-name').textContent = urlParams.get('first-name');
document.getElementById('display-last-name').textContent = urlParams.get('last-name');
document.getElementById('display-email').textContent = urlParams.get('email');
document.getElementById('display-phone').textContent = urlParams.get('phone');
document.getElementById('display-business-name').textContent = urlParams.get('business-name');
document.getElementById('display-timestamp').textContent = urlParams.get('timestamp');
