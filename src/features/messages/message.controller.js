const getAll = (_req, res) => {
  res.render('messages-board');
};

const createMessageGet = (req, res) => {
  res.render('create-message');
};

const createMessagePost = (req, res) => {
  res.render('create-message');
};

export { getAll, createMessageGet, createMessagePost };
