const article = require("../models/article");

module.exports = {

  find: (req, res)=> {
    article.find().sort({_id:-1}).then( (data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });
  },

  create: (req, res) => {

    article.create(req.body).then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });
  },

  delete: (req, res) => {

    article.remove({
      _id: req.params.id
    }).then((data)=> {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });
  }
};
