import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillType } from 'src/app/models/bill-type';
import { AtmService } from 'src/app/services/atm.service';

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
  displayedColumns: string[] = ['billType', 'amount', 'total' ];
  dataSource: MoneyUnit[] = [];
  constructor(private readonly atmService: AtmService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.dataSource = this.getDataSource();
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

  onRestock(): void {
    console.log('Restocking...');
    this.router.navigate(['./restock']);
  }

  onWithdraw(): void {
    console.log('Withdrawing...');
    this.router.navigate(['./withdraw']);
  }

}
