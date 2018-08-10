import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppSaveForm } from "../../services/app.save.form.service";
import { StorageService } from "../../core/services/storage.service";
import { AppConfigurations } from "../../app/app.configuration";

/**
 * Generated class for the SincronizacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sincronizacion',
  templateUrl: 'sincronizacion.html',
})
export class SincronizacionPage {
  public lForms=[];
  public connection:boolean=false;
  private appConfig:AppConfigurations=new AppConfigurations();
  constructor(private storageService: StorageService,private saveForm:AppSaveForm,public navCtrl: NavController, public navParams: NavParams) {
    this.connection=this.saveForm.checkNetwork();
    if(!this.connection)
    {
      alert('No tienes internet');
    }
    this.getLocalForm(this.appConfig.form0.name,this.appConfig.form0.number);
    this.getLocalForm(this.appConfig.form2.name,this.appConfig.form2.number);
    console.log('lForms',this.lForms)
  }

  getLocalForm(formName:string,formNum:number)
  {
    this.storageService.loadStorageForm(formName)
      .then(data => {
        this.lForms.push({"num":formNum,"name":formName,"lForms":data});
      });
  }  

  ionViewDidLoad() {
  }

}
