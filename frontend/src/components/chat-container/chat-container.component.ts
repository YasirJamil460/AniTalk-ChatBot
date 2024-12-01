import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges,} from '@angular/core';

@Component({
  selector: 'app-chat-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.css'
})
export class ChatContainerComponent implements OnChanges{

  @Input() getValuefromLLM : any

  isRecieved : boolean = false

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['getValuefromLLM'] && Array.isArray(this.getValuefromLLM)) {
      this.isRecieved = this.getValuefromLLM.length > 1;
    }
  }

}

