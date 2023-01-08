class AccountHandler {
  constructor() {
    this.accounts = [];
  }

  addAccount(account) {
    this.accounts.push(account);
  }

  listAccounts() {
    return this.accounts;
  }

  resetAccounts() {
    this.accounts = [];
  }
}

const accountsHandler = new AccountHandler();
export default accountsHandler;
