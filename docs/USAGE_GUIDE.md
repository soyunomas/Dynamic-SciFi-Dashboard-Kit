# Usage Guide: DynamicSciFiDashboardKit

`DynamicSciFiDashboardKit` is a JavaScript library designed to create user interfaces with a futuristic, sci-fi aesthetic. It provides a set of ready-to-use components (panels) that can be easily integrated into any web application.

**Target Audience:** Web developers with knowledge of HTML, CSS, and JavaScript.

## 1. Installation and Setup

To use `DynamicSciFiDashboardKit`, you need to include two files in your project:

1.  **`DynamicSciFiDashboardKit.css`**: Contains all the necessary styles for the panels.
2.  **`DynamicSciFiDashboardKit.js`**: Contains the library's logic and panel definitions.

**HTML Inclusion:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Sci-Fi Dashboard</title>
    <link rel="stylesheet" href="path/to/DynamicSciFiDashboardKit.css">
    <style>
        /* Your custom styles here, if needed */
        body { background-color: #05080d; padding: 20px; color: #e0e0e0; font-family: 'Segoe UI', sans-serif; }
        .dashboard-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .panel-container { min-height: 200px; display: flex; flex-direction: column; }
        /* Ensure the panel expands if the container is flexible */
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
            const DSDK = DynamicSciFiDashboardKit; // Alias for convenience

            // Panel initialization
            const logPanel = new DSDK.LogDisplayPanel('#myLogPanel', {
                title: 'System Event Log'
            });
            logPanel.addLog({ text: 'Dashboard initialized.', level: 'info' });

            const gaugePanel = new DSDK.CircularGaugePanel('#myGaugePanel', {
                title: 'Primary Energy Level',
                initialValue: 75,
                label: 'Main Reactor',
                units: '%'
            });

            const radarPanel = new DSDK.RadarDisplayPanel('#myRadarPanel', {
                title: 'Proximity Sensor',
                radarSpeed: 15 // RPM
            });
            radarPanel.addPoint('contact_alpha', 30, 50); // x, y
            radarPanel.addPoint('contact_beta', -60, 20);
        });
    </script>
</body>
</html>
```

**Important:**
*   Ensure that the paths to `DynamicSciFiDashboardKit.css` and `DynamicSciFiDashboardKit.js` are correct.
*   Each panel requires a unique container element in the DOM (e.g., a `div` with a unique ID).

## 2. Basic Concepts

### 2.1. `BasePanel`

All specific panels inherit from a base class called `BasePanel`. This class provides common functionalities and options.

**Common Options (Inherited from `BasePanel`)**:

*   `title` (`string`): Title displayed in the panel header. Default: `'Panel'` (or a specific title if the child class defines it). If an empty string or `null` and the class has no default title, the header is not rendered.
*   `initialState` (`string`): Initial visual state of the panel. Valid values: `'normal'`, `'warning'`, `'critical'`, `'stable'`. Default: `'normal'`.
*   `particleEffectType` (`string | null`): Type of particle effect to apply. Valid values: `'1'` to `'6'`, or `null` to disable. Default: `null`.
*   `particleEffectStates` (`array`): Array of strings defining in which panel states the particle effect will be shown (if `particleEffectType` is set). Default: `['critical', 'warning']`.
*   `enableScanlineHalo` (`boolean`): Enables a visual "scanlines" effect over the panel. Default: `false` (can be overridden by the child class).
*   `scanlineHaloColor` (`string | null`): Specific CSS color for the scanline effect. If `null`, the color is automatically determined based on the panel state. Default: `null`.
*   `scanlineThickness` (`string`): Thickness of the scanlines (e.g., `'4px'`). Default: `'4px'`.
*   `scanlineOpacity` (`number`): Opacity of the scanlines (a value between 0 and 1). Default: `0.08`.
*   `scanlineStates` (`array`): Array of strings defining in which panel states the scanline effect will be shown (if `enableScanlineHalo` is `true`). Default: `['critical', 'warning']`.

**Common Methods (Inherited from `BasePanel`)**:

*   `setPanelState(newState)`: Changes the overall visual state of the panel.
    *   `newState` (`string`): One of the valid states: `'normal'`, `'warning'`, `'critical'`, `'stable'`.
*   `setScanlineHalo(enabled, options = {})`: Configures or activates/deactivates the scanline effect.
    *   `enabled` (`boolean`): `true` to activate, `false` to deactivate.
    *   `options` (`object`, optional): An object with properties to customize the effect:
        *   `color` (`string`, optional): CSS color for the scanlines.
        *   `thickness` (`string`, optional): Thickness of the scanlines.
        *   `opacity` (`number`, optional): Opacity of the scanlines.
*   `setParticleEffect(type, options = {})`: Configures or changes the particle effect type and its activation states.
    *   `type` (`string | null`): New effect type (`'1'`-`'6'`, `'none'`, or `null`).
    *   `options` (`object`, optional):
        *   `states` (`array`, optional): Array of panel states (`'normal'`, `'warning'`, `'critical'`, `'stable'`) in which the effect will be active.
*   `destroy()`: Removes the panel from the DOM and cleans up associated resources (event listeners, animation timers). **It is very important to call this method** when a panel is no longer needed to prevent memory leaks.

### 2.2. Panel Initialization

To create an instance of any panel:

```javascript
const myPanel = new DynamicSciFiDashboardKit.PanelName('#containerId', {
    // specific panel and common options here
});
```

*   `#containerId`: CSS selector of the HTML element that will contain the panel.
*   `{options}`: A configuration object.

## 3. Panel Documentation

Below is a detailed description of each available panel.

### 3.1. `LogDisplayPanel`

