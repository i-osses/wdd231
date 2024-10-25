const urlParams = new URLSearchParams(window.location.search);
const firstName = urlParams.get('first_name');
const inquiry = urlParams.get('inquiry');

if (firstName) {
  document.getElementById('customerName').textContent = firstName;
}
if (inquiry) {
  document.getElementById('customerInquiry').textContent = inquiry;
}