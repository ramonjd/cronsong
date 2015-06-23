import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import CronManager from '../components/CronManager.jsx';
import SongManager from '../components/SongManager.jsx';


let uiConfig = {
    song: {
        header: Header,
        footer: Footer,
        section: SongManager
    },
  
    cron: {
        header: Header,
        footer: Footer,
        section: CronManager
    }
};

module.exports = uiConfig;