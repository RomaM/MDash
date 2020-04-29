import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {SidebarComponent} from './sidebar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

describe('COMPONENT -> Sidebar Component', () => {
  let fixture: ComponentFixture<SidebarComponent>;
  let component: SidebarComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [
        // MatToolbarModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
  });

  it('Should create Sidebar Component', () => {
    expect(component).toBeTruthy();
  });
});
