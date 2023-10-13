import '../css/styles.css'

import './db'
import { PocketSynth } from './synth'
import { Pad } from './pad'

const pocketSynth = new PocketSynth()

new Pad(
    data => pocketSynth.triggerAttack(data),
    () => pocketSynth.triggerRelease(),
    data => pocketSynth.moveNote(data),
)