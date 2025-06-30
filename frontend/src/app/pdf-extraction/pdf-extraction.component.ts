import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileUploadComponent } from "../shared/file-upload/file-upload.component";

@Component({
  selector: 'app-pdf-extraction',
  standalone: true,
  imports: [FileUploadComponent],
  templateUrl: './pdf-extraction.component.html',
  styleUrl: './pdf-extraction.component.scss'
})
export class PdfExtractionComponent {
  @Input() username: string = '';
  @Output() loggedInEvent = new EventEmitter<[boolean, string]>();
  onLogout(){
    this.loggedInEvent.emit([false, this.username]);
  }
}
