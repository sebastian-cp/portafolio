import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({ imports: [AppComponent] }).compileComponents();
  });

  it('agrega, completa y filtra tareas', () => {
    const app = TestBed.createComponent(AppComponent).componentInstance;
    const input = document.createElement('input');
    input.value = 'Escribir tests';
    app.add(input);
    expect(app.tasks().length).toBe(1);
    expect(app.remaining()).toBe(1);

    app.toggle(app.tasks()[0].id);
    expect(app.remaining()).toBe(0);

    app.filter.set('pending');
    expect(app.visible().length).toBe(0);
    app.filter.set('done');
    expect(app.visible().length).toBe(1);
  });

  it('ignora títulos vacíos', () => {
    const app = TestBed.createComponent(AppComponent).componentInstance;
    const input = document.createElement('input');
    input.value = '   ';
    app.add(input);
    expect(app.tasks().length).toBe(0);
  });
});
