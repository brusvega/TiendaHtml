import { getUsuarios, upsertUsuario } from "../../js/storage.js";

const params = new URLSearchParams(location.search);
const runParam = params.get("run");

const f = document.getElementById("form-usuario");
const $ = id => document.getElementById(id);

// Si viene en modo edición, precargar
if (runParam) {
  const u = getUsuarios().find(x => x.run === runParam);
  if (u) {
    $("run").value = u.run;
    $("run").readOnly = true; // RUN como PK
    $("nombre").value = u.nombre;
    $("apellidos").value = u.apellidos;
    $("correo").value = u.correo;
    $("fecha").value = u.fecha || "";
    $("tipo").value = u.tipo;
    // region/comuna: si tienes el dataset, cárgalos antes y luego setea:
    // $("region").value = u.region; trigger change para cargar comunas
    // $("comuna").value = u.comuna;
    $("direccion").value = u.direccion;
  }
}

f.addEventListener("submit", (e) => {
  e.preventDefault();
  // Validaciones básicas (ya tienes regex; aquí solo recolecto)
  const usuario = {
    run: $("run").value.trim(),
    nombre: $("nombre").value.trim(),
    apellidos: $("apellidos").value.trim(),
    correo: $("correo").value.trim(),
    fecha: $("fecha").value,
    tipo: $("tipo").value,
    region: $("region")?.value || "",
    comuna: $("comuna")?.value || "",
    direccion: $("direccion").value.trim()
  };
  // Puedes reusar tus validaciones previas aquí antes de guardar
  upsertUsuario(usuario);
  alert("Usuario guardado ✅");
  location.href = "usuarios.html";
});
