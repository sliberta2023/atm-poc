import { BillType } from "./bill-type";

export interface TransactionUnit {
    type: BillType;
    amount: number;
}
