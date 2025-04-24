// DOM Elements
const colorPreview = document.getElementById('colorPreview');
const rgbaCode = document.getElementById('rgbaCode');
const hexCode = document.getElementById('hexCode');
const cssVarCode = document.getElementById('cssVarCode');
const redSlider = document.getElementById('redSlider');
const greenSlider = document.getElementById('greenSlider');
const blueSlider = document.getElementById('blueSlider');
const alphaSlider = document.getElementById('alphaSlider');
const redValue = document.getElementById('redValue');
const greenValue = document.getElementById('greenValue');
const blueValue = document.getElementById('blueValue');
const alphaValue = document.getElementById('alphaValue');
const randomColorBtn = document.getElementById('randomColor');
const copyAllBtn = document.getElementById('copyAll');
const resetColorBtn = document.getElementById('resetColor');
const copyRgbaBtn = document.getElementById('copyRgba');
const copyHexBtn = document.getElementById('copyHex');
const copyCssVarBtn = document.getElementById('copyCssVar');
const copyNotification = document.getElementById('copyNotification');
const presetContainer = document.getElementById('presetContainer');
const categoryBtns = document.querySelectorAll('.category-btn');
const colorPresets = document.querySelectorAll('.color-preset');
const patternColors = document.querySelectorAll('.pattern-color');

// Initial color values
let red = 255;
let green = 0;
let blue = 0;
let alpha = 0.8;

// Update color preview and codes
function updateColor() {
    const rgba = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    colorPreview.style.backgroundColor = rgba;
    
    // Update RGBA code
    rgbaCode.textContent = rgba;
    
    // Update HEX code with alpha
    const hexR = red.toString(16).padStart(2, '0').toUpperCase();
    const hexG = green.toString(16).padStart(2, '0').toUpperCase();
    const hexB = blue.toString(16).padStart(2, '0').toUpperCase();
    const hexA = Math.round(alpha * 255).toString(16).padStart(2, '0').toUpperCase();
    hexCode.textContent = `#${hexR}${hexG}${hexB}${hexA}`;
    
    // Update CSS variable
    cssVarCode.textContent = `--color-primary: ${rgba};`;
    
    // Update alpha slider background
    alphaSlider.style.background = `linear-gradient(to right, rgba(${red}, ${green}, ${blue}, 0), rgba(${red}, ${green}, ${blue}, 1))`;
}

// Update slider values
function updateSliders() {
    redSlider.value = red;
    greenSlider.value = green;
    blueSlider.value = blue;
    alphaSlider.value = alpha;
    
    redValue.textContent = red;
    greenValue.textContent = green;
    blueValue.textContent = blue;
    alphaValue.textContent = alpha.toFixed(2);
}

// Event listeners for sliders
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

alphaSlider.addEventListener('input', function() {
    alpha = parseFloat(this.value);
    alphaValue.textContent = alpha.toFixed(2);
    updateColor();
});

// Random color generator
randomColorBtn.addEventListener('click', function() {
    red = Math.floor(Math.random() * 256);
    green = Math.floor(Math.random() * 256);
    blue = Math.floor(Math.random() * 256);
    alpha = Math.round(Math.random() * 100) / 100;
    
    updateSliders();
    updateColor();
});

// Reset color
resetColorBtn.addEventListener('click', function() {
    red = 255;
    green = 0;
    blue = 0;
    alpha = 0.8;
    
    updateSliders();
    updateColor();
});

// Copy functions
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        showCopyNotification();
    });
}

function showCopyNotification() {
    copyNotification.classList.add('show');
    setTimeout(function() {
        copyNotification.classList.remove('show');
    }, 2000);
}

copyRgbaBtn.addEventListener('click', function() {
    copyToClipboard(rgbaCode.textContent);
});

copyHexBtn.addEventListener('click', function() {
    copyToClipboard(hexCode.textContent);
});

copyCssVarBtn.addEventListener('click', function() {
    copyToClipboard(cssVarCode.textContent);
});

copyAllBtn.addEventListener('click', function() {
    const allCodes = `RGBA: ${rgbaCode.textContent}\nHEX: ${hexCode.textContent}\nCSS Variable: ${cssVarCode.textContent}`;
    copyToClipboard(allCodes);
});

// Color presets
colorPresets.forEach(preset => {
    preset.addEventListener('click', function() {
        const rgbaValues = this.getAttribute('data-rgba').split(',');
        red = parseInt(rgbaValues[0]);
        green = parseInt(rgbaValues[1]);
        blue = parseInt(rgbaValues[2]);
        alpha = parseFloat(rgbaValues[3]);
        
        updateSliders();
        updateColor();
    });
});

// Pattern colors
patternColors.forEach(color => {
    color.addEventListener('click', function() {
        const style = window.getComputedStyle(this);
        const backgroundColor = style.backgroundColor;
        const rgbaMatch = backgroundColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)/);
        
        if (rgbaMatch) {
            red = parseInt(rgbaMatch[1]);
            green = parseInt(rgbaMatch[2]);
            blue = parseInt(rgbaMatch[3]);
            alpha = rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1;
            
            updateSliders();
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
updateSliders();
        