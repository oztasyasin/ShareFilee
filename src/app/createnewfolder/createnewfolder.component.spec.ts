import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenewfolderComponent } from './createnewfolder.component';

describe('CreatenewfolderComponent', () => {
  let component: CreatenewfolderComponent;
  let fixture: ComponentFixture<CreatenewfolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatenewfolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatenewfolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
