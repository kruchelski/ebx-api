const health = (_, res) => {
  res.status(200).send('Server is up and running');
};

export { health };
