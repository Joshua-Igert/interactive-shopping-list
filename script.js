// Select the HTML elements we need to work with
const inputField = document.getElementById('item-input');
const addButton = document.getElementById('add-button');
const shoppingList = document.getElementById('item-list');

// EVENT: As soon as the page loads, try to grab saved items from the browser
document.addEventListener('DOMContentLoaded', getLocalItems);

// EVENT: Run the addItem function when the user clicks the button
addButton.addEventListener('click', addItem);

function addItem() {
    const itemText = inputField.value;
    if (itemText !== "") {
        createListItem(itemText); // Put it on the screen
        saveLocalItems(itemText); // Save it to the browser's "filing cabinet"
        inputField.value = "";    // Clear the input box
    }
}

// This function builds the HTML "bones" for each list item
function createListItem(text) {
    const li = document.createElement('li');
    
    // Create a checkbox so the user can mark items as "got it"
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    
    // Listen for the checkbox to be checked/unchecked
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            li.classList.add('completed'); // Adds the line-through style from CSS
        } else {
            li.classList.remove('completed'); // Removes the line-through
        }
    });

    li.appendChild(checkbox); // Put the checkbox inside the <li>
    li.append(text);          // Put the text inside the <li>
    shoppingList.appendChild(li); // Stick the whole <li> into the main list
}

// --- PERSISTENCE (Saving the data) ---

// This saves our items so they don't disappear on refresh
function saveLocalItems(item) {
    let items;
    // Check if we already have a list in the "filing cabinet"
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
}

// This grabs the list from the "cabinet" and puts it back on the screen
function getLocalItems() {
    let items;
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    // For every item found in storage, run the "Builder" function
    items.forEach(function(item) {
        createListItem(item);
    });
}
