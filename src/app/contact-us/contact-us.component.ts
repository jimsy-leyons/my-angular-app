import { Component } from '@angular/core';
import { Router,RouterOutlet } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
//import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-us',
   standalone: true,
  //imports: [RouterOutlet],
   //imports: [CommonModule,FormsModule, RouterOutlet], 
   imports: [CommonModule,FormsModule], 
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})

// @NgModule({
//   declarations: [ContactusComponent],
//   imports: [BrowserModule, FormsModule], // ✅ Add FormsModule here
//   bootstrap: [AppComponent]
// })

export class ContactusComponent {
//  public rate = "";
//   public count = 0;

  data = {
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+91',
    phone: ''
  }

  constructor(private router: Router) { }

  //   onButtonClick() {
  //    alert('Button clicked!');
  //   // this.router.navigate(['/new-page']);
  // }
  onSubmit(form: NgForm) {
  if (form.valid) {
    alert("Form submitted successfully!");
    console.log(this.data);
    form.resetForm();
   }
   else {
    // alert("Please fill all required fields.");
    let messages: string[] = [];

    // if (form.controls['firstName']?.errors?.['required']) {
    //   messages.push("First Name is required");
    // }

    // if (form.controls['lastName']?.errors?.['required']) {
    //   messages.push("Last Name is required");
    // }

    // if (form.controls['email']?.errors?.['required']) {
    //   messages.push("Email is required");
    // } else if (form.controls['email']?.errors?.['email']) {
    //   messages.push("Enter a valid email");
    // }
    if (messages.length > 0) {
      alert(messages.join("\n"));
    }
  }
}
}

