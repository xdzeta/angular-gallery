import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from  '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { CovalentLayoutModule, CovalentFileModule, CovalentStepsModule, CovalentMenuModule, CovalentMediaModule } from '@covalent/core';
import { MdDialogModule, MdProgressSpinnerModule, MdInputModule, MdMenuModule, MdIconModule, MdCardModule } from '@angular/material';
import { FileUploadModule } from "ng2-file-upload";

import { AppComponent } from './app.component';
import { GalleryNavComponent } from './gallery/gallery-nav/gallery-nav.component';

import { GalleryService } from './services/gallery.service';
import { GalleryComponent } from './gallery/gallery.component';

import { AuthGuard } from './services/auth.guard';
import { NoauthGuard } from './services/noauth.guard';
import { environment } from '../environments/environment';
import { ImageUploadDialog } from './components/image-upload/image-upload.dialog';
import { LoginComponent } from './login/login.component';
import { GalleryItemComponent } from './gallery/gallery-item/gallery-item.component';

@NgModule({
  declarations: [
    AppComponent,
    GalleryNavComponent,
    GalleryComponent,
    ImageUploadDialog,
    LoginComponent,
    GalleryItemComponent
  ],
  entryComponents: [
    ImageUploadDialog
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase, 'gallery'), // imports firebase/app needed for everything
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    BrowserModule,
    BrowserAnimationsModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MdDialogModule,
    MdProgressSpinnerModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/gallery',
        pathMatch: 'full'
      },
      {
        path: 'gallery',
        component: GalleryComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [NoauthGuard]
      },
    ]),
    CovalentFileModule,
    CovalentLayoutModule,
    CovalentMediaModule,
    CovalentMenuModule,
    CovalentStepsModule,
    MdCardModule,
    MdMenuModule,
    MdIconModule,
    MdInputModule
  ],
  providers: [
    AuthGuard,
    NoauthGuard,
    GalleryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
