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

function postBears(req, res) {
	var bear = new Bear();      // create a new instance of the Bear model
	bear.name = req.body.name;  // set the bears name (comes from the request)

    // save the bear and check for errors
    bear.save(function(err) {
        if (err)
            res.send(err);
        res.json({ message: 'Bear created!' });
	});
}

module.exports = { getBears, postBears };