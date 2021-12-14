var express = require('express');
var router = express.Router();
const {viewSignin, actionSignIn, actionLogout} = require('./controller')

router.get('/', viewSignin);
router.post('/', actionSignIn);
router.get('/logout', actionLogout);

module.exports = router;
