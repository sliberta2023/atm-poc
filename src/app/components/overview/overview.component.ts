import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BillType } from '../../models/bill-type';
import { AtmService } from '../../services/atm.service';

interface MoneyUnit {
  billType: BillType;
  amount: number;
  total: number;
}

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  readonly billValues = Object.values(BillType).filter(n => !isNaN(n as number));
  readonly billTypes = Object.values(BillType).filter(n => isNaN(n as number));
  currentBalance$: BehaviorSubject<number> = new BehaviorSubject(0);
  displayedColumns: string[] = ['billType', 'amount', 'total' ];
  dataSource: MoneyUnit[] = [];
  dataSource$: Observable<MoneyUnit[]> = of([]);
  constructor(private readonly atmService: AtmService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.atmService.getMoneyReserve().subscribe((valuesMap: Map<number, number>) => {
      this.updateDataSource(valuesMap);
    });
  }

  getDataSource(): MoneyUnit[] {
    const dataSource: MoneyUnit[] = [];
    const billTypes: BillType[] = [
      BillType.ONE,
      BillType.FIVE,
      BillType.TEN,
      BillType.TWENTY,
      BillType.FIFTY,
      BillType.HUNDRED
    ];

    billTypes.forEach(bill => {
      const amount = this.atmService.getAmount(bill);
      const total = Number(bill) * amount;
      const moneyUnit: MoneyUnit = {
        billType: bill,
        amount,
        total
      };
      dataSource.push(moneyUnit);
    })

    return dataSource;
  }

  updateDataSource(valuesMap: Map<number, number>): void {
    const formControlNames = [
      'formControlOne', 'formControlFive', 'formControlTen',
      'formControlTwenty', 'formControlFifty', 'formControlHundred'
    ];
    const dataSource: MoneyUnit[] = [];
    let balance = 0;
    const billTypes = this.atmService.BillTypes;
    this.billValues.forEach((value, index) => {
      const billType = billTypes[index];
      const amount = valuesMap.get(billType) || 0;
      const total = Number(value) * amount;
      balance += total;
      const moneyUnit: MoneyUnit = {
        billType,
        amount,
        total
      };
      dataSource.push(moneyUnit);
    });

    // Update dataSource & currentBalance
    this.dataSource$ = of(dataSource);
    this.currentBalance$.next(balance);
  }

  onRestock(): void {
    this.router.navigate(['./restock']);
  }

  onWithdraw(): void {
    this.router.navigate(['./withdraw']);
  }

}
