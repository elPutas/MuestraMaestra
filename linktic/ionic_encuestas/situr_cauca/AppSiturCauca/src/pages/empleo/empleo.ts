import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AppConfigurations } from '../../app/app.configuration';
import { AppSaveForm } from '../../services/app.save.form.service';
import { AppValidations } from '../../app/app.validations';
import { EmpleoModel } from '../../model/empleo/empleo.model';
import { EmpleoB10Model } from '../../model/empleo/emplo.b10.model';
import { EmpleoB14Model } from '../../model/empleo/empleo.b14.model';
import { EmpleoC1_2Model } from '../../model/empleo/empleo.c1_2.model';
import { EmpleoD3Model } from '../../model/empleo/empleo.d3.model';
import { StorageService } from "../../core/services/storage.service";

/**
 * Generated class for the EmpleoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-empleo',
  templateUrl: 'empleo.html',
})
export class EmpleoPage {
  flagE11_otro: boolean;
  flagE9_otro: boolean;
  flagE8_otro: boolean;
  flagE6_otro: boolean;
  flagD3: boolean;
  flagD1_otro: boolean;
  flagC1: boolean;
  flagB14Otro: boolean;
  flagB11Otro: boolean=false;
  flagB12Otro: boolean=false;
  flagB13Otro: boolean=false;
  flagB10Otro: boolean=false;
  flagB9_1: boolean=false;
  @ViewChild("container") container: ElementRef;
  public empleo:EmpleoModel=new EmpleoModel();
  private appConfig:AppConfigurations;
  constructor(private nav: NavController,
    private saveForm:AppSaveForm,
    private alertCtrl: AlertController,
    private validations:AppValidations,
    private toastCtrl: ToastController,
    private storageService: StorageService) {
      this.appConfig=new AppConfigurations();
      this.empleo.pollster=this.storageService.user.data.user.fullname;
      this.empleo.datepoll=this.dateTime();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmpleoPage');
  }

  private dateTime(): string {
    const dateTime = new Date();
    return dateTime.toLocaleDateString() + ' ' + dateTime.toLocaleTimeString();
  }

  public sumB()
  {
    this.empleo.B1_7=(parseInt(this.empleo.B1_1)+parseInt(this.empleo.B1_4)).toString();
    this.empleo.B1_8=(parseInt(this.empleo.B1_2)+parseInt(this.empleo.B1_5)).toString();
    this.empleo.B1_9=(parseInt(this.empleo.B1_3)+parseInt(this.empleo.B1_6)).toString();
    this.empleo.B2_7=(parseInt(this.empleo.B2_1)+parseInt(this.empleo.B2_4)).toString();
    this.empleo.B2_8=(parseInt(this.empleo.B2_2)+parseInt(this.empleo.B2_5)).toString();
    this.empleo.B2_9=(parseInt(this.empleo.B2_3)+parseInt(this.empleo.B2_6)).toString();
    this.empleo.B3_7=(parseInt(this.empleo.B3_1)+parseInt(this.empleo.B3_4)).toString();
    this.empleo.B3_8=(parseInt(this.empleo.B3_2)+parseInt(this.empleo.B3_5)).toString();
    this.empleo.B3_9=(parseInt(this.empleo.B3_3)+parseInt(this.empleo.B3_6)).toString();
    this.empleo.B4_7=(parseInt(this.empleo.B4_1)+parseInt(this.empleo.B4_4)).toString();
    this.empleo.B4_8=(parseInt(this.empleo.B4_2)+parseInt(this.empleo.B4_5)).toString();
    this.empleo.B4_9=(parseInt(this.empleo.B4_3)+parseInt(this.empleo.B4_6)).toString();
    this.empleo.B5_7=(parseInt(this.empleo.B5_1)+parseInt(this.empleo.B5_4)).toString();
    this.empleo.B5_8=(parseInt(this.empleo.B5_2)+parseInt(this.empleo.B5_5)).toString();
    this.empleo.B5_9=(parseInt(this.empleo.B5_3)+parseInt(this.empleo.B5_6)).toString();
    this.empleo.B6_7=(parseInt(this.empleo.B6_1)+parseInt(this.empleo.B6_4)).toString();
    this.empleo.B6_8=(parseInt(this.empleo.B6_2)+parseInt(this.empleo.B6_5)).toString();
    this.empleo.B6_9=(parseInt(this.empleo.B6_3)+parseInt(this.empleo.B6_6)).toString();
    this.empleo.B7_7=(parseInt(this.empleo.B7_1)+parseInt(this.empleo.B7_4)).toString();
    this.empleo.B7_8=(parseInt(this.empleo.B7_2)+parseInt(this.empleo.B7_5)).toString();
    this.empleo.B7_9=(parseInt(this.empleo.B7_3)+parseInt(this.empleo.B7_6)).toString();
    this.empleo.B8_7=(parseInt(this.empleo.B8_1)+parseInt(this.empleo.B8_4)).toString();
    this.empleo.B8_8=(parseInt(this.empleo.B8_2)+parseInt(this.empleo.B8_5)).toString();
    this.empleo.B8_9=(parseInt(this.empleo.B8_3)+parseInt(this.empleo.B8_6)).toString();
  }

  public showB9_1() {
   
    if(this.empleo.B9=="Si"){
      this.flagB9_1 = true;
    } else {
      this.flagB9_1 = false;
    }
  }

  public renderB10()
  {
    this.empleo.lB10=[];
    let length=this.empleo.B10.length;
    for(let i=0;i<length;i++)
    {
      console.log(i)
      let ele=new EmpleoB10Model();
      ele.id=this.empleo.B10[i];
      this.empleo.lB10.push(ele);
    }
    console.log(this.empleo.lB10);
    if(this.empleo.B10.indexOf("40")>=0)
    {
      this.flagB10Otro=true;
    }
    else{
        this.flagB10Otro=false;     
    }
  }

  public renderB14()
  {
    this.empleo.lB14=[];
    let length=this.empleo.B14.length;
    for(let i=0;i<length;i++)
    {
      let ele=new EmpleoB14Model();
      ele.id=this.empleo.B14[i];
      this.empleo.lB14.push(ele);
    }
    if(this.empleo.B14.indexOf("Otro")>=0)
    {
      this.flagB14Otro=true;
    }
    else{
        this.flagB14Otro=false;     
    }
  }

  public renderC1_2()
  {
    this.empleo.lC1_2=[];
    let length=parseInt(this.empleo.C1_2);
    for(let i=0;i<length;i++)
    {
      let ele=new EmpleoC1_2Model();
      this.empleo.lC1_2.push(ele);
    }    
  }

  public renderD3()
  {
    this.empleo.lD3=[];
    let length=parseInt(this.empleo.D3);
    for(let i=0;i<length;i++)
    {
      let ele=new EmpleoD3Model();
      this.empleo.lD3.push(ele);
    }    
  }

  public showB11_otro()
  {
    if(this.empleo.B11.indexOf("40")>=0)
    {
      this.flagB11Otro=true;
    }
    else{
        this.flagB11Otro=false;     
    }
  }

  public showB12_otro()
  {
    if(this.empleo.B12.indexOf("40")>=0)
    {
      this.flagB12Otro=true;
    }
    else{
        this.flagB12Otro=false;     
    }
  }

  public showB13_otro()
  {
    if(this.empleo.B13.indexOf("40")>=0)
    {
      this.flagB13Otro=true;
    }
    else{
        this.flagB13Otro=false;     
    }
  }

  public showC1()
  {
    if(this.empleo.C1=="Si")
    {
      this.flagC1=true;
    }
    else{
        this.flagC1=false;     
    }
  }

  public showD1()
  {
    if(this.empleo.D1=="Si")
    {
      this.flagD1_otro=true;
    }
    else{
      this.flagD1_otro=false;     
    }
  }

  public showD3()
  {
    if(this.empleo.D2=="Si")
    {
      this.flagD3=true;
    }
    else{
      this.flagD3=false;     
    }
  }

  public showE6_otro()
  {
    if(this.empleo.E6=="40")
    {
      this.flagE6_otro=true;
    }
    else{
      this.flagE6_otro=false;     
    }
  }

  
  public showE8_otro()
  {
    if(this.empleo.E8=="40")
    {
      this.flagE8_otro=true;
    }
    else{
      this.flagE8_otro=false;     
    }
  }

  public showE9_otro()
  {
    if(this.empleo.E9=="40")
    {
      this.flagE9_otro=true;
    }
    else{
      this.flagE9_otro=false;     
    }
  }

  public showE11_otro()
  {
    if(this.empleo.E11=="40")
    {
      this.flagE11_otro=true;
    }
    else{
      this.flagE11_otro=false;     
    }
  }


  public totalE7()
  {
    let total=parseInt(this.empleo.E7_1)+parseInt(this.empleo.E7_2)+parseInt(this.empleo.E7_3);
    if(total>100)
    {
      alert("No puede dar mayor a 100%");
    }
  }

  public save()
  {
    if(this.validations.validate(this.container))
    {
      var flag=this.saveForm.save(this.empleo,this.appConfig.form7.number,this.appConfig.form7.name);
      if(flag)
      {
        this.nav.setRoot(EmpleoPage);
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
