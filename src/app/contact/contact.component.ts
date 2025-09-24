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

@Component({
  selector: 'app-contact',
  standalone: true,
//  imports: [RouterOutlet],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  isLoadingContacts = signal(false);
  //recordData!: IContacts;
  recordDetails: IContacts[] = [];
  recordFilter: ContactsFilter = {};
  recordData: any[] = [];

  constructor(
    private router: Router,
    private contactService: ContactsService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.isLoadingContacts.set(true);
    this.contactService
      .getAll({
        // search: '',
        // searchColumns: 'first_name,last_name',
      })
      .subscribe((dataResponse: IResponse<IMultiresult<IContacts>>) => {
        if (dataResponse.status) {
          this.recordDetails = dataResponse.data?.records as IContacts[];
          console.log(this.recordDetails);
        }
        this.isLoadingContacts.set(false);
      });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      let dataformvalue = form.value;

      console.log(dataformvalue);

      let contactFormDAta: Contacts = {
        first_name: dataformvalue.firstName,
        last_name: dataformvalue.lastName,
        email: dataformvalue.email,
        created_at: formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en'),
        vendors__id: 19,
        countries__id: 99,
      };

      this.contactService
        .create(contactFormDAta)
        .subscribe((dataResponse: IResponse<IContacts>) => {
          if (dataResponse.status) {
            console.log('Contact created successfully', dataResponse.data);
            form.resetForm();
            // this.router.navigate(['/booking/booking-details']);
          } else {
            console.error('Error creating contact', dataResponse.error);
          }
        });
    } else {
      let messages: string[] = [];

      // if (messages.length > 0) {
      //   alert(messages.join('\n'));
      // }
    }
  }

  onEdit(contact: any) {
    console.log('Editing contact:', contact);
    this.router.navigate(['/contact/contact-details'], {
    state: { contact }
     });
    // const modalRef = this.modalService.open(EditComponent, { backdrop: 'static', size: 'lg' });
    // modalRef.componentInstance.contactdata = contact;

    // modalRef.result.then((result) => {
    //   if (result) {
    //     // if (!compareObjects(result, this.recordFilter)) {
    //     this.recordFilter = result;
    //     this.getContacts();
    //     //  }
    //   }
    // });
  }

  // onDelete(contactId: number) {
  //   if (confirm('Are you sure you want to delete this contact?')) {
  //     this.contactService
  //       .delete(contactId) // make sure your service has delete(id: number)
  //       .subscribe((dataResponse: IResponse<IContacts>) => {
  //         if (dataResponse.status) {
  //           console.log('Contact deleted successfully');
  //           this.recordDetails = this.recordDetails.filter((c) => c._id !== contactId);
  //         } else {
  //           console.error('Error deleting contact', dataResponse.error);
  //         }
  //       });
  //   }
  // }
}
