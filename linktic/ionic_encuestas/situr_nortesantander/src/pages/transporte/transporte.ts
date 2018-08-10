import { Component, OnInit } from '@angular/core';
import {  NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from '../../core/services/user.service'
import { StorageService } from '../../core/services/storage.service';

/**
 * Generated class for the TransportePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-transporte',
  templateUrl: 'transporte.html',
})
export class TransportePage {
  private transporte : FormGroup;

  constructor( private formBuilder: FormBuilder, private storageService: StorageService ) {
    this.transporte = this.formBuilder.group({
      nombre: [this.storageService.user.data.user.fullname],
      fechaencuesta: [this.dateTime()],
      prestador: [''],
      anos_funcionamiento: [''],
      tipo_vehiculo: ['', Validators.required],
      cantidad: ['', Validators.required],
      capacidad: ['', Validators.required],
      tarifa_pasajero: ['', Validators.required],
      tarifa_vehiculo: ['', Validators.required],
      pasajeros_transportados: ['', Validators.required],
      rumba: ['', Validators.required],
      transporte: ['', Validators.required],
      transporte_television: ['', Validators.required],
      transporte_bano: ['', Validators.required],
      recogida_domicilio: ['', Validators.required],
      alquiler_vehiculos: ['', Validators.required],
      refrigerios: ['', Validators.required],
      bebidas: ['', Validators.required],
      guia_turiticos: ['', Validators.required],
      otro: ['', Validators.required],
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
    console.log(this.transporte.value)
  }
}
