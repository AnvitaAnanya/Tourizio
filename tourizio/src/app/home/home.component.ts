import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ScrollAnimateDirective } from './scroll-animate.directive';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, RouterLinkActive, ScrollAnimateDirective],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  menuActive = false;
  images: string[] = [
    'assets/betterpic.avif',
    'assets/betterpic2.avif',
    'assets/betterpic3.avif',
  ];
  currentIndex = 0;
  currentBg = this.images[0];
  private isBrowser: boolean;

  placesToVisit = [
    {
      title: 'Ooty',
      imgUrl: 'assets/places1.jpeg',
      description: `Ideal for honeymooners, solo travelers, and groups.<br>
      Enjoy the beautiful Nilgiri hills, serene tea gardens, and peaceful boat rides on Ooty Lake.<br>
      Discover bustling local markets and charming colonial architecture for a perfect getaway.`
    },
    {
      title: 'Madurai',
      imgUrl: 'assets/places2.jpg',
      description: `Temple city and Tamil culture hub.<br>
      Visit the majestic Meenakshi Amman Temple, stroll ancient streets, and indulge in authentic South Indian cuisine.<br>
      Experience festivals that showcase rich traditions and devotion.`
    },
    {
      title: 'Kanniyakumari',
      imgUrl: 'assets/places3.jpeg',
      description: `Famous for spectacular sunsets and stunning coastline views.<br>
      Witness the confluence of three seas and visit important pilgrimage temples.<br>
      A unique mix of natural and cultural wonders.`
    },
    {
      title: 'Coimbatore',
      imgUrl: 'assets/Coimbatore.jpg',
      description: `An industrial city surrounded by natural beauty.<br>
      Explore nearby hill stations, vibrant textile markets, and enjoy delicious local delicacies.`
    },
    {
      title: 'Pondicherry',
      imgUrl: 'assets/pondy.jpeg',
      description: `Experience French colonial charm, tree-lined boulevards, and pristine beaches.<br>
      Explore quaint cafes, spiritual ashrams, and colorful street art.`
    },
    {
      title: 'Kodaikanal',
      imgUrl: 'assets/kody.jpg',
      description: `Hill station known for scenic lakes, lush forests, and cool climate.<br>
      Ideal for trekking, boating, and relaxing in nature's lap.`
    },
    // Additional places for pagination
    {
      title: 'Yercaud',
      imgUrl: 'assets/yercaud.webp',
      description: `A quiet hill station with beautiful botanical gardens, tranquil lakes, and panoramic viewpoints perfect for nature lovers.`
    },
    {
      title: 'Hogenakkal Falls',
      imgUrl: 'assets/hoje.webp',
      description: `Called the Niagara of India, featuring breathtaking waterfalls and traditional coracle boat rides amidst stunning landscapes.`
    }
  ];

  experiences = [
    {
      title: 'Adventure',
      imgUrl: 'assets/adven.jpg',
      description: `Thrilling adventures across Tamil Nadu's diverse landscapes including trekking, rock climbing, river rafting, and jungle safaris for the fearless explorer.`
    },
    {
      title: 'Eat & Drink',
      imgUrl: 'assets/eat.webp',
      description: `Taste local flavors ranging from spicy street food to gourmet South Indian cuisine,<br>
      with guided food tours and cooking classes to delight your palate.`
    },
    {
      title: 'Spiritual',
      imgUrl: 'assets/spirit.jpg',
      description: `Discover spiritual heritage through visits to ancient temples, ashrams, and meditation retreats blending tradition with tranquility.`
    },
    {
      title: 'Medical Tourism',
      imgUrl: 'assets/med.jpeg',
      description: `Healing and wellness journeys offering world-class medical facilities combined with rejuvenating Ayurvedic and wellness treatments.`
    },
    {
      title: 'Wildlife Safari',
      imgUrl: 'assets/wild.jpeg',
      description: `Explore Tamil Nadu’s rich flora and fauna with guided safaris in national parks and sanctuaries,<br>
      spotting exotic wildlife in their natural habitat.`
    },
    {
      title: 'Cultural Festivals',
      imgUrl: 'assets/cult.cms',
      description: `Experience vibrant traditions, music, dance, and colorful festivals that celebrate the state's diverse cultural tapestry all year round.`
    },
    // Additional experiences for pagination
    {
      title: 'Heritage Walks',
      imgUrl: 'assets/heritage.webp',
      description: `Guided tours exploring ancient architecture, historical landmarks, and<br>
      stories behind Tamil Nadu’s rich cultural heritage.`
    },
    {
      title: 'Beach Activities',
      imgUrl: 'assets/beachy.jpg',
      description: `Enjoy surfing, beach volleyball, bonfires, and seaside festivals on stunning beaches offering fun and relaxation for all ages.`
    }
  ];

  placesPage = 0;
  experiencesPage = 0;
  pageSize = 4;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  closeMenu() {
    this.menuActive = false;
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

  testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Mumbai, India',
      text: 'An absolutely amazing experience! The guides were knowledgeable and the destinations were breathtaking. Tourizio made our honeymoon unforgettable.',
      photo: 'assets/test.jpeg',
      rating: 5
    },
    {
      name: 'Rajesh Kumar',
      location: 'Delhi, India',
      text: 'Best travel booking platform I\'ve used. Smooth booking process and great customer support. Highly recommend for anyone planning a trip!',
      photo: 'assets/test2.jpeg',
      rating: 4
    },
    {
      name: 'Sarah Johnson',
      location: 'Bangalore, India',
      text: 'The adventure tours exceeded all expectations. From start to finish, everything was well-organized. Can\'t wait to book our next trip with Tourizio!',
      photo: 'assets/test3.jpeg',
      rating: 5
    },
    {
      name: 'Amit Patel',
      location: 'Pune, India',
      text: 'Excellent service and beautiful destinations. The booking was seamless and the trip was everything we hoped for. Thank you Tourizio!',
      photo: 'assets/test4.webp',
      rating: 4
    },
    {
      name: 'Meera Reddy',
      location: 'Hyderabad, India',
      text: 'Our family had an incredible vacation thanks to Tourizio. Great selection of destinations and the booking process was so easy. We\'ll definitely book again!',
      photo: 'assets/test5.webp',
      rating: 5
    }
    ,{
      name: 'Kavita Desai',
      location: 'Jaipur, India',
      text: 'A wonderfully organized trip with stunning sights and warm local hosts. The itinerary was perfect for our family — highly recommend Tourizio!',
      photo: 'assets/test6.png',
      rating: 5
    }
  ];

  currentTestimonialIndex = 0;
  testimonialsPerPage = 1;

  get visibleTestimonials() {
    const start = this.currentTestimonialIndex;
    return this.testimonials.slice(start, start + this.testimonialsPerPage);
  }

  nextTestimonial() {
    this.currentTestimonialIndex = (this.currentTestimonialIndex + 1) % this.testimonials.length;
  }

  previousTestimonial() {
    this.currentTestimonialIndex = (this.currentTestimonialIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }

  goToTestimonial(index: number) {
    this.currentTestimonialIndex = index;
  }

  ngOnInit() {
    if (this.isBrowser) {
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.currentBg = this.images[this.currentIndex];
      }, 4000);

      // Auto-rotate testimonials
      setInterval(() => {
        this.nextTestimonial();
      }, 5000);
    }
  }
}
