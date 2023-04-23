import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteFormComponent } from '../note-form/note-form.component';
import { NoteListComponent } from '../note-list/note-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NoteFormComponent, NoteListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
