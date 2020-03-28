import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AppbemTestModule } from '../../../test.module';
import { CategoriaAppdobemDetailComponent } from 'app/entities/categoria-appdobem/categoria-appdobem-detail.component';
import { CategoriaAppdobem } from 'app/shared/model/categoria-appdobem.model';

describe('Component Tests', () => {
  describe('CategoriaAppdobem Management Detail Component', () => {
    let comp: CategoriaAppdobemDetailComponent;
    let fixture: ComponentFixture<CategoriaAppdobemDetailComponent>;
    const route = ({ data: of({ categoria: new CategoriaAppdobem(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AppbemTestModule],
        declarations: [CategoriaAppdobemDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CategoriaAppdobemDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CategoriaAppdobemDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load categoria on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.categoria).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
