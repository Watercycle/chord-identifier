import { generateTonalChords } from '../../../src/libs/js-music/chords-generator'

describe('generateTonalChords', () => {
  let tonalChords = generateTonalChords()

  it('generates something', () => {
    expect(tonalChords.length).toBeGreaterThan(0)
  })
})