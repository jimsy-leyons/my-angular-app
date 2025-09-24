import { Component } from '@angular/core';
 import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-page',
  // standalone: true,
  // imports: [RouterOutlet, RouterLink],
   imports: [RouterLink],
  templateUrl: './new-page.component.html',
  //styleUrl: './new-page.component.scss'
   styleUrls: ['./new-page.component.scss']
})
export class NewPageComponent {
  message = 'Welcome to the New Page 🚀';
}

