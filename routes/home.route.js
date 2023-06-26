const express = require('express');
const auth = require('../middleware/auth');
const contentSchema = require('../models/content');
const router = express.Router();

router.get('/', auth, async (req, res) => {
	try {
        res.send("this is home");
    } catch (error) {
		  res.sendStatus(500, error);
    }
})


router.get('/article', auth, async (req, res) => {
    const { user } = req;
    let lim = 3;
    switch(user?.role) {
        case "A":
            lim = 3;
            break;
        case "B":
            lim = 5;
            break;
        case "C":
            lim = 10;
            break;
    }
    try {
        let allRecords = await contentSchema.findAll({
            limit: lim,
            where: {
                videoPath: null,
            }
          });
        
        if(allRecords) {
            res.send({role: user?.role, totalRow: lim, data:allRecords});
        }else {
            res.sendStatus(404, "article not found");
        }
    } catch (error) {
		  res.sendStatus(500, error);
    }
})

router.get('/video', auth, async (req, res) => {
    const { user } = req;
    let lim = 3;
    switch(user?.role) {
        case "A":
            lim = 3;
        case "B":
            lim = 5;
        case "C":
            lim = 10;
    }
    try {
        let allRecords = await contentSchema.findAll({
            limit: lim,
            where: {
                content: null
            }
          });
        
        if(allRecords) {
            res.send({role: user?.role, totalRow: lim, data:allRecords});
        }else {
            res.sendStatus(500, 'err');
        }
    } catch (error) {
		  res.sendStatus(500, error);
    }
})

module.exports = router;