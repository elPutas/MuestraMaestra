import { TripModel } from "./trip.model";
import { NightModel } from "./night.model";
import { HowMuchCostTripPackageModel } from "./howMuchCostTripPackage.model";

export class Moment2Model {
  public numTrips:number;
  public lTrips:TripModel[];
  public activitiesAntioquia:string[];
  public whichActivitiesAntioquia:string[];
  public visitParks:number;
  public visitZoo:string;
  public visitChurch:number;
  public makePanela:string;
  public whichSports:string;
  public distanceTrip:string;
  public whichDistanceTrip:string;
  public transportUsed:string[];
  public whichtransportUsed:string;
  public mainTransportUsed:string[];
  public whichMainTransportUsed:string;
  public medioReserved:number[];
  public medioReservedPay:number[];
  public tripTourist:string;
  public tripTouristPack:string;
  public howMuchPay:number;
  public currencyType:number;
  public personsCover:number;
  public packageBought:number;
  public whereLocated:number;
  public productsPlan:string[];
  public otherServices:string;
  public productsPlanACD:string;
  public productsPlanACF:string;
  public productsPlanACOD:string;
  public productsPlanACOF:string;
  public productsPlanCTD:string;
  public productsPlanCTF:string;
  public costTripPackage:string[];
  //public costTripTTN:string;
  //public costTripVA:string;
  //public costTripACD:string;
  //public costTripACF:string;
  //public costTripARD:string;
  //public costTripARF:string;
  //public costTripOVD:string;
  //public costTripOVF:string;
  //public costTripBID:string;
  //public costTripBIF:string;
  //public costTripACOD:string;
  //public costTripACOF:string;
  //public costTripCTD:string;
  //public costTripCTF:string;
  //public costTripSMD:string;
  //public costTripSMF:string;
  //public costTripOthers:string;
  public costTripPackage2:string[];
  public costTrip2TTN:string;
  public costTrip2VA:string;
  public costTrip2ACD:string;
  public costTrip2ACF:string;
  public costTrip2ARD:string;
  public costTrip2ARF:string;
  public costTrip2OVD:string;
  public costTrip2OVF:string;
  public costTrip2BID:string;
  public costTrip2BIF:string;
  public costTrip2ACOD:string;
  public costTrip2ACOF:string;
  public costTrip2CTD:string;
  public costTrip2CTF:string;
  public costTrip2SMD:string;
  public costTrip2SMF:string;
  public costTrip2Others:string;
  //public howMuchCostTripPackage:string;



  public expensesSM:number;
  public typeCurrencySM:string;
  public countPersonsSM:number;

  public expensesTTN:number;
  public typeCurrencyTTN:string;
  public countPersonsTTN:number;

  public expensesVA:number;
  public typeCurrencyVA:string;
  public countPersonsVA:number;

  public expensesAC:number;
  public typeCurrencyAC:string;
  public countPersonsAC:number;

  public expensesAR:number;
  public typeCurrencyAR:string;
  public countPersonsAR:number;

  public expensesOV:number;
  public typeCurrencyOV:string;
  public countPersonsOV:number;

  public expensesBI:number;
  public typeCurrencyBI:string;
  public countPersonsBI:number;

  public expensesACO:number;
  public typeCurrencyACO:string;
  public countPersonsACO:number;

  public expensesCT:number;
  public typeCurrencyCT:string;
  public countPersonsCT:number;


  /*new*/
  public expensesAB:number;
  public typeCurrencyAB:string;
  public countPersonsAB:number;

  public expensesCO:number;
  public typeCurrencyCO:string;
  public countPersonsCO:number;

  public expensesAL:number;
  public typeCurrencyAL:string;
  public countPersonsAL:number;

  public expensesTTA:number;
  public typeCurrencyTTA:string;
  public countPersonsTTA:number;

  public expensesTAN:number;
  public typeCurrencyTAN:string;
  public countPersonsTAN:number;

  public expensesTTI:number;
  public typeCurrencyTTI:string;
  public countPersonsTTI:number;

  public expensesTAI:number;
  public typeCurrencyTAI:string;
  public countPersonsTAI:number;

  public expensesTEI:number;
  public typeCurrencyTEI:string;
  public countPersonsTEI:number;

  public expensesOther:number;
  public whichOther:number;
  public typeCurrencyOther:string;
  public countPersonsOther:number;



  public whichSpend:string;
  public howManySpend:string;
  public whoPaySpend:string[];
  public othersSpends:string;
  public beforeTravel:string[];
  public otherBeforeTravel:string;
  public whichWay:string[];
  public otherWhichWay:string;
  public afterTripShare:string[];
  public otherAfterTripShare:string;
  public wantEmailAntioquia:string;
  public email:string;
  public wantSocialRed:string;
  public facebook:string;
  public packageTourist:number;
  public transportArrived:number;
  public displacement:number;
  public accommodation:number;
  public drinks:number;
  public tours:number;
  public recreation:number;
  public present:number;
  public transportOut:number;
  public other:string;
  public other2:string;
  public other3:string;
  public otherService:string;
  public otherService2:string;
  public otherService3:string;
  public featuresDestiny:number[];
  public otherFeatures:string;
  public imageBeforeVisit:number;
  public thenImageBeforeVisit:number;
  public moreImportantStay:string;
  public lessImportantStay:string;
  public wouldVisitAgain:string;
  public authFenalco:string;
  public lNights:NightModel[];
  public howManyNight:number;
  public whichActivitiesAntioquiaOther:string;
  public visitZooOther:string;
  public makePanelaOther:string;
  public sportsOther:string;
  public otherActivityInGeneral:string;
  public lHowMuchCostTripPackage:HowMuchCostTripPackageModel[];
  public whyBefore:string;
  public whyAfter:string;
  public tripSelected:string;
}
