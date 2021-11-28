const express = require("express");
const router = express.Router();
const skill = require("../controllers/skill.controller");
const authenticateToken = require("../middleware/auth");

router
  .route("/")
  .get(skill.search) // Fetch by page (Query parameters: search & page)
  .post(authenticateToken, skill.createSkill); // Add skill

router // Create skill WITH photo. API call as multipart form with "file" and "body"
  .post("/create-skill", authenticateToken, skill.createSkillWithPhoto);

router
  .route("/user/:userId?")
  .get(authenticateToken, skill.fetchByUser) // Fetch skills for user (Query parameter: status)

router
  .route("/:skillId")
  .get(skill.fetchOne) // Get single skill
  .delete(authenticateToken, skill.deleteSkill) // Delete skill
  .put(authenticateToken, skill.editSkill) // Edit skill
  .post(authenticateToken, skill.uploadSkillPic); // Upload skill picture

module.exports = router;
