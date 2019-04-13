import MainKeyboard from "../MainKeyboard/MainKeyboard";
import LogoSettingsMenu from "../LogoSettingsMenu/LogoSettingsMenu";
import ChordPredictionsSidebar from "../ChordPredictionsSidebar/ChordPredictionsSidebar";

const ChordIdentifierPage = () => (
  <div className='app'>
    <div className='header'>
      <LogoSettingsMenu/>
    </div>

    <div className='main'>
      <MainKeyboard/>
    </div>

    <ChordPredictionsSidebar/>
  </div>
)

export default ChordIdentifierPage