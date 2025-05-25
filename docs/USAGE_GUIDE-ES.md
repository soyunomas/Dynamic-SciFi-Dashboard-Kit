# Guía de Uso: DynamicSciFiDashboardKit

`DynamicSciFiDashboardKit` es una librería JavaScript diseñada para crear interfaces de usuario con una estética futurista y de ciencia ficción. Proporciona un conjunto de componentes (paneles) listos para usar que se pueden integrar fácilmente en cualquier aplicación web.

**Público Objetivo:** Desarrolladores web con conocimientos de HTML, CSS y JavaScript.

## 1. Instalación y Configuración

Para usar `DynamicSciFiDashboardKit`, necesitas incluir dos archivos en tu proyecto:

1.  **`DynamicSciFiDashboardKit.css`**: Contiene todos los estilos necesarios para los paneles.
2.  **`DynamicSciFiDashboardKit.js`**: Contiene la lógica de la librería y las definiciones de los paneles.

**Inclusión HTML:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Mi Panel de Control Sci-Fi</title>
    <link rel="stylesheet" href="path/to/DynamicSciFiDashboardKit.css">
    <style>
        /* Tus estilos personalizados aquí, si son necesarios */
        body { background-color: #05080d; padding: 20px; color: #e0e0e0; font-family: 'Segoe UI', sans-serif; }
        .dashboard-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .panel-container { min-height: 200px; display: flex; flex-direction: column; }
        /* Asegura que el panel se expanda si el contenedor es flexible */
        .panel-container > .dsdk-panel { flex-grow: 1; }
    </style>
</head>
<body>
    <div class="dashboard-grid">
        <div id="myLogPanel" class="panel-container"></div>
        <div id="myGaugePanel" class="panel-container" style="height: 280px;"></div>
        <div id="myRadarPanel" class="panel-container" style="height: 350px;"></div>
    </div>

    <script src="path/to/DynamicSciFiDashboardKit.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const DSDK = DynamicSciFiDashboardKit; // Alias para conveniencia

            // Inicialización de paneles
            const logPanel = new DSDK.LogDisplayPanel('#myLogPanel', {
                title: 'Registro de Eventos del Sistema'
            });
            logPanel.addLog({ text: 'Panel de control inicializado.', level: 'info' });

            const gaugePanel = new DSDK.CircularGaugePanel('#myGaugePanel', {
                title: 'Nivel de Energía Primario',
                initialValue: 75,
                label: 'Reactor Principal',
                units: '%'
            });

            const radarPanel = new DSDK.RadarDisplayPanel('#myRadarPanel', {
                title: 'Sensor de Proximidad',
                radarSpeed: 15 // RPM
            });
            radarPanel.addPoint('contact_alpha', 30, 50); // x, y
            radarPanel.addPoint('contact_beta', -60, 20);
        });
    </script>
</body>
</html>
```

**Importante:**
*   Asegúrate de que las rutas a `DynamicSciFiDashboardKit.css` y `DynamicSciFiDashboardKit.js` sean correctas.
*   Cada panel requiere un elemento contenedor único en el DOM (p.ej., un `div` con un ID único).

## 2. Conceptos Básicos

### 2.1. `BasePanel`

Todos los paneles específicos heredan de una clase base llamada `BasePanel`. Esta clase proporciona funcionalidades y opciones comunes.

**Opciones Comunes (Heredadas de `BasePanel`)**:

*   `title` (`string`): Título mostrado en la cabecera del panel. Default: `'Panel'` (o un título específico si la clase hija lo define). Si es una cadena vacía o `null` y la clase no tiene título por defecto, la cabecera no se renderiza.
*   `initialState` (`string`): Estado visual inicial del panel. Valores válidos: `'normal'`, `'warning'`, `'critical'`, `'stable'`. Default: `'normal'`.
*   `particleEffectType` (`string | null`): Tipo de efecto de partículas a aplicar. Valores válidos: `'1'` a `'6'`, o `null` para desactivar. Default: `null`.
*   `particleEffectStates` (`array`): Array de strings definiendo en qué estados del panel se mostrará el efecto de partículas (si `particleEffectType` está configurado). Default: `['critical', 'warning']`.
*   `enableScanlineHalo` (`boolean`): Activa un efecto visual de "líneas de escaneo" (scanlines) sobre el panel. Default: `false` (puede ser sobrescrito por la clase hija).
*   `scanlineHaloColor` (`string | null`): Color CSS específico para el efecto de scanlines. Si es `null`, el color se determina automáticamente basado en el estado del panel. Default: `null`.
*   `scanlineThickness` (`string`): Grosor de las scanlines (p.ej., `'4px'`). Default: `'4px'`.
*   `scanlineOpacity` (`number`): Opacidad de las scanlines (un valor entre 0 y 1). Default: `0.08`.
*   `scanlineStates` (`array`): Array de strings definiendo en qué estados del panel se mostrará el efecto de scanlines (si `enableScanlineHalo` es `true`). Default: `['critical', 'warning']`.

**Métodos Comunes (Heredados de `BasePanel`)**:

*   `setPanelState(newState)`: Cambia el estado visual general del panel.
    *   `newState` (`string`): Uno de los estados válidos: `'normal'`, `'warning'`, `'critical'`, `'stable'`.
*   `setScanlineHalo(enabled, options = {})`: Configura o activa/desactiva el efecto de scanlines.
    *   `enabled` (`boolean`): `true` para activar, `false` para desactivar.
    *   `options` (`object`, opcional): Un objeto con propiedades para personalizar el efecto:
        *   `color` (`string`, opcional): Color CSS para las scanlines.
        *   `thickness` (`string`, opcional): Grosor de las scanlines.
        *   `opacity` (`number`, opcional): Opacidad de las scanlines.
*   `setParticleEffect(type, options = {})`: Configura o cambia el tipo de efecto de partículas y sus estados de activación.
    *   `type` (`string | null`): Nuevo tipo de efecto (`'1'`-`'6'`, `'none'`, o `null`).
    *   `options` (`object`, opcional):
        *   `states` (`array`, opcional): Array de estados del panel (`'normal'`, `'warning'`, `'critical'`, `'stable'`) en los que el efecto estará activo.
*   `destroy()`: Elimina el panel del DOM y limpia los recursos asociados (listeners de eventos, temporizadores de animación). **Es muy importante llamar a este método** cuando un panel ya no es necesario para prevenir fugas de memoria.

### 2.2. Inicialización de Paneles

Para crear una instancia de cualquier panel:

```javascript
const miPanel = new DynamicSciFiDashboardKit.NombreDelPanel('#idContenedor', {
    // opciones específicas del panel y comunes aquí
});
```

*   `#idContenedor`: Selector CSS del elemento HTML que contendrá el panel.
*   `{opciones}`: Un objeto de configuración.

## 3. Documentación de Paneles

A continuación, una descripción detallada de cada panel disponible.

### 3.1. `LogDisplayPanel`

Muestra una lista de mensajes de registro con diferentes niveles de severidad.

