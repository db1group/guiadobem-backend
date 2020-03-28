import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EstabelecimentoAppdobemService } from 'app/entities/estabelecimento-appdobem/estabelecimento-appdobem.service';
import { IEstabelecimentoAppdobem, EstabelecimentoAppdobem } from 'app/shared/model/estabelecimento-appdobem.model';

describe('Service Tests', () => {
  describe('EstabelecimentoAppdobem Service', () => {
    let injector: TestBed;
    let service: EstabelecimentoAppdobemService;
    let httpMock: HttpTestingController;
    let elemDefault: IEstabelecimentoAppdobem;
    let expectedResult: IEstabelecimentoAppdobem | IEstabelecimentoAppdobem[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(EstabelecimentoAppdobemService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new EstabelecimentoAppdobem(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a EstabelecimentoAppdobem', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new EstabelecimentoAppdobem()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a EstabelecimentoAppdobem', () => {
        const returnedFromService = Object.assign(
          {
            nome: 'BBBBBB',
            tipo: 'BBBBBB',
            telefone: 'BBBBBB',
            whatsapp: 'BBBBBB',
            responsavel: 'BBBBBB',
            urlLogo: 'BBBBBB',
            publicar: true
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of EstabelecimentoAppdobem', () => {
        const returnedFromService = Object.assign(
          {
            nome: 'BBBBBB',
            tipo: 'BBBBBB',
            telefone: 'BBBBBB',
            whatsapp: 'BBBBBB',
            responsavel: 'BBBBBB',
            urlLogo: 'BBBBBB',
            publicar: true
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

      it('should delete a EstabelecimentoAppdobem', () => {
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
