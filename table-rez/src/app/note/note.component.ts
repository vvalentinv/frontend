import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import{NoteService} from '../services/note.service'
import{Location} from '@angular/common'

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  updateNoteForm: FormGroup;
  @Input() notes: any[]=[];
  selectedNote={id:null,description:'',customerID:'',restaurantName:''}
  constructor( private formBuilder:FormBuilder,
    private _location:Location,
    private noteServices:NoteService,
    private route: ActivatedRoute,) {
    this.route.queryParams.subscribe(params=>{
    this.selectedNote.id=params.note_id,
    this.selectedNote.restaurantName=params.rest_name,
    this.selectedNote.customerID=params.user_id
     })
   }

  ngOnInit(): void {
    this.getNoteInfo()
    this.updateNoteForm=this.formBuilder.group({
     description:['',Validators.required]
    });
  }
getNoteInfo(){
this.noteServices.getNote(this.selectedNote.id).then((response:any)=>{
this.notes=response.map((note)=>{
  return note;
})
})
}
updateNote(){
  const updatedNote = {
    description: this.updateNoteForm.get('description').value,
    };

this.noteServices.updateNote(this.selectedNote.id,updatedNote)
.then((response:any)=>{
  console.log(JSON.stringify(updatedNote))
  this._location.back();
})
}

deleteNoteWithId(){
  this.noteServices.deleteNote(this.selectedNote.id).then(()=>{
    console.log("Note deleted");
    this._location.back();
  })
}
}
