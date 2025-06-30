import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfExtractionComponent } from './pdf-extraction.component';

describe('PdfExtractionComponent', () => {
  let component: PdfExtractionComponent;
  let fixture: ComponentFixture<PdfExtractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfExtractionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PdfExtractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
