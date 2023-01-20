import { Dialog } from '@angular/cdk/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialSharedModule } from '../../materials.module';

import { MessageDialogComponent } from './message-dialog.component';

const dummyValue = null as any;
const data = new Dialog(dummyValue, dummyValue , dummyValue, dummyValue, dummyValue, dummyValue);

describe('MessageDialogComponent', () => {
  let component: MessageDialogComponent;
  let fixture: ComponentFixture<MessageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MaterialSharedModule],
      declarations: [
        MessageDialogComponent
      ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: data}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
