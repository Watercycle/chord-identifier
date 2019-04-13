export const NUM_CHORDS_DISPLAYED = 5

export const ATONAL_SCALES = [
  // Primary Scales
  { name: 'Ionian (Major)', semitones: [0, 2, 4, 5, 7, 9, 11] },
  { name: 'Dorian', semitones: [0, 2, 3, 5, 7, 9, 10] },
  { name: 'Phrygian', semitones: [0, 1, 3, 5, 7, 8, 10] },
  { name: 'Lydian', semitones: [0, 2, 4, 6, 7, 9, 11] },
  { name: 'Mixolydian', semitones: [0, 2, 4, 5, 7, 9, 10] },
  { name: 'Aeolian (Natural Minor)', semitones: [0, 2, 3, 5, 7, 8, 10] },
  { name: 'Locrian', semitones: [0, 1, 3, 5, 6, 8, 10] },

  // Altered Scales
  { name: 'Harmonic Minor', semitones: [0, 2, 3, 5, 7, 8, 11] },
  { name: 'Melodic Minor', semitones: [0, 2, 3, 5, 7, 9, 11] }
]

export interface ChordData {
  name: string
  quality_html: string
  quality: string
  semitones: number[]
}

export const ATONAL_CHORDS: ChordData[] = [
  // triads
  { name: 'major', quality_html: 'Maj', quality: 'maj', semitones: [0, 4, 7] }, // M3 + m3
  { name: 'minor', quality_html: 'Min', quality: 'min', semitones: [0, 3, 7] }, // m3 + M3
  { name: 'augmented', quality_html: 'Aug', quality: 'aug', semitones: [0, 4, 8] }, // M3 + M3
  { name: 'diminished', quality_html: 'Dim', quality: 'dim', semitones: [0, 3, 6] }, // m3 + m3
  { name: 'sustained 2nd', quality_html: 'Sus<sup>2</sup>', quality: 'sus', semitones: [0, 2, 7] }, // M2 + P4
  { name: 'sustained 4th', quality_html: 'Sus<sup>4</sup>', quality: 'sus', semitones: [0, 5, 7] }, // P4 + M2

  // 7th chords
  { name: 'major 7th', quality_html: 'Maj<sup>7</sup>', quality: 'maj', semitones: [0, 4, 7, 11] }, //  maj-maj
  { name: 'minor 7th', quality_html: 'min<sup>7</sup>', quality: 'min', semitones: [0, 3, 7, 10] }, // min-min

  { name: 'augmented 7th', quality_html: 'Aug<sup>7</sup>', quality: 'aug', semitones: [0, 4, 8, 10] }, // aug + m3
  { name: 'augmented-major 7th', quality_html: 'Aug<sup>M7</sup>', quality: 'aug', semitones: [0, 4, 8, 11] }, // aug + M3

  { name: 'half-dimished 7th', quality_html: 'Half-dim<sup>7</sup>', quality: 'dim', semitones: [0, 3, 6, 10] }, // dim + M3
  { name: 'dimished 7th', quality_html: 'Dim<sup>7</sup>', quality: 'dim', semitones: [0, 3, 6, 9] }, // dim + m3)

  { name: 'dominant 7th', quality_html: 'Dom<sup>7</sup>', quality: 'dom', semitones: [0, 4, 7, 10] }, // maj-min
  { name: 'minor-major 7th', quality_html: 'min-Maj<sup>7</sup>', quality: 'odd', semitones: [0, 3, 7, 11] } //  min-maj
]

export const INVERSIONS = [
  { inversion: 0, intervals: [3, 5] },
  { inversion: 0, intervals: [3, 5, 7] },

  { inversion: 1, intervals: [3, 6] },
  { inversion: 1, intervals: [3, 5, 6] },

  { inversion: 2, intervals: [4, 6] },
  { inversion: 2, intervals: [3, 4, 6] },

  { inversion: 3, intervals: [2, 4, 6] }
]

export const ACCIDENTALS = [1, 3, 6, 8, 10]

export const STRING_TO_PITCH_CLASS_MAP: { [key: string]: number } = {
  'C': 0,

  'C#': 1,
  'DB': 1,
  'C#/DB': 1,
  'DB/C#': 1,

  'D': 2,

  'D#': 3,
  'EB': 3,
  'D#/EB': 3,
  'EB/D#': 3,

  'E': 4,

  'E#': 5,
  'F': 5,

  'F#': 6,
  'GB': 6,
  'F#/Gb': 6,
  'Gb/F#': 6,

  'G': 7,

  'G#': 8,
  'AB': 8,
  'G#/AB': 8,
  'Ab/G#': 8,

  'A': 9,

  'A#': 10,
  'BB': 10,
  'A#/BB': 10,
  'Bb/A#': 10,

  'B': 11,
  'CB': 11
}

export const SEMITONES_TO_TONES_MAP: { [key: number]: number } = {
  // prime / union
  0: 1,

  // 2nd = m2/M2
  1: 2,
  2: 2,

  // 3rd = m3/M3
  3: 3,
  4: 3,

  5: 4, // 4th = P4
  6: 4, // Tritone = 'augmented 4th' / 'diminished 5th'

  // 5th = P5
  7: 5,

  // 6th = m6/M6
  8: 6,
  9: 6,

  // 7th = m7/M7
  10: 7,
  11: 7
}

export const PITCH_CLASS_TO_STRING_MAP: {[key: number]: string} = {
  0: 'C',
  1: 'C#/Db',
  2: 'D',
  3: 'D#/Eb',
  4: 'E',
  5: 'F',
  6: 'F#/Gb',
  7: 'G',
  8: 'G#/Ab',
  9: 'A',
  10: 'A#/Bb',
  11: 'B'
}