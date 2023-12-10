import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { ImageViewComponent } from './image-view/image-view.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'post/:id', component: PostDetailsComponent },
  { path: 'images', component: ImageViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
