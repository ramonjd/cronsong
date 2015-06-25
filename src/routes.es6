import songs from './api/songs';
import crons from './api/crons';
import sounds from './api/sounds';

export default function(app) {
  app.use('/api/songs', songs);
  app.use('/api/crons', crons);
  app.use('/api/sounds', sounds);
};
