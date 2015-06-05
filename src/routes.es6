import songs from './api/songs';
import crons from './api/crons';

export default function(app) {
  app.use('/api/songs', songs);
};

export default function(app) {
  app.use('/api/crons', crons);
};