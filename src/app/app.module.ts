import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ClockComponent } from './clock/clock.component';
import { GooglesheetComponent } from './googlesheet/googlesheet.component';


@NgModule({
  declarations: [
    AppComponent,
    ClockComponent,
    GooglesheetComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
