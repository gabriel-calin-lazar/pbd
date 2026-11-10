import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RoleDirective } from '@pbd/shared/directives/role';

@Component({
  selector: 'rw-footer',
  imports: [RouterLink, RoleDirective],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {}
