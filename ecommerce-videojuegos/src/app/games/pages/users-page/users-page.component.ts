import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styles: '',
  standalone: true,
  imports: [CommonModule],
})
export class UsersPageComponent {
  users: User[] = [
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com', role: 'usuario' },
    { id: 2, name: 'María López', email: 'maria@example.com', role: 'administrador' },
    { id: 3, name: 'Carlos García', email: 'carlos@example.com', role: 'usuario' },
  ];

  roles: string[] = ['usuario', 'administrador'];

  updateRole(userId: number, newRole: string) {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.role = newRole;
      console.log(`El rol del usuario con ID ${userId} se actualizó a: ${newRole}`);
    }
  }
  

  removeUser(userId: number): void {
    this.users = this.users.filter((user) => user.id !== userId);
    console.log(`Usuario con ID ${userId} eliminado.`);
  }
}
