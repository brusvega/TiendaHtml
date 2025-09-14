// js/contacto.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    alert(" Mensaje enviado correctamente");
    form.reset();
    form.classList.remove("was-validated");
  });
});
