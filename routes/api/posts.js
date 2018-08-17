import express from 'express';

const router = express.Router();

// @route   GET api/users/test
// @desc    Test posts route
// @access  Public
router.get('/test', (req, res)=> res.json({message: 'Posts Works!'}));

export default router;