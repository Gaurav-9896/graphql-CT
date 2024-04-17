import axios from 'axios'

export const getAccessToken = async () => {
    try {
        console.log(process.env.DEV_AUTH_URL,process.env.DEV_CLIENT_ID,process.env.DEV_CLIENT_SECRET)
        const accessTokenUrl = `${process.env.DEV_AUTH_URL}/oauth/token?grant_type=client_credentials`
        const basicAuth = Buffer.from(`${process.env.DEV_CLIENT_ID}:${process.env.DEV_CLIENT_SECRET}`).toString('base64');
        const requestBody = new URLSearchParams();
        requestBody.append('grant_type', 'client_credentials'); // Use the appropriate grant type
        requestBody.append('scope', process.env.DEV_SCOPES as string);
        const response = await axios.post(accessTokenUrl, requestBody, {
            headers: {
                Authorization: `Basic ${basicAuth}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data.access_token;

    } catch (error) {
        console.log('Error obtaining access token:', error)
    }

}