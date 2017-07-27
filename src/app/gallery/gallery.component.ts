import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';

import { ImageUploadDialog } from '../components/image-upload/image-upload.dialog';
import { GalleryService } from '../services/gallery.service';

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  isLoaded: boolean = false;
  dialogRef: MdDialogRef<ImageUploadDialog>;

  constructor(
      public galleryService: GalleryService,
      public dialog: MdDialog
      //public viewContainerRef: ViewContainerRef
  ) {
    this.galleryService.reset().subscribe(res => {
      this.galleryService.load(res);
      this.isLoaded = true;
    });
  }

  ngOnInit() {
  }

  openModal() {
    let config = new MdDialogConfig();
    config.data = {
      galleryImage: null
    };
    config.width = '600px';
    //config.viewContainerRef = this.viewContainerRef;

    this.dialogRef = this.dialog.open(ImageUploadDialog, config);
  }
}
