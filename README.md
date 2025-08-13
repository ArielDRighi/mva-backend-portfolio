# 🚛 MVA Backend - Sistema de Gestión Empresarial

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
</p>

<p align="center">
  <strong>Sistema completo de gestión para empresas de servicios de baños químicos y mantenimiento</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white" alt="JWT">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Deploy-Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white" alt="Railway">
  <img src="https://img.shields.io/badge/Frontend-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
  <img src="https://img.shields.io/badge/Status-Live-success?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/Portfolio-Ready-06D6A0?style=for-the-badge" alt="Portfolio Ready">
</p>

---

## 📋 Descripción del Proyecto

**MVA Backend** es una aplicación empresarial desarrollada para **MVA SRL**, una empresa especializada en servicios de baños químicos y mantenimiento. El sistema proporciona una solución integral para la gestión de recursos, personal, clientes y operaciones diarias.

### 🎯 Mi Rol en el Proyecto

- **Backend Developer** (1 de 3 desarrolladores backend)
- **Project Manager** - Liderazgo del equipo técnico
- **Product Owner** - Creación de historias de usuario y requisitos
- **Database Architect** - Diseño completo de la base de datos

---

## 🚀 Demo en Vivo

<p align="center">
  <a href="https://ar-admin-portfolio.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/🔗_Demo_Live-Ver_Aplicación-success?style=for-the-badge&color=06D6A0" alt="Demo Live">
  </a>
</p>

### **🌟 Aplicación Completa Desplegada**

La aplicación está completamente funcional y desplegada en producción:

- **🎨 Frontend**: React + TypeScript desplegado en **Vercel**
- **⚙️ Backend**: NestJS + PostgreSQL desplegado en **Railway**
- **🗄️ Base de Datos**: PostgreSQL en Railway con datos de prueba

### **🔐 Credenciales de Acceso**

```
🌐 URL: https://ar-admin-portfolio.vercel.app
📧 Email: test@ar.com
🔑 Password: Test1234
👤 Rol: ADMIN (acceso completo)
```

### **✨ Funcionalidades que puedes probar:**

- ✅ **Dashboard completo** con métricas en tiempo real
- ✅ **Gestión de clientes, empleados y vehículos**
- ✅ **Sistema de servicios** con asignación de recursos
- ✅ **Mantenimientos** de equipos y vehículos
- ✅ **Reportes** y exportación a Excel
- ✅ **Sistema de roles** y permisos granulares
- ✅ **Portal de clientes** con reclamos y encuestas

> **📌 Nota**: La aplicación contiene datos de prueba realistas para demostrar todas las funcionalidades del sistema empresarial.

---

## ✨ Características Principales

### 🏢 **Gestión Empresarial Completa**

- **Clientes**: CRUD completo con contratos y contactos múltiples
- **Empleados**: Gestión de personal, vacaciones, licencias y ropa de trabajo
- **Vehículos**: Control de flota con mantenimientos y documentación
- **Baños Químicos**: Inventario completo con estados y mantenimientos

### 📊 **Operaciones y Servicios**

- **Servicios**: Instalación, limpieza y retiro de equipos
- **Asignación de Recursos**: Automática y manual de empleados, vehículos y equipos
- **Programación**: Sistema de limpiezas futuras automatizadas
- **Mantenimientos**: Preventivos y correctivos para vehículos y equipos

### 🔐 **Sistema de Seguridad**

- **Autenticación JWT** con roles diferenciados
- **Control de acceso** granular (ADMIN, SUPERVISOR, OPERARIO)
- **Validación robusta** de datos con class-validator
- **Encriptación** de contraseñas con bcrypt

### 📈 **Reportes y Notificaciones**

- **Dashboard** con métricas en tiempo real
- **Exportación** a Excel de reportes
- **Sistema de emails** automático
- **Alertas** de vencimientos y mantenimientos

---

## 🛠️ Stack Tecnológico

### **Backend Framework**

```typescript
NestJS v11.0.1          // Framework principal
TypeScript v5.7.3       // Lenguaje de programación
Node.js                 // Runtime
```

### **Base de Datos**

```typescript
PostgreSQL              // Base de datos principal
TypeORM v0.3.21        // ORM para mapeo objeto-relacional
```

### **Autenticación y Seguridad**

```typescript
JWT (@nestjs/jwt)       // Tokens de autenticación
Passport v0.7.0         // Estrategias de autenticación
bcrypt v5.1.1          // Hash de contraseñas
```

### **Utilidades y Herramientas**

```typescript
class-validator v0.14.1 // Validación de DTOs
class-transformer v0.5.1// Transformación de datos
nodemailer v6.10.1     // Sistema de emails
ExcelJS v4.4.0         // Generación de reportes
date-fns v4.1.0        // Manejo de fechas
```

### **Calidad de Código**

```typescript
ESLint v9.18.0         // Linting de código
Prettier v3.4.2       // Formateo de código
```

### **Deploy y DevOps**

