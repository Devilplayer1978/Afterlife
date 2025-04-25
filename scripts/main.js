// SERVERSTATUS LADEN
document.addEventListener("DOMContentLoaded", function () {
  fetch('data/server-info.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("serverStatus");
      container.innerHTML = `
        <p><strong>Servername:</strong> ${data.name}</p>
        <p><strong>IP:</strong> ${data.ip}</p>
        <p><strong>Map:</strong> ${data.map}</p>
        <p><strong>Status:</strong> <span style="color: ${data.status === 'Online' ? 'lime' : 'red'}">${data.status}</span></p>
      `;
    })
    .catch(error => {
      document.getElementById("serverStatus").innerHTML = "<p style='color: red;'>Fehler beim Laden der Serverdaten.</p>";
      console.error(error);
    });

  // BURGER MENÜ
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }
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
