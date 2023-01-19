import { BillType } from '../models/bill-type';
import { TransactionUnit } from '../models/transaction-unit';
import { AtmService } from './atm.service';

describe('AtmService', () => {
  let atmService: AtmService;

  beforeEach(() => {
    atmService = new AtmService();
  });

  it('should create the service', () => {
    expect(atmService).toBeDefined();
  });

  it('should be able to make a deposit', () => {
    const billType = BillType.ONE;
    const expectedAmount = 15;
    const depositUnit: TransactionUnit = {type: billType, amount: 5};
    atmService.deposit(depositUnit);
    expect(atmService.getAmount(billType)).toBe(expectedAmount);
  });

  it('should be able to withdraw the amount', () => {
    const billType = 1;
    const expectedAmount = 5;
    const depositUnit: TransactionUnit = {type: billType, amount: 5};
    atmService.withdraw([depositUnit]);
    expect(atmService.getAmount(billType)).toBe(expectedAmount);
  });

  it('should ignore processing if requested amount is greater than the reserved money', () => {
    const billType = 1;
    const expectedAmount = 10;
    const withdrawUnit: TransactionUnit = {type: billType, amount: 25};
    atmService.withdraw([withdrawUnit])
    expect(atmService.getAmount(billType)).toBe(expectedAmount);
  });
});
