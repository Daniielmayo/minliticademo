# MINLÍTICA: Plataforma de Gestión Minera SaaS

**Acerca del Proyecto**
**MINLÍTICA** es una plataforma SaaS (Software as a Service) en la nube desarrollada por **ENERLÍTICA** para gestionar las obligaciones y trámites mineros de la empresa **CMH Colombia SAS**. Su propósito fundamental es centralizar, controlar y otorgar trazabilidad en tiempo real a toda la operación minera en un único entorno digital. La plataforma busca transformar los datos operativos en decisiones inteligentes bajo la premisa corporativa de lograr "activos más rentables".

**El Problema que Resuelve**
El sistema soluciona los riesgos operativos generados al tener información crítica aislada o dispersa en correos, carpetas, archivos de Excel y PDFs. Al eliminar la dependencia de seguimientos manuales y de personas específicas, previene el incumplimiento normativo automatizando alertas para vencimientos críticos.

**Características y Módulos Principales**
La plataforma se estructura en módulos diseñados para cubrir las dimensiones operativas, legales y administrativas de la gestión minera:

*   **Titulación y Contratos:** Funciona como el inventario base para registrar, visualizar (en listas o mapas) y gestionar todo el universo de títulos mineros, solicitudes en trámite y subcontratos de formalización.
*   **Cumplimiento de Obligaciones:** Administra y supervisa las obligaciones de los contratos vigentes, tales como pagos de regalías, canon superficiario, presentación de informes técnicos y planes de cierre minero.
*   **Requerimientos Regulatorios y Amparos Administrativos:** Centraliza las comunicaciones ante la Agencia Nacional de Minería (ANM), controlando plazos de respuesta, subsanaciones documentales, etapas procesales y recursos legales interpuestos.
*   **Producción:** Visualiza indicadores y métricas de producción (maquinaria, horas hombre) y facilita la exportación de información según los formatos exigidos por la ANM.
*   **Explosivos:** Facilita el control de inventarios, generación de reportes a la autoridad militar, estadísticas de consumo, actas de quema e indicadores de uso (como el factor de potencia).
*   **Gestión Ambiental y HSEQ:** Mantiene un inventario gráfico de permisos y requerimientos ambientales, genera alertas de nuevos decretos y agrupa los indicadores del sistema de gestión de seguridad (capacitaciones, EPPs, evidencias).
*   **Riesgos:** Proporciona un entorno visual para monitorear los riesgos en cada módulo de la plataforma.

**Beneficios Clave**
*   **Cumplimiento Garantizado:** Emite alertas automáticas previas a cualquier vencimiento para evitar penalizaciones o descuidos por descoordinación del equipo.
*   **Trazabilidad Total:** Conserva un historial completo y auditable de cada actuación, comunicación con la ANM y documento radicado.
*   **Visibilidad Gerencial:** Dispone de *dashboards* ejecutivos que muestran en tiempo real los indicadores clave de cumplimiento, riesgo regulatorio y estado de la cartera de títulos.
*   **Trabajo Colaborativo:** Permite un acceso multiusuario con roles y permisos específicos para los distintos equipos legales, técnicos, financieros y directivos.

---

## 📋 Requisitos Previos

Asegúrate de tener instalados los siguientes requerimientos antes de iniciar:

- [Node.js](https://nodejs.org/) (versión 18.x o superior recomendada)
- Gestor de paquetes: `npm`, `yarn`, `pnpm` o `bun`

## 🚀 Instalación

1. Clona el repositorio y navega a la carpeta del proyecto.
2. Instala las dependencias del proyecto utilizando tu gestor de paquetes preferido:

```bash
npm install
# o
yarn install
# o
pnpm install
```

## 💻 Desarrollo

Para iniciar el servidor de desarrollo local, ejecuta:

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

Una vez que el servidor esté en funcionamiento, abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación. El servidor se recargará automáticamente si realizas cambios en el código.

## 🏗️ Estructura del Proyecto

El código fuente principal se encuentra dentro del directorio `app/`. Las modificaciones y el desarrollo de nuevas vistas o componentes deben realizarse dentro de este directorio y otras carpetas de estructura definidas (como `components/`, `lib/`, `hooks/`, etc.).

## 🛠️ Construcción para Producción

Para generar una versión optimizada lista para producción, ejecuta:

```bash
npm run build
# o
yarn build
```

Posteriormente, puedes probar la versión de producción localmente con:

```bash
npm run start
# o
yarn start
```
