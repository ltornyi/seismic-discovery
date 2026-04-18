import dotenv from 'dotenv';
dotenv.config();

import { getAccessToken } from "./common.js";

getAccessToken(process.env.TOKEN_ENDPOINT, process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.DELEGATION_USER_ID, process.env.SCOPE)
  .then(token => console.log('Token response:', token))
  .catch(error => console.error('Error:', error));