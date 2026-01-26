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

        // ESLint может передавать <input> при stdin
        if (filename === '<input>') {
            return {};
        }

        const normalizedPath = filename.split(path.sep).join('/');

        const isMigrationFile = normalizedPath.includes('/migrations/');

        if (!isMigrationFile) {
            return {};
        }

        return {
            MemberExpression(node) {
                if (
                    node.property
                    && node.property.name === 'createQueryBuilder'
                    && node.object
                    && node.object.type === 'MemberExpression'
                    && node.object.property
                    && node.object.property.name === 'manager'
                    && node.object.object
                    && node.object.object.type === 'Identifier'
                    && node.object.object.name === 'queryRunner'
                ) {
                    context.report({
                        node,
                        messageId: 'forbidden',
                    });
                }
            },
        };
    },
};
