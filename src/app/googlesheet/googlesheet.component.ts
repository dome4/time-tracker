import { Component, OnInit } from '@angular/core';
import {GoogleDocsService} from './google-docs.service';
import {Topic} from '../clock/topic.model';

@Component({
  selector: 'app-googlesheet',
  templateUrl: './googlesheet.component.html',
  styleUrls: ['./googlesheet.component.css'],
  providers: [GoogleDocsService]
})
export class GooglesheetComponent implements OnInit {

  public topics: Topic[];

  constructor(private gapiServerice: GoogleDocsService) {}

  ngOnInit(): void {
    this.topics = this.gapiServerice.getTopics();
  }

  signIn(): void {
    console.log('signed in');
  }

  signOut(): void {
    console.log('signed out');
  }
}
