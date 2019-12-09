import { SynthComponent } from "./synth.component";

export class OscillatorComponent extends SynthComponent{
    constructor() {
        super();
        this.polySynth = new this.tone.PolySynth(4, this.tone.Synth);
        this.waveTypeEventArray = undefined;
    }

    wireUpSynth() {
        super.wireUpSynth();
        this.listenForWaveFormStatusEvents();
    }

    listenForWaveFormStatusEvents() {
        document.addEventListener('oscillatorStatusChange', waveTypeEvent => {
            // change state variable from undefined to oscillatorStatusChange event value
            return this.waveTypeEventArray = waveTypeEvent;
        });
    }

    playSynthOnCustomClick(e) {
        super.playSynthOnCustomClick(e);
        //check if member variable is not undefined
        if(this.waveTypeEventArray) {
            //pass in argument to set synth's oscillator type, which comes 
            //from oscillatorStatusChange event value
            this.polySynth.set(this.waveTypeEventArray.detail.waveFormTypeObj);
        } else {
            //if member variable is undefined, set oscillator type to sine by default
            this.polySynth.set({ 
                oscillator: {
                    type: 'sine'
                } 
            });
        }
    }

    playSynthOnMouseClick(e) {
        super.playSynthOnMouseClick(e);
        if(this.waveTypeEventArray) {
            this.polySynth.set(this.waveTypeEventArray.detail.waveFormTypeObj);
        } else {
            this.polySynth.set({ 
                oscillator: {
                    type: 'sine'
                } 
            });
        }
    }

}

