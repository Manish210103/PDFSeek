import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PdfExtractionComponent } from "./pdf-extraction/pdf-extraction.component";
import { ChatbotComponent } from "./chatbot/chatbot.component";
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PdfExtractionComponent, ChatbotComponent, CommonModule, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend-angular';
  loggedin:boolean = false;
  username:string = ""
  onLoggedIn([status, name]: [boolean, string]) {
    this.loggedin = status;
    this.username = name;
  }
}
