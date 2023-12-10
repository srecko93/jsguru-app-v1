import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.css']
})

export class ImageViewComponent implements OnInit {

  images: any[] = [];
  activeIndex: number = 0;
  totalImages: number = 0;
  limitOptions: number[] = [1, 5, 10, 20, 50, 100];
  selectedLimit: number = 5;

  constructor(private dataService: DataService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages() {
    this.dataService.getImages(this.selectedLimit).subscribe((data: any[]) => {
      console.log(data)
      this.images = data;
      this.totalImages = this.images.length;
    });
  }

  onPageChange(event: any) {
    this.activeIndex = event.first;
  }

  onLimitChange() {
    this.loadImages();
    this.activeIndex = 0;
    this.cdr.markForCheck();
  }
}