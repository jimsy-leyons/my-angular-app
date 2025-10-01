import { Component, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { IContacts } from '@api/interfaces/contacts.interface';
import { Contacts } from '@api/models/contacts.model';
import { ContactsService } from '@api/services/contacts.service';
//import { ActionService } from '@mis/services/action.service';
import { IMultiresult, IResponse } from '@mis/interfaces/responseobjects.interface';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { CountriesService } from '@api/services/countries.service';
import { CountriesFilter } from '@api/models/countries.model';
import { ADMIN_STATUS, GENERAL_STATUS } from '@api/enums';
import { SortItem } from '@api/models/common/filter.model';
import { ICountries } from '@api/interfaces/countries.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
//import { AutotoastrService } from '@mis/services/autotoastr.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contact-details',
  standalone: true,
  // imports: [RouterOutlet],
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactdetailsComponent {
  contact: any;
  dataSource: IContacts[] = [];

  //dataForm: FormGroup;
  isLoadingCountry = false;
  // isLoadingContacts = signal(false);

  country: ICountries[] = [];

  constructor(
    private router: Router,
    private contactService: ContactsService,
    private countryService: CountriesService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
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

  ngOnInit() {
    this.getCountries();
  }

  async searchCountry(event: any) {
    if (event?.term && event.term.length > 0) {
      this.getCountries(event?.term);
    }
  }

  async getCountries(search = '') {
    this.isLoadingCountry = true;
    // this.isLoadingCountry.set(true);
    let filter: CountriesFilter = {
      search: search,
      searchColumns: '_id,name',
      sort: [new SortItem('name', 'ASC')],
      pageLength: 0,
    };
    this.countryService
      .getAll(filter)
      .subscribe((dataResponse: IResponse<IMultiresult<ICountries>>) => {
        if (dataResponse?.status) {
          this.country = dataResponse?.data?.records as ICountries[];
          this.setFieldValue(this.country as any[], 'mcountry', '_id', 'mcountry_id');
          //  if (this.contact?.mcountry_id) {
          //   this.contact.mcountry = this.contact.mcountry_id;
          // }
        }
        this.isLoadingCountry = false;
        // this.isLoadingCountry.set(false);
      });
  }

  //   setFieldValue(records: any[], fieldName: string, columnName: string, recordFilterName: string, disableField = false) {
  //   if (this.contact && records?.length > 0) {
  //     let selectedRecord =
  //       records[
  //       records?.findIndex(
  //         (item) => item?.[columnName] == this.contact?.[recordFilterName]
  //       )
  //       ];
  //     // this.dataForm.get(fieldName)!.setValue(selectedRecord);
  //     // if (this.dataForm && disableField) {
  //     //   this.dataForm.get(fieldName)!.disable({ onlySelf: true });
  //     // }
  //      // Since you're using [(ngModel)], just patch the value to contact
  //   this.contact[fieldName] = selectedRecord;

  //   // if you need to disable input dynamically, handle via a flag
  //   if (disableField) {
  //     // set a flag and use [disabled] on your template input
  //     this.contact[`${fieldName}_disabled`] = true;
  //   }
  //   }
  // }

  setFieldValue(
    records: any[],
    fieldName: string,
    columnName: string,
    recordFilterName: string,
    disableField = false
  ) {
    if (this.contact && records?.length > 0) {
      let selectedRecord = records.find(
        (item) => item?.[columnName] == this.contact?.[recordFilterName]
      );

      if (selectedRecord) {
        this.contact[fieldName] = selectedRecord; // ngModel binds this to <ng-select>
      }

      // if (disableField) {
      //   this.contact[`${fieldName}_disabled`] = true;
      // }
    }
  }

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
