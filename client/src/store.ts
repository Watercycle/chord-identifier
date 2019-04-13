import _ from 'lodash'

const pressedKeys = {
  state: [] as number[],
  reducers: {
    press(state: number[], payload: number) {
      return _.sortBy(state.concat(payload))
    },

    release(state: number[], payload: number) {
      return state.filter(x => x !== payload)
    },

    releaseAll(_state: number[]): number[] {
      return []
    }
  }
}

export { pressedKeys }