```typescript
Docker; // Containerización
Railway; // Plataforma de deploy
PM2; // Process manager
```

---

## 📁 Arquitectura del Sistema

### **Patrón de Diseño**

- **Modular Architecture**: Cada funcionalidad en su propio módulo
- **Repository Pattern**: Implementado a través de TypeORM
- **DTO Pattern**: Data Transfer Objects para validación
- **Service Layer**: Lógica de negocio separada de controladores

### **Estructura de Módulos**

```
src/
├── auth/                 # Autenticación y autorización
├── users/               # Gestión de usuarios
├── clients/             # Gestión de clientes
├── employees/           # Gestión de empleados
├── vehicles/            # Gestión de vehículos
├── chemical_toilets/    # Gestión de baños químicos
├── services/            # Servicios de instalación/limpieza
├── contractual_conditions/ # Contratos y condiciones
├── toilet_maintenance/  # Mantenimiento de baños
├── vehicle_maintenance/ # Mantenimiento de vehículos
├── future_cleanings/    # Programación de limpiezas
├── employee_leaves/     # Licencias y vacaciones
├── salary_advance/      # Adelantos de sueldo
├── clients_portal/      # Portal de clientes
├── mailer/             # Sistema de emails
├── scheduler/          # Tareas programadas
├── clothing/           # Gestión de ropa de trabajo
└── recent-activity/    # Actividad del sistema
```

---

## 🚀 Instalación y Configuración

### **Prerrequisitos**

```bash
Node.js >= 18.0.0
PostgreSQL >= 13
npm >= 8.0.0
```

### **Instalación**

```bash
# Clonar el repositorio
git clone https://github.com/ArielDRighi/mva-backend-portfolio.git

# Instalar dependencias
npm install

# Compilar el proyecto
npm run build
```

### **Configuración del Entorno**

```bash
# Crear archivo .env
cp .env.example .env

# Variables principales
NODE_ENV=development
PORT=3000

# Base de datos
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=mva_db

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION_TIME=8h

# Email
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### **Configuración de Base de Datos**

```bash
# Crear usuario administrador inicial
npm run seed:admin

# Cargar datos de prueba
npm run seed:test-data
```

---

## 🎮 Comandos Disponibles

### **Desarrollo**

```bash
npm run start           # Iniciar en modo producción
npm run start:dev       # Modo desarrollo con hot reload
npm run start:debug     # Modo debug
```

### **Producción**

```bash
npm run build          # Compilar para producción
npm run start:prod     # Iniciar en modo producción
```

### **Scripts de Base de Datos**

```bash
npm run seed:admin          # Crear usuario admin
npm run seed:test-data      # Datos de prueba
npm run seed:clients        # Solo clientes
npm run migrate:cbu         # Migración específica
```

---

## 📊 Modelo de Base de Datos

### **Entidades Principales**

#### **Usuarios y Autenticación**

- `users` - Usuarios del sistema
- `roles` - Sistema de roles y permisos

#### **Gestión de Personal**

- `employees` - Información de empleados
- `employee_leaves` - Licencias y vacaciones
- `clothing_specs` - Talles de ropa de trabajo
- `licenses` - Licencias de conducir
- `emergency_contacts` - Contactos de emergencia

#### **Clientes y Contratos**

- `clients` - Información de clientes
- `contractual_conditions` - Contratos y tarifas
- `claims` - Reclamos de clientes
- `satisfaction_survey` - Encuestas de satisfacción

#### **Recursos y Equipos**

- `vehicles` - Flota de vehículos
- `chemical_toilets` - Inventario de baños químicos
- `vehicle_maintenance` - Mantenimiento de vehículos
- `toilet_maintenance` - Mantenimiento de baños

#### **Operaciones**

- `servicios` - Servicios realizados
- `asignacion_recursos` - Asignación de recursos
- `future_cleanings` - Limpiezas programadas
- `salary_advances` - Adelantos de sueldo

---

## 🔒 Seguridad y Autenticación

### **Sistema de Roles**

```typescript
enum Role {
  ADMIN = 'ADMIN', // Acceso total
  SUPERVISOR = 'SUPERVISOR', // Gestión operativa
  OPERARIO = 'OPERARIO', // Consulta y ejecución
}
```

### **Protección de Endpoints**

```typescript
@Controller('resource')
@UseGuards(JwtAuthGuard) // Autenticación obligatoria
export class ResourceController {
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.SUPERVISOR) // Control por roles
  @Post()
  create() {
    /* ... */
  }
}
```

### **Credenciales de Prueba**

```
Email: test@ar.com
Password: Test1234
Rol: ADMIN
```

---

## 📡 API Endpoints

### **Autenticación**

```http
POST /api/auth/login           # Iniciar sesión
POST /api/auth/register        # Registrar usuario
GET  /api/auth/profile         # Perfil del usuario
```

### **Gestión de Recursos**

```http
# Clientes
GET    /api/clients            # Listar clientes
POST   /api/clients            # Crear cliente
PUT    /api/clients/:id        # Actualizar cliente
DELETE /api/clients/:id        # Eliminar cliente

