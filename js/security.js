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

// bloquear si expiró
if (new Date() > fechaExpiracion) {
  document.documentElement.innerHTML =
    "<h1 style='text-align:center;margin-top:120px'>Demo expirada</h1>";
  window.stop();
  throw new Error("Demo expirada");
}

// bloquear si no tiene acceso
if (!token) {
  document.documentElement.innerHTML =
    "<h1 style='text-align:center;margin-top:120px'>Acceso restringido</h1>";
  window.stop();
  throw new Error("Acceso bloqueado");
}

if (!params.get("demo")) {

  params.set("demo", token);

  const nuevaURL =
    window.location.pathname + "?" + params.toString();

  window.location.replace(nuevaURL);
}

})();