import { queryInversion } from '../../../src/libs/js-music/chord'
import { Note } from '../../../src/libs/js-music/note'

test('queryInversion', () => {
  const chordNotesC = [new Note('C'), new Note('E'), new Note('G')]

  const cMaj0 = [new Note('C'), new Note('E'), new Note('G')]
  const cMaj1 = [new Note('E'), new Note('G'), new Note('C')]
  const cMaj2 = [new Note('G'), new Note('C'), new Note('E')]

  const chordNotesF = [new Note('F'), new Note('A'), new Note('C')]
  const fMaj0 = [new Note('F'), new Note('A'), new Note('C')]
  const fMaj1 = [new Note('A'), new Note('C'), new Note('F')]
  const fMaj2 = [new Note('C'), new Note('F'), new Note('A')]

  expect(queryInversion(chordNotesC, cMaj0)).toEqual(0)
  expect(queryInversion(chordNotesC, cMaj1)).toEqual(1)
  expect(queryInversion(chordNotesC, cMaj2)).toEqual(2)

  expect(queryInversion(chordNotesF, fMaj0)).toEqual(0)
  expect(queryInversion(chordNotesF, fMaj1)).toEqual(1)
  expect(queryInversion(chordNotesF, fMaj2)).toEqual(2)
})