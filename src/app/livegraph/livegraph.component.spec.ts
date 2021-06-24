import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivegraphComponent } from './livegraph.component';

describe('LivegraphComponent', () => {
  let component: LivegraphComponent;
  let fixture: ComponentFixture<LivegraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivegraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivegraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
