
import { RotationComponent } from './rotation.component';

export class EnvelopeComponent {
    constructor(options) {
        this.envelopeTemplate = options.envelopeTemplate;
        //component container
        this._envelopeComponentElemContainer = document.createElement('div');
        this.envelopePanelElemArray = undefined;
        this.degrees = undefined;
        this.fontAwesomeSvgParentElems = [];
        this.dom = options.dom;
        this.fas = options.fas;
        this.library = options.library;
        this.adsrObjKnobParentElems = undefined;
        this.degrees = undefined;
        this.RotationComponent = new RotationComponent();
    }

    renderEnvelope() {
        this.createEnvelopePanel();
        this.createAdsrElems();
    }

    createEnvelopePanel() {
        this._envelopeComponentElemContainer.id = 'envelopePanelWrapper';

        const envelopePanel = document.createElement('div');
        envelopePanel.id = 'envelopePanel';

        const envelopePanelTextElem = document.createElement('div');
        envelopePanelTextElem.innerHTML = 'Envelope';
        envelopePanelTextElem.id = 'envelopePanelTitle';

        envelopePanel.appendChild(envelopePanelTextElem);
        this._envelopeComponentElemContainer.appendChild(envelopePanel);
    }

    createAdsrElems() {
        //create adsr knob elems and status elems
        const adsrKnobElemWrapper = document.createElement('div');
        adsrKnobElemWrapper.id = 'adsrKnobElemWrapper';

        const attackKnobIcon = document.createElement('i');
        attackKnobIcon.id = 'attackKnob';

        const decayKnobIcon = document.createElement('i');
        decayKnobIcon.id = 'decayKnob';

        const sustainKnobIcon = document.createElement('i');
        sustainKnobIcon.id = 'sustainKnob';

        const releaseKnobIcon = document.createElement('i');
        releaseKnobIcon.id = 'releaseKnob';

        const adsrStatusWrapper = document.createElement('div');
        adsrStatusWrapper.id = 'adsrStatusWrapper';

        const attackStatusElem = document.createElement('div');
        attackStatusElem.id = 'attackStatus';
        attackStatusElem.innerHTML = 'A';

        const decayStatusElem = document.createElement('div');
        decayStatusElem.id = 'decayStatus';
        decayStatusElem.innerHTML = 'D';

        const sustainStatusElem = document.createElement('div');
        sustainStatusElem.id = 'sustainStatus';
        sustainStatusElem.innerHTML = 'S';

        const releaseStatusElem = document.createElement('div');
        releaseStatusElem.id = 'releaseStatus';  
        releaseStatusElem.innerHTML = 'R';

        // array of objects containing adsr knob elems and status elements 
        this.envelopePanelElemArray = [{attackKnob:[attackStatusElem, attackKnobIcon]}, {decayKnob:[decayStatusElem, decayKnobIcon]}, 
        {sustainKnob:[sustainStatusElem, sustainKnobIcon]}, {releaseKnob:[releaseStatusElem, releaseKnobIcon]}];

        // append all adsr objects to parent elems and add icon class name to adsr status elems
        for (let adsrObj of this.envelopePanelElemArray) {
            let adsrObjStatusElems = Object.entries(adsrObj)[0][1][0];
            let adsrObjKnobElems = Object.entries(adsrObj)[0][1][1];

            //segment knobElems and add new div parent elements for each <i>(SVG) Knob
            if (adsrObjKnobElems.id.includes('Knob')) {
                this.adsrObjKnobParentElems = document.createElement('div');
                this.adsrObjKnobParentElems.id = `${adsrObjKnobElems.id}Parent`;
                adsrObjKnobElems.className = 'fas fa-circle-notch';
                this.adsrObjKnobParentElems.appendChild(adsrObjKnobElems);
            }

            adsrKnobElemWrapper.appendChild(this.adsrObjKnobParentElems);
            adsrStatusWrapper.appendChild(adsrObjStatusElems);
            this.wireUpAdsrEventListeners(this.adsrObjKnobParentElems);
        }

        this._envelopeComponentElemContainer.appendChild(adsrKnobElemWrapper);
        this._envelopeComponentElemContainer.appendChild(adsrStatusWrapper);
    }

    wireUpAdsrEventListeners(adsrObjKnobParentElements) {
        //initialize RotationComponent and pass in adsr div elems
        this.RotationComponent.init(adsrObjKnobParentElements);
    }

    get retrieveHtmlContainerElem() {
        return this._envelopeComponentElemContainer;
    }
}