Displays a list of log messages with different severity levels.

**Initialization:**
```javascript
const logPanel = new DynamicSciFiDashboardKit.LogDisplayPanel('#logContainer', {
    title: 'System Logs',
    maxEntries: 50,
    initialState: 'normal'
});
```

**Specific Options:**
*   `title` (`string`): Panel title. Default: `'Log Display'`.
*   `maxEntries` (`number`): Maximum number of log entries to display. Oldest entries are automatically removed. Default: `20`.

**Specific Methods:**
*   `addLog(logEntry)`: Adds a new entry to the log.
    *   `logEntry` (`object`): An object with the following properties:
        *   `text` (`string`): The log message.
        *   `level` (`string`, optional): Log level. Valid values: `'info'`, `'warn'`, `'error'`, `'success'`. Affects text color.
*   `clearLogs()`: Removes all log entries.

**Usage Example:**
```javascript
// HTML: <div id="logDemo" class="panel-container"></div>

const logPanel = new DynamicSciFiDashboardKit.LogDisplayPanel('#logDemo', {
    title: 'Activity Log',
    maxEntries: 5,
    enableScanlineHalo: true,
    particleEffectType: '1',
    particleEffectStates: ['critical', 'warning']
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

Displays large, eye-catching text, ideal for critical alerts or important status messages.

**Initialization:**
```javascript
const warningPanel = new DynamicSciFiDashboardKit.CriticalWarningTextPanel('#warningContainer', {
    initialText: 'SYSTEM OFFLINE',
    initialWarningState: 'critical'
});
```

**Specific Options:**
*   `title` (`string`): Panel title. Default: `''` (no header, to give more emphasis to the text).
*   `initialText` (`string`): The text to be displayed initially. Default: `'WARNING'`.
*   `initialWarningState` (`string`): Internal state of the text, which affects its animation and the base state of the panel. Valid values: `'critical'`, `'stabilizing'`, `'stable'`. Default: `'critical'`.
*   `fontSize` (`string`): CSS font size for the warning text. Default: `'2.2rem'`.
*   `particleEffectType` (`string`): Default: `'3'`.
*   `particleEffectStates` (`array`): Default: `['critical', 'stabilizing']`.
*   `enableScanlineHalo` (`boolean`): Default: `true`.
*   `scanlineThickness` (`string`): Default: `'3px'`.
*   `scanlineOpacity` (`number`): Default: `0.1`.

**Specific Methods:**
*   `setWarningState(newState, newText)`: Changes the internal state of the text and, optionally, the text itself.
    *   `newState` (`string`): `'critical'`, `'stabilizing'`, or `'stable'`. This will also update the general `panelState` (e.g., `critical` for `critical`, `warning` for `stabilizing`, `stable` for `stable`).
    *   `newText` (`string`, optional): The new text to display.
*   `setText(newText)`: Changes only the displayed text, without altering the `warningState`.
    *   `newText` (`string`): The new text.

**Usage Example:**
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

Displays a list of key-value pairs, useful for showing configuration data or telemetry.

**Initialization:**
```javascript
const dataPanel = new DynamicSciFiDashboardKit.KeyValueListPanel('#dataContainer', {
    title: 'System Parameters'
});
```

**Specific Options:**
*   `title` (`string`): Panel title. Default: `'Data List'`.

**Specific Methods:**
*   `setItems(itemsArray)`: Sets or replaces all items in the list.
    *   `itemsArray` (`array`): An array of objects, where each object represents an item and has the form:
        *   `key` (`string`): The key.
        *   `value` (`string | number`): The value.
        *   `statusClass` (`string`, optional): A CSS class to apply styling to the value (e.g., `DSDK_CLASSES.TEXT_DANGER`, `DSDK_CLASSES.TEXT_SUCCESS`).
*   `updateItem(key, newValue, newStatusClass)`: Updates an existing item identified by its key.
    *   `key` (`string`): The key of the item to update.
    *   `newValue` (`string | number`): The new value.
    *   `newStatusClass` (`string`, optional): The new status class for the value.
*   `addItem(itemObject)`: Adds a new item or updates an existing one if the key already exists.
    *   `itemObject` (`object`): Similar to an object in `itemsArray`.

**Usage Example:**
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

Displays a numeric or text value on an LED-like display, with a label and optionally units.

**Initialization:**
```javascript
const ledPanel = new DynamicSciFiDashboardKit.LedDisplayPanel('#ledContainer', {
    label: 'Flux Capacitor',
    initialValue: 1.21,
    units: 'GW'
});
```

**Specific Options:**
*   `title` (`string`): Panel title. Default: `''` (no header).
*   `label` (`string`): Label displayed above the LED display. Default: `'VALUE'`.
*   `initialValue` (`number | string`): The value to be displayed initially. Default: `0`.
*   `initialStatus` (`string`): Visual state of the LED display. Values: `'normal'`, `'warning'`, `'critical'`. Affects display color and animation. Default: `'normal'`.
*   `units` (`string`): Units appended after the value (e.g., 'kW', '%'). Default: `''`.

**Specific Methods:**
*   `setValue(value)`: Sets the value shown on the display.
    *   `value` (`number | string`): The new value.
*   `setStatus(status)`: Changes the visual state of the LED display.
    *   `status` (`string`): `'normal'`, `'warning'`, or `'critical'`.

**Usage Example:**
```javascript
// HTML: <div id="ledDemo" class="panel-container" style="height: 180px;"></div>

const ledPanel = new DynamicSciFiDashboardKit.LedDisplayPanel('#ledDemo', {
    label: 'CORE TEMP',
    initialValue: 350,
    units: 'K',
    initialStatus: 'normal'
});
ledPanel.setPanelState('stable'); // Outer panel

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

