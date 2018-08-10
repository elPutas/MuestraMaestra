import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';

import { User } from '../interfaces/user.interface';
import { AlertService } from './alert.service';

@Injectable()
export class StorageService {

  public user: User;
  public receptor: any;

  constructor(
    private platform: Platform,
    private storage: Storage,
    private alert: AlertService
  ) {

  }

  //User

  public loadStorageUser(): any {

    let load = new Promise( (resolve, reject) => {

      if( this.platform.is('cordova') ){
        this.storage.ready()
          .then( () => {
            this.storage.get('user')
              .then( user => {
                if( user ) {
                  this.user = user;
                }
                resolve();
              });
          })

      } else {
        if (localStorage.getItem('user')){
          this.user = JSON.parse(localStorage.getItem('user' ));
        }
        resolve();
      }
    });

    return load;
  }

  public saveStorageUser(data: User): void {
    if( this.platform.is('cordova') ){
      this.storage.ready()
        .then(() => {
          this.storage.set('user', data);
          this.user = data;
        })
    } else {
      localStorage.setItem('user', JSON.stringify(data) );
      this.user = data;
    }
  }

  public removeStorageUser(): void {
    if( this.platform.is('cordova') ){
      this.storage.ready()
        .then(() => {
          this.storage.remove('user');
          this.removeStorageForm('alimentacion');
          this.removeStorageForm('receptor');
          this.removeStorageForm('receptor_dos');
        })
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('alimentacion');
      localStorage.removeItem('receptor');
      localStorage.removeItem('receptor_dos');
    }
  }

  //Forms

  public loadStorageForm(name: string): any {

    let values: any;

    return new Promise( (resolve, reject) => {

      if( this.platform.is('cordova') ){
        this.storage.ready()
          .then( () => {
            this.storage.get(name)
              .then( data => {
                if( data ) {
                  values = data;
                }
                resolve(values);
              });
          })

      } else {
        if (localStorage.getItem(name)){
          values = JSON.parse(localStorage.getItem(name));
        }
        resolve(values);
      }
    });
  }

  public saveStorageForm(name: string, data: any): void {
    if( this.platform.is('cordova') ){
      this.storage.ready()
        .then(() => {
          this.storage.set(name, data);
          //this.alert.alert('Formulario Guardado en Local', 'success');
        })
    } else {
      localStorage.setItem(name, JSON.stringify(data) );
      //this.alert.alert('Formulario Guardado en Local', 'success');
    }
  }

  public removeStorageForm(name: string): void {
    if( this.platform.is('cordova') ){
      this.storage.ready()
        .then(() => {
          this.storage.remove(name);
        })
    } else {
      localStorage.removeItem(name);
    }
  }


}
