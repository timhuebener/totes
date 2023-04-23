import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Record } from 'pocketbase';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent {
  @Input() note: Record | undefined;

  constructor(readonly noteService: NotesService) {}

  delete(id: string) {
    this.noteService.delete(id);
  }
}
