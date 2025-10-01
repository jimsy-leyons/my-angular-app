import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsContactComponent } from './detail-contact.component'

describe('DetailsContactComponent', () => {
  let component: DetailsContactComponent;
  let fixture: ComponentFixture<DetailsContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
