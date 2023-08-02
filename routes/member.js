const express = require('express');
//const userauthentication = require('../middleware/auth');

const router = express.Router();

const memberController = require('../controllers/membercontrollers');

router.post('/add-member/:id',memberController.addMember);

router.get('/get-member/:id',memberController.getMember);

router.get('/get-member',memberController.getMembers);

router.delete('/delete-member/:id',memberController.deleteMember);

router.put('/make-admin/:id',memberController.makeAdmin);

module.exports = router;