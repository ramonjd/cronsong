import express from 'express';
import Song from './Cron';

let router = express.Router();

router.get('/', Cron.index);
router.put('/', Cron.save);
router.get('/:user', Cron.getCronByUser);

module.exports = router;
