import {App, Platform, Storage, SqlStorage} from "ionic-angular";
import {StatusBar} from "ionic-native";
import {Notes} from "./pages/notes/notes";
import {NoteService} from "./services/note-service/note-service";


@App({
  templateUrl: "build/app.html",
  config: {},
  providers: [NoteService]
})
export class NotedApp {
  rootPage: any = Notes;
  db: Storage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.db = new Storage(SqlStorage, { name: "notedDb" });
      this.initDb();
      StatusBar.styleDefault();
    });
  }

  initDb() {
    // Initialize database
    this.db.query("CREATE TABLE IF NOT EXISTS note (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT, created DATETIME DEFAULT CURRENT_TIMESTAMP, updated DATETIME)").then((data) => {
      console.log("TABLE Note Init -> " + JSON.stringify(data.res));
    }, (error) => {
      console.log("ERROR -> " + JSON.stringify(error.err));
    });
  }
}
