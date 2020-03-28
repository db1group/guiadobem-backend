import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';

import { AppbemTestModule } from '../../../test.module';
import { CategoriaAppdobemComponent } from 'app/entities/categoria-appdobem/categoria-appdobem.component';
import { CategoriaAppdobemService } from 'app/entities/categoria-appdobem/categoria-appdobem.service';
import { CategoriaAppdobem } from 'app/shared/model/categoria-appdobem.model';

describe('Component Tests', () => {
  describe('CategoriaAppdobem Management Component', () => {
    let comp: CategoriaAppdobemComponent;
    let fixture: ComponentFixture<CategoriaAppdobemComponent>;
    let service: CategoriaAppdobemService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AppbemTestModule],
        declarations: [CategoriaAppdobemComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: {
                subscribe: (fn: (value: Data) => void) =>
                  fn({
                    pagingParams: {
                      predicate: 'id',
                      reverse: false,
                      page: 0
                    }
                  })
              }
            }
          }
        ]
      })
        .overrideTemplate(CategoriaAppdobemComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CategoriaAppdobemComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CategoriaAppdobemService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CategoriaAppdobem(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.categorias && comp.categorias[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CategoriaAppdobem(123)],
            headers
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.categorias && comp.categorias[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,desc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,desc', 'id']);
    });
  });
});
