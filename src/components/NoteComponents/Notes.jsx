import Note from "./Note";
import CreateNote from "./CreateNote";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  // Fetch data need loading
  const [loading, setLoading] = useState(true);
  // For textarea: when type in, it will store a note to notes
  const [inputText, setInputText] = useState("");

  // get text and store in state
  const textHandler = (e) => {
    setInputText(e.target.value);
  };
  // add new note to the state Array
  const saveHandler = () => {
    // update state, it will get reference from previous state,
    // can call a call-back func to be a param when using setState
    // this call-back func will receive the previous state to be param and return new param
    setNotes((prevState) => [
      ...prevState,
      {
        id: uuidv4(),
        text: inputText,
      },
    ]);
    //clear the textarea
    setInputText("");
  };

  //deleteNote
  const deleteNote = (id) => {
    const filterNotes = notes.filter((note) => note.id !== id);
    setNotes(filterNotes);
  };

  // if fetch data then display
  useEffect(() => {
    // if cant find data then return null from localStorage
    const data = JSON.parse(localStorage.getItem("Notes"));
    if (Array.isArray(data) && data.length > 0) {
      setNotes(data);
    }
    setLoading(false);
  }, []);

  // for localStorage
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("Notes", JSON.stringify(notes));
    }
  }, [notes]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="notes">
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          text={note.text}
          deleteNote={deleteNote}
        />
      ))}

      <CreateNote
        textHandler={textHandler}
        saveHandler={saveHandler}
        inputText={inputText}
      />
    </div>
  );
};

export default Notes;
