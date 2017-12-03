import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

declare let gapi: any;

@Component({
  selector: 'app-googlesheet',
  templateUrl: './googlesheet.component.html',
  styleUrls: ['./googlesheet.component.css']
})
export class GooglesheetComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.initialize();
  }


  initialize(): Promise<any> {
    return new Promise((resolve, reject) => {
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

              // authorizeButton.onclick = handleAuthClick;
              // signoutButton.onclick = handleSignoutClick;
            }, (error) => {
              console.log('GoogleAuth: ' + error);
            });
          });
        });
    });
  }

  updateSigninStatus(isSignedIn: boolean): void {
    // When signin status changes, this function is called.
    // If the signin status is changed to signedIn, we make an API call.
    if (isSignedIn) {
      this.makeApiCall();
    }

  }

  makeApiCall(): void {
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '105iGnPdzCthLGRrzu1Ve9hM2fTGrkdcAgA0j1EdEcIQ',
      range: 'Inputpaper!A2:E',
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
  signIn(event) {
    // Ideally the button should only show up after gapi.client.init finishes, so that this
    // handler won't be called before OAuth is initialized.
    gapi.auth2.getAuthInstance().signIn();
  }

/*  function handleSignOutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
  }*/



  /*  signIn(): Promise<any> {
      return new Promise((resolve, reject) => {
        const promise = this.auth2.signIn();

        promise.then(() => {
          // console.log(this.auth2.currentUser.get().getBasicProfile());

        });
      });
    }

    signOut(): Promise<any> {
      return new Promise((resolve, reject) => {
        this.auth2.signOut().then((err: any) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    }*/


  /**
   *  add script tag to head
   * @param {string} id
   * @param {string} src
   * @param onload
   */
  loadScriptOnHead(id: string, src: string, onload: any): void {
    if (document.getElementById(id)) { return; }

    const signInJS = document.createElement('script');
    signInJS.async = true;
    signInJS.src = src;
    signInJS.onload = onload;
    document.head.appendChild(signInJS);
  }

}
