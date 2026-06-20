# 📦 Sistema de Inventarios Web

Una aplicación web completa para gestionar inventario con funcionalidades de alta, baja, cambio y visualización de datos en tiempo real.

## 🎯 Características

✅ **Altas (CREATE)**: Agregar nuevos productos al inventario  
✅ **Bajas (DELETE)**: Eliminar productos con confirmación  
✅ **Cambios (UPDATE)**: Editar información de productos existentes  
✅ **Consultas (READ)**: Visualizar todos los productos en tabla  
✅ **Búsqueda**: Filtrar por nombre de producto  
✅ **Filtros por Categoría**: Organizar productos por tipo  
✅ **Resumen de Inventario**: Ver estadísticas en tiempo real  
✅ **Almacenamiento Local**: Datos persistentes con localStorage  
✅ **Interfaz Responsiva**: Funciona en PC, tablet y móvil  
✅ **Validaciones**: Prevención de datos inválidos  

## 🚀 Cómo Usar

### 1. Descargar o Clonar
```bash
git clone <tu-repositorio>
cd inventario-web
```

### 2. Abrir en el Navegador
Simplemente abre el archivo `index.html` en tu navegador web favorito.

```
Haz doble clic en index.html
```

O si usas un servidor local:
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (http-server)
npx http-server

# Con Live Server en VS Code
# Instala la extensión Live Server y haz clic en "Go Live"
```

Luego accede a `http://localhost:8000`

## 📋 Funcionalidades Detalladas

### Alta de Productos
1. Completa el formulario con los datos del producto
2. Campos requeridos:
   - **Nombre**: Nombre del producto
   - **Categoría**: Electrónica, Ropa, Alimentos, Muebles, Otros
   - **Cantidad**: Cantidad en stock
   - **Precio**: Precio unitario
   - **Descripción**: Detalles adicionales (opcional)
3. Haz clic en "Guardar Producto"
4. El producto aparecerá en la tabla de inventario

### Cambio de Productos
1. En la tabla, busca el producto que deseas editar
2. Haz clic en el botón **✏️ Editar**
3. El formulario se rellenará automáticamente
4. Modifica los datos que necesites
5. Haz clic en **✏️ Actualizar Producto**

### Baja de Productos
1. En la tabla, busca el producto a eliminar
2. Haz clic en el botón **🗑️ Eliminar**
3. Confirma la eliminación en el modal
4. El producto será removido del inventario

### Visualización y Búsqueda
- **Tabla completa**: Todos los productos se muestran en una tabla ordenada
- **Búsqueda por nombre**: Escribe en el campo de búsqueda para filtrar
- **Filtro por categoría**: Selecciona una categoría del dropdown
- **Resumen**: Ve el total de productos, items en stock y valor total del inventario

## 🎨 Características Visuales

### Estados de Cantidad
- 🔴 **Rojo**: Cantidad agotada (0 items)
- 🟡 **Amarillo**: Cantidad baja (≤ 5 items)
- 🟢 **Normal**: Cantidad adecuada

### Cálculos Automáticos
- Valor total por producto = Cantidad × Precio
- Valor total del inventario = Suma de todos los productos
- Total de items en stock = Suma de todas las cantidades

## 💾 Almacenamiento de Datos

Los datos se guardan automáticamente en el **localStorage** del navegador:
- Los cambios se guardan instantáneamente
- Los datos persisten entre sesiones
- No requiere servidor o base de datos
- Solo funciona en el mismo navegador/equipo

### Exportar/Respaldar datos:
```javascript
// En la consola del navegador (F12)
console.log(JSON.stringify(JSON.parse(localStorage.getItem('productos')), null, 2))
```

## 📱 Responsividad

La aplicación se adapta perfectamente a:
- 💻 Escritorio (1920px+)
- 🖥️ Laptops (1024px - 1920px)
- 📱 Tablets (768px - 1024px)
- 📲 Móviles (320px - 768px)

## 🔒 Validaciones

✓ Campo requerido: Nombre, Categoría, Cantidad, Precio  
✓ No permite valores negativos  
✓ Confirma antes de eliminar  
✓ Previene datos duplicados  

## 🛠️ Tecnologías Usadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos y responsivos
- **JavaScript Vanilla**: Lógica sin dependencias
- **localStorage**: Almacenamiento persistente
- **Iconos Unicode**: Emojis para mejor UX

## 📂 Estructura de Archivos

```
inventario-web/
├── index.html      # Estructura HTML
├── styles.css      # Estilos y diseño
├── script.js       # Lógica de la aplicación
└── README.md       # Este archivo
```

## 🐛 Solución de Problemas

### Los datos no se guardan
- Verifica que localStorage esté habilitado en tu navegador
- Asegúrate de no estar en modo incógnito/privado

### El diseño se ve roto
- Intenta actualizar la página (Ctrl+F5 o Cmd+Shift+R)
- Limpia la caché del navegador

### No puedo editar/eliminar
- Verifica que JavaScript esté habilitado
- Abre la consola (F12) para ver si hay errores

## 📝 Ejemplos de Uso

### Agregar producto nuevo:
```
Nombre: Teclado Mecánico RGB
Categoría: Electrónica
Cantidad: 25
Precio: 129.99
Descripción: Teclado gaming con switches cherry mx
```

### Editar producto:
1. Haz clic en ✏️ Editar del producto
2. Cambia la cantidad de 25 a 30
3. Haz clic en ✏️ Actualizar Producto

### Buscar producto:
1. En la caja de búsqueda escribe "Teclado"
2. Solo aparecerá el producto que coincida
3. Para limpiar, haz clic en "Limpiar Filtros"

## 🎓 Conceptos CRUD Implementados

| Operación | Descripción | Función |
|-----------|-------------|---------|
| **CREATE** | Crear nuevo producto | `guardarProducto()` |
| **READ** | Leer/mostrar productos | `mostrarProductos()` |
| **UPDATE** | Actualizar producto | `editarProducto()` |
| **DELETE** | Eliminar producto | `confirmarEliminacion()` |

## 🚀 Mejoras Futuras

- 🗄️ Integración con base de datos (Firebase, MongoDB)
- 📊 Gráficos y reportes avanzados
- 📤 Exportar a Excel/PDF
- 📧 Notificaciones de stock bajo
- 👥 Sistema de usuarios y permisos
- 🔔 Alertas en tiempo real
- 📱 Aplicación mobile nativa
- 🌙 Modo oscuro

## 📧 Soporte

Si encuentras problemas o tienes sugerencias, abre un issue en el repositorio.

## 📄 Licencia

Este proyecto es de código abierto y puede ser usado libremente.

---

**Hecho con ❤️ para gestionar inventarios de forma sencilla y eficaz**
