import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchmakeViewComponent } from './matchmake-view.component';

describe('MatchmakeViewComponent', () => {
  let component: MatchmakeViewComponent;
  let fixture: ComponentFixture<MatchmakeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchmakeViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchmakeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
