import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {  NavController, NavParams, ViewController, AlertController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from '../../core/services/user.service'
import { StorageService } from '../../core/services/storage.service';
import { TransporteModel } from '../../model/transporte.model';
import { AppSaveForm } from '../../services/app.save.form.service';
import { AppConfigurations } from '../../app/app.configuration';
import { AppValidations } from '../../app/app.validations';


/**
 * Generated class for the TransportePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-transporte',
  templateUrl: 'transporte.html',
})
export class TransportePage {
  @ViewChild("container") container: ElementRef;
  flagA8: boolean=false;
  private appConfig:AppConfigurations=new AppConfigurations();
  flagA8_otro: boolean=false;
  flagA2_otro: boolean=false;
  public transporte : TransporteModel=new TransporteModel();

  constructor(
    private nav: NavController,
    private saveForm:AppSaveForm,
    private alertCtrl: AlertController,
    private validations:AppValidations,
    private toastCtrl: ToastController) {

  }
  private dateTime(): string {
    const dateTime = new Date();
    return dateTime.toLocaleDateString() + ' ' + dateTime.toLocaleTimeString();
  }

  public showA2Otro()
  {
    var array = this.transporte.A2;
    var otra =array.indexOf("40");
    
    if(otra => 0)
    {
    
      this.flagA2_otro=true;
    }
    else{
      this.flagA2_otro=false;
    }
  }

  
  public showA8()
  {
    
    
    if(this.transporte.A7=='si')
    {
      this.flagA8=true;
    }
    else{
      this.flagA8=false;
    }
  }

  

  public showA8Otro()
  {
    if(this.transporte.A8=='40')
    {
      this.flagA8_otro=true;
    }
    else{
      this.flagA8_otro=false;
    }
  }

  public save()
  {
    if(this.validations.validate(this.container))
    {
      var flag=this.saveForm.save(this.transporte,this.appConfig.form3.number,this.appConfig.form3.name);
      if(flag)
      {
        this.nav.setRoot(TransportePage);
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
