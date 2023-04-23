import { Component } from '@angular/core';
import { AsyncPipe, CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { NotesService } from '../notes.service';
import { Record, RecordSubscription } from 'pocketbase';
import { NoteComponent } from '../note/note.component';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, NoteComponent, NgIf, NgFor, NgClass, AsyncPipe],
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent {
  public isLoading = false;
  public records: Record[] = [];

  constructor(readonly noteService: NotesService) {
    this.isLoading = true;
    this.noteService
      .get(0, 10, { sort: 'created' })
      .then((res) => {
        console.log(res);
        this.isLoading = false;
        this.records = res.items;
      })
      .catch((err) => console.error('unable to fetch notes', err));

    this.noteService.subscribe((event) => this.subscriptionHandler(event));
  }

  private subscriptionHandler(event: RecordSubscription) {
    switch (event.action) {
      case 'create':
        this.records.push(event.record);
        break;
      case 'delete':
        this.records = this.records.filter(
          (record: Record) => record.id != event.record.id
        );
        break;
    }
  }
}
