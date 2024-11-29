import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-query-box',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './query-box.component.html',
  styleUrl: './query-box.component.css'
})
export class QueryBoxComponent {
  userQuery: any = ''
  
  @Output() sendUserQuery : any = new EventEmitter
  
  submitQuery() {
    if (this.userQuery.trim()) {
      this.sendUserQuery.emit(this.userQuery)
      this.userQuery = '';
    }
  }

}