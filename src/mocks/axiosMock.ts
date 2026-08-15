import MockAdapter from 'axios-mock-adapter';
import api from '../lib/httpClient';

export function setupAxiosMocks() {
  const mock = new MockAdapter(api, { delayResponse: 500 });

  mock.onPost('/oauth/token').reply(config => {
    const { username, password } = config.data;
    if (username === 'error@error.com' && password === '123456') {
      return [401, { error: 'Invalid credentials' }];
    }
    return [200, { access_token: 'mocked-jwt-token' }];
  });

  mock.onPost('/register').reply(user => {
    return [200, user.data];
  });

  mock.onGet('/user').reply(200, {
    content: {
      dependentProfiles: [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
        },
      ],
    },
  });

  mock.onGet(/vaccine\/timeline\?profileId=.*/).reply(200, {
    content: [
      {
        vaccine: {
          name: 'teste',
          preventedDiseases: 'malaria',
          initialRange: 0,
          finalRange: 0,
          observation: '',
          dosage: 'DOSAGE_UNIQUE',
          range: 1,
          requirement: true,
          nextVaccine: null,
        },
        applied: true,
      },
    ],
  });

  mock.onGet(/campaign\/my-campaigns\?profileId=.*/).reply(200, {
    content: [
      {
        id: 1,
        title: 'Campaign 1',
        description: 'Campaign 1 description',
        image: null,
        places: [
          {
            name: 'Teste',
            applied: 2,
            amount: 6,
            latitude: 12,
            longitude: 12,
          },
        ],
      },
    ],
  });

  mock.onPost('/dependent-profile').reply(dependent => {
    return [200, dependent.data];
  });
}
