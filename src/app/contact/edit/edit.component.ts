import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IContacts } from '@api/interfaces/contacts.interface';
import { ContactsService } from '@api/services/contacts.service';
//import { ActionService } from '@mis/services/action.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit',
  standalone: true,
  //  imports: [RouterOutlet],
//  imports: [FormsModule],
 imports: [
   CommonModule,
    ReactiveFormsModule,  // 🔑 required
    FormsModule,          // optional
    NgbModule,
  //  NgSelectModule
  ],
  templateUrl: './edit.component.html',
  // styleUrls: ['./edit.component.scss'],
  //  providers: [NgbActiveModal]   //
})
export class EditComponent {
//  @Input() contactdata!: IContacts;

  @Input() contactdata: any;
  action = 'Create';
  dataForm!: FormGroup;

  constructor(public activeModal: NgbActiveModal, private contactService: ContactsService,  private fb: FormBuilder) {}

   ngOnInit() {
    this.initForm();
    if (this.contactdata) {
      this.action = 'Edit';
      this.dataForm.patchValue(this.contactdata);
    }
  }

   initForm() {
    this.dataForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      wa_id: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.dataForm.valid) {
      const formData = this.dataForm.value;

      // 🔹 Replace with API create/update call
      if (this.contactdata) {
        console.log('Update contact:', formData);
      } else {
        console.log('Create new contact:', formData);
      }

      this.activeModal.close(true); // return success
    }
  }

  dismiss() {
    this.activeModal.dismiss();
  }

}
