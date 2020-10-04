# Advanced Promise Challenge
## Story
- The client comes from a religious background and isn't comfortable with the word "promise" being part of their software
- The client wants a new class to replace the Promise, called... Declare
- you can clone [this boilerplate Repo](https://github.com/suvelocity/AdvancedPromiseBoilerplate) or create a new one. 
- run `npm i` in the terminal to install jest test library in order for the tests to run.
- Edit [index.js](index.js) to implement the Declare class. 
- run `npm run test` in the terminal to run the tests.

### requirements from the Declare class
1. is not implemented using the built-in Promise Class.
1. can create an instance with an **executor** function using the **new** keyword
1. has a **then** method which returns a **Declare** instance
1. has a **catch** method which returns a **Declare** instance
1. can use the return value of the **executor** with __then__ method
1. can handle error using the **catch** method
1. can use multiple **then**s chained one after the other
1. can use an asynchronous **executor**
1. handles errors thrown by the **executor** function.

* **HOT TIP** - add `.skip` to the end of a test in [test.js](test.js) to skip it in a run, and only test what you want to.

```javascript
test.skip("Is not an instance of Promise", () => {
    const declare = new Declare(()=>{});
    return expect(declare instanceof Promise).toBe(false);
  });
```