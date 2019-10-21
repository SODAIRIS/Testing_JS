expect = require("chai").expect;
should = require("chai").should();
_ = require("lodash");

const { alwaysTrue, legitString } = require("../app-two");

describe("#mocha basics", () => {
  it("True should be true", () => {
    true.should.be.true;
  });
  it("I expect true to be true", () => {
    expect(true).to.be.true;
  });
});

describe("#alwaysTrue", () => {
  it("Should always return true", () => {
    alwaysTrue().should.be.true;
  });
  it("I expect it to always be true", () => {
    // positive test
    expect(alwaysTrue()).to.be.true;
  });
  it("Should not be false", () => {
    // negative test
    alwaysTrue().should.not.be.false;
  });
});

describe("#legitString", () => {
  it("Should detect 'cow' as a legit string", () => {
    // positive test
    legitString("cow").should.be.true;
  });

  it("undefined should not be true", () => {
    // negative test
    legitString(undefined).should.not.be.true;
  });
});
