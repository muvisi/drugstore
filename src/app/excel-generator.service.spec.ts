import { TestBed } from '@angular/core/testing';

import { ExcelGeneratorService } from './excel-generator.service';

describe('ExcelGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExcelGeneratorService = TestBed.get(ExcelGeneratorService);
    expect(service).toBeTruthy();
  });
});
