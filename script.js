// Default grid size
let gridSize = 16;

// Create the grid
function createGrid(size) {
    const gridContainer = document.getElementById('gridContainer');
    
    // Clear existing grid
    gridContainer.innerHTML = '';
    
    // Calculate square size (960px total width)
    // With box-sizing: border-box, borders are included in the width
    // Each square has 1px border on each side, so we subtract 2px per square
    const squareSize = (960 / size) - 2;
    
    // Create squares
    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.className = 'grid-square';
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        
        // Add hover effect
        square.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#333';
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

