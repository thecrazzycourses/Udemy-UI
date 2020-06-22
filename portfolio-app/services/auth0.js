import auth0 from 'auth0-js';
import Cookies from 'js-cookie';
import jwt from "jsonwebtoken";
import axios from 'axios';
import {getCookieFromReq} from "../helpers/util";

class Auth0 {

    constructor(props) {
        this.auth0 = new auth0.WebAuth({
            domain: 'oauth-dev.auth0.com',
            clientID: 'RVsirzWXK2TNsuoI6G3w3kawFs5xHKir',
            redirectUri: 'http://localhost:3000/callback',
            responseType: 'token id_token',
            scope: 'openid profile'
        });
    }

    handleAuthentication = () => {
        return new Promise((resolve, reject) => {
            this.auth0.parseHash((err, authResult) => {
                if (authResult && authResult.accessToken && authResult.idToken) {
                    this.setSession(authResult);
                    resolve();
                } else if (err) {
                    reject(err);
                    console.log(err);
                }
            });
        })
    }

    setSession = (authResult) => {
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

        Cookies.set('accessToken', authResult.accessToken);
        Cookies.set('idToken', authResult.idToken);
        Cookies.set('user', authResult.idTokenPayload);
        Cookies.set('jwt', authResult.idToken);
        Cookies.set('expiresAt', expiresAt);
    }

    login = () => {
        this.auth0.authorize();
    }

    logout = () => {
        Cookies.remove('accessToken');
        Cookies.remove('idToken');
        Cookies.remove('user');
        Cookies.remove('jwt');
        Cookies.remove('expiresAt');

        this.auth0.logout({
            returnTo: '',
            clientID: 'RVsirzWXK2TNsuoI6G3w3kawFs5xHKir'
        })
    }

    // From : https://oauth-dev.auth0.com/.well-known/jwks.json
    getJWKS = async () => {
        const res = await axios.get("https://oauth-dev.auth0.com/.well-known/jwks.json");
        const jwks = res.data;
        return jwks;
    }

    verifyToken = async (token) => {
        if (token) {
            // This Token is from Cookies
            const decodedToken = jwt.decode(token, {complete: true}); // complete to get header as well
            if (!decodedToken) {
                return undefined;
            }

            // GET JWKS FROM OAUTH
            const jwks = await this.getJWKS();
            const jwk = jwks.keys[0];

            // BUILD CERTIFICATE : To Test REGEX - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
            let cert = jwk.x5c[0];
            cert = cert.match(/.{1,64}/g).join('\n');
            cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;

            // Compare Kid of Token Header from Cookies and JWKS
            if (jwk.kid === decodedToken.header.kid) {
                try {
                    // Verify your Token with Certificate using JWT Verify
                    const verifiedToken = jwt.verify(token, cert);
                    const expiresAt = verifiedToken.exp * 1000; // exp from jwt,  Milli Sec to Sec
                    return (verifiedToken && new Date().getTime() < expiresAt) ? verifiedToken : undefined;
                } catch (e) {
                    return undefined;
                }
            }
        }
        return undefined;
    }

    clientAuth = async () => {
        const token = Cookies.getJSON('jwt');
        const verifiedToken = await this.verifyToken(token);

        return verifiedToken;
    }

    serverAuth = async (req) => {
        if (req.headers.cookie) {
            const token = getCookieFromReq(req, 'jwt');
            const verifiedToken = await this.verifyToken(token);
            return verifiedToken;
        }

        return undefined;
    }
}

const auth0Client = new Auth0();

export default auth0Client;