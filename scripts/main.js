// SERVERSTATUS LADEN inkl. MATRIX-LOADER + Dummy-Daten
document.addEventListener("DOMContentLoaded", function () {
  const serverStatusDiv = document.getElementById("serverStatus");

  if (serverStatusDiv) {
    const canvas = document.createElement('canvas');
    canvas.id = "matrixCanvas";
    serverStatusDiv.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvas.width = serverStatusDiv.offsetWidth;
      canvas.height = 150;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const letters = Array(256).join("01").split("");
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function drawMatrix() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#ff1a1a"; // Rot
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const matrixInterval = setInterval(drawMatrix, 50);

    setTimeout(() => {
      clearInterval(matrixInterval);
      canvas.style.transition = "opacity 1s ease";
      canvas.style.opacity = "0";

      setTimeout(() => {
        canvas.remove();
        serverStatusDiv.innerHTML = `
          <p><strong>Servername:</strong> Afterlife DayZ</p>
          <p><strong>Spieler:</strong> 8 / 40</p>
          <p><strong>Map:</strong> Namalsk</p>
          <p><strong>Status:</strong> <span style="color: lime;">Online</span></p>
        `;
      }, 1000);
    }, 4000);
  }
});

// BACK TO TOP BUTTON
window.addEventListener("DOMContentLoaded", function () {
  const backToTopButton = document.getElementById("backToTop");

  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopButton.style.display = "block";
      } else {
        backToTopButton.style.display = "none";
      }
    });

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});

// PRELOADER ENTFERNEN
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    preloader.style.pointerEvents = 'none';
    setTimeout(() => {
      preloader.remove();
    }, 500);
  }
});

// FADE-IN BEIM SCROLLEN
document.addEventListener("DOMContentLoaded", function () {
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0) {
    const observerOptions = {
      threshold: 0.1
    };

    const fadeInOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach(element => {
      fadeInOnScroll.observe(element);
    });
  }
});

// TERJE POPUP BUTTONS (KRANKHEITEN UND HEILMITTEL)
document.addEventListener("DOMContentLoaded", function () {
  const medButtons = document.querySelectorAll('.med-button');

  if (medButtons.length > 0) {
    medButtons.forEach(button => {
      button.addEventListener('click', () => {
        const target = document.getElementById(button.dataset.target);
        if (target.classList.contains('active')) {
          target.classList.remove('active');
        } else {
          document.querySelectorAll('.med-section').forEach(section => {
            section.classList.remove('active');
          });
          target.classList.add('active');
        }
      });
    });
  }
});
