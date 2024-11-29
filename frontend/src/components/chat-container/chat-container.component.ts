import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.css'
})
export class ChatContainerComponent {

  @Input() getValuefromQueries ?: any 
  
}
