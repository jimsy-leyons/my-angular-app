import { Component } from '@angular/core';
 import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-service',
  // standalone: true,
   //imports: [RouterOutlet],
  templateUrl: './service.component.html',
   styleUrls: ['./service.component.scss']
})
export class ServivceComponent {
  message = 'Welcome to the New Page';
}

