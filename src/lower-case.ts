import { Node, NodeAPI } from 'node-red';

export default function lowerCaseNode(RED: NodeAPI): void {
  RED.nodes.registerType("lower-case", function (this: Node, config) {
    RED.nodes.createNode(this, config);

    this.on('input', (msg: any) => {
      msg.payload = msg.payload.toLowerCase();
      this.send(msg);
    });
  });
};

module.exports = lowerCaseNode;
