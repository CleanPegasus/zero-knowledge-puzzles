const chai = require('chai');
const {
    wasm
} = require('circom_tester');
const path = require("path");
const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);
const chaiAsPromised = require("chai-as-promised");
const wasm_tester = require("circom_tester").wasm;

chai.use(chaiAsPromised);
const expect = chai.expect;

describe("integer square root validation", function() {
    this.timeout(100000);

    let circuit;

    before(async () => {
        circuit = await wasm_tester(path.join(__dirname, "../QuinSelector/", "QuinSelector.circom"));
        await circuit.loadConstraints();
    });

    it("Should return 5n", async () => {

      const witness = await circuit.calculateWitness({
            "in": [3, 4, 5, 6, 7, 8],
            "selector": 2
      })

      expect(witness[1]).to.be.eq(5n);
    });
});
