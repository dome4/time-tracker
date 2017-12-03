import { Component, OnInit } from '@angular/core';

declare let gapi: any;

@Component({
  selector: 'app-googlesheet',
  templateUrl: './googlesheet.component.html',
  styleUrls: ['./googlesheet.component.css']
})
export class GooglesheetComponent implements OnInit {

  public static readonly PROVIDER_ID: string = 'GOOGLE';
  private auth2: any;
  private clientId = '362116426922-k6tv3f403jjil0rc1vuq6vcqqh5aglrr.apps.googleusercontent.com';


  constructor() { }

  ngOnInit() {
    this.initialize();
  }


  initialize(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.loadScriptOnHead('GOOGLE',
        '//apis.google.com/js/platform.js',
        () => {
          gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
              client_id: this.clientId,
              scope: 'email'
            });

            this.auth2.then(() => {
              if (this.auth2.isSignedIn.get()) {

                // ToDo output anschauen
                console.log('output: ')
                console.log(this.auth2.currentUser.get().getBasicProfile());
              }
            });
          });
        });
    });
  }


  signIn(): Promise<any> {
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
  }


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
