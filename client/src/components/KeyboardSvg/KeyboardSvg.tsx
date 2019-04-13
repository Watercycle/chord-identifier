interface Props {
  keys: number[],
  onClick?: (event: any) => any,
  onKeyClick?: (event: any) => any,
}

const KeyboardSvg = ({keys, onClick, onKeyClick}: Props) => {
  const pressedClass = (key: number) => keys.includes(key) ? ' pressed' : ''

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="keyboard" viewBox="0 0 1169 420" onClick={ onClick }>
      <path className="backing" d="M23,22H1143V409H23Z"/>
      <path data-key="23" className={ "white-key" + pressedClass(23) } onClick={ onKeyClick } d="M1092,25h77V418a2,2,0,0,1-2,2h-73a2,2,0,0,1-2-2Z"/>
      <text className="note-name" transform="translate(1114.05 394)">B</text>
      <path data-key="21" className={ "white-key" + pressedClass(21) } onClick={ onKeyClick } d="M1008,25h77V418a2,2,0,0,1-2,2h-73a2,2,0,0,1-2-2Z"/>
      <text className="note-name" transform="translate(1030.09 394)">A</text>
      <path data-key="19" className={ "white-key" + pressedClass(19) } onClick={ onKeyClick } d="M924,25h77V418a2,2,0,0,1-2,2H926a2,2,0,0,1-2-2Z"/>
      <text className="note-name" transform="translate(943.89 394)">G</text>
      <path data-key="17" className={ "white-key" + pressedClass(17) } onClick={ onKeyClick } d="M840,25h77V418a2,2,0,0,1-2,2H842a2,2,0,0,1-2-2Z"/>
      <text className="note-name" transform="translate(864.71 394)">F</text>
      <path data-key="16" className={ "white-key" + pressedClass(16) } onClick={ onKeyClick } d="M756,25h77V418a2,2,0,0,1-2,2H758a2,2,0,0,1-2-2Z"/>
      <text className="note-name" transform="translate(779.32 394)">E</text>
      <path data-key="14" className={ "white-key" + pressedClass(14) } onClick={ onKeyClick } d="M672,25h77V418a2,2,0,0,1-2,2H674a2,2,0,0,1-2-2Z"/>
      <text className="note-name" transform="translate(692.01 394)">D</text>
      <path data-key="12" className={ "white-key" + pressedClass(12) } onClick={ onKeyClick } d="M588,25h77V418a2,2,0,0,1-2,2H590a2,2,0,0,1-2-2Z"/>
      <text className="note-name" transform="translate(609.74 394)">C</text>
      <path data-key="11" className={ "white-key" + pressedClass(11) } onClick={ onKeyClick } d="M504,25h77V418a2,2,0,0,1-2,2H506a2,2,0,0,1-2-2Z"/>
      <text className="note-name" transform="translate(526.05 394)">B</text>
      <path data-key="9" className={ "white-key" + pressedClass(9) } onClick={ onKeyClick } d="M420,25h77V418a2,2,0,0,1-2,2H422a2,2,0,0,1-2-2Z"/>
      <text className="note-name" transform="translate(442.09 394)">A</text>
      <path data-key="7" className={ "white-key" + pressedClass(7) } onClick={ onKeyClick } d="M336,25h77V418a2,2,0,0,1-2,2H338a2,2,0,0,1-2-2Z"/>
      <text className="note-name" transform="translate(355.89 394)">G</text>
      <path data-key="5" className={ "white-key" + pressedClass(5) } onClick={ onKeyClick } d="M252,25h77V418a2,2,0,0,1-2,2H254a2,2,0,0,1-2-2Z"/>
      <text className="note-name" transform="translate(276.71 394)">F</text>
      <path data-key="4" className={ "white-key" + pressedClass(4) } onClick={ onKeyClick } d="M168,25h77V418a2,2,0,0,1-2,2H170a2,2,0,0,1-2-2Z"/>
      <text className="note-name" transform="translate(191.32 394)">E</text>
      <path data-key="2" className={ "white-key" + pressedClass(2) } onClick={ onKeyClick } d="M84,25h77V418a2,2,0,0,1-2,2H86a2,2,0,0,1-2-2Z"/>
      <text className="note-name" transform="translate(104.01 394)">D</text>
      <path data-key="0" className={ "white-key" + pressedClass(0) } onClick={ onKeyClick } d="M0,25H77V418a2,2,0,0,1-2,2H2a2,2,0,0,1-2-2Z"/>
      <text className="note-name" transform="translate(21.74 394)">C</text>
      <path data-key="22" className={ "black-key" + pressedClass(22) } onClick={ onKeyClick } d="M1062,25h53V307a3,3,0,0,1-3,3h-47a3,3,0,0,1-3-3Z"/>
      <path data-key="20" className={ "black-key" + pressedClass(20) } onClick={ onKeyClick } d="M978,25h53V307a3,3,0,0,1-3,3H981a3,3,0,0,1-3-3Z"/>
      <path data-key="18" className={ "black-key" + pressedClass(18) } onClick={ onKeyClick } d="M894,25h53V307a3,3,0,0,1-3,3H897a3,3,0,0,1-3-3Z"/>
      <path data-key="15" className={ "black-key" + pressedClass(15) } onClick={ onKeyClick } d="M726,25h53V307a3,3,0,0,1-3,3H729a3,3,0,0,1-3-3Z"/>
      <path data-key="13" className={ "black-key" + pressedClass(13) } onClick={ onKeyClick } d="M642,25h53V307a3,3,0,0,1-3,3H645a3,3,0,0,1-3-3Z"/>
      <path data-key="10" className={ "black-key" + pressedClass(10) } onClick={ onKeyClick } d="M474,25h53V307a3,3,0,0,1-3,3H477a3,3,0,0,1-3-3Z"/>
      <path data-key="8" className={ "black-key" + pressedClass(8) } onClick={ onKeyClick } d="M390,25h53V307a3,3,0,0,1-3,3H393a3,3,0,0,1-3-3Z"/>
      <path data-key="6" className={ "black-key" + pressedClass(6) } onClick={ onKeyClick } d="M306,25h53V307a3,3,0,0,1-3,3H309a3,3,0,0,1-3-3Z"/>
      <path data-key="3" className={ "black-key" + pressedClass(3) } onClick={ onKeyClick } d="M138,25h53V307a3,3,0,0,1-3,3H141a3,3,0,0,1-3-3Z"/>
      <path data-key="1" className={ "black-key" + pressedClass(1) } onClick={ onKeyClick } d="M54,25h53V307a3,3,0,0,1-3,3H57a3,3,0,0,1-3-3Z"/>
      <path className="top-bar" d="M6,0H1163a6,6,0,0,1,6,6V25.5a0,0,0,0,1,0,0H0a0,0,0,0,1,0,0V6A6,6,0,0,1,6,0Z"/>
    </svg>
  )
}

export default KeyboardSvg