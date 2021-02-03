//module
const {validationResult} = require('express-validator')
const cryptoJS = require('crypto-js')

//helper
const {asyncQuery} = require('../helper/queryhelp')
const{createToken} = require('../helper/jwt')


// database connect
const db = require('../database')


// dotnev import
const SECRET_KEY = process.env.CRYPTO_KEY

// export user controller
module.exports = {
    getAlluser: (req,res) => {
        const userQuery = 'SELECT * FROM users'
        db.query(userQuery,(err,result) =>{
            if (err) return res.status(500).send(err)

            res.status(200).send(result)
        })
    },
    register : async (req,res) =>{
        const {username, email, password} = req.body

        //validasi user
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)

        const hashpassword = cryptoJS.HmacMD5(password, SECRET_KEY)

        try{
            const checkuser = `SELECT * FROM users
                               WHERE username=${db.escape(username)}
                               OR email=${db.escape(email)}`
            const rescheck = await asyncQuery(checkuser)

            if (rescheck.length !==0) return res.status(400).send('Username & Email already registered')
            // if (rescheck.username.length < 6) return res.status(400).send('Username must be 6 character minimum')
            // if (rescheck.password.length < 6) return res.status(400).send('Password must be 6 character minimum')

            const registerQuery = `INSERT INTO users (uid, username, email, password, role )
                                   VALUES (${db.escape(Date.now.toString())}, ${db.escape(username)}, ${db.escape(email)}, ${db.escape(hashpassword.toString())}, ${db.escape(1)} )`
            
            const resregister = await asyncQuery(registerQuery)

            //token
            const token = createToken({ id : resregister.insertId, username: username})

            res.status(200).send(info.response)
        }
        catch (err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    login : (req,res) =>{
        const {username, password} = req.body

        const hasspassword = cryptoJS.HmacMD5(password, SECRET_KEY)

        const loginQuery = `SELECT * FROM users
                            WHERE username='${username}'
                            AND password='${db.escape(hasspassword.toString())}`
        
        db.query(loginQuery, (err, result) =>{
            if (err) return res.status(500).send(err)

            // login eror
            if (result.length === 0) return res.status(400).send('Username & Password is Wrong')

            //token
            let token = createToken({ id: result[0].id, username: result[0].username })
            
            res.status(200).send(result[0])
        })
    },

    deactivate : (req,res) =>{
        const id = parseInt(req.params.id)
        const querydeactive = `UPDATE users 
                               SET status='2'
                               WHERE id=${db.escape(id)}`

        db.query(querydeactive, (err1, result1)=>{
            if (err1) return res.status(500).send(err1)

            res.status(200).send(result1)
        })
    },

    activate : (req,res) =>{
        const id = parseInt(req.params.id)
        const querydeactive = `UPDATE users 
                               SET status='1'
                               WHERE id=${db.escape(id)}`

        db.query(querydeactive, (err2, result2)=>{
            if (err2) return res.status(500).send(err2)

            res.status(200).send(result2)
        })
    },

    closed : (req,res) =>{
        const id = parseInt(req.params.id)
        const querydeactive = `UPDATE users 
                               SET status='3'
                               WHERE id=${db.escape(id)}`

        db.query(querydeactive, (err3, result3)=>{
            if (err3) return res.status(500).send(err3)

            res.status(200).send(result3)
        })
    }
}