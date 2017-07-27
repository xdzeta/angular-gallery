import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryNavComponent } from './gallery-nav.component';

describe('GalleryNavComponent', () => {
  let component: GalleryNavComponent;
  let fixture: ComponentFixture<GalleryNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
