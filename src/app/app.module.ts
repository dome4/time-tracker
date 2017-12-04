import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ClockComponent } from './clock/clock.component';
import { GooglesheetComponent } from './googlesheet/googlesheet.component';
import { HttpClientModule } from '@angular/common/http';
import { GoogleDocsService } from './googlesheet/google-docs.service';
import { NavComponent } from './nav/nav.component';


@NgModule({
  declarations: [
    AppComponent,
    ClockComponent,
    GooglesheetComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [GoogleDocsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
