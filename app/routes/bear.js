var mongoose   = require('mongoose');

var Bear = require('../models/bear');

/**
* @swagger
* /api/bears:
*   get:
*     summary: Get all the bears
*     description:
*       "get all the bears (accessed at GET http://localhost:8080/api/bears)"
*     tags:
*       - Bears
*     parameters:
*       - name: authToken
*         in: header
*         type: string
*         required: true
*     responses:
*       200:
*         schema:
*           type: object
*           properties:
*             name:
*               type: string
*         examples:
*           application/json: {
*             "name": "somebear"
*           }
*       404:
*         description: Invalid auth token
*/
function getBears(req, res) {
	Bear.find(function(err, bears) {
        if (err)
            res.send(err);
        res.json(bears);
    });
}

/**
* @swagger
* /api/bears/id:
*   get:
*     summary: Get one bear by id
*     description:
*       "get one bear by id (accessed at GET http://localhost:8080/api/bears/id)"
*     tags:
*       - Bears
*     parameters:
*       - name: authToken
*         in: header
*         type: string
*         required: true
*       - name: id
*         in: path
*         type: integer
*         required: true
*     responses:
*       200:
*         schema:
*           type: object
*           properties:
*             name:
*               type: string
*         examples:
*           application/json: {
*             "name": "somebear"
*           }
*       404:
*         description: Invalid auth token
*/
function getBearById(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
        if (err)
            res.send(err);
        res.json(bear);
    })
}


/**
* @swagger
* /api/bears:
*   post:
*     summary: Create a new bear
*     description:
*       "Create a new bear (accessed at POST http://localhost:8080/api/bears)"
*     tags:
*       - Bears
*     parameters:
*       - name: bear
*         in: body
*         schema:
*           type: object
*           required:
*             - name
*           properties:
*             username:
*               type: string
*           example: {
*             "name": "somebear",
*           }

*     responses:
*       200:
*         description: OK
*       404:
*         description: Invalid auth token
*/
function postBears(req, res) {
	var bear = new Bear();      // create a new instance of the Bear model
	bear.name = req.body.name;  // set the bears name (comes from the request)

    // save the bear and check for errors
    bear.save(function(err) {
        if (err)
            res.send(err);
        res.json({ message: 'Bear created!', id: bear.id });
	});
}


/**
* @swagger
* /api/bears:
*   put:
*     summary: Update an existing bear
*     description:
*       "Update an existing bear (accessed at PUT http://localhost:8080/api/bears/id)"
*     tags:
*       - Bears
*     parameters:
*       - name: id
*         in: path
*         type: integer
*         required: true
*       - name: bear
*         in: body
*         schema:
*           type: object
*           required:
*             - name
*           properties:
*             username:
*               type: string
*           example: {
*             "name": "somebear",
*           }
*     responses:
*       200:
*         description: OK
*       404:
*         description: Invalid auth token
*/
function update(req, res) {
    // use our bear model to find the bear we want
    Bear.findById(req.params.bear_id, function(err, bear) {

        if (err)
            res.send(err);

        bear.name = req.body.name;  // update the bears info

        // save the bear
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear updated!' });
        });
    });
}

/**
* @swagger
* /api/bears:
*   delete:
*     summary: Delete an existing bear
*     description:
*       "Delete an existing bear (accessed at DELETE http://localhost:8080/api/bears/id)"
*     tags:
*       - Bears
*     parameters:
*       - name: id
*         in: path
*         type: integer
*         required: true
*     responses:
*       200:
*         description: OK
*       404:
*         description: Invalid auth token
*/
function remove(req, res) {
    Bear.remove({
        _id: req.params.bear_id
    }, function(err, bear) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
}
module.exports = { getBears, postBears, getBearById, update, remove};