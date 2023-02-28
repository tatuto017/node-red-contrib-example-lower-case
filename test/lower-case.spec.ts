import { describe } from "mocha";
import { expect } from "chai";
import helper from "node-red-node-test-helper";
import lowerCase from "../src/lower-case";

helper.init(require.resolve("node-red"));

describe("lower-case Node", () => {
  afterEach((done) => {
    helper.unload();
    done();
  });

  it('should be loaded', (done) => {
    const flow = [{ id: "n1", type: "lower-case", name: "test name" }];
    helper.load(lowerCase, flow, () => {
      try {
        const n1 = helper.getNode('n1');
        expect(n1.name, 'test name');
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  it('should make payload lower case', (done) => {
    const flow = [
      { id: "n1", type: "lower-case", name: "lower-case", wires: [["n2"]] },
      { id: "n2", type: "helper" }
    ];
    helper.load(lowerCase, flow, () => {
      const n1 = helper.getNode("n1");
      const n2 = helper.getNode("n2");
      n2.on("input", (msg) => {
        try {
          expect(msg.payload, "uppercase");
          done();
        } catch (err) {
          done(err);
        }
      });
      n1.receive({ payload: "UpperCase" });
    });
  });
});
