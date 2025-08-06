import { Component } from '@angular/core';
import { Note } from '../interfaces/note.interface';
import { NoteListService } from '../firebase-services/note-list.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NoteComponent } from './note/note.component';



@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [FormsModule, CommonModule, NoteComponent],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss'
})
export class NoteListComponent {
  allNotes: Note[] = [];
  noteList: Note[] = [];
  favFilter: "all" | "fav" = "all";
  status: "notes" | "trash" = "notes";

  constructor(public noteService: NoteListService) {
    this.noteService.getNotes().subscribe(notes => {
      this.allNotes = notes;
      this.applyFilter();
    });
  }

  applyFilter() {
    if (this.status === "trash") {
      this.noteList = this.allNotes.filter(note => note.type === "trash");
    } else if (this.favFilter === "fav") {
      this.noteList = this.allNotes.filter(note => note.type === "note" && note.marked);
    } else {
      this.noteList = this.allNotes.filter(note => note.type === "note");
    }
  }

  changeFavFilter(filter: "all" | "fav") {
    this.favFilter = filter;
    this.applyFilter();
  }

  changeTrashStatus() {
    if (this.status === "trash") {
      this.status = "notes";
    } else {
      this.status = "trash";
      this.favFilter = "all";
    }
    this.applyFilter();
  }
}
