import { chordNotesMatchStrength, chordsFromNotes } from '../../../src/libs/js-music/matcher'
import { Note } from '../../../src/libs/js-music/note'
import _ from 'lodash'

describe('chordNotesMatchStrength', () => {
  const cMajor = chordsFromNotes([new Note('C'), new Note('E'), new Note('G')])[0]

  it('gets exact matches correct', () => {
    const queryNotes = [new Note('C'), new Note('E'), new Note('G')].map(n => n.pitchClass)
    const score = chordNotesMatchStrength(cMajor, queryNotes)

    expect(score).toBeGreaterThan(0.99)
  })

  it('scores closer matches higher', () => {
    const queryNotesGood = [new Note('C'), new Note('F'), new Note('G')].map(n => n.pitchClass)
    const queryNotesBetter = [new Note('C'), new Note('E'), new Note('F')].map(n => n.pitchClass)

    const goodScore = chordNotesMatchStrength(cMajor, queryNotesGood)
    const betterScore = chordNotesMatchStrength(cMajor, queryNotesBetter)

    expect(goodScore).toBeLessThan(betterScore)
  })

  it('scores bad matches low', () => {
    const queryNotes = [new Note('D')].map(n => n.pitchClass)
    const score = chordNotesMatchStrength(cMajor, queryNotes)

    expect(score).toBeLessThan(0.1)
  })
})

describe('chordsFromNotes', () => {
  test('basic', () => {
    const cMajorNotes = [new Note('C'), new Note('E'), new Note('G')]
    const matchedChords = chordsFromNotes(cMajorNotes)
    const bestMatch = _.maxBy(matchedChords, x => x._score)

    expect(bestMatch.root).toEqual('C')
    expect(bestMatch.quality).toEqual('maj')
    expect(bestMatch.notePCs.length).toEqual(3)
    expect(bestMatch._inversion).toEqual(null)
    expect(bestMatch.notePCs.map(n => (new Note(n)).toString())).toEqual(['C', 'E', 'G'])
  })

  test('it handles inversions predictably', () => {
    const fMaj1 = [new Note('A'), new Note('C'), new Note('F')]
    const fMaj2 = [new Note('C'), new Note('F'), new Note('A')]

    const topMatch1 = chordsFromNotes(fMaj1)[0]
    expect(topMatch1._inversion).toMatch(/1/)
    expect(topMatch1._displayNotes.map(n => (new Note(n)).toString())).toEqual(['A', 'C', 'F'])

    const topMatch2 = chordsFromNotes(fMaj2)[0]
    expect(topMatch2._inversion).toMatch(/2/)
    expect(topMatch2._displayNotes.map(n => (new Note(n)).toString())).toEqual(['C', 'F', 'A'])

    const topMatch3 = chordsFromNotes(fMaj1)[0]
    expect(topMatch3._inversion).toMatch(/1/)
    expect(topMatch3._displayNotes.map(n => (new Note(n)).toString())).toEqual(['A', 'C', 'F'])

    const topMatch4 = chordsFromNotes(fMaj2)[0]
    expect(topMatch4._inversion).toMatch(/2/)
    expect(topMatch4._displayNotes.map(n => (new Note(n)).toString())).toEqual(['C', 'F', 'A'])
  })
})