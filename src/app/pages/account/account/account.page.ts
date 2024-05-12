import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

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

  constructor(
    private navController: NavController,
    private alertController: AlertController
  ) {}

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
    // Toggle editing mode
    this.isEditing = !this.isEditing;
  }

  saveCustomerDetails() {
    // Save customer details to localStorage or perform any other actions needed
    // For demonstration purposes, let's just toggle editing mode
    this.isEditing = !this.isEditing;
  }

  reorder(order: any) {
    // Implement logic for reordering previous orders
    console.log('Reordering:', order);
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
