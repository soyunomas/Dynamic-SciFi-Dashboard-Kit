# Guía de Uso: DynamicSciFiDashboardKit

`DynamicSciFiDashboardKit` es una librería JavaScript diseñada para crear interfaces de usuario con una estética futurista y de ciencia ficción. Proporciona un conjunto de componentes (paneles) listos para usar que pueden ser fácilmente integrados en cualquier aplicación web.

**Audiencia Objetivo:** Desarrolladores web con conocimientos de HTML, CSS y JavaScript.

## 1. Instalación y Configuración

Para utilizar `DynamicSciFiDashboardKit`, necesitas incluir dos archivos en tu proyecto:

1.  **`DynamicSciFiDashboardKit.css`**: Contiene todos los estilos necesarios para los paneles.
2.  **`DynamicSciFiDashboardKit.js`**: Contiene la lógica de la librería y la definición de los paneles.

**Inclusión en HTML:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Mi Dashboard Sci-Fi</title>
    <link rel="stylesheet" href="path/to/DynamicSciFiDashboardKit.css">
    <style>
        /* Tus estilos personalizados aquí, si son necesarios */
        body { background-color: #05080d; padding: 20px; }
        .panel-container { min-height: 200px; margin-bottom: 20px; display: flex; flex-direction: column; }
        .panel-container > .dsdk-panel { flex-grow: 1; } /* Para que el panel ocupe el espacio */
    </style>
</head>
<body>
    <!-- Contenedores para tus paneles -->
    <div id="miLogPanel" class="panel-container"></div>
    <div id="miGaugePanel" class="panel-container" style="height: 250px;"></div>

    <script src="path/to/DynamicSciFiDashboardKit.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const DSDK = DynamicSciFiDashboardKit; // Alias para conveniencia

            // Inicialización de paneles
            const logPanel = new DSDK.LogDisplayPanel('#miLogPanel', {
                title: 'Registro de Eventos del Sistema'
            });
            logPanel.addLog({ text: 'Dashboard inicializado.', level: 'info' });

            const gaugePanel = new DSDK.CircularGaugePanel('#miGaugePanel', {
                title: 'Nivel de Energía Primaria',
                initialValue: 75,
                label: 'Reactor Principal',
                units: '%'
            });
        });
    </script>
</body>
</html>
```

**Importante:**
*   Asegúrate de que las rutas a `DynamicSciFiDashboardKit.css` y `DynamicSciFiDashboardKit.js` sean correctas.
*   Cada panel necesita un elemento contenedor único en el DOM (por ejemplo, un `div` con un ID único).

## 2. Conceptos Básicos

### 2.1. `BasePanel`

Todos los paneles específicos heredan de una clase base llamada `BasePanel`. Esta clase proporciona funcionalidades y opciones comunes.

**Opciones Comunes (Heredadas de `BasePanel`)**:

*   `title` (`string`): Título que se muestra en la cabecera del panel. Default: `'Panel'` (o un título específico si la clase hija lo define). Si es cadena vacía o `null` y la clase no tiene título por defecto, la cabecera no se renderiza.
*   `initialState` (`string`): Estado visual inicial del panel. Valores válidos: `'normal'`, `'warning'`, `'critical'`, `'stable'`. Default: `'normal'`.
*   `enableSparks` (`boolean`): Habilita un efecto de chispas en los bordes del panel para los estados `'critical'` y `'warning'`. Default: `true` (puede ser sobrescrito por la clase hija).
*   `enableScanlineHalo` (`boolean`): Habilita un efecto visual de "scanlines" sobre el panel. Default: `false` (puede ser sobrescrito por la clase hija).
*   `scanlineHaloColor` (`string | null`): Color CSS específico para el efecto scanline. Si es `null`, el color se determina automáticamente según el estado del panel. Default: `null`.
*   `scanlineThickness` (`string`): Grosor de las scanlines (ej. `'4px'`). Default: `'4px'`.
*   `scanlineOpacity` (`number`): Opacidad de las scanlines (un valor entre 0 y 1). Default: `0.08`.
*   `scanlineStates` (`array`): Array de strings que define en qué estados del panel se mostrará el efecto scanline (si `enableScanlineHalo` es `true`). Default: `['critical', 'warning']`.

**Métodos Comunes (Heredados de `BasePanel`)**:

*   `setPanelState(newState)`: Cambia el estado visual general del panel.
    *   `newState` (`string`): Uno de los estados válidos: `'normal'`, `'warning'`, `'critical'`, `'stable'`.
*   `setScanlineHalo(enabled, options = {})`: Configura o activa/desactiva el efecto scanline.
    *   `enabled` (`boolean`): `true` para activar, `false` para desactivar.
    *   `options` (`object`, opcional): Un objeto con propiedades para personalizar el efecto:
        *   `color` (`string`, opcional): Color CSS para las scanlines.
        *   `thickness` (`string`, opcional): Grosor de las scanlines.
        *   `opacity` (`number`, opcional): Opacidad de las scanlines.
*   `destroy()`: Elimina el panel del DOM y limpia los recursos asociados (event listeners, timers de animación). **Muy importante llamar a este método** cuando un panel ya no es necesario para evitar fugas de memoria.

### 2.2. Inicialización de un Panel

Para crear una instancia de cualquier panel:

```javascript
const miPanel = new DynamicSciFiDashboardKit.NombreDelPanel('#idDelContenedor', {
    // opciones específicas del panel y comunes aquí
});
```

*   `#idDelContenedor`: Selector CSS del elemento HTML que contendrá el panel.
*   `{opciones}`: Un objeto de configuración.

