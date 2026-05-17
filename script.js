const inputField = document.getElementById('item-input');
const addButton = document.getElementById('add-button');
const shoppingList = document.getElementById('item-list');

// Select our new calculator elements
const subtotalDisplay = document.getElementById('subtotal-val');
const taxDisplay = document.getElementById('tax-val');
const totalDisplay = document.getElementById('total-val');

document.addEventListener('DOMContentLoaded', getLocalItems);
addButton.addEventListener('click', addItem);

function addItem() {
    const itemText = inputField.value;
    if (itemText !== "") {
        createListItem(itemText, 0); // Default price to 0 initially
        saveLocalItems(itemText, 0);
        inputField.value = "";    
    }
}

function createListItem(text, savedPrice = 0) {
    const li = document.createElement('li');
    
    // Checkbox (Cross-out)
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'item-checkbox';
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            li.classList.add('completed');
        } else {
            li.classList.remove('completed');
        }
    });

    // Item text label
    const textSpan = document.createElement('span');
    textSpan.textContent = text;
    textSpan.className = 'item-text';

    // NEW: Price Input Box for this specific item
    const priceInput = document.createElement('input');
    priceInput.type = 'number';
    priceInput.placeholder = '$0.00';
    priceInput.value = savedPrice > 0 ? savedPrice : '';
    priceInput.className = 'price-input';
    priceInput.min = "0";
    priceInput.step = "0.01";
    
    // Automatically recalculate everything whenever a price changes
    priceInput.addEventListener('input', calculateTotals);

    // Delete Button (X)
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', function() {
        li.remove();          
        removeLocalItems(text); 
        calculateTotals(); // Recalculate when an item is removed
    });

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(priceInput);
    li.appendChild(deleteBtn);
    shoppingList.appendChild(li);
    
    calculateTotals();
}

// NEW: The Core Calculator Logic
function calculateTotals() {
    let subtotal = 0;
    const allPriceInputs = document.querySelectorAll('.price-input');
    
    // Sum up all the valid prices entered by the user
    allPriceInputs.forEach(input => {
        const val = parseFloat(input.value);
        if (!isNaN(val) && val > 0) {
            subtotal += val;
        }
    });

    // Michigan sales tax formula: 6%
    const michiganTax = subtotal * 0.06;
    const finalTotal = subtotal + michiganTax;

    // Update the screen, locked to exactly two decimal places for currency
    subtotalDisplay.textContent = subtotal.toFixed(2);
    taxDisplay.textContent = michiganTax.toFixed(2);
    totalDisplay.textContent = finalTotal.toFixed(2);
}

// --- STORAGE ENGINES (Updated to remember prices too!) ---

function saveLocalItems(item, price) {
    let items = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    // Save as an object containing both the name and the price
    items.push({ name: item, price: price });
    localStorage.setItem('items', JSON.stringify(items));
}

function getLocalItems() {
    let items = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    items.forEach(item => {
        // Handle older format vs new object format gracefully
        if (typeof item === 'object') {
            createListItem(item.name, item.price);
        } else {
            createListItem(item, 0);
        }
    });
}

function removeLocalItems(itemText) {
    let items = JSON.parse(localStorage.getItem('items'));
    items = items.filter(i => (typeof i === 'object' ? i.name : i) !== itemText);
    localStorage.setItem('items', JSON.stringify(items));
}
