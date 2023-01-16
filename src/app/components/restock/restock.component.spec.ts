import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialSharedModule } from 'src/app/materials.module';

import { RestockComponent } from './restock.component';

describe('RestockComponent', () => {
  let component: RestockComponent;
  let fixture: ComponentFixture<RestockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialSharedModule],
      declarations: [ RestockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
