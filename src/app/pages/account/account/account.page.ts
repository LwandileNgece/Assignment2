import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss'],
})
export class AccountPage {
  customer: any = {
    name: 'Lwandile Ngece',
    phoneNumber: '073 763 7544',
    email: 'ngecelwandile@gmail.com'
  };
  pastOrders: any[] = [];
  totalAmounts: any[] = [];

  constructor(private navController: NavController) {}

  ionViewWillEnter() {
    this.loadPastOrders();
    this.loadTotalAmounts();
  }

  loadPastOrders() {
    const storedOrderHistory = localStorage.getItem('orderHistory');
    if (storedOrderHistory) {
      this.pastOrders = JSON.parse(storedOrderHistory);
    }
  }

  loadTotalAmounts() {
    const storedTotalAmounts = localStorage.getItem('totalAmounts');
    if (storedTotalAmounts) {
      this.totalAmounts = JSON.parse(storedTotalAmounts);
    }
  }

  editCustomerDetails() {
    // Implement logic for editing customer details
    console.log('Editing customer details');
  }

  reorder(order: any) {
    // Implement logic for reordering previous orders
    console.log('Reordering:', order);
  }

  goToCart() {
    this.navController.navigateForward(['/cart']);
  }
}
