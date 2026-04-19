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

export const buildDomainValuePayload = (arrElements) => {
  return arrElements.map((element, index) => ({
    id: element.id,
    value: element.value,
    order: index + 1
  }));
}

export const buildCascadePayload = (id, controllerPropertyId, cascades) => {
  // Group cascades by controllerValueId
  const groupedByControllerValue = cascades.reduce((acc, cascade) => {
    const { controllerValueId, allowedValueId } = cascade;
    if (!acc[controllerValueId]) {
      acc[controllerValueId] = [];
    }
    acc[controllerValueId].push(allowedValueId);
    return acc;
  }, {});

  const matches = Object.entries(groupedByControllerValue).map(([controllerValueId, allowedValueIds]) => ({
    match: {
      conditions: [{
        attribute: `traits.customProperties.fields.properties.${controllerPropertyId}.value.valueId`,
        operator: "Equal",
        value: controllerValueId
      }],
      filters: [],
      operator: "And",
    },
    possibleValueIds: allowedValueIds
  }));

  return [{
    id,
    name: "Logic 1",
    ruleType: null,
    controllerId: controllerPropertyId,
    isAutoSelect: true,
    matches
  }];
}

export const buildCustomPropertyPayload = (id, name, order, teamSites, domainOfValues, valueCascading, lastUpdateUserId) => {
  return {
    domainOfValues,
    valueCascading: valueCascading[0] ? [JSON.stringify(valueCascading[0])] : [],
    lastUpdateUserId,
    order,
    id,
    name,
    propertyType: 'multi-select',
    scopes: {
      content: {
        isRequired: false,
        isRequiredForPublishing: false
      }
    },
    teamSites: {
      [teamSites]: {
        order: 0,
        isVisibleInDocCenter: true
      }
    }
  }
}

export const updateCustomProperty = async (token, propertyId, updateData) => {
  const url = `https://api.seismic.com/custom-property/v1/customProperties/${propertyId}`;

  const response = await axios.put(url, updateData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  return response.data;
}