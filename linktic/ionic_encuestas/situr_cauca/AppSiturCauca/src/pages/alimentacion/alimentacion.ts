import { Component, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { StorageService } from '../../core/services/storage.service';
import { FunctionsGlobalsService } from '../../core/services/functions-globals.service';
import { App, NavController, AlertController, ToastController } from 'ionic-angular';
import { AppConfigurations } from '../../app/app.configuration';
import { AlimentacionModel } from '../../model/alimentacion.model';
import { AppSaveForm } from '../../services/app.save.form.service';
import { AppValidations } from '../../app/app.validations';

/**
 * Generated class for the AlimentacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-alimentacion',
  templateUrl: 'alimentacion.html',
})
export class AlimentacionPage {

  flagA1Otro: boolean=false;
  flagA2Otro: boolean=false;
  flagDishesFood: boolean=false;
  flagUnitFood: boolean=false;
  flagB1_1: boolean=false;
  flagG2: boolean=false;
  flagG2_otro: boolean=false;
  @ViewChild("container") container: ElementRef;
  public alimentacion:AlimentacionModel=new AlimentacionModel();
  public appConfig:AppConfigurations=new AppConfigurations();
  constructor(private nav: NavController,
    private saveForm:AppSaveForm,
    private alertCtrl: AlertController,
    private validations:AppValidations,
    private toastCtrl: ToastController) {
  }

  public showA1Otro()
  {
    var array = this.alimentacion.A1;
    var otra =array.indexOf("40");
    

    if(otra >= 0)
    {
      this.flagA1Otro=true;
    }
    else{
      this.flagA1Otro=false;
    }
  }

  public showA2Otro()
  {
    if(this.alimentacion.A2=='40')
    {
      this.flagA2Otro=true;
    }
    else{
      this.flagA2Otro=false;
    }
  }

  public showFood()
  {
    if(this.alimentacion.A4=='1')
    {
      this.flagDishesFood=true;
    }
    else{
      this.flagDishesFood=false;
    }
    if(this.alimentacion.A4=='2')
    {
      this.flagUnitFood=true;
    }
    else{
      this.flagUnitFood=false;
    }
  }

  public showB1_1()
  {
    if(this.alimentacion.B1=='si')
    {
      this.flagB1_1=true;
    }
    else{
      this.flagB1_1=false;
    }
  }

  
  public showG2()
  {
    if(this.alimentacion.A2=='si')
    {
      this.flagG2=true;
    }
    else{
      this.flagG2=false;
    }
  }

  public showG2_otro()
  {
    if(this.alimentacion.G2=='40')
    {
      this.flagG2_otro=true;
    }
    else{
      this.flagG2_otro=false;
    }
  }

  public save()
  {
    if(this.validations.validate(this.container))
    {
      var flag=this.saveForm.save(this.alimentacion,this.appConfig.form5.number,this.appConfig.form5.name);
      if(flag)
      {
        this.nav.setRoot(AlimentacionPage);
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
