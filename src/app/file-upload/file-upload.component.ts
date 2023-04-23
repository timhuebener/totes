import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  @Output() newItemEvent = new EventEmitter<File>();

  public fileName: string | undefined;

  handleChange(event: any) {
    console.log(event.target.files[0].name);

    this.fileName = event.target.files[0].name;

    this.newItemEvent.emit(event.target.files[0]);
  }
}
