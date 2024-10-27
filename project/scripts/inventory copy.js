document.addEventListener("DOMContentLoaded", function() {
    getVehicles();
  

    const searchBtn = document.getElementById("searchBtn");
    searchBtn.addEventListener("click", function() {
        const query = document.getElementById("searchInput").value;
        filterVehicles(query); 
    });
  
   
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") { 
            const query = searchInput.value;
            filterVehicles(query);  
        }
    });
  
   
    const showAllBtn = document.getElementById("showAllBtn");
    showAllBtn.addEventListener("click", function() {
        searchInput.value = ''; 
        displayVehicles(vehiclesData); 
    });
  
    
    const sortLowToHighBtn = document.getElementById("sortLowToHighBtn");
    sortLowToHighBtn.addEventListener("click", function() {
        sortVehicles('lowToHigh');
    });
  
    const sortHighToLowBtn = document.getElementById("sortHighToLowBtn");
    sortHighToLowBtn.addEventListener("click", function() {
        sortVehicles('highToLow');
    });
  });
  
  const url = "data/vehicles.json";
  const cards = document.querySelector("#cards");
  let vehiclesData = []; 
  let displayedVehicles = []; 
  
  async function getVehicles() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        vehiclesData = data; 
        displayedVehicles = data; 
        displayVehicles(vehiclesData); 
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
  }
  
  function displayVehicles(vehicles) {
    cards.innerHTML = ''; 
    
    if (vehicles.length === 0) {
        cards.innerHTML = '<p>No vehicles found matching your search.</p>';
        return;
    }
  
    vehicles.forEach(vehicle => {
        const card = document.createElement("div");
        card.classList.add("vehicle-card");
        
        card.innerHTML = `
            <img src="${vehicle.image}" alt="${vehicle.make} ${vehicle.model}">
            <h2>${vehicle.make} ${vehicle.model} (${vehicle.year})</h2>
            <p>Price: $${vehicle.price.toLocaleString()}</p>
            <p>VIN: ${vehicle.vin}</p>
            <p>Color: ${vehicle.color}</p>
        `;
        
        card.addEventListener("click", function() {
            openModal(vehicle);
        });
        
        cards.appendChild(card);
    });
  
    displayedVehicles = vehicles;
  }
  
  function filterVehicles(query) {
    const filteredVehicles = vehiclesData.filter(vehicle => {
        const vinMatch = vehicle.vin.toLowerCase().includes(query.toLowerCase());
        const makeMatch = vehicle.make.toLowerCase().includes(query.toLowerCase());
        const modelMatch = vehicle.model.toLowerCase().includes(query.toLowerCase());
        const yearMatch = vehicle.year.toString().includes(query); 
  
        return vinMatch || makeMatch || modelMatch || yearMatch;
    });
  
    displayVehicles(filteredVehicles);
  }
  
  function sortVehicles(order) {
    let sortedVehicles;
    if (order === 'lowToHigh') {
        sortedVehicles = [...displayedVehicles].sort((a, b) => a.price - b.price);
    } else if (order === 'highToLow') {
        sortedVehicles = [...displayedVehicles].sort((a, b) => b.price - a.price);
    }
    displayVehicles(sortedVehicles);
  }
  
  function openModal(vehicle) {
    const modal = document.getElementById("vehicleModal");
    const modalTitle = document.getElementById("modalVehicleTitle");
    const modalImage = document.getElementById("modalVehicleImage");
    const modalDetails = document.getElementById("modalVehicleDetails");
    const modalPrice = document.getElementById("modalVehiclePrice");
  
    modalTitle.textContent = `${vehicle.make} ${vehicle.model} (${vehicle.year})`;
    modalImage.src = vehicle.image;
    modalDetails.innerHTML = `
        <p>VIN: ${vehicle.vin}</p>
        <p>Color: ${vehicle.color}</p>
    `;
    modalPrice.textContent = `Price: $${vehicle.price.toLocaleString()}`;
  
    modal.style.display = "block";
  }
  
  const closeModal = document.querySelector(".close");
  closeModal.addEventListener("click", function() {
    document.getElementById("vehicleModal").style.display = "none";
  });
  
  window.addEventListener("click", function(event) {
    const modal = document.getElementById("vehicleModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
  });
  