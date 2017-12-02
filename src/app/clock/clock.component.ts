import { Component, OnInit } from '@angular/core';
import {GoogleDocsService} from './google-docs.service';
import {ClockService} from './clock.service';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css'],
  providers: [GoogleDocsService, ClockService]
})
export class ClockComponent implements OnInit {

  constructor(private googleService: GoogleDocsService, private clock: ClockService) { }

  ngOnInit() {
  }

  startClock () {
    this.clock.start();
  }


}
