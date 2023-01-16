import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {
  withdrawAmountControl = new FormControl('', [Validators.required, Validators.pattern('[15(10)(20)(50)(100)]')]);
  constructor() { }

  ngOnInit(): void {
  }

}
