import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './user.service';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  pageTitle = 'Team members and Tasks';

  // Services
  userService = inject(UserService)
  todoService = inject(TodoService)

  // User Signals
  members = this.userService.members

  // Todo Signals
  todosForMember = this.todoService.todos
  errorMessage = this.todoService.errorMessage

  // Actions
  onSelectedMember(ele: EventTarget | null) {
    // Sync the next select box
    const id = Number((ele as HTMLSelectElement).value)
    this.todoService.setMemberId(id)
  }

  onSelectedTask(ele: EventTarget | null) {
    // Do whatever
  }
}
