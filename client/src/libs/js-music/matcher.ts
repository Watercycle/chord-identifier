import { NUM_CHORDS_DISPLAYED } from './constants'
import { GeneratedChord, generateTonalChords } from './chords-generator'
import {inversionText, queryInversion} from './chord'
import {Note} from './note'
import {rotated} from "../../utils";

// numShared / numUnique
function fastJaccard<T>(a: T[], b: T[]): number {
  const set: any = new Array(12)
  let numShared = 0
  let numUnique = a.length

  for (let i = 0; i < a.length; i++) {
    set[a[i]] = true
  }

  for (let i = 0; i < b.length; i++) {
    if (set[b[i]]) {
      numShared++
    } else {
      numUnique++
    }
  }

  return numShared / numUnique
}

// Return a number from 0 to 1 indicating how likely the notes used
// comes from the given chord.ts
export function chordNotesMatchStrength(chord: any, queryNotePCs: number[]) {
  const notePCs = chord.notePCs
  const quality = chord.quality
  const numAccidentals = chord.numAccidentals

  // use jaccard similarity as the base score
  let score = fastJaccard(notePCs, queryNotePCs)

  // the root note is pretty important
  if (queryNotePCs.includes(notePCs[0])) score += 0.06

  // the third is also pretty important (for chord.ts qualities)
  if (queryNotePCs.includes(notePCs[1])) score += 0.04

  // triads are more common than 7th chords
  if (queryNotePCs.length === 2 && notePCs.length === 4) score -= 0.10
  if (queryNotePCs.length === 3 && notePCs.length === 4) score -= 0.06

  // chord.ts qualities such as major and minor are pretty darn common
  if (quality === 'maj') score += 0.05
  if (quality === 'min') score += 0.04
  if (quality === 'dom') score += 0.03

  // we want simple chords, not the weird fancy ones
  score -= numAccidentals * 0.01

  return score
}

// function prettifyScore(score) {
//   return _.round(_.clamp(score, 0, 1), 2)
// }

let CHORDS: GeneratedChord[][] = []

setTimeout(() => {
  CHORDS = generateTonalChords()
}, 500)

const MIN_SCORE = 0.35

function chordsFromNotesRaw(queryPCs: number[]): GeneratedChord[] {
  const results = []

  for (let j = 0; j < CHORDS.length; j++) {
    const chords = CHORDS[j]

    // get best matching chord of each root
    let bestChord = null
    let bestChordScore = 0
    for (let i = 0; i < chords.length; i++) {
      const chord = chords[i]
      const score = chordNotesMatchStrength(chord, queryPCs)

      if (score > bestChordScore) {
        bestChord = chord
        bestChordScore = score
      }
    }

    // filter out worthwhile chords and keep their score
    if (bestChordScore > MIN_SCORE) {
      bestChord._score = bestChordScore
      results.push(bestChord)
    }
  }

  // higher scores to the front of the array
  results.sort((c1, c2) => c2._score - c1._score)

  for (let i = 0; i < results.length; i++) {
    const chord = results[i]
    const inversion = queryInversion(chord.notePCs, queryPCs)

    chord._inversion = inversionText(inversion)

    const rotatedNotes = rotated(chord.notePCs, inversion)
    chord._displayNotes = mapNotesToKeys(rotatedNotes)
  }

  return results.slice(0, NUM_CHORDS_DISPLAYED)
}

export function chordsFromNotes(notes: Note[]): GeneratedChord[] {
  if (notes.length === 0) return []

  const queryPCs = notes.map(x => x.pitchClass)
  return chordsFromNotesRaw(queryPCs)
}

export function chordsFromKeys(keys: number[]) {
  return chordsFromNotes(keys.map(key => new Note(key)))
}

function mapNotesToKeys(notePCs: number[]) {
  const rootPC = notePCs[0]
  return notePCs.map(notePC => notePC < rootPC ? notePC + 12 : notePC)
}
