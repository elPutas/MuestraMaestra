import { Component, ViewChild, ElementRef } from '@angular/core';
import { ReceptorMomento1Model } from "../../model/receptor/receptor.momento1.model";
import { StorageService } from "../../core/services/storage.service";
import { AppService } from "../../services/app.service";
import { AlertController } from 'ionic-angular';
import { AppValidations } from "../../app/app.validations";
import { AppConfigurations } from "../../app/app.configuration";
import { EventEmiterService } from "../../services/app.event.emitter.service";
/**
 * Generated class for the ReceptorMoment1Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'receptor-moment1',
  templateUrl: 'receptor-moment1.html'
})
export class ReceptorMoment1Component {
  public flagWhoIsGoingToBirth: boolean=false;
  public flagShowMomento1: boolean=false;
  public flagMomento2:boolean=false;
  mainNameApp:string;
  private appConfig:AppConfigurations
  flagA15_1: boolean = false;
  flagA4_otro: boolean = false;
  flagA4_5_1: boolean = false;
  flagA4_3_1: boolean = false;
  @ViewChild("container") container: ElementRef;
  momento1:ReceptorMomento1Model=new ReceptorMomento1Model();
  public data=[];
  public depts=[];
  public cities=[];
  constructor(private validations:AppValidations,
    private alertCtrl: AlertController,
    private storageService: StorageService,
    private  _service:AppService,
    private _eventEmitter:EventEmiterService) {
    this.appConfig=new AppConfigurations();
    this.mainNameApp=this.appConfig.mainNameApp;
    this.momento1.A0=this.storageService.user.data.user.fullname;
    this.momento1.dateStart=this.dateTime();
    this._service.getService('cities.json').subscribe(
      (response) => {  
        this.data=response.data;
    });
  }

  private dateTime(): string {
    const dateTime = new Date();
    return dateTime.toLocaleDateString() + ' ' + dateTime.toLocaleTimeString();
  }

  public onChangeCountry(event)
  {
    this.depts=this.data['countries'].find(x => x.id == event).states;
    //let name=this.data.countries.find(x => x.id == event).name;
    //this.moment2.lNights[this.numNight].countryName=name;
    //destination.countryName=name;
  }

  public onChangeDept(event)
  {
    /*console.log('Codigo de pais'+event);
    if(event==="05")
    {
      this.insideAntioquia=true;
      console.log('Dentro de Antioquia');
    }
    if(event!=="05")
    {
      this.outsideAntioquia=true;
      console.log('Fuera de Antioquia');
    }
    if(this.insideAntioquia && this.outsideAntioquia)
    {
      this.insideOusideAntioquia=true;
      console.log("Se puede mostrar bloques de Antioquia dentro y fuera");
    }*/
    this.cities=this.depts.find(x => parseInt(x.id) == parseInt(event)).cities;
    //let name=this.depts[this.tempDept].find(x => parseInt(x.id) == parseInt(event)).name;
    //this.moment2.lNights[this.numNight].stateName=name;
    //destination.stateName=name;
    this.validateMomento2();
  }

  public getNameCity(event)
  {
    //let name=this.cities[num].find(x => parseInt(x.id) == parseInt(event)).name;
    //this.moment2.lNights[this.numNight].cityName=name;
    //destination.cityName=name;
  }

  public showA4(event)
  {
    this.validateMomento2();
    if(this.momento1.A4.indexOf("84")>=0)
    {
      this.flagA4_3_1=true;
    }
    else
    {
      this.flagA4_3_1=false;
    }

    if(this.momento1.A4.indexOf("86")>=0)
    {
      this.flagA4_5_1=true;
    }
    else
    {
      this.flagA4_5_1=false;
    }

    if(this.momento1.A4.indexOf("40")>=0)
    {
      this.flagA4_otro=true;
    }
    else
    {
      this.flagA4_otro=false;
    }
  }

  public showA15_1(event)
  {
    /*if(this.momento1.A15=='1')
    {
      this.flagA15_1=true;
    }
    else
    {
      this.flagA15_1=false;
    }*/
  }

  public is365Less()
  {
    var flag=false;
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var firstDate = new Date(this.momento1.A1);
    var secondDate = new Date(this.momento1.A2);
    var days = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
    if(days<=365)
    {
      flag= true;
    }
    return flag;

  }

  public validateMomento2()
  {
    console.log("Departamento",this.momento1.A3_1!='05');
    console.log("365",this.is365Less()); 
    console.log("Motivos 16 o 17",(this.momento1.A4.indexOf("16")==-1 && this.momento1.A4.indexOf("17")==-1));
    console.log(" mayor 15",parseInt(this.momento1.A7)>=15);
    console.log("Motivo 3 con horas",(this.momento1.A4.indexOf("3")==-1 || (this.momento1.A4.indexOf("3")>=0 && parseInt(this.momento1.A4_3_1)>=5)));
    if(this.momento1.A3_1!='05'&& 
      this.is365Less() && 
    (this.momento1.A4.indexOf("16")==-1 && this.momento1.A4.indexOf("17")==-1) &&
    parseInt(this.momento1.A7)>=15 &&
    (this.momento1.A4.indexOf("3")==-1 || (this.momento1.A4.indexOf("3")>=0 && parseInt(this.momento1.A4_3_1)>=5)))
    {
      this.flagMomento2=true;
    }
    else
    {
      this.flagMomento2=false;
    }
    console.log("Total",this.flagMomento2);
    
  }

  public save()
  {
    if(this.validations.validate(this.container))
    {
      this._eventEmitter.sendReceptorSave(true);
    }
    else
    {
      let alert = this.alertCtrl.create({
        title: 'Alerta!!!',
        message: 'Por favor llenar campos en rojo',
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

  public next()
  {
    //this.validations.validate(this.container);
    this._eventEmitter.sendReceptorMomento1(false);
    this._eventEmitter.sendReceptorMomento2(true);
  }

  public sumTotal()
  {
    this.momento1.sumTotal=parseInt(this.momento1.personWhoNoLive)+parseInt(this.momento1.personWhoLive)+parseInt(this.momento1.personWhoNoMore15Live)+parseInt(this.momento1.personWhoNoLess15Live)+parseInt(this.momento1.personWhoAddMore15Live);
    if(parseInt(this.momento1.personWhoNoMore15Live)>0)
    {
      this.flagWhoIsGoingToBirth=true;
    }
    else{
      this.flagWhoIsGoingToBirth=false;
    }
  }

  public showMomento1()
  {
    if(parseInt(this.momento1.whoIsGoingToBirth)>0)
    {
      this.flagShowMomento1=true;
    }
    else{
      this.flagShowMomento1=false;
    }
  }

  public validateA12()
  {
    if(this.momento1.A12=='1' || this.momento1.A12=='2')
    {
      this.flagMomento2=true;
    }
    else
    {
      this.flagMomento2=false;
    }
  }
}
