document.addEventListener("DOMContentLoaded", () => {
  const welcomeMessageElement = document.getElementById("welcome-message");
  
  const lastVisit = localStorage.getItem("lastVisit");
  const currentVisit = new Date();
  const currentVisitDate = currentVisit.toDateString();

  if (lastVisit) {
    const lastVisitDate = new Date(lastVisit).toDateString();

    if (lastVisitDate === currentVisitDate) {
      // User visited already today
      welcomeMessageElement.textContent = "Welcome back!";
    } else {
      // More than one day since the last visit
      welcomeMessageElement.textContent = "Good to have you back.";
    }
  } else {
    // First visit
    welcomeMessageElement.textContent = "Welcome to our dealership!";
  }
  localStorage.setItem("lastVisit", currentVisit);
});
