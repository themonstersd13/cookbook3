const starsContainer = document.getElementById("stars");
const stars = [];
for (let i = 0; i < 180; i++) {
  const s = document.createElement("div");
  s.className = "star";
  const size = Math.random() * 2 + 1;
  s.style.width = s.style.height = size + "px";
  s.style.left = Math.random() * innerWidth + "px";
  s.style.top = Math.random() * innerHeight + "px";
  s.speed = Math.random() * 0.4 + 0.2;
  starsContainer.appendChild(s);
  stars.push(s);
}
function animateStars() {
  for (const s of stars) {
    let y = parseFloat(s.style.top);
    y += s.speed;
    if (y > window.innerHeight) y = 0;
    s.style.top = y + "px";
  }
  requestAnimationFrame(animateStars);
}
animateStars();

const form = document.getElementById("regForm");
const popup = document.getElementById("popupMessage");

form.addEventListener("submit", e => {
  e.preventDefault();
  const btn = form.querySelector("button");
  btn.textContent = "PROCESSING...";

  const data = {};
  new FormData(form).forEach((v, k) => data[k] = v);

  // Apps Script integration
  fetch(form.action, {
    method: "POST",
    body: new URLSearchParams(data)
  })
  .then(res => res.text())
  .then(msg => {
    showPopup(msg, msg.includes("successful"));
    btn.textContent = "REGISTER";
  })
  .catch(err => {
    console.error(err);
    showPopup("❌ Server error!", false);
    btn.textContent = "REGISTER";
  });
});

function showPopup(message, resetForm = false) {
  popup.textContent = message;
  popup.classList.add("show");
  if (resetForm) form.reset();

  setTimeout(() => popup.classList.remove("show"), 3000);
}