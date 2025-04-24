// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Color display elements
    const colorPreview = document.getElementById('colorPreview');
    const rgbCode = document.getElementById('rgbCode');
    const hexCode = document.getElementById('hexCode');
    const hslCode = document.getElementById('hslCode');
    const cssVarCode = document.getElementById('cssVarCode');

    // RGB controls
    const redSlider = document.getElementById('redSlider');
    const greenSlider = document.getElementById('greenSlider');
    const blueSlider = document.getElementById('blueSlider');
    const redValue = document.getElementById('redValue');
    const greenValue = document.getElementById('greenValue');
    const blueValue = document.getElementById('blueValue');

    // HEX controls
    const hexInput = document.getElementById('hexInput');
    const applyHex = document.getElementById('applyHex');

    // HSL controls
    const hueSlider = document.getElementById('hueSlider');
    const saturationSlider = document.getElementById('saturationSlider');
    const lightnessSlider = document.getElementById('lightnessSlider');
    const hueValue = document.getElementById('hueValue');
    const saturationValue = document.getElementById('saturationValue');
    const lightnessValue = document.getElementById('lightnessValue');

    // Action buttons
    const randomColorBtn = document.getElementById('randomColor');
    const copyAllBtn = document.getElementById('copyAll');
    const resetColorBtn = document.getElementById('resetColor');
    const copyRgbBtn = document.getElementById('copyRgb');
    const copyHexBtn = document.getElementById('copyHex');
    const copyHslBtn = document.getElementById('copyHsl');
    const copyCssVarBtn = document.getElementById('copyCssVar');

    // Format toggle
    const formatBtns = document.querySelectorAll('.format-btn');
    const formatSections = document.querySelectorAll('.format-section');

    // Notification
    const copyNotification = document.getElementById('copyNotification');

    // Presets
    const presetContainer = document.getElementById('presetContainer');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const colorPresets = document.querySelectorAll('.color-preset');
    const patternColors = document.querySelectorAll('.pattern-color');

    // Initial color values
    let red = 255;
    let green = 0;
    let blue = 0;
    let hue = 0;
    let saturation = 100;
    let lightness = 50;

    // Format switching
    formatBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and sections
            formatBtns.forEach(b => b.classList.remove('active'));
            formatSections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked button and corresponding section
            this.classList.add('active');
            const format = this.getAttribute('data-format');
            document.getElementById(`${format}-controls`).classList.add('active');
        });
    });

    // Color conversion functions
    function rgbToHex(r, g, b) {
        return '#' + 
            r.toString(16).padStart(2, '0').toUpperCase() + 
            g.toString(16).padStart(2, '0').toUpperCase() + 
            b.toString(16).padStart(2, '0').toUpperCase();
    }

    function hexToRgb(hex) {
        // Remove # if present
        hex = hex.replace(/^#/, '');
        
        // Parse the hex values
        let r, g, b;
        if (hex.length === 3) {
            r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
            g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
            b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
        } else {
            r = parseInt(hex.substring(0, 2), 16);
            g = parseInt(hex.substring(2, 4), 16);
            b = parseInt(hex.substring(4, 6), 16);
        }
        
        return [r, g, b];
    }

    function rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            
            h /= 6;
        }
        
        return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
    }

    function hslToRgb(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        
        let r, g, b;
        
        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };
            
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        
        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

    // Update color preview and codes
    function updateColor() {
        const rgb = `rgb(${red}, ${green}, ${blue})`;
        const hex = rgbToHex(red, green, blue);
        const [h, s, l] = rgbToHsl(red, green, blue);
        const hsl = `hsl(${h}, ${s}%, ${l}%)`;
        
        // Update preview
        colorPreview.style.backgroundColor = rgb;
        
        // Update code displays
        rgbCode.textContent = rgb;
        hexCode.textContent = hex;
        hslCode.textContent = hsl;
        cssVarCode.textContent = `--color-primary: ${rgb};`;
        
        // Update HSL sliders if they're not being actively changed
        if (!document.activeElement || 
            (document.activeElement !== hueSlider && 
             document.activeElement !== saturationSlider && 
             document.activeElement !== lightnessSlider)) {
            hue = h;
            saturation = s;
            lightness = l;
            updateHslSliders();
        }
        
        // Update HEX input if it's not being actively changed
        if (!document.activeElement || document.activeElement !== hexInput) {
            hexInput.value = hex;
        }
        
        // Update saturation and lightness slider backgrounds
        updateSliderBackgrounds();
    }

    // Update slider values
    function updateRgbSliders() {
        redSlider.value = red;
        greenSlider.value = green;
        blueSlider.value = blue;
        
        redValue.textContent = red;
        greenValue.textContent = green;
        blueValue.textContent = blue;
    }

    function updateHslSliders() {
        hueSlider.value = hue;
        saturationSlider.value = saturation;
        lightnessSlider.value = lightness;
        
        hueValue.textContent = hue;
        saturationValue.textContent = saturation;
        lightnessValue.textContent = lightness;
    }

    function updateSliderBackgrounds() {
        // Update saturation slider background based on current hue and lightness
        const hslBase = `hsl(${hue}, 0%, ${lightness}%)`;
        const hslFull = `hsl(${hue}, 100%, ${lightness}%)`;
        saturationSlider.style.background = `linear-gradient(to right, ${hslBase}, ${hslFull})`;
        
        // Update lightness slider background based on current hue and saturation
        const hslDark = `hsl(${hue}, ${saturation}%, 0%)`;
        const hslMid = `hsl(${hue}, ${saturation}%, 50%)`;
        const hslLight = `hsl(${hue}, ${saturation}%, 100%)`;
        lightnessSlider.style.background = `linear-gradient(to right, ${hslDark}, ${hslMid}, ${hslLight})`;
    }

    // Event listeners for RGB sliders
    redSlider.addEventListener('input', function() {
        red = parseInt(this.value);
        redValue.textContent = red;
        updateColor();
    });

    greenSlider.addEventListener('input', function() {
        green = parseInt(this.value);
        greenValue.textContent = green;
        updateColor();
    });

    blueSlider.addEventListener('input', function() {
        blue = parseInt(this.value);
        blueValue.textContent = blue;
        updateColor();
    });

    // Event listeners for HSL sliders
    hueSlider.addEventListener('input', function() {
        hue = parseInt(this.value);
        hueValue.textContent = hue;
        
        // Convert HSL to RGB
        [red, green, blue] = hslToRgb(hue, saturation, lightness);
        updateRgbSliders();
        updateColor();
    });

    saturationSlider.addEventListener('input', function() {
        saturation = parseInt(this.value);
        saturationValue.textContent = saturation;
        
        // Convert HSL to RGB
        [red, green, blue] = hslToRgb(hue, saturation, lightness);
        updateRgbSliders();
        updateColor();
    });

    lightnessSlider.addEventListener('input', function() {
        lightness = parseInt(this.value);
        lightnessValue.textContent = lightness;
        
        // Convert HSL to RGB
        [red, green, blue] = hslToRgb(hue, saturation, lightness);
        updateRgbSliders();
        updateColor();
    });

    // HEX input handling
    applyHex.addEventListener('click', function() {
        applyHexValue();
    });

    hexInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            applyHexValue();
        }
    });

    function applyHexValue() {
        let hexValue = hexInput.value.trim();
        
        // Add # if missing
        if (!hexValue.startsWith('#')) {
            hexValue = '#' + hexValue;
        }
        
        // Validate hex format
        const hexRegex = /^#([A-Fa-f0-9]{3}){1,2}$/;
        if (hexRegex.test(hexValue)) {
            [red, green, blue] = hexToRgb(hexValue);
            updateRgbSliders();
            updateColor();
        } else {
            // Invalid hex, reset to current color
            hexInput.value = rgbToHex(red, green, blue);
            alert('Please enter a valid HEX color code (e.g., #FF0000 or #F00)');
        }
    }

    // Random color generator
    randomColorBtn.addEventListener('click', function() {
        red = Math.floor(Math.random() * 256);
        green = Math.floor(Math.random() * 256);
        blue = Math.floor(Math.random() * 256);
        
        updateRgbSliders();
        updateColor();
    });

    // Reset color
    resetColorBtn.addEventListener('click', function() {
        red = 255;
        green = 0;
        blue = 0;
        
        updateRgbSliders();
        updateColor();
    });

    // Copy functions
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(function() {
            showCopyNotification();
        }).catch(function(err) {
            console.error('Could not copy text: ', err);
            alert('Failed to copy to clipboard. Please try again.');
        });
    }

    function showCopyNotification() {
        copyNotification.classList.add('show');
        setTimeout(function() {
            copyNotification.classList.remove('show');
        }, 2000);
    }

    copyRgbBtn.addEventListener('click', function() {
        copyToClipboard(rgbCode.textContent);
    });

    copyHexBtn.addEventListener('click', function() {
        copyToClipboard(hexCode.textContent);
    });

    copyHslBtn.addEventListener('click', function() {
        copyToClipboard(hslCode.textContent);
    });

    copyCssVarBtn.addEventListener('click', function() {
        copyToClipboard(cssVarCode.textContent);
    });

    copyAllBtn.addEventListener('click', function() {
        const allCodes = `RGB: ${rgbCode.textContent}\nHEX: ${hexCode.textContent}\nHSL: ${hslCode.textContent}\nCSS Variable: ${cssVarCode.textContent}`;
        copyToClipboard(allCodes);
    });

    // Color presets
    colorPresets.forEach(preset => {
        preset.addEventListener('click', function() {
            const rgbValues = this.getAttribute('data-rgb').split(',');
            red = parseInt(rgbValues[0]);
            green = parseInt(rgbValues[1]);
            blue = parseInt(rgbValues[2]);
            
            updateRgbSliders();
            updateColor();
        });
    });

    // Pattern colors
    patternColors.forEach(color => {
        color.addEventListener('click', function() {
            const style = window.getComputedStyle(this);
            const backgroundColor = style.backgroundColor;
            const rgbMatch = backgroundColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
            
            if (rgbMatch) {
                red = parseInt(rgbMatch[1]);
                green = parseInt(rgbMatch[2]);
                blue = parseInt(rgbMatch[3]);
                
                updateRgbSliders();
                updateColor();
            }
        });
    });

    // Category filter
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filter presets
            colorPresets.forEach(preset => {
                const presetCategories = preset.getAttribute('data-category').split(' ');
                if (presetCategories.includes(category) || category === 'all') {
                    preset.style.display = 'block';
                } else {
                    preset.style.display = 'none';
                }
            });
        });
    });

    // Initialize
    updateColor();
    updateRgbSliders();
    updateHslSliders();
    updateSliderBackgrounds();
});