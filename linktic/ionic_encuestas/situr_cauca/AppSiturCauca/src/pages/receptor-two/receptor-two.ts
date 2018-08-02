import { Component } from '@angular/core';
import { ViewController, MenuController, NavController, AlertController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AuthService } from '../../core/services/user.service'
import { StorageService } from '../../core/services/storage.service';
import { FunctionsGlobalsService }  from '../../core/services/functions-globals.service';
import {SendDataService} from "../../core/services/sendData.service";
import {AlertService} from "../../core/services/alert.service";
import {HomePage} from "../home/home";


@Component({
  selector: 'receptor-two',
  templateUrl: 'receptor-two.html'
})
export class ReceptorTwoPage {

  public myDate: string = '';
  public receptor_dos: FormGroup;
  public formsArray: any = [];
  public showOptionTransport: boolean = false;
  public showOptionPersonas: boolean = false;
  public showOptionIncluia: boolean = false;
  public showOptionOtroIncluia: boolean = false;
  public showOptionGastosUsted: boolean = false;
  public showOptionAtractivo: boolean = false;
  public showOptionTours: boolean = false;
  public showOptionActividades: boolean = false;
  public showOptionCaracteristicas: boolean = false;
  public showOptionComoEntero: boolean = false;
  public showOptionDurante: boolean = false;
  public showOptionDespuesRedes: boolean = false;
  public showOptionGastosViaje: boolean = false;
  public showOptionGastosConformaron: boolean = false;
  private fecha: any = {};
  public showOptionActividadRealizada: boolean = false;
  public showOptionGastosUstedO: boolean = false;
  public showOptionCiudadPlan: boolean = false;
  public municipioName:string[]=[];
  




  constructor(
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private userService: AuthService,
    private storageService: StorageService,
    private menu: MenuController,
    private functions: FunctionsGlobalsService,
    private nav: NavController,
    private alert: AlertController,
    private sendData: SendDataService,
    private alertService: AlertService,
    private navParams: NavParams
  ) {
    this.menu.enable(true, 'main-menu');
    this.fecha = this.navParams.get('fecha');

    let controls = {
      nombre: [this.storageService.user.data.user.fullname],
      duracion_estancia: [this.fecha],
      municipio: [''],
      cuantas_noches_paso: [''],
      int: ['', Validators.required],
      transporte: [''],
      opcion_transporte: [''],
      transporte_utilizado: [''],
      opcion_transporte_utilizado: [''],
      numero_personas: ['', Validators.required],
      personas_son: [''],
      opcion_personas_son: [''],
      antioquia_plant: ['', Validators.required],
      otras_ciudades: [''],
      cuanto_pago: ['', Validators.required],
      paquete_comprado: [''],
      ubicada_agencia: [''],
      servicio_alojamiento: [''],
      otra_ciudad: [''],
      que_incluia: [''],
      productos_incluia: [''],
      otro_productos_incluia: [''],
      gastos_usted: [''],
      otros_gastos: [''],
      cuanto_gasto: [''],
      tipo_moneda: [''],
      personas_cubrio: [''],
      cuanto_gasto_aereo: [''],
      personas_cubrio_aereo: [''],
      cuanto_gasto_terrestre: [''],
      personas_cubrio_terrestre: [''],
      nombre_empresa: [''],
      cuanto_gasto_terrestre_pasajeros: [''],
      personas_cubrio_terrestre_pasajeros: [''],
      alquiler_vehiculo: [''],
      alquiler_vehiculo_personas: [''],
      combustible: [''],
      combustible_personas: [''],
      alojamiento: [''],
      alojamiento_personas: [''],
      bebidas: [''],
      bebidas_personas: [''],
      recreativas: [''],
      recreativas_personas: [''],
      artesanias: [''],
      artesanias_personas: [''],
      objetos: [''],
      objetos_personas: [''],
      bienes: [''],
      bienes_personas: [''],
      asistencia: [''],
      asistencia_personas: [''],
      cursos: [''],
      cursos_personas: [''],
      medicos: [''],
    medicos_personas: [''],
    otros_gastos_terrestre: [''],
    otros_gastos_personas: [''],
    medio_pago: [''],
    medios_reserva: [''],
    hoteles: [''],
    porque_hoteles: [''],
    medios_transporte: [''],
    porque_medios_transporte: [''],
    bares_restaurantes: [''],
    porque_bares_restaurantes: [''],
    discotecas: [''],
    porque_discotecas: [''],
    tours: [''],
    porque_tours: [''],
    otro_cual: [''],
    otro_precio: [''],
    porque_otro_precio: [''],
    falta_atractivo: [''],
    opcion_atractivo: [''],
    encontrar_tours: [''],
    opcion_tours: [''],
    cuales_actividades: [''],
    opcion_cuales_actividades: [''],
    cuales_caracteristicas: [''],
    opcion_cuales_caracteristicas: [''],
    calificacion: [''],
    porque_calificacion: [''],
    escala_imagen: [''],
    pq_despues: [''],
    gusto_estadia: [''],
    observaciones: [''],
    autorizacion: [''],
    como_entero: [''],
    opcion_comoentero: [''],
    durante_permanencia: [''],
    opcion_permanencia: [''],
    despues_redes: [''],
    opcion_despues_redes: [''],
    enviar_info: [''],
    enviar_invitacion: [''],
    como_facebook: [''],
    como_twitter: [''],
    estado_edificio: [''],
    estado_muebles: [''],
    estado_sabana: [''],
    higiene: [''],
    trato_personal: [''],
    servicio_comidas: [''],
    precios_alojamiento: [''],
    servicio_restaurante: [''],
    sabor_platos: [''],
    variedad: [''],
    trato_personal_restaurante: [''],
    limpieza: [''],
    precio_platos: [''],
    aseo_municipios: [''],
    hospitalidad_municipios: [''],
    conservacion: [''],
    actividades_culturales: [''],
    actividades_deportivas: [''],
    parques: [''],
    discotecas_bares: [''],
    estado_carreteras: [''],
    transporte_local: [''],
    seguridad: [''],
    recomendacion: [''],
    experiencia: [''],
    volver_visitar: [''],
    recomendaria_antioquia: [''],
    gastos_viaje_empresa: [''],
    opcion_gastos_viaje_empresa: [''],
    gastos_conformaron: [''],
    option_gastos_conformaron: [''],
      otro_alojamiento: [''],
      municipio_elegido: ['', Validators.required],
      actividades_realizadas: ['', Validators.required],
      opcion_actividades_realizadas: [''],
      cuantas_personas_cubrio: [''],
      despliega_despliega: [''],
      despliega_despliega_viaje: [''],
      alquiler_vehiculo_e: [''],
      alquiler_vehiculo_despliegue: [''],
      alquiler_vehiculo_despliegue_dos: [''],
      bienes_despliega: [''],
      mayor_gasto: [''],
      otro: [''],
      otro_mayor_gasto: [''],
      opcion_gastos_viaje_empresao: [''],
      cuentas_personas: [''],
      ropa_calzado: [''],
      cual_visita_museoss: [''],
      otro_museo: [''],
      cual_visita_parques: [''],
      otro_parque: [''],
      cual_visita_parques_naturales: [''],
      otro_parques_naturales: [''],
      cual_visita_parques_hacienda: [''],
      otro_cual_visita_parques_hacienda: [''],
      cual_practica_deportes: [''],
      otro_cual_practica_deportes: ['']
    }
    for (var i = 0; i <= 20; ++i) {
      controls['municipio_'+i] = [''];
    }
    console.log(controls);
    this.receptor_dos = this.formBuilder.group(controls);
  }

