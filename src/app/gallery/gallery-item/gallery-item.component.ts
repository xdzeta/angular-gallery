import { Component, Input, ViewContainerRef, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';

import { ImageUploadDialog } from '../../components/image-upload/image-upload.dialog';
import { GalleryService } from '../../services/gallery.service';
import { GalleryImage } from "../../services/gallery.object";

@Component({
  selector: 'gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.css']
})
export class GalleryItemComponent implements OnInit {

  @Input() image;
  @Input() itemIndex;
  @Input() currIndex;
  dialogRef: MdDialogRef<ImageUploadDialog>;

  constructor(
      public galleryService: GalleryService,
      public dialog: MdDialog
      //public viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit() {
  }

  isVisible() {
    return  this.currIndex < 5 && this.itemIndex < 5
        || this.currIndex >= 5 && (this.currIndex - this.itemIndex) < 5 && this.itemIndex <= this.currIndex;
  }

  changeSlide(index) {
    this.galleryService.set(index);
  }

  openModal(imageData: GalleryImage) {
    let config = new MdDialogConfig();
    config.data = {
      galleryImage: imageData
    };
    config.width = '600px';
    //config.viewContainerRef = this.viewContainerRef;

    this.dialogRef = this.dialog.open(ImageUploadDialog, config);
  }
}
