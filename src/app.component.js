import { OscillatorComponent } from "./oscillator.component";
import { ControlBoardComponent } from "./control-board.component";
import { keyAmount } from "./config";
import {
  keyLetterDictionary,
  waveFormTypes,
  envelopeTemplate,
} from "./const.js";
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
    this.convertSVGElementsOnLoad();
  }

  bootstrapComponents() {
    const renderOptions = {
      keyAmount: keyAmount,
      keyLetterDictionary: keyLetterDictionary,
      waveFormTypes: waveFormTypes,
      envelopeTemplate: envelopeTemplate,
    };

    const controlBoard = new ControlBoardComponent(renderOptions);
    controlBoard.renderKeyboard();

    const oscillator = new OscillatorComponent();
    oscillator.wireUpSynth();

    //getter returns keyboard component html container to use as parent element
    controlBoard.retrieveHtmlContainerElem.children[0].children[0].children[0].appendChild(
      envelope.retrieveHtmlContainerElem
    );
  }

  convertSVGElementsOnLoad() {
    this.library.add(this.fas);
    this.dom.i2svg().then((svgElemLoaded) => console.log("svgs done"));
  }
}

const App = new AppComponent();
App.init();
