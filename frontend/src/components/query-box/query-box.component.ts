import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QueryBoxService } from '../../services/query-box.service';
import { Chat } from '../../models/chat.type';
import { catchError, switchMap } from 'rxjs';

@Component({
  selector: 'app-query-box',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './query-box.component.html',
  styleUrl: './query-box.component.css'
})
export class QueryBoxComponent {
  userQuery: any = ''
  isLoading: boolean = false;

  @Output() sendUserQuery : any = new EventEmitter

  chat = <Array<Chat>> []

  private queryBox = inject(QueryBoxService)
  
  submitQuery() {
    if (this.userQuery.trim()) {
      this.isLoading = true; // Start loading state
  
      this.queryBox.sendPrompt(this.userQuery)
        .pipe(
          switchMap(() => this.queryBox.getResponse()), // Make the GET request after the POST
          catchError((err) => {
            console.error('Error occurred:', err);
            this.isLoading = false; // Stop loading state on error
            throw err;
          })
        )
        .subscribe((resp: any) => {
          this.chat = Array.isArray(resp) ? resp : [resp];
          console.log(this.chat);
          this.sendUserQuery.emit(this.chat);
          this.userQuery = ''; // Clear the input field
          this.isLoading = false; // Stop loading state after success
        });
    }
  }

  handleKeydown(event: KeyboardEvent): void {
    // Check if "Enter" is pressed without "Shift"
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent default behavior (moving to the next line)
      this.submitQuery(); // Call the submit function
    }
  }
  
}