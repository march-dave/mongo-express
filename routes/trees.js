var express = require('express');
var router = express.Router();

var Tree = require('../models/tree');


router.route('/')
  .get((req, res) => {

    // .sort() sort the results
    // .limit limit the numer of results
    // .select() limit the fields that will be in the results

    // paging
    var page = parseInt(req.query.page) || 1;


    // Tree.find({}, (err, trees) => {
    Tree
      .find({ age: {$lt: 30}})
      .skip( page * 20 - 20 )
      // .select( { species: 1, age: 1, _id: 0 } )
      .select( { } )
      .limit(req.query.limit)
      .sort({age: -1})
      .exec((err, trees) => {


      res.status(err ? 400 : 200).send(err || trees);


    });




  })
  .post((req, res) => {
    var tree = new Tree(req.body);

    console.log('tree:', tree);

    tree.save((err, savedTree) => {
      res.status(err ? 400 : 200).send(err || savedTree);
    });
  })

router.route('/:id')
  .get((req, res) => {
    Tree.findById(req.params.id, (err, tree) => {
      res.status(err ? 400 : 200).send(err || tree);
    });
  })
  .delete((req, res) => {
    Tree.findByIdAndRemove(req.params.id, (err, tree) => {
      res.status(err ? 400 : 200).send(err);
    });
  })
  .put((req, res) => {
    Tree.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (err, tree) => {
      res.status(err ? 400 : 200).send(err || tree);
    });
  })


router.put('/:id/:creature', (req, res) =>  {

  Tree.findById(req.params.id, (err, tree) => {
    if(err) return res.status(400).send(see);

    // var newCreature = req.body.creature;
    var newCreature = req.params.creature;
    // var newCreature = req.params.creature;
    console.log('req.body.creature: ', newCreature);
    tree.creatures.push(newCreature);

    tree.save((err, savedTree) => {
      res.status(err ? 400: 200).send(err|| savedTree);
    });


    // tree.save( function(err, savedTree) {
    //   res.status(err ? 400: 200).send(err|| savedTree);
    // });

  });
});

router.delete('/:id/:creature', (req, res) => {

  Tree.findById(req.params.id, (err, tree) => {
    if(err) return res.status(400).send(err);

    var index = tree.creatures.indexOf(req.params.creature);
    tree.creatures.splice(index, 1);

    tree.save((err, savedTree) => {
      res.status(err ? 400: 200).send(err || savedTree);
    });

  });

});


// route.rotue('/nest/:id')
//   .get((req, res) => {
//     //
//   })
  // .put((req, res ))



module.exports = router;
