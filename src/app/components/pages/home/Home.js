import { useState } from 'react';
import Navigation from '../../common/Layout/Header/Navigation/Navigation';
import LogoutPopup from '../../common/UI/LogoutPopup/LogoutPopup';
import NotesList from '../notes/NotesList';
// import InputNotes from '../notes/InputNotes';

import classes from './Home.module.css';

const Home = (props) => {
  const [show,setShow] = useState(false);   

  const addedNote = (title, description) => {
    props.onAddNote(title,description);
  }
  return (
    <>
      <div className={classes.mainBody}>
        <Navigation onLogout={() => setShow(true)}/>
        <NotesList/>
        <LogoutPopup show={show} handleClose={() => setShow(false)} onLogout={props.onLogout} />
      </div>
      {/* <Card className={classes.home}>
        <h1>Welcome to Notes App </h1>
      </Card>
      <InputNotes onAddNote = {addedNote}/> */}
    </>
  );
};

export default Home;
