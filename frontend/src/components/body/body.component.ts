import { Component, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatContainerComponent } from '../chat-container/chat-container.component';
import { QueryBoxComponent } from '../query-box/query-box.component';
import { Chat } from '../../models/chat.type';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [RouterOutlet, ChatContainerComponent, QueryBoxComponent],
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent  {
  userResponseBody: Chat[] = [];

  getResponse(userQuery: Chat[]) {
    this.userResponseBody = userQuery;
    // this.scrollChatToBottom(); // Scroll to bottom after updating data
  }

}
