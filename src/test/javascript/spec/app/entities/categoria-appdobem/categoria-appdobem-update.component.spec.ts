import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { AppbemTestModule } from '../../../test.module';
import { CategoriaAppdobemUpdateComponent } from 'app/entities/categoria-appdobem/categoria-appdobem-update.component';
import { CategoriaAppdobemService } from 'app/entities/categoria-appdobem/categoria-appdobem.service';
import { CategoriaAppdobem } from 'app/shared/model/categoria-appdobem.model';

describe('Component Tests', () => {
  describe('CategoriaAppdobem Management Update Component', () => {
    let comp: CategoriaAppdobemUpdateComponent;
    let fixture: ComponentFixture<CategoriaAppdobemUpdateComponent>;
    let service: CategoriaAppdobemService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AppbemTestModule],
        declarations: [CategoriaAppdobemUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(CategoriaAppdobemUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CategoriaAppdobemUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CategoriaAppdobemService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new CategoriaAppdobem(123);
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
        const entity = new CategoriaAppdobem();
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
