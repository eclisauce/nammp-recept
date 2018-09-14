import Startpage from './components/Startpage.class';
import '../scss/main.scss';

class App {
  constructor(name) {
    this.name = name;
    console.log(this.name);
    this.startpage = new Startpage('Skicka in något till Startpageklassen du vill logga');
  }
}
console.log('Huvudfilen');

const app = new App('App är instansierad');