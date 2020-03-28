import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AppbemTestModule } from '../../../test.module';
import { EstabelecimentoAppdobemDetailComponent } from 'app/entities/estabelecimento-appdobem/estabelecimento-appdobem-detail.component';
import { EstabelecimentoAppdobem } from 'app/shared/model/estabelecimento-appdobem.model';

describe('Component Tests', () => {
  describe('EstabelecimentoAppdobem Management Detail Component', () => {
    let comp: EstabelecimentoAppdobemDetailComponent;
    let fixture: ComponentFixture<EstabelecimentoAppdobemDetailComponent>;
    const route = ({ data: of({ estabelecimento: new EstabelecimentoAppdobem(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AppbemTestModule],
        declarations: [EstabelecimentoAppdobemDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EstabelecimentoAppdobemDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EstabelecimentoAppdobemDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load estabelecimento on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.estabelecimento).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
