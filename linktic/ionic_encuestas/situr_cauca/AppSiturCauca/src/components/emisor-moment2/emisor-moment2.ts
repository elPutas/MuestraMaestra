import { Component, ViewChild, Input, ElementRef } from '@angular/core';
import { Moment2Model } from "../../model/emisor/moment2.model";
import { TripModel } from "../../model/emisor/trip.model";
import { DestinationModel } from "../../model/emisor/destination.model";
import { AppService } from '../../services/app.service';
import { NightModel } from "../../model/emisor/night.model";
import { EventEmiterService } from '../../services/app.event.emitter.service';
import { Moment1PersonModel } from '../../model/emisor/moment1Person.model';
import { AppConfigurations } from '../../app/app.configuration';
import { AlertController } from 'ionic-angular';
import { AppValidations } from '../../app/app.validations';
import { ToastController } from 'ionic-angular';
import { SelectSearchable } from 'ionic-select-searchable';
import { NullTemplateVisitor } from '@angular/compiler';
/**
 * Generated class for the EmisorMoment2Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'emisor-moment2',
  templateUrl: 'emisor-moment2.html'
})
export class EmisorMoment2Component {
  @ViewChild("container") container: ElementRef;
  mainNameApp: string;
  valueTripExpenses7: boolean;
  valueTripExpenses6: boolean;
  valueTripExpenses5: boolean;
  valueTripExpenses4: boolean;
  valueTripExpenses3: boolean;
  valueTripExpenses2: boolean;
  valueTripExpenses: boolean;
  costTripAB: boolean;
  costTripAL: boolean;
  costTripCOM: boolean;
  costTripTTA: boolean;
  costTripTAN: boolean;
  costTripTTI: boolean;
  costTripTAI: boolean;
  costTripTEI: boolean;
  valueproductsPlan3: boolean;
  valueproductsPlan2: boolean;
  valueproductsPlan: boolean;
  showActivitiesAntioquiaSelect: boolean;
  flagWhichMainTransportUsed: boolean;
  flagwhichtransportUsed: boolean;
  flagDistanceTripOther: boolean;
  flagotherActivityInGeneral: boolean;
  flagSportOther: boolean;
  flagSport: boolean;
  flagMakePanelaOther: boolean;
  flagMakePanela: boolean;
  flagVisitZooOther: boolean;
  flagVisitZoo: boolean;
  flagAntioquiaActivitiesPark: boolean;
  public flagAntioquiaActivitiesOtherMuseum: Boolean;
  public flagAntioquiaActivities: Boolean;

  @ViewChild('compartiendoGastos') compartiendoGastos;
  public moment2: Moment2Model;
  public data;
  public depts=[];
  public cities=[];
  public flagNightDay:Boolean;
  private tempDept:number;
  private tempCity:number;
  public featuresDestiny:Boolean;
  public wantEmailAntioquia:Boolean;
  public wantSocialRed:Boolean;
  public afterTripShare:Boolean;
  public whichWay:Boolean;
  public beforeTravel:Boolean;
  public whoPaySpend:Boolean;
  tripTouristPack: boolean;
  howMuchPay: boolean;
  packageBought: boolean;
  productsPlanCT: boolean;
  productsPlanACO: boolean;
  productsPlanAC: boolean;
  costTripOthers: boolean;
  costTripSM: boolean;
  costTripCT: boolean;
  costTripACO: boolean;
  costTripBI: boolean;
  costTripOV: boolean;
  costTripAR: boolean;
  costTripAC: boolean;
  costTripVA: boolean;
  costTripTTN: boolean;
  costTrip2Others: boolean;
  costTrip2SM: boolean;
  costTrip2CT: boolean;
  costTrip2ACO: boolean;
  costTrip2BI: boolean;
  costTrip2OV: boolean;
  costTrip2AR: boolean;
  costTrip2AC: boolean;
  costTrip2VA: boolean;
  costTrip2TTN: boolean;
  dateNow: string;
  getTime: string;
  numNight:number=-1;
  mainNameDestination:DestinationModel=new DestinationModel();
  lPersons:Moment1PersonModel[]=[];
  namePersonMoment1:string='';
  insideAntioquia:boolean=false;
  outsideAntioquia:boolean=false;
  insideOusideAntioquia:boolean=false;
  tripUser:TripModel=new TripModel();
  private appConfig:AppConfigurations;
  @Input() datas;

 
  constructor(private  _service:AppService,private _eventEmiter:EventEmiterService,private alertCtrl: AlertController, private validations:AppValidations,private toastCtrl: ToastController) {
    this.appConfig=new AppConfigurations();
    this.mainNameApp=this.appConfig.mainNameApp;
    this.dateNow = new Date().getHours()+":"+new Date().getMinutes();
    this.moment2=new Moment2Model();
    this._service.getService('cities.json').subscribe(
      (response) => {  
        this.data=response.data;
      });
    this.moment2.lNights=[];
    this._eventEmiter.eventPersonMoment.subscribe((lPersons:Moment1PersonModel[])=>{
      //this.namePersonMoment1=this._eventEmiter.lPersonMoment1[this.datas].housemember
      this.lPersons=lPersons;
      this.namePersonMoment1=lPersons[this.datas].housemember;
    });
  }

  public addDestination(list:DestinationModel[])
  {
    let destination=new DestinationModel();
    list.push(destination);
    /*let night=new NightModel();
    this.moment2.lNights.push(night);
    this.numNight++;*/
  }

  public removeDestination(list:DestinationModel[])
  {
    list.splice(-1,1);
    //this.moment2.lNights.splice(-1,1);
    //this.numNight--;
  }
  

  public renderTrips()
  {
    this.moment2.lTrips=[];
    for(let i=0;i<this.moment2.numTrips;i++)
    {
      let ele=new TripModel();
      this.moment2.lTrips.push(ele);
    }
  }

  public onChangeCountry(num,event: { component: SelectSearchable, value: any },destination)
  {
    this.depts[num]=this.data.countries.find(x => x.id == event.value.id).states;
    this.tempDept=num;
    let name=this.data.countries.find(x => x.id == event.value.id).name;
    //this.moment2.lNights[this.numNight].countryName=name;
    destination.countryName=name;
    destination.country=event.value.id;
    //destination.tempCountry['states']='';
  }
  public onChangeDept(num,event: { component: SelectSearchable, value: any },destination)
  {
    console.log('Codigo de pais'+event);
    if(event.value.id==="05")
    {
      this.insideAntioquia=true;
      this.showActivitiesAntioquiaSelect=true;
      console.log('Dentro de Antioquia');
    }
    if(event.value.id!=="05")
    {
      this.outsideAntioquia=true;
      console.log('Fuera de Antioquia');
    }
    if(this.insideAntioquia && this.outsideAntioquia)
    {
      this.insideOusideAntioquia=true;
      console.log("Se puede mostrar bloques de Antioquia dentro y fuera");
    }
    this.cities[num]=this.depts[this.tempDept].find(x => parseInt(x.id) == parseInt(event.value.id)).cities;
    this.tempCity=num;
    let name=this.depts[this.tempDept].find(x => parseInt(x.id) == parseInt(event.value.id)).name;
    //this.moment2.lNights[this.numNight].stateName=name;
    destination.stateName=name;
    destination.state=event.value.id;
    //destination.tempState['cities']='';
  }

  public getNameCity(num,event: { component: SelectSearchable, value: any },destination)
  {
    console.log(event);
    let name=this.cities[num].find(x => parseInt(x.id) == parseInt(event.value.id)).name;
    //this.moment2.lNights[this.numNight].cityName=name;
    destination.cityName=name;
    destination.city=event.value.id;
  }

  public isMainDestination(event,destination,trip)
  {
    if(event=="si")
    {
      this.mainNameDestination=destination;
      destination.mainDestiny="si";
      if(trip.howManyNight>0)
      {
        this.flagNightDay=true;
      }
      else
      {
        this.flagNightDay=false;
      }
    }
  }

  public showWhoAreThem(trip:TripModel)
  {
    if(trip.whoAreThem.indexOf("110")>=0)
    {
      trip.flagHowManyShare=true;
    }
    else
    {
      trip.flagHowManyShare=false;
    }
    if(trip.whoAreThem.indexOf("111")>=0)
    {
      trip.flagHowManyShareNo=true;
    }
    else
    {
      trip.flagHowManyShareNo=false;
    }
    if(trip.whoAreThem.indexOf("112")>=0)
    {
      trip.flagHowManyShareNoHome=true;
    }
    else
    {
      trip.flagHowManyShareNoHome=false;
    }
    if(trip.whoAreThem.indexOf("113")>=0)
    {
      trip.flagHowManyShareNoHomeNo=true;
    }
    else
    {
      trip.flagHowManyShareNoHomeNo=false;
    }
    if(trip.whoAreThem.indexOf("114")>=0)
    {
      trip.flagTouristHome=true;
    }
    else
    {
      trip.flagTouristHome=false;
    }
  }

  public calculateNight(trip:TripModel)
  {
    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var firstDate = new Date(trip.startTrip);
    var secondDate = new Date(trip.endTrip);
    trip.howManyNight = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));

  }

  public showActivitiesAntioquia()
  {
    if(this.moment2.activitiesAntioquia.indexOf("156")>=0)
    {
      this.flagAntioquiaActivities=true;
    }
    else
    {
      this.flagAntioquiaActivities=false;
    }

    if(this.moment2.activitiesAntioquia.indexOf("155")>=0)
    {
      this.flagAntioquiaActivitiesPark=true;
    }
    else
    {
      this.flagAntioquiaActivitiesPark=false;
    }

    if(this.moment2.activitiesAntioquia.indexOf("154")>=0)
    {
      this.flagVisitZoo=true;
    }
    else
    {
      this.flagVisitZoo=false;
    }
    if(this.moment2.activitiesAntioquia.indexOf("152")>=0)
    {
      this.flagMakePanela=true;
    }
    else
    {
      this.flagMakePanela=false;
    }

     if(this.moment2.activitiesAntioquia.indexOf("150")>=0)
    {
      this.flagSport=true;
    }
    else
    {
      this.flagSport=false;
    }
     if(this.moment2.activitiesAntioquia.indexOf("40")>=0)
    {
      this.flagotherActivityInGeneral=true;
    }
    else
    {
      this.flagotherActivityInGeneral=false;
    }    
    
  }

  public showDistanceTripOther()
  {
    if(this.moment2.distanceTrip == "40")
    {
      this.flagDistanceTripOther=true
    }
    else
    {
      this.flagDistanceTripOther=false
    }
  }

  public showMainTransportUsed()
  {
    if(this.moment2.mainTransportUsed.indexOf("40")>=0)
    {
      this.flagWhichMainTransportUsed=true
    }
    else
    {
      this.flagWhichMainTransportUsed=false
    }
  }

  public showWhichtransportUsed()
  {
    if(this.moment2.transportUsed.indexOf("40")>=0)
    {
      this.flagwhichtransportUsed=true
    }
    else
    {
      this.flagwhichtransportUsed=false
    }
  }
  

  public showSportOther()
  {
    if(this.moment2.whichSports=="40")
    {
      this.flagSportOther=true
    }
    else
    {
      this.flagSportOther=false
    }
  }

  public showMakePanela()
  {
    if(this.moment2.makePanela=="40")
    {
      this.flagMakePanelaOther=true
    }
    else
    {
      this.flagMakePanelaOther=false
    }
  }

  public showVisitZooOther()
  {
    if(this.moment2.visitZoo=="40")
    {
      this.flagVisitZooOther=true
    }
    else
    {
      this.flagVisitZooOther=false
    }
    
  }

  public showOtherTypeNight(night:NightModel)
  {
    if(night.typeNight=="16")
    {
      night.flagNight=true;
    }
    else
    {
      night.flagNight=false;
    }    
  }

  public showNightDays()
  {
    if(this.moment2.howManyNight>0)
    {
      this.flagNightDay=true;
    }
    else
    {
      this.flagNightDay=false;
    }
  }

  public showActivitiesAntioquiaMuseumOther()
  {
    if(this.moment2.whichActivitiesAntioquia.indexOf("150")>=0)
    {
      this.flagAntioquiaActivitiesOtherMuseum=true;
    }
    else
    {
      this.flagAntioquiaActivitiesOtherMuseum=false;
    }

  }

  public tripSelectedByUser(event)
  {
    this.tripUser=this.moment2.lTrips[event];
    this.moment2.lNights=[];
    for(let i in this.tripUser.lDestination)
    {
      let destination = this.tripUser.lDestination[i];
      let night=new NightModel();
      night.countryName=destination.countryName;
      night.stateName=destination.stateName;
      night.cityName=destination.cityName;
      this.moment2.lNights.push(night);
      //this.numNight++;
      if(destination.mainDestiny=="si")
      {
        this.mainNameDestination=destination;
        if(this.tripUser.howManyNight>0)
        {
          this.flagNightDay=true;
        }
        else
        {
          this.flagNightDay=false;
        }
      }
    }
  }

  public showMainMotivation(trip:TripModel)
  {
    if(trip.mainMotivation=="84")
    {
      trip.flagLongStop=true;
    }
    else
    {
      trip.flagLongStop=false;
    }

    if(trip.mainMotivation=="86")
    {
      trip.flagHealth=true;
    }
    else
    {
      trip.flagHealth=false;
    }
    if(trip.mainMotivation=="40")
    {
      trip.flagOtherMotivation=true;
    }
    else{
      trip.flagOtherMotivation=false;
    }
  }

  public showTourist(trip:TripModel)
  {
    if(trip.howMuchMakeTrip>1)
    {
      trip.flagTourist=true;
    }
    else
    {
      trip.flagTourist=false;
    }
  }

  public showTouristShare(trip:TripModel)
  {
    if(trip.touristHome=="si")
    {
      trip.flagTouristShare=true;
    }
    else
    {
      trip.flagTouristShare=false;
    }
  }

  public featuresDestinyChange()
   {
    if(this.moment2.featuresDestiny.indexOf(40)>=0)
     {
       this.featuresDestiny=true;
     }
    else
     {
       this.featuresDestiny=false;
     }
   }

   public wantEmailAntioquiaChange()
   {
    if(this.moment2.wantEmailAntioquia=="si")
     {
       this.wantEmailAntioquia=true;
     }
    else
     {
       this.wantEmailAntioquia=false;
     }
   }

   public wantSocialRedChange()
   {
    if(this.moment2.wantSocialRed=="si")
     {
       this.wantSocialRed=true;
     }
    else
     {
       this.wantSocialRed=false;
     }
   }

   public afterTripShareChange()
   {
    if(this.moment2.afterTripShare.indexOf("40")>=0)
     {
       this.afterTripShare=true;
     }
    else
     {
       this.afterTripShare=false;
     }
   }

   public whichWayChange()
   {
    if(this.moment2.whichWay.indexOf("40")>=0)
     {
       this.whichWay=true;
     }
    else
     {
       this.whichWay=false;
     }
   }

  public beforeTravelChange()
   {
    if(this.moment2.beforeTravel.indexOf("40")>=0)
     {
       this.beforeTravel=true;
     }
    else
     {
       this.beforeTravel=false;
     }
   }
  public whoPaySpendChange()
   {
    if(this.moment2.whoPaySpend.indexOf("40")>=0)
     {
       this.whoPaySpend=true;
     }
    else
     {
       this.whoPaySpend=false;
     }
   }

  public costTripPackage2Change()
   {
     this.valueTripExpenses = false;
     this.valueTripExpenses2 = false;
     this.valueTripExpenses3 = false;
     this.valueTripExpenses4 = false;
     this.valueTripExpenses5 = false;
     this.valueTripExpenses6 = false;
     this.valueTripExpenses7 = false;
    if(this.moment2.costTripPackage2.indexOf("322")>=0)
     {
       this.costTrip2TTN=true;
     }
    else
     {
       this.costTrip2TTN=false;
     }
     if(this.moment2.costTripPackage2.indexOf("324")>=0 && this.insideOusideAntioquia)
     {
       this.costTrip2VA=true;
     }
    else
     {
       this.costTrip2VA=false;
     }
     
     if(this.moment2.costTripPackage2.indexOf("328")>=0 && this.insideOusideAntioquia)
     {
       this.costTrip2AC=true;
     }
    else
     {
       this.costTrip2AC=false;
     }

     if(this.moment2.costTripPackage2.indexOf("329")>=0 && this.insideOusideAntioquia)
     {
       this.costTrip2AR=true;
     }
    else
     {
       this.costTrip2AR=false;
     }

     if(this.moment2.costTripPackage2.indexOf("330")>=0 && this.insideOusideAntioquia)
     {
       this.costTrip2OV=true;
     }
    else
     {
       this.costTrip2OV=false;
     }
     
     if(this.moment2.costTripPackage2.indexOf("331")>=0 && this.insideOusideAntioquia)
     {
       this.costTrip2BI=true;
     }
    else
     {
       this.costTrip2BI=false;
     }

     if(this.moment2.costTripPackage2.indexOf("332")>=0 && this.insideOusideAntioquia)
     {
       this.costTrip2ACO=true;
     }
    else
     {
       this.costTrip2ACO=false;
     }

     if(this.moment2.costTripPackage2.indexOf("334")>=0 && this.insideOusideAntioquia)
     {
       this.costTrip2CT=true;
     }
    else
     {
       this.costTrip2CT=false;
     }

     if(this.moment2.costTripPackage2.indexOf("335")>=0 && this.insideOusideAntioquia)
     {
       this.costTrip2SM=true;
     }
    else
     {
       this.costTrip2SM=false;
     }

     if(this.moment2.costTripPackage2.indexOf("40")>=0)
     {
       this.costTrip2Others=true;
     }
    else
     {
       this.costTrip2Others=false;
     }
   }

   public costTripPackageChange()
   {
    if(this.moment2.costTripPackage.indexOf("318")>=0)
    {
      this.costTripTEI=true;
    }
   else
    {
      this.costTripTEI=false;
    }
    if(this.moment2.costTripPackage.indexOf("319")>=0)
    {
      this.costTripTAI=true;
    }
   else
    {
      this.costTripTAI=false;
    }
    if(this.moment2.costTripPackage.indexOf("320")>=0)
    {
      this.costTripTTI=true;
    }
   else
    {
      this.costTripTTI=false;
    }
    if(this.moment2.costTripPackage.indexOf("321")>=0)
    {
      this.costTripTAN=true;
    }
   else
    {
      this.costTripTAN=false;
    }
    if(this.moment2.costTripPackage.indexOf("323")>=0)
    {
      this.costTripTTA=true;
    }
   else
    {
      this.costTripTTA=false;
    }
    if(this.moment2.costTripPackage.indexOf("325")>=0)
    {
      this.costTripCOM=true;
    }
   else
    {
      this.costTripCOM=false;
    }
    if(this.moment2.costTripPackage.indexOf("326")>=0)
    {
      this.costTripAL=true;
    }
   else
    {
      this.costTripAL=false;
    }
    if(this.moment2.costTripPackage.indexOf("327")>=0)
    {
      this.costTripAB=true;
    }
   else
    {
      this.costTripAB=false;
    }
    if(this.moment2.costTripPackage.indexOf("322")>=0)
     {
       this.costTripTTN=true;
     }
    else
     {
       this.costTripTTN=false;
     }
     if(this.moment2.costTripPackage.indexOf("324")>=0)
     {
       this.costTripVA=true;
     }
    else
     {
       this.costTripVA=false;
     }
     
     if(this.moment2.costTripPackage.indexOf("328")>=0)
     {
       this.costTripAC=true;
     }
    else
     {
       this.costTripAC=false;
     }

     if(this.moment2.costTripPackage.indexOf("329")>=0)
     {
       this.costTripAR=true;
     }
    else
     {
       this.costTripAR=false;
     }

     if(this.moment2.costTripPackage.indexOf("330")>=0)
     {
       this.costTripOV=true;
     }
    else
     {
       this.costTripOV=false;
     }
     
     if(this.moment2.costTripPackage.indexOf("331")>=0)
     {
       this.costTripBI=true;
     }
    else
     {
       this.costTripBI=false;
     }

     if(this.moment2.costTripPackage.indexOf("332")>=0)
     {
       this.costTripACO=true;
     }
    else
     {
       this.costTripACO=false;
     }

     if(this.moment2.costTripPackage.indexOf("334")>=0)
     {
       this.costTripCT=true;
     }
    else
     {
       this.costTripCT=false;
     }

     if(this.moment2.costTripPackage.indexOf("335")>=0)
     {
       this.costTripSM=true;
     }
    else
     {
       this.costTripSM=false;
     }

     if(this.moment2.costTripPackage.indexOf("40")>=0)
     {
       this.costTripOthers=true;
     }
    else
     {
       this.costTripOthers=false;
     }
   }

   public validateValuesproductsPlan1(){
    let valor1 = parseInt(this.moment2.productsPlanACD)
    let valor2 = parseInt(this.moment2.productsPlanACF);
    let total = valor1+valor2;
    console.log(total);
    if(total != 100){
      this.valueproductsPlan = true;
    } else {
      this.valueproductsPlan = false;
    }
   }

   public validateValuesproductsPlan2(){
    let valor1 = parseInt(this.moment2.productsPlanACOD)
    let valor2 = parseInt(this.moment2.productsPlanACOF);
    let total = valor1+valor2;
    console.log(total);
    if(total != 100){
      this.valueproductsPlan2 = true;
    } else {
      this.valueproductsPlan2 = false;
    }
   }

   public validateValuesproductsPlan3(){
    let valor1 = parseInt(this.moment2.productsPlanCTD)
    let valor2 = parseInt(this.moment2.productsPlanCTF);
    let total = valor1+valor2;
    console.log(total);
    if(total != 100){
      this.valueproductsPlan3 = true;
    } else {
      this.valueproductsPlan3 = false;
    }
   }

   public validateExpensesValues(){
    let valor1 = parseInt(this.moment2.costTrip2ACD)
    let valor2 = parseInt(this.moment2.costTrip2ACF);
    let total = valor1+valor2;
    if(total != 100){
      this.valueTripExpenses = true;
    } else {
      this.valueTripExpenses = false;
    }
   }

   public validateExpensesValue2(){
    let valor1 = parseInt(this.moment2.costTrip2ARD)
    let valor2 = parseInt(this.moment2.costTrip2ARF);
    let total = valor1+valor2;
    if(total != 100){
      this.valueTripExpenses2 = true;
    } else {
      this.valueTripExpenses2 = false;
    }
   }

   public validateExpensesValue3(){
    let valor1 = parseInt(this.moment2.costTrip2OVD)
    let valor2 = parseInt(this.moment2.costTrip2OVF);
    let total = valor1+valor2;
    if(total != 100){
      this.valueTripExpenses3 = true;
    } else {
      this.valueTripExpenses3 = false;
    }
   }

   public validateExpensesValue4(){
    let valor1 = parseInt(this.moment2.costTrip2BID)
    let valor2 = parseInt(this.moment2.costTrip2BIF);
    let total = valor1+valor2;
    if(total != 100){
      this.valueTripExpenses4 = true;
    } else {
      this.valueTripExpenses4 = false;
    }
   }

   public validateExpensesValue5(){
    let valor1 = parseInt(this.moment2.costTrip2ACOD)
    let valor2 = parseInt(this.moment2.costTrip2ACOF);
    let total = valor1+valor2;
    if(total != 100){
      this.valueTripExpenses5 = true;
    } else {
      this.valueTripExpenses5 = false;
    }
   }

   public validateExpensesValue6(){
    let valor1 = parseInt(this.moment2.costTrip2CTD)
    let valor2 = parseInt(this.moment2.costTrip2CTF);
    let total = valor1+valor2;
    if(total != 100){
      this.valueTripExpenses6 = true;
    } else {
      this.valueTripExpenses6 = false;
    }
   }

   public validateExpensesValue7(){
    let valor1 = parseInt(this.moment2.costTrip2SMD)
    let valor2 = parseInt(this.moment2.costTrip2SMF);
    let total = valor1+valor2;
    if(total != 100){
      this.valueTripExpenses7 = true;
    } else {
      this.valueTripExpenses7 = false;
    }
   }

   public productsPlanChange()
   {
    this.valueproductsPlan = false;
    this.valueproductsPlan2 = false;
    this.valueproductsPlan3 = false;
    if(this.moment2.productsPlan.indexOf("238")>=0 && this.insideOusideAntioquia)
     {
       this.productsPlanAC=true;
     }
    else
     {
       this.productsPlanAC=false;
     }
     if(this.moment2.productsPlan.indexOf("239")>=0 && this.insideOusideAntioquia)
     {
       this.productsPlanACO=true;
     }
    else
     {
       this.productsPlanACO=false;
     }
     if(this.moment2.productsPlan.indexOf("240")>=0 && this.insideOusideAntioquia)
     {
       this.productsPlanCT=true;
     }
    else
     {
       this.productsPlanCT=false;
     }
     if(this.moment2.productsPlan.indexOf("40")>=0)
     {
       this.productsPlanCT=true;
     }
    else
     {
       this.productsPlanCT=false;
     }
   }

   public packageBoughtChange()
   {
    if(this.moment2.packageBought==222)
    {
      this.packageBought=true;
    }
   else
    {
      this.packageBought=false;
    }
   }

   public howMuchPayChange()
   {
    if(this.moment2.howMuchPay>0)
    {
      this.howMuchPay=true;
    }
   else
    {
      this.howMuchPay=false;
    }
   }

   public tripTouristPackChange(){
    if(this.moment2.tripTouristPack=="si")
    {
      this.tripTouristPack=true;
    }
   else
    {
      this.tripTouristPack=false;
    }
   }

  public acordeon($event,id) {
    console.log("Click",id);
    let a = document.getElementsByClassName("acordeonMomento")[id];
    a.classList.toggle("showContent");
  }

  public save()
  {
    if(this.validations.validate(this.container))
    {
      //this._eventEmiter.sendEmisorSave(true);
      let toast = this.toastCtrl.create(
        {
          message: 'Toda la informacion se lleno correctamente',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
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
}
