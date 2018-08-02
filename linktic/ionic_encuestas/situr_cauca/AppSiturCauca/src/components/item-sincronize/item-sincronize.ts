import { Component, Input } from '@angular/core';
import { AppSaveForm } from '../../services/app.save.form.service';
import { StorageService } from '../../core/services/storage.service';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the ItemSincronizeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'item-sincronize',
  templateUrl: 'item-sincronize.html'
})
export class ItemSincronizeComponent {
  public count: number=0;
  @Input() data:any;//{"num":formNum,"name":formName,"lForms":data}
  public flagSincronazing:boolean=false;
  public flagShowButton:boolean=true;

  constructor(private saveForm:AppSaveForm,private storageService: StorageService,private toastCtrl: ToastController) {
  }

  ngOnInit() 
  {
    if(this.data)
    {
      if(this.data.lForms)
      {
        this.count=this.data.lForms.length;
      }
      if(!this.count)
      {
        this.flagShowButton=false;
      }
    }
  }


  sendFormToCloud()
  { 
    if(this.data.lForms)
    {
      this.flagSincronazing=true;
      for(let key in this.data.lForms)
      {
        let form=this.data.lForms[key];
        let toast = this.toastCtrl.create(
        {
          message: 'Enviando formulario No.'+(parseInt(key)+1)+' '+this.data.name+' a la nube',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        this.saveForm.save(form,this.data.num,this.data.name)
      }
      this.storageService.removeStorageForm(this.data.name);
      this.count=0;
      this.flagShowButton=false;
      this.flagSincronazing=false;
    }
  }

}
