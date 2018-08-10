import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AppConfigurations } from "../../app/app.configuration";
import { StorageService } from '../../core/services/storage.service';
import { FunctionsGlobalsService } from '../../core/services/functions-globals.service';

/**
 * Generated class for the AlimentacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-alimentacion',
  templateUrl: 'alimentacion.html',
})
export class AlimentacionPage {

  private alimentacion : FormGroup;
  public mainNameApp: string;
  private appConfig:AppConfigurations;

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private functions: FunctionsGlobalsService
  ) {
    this.appConfig=new AppConfigurations();
    this.mainNameApp=this.appConfig.mainNameApp;
    this.alimentacion = this.formBuilder.group({
      nombre: [this.storageService.user.data.user.fullname],
      prestador: ['', Validators.required],
      tipo_establecimiento: [''],
      especialidad_establecimiento: [''],
      ano_fundacion: [''],
      platos: [''],
      unidades_max: [''],
      unidades_diciembre: [''],
      valor_diciembre: [''],
      vinos_vendidos: [''],
      postres_vendidos: [''],
      mesas_disponibles: [''],
      asientos_disponibles: [''],
      actividad_comercial: [''],
      dias_mes: [''],
      cientes_porcentaje: [''],
      lunes_apertura: [''],
      lunes_cierre: [''],
      martes_apertura: [''],
      martes_cierre: [''],
      miercoles_apertura: [''],
      miercoles_cierre: [''],
      jueves_apertura: [''],
      jueves_cierre: [''],
      viernes_apertura: [''],
      viernes_cierre: [''],
      sabado_apertura: [''],
      sabado_cierre: [''],
      domingo_apertura: [''],
      domingo_cierre: [''],
      otro_servicio: [''],
      area_recepcion: [''],
      banos_independientes: [''],
      auditorio_eventos: [''],
      servicio_eventos: [''],
      otro_complemento: [''],
      otro: [''],
      menu_dia: [''],
      cafeteria: [''],
      licores: [''],
      vinos: [''],
      postres: [''],
      parqueadero_propio: [''],
      servicio_domicilio: [''],
      zona_juegos: [''],
      convenios_si: [''],
      tipo_establecimiento_convenio: ['']
    });
  }


  ionViewDidLoad() {
    this.storageService.loadStorageForm('alimentacion')
      .then(data => {
        if(!this.functions.isnullOrUndefined(data))
          this.alimentacion.setValue(data);
      })
  }

  logForm(){
    console.log(this.alimentacion.value);
    this.alimentacion.reset({
        nombre: this.storageService.user.data.user.fullname
    });
    this.storageService.removeStorageForm('alimentacion');
  }

  offlineForm(): void {
    this.storageService.saveStorageForm('alimentacion', this.alimentacion.value);
  }


}
