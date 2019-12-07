import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApphousingComponent } from './components/apphousing/apphousing.component';
import { CaseyinfoComponent } from './components/caseyinfo/caseyinfo.component';


@NgModule({
  declarations: [
    AppComponent,
    ApphousingComponent,
    CaseyinfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
