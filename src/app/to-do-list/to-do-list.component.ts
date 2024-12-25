import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type ToDoTasksType = {
  id: number;
  text: string;
  checked: boolean;
}

@Component({
  selector: 'app-to-do-list',
  imports: [FormsModule, CommonModule, NgFor],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.css'
})
export class ToDoListComponent {
  todoList: ToDoTasksType[] = [];
  newTask: string = '';
  editingId: number | null = null; 
  editingText: string = ''; 
  
  addTask(): void {
    if (this.newTask.trim() !== '') {
      const newTask: ToDoTasksType = {
        id: Date.now(),
        text: this.newTask,
        checked: false
      };
      this.todoList.push(newTask);
      console.log(`Добавлена задача id=${newTask.id} Текст=${newTask.text}`);
      this.newTask = '';
    } else {
      alert('Поле ввода не может быть пустым');
    }
  }

  deleteTask(id: number): void {
    this.todoList = this.todoList.filter(item => item.id !== id);
    console.log(`Задача с id=${id} была удалена`);
  }

  startEditTask(id: number): void {
    const task = this.todoList.find(item => item.id === id);
    if (task) {
      this.editingId = id;
      this.editingText = task.text;
    }
  }

  saveEditTask(): void {
    if (this.editingId != null) {
      const task = this.todoList.find(item => item.id === this.editingId);
      if (task && this.editingText.trim() !== '') {
        task.text = this.editingText.trim();
        console.log(`Задача отредактирована id=${task.id} Новый текст=${this.editingText}`);
        this.editingId = null;
      } else {
        alert('Поле ввода не может быть пустым');
      }
    }
  }

  cancelEditTask(): void {
    this.editingId = null;
  }

  toggleChecked(i: number): void {
    this.todoList[i].checked = !this.todoList[i].checked;
  }

  deleteCheckedTasks(): void {
    this.todoList = this.todoList.filter(item => !item.checked);
  }
}