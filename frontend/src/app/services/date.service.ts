import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }


  private dateToNumber(aDateAsString: string): number | null {
    if (aDateAsString === undefined || aDateAsString === null) {
      return null;
    }

    if (aDateAsString.length == 10) {
      // Convert mm/dd/yyyy --> yyyymmdd   (as a number)
      let yearNumber: string  = aDateAsString.substring(6, 10);
      let monthNumber: string = aDateAsString.substring(0, 2);
      let dayNumber:   string  = aDateAsString.substring(3, 5);

      let resultAsString =  `${yearNumber}${monthNumber}${dayNumber}`;
      return Number(resultAsString);
    }
    else if (aDateAsString.length == 19) {
      // Convert mm/dd/yyyy hh24:mi:ss --> yyyymmddHH24MISS   (as a number)

      let yearNumber:   string = aDateAsString.substring(6, 10);
      let monthNumber:  string = aDateAsString.substring(0, 2);
      let dayNumber:	  string = aDateAsString.substring(3, 5);
      let hourNumber:   string = aDateAsString.substring(11, 13);
      let minuteNumber: string = aDateAsString.substring(14, 16);
      let secondNumber: string = aDateAsString.substring(17, 19);

      let resultAsString =  `${yearNumber}${monthNumber}${dayNumber}${hourNumber}${minuteNumber}${secondNumber}`;
      return Number(resultAsString);
    }
    else {
      return null;
    }

  }


  public dateComparator(aDate1: string, aDate2: string): number {
    let date1Number = this.dateToNumber(aDate1);
    let date2Number = this.dateToNumber(aDate2);

    if (date1Number === null && date2Number === null) {
      return 0;
    }
    if (date1Number === null) {
      return -1;
    }
    if (date2Number === null) {
      return 1;
    }

    return date1Number - date2Number;
  }

}
