import { Component } from '@angular/core';
 import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-service',
  // standalone: true,
  // imports: [RouterOutlet],
  templateUrl: './gallery.component.html',
   styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  message = 'Welcome to the New Page';
}

