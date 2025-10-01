import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactComponent } from './contact.component';


@NgModule({
  declarations: [
   // EditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    ContactComponent,
  ]
})
export class ContactsModule {}
