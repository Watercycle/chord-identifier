import ChordPrediction from '../ChordPrediction/ChordPrediction'
import { connect } from '../../libs/nice-redux-connect'
import {chordsFromKeys} from "../../libs/js-music/matcher"
import withRenderDelay from "inferno-render-delay"

interface Props {
  pressedKeys: number[]
}

const ChordPredictionsSidebar = ({pressedKeys}: Props) => {
  const chords = chordsFromKeys(pressedKeys)

  const chordPredictions = chords.map((chord, i) =>
    <ChordPrediction key={i}
	  			           chordNameHtml={chord.name}
				             keys={chord._displayNotes}
                     inversionText={chord._inversion} />)

  return (
    <div className='predictions'>
      <div className='top-chord'>
        <span className='certainty'>It's most likely</span>
        { chordPredictions[0] }
      </div>

      <div className='possible-chords'>
        { chordPredictions.slice(1) }
      </div>
    </div>
  )
}

const DelayedSidebar = withRenderDelay(ChordPredictionsSidebar)
export default connect('pressedKeys')(DelayedSidebar)