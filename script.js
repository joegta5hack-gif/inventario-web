// Variables globales
let productos = [];
let productoEnEdicion = null;
let productoAEliminar = null;

// Elementos del DOM
const formulario = document.getElementById('formularioProducto');
const tablaInventario = document.getElementById('tablaInventario');
const cuerpoTabla = document.getElementById('cuerpoTabla');
const btnLimpiar = document.getElementById('btnLimpiar');
const btnLimpiarFiltros = document.getElementById('btnLimpiarFiltros');
const buscar = document.getElementById('buscar');
const filtroCategoria = document.getElementById('filtroCategoria');
const modal = document.getElementById('modalConfirm');
const btnConfirmar = document.getElementById('btnConfirmar');
const btnCancelar = document.getElementById('btnCancelar');
const modalMensaje = document.getElementById('modalMensaje');

// Inicializar la aplicación
function inicializar() {
    cargarProductos();
    mostrarProductos();
    agregarEventListeners();
}

// Event Listeners
function agregarEventListeners() {
    formulario.addEventListener('submit', guardarProducto);
    btnLimpiar.addEventListener('click', limpiarFormulario);
    btnLimpiarFiltros.addEventListener('click', limpiarFiltros);
    buscar.addEventListener('keyup', filtrarProductos);
    filtroCategoria.addEventListener('change', filtrarProductos);
    btnConfirmar.addEventListener('click', confirmarEliminacion);
    btnCancelar.addEventListener('click', cerrarModal);
}

// Guardar producto (Alta y Cambio)
function guardarProducto(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const categoria = document.getElementById('categoria').value;
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const precio = parseFloat(document.getElementById('precio').value);
    const descripcion = document.getElementById('descripcion').value.trim();

    // Validaciones
    if (!nombre || !categoria || isNaN(cantidad) || isNaN(precio)) {
        mostrarAlerta('Por favor completa todos los campos correctamente');
        return;
    }

    if (cantidad < 0 || precio < 0) {
        mostrarAlerta('La cantidad y el precio no pueden ser negativos');
        return;
    }

    if (productoEnEdicion !== null) {
        // Actualizar producto existente
        productos[productoEnEdicion] = {
            id: productos[productoEnEdicion].id,
            nombre,
            categoria,
            cantidad,
            precio,
            descripcion,
            fechaCreacion: productos[productoEnEdicion].fechaCreacion,
            fechaActualizacion: new Date().toLocaleString('es-ES')
        };
        mostrarAlerta('✅ Producto actualizado correctamente');
        productoEnEdicion = null;
    } else {
        // Crear nuevo producto
        const nuevoProducto = {
            id: Date.now(),
            nombre,
            categoria,
            cantidad,
            precio,
            descripcion,
            fechaCreacion: new Date().toLocaleString('es-ES'),
            fechaActualizacion: new Date().toLocaleString('es-ES')
        };
        productos.push(nuevoProducto);
        mostrarAlerta('✅ Producto agregado correctamente');
    }

    guardarProductos();
    limpiarFormulario();
    mostrarProductos();
}

// Cargar productos del localStorage
function cargarProductos() {
    const productosGuardados = localStorage.getItem('productos');
    if (productosGuardados) {
        productos = JSON.parse(productosGuardados);
    }
}

// Guardar productos en localStorage
function guardarProductos() {
    localStorage.setItem('productos', JSON.stringify(productos));
}