## 3. Documentación de Paneles

A continuación, se detalla cada panel disponible.

### 3.1. `LogDisplayPanel`

Muestra una lista de mensajes de log con diferentes niveles de severidad.

**Inicialización:**
```javascript
const logPanel = new DynamicSciFiDashboardKit.LogDisplayPanel('#logContainer', {
    title: 'System Logs',
    maxEntries: 50,
    initialState: 'normal'
});
```

**Opciones Específicas:**
*   `title` (`string`): Título del panel. Default: `'Log Display'`.
*   `maxEntries` (`number`): Número máximo de entradas de log a mostrar. Las más antiguas se eliminan automáticamente. Default: `20`.

**Métodos Específicos:**
*   `addLog(logEntry)`: Añade una nueva entrada al log.
    *   `logEntry` (`object`): Un objeto con las siguientes propiedades:
        *   `text` (`string`): El mensaje de log.
        *   `level` (`string`, opcional): Nivel del log. Valores válidos: `'info'`, `'warn'`, `'error'`, `'success'`. Afecta el color del texto.
*   `clearLogs()`: Elimina todas las entradas del log.

**Ejemplo de Uso:**
```javascript
// HTML: <div id="logDemo" class="panel-container"></div>

const logPanel = new DynamicSciFiDashboardKit.LogDisplayPanel('#logDemo', {
    title: 'Activity Log',
    maxEntries: 5,
    enableScanlineHalo: true,
    scanlineStates: ['critical', 'warning']
});

logPanel.addLog({ text: 'System boot sequence initiated.', level: 'info' });
logPanel.addLog({ text: 'Power levels nominal.', level: 'success' });
logPanel.addLog({ text: 'Anomaly detected in Sector 7.', level: 'warn' });
logPanel.addLog({ text: 'Shields at 20%!', level: 'error' });

setTimeout(() => {
    logPanel.setPanelState('warning');
    logPanel.addLog({ text: 'Investigating anomaly...', level: 'info' });
}, 2000);

setTimeout(() => {
    logPanel.setPanelState('critical');
    logPanel.addLog({ text: 'Hull breach imminent!', level: 'error' });
}, 4000);
```

### 3.2. `CriticalWarningTextPanel`

Muestra un texto grande y llamativo, ideal para alertas críticas o mensajes de estado importantes.

**Inicialización:**
```javascript
const warningPanel = new DynamicSciFiDashboardKit.CriticalWarningTextPanel('#warningContainer', {
    initialText: 'SYSTEM OFFLINE',
    initialWarningState: 'critical'
});
```

**Opciones Específicas:**
*   `title` (`string`): Título del panel. Default: `''` (sin cabecera, para dar más énfasis al texto).
*   `initialText` (`string`): El texto que se mostrará inicialmente. Default: `'WARNING'`.
*   `initialWarningState` (`string`): Estado interno del texto, que afecta su animación y el estado base del panel. Valores válidos: `'critical'`, `'stabilizing'`, `'stable'`. Default: `'critical'`.
*   `fontSize` (`string`): Tamaño de fuente CSS para el texto de advertencia. Default: `'2.2rem'`.
*   `enableSparks` (`boolean`): Default: `true`.
*   `enableScanlineHalo` (`boolean`): Default: `true`.
*   `scanlineThickness` (`string`): Default: `'3px'`.
*   `scanlineOpacity` (`number`): Default: `0.1`.

**Métodos Específicos:**
*   `setWarningState(newState, newText)`: Cambia el estado interno del texto y, opcionalmente, el texto mismo.
    *   `newState` (`string`): `'critical'`, `'stabilizing'`, o `'stable'`. Esto también actualizará el `panelState` general (ej. `critical` para `critical`, `warning` para `stabilizing`, `stable` para `stable`).
    *   `newText` (`string`, opcional): El nuevo texto a mostrar.
*   `setText(newText)`: Cambia únicamente el texto mostrado, sin alterar el `warningState`.
    *   `newText` (`string`): El nuevo texto.

**Ejemplo de Uso:**
```javascript
// HTML: <div id="critWarnDemo" class="panel-container" style="height: 150px;"></div>

const critWarnPanel = new DynamicSciFiDashboardKit.CriticalWarningTextPanel('#critWarnDemo', {
    initialText: 'SYSTEM ONLINE',
    initialWarningState: 'stable',
    fontSize: '2rem'
});

setTimeout(() => {
    critWarnPanel.setWarningState('stabilizing', 'ENERGY SPIKE DETECTED');
}, 3000);

setTimeout(() => {
    critWarnPanel.setWarningState('critical', 'REACTOR OVERLOAD!');
}, 6000);
```

### 3.3. `KeyValueListPanel`

Muestra una lista de pares clave-valor, útil para mostrar datos de configuración o telemetría.

**Inicialización:**
```javascript
const dataPanel = new DynamicSciFiDashboardKit.KeyValueListPanel('#dataContainer', {
    title: 'System Parameters'
});
```

**Opciones Específicas:**
*   `title` (`string`): Título del panel. Default: `'Data List'`.

**Métodos Específicos:**
*   `setItems(itemsArray)`: Establece o reemplaza todos los ítems de la lista.
    *   `itemsArray` (`array`): Un array de objetos, donde cada objeto representa un ítem y tiene la forma:
        *   `key` (`string`): La clave.
        *   `value` (`string | number`): El valor.
        *   `statusClass` (`string`, opcional): Una clase CSS para aplicar estilo al valor (ej. `DSDK_CLASSES.TEXT_DANGER`, `DSDK_CLASSES.TEXT_SUCCESS`).
