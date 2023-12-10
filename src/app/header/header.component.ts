import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  showSearchBar: boolean = false;
  currentRouteIsHome: boolean = false;

  constructor(private searchService: SearchService, private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log('Current URL:', event.url);
        this.showSearchBar = event.url === '/';
        this.currentRouteIsHome = event.url === '/';
        console.log('Show Search Bar:', this.showSearchBar);
      });
  }

  onSearchChange(event: any) {
    const searchTerm = event.target.value;
    this.searchService.setSearchByAuthor(searchTerm);
  }
}
