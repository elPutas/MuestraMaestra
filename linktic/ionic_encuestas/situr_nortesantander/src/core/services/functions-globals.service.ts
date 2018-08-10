import { Injectable } from '@angular/core';
@Injectable()
export class FunctionsGlobalsService {
  constructor() { }

  public isnullOrUndefined(value: any): boolean {
    return value === undefined || value === null;
  }

  public dateTime(): string {
    const dateTime = new Date();
    return dateTime.toLocaleDateString() + ' ' + dateTime.toLocaleTimeString();
  }
  public countDate(date1: string, date2: string): number {

    let oneDay = 24*60*60*1000;
    let firstDate = new Date(date1.replace('-', ','));
    let secondDate = new Date(date2.replace('-',','));

    return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
  }
}
