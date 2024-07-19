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

describe("IsSorted -- Constrain signals to be sorted", function() {
    this.timeout(100000);

    let circuit;

    before(async () => {
        circuit = await wasm_tester(path.join(__dirname, "../BitwiseXOR/", "BitwiseXOR.circom"));
        await circuit.loadConstraints();
    });

    it("Should not revert if the elements are sorted", async () => {
        let witness = await circuit.calculateWitness({
            "in": [[0, 1, 0, 1], [1, 0, 1, 1]],
        });
        witness.shift();
        console.log("witness_1 ", witness);
        let witness_2 = await circuit.calculateWitness({
            "in": [[0, 1, 1, 0], [1, 0, 1, 0]],
        });
        witness_2.shift();
        console.log("witness_2 ", witness_2);
    });

    it("Should revert if the elements are not sorted", async () => {
        await expect(circuit.calculateWitness({
            "in": [[0, 1, 2, 1], [1, 0, 1, 1]],
        })).to.eventually.be.rejected;
        await expect(circuit.calculateWitness({
            "in": [[0, 1, 0, 3], [1, 0, 1, 1]],
        })).to.eventually.be.rejected;
    });
});