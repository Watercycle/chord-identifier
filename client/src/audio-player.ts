import Soundfont, { Player } from 'soundfont-player'
import { isNull } from "./utils";

let piano: Promise<Player> | null;

setTimeout(() => {
  try {
    const ac = new AudioContext()
    piano = Soundfont.instrument(ac as any, '/soundfonts/fluidr3-piano-mp3.js' as any)
  } catch (e) {
    console.warn("Web Audio API not supported in this browser.")
  }
}, 1000)

export function playPianoKeys(keys: number[]) {
  if (isNull(piano)) return

  piano.then(audio => {
    // main keyboard spans 2 octaves. C3 = 48 in midi notation
    const midiNotes = keys.map(x => x + 48)

    // stop any previously resonating sounds
    audio.stop()

    // @ts-ignore: piano.playPianoKeys() takes strings AND numbers
    midiNotes.forEach(note => audio.play(note))
  })
}

export async function stopAllSounds() {
  if (isNull(piano)) return

  const audio = await piano
  audio.stop()
}