import express from 'express';
import Cron from './Cron';

let router = express.Router();

router.get('/', Cron.index);
//router.get('/:comment', Cron.getJobByComment);
router.post('/', Cron.create);
//router.delete('/:comment', Cron.delete);

module.exports = router;
