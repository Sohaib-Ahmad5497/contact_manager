const express = require('express');
const { getContact, createContact, getContactFor, updateContact, deleteContact } = require('../controllers/contactController.js');
const validateToken = require('../midleware/validateTokenHandler.js');


const router = express.Router();

// router.route("/").get(getContact).post(createContact);
// router.route("/:id").get(getContactFor).put(updateContact).delete(deleteContact);


// router.route("/").get(getContact);
// router.route("/").post(createContact);
// router.route("/:id").get(getContactFor);
// router.route("/:id").put(updateContact);
// router.route("/:id").delete(deleteContact);

router.use(validateToken);

router.get("/", getContact)
router.post("/", createContact);
router.get("/:id", getContactFor)
router.put("/:id", updateContact)
router.delete("/:id", deleteContact)

module.exports = router;