import {
  WHITE_LABEL_PARTNERS_LOAD,
  WHITE_LABEL_PARTNERS_ADD,
  WHITE_LABEL_PARTNERS_DROP
} from '../constants';

const initialState = null;
const ACTION_HANDLERS = {
  [WHITE_LABEL_PARTNERS_LOAD]: (state, action) => {
    return Object.assign(
      {},
      state || {},
      action.payload
        .reduce((acc, el) => {
          acc[el.id] = el.attributes;
          if (el.relationships) {
            Object.keys(el.relationships)
              .forEach(
                key => {
                  acc[el.id][`${key}_id`] = el.relationships[key].data.id;
                }
              );
          }
          return acc;
        }, {})
    );
  },
  [WHITE_LABEL_PARTNERS_ADD]: (state, action) => {
    let item = {};

    item[action.payload.id] = action.payload.attributes;
    if (action.payload.relationships) {
      Object.keys(action.payload.relationships)
        .forEach(
          key => {
            item[action.payload.id][`${key}_id`] = action.payload.relationships[key].data.id;
          }
        );
    }
    return Object.assign(
      {},
      state || {},
      item
    );
  },
  [WHITE_LABEL_PARTNERS_DROP]: (state, action) => {
    delete state[action.payload.id];
    return Object.assign({}, state || {}, {});
  }
};

export default function whiteLabelPartnersReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
