const result = document.getElementById("result");
const inputField = document.querySelector(".input");

window.addEventListener("DOMContentLoaded", showData);

let inputParam = "";
inputField.addEventListener("input", update);

function update(e) {
  inputParam = e.target.value;
  showData();
}

async function showData() {
  result.innerHTML = "";
  let res = await fetchData();
  let filter = [];
  res.filter((item) => {
    if (item.name.toLowerCase().includes(inputParam.toLocaleLowerCase())) {
      filter.push(item);
    }
  });
  if (filter.length === 0) {
    result.innerHTML = "No Result";
  } else {
    filter.map((item) => {
      let element = createEelement(item);
      result.appendChild(element);
    });
  }
}

async function fetchData() {
  let response = await fetch("https://jsonplaceholder.typicode.com/users");
  let data = await response.json();
  return data;
}

function createEelement(item) {
  let root = document.createElement("li");
  root.classList.add("cards");

  //We Need 4 Placeholders for the data
  let name = document.createElement("h5");
  let username = document.createElement("h5");
  let email = document.createElement("h5");
  let website = document.createElement("h5");

  name.style.fontWeight = "500";
  username.style.fontWeight = "100";
  email.style.fontWeight = "100";
  website.style.fontWeight = "100";

  name.innerHTML = item.name;
  username.innerHTML = item.username;
  email.innerHTML = item.email;
  website.innerHTML = item.website;

  root.appendChild(name);
  root.appendChild(username);
  root.appendChild(email);
  root.appendChild(website);

  return root;
}
