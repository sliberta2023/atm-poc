import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { BillType } from 'src/app/models/bill-type';
import { DialogMessageData } from 'src/app/models/dialog-message-type';
import { TransactionUnit } from 'src/app/models/transaction-unit';
import { AtmService } from 'src/app/services/atm.service';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {
  readonly formControlNames = ['one', 'five', 'ten', 'twenty', 'fifty', 'hundred'];
  readonly billValues = Object.values(BillType).filter(n => !isNaN(n as number));
  reserveForm: FormGroup = new FormGroup({});
  currentBalance$ = new BehaviorSubject(0);
  withdrawAmount: number = 0;
  withdrawAmount$ = new BehaviorSubject(0); 

  constructor(private readonly atmService: AtmService,
    private readonly router: Router,
    private readonly matDialog: MatDialog) { }

  ngOnInit(): void {
    this.reserveForm = new FormGroup({
      one: new FormControl(0, [Validators.required, Validators.min(0)]),
      five: new FormControl(0, [Validators.required, Validators.min(0)]),
      ten: new FormControl(0, [Validators.required, Validators.min(0)]),
      twenty: new FormControl(0, [Validators.required, Validators.min(0)]),
      fifty: new FormControl(0, [Validators.required, Validators.min(0)]),
      hundred: new FormControl(0, [Validators.required, Validators.min(0)])
    });
  
    this.atmService.getMoneyReserve().subscribe((valuesMap: Map<number, number>) => {
      this.updateCurrentBalance(valuesMap);
      this.updateFormValidators(valuesMap);
    });
    
    this.reserveForm.valueChanges.subscribe(x => {
      const total = this.getTotalAmount(x);
      this.withdrawAmount = total;
      this.withdrawAmount$.next(total);
    });
    
  }

  updateFormValidators(valuesMap: Map<number, number>): void {
    let formControl: FormControl;
    const billTypes = this.atmService.BillTypes;
    const formValues: Record<string, number> = {};
    billTypes.forEach((billType, index) => {
      const amount = valuesMap.get(billType) || 0;
      formValues[this.formControlNames[index]] = amount;
      formControl = this.reserveForm.get(this.formControlNames[index]) as FormControl;
      formControl.addValidators(Validators.max(amount));
    });

  }

  updateCurrentBalance(valuesMap: Map<number, number>): void {
    let balance = 0;
    const billTypes = this.atmService.BillTypes;
    this.billValues.forEach((value, index) => {
      const billType = billTypes[index];
      const amount = valuesMap.get(billType) || 0;
      const total = Number(value) * amount;
      balance += total;
    });

    this.currentBalance$.next(balance);
  }

  getTotalAmount(formValues: any): number {
    let total = 0;
    const values: number[] = Object.values(formValues);
    values.forEach((value: number, index: number) => {
      total += (value * (this.billValues[index] as number));
    });

    return total;
  }

  onBack(): void {
    this.router.navigate(['./overview']);
  }

  onWithdraw(): void {
    let data: DialogMessageData = {title: '', message: ''};

    if (!this.reserveForm.valid) {
      data = {
        title: 'Error in cashing out',
        message: `Please fix the form errors before withdrawing.`
      }
    } else {
      const formValues = this.reserveForm.value;
      const units: TransactionUnit[] = [];
      const billTypes = this.atmService.BillTypes;
      this.formControlNames.forEach((name, index) => {
        const unit: TransactionUnit = {
          type: billTypes[index],
          amount: formValues[name]
        }
        units.push(unit);
      });

      // Cashing out
      this.atmService.withdraw(units);

      // Update withdraw success dialog message
      data = {
        title: 'Cashing out success!',
        message: `You have successfully withdrawn: (${this.withdrawAmount}).`
      }
    }
    this.openDialog(data);
  }

  openDialog(data: DialogMessageData): void {
    this.matDialog.open(MessageDialogComponent, {data});
  }
}
