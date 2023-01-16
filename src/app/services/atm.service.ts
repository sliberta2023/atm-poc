import { Injectable } from "@angular/core";
import { BillType } from "../models/bill-type";
import { TransactionUnit } from "../models/transaction-unit";

@Injectable({
    providedIn: "root"
})
export class AtmService {
    private moneyReserve: Map<BillType, number> = new Map();
    
    constructor() {
        this.initAtm();
    }

    initAtm() {
        this.moneyReserve.set(BillType.ONE, 10);
        this.moneyReserve.set(BillType.FIVE, 10);
        this.moneyReserve.set(BillType.TEN, 10);
        this.moneyReserve.set(BillType.TWENTY, 10);
        this.moneyReserve.set(BillType.FIFTY, 10);
        this.moneyReserve.set(BillType.HUNDRED, 10);
    }

    deposit(unit: TransactionUnit): void {
        const amount = this.moneyReserve.get(unit.type) || 0;
        this.moneyReserve.set(unit.type, unit.amount + amount);
    }

    getAmount(billType: BillType): number {
        return this.moneyReserve.get(billType) || 0;
    }

    withdraw(unit: TransactionUnit): number {
        let currentAmount = this.moneyReserve.get(unit.type) || 0;
        const requestedAmount = unit.amount;
        if (currentAmount >= requestedAmount) {
            currentAmount = currentAmount - requestedAmount;
            this.moneyReserve.set(unit.type, currentAmount);

            return requestedAmount;
        }

        return 0;
    }
}
