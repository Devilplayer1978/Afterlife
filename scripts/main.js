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
});
