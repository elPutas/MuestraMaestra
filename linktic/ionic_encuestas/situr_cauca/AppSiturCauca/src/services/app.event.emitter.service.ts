import {Injectable, EventEmitter} from '@angular/core';
import { Moment1PersonModel } from '../model/emisor/moment1Person.model';
@Injectable()
export class EventEmiterService {
  eventPersonMoment = new EventEmitter();
  eventReceptorMomento1 = new EventEmitter();
  eventReceptorMomento2= new EventEmitter();
  eventReceptorSave= new EventEmitter();
  eventEmisorMomento1 = new EventEmitter();
  eventEmisorMomento2= new EventEmitter();
  eventEmisorSave= new EventEmitter();
  eventReceptorDays=new EventEmitter();

  constructor() { }

  sendReceptorDays(day:string)
  {
    this.eventReceptorDays.emit(day);
  }

  sendNewMomentPerson(lPerson: Moment1PersonModel[]) {
    this.eventPersonMoment.emit(lPerson);
  }

  sendReceptorMomento1(flag:boolean)
  {
    this.eventReceptorMomento1.emit(flag);
  }

  sendReceptorMomento2(flag:boolean)
  {
    this.eventReceptorMomento2.emit(flag);
  }

  sendReceptorSave(flag:boolean)
  {
    this.eventReceptorSave.emit(flag);
  }

  sendEmisorMomento1(flag:boolean)
  {
    this.eventEmisorMomento1.emit(flag);
  }

  sendEmisorMomento2(flag:boolean)
  {
    this.eventEmisorMomento2.emit(flag);
  }

  sendEmisorSave(flag:boolean)
  {
    this.eventEmisorSave.emit(flag);
  }
  
  /*sendMenuChange(menu: MenuModel) {
    this.eventMenuChange.emit(menu);
  }

  sendIsMenuOpen(flag: boolean) {
    this.eventIsMenuOpen.emit(flag);
  }

  sendIsScrolling()
  {
    if(this.countScroll>0)
    {
      this.eventIsScrolling.emit(true);
    }
    this.countScroll++;
    setTimeout(() => this.lessCount(), 1000);
  }

  sendCurrentUrlFriendly(urlFriendly)
  {
    this.eventUrlFriendly.emit(urlFriendly);
  }

  lessCount()
  {
      this.countScroll--;
      if(this.countScroll==0)
      {
        this.eventIsScrolling.emit(false);
      }
  }*/
}