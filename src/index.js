import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';
import SpeechApp from './app';

let speechApp = new SpeechApp({
    voiceBtnSelector: '#voiceBtn',
    textAreaSelector: '#text_area',
    wordSelector:'#pWord',
    gameResult: '#gameResult',
});

speechApp.init();