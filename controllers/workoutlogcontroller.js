const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { workoutlog } = require("../models");

router.get('/practice', validateJWT, (req, res) => {
    res.send('Hey! This is a practice route!')
});

/*
=============================
        Log Create check
=============================
*/
router.post('/log/', validateJWT, async (req, res) =>{
    const {description, definition, result} = req.body.workoutlog;
    const { id } = req.user;
    const logEntry = {
        description,
        definition,
        result,
        owner_id:id
    }
    console.log(logEntry)
    try {
        const newLog = await workoutlog.create(logEntry);
        res.status(200).json(newLog);
    } catch (err) {
        res.status(500).json({error: err});
    }
    // workoutlog.create(newLog) in try catch, 
});
/*
=================================
    Get Workout Log Entries check
=================================
*/
//get all user logs by id check
// router.get('/log/', validateJWT, async (req, res) =>{
//     const {id} = req.user;
    
//     try {
        
//         const userLogs = await workoutlog.findAll({
//             where:{
//                 owner_id: id
//             }
//         });
//         res.status(200).json(userLogs);
//     } catch (err) {
//         res.status(500).json({error: err});
//     }
// });
//get log by id check
router.get('/log/', validateJWT, async (req, res) =>{
    const {id:owner_id} = req.user;
    const id = req.params;
    // console.log(req.user.id)
    try {
        const userLog = await workoutlog.findAll({
            where: {
                owner_id,
                
            }
        });
        res.status(200).json(userLog);
    } catch (err) {
        res.status(500).json({error: err});
    }
});
/*
========================
        update log
========================
*/
router.put('/log/:id', validateJWT, async (req, res) =>{
    const {description, definition, result} = req.body.workoutlog;
    // const {id:user_id} = req.user;
    // const {id:log_id} = req.params; CORRECT SYNTAX BELOW TO REPLACE THIS
    const userID = req.user.id;
    const logID = req.params.id;
    console.log(userID);

    const query = {
        where:{
            id: logID,
            owner_id: userID
        }
    };

    const updatedworkoutlog = {
        description: description,
        definition: definition,
        result: result
    };
    
    try {
        const updatedLog = await workoutlog.update(updatedworkoutlog, query);
        console.log(updatedLog);
        res.status(200).json(updatedLog);
    } catch (err) {
        res.status(500).json({error: err});
    }
});
/*
============================
        Delete Log check
============================
*/
router.delete('/log/:id', validateJWT, async (req, res) =>{
    const userID = req.user.id;
    const logID = req.params.id;
    try {
        const query = {
            where: {
                id: logID,
                owner_id: userID
            }
        };
        await workoutlog.destroy(query);
        res.status(200).json({message: "Journal Entry Removed"});
    } catch (err) {
        res.status(500).json({error: err});
    }
});

router.get('/about', (req, res) => {
    res.send("This is the about route!");
});

module.exports = router;