
import { Moment1PersonModel } from "./moment1Person.model";

export class Moment1Model {
  public interviewer:string;
  public date:string;
  public ch:string;
  public en:string;
  public place_id:string;
  public numPersons:number;
  public lMoment1PersonModel:Moment1PersonModel[];
  public interview_person:string;
  public phone:number;
  public cellphone:number;
  public email:string;
  public address1:string;
  public address2:string;
  public address3:string;
  public address4:string;
  public neighborhood:string;
  public stratum:string;
  public municipality_id:string;
  public agreement:string;
  public reasons:string[];
  public observations:string;
  public numMoment2:string[]=[];
  public income_id:string;
  public fenalcoSolicitude:string;
  public otherReason:string;
}
