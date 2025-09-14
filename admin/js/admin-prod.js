import { getProductos, deleteProducto, seedIfEmpty } from "../../js/storage.js";

const tbody = document.getElementById("tabla-productos");

function render() {
  seedIfEmpty();
  const data = getProductos();
  tbody.innerHTML = data.map(p => `
    <tr>
      <td>${p.codigo}</td>
      <td>${p.nombre}</td>
      <td>$${Number(p.precio).toLocaleString()}</td>
      <td>${p.stock}</td>
      <td>${p.categoria}</td>
      <td>
        <button class="btn" onclick="location.href='producto-nuevo.html?codigo=${encodeURIComponent(p.codigo)}'">✏️ Editar</button>
        <button class="btn" style="background:#dc3545;" data-cod="${p.codigo}">🗑 Eliminar</button>
      </td>
    </tr>
  `).join("");
}

tbody.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-cod]");
  if (!btn) return;
  const codigo = btn.getAttribute("data-cod");
  if (confirm("¿Eliminar producto?")) {
    deleteProducto(codigo);
    render();
  }
});

render();
