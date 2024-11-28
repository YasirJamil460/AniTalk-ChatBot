import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryBoxComponent } from './query-box.component';

describe('QueryBoxComponent', () => {
  let component: QueryBoxComponent;
  let fixture: ComponentFixture<QueryBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
