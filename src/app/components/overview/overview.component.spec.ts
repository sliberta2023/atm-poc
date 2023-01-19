import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialSharedModule } from 'src/app/materials.module';
import { ComponentsModule } from '../components.module';

import { OverviewComponent } from './overview.component';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MaterialSharedModule,
        ComponentsModule
      ],
      declarations: [ ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
