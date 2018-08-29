const caseFuncGen = (enumName, associatedValues) => {
  const func = (params) => ({
    type: enumName,
    associatedValues: associatedValues ? associatedValues.reduce((prev, curr) => ({ ...prev, [curr]: params[curr] }), {}) : undefined,
  });
  func.type = enumName;
  func.associatedValues = associatedValues;
  return func;
}

function Enum(cases) {
  if (this instanceof Enum) {
    if (Array.isArray(cases)) {
      this.types = {};
      cases.forEach((enumName) => {
        const func = caseFuncGen(enumName);
        this[enumName] = func;
        this.types[enumName] = enumName;
      });
    }
  } else {
    return new Enum(cases);
  }
}

Enum.prototype.addCaseWithAssociatedValues = function (enumName, associatedValues) {
  const func = caseFuncGen(enumName, associatedValues);
  this[enumName] = func;
  if (!this.types) { this.types = {}; }
  this.types[enumName] = enumName;
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

Enum.type = function (enumCase) {
  return enumCase.type;
}

Enum.values = function (enumCase) {
  return enumCase.associatedValues;
}

export default Enum;
