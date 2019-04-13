import {store} from './index'
import {playPianoKeys, stopAllSounds} from "./audio-player";
import {chordsFromKeys} from './libs/js-music/matcher'

export default function setupKeyboardShortcuts() {
  document.addEventListener('keypress', keyPressedEvent)
}

function keyPressedEvent(event: KeyboardEvent) {
  const key = event.code

  if (event.shiftKey && key === "Space") releaseAllKeys()
  else if (key === "Space") playSelectedKeys()
  else if (/Digit/.test(key)) playChordPrediction(parseInt(event.key) - 1)
}

function playSelectedKeys() {
  stopAllSounds()
  playPianoKeys(store.getState().pressedKeys)
}

function releaseAllKeys() {
  store.dispatch.pressedKeys.releaseAll()
  stopAllSounds()
}

function playChordPrediction(n: number) {
  const keys = store.getState().pressedKeys
  const chords = chordsFromKeys(keys)

  if (n < chords.length ) {
    playPianoKeys(chords[n]._displayNotes)
  }
}