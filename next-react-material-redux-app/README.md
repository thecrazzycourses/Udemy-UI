# NextJS with Typescript
Default JS & JSX is supported by Next. JS is universal & JSX is supported by React.

Need to use TSX, we need to add some dependency : yarn add --dev typescript @types/react @types/node
This will be added as dev dependencies, which mean its only required at time of developing the code and not at runtime.
Next.js will automatically configure this file with default values. 
Providing your own tsconfig.json with custom compiler options is also supported.

Next.js uses Babel to handle TypeScript, which has some caveats, and some compiler options are handled differently.
You're now ready to start converting files from .js to .tsx and leveraging the benefits of TypeScript!.

A file named next-env.d.ts will be created in the root of your project. 
This file ensures Next.js types are picked up by the TypeScript compiler. 
You cannot remove it, however, you can edit it (but you don't need to).

------------------------------------------------------------------------------------------------------------------------
# Custom App
Next.js uses the App component to initialize pages. You can override it and control the page initialization. 
Which allows you to do amazing things like:

1. Persisting layout between page changes :  Might be Header & Footer
2. Keeping state when navigating pages : Might be Redux
3. Custom error handling using componentDidCatch : Might be Global Error Handling
4. Inject additional data into pages : Might be what you want for all pages like security
5. Add global CSS : Might be Material UI

To override the default App, create the file ./pages/_app.js as shown below:

The Component prop is the active page, so whenever you navigate between routes, 
Component will change to the new page. 
Therefore, any props you send to Component will be received by the page

Only uncomment this method if you have blocking data requirements for every single page in your application. 
This disables the ability to perform automatic static optimization, causing every page in your app to be server-side rendered.
--> MyApp.getInitialProps = async (appContext) => { }

Adding a custom getInitialProps in your App will disable Automatic Static Optimization in pages without Static Generation.
"next build" will emit .html files for statically optimized pages. 
For example, the result for the page pages/about.js would be:
.next/server/static/${BUILD_ID}/about.html

And if you add getServerSideProps to the page, it will then be JavaScript, like so:
.next/server/static/${BUILD_ID}/about.js

------------------------------------------------------------------------------------------------------------------------

# Custom Document
A custom Document is commonly used to augment your application's <html> and <body> tags. 
This is necessary because Next.js pages skip the definition of the surrounding document's markup.

A custom Document can also include getInitialProps for expressing asynchronous server-rendering data requirements.

To override the default Document, create the file ./pages/_document.js and extend the Document class
"<Html>, <Head />, <Main /> and <NextScript />" are required for the page to be properly rendered.

Custom attributes are allowed as props, like lang: "<Html lang="en">"

1. Document is only rendered in the server, event handlers like onClick won't work
2. React components outside of <Main /> will not be initialized by the browser. 
   Do not add application logic here. If you need shared components in all your pages (like a menu or a toolbar), take a look at the App component instead
3. Document's getInitialProps function is not called during client-side transitions, nor when a page is statically optimized
4. Make sure to check if ctx.req / ctx.res are defined in getInitialProps. 
   Those variables will be undefined when a page is being statically exported by Automatic Static Optimization or by next export
5. Common errors include adding a <title> in the <Head /> tag or using styled-jsx. 
   These should be avoided in pages/_document.js as they lead to unexpected behavior


------------------------------------------------------------------------------------------------------------------------

# Custom Server

Typically you start your next server with next start. 
It's possible, however, to start a server 100% programmatically in order to use custom route patterns.

Before deciding to use a custom server please keep in mind that it should only be used when the integrated router of Next.js can't meet your app requirements. 
A custom server will remove important performance optimizations, like serverless functions and Automatic Static Optimization.

server.js doesn't go through babel or webpack. 
Make sure the syntax and sources this file requires are compatible with the current node version you are running.

------------------------------------------------------------------------------------------------------------------------

# Environment Variables

Next.js has built-in support for loading environment variables from .env.local into process.env.

Server Side:
DOB=22-05-1990

This loads process.env.DOB into the Node.js environment automatically allowing you to use them in Next.js data fetching methods and API routes.

Exposing Environment Variables to the Browser:

By default all environment variables loaded through .env.local are only available in the Node.js environment, meaning they won't be exposed to the browser.
In order to expose a variable to the browser you can prefix the variable with NEXT_PUBLIC_. For example:

Client Side:
NEXT_PUBLIC_NAME=Rahul Choudhary

This loads process.env.NEXT_PUBLIC_NAME into the Node.js environment automatically. 
Allowing you to use it anywhere in your code. The value will be inlined into JavaScript sent to the browser because of the NEXT_PUBLIC_ prefix.

Note: .env, .env.development, and .env.production files should be included in your repository as they define defaults. 
.env*.local should be added to .gitignore, as those files are intended to be ignored. .env.local is where secrets can be stored.

------------------------------------------------------------------------------------------------------------------------

# Built-In CSS Support

Adding a Global Stylesheet:
To add a stylesheet to your application, import the CSS file within pages/_app.js.

For example, consider the following stylesheet named styles.css:
Create a pages/_app.js file if not already present. Then, import the styles.css file.
These styles (styles.css) will apply to all pages and components in your application. 
Due to the global nature of stylesheets, and to avoid conflicts, you may only import them inside pages/_app.js.

In development, expressing stylesheets this way allows your styles to be hot reloaded as you edit them—meaning you can keep application state.
In production, all CSS files will be automatically concatenated into a single minified .css file.

Adding Component-Level CSS:
Next.js supports CSS Modules using the [name].module.css file naming convention.

CSS Modules locally scope CSS by automatically creating a unique class name. 
This allows you to use the same CSS class name in different files without worrying about collisions.

This behavior makes CSS Modules the ideal way to include component-level CSS. 
CSS Module files can be imported anywhere in your application.


------------------------------------------------------------------------------------------------------------------------

Authentication Via Auth0
1. Login & Logout Button in Header Component 

Create Regular Web Application
Select NodeJS
2. Configure Auth Setting : 
    a. Allowed Callback URLs : http://localhost:3000/callback 
    b. Allowed Logout URLs : http://localhost:3000
    c. Allowed Web Origins : : http://localhost:3000
    d. Application Type : Single Page Application
    e. Check you ClientID, Client Secret & Domain
    f. ID Token Expiration : 3600
    g. Under Connections -> Social -> Make sure google is on 
3. yarn add @auth0/nextjs-auth0

Login --> GET /api/v1/login ---> Serverless Function --> GET auth0.com/login --> Google Login Screen --> Provide Credentials --> GET auth0.com/authorize
Oauth will redirect to redirect URI ie /api/v1/callback

example:
Login Button clicked --> GET /api/v1/login --> await auth0.handleLogin(req, res) --> Google Login Screen --> Provide Credentials --> GET auth0.com/authorize
--> redirect to redirect URI ie /api/v1/callback --> await auth0.handleCallback(req, res, {redirectTo: '/'});

Login : await auth0.handleLogin(req, res)
Callback : auth0.handleCallback(req, res, {redirectTo: '/home'})
Profile : await auth0.handleProfile(req, res)
Logout : await auth0.handleLogout(req, res)

From Header : Login & Logout, route to below api
onClick={() => router.push('' + '/api/v1/login')
onClick={() => router.push('' + '/api/v1/logout')

Profile Data : const {data, loading} = useGetUser() which makes api call to '/api/v1/me'

Protect Page to access without the login :
if we don't have data prop then we can route it to /api/v1/login

Right now every page call "/api/v1/me" and get the data back, 
we pass this data to BaseLayout Page as props & BaseLayout pass to headers.
if we don't have data prop in page then we can route it to /api/v1/login

Now we will create HOC : Higher Order Component 
HOC are functions which takes component, and return component with extra functionality

example : 
import React from "react";
function withAuth(Component) {
    return function (props) {
        return <Component title="Only for Authorized User!" {...props} />
    }
}
export default withAuth

withAuth(Secret) & read this title from props in Secret Component

Server Side Authentication:


------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------