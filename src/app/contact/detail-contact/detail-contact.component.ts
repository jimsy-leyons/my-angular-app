import { Component, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { IContacts } from '@api/interfaces/contacts.interface';
import { Contacts } from '@api/models/contacts.model';
import { ContactsService } from '@api/services/contacts.service';
import { CommonModule } from '@angular/common';
import { IResponse } from '@mis/interfaces/responseobjects.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailsModalComponent } from '../details-modal/details-modal.component';
import { ICountries } from '@api/interfaces/countries.interface';
import { CountriesFilter } from '@api/models/countries.model';
import { CountriesService } from '@api/services/countries.service';
import { IVendors } from '@api/interfaces/vendors.interface';
import { VendorsService } from '@api/services/vendors.service';

@Component({
  selector: 'app-floors',
  // standalone: true,
  imports: [CommonModule],
  //  imports: [RouterOutlet],
  templateUrl: './detail-contact.component.html',
  styleUrls: ['./detail-contact.component.scss'],
})
export class DetailsContactComponent {
  recordId!: number;
  countryId!: number;
  vendorId!: number;
  recordDetails!: IContacts;
  isLoading = signal(false);
  contact: any;

  countryDetails!: ICountries;
  isLoadingCountry = signal(false);
  vendorDetails!: IVendors;
  isLoadingVendor = signal(false);

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private contactService: ContactsService,
    private countryService: CountriesService,
    private vendorService: VendorsService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    const encodedId = this.activatedRoute.snapshot.paramMap.get('id');

    if (encodedId) {
      this.recordId = Number(decodeURIComponent(encodedId));
      if (!isNaN(this.recordId)) {
        this.getRecordDetails();
      } else {
        console.error('Invalid record ID:', encodedId);
      }
    }
  }

  getRecordDetails() {
    this.isLoading.set(true);
    this.contactService.getDetails(this.recordId).subscribe({
      next: (dataResponse: IResponse<IContacts>) => {
        if (dataResponse?.status) {
          this.recordDetails = dataResponse.data as IContacts;
          this.isLoading.set(false);
          console.log('✅ Loaded contact:', this.recordDetails);

          if (this.recordDetails.countries__id) {
            this.countryId = this.recordDetails.countries__id;
            this.getCountryDetails();
          }

          if (this.recordDetails.vendors__id) {
            this.vendorId = this.recordDetails.vendors__id;
            this.getvendorDetails();
          }
        } else {
          console.warn('⚠️ No data found');
        }
      },
      error: (err) => {
        console.error('❌ Error fetching contact:', err);
        this.isLoading.set(false);
      },
    });
  }

  getCountryDetails() {
    this.isLoadingCountry.set(true);
    this.countryService.getDetails(this.countryId).subscribe({
      next: (dataResponse: IResponse<ICountries>) => {
        if (dataResponse?.status) {
          this.countryDetails = dataResponse.data as ICountries;
          this.isLoadingCountry.set(false);
          console.log('✅ Loaded country:', this.countryDetails);
        } else {
          console.warn('⚠️ No data found');
        }
      },
      error: (err) => {
        console.error('❌ Error fetching country:', err);
        this.isLoading.set(false);
      },
    });
  }

    getvendorDetails() {
    this.isLoadingVendor.set(true);
    this.vendorService.getDetails(this.vendorId).subscribe({
      next: (dataResponse: IResponse<IVendors>) => {
        if (dataResponse?.status) {
          this.vendorDetails = dataResponse.data as IVendors;
          this.isLoadingVendor.set(false);
          console.log('✅ Loaded Vendor:', this.vendorDetails);
        } else {
          console.warn('⚠️ No data found');
        }
      },
      error: (err) => {
        console.error('❌ Error fetching vendor:', err);
        this.isLoading.set(false);
      },
    });
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
          this.getRecordDetails();
        }
      })
      .catch(() => {});
  }

  onDelete(contact: IContacts) {
    if (confirm(`Are you sure you want to delete ${contact.first_name} ${contact.last_name}?`)) {
      this.contactService;
      // this.contactService.softDelete(contact?._id as number).subscribe((dataResponse: IResponse<any>) => {
      this.contactService
        .delete(contact._id as number)
        .subscribe((dataResponse: IResponse<any>) => {
          if (dataResponse.status) {
            alert('Contact deleted successfully');
            this.getRecordDetails();
            this.contact = null; // clear from view after delete
          } else {
            alert('Failed to delete contact');
          }
        });
    }
  }
}