**Inicialización:**
```javascript
const logPanel = new DynamicSciFiDashboardKit.LogDisplayPanel('#logContainer', {
    title: 'Registros del Sistema',
    maxEntries: 50,
    initialState: 'normal'
});
```

**Opciones Específicas:**
*   `title` (`string`): Título del panel. Default: `'Log Display'`.
*   `maxEntries` (`number`): Número máximo de entradas de registro a mostrar. Las más antiguas se eliminan automáticamente. Default: `20`.

**Métodos Específicos:**
*   `addLog(logEntry)`: Añade una nueva entrada al registro.
    *   `logEntry` (`object`): Un objeto con las siguientes propiedades:
        *   `text` (`string`): El mensaje de registro.
        *   `level` (`string`, opcional): Nivel del registro. Valores válidos: `'info'`, `'warn'`, `'error'`, `'success'`. Afecta el color del texto.
*   `clearLogs()`: Elimina todas las entradas del registro.

**Ejemplo de Uso:**
```javascript
// HTML: <div id="logDemo" class="panel-container"></div>

const logPanel = new DynamicSciFiDashboardKit.LogDisplayPanel('#logDemo', {
    title: 'Registro de Actividad',
    maxEntries: 5,
    enableScanlineHalo: true,
    particleEffectType: '1',
    particleEffectStates: ['critical', 'warning']
});

logPanel.addLog({ text: 'Secuencia de arranque del sistema iniciada.', level: 'info' });
logPanel.addLog({ text: 'Niveles de energía nominales.', level: 'success' });
logPanel.addLog({ text: 'Anomalía detectada en Sector 7.', level: 'warn' });
logPanel.addLog({ text: '¡Escudos al 20%!', level: 'error' });

setTimeout(() => {
    logPanel.setPanelState('warning');
    logPanel.addLog({ text: 'Investigando anomalía...', level: 'info' });
}, 2000);

setTimeout(() => {
    logPanel.setPanelState('critical');
    logPanel.addLog({ text: '¡Brecha en el casco inminente!', level: 'error' });
}, 4000);
```

### 3.2. `CriticalWarningTextPanel`

Muestra texto grande y llamativo, ideal para alertas críticas o mensajes de estado importantes.

**Inicialización:**
```javascript
const warningPanel = new DynamicSciFiDashboardKit.CriticalWarningTextPanel('#warningContainer', {
    initialText: 'SISTEMA OFFLINE',
    initialWarningState: 'critical'
});
```

**Opciones Específicas:**
*   `title` (`string`): Título del panel. Default: `''` (sin cabecera, para dar más énfasis al texto).
*   `initialText` (`string`): El texto a mostrar inicialmente. Default: `'WARNING'`.
*   `initialWarningState` (`string`): Estado interno del texto, que afecta su animación y el estado base del panel. Valores válidos: `'critical'`, `'stabilizing'`, `'stable'`. Default: `'critical'`.
*   `fontSize` (`string`): Tamaño de fuente CSS para el texto de advertencia. Default: `'2.2rem'`.
*   `particleEffectType` (`string`): Default: `'3'`.
*   `particleEffectStates` (`array`): Default: `['critical', 'stabilizing']`.
*   `enableScanlineHalo` (`boolean`): Default: `true`.
*   `scanlineThickness` (`string`): Default: `'3px'`.
*   `scanlineOpacity` (`number`): Default: `0.1`.

**Métodos Específicos:**
*   `setWarningState(newState, newText)`: Cambia el estado interno del texto y, opcionalmente, el texto mismo.
    *   `newState` (`string`): `'critical'`, `'stabilizing'`, o `'stable'`. Esto también actualizará el `panelState` general (p.ej., `critical` para `critical`, `warning` para `stabilizing`, `stable` para `stable`).
    *   `newText` (`string`, opcional): El nuevo texto a mostrar.
*   `setText(newText)`: Cambia solo el texto mostrado, sin alterar el `warningState`.
    *   `newText` (`string`): El nuevo texto.

**Ejemplo de Uso:**
```javascript
// HTML: <div id="critWarnDemo" class="panel-container" style="height: 150px;"></div>

const critWarnPanel = new DynamicSciFiDashboardKit.CriticalWarningTextPanel('#critWarnDemo', {
    initialText: 'SISTEMA ONLINE',
    initialWarningState: 'stable',
    fontSize: '2rem'
});

setTimeout(() => {
    critWarnPanel.setWarningState('stabilizing', 'PICO DE ENERGÍA DETECTADO');
}, 3000);

setTimeout(() => {
    critWarnPanel.setWarningState('critical', '¡SOBRECARGA DEL REACTOR!');
}, 6000);
```

### 3.3. `KeyValueListPanel`

Muestra una lista de pares clave-valor, útil para mostrar datos de configuración o telemetría.

**Inicialización:**
```javascript
const dataPanel = new DynamicSciFiDashboardKit.KeyValueListPanel('#dataContainer', {
    title: 'Parámetros del Sistema'
});
```

**Opciones Específicas:**
*   `title` (`string`): Título del panel. Default: `'Data List'`.

**Métodos Específicos:**
*   `setItems(itemsArray)`: Establece o reemplaza todos los ítems en la lista.
    *   `itemsArray` (`array`): Un array de objetos, donde cada objeto representa un ítem y tiene la forma:
        *   `key` (`string`): La clave.
        *   `value` (`string | number`): El valor.
        *   `statusClass` (`string`, opcional): Una clase CSS para aplicar estilo al valor (p.ej., `DSDK_CLASSES.TEXT_DANGER`, `DSDK_CLASSES.TEXT_SUCCESS`).
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
    title: 'Telemetría Central',
    initialState: 'stable'
});

kvPanel.setItems([
    { key: 'Temperatura', value: '75°C', statusClass: DynamicSciFiDashboardKit.DSDK_CLASSES.TEXT_SUCCESS },
    { key: 'Presión', value: '1012 hPa', statusClass: DynamicSciFiDashboardKit.DSDK_CLASSES.TEXT_INFO },
    { key: 'Escudos', value: '100%', statusClass: DynamicSciFiDashboardKit.DSDK_CLASSES.TEXT_SUCCESS }
]);

setTimeout(() => {
    kvPanel.updateItem('Temperatura', '95°C', DynamicSciFiDashboardKit.DSDK_CLASSES.TEXT_WARNING);
    kvPanel.setPanelState('warning');
}, 2500);