  ionViewDidLoad() {
    this.storageService.loadStorageForm('receptor_dos')
      .then(data => {
        if(!this.functions.isnullOrUndefined(data))
          this.receptor_dos.setValue(data); 
      })
  }

  getNameMunicipio(event)
  {
    console.log(event);
    this.municipioName.push(event);
  }

  public validateSelectMultiple( valuesSelect: any, showValue: string, nameShowValue: string ) {
    if(this.receptor_dos.value[ valuesSelect ].length > 0) {
      for ( let i = 0; i < this.receptor_dos.value[ valuesSelect ].length; i++){
        if (this.receptor_dos.value[valuesSelect][i] === 'otro') {
          this[nameShowValue] = true;
            this.receptor_dos.controls[showValue].setValidators(Validators.required);
          break;
        }
        else {
          this[nameShowValue] = false;
          this.receptor_dos.get(showValue).updateValueAndValidity();
        }
      }
    }

  }
  public formReceptor(): void {

    this.sendData.send(this.receptor_dos.value , 1)
      .subscribe(data => {
        if(data.success || this.receptor_dos.value.int <= this.receptor_dos.value.duracion_estancia ) {
          this.alertService.alert('Datos enviados', 'success');
          this.receptor_dos.reset();
          this.nav.setRoot(HomePage);
        } else {
          this.alertService.alert('Ops algo salio mal', 'danger');
        }
      }, err => {
        this.alertService.alert('Ops algo salio mal', 'danger');
      });

  }

  public addToform(int): void{
    if ( int <= 20 ) {
      this.formsArray = [];
      for (var i = 0; i < int; ++i) {
        this.formsArray[i] = {
          index: i
        }
      }
    }
  }

  public changeValue(name: string, value: string, validate: Array<string>): void {
    if(this.receptor_dos.value[name] === value){
    	for(let i = 0; i < validate.length; i++){
	      this.receptor_dos.controls[validate[i]].setValidators(Validators.required);
    	}
    } else {

    	for(let i = 0; i < validate.length; i++){
      		this.receptor_dos.get(validate[i]).updateValueAndValidity();
    	}
    }
  }


  public offlineForm(): void {
    this.storageService.saveStorageForm('receptor_dos', this.receptor_dos.value);
  }

  private validateValue(value: any): boolean {
    if (value == 84) {
       return this.receptor_dos.value.duracion_parada <= 5;
    }
    else return false;
  }
}
