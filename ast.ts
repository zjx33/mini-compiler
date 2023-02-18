import { Token, TokenTypes } from "./tokenizer";
export enum NodeTypes {
    NumberLiteral = "NumberLiteral",
    Program = "Program",
    StringLiteral = "StringLiteral",
    CallExpression = "CallExpression",
}

export type ChildNode =
    | NumberLiteralNode
    | CallExpressionNode
    | StringLiteralNode;

export interface Node {
    type: NodeTypes;
}

export interface NumberLiteralNode extends Node {
    type: NodeTypes.NumberLiteral;
    value: string;
}

export interface StringLiteralNode extends Node {
    value: string;
    type: NodeTypes.StringLiteral;
}

export interface CallExpressionNode extends Node {
    name: string;
    params: ChildNode[];
    type: NodeTypes.CallExpression;
    context?: ChildNode[];
}

export interface RootNode extends Node {
    body: ChildNode[];
    type: NodeTypes.Program;
    context?: ChildNode[];
}

export function createStringLiteralNode(value): StringLiteralNode {
    return {
        type: NodeTypes.StringLiteral,
        value,
    };
}

export function createRootNode(): RootNode {
    return {
        type: NodeTypes.Program,
        body: [],
    };
}

export function createNumberLiteralNode(value: string): NumberLiteralNode {
    return {
        type: NodeTypes.NumberLiteral,
        value,
    };
}

export function createCallExpression(name): CallExpressionNode {
    return {
        type: NodeTypes.CallExpression,
        name,
        params: [],
    };
}
function parser(tokens: Token[]) {
    let current = 0
    let token = tokens[current];
    const rootNode = createRootNode()
    while (current < tokens.length) {
        if (token.type === TokenTypes.Number) {
            const numberNode = createNumberLiteralNode(token.value)
            rootNode.body.push(numberNode)
        }
        if (token.type === TokenTypes.Paren && token.value === "(") {
            token = tokens[++current]
            const node = createCallExpression(token.value)
            token = tokens[++current]
            while (!(token.type === TokenTypes.Paren && token.value === ")")) {
                if (token.type === TokenTypes.Number) {
                    const numberNode = createNumberLiteralNode(token.value)
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