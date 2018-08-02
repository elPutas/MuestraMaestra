import { Component, ViewChild, ElementRef } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { AppConfigurations } from "../../app/app.configuration";
import { AppService } from "../../services/app.service";
import { AppValidations } from "../../app/app.validations";
import { EventEmiterService } from "../../services/app.event.emitter.service";
import { ReceptorMomento2Model } from "../../model/receptor/receptor.momento2.model";
import { ReceptorB3Model } from "../../model/receptor/receptor.b3.model";
import { ReceptorE5Model } from "../../model/receptor/receptor.e5.model";
import { ObservationModel } from '../../model/receptor/receptor.observation.model';
import { SelectSearchable } from 'ionic-select-searchable';
/**
 * Generated class for the ReceptorMoment2Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'receptor-moment2',
  templateUrl: 'receptor-moment2.html'
})
export class ReceptorMoment2Component {
  public flagH3_1_porque: boolean=false;
  public flagH3_2_porque: boolean=false;
  public flagH3_3_porque: boolean=false;
  public flagH3_4_porque: boolean=false;
  public flagH3_5_porque: boolean=false;
  public flagE5Otro: boolean=false;
  public flagH6_otro: boolean=false;
  public flagH7_otro: boolean=false;
  public flagH4_otro: boolean = false;
  public flagH5_otro: boolean = false;
  public flagG5_otro: boolean = false;
  public flagG4_email: boolean=false;
  public flagG1_otro: boolean = false;
  public flagG2_otro: boolean=false;
  public flagG3_otro: boolean=false;
  public flagF2_8: boolean = false;
  public flagF1_1: boolean = false;
  public flagE10_otro: boolean = false;
  public flagE9: boolean = false;
  public flagE8: boolean=false;
  public flagE7: boolean = false;
  public flagE6_otro: boolean = false;
  public flagNinguna: boolean = true;
  public flagE4_otro: boolean = false;
  public flagE3_1: boolean = false;
  public flagE2_1: boolean = false;
  public flagE1_1_otro: boolean = false;
  public flagE1_E4: boolean = false;
  public flagD2: boolean = false;
  public flagD2_otro: boolean = false;
  public flagD2_8_1: boolean = false;
  public flagC2_otro: boolean = false;
  public flagC1_otro: boolean = false;
  public flagB5_otro: boolean = false;
  public flagB5_10_1_otro: boolean = false;
  public flagB5_10_1: boolean = false;
  public flagB5_8_1_otro: boolean = false;
  public flagB5_8_1: boolean = false;
  public flagB5_6_1_otro: boolean = false;
  public flagB5_6_1: boolean = false;
  public flagB5_5_1: boolean = false;
  public flagB5_4_1_otro: boolean = false;
  public flagB5_4_1: boolean = false;
  public mainNameApp: string;
  private appConfig:AppConfigurations;
  public momento2:ReceptorMomento2Model=new ReceptorMomento2Model();
  public data = [];
  public depts=[];
  public municipiosvisitados=[];
  public cities=[]; 
  public otro_motivo: boolean = false;
  private tempDept:number;
  private tempCity:number;

  public E5Json=
  {
     
  };

  public B3_1Json={};
  @ViewChild("container") container: ElementRef;
  constructor(private alertCtrl: AlertController, private  _service:AppService, private validations:AppValidations, private _eventEmitter:EventEmiterService) {
    this.appConfig=new AppConfigurations();
    this.mainNameApp=this.appConfig.mainNameApp;
    this._service.getService('cities.json').subscribe(
      (response) => {  
        this.data=response.data; 
        console.log(this.data, "data");
      });
      
    this.B3_1Json=
    {
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
                                "id": 125,
                                "name": "SABANETA",
                                "realdepartment_id": "05"
                            }
                        ]
                    };
                    this.E5Json={"data":[
                      {"id":"640","name":"No realicé ningún tipo de gasto"},
                      {"id":"641","name":"Transporte aéreo internacional (Incluye ida-vuelta)"},
                      {"id":"642","name":"Transporte aéreo desde una ciudad de Colombia a "+ this.mainNameApp +"(Incluye ida-vuelta)"},
                      {"id":"643","name":"Transporte terrestre de pasajeros desde una ciudad de Colombia a "+ this.mainNameApp +" (Incluye ida- vuelta)"},
                      {"id":"644","name":"Transporte terrestre de pasajeros para movilizarse dentro de "+this.mainNameApp },
                      {"id":"645","name":"Alquiler de vehículo"},
                      {"id":"646","name":"Combustible"},
                      {"id":"647","name":"Alojamiento"},
                      {"id":"648","name":"Alimentos y bebidas"},
                      {"id":"649","name":"Actividades recreativas, culturales y deportivas"},
                      {"id":"650","name":"Artesanías (incluye ropa y/o calzado artesanal), recuerdos"},
                      {"id":"651","name":"Objetos valiosos (Joyas, obras de arte)"},
                      {"id":"652","name":"Bienes de consumo duradero (Ropa, calzado, implementos deportivos, etc)"},
                      {"id":"653","name":"Asistencia a conferencias, seminarios, congresos, ferias comerciales y exposiciones"},
                      {"id":"654","name":"Cursos/talleres de enseñanza"},
                      {"id":"655","name":"Servicios médicos (Incluye la cirugía estética)"},
                      {"id":"40","name":"Otros gastos"}
                    ]}

                    this.B3_1Json['cities']=this.sortByKey(this.B3_1Json['cities'],'name');
                    this.B3_1Json['cities'].unshift({
                      "id": 124,
                      "name": "MEDELLÍN",
                      "realdepartment_id": "05"
                    });
                    this._eventEmitter.eventReceptorDays.subscribe((day:string)=>{
                      this.momento2.B1=day;
                    });
  }
  public municipiosvisitados_event(event){

      this.municipiosvisitados =  Array.from({length: event.value}, (x, i) => i);
      this.cities = this.B3_1Json['cities'];

  }
public onChangeCountry(event: { component: SelectSearchable, value: any }){
      console.log(event);
    this.depts=this.data['countries'].find(x => x.id == event).states;
    // this.momento2.realdepartament_id = event.toString();
    //this.momento1.TempA3_2['states']='';
    console.log(event);
    //let name=this.data.countries.find(x => x.id == event).name;
    //this.moment2.lNights[this.numNight].countryName=name;
    //destination.countryName=name;
  }
  public onChangeDept(event: { component: SelectSearchable, value: any }) {

    this.cities=this.depts.find(x => x.id == event).cities;
    console.warn(this.cities);
    // let name=this.depts[this.tempDept].find(x => parseInt(x.id) == parseInt(event)).name;
    //this.moment2.lNights[this.numNight].stateName=name;
    //destination.stateName=name;
    this.momento2.realdepartament_id = event.toString();
    //this.momento1.TempA3_1['cities']='';
    // this.validateMomento2();
  }

  public show_otro_motivo(event){
      if(event == 40){
          this.otro_motivo = true;
      }

  }



  public save()
  {
    if(this.validations.validate(this.container))
    {
      this.momento2.dateEnd=this.dateTime()
      this._eventEmitter.sendReceptorSave(true);
    }
    else
    {
      let alert = this.alertCtrl.create({
        title: 'Alerta!!!',
        message: 'Por favor corregir campos en rojo',
        buttons: [          
          {
            text: 'OK',
            handler: () => {
              console.log('Buy clicked');
            }
          }
        ]
      });
      alert.present();
    }
  }

  private dateTime(): string {
    const dateTime = new Date();
    return dateTime.toLocaleDateString() + ' ' + dateTime.toLocaleTimeString();
  }

  public createTrips()
  {
    this.momento2.lB3=[];
    let num = parseInt(this.momento2.B2);
    for(let i=0;i<num;i++)
    {
      let ele=new ReceptorB3Model();
      this.momento2.lB3.push(ele);
    }
  }

  public showB3_1_2_otro(B3:ReceptorB3Model)
  {
    if(B3.B3_1_2=='96')
    {
      B3.flagB3_1_2_otro=true;
    }
    else
    {
      B3.flagB3_1_2_otro=false;
    }
  }

  public setMain(B3:ReceptorB3Model)
  {
    if(B3.B4Temp=='Si')
    {
      this.momento2.B4=B3;
      this.momento2.B4.name=this.B3_1Json['cities'].find(x => x.id == B3.B3_1).name;
      console.log(this.momento2);
    }
  }

  public validateB5()
  {
    if(this.momento2.B5.indexOf("137")>=0)
    {
      this.flagB5_4_1=true;
    }
    else
    {
      this.flagB5_4_1=false;
    }

    if(this.momento2.B5.indexOf("147")>=0)
    {
      this.flagB5_5_1=true;
    }
    else
    {
      this.flagB5_5_1=false;
    }    

    if(this.momento2.B5.indexOf("148")>=0)
    {
      this.flagB5_6_1=true;
    }
    else
    {
      this.flagB5_6_1=false;
    }   
    if(this.momento2.B5.indexOf("150")>=0)
    {
      this.flagB5_8_1=true;
    }
    else
    {
      this.flagB5_8_1=false;
    }

    if(this.momento2.B5.indexOf("152")>=0)
    {
      this.flagB5_10_1=true;
    }
    else
    {
      this.flagB5_10_1=false;
    } 
    
    if(this.momento2.B5.indexOf("40")>=0)
    {
      this.flagB5_otro=true;
    }
    else
    {
      this.flagB5_otro=false;
    }
  }

  public showB5_4_1_otro()
  {
    if(this.momento2.B5_4_1=='40')
    {
      this.flagB5_4_1_otro=true;
    }
    else
    {
      this.flagB5_4_1_otro=false;
    }
  }

  public showB5_6_1_otro()
  {
    if( this.momento2.B5_6_1=='40')
    {
      this.flagB5_6_1_otro=true;
    }
    else
    {
      this.flagB5_6_1_otro=false;
    }
  }

  public showB5_8_1_otro()
  {
    if( this.momento2.B5_8_1=='40')
    {
      this.flagB5_8_1_otro=true;
    }
    else
    {
      this.flagB5_8_1_otro=false;
    }
  }

  public showB5_10_1_otro()
  {
    if( this.momento2.B5_8_1=='40')
    {
      this.flagB5_10_1_otro=true;
    }
    else
    {
      this.flagB5_10_1_otro=false;
    }
  }

  public showC1_otro()
  {
    if(this.momento2.C1=='40')
    {
      this.flagC1_otro=true;
    }
    else
    {
      this.flagC1_otro=false;
    }
  }

  public showC2_otro()
  {
    if(this.momento2.C2=='40')
    {
      this.flagC2_otro=true;
    }
    else
    {
      this.flagC2_otro=false;
    }
  }

  public showD2()
  {
    if(parseInt(this.momento2.D1)>1)
    {
      this.flagD2=true;
    }
    else
    {
      this.flagD2=false;
    }
  }

  public validateD2()
  {
    if(this.momento2.D2.indexOf("514")>=0)
    {
      this.flagD2_8_1=true;
    }
    else
    {
      this.flagD2_8_1=false;
    } 

    if(this.momento2.D2.indexOf("40")>=0)
    {
      this.flagD2_otro=true;
    }
    else
    {
      this.flagD2_otro=false;
    } 
  }

  public showE1_E4()
  {
    if(this.momento2.E1=="Si")
    {
      this.flagE1_E4=true;
    }
    else
    {
      this.flagE1_E4=false;
    }  
  }

  public showE1_1_otro()
  {
    if(this.momento2.E1_1=="40")
    {
      this.flagE1_1_otro=true;
    }
    else
    {
      this.flagE1_1_otro=false;
    } 
  }

  public showE2_1()
  {
    if(parseInt(this.momento2.E1_1)>0)
    {
      this.flagE2_1=true;
    }
    else
    {
      this.flagE2_1=false;
    } 
  }

  public showE3_1()
  {
    if(this.momento2.E3=="222")
    {
      this.flagE3_1=true;
    }
    else
    {
      this.flagE3_1=false;
    } 
  }

  public showE4_otro()
  {
    if(this.momento2.E4=="524")
    {
      this.flagE4_otro=true;
    }
    else
    {
      this.flagE4_otro=false;
    } 
  }

  public createE5()
  {
    console.log(this.momento2.TempE5);
    if(this.momento2.TempE5.indexOf("640")>=0)
    {
      this.momento2.lE5=[];
      this.flagNinguna=false;
      return;
    }
    else
    {
      this.flagNinguna=true;
    }
    if(this.momento2.TempE5.indexOf("643")>=0)
    {
      this.flagE7=true;
    }
    if(this.momento2.TempE5.indexOf("645")>=0)
    {
      this.flagE8=true;
    }
    if(this.momento2.TempE5.indexOf("652")>=0)
    {
      this.flagE9=true;
    }
    if(this.momento2.TempE5.indexOf("40")>=0)
    {
      this.flagE5Otro=true;
    }
    else
    {
      this.flagE5Otro=false;
    }
    this.momento2.lE5=[];
    let num = this.momento2.TempE5.length;
    for(let i=0;i<num;i++)
    {
      let ele=new ReceptorE5Model();
      ele.E5_name=this.E5Json['data'].find(x => x.id == this.momento2.TempE5[i]).name;
      this.momento2.lE5.push(ele);
    }
  }

  public showE6_otro()
  {
    if(this.momento2.E6.indexOf("40")>=0)
    {
      this.flagE6_otro=true;
    }
    else
    {
      this.flagE6_otro=false;
    } 
    if(this.momento2.E6.indexOf("660")>=0)
    {
      this.flagE7=true;
    }
    if(this.momento2.E6.indexOf("662")>=0)
    {
      this.flagE8=true;
    }
    if(this.momento2.E6.indexOf("669")>=0)
    {
      this.flagE9=true;
    }
  }

  public showE10_otro()
  {
    if(this.momento2.E10=="40")
    {
      this.flagE10_otro=true;
    }
    else
    {
      this.flagE10_otro=false;
    }
  }

  public showF1_1()
  {
    if(this.momento2.F1=="Si")
    {
      this.flagF1_1=true;
    }
    else
    {
      this.flagF1_1=false;
    }
  }

  public showF2_8()
  {
    if(this.momento2.F2=="Si")
    {
      this.flagF2_8=true;
    }
    else
    {
      this.flagF2_8=false;
    }
  }

  public showG1_otro()
  {
    if(this.momento2.G1.indexOf("40")>=0)
    {
      this.flagG1_otro=true;
    }
    else
    {
      this.flagG1_otro=false;
    }
  }

  public showG2_otro()
  {
    if(this.momento2.G2=="40")
    {
      this.flagG2_otro=true;
    }
    else
    {
      this.flagG2_otro=false;
    }
  }

  public showG3_otro()
  {
    if(this.momento2.G3=="40")
    {
      this.flagG3_otro=true;
    }
    else
    {
      this.flagG3_otro=false;
    }
  }

  public showG4_email()
  {
    if(this.momento2.G3=="Si")
    {
      this.flagG4_email=true;
    }
    else
    {
      this.flagG4_email=false;
    }
  }

  public showG5_otro()
  {
    if(this.momento2.G5=="Si")
    {
      this.flagG5_otro=true;
    }
    else
    {
      this.flagG5_otro=false;
    }
  }

  public showH4_otro()
  {
    if(this.momento2.H4.indexOf("40")>=0)
    {
      this.flagH4_otro=true;
    }
    else
    {
      this.flagH4_otro=false;
    }
  }

  public showH5_otro()
  {
    if(this.momento2.H5.indexOf("40")>=0)
    {
      this.flagH5_otro=true;
    }
    else
    {
      this.flagH5_otro=false;
    }
  }public showH6_otro()
  {
    if(this.momento2.H6.indexOf("40")>=0)
    {
      this.flagH6_otro=true;
    }
    else
    {
      this.flagH6_otro=false;
    }
  }
  public showH7_otro()
  {
    if(this.momento2.H7.indexOf("40")>=0)
    {
      this.flagH7_otro=true;
    }
    else
    {
      this.flagH7_otro=false;
    }
  }

  public showH3_1_porque()
  {
    if(this.momento2.H3_1=='Si' || this.momento2.H3_1=='No')
    {
      this.flagH3_1_porque=true;
    }
    else
    {
      this.flagH3_1_porque=false;
    }
  }

  public showH3_2_porque()
  {
    if(this.momento2.H3_2=='Si' || this.momento2.H3_2=='No')
    {
      this.flagH3_2_porque=true;
    }
    else
    {
      this.flagH3_2_porque=false;
    }
  }

  public showH3_3_porque()
  {
    if(this.momento2.H3_3=='Si' || this.momento2.H3_3=='No')
    {
      this.flagH3_3_porque=true;
    }
    else
    {
      this.flagH3_3_porque=false;
    }
  }

  public showH3_4_porque()
  {
    if(this.momento2.H3_4=='Si' || this.momento2.H3_4=='No')
    {
      this.flagH3_4_porque=true;
    }
    else
    {
      this.flagH3_4_porque=false;
    }
  }

  public showH3_5_porque()
  {
    if(this.momento2.H3_5=='Si' || this.momento2.H3_5=='No')
    {
      this.flagH3_5_porque=true;
    }
    else
    {
      this.flagH3_5_porque=false;
    }
  }

  public sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }


  public addObservation()
  {
    if(this.momento2.lObservations.length<10)
    {
      let obs=new ObservationModel();
      this.momento2.lObservations.push(obs);
    }
  }

  public removeObservation()
  {
    this.momento2.lObservations.splice(-1,1);
  }
}
