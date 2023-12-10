import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private STORAGE_KEY = 'post_data';

  setPostData(data: any): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  getPostData(): any {
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : null;
  }
}