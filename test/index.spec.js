import Enum from '../src/index';

describe('Enum init', () => {
  it('should handle simple cases', () => {
    const Direction = Enum(['North', 'South', 'East', 'West']);
    const north = Direction.North;
    expect(Enum.type(north)).toEqual(Direction.types.North);
    expect(Enum.values(north)).toEqual(undefined);
  });

  it('should handle simple cases with new', () => {
    const Direction = new Enum(['North', 'South', 'East', 'West']);
    const north = Direction.North;
    expect(Enum.type(north)).toEqual(Direction.types.North);
    expect(Enum.values(north)).toEqual(undefined);
  });
});

describe('Enum with associated values', () => {
  it('should return enum type', () => {
    const BarCode = Enum()
      .addCaseWithAssociatedValues('UPCA', ['numberSystem', 'identifier', 'check'])
      .addCaseWithAssociatedValues('QRCode', ['productCode'])
      .build();
    const upca = BarCode.UPCA({ numberSystem: 123, identifier: 333, check: 1 });
    expect(Enum.type(upca)).toEqual(BarCode.types.UPCA);
    expect(upca.type).toEqual(BarCode.types.UPCA);
    expect(Enum.values(upca)).toEqual({ numberSystem: 123, identifier: 333, check: 1 });
    expect(upca.associatedValues).toEqual({ numberSystem: 123, identifier: 333, check: 1 });
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
    expect(Loading.type).toEqual(AsyncState.types.Loading);
    expect(Enum.type(Loading)).toEqual(AsyncState.types.Loading);
    expect(Loading.associatedValues).toEqual(undefined);
    expect(Enum.values(Loading)).toEqual(undefined);
    expect(Succeed({ payload: { msg: 'hello' } }).type).toEqual(Enum.type(Succeed));
    expect(Succeed({ payload: { msg: 'hello' } }).associatedValues).toEqual({ payload: { msg: 'hello' } });
    expect(Enum.values(Succeed({ payload: { msg: 'hello' } }))).toEqual({ payload: { msg: 'hello' } });
    expect(Enum.type(Succeed({ payload: { msg: 'hello' } }))).toEqual('Succeed');
    expect(Failed({ error: 500 }).type).toEqual('Failed');
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
