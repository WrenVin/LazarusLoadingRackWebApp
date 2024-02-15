function displayOrders(data) {
    const orderContainer = document.querySelector('.order-cards');
    let prevCard = null;
    orderContainer.innerHTML = '';

    data.forEach(order => {
        const card = document.createElement('div');
        card.className = 'card';

        const customer = document.createElement('h3');
      customer.textContent = `${order.CUSTOMER}`;
      
      const product = document.createElement('p');
      product.textContent = `Product: ${order.PRODUCT}`;

      scheduleddate = document.createElement('p');
      scheduleddate.textContent = `Scheduled Date: ${order.Scheduled_Date}`;

      driver = document.createElement('p');
      driver.textContent = `Driver: ${order.DRIVER_NAME}`;

      time = document.createElement('p');
      time.textContent = `Scheduled Time: ${order.Schedule_Time}`;
      loads = document.createElement('p');
      loads.textContent = `Loads: ${order.Loads}`;
      destination = document.createElement('p');
      destination.textContent = `Destination: ${order.DESTINATION}`;
      trailer = document.createElement('p');
      trailer.textContent = `Trailer: ${order.TRAILER}`;

      card.setAttribute('data-customer', order.CUSTOMER);
      card.setAttribute('data-product', order.PRODUCT);
      card.setAttribute('data-scheduleddate', order.Scheduled_Date);
      card.setAttribute('data-driver', order.DRIVER_NAME);
      card.setAttribute('data-time', order.Schedule_Time);
      card.setAttribute('data-loads', order.Loads);
      card.setAttribute('data-destination', order.DESTINATION);
      card.setAttribute('data-trailer', order.TRAILER);
      card.appendChild(customer);
      card.appendChild(product);
      card.appendChild(scheduleddate);
      card.appendChild(driver);
      card.appendChild(time);
      card.appendChild(loads);
      card.appendChild(destination);
      card.appendChild(trailer);
      orderContainer.appendChild(card);
      
        card.addEventListener('click', () => {
          const previouslySelectedCard = document.querySelector('.card.selected');
            if (previouslySelectedCard) {
                previouslySelectedCard.classList.remove('selected');
            }

    // Add 'selected' class to the currently clicked card
    card.classList.add('selected');
        if (prevCard === card) {
          // Deselect the card
          document.getElementById("selector").innerText = 
            "Customer: " + "\n" +
            "Product: " + "\n" +
            "Scheduled Date: " + "\n" +
            "Driver: " + "\n" +
            "Scheduled Time: " + "\n" +
            "Loads: " + "\n" +
            "Destination: " + "\n" +
            "Trailer: ";
          document.getElementById("selectorArea").style.backgroundColor = "white";
          card.style.backgroundColor = "white";
          card.style.transform = "scale(1)";
          prevCard = null;
        } else {
          document.getElementById("selector").innerText = 
            "Customer: " + order.CUSTOMER + "\n" +
            "Product: " + order.PRODUCT + "\n" +
            "Scheduled Date: " + order.Scheduled_Date + "\n" +
            "Driver: " + order.DRIVER_NAME + "\n" +
            "Scheduled Time: " + order.Schedule_Time + "\n" +
            "Loads: " + order.Loads + "\n" +
            "Destination: " + order.DESTINATION + "\n" +
            "Trailer: " + order.TRAILER;
          document.getElementById("selectorArea").style.backgroundColor = "#96bcd9";
          if (prevCard) {
            prevCard.style.transform = "scale(1)";
            prevCard.style.backgroundColor = "white";
          }
          card.style.backgroundColor = "#96bcd9";
          card.style.transform = "scale(1.03)";
          prevCard = card;
        }
      });
    })

}



fetch('/api/readsheet')
  .then(response => response.json())
  .then(data => {
    //console.log(data);
      displayOrders(data);
  })
  .catch(error => console.error('Error:', error));


