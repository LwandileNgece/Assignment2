import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
})
export class SearchPage {
  searchTerm: string = ''; // Holds the search term entered by the user
  allRestaurants: any[] = []; // Holds all restaurants retrieved from local storage
  filteredRestaurants: any[] = []; // Holds the filtered restaurants based on search criteria

  constructor() {
    // Retrieve restaurants data from local storage
    const restaurantsData = localStorage.getItem('restaurants');
    if (restaurantsData) {
      this.allRestaurants = JSON.parse(restaurantsData);
      this.filteredRestaurants = [...this.allRestaurants]; // Initialize filteredRestaurants with all restaurants initially
    }
  }

  // Method to clear the search term and restore the full list of restaurants
  clearSearch() {
    this.searchTerm = '';
    this.filteredRestaurants = [...this.allRestaurants]; // Restore filteredRestaurants to all restaurants
  }

  // Method to perform search based on the entered term
  search() {
    // Filter restaurants based on the entered search term
    const searchTermLowerCase = this.searchTerm.toLowerCase();
    if (searchTermLowerCase === '') {
      // If search term is empty, restore filteredRestaurants to all restaurants
      this.filteredRestaurants = [...this.allRestaurants];
    } else {
      this.filteredRestaurants = this.allRestaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchTermLowerCase)
      );
    }
  }

  // Method to add the selected restaurant to the cart
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
