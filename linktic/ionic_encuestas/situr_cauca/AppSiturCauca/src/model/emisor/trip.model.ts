import { DestinationModel } from "./destination.model";

export class TripModel {
  public name:string;
  public startTrip:string;
  public endTrip:string;
  public howManyNight:number;
  public howManyTouristHome:number;
  public touristHome:string;
  public lDestination:DestinationModel[]=[new DestinationModel()];
  public flagTouristHome:Boolean;
  public howManyShareNoHomeNo:number;
  public flagHowManyShareNoHomeNo;Boolean;
  public howManyShareNoHome:number;
  public flagHowManyShareNoHome:Boolean;
  public flagHowManyShareNo:Boolean;
  public howManyShareNo:number;
  public howManyShare:number;
  public flagHowManyShare:Boolean;
  public whoAreThem:string[];
  public flagTourist: Boolean;
  public flagTouristShare: Boolean;
  public howMuchMakeTrip:number;
  public frecuencyTrip:number;
  public otherMotivation:string;
  public flagOtherMotivation:Boolean;
  public motivationHealth:string;
  public flagHealth:Boolean;
  public longStop:string;
  public flagLongStop:Boolean;
  public mainMotivation:string;
}
