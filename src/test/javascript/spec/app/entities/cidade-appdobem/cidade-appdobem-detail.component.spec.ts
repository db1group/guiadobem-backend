import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AppbemTestModule } from '../../../test.module';
import { CidadeAppdobemDetailComponent } from 'app/entities/cidade-appdobem/cidade-appdobem-detail.component';
import { CidadeAppdobem } from 'app/shared/model/cidade-appdobem.model';

describe('Component Tests', () => {
  describe('CidadeAppdobem Management Detail Component', () => {
    let comp: CidadeAppdobemDetailComponent;
    let fixture: ComponentFixture<CidadeAppdobemDetailComponent>;
    const route = ({ data: of({ cidade: new CidadeAppdobem(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AppbemTestModule],
        declarations: [CidadeAppdobemDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CidadeAppdobemDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CidadeAppdobemDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load cidade on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.cidade).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
