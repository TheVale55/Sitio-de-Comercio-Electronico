import { Component } from '@angular/core';
import { Game } from '../../interfaces/games.interface';
import { GameShoppingCardComponent } from "../../components/game-shopping-card/game-shopping-card.component";
import { CommonModule } from '@angular/common';
import { User } from '../../../auth/interfaces/user.interface';
import { CheckoutComponent } from "../checkout/checkout.component";

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [GameShoppingCardComponent, CommonModule, CheckoutComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: '../../../app.component.scss',
})
export class ShoppingCartComponent {
  public userId !: User;
  public shoppingCart: string[] = ["673e74d5a2be1410b7e213d6", "673e74d5a2be1410b7e213d7"];
  public total = 0;
  public shipping = 0;

  public envio_estandar = []


  ngOnInit(): void {
   

  }

}
