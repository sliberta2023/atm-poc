import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { BillType } from "../models/bill-type";
import { TransactionUnit } from "../models/transaction-unit";

@Injectable({
    providedIn: "root"
})
export class AtmService {
    private moneyReserve: Map<number, number> = new Map();
    private moneyReserve$: BehaviorSubject<Map<number, number>> = new BehaviorSubject(this.moneyReserve);
    
    public readonly BillTypes: number[] = [1, 5, 10, 20, 50, 100];
    constructor() {
        this.initAtm();
    }

    initAtm() {
        this.BillTypes.forEach(billType => {
            this.moneyReserve.set(billType, 10);
        });
        this.moneyReserve$.next(this.moneyReserve);
    }

    deposit(unit: TransactionUnit): void {
        const amount = this.moneyReserve.get(unit.type) || 0;
        this.moneyReserve.set(unit.type, unit.amount + amount);
        this.moneyReserve$.next(this.moneyReserve);
    }

    depositAll(units: TransactionUnit[]): void {
        let amount = 0;
        units.forEach(unit => {
            amount = this.moneyReserve.get(unit.type) || 0;
            this.moneyReserve.set(unit.type, unit.amount + amount);
        });
        this.moneyReserve$.next(this.moneyReserve);
    }

    getAmount(billType: BillType): number {
        return this.moneyReserve.get(billType) || 0;
    }

    withdraw(units: TransactionUnit[]): void {
        units.forEach(unit => {
            let currentAmount = this.moneyReserve.get(unit.type) || 0;
            const requestedAmount = unit.amount;
            if (currentAmount >= requestedAmount) {
                currentAmount = currentAmount - requestedAmount;
                this.moneyReserve.set(unit.type, currentAmount);
            }
        });

        this.moneyReserve$.next(this.moneyReserve);
    }

    getMoneyReserve(): Observable<Map<BillType, number>> {
        return this.moneyReserve$.asObservable();
    }
}
