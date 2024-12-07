import { 
  CommonModule 
} from '@angular/common';
import { 
  Component, 
  ElementRef, 
  Input, 
  OnInit, 
  OnChanges, 
  SimpleChanges, 
  AfterViewChecked, 
  OnDestroy, 
  inject 
} from '@angular/core';
import { HighlightPipe } from '../../pipes/highlight.pipe';
import { QueryBoxService } from '../../services/query-box.service';
import { Chat } from '../../models/chat.type';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-container',
  standalone: true,
  imports: [CommonModule, HighlightPipe],
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.css'],
})
export class ChatContainerComponent 
  implements OnInit, OnChanges, AfterViewChecked, OnDestroy 
{
  elRef = inject(ElementRef);
  @Input() getValuefromLLM: Chat[] = [];
  private queryBox = inject(QueryBoxService);
  private subscription!: Subscription;

  private shouldScroll = false; // Flag to ensure scrolling only when needed

  ngOnInit(): void {
    console.log('[ngOnInit] Component initialized');

    // Subscribe to service to fetch messages
    this.subscription = this.queryBox.getResponse().subscribe({
      next: (resp: Chat[]) => {
        console.log('[Subscription] New data received from QueryBoxService:', resp);

        if (resp) {
          this.getValuefromLLM = resp;
          this.shouldScroll = true; // Trigger scroll when new data is fetched
          console.log('[Subscription] shouldScroll set to true');
        }
      },
      error: (err) => {
        console.error('[Subscription] Error while fetching data:', err);
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['getValuefromLLM']) {
      console.log('[ngOnChanges] getValuefromLLM changed:', changes['getValuefromLLM'].currentValue);

      if (this.getValuefromLLM.length) {
        this.shouldScroll = true; // Trigger scroll when data changes
        console.log('[ngOnChanges] shouldScroll set to true');
      }
    }
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      console.log('[ngAfterViewChecked] shouldScroll is true, scrolling to bottom');
      this.scrollChatToBottom();
      this.shouldScroll = false; // Reset flag after scrolling
      console.log('[ngAfterViewChecked] shouldScroll set to false after scrolling');
    }
  }

  get scrollContainer(): HTMLElement | null {
    const container = this.elRef.nativeElement.querySelector('.result');
    console.log('[scrollContainer] DOM element:', container);
    return container;
  }

  private scrollChatToBottom(): void {
    const element = this.scrollContainer;
    if (element) {
      let currentScroll = element.scrollTop;
      const targetScroll = element.scrollHeight;
  
      const step = () => {
        if (currentScroll < targetScroll) {
          currentScroll += 500;  // Adjust increment based on the speed you want
          element.scrollTop = currentScroll;
          requestAnimationFrame(step);  // Continue animating the scroll
        } else {
          element.scrollTop = targetScroll; // Ensure the scroll position is exact
        }
      };
  
      step();
    }
  }
  

  ngOnDestroy(): void {
    console.log('[ngOnDestroy] Cleaning up subscriptions');
    // Clean up subscriptions to avoid memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
