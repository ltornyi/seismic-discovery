# Seismic discovery

Discover how custom properties are managed, especially multi-select types with cascading value rules.

## Create local database

Review and run `01db-init.js`. The local database will contain two custom properties with values and cascading logic.
The example is the following
1. The custom property called `experiementalparent` has two values: P1 and P2
2. The custom property called `experiementalchild` has three values: C1, C2 and C3
3. The cascading logic rules are:
    * If experiementalparent = P1 -> experimentalchild = C1
    * If experiementalparent = P2 -> experimentalchild = C2 or C3

## Connect using client credentials flow

### Register your app

Follow the instructions at the [doc](https://developer.seismic.com/seismicsoftware/reference/login-with-client-credentials-user-delegation-flow). You need a callback URL which listens for incoming requests and stores the delegated user id. Workaround: find the delegated user in Seismic under `Settings -> System settings -> U?sers&Groups`, click on the user row and grab the user id from the URL after `?showUserDetail=`. Also make sure to add all the relevant scopes to your app registration; see details below.

### Use Postman to get a token

Create a POST request in Postman, the URL should be `https://auth.seismic.com/tenants/{your tenant}/connect/token`. The payload should be constructed as the [documentation](https://developer.seismic.com/seismicsoftware/reference/auth-client-credentials) explains.

### Get an access token from code

Review `getAccessToken` in `common.js`; `02get-token.js` is an example call to obtain an access token. You will need to set up `.env`:

    CLIENT_ID={your client id}
    CLIENT_SECRET={your client secret}
    TOKEN_ENDPOINT=https://auth.seismic.com/tenants/{your tenant}/connect/token
    DELEGATION_USER_ID={your delegated user id}
    SCOPE=seismic.custom_property.view seismic.custom_property.manage seismic.library.view seismic.library.manage seismic.configuration.view seismic.configuration.manage

## Execute API calls

### List your teamsites

Review and run `03list-teamsites.js` to list all your teamsites. Your custom properties live in a teamsite; identify the
one where your custom properties will be and then store the teamsite id in the `.env` file like this:

    TEAMSITE={the id of your teamsite}

### List custom properties

Review and run `04list-props.js` to list the two custom properties called `experiementalparent` and `experiementalchild`.