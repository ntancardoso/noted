import {Page, Events, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, Validators} from '@angular/common';
import {NoteService} from '../../services/note-service/note-service';
import {Note} from '../../models/note';

@Page({
  templateUrl: 'build/pages/edit/edit.html',
})
export class EditPage {
  note: Note;
  noteForm: any;

  constructor(public nav: NavController,
    public navParams: NavParams,
    public viewController: ViewController,
    public events: Events,
    formBuilder: FormBuilder,
    public ns: NoteService) {

    this.note = navParams.get("note");

    if (this.note == null || this.note == undefined) {
      this.note = new Note();
    }

    this.noteForm = formBuilder.group({
      title: ["", Validators.required],
      content: ["", Validators.required]
    });
  }
  
  
  saveNote() {
    this.ns.save(this.note);
    this.events.publish('refreshNotes');
    this.viewController.dismiss();
  }


}
