// SERVERSTATUS LADEN inkl. MATRIX-LOADER
document.addEventListener("DOMContentLoaded", function () {
  const apiToken = "Hif26l9OSuf3MZXND40AH_83e3s31Rt7NGyij76QakU=";
  const serverId = "413ede25-e5df-47b0-9da7-9f3439faa804";

  const serverStatusDiv = document.getElementById("serverStatus");

  // Matrix-Loader Canvas erstellen
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

  // Serverdaten abfragen
  fetch(`https://api.cftools.cloud/v1/proxy/servers/${serverId}/status`, {
    headers: {
      "Authorization": `Bearer ${apiToken}`
    }
  })
  .then(response => response.json())
  .then(data => {
    // Matrix-Loader sanft ausblenden
    clearInterval(matrixInterval);
    canvas.style.transition = "opacity 1s ease";
    canvas.style.opacity = "0";

    setTimeout(() => {
      canvas.remove();

      const server = data.data.server;
      serverStatusDiv.innerHTML = `
        <p><strong>Servername:</strong> ${server.name}</p>
        <p><strong>Spieler:</strong> ${server.players.online} / ${server.players.max}</p>
        <p><strong>Map:</strong> ${server.map.name}</p>
        <p><strong>Status:</strong> <span style="color: ${server.online ? 'lime' : 'red'}">${server.online ? 'Online' : 'Offline'}</span></p>
      `;
    }, 1000); // erst nach FadeOut Canvas entfernen
  })
  .catch(error => {
    clearInterval(matrixInterval);
    canvas.style.transition = "opacity 1s ease";
    canvas.style.opacity = "0";

    setTimeout(() => {
      canvas.remove();
      serverStatusDiv.innerHTML = "<p style='color: red;'>Fehler beim Laden der Serverdaten.</p>";
    }, 1000);

    console.error(error);
  });

  // BURGER MENÜ (optional, falls vorhanden)
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }

  // FADE-IN BEIM SCROLLEN
  const fadeElements = document.querySelectorAll('.fade-in');

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
});

// BACK TO TOP BUTTON
const backToTopButton = document.getElementById("backToTop");

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

// PRELOADER ENTFERNEN
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  preloader.style.opacity = '0';
  preloader.style.pointerEvents = 'none';
  setTimeout(() => {
    preloader.remove();
  }, 500);
});
