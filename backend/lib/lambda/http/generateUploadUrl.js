import 'source-map-support/register';
import * as middy from 'middy';
import { cors, httpErrorHandler } from 'middy/middlewares';
import { generateUploadUrlIMG } from '../../helpers/attachmentUtils';
import { createLogger } from '../../utils/logger';
const logger = createLogger('UploadImageTOdo');
export const handler = middy(async (event) => {
    const todoId = event.pathParameters.todoId;
    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    };
    logger.info('doing uploadphoto event...');
    try {
        const signedUrl = await generateUploadUrlIMG(event, todoId);
        return {
            statusCode: 201,
            headers,
            body: JSON.stringify({ uploadUrl: signedUrl })
        };
    }
    catch (error) {
        logger.info('doing uploadphoto event...');
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error })
        };
    }
});
handler
    .use(httpErrorHandler())
    .use(cors({
    credentials: true
}));
//# sourceMappingURL=generateUploadUrl.js.map