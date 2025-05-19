import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonaService } from '../services/persona.service';
import { Persona } from '../models/persona.model';

@Component({
  selector: 'app-persona-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './persona-form.component.html',
  styleUrl: './persona-form.component.scss'
})
export class PersonaFormComponent {
  personaForm!: FormGroup;
  personas: Persona[] = [];
  submitted = false;
  
  constructor(
    private fb: FormBuilder,
    private personaService: PersonaService
  ) { }
  
  ngOnInit(): void {
    this.initForm();
    this.personaService.obtenerPersonas().subscribe(personas => {
      this.personas = personas;
    });
  }
  
  initForm(): void {
    this.personaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]]
    });
  }
  
  onSubmit(): void {
    this.submitted = true;
    if (this.personaForm.valid) {
      this.personaService.agregarPersona(this.personaForm.value);
      this.personaForm.reset();
      this.submitted = false;
    }
  }
  
  get f() {
    return this.personaForm.controls;
  }
  
  limpiarLista(): void {
    this.personaService.limpiarPersonas();
  }
}
