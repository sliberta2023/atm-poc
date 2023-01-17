import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AtmService } from 'src/app/services/atm.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {
  reserveForm: FormGroup = new FormGroup({});
  currentAmount: number = 0;
  withdrawAmount$ = new BehaviorSubject(0); 

  constructor(private readonly atmService: AtmService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.reserveForm = new FormGroup({
      one: new FormControl(0),
      five: new FormControl(0),
      ten: new FormControl(0),
      twenty: new FormControl(0),
      fifty: new FormControl(0),
      hundred: new FormControl(0)
    });
  }

  onBack(): void {
    console.log('Going back...');
    this.router.navigate(['./overview']);
  }

  onWithdraw(): void {
    console.log('Withdrawing...');
  }

}
