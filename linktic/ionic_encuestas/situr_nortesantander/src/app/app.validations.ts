
import { AlertController } from "ionic-angular";
import { ElementRef } from '@angular/core';

export class AppValidations {
  //private alertCtrl: AlertController=new AlertController();
  constructor() {}
  public validate(container:ElementRef)
  {
    var flag=true;
    var requiresInput = container.nativeElement.querySelectorAll('.requiredInput'), i;
    var requiresSelect = container.nativeElement.querySelectorAll('.requiredSelect');

    for (i = 0; i < requiresInput.length; ++i) 
    {
      requiresInput[i].style.backgroundColor='white';
      requiresInput[i].style.color='black';
      if(!requiresInput[i].getElementsByTagName('input')[0].value)
      {
        requiresInput[i].style.backgroundColor='red';
        requiresInput[i].style.color='white';
        flag=false;        
      }
    }

    for (i = 0; i < requiresSelect.length; ++i) 
    {
      requiresSelect[i].style.backgroundColor='white';
      requiresSelect[i].style.color='black';
      if(!requiresSelect[i].getAttribute('ng-reflect-model'))
      {
        requiresSelect[i].style.backgroundColor='red';
        requiresSelect[i].style.color='white';
        flag=false;       
      }
    }
    return flag;
  }
}
