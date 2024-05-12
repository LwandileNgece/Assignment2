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

  // Store the order in local storage
  this.storeOrderInLocalStorage();
}

  // Method to store the order in local storage
  storeOrderInLocalStorage() {
    // Store the orders array in local storage
    localStorage.setItem('orderHistory', JSON.stringify(this.orders));
  }

  // Method to navigate to the Home page
  goToHome() {
    this.router.navigate(['/home']);
  }
}
