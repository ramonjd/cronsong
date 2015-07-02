import express from 'express';
import Sound from './Sound';

let router = express.Router();

router.get('/', Sound.index);

module.exports = router;
