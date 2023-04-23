import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NotesService } from '../notes.service';
import { FileUploadComponent } from '../file-upload/file-upload.component';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadComponent,
  ],
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
})
export class NoteFormComponent {
  public isLoading = false;
  public noteForm = new FormGroup({
    title: new FormControl('title', {
      nonNullable: true,
      validators: [],
    }),
    body: new FormControl('note', {
      nonNullable: true,
      validators: [],
    }),
    file: new FormControl(),
  });
  private attachment: File | undefined;

  constructor(readonly noteService: NotesService) {}

  public submit() {
    if (!this.noteForm.valid) {
      console.info('the note is not valid');
      return;
    }

    this.isLoading = true;
    const data = this.noteForm.getRawValue();

    console.log(this.attachment);

    this.noteService
      .create(data.title, data.body, this.attachment)
      .then(() => {
        this.isLoading = false;
        this.noteForm.reset();
      })
      .catch((err: any) => {
        this.isLoading = false;
        console.error('failed to create note:', err);
      });
  }

  onFileSelected(event: File) {
    this.attachment = event;
  }
}
