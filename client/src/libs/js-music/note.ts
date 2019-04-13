import {
  STRING_TO_PITCH_CLASS_MAP,
  SEMITONES_TO_TONES_MAP,
  PITCH_CLASS_TO_STRING_MAP
} from './constants'

type Pitch = string | number | Note

// A musical note. It is backed by a pitch class.
// See `toPitchClass` for an explanation.
export class Note {
  pitchClass: number
  octave: number

  constructor(note: Pitch, octave = 0) {
    this.pitchClass = toPitchClass(note)
    this.octave = octave
  }

  equals(other: Note) {
    return this.pitchClass === other.pitchClass
  }

  toString() {
    return PITCH_CLASS_TO_STRING_MAP[this.pitchClass % 12]
  }

  // Returns true if this note is a black key on a piano.
  isAccidental() {
    return [1, 3, 6, 8, 10].includes(this.pitchClass)
  }

  // Returns a new note resulting from adding the given number of semitones
  // to the current note.
  addSemitones(numSemitones: number) {
    return new Note((this.pitchClass + toPitchClass(numSemitones)) % 12)
  }

  key() {
    return this.octave * 12 + this.pitchClass
  }
}

// Returns an integer representing the pitch class (PC) of the given value.
//
// See:
// https://en.wikipedia.org/wiki/Pitch_class
//
// In summary, C = 0, C#/Db = 1, D = 2, ..., A#/Bb = 10, B = 11.
// Values above 11 are wrapped with a pc.mod(12) operation.
//
// Example:
// ```
// > toPithClass(5)
// 5
// > toPitchClass('D')
// 2
// > toPitchClass(new Note('C#'))
// 1
// ```
export function toPitchClass(note: Pitch) {
  if (Number.isInteger(note as number)) return (note as number) % 12
  if (note instanceof Note) return note.pitchClass

  if (typeof (note) === 'string') {
    if (STRING_TO_PITCH_CLASS_MAP.hasOwnProperty(note.toUpperCase())) {
      return STRING_TO_PITCH_CLASS_MAP[note.toUpperCase()]
    } else {
      throw Error(`'${note}' isn't a note!`)
    }
  }

  throw Error('unspported type')
}

// Returns an integer representing the interval the given number of semitones.
//
// Example:
// ```
// > semitoneToInterval(7)
// 5
// ```
//
// Explanation:
// Consider the number of semitones between C and G...
// (C) C# D D# E F F# G
// C to G is a perfect 5th.
export function semitonesToInterval(semitones: number) {
  if (!Number.isInteger(semitones)) { throw Error('expected an integer') }
  if (!SEMITONES_TO_TONES_MAP.hasOwnProperty(semitones)) {
    throw Error('only supports semitones 0 - 11')
  }

  return SEMITONES_TO_TONES_MAP[semitones]
}

// Returns an integer representing the minimum number of semitones
// between two notes.
//
// Example:
// ```
// pitchClassDistance(new Note('C'), new Note('B'))
// 1
// pitchClassDistance(new Note('C'), new Note('B'))
// 1
// ```
export function pitchClassDistance(noteA: Pitch, noteB: Pitch) {
  const aPC = toPitchClass(noteA)
  const bPC = toPitchClass(noteB)
  const dPC = Math.abs(aPC - bPC)

  return Math.min(dPC, 12 - dPC)
}

// export function semitoneDistance(noteA: Note, noteB: Note) {
//   return Math.abs(noteA.key() - noteB.key())
// }