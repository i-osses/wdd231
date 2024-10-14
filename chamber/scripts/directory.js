document.addEventListener("DOMContentLoaded", function(){
  getMembers();

})



const url = "data/members.json";
const cards = document.querySelector("#cards");

async function getMembers() {
  const response = await fetch(url);
  const data = await response.json();
  // console.table(data.members);
  displayMembers(data.members);
};  

const displayMembers = (members) => {
  members.forEach((member)=>{
    let card = document.createElement("section");
    card.className = "card_class"
    let name = document.createElement("h2");
    let address = document.createElement("p");
    let phone = document.createElement("p");

    let membershipLevel = document.createElement("p");
    membershipLevel.className = "star-rating"; 
    membershipLevel.setAttribute("data-stars", member.membershipLevel); 


    let website = document.createElement("p");
    let link = document.createElement("a");
    link.className = "card_link"
    let portrait = document.createElement('img');
    portrait.className = "img_members"
   
    
    portrait.setAttribute('src', member.image);
    portrait.setAttribute('alt', `Portrait of ${member.name}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    name.textContent = member.name;
    address.textContent = member.address;
    phone.textContent = member.phone;
    membershipLevel.textContent = '';


    link.href = member.website;
    link.textContent = member.website;
    link.target = "_blank";
    website.appendChild(link);
  

    card.appendChild(name);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(website);
    card.appendChild(portrait);
    card.appendChild(membershipLevel);


    cards.appendChild(card);
    }
  )
};

const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article");

gridbutton.addEventListener("click", () => {
	
	display.classList.add("grid");
	display.classList.remove("list");
});

listbutton.addEventListener("click", showList); 

function showList() {
	display.classList.add("list");
	display.classList.remove("grid");
}