*   `updateItem(key, newValue, newStatusClass)`: Actualiza un ítem existente identificado por su clave.
    *   `key` (`string`): La clave del ítem a actualizar.
    *   `newValue` (`string | number`): El nuevo valor.
    *   `newStatusClass` (`string`, opcional): La nueva clase de estado para el valor.
*   `addItem(itemObject)`: Añade un nuevo ítem o actualiza uno existente si la clave ya existe.
    *   `itemObject` (`object`): Similar a un objeto en `itemsArray`.

**Ejemplo de Uso:**
```javascript
// HTML: <div id="kvDemo" class="panel-container"></div>

const kvPanel = new DynamicSciFiDashboardKit.KeyValueListPanel('#kvDemo', {
    title: 'Core Telemetry',
    initialState: 'stable'
});

kvPanel.setItems([
    { key: 'Temperature', value: '75°C', statusClass: DynamicSciFiDashboardKit.DSDK_CLASSES.TEXT_SUCCESS },
    { key: 'Pressure', value: '1012 hPa', statusClass: DynamicSciFiDashboardKit.DSDK_CLASSES.TEXT_INFO },
    { key: 'Shields', value: '100%', statusClass: DynamicSciFiDashboardKit.DSDK_CLASSES.TEXT_SUCCESS }
]);

setTimeout(() => {
    kvPanel.updateItem('Temperature', '95°C', DynamicSciFiDashboardKit.DSDK_CLASSES.TEXT_WARNING);
    kvPanel.setPanelState('warning');
}, 2500);

setTimeout(() => {
    kvPanel.addItem({ key: 'Hull Integrity', value: '40%', statusClass: DynamicSciFiDashboardKit.DSDK_CLASSES.TEXT_DANGER });
    kvPanel.setPanelState('critical');
}, 5000);
```

### 3.4. `LedDisplayPanel`

Muestra un valor numérico o de texto en un display tipo LED, con una etiqueta y opcionalmente unidades.

**Inicialización:**
```javascript
const ledPanel = new DynamicSciFiDashboardKit.LedDisplayPanel('#ledContainer', {
    label: 'Flux Capacitor',
    initialValue: 1.21,
    units: 'GW'
});
```

**Opciones Específicas:**
*   `title` (`string`): Título del panel. Default: `''` (sin cabecera).
*   `label` (`string`): Etiqueta que se muestra encima del display LED. Default: `'VALUE'`.
*   `initialValue` (`number | string`): El valor que se mostrará inicialmente. Default: `0`.
*   `initialStatus` (`string`): Estado visual del display LED. Valores: `'normal'`, `'warning'`, `'critical'`. Afecta el color y animación del display. Default: `'normal'`.
*   `units` (`string`): Unidades que se añaden después del valor (ej. 'kW', '%'). Default: `''`.

**Métodos Específicos:**
*   `setValue(value)`: Establece el valor mostrado en el display.
    *   `value` (`number | string`): El nuevo valor.
*   `setStatus(status)`: Cambia el estado visual del display LED.
    *   `status` (`string`): `'normal'`, `'warning'`, o `'critical'`.

**Ejemplo de Uso:**
```javascript
// HTML: <div id="ledDemo" class="panel-container" style="height: 180px;"></div>

const ledPanel = new DynamicSciFiDashboardKit.LedDisplayPanel('#ledDemo', {
    label: 'CORE TEMP',
    initialValue: 350,
    units: 'K',
    initialStatus: 'normal'
});
ledPanel.setPanelState('stable'); // Panel exterior

setTimeout(() => {
    ledPanel.setValue(750);
    ledPanel.setStatus('warning');
    ledPanel.setPanelState('warning');
}, 2000);

setTimeout(() => {
    ledPanel.setValue(999);
    ledPanel.setStatus('critical');
    ledPanel.setPanelState('critical');
}, 4000);
```

### 3.5. `DynamicTextPanel`

Muestra un bloque de texto con posibles efectos visuales como blur, flicker o glitch.

**Inicialización:**
```javascript
const textPanel = new DynamicSciFiDashboardKit.DynamicTextPanel('#textContainer', {
    title: 'Communications Array',
    initialText: 'Receiving transmission...'
});
```

**Opciones Específicas:**
*   `title` (`string`): Título del panel. Default: `'Dynamic Text Display'`.
*   `initialText` (`string`): El texto que se mostrará inicialmente. Default: `'Awaiting data...'`.
*   `initialEffects` (`object`): Un objeto para configurar los efectos visuales iniciales. Default: `{ blur: false, flicker: false, glitch: false, textColorClass: null }`.
    *   `blur` (`boolean`): Aplicar efecto de desenfoque.
    *   `flicker` (`boolean`): Aplicar efecto de parpadeo.
    *   `glitch` (`boolean`): Aplicar efecto de "glitch".
    *   `textColorClass` (`string | null`): Clase CSS para el color del texto (ej. `DSDK_CLASSES.TEXT_INFO`).

**Métodos Específicos:**
*   `setText(text)`: Establece el texto mostrado.
    *   `text` (`string`): El nuevo texto.
*   `setEffects(effectsObject)`: Establece o actualiza los efectos visuales. Las propiedades no incluidas en `effectsObject` no se modifican.
    *   `effectsObject` (`object`): Objeto con las mismas propiedades que `initialEffects` (todas opcionales).

