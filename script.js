function displayOrders(data) {
    const orderContainer = document.querySelector('.order-cards');

    orderContainer.innerHTML = '';

    data.forEach(order => {
        const card = document.createElement('div');
        card.className = 'card';

        const customer = document.createElement('h3');
        customer.textContent = `${order.firstName}`;

        card.appendChild(customer);
        orderContainer.appendChild(card);
    })

}

fetch('/api/readsheet')
  .then(response => response.json())
  .then(data => {
    console.log(data);
      displayOrders(data);
  })
  .catch(error => console.error('Error:', error));