/* HeaderBar.jsx */

import { ReactComponent as GithubLogo } from './svg/github-logo.svg';
import { ReactComponent as HelpIcon } from './svg/question-mark-icon.svg';
import { ReactComponent as TitleIcon } from './svg/frets-and-keys.svg';

export default function HeaderBar()
{
  return (
    <div id="header">
      <ul style={{verticalAlign: "center"}}>
        <li style={{marginLeft: "12px", paddingTop: "12px"}}>
          <a href="http://github.com/perintyler/FretsAndKeys">
            <GithubLogo style={{width: "20px"}} />
          </a>
        </li>
        <li style={{marginLeft: "16px"}}>          
          <TitleIcon style={{paddingTop: "7px", height: "38px"}}/>
        </li>
        <li style={{float: "right", paddingTop: "6px"}}>
          <HelpIcon style={{width: "45px", height: "45px", paddingRight: "10px"}}/>
          
        </li>
      </ul>
    </div>
  )
}

