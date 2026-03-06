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
if (token !== tokenCorrecto) {
  document.documentElement.innerHTML =
    "<h1 style='text-align:center;margin-top:120px'>Acceso restringido</h1>";
  window.stop();
  throw new Error("Acceso bloqueado");
}

// PROPAGAR TOKEN A TODOS LOS LINKS
document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll("a").forEach(link => {

    const url = new URL(link.href, window.location.origin);

    if (!url.searchParams.has("demo")) {
      url.searchParams.set("demo", token);
      link.href = url.toString();
    }

  });

});

})();