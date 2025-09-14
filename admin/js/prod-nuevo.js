import { getProductos, upsertProducto } from "../../js/storage.js";

const params = new URLSearchParams(location.search);
const codParam = params.get("codigo");

const $ = id => document.getElementById(id);
const f = $("form-producto");

// Precarga si es edición
if (codParam) {
  const p = getProductos().find(x => x.codigo === codParam);
  if (p) {
    $("codigo").value = p.codigo;
    $("codigo").readOnly = true; // clave
    $("nombre").value = p.nombre;
    $("descripcion").value = p.descripcion || "";
    $("precio").value = p.precio;
    $("stock").value = p.stock;
    $("stockCritico").value = p.stockCritico ?? "";
    $("categoria").value = p.categoria;
    // imagen se podría mostrar como preview si guardas URL/base64
  }
}

f.addEventListener("submit", (e) => {
  e.preventDefault();

  const prod = {
    codigo: $("codigo").value.trim(),
    nombre: $("nombre").value.trim(),
    descripcion: $("descripcion").value.trim(),
    precio: Number($("precio").value),
    stock: parseInt($("stock").value),
    stockCritico: $("stockCritico").value === "" ? null : parseInt($("stockCritico").value),
    categoria: $("categoria").value,
    imagen: "" // podrías guardar dataURL si lo necesitas
  };

  // Reutiliza tus validaciones previas aquí antes de guardar
  if (!isFinite(prod.precio) || prod.precio < 0) return alert("Precio inválido");
  if (!Number.isInteger(prod.stock) || prod.stock < 0) return alert("Stock inválido");

  upsertProducto(prod);
  alert("Producto guardado ✅");
  location.href = "productos.html";
});
