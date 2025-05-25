// DynamicSciFiDashboardKit.js
const DynamicSciFiDashboardKit = (function() {
    'use strict';

    const DSDK_CLASSES = {
        PANEL: 'dsdk-panel',
        PANEL_HEADER: 'dsdk-panel-header',
        PANEL_CONTENT: 'dsdk-panel-content',
        SCANLINE_HALO_ACTIVE: 'dsdk-scanline-halo-active',
        PANEL_STATE_PREFIX: 'dsdk-panel-',
        
        LOG_DISPLAY_PANEL: 'dsdk-log-display-panel',
        CRITICAL_WARNING_TEXT_PANEL: 'dsdk-critical-warning-text-panel',
        KEY_VALUE_LIST_PANEL: 'dsdk-key-value-list-panel',
        LED_DISPLAY_PANEL: 'dsdk-led-display-panel',
        DYNAMIC_TEXT_PANEL: 'dsdk-dynamic-text-panel',
        ACTION_BUTTONS_PANEL: 'dsdk-action-buttons-panel',
        CANVAS_GRAPH_PANEL: 'dsdk-canvas-graph-panel',
        TRUE_CANVAS_GRAPH_PANEL: 'dsdk-true-canvas-graph-panel',
        INTEGRITY_PULSE_PANEL: 'dsdk-integrity-pulse-panel',
        CIRCULAR_GAUGE_PANEL: 'dsdk-circular-gauge-panel',
        STATUS_INDICATOR_PANEL: 'dsdk-status-indicator-panel',
        HORIZONTAL_BAR_GAUGE_PANEL: 'dsdk-horizontal-bar-gauge-panel',
        IMAGE_DISPLAY_PANEL: 'dsdk-image-display-panel', 
        RADAR_DISPLAY_PANEL: 'dsdk-radar-display-panel',

        LOG_LIST: 'dsdk-log-list',
        LOG_INFO: 'dsdk-log-info', LOG_WARN: 'dsdk-log-warn', LOG_ERROR: 'dsdk-log-error', LOG_SUCCESS: 'dsdk-log-success',
        KEY_VALUE_LIST: 'dsdk-key-value-list', KEY_VALUE_KEY: 'dsdk-key', KEY_VALUE_VALUE: 'dsdk-value',
        LED_COUNTER_GROUP: 'dsdk-led-counter-group', LED_LABEL: 'dsdk-led-label', LED_DISPLAY: 'dsdk-led-display',
        LED_CRITICAL: 'dsdk-led-critical', LED_WARNING: 'dsdk-led-warning',
        DYNAMIC_TEXT_CONTAINER: 'dsdk-dynamic-text-container', DYNAMIC_TEXT: 'dsdk-dynamic-text',
        BLURRED_TEXT: 'dsdk-blurred-text', FLICKER_TEXT: 'dsdk-flicker-text', GLITCH_TEXT: 'dsdk-glitch-text',
        ACTION_BUTTONS_CONTAINER: 'dsdk-action-buttons-container', BUTTON: 'dsdk-button', BUTTON_STYLE_PREFIX: 'dsdk-button-',
        
        CANVAS_GRAPH: 'dsdk-canvas-graph', 
        RADAR_CANVAS: 'dsdk-radar-canvas', 

        CRITICAL_WARNING_TEXT_CONTAINER: 'dsdk-critical-warning-text-container', CRITICAL_WARNING_TEXT: 'dsdk-critical-warning-text',
        WARNING_PANEL_STATE_PREFIX: 'dsdk-state-',
        TEXT_DANGER: 'dsdk-text-danger', TEXT_WARNING: 'dsdk-text-warning', TEXT_SUCCESS: 'dsdk-text-success', TEXT_INFO: 'dsdk-text-info',
        
        INTEGRITY_PULSE_CONTAINER: 'dsdk-integrity-pulse-container',
        PULSE_BAR: 'dsdk-pulse-bar',

        GAUGE_SVG_CONTAINER: 'dsdk-gauge-svg-container',
        GAUGE_SVG: 'dsdk-gauge-svg',
        GAUGE_ARC_BACKGROUND: 'dsdk-gauge-arc-background',
        GAUGE_ARC_VALUE: 'dsdk-gauge-arc-value',
        GAUGE_TARGET_MARKER: 'dsdk-gauge-target-marker',
        GAUGE_TEXT_VALUE: 'dsdk-gauge-text-value',
        GAUGE_TEXT_LABEL: 'dsdk-gauge-text-label',
        GAUGE_TEXT_UNITS: 'dsdk-gauge-text-units',

        STATUS_INDICATOR_LIST: 'dsdk-status-indicator-list',
        STATUS_INDICATOR_ITEM: 'dsdk-status-indicator-item',
        STATUS_LED: 'dsdk-status-led',
        STATUS_LED_TEXT: 'dsdk-status-led-text',
        STATUS_LED_BLINKING: 'dsdk-led-blinking',
        STATUS_LED_COLOR_PREFIX: 'dsdk-led-color-',

        GAUGE_HORIZONTAL_WRAPPER: 'dsdk-gauge-horizontal-wrapper',
        GAUGE_HORIZONTAL_INFO: 'dsdk-gauge-horizontal-info',
        GAUGE_HORIZONTAL_LABEL: 'dsdk-gauge-horizontal-label',
        GAUGE_HORIZONTAL_VALUE_TEXT: 'dsdk-gauge-horizontal-value-text',
        GAUGE_HORIZONTAL_TRACK: 'dsdk-gauge-horizontal-track',
        GAUGE_HORIZONTAL_BAR: 'dsdk-gauge-horizontal-bar',

        IMAGE_WRAPPER: 'dsdk-image-wrapper',
        IMAGE_EFFECTS_SUB_WRAPPER: 'dsdk-image-effects-sub-wrapper',
        IMAGE_ELEMENT: 'dsdk-image-element',
        IMAGE_VIDEO_ELEMENT: 'dsdk-image-video-element',
        IMAGE_FIT_PREFIX: 'dsdk-image-fit-',
        IMAGE_INTERFERENCE_EFFECT: 'dsdk-image-interference-effect',
        IMAGE_INTERFERENCE_INTENSITY_PREFIX: 'dsdk-interference-intensity-',
        IMAGE_GLITCH_EFFECT: 'dsdk-image-glitch-effect',
        IMAGE_PIXELATION_EFFECT: 'dsdk-image-pixelation-effect',
        IMAGE_PIXELATION_LEVEL_PREFIX: 'dsdk-pixelation-level-',
        IMAGE_TV_NOISE_OVERLAY: 'dsdk-image-tv-noise-overlay', 
        IMAGE_TV_NOISE_ACTIVE: 'dsdk-tv-noise-active', 
        IMAGE_ROLLING_BARS_OVERLAY: 'dsdk-image-rolling-bars-overlay',
        IMAGE_ROLLING_BARS_ACTIVE: 'dsdk-rolling-bars-active',
        IMAGE_CRT_PHOSPHOR_ACTIVE: 'dsdk-crt-phosphor-active',
        IMAGE_CRT_PHOSPHOR_GREEN: 'dsdk-crt-phosphor-green',
        IMAGE_CRT_PHOSPHOR_AMBER: 'dsdk-crt-phosphor-amber',
        IMAGE_CRT_PHOSPHOR_RED: 'dsdk-crt-phosphor-red',
        IMAGE_CRT_PHOSPHOR_STABLE: 'dsdk-crt-phosphor-stable',
        IMAGE_CRT_PHOSPHOR_NORMAL: 'dsdk-crt-phosphor-normal',

        PARTICLE_EFFECT_PREFIX: 'dsdk-particle-effect-',
        VALID_PARTICLE_EFFECT_TYPES: ['1', '2', '3', '4', '5', '6'],
    };
    const VALID_PANEL_STATES = ['normal', 'warning', 'critical', 'stable'];
    const VALID_WARNING_PANEL_INTERNAL_STATES = ['critical', 'stabilizing', 'stable'];
    const VALID_LED_COLORS = ['green', 'yellow', 'red', 'blue', 'orange', 'purple', 'cyan', 'white', 'off'];
    const VALID_IMAGE_FIT_MODES = ['contain', 'cover', 'fill', 'none', 'scale-down'];
    const VALID_INTERFERENCE_INTENSITIES = ['low', 'medium', 'high'];
    const VALID_PIXELATION_LEVELS = [1, 2, 3];
    const VALID_IMAGE_SOURCE_TYPES = ['url', 'webcam']; 


    function getElement(s){if(typeof s==='string'){const e=document.querySelector(s);if(!e)console.error(`DSDK: Element "${s}" not found.`);return e;}return s;}

    class BasePanel {
        constructor(containerSelector, options = {}, panelTypeClass = '') {
            this.container = getElement(containerSelector);
            if (!this.container) return;

            this.config = {
                title: 'Panel',
                initialState: 'normal',
                particleEffectType: null, 
                particleEffectStates: ['critical', 'warning'], 
                enableScanlineHalo: false,
                scanlineHaloColor: null,
                scanlineThickness: '4px',
                scanlineOpacity: 0.08,
                scanlineStates: ['critical', 'warning'],
                ...options
            };

            this.dom = {};
            this.currentState = null; 
            this.currentScanlineHaloColor = this.config.scanlineHaloColor;
            this.panelTypeClass = panelTypeClass;

            this._initPanelShell();
            if (this.dom.panel) {
                 this.setPanelState(this.config.initialState); 
            }
        }

        _initPanelShell() {
            this.dom.panel = document.createElement('div');
            this.dom.panel.classList.add(DSDK_CLASSES.PANEL);
            if (this.panelTypeClass) {
                this.dom.panel.classList.add(this.panelTypeClass);
            }

            if (this.config.title) {
                this.dom.header = document.createElement('div');
                this.dom.header.classList.add(DSDK_CLASSES.PANEL_HEADER);
                this.dom.header.textContent = this.config.title;
                this.dom.panel.appendChild(this.dom.header);
            }
            this.dom.content = document.createElement('div');
            this.dom.content.classList.add(DSDK_CLASSES.PANEL_CONTENT);
            
            this.dom.panel.appendChild(this.dom.content);
            this.container.appendChild(this.dom.panel);
        }

        setPanelState(newState) {
            if (!this.dom.panel) return;
            
            if (!VALID_PANEL_STATES.includes(newState)) {
                console.warn(`DSDK: Invalid panel state "${newState}". Defaulting to "normal".`);
                newState = 'normal';
            }

            if (this.currentState) {
                this.dom.panel.classList.remove(`${DSDK_CLASSES.PANEL_STATE_PREFIX}${this.currentState}`);
            }

            this.dom.panel.classList.add(`${DSDK_CLASSES.PANEL_STATE_PREFIX}${newState}`);
            
            this.currentState = newState; 
            this._applyParticleEffectSettings(); 
            this._applyScanlineHaloSettings();
        }
        
        _applyScanlineHaloSettings() {
            if (!this.dom.panel || !this.config.enableScanlineHalo) {
                 if(this.dom.panel) this.dom.panel.classList.remove(DSDK_CLASSES.SCANLINE_HALO_ACTIVE);
                return;
            }
            const shouldShowScanlines = this.config.scanlineStates.includes(this.currentState);
            this.dom.panel.classList.toggle(DSDK_CLASSES.SCANLINE_HALO_ACTIVE, shouldShowScanlines);

            if (shouldShowScanlines) {
                let colorToApply = this.currentScanlineHaloColor;
                if (!colorToApply) {
                    if (this.currentState === 'critical') colorToApply = 'rgba(var(--dsdk-rgb-danger-color), 0.15)';
                    else if (this.currentState === 'warning') colorToApply = 'rgba(var(--dsdk-rgb-warning-color), 0.15)';
                    else if (this.currentState === 'stable') colorToApply = 'rgba(var(--dsdk-rgb-success-color), 0.1)';
                    else colorToApply = 'var(--dsdk-scanline-halo-color-default)';
                }
                this.dom.panel.style.setProperty('--dsdk-current-scanline-halo-color', colorToApply);
                this.dom.panel.style.setProperty('--dsdk-current-scanline-thickness', this.config.scanlineThickness);
                this.dom.panel.style.setProperty('--dsdk-current-scanline-opacity', this.config.scanlineOpacity.toString());
            }
        }

        _applyParticleEffectSettings() { 
            if (!this.dom.panel) return;

            DSDK_CLASSES.VALID_PARTICLE_EFFECT_TYPES.forEach(typeSuffix => {
                this.dom.panel.classList.remove(`${DSDK_CLASSES.PARTICLE_EFFECT_PREFIX}${typeSuffix}`);
            });

            const effectType = this.config.particleEffectType;
            
            if (effectType && DSDK_CLASSES.VALID_PARTICLE_EFFECT_TYPES.includes(String(effectType))) {
                if (this.config.particleEffectStates.includes(this.currentState)) {
                     this.dom.panel.classList.add(`${DSDK_CLASSES.PARTICLE_EFFECT_PREFIX}${effectType}`);
                }
            } else if (effectType) { 
                console.warn(`DSDK: Invalid or unknown particleEffectType "${effectType}". No particle effect applied.`);
            }
        }

        setScanlineHalo(enabled, options = {}) {
            if (!this.dom.panel) return;
            this.config.enableScanlineHalo = !!enabled;
            if (options.color !== undefined) this.currentScanlineHaloColor = options.color;
            if (options.thickness !== undefined) this.config.scanlineThickness = options.thickness;
            if (options.opacity !== undefined) this.config.scanlineOpacity = options.opacity;
            if (!enabled) {
                this.dom.panel.classList.remove(DSDK_CLASSES.SCANLINE_HALO_ACTIVE);
            } else {
                this._applyScanlineHaloSettings();
            }
        }

        setParticleEffect(type, options = {}) { 
            if (!this.dom.panel) return;
    
            if (type === null || type === undefined || type === 'none' || DSDK_CLASSES.VALID_PARTICLE_EFFECT_TYPES.includes(String(type))) {
                this.config.particleEffectType = (type === 'none' || type === undefined || type === null) ? null : String(type);
            } else {
                console.warn(`DSDK: Invalid particleEffectType "${type}". Must be null, 'none', or a string '1' through '6'. Effect not changed.`);
            }
    
            if (options.states !== undefined && Array.isArray(options.states)) {
                this.config.particleEffectStates = options.states.filter(s => VALID_PANEL_STATES.includes(s));
            }
            
            this._applyParticleEffectSettings();
        }
        
        destroy() { 
            if(this.animationFrameId)cancelAnimationFrame(this.animationFrameId); if(this.intervalId)clearInterval(this.intervalId);
            if(this.dom.panel)this.dom.panel.remove(); this.dom={};
            if (this.indicatorsMap) this.indicatorsMap.clear();
            if (this.buttonsMap) this.buttonsMap.clear();
            if (this.points) this.points = []; 
            if (this.resizeListener && typeof window !== 'undefined') window.removeEventListener('resize', this.resizeListener);
            this.resizeListener = null; 
        }
    }

    class LogDisplayPanel extends BasePanel { constructor(containerSelector, options = {}) { const defaults = { title: 'Log Display', maxEntries: 20 }; super(containerSelector, { ...defaults, ...options }, DSDK_CLASSES.LOG_DISPLAY_PANEL); if (!this.dom.panel) return; this.logEntries = []; this._renderContent(); } _renderContent() { if (!this.dom.content) return; this.dom.content.innerHTML = ''; this.dom.logList = document.createElement('ul'); this.dom.logList.classList.add(DSDK_CLASSES.LOG_LIST); this.dom.content.appendChild(this.dom.logList); this.logEntries.forEach(e => this._appendLogToList(e)); } _appendLogToList(e) { const i = document.createElement('li'); const m = { info: DSDK_CLASSES.LOG_INFO, warn: DSDK_CLASSES.LOG_WARN, error: DSDK_CLASSES.LOG_ERROR, success: DSDK_CLASSES.LOG_SUCCESS, }; if (e.level && m[e.level]) { i.classList.add(m[e.level]); } i.textContent = e.text; this.dom.logList.prepend(i); } addLog(e) { if (!this.dom.logList) this._renderContent(); this.logEntries.unshift(e); if (this.logEntries.length > this.config.maxEntries) { this.logEntries.pop(); if (this.dom.logList.lastChild) { this.dom.logList.removeChild(this.dom.logList.lastChild); } } this._appendLogToList(e); this.dom.content.scrollTop = 0; } clearLogs() { this.logEntries = []; if (this.dom.logList) { this.dom.logList.innerHTML = ''; } } }
    class CriticalWarningTextPanel extends BasePanel { constructor(containerSelector, options = {}) { const defaults = { title: '', initialText: 'WARNING', initialWarningState: 'critical', fontSize: '2.2rem', particleEffectType: '3', particleEffectStates: ['critical', 'stabilizing'], enableScanlineHalo: true, scanlineThickness: '3px', scanlineOpacity: 0.1, }; const mergedOptions = { ...defaults, ...options }; super(containerSelector, mergedOptions, DSDK_CLASSES.CRITICAL_WARNING_TEXT_PANEL); if (!this.dom.panel) return; if (!options.title && this.dom.header) { this.dom.header.remove(); this.dom.header = null; } this.currentWarningText = this.config.initialText; this._renderContent(); this.setWarningState(this.config.initialWarningState, this.config.initialText); } _renderContent() { if (!this.dom.content) return; this.dom.content.innerHTML = ''; this.dom.content.classList.add(DSDK_CLASSES.CRITICAL_WARNING_TEXT_CONTAINER); this.dom.warningTextElement = document.createElement('div'); this.dom.warningTextElement.classList.add(DSDK_CLASSES.CRITICAL_WARNING_TEXT); this.dom.warningTextElement.style.fontSize = this.config.fontSize; this.dom.content.appendChild(this.dom.warningTextElement); } setWarningState(newState, newText) { if (!this.dom.warningTextElement || !this.dom.content) return; if (!VALID_WARNING_PANEL_INTERNAL_STATES.includes(newState)) { newState = 'critical'; } if (newText !== undefined) { this.currentWarningText = newText; } this.dom.warningTextElement.textContent = this.currentWarningText; VALID_WARNING_PANEL_INTERNAL_STATES.forEach(s => { this.dom.content.classList.remove(`${DSDK_CLASSES.WARNING_PANEL_STATE_PREFIX}${s}`); this.dom.warningTextElement.classList.remove(`${DSDK_CLASSES.WARNING_PANEL_STATE_PREFIX}${s}`); }); this.dom.content.classList.add(`${DSDK_CLASSES.WARNING_PANEL_STATE_PREFIX}${newState}`); this.dom.warningTextElement.classList.add(`${DSDK_CLASSES.WARNING_PANEL_STATE_PREFIX}${newState}`); let basePanelState = 'critical'; if (newState === 'stabilizing') basePanelState = 'warning'; else if (newState === 'stable') basePanelState = 'stable'; super.setPanelState(basePanelState); } setText(newText) { if (this.dom.warningTextElement && newText !== undefined) { this.currentWarningText = newText; this.dom.warningTextElement.textContent = this.currentWarningText; } } }
    class KeyValueListPanel extends BasePanel { constructor(containerSelector, options = {}) { const defaults = { title: 'Data List', }; super(containerSelector, { ...defaults, ...options }, DSDK_CLASSES.KEY_VALUE_LIST_PANEL); if (!this.dom.panel) return; this.items = []; this._renderContent(); } _renderContent() { if (!this.dom.content) return; this.dom.content.innerHTML = ''; this.dom.list = document.createElement('ul'); this.dom.list.classList.add(DSDK_CLASSES.KEY_VALUE_LIST); this.dom.content.appendChild(this.dom.list); this.items.forEach(i => this._appendItemToList(i)); } _appendItemToList(i) { const l = document.createElement('li'); const k = document.createElement('span'); k.classList.add(DSDK_CLASSES.KEY_VALUE_KEY); k.textContent = i.key; const v = document.createElement('span'); v.classList.add(DSDK_CLASSES.KEY_VALUE_VALUE); v.textContent = i.value; if (i.statusClass) { const VALID_STATUS_CLASSES = [DSDK_CLASSES.TEXT_SUCCESS, DSDK_CLASSES.TEXT_WARNING, DSDK_CLASSES.TEXT_DANGER, DSDK_CLASSES.TEXT_INFO]; if (VALID_STATUS_CLASSES.includes(i.statusClass)) { v.classList.add(i.statusClass); } else { console.warn(`KVLP: Invalid statusClass "${i.statusClass}" for item "${i.key}".`); } } l.appendChild(k); l.appendChild(v); this.dom.list.appendChild(l); } setItems(iA) { this.items = iA || []; this._renderContent(); } updateItem(k, nV, nS) { const i = this.items.find(x => x.key === k); if (i) { i.value = nV; if (nS !== undefined) i.statusClass = nS; this._renderContent(); } else { console.warn(`KVLP: Item with key "${k}" not found.`); } } addItem(i) { if (i && i.key && typeof i.value !== 'undefined') { const e = this.items.find(x => x.key === i.key); if (e) { this.updateItem(i.key, i.value, i.statusClass); } else { this.items.push(i); this._appendItemToList(i); } } else { console.warn('KVLP: Attempted to add invalid item.', i); } } }
    class LedDisplayPanel extends BasePanel { constructor(containerSelector, options = {}) { const defaults = { title: '', label: 'VALUE', initialValue: 0, initialStatus: 'normal', units: '' }; super(containerSelector, { ...defaults, ...options }, DSDK_CLASSES.LED_DISPLAY_PANEL); if (!this.dom.panel) return; if (!options.title && this.dom.header) { this.dom.header.remove(); this.dom.header = null; } this.currentLedValue = this.config.initialValue; this.currentLedStatus = this.config.initialStatus; this._renderContent(); this.setValue(this.config.initialValue); this.setStatus(this.config.initialStatus); } _renderContent() { if (!this.dom.content) return; this.dom.content.innerHTML = ''; const g = document.createElement('div'); g.classList.add(DSDK_CLASSES.LED_COUNTER_GROUP); this.dom.label = document.createElement('span'); this.dom.label.classList.add(DSDK_CLASSES.LED_LABEL); this.dom.label.textContent = this.config.label; this.dom.display = document.createElement('div'); this.dom.display.classList.add(DSDK_CLASSES.LED_DISPLAY); g.appendChild(this.dom.label); g.appendChild(this.dom.display); this.dom.content.appendChild(g); } setValue(v) { this.currentLedValue = v; let dV = String(v); if (this.config.units) { dV += this.config.units; } if (this.dom.display) { this.dom.display.textContent = typeof v === 'number' ? dV.padStart(4, '0') : dV; } } setStatus(s) { if (!this.dom.display) return; this.currentLedStatus = s; this.dom.display.classList.remove(DSDK_CLASSES.LED_CRITICAL, DSDK_CLASSES.LED_WARNING); if (s === 'critical') { this.dom.display.classList.add(DSDK_CLASSES.LED_CRITICAL); } else if (s === 'warning') { this.dom.display.classList.add(DSDK_CLASSES.LED_WARNING); } } }
    class DynamicTextPanel extends BasePanel { constructor(containerSelector, options = {}) { const defaults = { title: 'Dynamic Text Display', initialText: 'Awaiting data...', initialEffects: { blur: false, flicker: false, glitch: false, textColorClass: null }, }; super(containerSelector, { ...defaults, ...options }, DSDK_CLASSES.DYNAMIC_TEXT_PANEL); if (!this.dom.panel) return; this.currentText = this.config.initialText; this.currentEffects = { ...this.config.initialEffects }; this._renderContent(); } _renderContent() { if (!this.dom.content) return; this.dom.content.innerHTML = ''; this.dom.content.classList.add(DSDK_CLASSES.DYNAMIC_TEXT_CONTAINER); this.dom.textElement = document.createElement('span'); this.dom.textElement.classList.add(DSDK_CLASSES.DYNAMIC_TEXT); this.dom.content.appendChild(this.dom.textElement); this.setText(this.currentText); this.setEffects(this.currentEffects); } setText(t) { this.currentText = t; if (this.dom.textElement) { this.dom.textElement.textContent = this.currentText; } } setEffects(e = {}) { if (!this.dom.textElement) return; this.currentEffects = { ...this.currentEffects, ...e }; this.dom.textElement.classList.toggle(DSDK_CLASSES.BLURRED_TEXT, !!this.currentEffects.blur); this.dom.textElement.classList.toggle(DSDK_CLASSES.FLICKER_TEXT, !!this.currentEffects.flicker); this.dom.textElement.classList.toggle(DSDK_CLASSES.GLITCH_TEXT, !!this.currentEffects.glitch);[DSDK_CLASSES.TEXT_DANGER, DSDK_CLASSES.TEXT_WARNING, DSDK_CLASSES.TEXT_SUCCESS, DSDK_CLASSES.TEXT_INFO].forEach(c => { this.dom.textElement.classList.remove(c); }); if (this.currentEffects.textColorClass) { this.dom.textElement.classList.add(this.currentEffects.textColorClass); } } }
    class ActionButtonsPanel extends BasePanel {
        constructor(containerSelector, options = {}) {
            const defaults = { title: 'Actions', buttons: [] };
            super(containerSelector, { ...defaults, ...options }, DSDK_CLASSES.ACTION_BUTTONS_PANEL);
            if (!this.dom.panel) return;
            this.buttonsMap = new Map(); 
            this._renderContent();
        }
        _renderContent() {
            if (!this.dom.content) return;
            this.dom.content.innerHTML = ''; 
            this.dom.buttonsContainer = document.createElement('div');
            this.dom.buttonsContainer.classList.add(DSDK_CLASSES.ACTION_BUTTONS_CONTAINER);
            this.dom.content.appendChild(this.dom.buttonsContainer);
            this.config.buttons.forEach(buttonConfig => {
                this.addButton(buttonConfig); 
            });
        }
        _createButtonElement(buttonConfig) {
            const buttonElement = document.createElement('button');
            buttonElement.classList.add(DSDK_CLASSES.BUTTON);
            if (buttonConfig.id) {
                buttonElement.id = buttonConfig.id;
            }
            buttonElement.textContent = buttonConfig.text || 'Button';
            const style = buttonConfig.style || 'normal';
            if (style !== 'normal') {
                buttonElement.classList.add(`${DSDK_CLASSES.BUTTON_STYLE_PREFIX}${style}`);
            }
            buttonElement.disabled = !!buttonConfig.disabled;
            if (typeof buttonConfig.onClick === 'function') {
                buttonElement.addEventListener('click', (event) => {
                    if (!buttonElement.disabled) {
                        buttonConfig.onClick(event);
                    }
                });
            }
            return buttonElement;
        }
        addButton(buttonConfig, addToDom = true) { 
            if (!buttonConfig || !buttonConfig.id) {
                console.error("DSDK ActionButtonsPanel: Button configuration must include an 'id'.", buttonConfig);
                return null;
            }
            if (this.buttonsMap.has(buttonConfig.id)) {
                console.warn(`DSDK ActionButtonsPanel: Button with ID "${buttonConfig.id}" already exists. Consider updating or removing it first.`);
                return this.buttonsMap.get(buttonConfig.id);
            }
            const buttonElement = this._createButtonElement(buttonConfig);
            this.buttonsMap.set(buttonConfig.id, buttonElement); 
            if (addToDom && this.dom.buttonsContainer) {
                this.dom.buttonsContainer.appendChild(buttonElement);
            }
            if (!this.config.buttons.find(b => b.id === buttonConfig.id)) {
                this.config.buttons.push(buttonConfig);
            }
            return buttonElement;
        }
        removeButton(buttonId) {
            const buttonElement = this.buttonsMap.get(buttonId);
            if (buttonElement) {
                buttonElement.remove();
                this.buttonsMap.delete(buttonId);
                this.config.buttons = this.config.buttons.filter(b => b.id !== buttonId);
            } else {
                console.warn(`DSDK ActionButtonsPanel: Button with ID "${buttonId}" not found for removal.`);
            }
        }
        updateButton(buttonId, updates) {
            const buttonElement = this.buttonsMap.get(buttonId);
            if (!buttonElement) {
                console.warn(`DSDK ActionButtonsPanel: Button with ID "${buttonId}" not found for update.`);
                return;
            }
            if (updates.newText !== undefined) {
                buttonElement.textContent = updates.newText;
            }
            if (updates.newDisabledState !== undefined) {
                buttonElement.disabled = !!updates.newDisabledState;
            }
            if (updates.newStyle !== undefined) {
                ['normal', 'danger', 'warning', 'success'].forEach(s => {
                    buttonElement.classList.remove(`${DSDK_CLASSES.BUTTON_STYLE_PREFIX}${s}`);
                });
                if (updates.newStyle !== 'normal') {
                    buttonElement.classList.add(`${DSDK_CLASSES.BUTTON_STYLE_PREFIX}${updates.newStyle}`);
                }
            }
            const configButton = this.config.buttons.find(b => b.id === buttonId);
            if (configButton) {
                if (updates.newText !== undefined) configButton.text = updates.newText;
                if (updates.newDisabledState !== undefined) configButton.disabled = !!updates.newDisabledState;
                if (updates.newStyle !== undefined) configButton.style = updates.newStyle;
            }
        }
        setButtonDisabled(buttonId, isDisabled) {
            this.updateButton(buttonId, { newDisabledState: isDisabled });
        }
    }
    class CanvasGraphPanel extends BasePanel { constructor(containerSelector, options = {}) { const defaults = { title: 'Graph Panel', graphType: 'ecg', colorScheme: { normal: { stroke: '#00E5E5', lineWidth: 1.5, noiseFactor: 0.05 }, warning: { stroke: '#FFD700', lineWidth: 1.5, noiseFactor: 0.15 }, critical: { stroke: '#FF4500', lineWidth: 2, noiseFactor: 0.3 }, stable: { stroke: '#32CD32', lineWidth: 1.5, noiseFactor: 0.02 }, }, animationSpeed: 0.05, ecgDataLength: 200, ecgSpikeChance: 0.08, particleEffectType: '1', }; super(containerSelector, { ...defaults, ...options }, DSDK_CLASSES.CANVAS_GRAPH_PANEL); if (!this.dom.panel) return; this.animationFrameId = null; this.lastTimestamp = 0; this.ecgData = []; this.sineTime = 0; this._renderContent(); this._initCanvas(); this.loop = this.loop.bind(this); this.animationFrameId = requestAnimationFrame(this.loop); } _renderContent() { if (!this.dom.content) return; this.dom.content.innerHTML = ''; this.dom.canvas = document.createElement('canvas'); this.dom.canvas.classList.add(DSDK_CLASSES.CANVAS_GRAPH); this.dom.content.appendChild(this.dom.canvas); this.ctx = this.dom.canvas.getContext('2d'); } _initCanvas() { if (!this.dom.canvas || !this.ctx) return; const aR = () => { if (!this.dom.canvas || !this.dom.content.clientWidth || !this.dom.content.clientHeight) { if (this.dom.panel && this.dom.panel.offsetParent !== null) { requestAnimationFrame(aR); } return; } const d = window.devicePixelRatio || 1; this.dom.canvas.width = this.dom.content.clientWidth * d; this.dom.canvas.height = this.dom.content.clientHeight * d; this.ctx.scale(d, d); if (this.config.graphType === 'ecg') { this.config.ecgDataLength = Math.max(50, Math.floor(this.dom.content.clientWidth / 2.5)); this.ecgData = Array(this.config.ecgDataLength).fill(this.dom.content.clientHeight / 2); } }; requestAnimationFrame(aR); this.resizeListener = () => requestAnimationFrame(aR); if (typeof window !== 'undefined') window.addEventListener('resize', this.resizeListener); } loop(t) { if (!this.ctx || !this.dom.canvas || !this.dom.canvas.width || !this.dom.canvas.height) { this.animationFrameId = requestAnimationFrame(this.loop); return; } this.ctx.clearRect(0, 0, this.dom.canvas.width, this.dom.canvas.height); const cCS = this.config.colorScheme[this.currentState] || this.config.colorScheme['normal']; if (this.config.graphType === 'ecg') { this._drawECG(cCS); } else if (this.config.graphType === 'sine') { this._drawSineWaves(cCS); } this.animationFrameId = requestAnimationFrame(this.loop); } _drawECG(cs) { const cH = this.dom.content.clientHeight; const cW = this.dom.content.clientWidth; if (cW <=0 || cH <=0) return; this.ctx.strokeStyle = cs.stroke; this.ctx.lineWidth = cs.lineWidth; this.ctx.beginPath(); let nV = cH / 2; let sF = 0.45; if (this.currentState === 'stable') sF = 0.1; else if (this.currentState === 'warning') sF = 0.25; else if (this.currentState === 'normal') sF = 0.15; const eSC = this.config.ecgSpikeChance * ((this.currentState === 'critical' || this.currentState === 'warning') ? 1.5 : 0.5); if (Math.random() < eSC) { nV += (Math.random() * 2 - 1) * cH * sF; } else if (Math.random() < eSC * 2) { nV += (Math.random() * 2 - 1) * cH * (sF * 0.33); } this.ecgData.push(nV); if (this.ecgData.length > this.config.ecgDataLength) this.ecgData.shift(); while (this.ecgData.length < this.config.ecgDataLength) { this.ecgData.unshift(cH / 2); } const sX = cW / this.config.ecgDataLength; for (let i = 0; i < this.ecgData.length; i++) { this.ctx.lineTo(i * sX, this.ecgData[i]); } this.ctx.stroke(); } _drawSineWaves(cs) { this.sineTime += this.config.animationSpeed; const cH = this.dom.content.clientHeight; const cW = this.dom.content.clientWidth; if (cW <=0 || cH <=0) return; const dW = (a, f, p, cl, lW, nF) => { this.ctx.beginPath(); this.ctx.strokeStyle = cl; this.ctx.lineWidth = lW; for (let x = 0; x < cW; x++) { const n = (Math.random() - 0.5) * a * nF; const y = cH / 2 + a * Math.sin((x * f / cW) * 2 * Math.PI + this.sineTime + p) + n; if (x === 0) this.ctx.moveTo(x, y); else this.ctx.lineTo(x, y); } this.ctx.stroke(); }; dW(cH * 0.30, 5, 0, cs.stroke, cs.lineWidth, cs.noiseFactor); if (this.currentState === 'critical') { dW(cH * 0.20, 8, Math.PI / 3, 'rgba(255,0,0,0.5)', 1, cs.noiseFactor * 1.5); } else if (this.currentState === 'warning') { dW(cH * 0.15, 6, Math.PI / 2, 'rgba(255,165,0,0.6)', 1, cs.noiseFactor); } } destroy() { if (this.resizeListener && typeof window !== 'undefined') window.removeEventListener('resize', this.resizeListener); this.resizeListener = null; super.destroy(); } }
    class IntegrityPulsePanel extends BasePanel {
        constructor(containerSelector, options = {}) {
            const defaults = { 
                title: 'Integrity Pulse', 
                initialState: 'normal', 
                barCount: 5, 
                enableScanlineHalo: false, 
            };
            super(containerSelector, { ...defaults, ...options }, DSDK_CLASSES.INTEGRITY_PULSE_PANEL);
            if (!this.dom.panel) return; 
            this.dom.bars = []; 
            this._renderContent();
        }
        _renderContent() {
            if (!this.dom.content) return; 
            this.dom.content.innerHTML = ''; 
            
            const pulseContainer = document.createElement('div');
            pulseContainer.classList.add(DSDK_CLASSES.INTEGRITY_PULSE_CONTAINER);
            
            const numBars = Math.max(1, Math.min(100, this.config.barCount));

            for (let i = 0; i < numBars; i++) {
                const bar = document.createElement('div');
                bar.classList.add(DSDK_CLASSES.PULSE_BAR);
                let barWidthPercentage;
                if (numBars <= 5) {
                    barWidthPercentage = 18; 
                } else if (numBars <= 10) {
                    barWidthPercentage = 90 / numBars;
                } else {
                    barWidthPercentage = Math.max(0.5, (100 / numBars) * 0.75); 
                }
                bar.style.width = `${barWidthPercentage}%`;
                const baseDuration = 0.8 + (numBars > 20 ? Math.random() * 0.5 : 0.2);
                const durationVariation = Math.random() * 0.6 - 0.3; 
                const finalDuration = Math.max(0.5, baseDuration + durationVariation);
                bar.style.animationDuration = `${finalDuration}s`;
                const delay = (Math.random() * finalDuration) * -1;
                bar.style.animationDelay = `${delay}s`;
                pulseContainer.appendChild(bar); 
                this.dom.bars.push(bar);
            }
            this.dom.content.appendChild(pulseContainer);
        }
    }
    class CircularGaugePanel extends BasePanel {
        constructor(containerSelector, options = {}) {
            const defaults = {
                title: 'Gauge',
                minValue: 0,
                maxValue: 100,
                initialValue: 0,
                targetValue: null,
                units: '%',
                label: '',
                valueFontSize: '2em',
                labelFontSize: '0.8em',
                unitsFontSize: '0.7em',
                labelYOffset: 5, 
                arcWidth: 12,
                gaugeRadius: 80, 
                startAngle: -135, 
                endAngle: 135,    
                animationDuration: 400, 
                enableScanlineHalo: false,
            };
            super(containerSelector, { ...defaults, ...options }, DSDK_CLASSES.CIRCULAR_GAUGE_PANEL);
            if (!this.dom.panel) return;
            this.svgNS = "http://www.w3.org/2000/svg";
            this.currentValue = this.config.initialValue;
            this.isAnimating = false;
            this._renderContent();
            this.setValue(this.config.initialValue, false); 
            if (this.config.targetValue !== null) {
                this.setTargetValue(this.config.targetValue);
            }
        }
        _renderContent() {
            if (!this.dom.content) return;
            this.dom.content.innerHTML = '';
            this.dom.svgContainer = document.createElement('div'); 
            this.dom.svgContainer.classList.add(DSDK_CLASSES.GAUGE_SVG_CONTAINER);
            this.dom.svg = document.createElementNS(this.svgNS, 'svg');
            this.dom.svg.classList.add(DSDK_CLASSES.GAUGE_SVG);
            const viewBoxSize = (this.config.gaugeRadius + this.config.arcWidth) * 2 + 20; 
            this.dom.svg.setAttribute('viewBox', `0 0 ${viewBoxSize} ${viewBoxSize}`);
            this.centerX = viewBoxSize / 2;
            this.centerY = viewBoxSize / 2;
            this.dom.arcBackground = document.createElementNS(this.svgNS, 'path');
            this.dom.arcBackground.classList.add(DSDK_CLASSES.GAUGE_ARC_BACKGROUND);
            this.dom.arcBackground.setAttribute('d', this._describeArc(this.centerX, this.centerY, this.config.gaugeRadius, this.config.startAngle, this.config.endAngle));
            this.dom.arcBackground.style.strokeWidth = this.config.arcWidth;
            this.dom.svg.appendChild(this.dom.arcBackground);
            this.dom.arcValue = document.createElementNS(this.svgNS, 'path');
            this.dom.arcValue.classList.add(DSDK_CLASSES.GAUGE_ARC_VALUE);
            this.dom.arcValue.setAttribute('d', this._describeArc( this.centerX, this.centerY, this.config.gaugeRadius, this.config.startAngle, this.config.endAngle));
            this.dom.arcValue.style.strokeWidth = this.config.arcWidth;
            this.totalArcLength = this.dom.arcValue.getTotalLength();
            this.dom.arcValue.style.strokeDasharray = this.totalArcLength;
            this.dom.arcValue.style.strokeDashoffset = this.totalArcLength; 
            this.dom.svg.appendChild(this.dom.arcValue);
            if (this.config.targetValue !== null && typeof this.config.targetValue === 'number') {
                this.dom.targetMarker = document.createElementNS(this.svgNS, 'path');
                this.dom.targetMarker.classList.add(DSDK_CLASSES.GAUGE_TARGET_MARKER);
                this.dom.targetMarker.style.strokeWidth = Math.max(1, this.config.arcWidth / 4);
                this.dom.svg.appendChild(this.dom.targetMarker);
            }
            this.dom.textValue = this._createTextElement(DSDK_CLASSES.GAUGE_TEXT_VALUE, this.config.valueFontSize);
            this.dom.svg.appendChild(this.dom.textValue);
            const baseValueY = this.centerY; 
            let valueTextY = baseValueY;
            if (this.config.label) { 
                valueTextY -= parseFloat(this.config.labelFontSize.replace(/[a-z%]+$/, '') || 1) * (this.config.labelFontSize.includes('em') ? 8 : 1); 
            }
            this.dom.textValue.setAttribute('y', valueTextY);
            let currentYOffset = valueTextY; 
            if (this.config.units) {
                this.dom.textUnits = this._createTextElement(DSDK_CLASSES.GAUGE_TEXT_UNITS, this.config.unitsFontSize, this.config.units);
                const valueFontSizeNum = parseFloat(this.config.valueFontSize.replace(/[a-z%]+$/, '') || 2);
                const unitsFontSizeNum = parseFloat(this.config.unitsFontSize.replace(/[a-z%]+$/, '') || 0.7);
                const valueFontUnit = this.config.valueFontSize.includes('em') ? 'em' : 'px'; 
                const unitsFontUnit = this.config.unitsFontSize.includes('em') ? 'em' : 'px';
                let unitsY = currentYOffset;
                if (valueFontUnit === 'em') unitsY += valueFontSizeNum * 10; 
                else unitsY += valueFontSizeNum * 0.6;
                if (unitsFontUnit === 'em') unitsY += unitsFontSizeNum * 5; 
                else unitsY += unitsFontSizeNum * 0.2;
                this.dom.textUnits.setAttribute('y', unitsY);
                currentYOffset = unitsY; 
                this.dom.svg.appendChild(this.dom.textUnits);
            }
            if (this.config.label) {
                this.dom.textLabel = this._createTextElement(DSDK_CLASSES.GAUGE_TEXT_LABEL, this.config.labelFontSize, this.config.label);
                const prevElementFontSizeStr = this.config.units ? this.config.unitsFontSize : this.config.valueFontSize;
                const prevElementFontSizeNum = parseFloat(prevElementFontSizeStr.replace(/[a-z%]+$/, '') || 1);
                const prevElementFontUnit = prevElementFontSizeStr.includes('em') ? 'em' : 'px';
                const labelFontSizeNum = parseFloat(this.config.labelFontSize.replace(/[a-z%]+$/, '') || 0.8);
                const labelFontUnit = this.config.labelFontSize.includes('em') ? 'em' : 'px';
                let labelBaseY = currentYOffset;
                if (prevElementFontUnit === 'em') labelBaseY += prevElementFontSizeNum * 14; 
                else labelBaseY += prevElementFontSizeNum * 0.9;
                if (labelFontUnit === 'em') labelBaseY += labelFontSizeNum * 10; 
                else labelBaseY += labelFontSizeNum * 0.6;
                const finalLabelY = labelBaseY + this.config.labelYOffset;
                this.dom.textLabel.setAttribute('y', finalLabelY);
                this.dom.svg.appendChild(this.dom.textLabel);
            }
            this.dom.svgContainer.appendChild(this.dom.svg); 
            this.dom.content.appendChild(this.dom.svgContainer); 
        }
        _createTextElement(className, fontSize, textContent = '') { const textElem = document.createElementNS(this.svgNS, 'text'); textElem.classList.add(className); textElem.setAttribute('x', this.centerX); textElem.style.fontSize = fontSize; if (textContent) textElem.textContent = textContent; return textElem; }
        _polarToCartesian(centerX, centerY, radius, angleInDegrees) { const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0; return { x: centerX + (radius * Math.cos(angleInRadians)), y: centerY + (radius * Math.sin(angleInRadians)) }; }
        _describeArc(x, y, radius, startAngle, endAngle) { let correctedEndAngle = endAngle; if (Math.abs(endAngle - startAngle) >= 359.99) { correctedEndAngle = startAngle + 359.99 * Math.sign(endAngle - startAngle); } const start = this._polarToCartesian(x, y, radius, startAngle); const end = this._polarToCartesian(x, y, radius, correctedEndAngle); const largeArcFlag = Math.abs(correctedEndAngle - startAngle) <= 180 ? "0" : "1"; const sweepFlag = (correctedEndAngle > startAngle) ? "1" : "0"; const d = ["M", start.x, start.y, "A", radius, radius, 0, largeArcFlag, sweepFlag, end.x, end.y].join(" "); return d; }
        _valueToAngle(value) { const { minValue, maxValue, startAngle, endAngle } = this.config; const valueRatio = Math.max(0, Math.min(1, (value - minValue) / (maxValue - minValue))); let angle = startAngle + (valueRatio * (endAngle - startAngle)); return angle; }
        _updateGaugeView(value, animate = true) { if (!this.dom.arcValue || !this.dom.textValue) return; const valueRatio = Math.max(0, Math.min(1, (value - this.config.minValue) / (this.config.maxValue - this.config.minValue))); const offset = this.totalArcLength * (1 - valueRatio); if (animate && this.config.animationDuration > 0) { this.dom.arcValue.style.strokeDashoffset = offset; } else { const originalTransition = this.dom.arcValue.style.transition; this.dom.arcValue.style.transition = 'none'; this.dom.arcValue.style.strokeDashoffset = offset; void this.dom.arcValue.offsetWidth; this.dom.arcValue.style.transition = originalTransition; } this.dom.textValue.textContent = Math.round(value); if (this.dom.targetMarker && this.config.targetValue !== null) { const targetAngle = this._valueToAngle(this.config.targetValue); const rOuter = this.config.gaugeRadius + (this.config.arcWidth / 2) + 2; const rInner = this.config.gaugeRadius - (this.config.arcWidth / 2) - 2; const pOuter = this._polarToCartesian(this.centerX, this.centerY, rOuter, targetAngle); const pInner = this._polarToCartesian(this.centerX, this.centerY, rInner, targetAngle); this.dom.targetMarker.setAttribute('d', `M ${pInner.x} ${pInner.y} L ${pOuter.x} ${pOuter.y}`); } }
        setValue(newValue, animate = true) { let clampedValue = Math.max(this.config.minValue, Math.min(this.config.maxValue, newValue)); this.currentValue = clampedValue; this._updateGaugeView(this.currentValue, animate); }
        setTargetValue(newTargetValue) { this.config.targetValue = newTargetValue; if (newTargetValue === null && this.dom.targetMarker) { this.dom.targetMarker.remove(); this.dom.targetMarker = null; } else if (newTargetValue !== null && !this.dom.targetMarker) { this.dom.targetMarker = document.createElementNS(this.svgNS, 'path'); this.dom.targetMarker.classList.add(DSDK_CLASSES.GAUGE_TARGET_MARKER); this.dom.targetMarker.style.strokeWidth = Math.max(1, this.config.arcWidth / 4); if (this.dom.textValue) this.dom.svg.insertBefore(this.dom.targetMarker, this.dom.textValue); else this.dom.svg.appendChild(this.dom.targetMarker); } this._updateGaugeView(this.currentValue, false); }
    }
    class StatusIndicatorLedPanel extends BasePanel {
        constructor(containerSelector, options = {}) {
            const defaults = {
                title: 'System Status',
                indicators: [],
                enableScanlineHalo: false,
            };
            super(containerSelector, { ...defaults, ...options }, DSDK_CLASSES.STATUS_INDICATOR_PANEL);
            if (!this.dom.panel) return;
            this.indicatorsMap = new Map();
            this._renderContent();
        }
        _renderContent() {
            if (!this.dom.content) return;
            this.dom.content.innerHTML = ''; 
            this.dom.indicatorList = document.createElement('ul');
            this.dom.indicatorList.classList.add(DSDK_CLASSES.STATUS_INDICATOR_LIST);
            this.config.indicators.forEach(indicatorData => {
                const indicatorElement = this._createIndicatorElement(indicatorData);
                if (indicatorElement) {
                    this.dom.indicatorList.appendChild(indicatorElement);
                }
            });
            this.dom.content.appendChild(this.dom.indicatorList);
        }
        _createIndicatorElement(indicatorData) {
            if (!indicatorData.id || typeof indicatorData.text === 'undefined') {
                console.error('DSDK StatusIndicatorLedPanel: Indicator data must include an "id" and "text".', indicatorData);
                return null;
            }
            const itemElement = document.createElement('li');
            itemElement.classList.add(DSDK_CLASSES.STATUS_INDICATOR_ITEM);
            itemElement.dataset.indicatorId = indicatorData.id;
            const ledElement = document.createElement('span');
            ledElement.classList.add(DSDK_CLASSES.STATUS_LED);
            const textElement = document.createElement('span');
            textElement.classList.add(DSDK_CLASSES.STATUS_LED_TEXT);
            textElement.textContent = indicatorData.text;
            itemElement.appendChild(ledElement);
            itemElement.appendChild(textElement);
            this.indicatorsMap.set(indicatorData.id, {
                itemElement,
                ledElement,
                textElement,
                currentData: { ...indicatorData } 
            });
            this._applyIndicatorState(indicatorData.id, indicatorData.color, indicatorData.blinking);
            return itemElement;
        }
        _applyIndicatorState(id, color, blinking) {
            const indicator = this.indicatorsMap.get(id);
            if (!indicator) return;
            if (color && VALID_LED_COLORS.includes(color)) {
                VALID_LED_COLORS.forEach(c => {
                    indicator.ledElement.classList.remove(`${DSDK_CLASSES.STATUS_LED_COLOR_PREFIX}${c}`);
                });
                indicator.ledElement.classList.add(`${DSDK_CLASSES.STATUS_LED_COLOR_PREFIX}${color}`);
                indicator.currentData.color = color;
            } else if (color) {
                console.warn(`DSDK StatusIndicatorLedPanel: Invalid color "${color}" for indicator "${id}". Valid colors are: ${VALID_LED_COLORS.join(', ')}.`);
            }
            if (typeof blinking === 'boolean') {
                indicator.ledElement.classList.toggle(DSDK_CLASSES.STATUS_LED_BLINKING, blinking);
                indicator.currentData.blinking = blinking;
            }
        }
        addIndicator(indicatorData, atBeginning = false) {
            if (!this.dom.indicatorList) this._renderContent();
            if (!indicatorData || !indicatorData.id) {
                console.error('DSDK StatusIndicatorLedPanel: Indicator data for add must include an "id".', indicatorData);
                return;
            }
            if (this.indicatorsMap.has(indicatorData.id)) {
                console.warn(`DSDK StatusIndicatorLedPanel: Indicator with ID "${indicatorData.id}" already exists. Use updateIndicator instead.`);
                this.updateIndicator(indicatorData.id, indicatorData);
                return;
            }
            const newIndicatorData = { color: 'off', blinking: false, ...indicatorData };
            if (atBeginning) {
                this.config.indicators.unshift(newIndicatorData);
            } else {
                this.config.indicators.push(newIndicatorData);
            }
            const indicatorElement = this._createIndicatorElement(newIndicatorData);
            if (indicatorElement) {
                if (atBeginning && this.dom.indicatorList.firstChild) {
                     this.dom.indicatorList.insertBefore(indicatorElement, this.dom.indicatorList.firstChild);
                } else {
                    this.dom.indicatorList.appendChild(indicatorElement);
                }
            }
        }
        updateIndicator(id, updates) {
            const indicator = this.indicatorsMap.get(id);
            if (!indicator) {
                console.warn(`DSDK StatusIndicatorLedPanel: Indicator with ID "${id}" not found for update.`);
                return;
            }
            const configIndicator = this.config.indicators.find(ind => ind.id === id);
            if (updates.text !== undefined) {
                indicator.textElement.textContent = updates.text;
                indicator.currentData.text = updates.text;
                if (configIndicator) configIndicator.text = updates.text;
            }
            let newColor = indicator.currentData.color;
            if (updates.color !== undefined) {
                newColor = updates.color;
                if (configIndicator) configIndicator.color = updates.color;
            }
            let newBlinking = indicator.currentData.blinking;
            if (updates.blinking !== undefined) {
                newBlinking = updates.blinking;
                if (configIndicator) configIndicator.blinking = updates.blinking;
            }
            this._applyIndicatorState(id, newColor, newBlinking);
        }
        removeIndicator(id) {
            const indicator = this.indicatorsMap.get(id);
            if (indicator) {
                indicator.itemElement.remove();
                this.indicatorsMap.delete(id);
                this.config.indicators = this.config.indicators.filter(ind => ind.id !== id);
            } else {
                console.warn(`DSDK StatusIndicatorLedPanel: Indicator with ID "${id}" not found for removal.`);
            }
        }
        setIndicatorBlinking(id, isBlinking) { this.updateIndicator(id, { blinking: isBlinking }); }
        setIndicatorColor(id, newColor) { this.updateIndicator(id, { color: newColor });}
        setIndicatorText(id, newText) { this.updateIndicator(id, { text: newText }); }
        getIndicator(id) { const indicator = this.indicatorsMap.get(id); return indicator ? { ...indicator.currentData } : null; }
        getAllIndicators() { return this.config.indicators.map(ind => ({...ind})); }
    }
    class HorizontalBarGaugePanel extends BasePanel {
        constructor(containerSelector, options = {}) {
            const defaults = {
                title: 'Horizontal Gauge', minValue: 0, maxValue: 100, initialValue: 0,
                units: '%', label: '', barHeight: '16px', showValueText: true,
                valueTextFormat: (value, units) => `${Math.round(value)}${units}`,
                animationDuration: 400, 
                enableScanlineHalo: false,
            };
            super(containerSelector, { ...defaults, ...options }, DSDK_CLASSES.HORIZONTAL_BAR_GAUGE_PANEL);
            if (!this.dom.panel) return;
            this.currentValue = this.config.initialValue;
            this._renderContent();
            this.setValue(this.config.initialValue, false);
            this.dom.panel.style.setProperty('--dsdk-gauge-h-bar-height', this.config.barHeight);
        }
        _renderContent() {
            if (!this.dom.content) return; this.dom.content.innerHTML = '';
            this.dom.wrapper = document.createElement('div');
            this.dom.wrapper.classList.add(DSDK_CLASSES.GAUGE_HORIZONTAL_WRAPPER);
            if (this.config.label || this.config.showValueText) {
                this.dom.infoContainer = document.createElement('div');
                this.dom.infoContainer.classList.add(DSDK_CLASSES.GAUGE_HORIZONTAL_INFO);
                if (this.config.label) {
                    this.dom.labelElement = document.createElement('span');
                    this.dom.labelElement.classList.add(DSDK_CLASSES.GAUGE_HORIZONTAL_LABEL);
                    this.dom.labelElement.textContent = this.config.label;
                    this.dom.infoContainer.appendChild(this.dom.labelElement);
                }
                if (this.config.showValueText) {
                    this.dom.valueTextElement = document.createElement('span');
                    this.dom.valueTextElement.classList.add(DSDK_CLASSES.GAUGE_HORIZONTAL_VALUE_TEXT);
                    this.dom.infoContainer.appendChild(this.dom.valueTextElement);
                }
                this.dom.wrapper.appendChild(this.dom.infoContainer);
            }
            this.dom.trackElement = document.createElement('div');
            this.dom.trackElement.classList.add(DSDK_CLASSES.GAUGE_HORIZONTAL_TRACK);
            this.dom.barElement = document.createElement('div');
            this.dom.barElement.classList.add(DSDK_CLASSES.GAUGE_HORIZONTAL_BAR);
            if (this.config.animationDuration > 0) {
                this.dom.barElement.style.transition = `width ${this.config.animationDuration / 1000}s cubic-bezier(0.65, 0, 0.35, 1), background-color 0.3s ease-in-out`;
            } else {
                this.dom.barElement.style.transitionProperty = 'background-color';
                this.dom.barElement.style.transitionDuration = '0.3s';
                this.dom.barElement.style.transitionTimingFunction = 'ease-in-out';
            }
            this.dom.trackElement.appendChild(this.dom.barElement);
            this.dom.wrapper.appendChild(this.dom.trackElement);
            this.dom.content.appendChild(this.dom.wrapper);
        }
        _updateGaugeView(value, animate = true) {
            if (!this.dom.barElement) return;
            const { minValue, maxValue } = this.config;
            const percentage = Math.max(0, Math.min(100, ((value - minValue) / (maxValue - minValue)) * 100));
            if (!animate || this.config.animationDuration === 0) {
                const originalTransition = this.dom.barElement.style.transition;
                this.dom.barElement.style.transition = 'none'; 
                this.dom.barElement.style.width = `${percentage}%`;
                void this.dom.barElement.offsetWidth; 
                this.dom.barElement.style.transition = originalTransition;
            } else {
                this.dom.barElement.style.width = `${percentage}%`;
            }
            if (this.config.showValueText && this.dom.valueTextElement) {
                this.dom.valueTextElement.textContent = this.config.valueTextFormat(value, this.config.units);
            }
            let barColor = '';
            if (this.config.colorScheme && this.config.colorScheme[this.currentState]) {
                barColor = this.config.colorScheme[this.currentState];
            } else {
                switch (this.currentState) {
                    case 'critical': barColor = 'var(--dsdk-gauge-h-bar-critical)'; break;
                    case 'warning':  barColor = 'var(--dsdk-gauge-h-bar-warning)'; break;
                    case 'stable':   barColor = 'var(--dsdk-gauge-h-bar-stable)'; break;
                    default:         barColor = 'var(--dsdk-gauge-h-bar-normal)'; break;
                }
            }
            if (barColor) this.dom.barElement.style.backgroundColor = barColor;
        }
        setValue(newValue, animate = true) {
            const clampedValue = Math.max(this.config.minValue, Math.min(this.config.maxValue, newValue));
            this.currentValue = clampedValue;
            this._updateGaugeView(this.currentValue, animate);
        }
        setPanelState(newState) {
            super.setPanelState(newState); 
            if (this.dom.barElement && !this.config.colorScheme) {
                 this._updateGaugeView(this.currentValue, false); 
            }
        }
    }
    class ImageDisplayPanel extends BasePanel {
        constructor(containerSelector, options = {}) {
            const defaults = {
                title: 'Image Display',
                sourceType: 'url', 
                imageUrl: '',
                imageAltText: 'Displayed image',
                imageFit: 'contain',
                enableInterferenceEffect: false,
                interferenceIntensity: 'medium',
                enableGlitchEffect: false,
                enablePixelationEffect: false,
                pixelationLevel: 1,
                enableTvNoiseEffect: false,       
                tvNoiseIntensity: 0.15,           
                enableRollingBarsEffect: false,   
                rollingBarHeight: '2px',          
                rollingBarSpeed: '4s',            
                webcamConstraints: { video: true, audio: false }, 
                fallbackImageUrl: '', 
                onError: null,
                enableCrtPhosphorEffect: false, 
                flipHorizontal: false,          
                flipVertical: false,            
            };

            super(containerSelector, { ...defaults, ...options }, DSDK_CLASSES.IMAGE_DISPLAY_PANEL);
            if (!this.dom.panel) return;

            this.config = { 
                ...defaults,
                ...this.config, 
                ...options      
            };
            
            this.config.imageFit = VALID_IMAGE_FIT_MODES.includes(this.config.imageFit) ? this.config.imageFit : defaults.imageFit;
            this.config.interferenceIntensity = VALID_INTERFERENCE_INTENSITIES.includes(this.config.interferenceIntensity) ? this.config.interferenceIntensity : defaults.interferenceIntensity;
            this.config.pixelationLevel = VALID_PIXELATION_LEVELS.includes(this.config.pixelationLevel) ? this.config.pixelationLevel : defaults.pixelationLevel;
            this.config.sourceType = VALID_IMAGE_SOURCE_TYPES.includes(this.config.sourceType) ? this.config.sourceType : defaults.sourceType;
            this.config.tvNoiseIntensity = Math.max(0, Math.min(1, parseFloat(this.config.tvNoiseIntensity) || 0));
            
            this.currentStream = null;
            
            this._renderContent();
            this._updateActiveMediaElement();
            this._applyEffects(); 
            if (this.currentState) { 
                this.setPanelState(this.currentState); 
            }
        }

        _renderContent() {
            if (!this.dom.content) return;
            this.dom.content.innerHTML = '';

            this.dom.imageWrapper = document.createElement('div');
            this.dom.imageWrapper.classList.add(DSDK_CLASSES.IMAGE_WRAPPER);

            this.dom.effectsSubWrapper = document.createElement('div');
            this.dom.effectsSubWrapper.classList.add(DSDK_CLASSES.IMAGE_EFFECTS_SUB_WRAPPER);

            this.dom.imageElement = document.createElement('img');
            this.dom.imageElement.classList.add(DSDK_CLASSES.IMAGE_ELEMENT);
            this.dom.imageElement.style.display = 'none'; 
            
            this.dom.videoElement = document.createElement('video');
            this.dom.videoElement.classList.add(DSDK_CLASSES.IMAGE_VIDEO_ELEMENT);
            this.dom.videoElement.autoplay = true;
            this.dom.videoElement.playsInline = true; 
            this.dom.videoElement.muted = true; 
            this.dom.videoElement.style.display = 'none'; 

            this.setImageFit(this.config.imageFit);

            this.dom.tvNoiseOverlayElement = document.createElement('div');
            this.dom.tvNoiseOverlayElement.classList.add(DSDK_CLASSES.IMAGE_TV_NOISE_OVERLAY);
            
            this.dom.rollingBarsOverlayElement = document.createElement('div');
            this.dom.rollingBarsOverlayElement.classList.add(DSDK_CLASSES.IMAGE_ROLLING_BARS_OVERLAY);

            this.dom.effectsSubWrapper.appendChild(this.dom.imageElement);
            this.dom.effectsSubWrapper.appendChild(this.dom.videoElement);
            this.dom.imageWrapper.appendChild(this.dom.effectsSubWrapper); 
            this.dom.imageWrapper.appendChild(this.dom.tvNoiseOverlayElement);
            this.dom.imageWrapper.appendChild(this.dom.rollingBarsOverlayElement);
            this.dom.content.appendChild(this.dom.imageWrapper);
        }
        
        _updateActiveMediaElement() {
            if (!this.dom.imageElement || !this.dom.videoElement) return;
            const showVideo = this.config.sourceType === 'webcam' && this.currentStream;
            this.dom.videoElement.style.display = showVideo ? 'block' : 'none';
            this.dom.imageElement.style.display = showVideo ? 'none' : 'block';
            if (!showVideo) {
                const srcToShow = this.config.imageUrl || this.config.fallbackImageUrl;
                if (this.dom.imageElement.getAttribute('src') !== srcToShow) {
                    this.dom.imageElement.src = srcToShow;
                }
                this.dom.imageElement.alt = this.config.imageAltText;
            }
            this.setImageFit(this.config.imageFit);
            this._applyEffects();
        }
        
        async startWebcam(constraints) {
            if (this.currentStream) this.stopWebcam();
            this.config.sourceType = 'webcam';
            if (constraints) this.config.webcamConstraints = constraints;
        
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                try {
                    this.currentStream = await navigator.mediaDevices.getUserMedia(this.config.webcamConstraints);
                    this.dom.videoElement.srcObject = this.currentStream;
                    await this.dom.videoElement.play();
                    this._updateActiveMediaElement(); 
                    return this.currentStream; 
                } catch (error) {
                    console.error('DSDK ImageDisplayPanel: Error accessing/playing webcam.', error);
                    this.currentStream = null;
                    this.config.sourceType = 'url';
                    this._updateActiveMediaElement();
                    if (typeof this.config.onError === 'function') this.config.onError(error);
                    throw error; 
                }
            } else {
                const error = new Error('getUserMedia not supported in this browser.');
                console.error('DSDK ImageDisplayPanel:', error.message);
                this.currentStream = null; this.config.sourceType = 'url';
                this._updateActiveMediaElement();
                if (typeof this.config.onError === 'function') this.config.onError(error);
                throw error;
            }
        }

        stopWebcam() {
            if (this.currentStream) {
                this.currentStream.getTracks().forEach(track => track.stop());
            }
            this.currentStream = null;
            if (this.dom.videoElement) {
                this.dom.videoElement.srcObject = null; this.dom.videoElement.pause();
                this.dom.videoElement.removeAttribute('src'); this.dom.videoElement.load();
            }
            if (this.config.sourceType === 'webcam') this.config.sourceType = 'url';
            this._updateActiveMediaElement();
        }
        
        _updateCrtPhosphorColor(panelState) {
            if (!this.dom.imageWrapper || !this.config.enableCrtPhosphorEffect) {
                 if(this.dom.imageWrapper) { 
                    [DSDK_CLASSES.IMAGE_CRT_PHOSPHOR_GREEN, DSDK_CLASSES.IMAGE_CRT_PHOSPHOR_AMBER, DSDK_CLASSES.IMAGE_CRT_PHOSPHOR_RED, DSDK_CLASSES.IMAGE_CRT_PHOSPHOR_NORMAL, DSDK_CLASSES.IMAGE_CRT_PHOSPHOR_STABLE]
                        .forEach(cls => this.dom.imageWrapper.classList.remove(cls));
                 }
                return;
            }

            [DSDK_CLASSES.IMAGE_CRT_PHOSPHOR_GREEN, DSDK_CLASSES.IMAGE_CRT_PHOSPHOR_AMBER, DSDK_CLASSES.IMAGE_CRT_PHOSPHOR_RED, DSDK_CLASSES.IMAGE_CRT_PHOSPHOR_NORMAL, DSDK_CLASSES.IMAGE_CRT_PHOSPHOR_STABLE]
                .forEach(cls => this.dom.imageWrapper.classList.remove(cls));

            let phosphorClass = '';
            switch (panelState) {
                case 'critical': phosphorClass = DSDK_CLASSES.IMAGE_CRT_PHOSPHOR_RED; break;
                case 'warning':  phosphorClass = DSDK_CLASSES.IMAGE_CRT_PHOSPHOR_AMBER; break;
                case 'stable':   phosphorClass = DSDK_CLASSES.IMAGE_CRT_PHOSPHOR_STABLE; break;
                case 'normal':
                default:         phosphorClass = DSDK_CLASSES.IMAGE_CRT_PHOSPHOR_NORMAL; break;
            }
            if (phosphorClass) {
                this.dom.imageWrapper.classList.add(phosphorClass);
            }
        }

        _applyEffects() {
            if (!this.dom.imageWrapper || !this.dom.effectsSubWrapper) return;

            this.dom.effectsSubWrapper.classList.toggle(DSDK_CLASSES.IMAGE_INTERFERENCE_EFFECT, this.config.enableInterferenceEffect);
            VALID_INTERFERENCE_INTENSITIES.forEach(intensity => 
                this.dom.effectsSubWrapper.classList.remove(DSDK_CLASSES.IMAGE_INTERFERENCE_INTENSITY_PREFIX + intensity)
            );
            if (this.config.enableInterferenceEffect) {
                this.dom.effectsSubWrapper.classList.add(DSDK_CLASSES.IMAGE_INTERFERENCE_INTENSITY_PREFIX + this.config.interferenceIntensity);
            }

            this.dom.effectsSubWrapper.classList.toggle(DSDK_CLASSES.IMAGE_GLITCH_EFFECT, this.config.enableGlitchEffect);
            
            this.dom.effectsSubWrapper.classList.toggle(DSDK_CLASSES.IMAGE_PIXELATION_EFFECT, this.config.enablePixelationEffect);
            VALID_PIXELATION_LEVELS.forEach(level =>
                this.dom.effectsSubWrapper.classList.remove(DSDK_CLASSES.IMAGE_PIXELATION_LEVEL_PREFIX + level)
            );
            if (this.config.enablePixelationEffect) {
                this.dom.effectsSubWrapper.classList.add(DSDK_CLASSES.IMAGE_PIXELATION_LEVEL_PREFIX + this.config.pixelationLevel);
            }

            if (this.dom.tvNoiseOverlayElement) {
                this.dom.tvNoiseOverlayElement.classList.toggle(DSDK_CLASSES.IMAGE_TV_NOISE_ACTIVE, this.config.enableTvNoiseEffect);
                this.dom.tvNoiseOverlayElement.style.opacity = this.config.enableTvNoiseEffect ? this.config.tvNoiseIntensity.toString() : '0';
            }
            if (this.dom.rollingBarsOverlayElement) {
                this.dom.rollingBarsOverlayElement.classList.toggle(DSDK_CLASSES.IMAGE_ROLLING_BARS_ACTIVE, this.config.enableRollingBarsEffect);
                if (this.config.enableRollingBarsEffect) {
                    this.dom.imageWrapper.style.setProperty('--dsdk-current-rolling-bar-height', this.config.rollingBarHeight);
                    this.dom.imageWrapper.style.setProperty('--dsdk-current-rolling-bar-speed', this.config.rollingBarSpeed);
                }
            }

            this.dom.imageWrapper.classList.toggle(DSDK_CLASSES.IMAGE_CRT_PHOSPHOR_ACTIVE, !!this.config.enableCrtPhosphorEffect);
            if (this.config.enableCrtPhosphorEffect) {
                this._updateCrtPhosphorColor(this.currentState);
            } else {
                this._updateCrtPhosphorColor(null); 
            }
            
            let transformValue = '';
            if (this.config.flipHorizontal) transformValue += 'scaleX(-1) ';
            if (this.config.flipVertical) transformValue += 'scaleY(-1) ';
            
            if (this.dom.imageElement) this.dom.imageElement.style.transform = transformValue.trim();
            if (this.dom.videoElement) this.dom.videoElement.style.transform = transformValue.trim();
        }

        setPanelState(newState) {
            super.setPanelState(newState); 
            if (this.config.enableCrtPhosphorEffect && this.dom.imageWrapper) {
                this._updateCrtPhosphorColor(this.currentState);
            }
        }

        setImage(newImageUrl, newAltText = this.config.imageAltText) {
            this.stopWebcam(); 
            this.config.sourceType = 'url'; 
            this.config.imageUrl = newImageUrl;
            this.config.imageAltText = newAltText;
            this._updateActiveMediaElement(); 
        }

        setImageFit(fitMode) {
            if (!VALID_IMAGE_FIT_MODES.includes(fitMode)) {
                console.warn(`DSDK ImageDisplayPanel: Invalid imageFit mode "${fitMode}". Using default.`);
                fitMode = 'contain';
            }
            this.config.imageFit = fitMode;
            const applyFitClass = (element) => {
                if (element) {
                    VALID_IMAGE_FIT_MODES.forEach(mode => 
                        element.classList.remove(DSDK_CLASSES.IMAGE_FIT_PREFIX + mode)
                    );
                    element.classList.add(DSDK_CLASSES.IMAGE_FIT_PREFIX + this.config.imageFit);
                }
            };
            applyFitClass(this.dom.imageElement);
            applyFitClass(this.dom.videoElement);
        }

        toggleInterference(enable, intensity = this.config.interferenceIntensity) {
            this.config.enableInterferenceEffect = !!enable;
            if (VALID_INTERFERENCE_INTENSITIES.includes(intensity)) this.config.interferenceIntensity = intensity;
            this._applyEffects();
        }
        toggleGlitch(enable) {
            this.config.enableGlitchEffect = !!enable; this._applyEffects();
        }
        togglePixelation(enable, level = this.config.pixelationLevel) {
            this.config.enablePixelationEffect = !!enable;
            if (VALID_PIXELATION_LEVELS.includes(parseInt(level, 10))) this.config.pixelationLevel = parseInt(level, 10);
            this._applyEffects();
        }
        toggleTvNoise(enable, intensity = this.config.tvNoiseIntensity) {
            this.config.enableTvNoiseEffect = !!enable;
            this.config.tvNoiseIntensity = Math.max(0, Math.min(1, parseFloat(intensity) || 0));
            this._applyEffects();
        }
        toggleRollingBars(enable, barHeight = this.config.rollingBarHeight, barSpeed = this.config.rollingBarSpeed) {
            this.config.enableRollingBarsEffect = !!enable;
            this.config.rollingBarHeight = barHeight; this.config.rollingBarSpeed = barSpeed;
            this._applyEffects();
        }
        toggleCrtPhosphorEffect(enable) {
            this.config.enableCrtPhosphorEffect = !!enable; this._applyEffects();
        }
        toggleFlipHorizontal(enable) {
            this.config.flipHorizontal = !!enable; this._applyEffects();
        }
        toggleFlipVertical(enable) {
            this.config.flipVertical = !!enable; this._applyEffects();
        }
        
        destroy() {
            this.stopWebcam(); super.destroy();
        }
    }
    class TrueCanvasGraphPanel extends BasePanel {
        constructor(containerSelector, options = {}) {
            const defaults = {
                title: 'Realtime Data Graph',
                maxDataPoints: 200,
                dataRange: null, 
                colorScheme: { 
                    normal:   { stroke: '#00E5E5', lineWidth: 1.5 },
                    warning:  { stroke: '#FFD700', lineWidth: 1.8 },
                    critical: { stroke: '#FF4500', lineWidth: 2.0 },
                    stable:   { stroke: '#32CD32', lineWidth: 1.5 }
                },
                particleEffectType: '1', 
                enableScanlineHalo: true, 
            };
            super(containerSelector, { ...defaults, ...options }, DSDK_CLASSES.TRUE_CANVAS_GRAPH_PANEL); 
            if (!this.dom.panel) return;

            this.data = []; 
            this.drawQueued = false; 

            this._renderContent(); 
            this._initCanvas();    

            requestAnimationFrame(() => this._drawGraph());
        }

        _renderContent() {
            if (!this.dom.content) return;
            this.dom.content.innerHTML = ''; 
            this.dom.canvas = document.createElement('canvas');
            this.dom.canvas.classList.add(DSDK_CLASSES.CANVAS_GRAPH); 
            this.dom.content.appendChild(this.dom.canvas);
            this.ctx = this.dom.canvas.getContext('2d');
        }

        _initCanvas() {
            if (!this.dom.canvas || !this.ctx) return;

            const adjustCanvasResolution = () => {
                if (!this.dom.canvas || !this.dom.content || !this.dom.content.clientWidth || !this.dom.content.clientHeight) {
                    if (this.dom.panel && this.dom.panel.offsetParent !== null) { 
                        requestAnimationFrame(adjustCanvasResolution);
                    }
                    return;
                }

                const dpr = window.devicePixelRatio || 1;
                this.dom.canvas.width = this.dom.content.clientWidth * dpr;
                this.dom.canvas.height = this.dom.content.clientHeight * dpr;
                this.ctx.scale(dpr, dpr); 
                
                this._drawGraph(); 
            };
            
            requestAnimationFrame(adjustCanvasResolution); 

            this.resizeListener = () => requestAnimationFrame(adjustCanvasResolution);
            if (typeof window !== 'undefined') {
                window.addEventListener('resize', this.resizeListener);
            }
        }

        addDataPoint(yValue) {
            if (typeof yValue !== 'number' || isNaN(yValue)) {
                console.warn('TrueCanvasGraphPanel: addDataPoint expects a valid number. Received:', yValue);
                return;
            }
            this.data.push(yValue);
            while (this.data.length > this.config.maxDataPoints) {
                this.data.shift(); 
            }
            this._requestDraw(); 
        }

        setData(newDataArray) {
            if (!Array.isArray(newDataArray) || !newDataArray.every(p => typeof p === 'number' && !isNaN(p))) {
                console.warn('TrueCanvasGraphPanel: setData expects an array of valid numbers.');
                return;
            }
            this.data = newDataArray.slice(-this.config.maxDataPoints);
            this._requestDraw(); 
        }
        
        clearData() {
            this.data = [];
            this._requestDraw();
        }

        _requestDraw() {
            if (!this.drawQueued) {
                this.drawQueued = true;
                requestAnimationFrame(() => {
                    this._drawGraph();
                    this.drawQueued = false;
                });
            }
        }
        
        _drawGraph() {
            if (!this.ctx || !this.dom.canvas || !this.dom.content || !this.dom.canvas.width || !this.dom.canvas.height) {
                return; 
            }

            const canvasWidth = this.dom.content.clientWidth; 
            const canvasHeight = this.dom.content.clientHeight;

            if (canvasWidth <= 0 || canvasHeight <= 0) return; 

            this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            if (this.data.length < 2) {
                return;
            }

            const cs = this.config.colorScheme[this.currentState] || this.config.colorScheme['normal'];
            this.ctx.strokeStyle = cs.stroke;
            this.ctx.lineWidth = cs.lineWidth;

            let minY, maxY;
            if (this.config.dataRange && typeof this.config.dataRange.min === 'number' && typeof this.config.dataRange.max === 'number') {
                minY = this.config.dataRange.min;
                maxY = this.config.dataRange.max;
            } else {
                minY = Math.min(...this.data);
                maxY = Math.max(...this.data);
            }
            
            if (minY === maxY) { 
                minY -= 0.5; 
                maxY += 0.5;
            }
             if (minY === maxY) { 
                if(maxY === 0) { maxY = 1; } 
                else { minY = maxY - (Math.abs(maxY * 0.1) || 1); } 
            }

            const rangeY = maxY - minY;
            if (rangeY === 0) {
                this.ctx.beginPath();
                this.ctx.moveTo(0, canvasHeight / 2);
                this.ctx.lineTo(canvasWidth, canvasHeight / 2);
                this.ctx.stroke();
                return;
            }
            
            const stepX = canvasWidth / (this.data.length - 1); 

            this.ctx.beginPath();
            this.data.forEach((point, index) => {
                const x = index * stepX;
                const y = canvasHeight - ((point - minY) / rangeY) * canvasHeight;

                if (index === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            });
            this.ctx.stroke();
        }

        setPanelState(newState) {
            super.setPanelState(newState); 
            this._requestDraw(); 
        }
        
        destroy() {
            if (this.resizeListener && typeof window !== 'undefined') {
                window.removeEventListener('resize', this.resizeListener);
            }
            this.resizeListener = null;
            super.destroy(); 
        }
    }

    class RadarDisplayPanel extends BasePanel {
        constructor(containerSelector, options = {}) {
            const defaults = {
                title: 'Radar Display',
                numCircles: 5,
                radarSpeed: 10, // RPM (rotations per minute) - Aumentado para mejor demo
                maxRadarRange: 100, // Max abstract range for x,y coordinates
                pointSize: 3, // pixels
                pointHighlightDuration: 500, // milliseconds - Duración del resaltado
                pointFadeOutDuration: 2500, // milliseconds - Duración del desvanecimiento
                pointInitialDetectionBoost: 1, // Factor de tamaño al detectar por primera vez (1 = sin boost)
                pointMinOpacityAfterFade: 0.0, // Opacidad mínima después del desvanecimiento (0 = desaparece)
                sweepWidthDegrees: 20, // Angular width of the sweep
                particleEffectType: '6',
                particleEffectStates: ['critical', 'warning', 'normal'],
                enableScanlineHalo: true,
            };
            super(containerSelector, { ...defaults, ...options }, DSDK_CLASSES.RADAR_DISPLAY_PANEL);
            if (!this.dom.panel) return;

            this.points = []; // { id, x, y, data, canvasX, canvasY, angle, distance, detectedAt }
            this.currentSweepAngle = 0; // radians
            this.lastTimestamp = 0;
            this.animationFrameId = null;

            this._renderContent();
            this._initCanvas();
            
            this._animationLoop = this._animationLoop.bind(this);
            this.animationFrameId = requestAnimationFrame(this._animationLoop);
        }

        _renderContent() {
            if (!this.dom.content) return;
            this.dom.content.innerHTML = '';
            this.dom.canvas = document.createElement('canvas');
            this.dom.canvas.classList.add(DSDK_CLASSES.RADAR_CANVAS);
            this.dom.content.appendChild(this.dom.canvas);
            this.ctx = this.dom.canvas.getContext('2d');
        }

        _initCanvas() {
            if (!this.dom.canvas || !this.ctx) return;
            
            const adjustCanvasResolution = () => {
                if (!this.dom.canvas || !this.dom.content || !this.dom.content.clientWidth || !this.dom.content.clientHeight) {
                     if (this.dom.panel && this.dom.panel.offsetParent !== null) {
                        requestAnimationFrame(adjustCanvasResolution);
                    }
                    return;
                }

                const dpr = window.devicePixelRatio || 1;
                this.dom.canvas.width = this.dom.content.clientWidth * dpr;
                this.dom.canvas.height = this.dom.content.clientHeight * dpr;
                this.ctx.scale(dpr, dpr);
                
                this._updateAllPointCanvasCoordinates();
            };

            requestAnimationFrame(adjustCanvasResolution);
            this.resizeListener = () => requestAnimationFrame(adjustCanvasResolution);
            if (typeof window !== 'undefined') {
                window.addEventListener('resize', this.resizeListener);
            }
        }
        
        _getStylePropertyValue(propName) {
            if (!this.dom.panel) return '';
            return getComputedStyle(this.dom.panel).getPropertyValue(propName).trim();
        }

        _animationLoop(timestamp) {
            if (!this.ctx || !this.dom.canvas || !this.dom.canvas.width || !this.dom.canvas.height) {
                this.animationFrameId = requestAnimationFrame(this._animationLoop);
                return;
            }
            const deltaTime = (timestamp - (this.lastTimestamp || timestamp)) / 1000; // seconds
            this.lastTimestamp = timestamp;

            const rotationsPerSecond = this.config.radarSpeed / 60;
            this.currentSweepAngle += (rotationsPerSecond * 2 * Math.PI) * deltaTime;
            this.currentSweepAngle %= (2 * Math.PI);

            const canvasWidth = this.dom.content.clientWidth;
            const canvasHeight = this.dom.content.clientHeight;
            this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            this._drawRadarBackground(canvasWidth, canvasHeight);
            this._drawRadarSweep(canvasWidth, canvasHeight);
            this._drawPoints(canvasWidth, canvasHeight, timestamp);

            this.animationFrameId = requestAnimationFrame(this._animationLoop);
        }

        _drawRadarBackground(width, height) {
            const centerX = width / 2;
            const centerY = height / 2;
            const outerContinuousRadius = Math.min(width, height) / 2 * 0.92;
            const gridMaxRadius = outerContinuousRadius * 0.95; 

            const gridColor = this._getStylePropertyValue('--dsdk-current-radar-grid-color') || 'rgba(0, 229, 229, 0.3)';
            const gridLineWidth = parseFloat(this._getStylePropertyValue('--dsdk-radar-grid-line-width')) || 0.5;
            const gridDashString = this._getStylePropertyValue('--dsdk-radar-grid-dash') || '2,3';
            const gridDash = gridDashString.split(',').map(Number);
            const outerCircleLineWidth = parseFloat(this._getStylePropertyValue('--dsdk-radar-outer-circle-line-width')) || 1.5;

            this.ctx.strokeStyle = gridColor;
            
            this.ctx.lineWidth = outerCircleLineWidth;
            this.ctx.setLineDash([]);
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, outerContinuousRadius, 0, 2 * Math.PI);
            this.ctx.stroke();

            this.ctx.lineWidth = gridLineWidth;
            this.ctx.setLineDash(gridDash);
            
            for (let i = 1; i <= this.config.numCircles; i++) {
                const radius = gridMaxRadius * (i / this.config.numCircles);
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                this.ctx.stroke();
            }
            
            this.ctx.setLineDash([]); 
            for (let i = 0; i < 8; i++) { 
                const angle = (i * Math.PI) / 4; 
                this.ctx.beginPath();
                this.ctx.moveTo(centerX, centerY);
                this.ctx.lineTo(centerX + gridMaxRadius * Math.cos(angle), centerY + gridMaxRadius * Math.sin(angle));
                this.ctx.stroke();
            }
        }

        _drawRadarSweep(width, height) {
            const centerX = width / 2;
            const centerY = height / 2;
            const outerContinuousRadius = Math.min(width, height) / 2 * 0.92; // Sweep hasta el círculo exterior
            const sweepColor = this._getStylePropertyValue('--dsdk-current-radar-sweep-color') || 'rgba(0, 229, 229, 0.25)';
            const sweepOpacity = parseFloat(this._getStylePropertyValue('--dsdk-radar-sweep-opacity')) || 0.25;

            let finalSweepColor = sweepColor;
            if (sweepColor.startsWith('rgb(') || sweepColor.startsWith('hsl(')) {
                finalSweepColor = sweepColor.replace(')', `, ${sweepOpacity})`).replace('rgb(', 'rgba(').replace('hsl(','hsla(');
            } else if (sweepColor.startsWith('#')) {
                const r = parseInt(sweepColor.slice(1, 3), 16);
                const g = parseInt(sweepColor.slice(3, 5), 16);
                const b = parseInt(sweepColor.slice(5, 7), 16);
                finalSweepColor = `rgba(${r}, ${g}, ${b}, ${sweepOpacity})`;
            }
          
            this.ctx.fillStyle = finalSweepColor;
            const sweepWidthRadians = (this.config.sweepWidthDegrees * Math.PI) / 180;
            
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.arc(
                centerX, centerY, outerContinuousRadius, // Usar el radio del círculo exterior
                this.currentSweepAngle - sweepWidthRadians / 2,
                this.currentSweepAngle + sweepWidthRadians / 2
            );
            this.ctx.closePath();
            this.ctx.fill();
        }
        
        _isPointUnderSweep(point) {
            if (!point.hasOwnProperty('angle')) return false;
            
            const sweepWidthRadians = (this.config.sweepWidthDegrees * Math.PI) / 180;
            let pointAngle = point.angle;
            let sweepStartAngle = (this.currentSweepAngle - sweepWidthRadians / 2);
            
            pointAngle = (pointAngle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
            sweepStartAngle = (sweepStartAngle % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
            const sweepEndAngle = (sweepStartAngle + sweepWidthRadians);

            if (sweepEndAngle > 2 * Math.PI) {
                return (pointAngle >= sweepStartAngle && pointAngle < 2 * Math.PI) || 
                       (pointAngle >= 0 && pointAngle < (sweepEndAngle % (2 * Math.PI)));
            } else {
                return pointAngle >= sweepStartAngle && pointAngle < sweepEndAngle;
            }
        }

        _drawPoints(width, height, timestamp) {
            const pointBaseColor = this._getStylePropertyValue('--dsdk-current-radar-point-color') || '#e0e0e0';
            const pointHighlightColor = this._getStylePropertyValue('--dsdk-radar-point-highlight-color') || '#FFFFFF';

            this.points.forEach(point => {
                if (!point.hasOwnProperty('canvasX') || !point.hasOwnProperty('canvasY')) return;

                const underSweep = this._isPointUnderSweep(point);
                let currentOpacity = 0;
                let colorToUse = pointBaseColor;
                let currentPointSize = this.config.pointSize;

                if (underSweep) {
                    point.detectedAt = timestamp; 
                }

                if (point.detectedAt === 0) { 
                    return; 
                }

                const timeSinceDetectionMs = timestamp - point.detectedAt;

                if (timeSinceDetectionMs <= this.config.pointHighlightDuration) {
                    currentOpacity = 1.0;
                    colorToUse = pointHighlightColor;
                    const highlightProgress = timeSinceDetectionMs / this.config.pointHighlightDuration; // 0 to 1
                    if (this.config.pointInitialDetectionBoost > 1) {
                         const pulseFactor = 1 + (this.config.pointInitialDetectionBoost - 1) * Math.sin(highlightProgress * Math.PI);
                         currentPointSize = this.config.pointSize * pulseFactor;
                    } else {
                         currentPointSize = this.config.pointSize;
                    }
                } else {
                    const timeIntoFadeMs = timeSinceDetectionMs - this.config.pointHighlightDuration;
                    if (timeIntoFadeMs < this.config.pointFadeOutDuration) {
                        const fadeProgress = timeIntoFadeMs / this.config.pointFadeOutDuration; // 0 to 1
                        currentOpacity = 1.0 - fadeProgress;
                        currentOpacity = Math.max(this.config.pointMinOpacityAfterFade, currentOpacity);
                    } else {
                        currentOpacity = this.config.pointMinOpacityAfterFade;
                    }
                    currentPointSize = this.config.pointSize; // Size normalizes after highlight
                }

                if (currentOpacity <= 0 && this.config.pointMinOpacityAfterFade <=0) {
                    return; 
                }
                
                this.ctx.globalAlpha = currentOpacity;
                this.ctx.fillStyle = colorToUse;
                this.ctx.beginPath();
                this.ctx.arc(point.canvasX, point.canvasY, currentPointSize, 0, 2 * Math.PI);
                this.ctx.fill();
                this.ctx.globalAlpha = 1.0; 
            });
        }
        
        _mapToCanvasCoords(x, y) {
            if (!this.dom.content || !this.dom.content.clientWidth || !this.dom.content.clientHeight) {
                return { canvasX: 0, canvasY: 0, angle: 0, distance: 0, valid: false };
            }
            const width = this.dom.content.clientWidth;
            const height = this.dom.content.clientHeight;
            const centerX = width / 2;
            const centerY = height / 2;
            
            const outerContinuousRadius = Math.min(width, height) / 2 * 0.92;
            const maxCanvasRadius = outerContinuousRadius * 0.95; // Points map within the grid area

            const normalizedX = x / this.config.maxRadarRange;
            const normalizedY = y / this.config.maxRadarRange;

            const canvasX = centerX + normalizedX * maxCanvasRadius;
            const canvasY = centerY - normalizedY * maxCanvasRadius; 

            const dx = canvasX - centerX;
            const dy = canvasY - centerY;
            const angle = Math.atan2(dy, dx);
            const distance = Math.sqrt(dx*dx + dy*dy);
            
            return { canvasX, canvasY, angle, distance, valid: true };
        }
        
        _updatePointCanvasCoordinates(point) {
            const { canvasX, canvasY, angle, distance, valid } = this._mapToCanvasCoords(point.x, point.y);
            if (valid) {
                point.canvasX = canvasX;
                point.canvasY = canvasY;
                point.angle = angle;
                point.distance = distance;
            }
        }

        _updateAllPointCanvasCoordinates() {
            this.points.forEach(p => this._updatePointCanvasCoordinates(p));
        }

        addPoint(id, x, y, data = {}) {
            if (this.points.find(p => p.id === id)) {
                this.updatePoint(id, x, y, data);
                return;
            }
            const point = { id, x, y, data, detectedAt: 0 };
            this._updatePointCanvasCoordinates(point);
            this.points.push(point);
        }

        updatePoint(id, newX, newY, newData) {
            const point = this.points.find(p => p.id === id);
            if (point) {
                if (newX !== undefined) point.x = newX;
                if (newY !== undefined) point.y = newY;
                if (newData !== undefined) point.data = { ...point.data, ...newData };
                this._updatePointCanvasCoordinates(point);
                // No reset de detectedAt aquí, para que mantenga su estado de visibilidad/fade
            } else {
                console.warn(`RadarDisplayPanel: Point with ID "${id}" not found for update.`);
            }
        }

        removePoint(id) {
            this.points = this.points.filter(p => p.id !== id);
        }

        clearPoints() {
            this.points = [];
        }

        setRadarSpeed(rpm) {
            if (typeof rpm === 'number' && rpm >= 0) {
                this.config.radarSpeed = rpm;
            } else {
                console.warn(`RadarDisplayPanel: Invalid radar speed "${rpm}". Must be a non-negative number.`);
            }
        }
        
        setPanelState(newState) {
            super.setPanelState(newState);
        }

        destroy() {
            if (this.animationFrameId) {
                cancelAnimationFrame(this.animationFrameId);
                this.animationFrameId = null;
            }
            if (this.resizeListener && typeof window !== 'undefined') {
                window.removeEventListener('resize', this.resizeListener);
            }
            this.resizeListener = null;
            this.points = [];
            super.destroy();
        }
    }


    return {
        ImageDisplayPanel,
        LogDisplayPanel, CriticalWarningTextPanel, KeyValueListPanel, LedDisplayPanel,
        DynamicTextPanel, ActionButtonsPanel, CanvasGraphPanel,
        IntegrityPulsePanel, CircularGaugePanel, StatusIndicatorLedPanel,
        HorizontalBarGaugePanel, 
        TrueCanvasGraphPanel,
        RadarDisplayPanel,
        DSDK_CLASSES: DSDK_CLASSES 
    };
})();