document.getElementById('sortSelect').addEventListener('change', function() {
    var sortValue = this.value;
    var cards = document.getElementsByClassName('card');
    var cardsArray = Array.prototype.slice.call(cards);

    cardsArray.sort(function(a, b) {
        var aValue, bValue;

        switch (sortValue) {
            case 'date':
                aValue = new Date(a.getAttribute('data-scheduledate'));
                bValue = new Date(b.getAttribute('data-scheduledate'));
                break;
            case 'customer':
                aValue = a.getAttribute('data-customer');
                bValue = b.getAttribute('data-customer');
                break;
            case 'product':
                aValue = a.getAttribute('data-product');
                bValue = b.getAttribute('data-product');
            break;
            case 'driver':
                aValue = a.getAttaribute('data-driver');
            bValue = b.getAttribute('data-driver');
            break;
            case 'time':
                aValue = a.getAttribute('data-time');
                bValue = b.getAttribute('data-time');
            break;
            case 'loads':
                aValue = a.getAttribute('data-loads');
            bValue = b.getAttribute('data-loads');
            break;
            case 'destination':
            aValue = a.getAttribute('data-destination');
            bValue = b.getAttribute('data-destination');
            break;
          case 'trailer':
            aValue = a.getAttribute('data-trailer');
            bValue = b.getAttribute('data-trailer');
            break;
        }

        if (aValue < bValue) {
            return -1;
        } else if (aValue > bValue) {
            return 1;
        } else {
            return 0;
        }
    });

    var container = document.querySelector('.order-cards');
    cardsArray.forEach(function(card) {
        container.appendChild(card);
    });
});


document.getElementById('reverse').addEventListener('click', function() {
    //reverse = !reverse;
    var cards = document.getElementsByClassName('card');
    var cardsArray = Array.prototype.slice.call(cards);

    
        cardsArray.reverse();
    

    var container = document.querySelector('.order-cards');
    cardsArray.forEach(function(card) {
        container.appendChild(card);
    });
});

// Get the filter buttons
// Get the filter buttons
const applyFiltersButton = document.getElementById('filterButton');
const resetButton = document.getElementById('resetButton');

// Add event listener to the "Apply Filters" button
// Function to handle filtering
function filterCards() {
    const filters = Array.from(document.querySelectorAll('.filterGroup .filterItem input[type="text"]'))
        .filter(input => input.value.trim() !== '') // Consider only non-empty inputs
        .map(input => {
            const filterFeature = input.id.replace('Input', '').toLowerCase(); // Adjust the feature name
            const filterText = input.value.trim();
            return { filterFeature, filterText };
        });

    const cards = document.querySelectorAll('.order-cards .card');
    cards.forEach(card => {
        const match = filters.every(({ filterFeature, filterText }) => {
            const attributeValue = card.getAttribute(`data-${filterFeature}`);
            // Special handling for dates
            if (filterFeature === 'scheduleddate') {
                if (!attributeValue) return false; // Skip comparison if date is missing
                
                return attributeValue.includes(filterText);
            } else {
                // Use toLowerCase for non-date attributes, ensuring attributeValue is not null
                return attributeValue ? attributeValue.toLowerCase().includes(filterText.toLowerCase()) : false;
            }
        });
        card.style.display = match ? '' : 'none';
    });
}

// Attach the input event listener to each filter input
document.querySelectorAll('.filterGroup .filterItem input[type="text"]').forEach(input => {
    input.addEventListener('input', filterCards);
});


// Add event listener to the "Reset" button
// Function to reset filters and show all cards
function resetFilters() {
    // Clear the filter text inputs
    document.querySelectorAll('.filterGroup .filterItem input[type="text"]').forEach(input => {
        input.value = ''; // Clear the value
    });

    // Display all cards
    const cards = document.querySelectorAll('.order-cards .card');
    cards.forEach(card => {
        card.style.display = ''; // Reset to default display
    });

    
}

document.getElementById('submit').addEventListener('click', function() {
    // Capture selected order details
    const selectedOrderElement = document.querySelector('.card.selected');
    const orderDetails = selectedOrderElement ? {
        scheduledDate: selectedOrderElement.getAttribute('data-scheduleddate'),
        product: selectedOrderElement.getAttribute('data-product'),
        customer: selectedOrderElement.getAttribute('data-customer'),
        loads: selectedOrderElement.getAttribute('data-loads'),
    } : null;

    // Capture form inputs
    const hours = document.getElementById('hours').value;
    const minutes = document.getElementById('minutes').value;
    const ampm = document.getElementById('ampm').value;
    const issues = document.getElementById('issues').value;
    const notes = document.getElementById('notes').value;

    // Combine date and time into a single string
    const currentTime = new Date();
    const dateLifted = `${currentTime.getMonth()+1}/${currentTime.getDate()}/${currentTime.getFullYear()}`;
    const timeLifted = `${hours}:${minutes} ${ampm}`;

    // Check if an order is selected
    if(orderDetails) {
        // Send data to Google Sheets
        sendDataToSheet({
            ...orderDetails,
            dateLifted,
            timeLifted,
            issues,
            notes,
        });
    } else {
        alert('Please select an order before submitting.');
    }
});


function sendDataToSheet(data) {
    fetch('/api/writesheet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


// Attach event listener to the "Reset" button
resetButton.addEventListener('click', resetFilters);
