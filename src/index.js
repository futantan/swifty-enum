function Enum(cases) {
  if (this instanceof Enum) {
    if (Array.isArray(cases)) {
      cases.forEach((val) => {
        const func = () => { };
        func.rawValue = val;
        this[val] = func;
      });
    }
  } else {
    return new Enum(cases);
  }
}

Enum.prototype.addCaseWithAssociatedValues = function (enumName, associatedValues) {
  const func = (params) => ({
    rawValue: enumName,
    associatedValues: associatedValues ? associatedValues.reduce((prev, curr) => ({ ...prev, [curr]: params[curr] }), {}) : undefined,
  });
  func.rawValue = enumName;
  func.associatedValues = associatedValues;
  this[enumName] = func;
  return this;
}

Enum.prototype.addCase = function (enumName) {
  this.addCaseWithAssociatedValues(enumName, undefined)
  return this;
}

Enum.prototype.addCases = function (casesToAdd) {
  if (typeof casesToAdd === 'string') {
    this.addCase(casesToAdd);
  }
  if (Array.isArray(casesToAdd)) {
    casesToAdd.forEach(this.addCase.bind(this));
  }
  return this;
}

Enum.prototype.build = function () {
  return this;
}

Enum.rawValue = function (enumCase) {
  return enumCase.rawValue;
}

export default Enum;
