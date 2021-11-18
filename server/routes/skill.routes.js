const express = require("express");
const router = express.Router();
const skill = require("../controllers/skill.controller");
const authenticateToken = require("../middleware/auth");

router
  .route("/")
  .get(skill.search) // Search for skills
  .post(authenticateToken, skill.createSkill); // Add skill

router
  .route("/user/:userId?")
  .get(authenticateToken, skill.fetchByUser) // Fetch skills for user (query parameter)

router
  .route("/:skillId")
  .get(skill.fetchOne) // Get single skill
  .delete(authenticateToken, skill.deleteSkill) // Delete skill
  .put(authenticateToken, skill.editSkill) // Edit skill
  .post(authenticateToken, skill.uploadSkillPic); // Upload skill picture

module.exports = router;
