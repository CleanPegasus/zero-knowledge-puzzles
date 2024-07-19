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
        circuit = await wasm_tester(path.join(__dirname, "../BitwiseADD/", "BitwiseADD.circom"));
        await circuit.loadConstraints();
    });

    it("Should not revert if the elements are sorted", async () => {
      let input = [[1, 1, 0, 1], [1, 0, 1, 1]]
        let witness = await circuit.calculateWitness({
            "in": input,
        });
        // 1 1 0 1
        // 1 0 1 1
        // -------
        // 0 0 0 1
        witness.shift();
        witness = witness.slice(0, 4)
        let output = bitwiseAdd(input[0], input[1])
        console.log("output: ", output);
        console.log("witness_1 ", witness);



        let input2 = [[1, 1, 0, 0], [0, 1, 1, 1]]
        let witness_2 = await circuit.calculateWitness({
            "in": input2,
        });
        // 0 1 1 0
        // 1 0 1 0
        // -------
        // 1 1 0 1
        witness_2.shift();
        console.log("witness_2 ", witness_2);
        // console.log(witnessToBinary(witness_2))
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

function bitwiseAdd(arr1, arr2) {
    const maxLength = Math.max(arr1.length, arr2.length);
    const result = [];
    let carry = 0;
  
    for (let i = 0; i < maxLength; i++) {
      const bit1 = arr1[i] || 0;
      const bit2 = arr2[i] || 0;
      const sum = bit1 + bit2 + carry;
      result.push(sum % 2);
      carry = Math.floor(sum / 2);
    }
  
    if (carry) {
      result.push(carry);
    }
  
    return result;
  }
  
  function addBinaryArrays(arrays) {
    return arrays.reduce((acc, curr) => bitwiseAdd(acc, curr));
  }