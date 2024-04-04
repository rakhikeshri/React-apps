import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import './notes.css'

const Notes = () => {
  // Retrieve the JSON string from localStorage
  const notess = localStorage.getItem("notess");

  // Convert the JSON string back to an array
  const notesArr = JSON.parse(notess);

  const [notes, setNotes] = useState(notesArr || []);
  const [isEdit, setIsEdit] = useState(false);

  const [note, setNote] = useState({
    id: null,
    note: "",
  });

  const handleInput = (e) => {
    if (!isEdit) {
      setNote({
        ...note,
        note: e.target.value,
        id: uuidv4(),
      });
    } else {
      setNote({ ...note, note: e.target.value });
    }
  };

  const isEditing = (note) => {
    setIsEdit(true);
    setNote(note);
    console.log("note:", note);
  };

  const addNote = () => {
    if (isEdit != true) {
      // Update notes inside the note object
      const updatedNotes = [...notes, note];

      // Set the updated notes in localStorage
      localStorage.setItem("notess", JSON.stringify(updatedNotes));

      // Update the notes state
      setNotes(updatedNotes);

      setNote({ id: null, note: "" });
    } else {
      // Handle editing here (you can update the note text in the notes array)
      const updatedNotes = notes.map((item) =>
        item.id === note.id ? { ...note, note: note.note } : item
      );
      localStorage.setItem("notess", JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
      setIsEdit(false); // Set edit mode to false after editing
      setNote({ id: null, note: "" }); // Clear input after editing
    }
  };

  const deleteNote = (id) => {
    const filteredNotes = notes.filter(note => note.id != id);

    setNotes(filteredNotes);

    localStorage.setItem("notess", JSON.stringify(filteredNotes));
  };

  return (
    <div className="main z-20">
      <div className="inner-main">
        <div className="p-2 heading">
          <h1>Notes</h1>
          {/* <button>x</button> */}
        </div>
        <div>
          <div className="heading d-flex flex-col">
            <textarea
              onChange={(e) => handleInput(e)}
              className="p-2 w-full text-black"
              placeholder="buy groceries.."
              value={note.note}
              rows={4}
            />
            <button
              onClick={addNote}
              className="button-generic"
            >
              Add
            </button>
          </div>
          <div className=" bg-white text-black">
            <ul>
              {notes.map((note) => (
                <li className="flex items-center justify-between text-lg py-3 px-2" key={note.id}>
                  <p className="w-[80%]">
                    {note.note}

                  </p>
                  <div className="flex w-[20%] justify-end">
                    <AiOutlineDelete onClick={() => deleteNote(note.id)} className="cursor-pointer text-xl"  />
                    <BiEdit onClick={() => isEditing(note)} className="cursor-pointer text-xl" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