setTimeout(() => {
    kvPanel.addItem({ key: 'Integridad Casco', value: '40%', statusClass: DynamicSciFiDashboardKit.DSDK_CLASSES.TEXT_DANGER });
    kvPanel.setPanelState('critical');
}, 5000);
```

### 3.4. `LedDisplayPanel`

Muestra un valor numérico o de texto en un display tipo LED, con una etiqueta y opcionalmente unidades.

**Inicialización:**
```javascript
const ledPanel = new DynamicSciFiDashboardKit.LedDisplayPanel('#ledContainer', {
    label: 'Condensador Flujo',
    initialValue: 1.21,
    units: 'GW'
});
```

**Opciones Específicas:**
*   `title` (`string`): Título del panel. Default: `''` (sin cabecera).
*   `label` (`string`): Etiqueta mostrada sobre el display LED. Default: `'VALUE'`.
*   `initialValue` (`number | string`): El valor a mostrar inicialmente. Default: `0`.
*   `initialStatus` (`string`): Estado visual del display LED. Valores: `'normal'`, `'warning'`, `'critical'`. Afecta el color y animación del display. Default: `'normal'`.
*   `units` (`string`): Unidades añadidas después del valor (p.ej., 'kW', '%'). Default: `''`.

**Métodos Específicos:**
*   `setValue(value)`: Establece el valor mostrado en el display.
    *   `value` (`number | string`): El nuevo valor.
*   `setStatus(status)`: Cambia el estado visual del display LED.
    *   `status` (`string`): `'normal'`, `'warning'`, o `'critical'`.

**Ejemplo de Uso:**
```javascript
// HTML: <div id="ledDemo" class="panel-container" style="height: 180px;"></div>

