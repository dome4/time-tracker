import {Topic} from '../shared/topic.model';
import {environment} from '../../environments/environment';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

// Google API variable
declare let gapi: any;

export class GoogleDocsService {

  private topics: Topic[] = [];
  private spreadsheetId: string;
  private spreadsheetRange: string;
  public topic$ = new BehaviorSubject<Topic[]>(this.getTopics());

  constructor() {
    this.initialize();
  }

  initialize() {
    this.spreadsheetId = '105iGnPdzCthLGRrzu1Ve9hM2fTGrkdcAgA0j1EdEcIQ';
    this.spreadsheetRange = 'Agenda 28.11.17!A3:D';

    this.loadScriptOnHead('GOOGLE',
      'https://apis.google.com/js/api.js',
      () => {
        gapi.load('client:auth2', () => {
          gapi.client.init({
            apiKey: environment.apiKey,
            discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
            client_id: environment.googleClientID,
            scope: 'https://www.googleapis.com/auth/spreadsheets.readonly'
          }).then(() => {

            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

            // Handle the initial sign-in state.
            this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          }, (error) => {
            console.log('GoogleAuth: ' + error);
          });
        });
      });
  }

  updateSigninStatus(isSignedIn: boolean): void {
    // When signin status changes, this function is called.
    // If the signin status is changed to signedIn, we make an API call.
    if (isSignedIn) {
      this.makeGSheetApiCall();
    }

  }

  makeGSheetApiCall(): void {

    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: this.spreadsheetRange,
    }).then(
      (response) => {
      const range = response.result;
      if (range.values.length > 0) {
        // clear current topics
        const topics = [];

        // save data to topics array
        for (let i = 0; i < range.values.length; i++) {
          const row = range.values[i];

          // check undefinded values
          if (row[1] !== undefined && row[3] !== undefined) {

            // topic is in column B, time in column D
            // values in google sheet are minutes -> convert to millis
            topics.push(new Topic(row[1], (row[3] * 60 * 1000)));
          }
        }

        // set new topics
        this.topics = topics;

        // emit event to update topic rendering
        this.topic$.next(this.getTopics());

      } else {
        console.log('No data found.');
      }
    }, (response) => {
      console.log('Error: ' + response.result.error.message);
    });
  }


// ToDo sign in / out function
  signIn() {
    // Ideally the button should only show up after gapi.client.init finishes, so that this
    // handler won't be called before OAuth is initialized.
    gapi.auth2.getAuthInstance().signIn();
  }

  /*  function handleSignOutClick(event) {
      gapi.auth2.getAuthInstance().signOut();
    }*/

  /**
   *  add script tag to head
   * @param {string} id
   * @param {string} src
   * @param onload
   */
  loadScriptOnHead(id: string, src: string, onload: any): void {

    // check if element already exists
    if (document.getElementById(id)) {
      return;
    }

    const signInJS = document.createElement('script');
    signInJS.async = true;
    signInJS.src = src;
    signInJS.onload = onload;
    document.head.appendChild(signInJS);
  }

  setSpreadsheetId(spreadsheetId: string) {
    this.spreadsheetId = spreadsheetId;
  }

  setSpreadsheetRange(spreadsheetRange: string) {
    this.spreadsheetRange = spreadsheetRange;
  }

  /**
   *  return a real copy of the topics array
   * @returns {Topic[]}
   */
  getTopics(): Topic[] {
    return this.topics.slice();
  }
}