Displays a block of text with possible visual effects like blur, flicker, or glitch.

**Initialization:**
```javascript
const textPanel = new DynamicSciFiDashboardKit.DynamicTextPanel('#textContainer', {
    title: 'Communications Array',
    initialText: 'Receiving transmission...'
});
```

**Specific Options:**
*   `title` (`string`): Panel title. Default: `'Dynamic Text Display'`.
*   `initialText` (`string`): The text to be displayed initially. Default: `'Awaiting data...'`.
*   `initialEffects` (`object`): An object to configure initial visual effects. Default: `{ blur: false, flicker: false, glitch: false, textColorClass: null }`.
    *   `blur` (`boolean`): Apply blur effect.
    *   `flicker` (`boolean`): Apply flicker effect.
    *   `glitch` (`boolean`): Apply "glitch" effect.
    *   `textColorClass` (`string | null`): CSS class for text color (e.g., `DSDK_CLASSES.TEXT_INFO`).

**Specific Methods:**
*   `setText(text)`: Sets the displayed text.
    *   `text` (`string`): The new text.
*   `setEffects(effectsObject)`: Sets or updates visual effects. Properties not included in `effectsObject` remain unchanged.
    *   `effectsObject` (`object`): Object with the same properties as `initialEffects` (all optional).

**Usage Example:**
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

Displays a set of configurable buttons with associated actions.

**Initialization:**
```javascript
const actionPanel = new DynamicSciFiDashboardKit.ActionButtonsPanel('#actionsContainer', {
    title: 'System Controls',
    buttons: [
        { id: 'btn-scan', text: 'Scan Sector', onClick: () => console.log('Scanning...') }
    ]
});
```

**Specific Options:**
*   `title` (`string`): Panel title. Default: `'Actions'`.
*   `buttons` (`array`): An array of button configuration objects. Default: `[]`. Each button object:
    *   `id` (`string`, **required**): Unique identifier for the button.
    *   `text` (`string`): Button text. Default: `'Button'`.
    *   `style` (`string`, optional): Button style. Values: `'normal'`, `'danger'`, `'warning'`, `'success'`. Default: `'normal'`.
    *   `disabled` (`boolean`, optional): Whether the button is initially disabled. Default: `false`.
    *   `onClick` (`function`, optional): Function to execute when the button is clicked.

**Specific Methods:**
*   `addButton(buttonConfig, addToDom = true)`: Adds a new button.
    *   `buttonConfig` (`object`): Button configuration object (see `buttons` in options).
    *   `addToDom` (`boolean`): Whether to add to DOM immediately. Default: `true`.
*   `removeButton(buttonId)`: Removes a button by its ID.
    *   `buttonId` (`string`): ID of the button to remove.
*   `updateButton(buttonId, updates)`: Updates properties of an existing button.
    *   `buttonId` (`string`): ID of the button to update.
    *   `updates` (`object`): Object with properties to change:
        *   `newText` (`string`, optional): New text for the button.
        *   `newDisabledState` (`boolean`, optional): New enabled/disabled state.
        *   `newStyle` (`string`, optional): New style for the button.
*   `setButtonDisabled(buttonId, isDisabled)`: Shortcut to enable/disable a button.
    *   `buttonId` (`string`): Button ID.
    *   `isDisabled` (`boolean`): `true` to disable, `false` to enable.

**Usage Example:**
```javascript
// HTML: <div id="actionDemo" class="panel-container"></div>
// You'll need a logPanel instance for this example to work fully.
// const logPanel = new DynamicSciFiDashboardKit.LogDisplayPanel('#someLogPanelID');

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

Displays an animated graph on a canvas, like an ECG or a sine wave. **Note:** This panel generates its own simulated data animation. For graphing external real-time data, use `TrueCanvasGraphPanel`.

**Initialization:**
```javascript
const graphPanel = new DynamicSciFiDashboardKit.CanvasGraphPanel('#graphContainer', {
    title: 'Vital Signs',
    graphType: 'ecg'
});
```

**Specific Options:**
*   `title` (`string`): Panel title. Default: `'Graph Panel'`.
*   `graphType` (`string`): Type of graph to display. Values: `'ecg'`, `'sine'`. Default: `'ecg'`.
*   `colorScheme` (`object`): Object defining colors and line styles for each panel state (`normal`, `warning`, `critical`, `stable`). Each state has:
    *   `stroke` (`string`): Stroke color.
    *   `lineWidth` (`number`): Line width.
    *   `noiseFactor` (`number`): "Noise" or variability factor in the graph.
*   `animationSpeed` (`number`): Animation speed for the `'sine'` type graph. Default: `0.05`.
*   `ecgDataLength` (`number`): Number of data points for the `'ecg'` graph. Affects the "length" of the wave on screen. Default: `200` (adjusts slightly based on panel width).
*   `ecgSpikeChance` (`number`): Probability of a "spike" occurring in the ECG graph. Default: `0.08`.
*   `particleEffectType` (`string`): Type of particle effect. Default: `'1'`.

**Specific Methods:**
*   Has no specific public methods other than inherited ones. The graph updates automatically based on `panelState` and its options.

**Usage Example:**
```javascript
// HTML: <div id="canvasDemo" class="panel-container" style="height: 250px;"></div>

