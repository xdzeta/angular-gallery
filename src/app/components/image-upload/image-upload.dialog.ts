import { Component, Inject, EventEmitter, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseListObservable } from 'angularfire2/database';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import "firebase/storage";

import { GalleryImage } from "../../services/gallery.object";
import { GalleryService } from '../../services/gallery.service';

interface Image {
  path: string;
  filename: string;
  downloadURL?: string;
  $key?: string;
}

@Component({
  selector: 'image-upload',
  templateUrl: './image-upload.dialog.html',
  styleUrls: ['./image-upload.dialog.css']
})
export class ImageUploadDialog implements OnDestroy {

  public filePreviewPath: SafeUrl;
  public uploader: FileUploader = new FileUploader({
    url: '',
    allowedFileType: ['image'],
    maxFileSize: 2 * 1024 * 1024
  });
  public hasBaseDropZoneOver:boolean = false;

  disabled: boolean = false;
  file: File;

  fileList : FirebaseListObservable<Image[]>;
  imgUploadForm: FormGroup;

  constructor(
      public galleryService: GalleryService,
      @Inject(MD_DIALOG_DATA) public data: {galleryImage: GalleryImage},
      private fb: FormBuilder,
      public dialogRef: MdDialogRef<ImageUploadDialog>,
      sanitizer: DomSanitizer
  ) {
    this.uploader.onAfterAddingFile = (fileItem) => {
      this.filePreviewPath  = sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(fileItem._file));
    };

    this.dialogRef.afterClosed().subscribe((result) => {
      switch (result) {
        case 'success_delete':
          this.galleryService.reset();
          break;
        case 'success_edit':
          this.galleryService.reset();
          break;
        case 'success_upload':
          this.galleryService.reset();
          this.galleryService.setCurrentLast();
          break;
      }
    });

    this.filePreviewPath = this.data.galleryImage ? sanitizer.bypassSecurityTrustUrl(data.galleryImage.src) : null;

    this.buildForm();
  }

  ngOnDestroy() {

  }

  ngOnChanges() {

  }

  buildForm(): void {
    this.imgUploadForm = this.fb.group({
      'title': [
        this.data.galleryImage ? this.data.galleryImage.title : null,
        Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(255)])
      ]
    });
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  upload() {
    let selectedFile = this.uploader.queue[this.uploader.queue.length - 1]['_file'];

    this.galleryService.upload(selectedFile, this.imgUploadForm.value.title)
      .then(() => {
        this.dialogRef.close('success_upload');
      });
  }

  save() {
    let selectedFile = this.uploader.queue.length ? this.uploader.queue[this.uploader.queue.length - 1]['_file'] : null;

    this.galleryService.update(this.data.galleryImage.$key, this.imgUploadForm.value.title, selectedFile);
    this.dialogRef.close('success_edit');
      //.then((res) => {
      //  this.dialogRef.close('success_edit');
      //});
  }

  delete() {
    let storagePath = this.data.galleryImage.path;
    this.galleryService.delete(storagePath);
    this.dialogRef.close('success_delete');
      //.then(() => {
      //  this.dialogRef.close('success_delete');
      //});
  }
}
