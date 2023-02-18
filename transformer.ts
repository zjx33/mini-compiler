import { RootNode, NodeTypes } from "./ast";
import { traverser } from "./traverser";
export function transform(ast: RootNode) {
    const newAst = {
        type: NodeTypes.Program,
        body: []
    }
    // 创建一个新的字段将旧的ast给新的
    ast.context = newAst.body
    traverser(ast, {
        CallExpression: {
            enter(node, parent) {
                if (node.type === NodeTypes.CallExpression) {
                    let expression: any = {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: node.name
                        },
                        arguments: [],
                    }
                    node.context = expression.arguments;
                    if (parent?.type !== NodeTypes.CallExpression) {
                        expression = {
                            type: "ExpressionStatement",
                            expression
                        }
                    }
                    parent?.context?.push(expression)

                }
            }
        },
        NumberLiteral: {
            enter(node, parent) {
                if (node.type === NodeTypes.NumberLiteral) {
                    const numberNode: any = {
                        type: "NumberLiteral",
                        value: node.value
                    };
                    parent?.context?.push(numberNode)
                }
            }
        }
    })
    return newAst
}