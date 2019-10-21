const log = console.log;
const _ = require("lodash");
const should = require("chai").should();
const expect = require("chai").expect;

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
describe.only("#Promises", () => {
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
