import { KeyboardComponent } from "./keyboard.component";

export class ControlBoardComponent extends KeyboardComponent {
    constructor(options) {
        super(options);
        this.waveFormTypes = options.waveFormTypes;
    }

    renderKeyboard() {
        super.renderKeyboard();
        this.createOcsillatorPanel();
    }


    createOcsillatorPanel() {
        const oscillatorPanelElem = document.createElement('div');
        const oscillatorPanelElemTextElem = document.createElement('div');
        const waveFormTypeWrapper = document.createElement('div');
        const waveFormActiveStatusElemWrapper = document.createElement('div');

        oscillatorPanelElemTextElem.innerHTML = 'Oscillator';
        oscillatorPanelElemTextElem.id = 'oscillatorPanelTitle';
        oscillatorPanelElem.id = 'oscillatorPanel';
        waveFormTypeWrapper.id = 'waveFormTypeWrapper'
        waveFormActiveStatusElemWrapper.id = 'waveFormActiveStatusElemWrapper';

        this.synthControlDiv.appendChild(oscillatorPanelElem);
        oscillatorPanelElem.appendChild(oscillatorPanelElemTextElem);
        oscillatorPanelElem.appendChild(waveFormTypeWrapper);
        oscillatorPanelElem.appendChild(waveFormActiveStatusElemWrapper);

        this.createWaveFormTypeElems(waveFormActiveStatusElemWrapper, waveFormTypeWrapper);
    }

    listenForWaveFormTypeButtonClicks(waveForm, waveFormActiveStatusElem, waveFormActiveStatusElemWrapper) {
        waveForm.addEventListener('click', (e) => {
            for (let waveFormElem of waveFormActiveStatusElemWrapper.children) {
                waveFormElem.classList.remove('waveFormActiveStatus');
            }
            waveFormActiveStatusElem.classList.add('waveFormActiveStatus');

            this.dispatchEnvelopeStatusEvent(waveForm, this.waveFormTypes);
        })
    }

    createWaveFormTypeElems(waveFormActiveStatusElemWrapper, waveFormTypeWrapper) {
        this.waveFormTypes.forEach(type => {
            if(!type || typeof type.oscillator.type !== 'string' || type.oscillator.type === '') {
                console.error(`waveFormTypes is not formatted correctly and equal to ${type}`);
                return false;
            }
            const waveFormActiveStatusElem = document.createElement('div');
            const waveFormBtnElem = document.createElement('button');

            waveFormBtnElem.innerHTML = type.oscillator.type;
            waveFormBtnElem.id = type.oscillator.type;
            waveFormActiveStatusElem.id = `${type.oscillator.type}Status`;
            waveFormBtnElem.dataset.waveForm = type.oscillator.type;

            if(waveFormBtnElem.id === 'sine') {
                waveFormActiveStatusElem.classList.toggle('waveFormActiveStatus');
            }
                       
            waveFormTypeWrapper.appendChild(waveFormBtnElem);
            waveFormActiveStatusElemWrapper.appendChild(waveFormActiveStatusElem);
            this.listenForWaveFormTypeButtonClicks(waveFormBtnElem, waveFormActiveStatusElem, waveFormActiveStatusElemWrapper);
        });        
    }

    dispatchEnvelopeStatusEvent(waveFormElem, waveFormTypeObjs) {
        //iterate through array of waveFormType objects
        waveFormTypeObjs.forEach(waveFormTypeObj => {
            //grab waveform values of nested array objects
            const waveFormObjValues = Object.values(waveFormTypeObj);
            // match the waveFormTypeElem with it's corresponding waveFormType Obj Value
            if(waveFormObjValues[0].type === waveFormElem.id){
                const oscillatorStatusChangeEvent = new CustomEvent('oscillatorStatusChange', {
                    bubbles: true,
                    detail: {
                        waveFormTypeObj: waveFormTypeObj,
                        waveFormElemId: waveFormElem.id 
                    }
                });
                waveFormElem.dispatchEvent(oscillatorStatusChangeEvent);
            }
        });
    }

    get retrieveHtmlContainerElem() {
        return this._keyboardComponentElemContainer;
    }

}
