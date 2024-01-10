let gridNumber = 16;

function darkenColor(color, percentage) {
    // Ensure the percentage is within the valid range (0-100)
    if (percentage < 0 || percentage > 100) {
      throw new Error("Percentage should be between 0 and 100.");
    }
  
    // Parse the input color string
    const hexRegex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
    if (!hexRegex.test(color)) {
      throw new Error("Invalid color format. Please provide a valid hex color.");
    }
  
    // Remove the '#' symbol if it exists
    color = color.replace(/^#/, '');
  
    // If the color is in the short format, expand it to the long format
    if (color.length === 3) {
      color = color
        .split('')
        .map(char => char + char)
        .join('');
    }
  
    // Convert the color to its RGB components
    const red = parseInt(color.substring(0, 2), 16);
    const green = parseInt(color.substring(2, 4), 16);
    const blue = parseInt(color.substring(4, 6), 16);
  
    // Darken the color by the specified percentage
    const darkenedRed = Math.round(red * (1 - percentage / 100));
    const darkenedGreen = Math.round(green * (1 - percentage / 100));
    const darkenedBlue = Math.round(blue * (1 - percentage / 100));
  
    // Convert the darkened RGB components back to hex format
    const darkenedColor = `#${darkenedRed.toString(16)}${darkenedGreen.toString(16)}${darkenedBlue.toString(16)}`;
  
    return darkenedColor;
  }

function changeColor(element) {
    console.log(element)
    console.log(element.target.backgroundColor)
    // save the current brightness of the color
    // let brightness = element.target.style.backgroundColor;
    // randomize a color that is 10% darker than the current color
    
    if (element.target.style.backgroundColor == "black" || element.target.style.backgroundColor == "") {
        randomColor = Math.floor(Math.random() * 16777215).toString(16);
        element.target.style.backgroundColor = `#${randomColor}`;
    }
    else {
        // convert color to hex
        hexColor = element.target.style.backgroundColor;
        // darken the color by 10% relative to the current color
        darkenColor(element.target.style.backgroundColor, 10);
    }


}

function changeGrid() {
    gridNumber = prompt("Enter a number between 1 and 100");
    createGrid();
}

// create gridNumber * gridNumber divs in a grid, each with a class of "grid-item", under div "grid-container"
function createGrid() {
    gridContainer = document.querySelector("#grid-container");
    // delete all divs under gridContainer
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
    for (let i = 0; i < gridNumber; i++) {
        // create gridNumber rows 
        let gridRowDiv = document.createElement("div");
        gridRowDiv.classList.add("grid-row");

        for (let j = 0; j < gridNumber; j++) {
            let gridItem = document.createElement("div");
            gridItem.classList.add("grid-item");
            gridItem.style.width = `${100 / gridNumber}%`;
            gridItem.style.height = `${100 / gridNumber}%`;
            gridItem.addEventListener("mouseover", changeColor);
            gridRowDiv.appendChild(gridItem);
        }
        gridContainer.appendChild(gridRowDiv);
    }
}

createGrid();

document.querySelector("#changeGrid").addEventListener("click", changeGrid);