import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class AlertService {
  constructor(private toastCtrl: ToastController) {
  }

  public alert(description: string, className: string = ''): void {
    let toast = this.toastCtrl.create({
      message: description,
      duration: 5000,
      position: 'top',
      cssClass: className
    });
    toast.present();
  };
}
