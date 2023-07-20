/* MuteSwitch.jsx */

import { useState } from 'react';
import {ReactComponent as SoundOnIcon} from './svg/sound-on-icon.svg';
import {ReactComponent as SoundOffIcon} from './svg/sound-off-icon.svg';
import Form from 'react-bootstrap/Form';

export default function MuteSwitch({ onChange })
{
  const [isSwitchOn, setIsSwitchOn] = useState(true);

  function handleSwitchChange() {
    onChange(!isSwitchOn);
    setIsSwitchOn(!isSwitchOn);
  }

  return (
    <div className="horizontal-row">
      <div>
        Sound Off
        <SoundOffIcon className="mute-icon"/>
      </div>
      <Form>
        <Form.Check
          type="switch"
          checked={isSwitchOn}
          onChange={()=>handleSwitchChange()}
        />
      </Form>
      <div>
        Sound On
        <SoundOnIcon className="mute-icon"/>
      </div>
    </div>
  );
}
