// Get the necessary elements
const rewardInput = document.getElementById('rewardInput');
const addBtn = document.getElementById('addBtn');
const pickBtn = document.getElementById('pickBtn');
const clearBtn = document.getElementById('clearBtn');
const removeLastBtn = document.getElementById('removeLastBtn');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const importFileBtn = document.getElementById('importFileBtn');
const itemList = document.getElementById('itemList');
const resultText = document.getElementById('resultText');

// Array to store rewards/punishments
let items = [];

// Function to add a new reward/punishment to the list
function addItem() {
    const newItem = rewardInput.value.trim();
    if (newItem !== "") {
        items.push(newItem);
        rewardInput.value = ''; // Clear input after adding
        updateItemList(); // Update the displayed list
    }
}

// Function to update the item list in the DOM
function updateItemList() {
    itemList.innerHTML = ''; // Clear current list

    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('list-item');
        li.textContent = item;
        itemList.appendChild(li);
    });
}

// Function to pick a random item and display it
function pickRandomItem() {
    if (items.length > 0) {
        const randomIndex = Math.floor(Math.random() * items.length);

        // Remove previous random class
        const listItems = document.querySelectorAll('.list-item');
        listItems.forEach(item => item.classList.remove('random-item'));

        // Add random class to the selected item
        listItems[randomIndex].classList.add('random-item');

        // Show result text
        resultText.textContent = ` ${items[randomIndex]} has been chosen`;
        resultText.style.opacity = 1;

        // Fade out result after 3 seconds
        setTimeout(() => {
            resultText.style.opacity = 0;
        }, 3000);
    } else {
        alert('Please add some rewards or punishments first!');
    }
}

// Function to clear the item list
function clearList() {
    items = [];
    updateItemList(); // Re-render the list as empty
}

// Function to remove the last item from the list
function removeLastItem() {
    items.pop();
    updateItemList(); // Re-render the list without the last item
}

// Function to export the list to a file
function exportList() {
    const blob = new Blob([JSON.stringify(items)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'reward_list.json';
    link.click();
}

// Function to import a list from a file
function importList(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const importedData = JSON.parse(e.target.result);
            if (Array.isArray(importedData)) {
                items = importedData;
                updateItemList(); // Re-render the list with the imported data
            } else {
                alert('Invalid file format. Please upload a valid JSON file.');
            }
        };
        reader.readAsText(file);
    }
}

// Event listeners
addBtn.addEventListener('click', addItem);
rewardInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addItem();
    }
});
pickBtn.addEventListener('click', pickRandomItem);
clearBtn.addEventListener('click', clearList);
removeLastBtn.addEventListener('click', removeLastItem);
exportBtn.addEventListener('click', exportList);

// Show import file dialog when "Import List" is clicked
importFileBtn.addEventListener('click', function() {
    importBtn.click();
});

// When a file is selected, call importList
importBtn.addEventListener('change', importList);

// Initial setup for the import file input
importBtn.accept = '.json'; // Allow only JSON files
