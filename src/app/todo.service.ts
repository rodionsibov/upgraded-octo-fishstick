import { HttpClient } from '@angular/common/http';
import { DestroyRef, effect, inject, Injectable, signal } from '@angular/core';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { setErrorMessage } from './utility/errorHandling';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todoUrl = 'https://jsonplaceholder.typicode.com/todos'

  // Services
  private http = inject(HttpClient)
  private destroyRef = inject(DestroyRef);

  todos = signal<Todo[]>([])
  selectedMemberId = signal<number | undefined>(undefined)
  errorMessage = signal('')

  eff = effect(() => {
    const id = this.selectedMemberId()
    if (id) {
      this.getTodos(id).pipe(
        delay(1000),
        takeUntilDestroyed(this.destroyRef))
        .subscribe(memberTodos => this.todos.set(memberTodos))
    }
  })

  setMemberId(memberId: number) {
    // Clear the todos from the prior selection
    this.todos.set([])

    this.selectedMemberId.set(memberId)
  }

  private getTodos(id: number): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todoUrl}?userId=${id}`).pipe(
      // Cut the length of the long strings
      map(data => data.map(t => t.title.length > 20 ? ({ ...t, title: t.title.substring(0, 20) }) : t)),
      catchError(err => {
        this.errorMessage.set(setErrorMessage(err))
        return of([])
      })
    )
  }
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean
}