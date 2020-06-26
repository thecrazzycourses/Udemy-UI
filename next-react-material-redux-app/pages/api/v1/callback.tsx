import auth0 from "../../../src/common/utils/Auth0";

export default async function callback(req, res) {
    try {
        await auth0.handleCallback(req, res);
    } catch (e) {
        console.log(e);
        res.status(e.status || 400).end(e.message);
    }
};
