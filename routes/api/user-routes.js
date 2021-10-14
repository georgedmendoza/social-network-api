const router = require('express').Router();

const {
    createUser
} = require('../../controllers/user-controller')

router 
    .route(createUser)



module.export = router