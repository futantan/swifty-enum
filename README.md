# Swifty-Enum

[![CircleCI](https://circleci.com/gh/futantan/swifty-enum.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/futantan/swifty-enum) 
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/futantan/swifty-enum/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/swifty-enum.svg)](https://www.npmjs.com/package/swifty-enum)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()
 
This repo helps you use Enum in [Swfit way](https://docs.swift.org/swift-book/LanguageGuide/Enumerations.html).

## Create A Enum Type

```js
const Direction = Enum(['North', 'South', 'East', 'West']);
```

Now, you get a new type: `Direction`, which contains four cases:
* North
* South
* East
* West

You can directly use a case by `Direction.North`, or invoke it with `Direction.North()`. You can pass associated values in(optionally).

Use `Enum.type()` to get the type of the case.
Use `Direction.types` to get all cases types. 

```js
// Direction is an Enum type.
const myDirection = Direction.North;
switch (Enum.type(myDirection)) {
  case Direction.types.North:
    console.log('North');
    break;
  case Direction.types.South:
    console.log('South');
    break;
  case Direction.types.East:
    console.log('East');
    break;
  case Direction.types.West:
    console.log('West');
    break;
  default:
    break;
}
// it will log out 'North'
```

## Use with associated values

Use `addCase` to add a plain case, or `addCaseWithAssociatedValues` to add a case with values.

```js
const AsyncState = Enum()
  .addCase('Loading')
  .addCaseWithAssociatedValues('Succeed', ['payload'])
  .addCaseWithAssociatedValues('Failed', ['error'])
  .build();
```

Now you get a `AsyncState`, it will give you 3 function
* Loading
* Succeed
* Failed

You can call the function with associated values you want to put in.

```js
const { Loading, Succeed, Failed } = AsyncState;
let state = Loading();
axios.get('https://httpbin.org/get?name=alice')
  .then((resp) => {
    state = Succeed({ payload: resp })
    console.log(state);
  })
  .catch(error => {
    state = Failed({ error: error })
    console.log(state);
  })  
```

If the request succeed, you can put the resp in `Succeed` case, and get that value via `Enum.values(state).payload`. 

If the request failed, you use a `Failed` to represent that case, and retrieve the error using `Enum.values(state).error`.
