/* HeaderBar.jsx */

import { ReactComponent as GithubLogo } from './svg/github-logo.svg';
import { ReactComponent as HelpIcon } from './svg/question-mark-icon.svg';
import { ReactComponent as TitleIcon } from './svg/frets-and-keys.svg';
import { useState } from 'react';

import CloseButton from 'react-bootstrap/CloseButton';
import Modal from 'react-modal';
import ReactPlayer from 'react-player'

export default function HeaderBar()
{
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function closeModal() 
  {
    setModalIsOpen(false);
  }

  return (
    <div id="header">
      <ul>
        <li style={{paddingTop: "0px"}}>
          <a href="http://github.com/perintyler/FretsAndKeys">
            <GithubLogo style={{width: "18px"}} />
          </a>
        </li>
        <li>          
          <TitleIcon style={{paddingTop: "7px", height: "38px"}}/>
        </li>
        <li>
            <div onClick={()=>setModalIsOpen(true)}>
              <HelpIcon style={{width: "20px", paddingTop: "9px"}}/>
            </div>
        </li>
      </ul>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={()=>{}}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        appElement={document.getElementById("App")}
        style={{ content: {backgroundColor: "var(--night)"}}}
      >
        <>
          <CloseButton style={{backgroundColor: "white", height: "30px", width: "30px"}} onClick={closeModal} id="help-message-box-close-button" aria-label="Hide" />
          <div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <ReactPlayer
              style={{ border: "2px solid", borderColor: "var(--emerald)" }}
              playing={modalIsOpen}
              url="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" 
            />
          </div>
        </>
      </Modal>


    </div>
  )
}

