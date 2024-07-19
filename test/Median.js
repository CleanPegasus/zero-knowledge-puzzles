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
        circuit = await wasm_tester(path.join(__dirname, "../Median/", "Median.circom"));
        await circuit.loadConstraints();
    });

    it("Should not revert if the elements are sorted", async () => {
        expect(await circuit.calculateWitness({
            "in": [3, 4, 5, 6, 7],
            "k": 5
        })).to.be.ok;
        expect(await circuit.calculateWitness({
            "in": [1, 2, 3, 4, 5],
            "k": 3
        })).to.be.ok;
    });

    it("Should revert if the elements are not sorted", async () => {
        await expect(circuit.calculateWitness({
            "in": [1, 2, 0, 4, 5],
            "k": 3
        })).to.eventually.be.rejected;
        await expect(circuit.calculateWitness({
            "in": [1, 2, 3, 4, 5],
            "k": 5
        })).to.eventually.be.rejected;
    });
});