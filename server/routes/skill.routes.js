const express = require("express");
const router = express.Router();
const skill = require("../controllers/skill.controller");
const authenticateToken = require("../middleware/auth");

router
  .route("/")
  .get(skill.search) // Fetch by page (query parameter)
  .post(authenticateToken, skill.createSkill); // Add skill
 
router
  .route("/:skillId")
  .get(skill.fetchOne) // Get single skill
  .delete(authenticateToken, skill.deleteSkill) // Delete skill
  .put(authenticateToken, skill.editSkill); // Edit skill

module.exports = router;
