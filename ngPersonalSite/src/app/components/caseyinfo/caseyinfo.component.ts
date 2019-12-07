import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-caseyinfo',
  templateUrl: './caseyinfo.component.html',
  styleUrls: ['./caseyinfo.component.css']
})
export class CaseyinfoComponent implements OnInit {
  linkedin = 'https://www.linkedin.com/in/caseyasher/';
  github = 'https://github.com/blueohsix';

  constructor() { }

  ngOnInit() {
  }

}
