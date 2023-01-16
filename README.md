# ATM POC
This is a sample ATM project in Angular & Material 14 with minimal requirements.

## TOC
1. [Application Requirements](#application-requirements)
2. [Application Pages](#application-pages)
    1. [Withdraw Page](#1-withdraw-page)
    2. [Restock Page](#2-restock-page)
    3. [ATM Overview Page](#3-atm-overview-page)
3. [Technical Details](#technical-details)
    1. [Flow Chart](#flow-chart)
    2. [Development Insights](#development-insights)
## Application Requirements:

·       The ATM should initially be stocked with 10 of each of the following denominations: $100, $50, $20, $10, $5, $1.

·       Users should be able to withdraw cash and the ATM should be able to track bills remaining.

·       The ATM should tell the user if it was able/unable to dispense the requested amount.

·       The ATM needs to keep track of the current quantities of each of its denominations.

·       The ATM needs to keep track of each transaction that happens.

 

## Application Pages

### 1. Withdraw Page 
Users should be able to enter a dollar amount and press a withdraw button when desired dollar amount has been entered.
Withdraw button should remain disabled until the user enters an amount.
Once with withdrawn button is pressed, display message whether or not transaction was successful (“Dispensed $<amount>” or failure “Insufficient Funds”).
 

### 2. Restock Page 
User should be able to enter quantities for each of the following denominations: $100, $50, $20, $10, $5, $1.
Once the restock button is pressed, the total quantity of each denomination should be updated.
Once the restock button is pressed, display a successful message to the user.
 

### 3. ATM Overview Page 
Display the quantities of each denomination currently in the ATM.
Display a transaction history of withdraw messages (“Dispensed $<amount>” or failure “Insufficient Funds”).

## Technical Details
### Flow Chart
![Flow chart showing the main flows](<flow-chart.png>)


### Development Insights

If your Material Components doesn't seem working, mostly it's version incompatibility.

By default npm installs Material version 6 if you didn't specify version. You don't need to separately install Material as it's already included in package.json, but if you need to for some reason, it should be version 14.

```
ng add @angular/material@14
```

