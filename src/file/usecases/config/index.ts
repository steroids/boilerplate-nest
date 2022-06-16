import {join} from 'path';

const uploadRelativeDir = 'uploaded';

export const FileConfig = {
    // @todo move to ConfigService
    uploadedFilesDir: join(process.env.APP_ROOT_FILES_DIR, uploadRelativeDir),
    relativeUrlPrefix: process.env.APP_STATIC_URL_PREFIX + '/' + uploadRelativeDir,
    thumbnail: {
        prefix: '.thumbnail.',
        width: 500,
        height: 300,
    },
};
