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
    let name = document.createElement("h2");
    let address = document.createElement("p");
    let phone = document.createElement("p");
    let website = document.createElement("p");
    let link = document.createElement("a");
    let portrait = document.createElement('img')
    
    portrait.setAttribute('src', member.image);
    portrait.setAttribute('alt', `Portrait of ${member.name}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    name.textContent = member.name;
    address.textContent = member.address;
    phone.textContent = member.phone;


    link.href = member.website;
    link.textContent = member.website;
    link.target = "_blank";
    website.appendChild(link);
  

    card.appendChild(name);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(website);
    card.appendChild(portrait);


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




document.addEventListener("DOMContentLoaded", function(){
menuToggle();
displayFooterDate();
getMembers();

});