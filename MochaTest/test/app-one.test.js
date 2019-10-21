const assert = require("chai").assert;
// const app = require("../app");
const { sayHello, addNumbers } = require("../app-one");

sayHelloResult = sayHello();
addNumbersResult = addNumbers(5, 5);

describe("App", function() {
  describe("sayHello()", function() {
    it("sayHello should return hello", function() {
      //   let result = app.sayHello();
      // let result = sayHello();
      assert.equal(sayHelloResult, "hello");
    });

    it("sayHello should return type string", function() {
      assert.typeOf(sayHelloResult, "string");
    });
  });

  describe("addNumbers()", function() {
    it("addNumbers should be above 5", function() {
      assert.isAbove(addNumbersResult, 5);
    });

    it("addNumbers should return type number", function() {
      assert.typeOf(addNumbersResult, "number");
    });
  });
});

// run command:   npm run test

// ** NOTICE: Don't use lambda function with Mocha and Chai. They don't support it friendly.
// ** Of course you could use lambda function in your normal code.

/*
Unit Tests:
    * Fully isolated.(e.g. testing one function);
    * Write thousands of them.

Integration Tests:
    * With dependencies.(e.g. testing a function that calls a function).
    * Write a good couple of them.

End-to-End(E2E) Tests:
    * Full flow(e.g. validating a DOM after a click);
    * Write a few of them.
*/

/*

BDD(Behavior Driven Development)

TDD(Test Driven Development)


*/
