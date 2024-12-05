import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, Input, OnInit, OnDestroy, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
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
export class ChatContainerComponent implements OnInit, OnChanges, OnDestroy {
  elRef = inject(ElementRef);
  @Input() getValuefromLLM: Chat[] = [];
  private queryBox = inject(QueryBoxService);
  private subscription!: Subscription;
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    // Subscribe to the service to fetch messages
    this.subscription = this.queryBox.getResponse().subscribe({
      next: (resp: Chat[]) => {
        if (resp) {
          this.getValuefromLLM = resp;
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['getValuefromLLM'] && this.getValuefromLLM.length) {
      // Trigger change detection to update the view
      this.cdr.detectChanges();
      console.log("before scroll chat func");
      
      this.scrollChatToBottom(); // Scroll to bottom when data changes
    }
  }

  get scrollContainer(): HTMLElement {
    return this.elRef.nativeElement.querySelector('.list');
  }

  private scrollChatToBottom() {
    console.log('inside scoll chat func');
    
    const element = this.scrollContainer;
    if (element) {
      // Use setTimeout to wait for Angular to update the DOM
      setTimeout(() => {
        element.scrollTo({          
          top: element.scrollHeight,  // Scroll to the bottom of the content
          behavior: 'smooth',         // Optional smooth scrolling
        });
        console.log("aftersettimout");
        
      }, 0); // Ensure this happens after DOM updates
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
