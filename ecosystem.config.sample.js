module.exports = {
    apps: [{
        name: 'condition-monitoring-integration-service-nest-backend',
        script: 'dist/main.js',
        cwd: '/var/www/condition-monitoring-integration-service',
        error_file: '/var/www/condition-monitoring-integration-service/logs/nest-backend-error.log',
        out_file: '/var/www/condition-monitoring-integration-service/logs/nest-backend-out.log',
    }],
};
