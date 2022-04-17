import Navigation from '../../common/Layout/Header/Navigation/Navigation';
import Card from  '../../common/UI/Card/Card';
import NotesList from '../notes/NotesList';
// import InputNotes from '../notes/InputNotes';

import classes from './Home.module.css';

const Home = (props) => {

  const addedNote = (title, description) => {
    props.onAddNote(title,description);
  }
  return (
    <>
      <div className={classes.mainBody}>
        <Navigation/>
        <NotesList/>
      </div>
      {/* <Card className={classes.home}>
        <h1>Welcome to Notes App </h1>
      </Card>
      <InputNotes onAddNote = {addedNote}/> */}
    </>
  );
};

export default Home;
