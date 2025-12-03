import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Norris } from './norris';

describe('Norris', () => {
  let component: Norris;
  let fixture: ComponentFixture<Norris>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Norris]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Norris);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
