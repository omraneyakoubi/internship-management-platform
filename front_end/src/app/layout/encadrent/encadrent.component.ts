import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-encadrent',
  templateUrl: './encadrent.component.html',
  styleUrls: ['./encadrent.component.css']
})
export class EncadrentComponent implements OnInit {


  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    console.log(("cbn"));
    
    // Optionally, you can redirect the user to the login page or any other page after logout.
    // Example: 
    // this.router.navigate(['/login']);
  }

}
