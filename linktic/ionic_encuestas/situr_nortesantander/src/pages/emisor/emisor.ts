import {AfterViewInit, OnInit,ViewChild,Component, Directive, QueryList, ViewChildren} from '@angular/core';
import {  AlertController,NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SendDataService } from '../../core/services/sendData.service';
import { AuthService } from '../../core/services/user.service'
import { StorageService } from '../../core/services/storage.service';
import { EmisorMoment1Component } from "../../components/emisor-moment1/emisor-moment1";
import { EmisorMoment2Component } from "../../components/emisor-moment2/emisor-moment2";
import { Network } from '@ionic-native/network';
import { AlertService} from "../../core/services/alert.service";
import { EventEmiterService } from '../../services/app.event.emitter.service';
import { AppSaveForm } from "../../services/app.save.form.service";
import { AppConfigurations } from "../../app/app.configuration";
/**
 * Generated class for the EmisorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-emisor',
  templateUrl: 'emisor.html',
})
export class EmisorPage {
  showMoment2: boolean;
  showMoment1: boolean=true;
  private appConfig:AppConfigurations=new AppConfigurations();
  @ViewChild(EmisorMoment1Component) emisorMoment1Component;
  @ViewChildren(EmisorMoment2Component) lEmisorMoment2Component: QueryList<EmisorMoment2Component>;
private emisor;
private connected=false;
public flagMomento1:boolean=true;
public flagMomento2:boolean=false;

  constructor(private sendData: SendDataService,
    private storageService: StorageService, 
    private alertService: AlertService,
    private nav: NavController,
    private network: Network,
    private _eventEmiter:EventEmiterService,
    private saveForm:AppSaveForm) {
      this._eventEmiter.eventEmisorMomento1.subscribe((flag:boolean)=>{
        this.flagMomento1=flag;
      });
      this._eventEmiter.eventEmisorMomento2.subscribe((flag:boolean)=>{
        this.flagMomento2=flag;
      });
  
      this._eventEmiter.eventEmisorSave.subscribe((flag:boolean)=>{
      if(flag)
      {
        this.save();
      }
  
      });
  }

  next(){ 
    var lPersons=[];
    for(let key in this.emisorMoment1Component.moment1.lMoment1PersonModel)
    {
      let person=this.emisorMoment1Component.moment1.lMoment1PersonModel[key];
      if(person.motives=='si' && person.age>=15 )
      {
        lPersons.push(person);
      }
    }
    this._eventEmiter.sendNewMomentPerson(lPersons);
    this.showMoment1=false;
    this.showMoment2=true;
  }

  save()
  {
    var lMomento2=[];
    this.lEmisorMoment2Component.forEach(function(element) {
      lMomento2.push(element.moment2)
    });

    this.emisor={"momento1":this.emisorMoment1Component.moment1,"lMomento2":lMomento2};
    var flag=this.saveForm.save(this.emisor,this.appConfig.form2.number,this.appConfig.form2.name);
    if(flag)
    {
      this.nav.setRoot(EmisorPage);
    }
  }
}
