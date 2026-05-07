// 1. Find the parts of the machine
const inputField = document.getElementById('item-input');
const addButton = document.getElementById('add-button');
const shoppingList = document.querySelector('ul');

// 2. Tell the button what to do when clicked
addButton.addEventListener('click', function() {
    const itemText = inputField.value;

    if (itemText !== "") {
        // Create a new list item
        const li = document.createElement('li');
        li.textContent = itemText;

        // Add the item to the list
        shoppingList.appendChild(li);

        // Clear the box for the next item
        inputField.value = "";
    }
});
