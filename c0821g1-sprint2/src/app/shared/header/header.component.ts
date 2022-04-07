import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from 'src/app/service/security/token-storage.service';
import {Router} from '@angular/router';
import {ShareService} from '../../service/security/share.service';

class Employee {
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string;
  role: string;
  urlImg: string;
  isLoggedIn: boolean;
  idEmployee: number;
  employee: Employee;

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private shareService: ShareService
  ) {
  }

  ngOnInit(): void {
    this.loadHeader();
  }

  loadHeader(): void {
    console.log(this.tokenStorageService.getUser().username + 'username');
    if (this.tokenStorageService.getUser()) {
      this.username = this.tokenStorageService.getUser().username;
      this.urlImg = this.tokenStorageService.getUser().urlImg;
      this.idEmployee = this.tokenStorageService.getUser().idEmployee;
      console.log(this.urlImg);
      // this.isLoggedIn = this.tokenStorageService.getUser().idEmployee;
      this.isLoggedIn = true;
      this.role = this.tokenStorageService.getUser().roles[0];
    } else {
      this.role = null;
      this.username = null;
      this.urlImg = null;
      this.idEmployee = null;
    }
    this.isLoggedIn = this.username != null;

  }

  logout() {
    this.tokenStorageService.signOut();
    // this.loadHeader();
    this.router.navigate(['/body']);
    window.location.reload();
  }
}
