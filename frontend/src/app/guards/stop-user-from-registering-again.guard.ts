import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {UserService} from "../services/user.service";
import {Observable, of, switchMap} from "rxjs";
import {Constants} from "../utilities/constants";
import {UserRegistrationInfoDTO} from "../models/user-registration-info-dto";

export namespace StopUserFromRegisteringAgainGuard {

  @Injectable({
    providedIn: 'root'
  })
  class InternalPageGuardService {

    constructor(private router: Router,
                private userService: UserService) {}


    /*
     * If this method returns an Observable<boolean>, then the router will subscribe and WAIT for the result
     * So, this method must return an observable that holds TRUE or FALSE
     *
     * If the observable holds TRUE, then the router will open the page
     * If the observable holds FALSE, then the router will *NOT* open the page
     */
    public canActivate(aActivatedRouteSnapshot: ActivatedRouteSnapshot): Observable<boolean> {

      return this.userService.getUserRegistrationInfo().pipe(
        switchMap((aUserDTO: UserRegistrationInfoDTO) => {
          console.log('in stop-user.canActivate()  aUserDTO.registrationState=', aUserDTO.registrationState);

          if (aUserDTO.registrationState == 1) {
            // User is not registered.  So, return TRUE to let the user open the page
            return of(true);
          }
          else if(aUserDTO.registrationState == 2) {
            // User has submitted registration.  So, take the user back to the "Pending Verification Page"
            this.router.navigate([Constants.PENDING_REGISTRATION_ROUTE]).then();
            return of(false);
          }
          else{
            // Don't let the user navigate to this page
            return of(false);
          }

        }));

    } // end of canActivate()

  }  // end of InternalPageGuardService


  /*
   * Problem:    Angular is deprecating the CanActivate interface
   * Solution:   if you have older guards, then you can still use them
   *             Convert your older guard into a service and inject it below
   */
  export const canActivate: CanActivateFn = (aActivatedRouteSnapshot: ActivatedRouteSnapshot, aRouterStateSnapshot: RouterStateSnapshot) => {
    // Inject the InternalPageGuardService and call canActivate()
    return inject(InternalPageGuardService).canActivate(aActivatedRouteSnapshot);
  };

}
