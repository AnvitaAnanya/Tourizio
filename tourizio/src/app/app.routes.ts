import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DestinationComponent } from './destination/destination.component';
import { BookingComponent } from './booking/booking.component';
import { LoginComponent } from './login/login.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ContactComponent } from './contact/contact.component';



export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'destination', component: DestinationComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'contact', component: ContactComponent },
];
