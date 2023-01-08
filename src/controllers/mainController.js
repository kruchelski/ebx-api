import { accountsHandler } from '../helpers/index.js';

const health = (_, res) => {
  res.status(200).send('Server is up and running');
};

const reset = (_, res) => {
  accountsHandler.resetAccounts();
  res.status(200).send('OK');
};

const addAccount = (_, res) => {
  accountsHandler.addAccount({ id: '123', balance: 300 });
  res.status(201).send();
};

const getAllAccounts = (_, res) => {
  res.status(200).send(accountsHandler.listAccounts());
};

export { health, reset, addAccount, getAllAccounts };
