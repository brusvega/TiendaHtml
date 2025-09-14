// js/registro.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registroForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre");
    const apellidos = document.getElementById("apellidos");
    const correo = document.getElementById("correo");
    const password = document.getElementById("password");

    let valido = true;

    // Nombre
    if (!nombre.value.trim() || nombre.value.length > 50) {
      nombre.classList.add("is-invalid"); valido = false;
    } else nombre.classList.remove("is-invalid");

    // Apellidos
    if (!apellidos.value.trim() || apellidos.value.length > 100) {
      apellidos.classList.add("is-invalid"); valido = false;
    } else apellidos.classList.remove("is-invalid");

    // Correo
    const regex = /^[\w.-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    if (!regex.test(correo.value.trim())) {
      correo.classList.add("is-invalid"); valido = false;
    } else correo.classList.remove("is-invalid");

    // Password
    if (password.value.length < 4 || password.value.length > 10) {
      password.classList.add("is-invalid"); valido = false;
    } else password.classList.remove("is-invalid");

    if (!valido) return;

    // Guardar en localStorage
    let usuarios = JSON.parse(localStorage.getItem("app_usuarios")) || [];
    if (usuarios.some(u => u.correo === correo.value.trim().toLowerCase())) {
      correo.classList.add("is-invalid");
      return;
    }

    usuarios.push({
      nombre: nombre.value.trim(),
      apellidos: apellidos.value.trim(),
      correo: correo.value.trim().toLowerCase(),
      tipo: "Cliente"
    });
    localStorage.setItem("app_usuarios", JSON.stringify(usuarios));

    // Modal de éxito
    const modal = new bootstrap.Modal(document.getElementById("successModal"));
    modal.show();
    form.reset();
  });
});
