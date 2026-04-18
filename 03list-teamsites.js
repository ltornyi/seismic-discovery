import dotenv from 'dotenv';
dotenv.config();

import { getAccessToken, listTeamsites } from "./common.js";

getAccessToken(process.env.TOKEN_ENDPOINT, process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.DELEGATION_USER_ID, process.env.SCOPE)
  .then(token => {
    listTeamsites(token)
      .then(data => console.dir(data, { depth: null }))
      .catch(error => console.error('Error:', error));
  })
  .catch(error => console.error('Error:', error));


