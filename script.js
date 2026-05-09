// 1. Select the parts of the app we need to control
const inputField = document.getElementById('item-input');
const addButton = document.getElementById('add-button');
const shoppingList = document.getElementById('item-list');

// EVENT: When the page first loads, grab any saved data from the browser
document.addEventListener('DOMContentLoaded', getLocalItems);

// EVENT: When the "Add Item" button is clicked, run the addItem function
addButton.addEventListener('click', addItem);

function addItem() {
    const itemText = inputField.value;
    if (itemText !== "") {
        createListItem(itemText);
        saveLocalItems(itemText); // Logic to save the item permanently
        inputField.value = "";    // Clear the box for the next entry
    }
}

// THE BUILDER: This function creates the HTML elements from scratch
function createListItem(text) {
    const li = document.createElement('li');
    
    // Create Checkbox (The "Cross-out" feature)
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            li.classList.add('completed');
        } else {
            li.classList.remove('completed');
        }
    });

    // Create Delete Button (The "X" button)
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.style.marginLeft = '10px';
    
    // EVENT: Remove the item from the screen AND the browser storage
    deleteBtn.addEventListener('click', function() {
        li.remove();          // Remove the visual element from the screen
        removeLocalItems(text); // Remove the specific text from storage
    });

    li.appendChild(checkbox);
    li.append(text);
    li.appendChild(deleteBtn);
    shoppingList.appendChild(li);
}

// --- STORAGE ENGINES (The "Filing Cabinet" Logic) ---

function saveLocalItems(item) {
    let items = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    items.push(item);
    // REMEMBER: LocalStorage only accepts strings (Plain Text)!
    localStorage.setItem('items', JSON.stringify(items));
}

function getLocalItems() {
    let items = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    items.forEach(item => createListItem(item));
}

// THE REMOVER: This cleans up our filing cabinet
function removeLocalItems(itemText) {
    let items = JSON.parse(localStorage.getItem('items'));
    // Use .filter to keep everything EXCEPT the item we just deleted
    items = items.filter(i => i !== itemText);
    localStorage.setItem('items', JSON.stringify(items));
}
