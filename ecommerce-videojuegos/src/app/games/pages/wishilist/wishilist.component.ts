import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../auth/services/user.service';
import { GameWishlistCardComponent } from "../../components/game-wishlist-card/game-wishlist-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishilist',
  standalone: true,
  imports: [GameWishlistCardComponent, CommonModule],
  templateUrl: './wishilist.component.html',
  styleUrl: '../../../app.component.scss',
})
export class WishilistComponent {
  userId !: string;
  wishlist !: string[];

  constructor(
    private route: Router,
    private userService: UserService,
  ){}

  ngOnInit(): void {
    const userID = localStorage.getItem('user')
    if (!userID) {
      this.route.navigate(['/login'])
      return;
    }else{
      this.userId = userID.toString().replace(/"/g, '');
      //TODO change userService.cart TO userService.wishlist cuando exista
      this.userService.cart(this.userId).subscribe(
        (cart) => {
          this.wishlist = cart; 
          console.log("whishlist es")
          console.log(cart);
        }
      )
    }
  }


}
