import {playPianoKeys} from "../../audio-player"
import KeyboardSvg from "../KeyboardSvg/KeyboardSvg"

interface Props {
  chordNameHtml: string,
  keys: number[],
  inversionText: string
  onClick?: (event: any) => any
}

const ChordPrediction = ({chordNameHtml, keys, inversionText}: Props) => (
  <div className='prediction'>
    <div className='info'>

      <span className='chord-name' dangerouslySetInnerHTML={{__html: chordNameHtml}}/>

      { inversionText && <span className='inversion'>{inversionText}</span> }
    </div>

    <KeyboardSvg onClick={() => playPianoKeys(keys)} keys={keys}/>
  </div>
)

export default ChordPrediction