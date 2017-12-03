import {Topic} from '../clock/topic.model';
import {environment} from '../../environments/environment';

// Google API variable
declare let gapi: any;

export class GoogleDocsService {

  private topics: Topic[];
  private spreadsheetId: string;
  private spreadsheetRange: string;

  constructor() {
    this.initialize();
  }

  initialize() {
    this.spreadsheetId = '105iGnPdzCthLGRrzu1Ve9hM2fTGrkdcAgA0j1EdEcIQ';
    this.spreadsheetRange = 'Inputpaper!A2:E';

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
    }).then(function(response) {
      const range = response.result;
      if (range.values.length > 0) {

        for (let i = 0; i < range.values.length; i++) {
          const row = range.values[i];
          // Print columns A and E, which correspond to indices 0 and 4.
          console.log(row[0] + ', ' + row[4]);
        }
      } else {
        console.log('No data found.');
      }
    }, function(response) {
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

  getTopics(): Topic[] {
    return this.topics;
  }

}
