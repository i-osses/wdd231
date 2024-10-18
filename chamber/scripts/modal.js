// Modal control for Join Us
const joinModal = document.getElementById("joinModal");
const openJoinModalButton = document.getElementById("openJoinModal");

openJoinModalButton.onclick = function () {
  joinModal.style.display = "flex"; // Open modal
}

function closeJoinModal() {
  joinModal.style.display = "none"; // Close modal
}

// Close modal when clicking outside of modal content
window.onclick = function (event) {
  if (event.target == joinModal) {
    closeJoinModal(); 
  }
}