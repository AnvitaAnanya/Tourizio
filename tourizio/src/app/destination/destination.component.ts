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

  ngOnInit() {
    this.filteredDestinations = [...this.destinations];
  }

  applyFilters() {
    this.filteredDestinations = this.destinations.filter((dest: Destination) =>
      (!this.selectedFilter || dest.type === this.selectedFilter) &&
      (!this.searchQuery || dest.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
    );
  }
}
