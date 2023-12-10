import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { SearchService } from '../services/search.service';
import { PostService } from '../services/post-data.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any[] = [];
  filteredPosts: any[] = [];

  constructor(private dataService: DataService, private postService: PostService, private searchService: SearchService, private router: Router) { }

  ngOnInit(): void {
    // Get posts and users for merging
    forkJoin({
      posts: this.dataService.getPosts(),
      users: this.dataService.getUsers()
    }).subscribe(({ posts, users }) => {
      const userNames = users.reduce((acc: { [x: string]: any; }, user: any) => {
        acc[user.id] = user.name; // Store user names with user ids as keys
        return acc;
      }, {});
  
      this.posts = posts.map((post: any) => {
        return { ...post, userName: userNames[post.userId] }; // Merge user's name into each post
      });
  
      this.filteredPosts = this.posts;
    });

    //Search from header
    this.searchService.getSearchByAuthor().subscribe(value => {
      this.filteredPosts = this.searchService.searchByAuthor(value, this.posts);
    });
  }

  goToPostDetails(postData: any): void {
    this.postService.setPostData(postData);
    this.router.navigate(['/post', postData.id]);
  }

  toggleComments(post: any): void {
    if (!post.comments) {
      this.dataService.getCommentsForPost(post.id).subscribe((comments: any) => {
        post.comments = comments;
        post.showComments = !post.showComments;
      });
    } else {
      post.showComments = !post.showComments;
    }
  }
  
}