document.addEventListener('DOMContentLoaded', function() {
  const timestampInput = document.getElementById('timestamp');
  const currentDate = new Date(); 

  timestampInput.value = currentDate.toISOString();

  // Optional: Display the formatted timestamp somewhere on the page
  const formattedDate = currentDate.toLocaleString("en-US", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
  });

  // Create a timestamp display element
  const timestampDisplayElement = document.createElement("p");
  timestampDisplayElement.textContent = "Timestamp: " + formattedDate;
  timestampDisplayElement.style.display = "none";
  document.body.appendChild(timestampDisplayElement);

  console.log('Current Timestamp:', timestampInput.value); // For debugging
});

// Function to show modals
function showModal(modalId) {
  document.getElementById(modalId).style.display = "block";
}

// Function to close modals
function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// Close modal when clicking outside of it
window.onclick = function(event) {
  const modals = document.getElementsByClassName('modal');
  for (let modal of modals) {
      if (event.target === modal) {
          modal.style.display = "none";
      }
  }
};
