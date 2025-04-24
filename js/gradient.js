// DOM elements
const gradientPreview = document.getElementById('gradient-preview');
const cssCode = document.getElementById('css-code');
const copyBtn = document.getElementById('copy-btn');
const randomGradientsContainer = document.getElementById('random-gradients');
const generateRandomBtn = document.getElementById('generate-random');
const colorInputsContainer = document.getElementById('color-inputs');
const color3Container = document.getElementById('color3-container');
const angleControl = document.getElementById('angle-control');
const radialShapeControl = document.getElementById('radial-shape-control');

// Gradient controls
const gradientType = document.getElementById('gradient-type');
const angle = document.getElementById('angle');
const angleValue = document.getElementById('angle-value');
const radialShape = document.getElementById('radial-shape');

// Color inputs
const color1 = document.getElementById('color1');
const color2 = document.getElementById('color2');
const color3 = document.getElementById('color3');
const color1Value = document.getElementById('color1-value');
const color2Value = document.getElementById('color2-value');
const color3Value = document.getElementById('color3-value');

// Color stops
const color1Stop = document.getElementById('color1-stop');
const color2Stop = document.getElementById('color2-stop');
const color3Stop = document.getElementById('color3-stop');
const color1StopValue = document.getElementById('color1-stop-value');
const color2StopValue = document.getElementById('color2-stop-value');
const color3StopValue = document.getElementById('color3-stop-value');

// Mode buttons
const modeButtons = document.querySelectorAll('.mode-btn');

// State
let currentMode = 2;

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    updateGradient();
    generateRandomGradients();
    setupEventListeners();
});

function setupEventListeners() {
    // Mode selection
    modeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentMode = parseInt(btn.dataset.mode);
            color3Container.style.display = currentMode === 3 ? 'block' : 'none';
            updateGradient();
        });
    });
    
    // Gradient type change
    gradientType.addEventListener('change', () => {
        const type = gradientType.value;
        angleControl.style.display = type === 'linear' ? 'block' : 'none';
        radialShapeControl.style.display = type === 'radial' ? 'block' : 'none';
        updateGradient();
    });
    
    // Angle change
    angle.addEventListener('input', () => {
        angleValue.textContent = angle.value;
        updateGradient();
    });
    
    // Radial shape change
    radialShape.addEventListener('change', updateGradient);
    
    // Color changes
    [color1, color2, color3].forEach((color, index) => {
        color.addEventListener('input', () => {
            document.getElementById(`color${index + 1}-value`).value = color.value;
            updateGradient();
        });
    });
    
    // Color value input changes
    [color1Value, color2Value, color3Value].forEach((colorValue, index) => {
        colorValue.addEventListener('input', () => {
            const colorInput = document.getElementById(`color${index + 1}`);
            if (isValidColor(colorValue.value)) {
                colorInput.value = colorValue.value;
                updateGradient();
            }
        });
    });
    
    // Color stop changes
    [color1Stop, color2Stop, color3Stop].forEach((stop, index) => {
        stop.addEventListener('input', () => {
            document.getElementById(`color${index + 1}-stop-value`).value = stop.value;
            updateGradient();
        });
    });
    
    // Color stop value input changes
    [color1StopValue, color2StopValue, color3StopValue].forEach((stopValue, index) => {
        stopValue.addEventListener('input', () => {
            const stopInput = document.getElementById(`color${index + 1}-stop`);
            stopInput.value = stopValue.value;
            updateGradient();
        });
    });
    
    // Copy button
    copyBtn.addEventListener('click', () => {
        const tempTextarea = document.createElement('textarea');
        tempTextarea.value = cssCode.textContent;
        document.body.appendChild(tempTextarea);
        tempTextarea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextarea);
        
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy';
        }, 2000);
    });
    
    // Generate random gradients
    generateRandomBtn.addEventListener('click', generateRandomGradients);
}

