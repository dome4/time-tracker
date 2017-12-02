import { Component, OnInit } from '@angular/core';
import {GoogleDocsService} from './google-docs.service';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css'],
  providers: [GoogleDocsService]
})
export class ClockComponent implements OnInit {

  constructor(private googleService: GoogleDocsService) { }

  ngOnInit() {
  }

}
