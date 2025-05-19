import { Component } from '@angular/core';
import { PersonaFormComponent } from './persona-form/persona-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PersonaFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Sistema de Registro de Personas';
}
