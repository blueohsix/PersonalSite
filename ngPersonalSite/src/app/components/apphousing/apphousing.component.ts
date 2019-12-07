import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apphousing',
  templateUrl: './apphousing.component.html',
  styleUrls: ['./apphousing.component.css']
})
export class ApphousingComponent implements OnInit {
// OneHundredQuestions
  onehundredquestions = 'http://www.caseyasher.info/apps/OneHundredQuestions/'; // development
  // onehundredquestions = '/apps/OneHundredQuestions/'; // deployed
  ohqgit = 'https://github.com/blueohsix/OneHundredQuestions';
// EventTracker
  eventtracker = 'http://www.caseyasher.info/apps/EventTracker/'; // development
  // eventtracker = '/apps/EventTracker/'; // deployed
  etgit = 'https://github.com/blueohsix/EventTrackerProject';
// MVC Film Site
  mvcfilmsite = 'http://www.caseyasher.info/apps/MVCFilmSite/'; // development
  // mvcfilmsite = '/apps/MVCFilmSite'; // deployed
  mvcgit = 'https://github.com/ckl2007/SpringMVCFilmCRUD';

  constructor() { }

  ngOnInit() {
  }

}
