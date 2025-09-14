// js/login.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const modal = new bootstrap.Modal(document.getElementById("successModal"));

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const regex = /^[\w.-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

    if (!regex.test(email)) {
      alert(" Ingresa un correo válido (@duoc.cl, @profesor.duoc.cl o @gmail.com).");
      return;
    }
    if (password.length < 4 || password.length > 10) {
      alert(" La contraseña debe tener entre 4 y 10 caracteres.");
      return;
    }

    // Guardamos el correo en localStorage para simular sesión
    localStorage.setItem("userEmail", email);

    // Mostrar modal de éxito
    modal.show();

    // Después de 2 segundos redirigimos según el dominio
    setTimeout(() => {
      if (email.endsWith("@duoc.cl") || email.endsWith("@profesor.duoc.cl")) {
        window.location.href = "admin/admin.html"; 
      } else {
        window.location.href = "index.html";
      }
    }, 2000);

    form.reset();
    form.classList.remove("was-validated");
  });
});