const ledPanel = new DynamicSciFiDashboardKit.LedDisplayPanel('#ledDemo', {
    label: 'TEMP. NÚCLEO',
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

Muestra un bloque de texto con posibles efectos visuales como desenfoque, parpadeo o "glitch".

**Inicialización:**
```javascript
const textPanel = new DynamicSciFiDashboardKit.DynamicTextPanel('#textContainer', {
    title: 'Canal de Comunicaciones',
    initialText: 'Recibiendo transmisión...'
});
```

**Opciones Específicas:**
*   `title` (`string`): Título del panel. Default: `'Dynamic Text Display'`.
*   `initialText` (`string`): El texto a mostrar inicialmente. Default: `'Awaiting data...'`.
*   `initialEffects` (`object`): Un objeto para configurar efectos visuales iniciales. Default: `{ blur: false, flicker: false, glitch: false, textColorClass: null }`.
    *   `blur` (`boolean`): Aplicar efecto de desenfoque.
    *   `flicker` (`boolean`): Aplicar efecto de parpadeo.
    *   `glitch` (`boolean`): Aplicar efecto "glitch".
    *   `textColorClass` (`string | null`): Clase CSS para el color del texto (p.ej., `DSDK_CLASSES.TEXT_INFO`).

**Métodos Específicos:**
*   `setText(text)`: Establece el texto mostrado.
    *   `text` (`string`): El nuevo texto.
*   `setEffects(effectsObject)`: Establece o actualiza efectos visuales. Las propiedades no incluidas en `effectsObject` permanecen sin cambios.
    *   `effectsObject` (`object`): Objeto con las mismas propiedades que `initialEffects` (todas opcionales).

**Ejemplo de Uso:**
```javascript
// HTML: <div id="dynTextDemo" class="panel-container" style="height: 150px;"></div>

const dynTextPanel = new DynamicSciFiDashboardKit.DynamicTextPanel('#dynTextDemo', {
    title: 'Flujo de Datos',
    initialText: 'ESPERANDO DESENCRIPTACIÓN',
    initialEffects: { blur: true, textColorClass: DynamicSciFiDashboardKit.DSDK_CLASSES.TEXT_INFO }
});
dynTextPanel.setPanelState('normal');

setTimeout(() => {
    dynTextPanel.setText('MENSAJE ENTRANTE // ORIGEN: DESCONOCIDO // ENCRIPTACIÓN: NIVEL 7');
    dynTextPanel.setEffects({ blur: false, flicker: true });
    dynTextPanel.setPanelState('warning');
}, 3000);

setTimeout(() => {
    dynTextPanel.setText('!@#$ FLUJO DE DATOS CORRUPTO DETECTADO $#@!');
    dynTextPanel.setEffects({ flicker: false, glitch: true, textColorClass: DynamicSciFiDashboardKit.DSDK_CLASSES.TEXT_DANGER });
    dynTextPanel.setPanelState('critical');
}, 6000);
```

### 3.6. `ActionButtonsPanel`

Muestra un conjunto de botones configurables con acciones asociadas.

**Inicialización:**
```javascript
const actionPanel = new DynamicSciFiDashboardKit.ActionButtonsPanel('#actionsContainer', {
    title: 'Controles del Sistema',
    buttons: [
        { id: 'btn-scan', text: 'Escanear Sector', onClick: () => console.log('Escaneando...') }
    ]
});
```

**Opciones Específicas:**
*   `title` (`string`): Título del panel. Default: `'Actions'`.
*   `buttons` (`array`): Un array de objetos de configuración de botones. Default: `[]`. Cada objeto de botón:
    *   `id` (`string`, **requerido**): Identificador único para el botón.
    *   `text` (`string`): Texto del botón. Default: `'Button'`.
    *   `style` (`string`, opcional): Estilo del botón. Valores: `'normal'`, `'danger'`, `'warning'`, `'success'`. Default: `'normal'`.
    *   `disabled` (`boolean`, opcional): Si el botón está inicialmente deshabilitado. Default: `false`.
    *   `onClick` (`function`, opcional): Función a ejecutar cuando se hace clic en el botón.

**Métodos Específicos:**
*   `addButton(buttonConfig, addToDom = true)`: Añade un nuevo botón.
    *   `buttonConfig` (`object`): Objeto de configuración del botón (ver `buttons` en opciones).
    *   `addToDom` (`boolean`): Si se añade al DOM inmediatamente. Default: `true`.
*   `removeButton(buttonId)`: Elimina un botón por su ID.
    *   `buttonId` (`string`): ID del botón a eliminar.
*   `updateButton(buttonId, updates)`: Actualiza propiedades de un botón existente.
    *   `buttonId` (`string`): ID del botón a actualizar.
    *   `updates` (`object`): Objeto con propiedades a cambiar:
        *   `newText` (`string`, opcional): Nuevo texto para el botón.
        *   `newDisabledState` (`boolean`, opcional): Nuevo estado habilitado/deshabilitado.
        *   `newStyle` (`string`, opcional): Nuevo estilo para el botón.
*   `setButtonDisabled(buttonId, isDisabled)`: Atajo para habilitar/deshabilitar un botón.
    *   `buttonId` (`string`): ID del botón.
    *   `isDisabled` (`boolean`): `true` para deshabilitar, `false` para habilitar.

**Ejemplo de Uso:**
```javascript
// HTML: <div id="actionDemo" class="panel-container"></div>
// Necesitarás una instancia de logPanel para que este ejemplo funcione completamente.
// const logPanel = new DynamicSciFiDashboardKit.LogDisplayPanel('#someLogPanelID');

const actionPanel = new DynamicSciFiDashboardKit.ActionButtonsPanel('#actionDemo', {
    title: 'Sistemas de Armas',
    buttons: [
        { id: 'fire-phasers', text: 'Disparar Phasers', style: 'normal', onClick: () => logPanel.addLog({text: 'Phasers disparados!', level: 'info'}) },
        { id: 'launch-torpedo', text: 'Lanzar Torpedo', style: 'warning', disabled: true, onClick: () => logPanel.addLog({text: 'Torpedo lanzado!', level: 'warn'}) }
    ]
});

setTimeout(() => {
    actionPanel.updateButton('launch-torpedo', { newDisabledState: false });
    actionPanel.setPanelState('warning');
    logPanel.addLog({text: 'Sistemas de torpedo online.', level: 'info'});
}, 3000);

setTimeout(() => {
    actionPanel.addButton({ id: 'self-destruct', text: 'Autodestrucción', style: 'danger', onClick: () => {
        logPanel.addLog({text: 'Secuencia de autodestrucción iniciada!', level: 'error'});
        actionPanel.setPanelState('critical');
    }});
}, 6000);
```

### 3.7. `CanvasGraphPanel`

Muestra un gráfico animado en un canvas, como un ECG o una onda sinusoidal. **Nota:** Este panel genera su propia animación de datos simulados. Para graficar datos externos en tiempo real, usa `TrueCanvasGraphPanel`.

**Inicialización:**
```javascript
const graphPanel = new DynamicSciFiDashboardKit.CanvasGraphPanel('#graphContainer', {
    title: 'Signos Vitales',
    graphType: 'ecg'
});
```

**Opciones Específicas:**
*   `title` (`string`): Título del panel. Default: `'Graph Panel'`.
*   `graphType` (`string`): Tipo de gráfico a mostrar. Valores: `'ecg'`, `'sine'`. Default: `'ecg'`.
*   `colorScheme` (`object`): Objeto que define colores y estilos de línea para cada estado del panel (`normal`, `warning`, `critical`, `stable`). Cada estado tiene:
    *   `stroke` (`string`): Color del trazo.
    *   `lineWidth` (`number`): Ancho de línea.
    *   `noiseFactor` (`number`): Factor de "ruido" o variabilidad en el gráfico.
*   `animationSpeed` (`number`): Velocidad de animación para el gráfico tipo `'sine'`. Default: `0.05`.
*   `ecgDataLength` (`number`): Número de puntos de datos para el gráfico `'ecg'`. Afecta la "longitud" de la onda en pantalla. Default: `200` (se ajusta ligeramente según el ancho del panel).
*   `ecgSpikeChance` (`number`): Probabilidad de que ocurra un "pico" en el gráfico ECG. Default: `0.08`.
*   `particleEffectType` (`string`): Tipo de efecto de partículas. Default: `'1'`.

**Métodos Específicos:**
*   No tiene métodos públicos específicos aparte de los heredados. El gráfico se actualiza automáticamente según `panelState` y sus opciones.

**Ejemplo de Uso:**
```javascript
// HTML: <div id="canvasDemo" class="panel-container" style="height: 250px;"></div>

const canvasPanel = new DynamicSciFiDashboardKit.CanvasGraphPanel('#canvasDemo', {
    title: 'Fluctuaciones de Energía',
    graphType: 'sine',
    initialState: 'normal',
    particleEffectType: '2'
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
    title: 'Integridad del Núcleo',
    barCount: 10
});
```

**Opciones Específicas:**
*   `title` (`string`): Título del panel. Default: `'Integrity Pulse'`.
*   `initialState` (`string`): Estado inicial. Default: `'normal'`.
*   `barCount` (`number`): Número de barras a mostrar. Default: `5`. Un número entre 1 y 100 es razonable.
*   `enableScanlineHalo` (`boolean`): Default: `false`.

**Métodos Específicos:**
*   No tiene métodos públicos específicos. Las barras se animan y colorean según `panelState`.

**Ejemplo de Uso:**
```javascript
// HTML: <div id="pulseDemo" class="panel-container" style="height: 250px;"></div>

const pulsePanel = new DynamicSciFiDashboardKit.IntegrityPulsePanel('#pulseDemo', {
    title: 'Armónicos del Escudo',
    barCount: 12, // Más barras
    initialState: 'stable',
    particleEffectType: '4',
    particleEffectStates: ['critical', 'warning']
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
    title: 'Salida del Reactor',
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
*   `targetValue` (`number | null`): Un valor objetivo marcado en el medidor. Default: `null` (sin marcador).
*   `units` (`string`): Unidades mostradas con el valor y la etiqueta. Default: `'%'`.
*   `label` (`string`): Etiqueta descriptiva mostrada debajo del valor. Default: `''`.
*   `valueFontSize` (`string`): Tamaño de fuente CSS para el valor numérico. Default: `'2em'`.
*   `labelFontSize` (`string`): Tamaño de fuente CSS para la etiqueta. Default: `'0.8em'`.
*   `unitsFontSize` (`string`): Tamaño de fuente CSS para las unidades. Default: `'0.7em'`.
*   `labelYOffset` (`number`): Desplazamiento vertical adicional para la etiqueta en píxeles SVG. Útil para ajustar finamente la posición de la etiqueta. Default: `5`.
*   `arcWidth` (`number`): Ancho del arco del medidor en píxeles SVG. Default: `12`.
*   `gaugeRadius` (`number`): Radio del medidor en píxeles SVG. Default: `80`.
*   `startAngle` (`number`): Ángulo inicial del arco en grados (0 es arriba, 90 derecha, etc.). Default: `-135`.
*   `endAngle` (`number`): Ángulo final del arco en grados. Default: `135`.
*   `animationDuration` (`number`): Duración de la animación de cambio de valor en milisegundos. Default: `400`.
*   `enableScanlineHalo` (`boolean`): Default: `false`.

**Métodos Específicos:**
*   `setValue(newValue, animate = true)`: Establece el valor del medidor.
    *   `newValue` (`number`): El nuevo valor a mostrar.
    *   `animate` (`boolean`, opcional): Si el cambio debe ser animado. Default: `true`.
*   `setTargetValue(newTargetValue)`: Establece o elimina el marcador de valor objetivo.
    *   `newTargetValue` (`number | null`): El nuevo valor objetivo, o `null` para eliminar el marcador.

**Ejemplo de Uso:**
```javascript
// HTML: <div id="circGaugeDemo" class="panel-container" style="height: 280px;"></div>

const circGauge = new DynamicSciFiDashboardKit.CircularGaugePanel('#circGaugeDemo', {
    title: 'Empuje del Motor',
    minValue: 0,
    maxValue: 150,
    initialValue: 25,
    units: 'kN',
    label: 'Propulsor Principal',
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

Muestra una lista de indicadores de estado, cada uno con un LED de color y texto descriptivo.

**Inicialización:**
```javascript
const statusPanel = new DynamicSciFiDashboardKit.StatusIndicatorLedPanel('#statusLedContainer', {
    title: 'Estado de Subsistemas',
    indicators: [
        { id: 'nav', text: 'Navegación', color: 'green' },
        { id: 'com', text: 'Comunicaciones', color: 'yellow', blinking: true }
    ]
});
```

**Opciones Específicas:**
*   `title` (`string`): Título del panel. Default: `'System Status'`.
*   `indicators` (`array`): Array de objetos de configuración de indicadores. Default: `[]`. Cada objeto:
    *   `id` (`string`, **requerido**): ID único para el indicador.
    *   `text` (`string`, **requerido**): Texto descriptivo.
    *   `color` (`string`, opcional): Color del LED. Valores: `'green'`, `'yellow'`, `'red'`, `'blue'`, `'orange'`, `'purple'`, `'cyan'`, `'white'`, `'off'`. Default: `'off'`.
    *   `blinking` (`boolean`, opcional): Si el LED debe parpadear. Default: `false`.
*   `enableScanlineHalo` (`boolean`): Default: `false`.

**Métodos Específicos:**
*   `addIndicator(indicatorData, atBeginning = false)`: Añade un nuevo indicador.
    *   `indicatorData` (`object`): Objeto de configuración del indicador.
    *   `atBeginning` (`boolean`): Si es `true`, añade el indicador al principio de la lista. Default: `false`.
*   `updateIndicator(id, updates)`: Actualiza un indicador existente.
    *   `id` (`string`): ID del indicador.
    *   `updates` (`object`): Objeto con propiedades a actualizar (`text`, `color`, `blinking`).
*   `removeIndicator(id)`: Elimina un indicador por su ID.
*   `setIndicatorBlinking(id, isBlinking)`: Alterna el parpadeo para un LED.
*   `setIndicatorColor(id, newColor)`: Cambia el color de un LED.
*   `setIndicatorText(id, newText)`: Cambia el texto de un indicador.
*   `getIndicator(id)`: Devuelve los datos actuales de un indicador.
*   `getAllIndicators()`: Devuelve un array con datos de todos los indicadores.

**Ejemplo de Uso:**
```javascript
// HTML: <div id="statusLedDemo" class="panel-container" style="min-height: 260px;"></div>

const statusLedPanel = new DynamicSciFiDashboardKit.StatusIndicatorLedPanel('#statusLedDemo', {
    title: 'Sistemas de Soporte Vital',
    indicators: [
        { id: 'oxygen', text: 'Niveles de Oxígeno', color: 'green' },
        { id: 'co2_filter', text: 'Filtro CO2', color: 'green' },
        { id: 'gravity', text: 'Gravedad Artificial', color: 'blue' }
    ]
});

setTimeout(() => {
    statusLedPanel.updateIndicator('co2_filter', { color: 'yellow', blinking: true, text: 'Filtro CO2 (Mantenimiento Req.)' });
    statusLedPanel.setPanelState('warning');
}, 3000);

setTimeout(() => {
    statusLedPanel.addIndicator({ id: 'backup_power', text: 'Energía de Respaldo', color: 'red', blinking: true }, true);
    statusLedPanel.setPanelState('critical');
}, 6000);
```

### 3.11. `HorizontalBarGaugePanel`

Muestra un medidor de barra horizontal para representar un valor dentro de un rango.

**Inicialización:**
```javascript
const hGaugePanel = new DynamicSciFiDashboardKit.HorizontalBarGaugePanel('#hGaugeContainer', {
    title: 'Capacidad del Escudo',
    initialValue: 75,
    label: 'Escudos Frontales',
    units: '%'
});
```

**Opciones Específicas:**
*   `title` (`string`): Título del panel. Default: `'Horizontal Gauge'`.
*   `minValue` (`number`): Valor mínimo del medidor. Default: `0`.
*   `maxValue` (`number`): Valor máximo del medidor. Default: `100`.
*   `initialValue` (`number`): Valor inicial del medidor. Default: `0`.
*   `units` (`string`): Unidades mostradas con el valor de texto (si está habilitado). Default: `'%'`.
*   `label` (`string`): Etiqueta descriptiva mostrada sobre la barra (si no está vacía). Default: `''`.
*   `barHeight` (`string`): Altura de la barra del medidor (p.ej., `'16px'`, `'1.2em'`). Default: `'16px'`.
*   `showValueText` (`boolean`): Si se muestra el valor numérico actual junto a la etiqueta. Default: `true`.
*   `valueTextFormat` (`function`): Función para formatear el texto del valor. Recibe `(value, units)` y debe devolver un string. Default: `(value, units) => \`${Math.round(value)}${units}\``.
*   `animationDuration` (`number`): Duración de la animación de cambio de valor en milisegundos. `0` para deshabilitar la animación de ancho. Default: `400`.
*   `enableScanlineHalo` (`boolean`): Default: `false`.
*   `colorScheme` (`object`, opcional): Permite definir colores específicos para la barra basados en el estado del panel (p.ej., `{ normal: '#00E5E5', warning: '#FFD700', ... }`). Si no se proporciona, los colores se toman de variables CSS (`--dsdk-gauge-h-bar-normal`, etc.) según `panelState`.

**Métodos Específicos:**
*   `setValue(newValue, animate = true)`: Establece el valor del medidor.
    *   `newValue` (`number`): El nuevo valor a mostrar.
    *   `animate` (`boolean`, opcional): Si el cambio de ancho debe ser animado (si `animationDuration > 0`). Default: `true`.
*   `setPanelState(newState)`: (Sobrescrito) Además de cambiar el estado del panel, actualiza el color de la barra si no se usa un `colorScheme` personalizado.

**Ejemplo de Uso:**
```javascript
// HTML: <div id="hGaugeDemo" class="panel-container" style="height: 150px;"></div>

const hGaugePanel = new DynamicSciFiDashboardKit.HorizontalBarGaugePanel('#hGaugeDemo', {
    title: 'Reservas de Munición',
    label: 'Células de Plasma',
    minValue: 0,
    maxValue: 200,
    initialValue: 180,
    units: ' células',
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
}, 6000);
```

### 3.12. `TrueCanvasGraphPanel`

Muestra un gráfico de líneas en un canvas, diseñado para representar datos externos en tiempo real. Ideal para visualizar series temporales, telemetría o cualquier flujo de datos numéricos.

**Inicialización:**
```javascript
const realtimeGraph = new DynamicSciFiDashboardKit.TrueCanvasGraphPanel('#realtimeGraphContainer', {
    title: 'Flujo de Datos del Sensor',
    maxDataPoints: 150,
    dataRange: { min: 0, max: 100 } // Opcional: fija el rango del eje Y
});
```

**Opciones Específicas:**
*   `title` (`string`): Título del panel. Default: `'Realtime Data Graph'`.
*   `maxDataPoints` (`number`): Número máximo de puntos de datos a retener y mostrar en el gráfico. Los puntos más antiguos se descartan. Default: `200`.
*   `dataRange` (`object | null`): Define un rango fijo para el eje Y. Si es `null` (default), el eje Y se autoescala según los datos visibles.
    *   `min` (`number`): Valor mínimo del eje Y.
    *   `max` (`number`): Valor máximo del eje Y.
*   `colorScheme` (`object`): Objeto que define el estilo de línea para cada estado del panel (`normal`, `warning`, `critical`, `stable`). Cada estado tiene:
    *   `stroke` (`string`): Color del trazo de la línea.
    *   `lineWidth` (`number`): Ancho de la línea.
*   `particleEffectType` (`string`): Default: `'1'`.
*   `enableScanlineHalo` (`boolean`): Default: `true`.

**Métodos Específicos:**
*   `addDataPoint(yValue)`: Añade un nuevo punto de datos (valor Y) al final del gráfico. Si se excede `maxDataPoints`, se elimina el punto más antiguo.
    *   `yValue` (`number`): El valor numérico del punto de datos.
*   `setData(newDataArray)`: Reemplaza todos los datos actuales del gráfico con el array proporcionado. Se tomarán los últimos `maxDataPoints` del array si es más largo.
    *   `newDataArray` (`array<number>`): Un array de valores numéricos.
*   `clearData()`: Elimina todos los puntos de datos del gráfico, dejándolo vacío.
*   `setPanelState(newState)`: (Sobrescrito) Además de cambiar el estado general del panel (borde, título, efectos), también actualiza el color/estilo de la línea del gráfico según el `colorScheme` para el nuevo estado.

**Ejemplo de Uso:**
```javascript
// HTML: <div id="sensorGraph" class="panel-container" style="height: 300px;"></div>

const sensorPanel = new DynamicSciFiDashboardKit.TrueCanvasGraphPanel('#sensorGraph', {
    title: 'Lecturas de Temperatura',
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
    // Simular nuevos datos
    let newValue = 50 + Math.sin(time * 0.2) * 25 + (Math.random() - 0.5) * 5;
    
    // Ajustar valor y estado según umbrales
    if (newValue > 75) {
        sensorPanel.setPanelState('critical');
    } else if (newValue > 60) {
        sensorPanel.setPanelState('warning');
    } else if (newValue < 25) {
        sensorPanel.setPanelState('normal'); // Podría ser un estado 'info' o 'frío'
    } else {
        sensorPanel.setPanelState('stable');
    }
    
    sensorPanel.addDataPoint(newValue);
    time += 0.1;
}, 200); // Añadir un nuevo punto cada 200ms
```

### 3.13. `ImageDisplayPanel`

Muestra una imagen o un flujo de vídeo (webcam) con varios efectos visuales opcionales de estilo Sci-Fi, como interferencia, "glitch", pixelación, ruido de TV, barras de desplazamiento y un efecto de fósforo CRT. También permite voltear la imagen horizontal o verticalmente.

**Inicialización:**
```javascript
const imagePanel = new DynamicSciFiDashboardKit.ImageDisplayPanel('#myImageViewer', {
    title: 'Canal de Video Principal',
    imageUrl: 'path/to/your/image.png',
    imageFit: 'cover',
    enableCrtPhosphorEffect: true,
    initialState: 'normal'
});
```

**Opciones Específicas:**
*   `title` (`string`): Título del panel. Default: `'Image Display'`.
*   `sourceType` (`string`): Define la fuente multimedia. Valores válidos: `'url'` (para imágenes o vídeos desde una URL), `'webcam'`. Default: `'url'`.
*   `imageUrl` (`string`): URL de la imagen a mostrar si `sourceType` es `'url'`. Default: `''`.
*   `imageAltText` (`string`): Texto alternativo para la imagen. Default: `'Displayed image'`.
*   `imageFit` (`string`): Cómo debe redimensionarse la imagen o vídeo para ajustarse a su contenedor. Valores válidos: `'contain'`, `'cover'`, `'fill'`, `'none'`, `'scale-down'`. Default: `'contain'`.
*   `enableInterferenceEffect` (`boolean`): Activa un efecto de líneas de interferencia y ligeros saltos. Default: `false`.
*   `interferenceIntensity` (`string`): Intensidad del efecto de interferencia. Valores válidos: `'low'`, `'medium'`, `'high'`. Default: `'medium'`.
*   `enableGlitchEffect` (`boolean`): Activa un efecto visual "glitch" con distorsiones y cortes. Default: `false`.
*   `enablePixelationEffect` (`boolean`): Activa un efecto de pixelación (desenfoque y contraste) en la imagen. Default: `false`.
*   `pixelationLevel` (`number`): Nivel del efecto de pixelación. Valores válidos: `1`, `2`, `3`. Default: `1`.
*   `enableTvNoiseEffect` (`boolean`): Activa una superposición de ruido estático tipo TV. Default: `false`.
*   `tvNoiseIntensity` (`number`): Opacidad de la capa de ruido de TV (entre 0 y 1). Default: `0.15`.
*   `enableRollingBarsEffect` (`boolean`): Activa una superposición de barras que se desplazan horizontalmente. Default: `false`.
*   `rollingBarHeight` (`string`): Altura CSS de cada barra de desplazamiento (p.ej., `'2px'`). Default: `'2px'`.
*   `rollingBarSpeed` (`string`): Duración de la animación CSS para las barras de desplazamiento (p.ej., `'4s'`, `'500ms'`). Default: `'4s'`.
*   `webcamConstraints` (`object`): Objeto de restricciones para `navigator.mediaDevices.getUserMedia` cuando `sourceType` es `'webcam'`. Default: `{ video: true, audio: false }`.
*   `fallbackImageUrl` (`string`): URL para una imagen de respaldo si la `imageUrl` principal no se carga o si hay un error con la webcam. Default: `''`.
*   `onError` (`function | null`): Función de callback ejecutada si ocurre un error (p.ej., al acceder a la webcam). Recibe el objeto de error como argumento. Default: `null`.
*   `enableCrtPhosphorEffect` (`boolean`): Activa un efecto "fósforo CRT" que tiñe la imagen/vídeo. El color específico (`red`, `amber`, `green/normal`, `green/stable`) se basa en el `panelState` actual. Default: `false`.
*   `flipHorizontal` (`boolean`): Voltea la imagen/vídeo horizontalmente. Default: `false`.
*   `flipVertical` (`boolean`): Voltea la imagen/vídeo verticalmente. Default: `false`.
*   `particleEffectType` (`string | null`): Heredado de `BasePanel`. Default: `null`.
*   `enableScanlineHalo` (`boolean`): Heredado de `BasePanel`. Default: `false`.

**Métodos Específicos:**
*   `setImage(newImageUrl, newAltText = this.config.imageAltText)`: Cambia la imagen mostrada a la URL especificada (y establece `sourceType` a `'url'`).
    *   `newImageUrl` (`string`): Nueva URL de la imagen.
    *   `newAltText` (`string`, opcional): Nuevo texto alternativo.
*   `setImageFit(fitMode)`: Cambia el modo de ajuste de la imagen/vídeo.
    *   `fitMode` (`string`): Uno de los valores válidos para `imageFit`.
*   `async startWebcam(constraints = this.config.webcamConstraints)`: Intenta iniciar la webcam y mostrar su flujo. Este es un método asíncrono.
    *   `constraints` (`object`, opcional): Nuevas restricciones para la webcam.
    *   Devuelve: Una `Promise` que se resuelve con el `MediaStream` en caso de éxito, o se rechaza con un error.
*   `stopWebcam()`: Detiene el flujo de la webcam si está activo.
*   `toggleInterference(enable, intensity = this.config.interferenceIntensity)`: Alterna el efecto de interferencia.
*   `toggleGlitch(enable)`: Alterna el efecto glitch.
*   `togglePixelation(enable, level = this.config.pixelationLevel)`: Alterna el efecto de pixelación.
*   `toggleTvNoise(enable, intensity = this.config.tvNoiseIntensity)`: Alterna el efecto de ruido de TV.
*   `toggleRollingBars(enable, barHeight = this.config.rollingBarHeight, barSpeed = this.config.rollingBarSpeed)`: Alterna el efecto de barras de desplazamiento.
*   `toggleCrtPhosphorEffect(enable)`: Alterna el efecto de fósforo CRT.
*   `toggleFlipHorizontal(enable)`: Alterna el volteo horizontal.
*   `toggleFlipVertical(enable)`: Alterna el volteo vertical.
*   `setPanelState(newState)`: (Sobrescrito) Además del comportamiento base, actualiza el color del efecto de fósforo CRT si está habilitado, según `newState`.
*   `destroy()`: (Sobrescrito) Además de la limpieza base, detiene la webcam si está activa.

**Ejemplo de Uso:**
```javascript
// HTML: <div id="imageDemo" class="panel-container" style="height: 300px; width: 400px;"></div>
// Para probar la webcam, este ejemplo podría necesitar que logPanel esté instanciado.
// const logPanel = new DynamicSciFiDashboardKit.LogDisplayPanel('#someLogPanelID');

const imageDisplay = new DynamicSciFiDashboardKit.ImageDisplayPanel('#imageDemo', {
    title: 'Canal de Vigilancia 7',
    imageUrl: 'https://picsum.photos/seed/scifi1/400/300', // Imagen de placeholder
    imageFit: 'cover',
    enableCrtPhosphorEffect: true,
    initialState: 'normal' // El fósforo CRT será verde/normal por defecto
});

setTimeout(() => {
    imageDisplay.setPanelState('warning'); // El fósforo cambiará a ámbar
    imageDisplay.toggleTvNoise(true, 0.25);
    imageDisplay.toggleFlipHorizontal(true);
    imageDisplay.setImage('https://picsum.photos/seed/scifi2/400/300');
}, 3000);

setTimeout(() => {
    imageDisplay.setPanelState('critical'); // El fósforo cambiará a rojo
    imageDisplay.toggleInterference(true, 'high');
    imageDisplay.toggleGlitch(true);
    imageDisplay.toggleRollingBars(true, '3px', '2s');
}, 6000);

// Ejemplo de cómo iniciar la webcam después de un retraso
// Nota: El navegador pedirá permiso al usuario
setTimeout(async () => {
    try {
        // Limpiar efectos de imagen antes de mostrar la webcam
        imageDisplay.toggleInterference(false);
        imageDisplay.toggleGlitch(false);
        imageDisplay.toggleTvNoise(false);
        imageDisplay.toggleRollingBars(false);
        imageDisplay.toggleFlipHorizontal(false); // Reiniciar volteo
        
        await imageDisplay.startWebcam();
        imageDisplay.setImageFit('contain'); // Ajustar ajuste para webcam
        imageDisplay.setPanelState('stable'); // El fósforo cambiará a verde brillante/estable
        // Si tienes un panel de registro, podrías registrar esto:
        // logPanel.addLog({text: 'Webcam activada en ImageDisplay.', level: 'info'});
    } catch (err) {
        // logPanel.addLog({text: 'Error al iniciar webcam: ' + err.message, level: 'error'});
        // Mostrar imagen de error si la webcam falla
        imageDisplay.setImage('https://picsum.photos/seed/error/400/300?text=ERROR+WEBCAM', 'Error de Webcam');
        imageDisplay.setPanelState('critical');
    }
}, 9000);
```

### 3.14. `RadarDisplayPanel`

Muestra una pantalla de radar animada con un barrido giratorio y la capacidad de mostrar puntos (contactos). Los puntos se resaltan cuando el barrido pasa sobre ellos y luego se desvanecen gradualmente.

**Inicialización:**
```javascript
const radarPanel = new DynamicSciFiDashboardKit.RadarDisplayPanel('#radarContainer', {
    title: 'Radar de Largo Alcance',
    radarSpeed: 20, // RPM
    numCircles: 4,
    maxRadarRange: 150
});
```

**Opciones Específicas:**
*   `title` (`string`): Título del panel. Default: `'Radar Display'`.
*   `numCircles` (`number`): Número de círculos concéntricos en la retícula del radar. Default: `5`.
*   `radarSpeed` (`number`): Velocidad de rotación del barrido del radar en RPM (rotaciones por minuto). Default: `10`.
*   `maxRadarRange` (`number`): Rango máximo abstracto para las coordenadas X e Y de los puntos. Los puntos se mapean dentro del radio del radar basado en este valor. Default: `100`.
*   `pointSize` (`number`): Tamaño base de los puntos en píxeles. Default: `3`.
*   `pointHighlightDuration` (`number`): Duración en milisegundos que un punto permanece resaltado después de ser detectado por el barrido. Default: `500`.
*   `pointFadeOutDuration` (`number`): Duración en milisegundos del desvanecimiento de un punto después del resaltado. Default: `2500`.
*   `pointInitialDetectionBoost` (`number`): Factor de multiplicación del tamaño del punto cuando es detectado por primera vez por el barrido (efecto de "pulso"). `1` significa sin aumento. Default: `1`.
*   `pointMinOpacityAfterFade` (`number`): Opacidad mínima (0.0 a 1.0) a la que un punto se desvanece antes de potencialmente desaparecer (si es 0). Default: `0.0`.
*   `sweepWidthDegrees` (`number`): Ancho angular del barrido del radar en grados. Default: `20`.
*   `particleEffectType` (`string | null`): Default: `'6'`.
*   `particleEffectStates` (`array`): Default: `['critical', 'warning', 'normal']`.
*   `enableScanlineHalo` (`boolean`): Default: `true`.

**Métodos Específicos:**
*   `addPoint(id, x, y, data = {})`: Añade un nuevo punto al radar o actualiza uno existente si el `id` ya existe.
    *   `id` (`string`): Identificador único para el punto.
    *   `x` (`number`): Coordenada X del punto, relativa a `maxRadarRange`. El centro del radar es (0,0).
    *   `y` (`number`): Coordenada Y del punto, relativa a `maxRadarRange`.
    *   `data` (`object`, opcional): Objeto de datos personalizado asociado con el punto.
*   `updatePoint(id, newX, newY, newData)`: Actualiza la posición y/o los datos de un punto existente.
    *   `id` (`string`): ID del punto a actualizar.
    *   `newX` (`number`, opcional): Nueva coordenada X.
    *   `newY` (`number`, opcional): Nueva coordenada Y.
    *   `newData` (`object`, opcional): Nuevos datos para fusionar con los existentes.
*   `removePoint(id)`: Elimina un punto del radar por su ID.
    *   `id` (`string`): ID del punto a eliminar.
*   `clearPoints()`: Elimina todos los puntos del radar.
*   `setRadarSpeed(rpm)`: Establece la velocidad de rotación del barrido del radar.
    *   `rpm` (`number`): Nueva velocidad en Rotaciones Por Minuto.
*   `setPanelState(newState)`: (Sobrescrito) Además del comportamiento base, el estado del panel afecta los colores del barrido, la retícula y los puntos del radar a través de variables CSS.
*   `destroy()`: (Sobrescrito) Detiene la animación del radar, limpia los listeners y los puntos antes de llamar al `destroy` base.

**Ejemplo de Uso:**
```javascript
// HTML: <div id="myRadarScreen" class="panel-container" style="height: 350px;"></div>

const radarScreen = new DynamicSciFiDashboardKit.RadarDisplayPanel('#myRadarScreen', {
    title: 'Sistema de Detección Táctica',
    radarSpeed: 15,
    maxRadarRange: 200, // Un rango mayor
    pointSize: 4,
    pointHighlightDuration: 700,
    pointFadeOutDuration: 4000,
    sweepWidthDegrees: 15,
    initialState: 'normal'
});

// Añadir algunos contactos iniciales
radarScreen.addPoint('hostile_01', 80, 120, { type: 'fighter', allegiance: 'unknown' });
radarScreen.addPoint('friendly_01', -50, 70, { type: 'transport', allegiance: 'federation' });
radarScreen.addPoint('asteroid_belt_edge', 0, 180, { type: 'hazard' });

setTimeout(() => {
    radarScreen.updatePoint('hostile_01', 70, 100); // Mover el contacto
    radarScreen.addPoint('hostile_02', 90, -60, { type: 'frigate', allegiance: 'klingon' });
    radarScreen.setPanelState('warning');
}, 5000);

setTimeout(() => {
    radarScreen.removePoint('asteroid_belt_edge');
    radarScreen.setRadarSpeed(25); // Aumentar velocidad del radar
    radarScreen.setPanelState('critical');
}, 10000);

// Simular un nuevo contacto apareciendo y desapareciendo
let tempContactId = 'transient_signal';
setTimeout(() => {
    radarScreen.addPoint(tempContactId, Math.random() * 100 - 50, Math.random() * 100 - 50);
}, 12000);
setTimeout(() => {
    radarScreen.removePoint(tempContactId);
}, 18000); // El punto se desvanecerá y luego será eliminado
```

## 4. `DSDK_CLASSES` (Constantes CSS)

La librería expone un objeto `DynamicSciFiDashboardKit.DSDK_CLASSES` que contiene mapeos de nombres lógicos a las clases CSS reales usadas internamente. Esto es útil para aplicar estilos consistentemente, especialmente para las clases de texto de estado.

```javascript
const { DSDK_CLASSES } = DynamicSciFiDashboardKit;

// Ejemplo para KeyValueListPanel
miKeyValuePanel.addItem({
    key: 'Estado del Reactor',
    value: 'SOBRECALENTANDO',
    statusClass: DSDK_CLASSES.TEXT_DANGER // Usar la constante
});

// Ejemplo para DynamicTextPanel
miDynamicTextPanel.setEffects({
    textColorClass: DSDK_CLASSES.TEXT_WARNING
});
```
Clases de texto comúnmente usadas:
*   `DSDK_CLASSES.TEXT_DANGER`
*   `DSDK_CLASSES.TEXT_WARNING`
*   `DSDK_CLASSES.TEXT_SUCCESS`
*   `DSDK_CLASSES.TEXT_INFO`

También contiene las clases base para los paneles y sus componentes internos, lo cual puede ser útil para estilos más avanzados o para interactuar con elementos específicos si fuera necesario (aunque generalmente la interacción se hace a través de los métodos del panel).

## 5. Personalización Avanzada (CSS)

La apariencia de los paneles se controla principalmente mediante variables CSS (Custom Properties) definidas en `DynamicSciFiDashboardKit.css` dentro del selector `:root`. Puedes sobrescribir estas variables en tu propio archivo CSS para personalizar la paleta de colores, fuentes, etc.

**Ejemplo de cómo cambiar el color de acento secundario y el fondo del panel:**
```css
/* En tu archivo CSS, después de importar DynamicSciFiDashboardKit.css */
:root {
    --dsdk-accent-color-secondary: #FF8C00; /* Naranja oscuro como acento secundario */
    --dsdk-panel-bg: rgba(30, 10, 10, 0.85); /* Un fondo más rojizo y opaco */
    --dsdk-font-sans: 'Orbitron', sans-serif; /* Cambiar la fuente principal a una más SciFi */
    
    /* Variables específicas del radar, si quieres personalizarlas más allá del estado */
    --dsdk-radar-sweep-color-base-normal: #FF8C00; /* Barrido naranja en estado normal */
    --dsdk-radar-grid-dash: 5, 5; /* Cambiar el patrón de la retícula */
}
```
Revisa el archivo `DynamicSciFiDashboardKit.css` para una lista completa de las variables disponibles para personalización.

## 6. Consejos y Buenas Prácticas

*   **Gestión de Instancias:** Mantén referencias a tus instancias de panel si necesitas interactuar con ellas después de su creación (p.ej., `logPanel.addLog(...)`).
*   **IDs Únicos:** Asegúrate de que cada panel se inicialice en un contenedor con un ID único en tu HTML.
*   **Limpieza (`destroy()`):** Llama siempre al método `destroy()` en una instancia de panel cuando ya no la necesites (p.ej., al cambiar de vista en una Aplicación de Página Única - SPA). Esto es crucial para liberar recursos y prevenir fugas de memoria, especialmente con paneles que usan animaciones (`CanvasGraphPanel`, `IntegrityPulsePanel`, `RadarDisplayPanel`, `TrueCanvasGraphPanel`) o listeners de eventos.
*   **Altura del Contenedor:** Algunos paneles (como `CanvasGraphPanel`, `IntegrityPulsePanel`, `CircularGaugePanel`, `CriticalWarningTextPanel`, `ImageDisplayPanel`, `RadarDisplayPanel`, `TrueCanvasGraphPanel`) se ven mejor o funcionan de manera óptima si su contenedor tiene una altura definida. Puedes usar CSS para esto:
    ```css
    .mi-contenedor-grafico {
        height: 250px; /* O la altura que necesites */
    }
    ```
    O directamente en el estilo del elemento:
    ```html
    <div id="miGrafico" class="panel-container" style="height: 250px;"></div>
    ```
*   **Rendimiento:** Si tienes muchos paneles con animaciones complejas (especialmente `CanvasGraphPanel` o `TrueCanvasGraphPanel` con alta frecuencia de actualización, `IntegrityPulsePanel` con muchas barras, o `RadarDisplayPanel` con muchos puntos), considera el impacto en el rendimiento en dispositivos de bajos recursos. Utiliza `destroy()` juiciosamente para los paneles que no estén visibles.
*   **Permisos de Webcam:** Para `ImageDisplayPanel` con `sourceType: 'webcam'`, el navegador solicitará permiso al usuario. Maneja posibles errores en la promesa devuelta por `startWebcam()`.
*   **Coordenadas del Radar:** Recuerda que para `RadarDisplayPanel`, las coordenadas `x` e `y` de los puntos son relativas al centro del radar (0,0) y se escalan según `maxRadarRange`.
