//import { Routes } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { App } from './app';
import { NewPageComponent } from './new-page/new-page.component';
import { HomePageComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { AboutusComponent } from './about-us/about-us.component';
import { ContactusComponent } from './contact-us/contact-us.component';
import { ServivceComponent } from './service/service.component';
import { GalleryComponent } from './gallery/gallery.component';
import { CategoriesComponent } from './room/categories/categories.component';
import { FloorsComponent } from './room/floors/floors.component';
import { RoomsComponent } from './room/rooms/rooms.component';
import { BookingComponent } from './booking/booking.component';
import { BookingdetailsComponent } from './booking/booking-details/booking-details.component';
import { ContactComponent } from './contact/contact.component';
import { ContactdetailsComponent } from './contact/contact-details/contact-details.component';
import { DetailsContactComponent } from './contact/detail-contact/detail-contact.component';

export const routes: Routes = [
  // { path: '', component: App },
  {
    path: '',
    // component: App,
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'aboutus', component: AboutusComponent },
      { path: 'contactus', component: ContactusComponent },
      { path: 'service', component: ServivceComponent },
      { path: 'gallery', component: GalleryComponent },
      { path: 'new-page', component: NewPageComponent },
      { path: 'room/categories', component: CategoriesComponent },
      { path: 'room/floors', component: FloorsComponent },
      { path: 'room/rooms', component: RoomsComponent },
      { path: 'booking', component: BookingComponent },
      { path: 'booking/booking-details', component: BookingdetailsComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'contact/contact-details', component: ContactdetailsComponent },
      { path: 'contact/detail-contact/:id', component: DetailsContactComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
