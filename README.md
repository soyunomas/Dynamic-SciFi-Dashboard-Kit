# Dynamic-SciFi-Dashboard-Kit

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/Soyunomas/Dynamic-SciFi-Dashboard-Kit.svg?style=social&label=Star)](https://github.com/Soyunomas/Dynamic-SciFi-Dashboard-Kit/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Soyunomas/Dynamic-SciFi-Dashboard-Kit.svg?style=social&label=Fork)](https://github.com/Soyunomas/Dynamic-SciFi-Dashboard-Kit/network/members)
<!-- Puedes añadir más badges, como versión, estado de build, etc. si aplica -->

**Dynamic-SciFi-Dashboard-Kit** es una librería JavaScript ligera y personalizable para crear interfaces de usuario interactivas con una estética futurista y de ciencia ficción. Ofrece un conjunto de componentes de "panel" listos para usar, diseñados para construir dashboards dinámicos y visualmente atractivos.

## Características

*   **Componentes Modulares:** Una variedad de paneles para diferentes propósitos (logs, alertas, datos, gráficos, etc.).
*   **Estética Sci-Fi:** Estilos predefinidos con un toque futurista, incluyendo efectos como "scanlines" y "sparks".
*   **Personalizable:** La apariencia se puede modificar fácilmente mediante variables CSS.
*   **JavaScript Moderno:** Escrito en ES6+ sin dependencias externas pesadas (solo usa Bootstrap para el layout de los ejemplos).
*   **Fácil de Usar:** API sencilla para integrar y controlar los paneles.
*   **Responsivo (con Bootstrap):** Los ejemplos y la estructura de los paneles están pensados para adaptarse a diferentes tamaños de pantalla con la ayuda de un framework como Bootstrap.
  
## Demo

Aquí podrás ver una demo con todos los paneles (pulsa los botones para cambiar de estados).

<p align="center">
  <a href="https://soyunomas.github.io/Dynamic-SciFi-Dashboard-Kit/demo.html" target="_blank" rel="noopener noreferrer">
    <img src="./screenshots/demo-screenshot.png" alt="Captura de pantalla de la demo Dynamic SciFi Dashboard Kit" width="75%">
  </a>
</p>

[**Enlace**](https://soyunomas.github.io/Dynamic-SciFi-Dashboard-Kit/demo.html)

## Paneles Disponibles

Aquí tienes un vistazo rápido a los paneles que ofrece la librería. Haz clic en una imagen para ver un ejemplo en vivo.

| Panel                         | Screenshot                                                                                 | Ejemplo en Vivo (GitHub Pages)                                        |
| :---------------------------- | :-----------------------------------------------------------------------------------------: | :--------------------------------------------------------------------: |
| **LogDisplayPanel**           | [![LogDisplayPanel Screenshot][log-screenshot]](https://soyunomas.github.io/Dynamic-SciFi-Dashboard-Kit/examples/LogDisplayPanel.html) | [Ver Ejemplo](https://soyunomas.github.io/Dynamic-SciFi-Dashboard-Kit/examples/LogDisplayPanel.html) |
| **CriticalWarningTextPanel**  | [![CriticalWarningTextPanel Screenshot][critwarn-screenshot]](https://soyunomas.github.io/Dynamic-SciFi-Dashboard-Kit/examples/CriticalWarningTextPanel.html) | [Ver Ejemplo](https://soyunomas.github.io/Dynamic-SciFi-Dashboard-Kit/examples/CriticalWarningTextPanel.html) |
| **KeyValueListPanel**       | [![KeyValueListPanel Screenshot][kv-screenshot]](https://soyunomas.github.io/Dynamic-SciFi-Dashboard-Kit/examples/KeyValueListPanel.html) | [Ver Ejemplo](https://soyunomas.github.io/Dynamic-SciFi-Dashboard-Kit/examples/KeyValueListPanel.html) |
| **LedDisplayPanel**           | [![LedDisplayPanel Screenshot][led-screenshot]](https://soyunomas.github.io/Dynamic-SciFi-Dashboard-Kit/examples/LedDisplayPanel.html) | [Ver Ejemplo](https://soyunomas.github.io/Dynamic-SciFi-Dashboard-Kit/examples/LedDisplayPanel.html) |
| **DynamicTextPanel**        | [![DynamicTextPanel Screenshot][dyntext-screenshot]](https://soyunomas.github.io/Dynamic-SciFi-Dashboard-Kit/examples/DynamicTextPanel.html) | [Ver Ejemplo](https://soyunomas.github.io/Dynamic-SciFi-Dashboard-Kit/examples/DynamicTextPanel.html) |
| **ActionButtonsPanel**      | [![ActionButtonsPanel Screenshot][action-screenshot]](https://soyunomas.github.io/Dynamic-SciFi-Dashboard-Kit/examples/ActionButtonsPanel.html) | [Ver Ejemplo](https://soyunomas.github.io/Dynamic-SciFi-Dashboard-Kit/examples/ActionButtonsPanel.html) |
| **CanvasGraphPanel**        | [![CanvasGraphPanel Screenshot][canvas-screenshot]](https://soyunomas.github.io/Dynamic-SciFi-Dashboard-Kit/examples/CanvasGraphPanel.html) | [Ver Ejemplo](https://soyunomas.github.io/Dynamic-SciFi-Dashboard-Kit/examples/CanvasGraphPanel.html) |
| **IntegrityPulsePanel**     | [![IntegrityPulsePanel Screenshot][pulse-screenshot]](https://soyunomas.github.io/Dynamic-SciFi-Dashboard-Kit/examples/IntegrityPulsePanel.html) | [Ver Ejemplo](https://soyunomas.github.io/Dynamic-SciFi-Dashboard-Kit/examples/IntegrityPulsePanel.html) |
| **CircularGaugePanel**      | [![CircularGaugePanel Screenshot][circgauge-screenshot]](https://soyunomas.github.io/Dynamic-SciFi-Dashboard-Kit/examples/CircularGaugePanel.html) | [Ver Ejemplo](https://soyunomas.github.io/Dynamic-SciFi-Dashboard-Kit/examples/CircularGaugePanel.html) |
| **StatusIndicatorLedPanel** | [![StatusIndicatorLedPanel Screenshot][statusled-screenshot]](https://soyunomas.github.io/Dynamic-SciFi-Dashboard-Kit/examples/StatusIndicatorLedPanel.html) | [Ver Ejemplo](https://soyunomas.github.io/Dynamic-SciFi-Dashboard-Kit/examples/StatusIndicatorLedPanel.html) |
| **HorizontalBarGaugePanel** | [![HorizontalBarGaugePanel Screenshot][hgauge-screenshot]](https://soyunomas.github.io/Dynamic-SciFi-Dashboard-Kit/examples/HorizontalBarGaugePanel.html) | [Ver Ejemplo](https://soyunomas.github.io/Dynamic-SciFi-Dashboard-Kit/examples/HorizontalBarGaugePanel.html) |

<!-- Definiciones de enlaces para las imágenes (ponlas al final del archivo) -->
[log-screenshot]: ./screenshots/LogDisplayPanel.png
[critwarn-screenshot]: ./screenshots/CriticalWarningTextPanel.png
[kv-screenshot]: ./screenshots/KeyValueListPanel.png
[led-screenshot]: ./screenshots/LedDisplayPanel.png
[dyntext-screenshot]: ./screenshots/DynamicTextPanel.png
[action-screenshot]: ./screenshots/ActionButtonsPanel.png
[canvas-screenshot]: ./screenshots/CanvasGraphPanel.png
[pulse-screenshot]: ./screenshots/IntegrityPulsePanel.png
[circgauge-screenshot]: ./screenshots/CircularGaugePanel.png
[statusled-screenshot]: ./screenshots/StatusIndicatorLedPanel.png
[hgauge-screenshot]: ./screenshots/HorizontalBarGaugePanel.png


## Instalación

1.  Descarga (o clona) este repositorio.
2.  Incluye los archivos `DynamicSciFiDashboardKit.css` y `DynamicSciFiDashboardKit.js` en tu proyecto HTML:

```html
<head>
    <!-- ... tus otras etiquetas head ... -->
    <link rel="stylesheet" href="path/to/DynamicSciFiDashboardKit.css">
</head>
<body>
    <!-- ... tu contenido HTML ... -->
    <script src="path/to/DynamicSciFiDashboardKit.js"></script>
    <script>
        // Tu código para inicializar los paneles
    </script>
</body>
```

## Guía de Uso

Para una guía detallada sobre cómo usar cada panel, sus opciones y métodos, por favor consulta la [**Guía de Uso Completa (`docs/USAGE_GUIDE.md`)**](./docs/USAGE_GUIDE.md).

## Personalización

La apariencia de los paneles se puede personalizar extensamente sobrescribiendo las variables CSS definidas en `DynamicSciFiDashboardKit.css`. Revisa el archivo CSS para ver la lista de variables disponibles.

Ejemplo:
```css
/* En tu propio archivo CSS, después de importar DynamicSciFiDashboardKit.css */
:root {
    --dsdk-accent-color-main: #FF6347; /* Tomato como color de acento principal */
    --dsdk-panel-bg: rgba(20, 20, 30, 0.9);
    --dsdk-font-mono: 'Share Tech Mono', monospace;
}
```

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](./LICENSE) para más detalles.

---

Creado por [Soyunomas](https://github.com/Soyunomas)
