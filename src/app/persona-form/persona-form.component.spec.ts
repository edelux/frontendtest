import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PersonaFormComponent } from './persona-form.component';
import { PersonaService } from '../services/persona.service';
import { of } from 'rxjs';
import { Persona } from '../models/persona.model';
import { CommonModule } from '@angular/common';

describe('PersonaFormComponent', () => {
  let component: PersonaFormComponent;
  let fixture: ComponentFixture<PersonaFormComponent>;
  let personaService: PersonaService;
  
  beforeEach(async () => {
    const personaServiceMock = {
      agregarPersona: jest.fn(),
      obtenerPersonas: jest.fn().mockReturnValue(of([])),
      limpiarPersonas: jest.fn()
    };
    
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        PersonaFormComponent
      ],
      providers: [
        { provide: PersonaService, useValue: personaServiceMock }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(PersonaFormComponent);
    component = fixture.componentInstance;
    personaService = TestBed.inject(PersonaService);
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should initialize form with empty fields', () => {
    expect(component.personaForm).toBeDefined();
    expect(component.personaForm.get('nombre')?.value).toBe('');
    expect(component.personaForm.get('apellidos')?.value).toBe('');
  });
  
  it('should mark form as invalid if empty', () => {
    component.personaForm.setValue({
      nombre: '',
      apellidos: ''
    });
    
    expect(component.personaForm.valid).toBeFalsy();
  });
  
  it('should mark form as valid with correct data', () => {
    component.personaForm.setValue({
      nombre: 'Juan',
      apellidos: 'Perez'
    });
    
    expect(component.personaForm.valid).toBeTruthy();
  });
  
  it('should call agregarPersona when form is valid and submitted', () => {
    const persona: Persona = { nombre: 'Juan', apellidos: 'Perez' };
    component.personaForm.setValue(persona);
    
    component.onSubmit();
    
    expect(personaService.agregarPersona).toHaveBeenCalledWith(persona);
  });
  
  it('should not call agregarPersona when form is invalid', () => {
    component.personaForm.setValue({
      nombre: '',
      apellidos: 'Perez'
    });
    
    component.onSubmit();
    
    expect(personaService.agregarPersona).not.toHaveBeenCalled();
  });
  
  it('should call limpiarLista method of service when limpiarLista is called', () => {
    component.limpiarLista();
    
    expect(personaService.limpiarPersonas).toHaveBeenCalled();
  });
});