function updateGradient() {
    const type = gradientType.value;
    const colors = getColors();
    
    let gradientCSS = '';
    
    if (type === 'linear') {
        gradientCSS = `linear-gradient(${angle.value}deg, ${colors})`;
    } else if (type === 'radial') {
        gradientCSS = `radial-gradient(${radialShape.value}, ${colors})`;
    } else if (type === 'conic') {
        gradientCSS = `conic-gradient(from ${angle.value}deg, ${colors})`;
    }
    
    gradientPreview.style.background = gradientCSS;
    cssCode.textContent = `.element {\n  background: ${gradientCSS};\n}`;
}

function getColors() {
    const colors = [];
    
    // Always include the first two colors
    colors.push(`${color1.value} ${color1Stop.value}%`);
    colors.push(`${color2.value} ${color2Stop.value}%`);
    
    // Add third color if in 3-color mode
    if (currentMode === 3) {
        colors.push(`${color3.value} ${color3Stop.value}%`);
    }
    
    return colors.join(', ');
}

function generateRandomGradients() {
    // Clear existing gradients
    randomGradientsContainer.innerHTML = '';
    
    // Generate 6 random gradients
    for (let i = 0; i < 6; i++) {
        const randomGradient = generateRandomGradient();
        createRandomGradientCard(randomGradient);
    }
}

function generateRandomGradient() {
    const types = ['linear', 'radial', 'conic'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    const randomColor1 = getRandomColor();
    const randomColor2 = getRandomColor();
    const randomColor3 = getRandomColor();
    
    const randomAngle = Math.floor(Math.random() * 360);
    const useThreeColors = Math.random() > 0.5;
    
    const colors = useThreeColors ? 
        `${randomColor1}, ${randomColor2}, ${randomColor3}` : 
        `${randomColor1}, ${randomColor2}`;
    
    let gradientCSS = '';
    
    if (type === 'linear') {
        gradientCSS = `linear-gradient(${randomAngle}deg, ${colors})`;
    } else if (type === 'radial') {
        const shapes = ['circle', 'ellipse'];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        gradientCSS = `radial-gradient(${shape}, ${colors})`;
    } else if (type === 'conic') {
        gradientCSS = `conic-gradient(from ${randomAngle}deg, ${colors})`;
    }
    
    return {
        css: gradientCSS,
        colors: useThreeColors ? [randomColor1, randomColor2, randomColor3] : [randomColor1, randomColor2],
        type: type,
        angle: randomAngle
    };
}

function createRandomGradientCard(gradient) {
    const card = document.createElement('div');
    card.className = 'gradient-card';
    card.style.background = gradient.css;
    
    const info = document.createElement('div');
    info.className = 'gradient-info';
    
    const colorText = gradient.colors.join(' → ');
    info.textContent = colorText;
    
    card.appendChild(info);
    
    card.addEventListener('click', () => {
        // Set the gradient generator to match this gradient
        gradientType.value = gradient.type;
        
        if (gradient.type === 'linear' || gradient.type === 'conic') {
            angle.value = gradient.angle;
            angleValue.textContent = gradient.angle;
            angleControl.style.display = 'block';
            radialShapeControl.style.display = 'none';
        } else if (gradient.type === 'radial') {
            // For radial gradients, we can't easily determine the shape from the CSS
            angleControl.style.display = 'none';
            radialShapeControl.style.display = 'block';
        }
        
        // Set colors
        color1.value = gradient.colors[0];
        color1Value.value = gradient.colors[0];
        color2.value = gradient.colors[1];
        color2Value.value = gradient.colors[1];
        
        if (gradient.colors.length > 2) {
            color3.value = gradient.colors[2];
            color3Value.value = gradient.colors[2];
            // Switch to 3-color mode
            modeButtons[1].click();
        } else {
            // Switch to 2-color mode
            modeButtons[0].click();
        }
        
        // Update the gradient preview
        updateGradient();
        
        // Scroll to the generator section
        document.getElementById('generator').scrollIntoView({ behavior: 'smooth' });
    });
    
    randomGradientsContainer.appendChild(card);
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function isValidColor(color) {
    // Simple regex to check if the color is a valid hex color
    return /^#[0-9A-F]{6}$/i.test(color);
}