export const state = () => ({
  messages: [],
});

export const mutations = {
  RECEIVE_MESSAGE(state, message) {
    state.messages.push(message);
  },
};
