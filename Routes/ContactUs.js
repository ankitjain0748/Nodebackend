const router = require('express').Router();

const contact= require("../Controller/ContactController")

router.post("/contact", contact.contact);


module.exports = router