import { TestBed, inject } from '@angular/core/testing';

import { GalleryService } from './gallery-service.service';

describe('GalleryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GalleryService]
    });
  });

  it('should ...', inject([GalleryService], (service: GalleryService) => {
    expect(service).toBeTruthy();
  }));
});
