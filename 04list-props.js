import dotenv from 'dotenv';
dotenv.config();

import { buildCustomPropertyFilter, getAccessToken, listCustomProperties } from "./common.js";

const param = buildCustomPropertyFilter(["experimentalparent","experimentalchild"], process.env.TEAMSITE);
const queryParam = encodeURIComponent(JSON.stringify(param));

getAccessToken(process.env.TOKEN_ENDPOINT, process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.DELEGATION_USER_ID, process.env.SCOPE)
  .then(token => {
    listCustomProperties(token, param)
      .then(data => console.dir(data, { depth: null }))
      .catch(error => console.error('Error:', error));
  })
  .catch(error => console.error('Error:', error));
