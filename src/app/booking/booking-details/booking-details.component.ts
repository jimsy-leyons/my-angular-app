import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-booking-details',
   standalone: true,
//  imports: [RouterOutlet],
  imports: [CommonModule, FormsModule],
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingdetailsComponent {
  //  message = 'Welcome to the New Page';
    data = {
  
  }


  onSubmit(form: NgForm) {
    if (form.valid) {
      // alert("Form submitted successfully!");
     // this.router.navigate(['/booking/booking-details']);
      console.log(this.data);
      form.resetForm();
    }
    else {
      // alert("Please fill all required fields.");
      let messages: string[] = [];

      if (messages.length > 0) {
        alert(messages.join("\n"));
      }
    }
  }
}

