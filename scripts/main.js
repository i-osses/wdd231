function displayFooterDate() {
  const year = new Date().getFullYear();
  const currentYearElement = document.querySelector("#currentyear");
  const lastModifyElement = document.querySelector("#lastmodify");

  if (currentYearElement) {
    currentYearElement.textContent = year;
  }

  if (lastModifyElement) {
    const lastModify = new Date(document.lastModified);
    lastModifyElement.textContent = lastModify.toLocaleDateString();
  }
}

function menuToggle() {
  const mainnav = document.querySelector('.navigation');
  const hambutton = document.querySelector('#menu');

  if (hambutton) {
    hambutton.addEventListener('click', () => {
      if (mainnav) {
        mainnav.classList.toggle('show');
      }
      hambutton.classList.toggle('show');
    });
  }
}
document.addEventListener("DOMContentLoaded", function() {
  displayFooterDate();
  menuToggle();
});