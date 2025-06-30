import { Component } from '@angular/core';
import { MessageBoxComponent } from "../shared/message-box/message-box.component";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [MessageBoxComponent, CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent {
  messages: { role: string; content: string }[] = [];
  newMessage: string = '';
  role: string = 'user';

  constructor(private http: HttpClient) {}

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ role: 'user', content: this.newMessage.trim() });

      const messagePayload = {
        role: this.role,
        message: this.newMessage.trim()
      };

      this.http.post('http://127.0.0.1:5000/chat', messagePayload)
        .subscribe(
          (response: any) => {
            console.log('Message sent successfully', response);
            this.messages.push({ role: 'bot', content: response["message"] });
            this.newMessage = ''; 
          },
          (error) => {
            console.error('Error sending message', error);
          }
        );
    }
  }

  exportChat() {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const maxWidth = pageWidth - 2 * margin;
    const formattedChat = this.messages.map(message => `${message.role}: ${message.content}`).join('\n');
    doc.text(formattedChat, margin, margin, {
        maxWidth: maxWidth
    });
    doc.save('chat_export.pdf');
  }
}
