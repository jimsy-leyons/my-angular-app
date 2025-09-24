import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Aboutus1Component } from './about-us1.component'

describe('Aboutus1Component', () => {
  let component: Aboutus1Component;
  let fixture: ComponentFixture<Aboutus1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Aboutus1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Aboutus1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});