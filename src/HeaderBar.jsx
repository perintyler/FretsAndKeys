/* HeaderBar.jsx */

import { ReactComponent as GithubLogo } from './svg/github-logo.svg';
import { ReactComponent as HelpIcon } from './svg/question-mark-icon.svg';
import { ReactComponent as TitleIcon } from './svg/frets-and-keys.svg';
import { useState } from 'react';

import CloseButton from 'react-bootstrap/CloseButton';
import Modal from 'react-modal';

export default function HeaderBar()
{
  const [modalIsOpen, setModalIsOpen] = useState(false);

  let helpIcon = <button><HelpIcon style={{width: "45px", height: "45px", paddingRight: "10px"}}/></button>;

  function openModal() {
    setModalIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  var helpMessageModal = (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
    >
      <CloseButton onClick={closeModal} id="help-message-box-close-button" aria-label="Hide" />
    </Modal>
  );

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
      {helpMessageModal}
    </div>
  )
}

