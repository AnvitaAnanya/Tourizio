import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { ScrollAnimateDirective } from '../home/scroll-animate.directive';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, ScrollAnimateDirective],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  selectedCategory = 'all';
  selectedImage: any = null;
  lightboxOpen = false;
  private isBrowser: boolean;

  categories = [
    { id: 'all', name: 'All Destinations' },
    { id: 'beach', name: 'Beach' },
    { id: 'mountain', name: 'Mountain' },
    { id: 'city', name: 'City' },
    { id: 'nature', name: 'Nature' },
    { id: 'adventure', name: 'Adventure' }
  ];

  images = [
    { id: 1, src: 'assets/goa.avif', category: 'beach', title: 'Goa Beaches', location: 'Goa, India' },
    { id: 2, src: 'assets/ladakh.jpg', category: 'mountain', title: 'Ladakh Mountains', location: 'Ladakh, India' },
    { id: 3, src: 'assets/jaipur.jpg', category: 'city', title: 'Jaipur Palace', location: 'Jaipur, India' },
    { id: 4, src: 'assets/kerala.jpeg', category: 'nature', title: 'Kerala Backwaters', location: 'Kerala, India' },
    { id: 5, src: 'assets/rishikesh.jpg', category: 'adventure', title: 'Rishikesh Adventures', location: 'Rishikesh, India' },
    { id: 6, src: 'assets/taj.webp', category: 'city', title: 'Taj Mahal', location: 'Agra, India' },
    { id: 7, src: 'assets/darjelling.webp', category: 'mountain', title: 'Darjeeling Hills', location: 'Darjeeling, India' },
    { id: 8, src: 'assets/andaman.webp', category: 'beach', title: 'Andaman Islands', location: 'Andaman, India' },
    { id: 9, src: 'assets/rann.avif', category: 'nature', title: 'Rann of Kutch', location: 'Gujarat, India' },
    { id: 10, src: 'assets/varansi.jpg', category: 'city', title: 'Varanasi Ghats', location: 'Varanasi, India' },
    { id: 11, src: 'assets/yercaud.webp', category: 'mountain', title: 'Yercaud Hills', location: 'Tamil Nadu, India' },
    { id: 12, src: 'assets/beachy.jpg', category: 'beach', title: 'Beach Activities', location: 'Coastal India' },
    { id: 13, src: 'assets/heritage.webp', category: 'city', title: 'Heritage Sites', location: 'India' },
    { id: 14, src: 'assets/adven.jpg', category: 'adventure', title: 'Adventure Sports', location: 'India' },
    { id: 15, src: 'assets/wild.jpeg', category: 'nature', title: 'Wildlife Safari', location: 'India' },
    { id: 16, src: 'assets/spirit.jpg', category: 'nature', title: 'Spiritual Journey', location: 'India' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    // Smooth scroll animations
  }

  filterImages(category: string) {
    this.selectedCategory = category;
    // Scroll to top of gallery
    if (this.isBrowser) {
      const galleryElement = document.querySelector('.gallery-grid');
      if (galleryElement) {
        galleryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  openLightbox(image: any) {
    this.selectedImage = image;
    this.lightboxOpen = true;
    if (this.isBrowser) {
      document.body.style.overflow = 'hidden';
    }
  }

  closeLightbox() {
    this.lightboxOpen = false;
    this.selectedImage = null;
    if (this.isBrowser) {
      document.body.style.overflow = 'auto';
    }
  }

  nextImage() {
    const currentIndex = this.filteredImages.findIndex(img => img.id === this.selectedImage.id);
    const nextIndex = (currentIndex + 1) % this.filteredImages.length;
    this.selectedImage = this.filteredImages[nextIndex];
  }

  previousImage() {
    const currentIndex = this.filteredImages.findIndex(img => img.id === this.selectedImage.id);
    const prevIndex = (currentIndex - 1 + this.filteredImages.length) % this.filteredImages.length;
    this.selectedImage = this.filteredImages[prevIndex];
  }

  get filteredImages() {
    if (this.selectedCategory === 'all') {
      return this.images;
    }
    return this.images.filter(img => img.category === this.selectedCategory);
  }
}

