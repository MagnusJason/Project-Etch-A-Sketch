// Default grid size
let gridSize = 16;

// Generate random RGB color (excluding white)
function getRandomRGB() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    
    // Ensure at least one value is less than 255 to exclude white
    if (r === 255 && g === 255 && b === 255) {
        // If all are 255, randomly set one to a lower value
        const randomIndex = Math.floor(Math.random() * 3);
        if (randomIndex === 0) r = Math.floor(Math.random() * 255);
        else if (randomIndex === 1) g = Math.floor(Math.random() * 255);
        else b = Math.floor(Math.random() * 255);
    }
    
    return { r, g, b };
}

// Create the grid
function createGrid(size) {
    const gridContainer = document.getElementById('gridContainer');
    
    // Clear existing grid
    gridContainer.innerHTML = '';
    
    // Calculate square size to perfectly fill the 960px container
    const squareSize = 960 / size;
    
    // Create squares
    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.className = 'grid-square';
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        
        // Initialize opacity tracking (starts at 0, will be 0.1 on first hover)
        let currentOpacity = 0;
        let squareColor = null;
        
        // Add hover effect with progressive darkening
        square.addEventListener('mouseenter', function() {
            // Generate random color on first interaction
            if (!squareColor) {
                const rgb = getRandomRGB();
                squareColor = rgb;
            }
            
            // Increase opacity by 10% (0.1) each interaction, capped at 1.0
            if (currentOpacity < 1.0) {
                currentOpacity = Math.min(currentOpacity + 0.1, 1.0);
                this.style.backgroundColor = `rgba(${squareColor.r}, ${squareColor.g}, ${squareColor.b}, ${currentOpacity})`;
            }
        });
        
        gridContainer.appendChild(square);
    }
}

// Handle new grid button click
document.getElementById('newGridBtn').addEventListener('click', function() {
    let newSize = prompt('Enter the number of squares per side (max 100):');
    
    // Validate input
    newSize = parseInt(newSize);
    
    if (isNaN(newSize) || newSize < 1) {
        alert('Please enter a valid number greater than 0.');
        return;
    }
    
    if (newSize > 100) {
        alert('Maximum size is 100. Please enter a number between 1 and 100.');
        return;
    }
    
    gridSize = newSize;
    createGrid(gridSize);
});

// Initialize grid on page load
createGrid(gridSize);

