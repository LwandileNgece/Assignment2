import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

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
  isEditing: boolean = false; // Flag to track editing mode
  selectedRestaurant: any; // Add this property

  constructor(
    private navController: NavController,
    private alertController: AlertController,
    private router: Router
  ) {}

  ionViewWillEnter() {
    this.loadPastOrders();
    this.loadTotalAmounts();
    this.loadCustomerDetails(); // Load customer details
  }

  loadCustomerDetails() {
    const storedCustomer = localStorage.getItem('customer');
    if (storedCustomer) {
      this.customer = JSON.parse(storedCustomer);
    }
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
    // Toggle editing mode
    this.isEditing = !this.isEditing;
  }

  saveCustomerDetails() {
    // Save customer details to localStorage
    localStorage.setItem('customer', JSON.stringify(this.customer));

    // Toggle editing mode
    this.isEditing = !this.isEditing;
  }

  reorder(order: any) {
    // Pass both the order and restaurant information to the cart page
    const navigationExtras: NavigationExtras = {
      state: {
        order: order,
        restaurant: this.selectedRestaurant
      }
    };
    this.router.navigate(['/cart'], navigationExtras);
  }

  goToCart() {
    this.navController.navigateForward(['/cart']);
  }

  async showHelpAlert() {
    const alert = await this.alertController.create({
      header: 'Get Help',
      message: 'Please contact support for assistance.',
      buttons: ['OK']
    });
    await alert.present();
  }
}
