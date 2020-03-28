import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { AppbemTestModule } from '../../../test.module';
import { CidadeAppdobemUpdateComponent } from 'app/entities/cidade-appdobem/cidade-appdobem-update.component';
import { CidadeAppdobemService } from 'app/entities/cidade-appdobem/cidade-appdobem.service';
import { CidadeAppdobem } from 'app/shared/model/cidade-appdobem.model';

describe('Component Tests', () => {
  describe('CidadeAppdobem Management Update Component', () => {
    let comp: CidadeAppdobemUpdateComponent;
    let fixture: ComponentFixture<CidadeAppdobemUpdateComponent>;
    let service: CidadeAppdobemService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AppbemTestModule],
        declarations: [CidadeAppdobemUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CidadeAppdobemUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CidadeAppdobemUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CidadeAppdobemService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CidadeAppdobem(123);
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
        const entity = new CidadeAppdobem();
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
