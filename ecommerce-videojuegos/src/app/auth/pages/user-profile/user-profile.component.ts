import { Payment } from './../../interfaces/user.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../auth/services/user.service';
import { User } from '../../../auth/interfaces/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Game } from '../../../games/interfaces/games.interface';
import { GamesService } from '../../../games/services/games.service';
import { PaymentService } from '../../services/payment.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styles: [],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class UserProfileComponent implements OnInit {
  activeTab: string = 'profile'; // Tab activa ('profile' o 'orders')
  userId: string = '';
  userForm!: FormGroup;
  orders: any[] = []; // Historial de pedidos
  loadingUser: boolean = true;
  loadingOrders: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private gameService: GamesService,
    private paymentService: PaymentService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      this.loadUserData();
      this.loadOrderHistory();
    });

    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]],
    });
  }

  // Cargar datos del usuario
  loadUserData() {
    this.userService.getUserByID(this.userId).subscribe(
      (user) => {
        this.userForm.patchValue({
          username: user.username,
          email: user.email,
          password: '',
        });
        this.loadingUser = false;
        this.orders = user.purchaseHistory;
      },
      (error) => {
        this.errorMessage = 'No se pudo cargar la información del usuario.';
        this.loadingUser = false;
      }
    );
  }

  // Guardar cambios en los datos del usuario
  saveChanges() {
    if (this.userForm.invalid) return;

    const updatedUser: User = {
      ...this.userForm.value,
      id: this.userId,
    };

    this.userService.updateUser(this.userId, updatedUser).subscribe(
      () => {
        alert('Cambios guardados correctamente.');
      },
      () => {
        alert('Error al guardar los cambios.');
      }
    );
  }

  // Cargar historial de pedidos
  loadOrderHistory() {
    this.userService.history(this.userId).subscribe(
      (orders) => {
        this.orders = orders;
        this.loadingOrders = false;
      },
      () => {
        this.errorMessage = 'No se pudo cargar el historial de pedidos.';
        this.loadingOrders = false;
      }
    );
  }

  // Cambiar de tab
  switchTab(tab: string) {
    this.activeTab = tab;
  }
}