import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  restaurants: any[]; // Define an array to store restaurant data

  constructor() {
    // Initialize restaurant data (you can fetch it from an API or hardcode it)
    this.restaurants = [
      {
        name: 'Pizza Hut',
        type: 'Italian Cuisine',
        ratings: 4.2,
        distance: '0.5 miles',
        price: '$$',
        topDish: 'Supreme Pizza',
        imagePath: 'assets/pizza_hut.jpg'
      },
      {
        name: 'McDonald\'s',
        type: 'Fast Food',
        ratings: 3.9,
        distance: '0.3 miles',
        price: '$',
        topDish: 'Big Mac',
        imagePath: 'assets/mcdonalds.png'
      },
      {
        name: 'Subway',
        type: 'Sandwiches',
        ratings: 4.1,
        distance: '0.7 miles',
        price: '$',
        topDish: 'Italian BMT',
        imagePath: 'assets/subway.jpg'
      },
      {
        name: 'Nandos',
        type: 'Japanese Cuisine',
        ratings: 4.5,
        distance: '0.8 miles',
        price: '$$$',
        topDish: 'Sashimi Platter',
        imagePath: 'assets/nandos.jpg'
      }
    ];
  }

  addToCart(restaurant: any) {
    // Create an order and store it in local storage
    const order = {
      restaurantName: restaurant.name,
      dish: restaurant.topDish,
      price: restaurant.price
    };
    // Check if there are existing orders in local storage
    let orders: any[] = [];
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders !== null) {
      orders = JSON.parse(storedOrders);
    }
    // Add the new order to the existing orders
    orders.push(order);
    // Save the updated orders back to local storage
    localStorage.setItem('orders', JSON.stringify(orders));
  }
}
