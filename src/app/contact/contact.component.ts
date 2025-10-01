import { Component, signal } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IContacts } from '@api/interfaces/contacts.interface';
import { ContactsService } from '@api/services/contacts.service';
import { ContactsFilter } from '@api/models/contacts.model';
import { IMultiresult, IResponse } from '@mis/interfaces/responseobjects.interface';
import { Contacts } from '@api/models/contacts.model';
import { CommonModule, formatDate } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailsModalComponent } from './details-modal/details-modal.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  isLoadingContacts = signal(false);
  //recordData!: IContacts;
  recordDetails: IContacts[] = [];
  recordFilter: ContactsFilter = {};
  recordData: any[] = [];
  contact: any;
  pageSize = 20;
  pageIndex = 1;
  resultsLength: number = 100; // total number of items
  totalPages: number = 1;
  paginatedContacts: IContacts[] = [];

  constructor(
    private router: Router,
    private contactService: ContactsService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getContacts();
  }

  updatePaginatedContacts() {
    const start = (this.pageIndex - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedContacts = this.recordDetails.slice(start, end);
    this.resultsLength = this.recordDetails.length; // total records
  }

  pageChanged() {
    this.updatePaginatedContacts();
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
          this.updatePaginatedContacts(); // update pagination array
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
    }
  }

  onEdit(contact: any) {
    const modalRef = this.modalService.open(DetailsModalComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.contactData = { ...contact }; // pass data

    modalRef.result
      .then((updatedContact) => {
        if (updatedContact) {
          this.getContacts();
        }
      })
      .catch(() => {});
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

  onDelete(contact: IContacts) {
    if (confirm(`Are you sure you want to delete ${contact.first_name} ${contact.last_name}?`)) {
      this.contactService;
      // this.contactService.softDelete(contact?._id as number).subscribe((dataResponse: IResponse<any>) => {
      this.contactService
        .delete(contact._id as number)
        .subscribe((dataResponse: IResponse<any>) => {
          if (dataResponse.status) {
            // this.dataSource.splice(index,1);
            // console.log('Contact deleted successfully');
            alert('Contact deleted successfully');
            this.getContacts();
            this.contact = null; // clear from view after delete
          } else {
            alert('Failed to delete contact');
          }
        });
    }
  }

  viewDetails(contact: any) {
     const encodedId = encodeURIComponent(contact._id.toString());
    this.router.navigate(['/contact/detail-contact', contact._id]);
  }
}