**Ejemplo de Uso:**
```javascript
// HTML: <div id="dynTextDemo" class="panel-container" style="height: 150px;"></div>

const dynTextPanel = new DynamicSciFiDashboardKit.DynamicTextPanel('#dynTextDemo', {
    title: 'Data Stream',
    initialText: 'STANDBY FOR DECRYPTION',
    initialEffects: { blur: true, textColorClass: DynamicSciFiDashboardKit.DSDK_CLASSES.TEXT_INFO }
});
dynTextPanel.setPanelState('normal');

setTimeout(() => {
    dynTextPanel.setText('INCOMING MESSAGE // ORIGIN: UNKNOWN // ENCRYPTION: LEVEL 7');
    dynTextPanel.setEffects({ blur: false, flicker: true });
    dynTextPanel.setPanelState('warning');
}, 3000);

setTimeout(() => {
    dynTextPanel.setText('!@#$ CORRUPTED DATA STREAM DETECTED $#@!');
    dynTextPanel.setEffects({ flicker: false, glitch: true, textColorClass: DynamicSciFiDashboardKit.DSDK_CLASSES.TEXT_DANGER });
    dynTextPanel.setPanelState('critical');
}, 6000);
```

### 3.6. `ActionButtonsPanel`

Muestra un conjunto de botones configurables con acciones asociadas.

**Inicialización:**
```javascript
const actionPanel = new DynamicSciFiDashboardKit.ActionButtonsPanel('#actionsContainer', {
    title: 'System Controls',
    buttons: [
        { id: 'btn-scan', text: 'Scan Sector', onClick: () => console.log('Scanning...') }
    ]
});
```

**Opciones Específicas:**
*   `title` (`string`): Título del panel. Default: `'Actions'`.
*   `buttons` (`array`): Un array de objetos de configuración de botón. Default: `[]`. Cada objeto botón:
    *   `id` (`string`, **requerido**): Identificador único para el botón.
    *   `text` (`string`): Texto del botón. Default: `'Button'`.
    *   `style` (`string`, opcional): Estilo del botón. Valores: `'normal'`, `'danger'`, `'warning'`, `'success'`. Default: `'normal'`.
    *   `disabled` (`boolean`, opcional): Si el botón está deshabilitado inicialmente. Default: `false`.
    *   `onClick` (`function`, opcional): Función a ejecutar cuando se hace clic en el botón.

**Métodos Específicos:**
*   `addButton(buttonConfig, addToDom = true)`: Añade un nuevo botón.
    *   `buttonConfig` (`object`): Objeto de configuración del botón (ver `buttons` en opciones).
    *   `addToDom` (`boolean`): Si debe añadirse al DOM inmediatamente. Default: `true`.
*   `removeButton(buttonId)`: Elimina un botón por su ID.
    *   `buttonId` (`string`): ID del botón a eliminar.
*   `updateButton(buttonId, updates)`: Actualiza propiedades de un botón existente.
    *   `buttonId` (`string`): ID del botón a actualizar.
    *   `updates` (`object`): Objeto con las propiedades a cambiar:
        *   `newText` (`string`, opcional): Nuevo texto para el botón.
        *   `newDisabledState` (`boolean`, opcional): Nuevo estado de habilitación.
        *   `newStyle` (`string`, opcional): Nuevo estilo para el botón.
*   `setButtonDisabled(buttonId, isDisabled)`: Atajo para habilitar/deshabilitar un botón.
    *   `buttonId` (`string`): ID del botón.
    *   `isDisabled` (`boolean`): `true` para deshabilitar, `false` para habilitar.

**Ejemplo de Uso:**
```javascript
// HTML: <div id="actionDemo" class="panel-container"></div>
// Necesitarás un logPanel instanciado para que este ejemplo funcione completamente.
// const logPanel = new DynamicSciFiDashboardKit.LogDisplayPanel('#unLogPanelID');

const actionPanel = new DynamicSciFiDashboardKit.ActionButtonsPanel('#actionDemo', {
    title: 'Weapon Systems',
    buttons: [
        { id: 'fire-phasers', text: 'Fire Phasers', style: 'normal', onClick: () => logPanel.addLog({text: 'Phasers fired!', level: 'info'}) },
        { id: 'launch-torpedo', text: 'Launch Torpedo', style: 'warning', disabled: true, onClick: () => logPanel.addLog({text: 'Torpedo launched!', level: 'warn'}) }
    ]
});

setTimeout(() => {
    actionPanel.updateButton('launch-torpedo', { newDisabledState: false });
    actionPanel.setPanelState('warning');
    logPanel.addLog({text: 'Torpedo systems online.', level: 'info'});
}, 3000);

setTimeout(() => {
    actionPanel.addButton({ id: 'self-destruct', text: 'Self Destruct', style: 'danger', onClick: () => {
        logPanel.addLog({text: 'Self destruct sequence initiated!', level: 'error'});
        actionPanel.setPanelState('critical');
    }});
}, 6000);
```

### 3.7. `CanvasGraphPanel`

Muestra un gráfico animado en un canvas, como un ECG o una onda sinusoidal.

**Inicialización:**
```javascript
const graphPanel = new DynamicSciFiDashboardKit.CanvasGraphPanel('#graphContainer', {
    title: 'Vital Signs',
    graphType: 'ecg'
});
```

