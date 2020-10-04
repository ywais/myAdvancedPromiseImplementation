const Declare = require("./");

const testValue = "Hanodrim-Rules";
const testError = new Error("fuck me, an error");

jest.setTimeout(5000);

const projectName = "Declare <constructor>";
describe(projectName, () => {
  
  test("Is not an instance of Promise", () => {
    const declare = new Declare(()=>{});
    return expect(declare instanceof Promise).toBe(false);
  });

  test("Can create a new Declare instance", () => {
    const declare = new Declare(()=>{});
    expect(declare).toBeDefined();
  });

  test('Should have "then" method which returns a Declare', () => {
    const declare = new Declare(()=>{});
    expect(typeof declare.then).toBe("function");
    return expect(declare.then() instanceof Declare).toBe(true);
  });
  
  test('Should have "catch" method which returns a Declare', () => {
    const declare = new Declare((x) => x);
    expect(typeof declare.catch).toBe("function");
    return expect(declare.catch() instanceof Declare).toBe(true);
  });

  test('Can use the result of the declare using the "then" method', () => {
    const declare = new Declare((resolve) => {
      resolve(testValue);
    });
    return declare.then((result) => {
      expect(result).toBe(testValue);
    });
  });

  test('Can handle Errors using the "catch" method', () => {
    const declare = new Declare((resolve, reject) => {
      reject(testError);
    });
    return declare.catch((error) => {
      expect(error).toBe(testError);
    });
  });

  test("Can chain thens", () => {
    const declare = new Declare((resolve) => {
      resolve(5);
    });
    return declare
      .then((res) => res + 5)
      .then((val) => {
        expect(val).toBe(10);
      });
  });

  test("Is asynchronous", (done) => {
    let changer = null;
    const declare = new Declare((resolve) => { //this declare should resolve with "5" after .5 seconds
      setTimeout(() => {
        resolve(testValue);
      }, 500);
    });
    setTimeout(() => {// this checks after 1 second that the value of "changer" has changed
      expect(changer).toBe(testValue);
      done();
    }, 1000);
    declare.then((value) => {// the promise will ( once it resolves) change "changer" into "5"
      changer = value;
    });
    expect(changer).toBeNull();// this checks that the value of "changer" is stil null after the promise is created.
  });

  test("Can handle with errors thrown by the executor function", () => {
    const declare = new Declare((resolve, reject) => {
      throw testValue;
    });
    return declare.catch((error) => {
      expect(error).toBe(testValue);
    });
  });

});