import { PersonaService } from './persona.service';
import { Persona } from '../models/persona.model';

describe('PersonaService', () => {
  let service: PersonaService;
  
  beforeEach(() => {
    service = new PersonaService();
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should add a person to the list', () => {
    const persona: Persona = { nombre: 'Juan', apellidos: 'Perez' };
    
    service.agregarPersona(persona);
    
    service.obtenerPersonas().subscribe(personas => {
      expect(personas.length).toBe(1);
      expect(personas[0]).toEqual(persona);
    });
  });
  
  it('should clear the list of people', () => {
    const persona1: Persona = { nombre: 'Juan', apellidos: 'Perez' };
    const persona2: Persona = { nombre: 'Maria', apellidos: 'Garcia' };
    
    service.agregarPersona(persona1);
    service.agregarPersona(persona2);
    
    service.limpiarPersonas();
    
    service.obtenerPersonas().subscribe(personas => {
      expect(personas.length).toBe(0);
    });
  });
});
