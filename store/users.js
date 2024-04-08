export const state = () => ({
  username: "",
  users: [],
});

export const mutations = {
  setUsername(state, username) {
    state.username = username;
    if (!state.users.includes(username)) {
      state.users.push(username);
    }
  },
};