const canvasPanel = new DynamicSciFiDashboardKit.CanvasGraphPanel('#canvasDemo', {
    title: 'Energy Fluctuations',
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

Displays a series of vertical bars that "pulse," ideal for indicating system activity or integrity.

**Initialization:**
```javascript
const pulsePanel = new DynamicSciFiDashboardKit.IntegrityPulsePanel('#pulseContainer', {
    title: 'Core Integrity',
    barCount: 10
});
```

**Specific Options:**
*   `title` (`string`): Panel title. Default: `'Integrity Pulse'`.
*   `initialState` (`string`): Initial state. Default: `'normal'`.
*   `barCount` (`number`): Number of bars to display. Default: `5`. A number between 1 and 100 is reasonable.
*   `enableScanlineHalo` (`boolean`): Default: `false`.

**Specific Methods:**
*   Has no specific public methods. Bars animate and color according to `panelState`.

**Usage Example:**
```javascript
// HTML: <div id="pulseDemo" class="panel-container" style="height: 250px;"></div>

const pulsePanel = new DynamicSciFiDashboardKit.IntegrityPulsePanel('#pulseDemo', {
    title: 'Shield Harmonics',
    barCount: 12, // More bars
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

Displays a circular gauge (speedometer-like) to represent a value within a range.

**Initialization:**
```javascript
const gaugePanel = new DynamicSciFiDashboardKit.CircularGaugePanel('#gaugeContainer', {
    title: 'Reactor Output',
    initialValue: 50,
    maxValue: 120,
    units: 'GW'
});
```

**Specific Options:**
*   `title` (`string`): Panel title. Default: `'Gauge'`.
*   `minValue` (`number`): Minimum value of the gauge. Default: `0`.
*   `maxValue` (`number`): Maximum value of the gauge. Default: `100`.
*   `initialValue` (`number`): Initial value of the gauge. Default: `0`.
*   `targetValue` (`number | null`): A target value marked on the gauge. Default: `null` (no marker).
*   `units` (`string`): Units displayed with the value and label. Default: `'%'`.
*   `label` (`string`): Descriptive label displayed below the value. Default: `''`.
*   `valueFontSize` (`string`): CSS font size for the numeric value. Default: `'2em'`.
*   `labelFontSize` (`string`): CSS font size for the label. Default: `'0.8em'`.
*   `unitsFontSize` (`string`): CSS font size for the units. Default: `'0.7em'`.
*   `labelYOffset` (`number`): Additional vertical offset for the label in SVG pixels. Useful for fine-tuning label position. Default: `5`.
*   `arcWidth` (`number`): Width of the gauge arc in SVG pixels. Default: `12`.
*   `gaugeRadius` (`number`): Radius of the gauge in SVG pixels. Default: `80`.
*   `startAngle` (`number`): Start angle of the arc in degrees (0 is top, 90 right, etc.). Default: `-135`.
*   `endAngle` (`number`): End angle of the arc in degrees. Default: `135`.
*   `animationDuration` (`number`): Duration of value change animation in milliseconds. Default: `400`.
*   `enableScanlineHalo` (`boolean`): Default: `false`.

**Specific Methods:**
*   `setValue(newValue, animate = true)`: Sets the gauge value.
    *   `newValue` (`number`): The new value to display.
    *   `animate` (`boolean`, optional): Whether the change should be animated. Default: `true`.
*   `setTargetValue(newTargetValue)`: Sets or removes the target value marker.
    *   `newTargetValue` (`number | null`): The new target value, or `null` to remove the marker.

**Usage Example:**
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
    circGauge.setTargetValue(130); // Change the target
}, 6000);
```

### 3.10. `StatusIndicatorLedPanel`

Displays a list of status indicators, each with a colored LED and descriptive text.

**Initialization:**
```javascript
const statusPanel = new DynamicSciFiDashboardKit.StatusIndicatorLedPanel('#statusLedContainer', {
    title: 'Subsystem Status',
    indicators: [
        { id: 'nav', text: 'Navigation', color: 'green' },
        { id: 'com', text: 'Communications', color: 'yellow', blinking: true }
    ]
});
```

**Specific Options:**
*   `title` (`string`): Panel title. Default: `'System Status'`.
*   `indicators` (`array`): Array of indicator configuration objects. Default: `[]`. Each object:
    *   `id` (`string`, **required**): Unique ID for the indicator.
    *   `text` (`string`, **required**): Descriptive text.
    *   `color` (`string`, optional): LED color. Values: `'green'`, `'yellow'`, `'red'`, `'blue'`, `'orange'`, `'purple'`, `'cyan'`, `'white'`, `'off'`. Default: `'off'`.
    *   `blinking` (`boolean`, optional): Whether the LED should blink. Default: `false`.
*   `enableScanlineHalo` (`boolean`): Default: `false`.

**Specific Methods:**
*   `addIndicator(indicatorData, atBeginning = false)`: Adds a new indicator.
    *   `indicatorData` (`object`): Indicator configuration object.
    *   `atBeginning` (`boolean`): If `true`, adds the indicator to the beginning of the list. Default: `false`.
*   `updateIndicator(id, updates)`: Updates an existing indicator.
    *   `id` (`string`): Indicator ID.
    *   `updates` (`object`): Object with properties to update (`text`, `color`, `blinking`).
*   `removeIndicator(id)`: Removes an indicator by its ID.
*   `setIndicatorBlinking(id, isBlinking)`: Toggles blinking for an LED.
*   `setIndicatorColor(id, newColor)`: Changes an LED's color.
*   `setIndicatorText(id, newText)`: Changes an indicator's text.
*   `getIndicator(id)`: Returns the current data for an indicator.
*   `getAllIndicators()`: Returns an array with data for all indicators.

**Usage Example:**
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

Displays a horizontal bar gauge to represent a value within a range.

**Initialization:**
```javascript
const hGaugePanel = new DynamicSciFiDashboardKit.HorizontalBarGaugePanel('#hGaugeContainer', {
    title: 'Shield Capacity',
    initialValue: 75,
    label: 'Forward Shields',
    units: '%'
});
```

**Specific Options:**
*   `title` (`string`): Panel title. Default: `'Horizontal Gauge'`.
*   `minValue` (`number`): Minimum value of the gauge. Default: `0`.
*   `maxValue` (`number`): Maximum value of the gauge. Default: `100`.
*   `initialValue` (`number`): Initial value of the gauge. Default: `0`.
*   `units` (`string`): Units displayed with the text value (if enabled). Default: `'%'`.
*   `label` (`string`): Descriptive label displayed above the bar (if not empty). Default: `''`.
*   `barHeight` (`string`): Height of the gauge bar (e.g., `'16px'`, `'1.2em'`). Default: `'16px'`.
*   `showValueText` (`boolean`): Whether to display the current numeric value next to the label. Default: `true`.
*   `valueTextFormat` (`function`): Function to format the value text. Receives `(value, units)` and should return a string. Default: `(value, units) => \`${Math.round(value)}${units}\``.
*   `animationDuration` (`number`): Duration of value change animation in milliseconds. `0` to disable width animation. Default: `400`.
*   `enableScanlineHalo` (`boolean`): Default: `false`.
*   `colorScheme` (`object`, optional): Allows defining specific colors for the bar based on panel state (e.g., `{ normal: '#00E5E5', warning: '#FFD700', ... }`). If not provided, colors are taken from CSS variables (`--dsdk-gauge-h-bar-normal`, etc.) based on `panelState`.

**Specific Methods:**
*   `setValue(newValue, animate = true)`: Sets the gauge value.
    *   `newValue` (`number`): The new value to display.
    *   `animate` (`boolean`, optional): Whether the width change should be animated (if `animationDuration > 0`). Default: `true`.
*   `setPanelState(newState)`: (Overridden) In addition to changing the panel state, it updates the bar color if a custom `colorScheme` is not used.

**Usage Example:**
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
}, 6000);
```

### 3.12. `TrueCanvasGraphPanel`

Displays a line graph on a canvas, designed for representing externally provided real-time data. Ideal for visualizing time series, telemetry, or any stream of numerical data.

**Initialization:**
```javascript
const realtimeGraph = new DynamicSciFiDashboardKit.TrueCanvasGraphPanel('#realtimeGraphContainer', {
    title: 'Sensor Data Stream',
    maxDataPoints: 150,
    dataRange: { min: 0, max: 100 } // Optional: fixes the Y-axis range
});
```

**Specific Options:**
*   `title` (`string`): Panel title. Default: `'Realtime Data Graph'`.
*   `maxDataPoints` (`number`): Maximum number of data points to retain and display on the graph. Oldest points are discarded. Default: `200`.
*   `dataRange` (`object | null`): Defines a fixed range for the Y-axis. If `null` (default), the Y-axis auto-scales based on visible data.
    *   `min` (`number`): Minimum Y-axis value.
    *   `max` (`number`): Maximum Y-axis value.
*   `colorScheme` (`object`): Object defining the line style for each panel state (`normal`, `warning`, `critical`, `stable`). Each state has:
    *   `stroke` (`string`): Line stroke color.
    *   `lineWidth` (`number`): Line width.
*   `particleEffectType` (`string`): Default: `'1'`.
*   `enableScanlineHalo` (`boolean`): Default: `true`.

**Specific Methods:**
*   `addDataPoint(yValue)`: Adds a new data point (Y value) to the end of the graph. If `maxDataPoints` is exceeded, the oldest point is removed.
    *   `yValue` (`number`): The numerical value of the data point.
*   `setData(newDataArray)`: Replaces all current graph data with the provided array. The last `maxDataPoints` from the array will be taken if it's longer.
    *   `newDataArray` (`array<number>`): An array of numerical values.
*   `clearData()`: Removes all data points from the graph, leaving it empty.
*   `setPanelState(newState)`: (Overridden) In addition to changing the general panel state (border, title, effects), it also updates the graph line color/style according to the `colorScheme` for the new state.

**Usage Example:**
```javascript
// HTML: <div id="sensorGraph" class="panel-container" style="height: 300px;"></div>

