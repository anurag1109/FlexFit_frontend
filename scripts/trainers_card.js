let container = document.getElementById("search-results");
// Fetch the images data from the server
const url = "https://rich-tan-cougar-tux.cyclic.app";

async function fetchData() {
  try {
    const response = await fetch(`${url}/user/images`);
    const data = await response.json();
    console.log(data);
    Display(data.images, data.trainers);
  } catch (error) {
    console.error(error);
  }
}
showLoader2();
fetchData();

var trainerrID;

let count = document.getElementById("count_div");

function Display(images, trainers) {
  container.innerHTML = null;
  count.innerHTML = null;
  let count_title = document.createElement("h4");
  count_title.innerText = +trainers.length + " Trainers😍";
  count.append(count_title);
  trainers.forEach((trainer) => {
    let trainer_div = document.createElement("div");
    let trainer_details = document.createElement("div");
    let trainer_images = document.createElement("div");
    trainer_details.setAttribute("class", "details_div");
    // trainer_images.setAttribute("class", "images_div");
    trainer_div.setAttribute("id", `${trainer._id}`);
    trainer_div.setAttribute("class", "trainer_div");
    let images_data;
    // for (let i = 0; i < trainers.length; i++) {
    //   if (true) {
    // images_data = images[i];
    let name_div = document.createElement("div");
    name_div.setAttribute("class", "name_div");
    let book_div = document.createElement("div");
    book_div.setAttribute("class", "book_div");
    let view_profile = document.createElement("button");
    view_profile.setAttribute("id", "view_profile");
    view_profile.innerText = "View Profile";
    let name = document.createElement("p");
    name.innerText = trainer.name;
    name.setAttribute("id", "name");
    let price = document.createElement("p");
    price.setAttribute("id", "price");
    price.innerText = "\u20B9" + `${trainer.price} /hr`;
    let location = document.createElement("p");
    location.innerText = `\ud83d\udccd${trainer.address}`;
    name_div.append(name, location);
    book_div.append(price, view_profile);
    trainer_details.append(name_div, book_div);
    // for (let i = 0; i < images_data.images.length; i++) {
    //   const img = new Image();
    //   img.src = `data:image/png;base64,${images_data.images[i]._id}`;
    //   trainer_images.appendChild(img);
    //   trainer_div.append(trainer_images, trainer_details);
    // }
    trainer_div.append(trainer_details);
    container.append(trainer_div);
    // break;
  });
  // }
  //   });
}

/********************************************* Sorting ***************************************************/

let price_sort = document.getElementById("form-select");
let sortvalue;
let location_sort = document.getElementById("location");
let locationValue;

price_sort?.addEventListener("change", async () => {
  sortvalue = price_sort.value;
  locationValue = location_sort.value;
  await fetch(
    `${url}/user/SortByPrice?Sortby=${sortvalue}&location=${locationValue}`
  )
    .then((res) => res.json())
    .then((res) => {
      const data = res;
      Display(data.images, data.trainers);
    })
    .catch((err) => console.log(err));
});

location_sort?.addEventListener("change", async () => {
  sortvalue = price_sort.value;
  sort.value;
  locationValue = location_sort.value;
  await fetch(
    `${url}/user/SortByPrice?Sortby=${sortvalue}&location=${locationValue}`
  )
    .then((res) => res.json())
    .then((res) => {
      const data = res;
      Display(data.images, data.trainers);
      if (!data.trainers.length) {
        Swal.fire("Oops, Trainers not found at this location ☹");
        setTimeout(() => {
          window.location.href = "./trainers_card.html";
        }, 2500);
      }
    })
    .catch((err) => console.log(err));
});

// for redirecting
container?.addEventListener("click", (event) => {
  if (event.target.id === "view_profile") {
    const trainerId = event.target.closest(".trainer_div").id;

    console.log(trainerId);
    localStorage.setItem("trainerId", trainerId);
    fetchProfilePage(trainerId);
  }
});

function fetchProfilePage(trainerId) {
  const profilePageurl = `trainer_booking_detail.html?id=${trainerId}`;
  window.open(profilePageurl, "_blank");
}

// username visible after logging in

var HamBurger = document.getElementById("hamburger");
var navContents = document.querySelector(".nav-contents");

HamBurger.addEventListener("click", function () {
  navContents.classList.toggle("show-nav");
  // console.log("clicked")
});

// username visible after logging in

let loginTag = document.getElementById("login");
let singupTag = document.getElementById("signup");

let isUserName = localStorage.getItem("userName");

if (isUserName) {
  singupTag.style.display = "none";
  loginTag.textContent = isUserName;
  loginTag.style.color = "#FFFFFF";
  loginTag.setAttribute("href", "./userDashboard.html");
} else {
  singupTag.style.display = "block";
  loginTag.textContent = "Login";
}
