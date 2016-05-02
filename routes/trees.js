var express = require('express');
var router = express.Router();

var Tree = require('../models/tree');


// GET /api/trees   ===> return array of all trees
// GET /api/trees/id  ===> return one tree by id
// POST /api/trees  ===> create a new tress


/* GET users listing. */
router.get('/', (req, res) => {
  Tree.find({}, (err, trees) => {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send(trees);
    }
  });
});

/* GET /api/trees/:id */
router.get('/:id', (req, res) => {

  Tree.findById(req.params.id, (err, trees) => {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send(trees);
    }
  });
});

router.delete('/:id', (req, res) => {
  Tree.findByIdAndRemove(req.params.id, (err, trees) => {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send();
    }
  });

});

router.put('/:id', (req, res) => {

  // req.params.id --> docuemt id
  // req.body --> update obj

  Tree.findByIdAndUpdate(req.params.id,  {$set: req.body},  {new: true}, (err, tree) => {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send(tree);
    }
  });
});

router.post('/', (req, res) => {
  var tree = new Tree(req.body);
  tree.save((err, savedTree) => {

    if(err) {
      res.status(400).send(err);
    } else {
      res.send('savedTree');
    }
  });
});


module.exports = router;
