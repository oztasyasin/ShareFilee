import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatefoldersComponent } from './updatefolders.component';

describe('UpdatefoldersComponent', () => {
  let component: UpdatefoldersComponent;
  let fixture: ComponentFixture<UpdatefoldersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatefoldersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatefoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
