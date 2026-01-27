const path = require('path');

module.exports = {
    meta: {
        type: 'problem',
        messages: {
            forbidden: 'createQueryBuilder is not allowed in migrations. Use queryRunner.query',
        },
    },

    create(context) {
        const filename = context.getFilename();
        const normalizedPath = filename.replace(/\\/g, '/');

        if (!normalizedPath.includes('/migrations/')) {
            return {};
        }

        const isForbiddenCreateQueryBuilder = (node) => node.property?.name === 'createQueryBuilder'
            && node.object?.type === 'MemberExpression'
            && node.object.property?.name === 'manager'
            && node.object.object?.type === 'Identifier'
            && node.object.object.name === 'queryRunner';

        return {
            MemberExpression(node) {
                if (!isForbiddenCreateQueryBuilder(node)) {
                    return;
                }

                context.report({
                    node,
                    messageId: 'forbidden',
                });
            },
        };
    },
};
