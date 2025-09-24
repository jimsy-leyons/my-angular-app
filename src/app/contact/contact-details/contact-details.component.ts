import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { IContacts } from '@api/interfaces/contacts.interface';
import { Contacts } from '@api/models/contacts.model';
import { ContactsService } from '@api/services/contacts.service';
//import { ActionService } from '@mis/services/action.service';
import { IMultiresult, IResponse } from '@mis/interfaces/responseobjects.interface';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
//import { AutotoastrService } from '@mis/services/autotoastr.service';

@Component({
  selector: 'app-contact-details',
  standalone: true,
  // imports: [RouterOutlet],
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactdetailsComponent {
  contact: any;
  dataSource: IContacts[] = [];

  constructor(private router: Router, private contactService: ContactsService) {
    const navigation = this.router.getCurrentNavigation();
    this.contact = navigation?.extras?.state?.['contact']; // retrieve data
    console.log('Received contact:', this.contact);
  }

  // onEdit(contact: IContacts) {
  //   console.log('Editing contact:', contact);

  //   const updatedContact: IContacts = {
  //     ...contact,
  //     updated_at: new Date().toISOString(), // 👈 if your API expects an updated timestamp
  //   };

  //   this.contactService
  //     .update(this.contact._id, updatedContact) // 👈 assuming your service has update(id, data)
  //     .subscribe((response: IResponse<IContacts>) => {
  //       if (response.status) {
  //         console.log('Contact updated successfully:', response.data);
  //         alert('Contact updated successfully');
  //       } else {
  //         console.error('Update failed:', response.error);
  //       }
  //     });
  // }

  onSubmit(form: NgForm) {
    if (form.valid) {
      let dataformvalue = form.value;

      console.log(dataformvalue);

      const updatedContact = {
        ...this.contact, // existing contact fields
        updated_at: formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en'), // current datetime
      };

      this.contactService
        .update(this.contact._id, updatedContact)
        .subscribe((dataResponse: IResponse<IContacts>) => {
          if (dataResponse.status) {
            console.log('Contact update successfully', dataResponse.data);
            form.resetForm();
          } else {
            console.error('Error update contact', dataResponse.error);
          }
        });
    } else {
      let messages: string[] = [];
      if (messages.length > 0) {
        alert(messages.join('\n'));
      }
    }
  }

  onDelete(contact: IContacts) {
    if (confirm(`Are you sure you want to delete ${contact.first_name} ${contact.last_name}?`)) {
      this.contactService;
      //   this.contactService.softDelete(contact?._id as number).subscribe((dataResponse: IResponse<any>) => {
      this.contactService
        .delete(contact._id as number)
        .subscribe((dataResponse: IResponse<any>) => {
          if (dataResponse.status) {
            // this.dataSource.splice(index,1);
            // console.log('Contact deleted successfully');
            alert('Contact deleted successfully');
            this.contact = null; // clear from view after delete
          } else {
            //   console.error('Delete failed:', dataResponse.error);
            alert('Failed to delete contact');
          }
        });
    }
  }

  // onDelete(contact: IContacts,index:number) {
  //     this.actionService.confirm("Room category", "Are you sure you want to delete this room category?", 'error').subscribe((result) => {
  //       if (result.isConfirmed) {
  //         this.recordService.softDelete(metaData?.id as number).subscribe((dataResponse: IResponse<any>) => {
  //           if (dataResponse.status) {
  //             this.dataSource.splice(index,1);
  //             this.autoToastrService.notifySuccess("Room category deleted successfully", "Room category");
  //           } else {
  //             this.autoToastrService.notifyError("Failed to delete room category", "Room category");
  //           }
  //         })
  //       }
  //     })
  //   }
}
