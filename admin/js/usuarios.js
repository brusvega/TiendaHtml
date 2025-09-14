import { getUsuarios, deleteUsuario, seedIfEmpty } from "../../js/storage.js";

const tbody = document.getElementById("tabla-usuarios");

function render() {
  seedIfEmpty(); // solo la primera vez
  const data = getUsuarios();
  tbody.innerHTML = data.map(u => `
    <tr>
      <td>${u.run}</td>
      <td>${u.nombre}</td>
      <td>${u.apellidos}</td>
      <td>${u.correo}</td>
      <td>${u.tipo}</td>
      <td>
        <button class="btn" onclick="location.href='usuario-nuevo.html?run=${encodeURIComponent(u.run)}'"> Editar</button>
        <button class="btn" style="background:#dc3545;" data-run="${u.run}"> Eliminar</button>
      </td>
    </tr>
  `).join("");
}

tbody.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-run]");
  if (!btn) return;
  const run = btn.getAttribute("data-run");
  if (confirm("¿Eliminar usuario?")) {
    deleteUsuario(run);
    render();
  }
});

render();
