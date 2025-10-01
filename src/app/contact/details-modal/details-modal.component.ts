import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactsService } from '@api/services/contacts.service';
//import { ActionService } from '@mis/services/action.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IResponse } from '@mis/interfaces/responseobjects.interface';
import { IContacts } from '@api/interfaces/contacts.interface';

@Component({
  selector: 'app-details-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // 🔑 required
    FormsModule, // optional
  ],
  templateUrl: './details-modal.component.html',
})
export class DetailsModalComponent {

  @Input() contactData: any;
  action = 'Create';
  dataForm!: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private contactService: ContactsService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.initForm();
    if (this.contactData) {
      this.action = 'Edit';
      this.dataForm.patchValue(this.contactData);
    }
  }

  initForm() {
    this.dataForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      wa_id: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.dataForm.valid) {
      const formData = this.dataForm.value;

      // 🔹 Replace with API create/update call
      if (this.contactData) {
        formData._id = this.contactData._id;
      this.contactService.update(this.contactData._id,formData).subscribe((dataREsponse:IResponse<IContacts>)=>{
        if(dataREsponse.status){
          this.dismiss(dataREsponse.data);
        }
      })
      } else {
        console.log('Create new contact:', formData);
      }

    }
  }

  dismiss(data: any = null) {
    this.activeModal.close(data);
  }
}
