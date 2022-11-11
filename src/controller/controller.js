const studentModel = require("../model/student")
const userModel = require("../model/user")
const jwt = require("jsonwebtoken")
// const bcrypt = require("bcrypt")

const add_user = async (req, res) => {
    try {
        console.log(req.body)
        if (!req.body) return res.status(400).send({ status: false, message: "please provide name,email and password" })

        const { name, email, password } = req.body

        if (!name && !email && !password ) return res.status(400).send({ status: false, message: "please fill all the fields" })

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) return res.status(400).send({ status: false, message: "Invalid email" })
        

        const findUser = await userModel.findOne({ email: email })
        if (findUser) return res.send({ status: false, message: "email already registered" })

        // let saltRounds = await bcrypt.genSalt(10)
        // let encryptedPassword = await bcrypt.hash(password, saltRounds)
        // req.body.password = encryptedPassword
        console.log(req.body)
        const createdUser = await userModel.create(req.body)
        // console.log(createdUser)
        return res.status(201).send(createdUser)
    } catch (error) {
        res.send(error)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email) return res.send({ status: false, message: "please enter email" })
        if (!password) return res.send({ status: false, message: "please enter password" })

        const findUser = await userModel.findOne({ email: email })
        if (!findUser) return res.send({ status: false, message: "email or password is incorrect" })

        // let encryptPassword = await bcrypt.compare(password, findUser.password)
        // if (!encryptPassword) return res.status(401).send({ Status: false, Msg: " Password is InCorrect!!!" })
        if (findUser.password!=password) return res.status(401).send({ Status: false, Msg: " Password is InCorrect!!!" })
        const token = jwt.sign({ userId: findUser._id }, "secret-key")
        // console.log(token)
        return res.status(200).send({status:true,token:token})

    } catch (error) {
        res.send(error)
    }
}

const add_Student = async (req, res) => {
    try {
        // console.log(req.body)
        const { name, subject, marks } = req.body
        req.body.userId = req.userId
        const findStudent = await studentModel.findOne({userId:req.userId,name:name,subject:subject})
        if(findStudent) {
            const updateStudent = await studentModel.findOneAndUpdate({userId:req.userId,name:name,subject:subject},{$inc:{marks:+marks}},{new:true})
            return res.status(201).send({status:true,data:updateStudent})
        }
        else{
        const createdStudent = await studentModel.create(req.body)
        return res.status(201).send({status:true,data:createdStudent})
        }
       

    } catch (error) {
        res.send(error)
    }
}
const get_Student = async (req, res) => {
    try {
        if (req.query.id) {
            const findStudents = await studentModel.findOne({ userId: req.userId, _id: req.query.id })
            return res.status(200).send(findStudents)
        }
        const findStudents = await studentModel.find({ userId: req.userId })
        res.status(200).send({status:true,data:findStudents})

    } catch (error) {
        res.send(error)
    }
}
const update_student = async (req, res) => {
    try {
        if (!req.body) return res.send({ status: false, message: "body required" })
        const id = req.params.id
        console.log(id,req.userId)
        const findStudent = await studentModel.findById(id)
        if (findStudent.userId != req.userId) return res.status(403).send({ status: false, message: "unAuthorized acess" })

        const updateStudent = await studentModel.findByIdAndUpdate(id, req.body, { new: true })
        return res.status(200).send(updateStudent)

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const delete_student = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        const findStudent = await studentModel.findById(id)
        if (findStudent.userId != req.userId) return res.send({ status: false, message: "unauthorized request" })

        const deleteStudent = await studentModel.findByIdAndDelete(id)
        res.status(200).send({status:true,message:"student deleted sucessfully"})
    } catch (error) {
        res.send(error)
    }
}

module.exports = { add_user, login, add_Student, get_Student, update_student, delete_student }