**Opciones Específicas:**
*   `title` (`string`): Título del panel. Default: `'Graph Panel'`.
*   `graphType` (`string`): Tipo de gráfico a mostrar. Valores: `'ecg'`, `'sine'`. Default: `'ecg'`.
*   `colorScheme` (`object`): Objeto que define los colores y estilos de línea para cada estado del panel (`normal`, `warning`, `critical`, `stable`). Cada estado tiene:
    *   `stroke` (`string`): Color del trazo.
    *   `lineWidth` (`number`): Ancho de línea.
    *   `noiseFactor` (`number`): Factor de "ruido" o variabilidad en la gráfica.
*   `animationSpeed` (`number`): Velocidad de animación para el gráfico tipo `'sine'`. Default: `0.05`.
*   `ecgDataLength` (`number`): Número de puntos de datos para el gráfico `'ecg'`. Afecta la "longitud" de la onda en pantalla. Default: `200` (se ajusta un poco según el ancho del panel).
*   `ecgSpikeChance` (`number`): Probabilidad de que ocurra un "pico" en el gráfico ECG. Default: `0.08`.

**Métodos Específicos:**
*   No tiene métodos públicos específicos además de los heredados. El gráfico se actualiza automáticamente basado en el `panelState` y sus opciones.

**Ejemplo de Uso:**
```javascript
// HTML: <div id="canvasDemo" class="panel-container" style="height: 250px;"></div>

const canvasPanel = new DynamicSciFiDashboardKit.CanvasGraphPanel('#canvasDemo', {
    title: 'Energy Fluctuations',
    graphType: 'sine',
    initialState: 'normal',
    enableSparks: true
});

setTimeout(() => {
    canvasPanel.setPanelState('warning');
}, 3000);

setTimeout(() => {
    canvasPanel.setPanelState('critical');
}, 6000);

setTimeout(() => {
    canvasPanel.setPanelState('stable');
}, 9000);
```

### 3.8. `IntegrityPulsePanel`

Muestra una serie de barras verticales que "pulsan", ideal para indicar actividad o integridad del sistema.

**Inicialización:**
```javascript
const pulsePanel = new DynamicSciFiDashboardKit.IntegrityPulsePanel('#pulseContainer', {
    title: 'Core Integrity',
    barCount: 10
});
```

**Opciones Específicas:**
*   `title` (`string`): Título del panel. Default: `'Integrity Pulse'`.
*   `initialState` (`string`): Estado inicial. Default: `'normal'`.
*   `barCount` (`number`): Número de barras a mostrar. Default: `5`. Un número entre 1 y 100 es razonable.
*   `enableSparks` (`boolean`): Default: `false`.
*   `enableScanlineHalo` (`boolean`): Default: `false`.

**Métodos Específicos:**
*   No tiene métodos públicos específicos. Las barras se animan y colorean según el `panelState`.

**Ejemplo de Uso:**
```javascript
// HTML: <div id="pulseDemo" class="panel-container" style="height: 250px;"></div>

const pulsePanel = new DynamicSciFiDashboardKit.IntegrityPulsePanel('#pulseDemo', {
    title: 'Shield Harmonics',
    barCount: 12, // Más barras
    initialState: 'stable'
});

setTimeout(() => {
    pulsePanel.setPanelState('warning');
}, 2500);

setTimeout(() => {
    pulsePanel.setPanelState('critical');
}, 5000);

setTimeout(() => {
    pulsePanel.setPanelState('normal');
}, 7500);
```

### 3.9. `CircularGaugePanel`

Muestra un medidor circular (tipo velocímetro) para representar un valor dentro de un rango.

**Inicialización:**
```javascript
const gaugePanel = new DynamicSciFiDashboardKit.CircularGaugePanel('#gaugeContainer', {
    title: 'Reactor Output',
    initialValue: 50,
    maxValue: 120,
    units: 'GW'
});
```

**Opciones Específicas:**
*   `title` (`string`): Título del panel. Default: `'Gauge'`.
*   `minValue` (`number`): Valor mínimo del medidor. Default: `0`.
*   `maxValue` (`number`): Valor máximo del medidor. Default: `100`.
*   `initialValue` (`number`): Valor inicial del medidor. Default: `0`.
*   `targetValue` (`number | null`): Un valor objetivo que se marca en el medidor. Default: `null` (sin marcador).
*   `units` (`string`): Unidades que se muestran con el valor y la etiqueta. Default: `'%'`.
*   `label` (`string`): Etiqueta descriptiva que se muestra debajo del valor. Default: `''`.
*   `valueFontSize` (`string`): Tamaño de fuente CSS para el valor numérico. Default: `'2em'`.
*   `labelFontSize` (`string`): Tamaño de fuente CSS para la etiqueta. Default: `'0.8em'`.
*   `unitsFontSize` (`string`): Tamaño de fuente CSS para las unidades. Default: `'0.7em'`.
*   `labelYOffset` (`number`): Desplazamiento vertical adicional para la etiqueta en píxeles SVG. Útil para ajustar finamente la posición de la etiqueta. Default: `5`.
*   `arcWidth` (`number`): Ancho del arco del medidor en píxeles (SVG). Default: `12`.
*   `gaugeRadius` (`number`): Radio del medidor en píxeles (SVG). Default: `80`.
*   `startAngle` (`number`): Ángulo de inicio del arco en grados (0 es arriba, 90 derecha, etc.). Default: `-135`.
*   `endAngle` (`number`): Ángulo final del arco en grados. Default: `135`.
*   `animationDuration` (`number`): Duración de la animación de cambio de valor en milisegundos. Default: `400`.
*   `enableSparks`, `enableScanlineHalo` (`boolean`): Default: `false`.

