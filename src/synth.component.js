// Tone.js library
// const Tone = require("Tone");

export class SynthComponent {

    constructor() {
        this.tone = require("Tone");
        this.synth = new this.tone.Synth();
        this.polySynth = new this.tone.PolySynth(4, this.tone.Synth);
    }

    wireUpSynth() {
        //synth key click event listener
        document.addEventListener('synthTriggerClick', e => {
            if(!e.detail.customClickcEventDetailMusicNote) {
                this.playSynthOnMouseClick(e);
                return;
            }
            this.playSynthOnCustomClick(e);
        });
    } 

    playSynthOnCustomClick(e) {
        //connect synth object to master audio output
        this.polySynth.toMaster();
        this.polySynth.triggerAttackRelease(e.detail.customClickcEventDetailMusicNote, "8n");
        this.handleKeyDownEvents(e);
    }

    playSynthOnMouseClick(e) {
        this.polySynth.toMaster();
        this.polySynth.triggerAttackRelease(e.detail.synthKeyValue, "8n");
    }

    handleKeyDownEvents(e) {
        let keyDownTargetElem = e.target;
        keyDownTargetElem.classList.add('active');        
    }
}

