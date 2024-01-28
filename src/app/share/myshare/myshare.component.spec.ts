import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyshareComponent } from './myshare.component';

describe('MyshareComponent', () => {
  let component: MyshareComponent;
  let fixture: ComponentFixture<MyshareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyshareComponent]
    });
    fixture = TestBed.createComponent(MyshareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
