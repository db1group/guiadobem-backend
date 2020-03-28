import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Data } from '@angular/router';

import { AppbemTestModule } from '../../../test.module';
import { CidadeAppdobemComponent } from 'app/entities/cidade-appdobem/cidade-appdobem.component';
import { CidadeAppdobemService } from 'app/entities/cidade-appdobem/cidade-appdobem.service';
import { CidadeAppdobem } from 'app/shared/model/cidade-appdobem.model';

describe('Component Tests', () => {
  describe('CidadeAppdobem Management Component', () => {
    let comp: CidadeAppdobemComponent;
    let fixture: ComponentFixture<CidadeAppdobemComponent>;
    let service: CidadeAppdobemService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AppbemTestModule],
        declarations: [CidadeAppdobemComponent],
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
        .overrideTemplate(CidadeAppdobemComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CidadeAppdobemComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CidadeAppdobemService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CidadeAppdobem(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.cidades && comp.cidades[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new CidadeAppdobem(123)],
            headers
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.cidades && comp.cidades[0]).toEqual(jasmine.objectContaining({ id: 123 }));
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
