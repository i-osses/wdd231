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

// Certificates section

function displayCourses(coursesToDisplay) {
  const listElement = document.getElementById('coursesList');
  listElement.innerHTML = ''; // Clear existing list

  // Create course elements
  coursesToDisplay.forEach(course => {
      const courseElement = document.createElement('div');
      courseElement.className = 'course-name';
      courseElement.textContent = `${course.subject} ${course.number}: ${course.title}`;
      courseElement.onclick = () => toggleCourseDetails(course);

      listElement.appendChild(courseElement);
  });
}

function toggleCourseDetails(course) {
  let existingDetails = document.getElementById(`course-${course.number}`);

  if (existingDetails) {
    // If the details already exist, toggle visibility
    existingDetails.style.display = existingDetails.style.display === 'none' ? 'block' : 'none';
  } else {
    // Create and append course details if they don't exist yet
    const detailsElement = document.createElement('div');
    detailsElement.id = `course-${course.number}`;
    detailsElement.className = course.completed ? 'course-details completed' : 'course-details';
    detailsElement.innerHTML = `
      <h3>${course.subject} ${course.number}: ${course.title}</h3>
      <p><strong>Credits:</strong> ${course.credits}</p>
      <p><strong>Certificate:</strong> ${course.certificate}</p>
      <p><strong>Description:</strong> ${course.description}</p>
      <p><strong>Technology:</strong> ${course.technology.join(', ')}</p>
    `;
    
    // Append the new details div and ensure it's visible immediately
    document.getElementById('coursesList').appendChild(detailsElement);
    detailsElement.style.display = 'block';
  }
}


function filterCourses(subject) {
  if (subject === 'All') {
      displayCourses(courses);
  } else {
      const filteredCourses = courses.filter(course => course.subject === subject);
      displayCourses(filteredCourses);
  }
}

function calculateTotalCredits() {
  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
  document.getElementById('creditsCount').textContent = totalCredits;
}


document.addEventListener("DOMContentLoaded", function() {
  displayCourses(courses);
  calculateTotalCredits();
  displayFooterDate();
  menuToggle();

});