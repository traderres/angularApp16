import {Component, OnInit, ViewChild} from '@angular/core';
import {MatStepper} from "@angular/material/stepper";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ValidatorService} from "../../services/validator.service";
import {RegisterUserDTO} from "../../models/register-user-dto";
import {RegistrationService} from "../../services/registration.service";
import {Router} from "@angular/router";
import {Constants} from "../../utilities/constants";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  @ViewChild('stepper')  stepper: MatStepper;

  public myForm: FormGroup;
  public submitInProgress: boolean = false;

  public constructor(private formBuilder: FormBuilder,
                     private validatorService: ValidatorService,
                     private registrationService: RegistrationService,
                     private router: Router) {

  }

  public ngOnInit() : void {
    // Initialize the form
    this.myForm = this.formBuilder.group( {
      username:    [null, this.validatorService.whiteSpaceValidator() ],
      title:       [null, this.validatorService.whiteSpaceValidator() ],
      email:       [null, this.validatorService.emailValidator() ],
      phoneNumber: [null, this.validatorService.phoneNumberValidator() ]
    });
  }

  public nextClicked(): void {
    // marks the steps as completed so the use can go back and forth
    if (this.stepper.selected) {
      this.stepper.selected.completed = true;
    }

    // move to next step
    this.stepper.next();
  }

  public previousClicked(): void {
    // Return to the previous step
    this.stepper.previous();
  }


  public submitClicked(): void {
    this.submitInProgress = true;

    // Create the DTO and populate it from the form fields
    let dto: RegisterUserDTO = new RegisterUserDTO();
    dto.email = this.myForm.controls.email.value;
    dto.username = this.myForm.controls.username.value;

    this.registrationService.registerUser(dto).subscribe( () => {
      // REST call came back successfully
      this.router.navigate([Constants.PENDING_REGISTRATION_ROUTE]).then()
    }).add( () => {
      // REST call finally block
      this.submitInProgress = false;
    });
  }

}
