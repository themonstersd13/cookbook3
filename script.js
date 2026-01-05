
    // --- Star Animation Logic ---
    const starsContainer = document.getElementById("stars");
    const stars = [];
    const starCount = 150; // Reduced slightly for mobile performance

    for (let i = 0; i < starCount; i++) {
      const s = document.createElement("div");
      s.className = "star";
      const size = Math.random() * 2 + 0.5;
      s.style.width = size + "px";
      s.style.height = size + "px";
      s.style.left = Math.random() * window.innerWidth + "px";
      s.style.top = Math.random() * window.innerHeight + "px";
      s.speed = Math.random() * 0.5 + 0.1;
      starsContainer.appendChild(s);
      stars.push(s);
    }

    function animateStars() {
      for (const s of stars) {
        let y = parseFloat(s.style.top);
        y += s.speed;
        if (y > window.innerHeight) {
          y = 0;
          s.style.left = Math.random() * window.innerWidth + "px";
        }
        s.style.top = y + "px";
      }
      requestAnimationFrame(animateStars);
    }
    animateStars();

    // --- Form Submission Logic ---
    const form = document.getElementById("regForm");
    const popup = document.getElementById("popupMessage");
    const btn = form.querySelector("button");

    function showPopup(message, isSuccess = true) {
      popup.textContent = message;
      popup.className = isSuccess ? "" : "error";
      popup.classList.add("show");
      
      if (isSuccess) form.reset();

      setTimeout(() => popup.classList.remove("show"), 3000);
    }

    form.addEventListener("submit", e => {
      e.preventDefault();
      
      const originalBtnText = btn.textContent;
      btn.textContent = "TRANSMITTING...";
      btn.style.opacity = "0.8";
      btn.disabled = true;

      const data = {};
      new FormData(form).forEach((v, k) => data[k] = v);

      fetch(form.action, {
        method: "POST",
        body: new URLSearchParams(data)
      })
      .then(res => res.text())
      .then(msg => {
        const isSuccess = msg.toLowerCase().includes("success") || msg.toLowerCase().includes("completed");
        showPopup(isSuccess ? "Registration Successful!" : msg, true); 
        btn.textContent = originalBtnText;
        btn.style.opacity = "1";
        btn.disabled = false;
      })
      .catch(err => {
        console.error(err);
        showPopup("❌ Connection Failed", false);
        btn.textContent = originalBtnText;
        btn.style.opacity = "1";
        btn.disabled = false;
      });
    });
 