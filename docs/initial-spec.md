# Spec — Frontend Starter shadcn/ui

## 1. Objetivo

Crear un **starter frontend basado en shadcn/ui** que sirva como plantilla y guía para nuevos proyectos frontend.

El proyecto debe demostrar una estructura sencilla. Debe utilizar **datos fake/mock**.


## 2. Stack

* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* Vite
* Datos mock/fake para todas las funcionalidades
* No requiere backend real
* No requiere base de datos

## 3. Estructura general

La aplicación debe tener una única aplicación autenticada con:

* Login
* Layout principal (Sidebar, Navbar/Header, Área de contenido vacío)
* Configuración
* Perfil de usuario

No es necesario implementar múltiples aplicaciones o layouts complejos.

## 4. Login

El login debe estar basado en la plantilla oficial de shadcn:

```bash
npx shadcn@latest add login-01
```

Requisitos:

* Utilizar la estructura visual de `login-01`.
* Permitir ingresar con email y contraseña.
* La autenticación debe ser simulada.
* No debe existir integración con un backend real.
* Después de iniciar sesión correctamente, navegar al layout principal.
* Mostrar validaciones básicas del formulario.

## 5. Layout principal

La aplicación autenticada debe utilizar un layout compuesto por:

* Sidebar
* Navbar/Header
* Área principal de contenido

El Sidebar debe estar basado en la plantilla:

```bash
npx shadcn@latest add sidebar-07
```

Debe conservarse la filosofía visual y estructural de dicha plantilla.

## 6. Sidebar

El Sidebar debe incluir como mínimo:

* Dashboard
* Configuración
* Perfil
* Opción para cerrar sesión

Debe utilizar los componentes de shadcn/ui correspondientes y mantener una navegación clara y consistente.

La opción activa debe visualizarse correctamente.

## 7. Dashboard

La página principal después del login debe ser una página con placeholders, sin nada.o construir una página utilizando los componentes disponibles.

## 8. Configuración

Debe existir un módulo de **Configuración**.

La configuración debe permitir gestionar usuarios utilizando datos fake.

### Gestión de usuarios

Debe existir una pantalla de usuarios con:

* Listado de usuarios
* Nombre
* Email
* Rol
* Estado
* Fecha de creación
* Última conexión
* Búsqueda
* Filtrado básico
* Acciones sobre el usuario

Las acciones pueden ser simuladas mediante datos mock y mensajes de confirmación.

No se requiere persistencia real.

## 9. Perfil de usuario

Debe existir una sección de perfil donde el usuario pueda gestionar su información.

Debe permitir:

* Cambiar nombre
* Visualizar email
* Cambiar contraseña
* Mostrar información básica de la cuenta

El cambio de contraseña debe ser simulado.

Los formularios deben incluir:

* Validaciones
* Estados de loading
* Mensajes de éxito/error simulados


## 11. Datos fake

Toda la información de la aplicación debe provenir de datos mock.


No implementar una capa de repositorios, servicios o arquitectura de datos compleja para este starter.

## 12. Arquitectura

La arquitectura debe ser **simple y pragmática**.

No utilizar:

* Arquitectura hexagonal
* Clean Architecture
* CQRS
* Event sourcing
* Capas abstractas innecesarias
* Patrones enterprise que no aporten valor al starter

La lógica relacionada con la interfaz puede convivir con el framework y los componentes cuando resulte razonable.

La estructura debe favorecer:

* Facilidad de lectura
* Facilidad de modificación
* Bajo acoplamiento
* Reutilización razonable
* Poca abstracción

## 13. Responsive Design

La aplicación debe ser responsive y funcionar correctamente en:

* Desktop
* Tablet
* Mobile

El Sidebar debe comportarse correctamente en dispositivos pequeños utilizando los mecanismos proporcionados por shadcn/ui.

## 14. Tema visual

Debe soportar:

* Light mode
* Dark mode

El cambio de tema debe estar disponible solo por código como lo indica https://ui.shadcn.com/docs/theming cambiando los valores de globals.css

## 16. Criterios de implementación

* Seguir las convenciones de shadcn/ui.
* Preferir componentes existentes de shadcn antes que componentes personalizados.
* Mantener los componentes pequeños y fáciles de entender.
* Evitar sobreingeniería.
* Utilizar TypeScript correctamente.
* Evitar `any` salvo que exista una razón justificada.
* Mantener los datos mock separados de la UI.
* No implementar backend.
* No implementar autenticación real.
* No implementar persistencia.
* No agregar funcionalidades que no estén contempladas en esta spec.

## 17. Resultado esperado

El resultado debe ser un **starter frontend funcional y visualmente pulido** que pueda utilizarse como punto de partida para nuevos proyectos.

