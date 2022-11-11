const express = require('express');
const router = express.Router();
//....................Controllers
const auth=require("../auth/auth")
const controller=require("../controller/controller")

router.post("/user",controller.add_user)
router.post("/login" ,controller.login)
router.post("/add-student" ,auth.authentication, controller.add_Student)
router.get("/all-students",auth.authentication,controller.get_Student)
router.put("/update-student/:id" ,auth.authentication, controller.update_student)
router.delete('/delete-student/:id',auth.authentication, controller.delete_student);

module.exports = router;