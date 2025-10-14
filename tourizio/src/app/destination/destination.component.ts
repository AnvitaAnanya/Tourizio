import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { DESTINATIONS } from './mock-destinations';

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
  imports: [CommonModule, FormsModule],
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css'],
  animations: [
    trigger('fadeInStagger', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'scale(0.95)' }),
          stagger(80, [
            animate('480ms cubic-bezier(.4,2,.42,1)', style({ opacity: 1, transform: 'scale(1)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class DestinationComponent implements OnInit {
  destinations: Destination[] = DESTINATIONS;
  filteredDestinations: Destination[] = [];

  searchQuery = '';
  selectedFilter = '';
  types: string[] = ['Beach', 'Mountain', 'City', 'Adventure', 'Nature'];

  minPrice = 0;
  maxPrice = 20000;
  minDuration = 1;
  maxDuration = 14;
  minRating = 0;
  maxRating = 5;

  selectedClimate = '';
  selectedSeason = '';

  climates: string[] = [];
  seasons: string[] = [];

  ngOnInit() {
    this.filteredDestinations = [...this.destinations];
    this.climates = [...new Set(this.destinations.map(d => d.climate))];
    this.seasons = [...new Set(this.destinations.map(d => d.bestSeason))];
  }

  applyFilters() {
    this.filteredDestinations = this.destinations.filter((dest: Destination) =>
      (!this.selectedFilter || dest.type === this.selectedFilter) &&
      (!this.searchQuery || dest.name.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
      (dest.price >= this.minPrice && dest.price <= this.maxPrice) &&
      (dest.duration >= this.minDuration && dest.duration <= this.maxDuration) &&
      (dest.rating >= this.minRating && dest.rating <= this.maxRating) &&
      (!this.selectedClimate || dest.climate === this.selectedClimate) &&
      (!this.selectedSeason || dest.bestSeason === this.selectedSeason)
    );
  }
}
