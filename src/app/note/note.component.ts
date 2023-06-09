import { CommonModule, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { Record } from 'pocketbase';
import { NotesService } from '../notes.service';
import { environment } from 'src/env';
import { MarkdownPipe } from '../markdown.pipe';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CommonModule, NgIf, MatCardModule, MatButtonModule, MarkdownPipe],
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent {
  @Input() note: Record | undefined;
  public baseUrl = environment.BASE_URL;

  constructor(readonly noteService: NotesService) {}

  delete(id: string) {
    this.noteService.delete(id);
  }
}
