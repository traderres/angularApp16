import { Injectable } from '@angular/core';
import {AbstractControl, ValidatorFn} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  public whiteSpaceValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      // Check if the input length is greater than zero to avoid conflict with required validator
      // Ensure that the input has a length greater than zero when spaces are removed
      // const isWhitespace = control.value.length > 0 && (control.value || '').trim().length === 0;
      // const isValid = !isWhitespace;
      let inputString: string = control.value;

      if (this.isBlank(inputString)) {
        // Input is blank which is invalid.  So, return an error
        return {'whitespace': `Input cannot be blank`};
      }
      else {
        // Input is not blank which is valid.  So, return null
        return null;
      }
    }
  }

  public isBlank(aString: string): boolean {
    if (!aString) {
      return true;
    }
    else if (aString.length == 0) {
      return true;
    }
    else if (aString.trim().length == 0) {
      // Input is blank whitespaces so return error
      return  true;
    }
    else {
      // Input is not blank whitespaces so return false
      return false;
    }
  }


  // Email Validator
  public emailValidator(): ValidatorFn {

    return (control: AbstractControl) => {

      // if its null or empty string return a "required" error message
      //otherwise its good, so return null

      let emailText: string = control.value;
      if (emailText == null || emailText == "") {
        // Email field is empty so return error
        return {'emailError': `Please provide an email`};
      }
      else {
        //The /i at the end will make the regular expression case insensitive
        if(emailText.match( /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/i )) {
          // The email is valid so return null
          return  null;
        }
        else {
          // The email is not valid.
          return {'emailError':`Please provide a valid email`};
        }

      }
    }
  }


  public phoneNumberValidator():ValidatorFn {
    return (control: AbstractControl) => {

      // if its null or empty string return a "required" error message
      // if its not 13 characters minlength then return a message of it needing to be 13 characters long
      //otherwise its good, so return null

      let contractNumberText: string = control.value;
      if (contractNumberText == null || contractNumberText == "") {
        // Zipcode is valid so return null
        return {'telephoneNumberText': `Telephone number is required`};
      }

      else{
        if(contractNumberText.match( /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)) {
          // this telephone number is a phone number.  So, it's good.  So, return null.
          return  null;
        }
        else {
          // This telephone number is not telephone number format.  SO, it's bad.
          return {'telephoneNumberText':`Your Telephone Number was not in a recognized telephone number format`};
        }

      }

    }
  }

}
