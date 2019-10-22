const log = console.log;
const _ = require("lodash");
const chai = require("chai");
const should = require("chai").should();
const expect = require("chai").expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised); // provide: xxx.should.be.fulfilled  and xxx.should.be.rejected

const { readCow } = require("../app-four");

describe("App Four", () => {
  describe("#readCow", () => {
    it("should work", done => {
      readCow((error, contents) => {
        contents.should.equal("you");
        done();
      });
    });
    it("Should not have an error", done => {
      readCow((error, contents) => {
        expect(error).to.not.exist;
        done();
      });
    });
  });
});

// Unit Testing Successful Promises
describe("#Promises", () => {
  let maybe;
  beforeEach(() => {
    maybe = () => Promise.resolve("you");
  });
  it("Should be an Object", () => {
    const result = maybe();
    _.isObject(result).should.be.true;
  });
  it("Should work", done => {
    const result = maybe();
    result
      .then(data => {
        done();
      })
      .catch(error => {
        done(error);
      });
  });
  it("Should work and return data", done => {
    const result = maybe();
    result
      .then(data => {
        data.should.equal("you");
        done();
      })
      .catch(error => {
        done(error);
      });
  });
});

// Unit Testing Failed Promises
describe("#Maybe Not", () => {
  it("Should work", () => {
    return Promise.resolve();
  });
  it("Should fail", done => {
    const result = Promise.reject();
    result
      .then(() => {
        done(new Error("Should of failed."));
      })
      .catch(() => {
        done();
      });
  });
});

describe("#As promised", () => {
  it("Should work", () => {
    return Promise.all([
      Promise.resolve(true),
      Promise.resolve(1),
      Promise.resolve({ cow: "moo" })
    ]).should.be.fulfilled;
  });
  it("Should fail", () => {
    return Promise.reject().should.be.rejected;
  });
  it("1 plus 1 should equal 2", () => {
    (1 + 1).should.equal(2);
  });
  it("1 plus 1 should equal 2 even if a Promise delivers it", () => {
    return Promise.resolve(1 + 1).should.eventually.equal(2);
  });
});
