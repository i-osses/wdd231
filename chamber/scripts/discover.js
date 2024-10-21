// Visitors tracking ford discover.html
const lastVisit = localStorage.getItem('lastVisit');
const currentTime = Date.now();
let message;

if (lastVisit) {
  const daysBetween = Math.floor((currentTime - lastVisit) / (1000 * 60 * 60 * 24));
  if (daysBetween < 1) {
    message = "Back so soon! Awesome!";
  } else if (daysBetween === 1) {
    message = "You last visited 1 day ago.";
  } else {
    message = `You last visited ${daysBetween} days ago.`;
  }
} else {
  message = "Welcome! Let us know if you have any questions.";
}

localStorage.setItem('lastVisit', currentTime);
document.getElementById('visitorMessage').textContent = message;
