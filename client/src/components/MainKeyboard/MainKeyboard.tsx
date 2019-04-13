import {connect} from '../../libs/nice-redux-connect'
import {playPianoKeys} from "../../audio-player"
import KeyboardSvg from "../KeyboardSvg/KeyboardSvg"
import {store} from "../../index"

interface PropsFromStore {
  pressedKeys?: number[]
}

const MainKeyboard = ({pressedKeys}: PropsFromStore) => {
  return <KeyboardSvg keys={pressedKeys}
                      onKeyClick={keyPressed}/>
}

MainKeyboard.defaultHooks = {
  onComponentDidUpdate(_lastProps: PropsFromStore, nextProps: PropsFromStore) {
    setTimeout(() => playPianoKeys(nextProps.pressedKeys), 1)
  }
}

function keyPressed(event: {target: Element}) {
  const key = parseInt(event.target.getAttribute('data-key'))
  const keyClass = event.target.getAttribute('class')

  if (keyClass.includes('pressed')) {
    store.dispatch.pressedKeys.release(key)
  } else {
    store.dispatch.pressedKeys.press(key)
  }
}

export default connect('pressedKeys')(MainKeyboard)