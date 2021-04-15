export class KeyboardComponent {
  constructor(options) {
    this.keyAmount = options.keyAmount;
    this.keyLetterDictionary = options.keyLetterDictionary;
    this.synthControlDiv = undefined;
    this.keyDownEventFired = false;
    this.keyEnabledArray = Array(222).fill(true);
    this._keyboardComponentElemContainer = document.createElement("div");
    this.render = undefined;
    this.synthTrigger = undefined;
    this.synthKeyValue = undefined;
  }

  renderKeyboard() {
    // create DOM elements
    const body = document.body;
    const header = document.createElement("header");
    const main = document.createElement("main");

    this.synthControlDiv = document.createElement("DIV");
    this.synthControlDiv.className = "synthControls";
    const leftPanel = document.createElement("div");
    const rightPanel = document.createElement("div");
    leftPanel.id = "leftPanel";
    rightPanel.id = "rightPanel";

    const synthTriggerParentDiv = document.createElement("DIV");

    //hang DOM elements off parent elements
    header.appendChild(main);
    main.appendChild(this.synthControlDiv);
    main.appendChild(synthTriggerParentDiv);
    this.synthControlDiv.appendChild(leftPanel);
    this.synthControlDiv.appendChild(rightPanel);

    this._keyboardComponentElemContainer.id = "keyboardContainer";
    this._keyboardComponentElemContainer.appendChild(header);

    synthTriggerParentDiv.classList.add("synthTriggerWrapper");

    // filter all page scripts and check for script name 'bundle'
    const bundleJSScript = [
      ...document.querySelectorAll("script"),
    ].filter((scriptEl) => scriptEl.src.includes("bundle"));

    // bundle.js script
    const script = bundleJSScript[0];

    // prevent elems from appending after script in body
    this.render = body.insertBefore(
      this._keyboardComponentElemContainer,
      script
    );

    // checks to make sure the keyboard exists
    if (!this.render) {
      console.error("error rendering keyboard");
      return false;
    }

    this.generateKeyboardElems(
      synthTriggerParentDiv,
      this.synthTrigger,
      this.synthKeyValue
    );
    this.listenForKeyUpEvents(synthTriggerParentDiv);
  }

  generateKeyboardElems(synthTriggerParentDiv, synthTrigger, synthKeyValue) {
    let keys = this.keyAmount;

    // loop synth keys to build synth keyboard
    for (let i = 0; i <= keys; i++) {
      synthTrigger = document.createElement("button");

      //add class for styling keys
      synthTrigger.classList.add("keys");

      // generate key ids
      synthTrigger.id = `key-${i}`;

      // check to see that keyLetterDictionary's keys exists
      if (
        !this.keyLetterDictionary ||
        typeof this.keyLetterDictionary[i].musicNote !== "string"
      ) {
        console.error(
          `keyLetterDictionary does not exist and is ${this.keyLetterDictionary}`
        );
        return false;
      }

      //create dataset using keyLetterDictionary
      synthKeyValue = synthTrigger.dataset.keyLetterDictionary = this.keyLetterDictionary[
        i
      ].musicNote;

      this.addEventListenersToSynthKeyElems(synthTrigger, synthKeyValue);

      //append synth trigger elements to parent elements
      synthTriggerParentDiv.appendChild(synthTrigger);
    }

    this.listenForKeyDownEvents(synthTriggerParentDiv);
  }

  createCustomClickEventListener(
    synthKeyValue,
    synthTrigger,
    customClickcEventDetailMusicNote,
    synthTriggerElemId
  ) {
    const synthTriggerClickEvent = new CustomEvent("synthTriggerClick", {
      bubbles: true,
      detail: {
        synthTriggerClick: "click",
        synthKeyValue: synthKeyValue,
        customClickcEventDetailMusicNote: customClickcEventDetailMusicNote,
        synthTriggerElemId: synthTriggerElemId,
        activeClass: "active",
      },
    });

    synthTrigger.dispatchEvent(synthTriggerClickEvent);
  }

  addEventListenersToSynthKeyElems(synthTrigger, synthKeyValue) {
    // create click event for synth to listen for
    synthTrigger.addEventListener("click", (e) => {
      this.createCustomClickEventListener(synthKeyValue, synthTrigger);
    });

    synthTrigger.addEventListener("customClick", (e) => {
      const customClickcEventDetailMusicNote = e.detail.letterKey.musicNote;
      const synthTriggerElemId = e.detail.letterKey.btnElemId;

      this.createCustomClickEventListener(
        synthKeyValue,
        synthTrigger,
        customClickcEventDetailMusicNote,
        synthTriggerElemId
      );
    });
  }

  listenForKeyDownEvents(synthTriggerParentDiv) {
    // create keydown event to trigger customClick event
    // create custom event listener to minic mouse click
    // pass along event detail containing dictionary note and event key
    document.addEventListener("keydown", (e) => {
      // create array with truthy values that encompass entire event keyCode range

      if (this.keyEnabledArray[e.keyCode]) {
        // set current selected keys as false
        this.keyEnabledArray[e.keyCode] = false;

        this.keyLetterDictionary.forEach((letterKey) => {
          const clickEvent = new CustomEvent("customClick", {
            bubbles: true,
            detail: {
              customClick: "click",
              letterKey: letterKey,
            },
          });

          // check to see if key pressed exists within keyLetterDictionary
          if (letterKey.keyboardLetter.indexOf(e.key) > -1) {
            // finds all btn elements and maps them to btnElemId of keyLetterDictionary
            const btnElemIdEventEmitter =
              synthTriggerParentDiv.childNodes[letterKey.btnElemId];
            btnElemIdEventEmitter.dispatchEvent(clickEvent);
            return;
          }
        });
      }
    });
  }

  listenForKeyUpEvents(synthTriggerParentDiv) {
    document.addEventListener("keyup", (e) => {
      this.keyEnabledArray[e.keyCode] = true;
      this.keyLetterDictionary.forEach((letterKey) => {
        // check to see if key released exists within keyLetterDictionary
        if (letterKey.keyboardLetter.indexOf(e.key) > -1) {
          // finds all btn elements and maps them to btnElemId of keyLetterDictionary
          synthTriggerParentDiv.childNodes[
            letterKey.btnElemId
          ].classList.remove("active");
        }
      });
    });
  }
}
