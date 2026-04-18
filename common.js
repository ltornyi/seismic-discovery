import axios from 'axios';

export async function getAccessToken(tokenEndpoint, clientId, clientSecret, delegationUserId, scope) {
  const payload = new URLSearchParams({
    grant_type: 'delegation',
    client_id: clientId,
    client_secret: clientSecret,
    user_id: delegationUserId,
    scope: scope
  });
  
  const response = await axios.post(tokenEndpoint, payload, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
  
  return response.data.access_token;
}

export const buildCustomPropertyFilter = (names, teamSite) => {
  const filter =  {
    operator: "and",
    conditions: [
      {
        attribute: "name",
        operator: "In",
        value: names
      },
      {
        attribute: "teamSites",
        operator: "ArrayContains",
        value: teamSite
      }
    ],
    "filters": []
  }
  return filter;
}

export const listCustomProperties = async (token, filter) => {
  const queryParam = encodeURIComponent(JSON.stringify(filter));
  const url = `https://api.seismic.com/custom-property/v1/customProperties?filter=${queryParam}`;
  
  const response = await axios.get(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return response.data;
}

export const listTeamsites = async (token) => {
  const url = 'https://api.seismic.com/integration/v2/teamsites';
  const response = await axios.get(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return response.data;
}