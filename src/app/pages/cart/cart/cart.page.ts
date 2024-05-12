import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.page.html',
  styleUrls: ['cart.page.scss'],
})
export class CartPage {
  orders: any[] = []; // Array to store orders
  deliveryInstructions: string = ''; // Variable to store delivery instructions
  selectedRestaurant: any; // Variable to store the selected restaurant

  constructor(private router: Router, private alertController: AlertController) {
    // Fetch orders from local storage
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders !== null) {
      this.orders = JSON.parse(storedOrders);
    }
  }

  // Method to calculate total price without delivery fee
  calculateTotalWithoutDelivery(): number {
    let total = 0;
    for (let order of this.orders) {
      total += order.price;
    }
    return total;
  }

  // Method to calculate total price including delivery fee
  calculateTotal(): number {
    return this.calculateTotalWithoutDelivery() + 50; // Adding hardcoded delivery fee
  }

  // Method to handle payment
  async makePayment() {
    // Calculate the total order amount
    const totalAmount = this.calculateTotal();

    // Show a pop-up message indicating that payment was successful
    const alert = await this.alertController.create({
      header: 'Payment Successful',
      message: 'Your payment was successful!',
      buttons: ['OK']
    });

    await alert.present();

    // Store the selected restaurant in local storage
    localStorage.setItem('selectedRestaurant', JSON.stringify(this.selectedRestaurant));

    // Store the order total in local storage
    localStorage.setItem('orderTotal', totalAmount.toString());

    // Store the order and its total amount in local storage
    this.storeOrderInLocalStorage(totalAmount);

    // Clear the cart
    this.clearCart();

    // Navigate to the account page
    this.router.navigate(['/account']);
  }

  // Method to store the order and its total amount in local storage
  storeOrderInLocalStorage(totalAmount: number) {
    // Retrieve existing order history and total amounts from local storage
    let orderHistory: any[] = [];
    let totalAmounts: any[] = [];
    const storedOrderHistory = localStorage.getItem('orderHistory');
    const storedTotalAmounts = localStorage.getItem('totalAmounts');
    if (storedOrderHistory) {
      orderHistory = JSON.parse(storedOrderHistory);
    }
    if (storedTotalAmounts) {
      totalAmounts = JSON.parse(storedTotalAmounts);
    }

    // Add the current order to the order history
    orderHistory.push(...this.orders);

    // Add the total amount to the total amounts array
    totalAmounts.push(totalAmount);

    // Store the updated order history and total amounts in local storage
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    localStorage.setItem('totalAmounts', JSON.stringify(totalAmounts));
  }

  // Method to clear the cart
  clearCart() {
    localStorage.removeItem('orders');
    this.orders = [];
  }
}