const sensorPanel = new DynamicSciFiDashboardKit.TrueCanvasGraphPanel('#sensorGraph', {
    title: 'Temperature Readings',
    maxDataPoints: 100,
    dataRange: { min: 10, max: 90 }, // Degrees Celsius
    initialState: 'stable',
    enableScanlineHalo: true,
    scanlineStates: ['critical', 'warning']
});

// Add initial data
let initialData = [];
for(let i=0; i<30; i++) {
    initialData.push(20 + Math.random() * 10);
}
sensorPanel.setData(initialData);

let time = 0;
setInterval(() => {
    // Simulate new data
    let newValue = 50 + Math.sin(time * 0.2) * 25 + (Math.random() - 0.5) * 5;
    
    // Adjust value and state based on thresholds
    if (newValue > 75) {
        sensorPanel.setPanelState('critical');
    } else if (newValue > 60) {
        sensorPanel.setPanelState('warning');
    } else if (newValue < 25) {
        sensorPanel.setPanelState('normal'); // Could be an 'info' or 'cold' state
    } else {
        sensorPanel.setPanelState('stable');
    }
    
    sensorPanel.addDataPoint(newValue);
    time += 0.1;
}, 200); // Add a new point every 200ms
```

### 3.13. `ImageDisplayPanel`

Displays an image or a video stream (webcam) with various optional Sci-Fi style visual effects, such as interference, "glitch," pixelation, TV noise, rolling bars, and a CRT phosphor effect. It also allows flipping the image horizontally or vertically.

**Initialization:**
```javascript
const imagePanel = new DynamicSciFiDashboardKit.ImageDisplayPanel('#myImageViewer', {
    title: 'Main Video Feed',
    imageUrl: 'path/to/your/image.png',
    imageFit: 'cover',
    enableCrtPhosphorEffect: true,
    initialState: 'normal'
});
```

**Specific Options:**
*   `title` (`string`): Panel title. Default: `'Image Display'`.
*   `sourceType` (`string`): Defines the media source. Valid values: `'url'` (for images or videos from a URL), `'webcam'`. Default: `'url'`.
*   `imageUrl` (`string`): URL of the image to display if `sourceType` is `'url'`. Default: `''`.
*   `imageAltText` (`string`): Alternative text for the image. Default: `'Displayed image'`.
*   `imageFit` (`string`): How the image or video should be resized to fit its container. Valid values: `'contain'`, `'cover'`, `'fill'`, `'none'`, `'scale-down'`. Default: `'contain'`.
*   `enableInterferenceEffect` (`boolean`): Enables an effect of interference lines and slight jumps. Default: `false`.
*   `interferenceIntensity` (`string`): Intensity of the interference effect. Valid values: `'low'`, `'medium'`, `'high'`. Default: `'medium'`.
*   `enableGlitchEffect` (`boolean`): Enables a visual "glitch" effect with distortions and cuts. Default: `false`.
*   `enablePixelationEffect` (`boolean`): Enables a pixelation effect (blur and contrast) on the image. Default: `false`.
*   `pixelationLevel` (`number`): Level of the pixelation effect. Valid values: `1`, `2`, `3`. Default: `1`.
*   `enableTvNoiseEffect` (`boolean`): Enables a static TV-like noise overlay. Default: `false`.
*   `tvNoiseIntensity` (`number`): Opacity of the TV noise layer (between 0 and 1). Default: `0.15`.
*   `enableRollingBarsEffect` (`boolean`): Enables an overlay of horizontally scrolling bars. Default: `false`.
*   `rollingBarHeight` (`string`): CSS height of each rolling bar (e.g., `'2px'`). Default: `'2px'`.
*   `rollingBarSpeed` (`string`): CSS animation duration for the rolling bars (e.g., `'4s'`, `'500ms'`). Default: `'4s'`.
*   `webcamConstraints` (`object`): Constraints object for `navigator.mediaDevices.getUserMedia` when `sourceType` is `'webcam'`. Default: `{ video: true, audio: false }`.
*   `fallbackImageUrl` (`string`): URL for a fallback image if the main `imageUrl` fails to load or if there's an error with the webcam. Default: `''`.
*   `onError` (`function | null`): Callback function executed if an error occurs (e.g., when accessing the webcam). Receives the error object as an argument. Default: `null`.
*   `enableCrtPhosphorEffect` (`boolean`): Enables a "CRT phosphor" effect that tints the image/video. The specific color (`red`, `amber`, `green/normal`, `green/stable`) is based on the current `panelState`. Default: `false`.
*   `flipHorizontal` (`boolean`): Flips the image/video horizontally. Default: `false`.
*   `flipVertical` (`boolean`): Flips the image/video vertically. Default: `false`.
*   `particleEffectType` (`string | null`): Inherited from `BasePanel`. Default: `null`.
*   `enableScanlineHalo` (`boolean`): Inherited from `BasePanel`. Default: `false`.

**Specific Methods:**
*   `setImage(newImageUrl, newAltText = this.config.imageAltText)`: Changes the displayed image to the specified URL (and sets `sourceType` to `'url'`).
    *   `newImageUrl` (`string`): New image URL.
    *   `newAltText` (`string`, optional): New alt text.
*   `setImageFit(fitMode)`: Changes the image/video fit mode.
    *   `fitMode` (`string`): One of the valid values for `imageFit`.
*   `async startWebcam(constraints = this.config.webcamConstraints)`: Attempts to start the webcam and display its stream. This is an asynchronous method.
    *   `constraints` (`object`, optional): New constraints for the webcam.
    *   Returns: A `Promise` that resolves with the `MediaStream` on success, or rejects with an error.
*   `stopWebcam()`: Stops the webcam stream if active.
*   `toggleInterference(enable, intensity = this.config.interferenceIntensity)`: Toggles the interference effect.
*   `toggleGlitch(enable)`: Toggles the glitch effect.
*   `togglePixelation(enable, level = this.config.pixelationLevel)`: Toggles the pixelation effect.
*   `toggleTvNoise(enable, intensity = this.config.tvNoiseIntensity)`: Toggles the TV noise effect.
*   `toggleRollingBars(enable, barHeight = this.config.rollingBarHeight, barSpeed = this.config.rollingBarSpeed)`: Toggles the rolling bars effect.
*   `toggleCrtPhosphorEffect(enable)`: Toggles the CRT phosphor effect.
*   `toggleFlipHorizontal(enable)`: Toggles horizontal flip.
*   `toggleFlipVertical(enable)`: Toggles vertical flip.
*   `setPanelState(newState)`: (Overridden) In addition to base behavior, updates the CRT phosphor effect color if enabled, based on `newState`.
*   `destroy()`: (Overridden) In addition to base cleanup, stops the webcam if active.

**Usage Example:**
```javascript
// HTML: <div id="imageDemo" class="panel-container" style="height: 300px; width: 400px;"></div>
// To test the webcam, this example might need logPanel to be instantiated.
// const logPanel = new DynamicSciFiDashboardKit.LogDisplayPanel('#someLogPanelID');