// Mostrar todos los productos en la tabla
function mostrarProductos() {
    cuerpoTabla.innerHTML = '';

    if (productos.length === 0) {
        cuerpoTabla.innerHTML = '<tr class="fila-vacia"><td colspan="8">No hay productos en el inventario</td></tr>';
        actualizarResumen();
        return;
    }

    productos.forEach((producto, index) => {
        const valorTotal = (producto.cantidad * producto.precio).toFixed(2);
        const fila = document.createElement('tr');

        let claseEstado = '';
        if (producto.cantidad === 0) {
            claseEstado = 'cantidad-agotada';
        } else if (producto.cantidad <= 5) {
            claseEstado = 'cantidad-baja';
        }

        fila.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${producto.nombre}</strong></td>
            <td><span class="badge">${producto.categoria}</span></td>
            <td class="${claseEstado}">${producto.cantidad}</td>
            <td>$${parseFloat(producto.precio).toFixed(2)}</td>
            <td>$${valorTotal}</td>
            <td>${producto.descripcion || '-'}</td>
            <td>
                <div class="acciones">
                    <button class="btn-editar" onclick="editarProducto(${index})">✏️ Editar</button>
                    <button class="btn-eliminar" onclick="abrirModalEliminacion(${index})">🗑️ Eliminar</button>
                </div>
            </td>
        `;
        cuerpoTabla.appendChild(fila);
    });

    actualizarResumen();
}

// Filtrar productos
function filtrarProductos() {
    const termino = buscar.value.toLowerCase();
    const categoria = filtroCategoria.value;

    const productosFiltrados = productos.filter(producto => {
        const coincideNombre = producto.nombre.toLowerCase().includes(termino);
        const coincideCategoria = categoria === '' || producto.categoria === categoria;
        return coincideNombre && coincideCategoria;
    });

    mostrarProductosFiltrados(productosFiltrados);
}

// Mostrar productos filtrados
function mostrarProductosFiltrados(productosFiltrados) {
    cuerpoTabla.innerHTML = '';

    if (productosFiltrados.length === 0) {
        cuerpoTabla.innerHTML = '<tr class="fila-vacia"><td colspan="8">No hay productos que coincidan con tu búsqueda</td></tr>';
        return;
    }

    productosFiltrados.forEach((producto, index) => {
        const valorTotal = (producto.cantidad * producto.precio).toFixed(2);
        const indiceReal = productos.indexOf(producto);
        const fila = document.createElement('tr');

        let claseEstado = '';
        if (producto.cantidad === 0) {
            claseEstado = 'cantidad-agotada';
        } else if (producto.cantidad <= 5) {
            claseEstado = 'cantidad-baja';
        }

        fila.innerHTML = `
            <td>${indiceReal + 1}</td>
            <td><strong>${producto.nombre}</strong></td>
            <td><span class="badge">${producto.categoria}</span></td>
            <td class="${claseEstado}">${producto.cantidad}</td>
            <td>$${parseFloat(producto.precio).toFixed(2)}</td>
            <td>$${valorTotal}</td>
            <td>${producto.descripcion || '-'}</td>
            <td>
                <div class="acciones">
                    <button class="btn-editar" onclick="editarProducto(${indiceReal})">✏️ Editar</button>
                    <button class="btn-eliminar" onclick="abrirModalEliminacion(${indiceReal})">🗑️ Eliminar</button>
                </div>
            </td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}

// Editar producto
function editarProducto(index) {
    const producto = productos[index];

    document.getElementById('nombre').value = producto.nombre;
    document.getElementById('categoria').value = producto.categoria;
    document.getElementById('cantidad').value = producto.cantidad;
    document.getElementById('precio').value = producto.precio;
    document.getElementById('descripcion').value = producto.descripcion;

    productoEnEdicion = index;

    // Cambiar texto del botón
    const btnGuardar = formulario.querySelector('button[type="submit"]');
    btnGuardar.textContent = '✏️ Actualizar Producto';
    btnGuardar.style.backgroundColor = '#f59e0b';

    // Scroll al formulario
    document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
}

// Abrir modal de eliminación
function abrirModalEliminacion(index) {
    productoAEliminar = index;
    const producto = productos[index];
    modalMensaje.textContent = `¿Estás seguro de que deseas eliminar "${producto.nombre}"? Esta acción no se puede deshacer.`;
    modal.classList.add('show');
}

// Cerrar modal
function cerrarModal() {
    modal.classList.remove('show');
    productoAEliminar = null;
}

// Confirmar eliminación
function confirmarEliminacion() {
    if (productoAEliminar !== null) {
        const nombreProducto = productos[productoAEliminar].nombre;
        productos.splice(productoAEliminar, 1);
        guardarProductos();
        mostrarProductos();
        cerrarModal();
        mostrarAlerta(`✅ ${nombreProducto} ha sido eliminado correctamente`);
    }
}

// Limpiar formulario
function limpiarFormulario() {
    formulario.reset();
    productoEnEdicion = null;

    const btnGuardar = formulario.querySelector('button[type="submit"]');
    btnGuardar.textContent = '💾 Guardar Producto';
    btnGuardar.style.backgroundColor = '';
}

// Limpiar filtros
function limpiarFiltros() {
    buscar.value = '';
    filtroCategoria.value = '';
    mostrarProductos();
}

// Actualizar resumen
function actualizarResumen() {
    const totalProductos = productos.length;
    const totalItems = productos.reduce((sum, p) => sum + p.cantidad, 0);
    const valorTotal = productos.reduce((sum, p) => sum + (p.cantidad * p.precio), 0);

    document.getElementById('totalProductos').textContent = totalProductos;
    document.getElementById('totalItems').textContent = totalItems;
    document.getElementById('valorTotal').textContent = '$' + valorTotal.toFixed(2);
}

// Mostrar alerta simple
function mostrarAlerta(mensaje) {
    // Crear elemento de alerta
    const alerta = document.createElement('div');
    alerta.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
        max-width: 400px;
    `;
    alerta.textContent = mensaje;

    document.body.appendChild(alerta);

    // Eliminar después de 3 segundos
    setTimeout(() => {
        alerta.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => alerta.remove(), 300);
    }, 3000);
}

// Agregar algunos productos de ejemplo (opcional)
function agregarProductosEjemplo() {
    if (productos.length === 0) {
        productos = [
            {
                id: 1,
                nombre: 'Laptop Dell XPS 13',
                categoria: 'Electrónica',
                cantidad: 15,
                precio: 1299.99,
                descripcion: 'Laptop ultradelgada con procesador Intel i7',
                fechaCreacion: new Date().toLocaleString('es-ES'),
                fechaActualizacion: new Date().toLocaleString('es-ES')
            },
            {
                id: 2,
                nombre: 'Mouse Logitech MX Master',
                categoria: 'Electrónica',
                cantidad: 45,
                precio: 99.99,
                descripcion: 'Mouse inalámbrico profesional',
                fechaCreacion: new Date().toLocaleString('es-ES'),
                fechaActualizacion: new Date().toLocaleString('es-ES')
            },
            {
                id: 3,
                nombre: 'Monitor LG 27"',
                categoria: 'Electrónica',
                cantidad: 8,
                precio: 349.99,
                descripcion: 'Monitor 4K IPS',
                fechaCreacion: new Date().toLocaleString('es-ES'),
                fechaActualizacion: new Date().toLocaleString('es-ES')
            }
        ];
        guardarProductos();
        mostrarProductos();
    }
}

// Iniciar aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    inicializar();
    // Descomenta la siguiente línea para cargar datos de ejemplo
    // agregarProductosEjemplo();
});

// Cerrar modal al hacer clic fuera de él
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        cerrarModal();
    }
});
