import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from '../../core/services/user.service'
import { StorageService } from '../../core/services/storage.service';
import { AppSaveForm } from '../../services/app.save.form.service';
import { SitiosDeInteresModel } from '../../model/sitiosdeinteres.model';
import { AppConfigurations } from '../../app/app.configuration';
import { AppValidations } from '../../app/app.validations';

/**
 * Generated class for the SitiosdeinteresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sitiosdeinteres',
  templateUrl: 'sitiosdeinteres.html',
})
export class SitiosdeinteresPage {
  flagD2_otro: boolean=false;
  flagD2: boolean=false;
  flagB1_1: boolean=false;
  flagA2Otro: boolean=false;
  @ViewChild("container") container: ElementRef;
  public sitiosInteres:SitiosDeInteresModel=new SitiosDeInteresModel();
  public appConfig:AppConfigurations=new AppConfigurations();
  constructor(private nav: NavController,
    private saveForm:AppSaveForm,
    private alertCtrl: AlertController,
    private validations:AppValidations,
    private toastCtrl: ToastController) {
   
  }
  public showA2Otro()
  {
    if(this.sitiosInteres.A2=='40')
    {
      this.flagA2Otro=true;
    }
    else{
      this.flagA2Otro=false;
    }
  }

  public showB1_1()
  {
    if(this.sitiosInteres.B1=='si')
    {
      this.flagB1_1=true;
    }
    else{
      this.flagB1_1=false;
    }
  }

  
  public showD2()
  {
    if(this.sitiosInteres.D1=='si')
    {
      this.flagD2=true;
    }
    else{
      this.flagD2=false;
    }
  }

  public showD2_otro()
  {
    if(this.sitiosInteres.D2=='40')
    {
      this.flagD2_otro=true;
    }
    else{
      this.flagD2_otro=false;
    }
  }

  public save()
  {
    if(this.validations.validate(this.container))
    {
      var flag=this.saveForm.save(this.sitiosInteres,this.appConfig.form4.number,this.appConfig.form4.name);
      if(flag)
      {
        this.nav.setRoot(SitiosdeinteresPage);
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
