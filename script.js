// 1. Select our parts
const inputField = document.getElementById('item-input');
const addButton = document.getElementById('add-button');
const shoppingList = document.getElementById('item-list');

// 2. Load saved items on start
document.addEventListener('DOMContentLoaded', getLocalItems);

addButton.addEventListener('click', addItem);

function addItem() {
    const itemText = inputField.value;
    if (itemText !== "") {
        createListItem(itemText);
        saveLocalItems(itemText);
        inputField.value = "";
    }
}

// 3. The Builder (Updated with Delete Button)
function createListItem(text) {
    const li = document.createElement('li');
    
    // Checkbox (The "Cross-out" sensor)
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', function() {
        if (this.checked) li.classList.add('completed');
        else li.classList.remove('completed');
    });

    // Delete Button (The "Remove" sensor)
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.style.marginLeft = '10px'; // Give it a little space
    deleteBtn.addEventListener('click', function() {
        li.remove(); // Remove from the screen
        removeLocalItems(text); // Remove from the "filing cabinet"
    });

    li.appendChild(checkbox);
    li.append(text);
    li.appendChild(deleteBtn); // Add the "X" to the list item
    shoppingList.appendChild(li);
}

// --- STORAGE ENGINES ---

function saveLocalItems(item) {
    let items = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
}

function getLocalItems() {
    let items = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    items.forEach(item => createListItem(item));
}

// NEW: This removes the item from the cabinet when you click "X"
function removeLocalItems(itemText) {
    let items = JSON.parse(localStorage.getItem('items'));
    // Filter out the item we want to delete
    items = items.filter(i => i !== itemText);
    localStorage.setItem('items', JSON.stringify(items));
}
