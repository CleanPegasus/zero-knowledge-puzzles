const chai = require('chai');
const { wasm } = require('circom_tester');
const path = require("path");
const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);
const chaiAsPromised = require("chai-as-promised");
const { assert } = require('console');
const wasm_tester = require("circom_tester").wasm;

chai.use(chaiAsPromised);
const expect = chai.expect;


describe("Mul Overlow Test", function (){
    this.timeout(100000);

    it("Should model addition", async() => {
        const circuit = await wasm_tester(path.join(__dirname,"../MulOverflow","MulOverflow.circom"));

        await circuit.loadConstraints();
        
        expect(await circuit.calculateWitness({
          "a": 2**32 - 1, 
          "b": 20
        }, true)).to.be.ok;
        const witness = await circuit.calculateWitness({
          "a": 2**32 - 1, 
          "b": 20
        }, true);
        console.log(witness[1])
        // assert(witness[1] == )
        expect(await circuit.calculateWitness({
          "a": 10, 
          "b": 20
        }, true)).to.be.ok;

    });
});
