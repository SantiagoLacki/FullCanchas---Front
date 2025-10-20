# FullCanchas - Sistema de Reservas de Canchas Deportivas

## 👨‍💻 Autores

- [Marcos Joel Tebis](https://github.com/KR3RULIE)
- [Omar Oscar Alfredo Mattos](https://github.com/omarmatt31)
- [Alejandro Insinga](https://github.com/Alejo3D-hub)
- [Santiago Lacki Sinclair](https://github.com/SantiagoLacki)

## 📋 Descripción del Proyecto

FullCanchas es una aplicación web moderna desarrollada para facilitar la gestión y reserva de canchas deportivas. La plataforma permite a los usuarios buscar, visualizar y reservar canchas disponibles, mientras que los administradores pueden gestionar completamente el sistema a través de un panel de control intuitivo.

## ✨ Características Principales

### 👤 Para Usuarios Regulares
- **Registro y Autenticación**: Sistema seguro de registro e inicio de sesión
- **Catálogo de Productos**: Visualización y compra de productos deportivos
- **Sistema de Reservas**: 
  - Visualización de canchas disponibles
  - Selección de fechas y horarios
  - Confirmación instantánea de reservas
- **Carrito de Compras**: Gestión de productos para compra


### 👨‍💼 Para Administradores y Staff
- **Panel de Administración**: Interfaz completa de gestión
- **Gestión de Usuarios**: CRUD completo de usuarios del sistema
- **Gestión de Canchas**: Administración de canchas deportivas
- **Gestión de Productos**: Control del catálogo de productos
- **Gestión de Reservas**: Visualización y administración de todas las reservas
- **Búsquedas Avanzadas**: Filtros y búsquedas en tiempo real

## 🛠 Tecnologías Utilizadas

### Frontend
- **React.js** - Biblioteca principal para la interfaz de usuario
- **React Bootstrap** - Framework de UI components
- **React Router** - Manejo de rutas y navegación
- **SweetAlert2** - Alertas y notificaciones modernas
- **Bootstrap Icons** - Iconografía consistente

### Backend
- **Node.js** - Entorno de ejecución del servidor
- **Express.js** - Framework web para APIs
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación por tokens
- **BCrypt** - Encriptación de contraseñas

### Características Técnicas
- **Arquitectura RESTful** - APIs bien estructuradas
- **Responsive Design** - Compatible con todos los dispositivos
- **Paginación** - Optimización de carga de datos
- **Validaciones** - Seguridad en formularios y datos
- **Manejo de Errores** - Experiencia de usuario mejorada

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v14 o superior)
- MongoDB

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/SantiagoLacki/FullCanchas---Front.git
   cd fullcanchas
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar la aplicación**
   ```bash
   # Desarrollo
   npm run dev

## 📁 Estructura del Proyecto

```
fullcanchas/
├── client/                 # Frontend React
│   ├── src/
│   │   │── assets
│   │   ├── components/    # Componentes reutilizables
│   │   │     ├── pages/   # Páginas principales
│   │   │     ├── routes/  # Protectos de rutas
│   │   │     └── shared/  # Componentes globales
├── server/                # Backend Node.js
│   ├── controllers/       # Lógica de negocio
│   ├── helpers/           # Utilidades y funciones auxiliares
│   ├── models/            # Modelos de datos
│   ├── routes/            # Definición de rutas
│   └── middleware/        # Middlewares personalizados
└── README.md
```

## 👥 Roles de Usuario

### 🔐 Sistema de Autenticación y Roles

1. **Usuario Regular (user)**
   - Realizar reservas de canchas
   - Comprar productos del catálogo
   - Ver historial personal

2. **Administrador (admin)**
   - Acceso completo al panel de administración
   - Gestión de todos los usuarios regulares
   - Control total sobre canchas, productos y reservas

3. **Desarrollador (staff)**
   - Acceso limitado al panel administrativo
   - Gestión de todos los usuarios administradores
   - No puede realizar reservas

## 🎯 Funcionalidades por Módulo

### Módulo de Reservas
- Calendario interactivo de disponibilidad
- Selección de horarios en tiempo real
- Confirmación inmediata de reservas
- Gestión de horarios ocupados/disponibles

### Módulo de Productos
- Catálogo organizado por categorías
- Carrito de compras persistente
- Sistema de inventario en tiempo real
- Búsqueda y filtrado avanzado

### Módulo de Administración
- Dashboard con métricas principales
- Tablas paginadas para mejor performance
- Búsquedas en tiempo real
- Exportación de datos

## 🔒 Seguridad

- Autenticación JWT
- Encriptación de contraseñas con BCrypt
- Validación de datos en frontend y backend
- Protección de rutas privadas
- Sanitización de inputs

## 📱 Responsive Design

La aplicación está completamente optimizada para:
- 💻 Desktop
- 📱 Tablet
- 📱 Mobile

## 📞 Soporte

Para reportar bugs o solicitar características, por favor crear un issue en el repositorio del proyecto.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

---

**FullCanchas** - 🎯 Tu solución integral para reservas deportivas ⚽🏀🎾