import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoriaAppdobemService } from 'app/entities/categoria-appdobem/categoria-appdobem.service';
import { ICategoriaAppdobem, CategoriaAppdobem } from 'app/shared/model/categoria-appdobem.model';

describe('Service Tests', () => {
  describe('CategoriaAppdobem Service', () => {
    let injector: TestBed;
    let service: CategoriaAppdobemService;
    let httpMock: HttpTestingController;
    let elemDefault: ICategoriaAppdobem;
    let expectedResult: ICategoriaAppdobem | ICategoriaAppdobem[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(CategoriaAppdobemService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new CategoriaAppdobem(0, 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a CategoriaAppdobem', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new CategoriaAppdobem()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a CategoriaAppdobem', () => {
        const returnedFromService = Object.assign(
          {
            nome: 'BBBBBB',
            urlImagem: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of CategoriaAppdobem', () => {
        const returnedFromService = Object.assign(
          {
            nome: 'BBBBBB',
            urlImagem: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a CategoriaAppdobem', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
