import { Component } from '@angular/core';
import { MenuController, NavController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { StorageService } from '../../core/services/storage.service';
import { FunctionsGlobalsService }  from '../../core/services/functions-globals.service';

import { ReceptorTwoPage } from '../receptor-two/receptor-two';
import { SendDataService } from '../../core/services/sendData.service';
import { AlertService} from "../../core/services/alert.service";
import { ProveedorProvider } from '../../providers/proveedor/proveedor';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public myDate: string = '';
  public receptor: FormGroup;
  public proveedor : ProveedorProvider;
  public usuarios= [];
  public todo = [];
  public states = [];
  public allcities = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private menu: MenuController,
    private functions: FunctionsGlobalsService,
    private nav: NavController,
    private alert: AlertController,
    private sendData: SendDataService,
    private alertService: AlertService
  ) {
    this.menu.enable(true, 'main-menu');
   /* this.sendData.cities()
      .subscribe(data => {
      console.log(data,'Si datos');
      }, err => {
    });*/
    this.receptor = this.formBuilder.group({
      nombre: [this.storageService.user.data.user.fullname],
      fechaencuesta: [this.functions.dateTime()],
      lugar_encuesta: ['', Validators.required],
      otro_lugar: [''],
      fecha_llegada_antioquia: ['', Validators.required],
      fecha_salida_antioquia: ['', Validators.required],
      np: [''],
      cg: [''],
      ce: [''],
      en: [''],
      pais: [''],
      departamento: ['', Validators.required],
      ciudad: [''],
      motivo_venir_antioquia: ['', Validators.required],
      otro_motivo: [''],
      duracion_parada: ['' ],
      donde_nacio: ['', Validators.required],
      genero: ['', Validators.required],
      edad: ['', Validators.required],
      oferta_turistica_destino: ['', Validators.required],
      visto_antes_municipio: ['', Validators.required],
      cuantas_veces: [''],
      nombre_completo: ['', Validators.required],
      email: [''],
      indicativo: [''],
      celular: [''],
      telefono_fijo: [''],
      fenalco: ['', Validators.required],
      opcionsalud: [''],
      allcities: ['']
    });
  }

  ionViewDidLoad() {
    /*this.storageService.loadStorageForm('receptor')
      .then(data => {
        if(!this.functions.isnullOrUndefined(data))
          this.receptor.setValue(data);
      });
    /*this.proveedor.obtenerdatos()
       .subscribe(
        (data)=>{this.usuarios = data;},
        (error)=>{console.log(error);}
       )*/
  }

  public changeCity(data): void{
    if ( typeof this.cities['countries'][data] != 'undefined' ) {
      this.states = this.cities['countries'][data]['states'];
    }
  }
  public changeCiudad(data): void{
    if ( typeof this.states[data] != 'undefined' ) {
      this.allcities = this.states[data]['allcities'];
    }
  }

  public formReceptor(): void {
    let paradas = this.validateValue(this.receptor.value.motivo_venir_antioquia);
    if(this.receptor.value.edad <= 15 ||
      this.receptor.value.departamento === 'antioquia' ||
      this.receptor.value.motivo_venir_antioquia === 97 ||
      this.receptor.value.motivo_venir_antioquia === 793 ||
      paradas ||
      this.functions.countDate(this.receptor.value.fecha_llegada_antioquia, this.receptor.value.fecha_salida_antioquia) > 365
    ) {
      let alert = this.alert.create({
        title: 'La encuesta ha terminiado y ha sido Guardada. El encuestado no es considerado como Turista',
        buttons: [
          { text: 'Verficar datos' },
          { text: 'Terminar encuesta', handler: () => this.offlineForm() }
        ]
      });
      alert.present();
    } else {
      this.sendData.send(this.receptor.value , 0)
        .subscribe(data => {
          if(data.success) {
            this.alertService.alert('Datos enviados', 'success');
            this.nav.push(ReceptorTwoPage, {'fecha': this.functions.countDate(this.receptor.value.fecha_llegada_antioquia, this.receptor.value.fecha_salida_antioquia)});
            this.receptor.reset({
              nombre: this.storageService.user.data.user.fullname,
              fechaencuesta: this.functions.dateTime(),
            });
            this.storageService.removeStorageForm('receptor');
            
          } else {
            this.nav.push(ReceptorTwoPage, {'fecha': this.functions.countDate(this.receptor.value.fecha_llegada_antioquia, this.receptor.value.fecha_salida_antioquia)});
          }
        }, err => {
          this.alertService.alert('Ops algo salio mal', 'danger');
        });
    }
  }

  public changeValue(name: string, value, validate: string): void {
    if(this.receptor.value[name] === value){
      this.receptor.controls[validate].setValidators(Validators.required);
    } else {
      this.receptor.get(validate).updateValueAndValidity();
    }
  }

  public offlineForm(): void {
    this.storageService.saveStorageForm('receptor', this.receptor.value);
  }


  private validateValue(value: any): boolean {
    if (value == 84) {
       return this.receptor.value.duracion_parada <= 5;
    }
    else return false;
  }
  public cities = {
    "countries": [
      {
        "id": 1,
        "name": "Alemania",
        "states": [
          {
            "id": 1,
            "name": "No Aplica",
            "country_id": 1,
            "allcities": [
              {
                "id": 1,
                "name": "Región del Ruhr",
                "state_id": 1
              },
              {
                "id": 2,
                "name": "Colonia",
                "state_id": 1
              },
              {
                "id": 3,
                "name": "Düsseldorf",
                "state_id": 1
              },
              {
                "id": 4,
                "name": "Dortmund",
                "state_id": 1
              },
              {
                "id": 5,
                "name": "Bremen",
                "state_id": 1
              },
              {
                "id": 6,
                "name": "Leipzig",
                "state_id": 1
              },
              {
                "id": 7,
                "name": "Karlsruhe",
                "state_id": 1
              },
              {
                "id": 8,
                "name": "Gelsenkirchen",
                "state_id": 1
              },
              {
                "id": 9,
                "name": "Friburgo de Brisgovia",
                "state_id": 1
              },
              {
                "id": 10,
                "name": "Leverkusen",
                "state_id": 1
              },
              {
                "id": 11,
                "name": "Wolfsburgo",
                "state_id": 1
              },
              {
                "id": 12,
                "name": "Berlín",
                "state_id": 1
              },
              {
                "id": 13,
                "name": "Frankfurt",
                "state_id": 1
              },
              {
                "id": 14,
                "name": "Hamburgo",
                "state_id": 1
              },
              {
                "id": 15,
                "name": "Stuttgart",
                "state_id": 1
              },
              {
                "id": 16,
                "name": "Múnich",
                "state_id": 1
              },
              {
                "id": 17,
                "name": "Mannheim",
                "state_id": 1
              },
              {
                "id": 18,
                "name": "Núremberg",
                "state_id": 1
              },
              {
                "id": 19,
                "name": "Hannover",
                "state_id": 1
              },
              {
                "id": 811,
                "name": "Berlín",
                "state_id": 1
              }
            ]
          }
        ]
      },
      {
        "id": 2,
        "name": "Angola",
        "states": [
          {
            "id": 2,
            "name": "No Aplica",
            "country_id": 2,
            "allcities": [
              {
                "id": 20,
                "name": "Luanda",
                "state_id": 2
              },
              {
                "id": 21,
                "name": "Huambo",
                "state_id": 2
              },
              {
                "id": 813,
                "name": "Luanda",
                "state_id": 2
              }
            ]
          }
        ]
      },
      {
        "id": 3,
        "name": "Arabia Saudita",
        "states": [
          {
            "id": 3,
            "name": "No Aplica",
            "country_id": 3,
            "allcities": [
              {
                "id": 22,
                "name": "Riad",
                "state_id": 3
              },
              {
                "id": 23,
                "name": "Yida",
                "state_id": 3
              },
              {
                "id": 24,
                "name": "Dammam",
                "state_id": 3
              },
              {
                "id": 25,
                "name": "La Meca",
                "state_id": 3
              },
              {
                "id": 26,
                "name": "Medina",
                "state_id": 3
              },
              {
                "id": 815,
                "name": "Riad",
                "state_id": 3
              }
            ]
          }
        ]
      },
      {
        "id": 4,
        "name": "Argelia",
        "states": [
          {
            "id": 4,
            "name": "No Aplica",
            "country_id": 4,
            "allcities": [
              {
                "id": 27,
                "name": "Argel",
                "state_id": 4
              },
              {
                "id": 28,
                "name": "Orán",
                "state_id": 4
              },
              {
                "id": 816,
                "name": "Argel",
                "state_id": 4
              }
            ]
          }
        ]
      },
      {
        "id": 5,
        "name": "Argentina",
        "states": [
          {
            "id": 5,
            "name": "No Aplica",
            "country_id": 5,
            "allcities": [
              {
                "id": 29,
                "name": "Buenos Aires",
                "state_id": 5
              },
              {
                "id": 30,
                "name": "Córdoba",
                "state_id": 5
              },
              {
                "id": 31,
                "name": "Rosario",
                "state_id": 5
              },
              {
                "id": 32,
                "name": "Mendoza",
                "state_id": 5
              },
              {
                "id": 33,
                "name": "San Miguel de Tucumán",
                "state_id": 5
              },
              {
                "id": 34,
                "name": "La Plata",
                "state_id": 5
              },
              {
                "id": 35,
                "name": "Mar del Plata",
                "state_id": 5
              },
              {
                "id": 36,
                "name": "Salta",
                "state_id": 5
              },
              {
                "id": 37,
                "name": "Santa Fe",
                "state_id": 5
              },
              {
                "id": 38,
                "name": "San Juan",
                "state_id": 5
              },
              {
                "id": 39,
                "name": "Corrientes",
                "state_id": 5
              },
              {
                "id": 40,
                "name": "Resistencia",
                "state_id": 5
              },
              {
                "id": 41,
                "name": "Posadas",
                "state_id": 5
              },
              {
                "id": 42,
                "name": "Paraná",
                "state_id": 5
              },
              {
                "id": 43,
                "name": "San Salvador de Jujuy",
                "state_id": 5
              },
              {
                "id": 44,
                "name": "Santiago del Estero",
                "state_id": 5
              },
              {
                "id": 45,
                "name": "Formosa",
                "state_id": 5
              },
              {
                "id": 46,
                "name": "Neuquén",
                "state_id": 5
              },
              {
                "id": 47,
                "name": "Godoy Cruz",
                "state_id": 5
              },
              {
                "id": 48,
                "name": "Rio Cuarto",
                "state_id": 5
              },
              {
                "id": 49,
                "name": "San Luis",
                "state_id": 5
              },
              {
                "id": 50,
                "name": "Concordia",
                "state_id": 5
              },
              {
                "id": 51,
                "name": "La Rioja",
                "state_id": 5
              },
              {
                "id": 52,
                "name": "San Fernando del Valle de Catamarca",
                "state_id": 5
              },
              {
                "id": 53,
                "name": "Comodoro Rivadavia",
                "state_id": 5
              },
              {
                "id": 54,
                "name": "San Rafael",
                "state_id": 5
              },
              {
                "id": 55,
                "name": "Puerto Madryn",
                "state_id": 5
              },
              {
                "id": 56,
                "name": "San Carlos de Bariloche",
                "state_id": 5
              },
              {
                "id": 57,
                "name": "Maipú",
                "state_id": 5
              },
              {
                "id": 58,
                "name": "Rafaela",
                "state_id": 5
              },
              {
                "id": 59,
                "name": "Rivadavia",
                "state_id": 5
              },
              {
                "id": 60,
                "name": "Gualeguaychú",
                "state_id": 5
              },
              {
                "id": 61,
                "name": "Villa Gobernador Gálvez",
                "state_id": 5
              },
              {
                "id": 62,
                "name": "Concepción del Uruguay",
                "state_id": 5
              },
              {
                "id": 63,
                "name": "Provincia de Buenos Aires",
                "state_id": 5
              },
              {
                "id": 64,
                "name": "Ushuaia",
                "state_id": 5
              },
              {
                "id": 65,
                "name": "San Pedro de Jujuy",
                "state_id": 5
              },
              {
                "id": 817,
                "name": "Buenos Aires",
                "state_id": 5
              }
            ]
          }
        ]
      },
      {
        "id": 6,
        "name": "Armenia",
        "states": [
          {
            "id": 6,
            "name": "No Aplica",
            "country_id": 6,
            "allcities": [
              {
                "id": 66,
                "name": "Ereván",
                "state_id": 6
              },
              {
                "id": 818,
                "name": "Ereván",
                "state_id": 6
              }
            ]
          }
        ]
      },
      {
        "id": 7,
        "name": "Australia",
        "states": [
          {
            "id": 7,
            "name": "No Aplica",
            "country_id": 7,
            "allcities": [
              {
                "id": 67,
                "name": "Sídney",
                "state_id": 7
              },
              {
                "id": 68,
                "name": "Melbourne",
                "state_id": 7
              },
              {
                "id": 69,
                "name": "Brisbane",
                "state_id": 7
              },
              {
                "id": 70,
                "name": "Perth",
                "state_id": 7
              },
              {
                "id": 71,
                "name": "Canberra",
                "state_id": 7
              },
              {
                "id": 72,
                "name": "Adelaida",
                "state_id": 7
              },
              {
                "id": 820,
                "name": "Canberra",
                "state_id": 7
              }
            ]
          }
        ]
      },
      {
        "id": 8,
        "name": "Austria",
        "states": [
          {
            "id": 8,
            "name": "No Aplica",
            "country_id": 8,
            "allcities": [
              {
                "id": 73,
                "name": "Viena",
                "state_id": 8
              },
              {
                "id": 74,
                "name": "Innsbruck",
                "state_id": 8
              },
              {
                "id": 75,
                "name": "Salzburgo",
                "state_id": 8
              },
              {
                "id": 76,
                "name": "Wolfsberg",
                "state_id": 8
              },
              {
                "id": 821,
                "name": "Viena",
                "state_id": 8
              }
            ]
          }
        ]
      },
      {
        "id": 9,
        "name": "Azerbaiyán",
        "states": [
          {
            "id": 9,
            "name": "No Aplica",
            "country_id": 9,
            "allcities": [
              {
                "id": 77,
                "name": "Bakú",
                "state_id": 9
              },
              {
                "id": 822,
                "name": "Bakú",
                "state_id": 9
              }
            ]
          }
        ]
      },
      {
        "id": 10,
        "name": "Bangladés",
        "states": [
          {
            "id": 10,
            "name": "No Aplica",
            "country_id": 10,
            "allcities": [
              {
                "id": 78,
                "name": "Daca",
                "state_id": 10
              },
              {
                "id": 79,
                "name": "Chittagong",
                "state_id": 10
              },
              {
                "id": 80,
                "name": "Khulna",
                "state_id": 10
              },
              {
                "id": 825,
                "name": "Daca",
                "state_id": 10
              }
            ]
          }
        ]
      },
      {
        "id": 11,
        "name": "Bélgica",
        "states": [
          {
            "id": 11,
            "name": "No Aplica",
            "country_id": 11,
            "allcities": [
              {
                "id": 81,
                "name": "Bruselas",
                "state_id": 11
              },
              {
                "id": 82,
                "name": "Amberes",
                "state_id": 11
              },
              {
                "id": 83,
                "name": "Lieja",
                "state_id": 11
              },
              {
                "id": 84,
                "name": "Gante",
                "state_id": 11
              },
              {
                "id": 85,
                "name": "Charleroi",
                "state_id": 11
              },
              {
                "id": 828,
                "name": "Bruselas",
                "state_id": 11
              }
            ]
          }
        ]
      },
      {
        "id": 12,
        "name": "Benín",
        "states": [
          {
            "id": 12,
            "name": "No Aplica",
            "country_id": 12,
            "allcities": [
              {
                "id": 86,
                "name": "Cotonú",
                "state_id": 12
              },
              {
                "id": 830,
                "name": "Porto-Novo",
                "state_id": 12
              }
            ]
          }
        ]
      },
      {
        "id": 13,
        "name": "Bielorrusia",
        "states": [
          {
            "id": 13,
            "name": "No Aplica",
            "country_id": 13,
            "allcities": [
              {
                "id": 87,
                "name": "Minsk",
                "state_id": 13
              },
              {
                "id": 88,
                "name": "Gómel",
                "state_id": 13
              },
              {
                "id": 89,
                "name": "Borisov",
                "state_id": 13
              },
              {
                "id": 831,
                "name": "Minsk",
                "state_id": 13
              }
            ]
          }
        ]
      },
      {
        "id": 14,
        "name": "Bolivia",
        "states": [
          {
            "id": 14,
            "name": "No Aplica",
            "country_id": 14,
            "allcities": [
              {
                "id": 90,
                "name": "La Paz",
                "state_id": 14
              },
              {
                "id": 91,
                "name": "Santa Cruz",
                "state_id": 14
              },
              {
                "id": 92,
                "name": "Cochabamba",
                "state_id": 14
              },
              {
                "id": 93,
                "name": "Cercado",
                "state_id": 14
              },
              {
                "id": 94,
                "name": "Chuquisaca",
                "state_id": 14
              },
              {
                "id": 95,
                "name": "Oruro",
                "state_id": 14
              },
              {
                "id": 96,
                "name": "Potosí",
                "state_id": 14
              },
              {
                "id": 97,
                "name": "Beni",
                "state_id": 14
              },
              {
                "id": 98,
                "name": "Pando",
                "state_id": 14
              },
              {
                "id": 99,
                "name": "Tarija",
                "state_id": 14
              },
              {
                "id": 833,
                "name": "Sucre",
                "state_id": 14
              }
            ]
          }
        ]
      },
      {
        "id": 15,
        "name": "Brasil",
        "states": [
          {
            "id": 15,
            "name": "No Aplica",
            "country_id": 15,
            "allcities": [
              {
                "id": 100,
                "name": "Belém",
                "state_id": 15
              },
              {
                "id": 101,
                "name": "Belo Horizonte",
                "state_id": 15
              },
              {
                "id": 102,
                "name": "Brasilia",
                "state_id": 15
              },
              {
                "id": 103,
                "name": "Campinas",
                "state_id": 15
              },
              {
                "id": 104,
                "name": "Curitiba",
                "state_id": 15
              },
              {
                "id": 105,
                "name": "Florianópolis",
                "state_id": 15
              },
              {
                "id": 106,
                "name": "Fortaleza",
                "state_id": 15
              },
              {
                "id": 107,
                "name": "Goiânia",
                "state_id": 15
              },
              {
                "id": 108,
                "name": "João Pessoa",
                "state_id": 15
              },
              {
                "id": 109,
                "name": "Joinville",
                "state_id": 15
              },
              {
                "id": 110,
                "name": "Maceió",
                "state_id": 15
              },
              {
                "id": 111,
                "name": "Manaos",
                "state_id": 15
              },
              {
                "id": 112,
                "name": "Natal",
                "state_id": 15
              },
              {
                "id": 113,
                "name": "Itabira",
                "state_id": 15
              },
              {
                "id": 114,
                "name": "Porto Alegre",
                "state_id": 15
              },
              {
                "id": 115,
                "name": "Recife",
                "state_id": 15
              },
              {
                "id": 116,
                "name": "Río de Janeiro",
                "state_id": 15
              },
              {
                "id": 117,
                "name": "Salvador de Bahía",
                "state_id": 15
              },
              {
                "id": 118,
                "name": "Santos",
                "state_id": 15
              },
              {
                "id": 119,
                "name": "São Luís",
                "state_id": 15
              },
              {
                "id": 120,
                "name": "São Paulo",
                "state_id": 15
              },
              {
                "id": 121,
                "name": "Teresina",
                "state_id": 15
              },
              {
                "id": 122,
                "name": "Vitória",
                "state_id": 15
              },
              {
                "id": 123,
                "name": "Cuiaba",
                "state_id": 15
              },
              {
                "id": 124,
                "name": "Londrina",
                "state_id": 15
              },
              {
                "id": 125,
                "name": "Santos",
                "state_id": 15
              },
              {
                "id": 126,
                "name": "Boa Vista",
                "state_id": 15
              },
              {
                "id": 127,
                "name": "Ribeirao Preto",
                "state_id": 15
              },
              {
                "id": 836,
                "name": "Brasilia",
                "state_id": 15
              }
            ]
          }
        ]
      },
      {
        "id": 16,
        "name": "Bulgaria",
        "states": [
          {
            "id": 16,
            "name": "No Aplica",
            "country_id": 16,
            "allcities": [
              {
                "id": 128,
                "name": "Sofía",
                "state_id": 16
              },
              {
                "id": 129,
                "name": "Plovdiv",
                "state_id": 16
              },
              {
                "id": 130,
                "name": "Burgas",
                "state_id": 16
              },
              {
                "id": 838,
                "name": "Sofía",
                "state_id": 16
              }
            ]
          }
        ]
      },
      {
        "id": 17,
        "name": "Burkina Faso",
        "states": [
          {
            "id": 17,
            "name": "No Aplica",
            "country_id": 17,
            "allcities": [
              {
                "id": 131,
                "name": "Uagadugú",
                "state_id": 17
              },
              {
                "id": 839,
                "name": "Uagadugú",
                "state_id": 17
              }
            ]
          }
        ]
      },
      {
        "id": 18,
        "name": "Camboya",
        "states": [
          {
            "id": 18,
            "name": "No Aplica",
            "country_id": 18,
            "allcities": [
              {
                "id": 132,
                "name": "Nom Pen",
                "state_id": 18
              },
              {
                "id": 843,
                "name": "Nom Pen",
                "state_id": 18
              }
            ]
          }
        ]
      },
      {
        "id": 19,
        "name": "Camerún",
        "states": [
          {
            "id": 19,
            "name": "No Aplica",
            "country_id": 19,
            "allcities": [
              {
                "id": 133,
                "name": "Duala",
                "state_id": 19
              },
              {
                "id": 134,
                "name": "Yaundé",
                "state_id": 19
              },
              {
                "id": 844,
                "name": "Yaundé",
                "state_id": 19
              }
            ]
          }
        ]
      },
      {
        "id": 20,
        "name": "Canadá",
        "states": [
          {
            "id": 20,
            "name": "No Aplica",
            "country_id": 20,
            "allcities": [
              {
                "id": 135,
                "name": "Toronto",
                "state_id": 20
              },
              {
                "id": 136,
                "name": "Windsor",
                "state_id": 20
              },
              {
                "id": 137,
                "name": "Montreal",
                "state_id": 20
              },
              {
                "id": 138,
                "name": "Vancouver",
                "state_id": 20
              },
              {
                "id": 139,
                "name": "Calgary",
                "state_id": 20
              },
              {
                "id": 140,
                "name": "Edmonton",
                "state_id": 20
              },
              {
                "id": 141,
                "name": "Ottawa",
                "state_id": 20
              },
              {
                "id": 142,
                "name": "Carmacks",
                "state_id": 20
              },
              {
                "id": 143,
                "name": "Quebec",
                "state_id": 20
              },
              {
                "id": 845,
                "name": "Ottawa",
                "state_id": 20
              }
            ]
          }
        ]
      },
      {
        "id": 21,
        "name": "Chad",
        "states": [
          {
            "id": 21,
            "name": "No Aplica",
            "country_id": 21,
            "allcities": [
              {
                "id": 144,
                "name": "Yamena",
                "state_id": 21
              },
              {
                "id": 847,
                "name": "Yamena",
                "state_id": 21
              }
            ]
          }
        ]
      },
      {
        "id": 22,
        "name": "Chile",
        "states": [
          {
            "id": 22,
            "name": "No Aplica",
            "country_id": 22,
            "allcities": [
              {
                "id": 145,
                "name": "Santiago",
                "state_id": 22
              },
              {
                "id": 146,
                "name": "Valparaíso",
                "state_id": 22
              },
              {
                "id": 147,
                "name": "Concepción",
                "state_id": 22
              },
              {
                "id": 148,
                "name": "La serena",
                "state_id": 22
              },
              {
                "id": 149,
                "name": "Antofagasta",
                "state_id": 22
              },
              {
                "id": 150,
                "name": "Temuco",
                "state_id": 22
              },
              {
                "id": 151,
                "name": "Puerto Montt",
                "state_id": 22
              },
              {
                "id": 152,
                "name": "Osorno",
                "state_id": 22
              },
              {
                "id": 153,
                "name": "Calama",
                "state_id": 22
              },
              {
                "id": 154,
                "name": "Viña del Mar",
                "state_id": 22
              },
              {
                "id": 155,
                "name": "Arica",
                "state_id": 22
              },
              {
                "id": 156,
                "name": "Chillán",
                "state_id": 22
              },
              {
                "id": 157,
                "name": "Frutillar",
                "state_id": 22
              },
              {
                "id": 158,
                "name": "Iquique",
                "state_id": 22
              },
              {
                "id": 159,
                "name": "Puerto Natales",
                "state_id": 22
              },
              {
                "id": 848,
                "name": "Santiago",
                "state_id": 22
              }
            ]
          }
        ]
      },
      {
        "id": 23,
        "name": "China",
        "states": [
          {
            "id": 23,
            "name": "No Aplica",
            "country_id": 23,
            "allcities": [
              {
                "id": 160,
                "name": "Cantón (incl. Dongguan, Foshan,Jiangmen, Shenzhen, Zhongshan)",
                "state_id": 23
              },
              {
                "id": 161,
                "name": "Shanghái (incl. Suzhou, Kunshan)",
                "state_id": 23
              },
              {
                "id": 162,
                "name": "Pekín",
                "state_id": 23
              },
              {
                "id": 163,
                "name": "Tianjin",
                "state_id": 23
              },
              {
                "id": 164,
                "name": "Xiamen (incl. Quanzhou)",
                "state_id": 23
              },
              {
                "id": 165,
                "name": "Chengdu",
                "state_id": 23
              },
              {
                "id": 166,
                "name": "Hangzhou (incl. Shaoxing)",
                "state_id": 23
              },
              {
                "id": 167,
                "name": "Wuhan",
                "state_id": 23
              },
              {
                "id": 168,
                "name": "Shantou (incl. Chaozhou, Puning,Chaoyang - Chaonan)",
                "state_id": 23
              },
              {
                "id": 169,
                "name": "Shenyang (incl. Fushun)",
                "state_id": 23
              },
              {
                "id": 170,
                "name": "Chongqing",
                "state_id": 23
              },
              {
                "id": 171,
                "name": "Nankín",
                "state_id": 23
              },
              {
                "id": 172,
                "name": "Xi'an",
                "state_id": 23
              },
              {
                "id": 173,
                "name": "Wenzhou (incl. Rui'an)",
                "state_id": 23
              },
              {
                "id": 174,
                "name": "Qingdao",
                "state_id": 23
              },
              {
                "id": 175,
                "name": "Harbin",
                "state_id": 23
              },
              {
                "id": 176,
                "name": "Zhengzhou",
                "state_id": 23
              },
              {
                "id": 177,
                "name": "Hefei",
                "state_id": 23
              },
              {
                "id": 178,
                "name": "Dalian",
                "state_id": 23
              },
              {
                "id": 179,
                "name": "Changsha",
                "state_id": 23
              },
              {
                "id": 180,
                "name": "Taiyuan",
                "state_id": 23
              },
              {
                "id": 181,
                "name": "Kunming",
                "state_id": 23
              },
              {
                "id": 182,
                "name": "Jinan",
                "state_id": 23
              },
              {
                "id": 183,
                "name": "Fuzhou",
                "state_id": 23
              },
              {
                "id": 184,
                "name": "Shijiazhuang",
                "state_id": 23
              },
              {
                "id": 185,
                "name": "Changchun",
                "state_id": 23
              },
              {
                "id": 186,
                "name": "Nanchang",
                "state_id": 23
              },
              {
                "id": 187,
                "name": "Ürümqi",
                "state_id": 23
              },
              {
                "id": 188,
                "name": "Ningbo",
                "state_id": 23
              },
              {
                "id": 189,
                "name": "Zibo",
                "state_id": 23
              },
              {
                "id": 190,
                "name": "Wuxi",
                "state_id": 23
              },
              {
                "id": 191,
                "name": "Nanning",
                "state_id": 23
              },
              {
                "id": 192,
                "name": "Guiyang",
                "state_id": 23
              },
              {
                "id": 193,
                "name": "Lanzhou",
                "state_id": 23
              },
              {
                "id": 194,
                "name": "Huizhou",
                "state_id": 23
              },
              {
                "id": 195,
                "name": "Changzhou",
                "state_id": 23
              },
              {
                "id": 196,
                "name": "Jiangyin",
                "state_id": 23
              },
              {
                "id": 197,
                "name": "Xuzhou",
                "state_id": 23
              },
              {
                "id": 198,
                "name": "Anshan",
                "state_id": 23
              },
              {
                "id": 199,
                "name": "Tangshan",
                "state_id": 23
              },
              {
                "id": 200,
                "name": "Baotou",
                "state_id": 23
              },
              {
                "id": 201,
                "name": "Yantai",
                "state_id": 23
              },
              {
                "id": 202,
                "name": "Cixi",
                "state_id": 23
              },
              {
                "id": 203,
                "name": "Luoyang",
                "state_id": 23
              },
              {
                "id": 204,
                "name": "Nantong",
                "state_id": 23
              },
              {
                "id": 205,
                "name": "Liuzhou",
                "state_id": 23
              },
              {
                "id": 206,
                "name": "Huai'an",
                "state_id": 23
              },
              {
                "id": 207,
                "name": "Haikou",
                "state_id": 23
              },
              {
                "id": 208,
                "name": "Yangzhou",
                "state_id": 23
              },
              {
                "id": 209,
                "name": "Hohhot",
                "state_id": 23
              },
              {
                "id": 210,
                "name": "Huainan",
                "state_id": 23
              },
              {
                "id": 211,
                "name": "Linyi",
                "state_id": 23
              },
              {
                "id": 212,
                "name": "Hengyang",
                "state_id": 23
              },
              {
                "id": 213,
                "name": "Weifang (incl. Zhucheng)",
                "state_id": 23
              },
              {
                "id": 214,
                "name": "Baoding",
                "state_id": 23
              },
              {
                "id": 215,
                "name": "Daqing",
                "state_id": 23
              },
              {
                "id": 216,
                "name": "Xiangyang",
                "state_id": 23
              },
              {
                "id": 217,
                "name": "Yiwu",
                "state_id": 23
              },
              {
                "id": 218,
                "name": "Zhuhai",
                "state_id": 23
              },
              {
                "id": 219,
                "name": "Datong",
                "state_id": 23
              },
              {
                "id": 220,
                "name": "Yinchuan",
                "state_id": 23
              },
              {
                "id": 221,
                "name": "Jilin",
                "state_id": 23
              },
              {
                "id": 222,
                "name": "Jiaozuo",
                "state_id": 23
              },
              {
                "id": 223,
                "name": "Handan",
                "state_id": 23
              },
              {
                "id": 224,
                "name": "Putian",
                "state_id": 23
              },
              {
                "id": 225,
                "name": "Xiangtan",
                "state_id": 23
              },
              {
                "id": 226,
                "name": "Xining",
                "state_id": 23
              },
              {
                "id": 227,
                "name": "Huaibei",
                "state_id": 23
              },
              {
                "id": 228,
                "name": "Xinxiang",
                "state_id": 23
              },
              {
                "id": 229,
                "name": "Wuhu",
                "state_id": 23
              },
              {
                "id": 230,
                "name": "Xingtai",
                "state_id": 23
              },
              {
                "id": 231,
                "name": "Yancheng",
                "state_id": 23
              },
              {
                "id": 232,
                "name": "Taian",
                "state_id": 23
              },
              {
                "id": 233,
                "name": "Guilin",
                "state_id": 23
              },
              {
                "id": 234,
                "name": "Zhangjiakou",
                "state_id": 23
              },
              {
                "id": 235,
                "name": "Mianyang",
                "state_id": 23
              },
              {
                "id": 236,
                "name": "Zhanjiang",
                "state_id": 23
              },
              {
                "id": 237,
                "name": "Bengbu",
                "state_id": 23
              },
              {
                "id": 238,
                "name": "Yichang",
                "state_id": 23
              },
              {
                "id": 239,
                "name": "Qingyuan",
                "state_id": 23
              },
              {
                "id": 240,
                "name": "Zunyi",
                "state_id": 23
              },
              {
                "id": 241,
                "name": "Maanshan",
                "state_id": 23
              },
              {
                "id": 242,
                "name": "Qinhuangdao",
                "state_id": 23
              },
              {
                "id": 243,
                "name": "Changshu",
                "state_id": 23
              },
              {
                "id": 244,
                "name": "Cangnan",
                "state_id": 23
              },
              {
                "id": 245,
                "name": "Zhuzhou",
                "state_id": 23
              },
              {
                "id": 246,
                "name": "Maoming",
                "state_id": 23
              },
              {
                "id": 247,
                "name": "Benxi",
                "state_id": 23
              },
              {
                "id": 248,
                "name": "Qiqihar",
                "state_id": 23
              },
              {
                "id": 249,
                "name": "Lianyungang",
                "state_id": 23
              },
              {
                "id": 250,
                "name": "Zhenjiang",
                "state_id": 23
              },
              {
                "id": 251,
                "name": "Kaifeng",
                "state_id": 23
              },
              {
                "id": 252,
                "name": "Rizhao",
                "state_id": 23
              },
              {
                "id": 253,
                "name": "Nanchong",
                "state_id": 23
              },
              {
                "id": 254,
                "name": "Jinzhou",
                "state_id": 23
              },
              {
                "id": 255,
                "name": "Chifeng",
                "state_id": 23
              },
              {
                "id": 256,
                "name": "Nanyang",
                "state_id": 23
              },
              {
                "id": 257,
                "name": "Wanzhou",
                "state_id": 23
              },
              {
                "id": 258,
                "name": "Jining",
                "state_id": 23
              },
              {
                "id": 259,
                "name": "Taizhou",
                "state_id": 23
              },
              {
                "id": 260,
                "name": "Anyang",
                "state_id": 23
              },
              {
                "id": 261,
                "name": "Suqian",
                "state_id": 23
              },
              {
                "id": 262,
                "name": "Zaozhuang (incl. Tengzhou)",
                "state_id": 23
              },
              {
                "id": 263,
                "name": "Yingkou",
                "state_id": 23
              },
              {
                "id": 264,
                "name": "Baoji",
                "state_id": 23
              },
              {
                "id": 265,
                "name": "Zhangzhou",
                "state_id": 23
              },
              {
                "id": 266,
                "name": "Weihai",
                "state_id": 23
              },
              {
                "id": 267,
                "name": "Dongying",
                "state_id": 23
              },
              {
                "id": 268,
                "name": "Jiaxing",
                "state_id": 23
              },
              {
                "id": 269,
                "name": "Jiamusi",
                "state_id": 23
              },
              {
                "id": 270,
                "name": "Fuzhou",
                "state_id": 23
              },
              {
                "id": 271,
                "name": "Huzhou",
                "state_id": 23
              },
              {
                "id": 849,
                "name": "Pekín",
                "state_id": 23
              }
            ]
          }
        ]
      },
      {
        "id": 24,
        "name": "Corea del Norte",
        "states": [
          {
            "id": 24,
            "name": "No Aplica",
            "country_id": 24,
            "allcities": [
              {
                "id": 272,
                "name": "Pionyang",
                "state_id": 24
              },
              {
                "id": 853,
                "name": "Pionyang",
                "state_id": 24
              }
            ]
          }
        ]
      },
      {
        "id": 25,
        "name": "Corea del Sur",
        "states": [
          {
            "id": 25,
            "name": "No Aplica",
            "country_id": 25,
            "allcities": [
              {
                "id": 273,
                "name": "Seúl (incl. Incheon, Suwon)",
                "state_id": 25
              },
              {
                "id": 274,
                "name": "Busán",
                "state_id": 25
              },
              {
                "id": 275,
                "name": "Daegu",
                "state_id": 25
              },
              {
                "id": 276,
                "name": "Daejeon",
                "state_id": 25
              },
              {
                "id": 277,
                "name": "Gwangju",
                "state_id": 25
              },
              {
                "id": 278,
                "name": "Ulsan",
                "state_id": 25
              },
              {
                "id": 279,
                "name": "Changwon",
                "state_id": 25
              },
              {
                "id": 280,
                "name": "Yongin",
                "state_id": 25
              },
              {
                "id": 854,
                "name": "Seúl",
                "state_id": 25
              }
            ]
          }
        ]
      },
      {
        "id": 26,
        "name": "Costa de Marfil",
        "states": [
          {
            "id": 26,
            "name": "No Aplica",
            "country_id": 26,
            "allcities": [
              {
                "id": 281,
                "name": "Abiyán",
                "state_id": 26
              },
              {
                "id": 855,
                "name": "Yamusukro",
                "state_id": 26
              }
            ]
          }
        ]
      },
      {
        "id": 27,
        "name": "Dinamarca",
        "states": [
          {
            "id": 27,
            "name": "No Aplica",
            "country_id": 27,
            "allcities": [
              {
                "id": 282,
                "name": "Copenhague",
                "state_id": 27
              },
              {
                "id": 283,
                "name": "Odense",
                "state_id": 27
              },
              {
                "id": 284,
                "name": "Aarhus",
                "state_id": 27
              },
              {
                "id": 285,
                "name": "Nuuk",
                "state_id": 27
              },
              {
                "id": 286,
                "name": "Silkeborg",
                "state_id": 27
              },
              {
                "id": 287,
                "name": "Thisted",
                "state_id": 27
              },
              {
                "id": 870,
                "name": "Copenhague",
                "state_id": 27
              }
            ]
          }
        ]
      },
      {
        "id": 28,
        "name": "Ecuador",
        "states": [
          {
            "id": 28,
            "name": "No Aplica",
            "country_id": 28,
            "allcities": [
              {
                "id": 288,
                "name": "Guayaquil",
                "state_id": 28
              },
              {
                "id": 289,
                "name": "Quito",
                "state_id": 28
              },
              {
                "id": 290,
                "name": "Cuenca",
                "state_id": 28
              },
              {
                "id": 291,
                "name": "Santo Domingo",
                "state_id": 28
              },
              {
                "id": 292,
                "name": "Machala",
                "state_id": 28
              },
              {
                "id": 293,
                "name": "Riobamba",
                "state_id": 28
              },
              {
                "id": 294,
                "name": "San Juan Bautista de Ambato",
                "state_id": 28
              },
              {
                "id": 295,
                "name": "Babahoyo",
                "state_id": 28
              },
              {
                "id": 296,
                "name": "Esmeraldas",
                "state_id": 28
              },
              {
                "id": 297,
                "name": "Guaranda",
                "state_id": 28
              },
              {
                "id": 298,
                "name": "Ibarra",
                "state_id": 28
              },
              {
                "id": 299,
                "name": "Nueva Loja",
                "state_id": 28
              },
              {
                "id": 300,
                "name": "Latacunga",
                "state_id": 28
              },
              {
                "id": 301,
                "name": "Otavalo",
                "state_id": 28
              },
              {
                "id": 302,
                "name": "Provincia del Cañar",
                "state_id": 28
              },
              {
                "id": 303,
                "name": "Quevedo",
                "state_id": 28
              },
              {
                "id": 304,
                "name": "Santa Elena",
                "state_id": 28
              },
              {
                "id": 305,
                "name": "Tulcan",
                "state_id": 28
              },
              {
                "id": 872,
                "name": "Quito",
                "state_id": 28
              }
            ]
          }
        ]
      },
      {
        "id": 29,
        "name": "Egipto",
        "states": [
          {
            "id": 29,
            "name": "No Aplica",
            "country_id": 29,
            "allcities": [
              {
                "id": 306,
                "name": "El Cairo",
                "state_id": 29
              },
              {
                "id": 307,
                "name": "Alejandría",
                "state_id": 29
              },
              {
                "id": 873,
                "name": "El Cairo",
                "state_id": 29
              }
            ]
          }
        ]
      },
      {
        "id": 30,
        "name": "Emiratos Árabes Unidos",
        "states": [
          {
            "id": 30,
            "name": "No Aplica",
            "country_id": 30,
            "allcities": [
              {
                "id": 308,
                "name": "Dubái (incl.Sarja)",
                "state_id": 30
              },
              {
                "id": 309,
                "name": "Abu Dabi",
                "state_id": 30
              },
              {
                "id": 879,
                "name": "Abu Dabi",
                "state_id": 30
              }
            ]
          }
        ]
      },
      {
        "id": 31,
        "name": "España",
        "states": [
          {
            "id": 31,
            "name": "No Aplica",
            "country_id": 31,
            "allcities": [
              {
                "id": 310,
                "name": "Madrid",
                "state_id": 31
              },
              {
                "id": 311,
                "name": "Barcelona",
                "state_id": 31
              },
              {
                "id": 312,
                "name": "Valencia",
                "state_id": 31
              },
              {
                "id": 313,
                "name": "Sevilla",
                "state_id": 31
              },
              {
                "id": 314,
                "name": "Málaga",
                "state_id": 31
              },
              {
                "id": 315,
                "name": "Bilbao",
                "state_id": 31
              },
              {
                "id": 316,
                "name": "Zaragoza",
                "state_id": 31
              },
              {
                "id": 317,
                "name": "Murcia",
                "state_id": 31
              },
              {
                "id": 318,
                "name": "Asturias",
                "state_id": 31
              },
              {
                "id": 319,
                "name": "Castellón",
                "state_id": 31
              },
              {
                "id": 320,
                "name": "Logroño",
                "state_id": 31
              },
              {
                "id": 321,
                "name": "Navarra",
                "state_id": 31
              },
              {
                "id": 322,
                "name": "Orcoyen",
                "state_id": 31
              },
              {
                "id": 323,
                "name": "Santander",
                "state_id": 31
              },
              {
                "id": 324,
                "name": "Victoria",
                "state_id": 31
              },
              {
                "id": 325,
                "name": "Palma de Mallorca",
                "state_id": 31
              },
              {
                "id": 326,
                "name": "Las Palmas de Gran Canaria",
                "state_id": 31
              },
              {
                "id": 327,
                "name": "Alicante",
                "state_id": 31
              },
              {
                "id": 328,
                "name": "Cordoba",
                "state_id": 31
              },
              {
                "id": 329,
                "name": "Valladolid",
                "state_id": 31
              },
              {
                "id": 330,
                "name": "Vigo",
                "state_id": 31
              },
              {
                "id": 331,
                "name": "Gijón",
                "state_id": 31
              },
              {
                "id": 332,
                "name": "La Coruña",
                "state_id": 31
              },
              {
                "id": 333,
                "name": "Granada",
                "state_id": 31
              },
              {
                "id": 334,
                "name": "Elche",
                "state_id": 31
              },
              {
                "id": 335,
                "name": "Oviedo",
                "state_id": 31
              },
              {
                "id": 336,
                "name": "Cartagena",
                "state_id": 31
              },
              {
                "id": 337,
                "name": "Jerez de la Frontera",
                "state_id": 31
              },
              {
                "id": 338,
                "name": "Sabadell",
                "state_id": 31
              },
              {
                "id": 339,
                "name": "Santa Cruz de Tenerife",
                "state_id": 31
              },
              {
                "id": 340,
                "name": "Pamplona",
                "state_id": 31
              },
              {
                "id": 341,
                "name": "Almería",
                "state_id": 31
              },
              {
                "id": 342,
                "name": "San Sebastián",
                "state_id": 31
              },
              {
                "id": 343,
                "name": "Burgos",
                "state_id": 31
              },
              {
                "id": 344,
                "name": "Albacete",
                "state_id": 31
              },
              {
                "id": 345,
                "name": "Burgos",
                "state_id": 31
              },
              {
                "id": 346,
                "name": "Huelva",
                "state_id": 31
              },
              {
                "id": 347,
                "name": "Salamanca",
                "state_id": 31
              },
              {
                "id": 348,
                "name": "Tarragona",
                "state_id": 31
              },
              {
                "id": 349,
                "name": "León",
                "state_id": 31
              },
              {
                "id": 350,
                "name": "Cádiz",
                "state_id": 31
              },
              {
                "id": 351,
                "name": "Orense",
                "state_id": 31
              },
              {
                "id": 883,
                "name": "Madrid",
                "state_id": 31
              }
            ]
          }
        ]
      },
      {
        "id": 32,
        "name": "Estados Unidos",
        "states": [
          {
            "id": 203,
            "name": "Alabama",
            "country_id": 32,
            "allcities": [
              {
                "id": 1040,
                "name": "Birmingham",
                "state_id": 203
              },
              {
                "id": 1041,
                "name": "Huntsville",
                "state_id": 203
              },
              {
                "id": 1042,
                "name": "Mobile",
                "state_id": 203
              },
              {
                "id": 1043,
                "name": "Montgomery",
                "state_id": 203
              }
            ]
          },
          {
            "id": 204,
            "name": "Alaska",
            "country_id": 32,
            "allcities": [
              {
                "id": 1044,
                "name": "Anchorage",
                "state_id": 204
              }
            ]
          },
          {
            "id": 205,
            "name": "Arizona",
            "country_id": 32,
            "allcities": [
              {
                "id": 1045,
                "name": "Chandler",
                "state_id": 205
              },
              {
                "id": 1046,
                "name": "Gilbert",
                "state_id": 205
              },
              {
                "id": 1047,
                "name": "Glendale",
                "state_id": 205
              },
              {
                "id": 1048,
                "name": "Mesa",
                "state_id": 205
              },
              {
                "id": 1049,
                "name": "Peoria",
                "state_id": 205
              },
              {
                "id": 1050,
                "name": "Phoenix",
                "state_id": 205
              },
              {
                "id": 1051,
                "name": "Scottsdale",
                "state_id": 205
              },
              {
                "id": 1052,
                "name": "Surprise",
                "state_id": 205
              },
              {
                "id": 1053,
                "name": "Tempe",
                "state_id": 205
              },
              {
                "id": 1054,
                "name": "Tucson",
                "state_id": 205
              }
            ]
          },
          {
            "id": 206,
            "name": "Arkansas",
            "country_id": 32,
            "allcities": [
              {
                "id": 1055,
                "name": "Little Rock",
                "state_id": 206
              }
            ]
          },
          {
            "id": 207,
            "name": "California",
            "country_id": 32,
            "allcities": [
              {
                "id": 1056,
                "name": "Anaheim",
                "state_id": 207
              },
              {
                "id": 1057,
                "name": "Antioch",
                "state_id": 207
              },
              {
                "id": 1058,
                "name": "Bakersfield",
                "state_id": 207
              },
              {
                "id": 1059,
                "name": "Berkeley",
                "state_id": 207
              },
              {
                "id": 1060,
                "name": "Burbank",
                "state_id": 207
              },
              {
                "id": 1061,
                "name": "Carlsbad",
                "state_id": 207
              },
              {
                "id": 1062,
                "name": "Chico",
                "state_id": 207
              },
              {
                "id": 1063,
                "name": "Chula Vista",
                "state_id": 207
              },
              {
                "id": 1064,
                "name": "Concord",
                "state_id": 207
              },
              {
                "id": 1065,
                "name": "Corona",
                "state_id": 207
              },
              {
                "id": 1066,
                "name": "Costa Mesa",
                "state_id": 207
              },
              {
                "id": 1067,
                "name": "Daly City",
                "state_id": 207
              },
              {
                "id": 1068,
                "name": "Downey",
                "state_id": 207
              },
              {
                "id": 1069,
                "name": "El Monte",
                "state_id": 207
              },
              {
                "id": 1070,
                "name": "Elk Grove",
                "state_id": 207
              },
              {
                "id": 1071,
                "name": "Escondido",
                "state_id": 207
              },
              {
                "id": 1072,
                "name": "Fairfield",
                "state_id": 207
              },
              {
                "id": 1073,
                "name": "Fontana",
                "state_id": 207
              },
              {
                "id": 1074,
                "name": "Fremont",
                "state_id": 207
              },
              {
                "id": 1075,
                "name": "Fresno",
                "state_id": 207
              },
              {
                "id": 1076,
                "name": "Fullerton",
                "state_id": 207
              },
              {
                "id": 1077,
                "name": "Garden Grove",
                "state_id": 207
              },
              {
                "id": 1078,
                "name": "Glendale",
                "state_id": 207
              },
              {
                "id": 1079,
                "name": "Hayward",
                "state_id": 207
              },
              {
                "id": 1080,
                "name": "Huntington Beach",
                "state_id": 207
              },
              {
                "id": 1081,
                "name": "Inglewood",
                "state_id": 207
              },
              {
                "id": 1082,
                "name": "Irvine",
                "state_id": 207
              },
              {
                "id": 1083,
                "name": "Lancaster",
                "state_id": 207
              },
              {
                "id": 1084,
                "name": "Long Beach",
                "state_id": 207
              },
              {
                "id": 1085,
                "name": "Los Ángeles",
                "state_id": 207
              },
              {
                "id": 1086,
                "name": "Modesto",
                "state_id": 207
              },
              {
                "id": 1087,
                "name": "Moreno Valley",
                "state_id": 207
              },
              {
                "id": 1088,
                "name": "Murrieta",
                "state_id": 207
              },
              {
                "id": 1089,
                "name": "Norwalk",
                "state_id": 207
              },
              {
                "id": 1090,
                "name": "Oakland",
                "state_id": 207
              },
              {
                "id": 1091,
                "name": "Oceanside",
                "state_id": 207
              },
              {
                "id": 1092,
                "name": "Ontario",
                "state_id": 207
              },
              {
                "id": 1093,
                "name": "Orange",
                "state_id": 207
              },
              {
                "id": 1094,
                "name": "Oxnard",
                "state_id": 207
              },
              {
                "id": 1095,
                "name": "Palmdale",
                "state_id": 207
              },
              {
                "id": 1096,
                "name": "Pasadena",
                "state_id": 207
              },
              {
                "id": 1097,
                "name": "Pomona",
                "state_id": 207
              },
              {
                "id": 1098,
                "name": "Rancho Cucamonga",
                "state_id": 207
              },
              {
                "id": 1099,
                "name": "Richmond",
                "state_id": 207
              },
              {
                "id": 1100,
                "name": "Riverside",
                "state_id": 207
              },
              {
                "id": 1101,
                "name": "Roseville",
                "state_id": 207
              },
              {
                "id": 1102,
                "name": "Sacramento",
                "state_id": 207
              },
              {
                "id": 1103,
                "name": "Salinas",
                "state_id": 207
              },
              {
                "id": 1104,
                "name": "San Bernardino",
                "state_id": 207
              },
              {
                "id": 1105,
                "name": "San Diego",
                "state_id": 207
              },
              {
                "id": 1106,
                "name": "San Francisco",
                "state_id": 207
              },
              {
                "id": 1107,
                "name": "San José",
                "state_id": 207
              },
              {
                "id": 1108,
                "name": "Santa Ana",
                "state_id": 207
              },
              {
                "id": 1109,
                "name": "Santa Clara",
                "state_id": 207
              },
              {
                "id": 1110,
                "name": "Santa Clarita",
                "state_id": 207
              },
              {
                "id": 1111,
                "name": "Santa Rosa",
                "state_id": 207
              },
              {
                "id": 1112,
                "name": "Simi Valley",
                "state_id": 207
              },
              {
                "id": 1113,
                "name": "Stockton",
                "state_id": 207
              },
              {
                "id": 1114,
                "name": "Sunnyvale",
                "state_id": 207
              },
              {
                "id": 1115,
                "name": "Temecula",
                "state_id": 207
              },
              {
                "id": 1116,
                "name": "Thousand Oaks",
                "state_id": 207
              },
              {
                "id": 1117,
                "name": "Torrance",
                "state_id": 207
              },
              {
                "id": 1118,
                "name": "Vallejo",
                "state_id": 207
              },
              {
                "id": 1119,
                "name": "Ventura",
                "state_id": 207
              },
              {
                "id": 1120,
                "name": "Victorville",
                "state_id": 207
              },
              {
                "id": 1121,
                "name": "Visalia",
                "state_id": 207
              },
              {
                "id": 1122,
                "name": "West Covina",
                "state_id": 207
              }
            ]
          },
          {
            "id": 208,
            "name": "California",
            "country_id": 32,
            "allcities": []
          },
          {
            "id": 209,
            "name": "Carolina del Norte",
            "country_id": 32,
            "allcities": [
              {
                "id": 1123,
                "name": "Cary",
                "state_id": 209
              },
              {
                "id": 1124,
                "name": "Charlotte",
                "state_id": 209
              },
              {
                "id": 1125,
                "name": "Durham",
                "state_id": 209
              },
              {
                "id": 1126,
                "name": "Fayetteville",
                "state_id": 209
              },
              {
                "id": 1127,
                "name": "Greensboro",
                "state_id": 209
              },
              {
                "id": 1128,
                "name": "High Point",
                "state_id": 209
              },
              {
                "id": 1129,
                "name": "Raleigh",
                "state_id": 209
              },
              {
                "id": 1130,
                "name": "Wilmington",
                "state_id": 209
              },
              {
                "id": 1131,
                "name": "Winston-Salem",
                "state_id": 209
              }
            ]
          },
          {
            "id": 210,
            "name": "Carolina del Sur",
            "country_id": 32,
            "allcities": [
              {
                "id": 1132,
                "name": "Breenville",
                "state_id": 210
              },
              {
                "id": 1133,
                "name": "Charleston",
                "state_id": 210
              },
              {
                "id": 1134,
                "name": "Columbia",
                "state_id": 210
              }
            ]
          },
          {
            "id": 211,
            "name": "Carolina del Sur",
            "country_id": 32,
            "allcities": []
          },
          {
            "id": 212,
            "name": "Colorado",
            "country_id": 32,
            "allcities": [
              {
                "id": 1135,
                "name": "Arvada",
                "state_id": 212
              },
              {
                "id": 1136,
                "name": "Aurora",
                "state_id": 212
              },
              {
                "id": 1137,
                "name": "Boulder",
                "state_id": 212
              },
              {
                "id": 1138,
                "name": "Centennial",
                "state_id": 212
              },
              {
                "id": 1139,
                "name": "Colorado Springs",
                "state_id": 212
              },
              {
                "id": 1140,
                "name": "Denver",
                "state_id": 212
              },
              {
                "id": 1141,
                "name": "Fort Collins",
                "state_id": 212
              },
              {
                "id": 1142,
                "name": "Lakewood",
                "state_id": 212
              },
              {
                "id": 1143,
                "name": "Pueblo",
                "state_id": 212
              },
              {
                "id": 1144,
                "name": "Thornton",
                "state_id": 212
              },
              {
                "id": 1145,
                "name": "Westminster",
                "state_id": 212
              }
            ]
          },
          {
            "id": 213,
            "name": "Colorado",
            "country_id": 32,
            "allcities": []
          },
          {
            "id": 214,
            "name": "Connecticut",
            "country_id": 32,
            "allcities": [
              {
                "id": 1146,
                "name": "Bridgeport",
                "state_id": 214
              },
              {
                "id": 1147,
                "name": "Hartford",
                "state_id": 214
              },
              {
                "id": 1148,
                "name": "New Haven",
                "state_id": 214
              },
              {
                "id": 1149,
                "name": "Norwalk",
                "state_id": 214
              },
              {
                "id": 1150,
                "name": "Stamford",
                "state_id": 214
              },
              {
                "id": 1151,
                "name": "Waterbury",
                "state_id": 214
              }
            ]
          },
          {
            "id": 215,
            "name": "Dakota del Norte",
            "country_id": 32,
            "allcities": [
              {
                "id": 1152,
                "name": "Fargo",
                "state_id": 215
              }
            ]
          },
          {
            "id": 216,
            "name": "Dakota del Sur",
            "country_id": 32,
            "allcities": [
              {
                "id": 1153,
                "name": "Sioux Falls",
                "state_id": 216
              }
            ]
          },
          {
            "id": 217,
            "name": "Florida",
            "country_id": 32,
            "allcities": [
              {
                "id": 1154,
                "name": "Cape Coral",
                "state_id": 217
              },
              {
                "id": 1155,
                "name": "Clearwater",
                "state_id": 217
              },
              {
                "id": 1156,
                "name": "Coral Springs",
                "state_id": 217
              },
              {
                "id": 1157,
                "name": "Fort Lauderdale",
                "state_id": 217
              },
              {
                "id": 1158,
                "name": "Gainesville",
                "state_id": 217
              },
              {
                "id": 1159,
                "name": "Hialeah",
                "state_id": 217
              },
              {
                "id": 1160,
                "name": "Hollywood",
                "state_id": 217
              },
              {
                "id": 1161,
                "name": "Jacksonville",
                "state_id": 217
              },
              {
                "id": 1162,
                "name": "Miami",
                "state_id": 217
              },
              {
                "id": 1163,
                "name": "Miami Gardens",
                "state_id": 217
              },
              {
                "id": 1164,
                "name": "Miramar",
                "state_id": 217
              },
              {
                "id": 1165,
                "name": "Orlando",
                "state_id": 217
              },
              {
                "id": 1166,
                "name": "Palm Bay",
                "state_id": 217
              },
              {
                "id": 1167,
                "name": "Pembroke Pines",
                "state_id": 217
              },
              {
                "id": 1168,
                "name": "Port St. Lucie",
                "state_id": 217
              },
              {
                "id": 1169,
                "name": "San Petersburgo",
                "state_id": 217
              },
              {
                "id": 1170,
                "name": "Sunrise",
                "state_id": 217
              },
              {
                "id": 1171,
                "name": "Tallahassee",
                "state_id": 217
              },
              {
                "id": 1172,
                "name": "Tamarac",
                "state_id": 217
              },
              {
                "id": 1173,
                "name": "Tampa",
                "state_id": 217
              }
            ]
          },
          {
            "id": 218,
            "name": "Florida",
            "country_id": 32,
            "allcities": []
          },
          {
            "id": 219,
            "name": "Georgia",
            "country_id": 32,
            "allcities": [
              {
                "id": 1174,
                "name": "Athens",
                "state_id": 219
              },
              {
                "id": 1175,
                "name": "Atlanta",
                "state_id": 219
              },
              {
                "id": 1176,
                "name": "Augusta",
                "state_id": 219
              },
              {
                "id": 1177,
                "name": "Columbus",
                "state_id": 219
              },
              {
                "id": 1178,
                "name": "Savannah",
                "state_id": 219
              }
            ]
          },
          {
            "id": 220,
            "name": "Hawái",
            "country_id": 32,
            "allcities": [
              {
                "id": 352,
                "name": "Honolulu",
                "state_id": 220
              },
              {
                "id": 1179,
                "name": "Honolulú",
                "state_id": 220
              }
            ]
          },
          {
            "id": 221,
            "name": "Idaho",
            "country_id": 32,
            "allcities": [
              {
                "id": 1180,
                "name": "Boise",
                "state_id": 221
              }
            ]
          },
          {
            "id": 222,
            "name": "Illinois",
            "country_id": 32,
            "allcities": [
              {
                "id": 1181,
                "name": "Aurora",
                "state_id": 222
              },
              {
                "id": 1182,
                "name": "Chicago",
                "state_id": 222
              },
              {
                "id": 1183,
                "name": "Elgin",
                "state_id": 222
              },
              {
                "id": 1184,
                "name": "Joliet",
                "state_id": 222
              },
              {
                "id": 1185,
                "name": "Naperville",
                "state_id": 222
              },
              {
                "id": 1186,
                "name": "Peoria",
                "state_id": 222
              },
              {
                "id": 1187,
                "name": "Rockford",
                "state_id": 222
              },
              {
                "id": 1188,
                "name": "Springfield",
                "state_id": 222
              }
            ]
          },
          {
            "id": 223,
            "name": "Indiana",
            "country_id": 32,
            "allcities": [
              {
                "id": 1189,
                "name": "Evansville",
                "state_id": 223
              },
              {
                "id": 1190,
                "name": "Fort Wayne",
                "state_id": 223
              },
              {
                "id": 1191,
                "name": "Indianápolis",
                "state_id": 223
              },
              {
                "id": 1192,
                "name": "Seymour",
                "state_id": 223
              },
              {
                "id": 1193,
                "name": "South Bend",
                "state_id": 223
              }
            ]
          },
          {
            "id": 224,
            "name": "Iowa",
            "country_id": 32,
            "allcities": [
              {
                "id": 1194,
                "name": "Cedar Rapids",
                "state_id": 224
              },
              {
                "id": 1195,
                "name": "Des Moines",
                "state_id": 224
              }
            ]
          },
          {
            "id": 225,
            "name": "Kansas",
            "country_id": 32,
            "allcities": [
              {
                "id": 1196,
                "name": "Kansas City",
                "state_id": 225
              },
              {
                "id": 1197,
                "name": "Olathe",
                "state_id": 225
              },
              {
                "id": 1198,
                "name": "Overland Park",
                "state_id": 225
              },
              {
                "id": 1199,
                "name": "Topeka",
                "state_id": 225
              },
              {
                "id": 1200,
                "name": "Wichita",
                "state_id": 225
              }
            ]
          },
          {
            "id": 226,
            "name": "Kentucky",
            "country_id": 32,
            "allcities": [
              {
                "id": 1201,
                "name": "Lexington",
                "state_id": 226
              },
              {
                "id": 1202,
                "name": "Louisville",
                "state_id": 226
              }
            ]
          },
          {
            "id": 227,
            "name": "Luisiana",
            "country_id": 32,
            "allcities": [
              {
                "id": 1203,
                "name": "Baton Rouge",
                "state_id": 227
              },
              {
                "id": 1204,
                "name": "Lafayette",
                "state_id": 227
              },
              {
                "id": 1205,
                "name": "Metairie",
                "state_id": 227
              },
              {
                "id": 1206,
                "name": "Nueva Orleans",
                "state_id": 227
              },
              {
                "id": 1207,
                "name": "Shreveport",
                "state_id": 227
              }
            ]
          },
          {
            "id": 228,
            "name": "Maryland",
            "country_id": 32,
            "allcities": [
              {
                "id": 1208,
                "name": "Baltimore",
                "state_id": 228
              }
            ]
          },
          {
            "id": 229,
            "name": "Massachusetts",
            "country_id": 32,
            "allcities": [
              {
                "id": 1209,
                "name": "Boston",
                "state_id": 229
              },
              {
                "id": 1210,
                "name": "Cambridge",
                "state_id": 229
              },
              {
                "id": 1211,
                "name": "Lowell",
                "state_id": 229
              },
              {
                "id": 1212,
                "name": "Springfield",
                "state_id": 229
              },
              {
                "id": 1213,
                "name": "Worcester",
                "state_id": 229
              }
            ]
          },
          {
            "id": 230,
            "name": "Míchigan",
            "country_id": 32,
            "allcities": [
              {
                "id": 1214,
                "name": "Ann Arbor",
                "state_id": 230
              },
              {
                "id": 1215,
                "name": "Detroit",
                "state_id": 230
              },
              {
                "id": 1216,
                "name": "Flint",
                "state_id": 230
              },
              {
                "id": 1217,
                "name": "Grand Rapids",
                "state_id": 230
              },
              {
                "id": 1218,
                "name": "Lansing",
                "state_id": 230
              },
              {
                "id": 1219,
                "name": "Sterling Heights",
                "state_id": 230
              },
              {
                "id": 1220,
                "name": "Warren",
                "state_id": 230
              }
            ]
          },
          {
            "id": 231,
            "name": "Minnesota",
            "country_id": 32,
            "allcities": [
              {
                "id": 1221,
                "name": "Mineápolis",
                "state_id": 231
              },
              {
                "id": 1222,
                "name": "Rochester",
                "state_id": 231
              },
              {
                "id": 1223,
                "name": "Saint Paul",
                "state_id": 231
              },
              {
                "id": 1224,
                "name": "St Paul",
                "state_id": 231
              }
            ]
          },
          {
            "id": 232,
            "name": "Misisipi",
            "country_id": 32,
            "allcities": [
              {
                "id": 1225,
                "name": "Jackson",
                "state_id": 232
              }
            ]
          },
          {
            "id": 233,
            "name": "Misuri",
            "country_id": 32,
            "allcities": [
              {
                "id": 1226,
                "name": "Columbia",
                "state_id": 233
              },
              {
                "id": 1227,
                "name": "Independence",
                "state_id": 233
              },
              {
                "id": 1228,
                "name": "Kansas City (Misuri)",
                "state_id": 233
              },
              {
                "id": 1229,
                "name": "San Luis",
                "state_id": 233
              },
              {
                "id": 1230,
                "name": "Springfield",
                "state_id": 233
              }
            ]
          },
          {
            "id": 234,
            "name": "Montana",
            "country_id": 32,
            "allcities": [
              {
                "id": 1231,
                "name": "Billings",
                "state_id": 234
              },
              {
                "id": 1232,
                "name": "Condado de Missouala",
                "state_id": 234
              }
            ]
          },
          {
            "id": 235,
            "name": "Montana",
            "country_id": 32,
            "allcities": []
          },
          {
            "id": 236,
            "name": "Nebraska",
            "country_id": 32,
            "allcities": [
              {
                "id": 1233,
                "name": "Lincoln",
                "state_id": 236
              },
              {
                "id": 1234,
                "name": "Omaha",
                "state_id": 236
              }
            ]
          },
          {
            "id": 237,
            "name": "Nevada",
            "country_id": 32,
            "allcities": [
              {
                "id": 1235,
                "name": "Carson City",
                "state_id": 237
              },
              {
                "id": 1236,
                "name": "Henderson",
                "state_id": 237
              },
              {
                "id": 1237,
                "name": "Las Vegas",
                "state_id": 237
              },
              {
                "id": 1238,
                "name": "North Las Vegas",
                "state_id": 237
              },
              {
                "id": 1239,
                "name": "Paradise",
                "state_id": 237
              },
              {
                "id": 1240,
                "name": "Reno",
                "state_id": 237
              },
              {
                "id": 1241,
                "name": "Sun Valley",
                "state_id": 237
              }
            ]
          },
          {
            "id": 238,
            "name": "Nevada",
            "country_id": 32,
            "allcities": []
          },
          {
            "id": 239,
            "name": "New York",
            "country_id": 32,
            "allcities": [
              {
                "id": 1242,
                "name": "Albany",
                "state_id": 239
              }
            ]
          },
          {
            "id": 240,
            "name": "Nueva Jersey",
            "country_id": 32,
            "allcities": [
              {
                "id": 1243,
                "name": "Condado de Monmouth",
                "state_id": 240
              },
              {
                "id": 1244,
                "name": "Elizabeth",
                "state_id": 240
              },
              {
                "id": 1245,
                "name": "Jersey City",
                "state_id": 240
              },
              {
                "id": 1246,
                "name": "Newark",
                "state_id": 240
              },
              {
                "id": 1247,
                "name": "Paterson",
                "state_id": 240
              },
              {
                "id": 1248,
                "name": "Trenton",
                "state_id": 240
              }
            ]
          },
          {
            "id": 241,
            "name": "Nueva Jersey",
            "country_id": 32,
            "allcities": []
          },
          {
            "id": 242,
            "name": "Nueva York",
            "country_id": 32,
            "allcities": [
              {
                "id": 1249,
                "name": "Búfalo",
                "state_id": 242
              },
              {
                "id": 1250,
                "name": "Nueva York",
                "state_id": 242
              },
              {
                "id": 1251,
                "name": "Rochester",
                "state_id": 242
              },
              {
                "id": 1252,
                "name": "Salamanca",
                "state_id": 242
              },
              {
                "id": 1253,
                "name": "Siracusa",
                "state_id": 242
              },
              {
                "id": 1254,
                "name": "Yonkers",
                "state_id": 242
              }
            ]
          },
          {
            "id": 243,
            "name": "Nuevo Hampshire",
            "country_id": 32,
            "allcities": [
              {
                "id": 1255,
                "name": "Manchester",
                "state_id": 243
              }
            ]
          },
          {
            "id": 244,
            "name": "Nuevo México",
            "country_id": 32,
            "allcities": [
              {
                "id": 1256,
                "name": "Albuquerque",
                "state_id": 244
              }
            ]
          },
          {
            "id": 245,
            "name": "Ohio",
            "country_id": 32,
            "allcities": [
              {
                "id": 1257,
                "name": "Akron",
                "state_id": 245
              },
              {
                "id": 1258,
                "name": "Cincinnati",
                "state_id": 245
              },
              {
                "id": 1259,
                "name": "Cleveland",
                "state_id": 245
              },
              {
                "id": 1260,
                "name": "Columbus",
                "state_id": 245
              },
              {
                "id": 1261,
                "name": "Dayton",
                "state_id": 245
              },
              {
                "id": 1262,
                "name": "Toledo",
                "state_id": 245
              }
            ]
          },
          {
            "id": 246,
            "name": "Oklahoma",
            "country_id": 32,
            "allcities": [
              {
                "id": 1263,
                "name": "Norman",
                "state_id": 246
              },
              {
                "id": 1264,
                "name": "Oklahoma City",
                "state_id": 246
              },
              {
                "id": 1265,
                "name": "Tulsa",
                "state_id": 246
              }
            ]
          },
          {
            "id": 247,
            "name": "Oregón",
            "country_id": 32,
            "allcities": [
              {
                "id": 1266,
                "name": "Eugene",
                "state_id": 247
              },
              {
                "id": 1267,
                "name": "Gresham",
                "state_id": 247
              },
              {
                "id": 1268,
                "name": "Portland",
                "state_id": 247
              },
              {
                "id": 1269,
                "name": "Salem",
                "state_id": 247
              }
            ]
          },
          {
            "id": 248,
            "name": "Pensilvania",
            "country_id": 32,
            "allcities": [
              {
                "id": 1270,
                "name": "Allentown",
                "state_id": 248
              },
              {
                "id": 1271,
                "name": "Erie",
                "state_id": 248
              },
              {
                "id": 1272,
                "name": "Filadelfia",
                "state_id": 248
              },
              {
                "id": 1273,
                "name": "Harrisburg",
                "state_id": 248
              },
              {
                "id": 1274,
                "name": "Pittsburgh",
                "state_id": 248
              }
            ]
          },
          {
            "id": 249,
            "name": "Pensilvania",
            "country_id": 32,
            "allcities": []
          },
          {
            "id": 250,
            "name": "Rhode Island",
            "country_id": 32,
            "allcities": [
              {
                "id": 1275,
                "name": "Providence",
                "state_id": 250
              }
            ]
          },
          {
            "id": 251,
            "name": "Tennessee",
            "country_id": 32,
            "allcities": [
              {
                "id": 1276,
                "name": "Chattanooga",
                "state_id": 251
              },
              {
                "id": 1277,
                "name": "Clarksville",
                "state_id": 251
              },
              {
                "id": 1278,
                "name": "Knoxville",
                "state_id": 251
              },
              {
                "id": 1279,
                "name": "Memphis",
                "state_id": 251
              },
              {
                "id": 1280,
                "name": "Murfreesboro",
                "state_id": 251
              },
              {
                "id": 1281,
                "name": "Nashville",
                "state_id": 251
              }
            ]
          },
          {
            "id": 252,
            "name": "Texas",
            "country_id": 32,
            "allcities": [
              {
                "id": 1282,
                "name": "Abilene",
                "state_id": 252
              },
              {
                "id": 1283,
                "name": "Amarillo",
                "state_id": 252
              },
              {
                "id": 1284,
                "name": "Arlington",
                "state_id": 252
              },
              {
                "id": 1285,
                "name": "Austin",
                "state_id": 252
              },
              {
                "id": 1286,
                "name": "Beaumont",
                "state_id": 252
              },
              {
                "id": 1287,
                "name": "Brownsville",
                "state_id": 252
              },
              {
                "id": 1288,
                "name": "Carrollton",
                "state_id": 252
              },
              {
                "id": 1289,
                "name": "Corpus Christi",
                "state_id": 252
              },
              {
                "id": 1290,
                "name": "Dallas",
                "state_id": 252
              },
              {
                "id": 1291,
                "name": "Denton",
                "state_id": 252
              },
              {
                "id": 1292,
                "name": "El Paso",
                "state_id": 252
              },
              {
                "id": 1293,
                "name": "Fort Worth",
                "state_id": 252
              },
              {
                "id": 1294,
                "name": "Frisco",
                "state_id": 252
              },
              {
                "id": 1295,
                "name": "Garland",
                "state_id": 252
              },
              {
                "id": 1296,
                "name": "Grand Prairie",
                "state_id": 252
              },
              {
                "id": 1297,
                "name": "Houston",
                "state_id": 252
              },
              {
                "id": 1298,
                "name": "Irving",
                "state_id": 252
              },
              {
                "id": 1299,
                "name": "Killeen",
                "state_id": 252
              },
              {
                "id": 1300,
                "name": "Laredo",
                "state_id": 252
              },
              {
                "id": 1301,
                "name": "Lubbock",
                "state_id": 252
              },
              {
                "id": 1302,
                "name": "McAllen",
                "state_id": 252
              },
              {
                "id": 1303,
                "name": "McKinney",
                "state_id": 252
              },
              {
                "id": 1304,
                "name": "Mesquite",
                "state_id": 252
              },
              {
                "id": 1305,
                "name": "Midland",
                "state_id": 252
              },
              {
                "id": 1306,
                "name": "Pasadena",
                "state_id": 252
              },
              {
                "id": 1307,
                "name": "Plano",
                "state_id": 252
              },
              {
                "id": 1308,
                "name": "San Antonio",
                "state_id": 252
              },
              {
                "id": 1309,
                "name": "Waco",
                "state_id": 252
              },
              {
                "id": 1310,
                "name": "Wichita Falls",
                "state_id": 252
              }
            ]
          },
          {
            "id": 253,
            "name": "Utah",
            "country_id": 32,
            "allcities": [
              {
                "id": 1311,
                "name": "Provo",
                "state_id": 253
              },
              {
                "id": 1312,
                "name": "Salt Lake City",
                "state_id": 253
              },
              {
                "id": 1313,
                "name": "West Jordan",
                "state_id": 253
              },
              {
                "id": 1314,
                "name": "West Valley City",
                "state_id": 253
              }
            ]
          },
          {
            "id": 254,
            "name": "Virginia",
            "country_id": 32,
            "allcities": [
              {
                "id": 1315,
                "name": "Alexandría",
                "state_id": 254
              },
              {
                "id": 1316,
                "name": "Arlington",
                "state_id": 254
              },
              {
                "id": 1317,
                "name": "Chesapeake",
                "state_id": 254
              },
              {
                "id": 1318,
                "name": "Hampton",
                "state_id": 254
              },
              {
                "id": 1319,
                "name": "Newport News",
                "state_id": 254
              },
              {
                "id": 1320,
                "name": "Norfolk",
                "state_id": 254
              },
              {
                "id": 1321,
                "name": "Richmond",
                "state_id": 254
              },
              {
                "id": 1322,
                "name": "Virginia Beach",
                "state_id": 254
              }
            ]
          },
          {
            "id": 255,
            "name": "Virginia Occidental",
            "country_id": 32,
            "allcities": [
              {
                "id": 1323,
                "name": "Morgantown",
                "state_id": 255
              }
            ]
          },
          {
            "id": 256,
            "name": "Washington",
            "country_id": 32,
            "allcities": [
              {
                "id": 1324,
                "name": "Bellevue",
                "state_id": 256
              },
              {
                "id": 1325,
                "name": "Bellingham",
                "state_id": 256
              },
              {
                "id": 1326,
                "name": "Everett",
                "state_id": 256
              },
              {
                "id": 1327,
                "name": "Seattle",
                "state_id": 256
              },
              {
                "id": 1328,
                "name": "Spokane",
                "state_id": 256
              },
              {
                "id": 1329,
                "name": "Tacoma",
                "state_id": 256
              },
              {
                "id": 1330,
                "name": "Vancouver",
                "state_id": 256
              }
            ]
          },
          {
            "id": 257,
            "name": "Wisconsin",
            "country_id": 32,
            "allcities": [
              {
                "id": 1331,
                "name": "Green Bay",
                "state_id": 257
              },
              {
                "id": 1332,
                "name": "Madison",
                "state_id": 257
              },
              {
                "id": 1333,
                "name": "Milwaukee",
                "state_id": 257
              }
            ]
          },
          {
            "id": 258,
            "name": "Distrito de Columbia",
            "country_id": 32,
            "allcities": [
              {
                "id": 1334,
                "name": "Washington",
                "state_id": 258
              }
            ]
          }
        ]
      },
      {
        "id": 33,
        "name": "Etiopía",
        "states": [
          {
            "id": 33,
            "name": "No Aplica",
            "country_id": 33,
            "allcities": [
              {
                "id": 353,
                "name": "Adís Abeba",
                "state_id": 33
              },
              {
                "id": 888,
                "name": "Adís Abeba",
                "state_id": 33
              }
            ]
          }
        ]
      },
      {
        "id": 34,
        "name": "Filipinas",
        "states": [
          {
            "id": 34,
            "name": "No Aplica",
            "country_id": 34,
            "allcities": [
              {
                "id": 354,
                "name": "Manila",
                "state_id": 34
              },
              {
                "id": 355,
                "name": "Cebú",
                "state_id": 34
              },
              {
                "id": 356,
                "name": "Davao",
                "state_id": 34
              },
              {
                "id": 357,
                "name": "Ángeles",
                "state_id": 34
              },
              {
                "id": 358,
                "name": "General Santos",
                "state_id": 34
              },
              {
                "id": 889,
                "name": "Manila",
                "state_id": 34
              }
            ]
          }
        ]
      },
      {
        "id": 35,
        "name": "Finlandia",
        "states": [
          {
            "id": 35,
            "name": "No Aplica",
            "country_id": 35,
            "allcities": [
              {
                "id": 359,
                "name": "Helsinki",
                "state_id": 35
              },
              {
                "id": 360,
                "name": "Tampere",
                "state_id": 35
              },
              {
                "id": 361,
                "name": "Turku",
                "state_id": 35
              },
              {
                "id": 890,
                "name": "Helsinki",
                "state_id": 35
              }
            ]
          }
        ]
      },
      {
        "id": 36,
        "name": "Francia",
        "states": [
          {
            "id": 36,
            "name": "No Aplica",
            "country_id": 36,
            "allcities": [
              {
                "id": 362,
                "name": "París",
                "state_id": 36
              },
              {
                "id": 363,
                "name": "Lyon",
                "state_id": 36
              },
              {
                "id": 364,
                "name": "Marsella",
                "state_id": 36
              },
              {
                "id": 365,
                "name": "Lille",
                "state_id": 36
              },
              {
                "id": 366,
                "name": "Niza - Cannes",
                "state_id": 36
              },
              {
                "id": 367,
                "name": "Toulouse",
                "state_id": 36
              },
              {
                "id": 368,
                "name": "Nantes",
                "state_id": 36
              },
              {
                "id": 369,
                "name": "Montpellier",
                "state_id": 36
              },
              {
                "id": 370,
                "name": "Estrasburgo",
                "state_id": 36
              },
              {
                "id": 371,
                "name": "Burdeos",
                "state_id": 36
              },
              {
                "id": 372,
                "name": "Rennes",
                "state_id": 36
              },
              {
                "id": 373,
                "name": "Reims",
                "state_id": 36
              },
              {
                "id": 374,
                "name": "Le Havre",
                "state_id": 36
              },
              {
                "id": 375,
                "name": "Saint-Étienne",
                "state_id": 36
              },
              {
                "id": 376,
                "name": "Tolón",
                "state_id": 36
              },
              {
                "id": 377,
                "name": "Grenoble",
                "state_id": 36
              },
              {
                "id": 378,
                "name": "Dijon",
                "state_id": 36
              },
              {
                "id": 379,
                "name": "Angers",
                "state_id": 36
              },
              {
                "id": 380,
                "name": "Avignon",
                "state_id": 36
              },
              {
                "id": 381,
                "name": "Biarritz",
                "state_id": 36
              },
              {
                "id": 382,
                "name": "Caen",
                "state_id": 36
              },
              {
                "id": 383,
                "name": "Bourdon",
                "state_id": 36
              },
              {
                "id": 384,
                "name": "Ligon",
                "state_id": 36
              },
              {
                "id": 385,
                "name": "Normandía",
                "state_id": 36
              },
              {
                "id": 386,
                "name": "San Rafael",
                "state_id": 36
              },
              {
                "id": 387,
                "name": "Versalles",
                "state_id": 36
              },
              {
                "id": 388,
                "name": "Villefrance-Sur-Mer",
                "state_id": 36
              },
              {
                "id": 389,
                "name": "Aix-en-Provence",
                "state_id": 36
              },
              {
                "id": 390,
                "name": "Nimes",
                "state_id": 36
              },
              {
                "id": 391,
                "name": "Limoges",
                "state_id": 36
              },
              {
                "id": 392,
                "name": "Amiens",
                "state_id": 36
              },
              {
                "id": 393,
                "name": "Tours",
                "state_id": 36
              },
              {
                "id": 394,
                "name": "Le Mans",
                "state_id": 36
              },
              {
                "id": 395,
                "name": "Brest",
                "state_id": 36
              },
              {
                "id": 396,
                "name": "Clermont-Ferrand",
                "state_id": 36
              },
              {
                "id": 892,
                "name": "París",
                "state_id": 36
              }
            ]
          }
        ]
      },
      {
        "id": 37,
        "name": "Georgia",
        "states": [
          {
            "id": 37,
            "name": "No Aplica",
            "country_id": 37,
            "allcities": [
              {
                "id": 397,
                "name": "Tiflis",
                "state_id": 37
              },
              {
                "id": 895,
                "name": "Tiflis",
                "state_id": 37
              }
            ]
          }
        ]
      },
      {
        "id": 38,
        "name": "Ghana",
        "states": [
          {
            "id": 38,
            "name": "No Aplica",
            "country_id": 38,
            "allcities": [
              {
                "id": 398,
                "name": "Acra",
                "state_id": 38
              },
              {
                "id": 399,
                "name": "Kumasi",
                "state_id": 38
              },
              {
                "id": 896,
                "name": "Accra",
                "state_id": 38
              }
            ]
          }
        ]
      },
      {
        "id": 39,
        "name": "Grecia",
        "states": [
          {
            "id": 39,
            "name": "No Aplica",
            "country_id": 39,
            "allcities": [
              {
                "id": 400,
                "name": "Atenas",
                "state_id": 39
              },
              {
                "id": 401,
                "name": "Tesalónica",
                "state_id": 39
              },
              {
                "id": 402,
                "name": "Patras",
                "state_id": 39
              },
              {
                "id": 403,
                "name": "El Pireo",
                "state_id": 39
              },
              {
                "id": 404,
                "name": "Trípoli",
                "state_id": 39
              },
              {
                "id": 405,
                "name": "Argos",
                "state_id": 39
              },
              {
                "id": 406,
                "name": "Esparta",
                "state_id": 39
              },
              {
                "id": 898,
                "name": "Atenas",
                "state_id": 39
              }
            ]
          }
        ]
      },
      {
        "id": 40,
        "name": "Guatemala",
        "states": [
          {
            "id": 40,
            "name": "No Aplica",
            "country_id": 40,
            "allcities": [
              {
                "id": 407,
                "name": "Ciudad de Guatemala",
                "state_id": 40
              },
              {
                "id": 408,
                "name": "Cobán",
                "state_id": 40
              },
              {
                "id": 409,
                "name": "Huehuetenango",
                "state_id": 40
              },
              {
                "id": 410,
                "name": "Quetzaltenango",
                "state_id": 40
              },
              {
                "id": 899,
                "name": "Guatemala",
                "state_id": 40
              }
            ]
          }
        ]
      },
      {
        "id": 41,
        "name": "Guinea",
        "states": [
          {
            "id": 41,
            "name": "No Aplica",
            "country_id": 41,
            "allcities": [
              {
                "id": 411,
                "name": "Conakri",
                "state_id": 41
              },
              {
                "id": 900,
                "name": "Conakri",
                "state_id": 41
              }
            ]
          }
        ]
      },
      {
        "id": 42,
        "name": "Haití",
        "states": [
          {
            "id": 42,
            "name": "No Aplica",
            "country_id": 42,
            "allcities": [
              {
                "id": 412,
                "name": "Puerto Príncipe",
                "state_id": 42
              },
              {
                "id": 413,
                "name": "Port-de-Paix",
                "state_id": 42
              },
              {
                "id": 414,
                "name": "Gonaives",
                "state_id": 42
              },
              {
                "id": 415,
                "name": "Cabo Haitiano",
                "state_id": 42
              },
              {
                "id": 904,
                "name": "Puerto Príncipe",
                "state_id": 42
              }
            ]
          }
        ]
      },
      {
        "id": 43,
        "name": "Hong Kong",
        "states": [
          {
            "id": 43,
            "name": "No Aplica",
            "country_id": 43,
            "allcities": [
              {
                "id": 416,
                "name": "Hong Kong",
                "state_id": 43
              }
            ]
          }
        ]
      },
      {
        "id": 44,
        "name": "Hungría",
        "states": [
          {
            "id": 44,
            "name": "No Aplica",
            "country_id": 44,
            "allcities": [
              {
                "id": 417,
                "name": "Budapest",
                "state_id": 44
              },
              {
                "id": 418,
                "name": "Drebecen",
                "state_id": 44
              },
              {
                "id": 419,
                "name": "Pécs",
                "state_id": 44
              },
              {
                "id": 911,
                "name": "Budapest",
                "state_id": 44
              }
            ]
          }
        ]
      },
      {
        "id": 45,
        "name": "India",
        "states": [
          {
            "id": 45,
            "name": "No Aplica",
            "country_id": 45,
            "allcities": [
              {
                "id": 420,
                "name": "Delhi",
                "state_id": 45
              },
              {
                "id": 421,
                "name": "Bombay (incl. Kalyan, Vasai-Virar)",
                "state_id": 45
              },
              {
                "id": 422,
                "name": "Calcuta",
                "state_id": 45
              },
              {
                "id": 423,
                "name": "Bangalore",
                "state_id": 45
              },
              {
                "id": 424,
                "name": "Madrás",
                "state_id": 45
              },
              {
                "id": 425,
                "name": "Hyderabad",
                "state_id": 45
              },
              {
                "id": 426,
                "name": "Ahmedabad",
                "state_id": 45
              },
              {
                "id": 427,
                "name": "Pune",
                "state_id": 45
              },
              {
                "id": 428,
                "name": "Surat",
                "state_id": 45
              },
              {
                "id": 429,
                "name": "Jaipur",
                "state_id": 45
              },
              {
                "id": 430,
                "name": "Lucknow",
                "state_id": 45
              },
              {
                "id": 431,
                "name": "Kanpur",
                "state_id": 45
              },
              {
                "id": 432,
                "name": "Nagpur",
                "state_id": 45
              },
              {
                "id": 433,
                "name": "Indore",
                "state_id": 45
              },
              {
                "id": 434,
                "name": "Bhilai (incl. Raipur)",
                "state_id": 45
              },
              {
                "id": 435,
                "name": "Patna",
                "state_id": 45
              },
              {
                "id": 436,
                "name": "Coimbatore",
                "state_id": 45
              },
              {
                "id": 437,
                "name": "Bhopal",
                "state_id": 45
              },
              {
                "id": 438,
                "name": "Vadodara",
                "state_id": 45
              },
              {
                "id": 439,
                "name": "Agra",
                "state_id": 45
              },
              {
                "id": 440,
                "name": "Chandigarh",
                "state_id": 45
              },
              {
                "id": 441,
                "name": "Visakhapatnam",
                "state_id": 45
              },
              {
                "id": 442,
                "name": "Ludhi?na",
                "state_id": 45
              },
              {
                "id": 443,
                "name": "Nashik",
                "state_id": 45
              },
              {
                "id": 444,
                "name": "Benarés",
                "state_id": 45
              },
              {
                "id": 445,
                "name": "Vijayawada",
                "state_id": 45
              },
              {
                "id": 446,
                "name": "Bhubaneswar",
                "state_id": 45
              },
              {
                "id": 447,
                "name": "Rajkot",
                "state_id": 45
              },
              {
                "id": 448,
                "name": "Madurai",
                "state_id": 45
              },
              {
                "id": 449,
                "name": "Meerut",
                "state_id": 45
              },
              {
                "id": 450,
                "name": "Aurangabad",
                "state_id": 45
              },
              {
                "id": 451,
                "name": "Cochín",
                "state_id": 45
              },
              {
                "id": 452,
                "name": "Jamshedpur",
                "state_id": 45
              },
              {
                "id": 453,
                "name": "Kolhapur",
                "state_id": 45
              },
              {
                "id": 454,
                "name": "Asansol",
                "state_id": 45
              },
              {
                "id": 455,
                "name": "Srinagar",
                "state_id": 45
              },
              {
                "id": 456,
                "name": "Jabalpur",
                "state_id": 45
              },
              {
                "id": 457,
                "name": "Allahabad",
                "state_id": 45
              },
              {
                "id": 458,
                "name": "Jodhpur",
                "state_id": 45
              },
              {
                "id": 459,
                "name": "Amritsar",
                "state_id": 45
              },
              {
                "id": 460,
                "name": "Dhanbad",
                "state_id": 45
              },
              {
                "id": 461,
                "name": "Ranchi",
                "state_id": 45
              },
              {
                "id": 462,
                "name": "Tirupur",
                "state_id": 45
              },
              {
                "id": 463,
                "name": "Gwalior",
                "state_id": 45
              },
              {
                "id": 464,
                "name": "Kotah",
                "state_id": 45
              },
              {
                "id": 465,
                "name": "Bareilly",
                "state_id": 45
              },
              {
                "id": 466,
                "name": "Thiruvananthapuram",
                "state_id": 45
              },
              {
                "id": 467,
                "name": "Tiruchirappalli",
                "state_id": 45
              },
              {
                "id": 468,
                "name": "Mysore",
                "state_id": 45
              },
              {
                "id": 469,
                "name": "Aligarh",
                "state_id": 45
              },
              {
                "id": 470,
                "name": "Moradabad",
                "state_id": 45
              },
              {
                "id": 471,
                "name": "Guwahati",
                "state_id": 45
              },
              {
                "id": 472,
                "name": "Hubli - Dharwad",
                "state_id": 45
              },
              {
                "id": 473,
                "name": "Solapur",
                "state_id": 45
              },
              {
                "id": 474,
                "name": "Salem",
                "state_id": 45
              },
              {
                "id": 475,
                "name": "Jalandhar",
                "state_id": 45
              },
              {
                "id": 476,
                "name": "Kozhikode",
                "state_id": 45
              },
              {
                "id": 477,
                "name": "Thrissur",
                "state_id": 45
              },
              {
                "id": 478,
                "name": "Malappuram",
                "state_id": 45
              },
              {
                "id": 479,
                "name": "Cananor",
                "state_id": 45
              },
              {
                "id": 480,
                "name": "Kollam",
                "state_id": 45
              },
              {
                "id": 912,
                "name": "Nueva Delhi",
                "state_id": 45
              }
            ]
          }
        ]
      },
      {
        "id": 46,
        "name": "Indonesia",
        "states": [
          {
            "id": 46,
            "name": "No Aplica",
            "country_id": 46,
            "allcities": [
              {
                "id": 481,
                "name": "Yakarta (incl. Bogor)",
                "state_id": 46
              },
              {
                "id": 482,
                "name": "Bandung",
                "state_id": 46
              },
              {
                "id": 483,
                "name": "Surabaya",
                "state_id": 46
              },
              {
                "id": 484,
                "name": "Medan",
                "state_id": 46
              },
              {
                "id": 485,
                "name": "Semarang",
                "state_id": 46
              },
              {
                "id": 486,
                "name": "Makasar",
                "state_id": 46
              },
              {
                "id": 487,
                "name": "Palembang",
                "state_id": 46
              },
              {
                "id": 488,
                "name": "Denpasar",
                "state_id": 46
              },
              {
                "id": 489,
                "name": "Malang",
                "state_id": 46
              },
              {
                "id": 490,
                "name": "Yogyakarta",
                "state_id": 46
              },
              {
                "id": 491,
                "name": "Surakarta",
                "state_id": 46
              },
              {
                "id": 492,
                "name": "Batam",
                "state_id": 46
              },
              {
                "id": 493,
                "name": "Pekanbaru",
                "state_id": 46
              },
              {
                "id": 494,
                "name": "Serang",
                "state_id": 46
              },
              {
                "id": 495,
                "name": "Bandar Lampung",
                "state_id": 46
              },
              {
                "id": 496,
                "name": "Cirebon",
                "state_id": 46
              },
              {
                "id": 913,
                "name": "Yakarta",
                "state_id": 46
              }
            ]
          }
        ]
      },
      {
        "id": 48,
        "name": "Irak",
        "states": [
          {
            "id": 48,
            "name": "No Aplica",
            "country_id": 48,
            "allcities": [
              {
                "id": 497,
                "name": "Bagdad",
                "state_id": 48
              },
              {
                "id": 498,
                "name": "Mosul",
                "state_id": 48
              },
              {
                "id": 499,
                "name": "Basora",
                "state_id": 48
              },
              {
                "id": 500,
                "name": "Erbil",
                "state_id": 48
              },
              {
                "id": 501,
                "name": "Kirkuk",
                "state_id": 48
              },
              {
                "id": 502,
                "name": "Solimania",
                "state_id": 48
              },
              {
                "id": 503,
                "name": "Nayaf",
                "state_id": 48
              },
              {
                "id": 914,
                "name": "Bagdad",
                "state_id": 48
              }
            ]
          }
        ]
      },
      {
        "id": 49,
        "name": "Irán",
        "states": [
          {
            "id": 49,
            "name": "No Aplica",
            "country_id": 49,
            "allcities": [
              {
                "id": 504,
                "name": "Teherán (incl. Karaj)",
                "state_id": 49
              },
              {
                "id": 505,
                "name": "Mashhad",
                "state_id": 49
              },
              {
                "id": 506,
                "name": "Isfahán",
                "state_id": 49
              },
              {
                "id": 507,
                "name": "Shiraz",
                "state_id": 49
              },
              {
                "id": 508,
                "name": "Tabriz",
                "state_id": 49
              },
              {
                "id": 509,
                "name": "Ahvaz",
                "state_id": 49
              },
              {
                "id": 510,
                "name": "Qom",
                "state_id": 49
              },
              {
                "id": 915,
                "name": "Teherán",
                "state_id": 49
              }
            ]
          }
        ]
      },
      {
        "id": 50,
        "name": "Irlanda",
        "states": [
          {
            "id": 50,
            "name": "No Aplica",
            "country_id": 50,
            "allcities": [
              {
                "id": 511,
                "name": "Dublín",
                "state_id": 50
              },
              {
                "id": 512,
                "name": "Wicklow",
                "state_id": 50
              },
              {
                "id": 513,
                "name": "Wexford",
                "state_id": 50
              },
              {
                "id": 916,
                "name": "Dublín",
                "state_id": 50
              }
            ]
          }
        ]
      },
      {
        "id": 51,
        "name": "Israel",
        "states": [
          {
            "id": 51,
            "name": "No Aplica",
            "country_id": 51,
            "allcities": [
              {
                "id": 514,
                "name": "Tel Aviv",
                "state_id": 51
              },
              {
                "id": 515,
                "name": "Haifa",
                "state_id": 51
              },
              {
                "id": 516,
                "name": "Afula",
                "state_id": 51
              },
              {
                "id": 517,
                "name": "Ein Dor",
                "state_id": 51
              },
              {
                "id": 518,
                "name": "Eilat",
                "state_id": 51
              },
              {
                "id": 519,
                "name": "Jerusalem",
                "state_id": 51
              },
              {
                "id": 520,
                "name": "Kfar Yona",
                "state_id": 51
              },
              {
                "id": 920,
                "name": "Jerusalén",
                "state_id": 51
              }
            ]
          }
        ]
      },
      {
        "id": 52,
        "name": "Italia",
        "states": [
          {
            "id": 52,
            "name": "No Aplica",
            "country_id": 52,
            "allcities": [
              {
                "id": 521,
                "name": "Milán",
                "state_id": 52
              },
              {
                "id": 522,
                "name": "Nápoles",
                "state_id": 52
              },
              {
                "id": 523,
                "name": "Roma",
                "state_id": 52
              },
              {
                "id": 524,
                "name": "Turín",
                "state_id": 52
              },
              {
                "id": 525,
                "name": "Agriento",
                "state_id": 52
              },
              {
                "id": 526,
                "name": "Arezzo",
                "state_id": 52
              },
              {
                "id": 527,
                "name": "Bari",
                "state_id": 52
              },
              {
                "id": 528,
                "name": "Ancona",
                "state_id": 52
              },
              {
                "id": 529,
                "name": "Bolzano",
                "state_id": 52
              },
              {
                "id": 530,
                "name": "Cagliari",
                "state_id": 52
              },
              {
                "id": 531,
                "name": "Cantazaro",
                "state_id": 52
              },
              {
                "id": 532,
                "name": "Camo",
                "state_id": 52
              },
              {
                "id": 533,
                "name": "Milo",
                "state_id": 52
              },
              {
                "id": 534,
                "name": "Salerno",
                "state_id": 52
              },
              {
                "id": 535,
                "name": "Bérgamo",
                "state_id": 52
              },
              {
                "id": 536,
                "name": "Bolonia",
                "state_id": 52
              },
              {
                "id": 537,
                "name": "Capri",
                "state_id": 52
              },
              {
                "id": 538,
                "name": "Cerdeña",
                "state_id": 52
              },
              {
                "id": 539,
                "name": "Como",
                "state_id": 52
              },
              {
                "id": 540,
                "name": "Elba",
                "state_id": 52
              },
              {
                "id": 541,
                "name": "Ferrara",
                "state_id": 52
              },
              {
                "id": 542,
                "name": "Florencia",
                "state_id": 52
              },
              {
                "id": 543,
                "name": "Foggia",
                "state_id": 52
              },
              {
                "id": 544,
                "name": "Génova",
                "state_id": 52
              },
              {
                "id": 545,
                "name": "La Spieza",
                "state_id": 52
              },
              {
                "id": 546,
                "name": "L´Aquila",
                "state_id": 52
              },
              {
                "id": 547,
                "name": "Lucca",
                "state_id": 52
              },
              {
                "id": 548,
                "name": "Monopoli",
                "state_id": 52
              },
              {
                "id": 549,
                "name": "Novara",
                "state_id": 52
              },
              {
                "id": 550,
                "name": "Olbia-Tempio",
                "state_id": 52
              },
              {
                "id": 551,
                "name": "Padua",
                "state_id": 52
              },
              {
                "id": 552,
                "name": "Palermo",
                "state_id": 52
              },
              {
                "id": 553,
                "name": "Pisa",
                "state_id": 52
              },
              {
                "id": 554,
                "name": "Positano",
                "state_id": 52
              },
              {
                "id": 555,
                "name": "Prato",
                "state_id": 52
              },
              {
                "id": 556,
                "name": "Putignano",
                "state_id": 52
              },
              {
                "id": 557,
                "name": "Ravenna",
                "state_id": 52
              },
              {
                "id": 558,
                "name": "Reggio Calabria",
                "state_id": 52
              },
              {
                "id": 559,
                "name": "Rimini",
                "state_id": 52
              },
              {
                "id": 560,
                "name": "San Gimignano",
                "state_id": 52
              },
              {
                "id": 561,
                "name": "San Marino",
                "state_id": 52
              },
              {
                "id": 562,
                "name": "Sicilia",
                "state_id": 52
              },
              {
                "id": 563,
                "name": "Siena",
                "state_id": 52
              },
              {
                "id": 564,
                "name": "Sorrento",
                "state_id": 52
              },
              {
                "id": 565,
                "name": "Taormina",
                "state_id": 52
              },
              {
                "id": 566,
                "name": "Trapani",
                "state_id": 52
              },
              {
                "id": 567,
                "name": "Udine",
                "state_id": 52
              },
              {
                "id": 568,
                "name": "Venecia",
                "state_id": 52
              },
              {
                "id": 569,
                "name": "Verona",
                "state_id": 52
              },
              {
                "id": 570,
                "name": "Vibo Valentia",
                "state_id": 52
              },
              {
                "id": 921,
                "name": "Roma",
                "state_id": 52
              }
            ]
          }
        ]
      },
      {
        "id": 53,
        "name": "Kenia",
        "states": [
          {
            "id": 53,
            "name": "No Aplica",
            "country_id": 53,
            "allcities": [
              {
                "id": 571,
                "name": "Nairobi",
                "state_id": 53
              },
              {
                "id": 572,
                "name": "Mombasa",
                "state_id": 53
              },
              {
                "id": 927,
                "name": "Nairobi",
                "state_id": 53
              }
            ]
          }
        ]
      },
      {
        "id": 54,
        "name": "Liberia",
        "states": [
          {
            "id": 54,
            "name": "No Aplica",
            "country_id": 54,
            "allcities": [
              {
                "id": 573,
                "name": "Monrovia",
                "state_id": 54
              },
              {
                "id": 936,
                "name": "Monrovia",
                "state_id": 54
              }
            ]
          }
        ]
      },
      {
        "id": 55,
        "name": "Libia",
        "states": [
          {
            "id": 55,
            "name": "No Aplica",
            "country_id": 55,
            "allcities": [
              {
                "id": 574,
                "name": "Tripoli",
                "state_id": 55
              },
              {
                "id": 937,
                "name": "Trípoli",
                "state_id": 55
              }
            ]
          }
        ]
      },
      {
        "id": 56,
        "name": "Madagascar",
        "states": [
          {
            "id": 56,
            "name": "No Aplica",
            "country_id": 56,
            "allcities": [
              {
                "id": 575,
                "name": "Antananarivo",
                "state_id": 56
              },
              {
                "id": 942,
                "name": "Antananarivo",
                "state_id": 56
              }
            ]
          }
        ]
      },
      {
        "id": 57,
        "name": "Malaui",
        "states": [
          {
            "id": 57,
            "name": "No Aplica",
            "country_id": 57,
            "allcities": [
              {
                "id": 576,
                "name": "Lilongüe",
                "state_id": 57
              },
              {
                "id": 944,
                "name": "Lilongüe",
                "state_id": 57
              }
            ]
          }
        ]
      },
      {
        "id": 58,
        "name": "Malí",
        "states": [
          {
            "id": 58,
            "name": "No Aplica",
            "country_id": 58,
            "allcities": [
              {
                "id": 577,
                "name": "Bamako",
                "state_id": 58
              },
              {
                "id": 946,
                "name": "Bamako",
                "state_id": 58
              }
            ]
          }
        ]
      },
      {
        "id": 59,
        "name": "Marruecos",
        "states": [
          {
            "id": 59,
            "name": "No Aplica",
            "country_id": 59,
            "allcities": [
              {
                "id": 578,
                "name": "Casablanca",
                "state_id": 59
              },
              {
                "id": 579,
                "name": "Rabat",
                "state_id": 59
              },
              {
                "id": 580,
                "name": "Fez",
                "state_id": 59
              },
              {
                "id": 581,
                "name": "Agadir",
                "state_id": 59
              },
              {
                "id": 582,
                "name": "Marrakech",
                "state_id": 59
              },
              {
                "id": 948,
                "name": "Rabat",
                "state_id": 59
              }
            ]
          }
        ]
      },
      {
        "id": 60,
        "name": "Mauritania",
        "states": [
          {
            "id": 60,
            "name": "No Aplica",
            "country_id": 60,
            "allcities": [
              {
                "id": 583,
                "name": "Nuakchot",
                "state_id": 60
              },
              {
                "id": 950,
                "name": "Nuakchot",
                "state_id": 60
              }
            ]
          }
        ]
      },
      {
        "id": 61,
        "name": "México",
        "states": [
          {
            "id": 61,
            "name": "No Aplica",
            "country_id": 61,
            "allcities": [
              {
                "id": 584,
                "name": "Ciudad de México",
                "state_id": 61
              },
              {
                "id": 585,
                "name": "Guadalajara",
                "state_id": 61
              },
              {
                "id": 586,
                "name": "Monterrey",
                "state_id": 61
              },
              {
                "id": 587,
                "name": "Puebla",
                "state_id": 61
              },
              {
                "id": 588,
                "name": "Toluca",
                "state_id": 61
              },
              {
                "id": 589,
                "name": "Tijuana",
                "state_id": 61
              },
              {
                "id": 590,
                "name": "León",
                "state_id": 61
              },
              {
                "id": 591,
                "name": "Ciudad Juárez",
                "state_id": 61
              },
              {
                "id": 592,
                "name": "Torreón",
                "state_id": 61
              },
              {
                "id": 593,
                "name": "Querétaro",
                "state_id": 61
              },
              {
                "id": 594,
                "name": "San Luis Potosí",
                "state_id": 61
              },
              {
                "id": 595,
                "name": "Mérida",
                "state_id": 61
              },
              {
                "id": 596,
                "name": "Aguascalientes",
                "state_id": 61
              },
              {
                "id": 597,
                "name": "Mexicali",
                "state_id": 61
              },
              {
                "id": 598,
                "name": "Cuernavaca",
                "state_id": 61
              },
              {
                "id": 599,
                "name": "Chihuahua",
                "state_id": 61
              },
              {
                "id": 600,
                "name": "Saltillo",
                "state_id": 61
              },
              {
                "id": 601,
                "name": "Tampico",
                "state_id": 61
              },
              {
                "id": 602,
                "name": "Cancún",
                "state_id": 61
              },
              {
                "id": 603,
                "name": "Colima",
                "state_id": 61
              },
              {
                "id": 604,
                "name": "Guanajuato",
                "state_id": 61
              },
              {
                "id": 605,
                "name": "Hermosillo",
                "state_id": 61
              },
              {
                "id": 606,
                "name": "Mazatlán",
                "state_id": 61
              },
              {
                "id": 607,
                "name": "Merida",
                "state_id": 61
              },
              {
                "id": 608,
                "name": "Morelia",
                "state_id": 61
              },
              {
                "id": 609,
                "name": "Oaxaca de Juarez",
                "state_id": 61
              },
              {
                "id": 610,
                "name": "Ojo de Agua",
                "state_id": 61
              },
              {
                "id": 611,
                "name": "Puerto Vallarta",
                "state_id": 61
              },
              {
                "id": 612,
                "name": "Santiago de Querétaro",
                "state_id": 61
              },
              {
                "id": 613,
                "name": "San Joaquín",
                "state_id": 61
              },
              {
                "id": 614,
                "name": "Sonora",
                "state_id": 61
              },
              {
                "id": 615,
                "name": "Tepatitlán de Morelos",
                "state_id": 61
              },
              {
                "id": 616,
                "name": "Veracruz",
                "state_id": 61
              },
              {
                "id": 617,
                "name": "Xalapa",
                "state_id": 61
              },
              {
                "id": 618,
                "name": "Zacatecas",
                "state_id": 61
              },
              {
                "id": 951,
                "name": "México",
                "state_id": 61
              }
            ]
          }
        ]
      },
      {
        "id": 62,
        "name": "Mozambique",
        "states": [
          {
            "id": 62,
            "name": "No Aplica",
            "country_id": 62,
            "allcities": [
              {
                "id": 619,
                "name": "Maputo",
                "state_id": 62
              },
              {
                "id": 957,
                "name": "Maputo",
                "state_id": 62
              }
            ]
          }
        ]
      },
      {
        "id": 63,
        "name": "Níger",
        "states": [
          {
            "id": 63,
            "name": "No Aplica",
            "country_id": 63,
            "allcities": [
              {
                "id": 620,
                "name": "Niamey",
                "state_id": 63
              },
              {
                "id": 963,
                "name": "Niamey",
                "state_id": 63
              }
            ]
          }
        ]
      },
      {
        "id": 64,
        "name": "Nigeria",
        "states": [
          {
            "id": 64,
            "name": "No Aplica",
            "country_id": 64,
            "allcities": [
              {
                "id": 621,
                "name": "Lagos",
                "state_id": 64
              },
              {
                "id": 622,
                "name": "Kano",
                "state_id": 64
              },
              {
                "id": 623,
                "name": "Ibadán",
                "state_id": 64
              },
              {
                "id": 624,
                "name": "Abuya",
                "state_id": 64
              },
              {
                "id": 625,
                "name": "Port Harcourt",
                "state_id": 64
              },
              {
                "id": 626,
                "name": "Kaduna",
                "state_id": 64
              },
              {
                "id": 627,
                "name": "Benin City",
                "state_id": 64
              },
              {
                "id": 628,
                "name": "Onitsha",
                "state_id": 64
              },
              {
                "id": 629,
                "name": "Maiduguri",
                "state_id": 64
              },
              {
                "id": 630,
                "name": "Aba",
                "state_id": 64
              },
              {
                "id": 631,
                "name": "Zaria",
                "state_id": 64
              },
              {
                "id": 964,
                "name": "Abuya",
                "state_id": 64
              }
            ]
          }
        ]
      },
      {
        "id": 65,
        "name": "Noruega",
        "states": [
          {
            "id": 65,
            "name": "No Aplica",
            "country_id": 65,
            "allcities": [
              {
                "id": 632,
                "name": "Oslo",
                "state_id": 65
              },
              {
                "id": 633,
                "name": "Hedmark",
                "state_id": 65
              },
              {
                "id": 634,
                "name": "Nordland",
                "state_id": 65
              },
              {
                "id": 965,
                "name": "Oslo",
                "state_id": 65
              }
            ]
          }
        ]
      },
      {
        "id": 66,
        "name": "Nueva Zelanda",
        "states": [
          {
            "id": 66,
            "name": "No Aplica",
            "country_id": 66,
            "allcities": [
              {
                "id": 635,
                "name": "Auckland",
                "state_id": 66
              },
              {
                "id": 636,
                "name": "Napier",
                "state_id": 66
              },
              {
                "id": 637,
                "name": "Patea",
                "state_id": 66
              },
              {
                "id": 638,
                "name": "Wellington",
                "state_id": 66
              },
              {
                "id": 966,
                "name": "Wellington",
                "state_id": 66
              }
            ]
          }
        ]
      },
      {
        "id": 67,
        "name": "Países Bajos",
        "states": [
          {
            "id": 67,
            "name": "No Aplica",
            "country_id": 67,
            "allcities": [
              {
                "id": 639,
                "name": "Róterdam",
                "state_id": 67
              },
              {
                "id": 640,
                "name": "Ámsterdam",
                "state_id": 67
              },
              {
                "id": 641,
                "name": "Delft",
                "state_id": 67
              },
              {
                "id": 642,
                "name": "Den Haag",
                "state_id": 67
              },
              {
                "id": 643,
                "name": "Gouda",
                "state_id": 67
              },
              {
                "id": 644,
                "name": "Utrecht",
                "state_id": 67
              },
              {
                "id": 645,
                "name": "Maastricht",
                "state_id": 67
              },
              {
                "id": 646,
                "name": "Eindhoven",
                "state_id": 67
              },
              {
                "id": 647,
                "name": "Groningen",
                "state_id": 67
              },
              {
                "id": 648,
                "name": "Deventer",
                "state_id": 67
              },
              {
                "id": 649,
                "name": "Alkmaar",
                "state_id": 67
              },
              {
                "id": 650,
                "name": "Hoorn",
                "state_id": 67
              },
              {
                "id": 651,
                "name": "Enkhuizen",
                "state_id": 67
              },
              {
                "id": 652,
                "name": "Dordrecht",
                "state_id": 67
              },
              {
                "id": 653,
                "name": "Amersfoort",
                "state_id": 67
              },
              {
                "id": 654,
                "name": "Marken",
                "state_id": 67
              },
              {
                "id": 655,
                "name": "Volendam",
                "state_id": 67
              },
              {
                "id": 656,
                "name": "Zaanse Schans",
                "state_id": 67
              },
              {
                "id": 657,
                "name": "Hilversum",
                "state_id": 67
              },
              {
                "id": 658,
                "name": "La Haya",
                "state_id": 67
              },
              {
                "id": 659,
                "name": "Apeldoorn",
                "state_id": 67
              },
              {
                "id": 660,
                "name": "Breda",
                "state_id": 67
              },
              {
                "id": 968,
                "name": "Ámsterdam",
                "state_id": 67
              }
            ]
          }
        ]
      },
      {
        "id": 68,
        "name": "Perú",
        "states": [
          {
            "id": 68,
            "name": "No Aplica",
            "country_id": 68,
            "allcities": [
              {
                "id": 661,
                "name": "Lima",
                "state_id": 68
              },
              {
                "id": 662,
                "name": "Arequipa",
                "state_id": 68
              },
              {
                "id": 663,
                "name": "Trujillo",
                "state_id": 68
              },
              {
                "id": 664,
                "name": "Chiclayo",
                "state_id": 68
              },
              {
                "id": 665,
                "name": "Cusco",
                "state_id": 68
              },
              {
                "id": 666,
                "name": "Huancayo",
                "state_id": 68
              },
              {
                "id": 667,
                "name": "Ayacucho",
                "state_id": 68
              },
              {
                "id": 668,
                "name": "Pisco",
                "state_id": 68
              },
              {
                "id": 669,
                "name": "Bagua Grande",
                "state_id": 68
              },
              {
                "id": 670,
                "name": "Cajamarca",
                "state_id": 68
              },
              {
                "id": 671,
                "name": "Callao",
                "state_id": 68
              },
              {
                "id": 672,
                "name": "Canta",
                "state_id": 68
              },
              {
                "id": 673,
                "name": "Chimbote",
                "state_id": 68
              },
              {
                "id": 674,
                "name": "Chorrillos",
                "state_id": 68
              },
              {
                "id": 675,
                "name": "Huaraz",
                "state_id": 68
              },
              {
                "id": 676,
                "name": "Iquitos",
                "state_id": 68
              },
              {
                "id": 677,
                "name": "Juliacas",
                "state_id": 68
              },
              {
                "id": 678,
                "name": "Piura",
                "state_id": 68
              },
              {
                "id": 679,
                "name": "Puerto Maldonado",
                "state_id": 68
              },
              {
                "id": 680,
                "name": "Puno",
                "state_id": 68
              },
              {
                "id": 681,
                "name": "Tacna",
                "state_id": 68
              },
              {
                "id": 682,
                "name": "Ventanilla",
                "state_id": 68
              },
              {
                "id": 987,
                "name": "Lima",
                "state_id": 68
              }
            ]
          }
        ]
      },
      {
        "id": 69,
        "name": "Polonia",
        "states": [
          {
            "id": 69,
            "name": "No Aplica",
            "country_id": 69,
            "allcities": [
              {
                "id": 683,
                "name": "Katowice",
                "state_id": 69
              },
              {
                "id": 684,
                "name": "Varsovia",
                "state_id": 69
              },
              {
                "id": 685,
                "name": "Cracovia",
                "state_id": 69
              },
              {
                "id": 686,
                "name": "Lodz",
                "state_id": 69
              },
              {
                "id": 988,
                "name": "Varsovia",
                "state_id": 69
              }
            ]
          }
        ]
      },
      {
        "id": 70,
        "name": "Portugal",
        "states": [
          {
            "id": 70,
            "name": "No Aplica",
            "country_id": 70,
            "allcities": [
              {
                "id": 687,
                "name": "Lisboa",
                "state_id": 70
              },
              {
                "id": 688,
                "name": "Braga",
                "state_id": 70
              },
              {
                "id": 689,
                "name": "Coimbra",
                "state_id": 70
              },
              {
                "id": 690,
                "name": "Oporto",
                "state_id": 70
              },
              {
                "id": 691,
                "name": "Guimaraes",
                "state_id": 70
              },
              {
                "id": 692,
                "name": "Setúbal",
                "state_id": 70
              },
              {
                "id": 693,
                "name": "Santarém",
                "state_id": 70
              },
              {
                "id": 694,
                "name": "Castelo Branco",
                "state_id": 70
              },
              {
                "id": 695,
                "name": "Loulé",
                "state_id": 70
              },
              {
                "id": 989,
                "name": "Lisboa",
                "state_id": 70
              }
            ]
          }
        ]
      },
      {
        "id": 71,
        "name": "Reino Unido",
        "states": [
          {
            "id": 71,
            "name": "No Aplica",
            "country_id": 71,
            "allcities": [
              {
                "id": 696,
                "name": "Londres",
                "state_id": 71
              },
              {
                "id": 697,
                "name": "Birmingham",
                "state_id": 71
              },
              {
                "id": 698,
                "name": "Mánchester",
                "state_id": 71
              },
              {
                "id": 699,
                "name": "Leeds",
                "state_id": 71
              },
              {
                "id": 700,
                "name": "Liverpool",
                "state_id": 71
              },
              {
                "id": 701,
                "name": "Glasgow",
                "state_id": 71
              },
              {
                "id": 702,
                "name": "Sheffield",
                "state_id": 71
              },
              {
                "id": 703,
                "name": "Newcastle upon Tyne",
                "state_id": 71
              },
              {
                "id": 704,
                "name": "Nottingham",
                "state_id": 71
              },
              {
                "id": 705,
                "name": "Southampton",
                "state_id": 71
              },
              {
                "id": 706,
                "name": "Edimburg",
                "state_id": 71
              },
              {
                "id": 707,
                "name": "Leicester",
                "state_id": 71
              },
              {
                "id": 708,
                "name": "Coventry",
                "state_id": 71
              },
              {
                "id": 709,
                "name": "Kingston upon Hull",
                "state_id": 71
              },
              {
                "id": 710,
                "name": "Bradford",
                "state_id": 71
              },
              {
                "id": 711,
                "name": "Cardiff",
                "state_id": 71
              },
              {
                "id": 712,
                "name": "Belfast",
                "state_id": 71
              },
              {
                "id": 713,
                "name": "Wolverhampton",
                "state_id": 71
              },
              {
                "id": 714,
                "name": "Derby",
                "state_id": 71
              },
              {
                "id": 715,
                "name": "Northampton",
                "state_id": 71
              },
              {
                "id": 716,
                "name": "Portsmouth",
                "state_id": 71
              },
              {
                "id": 717,
                "name": "Preston",
                "state_id": 71
              },
              {
                "id": 718,
                "name": "Aberdeen",
                "state_id": 71
              },
              {
                "id": 719,
                "name": "Sunderland",
                "state_id": 71
              },
              {
                "id": 720,
                "name": "Norwich",
                "state_id": 71
              },
              {
                "id": 721,
                "name": "Swansea",
                "state_id": 71
              },
              {
                "id": 722,
                "name": "Bournemouth",
                "state_id": 71
              },
              {
                "id": 723,
                "name": "Oxford",
                "state_id": 71
              },
              {
                "id": 724,
                "name": "Middlesbrough",
                "state_id": 71
              },
              {
                "id": 725,
                "name": "Blackpool",
                "state_id": 71
              },
              {
                "id": 726,
                "name": "Bolton",
                "state_id": 71
              },
              {
                "id": 727,
                "name": "Ipswich",
                "state_id": 71
              },
              {
                "id": 728,
                "name": "Newport",
                "state_id": 71
              },
              {
                "id": 729,
                "name": "Cambridge",
                "state_id": 71
              },
              {
                "id": 730,
                "name": "Eastbourne",
                "state_id": 71
              },
              {
                "id": 731,
                "name": "Blackburn",
                "state_id": 71
              },
              {
                "id": 732,
                "name": "Badminton",
                "state_id": 71
              },
              {
                "id": 733,
                "name": "Bristol",
                "state_id": 71
              },
              {
                "id": 734,
                "name": "Lancashire",
                "state_id": 71
              },
              {
                "id": 735,
                "name": "Sherwsbury",
                "state_id": 71
              },
              {
                "id": 736,
                "name": "Galway",
                "state_id": 71
              },
              {
                "id": 737,
                "name": "Ealing",
                "state_id": 71
              },
              {
                "id": 997,
                "name": "Londres",
                "state_id": 71
              }
            ]
          }
        ]
      },
      {
        "id": 72,
        "name": "República Centroafricana",
        "states": [
          {
            "id": 72,
            "name": "No Aplica",
            "country_id": 72,
            "allcities": [
              {
                "id": 738,
                "name": "Bangui",
                "state_id": 72
              },
              {
                "id": 998,
                "name": "Bangui",
                "state_id": 72
              }
            ]
          }
        ]
      },
      {
        "id": 73,
        "name": "República Checa",
        "states": [
          {
            "id": 73,
            "name": "No Aplica",
            "country_id": 73,
            "allcities": [
              {
                "id": 739,
                "name": "Praga",
                "state_id": 73
              },
              {
                "id": 740,
                "name": "Brno",
                "state_id": 73
              },
              {
                "id": 741,
                "name": "Ostrava",
                "state_id": 73
              },
              {
                "id": 742,
                "name": "Pilsen",
                "state_id": 73
              },
              {
                "id": 999,
                "name": "Praga",
                "state_id": 73
              }
            ]
          }
        ]
      },
      {
        "id": 74,
        "name": "República Democrática del Congo",
        "states": [
          {
            "id": 74,
            "name": "No Aplica",
            "country_id": 74,
            "allcities": [
              {
                "id": 743,
                "name": "Brazzaville",
                "state_id": 74
              },
              {
                "id": 744,
                "name": "Kinsasa",
                "state_id": 74
              },
              {
                "id": 745,
                "name": "Lubumbashi",
                "state_id": 74
              },
              {
                "id": 746,
                "name": "Mbuji-Mayi",
                "state_id": 74
              },
              {
                "id": 747,
                "name": "Kananga",
                "state_id": 74
              },
              {
                "id": 748,
                "name": "Kisangani",
                "state_id": 74
              },
              {
                "id": 1000,
                "name": "Kinsasa",
                "state_id": 74
              }
            ]
          }
        ]
      },
      {
        "id": 75,
        "name": "República Dominicana",
        "states": [
          {
            "id": 75,
            "name": "No Aplica",
            "country_id": 75,
            "allcities": [
              {
                "id": 749,
                "name": "Santo Domingo",
                "state_id": 75
              },
              {
                "id": 750,
                "name": "Azua de Compostela",
                "state_id": 75
              },
              {
                "id": 751,
                "name": "San Cristobal",
                "state_id": 75
              },
              {
                "id": 752,
                "name": "Santiago de los Caballeros",
                "state_id": 75
              },
              {
                "id": 753,
                "name": "Higuey",
                "state_id": 75
              },
              {
                "id": 754,
                "name": "Juncalito",
                "state_id": 75
              },
              {
                "id": 755,
                "name": "Punta Cana",
                "state_id": 75
              },
              {
                "id": 1001,
                "name": "Santo Domingo",
                "state_id": 75
              }
            ]
          }
        ]
      },
      {
        "id": 76,
        "name": "Ruanda",
        "states": [
          {
            "id": 76,
            "name": "No Aplica",
            "country_id": 76,
            "allcities": [
              {
                "id": 756,
                "name": "Kigali",
                "state_id": 76
              },
              {
                "id": 1002,
                "name": "Kigali",
                "state_id": 76
              }
            ]
          }
        ]
      },
      {
        "id": 77,
        "name": "Rumania",
        "states": [
          {
            "id": 77,
            "name": "No Aplica",
            "country_id": 77,
            "allcities": [
              {
                "id": 757,
                "name": "Bucarest",
                "state_id": 77
              },
              {
                "id": 758,
                "name": "Lasi",
                "state_id": 77
              },
              {
                "id": 759,
                "name": "Cluj-Napoca",
                "state_id": 77
              },
              {
                "id": 1003,
                "name": "Bucarest",
                "state_id": 77
              }
            ]
          }
        ]
      },
      {
        "id": 78,
        "name": "Rusia",
        "states": [
          {
            "id": 78,
            "name": "No Aplica",
            "country_id": 78,
            "allcities": [
              {
                "id": 760,
                "name": "Moscú",
                "state_id": 78
              },
              {
                "id": 761,
                "name": "San Petersburgo",
                "state_id": 78
              },
              {
                "id": 762,
                "name": "Nizhny Novgorod",
                "state_id": 78
              },
              {
                "id": 763,
                "name": "Volgogrado",
                "state_id": 78
              },
              {
                "id": 764,
                "name": "Samara",
                "state_id": 78
              },
              {
                "id": 765,
                "name": "Rostov del Don",
                "state_id": 78
              },
              {
                "id": 766,
                "name": "Kazán",
                "state_id": 78
              },
              {
                "id": 767,
                "name": "Ufá",
                "state_id": 78
              },
              {
                "id": 768,
                "name": "Perm",
                "state_id": 78
              },
              {
                "id": 769,
                "name": "Sarátov",
                "state_id": 78
              },
              {
                "id": 770,
                "name": "Vorónezh",
                "state_id": 78
              },
              {
                "id": 1004,
                "name": "Moscú",
                "state_id": 78
              }
            ]
          }
        ]
      },
      {
        "id": 79,
        "name": "Senegal",
        "states": [
          {
            "id": 79,
            "name": "No Aplica",
            "country_id": 79,
            "allcities": [
              {
                "id": 771,
                "name": "Dakar",
                "state_id": 79
              },
              {
                "id": 1011,
                "name": "Dakar",
                "state_id": 79
              }
            ]
          }
        ]
      },
      {
        "id": 80,
        "name": "Serbia",
        "states": [
          {
            "id": 80,
            "name": "No Aplica",
            "country_id": 80,
            "allcities": [
              {
                "id": 772,
                "name": "Belgrado",
                "state_id": 80
              },
              {
                "id": 773,
                "name": "Pristina",
                "state_id": 80
              },
              {
                "id": 774,
                "name": "Novi Sad",
                "state_id": 80
              },
              {
                "id": 1012,
                "name": "Belgrado",
                "state_id": 80
              }
            ]
          }
        ]
      },
      {
        "id": 81,
        "name": "Sierra Leona",
        "states": [
          {
            "id": 81,
            "name": "No Aplica",
            "country_id": 81,
            "allcities": [
              {
                "id": 775,
                "name": "Freetown",
                "state_id": 81
              },
              {
                "id": 1014,
                "name": "Freetown",
                "state_id": 81
              }
            ]
          }
        ]
      },
      {
        "id": 82,
        "name": "Somalia",
        "states": [
          {
            "id": 82,
            "name": "No Aplica",
            "country_id": 82,
            "allcities": [
              {
                "id": 776,
                "name": "Mogadiscio",
                "state_id": 82
              },
              {
                "id": 1017,
                "name": "Mogadiscio",
                "state_id": 82
              }
            ]
          }
        ]
      },
      {
        "id": 83,
        "name": "Sudáfrica",
        "states": [
          {
            "id": 83,
            "name": "No Aplica",
            "country_id": 83,
            "allcities": [
              {
                "id": 777,
                "name": "Johannesburgo (incl.Pretoria - Vereeniging)",
                "state_id": 83
              },
              {
                "id": 778,
                "name": "Ciudad del Cabo",
                "state_id": 83
              },
              {
                "id": 779,
                "name": "Durban",
                "state_id": 83
              },
              {
                "id": 780,
                "name": "Port Elizabeth",
                "state_id": 83
              },
              {
                "id": 1020,
                "name": "Pretoria",
                "state_id": 83
              }
            ]
          }
        ]
      },
      {
        "id": 84,
        "name": "Sudán",
        "states": [
          {
            "id": 84,
            "name": "No Aplica",
            "country_id": 84,
            "allcities": [
              {
                "id": 781,
                "name": "Jartum",
                "state_id": 84
              },
              {
                "id": 1021,
                "name": "Jartum",
                "state_id": 84
              }
            ]
          }
        ]
      },
      {
        "id": 85,
        "name": "Suecia",
        "states": [
          {
            "id": 85,
            "name": "No Aplica",
            "country_id": 85,
            "allcities": [
              {
                "id": 782,
                "name": "Estocolmo",
                "state_id": 85
              },
              {
                "id": 783,
                "name": "Gotemburg",
                "state_id": 85
              },
              {
                "id": 784,
                "name": "Malmo",
                "state_id": 85
              },
              {
                "id": 785,
                "name": "Upsala",
                "state_id": 85
              },
              {
                "id": 1023,
                "name": "Estocolmo",
                "state_id": 85
              }
            ]
          }
        ]
      },
      {
        "id": 86,
        "name": "Suiza",
        "states": [
          {
            "id": 86,
            "name": "No Aplica",
            "country_id": 86,
            "allcities": [
              {
                "id": 786,
                "name": "Zúrich",
                "state_id": 86
              },
              {
                "id": 787,
                "name": "Ginebra",
                "state_id": 86
              },
              {
                "id": 788,
                "name": "Basilea",
                "state_id": 86
              },
              {
                "id": 789,
                "name": "Lausana",
                "state_id": 86
              },
              {
                "id": 790,
                "name": "Berna",
                "state_id": 86
              },
              {
                "id": 791,
                "name": "Baden",
                "state_id": 86
              },
              {
                "id": 792,
                "name": "Brugg",
                "state_id": 86
              },
              {
                "id": 793,
                "name": "Frauenfeld",
                "state_id": 86
              },
              {
                "id": 794,
                "name": "Lucerna",
                "state_id": 86
              },
              {
                "id": 1024,
                "name": "Berna",
                "state_id": 86
              }
            ]
          }
        ]
      },
      {
        "id": 87,
        "name": "Tanzania",
        "states": [
          {
            "id": 87,
            "name": "No Aplica",
            "country_id": 87,
            "allcities": [
              {
                "id": 795,
                "name": "Dar es Salaam",
                "state_id": 87
              },
              {
                "id": 1028,
                "name": "Dodoma",
                "state_id": 87
              }
            ]
          }
        ]
      },
      {
        "id": 88,
        "name": "Togo",
        "states": [
          {
            "id": 88,
            "name": "No Aplica",
            "country_id": 88,
            "allcities": [
              {
                "id": 796,
                "name": "Lomé",
                "state_id": 88
              },
              {
                "id": 1031,
                "name": "Lomé",
                "state_id": 88
              }
            ]
          }
        ]
      },
      {
        "id": 89,
        "name": "Túnez",
        "states": [
          {
            "id": 89,
            "name": "No Aplica",
            "country_id": 89,
            "allcities": [
              {
                "id": 797,
                "name": "Túnez",
                "state_id": 89
              },
              {
                "id": 798,
                "name": "Susa",
                "state_id": 89
              },
              {
                "id": 1034,
                "name": "Túnez",
                "state_id": 89
              }
            ]
          }
        ]
      },
      {
        "id": 90,
        "name": "Turquía",
        "states": [
          {
            "id": 90,
            "name": "No Aplica",
            "country_id": 90,
            "allcities": [
              {
                "id": 799,
                "name": "Estambul",
                "state_id": 90
              },
              {
                "id": 1036,
                "name": "Ankara",
                "state_id": 90
              }
            ]
          }
        ]
      },
      {
        "id": 91,
        "name": "Ucrania",
        "states": [
          {
            "id": 91,
            "name": "No Aplica",
            "country_id": 91,
            "allcities": [
              {
                "id": 800,
                "name": "Kiev",
                "state_id": 91
              },
              {
                "id": 801,
                "name": "Járkov",
                "state_id": 91
              },
              {
                "id": 802,
                "name": "Donetsk",
                "state_id": 91
              },
              {
                "id": 803,
                "name": "Dnipropetrovsk",
                "state_id": 91
              },
              {
                "id": 804,
                "name": "Odesa",
                "state_id": 91
              },
              {
                "id": 1038,
                "name": "Kiev",
                "state_id": 91
              }
            ]
          }
        ]
      },
      {
        "id": 92,
        "name": "Uganda",
        "states": [
          {
            "id": 92,
            "name": "No Aplica",
            "country_id": 92,
            "allcities": [
              {
                "id": 805,
                "name": "Kampala",
                "state_id": 92
              },
              {
                "id": 1039,
                "name": "Kampala",
                "state_id": 92
              }
            ]
          }
        ]
      },
      {
        "id": 93,
        "name": "Zambia",
        "states": [
          {
            "id": 93,
            "name": "No Aplica",
            "country_id": 93,
            "allcities": [
              {
                "id": 806,
                "name": "Lusaka",
                "state_id": 93
              },
              {
                "id": 1368,
                "name": "Lusaka",
                "state_id": 93
              }
            ]
          }
        ]
      },
      {
        "id": 94,
        "name": "Zimbabue",
        "states": [
          {
            "id": 94,
            "name": "No Aplica",
            "country_id": 94,
            "allcities": [
              {
                "id": 807,
                "name": "Harare",
                "state_id": 94
              },
              {
                "id": 1369,
                "name": "Harare",
                "state_id": 94
              }
            ]
          }
        ]
      },
      {
        "id": 95,
        "name": "Afganistán",
        "states": [
          {
            "id": 95,
            "name": "No Aplica",
            "country_id": 95,
            "allcities": [
              {
                "id": 808,
                "name": "Kabul",
                "state_id": 95
              },
              {
                "id": 809,
                "name": "Kabul",
                "state_id": 95
              }
            ]
          }
        ]
      },
      {
        "id": 96,
        "name": "Albania",
        "states": [
          {
            "id": 96,
            "name": "No Aplica",
            "country_id": 96,
            "allcities": [
              {
                "id": 810,
                "name": "Tirana",
                "state_id": 96
              }
            ]
          }
        ]
      },
      {
        "id": 97,
        "name": "Andorra",
        "states": [
          {
            "id": 97,
            "name": "No Aplica",
            "country_id": 97,
            "allcities": [
              {
                "id": 812,
                "name": "Andorra la Vieja",
                "state_id": 97
              }
            ]
          }
        ]
      },
      {
        "id": 98,
        "name": "Antigua y Barbuda",
        "states": [
          {
            "id": 98,
            "name": "No Aplica",
            "country_id": 98,
            "allcities": [
              {
                "id": 814,
                "name": "Saint John",
                "state_id": 98
              }
            ]
          }
        ]
      },
      {
        "id": 99,
        "name": "Aruba",
        "states": [
          {
            "id": 99,
            "name": "No Aplica",
            "country_id": 99,
            "allcities": [
              {
                "id": 819,
                "name": "Aruba",
                "state_id": 99
              }
            ]
          }
        ]
      },
      {
        "id": 100,
        "name": "Bahamas",
        "states": [
          {
            "id": 100,
            "name": "No Aplica",
            "country_id": 100,
            "allcities": [
              {
                "id": 823,
                "name": "Nasáu",
                "state_id": 100
              },
              {
                "id": 824,
                "name": "Nasau",
                "state_id": 100
              }
            ]
          }
        ]
      },
      {
        "id": 101,
        "name": "Barbados",
        "states": [
          {
            "id": 101,
            "name": "No Aplica",
            "country_id": 101,
            "allcities": [
              {
                "id": 826,
                "name": "Bridgetown",
                "state_id": 101
              }
            ]
          }
        ]
      },
      {
        "id": 102,
        "name": "Baréin",
        "states": [
          {
            "id": 102,
            "name": "No Aplica",
            "country_id": 102,
            "allcities": [
              {
                "id": 827,
                "name": "Manama",
                "state_id": 102
              }
            ]
          }
        ]
      },
      {
        "id": 103,
        "name": "Belice",
        "states": [
          {
            "id": 103,
            "name": "No Aplica",
            "country_id": 103,
            "allcities": [
              {
                "id": 829,
                "name": "Belmopán",
                "state_id": 103
              }
            ]
          }
        ]
      },
      {
        "id": 104,
        "name": "Birmania",
        "states": [
          {
            "id": 104,
            "name": "No Aplica",
            "country_id": 104,
            "allcities": [
              {
                "id": 832,
                "name": "Naipyidó",
                "state_id": 104
              }
            ]
          }
        ]
      },
      {
        "id": 105,
        "name": "Bosnia-Herzegovina",
        "states": [
          {
            "id": 105,
            "name": "No Aplica",
            "country_id": 105,
            "allcities": [
              {
                "id": 834,
                "name": "Sarajevo",
                "state_id": 105
              }
            ]
          }
        ]
      },
      {
        "id": 106,
        "name": "Botsuana",
        "states": [
          {
            "id": 106,
            "name": "No Aplica",
            "country_id": 106,
            "allcities": [
              {
                "id": 835,
                "name": "Gaborone",
                "state_id": 106
              }
            ]
          }
        ]
      },
      {
        "id": 107,
        "name": "Brunéi",
        "states": [
          {
            "id": 107,
            "name": "No Aplica",
            "country_id": 107,
            "allcities": [
              {
                "id": 837,
                "name": "Bandar Seri Begawan",
                "state_id": 107
              }
            ]
          }
        ]
      },
      {
        "id": 108,
        "name": "Burundi",
        "states": [
          {
            "id": 108,
            "name": "No Aplica",
            "country_id": 108,
            "allcities": [
              {
                "id": 840,
                "name": "Buyumbura",
                "state_id": 108
              }
            ]
          }
        ]
      },
      {
        "id": 109,
        "name": "Bután",
        "states": [
          {
            "id": 109,
            "name": "No Aplica",
            "country_id": 109,
            "allcities": [
              {
                "id": 841,
                "name": "Thimphu",
                "state_id": 109
              }
            ]
          }
        ]
      },
      {
        "id": 110,
        "name": "Cabo Verde",
        "states": [
          {
            "id": 110,
            "name": "No Aplica",
            "country_id": 110,
            "allcities": [
              {
                "id": 842,
                "name": "Praia",
                "state_id": 110
              }
            ]
          }
        ]
      },
      {
        "id": 111,
        "name": "Catar",
        "states": [
          {
            "id": 111,
            "name": "No Aplica",
            "country_id": 111,
            "allcities": [
              {
                "id": 846,
                "name": "Doha",
                "state_id": 111
              }
            ]
          }
        ]
      },
      {
        "id": 112,
        "name": "Chipre",
        "states": [
          {
            "id": 112,
            "name": "No Aplica",
            "country_id": 112,
            "allcities": [
              {
                "id": 850,
                "name": "Nicosia",
                "state_id": 112
              }
            ]
          }
        ]
      },
      {
        "id": 114,
        "name": "Comoras",
        "states": [
          {
            "id": 114,
            "name": "No Aplica",
            "country_id": 114,
            "allcities": [
              {
                "id": 851,
                "name": "Moroni",
                "state_id": 114
              }
            ]
          }
        ]
      },
      {
        "id": 115,
        "name": "Congo",
        "states": [
          {
            "id": 115,
            "name": "No Aplica",
            "country_id": 115,
            "allcities": [
              {
                "id": 852,
                "name": "Brazzaville",
                "state_id": 115
              }
            ]
          }
        ]
      },
      {
        "id": 116,
        "name": "Costa Rica",
        "states": [
          {
            "id": 116,
            "name": "No Aplica",
            "country_id": 116,
            "allcities": [
              {
                "id": 856,
                "name": "San José",
                "state_id": 116
              },
              {
                "id": 857,
                "name": "San José",
                "state_id": 116
              },
              {
                "id": 858,
                "name": "Heredia",
                "state_id": 116
              },
              {
                "id": 859,
                "name": "Alajuela",
                "state_id": 116
              },
              {
                "id": 860,
                "name": "Cartago",
                "state_id": 116
              }
            ]
          }
        ]
      },
      {
        "id": 117,
        "name": "Croacia",
        "states": [
          {
            "id": 117,
            "name": "No Aplica",
            "country_id": 117,
            "allcities": [
              {
                "id": 861,
                "name": "Zagreb",
                "state_id": 117
              }
            ]
          }
        ]
      },
      {
        "id": 118,
        "name": "Cuba",
        "states": [
          {
            "id": 118,
            "name": "No Aplica",
            "country_id": 118,
            "allcities": [
              {
                "id": 862,
                "name": "La Habana",
                "state_id": 118
              },
              {
                "id": 863,
                "name": "La Habana",
                "state_id": 118
              },
              {
                "id": 864,
                "name": "Santiago de Cuba",
                "state_id": 118
              },
              {
                "id": 865,
                "name": "Holguín",
                "state_id": 118
              },
              {
                "id": 866,
                "name": "Camaguey",
                "state_id": 118
              },
              {
                "id": 867,
                "name": "Guantánamo",
                "state_id": 118
              },
              {
                "id": 868,
                "name": "Omaja",
                "state_id": 118
              }
            ]
          }
        ]
      },
      {
        "id": 119,
        "name": "Curazao",
        "states": [
          {
            "id": 119,
            "name": "No Aplica",
            "country_id": 119,
            "allcities": [
              {
                "id": 869,
                "name": "Willemstad",
                "state_id": 119
              }
            ]
          }
        ]
      },
      {
        "id": 120,
        "name": "Dominica",
        "states": [
          {
            "id": 120,
            "name": "No Aplica",
            "country_id": 120,
            "allcities": [
              {
                "id": 871,
                "name": "Roseau",
                "state_id": 120
              }
            ]
          }
        ]
      },
      {
        "id": 121,
        "name": "El Salvador",
        "states": [
          {
            "id": 121,
            "name": "No Aplica",
            "country_id": 121,
            "allcities": [
              {
                "id": 874,
                "name": "San Salvador",
                "state_id": 121
              },
              {
                "id": 875,
                "name": "San Salvador",
                "state_id": 121
              },
              {
                "id": 876,
                "name": "San Vicente",
                "state_id": 121
              },
              {
                "id": 877,
                "name": "Santa Tecla",
                "state_id": 121
              },
              {
                "id": 878,
                "name": "Sonsonate",
                "state_id": 121
              }
            ]
          }
        ]
      },
      {
        "id": 122,
        "name": "Eritrea",
        "states": [
          {
            "id": 122,
            "name": "No Aplica",
            "country_id": 122,
            "allcities": [
              {
                "id": 880,
                "name": "Asmara",
                "state_id": 122
              }
            ]
          }
        ]
      },
      {
        "id": 123,
        "name": "Eslovaquia",
        "states": [
          {
            "id": 123,
            "name": "No Aplica",
            "country_id": 123,
            "allcities": [
              {
                "id": 881,
                "name": "Bratislava",
                "state_id": 123
              }
            ]
          }
        ]
      },
      {
        "id": 124,
        "name": "Eslovenia",
        "states": [
          {
            "id": 124,
            "name": "No Aplica",
            "country_id": 124,
            "allcities": [
              {
                "id": 882,
                "name": "Liubliana",
                "state_id": 124
              }
            ]
          }
        ]
      },
      {
        "id": 125,
        "name": "Estonia",
        "states": [
          {
            "id": 125,
            "name": "No Aplica",
            "country_id": 125,
            "allcities": [
              {
                "id": 885,
                "name": "Tallin",
                "state_id": 125
              },
              {
                "id": 886,
                "name": "Tallin",
                "state_id": 125
              },
              {
                "id": 887,
                "name": "Paide",
                "state_id": 125
              }
            ]
          }
        ]
      },
      {
        "id": 126,
        "name": "Fiyi",
        "states": [
          {
            "id": 126,
            "name": "No Aplica",
            "country_id": 126,
            "allcities": [
              {
                "id": 891,
                "name": "Suva",
                "state_id": 126
              }
            ]
          }
        ]
      },
      {
        "id": 127,
        "name": "Gabón",
        "states": [
          {
            "id": 127,
            "name": "No Aplica",
            "country_id": 127,
            "allcities": [
              {
                "id": 893,
                "name": "Libreville",
                "state_id": 127
              }
            ]
          }
        ]
      },
      {
        "id": 128,
        "name": "Gambia",
        "states": [
          {
            "id": 128,
            "name": "No Aplica",
            "country_id": 128,
            "allcities": [
              {
                "id": 894,
                "name": "Banjul",
                "state_id": 128
              }
            ]
          }
        ]
      },
      {
        "id": 129,
        "name": "Granada",
        "states": [
          {
            "id": 129,
            "name": "No Aplica",
            "country_id": 129,
            "allcities": [
              {
                "id": 897,
                "name": "Saint George",
                "state_id": 129
              }
            ]
          }
        ]
      },
      {
        "id": 130,
        "name": "Guinea Ecuatorial",
        "states": [
          {
            "id": 130,
            "name": "No Aplica",
            "country_id": 130,
            "allcities": [
              {
                "id": 901,
                "name": "Malabo",
                "state_id": 130
              }
            ]
          }
        ]
      },
      {
        "id": 131,
        "name": "Guinea-Bisáu",
        "states": [
          {
            "id": 131,
            "name": "No Aplica",
            "country_id": 131,
            "allcities": [
              {
                "id": 902,
                "name": "Bisáu",
                "state_id": 131
              }
            ]
          }
        ]
      },
      {
        "id": 132,
        "name": "Guyana",
        "states": [
          {
            "id": 132,
            "name": "No Aplica",
            "country_id": 132,
            "allcities": [
              {
                "id": 903,
                "name": "Georgetown",
                "state_id": 132
              }
            ]
          }
        ]
      },
      {
        "id": 133,
        "name": "Honduras",
        "states": [
          {
            "id": 133,
            "name": "No Aplica",
            "country_id": 133,
            "allcities": [
              {
                "id": 905,
                "name": "Tegucigalpa",
                "state_id": 133
              },
              {
                "id": 906,
                "name": "San Pedro Sula",
                "state_id": 133
              },
              {
                "id": 907,
                "name": "Tegucigalpa",
                "state_id": 133
              },
              {
                "id": 908,
                "name": "Roatán",
                "state_id": 133
              },
              {
                "id": 909,
                "name": "Copán",
                "state_id": 133
              },
              {
                "id": 910,
                "name": "Valle de Angeles",
                "state_id": 133
              }
            ]
          }
        ]
      },
      {
        "id": 134,
        "name": "Islandia",
        "states": [
          {
            "id": 134,
            "name": "No Aplica",
            "country_id": 134,
            "allcities": [
              {
                "id": 917,
                "name": "Reikiavik",
                "state_id": 134
              }
            ]
          }
        ]
      },
      {
        "id": 135,
        "name": "Islas Marshall",
        "states": [
          {
            "id": 135,
            "name": "No Aplica",
            "country_id": 135,
            "allcities": [
              {
                "id": 918,
                "name": "Majuro",
                "state_id": 135
              }
            ]
          }
        ]
      },
      {
        "id": 136,
        "name": "Islas Salomón",
        "states": [
          {
            "id": 136,
            "name": "No Aplica",
            "country_id": 136,
            "allcities": [
              {
                "id": 919,
                "name": "Honiara",
                "state_id": 136
              }
            ]
          }
        ]
      },
      {
        "id": 137,
        "name": "Jamaica",
        "states": [
          {
            "id": 137,
            "name": "No Aplica",
            "country_id": 137,
            "allcities": [
              {
                "id": 922,
                "name": "Kingston",
                "state_id": 137
              },
              {
                "id": 923,
                "name": "Kingston",
                "state_id": 137
              }
            ]
          }
        ]
      },
      {
        "id": 138,
        "name": "Japón",
        "states": [
          {
            "id": 138,
            "name": "No Aplica",
            "country_id": 138,
            "allcities": [
              {
                "id": 924,
                "name": "Tokio",
                "state_id": 138
              }
            ]
          }
        ]
      },
      {
        "id": 139,
        "name": "Jordania",
        "states": [
          {
            "id": 139,
            "name": "No Aplica",
            "country_id": 139,
            "allcities": [
              {
                "id": 925,
                "name": "Amán",
                "state_id": 139
              }
            ]
          }
        ]
      },
      {
        "id": 140,
        "name": "Kazajistán",
        "states": [
          {
            "id": 140,
            "name": "No Aplica",
            "country_id": 140,
            "allcities": [
              {
                "id": 926,
                "name": "Astaná",
                "state_id": 140
              }
            ]
          }
        ]
      },
      {
        "id": 141,
        "name": "Kirguistán",
        "states": [
          {
            "id": 141,
            "name": "No Aplica",
            "country_id": 141,
            "allcities": [
              {
                "id": 928,
                "name": "Biskek",
                "state_id": 141
              }
            ]
          }
        ]
      },
      {
        "id": 142,
        "name": "Kiribati",
        "states": [
          {
            "id": 142,
            "name": "No Aplica",
            "country_id": 142,
            "allcities": [
              {
                "id": 929,
                "name": "Tarawa",
                "state_id": 142
              }
            ]
          }
        ]
      },
      {
        "id": 143,
        "name": "Kosovo",
        "states": [
          {
            "id": 143,
            "name": "No Aplica",
            "country_id": 143,
            "allcities": [
              {
                "id": 930,
                "name": "Pristina",
                "state_id": 143
              }
            ]
          }
        ]
      },
      {
        "id": 144,
        "name": "Kuwait",
        "states": [
          {
            "id": 144,
            "name": "No Aplica",
            "country_id": 144,
            "allcities": [
              {
                "id": 931,
                "name": "Kuwait City",
                "state_id": 144
              }
            ]
          }
        ]
      },
      {
        "id": 145,
        "name": "Laos",
        "states": [
          {
            "id": 145,
            "name": "No Aplica",
            "country_id": 145,
            "allcities": [
              {
                "id": 932,
                "name": "Vientián",
                "state_id": 145
              }
            ]
          }
        ]
      },
      {
        "id": 146,
        "name": "Lesoto",
        "states": [
          {
            "id": 146,
            "name": "No Aplica",
            "country_id": 146,
            "allcities": [
              {
                "id": 933,
                "name": "Maseru",
                "state_id": 146
              }
            ]
          }
        ]
      },
      {
        "id": 147,
        "name": "Letonia",
        "states": [
          {
            "id": 147,
            "name": "No Aplica",
            "country_id": 147,
            "allcities": [
              {
                "id": 934,
                "name": "Riga",
                "state_id": 147
              }
            ]
          }
        ]
      },
      {
        "id": 148,
        "name": "Líbano",
        "states": [
          {
            "id": 148,
            "name": "No Aplica",
            "country_id": 148,
            "allcities": [
              {
                "id": 935,
                "name": "Beirut",
                "state_id": 148
              }
            ]
          }
        ]
      },
      {
        "id": 149,
        "name": "Liechtenstein",
        "states": [
          {
            "id": 149,
            "name": "No Aplica",
            "country_id": 149,
            "allcities": [
              {
                "id": 938,
                "name": "Vaduz",
                "state_id": 149
              }
            ]
          }
        ]
      },
      {
        "id": 150,
        "name": "Lituania",
        "states": [
          {
            "id": 150,
            "name": "No Aplica",
            "country_id": 150,
            "allcities": [
              {
                "id": 939,
                "name": "Vilna",
                "state_id": 150
              }
            ]
          }
        ]
      },
      {
        "id": 151,
        "name": "Luxemburgo",
        "states": [
          {
            "id": 151,
            "name": "No Aplica",
            "country_id": 151,
            "allcities": [
              {
                "id": 940,
                "name": "Luxemburgo",
                "state_id": 151
              }
            ]
          }
        ]
      },
      {
        "id": 152,
        "name": "Macedonia",
        "states": [
          {
            "id": 152,
            "name": "No Aplica",
            "country_id": 152,
            "allcities": [
              {
                "id": 941,
                "name": "Skopie",
                "state_id": 152
              }
            ]
          }
        ]
      },
      {
        "id": 153,
        "name": "Malasia",
        "states": [
          {
            "id": 153,
            "name": "No Aplica",
            "country_id": 153,
            "allcities": [
              {
                "id": 943,
                "name": "Kuala Lumpur",
                "state_id": 153
              }
            ]
          }
        ]
      },
      {
        "id": 154,
        "name": "Maldivas",
        "states": [
          {
            "id": 154,
            "name": "No Aplica",
            "country_id": 154,
            "allcities": [
              {
                "id": 945,
                "name": "Malé",
                "state_id": 154
              }
            ]
          }
        ]
      },
      {
        "id": 155,
        "name": "Malta",
        "states": [
          {
            "id": 155,
            "name": "No Aplica",
            "country_id": 155,
            "allcities": [
              {
                "id": 947,
                "name": "La Valeta",
                "state_id": 155
              }
            ]
          }
        ]
      },
      {
        "id": 156,
        "name": "Mauricio",
        "states": [
          {
            "id": 156,
            "name": "No Aplica",
            "country_id": 156,
            "allcities": [
              {
                "id": 949,
                "name": "Port Louis",
                "state_id": 156
              }
            ]
          }
        ]
      },
      {
        "id": 157,
        "name": "Micronesia",
        "states": [
          {
            "id": 157,
            "name": "No Aplica",
            "country_id": 157,
            "allcities": [
              {
                "id": 952,
                "name": "Palikir",
                "state_id": 157
              }
            ]
          }
        ]
      },
      {
        "id": 158,
        "name": "Moldavia",
        "states": [
          {
            "id": 158,
            "name": "No Aplica",
            "country_id": 158,
            "allcities": [
              {
                "id": 953,
                "name": "Chisináu",
                "state_id": 158
              }
            ]
          }
        ]
      },
      {
        "id": 159,
        "name": "Mónaco",
        "states": [
          {
            "id": 159,
            "name": "No Aplica",
            "country_id": 159,
            "allcities": [
              {
                "id": 954,
                "name": "Mónaco",
                "state_id": 159
              }
            ]
          }
        ]
      },
      {
        "id": 160,
        "name": "Mongolia",
        "states": [
          {
            "id": 160,
            "name": "No Aplica",
            "country_id": 160,
            "allcities": [
              {
                "id": 955,
                "name": "Ulán Bator",
                "state_id": 160
              }
            ]
          }
        ]
      },
      {
        "id": 161,
        "name": "Montenegro",
        "states": [
          {
            "id": 161,
            "name": "No Aplica",
            "country_id": 161,
            "allcities": [
              {
                "id": 956,
                "name": "Podgorica",
                "state_id": 161
              }
            ]
          }
        ]
      },
      {
        "id": 162,
        "name": "Namibia",
        "states": [
          {
            "id": 162,
            "name": "No Aplica",
            "country_id": 162,
            "allcities": [
              {
                "id": 958,
                "name": "Windhoek",
                "state_id": 162
              }
            ]
          }
        ]
      },
      {
        "id": 163,
        "name": "Nauru",
        "states": [
          {
            "id": 163,
            "name": "No Aplica",
            "country_id": 163,
            "allcities": [
              {
                "id": 959,
                "name": "Yaren",
                "state_id": 163
              }
            ]
          }
        ]
      },
      {
        "id": 164,
        "name": "Nepal",
        "states": [
          {
            "id": 164,
            "name": "No Aplica",
            "country_id": 164,
            "allcities": [
              {
                "id": 960,
                "name": "Katmandú",
                "state_id": 164
              }
            ]
          }
        ]
      },
      {
        "id": 165,
        "name": "Nicaragua",
        "states": [
          {
            "id": 165,
            "name": "No Aplica",
            "country_id": 165,
            "allcities": [
              {
                "id": 961,
                "name": "Managua",
                "state_id": 165
              },
              {
                "id": 962,
                "name": "Managua",
                "state_id": 165
              }
            ]
          }
        ]
      },
      {
        "id": 166,
        "name": "Omán",
        "states": [
          {
            "id": 166,
            "name": "No Aplica",
            "country_id": 166,
            "allcities": [
              {
                "id": 967,
                "name": "Mascate",
                "state_id": 166
              }
            ]
          }
        ]
      },
      {
        "id": 167,
        "name": "Pakistán",
        "states": [
          {
            "id": 167,
            "name": "No Aplica",
            "country_id": 167,
            "allcities": [
              {
                "id": 969,
                "name": "Islamabad",
                "state_id": 167
              }
            ]
          }
        ]
      },
      {
        "id": 168,
        "name": "Palaos",
        "states": [
          {
            "id": 168,
            "name": "No Aplica",
            "country_id": 168,
            "allcities": [
              {
                "id": 970,
                "name": "Melekeok",
                "state_id": 168
              }
            ]
          }
        ]
      },
      {
        "id": 169,
        "name": "Panamá",
        "states": [
          {
            "id": 169,
            "name": "No Aplica",
            "country_id": 169,
            "allcities": [
              {
                "id": 971,
                "name": "Panamá",
                "state_id": 169
              },
              {
                "id": 972,
                "name": "Ciudad de Panamá",
                "state_id": 169
              },
              {
                "id": 973,
                "name": "Veraguas",
                "state_id": 169
              },
              {
                "id": 974,
                "name": "Colon",
                "state_id": 169
              },
              {
                "id": 975,
                "name": "Chiriqui",
                "state_id": 169
              },
              {
                "id": 976,
                "name": "Cocle",
                "state_id": 169
              },
              {
                "id": 977,
                "name": "David",
                "state_id": 169
              },
              {
                "id": 978,
                "name": "Juan Diaz",
                "state_id": 169
              },
              {
                "id": 979,
                "name": "Chitré",
                "state_id": 169
              },
              {
                "id": 980,
                "name": "San Miguelito",
                "state_id": 169
              }
            ]
          }
        ]
      },
      {
        "id": 170,
        "name": "Papúa Nueva Guinea",
        "states": [
          {
            "id": 170,
            "name": "No Aplica",
            "country_id": 170,
            "allcities": [
              {
                "id": 981,
                "name": "Puerto Moresby",
                "state_id": 170
              }
            ]
          }
        ]
      },
      {
        "id": 171,
        "name": "Paraguay",
        "states": [
          {
            "id": 171,
            "name": "No Aplica",
            "country_id": 171,
            "allcities": [
              {
                "id": 982,
                "name": "Asunción",
                "state_id": 171
              },
              {
                "id": 983,
                "name": "Asunción",
                "state_id": 171
              },
              {
                "id": 984,
                "name": "Ciudad del Este",
                "state_id": 171
              },
              {
                "id": 985,
                "name": "Luque",
                "state_id": 171
              },
              {
                "id": 986,
                "name": "San Lorenzo",
                "state_id": 171
              }
            ]
          }
        ]
      },
      {
        "id": 172,
        "name": "Puerto Rico",
        "states": [
          {
            "id": 172,
            "name": "No Aplica",
            "country_id": 172,
            "allcities": [
              {
                "id": 990,
                "name": "San Juan",
                "state_id": 172
              },
              {
                "id": 991,
                "name": "Bayamón",
                "state_id": 172
              },
              {
                "id": 992,
                "name": "Carolina",
                "state_id": 172
              },
              {
                "id": 993,
                "name": "Ponce",
                "state_id": 172
              },
              {
                "id": 994,
                "name": "Caguas",
                "state_id": 172
              },
              {
                "id": 995,
                "name": "Guayama",
                "state_id": 172
              },
              {
                "id": 996,
                "name": "Guaynabo",
                "state_id": 172
              }
            ]
          }
        ]
      },
      {
        "id": 173,
        "name": "Samoa",
        "states": [
          {
            "id": 173,
            "name": "No Aplica",
            "country_id": 173,
            "allcities": [
              {
                "id": 1005,
                "name": "Apia",
                "state_id": 173
              }
            ]
          }
        ]
      },
      {
        "id": 174,
        "name": "San Cristóbal y Nieves",
        "states": [
          {
            "id": 174,
            "name": "No Aplica",
            "country_id": 174,
            "allcities": [
              {
                "id": 1006,
                "name": "Basseterre",
                "state_id": 174
              }
            ]
          }
        ]
      },
      {
        "id": 175,
        "name": "San Marino",
        "states": [
          {
            "id": 175,
            "name": "No Aplica",
            "country_id": 175,
            "allcities": [
              {
                "id": 1007,
                "name": "San Marino",
                "state_id": 175
              }
            ]
          }
        ]
      },
      {
        "id": 176,
        "name": "San Vicente y las Granadinas",
        "states": [
          {
            "id": 176,
            "name": "No Aplica",
            "country_id": 176,
            "allcities": [
              {
                "id": 1008,
                "name": "Kingstown",
                "state_id": 176
              }
            ]
          }
        ]
      },
      {
        "id": 177,
        "name": "Santa Lucía",
        "states": [
          {
            "id": 177,
            "name": "No Aplica",
            "country_id": 177,
            "allcities": [
              {
                "id": 1009,
                "name": "Castries",
                "state_id": 177
              }
            ]
          }
        ]
      },
      {
        "id": 178,
        "name": "Santo Tomé y Príncipe",
        "states": [
          {
            "id": 178,
            "name": "No Aplica",
            "country_id": 178,
            "allcities": [
              {
                "id": 1010,
                "name": "Santo Tomé",
                "state_id": 178
              }
            ]
          }
        ]
      },
      {
        "id": 179,
        "name": "Seychelles",
        "states": [
          {
            "id": 179,
            "name": "No Aplica",
            "country_id": 179,
            "allcities": [
              {
                "id": 1013,
                "name": "Victoria",
                "state_id": 179
              }
            ]
          }
        ]
      },
      {
        "id": 180,
        "name": "Singapur",
        "states": [
          {
            "id": 180,
            "name": "No Aplica",
            "country_id": 180,
            "allcities": [
              {
                "id": 1015,
                "name": "Singapur",
                "state_id": 180
              }
            ]
          }
        ]
      },
      {
        "id": 181,
        "name": "Siria",
        "states": [
          {
            "id": 181,
            "name": "No Aplica",
            "country_id": 181,
            "allcities": [
              {
                "id": 1016,
                "name": "Damasco",
                "state_id": 181
              }
            ]
          }
        ]
      },
      {
        "id": 182,
        "name": "Sri Lanka",
        "states": [
          {
            "id": 182,
            "name": "No Aplica",
            "country_id": 182,
            "allcities": [
              {
                "id": 1018,
                "name": "Sri Jayawardenapura Kotte",
                "state_id": 182
              }
            ]
          }
        ]
      },
      {
        "id": 183,
        "name": "Suazilandia",
        "states": [
          {
            "id": 183,
            "name": "No Aplica",
            "country_id": 183,
            "allcities": [
              {
                "id": 1019,
                "name": "Mbabane",
                "state_id": 183
              }
            ]
          }
        ]
      },
      {
        "id": 184,
        "name": "Sudán del Sur",
        "states": [
          {
            "id": 184,
            "name": "No Aplica",
            "country_id": 184,
            "allcities": [
              {
                "id": 1022,
                "name": "Yuba",
                "state_id": 184
              }
            ]
          }
        ]
      },
      {
        "id": 185,
        "name": "Surinam",
        "states": [
          {
            "id": 185,
            "name": "No Aplica",
            "country_id": 185,
            "allcities": [
              {
                "id": 1025,
                "name": "Paramaribo",
                "state_id": 185
              }
            ]
          }
        ]
      },
      {
        "id": 186,
        "name": "Tailandia",
        "states": [
          {
            "id": 186,
            "name": "No Aplica",
            "country_id": 186,
            "allcities": [
              {
                "id": 1026,
                "name": "Bangkok",
                "state_id": 186
              }
            ]
          }
        ]
      },
      {
        "id": 187,
        "name": "Taiwán",
        "states": [
          {
            "id": 187,
            "name": "No Aplica",
            "country_id": 187,
            "allcities": [
              {
                "id": 1027,
                "name": "Taipéi",
                "state_id": 187
              }
            ]
          }
        ]
      },
      {
        "id": 188,
        "name": "Tayikistán",
        "states": [
          {
            "id": 188,
            "name": "No Aplica",
            "country_id": 188,
            "allcities": [
              {
                "id": 1029,
                "name": "Dusambé",
                "state_id": 188
              }
            ]
          }
        ]
      },
      {
        "id": 189,
        "name": "Timor Oriental",
        "states": [
          {
            "id": 189,
            "name": "No Aplica",
            "country_id": 189,
            "allcities": [
              {
                "id": 1030,
                "name": "Dili",
                "state_id": 189
              }
            ]
          }
        ]
      },
      {
        "id": 190,
        "name": "Tonga",
        "states": [
          {
            "id": 190,
            "name": "No Aplica",
            "country_id": 190,
            "allcities": [
              {
                "id": 1032,
                "name": "Nukualofa",
                "state_id": 190
              }
            ]
          }
        ]
      },
      {
        "id": 191,
        "name": "Trinidad y Tobago",
        "states": [
          {
            "id": 191,
            "name": "No Aplica",
            "country_id": 191,
            "allcities": [
              {
                "id": 1033,
                "name": "Puerto España",
                "state_id": 191
              }
            ]
          }
        ]
      },
      {
        "id": 192,
        "name": "Turkmenistán",
        "states": [
          {
            "id": 192,
            "name": "No Aplica",
            "country_id": 192,
            "allcities": [
              {
                "id": 1035,
                "name": "Asjabad",
                "state_id": 192
              }
            ]
          }
        ]
      },
      {
        "id": 193,
        "name": "Tuvalu",
        "states": [
          {
            "id": 193,
            "name": "No Aplica",
            "country_id": 193,
            "allcities": [
              {
                "id": 1037,
                "name": "Funafuti",
                "state_id": 193
              }
            ]
          }
        ]
      },
      {
        "id": 194,
        "name": "United States",
        "states": [
          {
            "id": 194,
            "name": "No Aplica",
            "country_id": 194,
            "allcities": []
          }
        ]
      },
      {
        "id": 195,
        "name": "Uruguay",
        "states": [
          {
            "id": 195,
            "name": "No Aplica",
            "country_id": 195,
            "allcities": [
              {
                "id": 1335,
                "name": "Montevideo",
                "state_id": 195
              },
              {
                "id": 1336,
                "name": "Montevideo",
                "state_id": 195
              },
              {
                "id": 1337,
                "name": "Paysandú",
                "state_id": 195
              },
              {
                "id": 1338,
                "name": "Maldonado",
                "state_id": 195
              },
              {
                "id": 1339,
                "name": "Salto",
                "state_id": 195
              },
              {
                "id": 1340,
                "name": "Rivera",
                "state_id": 195
              },
              {
                "id": 1341,
                "name": "Tacuarembó",
                "state_id": 195
              }
            ]
          }
        ]
      },
      {
        "id": 196,
        "name": "Uzbekistán",
        "states": [
          {
            "id": 196,
            "name": "No Aplica",
            "country_id": 196,
            "allcities": [
              {
                "id": 1342,
                "name": "Taskent",
                "state_id": 196
              }
            ]
          }
        ]
      },
      {
        "id": 197,
        "name": "Vanuatu",
        "states": [
          {
            "id": 197,
            "name": "No Aplica",
            "country_id": 197,
            "allcities": [
              {
                "id": 1343,
                "name": "Port Vila",
                "state_id": 197
              }
            ]
          }
        ]
      },
      {
        "id": 198,
        "name": "Vaticano",
        "states": [
          {
            "id": 198,
            "name": "No Aplica",
            "country_id": 198,
            "allcities": [
              {
                "id": 1344,
                "name": "Vaticano",
                "state_id": 198
              }
            ]
          }
        ]
      },
      {
        "id": 199,
        "name": "Venezuela",
        "states": [
          {
            "id": 199,
            "name": "No Aplica",
            "country_id": 199,
            "allcities": [
              {
                "id": 1345,
                "name": "Caracas",
                "state_id": 199
              },
              {
                "id": 1346,
                "name": "Islas Margarita",
                "state_id": 199
              },
              {
                "id": 1347,
                "name": "Maracaibo",
                "state_id": 199
              },
              {
                "id": 1348,
                "name": "Valencia",
                "state_id": 199
              },
              {
                "id": 1349,
                "name": "Maracay",
                "state_id": 199
              },
              {
                "id": 1350,
                "name": "Barquisimeto",
                "state_id": 199
              },
              {
                "id": 1351,
                "name": "Caracas",
                "state_id": 199
              },
              {
                "id": 1352,
                "name": "Ciudad Guayana",
                "state_id": 199
              },
              {
                "id": 1353,
                "name": "San Cristobal",
                "state_id": 199
              },
              {
                "id": 1354,
                "name": "Barinas",
                "state_id": 199
              },
              {
                "id": 1355,
                "name": "Puerto La Cruz",
                "state_id": 199
              },
              {
                "id": 1356,
                "name": "Mérida",
                "state_id": 199
              },
              {
                "id": 1357,
                "name": "Anaco",
                "state_id": 199
              },
              {
                "id": 1358,
                "name": "Barcelona",
                "state_id": 199
              },
              {
                "id": 1359,
                "name": "Valera",
                "state_id": 199
              },
              {
                "id": 1360,
                "name": "Carupano",
                "state_id": 199
              },
              {
                "id": 1361,
                "name": "Los Teques",
                "state_id": 199
              },
              {
                "id": 1362,
                "name": "Libertador",
                "state_id": 199
              },
              {
                "id": 1363,
                "name": "Iturriza",
                "state_id": 199
              },
              {
                "id": 1364,
                "name": "Valle del Tuy",
                "state_id": 199
              }
            ]
          }
        ]
      },
      {
        "id": 200,
        "name": "Vietnam",
        "states": [
          {
            "id": 200,
            "name": "No Aplica",
            "country_id": 200,
            "allcities": [
              {
                "id": 1365,
                "name": "Hanói",
                "state_id": 200
              }
            ]
          }
        ]
      },
      {
        "id": 201,
        "name": "Yemen",
        "states": [
          {
            "id": 201,
            "name": "No Aplica",
            "country_id": 201,
            "allcities": [
              {
                "id": 1366,
                "name": "Saná",
                "state_id": 201
              }
            ]
          }
        ]
      },
      {
        "id": 202,
        "name": "Yibuti",
        "states": [
          {
            "id": 202,
            "name": "No Aplica",
            "country_id": 202,
            "allcities": [
              {
                "id": 1367,
                "name": "Yibuti",
                "state_id": 202
              }
            ]
          }
        ]
      },
      {
        "id": 47,
        "name": "Colombia",
        "states": [
          {
            "id": "05",
            "name": "ANTIOQUIA",
            "cities": [
              {
                "id": 1,
                "name": "CAUCASIA",
                "realdepartment_id": "05"
              },
              {
                "id": 2,
                "name": "CÁCERES",
                "realdepartment_id": "05"
              },
              {
                "id": 3,
                "name": "EL BAGRE",
                "realdepartment_id": "05"
              },
              {
                "id": 4,
                "name": "NECHÍ",
                "realdepartment_id": "05"
              },
              {
                "id": 5,
                "name": "TARAZÁ",
                "realdepartment_id": "05"
              },
              {
                "id": 6,
                "name": "ZARAGOZA",
                "realdepartment_id": "05"
              },
              {
                "id": 7,
                "name": "CARACOLÍ",
                "realdepartment_id": "05"
              },
              {
                "id": 8,
                "name": "MACEO",
                "realdepartment_id": "05"
              },
              {
                "id": 9,
                "name": "PUERTO BERRÍO",
                "realdepartment_id": "05"
              },
              {
                "id": 10,
                "name": "PUERTO NARE",
                "realdepartment_id": "05"
              },
              {
                "id": 11,
                "name": "PUERTO TRIUNFO",
                "realdepartment_id": "05"
              },
              {
                "id": 12,
                "name": "YONDÓ",
                "realdepartment_id": "05"
              },
              {
                "id": 13,
                "name": "AMALFI",
                "realdepartment_id": "05"
              },
              {
                "id": 14,
                "name": "ANORÍ",
                "realdepartment_id": "05"
              },
              {
                "id": 15,
                "name": "CISNEROS",
                "realdepartment_id": "05"
              },
              {
                "id": 16,
                "name": "REMEDIOS",
                "realdepartment_id": "05"
              },
              {
                "id": 17,
                "name": "SAN ROQUE",
                "realdepartment_id": "05"
              },
              {
                "id": 18,
                "name": "SANTO DOMINGO",
                "realdepartment_id": "05"
              },
              {
                "id": 19,
                "name": "SEGOVIA",
                "realdepartment_id": "05"
              },
              {
                "id": 20,
                "name": "VEGACHÍ",
                "realdepartment_id": "05"
              },
              {
                "id": 21,
                "name": "YALÍ",
                "realdepartment_id": "05"
              },
              {
                "id": 22,
                "name": "YOLOMBÓ",
                "realdepartment_id": "05"
              },
              {
                "id": 23,
                "name": "ANGOSTURA",
                "realdepartment_id": "05"
              },
              {
                "id": 24,
                "name": "BELMIRA",
                "realdepartment_id": "05"
              },
              {
                "id": 25,
                "name": "BRICEÑO",
                "realdepartment_id": "05"
              },
              {
                "id": 26,
                "name": "CAMPAMENTO",
                "realdepartment_id": "05"
              },
              {
                "id": 27,
                "name": "CAROLINA",
                "realdepartment_id": "05"
              },
              {
                "id": 28,
                "name": "DONMATÍAS",
                "realdepartment_id": "05"
              },
              {
                "id": 29,
                "name": "ENTRERRÍOS",
                "realdepartment_id": "05"
              },
              {
                "id": 30,
                "name": "GÓMEZ PLATA",
                "realdepartment_id": "05"
              },
              {
                "id": 31,
                "name": "GUADALUPE",
                "realdepartment_id": "05"
              },
              {
                "id": 32,
                "name": "ITUANGO",
                "realdepartment_id": "05"
              },
              {
                "id": 33,
                "name": "SAN ANDRÉS DE CUERQUÍA",
                "realdepartment_id": "05"
              },
              {
                "id": 34,
                "name": "SAN JOSÉ DE LA MONTAÑA",
                "realdepartment_id": "05"
              },
              {
                "id": 35,
                "name": "SAN PEDRO DE LOS MILAGROS",
                "realdepartment_id": "05"
              },
              {
                "id": 36,
                "name": "SANTA ROSA DE OSOS",
                "realdepartment_id": "05"
              },
              {
                "id": 37,
                "name": "TOLEDO",
                "realdepartment_id": "05"
              },
              {
                "id": 38,
                "name": "VALDIVIA",
                "realdepartment_id": "05"
              },
              {
                "id": 39,
                "name": "YARUMAL",
                "realdepartment_id": "05"
              },
              {
                "id": 40,
                "name": "ABRIAQUÍ",
                "realdepartment_id": "05"
              },
              {
                "id": 41,
                "name": "ANZÁ",
                "realdepartment_id": "05"
              },
              {
                "id": 42,
                "name": "ARMENIA",
                "realdepartment_id": "05"
              },
              {
                "id": 43,
                "name": "BURITICÁ",
                "realdepartment_id": "05"
              },
              {
                "id": 44,
                "name": "CAICEDO",
                "realdepartment_id": "05"
              },
              {
                "id": 45,
                "name": "CAÑASGORDAS",
                "realdepartment_id": "05"
              },
              {
                "id": 46,
                "name": "DABEIBA",
                "realdepartment_id": "05"
              },
              {
                "id": 47,
                "name": "EBÉJICO",
                "realdepartment_id": "05"
              },
              {
                "id": 48,
                "name": "FRONTINO",
                "realdepartment_id": "05"
              },
              {
                "id": 49,
                "name": "GIRALDO",
                "realdepartment_id": "05"
              },
              {
                "id": 50,
                "name": "HELICONIA",
                "realdepartment_id": "05"
              },
              {
                "id": 51,
                "name": "LIBORINA",
                "realdepartment_id": "05"
              },
              {
                "id": 52,
                "name": "OLAYA",
                "realdepartment_id": "05"
              },
              {
                "id": 53,
                "name": "PEQUE",
                "realdepartment_id": "05"
              },
              {
                "id": 54,
                "name": "SABANALARGA",
                "realdepartment_id": "05"
              },
              {
                "id": 55,
                "name": "SAN JERÓNIMO",
                "realdepartment_id": "05"
              },
              {
                "id": 56,
                "name": "SANTA FÉ DE ANTIOQUIA",
                "realdepartment_id": "05"
              },
              {
                "id": 57,
                "name": "SOPETRÁN",
                "realdepartment_id": "05"
              },
              {
                "id": 58,
                "name": "URAMITA",
                "realdepartment_id": "05"
              },
              {
                "id": 59,
                "name": "ABEJORRAL",
                "realdepartment_id": "05"
              },
              {
                "id": 60,
                "name": "ALEJANDRÍA",
                "realdepartment_id": "05"
              },
              {
                "id": 61,
                "name": "ARGELIA",
                "realdepartment_id": "05"
              },
              {
                "id": 62,
                "name": "EL CARMEN DE VIBORAL",
                "realdepartment_id": "05"
              },
              {
                "id": 63,
                "name": "COCORNÁ",
                "realdepartment_id": "05"
              },
              {
                "id": 64,
                "name": "CONCEPCIÓN",
                "realdepartment_id": "05"
              },
              {
                "id": 65,
                "name": "PEÑOL",
                "realdepartment_id": "05"
              },
              {
                "id": 66,
                "name": "RETIRO",
                "realdepartment_id": "05"
              },
              {
                "id": 67,
                "name": "EL SANTUARIO",
                "realdepartment_id": "05"
              },
              {
                "id": 68,
                "name": "GRANADA",
                "realdepartment_id": "05"
              },
              {
                "id": 69,
                "name": "GUARNE",
                "realdepartment_id": "05"
              },
              {
                "id": 70,
                "name": "GUATAPÉ",
                "realdepartment_id": "05"
              },
              {
                "id": 71,
                "name": "LA CEJA",
                "realdepartment_id": "05"
              },
              {
                "id": 72,
                "name": "LA UNIÓN",
                "realdepartment_id": "05"
              },
              {
                "id": 73,
                "name": "MARINILLA",
                "realdepartment_id": "05"
              },
              {
                "id": 74,
                "name": "NARIÑO",
                "realdepartment_id": "05"
              },
              {
                "id": 75,
                "name": "RIONEGRO",
                "realdepartment_id": "05"
              },
              {
                "id": 76,
                "name": "SAN CARLOS",
                "realdepartment_id": "05"
              },
              {
                "id": 77,
                "name": "SAN FRANCISCO",
                "realdepartment_id": "05"
              },
              {
                "id": 78,
                "name": "SAN LUIS",
                "realdepartment_id": "05"
              },
              {
                "id": 79,
                "name": "SAN RAFAEL",
                "realdepartment_id": "05"
              },
              {
                "id": 80,
                "name": "SAN VICENTE FERRER",
                "realdepartment_id": "05"
              },
              {
                "id": 81,
                "name": "SONSÓN",
                "realdepartment_id": "05"
              },
              {
                "id": 82,
                "name": "AMAGÁ",
                "realdepartment_id": "05"
              },
              {
                "id": 83,
                "name": "ANDES",
                "realdepartment_id": "05"
              },
              {
                "id": 84,
                "name": "ANGELÓPOLIS",
                "realdepartment_id": "05"
              },
              {
                "id": 85,
                "name": "BETANIA",
                "realdepartment_id": "05"
              },
              {
                "id": 86,
                "name": "BETULIA",
                "realdepartment_id": "05"
              },
              {
                "id": 87,
                "name": "CARAMANTA",
                "realdepartment_id": "05"
              },
              {
                "id": 88,
                "name": "CIUDAD BOLÍVAR",
                "realdepartment_id": "05"
              },
              {
                "id": 89,
                "name": "CONCORDIA",
                "realdepartment_id": "05"
              },
              {
                "id": 90,
                "name": "FREDONIA",
                "realdepartment_id": "05"
              },
              {
                "id": 91,
                "name": "HISPANIA",
                "realdepartment_id": "05"
              },
              {
                "id": 92,
                "name": "JARDÍN",
                "realdepartment_id": "05"
              },
              {
                "id": 93,
                "name": "JERICÓ",
                "realdepartment_id": "05"
              },
              {
                "id": 94,
                "name": "LA PINTADA",
                "realdepartment_id": "05"
              },
              {
                "id": 95,
                "name": "MONTEBELLO",
                "realdepartment_id": "05"
              },
              {
                "id": 96,
                "name": "PUEBLORRICO",
                "realdepartment_id": "05"
              },
              {
                "id": 97,
                "name": "SALGAR",
                "realdepartment_id": "05"
              },
              {
                "id": 98,
                "name": "SANTA BÁRBARA",
                "realdepartment_id": "05"
              },
              {
                "id": 99,
                "name": "TÁMESIS",
                "realdepartment_id": "05"
              },
              {
                "id": 100,
                "name": "TARSO",
                "realdepartment_id": "05"
              },
              {
                "id": 101,
                "name": "TITIRIBÍ",
                "realdepartment_id": "05"
              },
              {
                "id": 102,
                "name": "URRAO",
                "realdepartment_id": "05"
              },
              {
                "id": 103,
                "name": "VALPARAÍSO",
                "realdepartment_id": "05"
              },
              {
                "id": 104,
                "name": "VENECIA",
                "realdepartment_id": "05"
              },
              {
                "id": 105,
                "name": "APARTADÓ",
                "realdepartment_id": "05"
              },
              {
                "id": 106,
                "name": "ARBOLETES",
                "realdepartment_id": "05"
              },
              {
                "id": 107,
                "name": "CAREPA",
                "realdepartment_id": "05"
              },
              {
                "id": 108,
                "name": "CHIGORODÓ",
                "realdepartment_id": "05"
              },
              {
                "id": 109,
                "name": "MURINDÓ",
                "realdepartment_id": "05"
              },
              {
                "id": 110,
                "name": "MUTATÁ",
                "realdepartment_id": "05"
              },
              {
                "id": 111,
                "name": "NECOCLÍ",
                "realdepartment_id": "05"
              },
              {
                "id": 112,
                "name": "SAN JUAN DE URABÁ",
                "realdepartment_id": "05"
              },
              {
                "id": 113,
                "name": "SAN PEDRO DE URABÁ",
                "realdepartment_id": "05"
              },
              {
                "id": 114,
                "name": "TURBO",
                "realdepartment_id": "05"
              },
              {
                "id": 115,
                "name": "VIGÍA DEL FUERTE",
                "realdepartment_id": "05"
              },
              {
                "id": 116,
                "name": "BARBOSA",
                "realdepartment_id": "05"
              },
              {
                "id": 117,
                "name": "BELLO",
                "realdepartment_id": "05"
              },
              {
                "id": 118,
                "name": "CALDAS",
                "realdepartment_id": "05"
              },
              {
                "id": 119,
                "name": "COPACABANA",
                "realdepartment_id": "05"
              },
              {
                "id": 120,
                "name": "ENVIGADO",
                "realdepartment_id": "05"
              },
              {
                "id": 121,
                "name": "GIRARDOTA",
                "realdepartment_id": "05"
              },
              {
                "id": 122,
                "name": "ITAGÜÍ",
                "realdepartment_id": "05"
              },
              {
                "id": 123,
                "name": "LA ESTRELLA",
                "realdepartment_id": "05"
              },
              {
                "id": 124,
                "name": "MEDELLÍN",
                "realdepartment_id": "05"
              },
              {
                "id": 125,
                "name": "SABANETA",
                "realdepartment_id": "05"
              }
            ]
          },
          {
            "id": "08",
            "name": "ATLÁNTICO",
            "cities": [
              {
                "id": 126,
                "name": "BARRANQUILLA",
                "realdepartment_id": "08"
              },
              {
                "id": 127,
                "name": "BARANOA",
                "realdepartment_id": "08"
              },
              {
                "id": 128,
                "name": "CAMPO DE LA CRUZ",
                "realdepartment_id": "08"
              },
              {
                "id": 129,
                "name": "CANDELARIA",
                "realdepartment_id": "08"
              },
              {
                "id": 130,
                "name": "GALAPA",
                "realdepartment_id": "08"
              },
              {
                "id": 131,
                "name": "JUAN DE ACOSTA",
                "realdepartment_id": "08"
              },
              {
                "id": 132,
                "name": "LURUACO",
                "realdepartment_id": "08"
              },
              {
                "id": 133,
                "name": "MALAMBO",
                "realdepartment_id": "08"
              },
              {
                "id": 134,
                "name": "MANATÍ",
                "realdepartment_id": "08"
              },
              {
                "id": 135,
                "name": "PALMAR DE VARELA",
                "realdepartment_id": "08"
              },
              {
                "id": 136,
                "name": "PIOJÓ",
                "realdepartment_id": "08"
              },
              {
                "id": 137,
                "name": "POLONUEVO",
                "realdepartment_id": "08"
              },
              {
                "id": 138,
                "name": "PONEDERA",
                "realdepartment_id": "08"
              },
              {
                "id": 139,
                "name": "PUERTO COLOMBIA",
                "realdepartment_id": "08"
              },
              {
                "id": 140,
                "name": "REPELÓN",
                "realdepartment_id": "08"
              },
              {
                "id": 141,
                "name": "SABANAGRANDE",
                "realdepartment_id": "08"
              },
              {
                "id": 142,
                "name": "SABANALARGA",
                "realdepartment_id": "08"
              },
              {
                "id": 143,
                "name": "SANTA LUCÍA",
                "realdepartment_id": "08"
              },
              {
                "id": 144,
                "name": "SANTO TOMÁS",
                "realdepartment_id": "08"
              },
              {
                "id": 145,
                "name": "SOLEDAD",
                "realdepartment_id": "08"
              },
              {
                "id": 146,
                "name": "SUAN",
                "realdepartment_id": "08"
              },
              {
                "id": 147,
                "name": "TUBARÁ",
                "realdepartment_id": "08"
              },
              {
                "id": 148,
                "name": "USIACURÍ",
                "realdepartment_id": "08"
              }
            ]
          },
          {
            "id": "11",
            "name": "BOGOTÁ, D. C.",
            "cities": [
              {
                "id": 149,
                "name": "BOGOTÁ, D.C.",
                "realdepartment_id": "11"
              }
            ]
          },
          {
            "id": "13",
            "name": "BOLÍVAR",
            "cities": [
              {
                "id": 150,
                "name": "CARTAGENA DE INDIAS",
                "realdepartment_id": "13"
              },
              {
                "id": 151,
                "name": "ACHÍ",
                "realdepartment_id": "13"
              },
              {
                "id": 152,
                "name": "ALTOS DEL ROSARIO",
                "realdepartment_id": "13"
              },
              {
                "id": 153,
                "name": "ARENAL",
                "realdepartment_id": "13"
              },
              {
                "id": 154,
                "name": "ARJONA",
                "realdepartment_id": "13"
              },
              {
                "id": 155,
                "name": "ARROYOHONDO",
                "realdepartment_id": "13"
              },
              {
                "id": 156,
                "name": "BARRANCO DE LOBA",
                "realdepartment_id": "13"
              },
              {
                "id": 157,
                "name": "CALAMAR",
                "realdepartment_id": "13"
              },
              {
                "id": 158,
                "name": "CANTAGALLO",
                "realdepartment_id": "13"
              },
              {
                "id": 159,
                "name": "CICUCO",
                "realdepartment_id": "13"
              },
              {
                "id": 160,
                "name": "CÓRDOBA",
                "realdepartment_id": "13"
              },
              {
                "id": 161,
                "name": "CLEMENCIA",
                "realdepartment_id": "13"
              },
              {
                "id": 162,
                "name": "EL CARMEN DE BOLÍVAR",
                "realdepartment_id": "13"
              },
              {
                "id": 163,
                "name": "EL GUAMO",
                "realdepartment_id": "13"
              },
              {
                "id": 164,
                "name": "EL PEÑÓN",
                "realdepartment_id": "13"
              },
              {
                "id": 165,
                "name": "HATILLO DE LOBA",
                "realdepartment_id": "13"
              },
              {
                "id": 166,
                "name": "MAGANGUÉ",
                "realdepartment_id": "13"
              },
              {
                "id": 167,
                "name": "MAHATES",
                "realdepartment_id": "13"
              },
              {
                "id": 168,
                "name": "MARGARITA",
                "realdepartment_id": "13"
              },
              {
                "id": 169,
                "name": "MARÍA LA BAJA",
                "realdepartment_id": "13"
              },
              {
                "id": 170,
                "name": "MONTECRISTO",
                "realdepartment_id": "13"
              },
              {
                "id": 171,
                "name": "MOMPÓS",
                "realdepartment_id": "13"
              },
              {
                "id": 172,
                "name": "MORALES",
                "realdepartment_id": "13"
              },
              {
                "id": 173,
                "name": "NOROSÍ",
                "realdepartment_id": "13"
              },
              {
                "id": 174,
                "name": "PINILLOS",
                "realdepartment_id": "13"
              },
              {
                "id": 175,
                "name": "REGIDOR",
                "realdepartment_id": "13"
              },
              {
                "id": 176,
                "name": "RÍO VIEJO",
                "realdepartment_id": "13"
              },
              {
                "id": 177,
                "name": "SAN CRISTÓBAL",
                "realdepartment_id": "13"
              },
              {
                "id": 178,
                "name": "SAN ESTANISLAO",
                "realdepartment_id": "13"
              },
              {
                "id": 179,
                "name": "SAN FERNANDO",
                "realdepartment_id": "13"
              },
              {
                "id": 180,
                "name": "SAN JACINTO",
                "realdepartment_id": "13"
              },
              {
                "id": 181,
                "name": "SAN JACINTO DEL CAUCA",
                "realdepartment_id": "13"
              },
              {
                "id": 182,
                "name": "SAN JUAN NEPOMUCENO",
                "realdepartment_id": "13"
              },
              {
                "id": 183,
                "name": "SAN MARTÍN DE LOBA",
                "realdepartment_id": "13"
              },
              {
                "id": 184,
                "name": "SAN PABLO",
                "realdepartment_id": "13"
              },
              {
                "id": 185,
                "name": "SANTA CATALINA",
                "realdepartment_id": "13"
              },
              {
                "id": 186,
                "name": "SANTA ROSA",
                "realdepartment_id": "13"
              },
              {
                "id": 187,
                "name": "SANTA ROSA DEL SUR",
                "realdepartment_id": "13"
              },
              {
                "id": 188,
                "name": "SIMITÍ",
                "realdepartment_id": "13"
              },
              {
                "id": 189,
                "name": "SOPLAVIENTO",
                "realdepartment_id": "13"
              },
              {
                "id": 190,
                "name": "TALAIGUA NUEVO",
                "realdepartment_id": "13"
              },
              {
                "id": 191,
                "name": "TIQUISIO",
                "realdepartment_id": "13"
              },
              {
                "id": 192,
                "name": "TURBACO",
                "realdepartment_id": "13"
              },
              {
                "id": 193,
                "name": "TURBANÁ",
                "realdepartment_id": "13"
              },
              {
                "id": 194,
                "name": "VILLANUEVA",
                "realdepartment_id": "13"
              },
              {
                "id": 195,
                "name": "ZAMBRANO",
                "realdepartment_id": "13"
              }
            ]
          },
          {
            "id": "15",
            "name": "BOYACÁ",
            "cities": [
              {
                "id": 196,
                "name": "TUNJA",
                "realdepartment_id": "15"
              },
              {
                "id": 197,
                "name": "ALMEIDA",
                "realdepartment_id": "15"
              },
              {
                "id": 198,
                "name": "AQUITANIA",
                "realdepartment_id": "15"
              },
              {
                "id": 199,
                "name": "ARCABUCO",
                "realdepartment_id": "15"
              },
              {
                "id": 200,
                "name": "BELÉN",
                "realdepartment_id": "15"
              },
              {
                "id": 201,
                "name": "BERBEO",
                "realdepartment_id": "15"
              },
              {
                "id": 202,
                "name": "BETÉITIVA",
                "realdepartment_id": "15"
              },
              {
                "id": 203,
                "name": "BOAVITA",
                "realdepartment_id": "15"
              },
              {
                "id": 204,
                "name": "BOYACÁ",
                "realdepartment_id": "15"
              },
              {
                "id": 205,
                "name": "BRICEÑO",
                "realdepartment_id": "15"
              },
              {
                "id": 206,
                "name": "BUENAVISTA",
                "realdepartment_id": "15"
              },
              {
                "id": 207,
                "name": "BUSBANZÁ",
                "realdepartment_id": "15"
              },
              {
                "id": 208,
                "name": "CALDAS",
                "realdepartment_id": "15"
              },
              {
                "id": 209,
                "name": "CAMPOHERMOSO",
                "realdepartment_id": "15"
              },
              {
                "id": 210,
                "name": "CERINZA",
                "realdepartment_id": "15"
              },
              {
                "id": 211,
                "name": "CHINAVITA",
                "realdepartment_id": "15"
              },
              {
                "id": 212,
                "name": "CHIQUINQUIRÁ",
                "realdepartment_id": "15"
              },
              {
                "id": 213,
                "name": "CHISCAS",
                "realdepartment_id": "15"
              },
              {
                "id": 214,
                "name": "CHITA",
                "realdepartment_id": "15"
              },
              {
                "id": 215,
                "name": "CHITARAQUE",
                "realdepartment_id": "15"
              },
              {
                "id": 216,
                "name": "CHIVATÁ",
                "realdepartment_id": "15"
              },
              {
                "id": 217,
                "name": "CIÉNEGA",
                "realdepartment_id": "15"
              },
              {
                "id": 218,
                "name": "CÓMBITA",
                "realdepartment_id": "15"
              },
              {
                "id": 219,
                "name": "COPER",
                "realdepartment_id": "15"
              },
              {
                "id": 220,
                "name": "CORRALES",
                "realdepartment_id": "15"
              },
              {
                "id": 221,
                "name": "COVARACHÍA",
                "realdepartment_id": "15"
              },
              {
                "id": 222,
                "name": "CUBARÁ",
                "realdepartment_id": "15"
              },
              {
                "id": 223,
                "name": "CUCAITA",
                "realdepartment_id": "15"
              },
              {
                "id": 224,
                "name": "CUÍTIVA",
                "realdepartment_id": "15"
              },
              {
                "id": 225,
                "name": "CHÍQUIZA",
                "realdepartment_id": "15"
              },
              {
                "id": 226,
                "name": "CHIVOR",
                "realdepartment_id": "15"
              },
              {
                "id": 227,
                "name": "DUITAMA",
                "realdepartment_id": "15"
              },
              {
                "id": 228,
                "name": "EL COCUY",
                "realdepartment_id": "15"
              },
              {
                "id": 229,
                "name": "EL ESPINO",
                "realdepartment_id": "15"
              },
              {
                "id": 230,
                "name": "FIRAVITOBA",
                "realdepartment_id": "15"
              },
              {
                "id": 231,
                "name": "FLORESTA",
                "realdepartment_id": "15"
              },
              {
                "id": 232,
                "name": "GACHANTIVÁ",
                "realdepartment_id": "15"
              },
              {
                "id": 233,
                "name": "GÁMEZA",
                "realdepartment_id": "15"
              },
              {
                "id": 234,
                "name": "GARAGOA",
                "realdepartment_id": "15"
              },
              {
                "id": 235,
                "name": "GUACAMAYAS",
                "realdepartment_id": "15"
              },
              {
                "id": 236,
                "name": "GUATEQUE",
                "realdepartment_id": "15"
              },
              {
                "id": 237,
                "name": "GUAYATÁ",
                "realdepartment_id": "15"
              },
              {
                "id": 238,
                "name": "GÜICÁN DE LA SIERRA",
                "realdepartment_id": "15"
              },
              {
                "id": 239,
                "name": "IZA",
                "realdepartment_id": "15"
              },
              {
                "id": 240,
                "name": "JENESANO",
                "realdepartment_id": "15"
              },
              {
                "id": 241,
                "name": "JERICÓ",
                "realdepartment_id": "15"
              },
              {
                "id": 242,
                "name": "LABRANZAGRANDE",
                "realdepartment_id": "15"
              },
              {
                "id": 243,
                "name": "LA CAPILLA",
                "realdepartment_id": "15"
              },
              {
                "id": 244,
                "name": "LA VICTORIA",
                "realdepartment_id": "15"
              },
              {
                "id": 245,
                "name": "LA UVITA",
                "realdepartment_id": "15"
              },
              {
                "id": 246,
                "name": "VILLA DE LEYVA",
                "realdepartment_id": "15"
              },
              {
                "id": 247,
                "name": "MACANAL",
                "realdepartment_id": "15"
              },
              {
                "id": 248,
                "name": "MARIPÍ",
                "realdepartment_id": "15"
              },
              {
                "id": 249,
                "name": "MIRAFLORES",
                "realdepartment_id": "15"
              },
              {
                "id": 250,
                "name": "MONGUA",
                "realdepartment_id": "15"
              },
              {
                "id": 251,
                "name": "MONGUÍ",
                "realdepartment_id": "15"
              },
              {
                "id": 252,
                "name": "MONIQUIRÁ",
                "realdepartment_id": "15"
              },
              {
                "id": 253,
                "name": "MOTAVITA",
                "realdepartment_id": "15"
              },
              {
                "id": 254,
                "name": "MUZO",
                "realdepartment_id": "15"
              },
              {
                "id": 255,
                "name": "NOBSA",
                "realdepartment_id": "15"
              },
              {
                "id": 256,
                "name": "NUEVO COLÓN",
                "realdepartment_id": "15"
              },
              {
                "id": 257,
                "name": "OICATÁ",
                "realdepartment_id": "15"
              },
              {
                "id": 258,
                "name": "OTANCHE",
                "realdepartment_id": "15"
              },
              {
                "id": 259,
                "name": "PACHAVITA",
                "realdepartment_id": "15"
              },
              {
                "id": 260,
                "name": "PÁEZ",
                "realdepartment_id": "15"
              },
              {
                "id": 261,
                "name": "PAIPA",
                "realdepartment_id": "15"
              },
              {
                "id": 262,
                "name": "PAJARITO",
                "realdepartment_id": "15"
              },
              {
                "id": 263,
                "name": "PANQUEBA",
                "realdepartment_id": "15"
              },
              {
                "id": 264,
                "name": "PAUNA",
                "realdepartment_id": "15"
              },
              {
                "id": 265,
                "name": "PAYA",
                "realdepartment_id": "15"
              },
              {
                "id": 266,
                "name": "PAZ DE RÍO",
                "realdepartment_id": "15"
              },
              {
                "id": 267,
                "name": "PESCA",
                "realdepartment_id": "15"
              },
              {
                "id": 268,
                "name": "PISBA",
                "realdepartment_id": "15"
              },
              {
                "id": 269,
                "name": "PUERTO BOYACÁ",
                "realdepartment_id": "15"
              },
              {
                "id": 270,
                "name": "QUÍPAMA",
                "realdepartment_id": "15"
              },
              {
                "id": 271,
                "name": "RAMIRIQUÍ",
                "realdepartment_id": "15"
              },
              {
                "id": 272,
                "name": "RÁQUIRA",
                "realdepartment_id": "15"
              },
              {
                "id": 273,
                "name": "RONDÓN",
                "realdepartment_id": "15"
              },
              {
                "id": 274,
                "name": "SABOYÁ",
                "realdepartment_id": "15"
              },
              {
                "id": 275,
                "name": "SÁCHICA",
                "realdepartment_id": "15"
              },
              {
                "id": 276,
                "name": "SAMACÁ",
                "realdepartment_id": "15"
              },
              {
                "id": 277,
                "name": "SAN EDUARDO",
                "realdepartment_id": "15"
              },
              {
                "id": 278,
                "name": "SAN JOSÉ DE PARE",
                "realdepartment_id": "15"
              },
              {
                "id": 279,
                "name": "SAN LUIS DE GACENO",
                "realdepartment_id": "15"
              },
              {
                "id": 280,
                "name": "SAN MATEO",
                "realdepartment_id": "15"
              },
              {
                "id": 281,
                "name": "SAN MIGUEL DE SEMA",
                "realdepartment_id": "15"
              },
              {
                "id": 282,
                "name": "SAN PABLO DE BORBUR",
                "realdepartment_id": "15"
              },
              {
                "id": 283,
                "name": "SANTANA",
                "realdepartment_id": "15"
              },
              {
                "id": 284,
                "name": "SANTA MARÍA",
                "realdepartment_id": "15"
              },
              {
                "id": 285,
                "name": "SANTA ROSA DE VITERBO",
                "realdepartment_id": "15"
              },
              {
                "id": 286,
                "name": "SANTA SOFÍA",
                "realdepartment_id": "15"
              },
              {
                "id": 287,
                "name": "SATIVANORTE",
                "realdepartment_id": "15"
              },
              {
                "id": 288,
                "name": "SATIVASUR",
                "realdepartment_id": "15"
              },
              {
                "id": 289,
                "name": "SIACHOQUE",
                "realdepartment_id": "15"
              },
              {
                "id": 290,
                "name": "SOATÁ",
                "realdepartment_id": "15"
              },
              {
                "id": 291,
                "name": "SOCOTÁ",
                "realdepartment_id": "15"
              },
              {
                "id": 292,
                "name": "SOCHA",
                "realdepartment_id": "15"
              },
              {
                "id": 293,
                "name": "SOGAMOSO",
                "realdepartment_id": "15"
              },
              {
                "id": 294,
                "name": "SOMONDOCO",
                "realdepartment_id": "15"
              },
              {
                "id": 295,
                "name": "SORA",
                "realdepartment_id": "15"
              },
              {
                "id": 296,
                "name": "SOTAQUIRÁ",
                "realdepartment_id": "15"
              },
              {
                "id": 297,
                "name": "SORACÁ",
                "realdepartment_id": "15"
              },
              {
                "id": 298,
                "name": "SUSACÓN",
                "realdepartment_id": "15"
              },
              {
                "id": 299,
                "name": "SUTAMARCHÁN",
                "realdepartment_id": "15"
              },
              {
                "id": 300,
                "name": "SUTATENZA",
                "realdepartment_id": "15"
              },
              {
                "id": 301,
                "name": "TASCO",
                "realdepartment_id": "15"
              },
              {
                "id": 302,
                "name": "TENZA",
                "realdepartment_id": "15"
              },
              {
                "id": 303,
                "name": "TIBANÁ",
                "realdepartment_id": "15"
              },
              {
                "id": 304,
                "name": "TIBASOSA",
                "realdepartment_id": "15"
              },
              {
                "id": 305,
                "name": "TINJACÁ",
                "realdepartment_id": "15"
              },
              {
                "id": 306,
                "name": "TIPACOQUE",
                "realdepartment_id": "15"
              },
              {
                "id": 307,
                "name": "TOCA",
                "realdepartment_id": "15"
              },
              {
                "id": 308,
                "name": "TOGÜÍ",
                "realdepartment_id": "15"
              },
              {
                "id": 309,
                "name": "TÓPAGA",
                "realdepartment_id": "15"
              },
              {
                "id": 310,
                "name": "TOTA",
                "realdepartment_id": "15"
              },
              {
                "id": 311,
                "name": "TUNUNGUÁ",
                "realdepartment_id": "15"
              },
              {
                "id": 312,
                "name": "TURMEQUÉ",
                "realdepartment_id": "15"
              },
              {
                "id": 313,
                "name": "TUTA",
                "realdepartment_id": "15"
              },
              {
                "id": 314,
                "name": "TUTAZÁ",
                "realdepartment_id": "15"
              },
              {
                "id": 315,
                "name": "ÚMBITA",
                "realdepartment_id": "15"
              },
              {
                "id": 316,
                "name": "VENTAQUEMADA",
                "realdepartment_id": "15"
              },
              {
                "id": 317,
                "name": "VIRACACHÁ",
                "realdepartment_id": "15"
              },
              {
                "id": 318,
                "name": "ZETAQUIRA",
                "realdepartment_id": "15"
              }
            ]
          },
          {
            "id": "17",
            "name": "CALDAS",
            "cities": [
              {
                "id": 319,
                "name": "MANIZALES",
                "realdepartment_id": "17"
              },
              {
                "id": 320,
                "name": "AGUADAS",
                "realdepartment_id": "17"
              },
              {
                "id": 321,
                "name": "ANSERMA",
                "realdepartment_id": "17"
              },
              {
                "id": 322,
                "name": "ARANZAZU",
                "realdepartment_id": "17"
              },
              {
                "id": 323,
                "name": "BELALCÁZAR",
                "realdepartment_id": "17"
              },
              {
                "id": 324,
                "name": "CHINCHINÁ",
                "realdepartment_id": "17"
              },
              {
                "id": 325,
                "name": "FILADELFIA",
                "realdepartment_id": "17"
              },
              {
                "id": 326,
                "name": "LA DORADA",
                "realdepartment_id": "17"
              },
              {
                "id": 327,
                "name": "LA MERCED",
                "realdepartment_id": "17"
              },
              {
                "id": 328,
                "name": "MANZANARES",
                "realdepartment_id": "17"
              },
              {
                "id": 329,
                "name": "MARMATO",
                "realdepartment_id": "17"
              },
              {
                "id": 330,
                "name": "MARQUETALIA",
                "realdepartment_id": "17"
              },
              {
                "id": 331,
                "name": "MARULANDA",
                "realdepartment_id": "17"
              },
              {
                "id": 332,
                "name": "NEIRA",
                "realdepartment_id": "17"
              },
              {
                "id": 333,
                "name": "NORCASIA",
                "realdepartment_id": "17"
              },
              {
                "id": 334,
                "name": "PÁCORA",
                "realdepartment_id": "17"
              },
              {
                "id": 335,
                "name": "PALESTINA",
                "realdepartment_id": "17"
              },
              {
                "id": 336,
                "name": "PENSILVANIA",
                "realdepartment_id": "17"
              },
              {
                "id": 337,
                "name": "RIOSUCIO",
                "realdepartment_id": "17"
              },
              {
                "id": 338,
                "name": "RISARALDA",
                "realdepartment_id": "17"
              },
              {
                "id": 339,
                "name": "SALAMINA",
                "realdepartment_id": "17"
              },
              {
                "id": 340,
                "name": "SAMANÁ",
                "realdepartment_id": "17"
              },
              {
                "id": 341,
                "name": "SAN JOSÉ",
                "realdepartment_id": "17"
              },
              {
                "id": 342,
                "name": "SUPÍA",
                "realdepartment_id": "17"
              },
              {
                "id": 343,
                "name": "VICTORIA",
                "realdepartment_id": "17"
              },
              {
                "id": 344,
                "name": "VILLAMARÍA",
                "realdepartment_id": "17"
              },
              {
                "id": 345,
                "name": "VITERBO",
                "realdepartment_id": "17"
              }
            ]
          },
          {
            "id": "18",
            "name": "CAQUETÁ",
            "cities": [
              {
                "id": 346,
                "name": "FLORENCIA",
                "realdepartment_id": "18"
              },
              {
                "id": 347,
                "name": "ALBANIA",
                "realdepartment_id": "18"
              },
              {
                "id": 348,
                "name": "BELÉN DE LOS ANDAQUÍES",
                "realdepartment_id": "18"
              },
              {
                "id": 349,
                "name": "CARTAGENA DEL CHAIRÁ",
                "realdepartment_id": "18"
              },
              {
                "id": 350,
                "name": "CURILLO",
                "realdepartment_id": "18"
              },
              {
                "id": 351,
                "name": "EL DONCELLO",
                "realdepartment_id": "18"
              },
              {
                "id": 352,
                "name": "EL PAUJÍL",
                "realdepartment_id": "18"
              },
              {
                "id": 353,
                "name": "LA MONTAÑITA",
                "realdepartment_id": "18"
              },
              {
                "id": 354,
                "name": "MILÁN",
                "realdepartment_id": "18"
              },
              {
                "id": 355,
                "name": "MORELIA",
                "realdepartment_id": "18"
              },
              {
                "id": 356,
                "name": "PUERTO RICO",
                "realdepartment_id": "18"
              },
              {
                "id": 357,
                "name": "SAN JOSÉ DEL FRAGUA",
                "realdepartment_id": "18"
              },
              {
                "id": 358,
                "name": "SAN VICENTE DEL CAGUÁN",
                "realdepartment_id": "18"
              },
              {
                "id": 359,
                "name": "SOLANO",
                "realdepartment_id": "18"
              },
              {
                "id": 360,
                "name": "SOLITA",
                "realdepartment_id": "18"
              },
              {
                "id": 361,
                "name": "VALPARAÍSO",
                "realdepartment_id": "18"
              }
            ]
          },
          {
            "id": "19",
            "name": "CAUCA",
            "cities": [
              {
                "id": 362,
                "name": "POPAYÁN",
                "realdepartment_id": "19"
              },
              {
                "id": 363,
                "name": "ALMAGUER",
                "realdepartment_id": "19"
              },
              {
                "id": 364,
                "name": "ARGELIA",
                "realdepartment_id": "19"
              },
              {
                "id": 365,
                "name": "BALBOA",
                "realdepartment_id": "19"
              },
              {
                "id": 366,
                "name": "BOLÍVAR",
                "realdepartment_id": "19"
              },
              {
                "id": 367,
                "name": "BUENOS AIRES",
                "realdepartment_id": "19"
              },
              {
                "id": 368,
                "name": "CAJIBÍO",
                "realdepartment_id": "19"
              },
              {
                "id": 369,
                "name": "CALDONO",
                "realdepartment_id": "19"
              },
              {
                "id": 370,
                "name": "CALOTO",
                "realdepartment_id": "19"
              },
              {
                "id": 371,
                "name": "CORINTO",
                "realdepartment_id": "19"
              },
              {
                "id": 372,
                "name": "EL TAMBO",
                "realdepartment_id": "19"
              },
              {
                "id": 373,
                "name": "FLORENCIA",
                "realdepartment_id": "19"
              },
              {
                "id": 374,
                "name": "GUACHENÉ",
                "realdepartment_id": "19"
              },
              {
                "id": 375,
                "name": "GUAPÍ",
                "realdepartment_id": "19"
              },
              {
                "id": 376,
                "name": "INZÁ",
                "realdepartment_id": "19"
              },
              {
                "id": 377,
                "name": "JAMBALÓ",
                "realdepartment_id": "19"
              },
              {
                "id": 378,
                "name": "LA SIERRA",
                "realdepartment_id": "19"
              },
              {
                "id": 379,
                "name": "LA VEGA",
                "realdepartment_id": "19"
              },
              {
                "id": 380,
                "name": "LÓPEZ DE MICAY",
                "realdepartment_id": "19"
              },
              {
                "id": 381,
                "name": "MERCADERES",
                "realdepartment_id": "19"
              },
              {
                "id": 382,
                "name": "MIRANDA",
                "realdepartment_id": "19"
              },
              {
                "id": 383,
                "name": "MORALES",
                "realdepartment_id": "19"
              },
              {
                "id": 384,
                "name": "PADILLA",
                "realdepartment_id": "19"
              },
              {
                "id": 385,
                "name": "PÁEZ",
                "realdepartment_id": "19"
              },
              {
                "id": 386,
                "name": "PATÍA",
                "realdepartment_id": "19"
              },
              {
                "id": 387,
                "name": "PIAMONTE",
                "realdepartment_id": "19"
              },
              {
                "id": 388,
                "name": "PIENDAMÓ",
                "realdepartment_id": "19"
              },
              {
                "id": 389,
                "name": "PUERTO TEJADA",
                "realdepartment_id": "19"
              },
              {
                "id": 390,
                "name": "PURACÉ",
                "realdepartment_id": "19"
              },
              {
                "id": 391,
                "name": "ROSAS",
                "realdepartment_id": "19"
              },
              {
                "id": 392,
                "name": "SAN SEBASTIÁN",
                "realdepartment_id": "19"
              },
              {
                "id": 393,
                "name": "SANTANDER DE QUILICHAO",
                "realdepartment_id": "19"
              },
              {
                "id": 394,
                "name": "SANTA ROSA",
                "realdepartment_id": "19"
              },
              {
                "id": 395,
                "name": "SILVIA",
                "realdepartment_id": "19"
              },
              {
                "id": 396,
                "name": "SOTARA",
                "realdepartment_id": "19"
              },
              {
                "id": 397,
                "name": "SUÁREZ",
                "realdepartment_id": "19"
              },
              {
                "id": 398,
                "name": "SUCRE",
                "realdepartment_id": "19"
              },
              {
                "id": 399,
                "name": "TIMBÍO",
                "realdepartment_id": "19"
              },
              {
                "id": 400,
                "name": "TIMBIQUÍ",
                "realdepartment_id": "19"
              },
              {
                "id": 401,
                "name": "TORIBÍO",
                "realdepartment_id": "19"
              },
              {
                "id": 402,
                "name": "TOTORÓ",
                "realdepartment_id": "19"
              },
              {
                "id": 403,
                "name": "VILLA RICA",
                "realdepartment_id": "19"
              }
            ]
          },
          {
            "id": "20",
            "name": "CESAR",
            "cities": [
              {
                "id": 404,
                "name": "VALLEDUPAR",
                "realdepartment_id": "20"
              },
              {
                "id": 405,
                "name": "AGUACHICA",
                "realdepartment_id": "20"
              },
              {
                "id": 406,
                "name": "AGUSTÍN CODAZZI",
                "realdepartment_id": "20"
              },
              {
                "id": 407,
                "name": "ASTREA",
                "realdepartment_id": "20"
              },
              {
                "id": 408,
                "name": "BECERRIL",
                "realdepartment_id": "20"
              },
              {
                "id": 409,
                "name": "BOSCONIA",
                "realdepartment_id": "20"
              },
              {
                "id": 410,
                "name": "CHIMICHAGUA",
                "realdepartment_id": "20"
              },
              {
                "id": 411,
                "name": "CHIRIGUANÁ",
                "realdepartment_id": "20"
              },
              {
                "id": 412,
                "name": "CURUMANÍ",
                "realdepartment_id": "20"
              },
              {
                "id": 413,
                "name": "EL COPEY",
                "realdepartment_id": "20"
              },
              {
                "id": 414,
                "name": "EL PASO",
                "realdepartment_id": "20"
              },
              {
                "id": 415,
                "name": "GAMARRA",
                "realdepartment_id": "20"
              },
              {
                "id": 416,
                "name": "GONZÁLEZ",
                "realdepartment_id": "20"
              },
              {
                "id": 417,
                "name": "LA GLORIA",
                "realdepartment_id": "20"
              },
              {
                "id": 418,
                "name": "LA JAGUA DE IBIRICO",
                "realdepartment_id": "20"
              },
              {
                "id": 419,
                "name": "MANAURE BALCÓN DEL CESAR",
                "realdepartment_id": "20"
              },
              {
                "id": 420,
                "name": "PAILITAS",
                "realdepartment_id": "20"
              },
              {
                "id": 421,
                "name": "PELAYA",
                "realdepartment_id": "20"
              },
              {
                "id": 422,
                "name": "PUEBLO BELLO",
                "realdepartment_id": "20"
              },
              {
                "id": 423,
                "name": "RÍO DE ORO",
                "realdepartment_id": "20"
              },
              {
                "id": 424,
                "name": "LA PAZ",
                "realdepartment_id": "20"
              },
              {
                "id": 425,
                "name": "SAN ALBERTO",
                "realdepartment_id": "20"
              },
              {
                "id": 426,
                "name": "SAN DIEGO",
                "realdepartment_id": "20"
              },
              {
                "id": 427,
                "name": "SAN MARTÍN",
                "realdepartment_id": "20"
              },
              {
                "id": 428,
                "name": "TAMALAMEQUE",
                "realdepartment_id": "20"
              }
            ]
          },
          {
            "id": "23",
            "name": "CÓRDOBA",
            "cities": [
              {
                "id": 429,
                "name": "MONTERÍA",
                "realdepartment_id": "23"
              },
              {
                "id": 430,
                "name": "AYAPEL",
                "realdepartment_id": "23"
              },
              {
                "id": 431,
                "name": "BUENAVISTA",
                "realdepartment_id": "23"
              },
              {
                "id": 432,
                "name": "CANALETE",
                "realdepartment_id": "23"
              },
              {
                "id": 433,
                "name": "CERETÉ",
                "realdepartment_id": "23"
              },
              {
                "id": 434,
                "name": "CHIMÁ",
                "realdepartment_id": "23"
              },
              {
                "id": 435,
                "name": "CHINÚ",
                "realdepartment_id": "23"
              },
              {
                "id": 436,
                "name": "CIÉNAGA DE ORO",
                "realdepartment_id": "23"
              },
              {
                "id": 437,
                "name": "COTORRA",
                "realdepartment_id": "23"
              },
              {
                "id": 438,
                "name": "LA APARTADA",
                "realdepartment_id": "23"
              },
              {
                "id": 439,
                "name": "LORICA",
                "realdepartment_id": "23"
              },
              {
                "id": 440,
                "name": "LOS CÓRDOBAS",
                "realdepartment_id": "23"
              },
              {
                "id": 441,
                "name": "MOMIL",
                "realdepartment_id": "23"
              },
              {
                "id": 442,
                "name": "MONTELÍBANO",
                "realdepartment_id": "23"
              },
              {
                "id": 443,
                "name": "MOÑITOS",
                "realdepartment_id": "23"
              },
              {
                "id": 444,
                "name": "PLANETA RICA",
                "realdepartment_id": "23"
              },
              {
                "id": 445,
                "name": "PUEBLO NUEVO",
                "realdepartment_id": "23"
              },
              {
                "id": 446,
                "name": "PUERTO ESCONDIDO",
                "realdepartment_id": "23"
              },
              {
                "id": 447,
                "name": "PUERTO LIBERTADOR",
                "realdepartment_id": "23"
              },
              {
                "id": 448,
                "name": "PURÍSIMA DE LA CONCEPCIÓN",
                "realdepartment_id": "23"
              },
              {
                "id": 449,
                "name": "SAHAGÚN",
                "realdepartment_id": "23"
              },
              {
                "id": 450,
                "name": "SAN ANDRÉS DE SOTAVENTO",
                "realdepartment_id": "23"
              },
              {
                "id": 451,
                "name": "SAN ANTERO",
                "realdepartment_id": "23"
              },
              {
                "id": 452,
                "name": "SAN BERNARDO DEL VIENTO",
                "realdepartment_id": "23"
              },
              {
                "id": 453,
                "name": "SAN CARLOS",
                "realdepartment_id": "23"
              },
              {
                "id": 454,
                "name": "SAN JOSÉ DE URÉ",
                "realdepartment_id": "23"
              },
              {
                "id": 455,
                "name": "SAN PELAYO",
                "realdepartment_id": "23"
              },
              {
                "id": 456,
                "name": "TIERRALTA",
                "realdepartment_id": "23"
              },
              {
                "id": 457,
                "name": "TUCHÍN",
                "realdepartment_id": "23"
              },
              {
                "id": 458,
                "name": "VALENCIA",
                "realdepartment_id": "23"
              }
            ]
          },
          {
            "id": "25",
            "name": "CUNDINAMARCA",
            "cities": [
              {
                "id": 459,
                "name": "AGUA DE DIOS",
                "realdepartment_id": "25"
              },
              {
                "id": 460,
                "name": "ALBÁN",
                "realdepartment_id": "25"
              },
              {
                "id": 461,
                "name": "ANAPOIMA",
                "realdepartment_id": "25"
              },
              {
                "id": 462,
                "name": "ANOLAIMA",
                "realdepartment_id": "25"
              },
              {
                "id": 463,
                "name": "ARBELÁEZ",
                "realdepartment_id": "25"
              },
              {
                "id": 464,
                "name": "BELTRÁN",
                "realdepartment_id": "25"
              },
              {
                "id": 465,
                "name": "BITUIMA",
                "realdepartment_id": "25"
              },
              {
                "id": 466,
                "name": "BOJACÁ",
                "realdepartment_id": "25"
              },
              {
                "id": 467,
                "name": "CABRERA",
                "realdepartment_id": "25"
              },
              {
                "id": 468,
                "name": "CACHIPAY",
                "realdepartment_id": "25"
              },
              {
                "id": 469,
                "name": "CAJICÁ",
                "realdepartment_id": "25"
              },
              {
                "id": 470,
                "name": "CAPARRAPÍ",
                "realdepartment_id": "25"
              },
              {
                "id": 471,
                "name": "CÁQUEZA",
                "realdepartment_id": "25"
              },
              {
                "id": 472,
                "name": "CARMEN DE CARUPA",
                "realdepartment_id": "25"
              },
              {
                "id": 473,
                "name": "CHAGUANÍ",
                "realdepartment_id": "25"
              },
              {
                "id": 474,
                "name": "CHÍA",
                "realdepartment_id": "25"
              },
              {
                "id": 475,
                "name": "CHIPAQUE",
                "realdepartment_id": "25"
              },
              {
                "id": 476,
                "name": "CHOACHÍ",
                "realdepartment_id": "25"
              },
              {
                "id": 477,
                "name": "CHOCONTÁ",
                "realdepartment_id": "25"
              },
              {
                "id": 478,
                "name": "COGUA",
                "realdepartment_id": "25"
              },
              {
                "id": 479,
                "name": "COTA",
                "realdepartment_id": "25"
              },
              {
                "id": 480,
                "name": "CUCUNUBÁ",
                "realdepartment_id": "25"
              },
              {
                "id": 481,
                "name": "EL COLEGIO",
                "realdepartment_id": "25"
              },
              {
                "id": 482,
                "name": "EL PEÑÓN",
                "realdepartment_id": "25"
              },
              {
                "id": 483,
                "name": "EL ROSAL",
                "realdepartment_id": "25"
              },
              {
                "id": 484,
                "name": "FACATATIVÁ",
                "realdepartment_id": "25"
              },
              {
                "id": 485,
                "name": "FÓMEQUE",
                "realdepartment_id": "25"
              },
              {
                "id": 486,
                "name": "FOSCA",
                "realdepartment_id": "25"
              },
              {
                "id": 487,
                "name": "FUNZA",
                "realdepartment_id": "25"
              },
              {
                "id": 488,
                "name": "FÚQUENE",
                "realdepartment_id": "25"
              },
              {
                "id": 489,
                "name": "FUSAGASUGÁ",
                "realdepartment_id": "25"
              },
              {
                "id": 490,
                "name": "GACHALÁ",
                "realdepartment_id": "25"
              },
              {
                "id": 491,
                "name": "GACHANCIPÁ",
                "realdepartment_id": "25"
              },
              {
                "id": 492,
                "name": "GACHETÁ",
                "realdepartment_id": "25"
              },
              {
                "id": 493,
                "name": "GAMA",
                "realdepartment_id": "25"
              },
              {
                "id": 494,
                "name": "GIRARDOT",
                "realdepartment_id": "25"
              },
              {
                "id": 495,
                "name": "GRANADA",
                "realdepartment_id": "25"
              },
              {
                "id": 496,
                "name": "GUACHETÁ",
                "realdepartment_id": "25"
              },
              {
                "id": 497,
                "name": "GUADUAS",
                "realdepartment_id": "25"
              },
              {
                "id": 498,
                "name": "GUASCA",
                "realdepartment_id": "25"
              },
              {
                "id": 499,
                "name": "GUATAQUÍ",
                "realdepartment_id": "25"
              },
              {
                "id": 500,
                "name": "GUATAVITA",
                "realdepartment_id": "25"
              },
              {
                "id": 501,
                "name": "GUAYABAL DE SÍQUIMA",
                "realdepartment_id": "25"
              },
              {
                "id": 502,
                "name": "GUAYABETAL",
                "realdepartment_id": "25"
              },
              {
                "id": 503,
                "name": "GUTIÉRREZ",
                "realdepartment_id": "25"
              },
              {
                "id": 504,
                "name": "JERUSALÉN",
                "realdepartment_id": "25"
              },
              {
                "id": 505,
                "name": "JUNÍN",
                "realdepartment_id": "25"
              },
              {
                "id": 506,
                "name": "LA CALERA",
                "realdepartment_id": "25"
              },
              {
                "id": 507,
                "name": "LA MESA",
                "realdepartment_id": "25"
              },
              {
                "id": 508,
                "name": "LA PALMA",
                "realdepartment_id": "25"
              },
              {
                "id": 509,
                "name": "LA PEÑA",
                "realdepartment_id": "25"
              },
              {
                "id": 510,
                "name": "LA VEGA",
                "realdepartment_id": "25"
              },
              {
                "id": 511,
                "name": "LENGUAZAQUE",
                "realdepartment_id": "25"
              },
              {
                "id": 512,
                "name": "MACHETÁ",
                "realdepartment_id": "25"
              },
              {
                "id": 513,
                "name": "MADRID",
                "realdepartment_id": "25"
              },
              {
                "id": 514,
                "name": "MANTA",
                "realdepartment_id": "25"
              },
              {
                "id": 515,
                "name": "MEDINA",
                "realdepartment_id": "25"
              },
              {
                "id": 516,
                "name": "MOSQUERA",
                "realdepartment_id": "25"
              },
              {
                "id": 517,
                "name": "NARIÑO",
                "realdepartment_id": "25"
              },
              {
                "id": 518,
                "name": "NEMOCÓN",
                "realdepartment_id": "25"
              },
              {
                "id": 519,
                "name": "NILO",
                "realdepartment_id": "25"
              },
              {
                "id": 520,
                "name": "NIMAIMA",
                "realdepartment_id": "25"
              },
              {
                "id": 521,
                "name": "NOCAIMA",
                "realdepartment_id": "25"
              },
              {
                "id": 522,
                "name": "VENECIA",
                "realdepartment_id": "25"
              },
              {
                "id": 523,
                "name": "PACHO",
                "realdepartment_id": "25"
              },
              {
                "id": 524,
                "name": "PAIME",
                "realdepartment_id": "25"
              },
              {
                "id": 525,
                "name": "PANDI",
                "realdepartment_id": "25"
              },
              {
                "id": 526,
                "name": "PARATEBUENO",
                "realdepartment_id": "25"
              },
              {
                "id": 527,
                "name": "PASCA",
                "realdepartment_id": "25"
              },
              {
                "id": 528,
                "name": "PUERTO SALGAR",
                "realdepartment_id": "25"
              },
              {
                "id": 529,
                "name": "PULÍ",
                "realdepartment_id": "25"
              },
              {
                "id": 530,
                "name": "QUEBRADANEGRA",
                "realdepartment_id": "25"
              },
              {
                "id": 531,
                "name": "QUETAME",
                "realdepartment_id": "25"
              },
              {
                "id": 532,
                "name": "QUIPILE",
                "realdepartment_id": "25"
              },
              {
                "id": 533,
                "name": "APULO",
                "realdepartment_id": "25"
              },
              {
                "id": 534,
                "name": "RICAURTE",
                "realdepartment_id": "25"
              },
              {
                "id": 535,
                "name": "SAN ANTONIO DEL TEQUENDAMA",
                "realdepartment_id": "25"
              },
              {
                "id": 536,
                "name": "SAN BERNARDO",
                "realdepartment_id": "25"
              },
              {
                "id": 537,
                "name": "SAN CAYETANO",
                "realdepartment_id": "25"
              },
              {
                "id": 538,
                "name": "SAN FRANCISCO",
                "realdepartment_id": "25"
              },
              {
                "id": 539,
                "name": "SAN JUAN DE RIOSECO",
                "realdepartment_id": "25"
              },
              {
                "id": 540,
                "name": "SASAIMA",
                "realdepartment_id": "25"
              },
              {
                "id": 541,
                "name": "SESQUILÉ",
                "realdepartment_id": "25"
              },
              {
                "id": 542,
                "name": "SIBATÉ",
                "realdepartment_id": "25"
              },
              {
                "id": 543,
                "name": "SILVANIA",
                "realdepartment_id": "25"
              },
              {
                "id": 544,
                "name": "SIMIJACA",
                "realdepartment_id": "25"
              },
              {
                "id": 545,
                "name": "SOACHA",
                "realdepartment_id": "25"
              },
              {
                "id": 546,
                "name": "SOPÓ",
                "realdepartment_id": "25"
              },
              {
                "id": 547,
                "name": "SUBACHOQUE",
                "realdepartment_id": "25"
              },
              {
                "id": 548,
                "name": "SUESCA",
                "realdepartment_id": "25"
              },
              {
                "id": 549,
                "name": "SUPATÁ",
                "realdepartment_id": "25"
              },
              {
                "id": 550,
                "name": "SUSA",
                "realdepartment_id": "25"
              },
              {
                "id": 551,
                "name": "SUTATAUSA",
                "realdepartment_id": "25"
              },
              {
                "id": 552,
                "name": "TABIO",
                "realdepartment_id": "25"
              },
              {
                "id": 553,
                "name": "TAUSA",
                "realdepartment_id": "25"
              },
              {
                "id": 554,
                "name": "TENA",
                "realdepartment_id": "25"
              },
              {
                "id": 555,
                "name": "TENJO",
                "realdepartment_id": "25"
              },
              {
                "id": 556,
                "name": "TIBACUY",
                "realdepartment_id": "25"
              },
              {
                "id": 557,
                "name": "TIBIRITA",
                "realdepartment_id": "25"
              },
              {
                "id": 558,
                "name": "TOCAIMA",
                "realdepartment_id": "25"
              },
              {
                "id": 559,
                "name": "TOCANCIPÁ",
                "realdepartment_id": "25"
              },
              {
                "id": 560,
                "name": "TOPAIPÍ",
                "realdepartment_id": "25"
              },
              {
                "id": 561,
                "name": "UBALÁ",
                "realdepartment_id": "25"
              },
              {
                "id": 562,
                "name": "UBAQUE",
                "realdepartment_id": "25"
              },
              {
                "id": 563,
                "name": "VILLA DE SAN DIEGO DE UBATÉ",
                "realdepartment_id": "25"
              },
              {
                "id": 564,
                "name": "UNE",
                "realdepartment_id": "25"
              },
              {
                "id": 565,
                "name": "ÚTICA",
                "realdepartment_id": "25"
              },
              {
                "id": 566,
                "name": "VERGARA",
                "realdepartment_id": "25"
              },
              {
                "id": 567,
                "name": "VIANÍ",
                "realdepartment_id": "25"
              },
              {
                "id": 568,
                "name": "VILLAGÓMEZ",
                "realdepartment_id": "25"
              },
              {
                "id": 569,
                "name": "VILLAPINZÓN",
                "realdepartment_id": "25"
              },
              {
                "id": 570,
                "name": "VILLETA",
                "realdepartment_id": "25"
              },
              {
                "id": 571,
                "name": "VIOTÁ",
                "realdepartment_id": "25"
              },
              {
                "id": 572,
                "name": "YACOPÍ",
                "realdepartment_id": "25"
              },
              {
                "id": 573,
                "name": "ZIPACÓN",
                "realdepartment_id": "25"
              },
              {
                "id": 574,
                "name": "ZIPAQUIRÁ",
                "realdepartment_id": "25"
              }
            ]
          },
          {
            "id": "27",
            "name": "CHOCÓ",
            "cities": [
              {
                "id": 575,
                "name": "QUIBDÓ",
                "realdepartment_id": "27"
              },
              {
                "id": 576,
                "name": "ACANDÍ",
                "realdepartment_id": "27"
              },
              {
                "id": 577,
                "name": "ALTO BAUDÓ",
                "realdepartment_id": "27"
              },
              {
                "id": 578,
                "name": "ATRATO",
                "realdepartment_id": "27"
              },
              {
                "id": 579,
                "name": "BAGADÓ",
                "realdepartment_id": "27"
              },
              {
                "id": 580,
                "name": "BAHÍA SOLANO",
                "realdepartment_id": "27"
              },
              {
                "id": 581,
                "name": "BAJO BAUDÓ",
                "realdepartment_id": "27"
              },
              {
                "id": 582,
                "name": "BOJAYÁ",
                "realdepartment_id": "27"
              },
              {
                "id": 583,
                "name": "EL CANTÓN DEL SAN PABLO",
                "realdepartment_id": "27"
              },
              {
                "id": 584,
                "name": "CARMEN DEL DARIÉN",
                "realdepartment_id": "27"
              },
              {
                "id": 585,
                "name": "CÉRTEGUI",
                "realdepartment_id": "27"
              },
              {
                "id": 586,
                "name": "CONDOTO",
                "realdepartment_id": "27"
              },
              {
                "id": 587,
                "name": "EL CARMEN DE ATRATO",
                "realdepartment_id": "27"
              },
              {
                "id": 588,
                "name": "EL LITORAL DEL SAN JUAN",
                "realdepartment_id": "27"
              },
              {
                "id": 589,
                "name": "ISTMINA",
                "realdepartment_id": "27"
              },
              {
                "id": 590,
                "name": "JURADÓ",
                "realdepartment_id": "27"
              },
              {
                "id": 591,
                "name": "LLORÓ",
                "realdepartment_id": "27"
              },
              {
                "id": 592,
                "name": "MEDIO ATRATO",
                "realdepartment_id": "27"
              },
              {
                "id": 593,
                "name": "MEDIO BAUDÓ",
                "realdepartment_id": "27"
              },
              {
                "id": 594,
                "name": "MEDIO SAN JUAN",
                "realdepartment_id": "27"
              },
              {
                "id": 595,
                "name": "NÓVITA",
                "realdepartment_id": "27"
              },
              {
                "id": 596,
                "name": "NUQUÍ",
                "realdepartment_id": "27"
              },
              {
                "id": 597,
                "name": "RÍO IRÓ",
                "realdepartment_id": "27"
              },
              {
                "id": 598,
                "name": "RÍO QUITO",
                "realdepartment_id": "27"
              },
              {
                "id": 599,
                "name": "RIOSUCIO",
                "realdepartment_id": "27"
              },
              {
                "id": 600,
                "name": "SAN JOSÉ DEL PALMAR",
                "realdepartment_id": "27"
              },
              {
                "id": 601,
                "name": "SIPÍ",
                "realdepartment_id": "27"
              },
              {
                "id": 602,
                "name": "TADÓ",
                "realdepartment_id": "27"
              },
              {
                "id": 603,
                "name": "UNGUÍA",
                "realdepartment_id": "27"
              },
              {
                "id": 604,
                "name": "UNIÓN PANAMERICANA",
                "realdepartment_id": "27"
              }
            ]
          },
          {
            "id": "41",
            "name": "HUILA",
            "cities": [
              {
                "id": 605,
                "name": "NEIVA",
                "realdepartment_id": "41"
              },
              {
                "id": 606,
                "name": "ACEVEDO",
                "realdepartment_id": "41"
              },
              {
                "id": 607,
                "name": "AGRADO",
                "realdepartment_id": "41"
              },
              {
                "id": 608,
                "name": "AIPE",
                "realdepartment_id": "41"
              },
              {
                "id": 609,
                "name": "ALGECIRAS",
                "realdepartment_id": "41"
              },
              {
                "id": 610,
                "name": "ALTAMIRA",
                "realdepartment_id": "41"
              },
              {
                "id": 611,
                "name": "BARAYA",
                "realdepartment_id": "41"
              },
              {
                "id": 612,
                "name": "CAMPOALEGRE",
                "realdepartment_id": "41"
              },
              {
                "id": 613,
                "name": "COLOMBIA",
                "realdepartment_id": "41"
              },
              {
                "id": 614,
                "name": "ELÍAS",
                "realdepartment_id": "41"
              },
              {
                "id": 615,
                "name": "GARZÓN",
                "realdepartment_id": "41"
              },
              {
                "id": 616,
                "name": "GIGANTE",
                "realdepartment_id": "41"
              },
              {
                "id": 617,
                "name": "GUADALUPE",
                "realdepartment_id": "41"
              },
              {
                "id": 618,
                "name": "HOBO",
                "realdepartment_id": "41"
              },
              {
                "id": 619,
                "name": "ÍQUIRA",
                "realdepartment_id": "41"
              },
              {
                "id": 620,
                "name": "ISNOS",
                "realdepartment_id": "41"
              },
              {
                "id": 621,
                "name": "LA ARGENTINA",
                "realdepartment_id": "41"
              },
              {
                "id": 622,
                "name": "LA PLATA",
                "realdepartment_id": "41"
              },
              {
                "id": 623,
                "name": "NÁTAGA",
                "realdepartment_id": "41"
              },
              {
                "id": 624,
                "name": "OPORAPA",
                "realdepartment_id": "41"
              },
              {
                "id": 625,
                "name": "PAICOL",
                "realdepartment_id": "41"
              },
              {
                "id": 626,
                "name": "PALERMO",
                "realdepartment_id": "41"
              },
              {
                "id": 627,
                "name": "PALESTINA",
                "realdepartment_id": "41"
              },
              {
                "id": 628,
                "name": "PITAL",
                "realdepartment_id": "41"
              },
              {
                "id": 629,
                "name": "PITALITO",
                "realdepartment_id": "41"
              },
              {
                "id": 630,
                "name": "RIVERA",
                "realdepartment_id": "41"
              },
              {
                "id": 631,
                "name": "SALADOBLANCO",
                "realdepartment_id": "41"
              },
              {
                "id": 632,
                "name": "SAN AGUSTÍN",
                "realdepartment_id": "41"
              },
              {
                "id": 633,
                "name": "SANTA MARÍA",
                "realdepartment_id": "41"
              },
              {
                "id": 634,
                "name": "SUAZA",
                "realdepartment_id": "41"
              },
              {
                "id": 635,
                "name": "TARQUI",
                "realdepartment_id": "41"
              },
              {
                "id": 636,
                "name": "TESALIA",
                "realdepartment_id": "41"
              },
              {
                "id": 637,
                "name": "TELLO",
                "realdepartment_id": "41"
              },
              {
                "id": 638,
                "name": "TERUEL",
                "realdepartment_id": "41"
              },
              {
                "id": 639,
                "name": "TIMANÁ",
                "realdepartment_id": "41"
              },
              {
                "id": 640,
                "name": "VILLAVIEJA",
                "realdepartment_id": "41"
              },
              {
                "id": 641,
                "name": "YAGUARÁ",
                "realdepartment_id": "41"
              }
            ]
          },
          {
            "id": "44",
            "name": "LA GUAJIRA",
            "cities": [
              {
                "id": 642,
                "name": "RIOHACHA",
                "realdepartment_id": "44"
              },
              {
                "id": 643,
                "name": "ALBANIA",
                "realdepartment_id": "44"
              },
              {
                "id": 644,
                "name": "BARRANCAS",
                "realdepartment_id": "44"
              },
              {
                "id": 645,
                "name": "DIBULLA",
                "realdepartment_id": "44"
              },
              {
                "id": 646,
                "name": "DISTRACCIÓN",
                "realdepartment_id": "44"
              },
              {
                "id": 647,
                "name": "EL MOLINO",
                "realdepartment_id": "44"
              },
              {
                "id": 648,
                "name": "FONSECA",
                "realdepartment_id": "44"
              },
              {
                "id": 649,
                "name": "HATONUEVO",
                "realdepartment_id": "44"
              },
              {
                "id": 650,
                "name": "LA JAGUA DEL PILAR",
                "realdepartment_id": "44"
              },
              {
                "id": 651,
                "name": "MAICAO",
                "realdepartment_id": "44"
              },
              {
                "id": 652,
                "name": "MANAURE",
                "realdepartment_id": "44"
              },
              {
                "id": 653,
                "name": "SAN JUAN DEL CESAR",
                "realdepartment_id": "44"
              },
              {
                "id": 654,
                "name": "URIBIA",
                "realdepartment_id": "44"
              },
              {
                "id": 655,
                "name": "URUMITA",
                "realdepartment_id": "44"
              },
              {
                "id": 656,
                "name": "VILLANUEVA",
                "realdepartment_id": "44"
              }
            ]
          },
          {
            "id": "47",
            "name": "MAGDALENA",
            "cities": [
              {
                "id": 657,
                "name": "SANTA MARTA",
                "realdepartment_id": "47"
              },
              {
                "id": 658,
                "name": "ALGARROBO",
                "realdepartment_id": "47"
              },
              {
                "id": 659,
                "name": "ARACATACA",
                "realdepartment_id": "47"
              },
              {
                "id": 660,
                "name": "ARIGUANÍ",
                "realdepartment_id": "47"
              },
              {
                "id": 661,
                "name": "CERRO DE SAN ANTONIO",
                "realdepartment_id": "47"
              },
              {
                "id": 662,
                "name": "CHIVOLO",
                "realdepartment_id": "47"
              },
              {
                "id": 663,
                "name": "CIÉNAGA",
                "realdepartment_id": "47"
              },
              {
                "id": 664,
                "name": "CONCORDIA",
                "realdepartment_id": "47"
              },
              {
                "id": 665,
                "name": "EL BANCO",
                "realdepartment_id": "47"
              },
              {
                "id": 666,
                "name": "EL PIÑÓN",
                "realdepartment_id": "47"
              },
              {
                "id": 667,
                "name": "EL RETÉN",
                "realdepartment_id": "47"
              },
              {
                "id": 668,
                "name": "FUNDACIÓN",
                "realdepartment_id": "47"
              },
              {
                "id": 669,
                "name": "GUAMAL",
                "realdepartment_id": "47"
              },
              {
                "id": 670,
                "name": "NUEVA GRANADA",
                "realdepartment_id": "47"
              },
              {
                "id": 671,
                "name": "PEDRAZA",
                "realdepartment_id": "47"
              },
              {
                "id": 672,
                "name": "PIJIÑO DEL CARMEN",
                "realdepartment_id": "47"
              },
              {
                "id": 673,
                "name": "PIVIJAY",
                "realdepartment_id": "47"
              },
              {
                "id": 674,
                "name": "PLATO",
                "realdepartment_id": "47"
              },
              {
                "id": 675,
                "name": "PUEBLOVIEJO",
                "realdepartment_id": "47"
              },
              {
                "id": 676,
                "name": "REMOLINO",
                "realdepartment_id": "47"
              },
              {
                "id": 677,
                "name": "SABANAS DE SAN ÁNGEL",
                "realdepartment_id": "47"
              },
              {
                "id": 678,
                "name": "SALAMINA",
                "realdepartment_id": "47"
              },
              {
                "id": 679,
                "name": "SAN SEBASTIÁN DE BUENAVISTA",
                "realdepartment_id": "47"
              },
              {
                "id": 680,
                "name": "SAN ZENÓN",
                "realdepartment_id": "47"
              },
              {
                "id": 681,
                "name": "SANTA ANA",
                "realdepartment_id": "47"
              },
              {
                "id": 682,
                "name": "SANTA BÁRBARA DE PINTO",
                "realdepartment_id": "47"
              },
              {
                "id": 683,
                "name": "SITIONUEVO",
                "realdepartment_id": "47"
              },
              {
                "id": 684,
                "name": "TENERIFE",
                "realdepartment_id": "47"
              },
              {
                "id": 685,
                "name": "ZAPAYÁN",
                "realdepartment_id": "47"
              },
              {
                "id": 686,
                "name": "ZONA BANANERA",
                "realdepartment_id": "47"
              }
            ]
          },
          {
            "id": "50",
            "name": "META",
            "cities": [
              {
                "id": 687,
                "name": "VILLAVICENCIO",
                "realdepartment_id": "50"
              },
              {
                "id": 688,
                "name": "ACACÍAS",
                "realdepartment_id": "50"
              },
              {
                "id": 689,
                "name": "BARRANCA DE UPÍA",
                "realdepartment_id": "50"
              },
              {
                "id": 690,
                "name": "CABUYARO",
                "realdepartment_id": "50"
              },
              {
                "id": 691,
                "name": "CASTILLA LA NUEVA",
                "realdepartment_id": "50"
              },
              {
                "id": 692,
                "name": "CUBARRAL",
                "realdepartment_id": "50"
              },
              {
                "id": 693,
                "name": "CUMARAL",
                "realdepartment_id": "50"
              },
              {
                "id": 694,
                "name": "EL CALVARIO",
                "realdepartment_id": "50"
              },
              {
                "id": 695,
                "name": "EL CASTILLO",
                "realdepartment_id": "50"
              },
              {
                "id": 696,
                "name": "EL DORADO",
                "realdepartment_id": "50"
              },
              {
                "id": 697,
                "name": "FUENTE DE ORO",
                "realdepartment_id": "50"
              },
              {
                "id": 698,
                "name": "GRANADA",
                "realdepartment_id": "50"
              },
              {
                "id": 699,
                "name": "GUAMAL",
                "realdepartment_id": "50"
              },
              {
                "id": 700,
                "name": "MAPIRIPÁN",
                "realdepartment_id": "50"
              },
              {
                "id": 701,
                "name": "MESETAS",
                "realdepartment_id": "50"
              },
              {
                "id": 702,
                "name": "LA MACARENA",
                "realdepartment_id": "50"
              },
              {
                "id": 703,
                "name": "URIBE",
                "realdepartment_id": "50"
              },
              {
                "id": 704,
                "name": "LEJANÍAS",
                "realdepartment_id": "50"
              },
              {
                "id": 705,
                "name": "PUERTO CONCORDIA",
                "realdepartment_id": "50"
              },
              {
                "id": 706,
                "name": "PUERTO GAITÁN",
                "realdepartment_id": "50"
              },
              {
                "id": 707,
                "name": "PUERTO LÓPEZ",
                "realdepartment_id": "50"
              },
              {
                "id": 708,
                "name": "PUERTO LLERAS",
                "realdepartment_id": "50"
              },
              {
                "id": 709,
                "name": "PUERTO RICO",
                "realdepartment_id": "50"
              },
              {
                "id": 710,
                "name": "RESTREPO",
                "realdepartment_id": "50"
              },
              {
                "id": 711,
                "name": "SAN CARLOS DE GUAROA",
                "realdepartment_id": "50"
              },
              {
                "id": 712,
                "name": "SAN JUAN DE ARAMA",
                "realdepartment_id": "50"
              },
              {
                "id": 713,
                "name": "SAN JUANITO",
                "realdepartment_id": "50"
              },
              {
                "id": 714,
                "name": "SAN MARTÍN",
                "realdepartment_id": "50"
              },
              {
                "id": 715,
                "name": "VISTAHERMOSA",
                "realdepartment_id": "50"
              }
            ]
          },
          {
            "id": "52",
            "name": "NARIÑO",
            "cities": [
              {
                "id": 716,
                "name": "PASTO",
                "realdepartment_id": "52"
              },
              {
                "id": 717,
                "name": "ALBÁN",
                "realdepartment_id": "52"
              },
              {
                "id": 718,
                "name": "ALDANA",
                "realdepartment_id": "52"
              },
              {
                "id": 719,
                "name": "ANCUYÁ",
                "realdepartment_id": "52"
              },
              {
                "id": 720,
                "name": "ARBOLEDA",
                "realdepartment_id": "52"
              },
              {
                "id": 721,
                "name": "BARBACOAS",
                "realdepartment_id": "52"
              },
              {
                "id": 722,
                "name": "BELÉN",
                "realdepartment_id": "52"
              },
              {
                "id": 723,
                "name": "BUESACO",
                "realdepartment_id": "52"
              },
              {
                "id": 724,
                "name": "COLÓN",
                "realdepartment_id": "52"
              },
              {
                "id": 725,
                "name": "CONSACÁ",
                "realdepartment_id": "52"
              },
              {
                "id": 726,
                "name": "CONTADERO",
                "realdepartment_id": "52"
              },
              {
                "id": 727,
                "name": "CÓRDOBA",
                "realdepartment_id": "52"
              },
              {
                "id": 728,
                "name": "CUASPÚD",
                "realdepartment_id": "52"
              },
              {
                "id": 729,
                "name": "CUMBAL",
                "realdepartment_id": "52"
              },
              {
                "id": 730,
                "name": "CUMBITARA",
                "realdepartment_id": "52"
              },
              {
                "id": 731,
                "name": "CHACHAGÜÍ",
                "realdepartment_id": "52"
              },
              {
                "id": 732,
                "name": "EL CHARCO",
                "realdepartment_id": "52"
              },
              {
                "id": 733,
                "name": "EL PEÑOL",
                "realdepartment_id": "52"
              },
              {
                "id": 734,
                "name": "EL ROSARIO",
                "realdepartment_id": "52"
              },
              {
                "id": 735,
                "name": "EL TABLÓN DE GÓMEZ",
                "realdepartment_id": "52"
              },
              {
                "id": 736,
                "name": "EL TAMBO",
                "realdepartment_id": "52"
              },
              {
                "id": 737,
                "name": "FUNES",
                "realdepartment_id": "52"
              },
              {
                "id": 738,
                "name": "GUACHUCAL",
                "realdepartment_id": "52"
              },
              {
                "id": 739,
                "name": "GUAITARILLA",
                "realdepartment_id": "52"
              },
              {
                "id": 740,
                "name": "GUALMATÁN",
                "realdepartment_id": "52"
              },
              {
                "id": 741,
                "name": "ILES",
                "realdepartment_id": "52"
              },
              {
                "id": 742,
                "name": "IMUÉS",
                "realdepartment_id": "52"
              },
              {
                "id": 743,
                "name": "IPIALES",
                "realdepartment_id": "52"
              },
              {
                "id": 744,
                "name": "LA CRUZ",
                "realdepartment_id": "52"
              },
              {
                "id": 745,
                "name": "LA FLORIDA",
                "realdepartment_id": "52"
              },
              {
                "id": 746,
                "name": "LA LLANADA",
                "realdepartment_id": "52"
              },
              {
                "id": 747,
                "name": "LA TOLA",
                "realdepartment_id": "52"
              },
              {
                "id": 748,
                "name": "LA UNIÓN",
                "realdepartment_id": "52"
              },
              {
                "id": 749,
                "name": "LEIVA",
                "realdepartment_id": "52"
              },
              {
                "id": 750,
                "name": "LINARES",
                "realdepartment_id": "52"
              },
              {
                "id": 751,
                "name": "LOS ANDES",
                "realdepartment_id": "52"
              },
              {
                "id": 752,
                "name": "MAGÜÍ",
                "realdepartment_id": "52"
              },
              {
                "id": 753,
                "name": "MALLAMA",
                "realdepartment_id": "52"
              },
              {
                "id": 754,
                "name": "MOSQUERA",
                "realdepartment_id": "52"
              },
              {
                "id": 755,
                "name": "NARIÑO",
                "realdepartment_id": "52"
              },
              {
                "id": 756,
                "name": "OLAYA HERRERA",
                "realdepartment_id": "52"
              },
              {
                "id": 757,
                "name": "OSPINA",
                "realdepartment_id": "52"
              },
              {
                "id": 758,
                "name": "FRANCISCO PIZARRO",
                "realdepartment_id": "52"
              },
              {
                "id": 759,
                "name": "POLICARPA",
                "realdepartment_id": "52"
              },
              {
                "id": 760,
                "name": "POTOSÍ",
                "realdepartment_id": "52"
              },
              {
                "id": 761,
                "name": "PROVIDENCIA",
                "realdepartment_id": "52"
              },
              {
                "id": 762,
                "name": "PUERRES",
                "realdepartment_id": "52"
              },
              {
                "id": 763,
                "name": "PUPIALES",
                "realdepartment_id": "52"
              },
              {
                "id": 764,
                "name": "RICAURTE",
                "realdepartment_id": "52"
              },
              {
                "id": 765,
                "name": "ROBERTO PAYÁN",
                "realdepartment_id": "52"
              },
              {
                "id": 766,
                "name": "SAMANIEGO",
                "realdepartment_id": "52"
              },
              {
                "id": 767,
                "name": "SANDONÁ",
                "realdepartment_id": "52"
              },
              {
                "id": 768,
                "name": "SAN BERNARDO",
                "realdepartment_id": "52"
              },
              {
                "id": 769,
                "name": "SAN LORENZO",
                "realdepartment_id": "52"
              },
              {
                "id": 770,
                "name": "SAN PABLO",
                "realdepartment_id": "52"
              },
              {
                "id": 771,
                "name": "SAN PEDRO DE CARTAGO",
                "realdepartment_id": "52"
              },
              {
                "id": 772,
                "name": "SANTA BÁRBARA",
                "realdepartment_id": "52"
              },
              {
                "id": 773,
                "name": "SANTACRUZ",
                "realdepartment_id": "52"
              },
              {
                "id": 774,
                "name": "SAPUYES",
                "realdepartment_id": "52"
              },
              {
                "id": 775,
                "name": "TAMINANGO",
                "realdepartment_id": "52"
              },
              {
                "id": 776,
                "name": "TANGUA",
                "realdepartment_id": "52"
              },
              {
                "id": 777,
                "name": "SAN ANDRÉS DE TUMACO",
                "realdepartment_id": "52"
              },
              {
                "id": 778,
                "name": "TÚQUERRES",
                "realdepartment_id": "52"
              },
              {
                "id": 779,
                "name": "YACUANQUER",
                "realdepartment_id": "52"
              }
            ]
          },
          {
            "id": "54",
            "name": "NORTE DE SANTANDER",
            "cities": [
              {
                "id": 780,
                "name": "CÚCUTA",
                "realdepartment_id": "54"
              },
              {
                "id": 781,
                "name": "ÁBREGO",
                "realdepartment_id": "54"
              },
              {
                "id": 782,
                "name": "ARBOLEDAS",
                "realdepartment_id": "54"
              },
              {
                "id": 783,
                "name": "BOCHALEMA",
                "realdepartment_id": "54"
              },
              {
                "id": 784,
                "name": "BUCARASICA",
                "realdepartment_id": "54"
              },
              {
                "id": 785,
                "name": "CÁCOTA",
                "realdepartment_id": "54"
              },
              {
                "id": 786,
                "name": "CÁCHIRA",
                "realdepartment_id": "54"
              },
              {
                "id": 787,
                "name": "CHINÁCOTA",
                "realdepartment_id": "54"
              },
              {
                "id": 788,
                "name": "CHITAGÁ",
                "realdepartment_id": "54"
              },
              {
                "id": 789,
                "name": "CONVENCIÓN",
                "realdepartment_id": "54"
              },
              {
                "id": 790,
                "name": "CUCUTILLA",
                "realdepartment_id": "54"
              },
              {
                "id": 791,
                "name": "DURANIA",
                "realdepartment_id": "54"
              },
              {
                "id": 792,
                "name": "EL CARMEN",
                "realdepartment_id": "54"
              },
              {
                "id": 793,
                "name": "EL TARRA",
                "realdepartment_id": "54"
              },
              {
                "id": 794,
                "name": "EL ZULIA",
                "realdepartment_id": "54"
              },
              {
                "id": 795,
                "name": "GRAMALOTE",
                "realdepartment_id": "54"
              },
              {
                "id": 796,
                "name": "HACARÍ",
                "realdepartment_id": "54"
              },
              {
                "id": 797,
                "name": "HERRÁN",
                "realdepartment_id": "54"
              },
              {
                "id": 798,
                "name": "LABATECA",
                "realdepartment_id": "54"
              },
              {
                "id": 799,
                "name": "LA ESPERANZA",
                "realdepartment_id": "54"
              },
              {
                "id": 800,
                "name": "LA PLAYA",
                "realdepartment_id": "54"
              },
              {
                "id": 801,
                "name": "LOS PATIOS",
                "realdepartment_id": "54"
              },
              {
                "id": 802,
                "name": "LOURDES",
                "realdepartment_id": "54"
              },
              {
                "id": 803,
                "name": "MUTISCUA",
                "realdepartment_id": "54"
              },
              {
                "id": 804,
                "name": "OCAÑA",
                "realdepartment_id": "54"
              },
              {
                "id": 805,
                "name": "PAMPLONA",
                "realdepartment_id": "54"
              },
              {
                "id": 806,
                "name": "PAMPLONITA",
                "realdepartment_id": "54"
              },
              {
                "id": 807,
                "name": "PUERTO SANTANDER",
                "realdepartment_id": "54"
              },
              {
                "id": 808,
                "name": "RAGONVALIA",
                "realdepartment_id": "54"
              },
              {
                "id": 809,
                "name": "SALAZAR",
                "realdepartment_id": "54"
              },
              {
                "id": 810,
                "name": "SAN CALIXTO",
                "realdepartment_id": "54"
              },
              {
                "id": 811,
                "name": "SAN CAYETANO",
                "realdepartment_id": "54"
              },
              {
                "id": 812,
                "name": "SANTIAGO",
                "realdepartment_id": "54"
              },
              {
                "id": 813,
                "name": "SARDINATA",
                "realdepartment_id": "54"
              },
              {
                "id": 814,
                "name": "SILOS",
                "realdepartment_id": "54"
              },
              {
                "id": 815,
                "name": "TEORAMA",
                "realdepartment_id": "54"
              },
              {
                "id": 816,
                "name": "TIBÚ",
                "realdepartment_id": "54"
              },
              {
                "id": 817,
                "name": "TOLEDO",
                "realdepartment_id": "54"
              },
              {
                "id": 818,
                "name": "VILLA CARO",
                "realdepartment_id": "54"
              },
              {
                "id": 819,
                "name": "VILLA DEL ROSARIO",
                "realdepartment_id": "54"
              }
            ]
          },
          {
            "id": "63",
            "name": "QUINDÍO",
            "cities": [
              {
                "id": 820,
                "name": "ARMENIA",
                "realdepartment_id": "63"
              },
              {
                "id": 821,
                "name": "BUENAVISTA",
                "realdepartment_id": "63"
              },
              {
                "id": 822,
                "name": "CALARCÁ",
                "realdepartment_id": "63"
              },
              {
                "id": 823,
                "name": "CIRCASIA",
                "realdepartment_id": "63"
              },
              {
                "id": 824,
                "name": "CÓRDOBA",
                "realdepartment_id": "63"
              },
              {
                "id": 825,
                "name": "FILANDIA",
                "realdepartment_id": "63"
              },
              {
                "id": 826,
                "name": "GÉNOVA",
                "realdepartment_id": "63"
              },
              {
                "id": 827,
                "name": "LA TEBAIDA",
                "realdepartment_id": "63"
              },
              {
                "id": 828,
                "name": "MONTENEGRO",
                "realdepartment_id": "63"
              },
              {
                "id": 829,
                "name": "PIJAO",
                "realdepartment_id": "63"
              },
              {
                "id": 830,
                "name": "QUIMBAYA",
                "realdepartment_id": "63"
              },
              {
                "id": 831,
                "name": "SALENTO",
                "realdepartment_id": "63"
              }
            ]
          },
          {
            "id": "66",
            "name": "RISARALDA",
            "cities": [
              {
                "id": 832,
                "name": "PEREIRA",
                "realdepartment_id": "66"
              },
              {
                "id": 833,
                "name": "APÍA",
                "realdepartment_id": "66"
              },
              {
                "id": 834,
                "name": "BALBOA",
                "realdepartment_id": "66"
              },
              {
                "id": 835,
                "name": "BELÉN DE UMBRÍA",
                "realdepartment_id": "66"
              },
              {
                "id": 836,
                "name": "DOSQUEBRADAS",
                "realdepartment_id": "66"
              },
              {
                "id": 837,
                "name": "GUÁTICA",
                "realdepartment_id": "66"
              },
              {
                "id": 838,
                "name": "LA CELIA",
                "realdepartment_id": "66"
              },
              {
                "id": 839,
                "name": "LA VIRGINIA",
                "realdepartment_id": "66"
              },
              {
                "id": 840,
                "name": "MARSELLA",
                "realdepartment_id": "66"
              },
              {
                "id": 841,
                "name": "MISTRATÓ",
                "realdepartment_id": "66"
              },
              {
                "id": 842,
                "name": "PUEBLO RICO",
                "realdepartment_id": "66"
              },
              {
                "id": 843,
                "name": "QUINCHÍA",
                "realdepartment_id": "66"
              },
              {
                "id": 844,
                "name": "SANTA ROSA DE CABAL",
                "realdepartment_id": "66"
              },
              {
                "id": 845,
                "name": "SANTUARIO",
                "realdepartment_id": "66"
              }
            ]
          },
          {
            "id": "68",
            "name": "SANTANDER",
            "cities": [
              {
                "id": 846,
                "name": "BUCARAMANGA",
                "realdepartment_id": "68"
              },
              {
                "id": 847,
                "name": "AGUADA",
                "realdepartment_id": "68"
              },
              {
                "id": 848,
                "name": "ALBANIA",
                "realdepartment_id": "68"
              },
              {
                "id": 849,
                "name": "ARATOCA",
                "realdepartment_id": "68"
              },
              {
                "id": 850,
                "name": "BARBOSA",
                "realdepartment_id": "68"
              },
              {
                "id": 851,
                "name": "BARICHARA",
                "realdepartment_id": "68"
              },
              {
                "id": 852,
                "name": "BARRANCABERMEJA",
                "realdepartment_id": "68"
              },
              {
                "id": 853,
                "name": "BETULIA",
                "realdepartment_id": "68"
              },
              {
                "id": 854,
                "name": "BOLÍVAR",
                "realdepartment_id": "68"
              },
              {
                "id": 855,
                "name": "CABRERA",
                "realdepartment_id": "68"
              },
              {
                "id": 856,
                "name": "CALIFORNIA",
                "realdepartment_id": "68"
              },
              {
                "id": 857,
                "name": "CAPITANEJO",
                "realdepartment_id": "68"
              },
              {
                "id": 858,
                "name": "CARCASÍ",
                "realdepartment_id": "68"
              },
              {
                "id": 859,
                "name": "CEPITÁ",
                "realdepartment_id": "68"
              },
              {
                "id": 860,
                "name": "CERRITO",
                "realdepartment_id": "68"
              },
              {
                "id": 861,
                "name": "CHARALÁ",
                "realdepartment_id": "68"
              },
              {
                "id": 862,
                "name": "CHARTA",
                "realdepartment_id": "68"
              },
              {
                "id": 863,
                "name": "CHIMA",
                "realdepartment_id": "68"
              },
              {
                "id": 864,
                "name": "CHIPATÁ",
                "realdepartment_id": "68"
              },
              {
                "id": 865,
                "name": "CIMITARRA",
                "realdepartment_id": "68"
              },
              {
                "id": 866,
                "name": "CONCEPCIÓN",
                "realdepartment_id": "68"
              },
              {
                "id": 867,
                "name": "CONFINES",
                "realdepartment_id": "68"
              },
              {
                "id": 868,
                "name": "CONTRATACIÓN",
                "realdepartment_id": "68"
              },
              {
                "id": 869,
                "name": "COROMORO",
                "realdepartment_id": "68"
              },
              {
                "id": 870,
                "name": "CURITÍ",
                "realdepartment_id": "68"
              },
              {
                "id": 871,
                "name": "EL CARMEN DE CHUCURÍ",
                "realdepartment_id": "68"
              },
              {
                "id": 872,
                "name": "EL GUACAMAYO",
                "realdepartment_id": "68"
              },
              {
                "id": 873,
                "name": "EL PEÑÓN",
                "realdepartment_id": "68"
              },
              {
                "id": 874,
                "name": "EL PLAYÓN",
                "realdepartment_id": "68"
              },
              {
                "id": 875,
                "name": "ENCINO",
                "realdepartment_id": "68"
              },
              {
                "id": 876,
                "name": "ENCISO",
                "realdepartment_id": "68"
              },
              {
                "id": 877,
                "name": "FLORIÁN",
                "realdepartment_id": "68"
              },
              {
                "id": 878,
                "name": "FLORIDABLANCA",
                "realdepartment_id": "68"
              },
              {
                "id": 879,
                "name": "GALÁN",
                "realdepartment_id": "68"
              },
              {
                "id": 880,
                "name": "GÁMBITA",
                "realdepartment_id": "68"
              },
              {
                "id": 881,
                "name": "GIRÓN",
                "realdepartment_id": "68"
              },
              {
                "id": 882,
                "name": "GUACA",
                "realdepartment_id": "68"
              },
              {
                "id": 883,
                "name": "GUADALUPE",
                "realdepartment_id": "68"
              },
              {
                "id": 884,
                "name": "GUAPOTÁ",
                "realdepartment_id": "68"
              },
              {
                "id": 885,
                "name": "GUAVATÁ",
                "realdepartment_id": "68"
              },
              {
                "id": 886,
                "name": "GÜEPSA",
                "realdepartment_id": "68"
              },
              {
                "id": 887,
                "name": "HATO",
                "realdepartment_id": "68"
              },
              {
                "id": 888,
                "name": "JESÚS MARÍA",
                "realdepartment_id": "68"
              },
              {
                "id": 889,
                "name": "JORDÁN",
                "realdepartment_id": "68"
              },
              {
                "id": 890,
                "name": "LA BELLEZA",
                "realdepartment_id": "68"
              },
              {
                "id": 891,
                "name": "LANDÁZURI",
                "realdepartment_id": "68"
              },
              {
                "id": 892,
                "name": "LA PAZ",
                "realdepartment_id": "68"
              },
              {
                "id": 893,
                "name": "LEBRIJA",
                "realdepartment_id": "68"
              },
              {
                "id": 894,
                "name": "LOS SANTOS",
                "realdepartment_id": "68"
              },
              {
                "id": 895,
                "name": "MACARAVITA",
                "realdepartment_id": "68"
              },
              {
                "id": 896,
                "name": "MÁLAGA",
                "realdepartment_id": "68"
              },
              {
                "id": 897,
                "name": "MATANZA",
                "realdepartment_id": "68"
              },
              {
                "id": 898,
                "name": "MOGOTES",
                "realdepartment_id": "68"
              },
              {
                "id": 899,
                "name": "MOLAGAVITA",
                "realdepartment_id": "68"
              },
              {
                "id": 900,
                "name": "OCAMONTE",
                "realdepartment_id": "68"
              },
              {
                "id": 901,
                "name": "OIBA",
                "realdepartment_id": "68"
              },
              {
                "id": 902,
                "name": "ONZAGA",
                "realdepartment_id": "68"
              },
              {
                "id": 903,
                "name": "PALMAR",
                "realdepartment_id": "68"
              },
              {
                "id": 904,
                "name": "PALMAS DEL SOCORRO",
                "realdepartment_id": "68"
              },
              {
                "id": 905,
                "name": "PÁRAMO",
                "realdepartment_id": "68"
              },
              {
                "id": 906,
                "name": "PIEDECUESTA",
                "realdepartment_id": "68"
              },
              {
                "id": 907,
                "name": "PINCHOTE",
                "realdepartment_id": "68"
              },
              {
                "id": 908,
                "name": "PUENTE NACIONAL",
                "realdepartment_id": "68"
              },
              {
                "id": 909,
                "name": "PUERTO PARRA",
                "realdepartment_id": "68"
              },
              {
                "id": 910,
                "name": "PUERTO WILCHES",
                "realdepartment_id": "68"
              },
              {
                "id": 911,
                "name": "RIONEGRO",
                "realdepartment_id": "68"
              },
              {
                "id": 912,
                "name": "SABANA DE TORRES",
                "realdepartment_id": "68"
              },
              {
                "id": 913,
                "name": "SAN ANDRÉS",
                "realdepartment_id": "68"
              },
              {
                "id": 914,
                "name": "SAN BENITO",
                "realdepartment_id": "68"
              },
              {
                "id": 915,
                "name": "SAN GIL",
                "realdepartment_id": "68"
              },
              {
                "id": 916,
                "name": "SAN JOAQUÍN",
                "realdepartment_id": "68"
              },
              {
                "id": 917,
                "name": "SAN JOSÉ DE MIRANDA",
                "realdepartment_id": "68"
              },
              {
                "id": 918,
                "name": "SAN MIGUEL",
                "realdepartment_id": "68"
              },
              {
                "id": 919,
                "name": "SAN VICENTE DE CHUCURÍ",
                "realdepartment_id": "68"
              },
              {
                "id": 920,
                "name": "SANTA BÁRBARA",
                "realdepartment_id": "68"
              },
              {
                "id": 921,
                "name": "SANTA HELENA DEL OPÓN",
                "realdepartment_id": "68"
              },
              {
                "id": 922,
                "name": "SIMACOTA",
                "realdepartment_id": "68"
              },
              {
                "id": 923,
                "name": "SOCORRO",
                "realdepartment_id": "68"
              },
              {
                "id": 924,
                "name": "SUAITA",
                "realdepartment_id": "68"
              },
              {
                "id": 925,
                "name": "SUCRE",
                "realdepartment_id": "68"
              },
              {
                "id": 926,
                "name": "SURATÁ",
                "realdepartment_id": "68"
              },
              {
                "id": 927,
                "name": "TONA",
                "realdepartment_id": "68"
              },
              {
                "id": 928,
                "name": "VALLE DE SAN JOSÉ",
                "realdepartment_id": "68"
              },
              {
                "id": 929,
                "name": "VÉLEZ",
                "realdepartment_id": "68"
              },
              {
                "id": 930,
                "name": "VETAS",
                "realdepartment_id": "68"
              },
              {
                "id": 931,
                "name": "VILLANUEVA",
                "realdepartment_id": "68"
              },
              {
                "id": 932,
                "name": "ZAPATOCA",
                "realdepartment_id": "68"
              }
            ]
          },
          {
            "id": "70",
            "name": "SUCRE",
            "cities": [
              {
                "id": 933,
                "name": "SINCELEJO",
                "realdepartment_id": "70"
              },
              {
                "id": 934,
                "name": "BUENAVISTA",
                "realdepartment_id": "70"
              },
              {
                "id": 935,
                "name": "CAIMITO",
                "realdepartment_id": "70"
              },
              {
                "id": 936,
                "name": "COLOSÓ",
                "realdepartment_id": "70"
              },
              {
                "id": 937,
                "name": "COROZAL",
                "realdepartment_id": "70"
              },
              {
                "id": 938,
                "name": "COVEÑAS",
                "realdepartment_id": "70"
              },
              {
                "id": 939,
                "name": "CHALÁN",
                "realdepartment_id": "70"
              },
              {
                "id": 940,
                "name": "EL ROBLE",
                "realdepartment_id": "70"
              },
              {
                "id": 941,
                "name": "GALERAS",
                "realdepartment_id": "70"
              },
              {
                "id": 942,
                "name": "GUARANDA",
                "realdepartment_id": "70"
              },
              {
                "id": 943,
                "name": "LA UNIÓN",
                "realdepartment_id": "70"
              },
              {
                "id": 944,
                "name": "LOS PALMITOS",
                "realdepartment_id": "70"
              },
              {
                "id": 945,
                "name": "MAJAGUAL",
                "realdepartment_id": "70"
              },
              {
                "id": 946,
                "name": "MORROA",
                "realdepartment_id": "70"
              },
              {
                "id": 947,
                "name": "OVEJAS",
                "realdepartment_id": "70"
              },
              {
                "id": 948,
                "name": "PALMITO",
                "realdepartment_id": "70"
              },
              {
                "id": 949,
                "name": "SAMPUÉS",
                "realdepartment_id": "70"
              },
              {
                "id": 950,
                "name": "SAN BENITO ABAD",
                "realdepartment_id": "70"
              },
              {
                "id": 951,
                "name": "SAN JUAN DE BETULIA",
                "realdepartment_id": "70"
              },
              {
                "id": 952,
                "name": "SAN MARCOS",
                "realdepartment_id": "70"
              },
              {
                "id": 953,
                "name": "SAN ONOFRE",
                "realdepartment_id": "70"
              },
              {
                "id": 954,
                "name": "SAN PEDRO",
                "realdepartment_id": "70"
              },
              {
                "id": 955,
                "name": "SAN LUIS DE SINCÉ",
                "realdepartment_id": "70"
              },
              {
                "id": 956,
                "name": "SUCRE",
                "realdepartment_id": "70"
              },
              {
                "id": 957,
                "name": "SANTIAGO DE TOLÚ",
                "realdepartment_id": "70"
              },
              {
                "id": 958,
                "name": "TOLÚ VIEJO",
                "realdepartment_id": "70"
              }
            ]
          },
          {
            "id": "73",
            "name": "TOLIMA",
            "cities": [
              {
                "id": 959,
                "name": "IBAGUÉ",
                "realdepartment_id": "73"
              },
              {
                "id": 960,
                "name": "ALPUJARRA",
                "realdepartment_id": "73"
              },
              {
                "id": 961,
                "name": "ALVARADO",
                "realdepartment_id": "73"
              },
              {
                "id": 962,
                "name": "AMBALEMA",
                "realdepartment_id": "73"
              },
              {
                "id": 963,
                "name": "ANZOÁTEGUI",
                "realdepartment_id": "73"
              },
              {
                "id": 964,
                "name": "ARMERO GUAYABAL",
                "realdepartment_id": "73"
              },
              {
                "id": 965,
                "name": "ATACO",
                "realdepartment_id": "73"
              },
              {
                "id": 966,
                "name": "CAJAMARCA",
                "realdepartment_id": "73"
              },
              {
                "id": 967,
                "name": "CARMEN DE APICALÁ",
                "realdepartment_id": "73"
              },
              {
                "id": 968,
                "name": "CASABIANCA",
                "realdepartment_id": "73"
              },
              {
                "id": 969,
                "name": "CHAPARRAL",
                "realdepartment_id": "73"
              },
              {
                "id": 970,
                "name": "COELLO",
                "realdepartment_id": "73"
              },
              {
                "id": 971,
                "name": "COYAIMA",
                "realdepartment_id": "73"
              },
              {
                "id": 972,
                "name": "CUNDAY",
                "realdepartment_id": "73"
              },
              {
                "id": 973,
                "name": "DOLORES",
                "realdepartment_id": "73"
              },
              {
                "id": 974,
                "name": "ESPINAL",
                "realdepartment_id": "73"
              },
              {
                "id": 975,
                "name": "FALAN",
                "realdepartment_id": "73"
              },
              {
                "id": 976,
                "name": "FLANDES",
                "realdepartment_id": "73"
              },
              {
                "id": 977,
                "name": "FRESNO",
                "realdepartment_id": "73"
              },
              {
                "id": 978,
                "name": "GUAMO",
                "realdepartment_id": "73"
              },
              {
                "id": 979,
                "name": "HERVEO",
                "realdepartment_id": "73"
              },
              {
                "id": 980,
                "name": "HONDA",
                "realdepartment_id": "73"
              },
              {
                "id": 981,
                "name": "ICONONZO",
                "realdepartment_id": "73"
              },
              {
                "id": 982,
                "name": "LÉRIDA",
                "realdepartment_id": "73"
              },
              {
                "id": 983,
                "name": "LÍBANO",
                "realdepartment_id": "73"
              },
              {
                "id": 984,
                "name": "SAN SEBASTIÁN DE MARIQUITA",
                "realdepartment_id": "73"
              },
              {
                "id": 985,
                "name": "MELGAR",
                "realdepartment_id": "73"
              },
              {
                "id": 986,
                "name": "MURILLO",
                "realdepartment_id": "73"
              },
              {
                "id": 987,
                "name": "NATAGAIMA",
                "realdepartment_id": "73"
              },
              {
                "id": 988,
                "name": "ORTEGA",
                "realdepartment_id": "73"
              },
              {
                "id": 989,
                "name": "PALOCABILDO",
                "realdepartment_id": "73"
              },
              {
                "id": 990,
                "name": "PIEDRAS",
                "realdepartment_id": "73"
              },
              {
                "id": 991,
                "name": "PLANADAS",
                "realdepartment_id": "73"
              },
              {
                "id": 992,
                "name": "PRADO",
                "realdepartment_id": "73"
              },
              {
                "id": 993,
                "name": "PURIFICACIÓN",
                "realdepartment_id": "73"
              },
              {
                "id": 994,
                "name": "RIOBLANCO",
                "realdepartment_id": "73"
              },
              {
                "id": 995,
                "name": "RONCESVALLES",
                "realdepartment_id": "73"
              },
              {
                "id": 996,
                "name": "ROVIRA",
                "realdepartment_id": "73"
              },
              {
                "id": 997,
                "name": "SALDAÑA",
                "realdepartment_id": "73"
              },
              {
                "id": 998,
                "name": "SAN ANTONIO",
                "realdepartment_id": "73"
              },
              {
                "id": 999,
                "name": "SAN LUIS",
                "realdepartment_id": "73"
              },
              {
                "id": 1000,
                "name": "SANTA ISABEL",
                "realdepartment_id": "73"
              },
              {
                "id": 1001,
                "name": "SUÁREZ",
                "realdepartment_id": "73"
              },
              {
                "id": 1002,
                "name": "VALLE DE SAN JUAN",
                "realdepartment_id": "73"
              },
              {
                "id": 1003,
                "name": "VENADILLO",
                "realdepartment_id": "73"
              },
              {
                "id": 1004,
                "name": "VILLAHERMOSA",
                "realdepartment_id": "73"
              },
              {
                "id": 1005,
                "name": "VILLARRICA",
                "realdepartment_id": "73"
              }
            ]
          },
          {
            "id": "76",
            "name": "VALLE DEL CAUCA",
            "cities": [
              {
                "id": 1006,
                "name": "CALI",
                "realdepartment_id": "76"
              },
              {
                "id": 1007,
                "name": "ALCALÁ",
                "realdepartment_id": "76"
              },
              {
                "id": 1008,
                "name": "ANDALUCÍA",
                "realdepartment_id": "76"
              },
              {
                "id": 1009,
                "name": "ANSERMANUEVO",
                "realdepartment_id": "76"
              },
              {
                "id": 1010,
                "name": "ARGELIA",
                "realdepartment_id": "76"
              },
              {
                "id": 1011,
                "name": "BOLÍVAR",
                "realdepartment_id": "76"
              },
              {
                "id": 1012,
                "name": "BUENAVENTURA",
                "realdepartment_id": "76"
              },
              {
                "id": 1013,
                "name": "GUADALAJARA DE BUGA",
                "realdepartment_id": "76"
              },
              {
                "id": 1014,
                "name": "BUGALAGRANDE",
                "realdepartment_id": "76"
              },
              {
                "id": 1015,
                "name": "CAICEDONIA",
                "realdepartment_id": "76"
              },
              {
                "id": 1016,
                "name": "CALIMA",
                "realdepartment_id": "76"
              },
              {
                "id": 1017,
                "name": "CANDELARIA",
                "realdepartment_id": "76"
              },
              {
                "id": 1018,
                "name": "CARTAGO",
                "realdepartment_id": "76"
              },
              {
                "id": 1019,
                "name": "DAGUA",
                "realdepartment_id": "76"
              },
              {
                "id": 1020,
                "name": "EL ÁGUILA",
                "realdepartment_id": "76"
              },
              {
                "id": 1021,
                "name": "EL CAIRO",
                "realdepartment_id": "76"
              },
              {
                "id": 1022,
                "name": "EL CERRITO",
                "realdepartment_id": "76"
              },
              {
                "id": 1023,
                "name": "EL DOVIO",
                "realdepartment_id": "76"
              },
              {
                "id": 1024,
                "name": "FLORIDA",
                "realdepartment_id": "76"
              },
              {
                "id": 1025,
                "name": "GINEBRA",
                "realdepartment_id": "76"
              },
              {
                "id": 1026,
                "name": "GUACARÍ",
                "realdepartment_id": "76"
              },
              {
                "id": 1027,
                "name": "JAMUNDÍ",
                "realdepartment_id": "76"
              },
              {
                "id": 1028,
                "name": "LA CUMBRE",
                "realdepartment_id": "76"
              },
              {
                "id": 1029,
                "name": "LA UNIÓN",
                "realdepartment_id": "76"
              },
              {
                "id": 1030,
                "name": "LA VICTORIA",
                "realdepartment_id": "76"
              },
              {
                "id": 1031,
                "name": "OBANDO",
                "realdepartment_id": "76"
              },
              {
                "id": 1032,
                "name": "PALMIRA",
                "realdepartment_id": "76"
              },
              {
                "id": 1033,
                "name": "PRADERA",
                "realdepartment_id": "76"
              },
              {
                "id": 1034,
                "name": "RESTREPO",
                "realdepartment_id": "76"
              },
              {
                "id": 1035,
                "name": "RIOFRÍO",
                "realdepartment_id": "76"
              },
              {
                "id": 1036,
                "name": "ROLDANILLO",
                "realdepartment_id": "76"
              },
              {
                "id": 1037,
                "name": "SAN PEDRO",
                "realdepartment_id": "76"
              },
              {
                "id": 1038,
                "name": "SEVILLA",
                "realdepartment_id": "76"
              },
              {
                "id": 1039,
                "name": "TORO",
                "realdepartment_id": "76"
              },
              {
                "id": 1040,
                "name": "TRUJILLO",
                "realdepartment_id": "76"
              },
              {
                "id": 1041,
                "name": "TULUÁ",
                "realdepartment_id": "76"
              },
              {
                "id": 1042,
                "name": "ULLOA",
                "realdepartment_id": "76"
              },
              {
                "id": 1043,
                "name": "VERSALLES",
                "realdepartment_id": "76"
              },
              {
                "id": 1044,
                "name": "VIJES",
                "realdepartment_id": "76"
              },
              {
                "id": 1045,
                "name": "YOTOCO",
                "realdepartment_id": "76"
              },
              {
                "id": 1046,
                "name": "YUMBO",
                "realdepartment_id": "76"
              },
              {
                "id": 1047,
                "name": "ZARZAL",
                "realdepartment_id": "76"
              }
            ]
          },
          {
            "id": "81",
            "name": "ARAUCA",
            "cities": [
              {
                "id": 1048,
                "name": "ARAUCA",
                "realdepartment_id": "81"
              },
              {
                "id": 1049,
                "name": "ARAUQUITA",
                "realdepartment_id": "81"
              },
              {
                "id": 1050,
                "name": "CRAVO NORTE",
                "realdepartment_id": "81"
              },
              {
                "id": 1051,
                "name": "FORTUL",
                "realdepartment_id": "81"
              },
              {
                "id": 1052,
                "name": "PUERTO RONDÓN",
                "realdepartment_id": "81"
              },
              {
                "id": 1053,
                "name": "SARAVENA",
                "realdepartment_id": "81"
              },
              {
                "id": 1054,
                "name": "TAME",
                "realdepartment_id": "81"
              }
            ]
          },
          {
            "id": "85",
            "name": "CASANARE",
            "cities": [
              {
                "id": 1055,
                "name": "YOPAL",
                "realdepartment_id": "85"
              },
              {
                "id": 1056,
                "name": "AGUAZUL",
                "realdepartment_id": "85"
              },
              {
                "id": 1057,
                "name": "CHÁMEZA",
                "realdepartment_id": "85"
              },
              {
                "id": 1058,
                "name": "HATO COROZAL",
                "realdepartment_id": "85"
              },
              {
                "id": 1059,
                "name": "LA SALINA",
                "realdepartment_id": "85"
              },
              {
                "id": 1060,
                "name": "MANÍ",
                "realdepartment_id": "85"
              },
              {
                "id": 1061,
                "name": "MONTERREY",
                "realdepartment_id": "85"
              },
              {
                "id": 1062,
                "name": "NUNCHÍA",
                "realdepartment_id": "85"
              },
              {
                "id": 1063,
                "name": "OROCUÉ",
                "realdepartment_id": "85"
              },
              {
                "id": 1064,
                "name": "PAZ DE ARIPORO",
                "realdepartment_id": "85"
              },
              {
                "id": 1065,
                "name": "PORE",
                "realdepartment_id": "85"
              },
              {
                "id": 1066,
                "name": "RECETOR",
                "realdepartment_id": "85"
              },
              {
                "id": 1067,
                "name": "SABANALARGA",
                "realdepartment_id": "85"
              },
              {
                "id": 1068,
                "name": "SÁCAMA",
                "realdepartment_id": "85"
              },
              {
                "id": 1069,
                "name": "SAN LUIS DE PALENQUE",
                "realdepartment_id": "85"
              },
              {
                "id": 1070,
                "name": "TÁMARA",
                "realdepartment_id": "85"
              },
              {
                "id": 1071,
                "name": "TAURAMENA",
                "realdepartment_id": "85"
              },
              {
                "id": 1072,
                "name": "TRINIDAD",
                "realdepartment_id": "85"
              },
              {
                "id": 1073,
                "name": "VILLANUEVA",
                "realdepartment_id": "85"
              }
            ]
          },
          {
            "id": "86",
            "name": "PUTUMAYO",
            "cities": [
              {
                "id": 1074,
                "name": "MOCOA",
                "realdepartment_id": "86"
              },
              {
                "id": 1075,
                "name": "COLÓN",
                "realdepartment_id": "86"
              },
              {
                "id": 1076,
                "name": "ORITO",
                "realdepartment_id": "86"
              },
              {
                "id": 1077,
                "name": "PUERTO ASÍS",
                "realdepartment_id": "86"
              },
              {
                "id": 1078,
                "name": "PUERTO CAICEDO",
                "realdepartment_id": "86"
              },
              {
                "id": 1079,
                "name": "PUERTO GUZMÁN",
                "realdepartment_id": "86"
              },
              {
                "id": 1080,
                "name": "PUERTO LEGUÍZAMO",
                "realdepartment_id": "86"
              },
              {
                "id": 1081,
                "name": "SIBUNDOY",
                "realdepartment_id": "86"
              },
              {
                "id": 1082,
                "name": "SAN FRANCISCO",
                "realdepartment_id": "86"
              },
              {
                "id": 1083,
                "name": "SAN MIGUEL",
                "realdepartment_id": "86"
              },
              {
                "id": 1084,
                "name": "SANTIAGO",
                "realdepartment_id": "86"
              },
              {
                "id": 1085,
                "name": "VALLE DEL GUAMUEZ",
                "realdepartment_id": "86"
              },
              {
                "id": 1086,
                "name": "VILLAGARZÓN",
                "realdepartment_id": "86"
              }
            ]
          },
          {
            "id": "88",
            "name": "ARCHIPIÉLAGO DE SAN ANDRÉS, PROVIDENCIA Y ",
            "cities": [
              {
                "id": 1087,
                "name": "SAN ANDRÉS",
                "realdepartment_id": "88"
              },
              {
                "id": 1088,
                "name": "PROVIDENCIA",
                "realdepartment_id": "88"
              }
            ]
          },
          {
            "id": "91",
            "name": "AMAZONAS",
            "cities": [
              {
                "id": 1089,
                "name": "LETICIA",
                "realdepartment_id": "91"
              },
              {
                "id": 1090,
                "name": "EL ENCANTO",
                "realdepartment_id": "91"
              },
              {
                "id": 1091,
                "name": "LA CHORRERA",
                "realdepartment_id": "91"
              },
              {
                "id": 1092,
                "name": "LA PEDRERA",
                "realdepartment_id": "91"
              },
              {
                "id": 1093,
                "name": "LA VICTORIA",
                "realdepartment_id": "91"
              },
              {
                "id": 1094,
                "name": "MIRITÍ - PARANÁ",
                "realdepartment_id": "91"
              },
              {
                "id": 1095,
                "name": "PUERTO ALEGRÍA",
                "realdepartment_id": "91"
              },
              {
                "id": 1096,
                "name": "PUERTO ARICA",
                "realdepartment_id": "91"
              },
              {
                "id": 1097,
                "name": "PUERTO NARIÑO",
                "realdepartment_id": "91"
              },
              {
                "id": 1098,
                "name": "PUERTO SANTANDER",
                "realdepartment_id": "91"
              },
              {
                "id": 1099,
                "name": "TARAPACÁ",
                "realdepartment_id": "91"
              }
            ]
          },
          {
            "id": "94",
            "name": "GUAINÍA",
            "cities": [
              {
                "id": 1100,
                "name": "INÍRIDA",
                "realdepartment_id": "94"
              },
              {
                "id": 1101,
                "name": "BARRANCO MINAS",
                "realdepartment_id": "94"
              },
              {
                "id": 1102,
                "name": "MAPIRIPANA",
                "realdepartment_id": "94"
              },
              {
                "id": 1103,
                "name": "SAN FELIPE",
                "realdepartment_id": "94"
              },
              {
                "id": 1104,
                "name": "PUERTO COLOMBIA",
                "realdepartment_id": "94"
              },
              {
                "id": 1105,
                "name": "LA GUADALUPE",
                "realdepartment_id": "94"
              },
              {
                "id": 1106,
                "name": "CACAHUAL",
                "realdepartment_id": "94"
              },
              {
                "id": 1107,
                "name": "PANA PANA",
                "realdepartment_id": "94"
              },
              {
                "id": 1108,
                "name": "MORICHAL",
                "realdepartment_id": "94"
              }
            ]
          },
          {
            "id": "95",
            "name": "GUAVIARE",
            "cities": [
              {
                "id": 1109,
                "name": "SAN JOSÉ DEL GUAVIARE",
                "realdepartment_id": "95"
              },
              {
                "id": 1110,
                "name": "CALAMAR",
                "realdepartment_id": "95"
              },
              {
                "id": 1111,
                "name": "EL RETORNO",
                "realdepartment_id": "95"
              },
              {
                "id": 1112,
                "name": "MIRAFLORES",
                "realdepartment_id": "95"
              }
            ]
          },
          {
            "id": "97",
            "name": "VAUPÉS",
            "cities": [
              {
                "id": 1113,
                "name": "MITÚ",
                "realdepartment_id": "97"
              },
              {
                "id": 1114,
                "name": "CARURÚ",
                "realdepartment_id": "97"
              },
              {
                "id": 1115,
                "name": "PACOA",
                "realdepartment_id": "97"
              },
              {
                "id": 1116,
                "name": "TARAIRA",
                "realdepartment_id": "97"
              },
              {
                "id": 1117,
                "name": "PAPUNAUA",
                "realdepartment_id": "97"
              },
              {
                "id": 1118,
                "name": "YAVARATÉ",
                "realdepartment_id": "97"
              }
            ]
          },
          {
            "id": "99",
            "name": "VICHADA",
            "cities": [
              {
                "id": 1119,
                "name": "PUERTO CARREÑO",
                "realdepartment_id": "99"
              },
              {
                "id": 1120,
                "name": "LA PRIMAVERA",
                "realdepartment_id": "99"
              },
              {
                "id": 1121,
                "name": "SANTA ROSALÍA",
                "realdepartment_id": "99"
              },
              {
                "id": 1122,
                "name": "CUMARIBO",
                "realdepartment_id": "99"
              }
            ]
          }
        ]
      }
    ]
  }
}

