import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AppConfigurations } from "../../app/app.configuration";
import { AuthService } from '../../core/services/user.service'
import { StorageService } from '../../core/services/storage.service';

/**
 * Generated class for the SitiosdeinteresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sitiosdeinteres',
  templateUrl: 'sitiosdeinteres.html',
})
export class SitiosdeinteresPage {
  private sitios : FormGroup;
  public mainNameApp: string;
  private appConfig:AppConfigurations;

  constructor( private formBuilder: FormBuilder, private storageService: StorageService ) {
    this.appConfig=new AppConfigurations();
    this.mainNameApp=this.appConfig.mainNameApp;
    this.sitios = this.formBuilder.group({
      nombre: [this.storageService.user.data.user.fullname],
      prestador: [''],
      ano_fundacion: ['', Validators.required],
      tipo_establecimiento: ['', Validators.required],
      otro: ['', Validators.required],
      capacidad: [''],
      hora: [''],
      formato_hora: [''],
      tarifa: [''],
      actividad_comercial: [''],
      dias_mes: ['', Validators.required],
      ningun_servicio: ['', Validators.required],
      instructor: ['', Validators.required],
      transporte: ['', Validators.required],
      alimentacion: ['', Validators.required],
      guia: ['', Validators.required],
      recorridos: ['', Validators.required],
      otros: ['', Validators.required],
      otro_servicio: ['', Validators.required],
      convenios: ['', Validators.required],
      tipo_convenio: ['', Validators.required],

    });
  }
  private dateTime(): string {
    const dateTime = new Date();
    return dateTime.toLocaleDateString() + ' ' + dateTime.toLocaleTimeString();
  }
  logForm(){
    console.log(this.sitios.value)
  }
}
