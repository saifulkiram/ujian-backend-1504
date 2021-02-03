//database
const db = require('../database')

module.exports = {
    getAllMovie : (req,res)=>{
        const queryallmovie = 'SELECT * FROM movies'

        db.query(queryallmovie, (err,result)=>{
            if(err) return res.status(500).send(err)

            res.status(200).send(result)
        })
    },

    getmovieupcoming : (req,res)=>{
        const querymovieupcoming = `SELECT * FROM movies WHERE status='1'`

        db.query(querymovieupcoming, (err,result)=>{
            if(err) return res.status(500).send(err)

            res.status(200).send(result)
        })
    },

    getmovieshowing :(req,res)=>{
        const querymovieshowing = `SELECT * FROM movies Where status='2'`

        db.query(querymovieshowing, (err,result)=>{
            if(err) return res.status(500).send(err)

            res.status(200).send(result)
        })
    },

    postmovies : (req,res)=>{
        const registermovieQuery = `INSERT INTO movies (name, genre, release_date, release_month, release_year, duration_min, description )
        VALUES (${db.escape(name)}, ${db.escape(genre)}, ${db.escape(release_date)}, ${db.escape(release_month)}, ${db.escape(release_year)}, ${db.escape(duration_min)}, ${db.escape(description)} )`
        db.query(registermovieQuery,(err,result)=>{
            if (err) return res.status(500).send(err)

            res.status(200).send(result)
        })
    },

    changetoupcomingmovies: (req,res) =>{
        const id = parseInt(req.params.id)
        const queryeditupcoming = `UPDATE movies 
                               SET status='1'
                               WHERE id=${db.escape(id)}`

        db.query(queryeditupcoming, (err1, result1)=>{
            if (err1) return res.status(500).send(err1)

            res.status(200).send(result1)
        })
    },

    changestoshowingmovies: (req,res) =>{
        const id = parseInt(req.params.id)
        const queryeditshowing = `UPDATE movies 
                               SET status='2'
                               WHERE id=${db.escape(id)}`

        db.query(queryeditshowing, (err2, result2)=>{
            if (err2) return res.status(500).send(err2)

            res.status(200).send(result1)
        })
    }
}