# Empleados
GET    /api/employees          # Listar empleados
POST   /api/employees          # Crear empleado
GET    /api/employees/:id      # Obtener empleado

# Vehículos
GET    /api/vehicles           # Listar vehículos
POST   /api/vehicles           # Crear vehículo
GET    /api/vehicles/documentos-por-vencer  # Documentos próximos a vencer

# Baños Químicos
GET    /api/chemical_toilets   # Listar baños
POST   /api/chemical_toilets   # Crear baño
GET    /api/chemical_toilets/stats/:id      # Estadísticas
```

### **Operaciones**

```http
# Servicios
GET    /api/services           # Listar servicios
POST   /api/services           # Crear servicio
GET    /api/services/today     # Servicios de hoy
GET    /api/services/pending   # Servicios pendientes

# Mantenimientos
GET    /api/toilet_maintenance      # Mantenimientos de baños
POST   /api/toilet_maintenance      # Crear mantenimiento
GET    /api/vehicle_maintenance     # Mantenimientos de vehículos
```

---

## 📈 Funcionalidades Destacadas

### **Dashboard y Métricas**

- Contadores en tiempo real de recursos
- Gráficos de servicios completados
- Alertas de mantenimientos pendientes
- Seguimiento de documentos por vencer

### **Gestión de Servicios**

- **Asignación automática** de recursos disponibles
- **Asignación manual** para casos específicos
- **Programación inteligente** de limpiezas futuras
- **Control de estados** (pendiente, en progreso, completado)

### **Sistema de Notificaciones**

- Emails automáticos de confirmación
- Alertas de vencimientos de documentos
- Notificaciones de mantenimientos
- Reportes programados

### **Exportación de Datos**

- Reportes en Excel personalizables
- Filtros avanzados por fechas y estados
- Exportación de listas completas
- Datos formateados para análisis

---

## 🌐 Deploy y Producción

### **Variables de Producción**

```bash
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:port/database

# SSL (Opcional)
SSL_CERT_PATH=/path/to/certificate.crt
SSL_KEY_PATH=/path/to/private.key

# Frontend
FRONTEND_URL=https://your-frontend-domain.com
VERCEL_URL=https://your-vercel-app.vercel.app
```

### **Deploy en Railway**

```bash
# Build para Railway
npm run build:railway

# Setup inicial de BD
npm run setup:railway

# Crear admin en Railway
npm run seed:admin:railway
```

### **Docker**

```bash
# Construir imagen
docker build -t mva-backend .

# Ejecutar contenedor
docker run -p 3000:3000 --env-file .env mva-backend
```

---

## 📚 Documentación Técnica

El proyecto incluye documentación detallada en `/src/docs/`:

- **USERS.md** - Sistema de usuarios y autenticación
- **ROLES.md** - Control de acceso y permisos
- **TUTORIAL_MANEJO_COMPLETO_DE_LA_APLICACION.md** - Guía completa de uso
- **ADMIN-USER.md** - Creación de usuario administrador
- **MAILER.md** - Sistema de correos electrónicos
- **CONVENTIONS.md** - Convenciones de código

---

## 🎯 Logros del Proyecto

### **Arquitectura Escalable**

- **17 módulos** organizados por dominio
- **Más de 40 entidades** relacionadas
- **Sistema de roles** granular
- **API REST** completamente documentada

### **Funcionalidades Avanzadas**

- **Asignación inteligente** de recursos
- **Programación automática** de servicios
- **Sistema de notificaciones** completo
- **Reportes dinámicos** exportables

### **Calidad de Código**

- **TypeScript** al 100%
- **Validaciones robustas** en todos los endpoints
- **Patrones de diseño** bien implementados
- **Documentación completa** del código

---

## 👨‍💻 Contacto y Portfolio

**Ariel D. Righi**  
_Backend Developer & Project Manager_

- 💼 **LinkedIn**: [linkedin.com/in/ariel-righi](https://www.linkedin.com/in/ariel-righi-230143237/)
- 📧 **Email**: [arieldavidrighi@gmail.com](mailto:arieldavidrighi@gmail.com)
- 🐱 **GitHub**: [github.com/ArielDRighi](https://github.com/ArielDRighi)

### **🚀 Esta Aplicación en Producción**

- **🔗 Demo Live**: [https://ar-admin-portfolio.vercel.app](https://ar-admin-portfolio.vercel.app)
- **⚙️ Backend**: Desplegado en Railway
- **🎨 Frontend**: Desplegado en Vercel
- **🗄️ Base de Datos**: PostgreSQL en Railway

---

## 📄 Licencia

Este proyecto fue desarrollado para **MVA SRL** como parte de un sistema empresarial real. El código se comparte con fines de portfolio y demostración de habilidades técnicas.

---

<p align="center">
  <strong>Desarrollado con ❤️ usando NestJS y TypeScript</strong>
</p>
