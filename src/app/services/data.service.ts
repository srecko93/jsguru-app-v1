import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/posts`);
  }

  getPostsByID(postId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/posts/${postId}`);
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users`);
  }

  getCommentsForPost(postId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/posts/${postId}/comments`);
  }

  getImages(selectedLimit: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/photos?_limit=${selectedLimit}`);
  }

  getAlbumsWithPhotosById(postId: number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/albums/${postId}/photos`);
  }

}