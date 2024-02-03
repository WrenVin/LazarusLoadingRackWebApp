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
      time.textContent = `Time: ${order.Schedule_Time}`;
      loads = document.createElement('p');
      loads.textContent = `Loads: ${order.Loads}`;
      destination = document.createElement('p');
      destination.textContent = `Destination: ${order.DESTINATION}`;
      trailer = document.createElement('p');
      trailer.textContent = `Trailer: ${order.TRAILER}`;


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
      });
    })

}



fetch('/api/readsheet')
  .then(response => response.json())
  .then(data => {
    console.log(data);
      displayOrders(data);
  })
  .catch(error => console.error('Error:', error));