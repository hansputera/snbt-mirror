import { Deadlinejs } from '@/types/deadlinejs';
import type { AssignmentExpression } from 'acorn';
import { Literal } from 'acorn';
import { parse } from 'espree';

export const parseDeadlinejsCode = (ast: ReturnType<typeof parse>) => {
    const expressions = ast.body.filter(f => f.type === 'ExpressionStatement');

    const keys = ['snbt_current_time', 'snbt_deadline_time', 'deadline_status', 'dataurl'];
    const onlyKeyExpressions = expressions.filter(exp => exp.expression.type === 'AssignmentExpression' && exp.expression.left.type === 'Identifier' && keys.includes(exp.expression.left.name));

    if (onlyKeyExpressions.length !== keys.length) {
        return undefined;
    }

    const getExpressionValue = (expression: typeof onlyKeyExpressions[0]) => {
        const exp = expression.expression as AssignmentExpression;
        const pattern = exp.right as Literal;

        return pattern.value?.toString() ?? '-';
    }

    const data: Deadlinejs = {
        snbtCurrentTime: getExpressionValue(onlyKeyExpressions[0]),
        snbtDeadlineTime: getExpressionValue(onlyKeyExpressions[1]),
        snbtDeadlineStatus: getExpressionValue(onlyKeyExpressions[2]),
        snbtDataUrl: getExpressionValue(onlyKeyExpressions[3]),
    };

    return data;
}