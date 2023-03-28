import React, { useEffect, useRef,useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import noteContext from '../contexts/notes/notesContext'
import AddNote from './AddNote'
import NoteItem from './NoteItem'

const Notes = (props) => {
  


  const context = useContext(noteContext)
  const { notes, getNotes, editNote} = context
  let history=useNavigate()

  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""});
  useEffect(() => {
    if(localStorage.getItem('token'))
  {
    getNotes();
  }
  else{
     history("/login")
  }
  }, [])
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title, edescription:currentNote.description,etag:currentNote.tag})
   


  }

  const handleClick=(e)=>{

    editNote(note.id,note.etitle,note.edescription,note.etag)

    refClose.current.click();
    props.showAlert("updated successfully","success")

  
     
  }

  const onChange=(e)=>{

    setNote({...note, [e.target.name]:e.target.value})
  }



  const ref = useRef(null)
  const refClose = useRef(null)
  return (
    <>
      <AddNote showAlert={props.showAlert}/>

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">

              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription
                  } onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 ||note.edescription.length<5}  onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className=' container row my-3'>
        <h2>your notes</h2>

        <div className='container mx-2'>

        {notes.length===0  && 'No notes to display'}
        </div>


        

        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} updateNote={updateNote}  showAlert={props.showAlert}/>;
        })}
      </div>
    </>
  )
}

export default Notes