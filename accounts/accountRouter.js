const express = require("express");
const chalk = require('chalk');

const accountDB = require('../data/dbConfig')

const router = express.Router();


router.get("/", (req, res) => {
    
const query = req.query
    console.log(query.orderBy)
    accountDB.select("*")
        .from("accounts")
        .orderBy( 'name', `${query.orderBy}`)
        .limit(`${query.limit}`)
        
        .then(accounts => {
            res.status(200).json({ data: accounts });
        })
        .catch(error => {
            res.status(500).json(error)
         })

    
});

router.get("/:id", (req, res) => {
    const { id } = req.params;

    // select * from posts where id=1;
    accountDB.select("*")
        .from("accounts")
        // .where("id", "=", id)
        // .where("id", id)
        .where({ id })
        .first() // same as grabbing the first element from the array manuall with post[0]
        .then(accounts => {
            res.status(200).json({ data: accounts });
        })
        .catch(error => {
            res.status(500).json(error)
         })
});

router.post("/", (req, res) => {
    const accountData = req.body;

    // validate the data

    accountDB("accounts")
        .insert(accountData, "id")
        .then(ids => {
            accountDB("accounts")
                .where({ id: ids[0] })
                .first()
                .then(accounts => {
                    res.status(200).json({ data: accounts });
                });
        })
        .catch(error => {
            res.status(500).json(error)
         })
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    accountDB("accounts")
        .where({ id })
        .update(changes) // don't forget to have a WHERE
        .then(count => {
            // count is the number of records updated
            if (count > 0) {
                res.status(200).json({message:'Accounts updated with the following information', id, data:  req.body});
            } else {
                res.status(404).json({ message: "there was no accoutn to update" });
            }
        })
        .catch(error => {
            res.status(500).json(error)
         })
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const removed1 = req.body

    accountDB("accounts")
        .where({ id })
        .del(removed1) // don't forget to have a where
        .then(count => {
            // count is the number of records deleted
            if (count > 0) {
                res.status(200).json({message:'Account Deleted', id, data: req.body});
            } else {
                res.status(404).json({ message: "there was no record to delete" });
            }
        })
        .catch(error => {
            res.status(500).json(error)
         })
});



module.exports = router