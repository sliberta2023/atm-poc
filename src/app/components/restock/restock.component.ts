import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MaterialSharedModule } from '../../materials.module';
import { BillType } from '../../models/bill-type';
import { DialogMessageData } from '../../models/dialog-message-type';
import { TransactionUnit } from '../../models/transaction-unit';
import { AtmService } from '../../services/atm.service';
import { ComponentsModule } from '../components.module';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

@Component({
  standalone: true,
  selector: 'app-restock',
  templateUrl: './restock.component.html',
  styleUrls: ['./restock.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialSharedModule,
    ComponentsModule
  ]
})
export class RestockComponent implements OnInit {
  readonly billValues = Object.values(BillType).filter(n => !isNaN(n as number));
  readonly billTypes = Object.values(BillType).filter(n => isNaN(n as number));
  readonly errors = {
    required: 'Non-negative number input is required.',
    min: 'Negative values are not allowed'
  };
  reserveForm: FormGroup = new FormGroup({});
  formControlOne: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  formControlFive: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  formControlTen: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  formControlTwenty: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  formControlFifty: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  formControlHundred: FormControl = new FormControl(0, [Validators.required, Validators.min(0)]);
  totalAmount$ = new BehaviorSubject(0);

  constructor(
    private readonly atmService: AtmService,
    private readonly router: Router,
    private readonly matDialog: MatDialog) { }

  ngOnInit(): void {
    this.reserveForm = new FormGroup({
      formControlOne: this.formControlOne,
      formControlFive: this.formControlFive,
      formControlTen: this.formControlTen,
      formControlTwenty: this.formControlTwenty,
      formControlFifty: this.formControlFifty,
      formControlHundred: this.formControlHundred
    });

    this.reserveForm.valueChanges.subscribe(x => {
      const total = this.getTotalAmount(x);
      this.totalAmount$.next(total);
    });
    
  }

  getTotalAmount(formValues: any): number {
    let total = 0;
    const values: number[] = Object.values(formValues);
    values.forEach((value: number, index: number) => {
      total += (value * (this.billValues[index] as number));
    });

    return total;
  }

  onDeposit(): void {
    let data: DialogMessageData = {title: '', message: ''};
    if (!this.reserveForm.valid) {
      data = {
        title: 'Error saving',
        message: `Please fix the form errors before saving.`
      }
    } else {
      const values: number[] = Object.values(this.reserveForm.value);
      const billTypes: number[] = this.atmService.BillTypes;
      const units: TransactionUnit[] = [];
      // save each amount based on bill type
      values.forEach((v, index) => {
        const unit: TransactionUnit = {
          type: billTypes[index],
          amount: v
        };
        units.push(unit);
      });

      // Save amounts for all bill types 
      this.atmService.depositAll(units);

      const total = this.getTotalAmount(this.reserveForm.value);
      data = {
        title: 'Saving cash',
        message: `Total amount of (${total}) saved successfully.`
      }
    }

    this.openDialog(data);
  }

  onBack(): void {
    this.router.navigate(['./overview']);
  }

  openDialog(data: DialogMessageData): void {
    this.matDialog.open(MessageDialogComponent, {data});
  }
}


