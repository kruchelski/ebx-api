import { jest } from '@jest/globals';
import { accountsHandler } from '../../../src/helpers';

describe('Tests the accounts handler methods and behaviors', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should have zero accounts in the initial state', () => {
    expect(accountsHandler.accounts.length).toBe(0);
  });

  it('should add an account', () => {
    const accountDetails = { id: '182', balance: 300 };
    expect(accountsHandler.accounts.length).toBe(0);
    accountsHandler.addAccount(accountDetails);
    expect(accountsHandler.accounts.length).toBe(1);
    expect(accountsHandler.findAccountById('182')).toEqual(accountDetails);
  });
});
