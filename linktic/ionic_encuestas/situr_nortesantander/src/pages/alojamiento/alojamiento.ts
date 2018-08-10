import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppConfigurations } from "../../app/app.configuration";

/**
 * Generated class for the AlojamientoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-alojamiento',
  templateUrl: 'alojamiento.html',
})
export class AlojamientoPage {
  public mainNameApp: string;
  private appConfig:AppConfigurations;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.appConfig=new AppConfigurations();
    this.mainNameApp=this.appConfig.mainNameApp;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlojamientoPage');
  }

}
