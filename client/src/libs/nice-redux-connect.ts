import * as redux from 'inferno-redux'
import _ from 'lodash'
import {isFunction, isArray, isString} from '../utils'

type Mappable = string | string[] | ((arg0: any) => any)

// This just extends connect to automatically create the mapper function
// based on the strings of the keys we're interested in. It's frivolous,
// but I hate the verbosity of the existing solution.
export function connect(key: Mappable) {
  if (isFunction(key)) {
    return redux.connect(key)
  } else if (isString(key)) {
    const mapStateToProps = (state: any) => ({[key as string]: state[key as string]})
    return redux.connect(mapStateToProps)
  } else if (isArray(key)) {
    const mapStateToProps = (state: any) => _.pick(state, key as string[])
    return redux.connect(mapStateToProps)
  }

  throw 'Unsupported key'
}