// 1. Global state object to store user's current selections
const userSelections = {
    temperature: null,
    sweetness: null,
    flavour: null
};

/**
 * Handles selecting an option for a question category
 * @param {string} category - 'temperature', 'sweetness', or 'flavour'
 * @param {string} value - The option value selected (e.g., 'hot', 'less', 'coffee')
 * @param {HTMLElement} element - The specific button element clicked
 */
function chooseAnswer(category, value, element) {
    // Save the selected value to state
    userSelections[category] = value;

    // Get all sibling buttons within the immediate question area
    const parentContainer = element.parentNode;
    const siblingButtons = parentContainer.querySelectorAll('button');

    // Remove active '.selected' class from all sibling buttons
    siblingButtons.forEach(button => {
        button.classList.remove('selected');
    });

    // Add active '.selected' class to the freshly clicked button
    element.classList.add('selected');
}

/**
 * Calculates and prints the result inside the #drinkResult element
 */
function findMyDrink() {
    const resultDiv = document.getElementById('drinkResult');

    // Validation: Check if the user missed any questions
    if (!userSelections.temperature || !userSelections.sweetness || !userSelections.flavour) {
        resultDiv.className = ""; // Clear existing styling classes
        resultDiv.style.color = "#cc0000"; // Red text alert color
        resultDiv.innerHTML = "⚠️ Please answer all questions to find your perfect drink!";
        return;
    }

    let recommendedDrink = "";

    // Recommendation logic matching matrix paths
    if (userSelections.flavour === 'coffee') {
        if (userSelections.temperature === 'hot') {
            recommendedDrink = userSelections.sweetness === 'sweet' 
                ? "☕ Creamy Vanilla Latte" 
                : "☕ Classic Hot Americano";
        } else { // cold
            recommendedDrink = userSelections.sweetness === 'sweet' 
                ? "🧋 Sweet Caramel Iced Coffee" 
                : "🥤 Cold Brew Coffee";
        }
    } else if (userSelections.flavour === 'chocolate') {
        if (userSelections.temperature === 'hot') {
            recommendedDrink = userSelections.sweetness === 'sweet' 
                ? "🍫 Rich Hot Chocolate with Marshmallows" 
                : "☕ Dark Hot Cocoa";
        } else { // cold
            recommendedDrink = userSelections.sweetness === 'sweet' 
                ? "🥤 Thick Chocolate Milkshake" 
                : "🧋 Iced Dark Chocolate Frappé";
        }
    }

    // Apply success styles from CSS and inject the result text string
    resultDiv.style.color = ""; // Clear validation red color
    resultDiv.className = "result-show";
    resultDiv.innerHTML = `✨ Your perfect drink matches: <strong>${recommendedDrink}</strong>!`;
}

/* =========================
   ORDER ONLINE
   ========================= */

let order = [];


function addToOrder(item, price) {

    order.push({
        item: item,
        price: price
    });

    updateOrder();

}


function updateOrder() {

    const orderList =
        document.getElementById("order-list");

    const orderTotal =
        document.getElementById("order-total");


    orderList.innerHTML = "";

    let total = 0;


    order.forEach(function(product, index) {

        const p =
            document.createElement("p");


        p.textContent =
            product.item +
            " - ₹" +
            product.price;


        const removeButton =
            document.createElement("button");


        removeButton.textContent =
            "Remove";


        removeButton.onclick =
            function() {

                order.splice(index, 1);

                updateOrder();

            };


        p.appendChild(removeButton);

        orderList.appendChild(p);


        total =
            total + product.price;

    });


    orderTotal.textContent =
        total;

}


/* =========================
   PAYMENT
   ========================= */

function goToPayment() {

    window.location.href =
        "#payment";

}


function payWithUPI() {

    alert(
        "UPI payment selected. Please complete your payment."
    );

}


function payWithCash() {

    alert(
        "Cash payment selected. You can pay when you receive your order."
    );

}


/* =========================
   TRACK ORDER
   ========================= */

function trackOrder() {

    const result =
        document.getElementById("trackingResult");


    result.innerHTML = `
        <h3>Order Status</h3>

        <p>✅ Order Confirmed</p>

        <p>👨‍🍳 Preparing your order</p>

        <p>🚚 Your order is on the way!</p>
    `;

}


/* =========================
   BOOK A TABLE
   ========================= */

function bookTable() {

    const name =
        document.getElementById("customerName").value;

    const date =
        document.getElementById("bookingDate").value;

    const time =
        document.getElementById("bookingTime").value;

    const guests =
        document.getElementById("guests").value;

    const result =
        document.getElementById("bookingResult");


    if (
        name === "" ||
        date === "" ||
        time === "" ||
        guests === ""
    ) {

        result.textContent =
            "Please fill in all the details.";

        return;

    }


    result.innerHTML = `
        <h3>✅ Table Booked!</h3>

        <p>Thank you, ${name}.</p>

        <p>
            Your table for ${guests} guest(s)
            is booked for ${date} at ${time}.
        </p>
    `;

}