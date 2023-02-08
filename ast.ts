import { Token, TokenTypes } from "./tokenizer";
export enum NodeTypes {
    Root,
    Number,
    CallExpression
}
interface Node {
    type: NodeTypes
}
// 这里就是在后面比如params里面放的不一定是number，可能是表达式，所以我们可以将其抽离出来。
export type ChildNode = NumberNode | CallExpressionNode
export interface RootNode extends Node {
    body: ChildNode[]
}
interface NumberNode extends Node {
    value: string
}
interface CallExpressionNode extends Node {
    name: string,
    params: ChildNode[]
}
function createRootNode(): RootNode {
    return {
        type: NodeTypes.Root,
        body: []
    }
}
function createNumberNode(value: string): NumberNode {
    return {
        type: NodeTypes.Number,
        value
    }
}
function createCallExpressionNode(name: string): CallExpressionNode {
    return {
        type: NodeTypes.CallExpression,
        name,
        params: []
    }
}
function parser(tokens: Token[]) {
    let current = 0
    let token = tokens[current];
    const rootNode = createRootNode()
    while (current < tokens.length) {
        if (token.type === TokenTypes.Number) {
            const numberNode = createNumberNode(token.value)
            rootNode.body.push(numberNode)
        }
        if (token.type === TokenTypes.Paren && token.value === "(") {
            token = tokens[++current]
            const node = createCallExpressionNode(token.value)
            token = tokens[++current]
            while (!(token.type === TokenTypes.Paren && token.value === ")")) {
                if (token.type === TokenTypes.Number) {
                    const numberNode = createNumberNode(token.value)
                    node.params.push(numberNode)
                    token = tokens[++current]
                }
            }
            current++
            rootNode.body.push(node)
        }
    }

    return rootNode
}