**Métodos Específicos:**
*   `setValue(newValue, animate = true)`: Establece el valor del medidor.
    *   `newValue` (`number`): El nuevo valor a mostrar.
    *   `animate` (`boolean`, opcional): Si el cambio debe ser animado. Default: `true`.
*   `setTargetValue(newTargetValue)`: Establece o elimina el marcador de valor objetivo.
    *   `newTargetValue` (`number | null`): El nuevo valor objetivo, o `null` para quitar el marcador.

**Ejemplo de Uso:**
```javascript
// HTML: <div id="circGaugeDemo" class="panel-container" style="height: 280px;"></div>

const circGauge = new DynamicSciFiDashboardKit.CircularGaugePanel('#circGaugeDemo', {
    title: 'Engine Thrust',
    minValue: 0,
    maxValue: 150,
    initialValue: 25,
    units: 'kN',
    label: 'Main Thruster',
    targetValue: 100,
    enableScanlineHalo: true,
    scanlineOpacity: 0.15
});
circGauge.setPanelState('stable');

setTimeout(() => {
    circGauge.setValue(80);
    circGauge.setPanelState('normal');
}, 2000);

setTimeout(() => {
    circGauge.setValue(110);
    circGauge.setPanelState('warning');
}, 4000);

setTimeout(() => {
    circGauge.setValue(145);
    circGauge.setPanelState('critical');
    circGauge.setTargetValue(130); // Cambiar el objetivo
}, 6000);
```

### 3.10. `StatusIndicatorLedPanel`

Muestra una lista de indicadores de estado, cada uno con un LED de color y un texto descriptivo.

**Inicialización:**
```javascript
const statusPanel = new DynamicSciFiDashboardKit.StatusIndicatorLedPanel('#statusLedContainer', {
    title: 'Subsystem Status',
    indicators: [
        { id: 'nav', text: 'Navigation', color: 'green' },
        { id: 'com', text: 'Communications', color: 'yellow', blinking: true }
    ]
});
```

**Opciones Específicas:**
*   `title` (`string`): Título del panel. Default: `'System Status'`.
*   `indicators` (`array`): Array de objetos de configuración de indicador. Default: `[]`. Cada objeto:
    *   `id` (`string`, **requerido**): ID único para el indicador.
    *   `text` (`string`, **requerido**): Texto descriptivo.
    *   `color` (`string`, opcional): Color del LED. Valores: `'green'`, `'yellow'`, `'red'`, `'blue'`, `'orange'`, `'purple'`, `'cyan'`, `'white'`, `'off'`. Default: `'off'`.
    *   `blinking` (`boolean`, opcional): Si el LED debe parpadear. Default: `false`.
*   `enableSparks`, `enableScanlineHalo` (`boolean`): Default: `false`.

**Métodos Específicos:**
*   `addIndicator(indicatorData, atBeginning = false)`: Añade un nuevo indicador.
    *   `indicatorData` (`object`): Objeto de configuración del indicador.
    *   `atBeginning` (`boolean`): Si `true`, añade el indicador al principio de la lista. Default: `false`.
*   `updateIndicator(id, updates)`: Actualiza un indicador existente.
    *   `id` (`string`): ID del indicador.
    *   `updates` (`object`): Objeto con propiedades a actualizar (`text`, `color`, `blinking`).
*   `removeIndicator(id)`: Elimina un indicador por su ID.
*   `setIndicatorBlinking(id, isBlinking)`: Activa/desactiva el parpadeo de un LED.
*   `setIndicatorColor(id, newColor)`: Cambia el color de un LED.
*   `setIndicatorText(id, newText)`: Cambia el texto de un indicador.
*   `getIndicator(id)`: Devuelve los datos actuales de un indicador.
*   `getAllIndicators()`: Devuelve un array con los datos de todos los indicadores.

**Ejemplo de Uso:**
```javascript
// HTML: <div id="statusLedDemo" class="panel-container" style="min-height: 260px;"></div>

const statusLedPanel = new DynamicSciFiDashboardKit.StatusIndicatorLedPanel('#statusLedDemo', {
    title: 'Life Support Systems',
    indicators: [
        { id: 'oxygen', text: 'Oxygen Levels', color: 'green' },
        { id: 'co2_filter', text: 'CO2 Scrubber', color: 'green' },
        { id: 'gravity', text: 'Artificial Gravity', color: 'blue' }
    ]
});

setTimeout(() => {
    statusLedPanel.updateIndicator('co2_filter', { color: 'yellow', blinking: true, text: 'CO2 Scrubber (Maintenance Req.)' });
    statusLedPanel.setPanelState('warning');
}, 3000);

setTimeout(() => {
    statusLedPanel.addIndicator({ id: 'backup_power', text: 'Backup Power', color: 'red', blinking: true }, true);
    statusLedPanel.setPanelState('critical');
}, 6000);
```

### 3.11. `HorizontalBarGaugePanel`

Muestra un medidor de barra horizontal para representar un valor dentro de un rango.

**Inicialización:**
```javascript
const hGaugePanel = new DynamicSciFiDashboardKit.HorizontalBarGaugePanel('#hGaugeContainer', {
    title: 'Shield Capacity',
    initialValue: 75,
    label: 'Forward Shields',
    units: '%'
});
```

