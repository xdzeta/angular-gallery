import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';

import { defaultObject, GalleryObject } from './gallery.object';
import { GalleryImage } from "./gallery.object";

@Injectable()
export class GalleryService {

  private app;
  gallery: BehaviorSubject<GalleryObject>;
  folder: string = 'cats';
  referencePath: string = 'items';

  constructor(
      public db: AngularFireDatabase
  ) {
    this.app = firebase.app('gallery');
    this.gallery = new BehaviorSubject<GalleryObject>(defaultObject);
  }

  reset() {
    return this.db.list('/' + this.referencePath);
  }

  load(images: GalleryImage[]) {
    let app = firebase.app('gallery');
    let storage = firebase.storage(app);

    images.map(item => {
      storage.ref(item.path).getDownloadURL()
        .then(res => {
          item.src = res;
        });
    });

    this.gallery.next({
      images: images,
      currIndex: 0,
      hasNext: images.length > 1,
      hasPrev: false,
      active: false
    });
  }

  next() {
    const gallery = this.gallery.getValue();

    if (gallery.hasNext) {
      const index = gallery.currIndex + 1;
      this.set(index);
    } else {
      this.set(0);
    }
  }

  prev() {
    const gallery = this.gallery.getValue();

    if (gallery.hasPrev) {
      const index = gallery.currIndex - 1;
      this.set(index);
    } else {
      this.set(gallery.images.length - 1);
    }
  }

  set(index: number) {
    const gallery = this.gallery.getValue();

    this.gallery.next(Object.assign({}, gallery, {
      prevIndex: gallery.currIndex,
      currIndex: index,
      hasNext: index < gallery.images.length - 1,
      hasPrev: index > 0,
      active: true
    }));
  }

  setCurrentLast() {
    const gallery = this.gallery.getValue();

    let newCurrIndex = gallery.images.length - 1;

    this.gallery.next(Object.assign({}, gallery, {
      prevIndex: newCurrIndex - 1,
      currIndex: newCurrIndex,
      hasNext: newCurrIndex < gallery.images.length - 1,
      hasPrev: newCurrIndex > 0,
      active: true
    }));
  }

  upload(selectedFile, title) {
    let storageRef = firebase.storage(this.app).ref();
    let path = `/${this.folder}/${selectedFile.name}`;

    let iRef = storageRef.child(path);
    return iRef.put(selectedFile).then((snapshot) => {
      this.db.list('/' + this.referencePath).push({ path: path, title: title });
    });
  }

  update(key, title, selectedFile?) {
    let dbRow = this.db.object(this.referencePath + '/' + key);

    if (selectedFile) {
      let storageRef = firebase.storage(this.app).ref();
      let path = `/${this.folder}/${selectedFile.name}`;

      let iRef = storageRef.child(path);
      return iRef.put(selectedFile).then((snapshot) => {
        dbRow.update({
          title: title,
          path: path
        });
      });
    } else {
      return dbRow.update({
        title: title
      });
    }
  }

  delete(path) {
    let storageRef = firebase.storage(this.app).ref();
    let iRef = storageRef.child(path);

    // Delete from Storage and DB
    return iRef.delete()
      .then(
          () => {
            // Delete references
            let query = this.db.object(this.referencePath).$ref.orderByChild('path').equalTo(path);
            query.on('child_added', function(snapshot) {
              snapshot.ref.remove();
            });
          },
          (error) => {
            console.error("Error deleting stored file", path);
          }
      );
  }

}
