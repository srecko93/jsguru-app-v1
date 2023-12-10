import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { PostService } from '../services/post-data.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'] 
})
export class PostDetailsComponent implements OnInit {
  post: any = { comments: [] }; 

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.post = this.postService.getPostData();
    this.route.params.subscribe(params => {
      const postId = +params['id'];
      this.dataService.getCommentsForPost(postId).subscribe((comments: any) => {
        this.post.comments = comments;
        this.fetchAlbumsByUserId(this.post.id)
      });
    });
  }

  fetchAlbumsByUserId(postId: number): void {
    this.dataService.getAlbumsWithPhotosById(postId).subscribe((albums: any) => {
      console.log('Albums',albums)
      this.post.albums = albums;
    });
  }
}