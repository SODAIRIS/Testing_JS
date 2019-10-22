expect = require("chai").expect;
should = require("chai").should();
_ = require("lodash");

log = console.log;

const {
  getPerson,
  Person,
  Armor,
  Weapon,
  rollDice,
  getRandomNumber,
  getNotARandomNumber,
  attack
} = require("../app-three");

describe("#mocha basics", () => {
  it("True should be true", () => {
    true.should.be.true;
  });
  it("I expect true to be true", () => {
    expect(true).to.be.true;
  });
});

describe("# app-three initial conditions", () => {
  it("Initial person is an object", () => {
    const person = getPerson();
    _.isObject(person).should.be.true;
  });
  //   it.only("armorBonus by default is 0 wearing leatherArmor", () => {  ==> only run this test.
  it("armorBonus by default is 2 wearing leatherArmor", () => {
    const person = getPerson();
    person.armorBonus.should.equal(2);
    // FIXME: should be 2 by default using leatherArmor,
    // fix is to not reset armorBonus to 0
  });
});

// Math.random is hard to test.
describe("#Person", () => {
  describe("#rollDice", () => {
    it("should return a finite number (not NaN nor Infinity)", () => {
      //   log("Person:", Person);
      const number = Person.rollDice(1, 20);
      _.isFinite(number).should.be.true;
      log("number:", number);
    });
    it("should not have 0 in a 1000 sample size", () => {
      const sample = new Array(1000);
      _.fill(sample, 0);
      const rollDiceSample = _.map(sample, item => Person.rollDice(1, 20));
      //log("rollDiceSample:", rollDiceSample);
      const anyZeros = _.filter(rollDiceSample, item => item === 0);
      anyZeros.length.should.equal(0);
    });
  });

  describe("#attack", () => {
    let personA;
    let personB;
    let createPersonFixture = name => {
      let leatherArmor = new Armor("Leather", 2);
      let shortSword = new Weapon("Short Sword", 0, 1, 6);
      return new Person(name, 2, 4, 1, [leatherArmor, shortSword]);
    };
    // do before each unit test.  every 'it' is a unit test.
    beforeEach(() => {
      personA = createPersonFixture("Person A");
      personB = createPersonFixture("Person B");
    });
    // do after each unit test.
    afterEach(() => {
      personA = undefined;
      personB = undefined;
    });
    it("personA's hitPoints start at 11", () => {
      personA.hitPoints.should.equal(11);
    });
    it("personB's hitPoints start at 11", () => {
      personB.hitPoints.should.equal(11);
    });
    it("personA's armorBonus is 2 sadly", () => {
      personA.armorBonus.should.equal(2);
    });
    it("personB's armorBonus is 2 sadly", () => {
      personB.armorBonus.should.equal(2);
    });
    it("If I add a boomStick to my equipment, it's in the array", () => {
      const boomStick = new Weapon("Boom Stick", 0, 1, 12);
      personA.addEquipment(boomStick);
      personA.equipment.should.include(boomStick);
    });
  });

  // code coverage: code coverage is to evaluate how many code you already covered in your unit test.

  // use package called: istanbul
  /*
        add new 'script' in package.json like:
            "coverage":"istanbul cover _mocha app-three.test.js -x *.test.js",
            "showcoverage":"open coverage/lcov-report/index.html"
   */
});

// Refactoring: sometimes some function is untestable, so we need to refactor that function and then test it.
// e.g.: rollDice and getRandomNumber
describe("#getRandomNumber", () => {
  it("Should return a finite number", () => {
    const result = getRandomNumber();
    _.isFinite(result).should.be.true;
  });
});
describe("#rollDice", () => {
  it("Should return a finite number", () => {
    const result = rollDice(1, 20);
    _.isFinite(result).should.be.true;
  });
  it("Should NOT be a random number if we use 1", () => {
    const result = rollDice(1, 20, getNotARandomNumber);
    result.should.equal(20);
  });
});
describe("#getNotARandomNumber", () => {
  it("Should return a 1", () => {
    const result = getNotARandomNumber();
    result.should.equal(1);
  });
});
describe("", () => {
  it("Should always be a hit if 20 is rolled", () => {
    const rollDice = () => 20;
    const result = attack(rollDice, getNotARandomNumber, 0, 0, 0);
    log("result:", result);
    result.hit.should.be.true;
  });
});
