import {
  Note, pitchClassDistance, semitonesToInterval, toPitchClass
} from '../../../src/libs/js-music/note'

describe('Note', () => {
  it('initializes a pitch class', () => {
    const note = new Note('C')
    expect(note.pitchClass).toEqual(0)
  })

  test('#equals', () => {
    const note1 = new Note('C')
    const note2 = new Note('C')
    const note3 = new Note('D')

    expect(note1.equals(note2)).toBeTruthy()
    expect(note1.equals(note3)).toBeFalsy()
  })

  test('#toString', () => {
    const c = new Note('c')
    const eSharp = new Note('e#')

    expect(c.toString()).toEqual('C')
    expect(eSharp.toString()).toEqual('F')
  })

  test('#addSemitones', () => {
    const rootNote = new Note('C')
    const nextWholeNote = rootNote.addSemitones(2)
    const octaveNote = rootNote.addSemitones(12)

    expect(nextWholeNote.toString()).toEqual('D')
    expect(octaveNote.toString()).toEqual('C')
  })

  test('#isAccidental', () => {
    expect((new Note('C').isAccidental())).toBeFalsy()
    expect((new Note('C#').isAccidental())).toBeTruthy()
  })
})

describe('toPitchClass', () => {
  it('accepts integers', () => {
    expect(toPitchClass(0)).toEqual(0)
    expect(toPitchClass(6)).toEqual(6)
    expect(toPitchClass(12)).toEqual(0)
  })

  it('accepts strings', () => {
    expect(toPitchClass('c')).toEqual(0)
    expect(toPitchClass('Gb')).toEqual(6)
    expect(toPitchClass('B')).toEqual(11)
  })

  it('rejects invalid strings', () => {
    expect(() => toPitchClass('Q')).toThrow()
  })

  it('rejects other data types', () => {
    expect(() => toPitchClass(5.6)).toThrow()
  })
})

test('semitonesToInterval', () => {
  expect(semitonesToInterval(5)).toEqual(4)
})

test('pitchClassDistance', () => {
  const [C, E, B] = [new Note('C'), new Note('E'), new Note('B')]

  expect(pitchClassDistance(C, E)).toEqual(4)
  expect(pitchClassDistance(E, C)).toEqual(4)

  expect(pitchClassDistance(C, B)).toEqual(1)
  expect(pitchClassDistance(B, C)).toEqual(1)

  expect(pitchClassDistance(E, B)).toEqual(5)
  expect(pitchClassDistance(B, E)).toEqual(5)
})