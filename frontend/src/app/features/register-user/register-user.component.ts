import {Component, OnInit, ViewChild} from '@angular/core';
import {MatStepper} from "@angular/material/stepper";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ValidatorService} from "../../services/validator.service";

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
                     private validatorService: ValidatorService) {

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
    this.submitInProgress = false;

    // Return to the previous step

    this.stepper.previous();
  }


  public submitClicked(): void {
    this.submitInProgress = true;

    setTimeout( () => {
      this.submitInProgress = false;
    }, 5000)

  }

}
