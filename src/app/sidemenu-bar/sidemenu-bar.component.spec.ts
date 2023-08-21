import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidemenuBarComponent } from './sidemenu-bar.component';

describe('SidemenuBarComponent', () => {
  let component: SidemenuBarComponent;
  let fixture: ComponentFixture<SidemenuBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidemenuBarComponent]
    });
    fixture = TestBed.createComponent(SidemenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
