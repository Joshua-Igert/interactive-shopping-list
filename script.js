const inputField = document.getElementById('item-input');
const addButton = document.getElementById('add-button');
const shoppingList = document.getElementById('item-list');

// 1. Load saved items when the page starts
document.addEventListener('DOMContentLoaded', getLocalItems);

addButton.addEventListener('click', addItem);

function addItem() {
    const itemText = inputField.value;
    if (itemText !== "") {
        createListItem(itemText);
        saveLocalItems(itemText); // Save to the "filing cabinet"
        inputField.value = "";
    }
}

function createListItem(text) {
    const li = document.createElement('li');
    
    // Create the checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    
    // Add event to cross out item
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            li.classList.add('completed');
        } else {
            li.classList.remove('completed');
        }
    });

    li.appendChild(checkbox);
    li.append(text); // Add the item text after the box
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
