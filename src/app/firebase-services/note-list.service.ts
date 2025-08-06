import { Injectable, inject } from '@angular/core';
import { collection, collectionData, doc, setDoc, updateDoc, addDoc, deleteDoc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore'; // Wichtig für Typen
import { Observable } from 'rxjs';
import { Note } from '../interfaces/note.interface';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {
  private firestore = inject(Firestore); // Richtig injizieren!
  private notesCollection = collection(this.firestore, 'notes');

  getNotes(): Observable<Note[]> {
    return collectionData(this.notesCollection, { idField: 'id' }) as Observable<Note[]>;
  }

  async addNote(note: Note): Promise<void> {
    await addDoc(this.notesCollection, note);
  }

  async updateNote(note: Note): Promise<void> {
    const noteRef = doc(this.firestore, 'notes', note.id);
    await updateDoc(noteRef, { ...note });
  }

  // Soft Delete: type auf "trash" setzen
  async deleteNote(noteId: string): Promise<void> {
    const noteRef = doc(this.firestore, 'notes', noteId);
    await updateDoc(noteRef, { type: "trash" });
  }

  // Wiederherstellen: type auf "note" setzen
  async restoreNote(noteId: string): Promise<void> {
    const noteRef = doc(this.firestore, 'notes', noteId);
    await updateDoc(noteRef, { type: "note" });
  }

  // Favoritenstatus ändern
  async setFavorite(noteId: string, marked: boolean): Promise<void> {
    const noteRef = doc(this.firestore, 'notes', noteId);
    await updateDoc(noteRef, { marked });
  }
}
