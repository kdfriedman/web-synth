import { OscillatorComponent } from "./oscillator.component";
import { ControlBoardComponent } from "./control-board.component";
import { keyAmount } from "./config";
import { keyLetterDictionary, waveFormTypes } from "./const.js";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

class AppComponent {
  constructor() {
    this.dom = dom;
    this.library = library;
    this.fas = fas;
  }

  init() {
    this.bootstrapComponents();
  }

  bootstrapComponents() {
    const renderOptions = {
      keyAmount: keyAmount,
      keyLetterDictionary: keyLetterDictionary,
      waveFormTypes: waveFormTypes,
    };

    const controlBoard = new ControlBoardComponent(renderOptions);
    controlBoard.renderKeyboard();

    const oscillator = new OscillatorComponent();
    oscillator.wireUpSynth();
  }
}

const App = new AppComponent();
App.init();
