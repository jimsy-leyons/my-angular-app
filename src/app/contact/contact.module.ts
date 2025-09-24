import { Component, signal } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { IContacts } from '@api/interfaces/contacts.interface';
import { ContactsService } from '@api/services/contacts.service';
import { ContactsFilter } from '@api/models/contacts.model';
import { IMultiresult, IResponse } from '@mis/interfaces/responseobjects.interface';
import { Contacts } from '@api/models/contacts.model';
import { formatDate } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactComponent } from './contact.component';


@NgModule({
  declarations: [
   // ContactComponent,
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
