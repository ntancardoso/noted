import {Storage, SqlStorage} from 'ionic-angular';
import {Injectable} from '@angular/core';
import {Note} from '../../models/note'


@Injectable()
export class NoteService {
  db: Storage;

  constructor() {
    this.db = new Storage(SqlStorage, { name: 'notedDb' });
  }


  findAll() {
    //TODO fix sorting
    return this.db.query("SELECT id,title,content,datetime(created, 'localtime') as fmt_created,datetime(updated, 'localtime') as fmt_updated FROM note order by datetime(updated),datetime(created) desc").then((data) => {
      let notes = new Array<Note>();
      if (data.res.rows.length > 0) {
        for (var i = 0; i < data.res.rows.length; i++) {
          let n = new Note();
          n.id = data.res.rows.item(i).id;
          n.title = data.res.rows.item(i).title;
          n.content = data.res.rows.item(i).content;
          n.created = new Date(data.res.rows.item(i).fmt_created);
          if(data.res.rows.item(i).fmt_updated!=null)
            n.updated = new Date(data.res.rows.item(i).fmt_updated);
          else
            n.updated = n.created;
          notes.push(n);
        }
      }
      return notes;
    }, (error) => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }


  save(n: Note) {
    if (n.id > 0) {
      return this.db.query("UPDATE note set title=?,content=?,updated=datetime('now') WHERE id=? ", [n.title, n.content, n.id]).then((data) => {
        console.log(data);
      }, (error) => {
        //console.log(error);
        console.log("ERROR -> " + JSON.stringify(error));
      });

    } else {
      return this.db.query("INSERT INTO note (title,content) VALUES (?,?)", [n.title, n.content]).then((data) => {
        console.log(data);
      }, (error) => {
        //console.log(error);
        console.log("ERROR -> " + JSON.stringify(error));
      });

    }
  }
  
  
   delete(n: Note) {
    if (n.id > 0) {
      return this.db.query("DELETE FROM note WHERE id=? ", [n.id]).then((data) => {
        console.log(data);
      }, (error) => {
        //console.log(error);
        console.log("ERROR -> " + JSON.stringify(error));
      });

    } 
  }
  

}