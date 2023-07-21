/* MuteSwitch.jsx */

import { useState, useEffect } from 'react';
import { ReactComponent as SoundOnIcon } from './svg/sound-on-icon.svg';
import { ReactComponent as SoundOffIcon } from './svg/sound-off-icon.svg';
import Form from 'react-bootstrap/Form';

export default function MuteSwitch({ onChange })
{
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  function handleSwitchChange() {
    onChange(!isSwitchOn);
    setIsSwitchOn(!isSwitchOn);
  }

  function handleWindowSizeChange() {
      setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);


  var boldFontStyling = { fontWeight: "bold" };
  var normalFontStyling = { fontWeight: "normal" };

  var isMobile = windowWidth <= 768;

  // react-bootstrap switch components aren't working on mobile for some reason,
  // which needs to be fixed, but in the meantime, adjust the UI for small devices
  // to account for the unexpected checkbox
  var muteSwithForm;
  if (isMobile) {
    muteSwithForm = (
      <>
        <span style={{marginRight: "0px"}}>Sound:</span>
        <Form style={{marginTop: "2px"}}>
          <Form.Switch
            checked={isSwitchOn}
            onChange={()=>handleSwitchChange()}
          />
        </Form>
      </>
    );
  } else {
    muteSwithForm = (
      <>
        <div style={isSwitchOn ? normalFontStyling : boldFontStyling}>
          Sound Off
          <SoundOffIcon className="mute-icon"/>
        </div>
        <Form>
          <Form.Switch
            checked={isSwitchOn}
            onChange={()=>handleSwitchChange()}
          />
        </Form>
        <div style={isSwitchOn ? boldFontStyling : normalFontStyling}>
          Sound On
          <SoundOnIcon className="mute-icon"/>
        </div>
      </>
    );
  }

  return <div id="mute-button" className="horizontal-row unselectable-text">{muteSwithForm}</div>;
}
