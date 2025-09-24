//import { Component } from '@angular/core';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
//import { Router} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  //imports: [RouterOutlet, CommonModule],
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
// export class HomePageComponent {
// logoPath = 'assets/images/image.png';
// }

export class HomePageComponent implements OnInit, OnDestroy {
  images: string[] = [
    'assets/images/image.png',
    'assets/images/contacts.jpg'
  ];
  currentIndex: number = 0;
  intervalId: any;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.cdr.detectChanges();
    }, 2000); // changes every 4 seconds
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
