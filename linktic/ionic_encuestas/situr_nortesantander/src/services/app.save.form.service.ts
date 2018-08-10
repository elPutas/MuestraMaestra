import { StorageService } from '../core/services/storage.service';
import { Network } from "@ionic-native/network";
import { SendDataService } from "../core/services/sendData.service";
import { Injectable } from "@angular/core";
import { AlertService } from '../core/services/alert.service';
@Injectable()
export class AppSaveForm{
    public url:String;
    private formName='';
    private formNum:number;
    private form={};
    constructor(private storageService: StorageService, 
    private network: Network,
    private sendData: SendDataService,
    private alert: AlertService){
    }

    save(obj,formNum,formName)
    {
        var flag=false;
        this.formName=formName;
        this.formNum=formNum;
        this.form=obj;
        if(this.checkNetwork())
        {
            this.onlineForm();
            this.alert.alert('Formulario Guardado en la nube', 'success');
            flag=true;
        }
        else
        {
            this.offlineForm();
            this.alert.alert('Formulario Guardado en local', 'success');
            flag=true;
        }
        console.log(JSON.stringify(obj));
        return flag;
    }

    public onlineForm()
    {
        this.sendData.send(this.form,this.formNum)
        .subscribe(data => 
        {
            if(data.success) 
            {
                return true;
            }
            else
            {
                return false;
            }
        });
    }

    public offlineForm()
    {
        this.storageService.loadStorageForm(this.formName)
        .then(data => {
      if(!data)
      {
        var data2=[];
        data2.push(this.form);
        this.storageService.saveStorageForm(this.formName, data2);
      }
      else{
        data.push(this.form);
        this.storageService.saveStorageForm(this.formName, data);
      }
    });
  }


  public checkNetwork() 
  {
        if(this.network.type!='none')
        {
            return true;
        } 
        else
        {
            return false;
        }
    }   
}