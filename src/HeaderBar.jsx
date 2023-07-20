/* HeaderBar.jsx */

import { ReactComponent as GithubLogo } from './svg/github-logo.svg';

export default function HeaderBar()
{
  return (
    <div id="header">
      <ul>
        <li><h1>FretsAndKeys.xyz</h1></li>
        <li><GithubLogo style={{textColor: 'black'}} /></li>
      </ul>
    </div>
  )
}