const imageDisplay = new DynamicSciFiDashboardKit.ImageDisplayPanel('#imageDemo', {
    title: 'Surveillance Channel 7',
    imageUrl: 'https://picsum.photos/seed/scifi1/400/300', // Placeholder image
    imageFit: 'cover',
    enableCrtPhosphorEffect: true,
    initialState: 'normal' // CRT phosphor will be green/normal by default
});

setTimeout(() => {
    imageDisplay.setPanelState('warning'); // Phosphor will change to amber
    imageDisplay.toggleTvNoise(true, 0.25);
    imageDisplay.toggleFlipHorizontal(true);
    imageDisplay.setImage('https://picsum.photos/seed/scifi2/400/300');
}, 3000);

setTimeout(() => {
    imageDisplay.setPanelState('critical'); // Phosphor will change to red
    imageDisplay.toggleInterference(true, 'high');
    imageDisplay.toggleGlitch(true);
    imageDisplay.toggleRollingBars(true, '3px', '2s');
}, 6000);

// Example of how to start webcam after a delay
// Note: The browser will ask for user permission
setTimeout(async () => {
    try {
        // Clear image effects before showing webcam
        imageDisplay.toggleInterference(false);
        imageDisplay.toggleGlitch(false);
        imageDisplay.toggleTvNoise(false);
        imageDisplay.toggleRollingBars(false);
        imageDisplay.toggleFlipHorizontal(false); // Reset flip
        
        await imageDisplay.startWebcam();
        imageDisplay.setImageFit('contain'); // Adjust fit for webcam
        imageDisplay.setPanelState('stable'); // Phosphor will change to bright/stable green
        // If you have a log panel, you could log this:
        // logPanel.addLog({text: 'Webcam activated on ImageDisplay.', level: 'info'});
    } catch (err) {
        // logPanel.addLog({text: 'Error starting webcam: ' + err.message, level: 'error'});
        // Show error image if webcam fails
        imageDisplay.setImage('https://picsum.photos/seed/error/400/300?text=WEBCAM+ERROR', 'Webcam Error');
        imageDisplay.setPanelState('critical');
    }
}, 9000);
```

### 3.14. `RadarDisplayPanel`

Displays an animated radar screen with a rotating sweep and the ability to show points (contacts). Points are highlighted when the sweep passes over them and then gradually fade out.

**Initialization:**
```javascript
const radarPanel = new DynamicSciFiDashboardKit.RadarDisplayPanel('#radarContainer', {
    title: 'Long Range Radar',
    radarSpeed: 20, // RPM
    numCircles: 4,
    maxRadarRange: 150
});
```

**Specific Options:**
*   `title` (`string`): Panel title. Default: `'Radar Display'`.
*   `numCircles` (`number`): Number of concentric circles in the radar grid. Default: `5`.
*   `radarSpeed` (`number`): Rotation speed of the radar sweep in RPM (rotations per minute). Default: `10`.
*   `maxRadarRange` (`number`): Maximum abstract range for the X and Y coordinates of points. Points are mapped within the radar's radius based on this value. Default: `100`.
*   `pointSize` (`number`): Base size of points in pixels. Default: `3`.
*   `pointHighlightDuration` (`number`): Duration in milliseconds that a point remains highlighted after being detected by the sweep. Default: `500`.
*   `pointFadeOutDuration` (`number`): Duration in milliseconds of a point's fade-out after highlighting. Default: `2500`.
*   `pointInitialDetectionBoost` (`number`): Size multiplication factor for a point when first detected by the sweep (pulse effect). `1` means no boost. Default: `1`.
*   `pointMinOpacityAfterFade` (`number`): Minimum opacity (0.0 to 1.0) to which a point fades before potentially disappearing (if 0). Default: `0.0`.
*   `sweepWidthDegrees` (`number`): Angular width of the radar sweep in degrees. Default: `20`.
*   `particleEffectType` (`string | null`): Default: `'6'`.
*   `particleEffectStates` (`array`): Default: `['critical', 'warning', 'normal']`.
*   `enableScanlineHalo` (`boolean`): Default: `true`.

**Specific Methods:**
*   `addPoint(id, x, y, data = {})`: Adds a new point to the radar or updates an existing one if the `id` already exists.
    *   `id` (`string`): Unique identifier for the point.
    *   `x` (`number`): X coordinate of the point, relative to `maxRadarRange`. The radar center is (0,0).
    *   `y` (`number`): Y coordinate of the point, relative to `maxRadarRange`.
    *   `data` (`object`, optional): Custom data object associated with the point.
*   `updatePoint(id, newX, newY, newData)`: Updates the position and/or data of an existing point.
    *   `id` (`string`): ID of the point to update.
    *   `newX` (`number`, optional): New X coordinate.
    *   `newY` (`number`, optional): New Y coordinate.
    *   `newData` (`object`, optional): New data to merge with existing data.
*   `removePoint(id)`: Removes a point from the radar by its ID.
    *   `id` (`string`): ID of the point to remove.
*   `clearPoints()`: Removes all points from the radar.
*   `setRadarSpeed(rpm)`: Sets the rotation speed of the radar sweep.
    *   `rpm` (`number`): New speed in Rotations Per Minute.
*   `setPanelState(newState)`: (Overridden) In addition to base behavior, the panel state affects the colors of the radar sweep, grid, and points via CSS variables.
*   `destroy()`: (Overridden) Stops the radar animation, cleans up listeners and points before calling the base `destroy`.

**Usage Example:**
```javascript
// HTML: <div id="myRadarScreen" class="panel-container" style="height: 350px;"></div>

