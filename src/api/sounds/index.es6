import express from 'express';
import Sound from './Sound';

let router = express.Router();

router.get('/', Sound.index);
router.get('/play/:sound', Sound.play);
router.get('/stop', Sound.stop);

module.exports = router;
