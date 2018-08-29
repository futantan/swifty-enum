# Swifty-Enum

This repo helps you use Enum in [Swfit way](https://docs.swift.org/swift-book/LanguageGuide/Enumerations.html).

## Create A Enum Type

```js
const Direction = Enum(['North', 'South', 'East', 'West']);
// Direction is an Enum type.
const myDirection = Direction.North;
switch (myDirection.rawValue) {
  case Direction.North.rawValue:
    console.log('North');
    break;
  case Direction.South.rawValue:
    console.log('South');
    break;
  case Direction.East.rawValue:
    console.log('East');
    break;
  case Direction.West.rawValue:
    console.log('West');
    break;
  default:
    break;
}
// it will log out 'North'
```

## Use with associated values

```js
const AsyncState = Enum()
  .addCase('Loading')
  .addCaseWithAssociatedValues('Succeed', ['payload'])
  .addCaseWithAssociatedValues('Failed', ['error'])
  .build();

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

If the request succeed, you can put the resp in `Succeed` enum, and get that value via `state.associatedValues.payload`. 

If the request failed, you use a `Failed` to represent that case, and retrieve the error using `state.associatedValues.error`.
