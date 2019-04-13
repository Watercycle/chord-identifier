import { includesInOrder, rotated } from '../../utils'
import _ from 'lodash'

export function inversionText(inversion: number) {
  if (inversion === 1) { return '1st inv.' }
  if (inversion === 2) { return '2nd inv.' }
  if (inversion === 3) { return '3rd inv.' }

  return null
}

export function queryInversion(chordNotes: any[], queryNotes: any[]) {
  const inversions = _.range(chordNotes.length).map(inv =>
    [inv, rotated(chordNotes, inv)] as [number, any[]]
  )

  const matches = inversions.filter(([_inv, notes]) =>
    includesInOrder(notes, queryNotes)
  )

  if (matches.length === 0) {
    return 0
  } else {
    return _.minBy(matches, ([inv, _notes]) => inv)[0]
  }
}
