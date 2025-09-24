import { Component } from '@angular/core';
import { Router,RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-about-us',
  // standalone: true,
//  imports: [RouterOutlet],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutusComponent {
 public rate = "";
  public count = 0;

  data = {
    data1: 'About us'
  }

  // heightFunction() {
  //   return "150px"
  // }

  // rateCalculate() {
  //   this.rate = "1500";
  // }

  // increment() {
  //   this.count+= 1;
  // }

  // decrement() {
  //   this.count-= 1;
  // }

  constructor(private router: Router) { }

  //   onButtonClick() {
  //   //  alert('Button clicked!');
  //   this.router.navigate(['/new-page']);
  // }
}

