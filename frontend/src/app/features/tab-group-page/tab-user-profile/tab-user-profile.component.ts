import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-tab-user-profile',
  templateUrl: './tab-user-profile.component.html',
  styleUrls: ['./tab-user-profile.component.scss']
})
export class TabUserProfileComponent implements OnInit {

  public ngOnInit(): void {
    console.log('Loading TabUserProfileComponent');
  }

}
