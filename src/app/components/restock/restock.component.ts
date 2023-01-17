import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AtmService } from 'src/app/services/atm.service';

@Component({
  selector: 'app-restock',
  templateUrl: './restock.component.html',
  styleUrls: ['./restock.component.scss']
})
export class RestockComponent implements OnInit {
  reserveForm: FormGroup = new FormGroup({});
  totalAmount$ = new BehaviorSubject(0);

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

  onDeposit(): void {
    console.log('Saving cash...');
  }

}
