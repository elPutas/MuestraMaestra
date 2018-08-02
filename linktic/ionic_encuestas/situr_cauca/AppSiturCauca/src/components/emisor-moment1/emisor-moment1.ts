import { Component, ViewChild, ElementRef } from '@angular/core';
import { StorageService } from "../../core/services/storage.service";
import { Moment1Model } from "../../model/emisor/moment1.model";
import { Moment1PersonModel } from "../../model/emisor/moment1Person.model";
import { EventEmiterService } from '../../services/app.event.emitter.service';
import { AppValidations } from '../../app/app.validations';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the EmisorMoment1Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'emisor-moment1',
  templateUrl: 'emisor-moment1.html'
})
export class EmisorMoment1Component {
  public flagMomento2:boolean=false;
  public moment1 : Moment1Model=new Moment1Model();
  public whyNoTrip:Boolean;
  public flagOtherReason:Boolean;
  @ViewChild("container") container: ElementRef;
  constructor(private validations:AppValidations,
    private alertCtrl: AlertController,private storageService: StorageService,private _eventEmiter:EventEmiterService) {
    this.moment1.interviewer=this.storageService.user.data.user.fullname;
    this.moment1.date=this.dateTime();
    this.moment1.lMoment1PersonModel=[];
  }

  private dateTime(): string {
    const dateTime = new Date();
    return dateTime.toLocaleDateString() + ' ' + dateTime.toLocaleTimeString();
  }

  public renderPersons()
  {
    this.moment1.lMoment1PersonModel=[];
    for(let i=0;i<this.moment1.numPersons;i++)
    {
      let ele=new Moment1PersonModel();
      this.moment1.lMoment1PersonModel.push(ele);
    }
  }

  validateMoment2()
  {
    this.moment1.numMoment2=[];
    for(let key in this.moment1.lMoment1PersonModel)
    {
      var person=this.moment1.lMoment1PersonModel[key];
      if(person.motives=='si' && person.age>=15 )
      {
        this.moment1.numMoment2.push("Hola");
        console.log("Creando Momento 2");
        //this._eventEmiter.sendNewMomentPerson(person);
      }  
      if(person.motives=='no')
      {
        person.flagWhyNoTrip=true;
      }
      else
      {
        person.flagWhyNoTrip=false;
      }
    }    
    if(this.moment1.numMoment2.length>0)
    {
      this.flagMomento2=true;
    }
    else
    {
      this.flagMomento2=false;
    }
  }

   showWhyNoTrip()
   {
     if(this.moment1.agreement=="no")
     {
       this.whyNoTrip=true;
     }
   }

   showWhichCareer(person:Moment1PersonModel)
   {
     if(person.ocupation_id=="72")
     {
       person.flagWhichCarreer=true;
     }
    else
     {
       person.flagWhichCarreer=false;
     }
   }

   showOtherReason(person:Moment1PersonModel)
   {
    if(person.reasons.indexOf("40")>=0)
     {
      person.flagOtherReason=true;
     }
    else
     {
      person.flagOtherReason=false;
     }
   }

   public save()
  {
    if(this.validations.validate(this.container))
    {
      this._eventEmiter.sendEmisorSave(true);
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


   public next()
   {
    if(this.validations.validate(this.container))
    {
      var lPersons=[];
      for(let key in this.moment1.lMoment1PersonModel)
      {
        let person=this.moment1.lMoment1PersonModel[key];
        if(person.motives=='si' && person.age>=15 )
        {
          lPersons.push(person);
        }
      }
      this._eventEmiter.sendNewMomentPerson(lPersons);
      this._eventEmiter.sendEmisorMomento1(false);
      this._eventEmiter.sendEmisorMomento2(true);
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
