import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatContainerComponent } from '../chat-container/chat-container.component';
import { QueryBoxComponent } from '../query-box/query-box.component';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [RouterOutlet, ChatContainerComponent, QueryBoxComponent],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

  userQueryInBody: any = ''

  getUserQuery(userQuery : any) {
    this.userQueryInBody = userQuery
  }

}
