import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Persona } from '../models/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private personas: Persona[] = [];
  private personasSubject = new BehaviorSubject<Persona[]>([]);
  
  constructor() { }
  
  agregarPersona(persona: Persona): void {
    this.personas.push(persona);
    this.personasSubject.next([...this.personas]);
  }
  
  obtenerPersonas(): Observable<Persona[]> {
    return this.personasSubject.asObservable();
  }
  
  limpiarPersonas(): void {
    this.personas = [];
    this.personasSubject.next([]);
  }
}
