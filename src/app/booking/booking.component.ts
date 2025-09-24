import { Component, signal } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { ContactsService } from '../../api/services/contacts.service';
import { IContacts } from '../../api/interfaces/contacts.interface';
import { IMultiresult, IResponse } from '../../mis/interfaces/responseobjects.interface';
import { Contacts } from '@api/models/contacts.model';

@Component({
  selector: 'app-booking',
  standalone: true,
  //  imports: [RouterOutlet],
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent {
  //  message = 'Welcome to the New Page';
  data = {
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+91',
    phone: '',
    altphone: '',
  };

  isLoadingContacts = signal(false);
  contacts: IContacts[] = [];

  constructor(private router: Router, private contactService: ContactsService) {}

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.isLoadingContacts.set(true);
    this.contactService
      .getAll({
        search: '',
        searchColumns: 'first_name,last_name',
      })
      .subscribe((dataResponse: IResponse<IMultiresult<IContacts>>) => {
        if (dataResponse.status) {
          this.contacts = dataResponse.data?.records as IContacts[];
          console.log(this.contacts);
        }
        this.isLoadingContacts.set(false);
      });
  }

  allowOnlyNumbers(event: KeyboardEvent) {
    const charCode = event.charCode;
    // Allow only digits (0–9)
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  blockPaste(event: ClipboardEvent) {
    event.preventDefault(); // stop pasting anything
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
            this.router.navigate(['/booking/booking-details']);
          } else {
            console.error('Error creating contact', dataResponse.error);
          }
        });

      // alert("Form submitted successfully!");
    } else {
      // alert("Please fill all required fields.");
      let messages: string[] = [];

      if (messages.length > 0) {
        alert(messages.join('\n'));
      }
    }
  }
}
