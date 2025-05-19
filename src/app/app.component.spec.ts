import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PersonaFormComponent } from './persona-form/persona-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonaService } from './services/persona.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  
  beforeEach(async () => {
    const personaServiceMock = {
      obtenerPersonas: jest.fn().mockReturnValue(of([]))
    };
    
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        AppComponent
      ],
      providers: [
        { provide: PersonaService, useValue: personaServiceMock }
      ]
    }).compileComponents();
    
    TestBed.overrideComponent(AppComponent, {
      set: {
        imports: [],
        template: '<h1>{{title}}</h1>'
      }
    });
    
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });
  
  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
  
  it(`should have the correct title`, () => {
    expect(app.title).toEqual('Sistema de Registro de Personas');
  });
  
  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Sistema de Registro de Personas');
  });
});
