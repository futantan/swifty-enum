import Enum from '../src/index';

describe('Enum init', () => {
  it('should handle simple cases', () => {
    const Direction = Enum(['North', 'South', 'East', 'West']);
    expect(Direction.North.rawValue).toEqual('North');
    expect(Direction.South.rawValue).toEqual('South');
    expect(Direction.East.rawValue).toEqual('East');
    expect(Direction.West.rawValue).toEqual('West');
  });

  it('should handle simple cases with new', () => {
    const Direction = new Enum(['North', 'South', 'East', 'West']);
    expect(Direction.North.rawValue).toEqual('North');
    expect(Direction.South.rawValue).toEqual('South');
    expect(Direction.East.rawValue).toEqual('East');
    expect(Direction.West.rawValue).toEqual('West');
  });
});

describe('Enum with associated values', () => {
  it('should return enum type', () => {
    const BarCode = Enum()
      .addCaseWithAssociatedValues('UPCA', ['numberSystem', 'identifier', 'check'])
      .addCaseWithAssociatedValues('QRCode', ['productCode'])
      .build();
    expect(BarCode.UPCA({ numberSystem: 123, identifier: 333, check: 1 }).rawValue).toEqual('UPCA');
    expect(BarCode.UPCA({ numberSystem: 123, identifier: 333, check: 1 }).associatedValues).toEqual({ numberSystem: 123, identifier: 333, check: 1 });
  });
});

describe('Enum for async state', () => {
  it('should return enum type', () => {
    const AsyncState = Enum()
      .addCase('Loading')
      .addCaseWithAssociatedValues('Succeed', ['payload'])
      .addCaseWithAssociatedValues('Failed', ['error'])
      .build();

    const Loading = AsyncState.Loading;
    const Succeed = AsyncState.Succeed;
    const Failed = AsyncState.Failed;
    expect(Loading.rawValue).toEqual('Loading');
    expect(Loading.associatedValues).toEqual(undefined);
    expect(Succeed({ payload: { msg: 'hello' } }).rawValue).toEqual('Succeed');
    expect(Succeed({ payload: { msg: 'hello' } }).associatedValues).toEqual({ payload: { msg: 'hello' } });
    expect(Failed({ error: 500 }).rawValue).toEqual('Failed');
    expect(Failed({ error: 500 }).associatedValues).toEqual({ error: 500 });
  });

  it('should handle edge case', () => {
    const BarCode = Enum()
      .addCaseWithAssociatedValues('UPCA', ['numberSystem', 'identifier', 'check'])
      .addCaseWithAssociatedValues('QRCode', ['productCode'])
      .addCaseWithAssociatedValues('Test')
      .build();
    expect(BarCode.Test().associatedValues).toBe(undefined);
  })
});
