/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createIndex('Score', 'score');
};

exports.down = pgm => {
  pgm.dropIndex('Score', 'score');
};
