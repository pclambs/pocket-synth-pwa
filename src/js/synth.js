import { Synth, Transport } from 'tone'
import AudioKeys from 'audiokeys'

export class PocketSynth {
    
    harmonicity = 0.5
    modulationType = 'sine'

    constructor() {
        this.synth = new Synth({
            harmonicity: this.harmonicity,
            modulationType: this.modulationType,
        }).toDestination()
        this.transport = Transport
        this.transport.bpm.value = 120

        // init activeNotes array. looks for notes being actively held down
        this.activeNotes = []

        // keeps track of current note being played
        this.currentlyPlayingNote = null

        // init audioKeys
        this.audiokeys = new AudioKeys()

        this.audiokeys.down(note => {
            // add new note to activeNotes array
            this.activeNotes.push(note.note)
            this.triggerAttackByKey(note)
        })

        this.audiokeys.up(note => {
            // find index of last released note and remove from array
            const index = this.activeNotes.lastIndexOf(note.note)
            if (index > -1) {
                this.activeNotes.splice(index, 1)
            }

            if (this.activeNotes.length > 0) {
                // fall back to previous note being held
                this.triggerAttackByKey({note: this.activeNotes[this.activeNotes.length - 1]})
            } else {
                // trigger release when no active notes
                this.triggerRelease()
            }
        
        })

        this.initUI()
    }

    initUI() {
        document.getElementById('attack').addEventListener('input', (e) => {
            this.setAttack(e.target.value)
        })

        document.getElementById('decay').addEventListener('input', (e) => {
            this.setDecay(e.target.value)
        })

        document.getElementById('sustain').addEventListener('input', (e) => {
            this.setSustain(e.target.value)
        })

        document.getElementById('release').addEventListener('input', (e) => {
            this.setRelease(e.target.value)
        })
    }

    setAttack(value) {
        this.synth.envelope.attack = value / 100
    }

    setDecay(value) {
        this.synth.envelope.decay = value / 100
    }

    setSustain(value) {
        this.synth.envelope.sustain = value / 100
    }

    setRelease(value) {
        this.synth.envelope.release = value / 100
    }

    midiToNote(midiNumber) {
        const noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
        const octave = Math.floor(midiNumber / 12) - 1
        const note = noteStrings[midiNumber % 12]
        return note + octave
    }

    triggerAttackByKey(note) {
        const keyNote = this.midiToNote(note.note)
        if (keyNote != this.currentlyPlayingNote) {
            this.synth.triggerAttack(keyNote)
            this.currentlyPlayingNote = keyNote
        }
    }

    triggerRelease() {
        if (this.activeNotes.length === 0) {
            this.synth.triggerRelease()
            this.currentlyPlayingNote = null
        }
    }
}