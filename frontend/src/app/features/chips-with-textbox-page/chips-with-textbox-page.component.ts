import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInput, MatChipInputEvent} from "@angular/material/chips";

@Component({
  selector: 'app-chips-with-textbox-page',
  templateUrl: './chips-with-textbox-page.component.html',
  styleUrls: ['./chips-with-textbox-page.component.scss']
})
export class ChipsWithTextboxPageComponent implements OnInit {

  public myForm: FormGroup;
  public aliases: string[] = [];

  // Separator keys (for handling different ways to separate the chips)
  public separatorKeysCodes: number[] = [ENTER, COMMA];

  public constructor(private formBuilder: FormBuilder) {   }

  public ngOnInit(): void {
    // Initialize the form
    this.myForm = this.formBuilder.group({
      threeCharCode: [null, Validators.required ],
      countryName:   [null, Validators.required],
      aliases:       [null, Validators.required],
      isCosc:        [null, Validators.required]
    });

  }

  public resetClicked(): void {
    // Reset the array of aliases
    this.aliases = [];

    // Reset the form
    this.myForm.reset();
  }



  public submitClicked(): void {
    // Touch all form fields (to show any errors)
    this.myForm.markAllAsTouched();

    if (this.myForm.invalid) {
      // There are form validations.  So, stop here
      return;
    }
  }



  /*
   * The user pressed Enter or Comma in the chip textbox
   *  1) Store the alias in the array of aliases
   *  2) Clear the text box (so the user can enter another alias)
   *  3) Mark this form as dirty (so the hint is not visible)
   */
  public addAlias(event: MatChipInputEvent): void {
    const input: MatChipInput = event.chipInput;
    const value: string = event.value.trim();

    if (value) {
      // Add the alias to the array
      this.aliases.push(value);

      // Sync the class variable this.aliases with the form field
      this.myForm.controls.aliases.setValue(this.aliases);
    }

    if (input) {
      // Clear the text box
      input.inputElement.value = '';
    }

    // Make this form field as dirty (to hide the hint)
    this.myForm.controls.aliases.markAsDirty();
  }


  /*
   * The user wishes to remove an alias
   *  1) Remove the alias item from the array
   *  2) Sync the class variable with the form field
   */
  public removeAlias(aArrayIndexToRemove: number): void {
    if (aArrayIndexToRemove < 0) {
      // The array index is invalid.  So, stop here.
      return;
    }

    // Remove this element from the array
    this.aliases.splice(aArrayIndexToRemove, 1);

    // Sync the class variable this.aliases with the form field
    this.myForm.controls.aliases.setValue(this.aliases);
  }

}
