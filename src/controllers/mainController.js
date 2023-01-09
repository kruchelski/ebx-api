import { accountsHandler } from '../helpers/index.js';

const DEFAULT_ERROR_MSG = 'internal server error';

const checkHealth = (_, res) => {
  res.status(200).send('Server is up and running');
};

const resetAccounts = (_, res) => {
  accountsHandler.resetAccounts();
  res.status(200).send('OK');
};

const listAccounts = (_, res) => {
  res.status(200).send(accountsHandler.listAccounts());
};

const getBalance = (req, res) => {
  try {
    if (!req?.query?.account_id) return res.status(400).send('account_id not provided');
    const id = req.query.account_id;
    const balance = accountsHandler.getBalanceFromAccount(id);
    if (balance === null) return res.status(404).json(0);
    res.status(200).json(balance);
  } catch (error) {
    const { message = DEFAULT_ERROR_MSG } = error;
    res.status(500).send(message);
  }
};

const depositValue = (req, res) => {
  try {
    const {
      body: { destination, amount },
    } = req;
    if (destination === undefined) return res.status(400).send('destination not provided');
    if (amount === undefined) return res.status(400).send('amount not provided');
    const account = accountsHandler.deposit(destination, amount);
    res.status(201).send({ destination: account });
  } catch (error) {
    const { message = DEFAULT_ERROR_MSG } = error;
    res.status(500).send(message);
  }
};

const withdrawValue = (req, res) => {
  try {
    const {
      body: { origin, amount },
    } = req;
    if (origin === undefined) return res.status(400).send('origin not provided');
    if (amount === undefined) return res.status(400).send('amount not provided');
    const account = accountsHandler.withdraw(origin, amount);
    if (!account) return res.status(404).json(0);
    res.status(201).send({ origin: account });
  } catch (error) {
    const { message = DEFAULT_ERROR_MSG } = error;
    res.status(500).send(message);
  }
};

const transferValue = (req, res) => {
  try {
    const {
      body: { origin, amount, destination },
    } = req;
    if (origin === undefined) return res.status(400).send('origin not provided');
    if (amount === undefined) return res.status(400).send('amount not provided');
    if (destination === undefined) return res.status(400).send('destination not provided');
    const transferResult = accountsHandler.transfer(origin, destination, amount);
    if (!transferResult) return res.status(404).json(0);
    const { originAccount, destinationAccount } = transferResult;
    res.status(201).send({ origin: originAccount, destination: destinationAccount });
  } catch (error) {
    const { message = DEFAULT_ERROR_MSG } = error;
    res.status(500).send(message);
  }
};

const processAccountEvent = (req, res) => {
  try {
    const {
      body: { type },
    } = req;
    if (!type) return res.status(400).send('type not provided');

    const allProcesses = {
      deposit: depositValue,
      withdraw: withdrawValue,
      transfer: transferValue,
    };

    const eventProcessor = allProcesses[type];
    if (!eventProcessor) return res.status(400).send('type is not valid');

    eventProcessor(req, res);
  } catch (error) {
    const { message = DEFAULT_ERROR_MSG } = error;
    res.status(500).send(message);
  }
};

export { checkHealth, listAccounts, resetAccounts, getBalance, processAccountEvent };
