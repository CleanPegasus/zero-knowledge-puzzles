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
        circuit = await wasm_tester(path.join(__dirname, "../Num2Bits/", "Num2Bits.circom"));
        await circuit.loadConstraints();
    });

    it("Should not revert if the input is binary representation", async () => {
        let witness = await circuit.calculateWitness({
          "num": 6,
        }, true);
        // witness = witness
        witness.shift()
        console.log("witness_1: ", witness)

        let witness_2 = await circuit.calculateWitness({
          "num": 5,
        }, true);
        witness_2.shift()
        console.log("witness_2: ", witness_2)
        
    });


});