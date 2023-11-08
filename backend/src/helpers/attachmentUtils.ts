import * as AWS from 'aws-sdk'
import { getUserId } from '../lambda/utils';
import { TodoAccess } from './todosAcess';
import { APIGatewayProxyEvent } from 'aws-lambda';

const todoAccess = new TodoAccess();

// TODO: Implement the fileStogare logic
export async function generateUploadUrlIMG(event: APIGatewayProxyEvent, todoId: string): Promise<string> {
    const userId = getUserId(event);
    const bucketName = process.env.ATTACHMENT_S3_BUCKET;
    const urlExpiration = parseInt(process.env.SIGNED_URL_EXPIRATION, 10);
    const s3 = new AWS.S3({ signatureVersion: 'v4' });
    const signedUrl = s3.getSignedUrl('putObject', {
      Bucket: bucketName,
      Key: todoId,
      Expires: urlExpiration
    });
    await todoAccess.saveImgUrlString(userId, todoId, bucketName);
    return signedUrl;
  }