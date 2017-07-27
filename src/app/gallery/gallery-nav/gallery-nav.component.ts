import { Component, Input, OnInit } from '@angular/core';
import { GalleryService } from '../../services/gallery.service';
import { GalleryObject } from '../../services/gallery.object';

@Component({
  selector: 'gallery-nav',
  templateUrl: './gallery-nav.component.html',
  styleUrls: ['./gallery-nav.component.css']
})
export class GalleryNavComponent implements OnInit {

  @Input() galleryObject;

  gallery: GalleryObject;

  constructor(
      public galleryService: GalleryService
  ) { }

  ngOnInit() {
    this.gallery = this.galleryObject.getValue();
  }

  prev() {
    this.galleryService.prev();
  }

  next() {
    this.galleryService.next();
  }
}
