import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, ViewChild, AfterViewChecked} from '@angular/core';
import { HighlightPipe } from '../../pipes/highlight.pipe';

@Component({
  selector: 'app-chat-container',
  standalone: true,
  imports: [CommonModule, HighlightPipe],
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.css'
})
export class ChatContainerComponent implements OnChanges{

  @Input() getValuefromLLM : any

  @ViewChild('chatContainer') chatContainer: any;

  isRecieved : boolean = false

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['getValuefromLLM']) {
      this.isRecieved = Array.isArray(this.getValuefromLLM) && this.getValuefromLLM.length > 0;
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      if (this.chatContainer) {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      }
    } catch (err) {
      console.error('Error while scrolling to bottom:', err);
    }
  }
}

