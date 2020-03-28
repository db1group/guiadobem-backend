import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { AppbemTestModule } from '../../../test.module';
import { EstabelecimentoAppdobemUpdateComponent } from 'app/entities/estabelecimento-appdobem/estabelecimento-appdobem-update.component';
import { EstabelecimentoAppdobemService } from 'app/entities/estabelecimento-appdobem/estabelecimento-appdobem.service';
import { EstabelecimentoAppdobem } from 'app/shared/model/estabelecimento-appdobem.model';

describe('Component Tests', () => {
  describe('EstabelecimentoAppdobem Management Update Component', () => {
    let comp: EstabelecimentoAppdobemUpdateComponent;
    let fixture: ComponentFixture<EstabelecimentoAppdobemUpdateComponent>;
    let service: EstabelecimentoAppdobemService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AppbemTestModule],
        declarations: [EstabelecimentoAppdobemUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EstabelecimentoAppdobemUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EstabelecimentoAppdobemUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EstabelecimentoAppdobemService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EstabelecimentoAppdobem(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new EstabelecimentoAppdobem();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
