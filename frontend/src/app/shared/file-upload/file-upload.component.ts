import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  uploadForm: FormGroup;
  uploadedFiles: File[] = [];
  loading:boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.uploadForm = this.fb.group({
      pdfFiles: ['', Validators.required],
    });
  }

  onFileChange(event: any): void {
    const files = event.target.files;
    if (files.length > 0) {
      for (let file of files) {
        this.uploadedFiles.push(file);
      }
    }
  }

  removeFile(index: number): void {
    this.uploadedFiles.splice(index, 1);
  }

  submit(): void {
    this.loading= true
    const formData = new FormData();

    for (let file of this.uploadedFiles) {
      formData.append('pdfFiles', file, file.name);
    }
    console.log(this.uploadedFiles);

    this.http.post(`http://127.0.0.1:5000/pdf`, formData)
    .subscribe(response => {
      this.loading=false
      alert('Files uploaded successfully!');
    }, error => {
      return(error);
    });
    
    }
}

