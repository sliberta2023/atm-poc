import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialSharedModule } from 'src/app/materials.module';

import { WithdrawComponent } from './withdraw.component';

describe('WithdrawComponent', () => {
  let component: WithdrawComponent;
  let fixture: ComponentFixture<WithdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialSharedModule],
      declarations: [ WithdrawComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
