Overview

This web application will assist in the data logging of orders lifted for product at the Lazarus refinery.
This application will have the following features:

1. Display all orders that are scheduled to be lifted
2. The ability to sort and filter orders based on:
    a. Order date
    b. Order customer
    c. Order product
    d. Order destination
3. The ability to mark an order as lifted, containing the date & time of the lift, as well as any issues or notes

4. Display a log of the recent actions done in the application

5. Check the prepaid volumetric balance(# of loads by combination of "customer name + product type") of a customer, and not allowing the operator to mark an order as lifted if the customer has insufficient prepaid balance (The loader will need some indication BEFORE a load is lifted, that the customer doesn't have enough prepaid balance like a).

6. There will be a separate interface (google sheets or something else), where Lazarus Accounting can enter the number of loads authorized since the prior midnight.  This file should be read/write for Tricia Muzzy, Terri Charpentier, Chris McDougall, and Christian Schlosser.  It should be View Only for James Weinhold, and Joe Aguilar (long term, no need for Beta)

7. There needs to be a way for customers to submit their schedules and update them for a particular day.  We do not want the customers to be able to view other customer's schedules.  We also don't want the customers to be able to see a real time update of what has loaded at this point.

8. For initial Beta it is fine to just do this with 1 customer + Product combination.

This web app will be built using the following technologies:

1. HTML/CSS & JavaScript for the front-end
2. Node.js & Express for the back-end, using the Google Sheets API

All of the actions done in the web app will sync back to the master spreadsheet
