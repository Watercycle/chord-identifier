import { ATONAL_CHORDS } from './constants'
import { Note } from './note'
import { product } from "../../utils";
import _ from 'lodash'

const ROOT_NOTES: Note[] = [
  'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'
].map((n) => new Note(n))

function chordDisplayName(root: string, qualityHtml: string) {
  const rootHtml = root.replace('b', '<sup>♭</sup>').replace('#', '♯')
  const enharmonic = root.includes('/')

  if (enharmonic) {
    const dash = rootHtml.indexOf('/')
    const a = rootHtml.substr(0, dash)
    const b = rootHtml.substr(dash + 1, rootHtml.length)

    return `${a}<sup class='root'>\\${b}</sup> ${qualityHtml}`
  } else {
    return `${rootHtml} ${qualityHtml}`
  }
}

export interface GeneratedChord {
  root: string
  name: string
  notePCs: number[]
  quality: string
  numAccidentals: number

  // these values get mutated / generated on the fly
  _score: number
  _displayNotes: number[]
  _inversion: string
}

// Returns an array of formatted objects representing all common western
// tonal chords, grouped by their root note for faster lookup.
export function generateTonalChords(): GeneratedChord[][] {
  const rootsAndChords = product(ROOT_NOTES, ATONAL_CHORDS)

  const chords = rootsAndChords.map(([rootNote, chord]) => {
    const chordNotes = chord.semitones.map(st => rootNote.addSemitones(st))
    const numAccidentals = chordNotes.filter((note: Note) => note.isAccidental()).length

    return {
      root: rootNote.toString(),
      name: chordDisplayName(rootNote.toString(), chord.quality_html),
      notePCs: chordNotes.map(x => x.pitchClass),
      quality: chord.quality,
      numAccidentals: numAccidentals
    } as GeneratedChord
  })

  return Object.values(_.groupBy(chords, chord => chord.root))
}