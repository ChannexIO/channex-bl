let transport;
const ENDPOINT = 'group_users';

export default class GroupUsers {
  constructor(container) {
    transport = container.transport;
  }

  list(filters = {}) {
    return transport
      .send('GET', ENDPOINT, { filter: filters })
      .then(response => (response.data));
  }

  find(id) {
    return transport
      .send('GET', `${ENDPOINT}/${id}`)
      .then(response => (response));
  }

  invite(attrs) {
    return transport
      .send('POST', ENDPOINT, { invite: attrs })
      .then(response => (response));
  }

  update(attrs) {
    return transport
      .send('PUT', `${ENDPOINT}/${attrs.id}`, { group_user: attrs })
      .then(response => (response));
  }

  revokeAccess(id) {
    return transport
      .send('DELETE', `${ENDPOINT}/${id}`)
      .then(response => (response));
  }
}