**Opciones Específicas:**
*   `title` (`string`): Título del panel. Default: `'Horizontal Gauge'`.
*   `minValue` (`number`): Valor mínimo del medidor. Default: `0`.
*   `maxValue` (`number`): Valor máximo del medidor. Default: `100`.
*   `initialValue` (`number`): Valor inicial del medidor. Default: `0`.
*   `units` (`string`): Unidades que se muestran con el valor de texto (si está habilitado). Default: `'%'`.
*   `label` (`string`): Etiqueta descriptiva que se muestra encima de la barra (si no está vacía). Default: `''`.
*   `barHeight` (`string`): Altura de la barra del medidor (ej. `'16px'`, `'1.2em'`). Default: `'16px'`.
*   `showValueText` (`boolean`): Si se debe mostrar el valor numérico actual junto a la etiqueta. Default: `true`.
*   `valueTextFormat` (`function`): Función para formatear el texto del valor. Recibe `(value, units)` y debe devolver un string. Default: `(value, units) => \`${Math.round(value)}${units}\``.
*   `animationDuration` (`number`): Duración de la animación de cambio de valor en milisegundos. `0` para desactivar animación de ancho. Default: `400`.
*   `enableSparks`, `enableScanlineHalo` (`boolean`): Default: `false`.
*   `colorScheme` (`object`, opcional): Permite definir colores específicos para la barra según el estado del panel (ej. `{ normal: '#00E5E5', warning: '#FFD700', ... }`). Si no se provee, los colores se toman de las variables CSS (`--dsdk-gauge-h-bar-normal`, etc.) basadas en el `panelState`.

**Métodos Específicos:**
*   `setValue(newValue, animate = true)`: Establece el valor del medidor.
    *   `newValue` (`number`): El nuevo valor a mostrar.
    *   `animate` (`boolean`, opcional): Si el cambio de ancho debe ser animado (si `animationDuration > 0`). Default: `true`.
*   `setPanelState(newState)`: (Sobrescrito) Además de cambiar el estado del panel, actualiza el color de la barra si no se usa un `colorScheme` personalizado.

**Ejemplo de Uso:**
```javascript
// HTML: <div id="hGaugeDemo" class="panel-container" style="height: 150px;"></div>

const hGaugePanel = new DynamicSciFiDashboardKit.HorizontalBarGaugePanel('#hGaugeDemo', {
    title: 'Ammo Reserves',
    label: 'Plasma Cells',
    minValue: 0,
    maxValue: 200,
    initialValue: 180,
    units: ' cells',
    barHeight: '20px',
    initialState: 'stable'
});

setTimeout(() => {
    hGaugePanel.setValue(100);
    hGaugePanel.setPanelState('normal');
}, 2000);

setTimeout(() => {
    hGaugePanel.setValue(40);
    hGaugePanel.setPanelState('warning');
}, 4000);

setTimeout(() => {
    hGaugePanel.setValue(10);
    hGaugePanel.setPanelState('critical');
    // Como enableSparks es false por defecto para este panel, si quieres que se active
    // debes configurarlo en las opciones iniciales o modificar la instancia
    // hGaugePanel.config.enableSparks = true; // y luego llamar a setPanelState de nuevo si es necesario
    // o que el panel base gestione esto al cambiar el estado
}, 6000);
```

### 3.12. `TrueCanvasGraphPanel`

Muestra un gráfico de línea en un canvas, diseñado para representar datos en tiempo real proporcionados externamente. Es ideal para visualizar series temporales, telemetría o cualquier flujo de datos numéricos.

**Inicialización:**
```javascript
const realtimeGraph = new DynamicSciFiDashboardKit.TrueCanvasGraphPanel('#realtimeGraphContainer', {
    title: 'Sensor Data Stream',
    maxDataPoints: 150,
    dataRange: { min: 0, max: 100 } // Opcional: fija el rango del eje Y
});
```

**Opciones Específicas:**
*   `title` (`string`): Título del panel. Default: `'Realtime Data Graph'`.
*   `maxDataPoints` (`number`): Número máximo de puntos de datos a retener y mostrar en el gráfico. Los puntos más antiguos se descartan. Default: `200`.
*   `dataRange` (`object | null`): Define un rango fijo para el eje Y. Si es `null` (default), el eje Y se autoescala basado en los datos visibles.
    *   `min` (`number`): Valor mínimo del eje Y.
    *   `max` (`number`): Valor máximo del eje Y.
*   `colorScheme` (`object`): Objeto que define el estilo de la línea para cada estado del panel (`normal`, `warning`, `critical`, `stable`). Cada estado tiene:
    *   `stroke` (`string`): Color del trazo de la línea.
    *   `lineWidth` (`number`): Ancho de la línea.
    *   *Nota: `noiseFactor` no aplica directamente como en `CanvasGraphPanel` ya que los datos son externos.*
*   `enableSparks` (`boolean`): Si se activan los efectos de chispas en los bordes del panel según el estado. Default: `true`.
*   `enableScanlineHalo` (`boolean`): Si se activa el efecto de scanline sobre el panel según el estado. Default: `true`.

**Métodos Específicos:**
*   `addDataPoint(yValue)`: Añade un nuevo punto de dato (valor Y) al final del gráfico. Si se supera `maxDataPoints`, el punto más antiguo se elimina.
    *   `yValue` (`number`): El valor numérico del punto de dato.
*   `setData(newDataArray)`: Reemplaza todos los datos actuales del gráfico con el array proporcionado. Se tomarán los últimos `maxDataPoints` del array si este es más largo.
    *   `newDataArray` (`array<number>`): Un array de valores numéricos.
