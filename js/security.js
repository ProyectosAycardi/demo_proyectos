(function () {

const fechaExpiracion = new Date("2026-03-07T00:00:00");
const tokenCorrecto = "cliente-aycardi";

const params = new URLSearchParams(window.location.search);
const tokenURL = params.get("demo");

// guardar token si viene en URL
if (tokenURL === tokenCorrecto) {
  sessionStorage.setItem("demo_access", tokenURL);
}

const token = sessionStorage.getItem("demo_access");

// si expiró → detener todo
if (new Date() > fechaExpiracion) {

  document.documentElement.innerHTML = `
  <body style="font-family:Arial;text-align:center;margin-top:120px">
  <h1>Demo expirada</h1>
  </body>
  `;

  window.stop();
  throw new Error("Demo expirada");
}

// si no tiene acceso → detener todo
if (token !== tokenCorrecto) {

  document.documentElement.innerHTML = `
  <body style="font-family:Arial;text-align:center;margin-top:120px">
  <h1>Acceso restringido</h1>
  </body>
  `;

  window.stop();
  throw new Error("Acceso bloqueado");
}

})();