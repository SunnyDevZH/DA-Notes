import { Component, Input } from '@angular/core';
import { Note } from '../../interfaces/note.interface';
import { NoteListService } from '../../firebase-services/note-list.service'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponent {
  @Input() note!:Note;
  edit = false;
  hovered = false;
  
  constructor(private noteService: NoteListService){}

  async changeMarkedStatus(){
    this.note.marked = !this.note.marked;
    await this.noteService.setFavorite(this.note.id, this.note.marked);
  }

  deleteHovered(){
    if(!this.edit){
      this.hovered = false;
    }
  }

  openEdit(){
    this.edit = true;
  }

  async closeEdit(){
    this.edit = false;
    await this.saveNote();
  }

  async moveToTrash(){
    this.note.type = 'trash';
    await this.saveNote();
  }

  async moveToNotes(){
    this.note.type = 'note';
    await this.saveNote();
  }

  async deleteNote() {
    await this.noteService.hardDeleteNote(this.note.id);
  }

  async saveNote(){
    await this.noteService.updateNote(this.note);
  }
}
