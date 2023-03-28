import React from 'react'
import noteContext from '../contexts/notes/notesContext'
import { useContext } from 'react'

const NoteItem = (props) => {
 const {note,updateNote}=props

 const context=useContext(noteContext)
  const {deleteNote}=context

  return (
    <div className='col-md-3'>
      
      

      <div className="card my-3">
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id);

       props.showAlert("deleted successfully","success")
    
           }}></i>
    <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)
    
    props.showAlert("updated successfully","success")

    
    }}></i>
  </div>
</div>
    </div>
  )
}

export default NoteItem
