import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DESTINATIONS } from './mock-destinations';
import { ScrollAnimateDirective } from '../home/scroll-animate.directive';

export interface Destination {
  name: string;
  type: string;
  image: string;
  shortDesc: string;
  price: number;
  duration: number;
  rating: number;
  climate: string;
  bestSeason: string;
  
}

@Component({
  selector: 'app-destination',
  standalone: true,
  imports: [CommonModule, FormsModule, ScrollAnimateDirective],
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {
  destinations: Destination[] = DESTINATIONS;
  filteredDestinations: Destination[] = [];

  searchQuery = '';
  selectedFilter = '';
  types: string[] = ['Beach', 'Mountain', 'City', 'Adventure', 'Nature'];

  minPrice = 0;
  maxPrice = 20000;
  selectedDuration = 'Any';
  selectedRating = 'Any';

  selectedClimate = '';
  selectedSeason = '';

  climates: string[] = [];
  seasons: string[] = [];
  durationOptions: string[] = ['Any', '1-2 days', '3-4 days', '5-7 days', '8+ days'];
  ratingOptions: string[] = ['Any', '4.5+', '4.0+', '3.5+', '3.0+'];

  constructor(private router: Router) {}

  ngOnInit() {
    this.filteredDestinations = [...this.destinations];
    this.climates = [...new Set(this.destinations.map(d => d.climate))];
    this.seasons = [...new Set(this.destinations.map(d => d.bestSeason))];
  }

  bookNow(destination: Destination) {
    this.router.navigate(['/booking'], { 
      queryParams: { destination: destination.name.toLowerCase() } 
    });
  }

  applyFilters() {
    this.filteredDestinations = this.destinations.filter((dest: Destination) => {
      // Duration filter
      let durationMatch = true;
      if (this.selectedDuration && this.selectedDuration !== 'Any') {
        if (this.selectedDuration === '1-2 days') {
          durationMatch = dest.duration >= 1 && dest.duration <= 2;
        } else if (this.selectedDuration === '3-4 days') {
          durationMatch = dest.duration >= 3 && dest.duration <= 4;
        } else if (this.selectedDuration === '5-7 days') {
          durationMatch = dest.duration >= 5 && dest.duration <= 7;
        } else if (this.selectedDuration === '8+ days') {
          durationMatch = dest.duration >= 8;
        }
      }

      // Rating filter
      let ratingMatch = true;
      if (this.selectedRating && this.selectedRating !== 'Any') {
        const minRating = parseFloat(this.selectedRating.replace('+', ''));
        ratingMatch = dest.rating >= minRating;
      }

      return (
        (!this.selectedFilter || dest.type === this.selectedFilter) &&
        (!this.searchQuery || dest.name.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
        (dest.price >= this.minPrice && dest.price <= this.maxPrice) &&
        durationMatch &&
        ratingMatch &&
        (!this.selectedClimate || dest.climate === this.selectedClimate) &&
        (!this.selectedSeason || dest.bestSeason === this.selectedSeason)
      );
    });
  }
}
