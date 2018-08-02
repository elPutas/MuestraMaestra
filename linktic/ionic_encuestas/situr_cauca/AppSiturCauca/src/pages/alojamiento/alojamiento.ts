import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from '../../core/services/user.service'
import { StorageService } from '../../core/services/storage.service';
import { AppSaveForm } from '../../services/app.save.form.service';
import { AlojamientoModel } from '../../model/alojamiento.model';
import { AppConfigurations } from '../../app/app.configuration';
import { AppValidations } from '../../app/app.validations';

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
  flagCategoryRooms:boolean = false;
  flagCategoryApartment:boolean = false;
  flagCategoryHouse:boolean = false;
  flagCategoryCabin:boolean = false;
  flagCategoryCamping:boolean = false;
  flagShowC1_1:boolean = false;
  flagShowE1_otro:boolean = false;
  flagShowE2_otro:boolean = false;
  flagShowE4:boolean = false;
  flagShowE4_otro:boolean = false;
  flagShowE6_otro:boolean = false;
  //appConfig: AppConfigurations;
  mainNameApp: any;
  @ViewChild("container") container: ElementRef;
  public alojamiento:AlojamientoModel=new AlojamientoModel();
  public appConfig:AppConfigurations=new AppConfigurations();
  constructor(private nav: NavController,
    private saveForm:AppSaveForm,
    private alertCtrl: AlertController,
    private validations:AppValidations,
    private toastCtrl: ToastController) {
    //this.mainNameApp=this.appConfig.mainNameApp;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlojamientoPage');
  }

  public validateB1() {
    console.log("Hola mundo de selects");
    if(this.alojamiento.lB1.indexOf("1")>=0) {
      this.flagCategoryRooms=true;
    } else {
      this.flagCategoryRooms=false;
    }
    if(this.alojamiento.lB1.indexOf("2")>=0) {
      this.flagCategoryApartment=true;
    } else {
      this.flagCategoryApartment=false;
    }
    if(this.alojamiento.lB1.indexOf("3")>=0) {
      this.flagCategoryHouse=true;
    } else {
      this.flagCategoryHouse=false;
    }
    if(this.alojamiento.lB1.indexOf("4")>=0) {
      this.flagCategoryCabin=true;
    } else {
      this.flagCategoryCabin=false;
    }
    if(this.alojamiento.lB1.indexOf("5")>=0) {
      this.flagCategoryCamping=true;
    } else {
      this.flagCategoryCamping=false;
    }
  }
  public showC1_1() {
    if(this.alojamiento.C1=="1"){
      this.flagShowC1_1 = true;
    } else {
      this.flagShowC1_1 = false;
    }
  }

  public showE1_otro() {
    if(this.alojamiento.E1.indexOf("96")>=0){
      this.flagShowE1_otro = true;
    } else {
      this.flagShowE1_otro = false;
    }
  }

  public showE2_otro() {
    if(this.alojamiento.E2.indexOf("96")>=0){
      this.flagShowE2_otro = true;
    } else {
      this.flagShowE2_otro = false;
    }
  }

  public showE4() {
    if(this.alojamiento.E3=="Si"){
      this.flagShowE4 = true;
    } else {
      this.flagShowE4 = false;
    }
  }

  public showE4_otro() {
    if(this.alojamiento.E4=="96"){
      this.flagShowE4_otro = true;
    } else {
      this.flagShowE4_otro = false;
    }
  }

  public showE6_otro() {
    if(this.alojamiento.E6=="96"){
      this.flagShowE6_otro = true;
    } else {
      this.flagShowE6_otro = false;
    }
  }

  public save()
  {
    if(this.validations.validate(this.container))
    {
      var flag=this.saveForm.save(this.alojamiento,this.appConfig.form8.number,this.appConfig.form8.name);
      if(flag)
      {
        this.nav.setRoot(AlojamientoPage);
      }
      let toast = this.toastCtrl.create(
        {
          message: 'Toda la informacion se lleno correctamente',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
    }
    else
    {
      let alert = this.alertCtrl.create({
        title: 'Alerta!!!',
        message: 'Por favor corregir campos en rojo',
        buttons: [          
          {
            text: 'OK',
            handler: () => {
              console.log('Buy clicked');
            }
          }
        ]
      });
      alert.present();
    }    
  }

}
