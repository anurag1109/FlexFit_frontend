const URL = "https://rich-tan-cougar-tux.cyclic.app";
const form = document.querySelector("form");
const submit = document.getElementById("submit");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = {
    email: form.email.value,
    pass: form.pwd.value,
  };
  submit.style.display = "none";
  showLoader2();

  const request = await fetch(`${URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const response = await request.json();
  if (response.ok) {
    localStorage.setItem("userName", response.userName);
    localStorage.setItem("role", response.role);
    localStorage.setItem("approved", response.approved);
    Swal.fire(response.msg, "", "success");

    setTimeout(() => {
      localStorage.setItem("token", response.token);
      localStorage.setItem("id", response.id);
      if (response.role == "trainer" && response.approved) {
        window.location.href = "./trainer_Dashboard.html";
      } else if (response.role == "trainer") {
        window.location.href = "./trainer_details_form.html";
      } else if (response.role == "admin") {
        window.location.href = "./admin/admin.html";
      } else {
        window.location.href = "./client_Dashboard.html";
      }
    }, 2000);
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: response.msg,
      footer: `<b><u><a href="./signup.html">Register Here!</a></u></b>`,
    });
  }
  submit.style.display = "block";
  hideLoader2();
  form.email.value = "";
  form.pwd.value = "";
});

const google = document.getElementById("google");
const github = document.getElementById("github");

google.addEventListener("click", () => {
  window.location.href = "https://rich-tan-cougar-tux.cyclic.app/auth/google";
});

// github.addEventListener("click", ()=>{
//     window.location.href = "https://rich-tan-cougar-tux.cyclic.app/auth/github"
// })
