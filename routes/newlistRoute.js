const express = require('express');
const newlistController = require('../controllers/newlistController');


const router=express.Router();

router.get('/',  newlistController.newlist_get);
router.post('/', newlistController.newlist_post);
router.get('/:id/:item', newlistController.list_new);

module.exports = router;