import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AppConfigurations } from '../../app/app.configuration';
import { AgenciaDeViajesModel } from '../../model/agenciadeviajes/agenciadeviajes.model';
import { AppSaveForm } from '../../services/app.save.form.service';
import { AppValidations } from '../../app/app.validations';
import { AgenciaDeViajesA3Model } from '../../model/agenciadeviajes/agenciasdeviajes.a3.model';

/**
 * Generated class for the AgenciasdeviajesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-agenciasdeviajes',
  templateUrl: 'agenciasdeviajes.html',
})
export class AgenciasdeviajesPage {
  flagA2Otro: boolean=false;
  flagA6Otro: boolean=false;
  flagC1Otro: boolean=false;
  flagC2Otro: boolean=false;
  flagD2: boolean=false;
  flagD2Otro: boolean=false;
  @ViewChild("container") container: ElementRef;
  private appConfig:AppConfigurations=new AppConfigurations();
  public agencia : AgenciaDeViajesModel=new AgenciaDeViajesModel();
  constructor(private nav: NavController,
    private saveForm:AppSaveForm,
    private alertCtrl: AlertController,
    private validations:AppValidations,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgenciasdeviajesPage');
  }

  public renderA3()
  {
    this.agencia.lA3=[];
    let length=this.agencia.A2.length;
    for(let i=0;i<length;i++)
    {
      let ele=new AgenciaDeViajesA3Model();
      ele.id=this.agencia.A2[i];
      this.agencia.lA3.push(ele);
    }
    if(this.agencia.A2.indexOf("Otros")>=0)
    {
      this.flagA2Otro=true;
    }
    else{
        this.flagA2Otro=false;     
    }
  }

  public showA6Otro()
  {
    if(this.agencia.A6=='40')
    {
      this.flagA6Otro=true;
    }
    else{
      this.flagA6Otro=false;
    }
  }

  public showC1Otro()
  {
    if(this.agencia.C1=='40')
    {
      this.flagC1Otro=true;
    }
    else{
      this.flagC1Otro=false;
    }
  }

  public showC2Otro()
  {
    if(this.agencia.C2=='40')
    {
      this.flagC2Otro=true;
    }
    else{
      this.flagC2Otro=false;
    }
  }

  public showD2()
  {
    if(this.agencia.D1=='si')
    {
      this.flagD2=true;
    }
    else{
      this.flagD2=false;
    }
  }

  
  public showD2Otro()
  {
    if(this.agencia.D2=='40')
    {
      this.flagD2Otro=true;
    }
    else{
      this.flagD2Otro=false;
    }
  }


  public save()
  {
    if(this.validations.validate(this.container))
    {
      var flag=this.saveForm.save(this.agencia,this.appConfig.form6.number,this.appConfig.form6.name);
      if(flag)
      {
        this.nav.setRoot(AgenciasdeviajesPage);
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
