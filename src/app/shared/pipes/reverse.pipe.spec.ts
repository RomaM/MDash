import {TestBed} from '@angular/core/testing';
import {ReversePipe} from './reverse.pipe';

describe('PIPE -> Pipe Reverse', () => {
  it('Should reverse a string', () => {
    const reversePipe = new ReversePipe();
    expect(reversePipe.transform('String')).toEqual('gnirtS');
  });
});
