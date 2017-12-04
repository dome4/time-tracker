import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {GoogleDocsService} from './google-docs.service';
import {Topic} from '../shared/topic.model';

@Component({
  selector: 'app-googlesheet',
  templateUrl: './googlesheet.component.html',
  styleUrls: ['./googlesheet.component.css'],
  providers: []
})
export class GooglesheetComponent implements OnInit {

  public topics: Topic[];

  constructor(private gapiServerice: GoogleDocsService, private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.topics = this.gapiServerice.getTopics();

    // update topics if service updates them
    this.gapiServerice.topic$.subscribe(
      (topics: Topic[]) => {
        this.topics = topics;

        // detect changes when topics data received
        this.changeDetector.detectChanges();
      }
    );
  }

  signIn(): void {
    console.log('signed in');
  }

  signOut(): void {
    console.log('signed out');
  }

  highlightNeededTime(topic: Topic): object {
    if (topic.neededTimeVsEstimatedTime()) {
      return {'color' : 'red'};
    } else {
      return {'color' : 'green'};
    }
  }
}
