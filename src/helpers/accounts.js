class Account {
  constructor({ id, balance }) {
    this.id = id;
    this.balance = balance;
  }

  addBalance(balance) {
    this.balance += balance;
  }

  subtractBalance(balance) {
    this.balance -= balance;
  }
}

class AccountHandler {
  constructor() {
    this.accounts = [];
  }

  addAccount(accountDetails) {
    this.accounts.push(new Account(accountDetails));
  }

  resetAccounts() {
    this.accounts = [];
  }

  listAccounts() {
    return this.accounts;
  }
}

const accountsHandler = new AccountHandler();
export default accountsHandler;
