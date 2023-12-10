import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchByAuthorSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  setSearchByAuthor(searchTerm: string): void {
    this.searchByAuthorSubject.next(searchTerm);
  }

  getSearchByAuthor(): Observable<string> {
    return this.searchByAuthorSubject.asObservable();
  }

  searchByAuthor(searchTerm: string, posts: any[]) {
    if (searchTerm.trim().length >= 3) {
      return posts.filter(post =>
        post.userName.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
    } else {
      return posts;
    }
  }
}