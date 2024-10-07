import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '@components/search/search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SearchComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
