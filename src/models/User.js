import {types} from 'mobx-state-tree';

const User = types
  .model('User', {
    id: types.maybe(types.identifier()),
    name: types.maybe(types.string),
    new: false,
  })
  .actions(self => ({
    showNameInput() {
      self.new = true;
    },
    updateName(name) {
      self.name = name;
      self.new = false;
    },
  }));

export default User;
