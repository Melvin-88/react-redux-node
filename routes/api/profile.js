import express from 'express';

const router = express.Router();

// @route   GET api/users/test
// @desc    Test profile route
// @access  Public
router.get('/test', (req, res)=> res.json({message: 'Profile Works!'}));

export default router;