const radarScreen = new DynamicSciFiDashboardKit.RadarDisplayPanel('#myRadarScreen', {
    title: 'Tactical Detection System',
    radarSpeed: 15,
    maxRadarRange: 200, // A larger range
    pointSize: 4,
    pointHighlightDuration: 700,
    pointFadeOutDuration: 4000,
    sweepWidthDegrees: 15,
    initialState: 'normal'
});

// Add some initial contacts
radarScreen.addPoint('hostile_01', 80, 120, { type: 'fighter', allegiance: 'unknown' });
radarScreen.addPoint('friendly_01', -50, 70, { type: 'transport', allegiance: 'federation' });
radarScreen.addPoint('asteroid_belt_edge', 0, 180, { type: 'hazard' });

setTimeout(() => {
    radarScreen.updatePoint('hostile_01', 70, 100); // Move the contact
    radarScreen.addPoint('hostile_02', 90, -60, { type: 'frigate', allegiance: 'klingon' });
    radarScreen.setPanelState('warning');
}, 5000);

setTimeout(() => {
    radarScreen.removePoint('asteroid_belt_edge');
    radarScreen.setRadarSpeed(25); // Increase radar speed
    radarScreen.setPanelState('critical');
}, 10000);

// Simulate a new contact appearing and disappearing
let tempContactId = 'transient_signal';
setTimeout(() => {
    radarScreen.addPoint(tempContactId, Math.random() * 100 - 50, Math.random() * 100 - 50);
}, 12000);
setTimeout(() => {
    radarScreen.removePoint(tempContactId);
}, 18000); // The point will fade and then be removed
```

## 4. `DSDK_CLASSES` (CSS Constants)

The library exposes a `DynamicSciFiDashboardKit.DSDK_CLASSES` object containing mappings of logical names to the actual CSS classes used internally. This is useful for applying styles consistently, especially for status text classes.

```javascript
const { DSDK_CLASSES } = DynamicSciFiDashboardKit;

