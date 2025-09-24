import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServivceComponent } from './service.component'

describe('ServivceComponent', () => {
  let component: ServivceComponent;
  let fixture: ComponentFixture<ServivceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServivceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServivceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});