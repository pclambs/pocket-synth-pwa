import { Synth, Transport } from 'tone'

export class PocketSynth {
    synthNotes = ["C2", "E2", "G2", "A2", "C3", "D3", "E3", "G3", "A3", "B3", "C4", "D4", "E4", "G4", "A4", "B4", "C5"]
    harmonicity = 0.5
    modulationType = 'sine'

    constructor() {
        this.synth = new Synth({
            harmonicity: this.harmonicity,
            modulationType: this.modulationType,
        }).toDestination()
        this.transport = Transport
        this.transport.bpm.value = 125
    }

    moveNote({ x, y }) {
        const note = this.synthNotes[Math.round(x * (this.synthNotes.length -1))]
        this.synth.setNote(note)
        this.synth.harmonicity = y
    }
    
    triggerAttack({ x, y}) {
        const note = this.synthNotes[Math.round(x * (this.synthNotes.length -1))]
        this.synth.triggerAttack(note)
        this.synth.harmonicity = y
    }

    triggerRelease() {
        this.synth.triggerRelease()
    }
}