// Example for KeyValueListPanel
myKeyValuePanel.addItem({
    key: 'Reactor Status',
    value: 'OVERHEATING',
    statusClass: DSDK_CLASSES.TEXT_DANGER // Use the constant
});

// Example for DynamicTextPanel
myDynamicTextPanel.setEffects({
    textColorClass: DSDK_CLASSES.TEXT_WARNING
});
```
Commonly used text classes:
*   `DSDK_CLASSES.TEXT_DANGER`
*   `DSDK_CLASSES.TEXT_WARNING`
*   `DSDK_CLASSES.TEXT_SUCCESS`
*   `DSDK_CLASSES.TEXT_INFO`

It also contains the base classes for panels and their internal components, which can be useful for more advanced styling or for interacting with specific elements if necessary (although interaction is generally done through panel methods).

## 5. Advanced Customization (CSS)

The appearance of the panels is primarily controlled by CSS variables (Custom Properties) defined in `DynamicSciFiDashboardKit.css` within the `:root` selector. You can override these variables in your own CSS file to customize the color palette, fonts, etc.

**Example of how to change the secondary accent color and panel background:**
```css
/* In your CSS file, after importing DynamicSciFiDashboardKit.css */
:root {
    --dsdk-accent-color-secondary: #FF8C00; /* Dark orange as secondary accent */
    --dsdk-panel-bg: rgba(30, 10, 10, 0.85); /* A more reddish and opaque background */
    --dsdk-font-sans: 'Orbitron', sans-serif; /* Change the main font to a more SciFi one */
    
    /* Radar-specific variables, if you want to customize them beyond the state */
    --dsdk-radar-sweep-color-base-normal: #FF8C00; /* Orange sweep in normal state */
    --dsdk-radar-grid-dash: 5, 5; /* Change the grid pattern */
}
```
Review the `DynamicSciFiDashboardKit.css` file for a complete list of available variables for customization.

## 6. Tips and Best Practices

*   **Instance Management:** Keep references to your panel instances if you need to interact with them after creation (e.g., `logPanel.addLog(...)`).
*   **Unique IDs:** Ensure each panel is initialized in a container with a unique ID in your HTML.
*   **Cleanup (`destroy()`):** Always call the `destroy()` method on a panel instance when you no longer need it (e.g., when changing views in a Single Page Application - SPA). This is crucial for releasing resources and preventing memory leaks, especially with panels that use animations (`CanvasGraphPanel`, `IntegrityPulsePanel`, `RadarDisplayPanel`, `TrueCanvasGraphPanel`) or event listeners.
*   **Container Height:** Some panels (like `CanvasGraphPanel`, `IntegrityPulsePanel`, `CircularGaugePanel`, `CriticalWarningTextPanel`, `ImageDisplayPanel`, `RadarDisplayPanel`, `TrueCanvasGraphPanel`) look better or function optimally if their container has a defined height. You can use CSS for this:
    ```css
    .my-graph-container {
        height: 250px; /* Or the height you need */
    }
    ```
    Or directly in the element's style:
    ```html
    <div id="myGraph" class="panel-container" style="height: 250px;"></div>
    ```
*   **Performance:** If you have many panels with complex animations (especially `CanvasGraphPanel` or `TrueCanvasGraphPanel` with high update frequency, `IntegrityPulsePanel` with many bars, or `RadarDisplayPanel` with many points), consider the performance impact on low-resource devices. Use `destroy()` judiciously for panels that are not visible.
*   **Webcam Permissions:** For `ImageDisplayPanel` with `sourceType: 'webcam'`, the browser will request user permission. Handle potential errors in the promise returned by `startWebcam()`.
*   **Radar Coordinates:** Remember that for `RadarDisplayPanel`, the `x` and `y` coordinates of points are relative to the radar's center (0,0) and are scaled according to `maxRadarRange`.
