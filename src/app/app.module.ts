import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
//import { AppComponent } from './app.component';
import { App } from './app';
//import { SharedModule } from './shared/shared.module';
import { NgbDateAdapter, NgbDateNativeAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { ToastrModule } from 'ngx-toastr';
//import { MaterialModuleModule } from './materialModule/material-module/material-module.module';
import { CommonModule } from '@angular/common';
//import { ColorPickerService, ColorPickerModule } from 'ngx-color-picker';
import { HttpClientModule } from '@angular/common/http';
// import { HttpInterceptorProviders } from '@hotelier/src/misdep/interceptors';
// import { CustomDateFormatter } from '@mis/helpers/date-formatter.helper';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  // declarations: [App],
  // imports: [
  //   FontAwesomeModule,
  //   CommonModule,
  //   BrowserModule,
  //   AppRoutingModule,
  //   SharedModule,
  //   HttpClientModule,
  //   NgbModule,
  //   BrowserAnimationsModule,
  //   ToastrModule.forRoot({
  //   }),
  //   MaterialModuleModule,
  //   ColorPickerModule,
  // ],
  providers: [
    {provide: NgbDateAdapter, useClass: NgbDateNativeAdapter},
    // { provide: NgbDateParserFormatter, useClass: CustomDateFormatter },
    // ColorPickerService,
    // ...HttpInterceptorProviders
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
//  bootstrap: [App]
})
export class AppModule { }
