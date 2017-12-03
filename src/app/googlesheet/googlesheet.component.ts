import { Component, OnInit } from '@angular/core';
import {GoogleDocsService} from './google-docs.service';
import {Topic} from '../shared/topic.model';

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

    // update topics if service updates them
    this.gapiServerice.topicsChanged.subscribe(
      (topics: Topic[]) => {
        this.topics = topics;
        console.log(topics);
      }
    );
  }

  signIn(): void {
    console.log('signed in');
  }

  signOut(): void {
    console.log('signed out');
  }
}
