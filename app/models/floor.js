import * as base from './base.js';
import * as room from './room.js';

export class Model extends base.Model {

  get resourceName() { return 'floor'; }

  initialize() {
    if (this.get('rooms')) {
      let roomCollection = new room.Collection(this.get('rooms'));
      roomCollection.each((roomModel) => {
        roomModel.parent = this;
      });
      this.set('rooms', roomCollection);
    }
  }

  getDisplayName() {
    return `${this.get('name')}, ${this.get('office')}`;
  }

}


export class Collection extends base.Collection {

  get model() { return Model; }

  findByRoom(roomId) {
    let matchingModels = [];
    this.each((model) => {
      const rooms = model.get('rooms');
      if (rooms.findWhere({id: roomId})) {
        matchingModels.push(model);
      }
    });
    return matchingModels[0];
  }

}
