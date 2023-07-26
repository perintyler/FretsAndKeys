/* HeaderBar.jsx */

import { ReactComponent as GithubLogo } from './svg/github-logo.svg';
import { ReactComponent as TitleIcon } from './svg/frets-and-keys.svg';

export default function HeaderBar()
{
  return (
    <div id="header">
      <ul>
        <li>
          <a href="http://github.com/perintyler/FretsAndKeys">
            <GithubLogo style={{width: "18px"}} />
          </a>
        </li>
        <li>          
          <TitleIcon style={{paddingTop: "7px", height: "38px"}}/>
        </li>
        <li></li>
      </ul>
    </div>
  )
}

