import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-query-box',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './query-box.component.html',
  styleUrl: './query-box.component.css'
})
export class QueryBoxComponent {
  userQuery: string = ''
  
  
  submitQuery() {
    if (this.userQuery.trim()) {
      console.log('User Query:', this.userQuery);
      this.userQuery = '';
    }
  }


}