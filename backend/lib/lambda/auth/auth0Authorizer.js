import 'source-map-support/register';
import JwksRsa from 'jwks-rsa';
import { decode, verify } from 'jsonwebtoken';
import { createLogger } from '../../utils/logger';
const logger = createLogger('auth');
// TODO: Provide a URL that can be used to download a certificate that can be used
// to verify JWT token signature.
// To get this URL you need to go to an Auth0 page -> Show Advanced Settings -> Endpoints -> JSON Web Key Set
const jwksUrl = 'https://dev-m3o08pp56xaofhg2.us.auth0.com/.well-known/jwks.json';
export const handler = async (event) => {
    logger.info('Authorizing a user', event.authorizationToken);
    try {
        const jwtToken = await verifyToken(event.authorizationToken);
        logger.info('User was authorized', jwtToken);
        return {
            principalId: jwtToken.sub,
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Effect: 'Allow',
                        Resource: '*'
                    }
                ]
            }
        };
    }
    catch (e) {
        logger.error('User not authorized', { error: e.message });
        return {
            principalId: 'user',
            policyDocument: {
                Version: '2012-10-17',
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Effect: 'Deny',
                        Resource: '*'
                    }
                ]
            }
        };
    }
};
async function verifyToken(authHeader) {
    const token = getToken(authHeader);
    const jwt = decode(token, { complete: true });
    const client = JwksRsa({ jwksUri: jwksUrl });
    const kid = jwt.header.kid;
    const certSigningKey = (await client.getSigningKey(kid));
    return verify(token, certSigningKey.publicKey, { algorithms: ['RS256'] });
}
export function getToken(authHeader) {
    if (!authHeader)
        throw new Error('No authentication header');
    if (!authHeader.toLowerCase().startsWith('bearer '))
        throw new Error('Invalid authentication header');
    const split = authHeader.split(' ');
    const token = split[1];
    return token;
}
//# sourceMappingURL=auth0Authorizer.js.map