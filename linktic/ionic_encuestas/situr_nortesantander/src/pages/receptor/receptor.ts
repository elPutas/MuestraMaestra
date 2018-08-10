import {AfterViewInit, OnInit,ViewChild,Component, Directive, QueryList, ViewChildren} from '@angular/core';
import {  AlertController,NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SendDataService } from '../../core/services/sendData.service';
import { AuthService } from '../../core/services/user.service'
import { StorageService } from '../../core/services/storage.service';
import { ReceptorMoment1Component } from "../../components/receptor-moment1/receptor-moment1";
import { ReceptorMoment2Component } from "../../components/receptor-moment2/receptor-moment2";
import { Network } from '@ionic-native/network';
import { AlertService} from "../../core/services/alert.service";
import { EventEmiterService } from '../../services/app.event.emitter.service';
import { ReceptorModel } from "../../model/receptor/receptor.model";
import { AppSaveForm } from "../../services/app.save.form.service";
import { AppConfigurations } from "../../app/app.configuration";

/**
 * Generated class for the ReceptorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-receptor',
  templateUrl: 'receptor.html',
})
export class ReceptorPage {
  public flagMomento1:boolean=true;
  public flagMomento2:boolean=false;
  public flagNext:boolean=false;
  private appConfig:AppConfigurations=new AppConfigurations();
  showMoment2: boolean;
  showMoment1: boolean=true;
  @ViewChild(ReceptorMoment1Component) receptorMoment1Component:ReceptorMoment1Component;
  @ViewChild(ReceptorMoment2Component) receptorMoment2Component: ReceptorMoment2Component;
  private receptor:ReceptorModel=new ReceptorModel();
  private connected=false;

  constructor(
    public navParams: NavParams,
    private _eventEmitter:EventEmiterService,
    private sendData: SendDataService,
    private storageService: StorageService, 
    private alertService: AlertService,
    private nav: NavController,
    private network: Network,
    private saveForm:AppSaveForm) {
    this._eventEmitter.eventReceptorMomento1.subscribe((flag:boolean)=>{
      this.flagMomento1=flag;
    });
    this._eventEmitter.eventReceptorMomento2.subscribe((flag:boolean)=>{
      this.flagMomento2=flag;
    });

    this._eventEmitter.eventReceptorSave.subscribe((flag:boolean)=>{
    if(flag)
    {
      this.save();
    }

    });
  }

  save()
  {
    this.receptor.momento1=this.receptorMoment1Component.momento1;
    this.receptor.momento2=this.receptorMoment2Component.momento2;
    let flag=this.saveForm.save(this.receptor,this.appConfig.form0.number,this.appConfig.form0.name);
    if(flag)
    {
      this.nav.setRoot(ReceptorPage);
    }
  }
}
