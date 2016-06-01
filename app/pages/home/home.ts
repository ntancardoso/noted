import {Page, NavController, Events, Alert} from 'ionic-angular';
import {EditPage} from '../edit/edit';
import {NoteService} from '../../services/note-service/note-service';
import {Note} from '../../models/note';

@Page({
  templateUrl: 'build/pages/home/home.html',
})
export class HomePage {
  notes: Note[];

  constructor(public nav: NavController,
    public ns: NoteService,
    public events: Events) {

    this.loadNotes();

    events.subscribe('refreshNotes', () => {
      this.loadNotes();
    });

  }


  loadNotes() {
    this.ns.findAll().then((data) =>
      this.notes = data
    );
  }


  editNote(n: Note) {
    console.log(n);
    if (n == null || n == undefined)
      n = new Note();

    this.nav.push(EditPage, { "note": n });
  }
  
  deleteNote(n: Note) {
    let prompt = Alert.create({
      message: 'Delete '+n.title+'?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Delete',
        handler: () => {
          this.ns.delete(n);
          this.events.publish('refreshNotes');
        }
      }]
    });
    
    this.nav.present(prompt); 
  }
  
}
