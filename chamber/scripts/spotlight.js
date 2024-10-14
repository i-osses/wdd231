document.addEventListener("DOMContentLoaded", function() {
  displaySpotlightMembers();
});

const url = "data/members.json";
const spotlightSection = document.querySelector(".business_spotlights");

async function displaySpotlightMembers() {
  try {
      const response = await fetch(url);
      const data = await response.json();
     
      const qualifiedMembers = data.members.filter(member => member.membershipLevel === 3 || member.membershipLevel === 4 || member.membershipLevel === 5);

      
      const shuffledMembers = qualifiedMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

     
      spotlightSection.innerHTML = '';

     
      shuffledMembers.forEach(member => {
          let spotlightCard = document.createElement("div");
          spotlightCard.className = "spotlight-card";

          let name = document.createElement("h3");
          name.textContent = member.name;

          let logo = document.createElement("img");
          logo.setAttribute('src', member.image);
          logo.setAttribute('alt', `${member.name} Logo`);
          logo.className = "spotlight-logo";

          let phone = document.createElement("p");
          phone.textContent = `Phone: ${member.phone}`;

          let address = document.createElement("p");
          address.textContent = `Address: ${member.address}`;

          let websiteLink = document.createElement("a");
          websiteLink.href = member.website;
          websiteLink.textContent = "Visit Website";
          websiteLink.target = "_blank";

          let membershipLevel = document.createElement("p");
          membershipLevel.className = "star-rating"; 
          membershipLevel.setAttribute("data-stars", member.membershipLevel); 

          let blankLine = document.createElement("p");
          blankLine.textContent = ""; 
        

        
          spotlightCard.appendChild(logo);
          spotlightCard.appendChild(name);
          spotlightCard.appendChild(phone);
          spotlightCard.appendChild(address);
          spotlightCard.appendChild(websiteLink);

          spotlightCard.appendChild(blankLine);
          spotlightCard.appendChild(membershipLevel);


          
          spotlightSection.appendChild(spotlightCard);
              
        
      });

      
  } catch (error) {
      console.error("Error fetching members:", error);
  }
}