*   `clearData()`: Elimina todos los puntos de datos del gráfico, dejándolo vacío.
*   `setPanelState(newState)`: (Sobrescrito) Además de cambiar el estado general del panel (borde, título, efectos), también actualiza el color/estilo de la línea del gráfico según el `colorScheme` para el nuevo estado.

**Ejemplo de Uso:**
```javascript
// HTML: <div id="sensorGraph" class="panel-container" style="height: 300px;"></div>

const sensorPanel = new DynamicSciFiDashboardKit.TrueCanvasGraphPanel('#sensorGraph', {
    title: 'Temperature Readings',
    maxDataPoints: 100,
    dataRange: { min: 10, max: 90 }, // Grados Celsius
    initialState: 'stable',
    enableScanlineHalo: true,
    scanlineStates: ['critical', 'warning']
});

// Añadir datos iniciales
let initialData = [];
for(let i=0; i<30; i++) {
    initialData.push(20 + Math.random() * 10);
}
sensorPanel.setData(initialData);

let time = 0;
setInterval(() => {
    // Simular un nuevo dato
    let newValue = 50 + Math.sin(time * 0.2) * 25 + (Math.random() - 0.5) * 5;
    
    // Ajustar valor y estado basado en umbrales
    if (newValue > 75) {
        sensorPanel.setPanelState('critical');
    } else if (newValue > 60) {
        sensorPanel.setPanelState('warning');
    } else if (newValue < 25) {
        sensorPanel.setPanelState('normal'); // Podría ser un estado 'info' o 'cold'
    } else {
        sensorPanel.setPanelState('stable');
    }
    
    sensorPanel.addDataPoint(newValue);
    time += 0.1;
}, 200); // Añadir un nuevo punto cada 200ms
```

## 4. `DSDK_CLASSES` (Constantes CSS)

La librería expone un objeto `DynamicSciFiDashboardKit.DSDK_CLASSES` que contiene mapeos de nombres lógicos a las clases CSS reales utilizadas internamente. Esto es útil para aplicar estilos de manera consistente, especialmente para clases de texto de estado.

```javascript
const { DSDK_CLASSES } = DynamicSciFiDashboardKit;

// Ejemplo para KeyValueListPanel
myKeyValuePanel.addItem({
    key: 'Reactor Status',
    value: 'OVERHEATING',
    statusClass: DSDK_CLASSES.TEXT_DANGER // Usa la constante
});

// Ejemplo para DynamicTextPanel
myDynamicTextPanel.setEffects({
    textColorClass: DSDK_CLASSES.TEXT_WARNING
});
```
Clases de texto comúnmente usadas:
*   `DSDK_CLASSES.TEXT_DANGER`
*   `DSDK_CLASSES.TEXT_WARNING`
*   `DSDK_CLASSES.TEXT_SUCCESS`
*   `DSDK_CLASSES.TEXT_INFO`

## 5. Personalización Avanzada (CSS)

La apariencia de los paneles se controla principalmente mediante variables CSS (Custom Properties) definidas en `DynamicSciFiDashboardKit.css` dentro del selector `:root`. Puedes sobrescribir estas variables en tu propio archivo CSS para personalizar la paleta de colores, fuentes, etc.

**Ejemplo de cómo cambiar el color de acento secundario y el fondo del panel:**
```css
/* En tu archivo CSS, después de importar DynamicSciFiDashboardKit.css */
:root {
    --dsdk-accent-color-secondary: #FF8C00; /* Naranja oscuro como acento secundario */
    --dsdk-panel-bg: rgba(30, 10, 10, 0.85); /* Un fondo más rojizo y opaco */
    --dsdk-font-sans: 'Orbitron', sans-serif; /* Cambiar la fuente principal a una más SciFi */
}
```
Revisa el archivo `DynamicSciFiDashboardKit.css` para ver la lista completa de variables disponibles para la personalización.

## 6. Consejos y Buenas Prácticas

*   **Gestión de Instancias:** Mantén referencias a tus instancias de panel si necesitas interactuar con ellas después de la creación (ej. `logPanel.addLog(...)`).
*   **IDs Únicos:** Asegúrate de que cada panel se inicialice en un contenedor con un ID único en tu HTML.
*   **Limpieza (`destroy()`):** Siempre llama al método `destroy()` en una instancia de panel cuando ya no la necesites (por ejemplo, al cambiar de vista en una Single Page Application). Esto es crucial para liberar recursos y prevenir fugas de memoria, especialmente con paneles que usan animaciones (`CanvasGraphPanel`, `IntegrityPulsePanel`).
*   **Altura de Contenedores:** Algunos paneles (como `CanvasGraphPanel`, `IntegrityPulsePanel`, `CircularGaugePanel`, `CriticalWarningTextPanel`) se ven mejor o funcionan de manera óptima si su contenedor tiene una altura definida. Puedes usar CSS para esto:
    ```css
    .mi-contenedor-de-grafico {
        height: 250px; /* O la altura que necesites */
    }
    ```
    O directamente en el estilo del elemento:
    ```html
    <div id="miGrafico" class="panel-container" style="height: 250px;"></div>
    ```
*   **Rendimiento:** Si tienes muchos paneles con animaciones complejas (especialmente `CanvasGraphPanel` con alta frecuencia de actualización o `IntegrityPulsePanel` con muchas barras), considera el impacto en el rendimiento en dispositivos de bajos recursos.
