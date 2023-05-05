import { Component, HostListener, signal } from '@angular/core';
import { AsyncPipe, CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { NotesService } from '../notes.service';
import { ListResult, Record, RecordSubscription } from 'pocketbase';
import { NoteComponent } from '../note/note.component';
import { SnackBarService } from '../snack-bar.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [
    CommonModule,
    NoteComponent,
    NgIf,
    NgFor,
    NgClass,
    MatProgressSpinnerModule,
    AsyncPipe,
  ],
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent {
  public isLoading = false;
  public records = signal<Record[]>([]);

  private recordOffset = 0;
  private isLastPage = false;
  private RECORS_PER_FETCH = 10;

  constructor(
    readonly noteService: NotesService,
    readonly snackBar: SnackBarService
  ) {
    this.isLoading = true;
    this.noteService
      .get(this.recordOffset, this.RECORS_PER_FETCH, { sort: 'created' })
      .then((res) => this.handleRecords(res))
      .catch((err) => this.handleError(err));

    this.noteService.subscribe((event) => this.subscriptionHandler(event));
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (this.isLastPage) return;

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      // Load Your Data Here
      this.noteService
        .get(this.recordOffset, this.RECORS_PER_FETCH, { sort: 'created' })
        .then((res) => this.handleRecords(res))
        .catch((err) => this.handleError(err));
    }
  }

  private handleRecords(res: ListResult<Record>) {
    this.isLoading = false;
    this.recordOffset = this.recordOffset + this.RECORS_PER_FETCH;
    this.isLastPage = res.page == res.totalPages;
    this.records.set(this.records().concat(...res.items));
  }

  private handleError(err: Error) {
    if (!err.message.includes('autocancelled.')) {
      console.error(err.message);
      this.snackBar.error('unable to load your notes, please try again later');
    }
  }

  private subscriptionHandler(event: RecordSubscription) {
    // switch (event.action) {
    //   case 'create':
    //     this.records.push(event.record);
    //     break;
    //   case 'delete':
    //     this.records = this.records.filter(
    //       (record: Record) => record.id != event.record.id
    //     );
    //     break;
    // }
  }
}
