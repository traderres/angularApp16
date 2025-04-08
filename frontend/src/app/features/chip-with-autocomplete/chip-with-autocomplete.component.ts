import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AutoCompleteMatchTeamDTO} from "../../models/auto-complete-match-team-dto";
import {debounceTime, Observable, startWith, switchMap} from "rxjs";
import {ReportService} from "../../services/report.service";

@Component({
  selector: 'app-chip-with-autocomplete',
  templateUrl: './chip-with-autocomplete.component.html',
  styleUrls: ['./chip-with-autocomplete.component.scss']
})
export class ChipWithAutocompleteComponent implements OnInit {

  public myForm: FormGroup;
  public obsSearchMatchesToShow: Observable<AutoCompleteMatchTeamDTO[]>;
  public selectedTeams: AutoCompleteMatchTeamDTO[] = [];

  public constructor(private formBuilder: FormBuilder,
                     private reportService: ReportService) {}


  public ngOnInit(): void {
    // Initialize the form group
    this.myForm = this.formBuilder.group({
      startDate:     [null, null],
      endDate:       [null, null],
      teams:         [null, null],
    });


    // Listen for changes on the teams text box
    this.obsSearchMatchesToShow = this.myForm.controls.teams.valueChanges
      .pipe(
        startWith(''),
        debounceTime(50),              		// Wait 250 msecs to give the user some time to type
        switchMap((aRawQuery: string) => {      // Use switchMap for its canceling effect:  On each observable, the previous observable is canceled
          // The user has typed-in something

          // Return an observable to the search (but only return up to 5 results)
          // NOTE:  The <mat-options> tag has an async pipe that will invoke this Observable
          return this.reportService.runTeamSearch(aRawQuery, 5);
        })
      );

  }


  public resetClicked(): void {
    // Set the array of selectedTeams to an empty array
    this.selectedTeams = [];

    // Reset the form
    this.myForm.reset();
  }


  public userSelectedTeam(aSelectedTeam: AutoCompleteMatchTeamDTO) {
    if (! this.isTeamIdAlreadyInArray(aSelectedTeam.teamId)) {
      // The passed-in teamID is *NOT* found in the array

      // Add this team to the array (so the chip appears)
      this.selectedTeams.push(aSelectedTeam);
    }

    // Clear the textbox
    this.myForm.controls.teams.setValue('');
  }


  public removeTeam(aArrayIndexToRemove: number): void {
    if (aArrayIndexToRemove < 0) {
      // The array index is invalid.  So, stop here.
      return;
    }

    // Remove this element from the array
    this.selectedTeams.splice(aArrayIndexToRemove, 1);
  }


  private isTeamIdAlreadyInArray(aTeamId: number): boolean {
    let team: AutoCompleteMatchTeamDTO;

    for (team of this.selectedTeams) {
      if (aTeamId == team.teamId) {
        // I found this teamID in the list.  So, stop here.
        return true;
      }
    }

    return false;
  }


}
