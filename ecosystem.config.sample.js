module.exports = {
    apps: [{
        name: 'boilerplatenest12345-nest-backend',
        script: 'dist/main.js',
        cwd: '/var/www/boilerplatenest12345',
        error_file: '/var/www/boilerplatenest12345/logs/nest-backend-error.log',
        out_file: '/var/www/boilerplatenest12345/files/nest-backend-out.log',
    }],
};
