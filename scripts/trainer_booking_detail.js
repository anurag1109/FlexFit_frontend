const swiper = new Swiper(".swiper", {
  loop: true,
  autoplayDisableOnInteraction: true,
  effect: "slide",
  autoplay: {
    delay: 1000,
  },
  slidesPerView: 2,
});
// Get the current URL
const currentUrl = window.location.href;
// Create a URL object from the current URL
const url2 = new URL(currentUrl);
// Get the search parameters from the URL
const searchParams = url2.searchParams;

const url = "https://flexfit-git-main-anurag1109.vercel.app";
const form = document.querySelector("form");
const trainer = searchParams.get("id");
const trainerName = document.getElementById("name");
const trainerPlace = document.getElementById("place");
const trainerPrice = document.getElementById("price");
const trainerExpertise = document.getElementById("expertise");
const titleName = document.querySelector("title");
const token = localStorage.getItem("token") || null;
let userData;
fetch(`${url}/user/${trainer}`)
  .then((res) => res.json())
  .then((data) => {
    userData = data.user;
    trainerName.textContent = data.user.name;
    trainerPlace.textContent = data.user.address;
    trainerPrice.textContent = data.user.price;
    trainerExpertise.textContent = data.user.expertise;
    titleName.textContent += " " + data.user.name;
  });

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const start = document.getElementById("start");
  const end = document.getElementById("end");
  const timeDuration = document.getElementById("duration");
  const now = new Date();
  const minTime = now.toISOString().slice(0, 16);
  start.setAttribute("min", minTime);
  end.setAttribute("min", minTime);

  const datetimeValue = start.value;
  const datetimeValue2 = end.value;
  const duration = timeDuration.value;
  const selectedTime = new Date(datetimeValue);
  const selectedTime2 = new Date(datetimeValue2);
  const currentTime = new Date();
  const differenceInMilliseconds = selectedTime2 - selectedTime;
  const differenceInMonths = differenceInMilliseconds / (1000 * 60 * 60 * 24);
  const months = Math.floor(differenceInMonths);

  if (!datetimeValue2) {
    Swal.fire({
      icon: "error",
      title: "",
      text: "Please enter Start and End Time",
      footer: ``,
    });
    start.value = ""; // Clear the input value if it's in the past
    end.value = "";
    return;
  } else if (selectedTime < currentTime) {
    Swal.fire({
      icon: "error",
      title: "",
      text: "Date could not be in the past",
      footer: ``,
    });
    start.value = ""; // Clear the input value if it's in the past
    end.value = "";
    return;
  } else if (months < 15) {
    Swal.fire({
      icon: "error",
      title: "",
      text: "The Minimum booking duration is 15 days",
      footer: ``,
    });
    start.value = ""; // Clear the input value if it's in the past
    end.value = "";
    return;
  } else if (!token) {
    Swal.fire({
      icon: "error",
      title: "",
      text: "Please Login First",
      footer: `<a href="./login.html">Login here</a>`,
    });
    start.value = ""; // Clear the input value if it's in the past
    end.value = "";
    return;
  } else if (localStorage.getItem("role") != "client") {
    Swal.fire({
      icon: "error",
      title: "",
      text: "A trainer or Admin cannot book another trainer",
      footer: ``,
    });
    start.value = ""; // Clear the input value if it's in the past
    end.value = "";
    return;
  }

  const utcTime = selectedTime.toISOString();
  const utcTime2 = selectedTime2.toISOString();
  console.log(utcTime, utcTime2);

  const req = await fetch(`${url}/book/book`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      authorization: token,
    },
    body: JSON.stringify({
      trainerId: userData._id,
      startTime: utcTime,
      endTime: utcTime2,
    }),
  });
  const res = await req.json();
  console.log(res);
  if (res.ok) {
    window.location.href = `./payment.html?id=${trainer}&time=${months}&duration=${duration}`;
  } else {
    Swal.fire({
      icon: "error",
      title: "",
      text: res.message,
      footer: ``,
    });
  }
  // console.log(utcTime,utcTime2); // Output: UTC format of selected time
});

var HamBurger = document.getElementById("hamburger");
var navContents = document.querySelector(".nav-contents");

HamBurger.addEventListener("click", function () {
  navContents.classList.toggle("show-nav");
  // console.log("clicked")
});

//----------------------------------- Carousel images --------------------------------------------------//
const id = url2.searchParams.get("id");
let image_1 = document.getElementById("img1");
let image_2 = document.getElementById("img2");
let image_3 = document.getElementById("img3");
let image_4 = document.getElementById("img4");
async function fetchData() {
  try {
    const response = await fetch(`${url}/user/images/${id}`);
    const data = await response.json();
    let images_array = data.Images[0].images;
    image_1.setAttribute("src", `data:image/png;base64,${images_array[0]._id}`);
    image_2.setAttribute("src", `data:image/png;base64,${images_array[1]._id}`);
    image_3.setAttribute("src", `data:image/png;base64,${images_array[2]._id}`);
    image_4.setAttribute("src", `data:image/png;base64,${images_array[3]._id}`);
  } catch (error) {
    console.error(error);
  }
}

// fetchData();

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
