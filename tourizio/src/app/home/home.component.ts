import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule,RouterLink,RouterLinkActive  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   menuActive = false;

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  closeMenu() {
    this.menuActive = false;
  }
  images: string[] = [
    'assets/img11.avif',
    'assets/img2.avif',
    'assets/img3.avif'
  ];
  currentIndex = 0;
  currentBg = this.images[0];
  private isBrowser: boolean;

  placesToVisit = [
    { title: 'Ooty', imgUrl: 'assets/places1.jpeg', description: 'Ideal for honeymooners, solo, and groups' },
    { title: 'Madurai', imgUrl: 'assets/places2.jpg', description: 'Temple city and Tamil culture' },
    { title: 'Kanniyakumari', imgUrl: 'assets/places3.jpeg', description: 'Sunsets and coastline wonders' },
    { title: 'Coimbatore', imgUrl: 'assets/Coimbatore.jpg', description: 'Industrial city with natural beauty' },
    { title: 'Pondicherry', imgUrl: 'assets/pondy.jpeg', description: 'French colonial charm and beaches' },
    { title: 'Kodaikanal', imgUrl: 'assets/kody.jpg', description: 'Hill station with scenic lakes' },
  ];

  experiences = [
    { title: 'Adventure', imgUrl: 'assets/adven.jpg', description: 'Adventure and thrill in Tamil Nadu' },
    { title: 'Eat & Drink', imgUrl: 'assets/eat.webp', description: 'Taste the local flavors' },
    { title: 'Spiritual', imgUrl: 'assets/spirit.jpg', description: 'Discover spiritual heritage' },
    { title: 'Medical Tourism', imgUrl: 'assets/med.jpeg', description: 'Healing and wellness journeys' },
    { title: 'Wildlife Safari', imgUrl: 'assets/wild.jpeg', description: 'Explore rich flora and fauna' },
    { title: 'Cultural Festivals', imgUrl: 'assets/cult.cms', description: 'Experience vibrant traditions' },
  ];

  placesPage = 0;
  experiencesPage = 0;
  pageSize = 4;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.currentBg = this.images[this.currentIndex];
      }, 4000);
    }
  }

  get visiblePlaces() {
    const start = this.placesPage * this.pageSize;
    return this.placesToVisit.slice(start, start + this.pageSize);
  }

  get visibleExperiences() {
    const start = this.experiencesPage * this.pageSize;
    return this.experiences.slice(start, start + this.pageSize);
  }

  get placesTotalPages() {
    return Math.ceil(this.placesToVisit.length / this.pageSize);
  }

  setPlacesPage(p: number) {
    this.placesPage = p;
  }

  get experiencesTotalPages() {
    return Math.ceil(this.experiences.length / this.pageSize);
  }

  setExperiencesPage(p: number) {
    this.experiencesPage = p;
  }
}
