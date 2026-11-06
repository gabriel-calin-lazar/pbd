import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer, Header } from '@pbd/core';

@Component({
  selector: 'rw-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
