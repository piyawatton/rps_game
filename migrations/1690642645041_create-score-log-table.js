/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('Score_Log', {
    id: {
      type: 'uuid',
      default: pgm.func('gen_random_uuid()'),
      primaryKey: true,
    },
    score_id: {
      type: 'uuid',
      notNull: true,
      references: '"Score"(id)',
      onDelete: 'cascade',
    },
    player_action: { type: 'varchar(255)' },
    bot_action: { type: 'varchar(255)' },
    previous_score: { type: 'integer', notNull: true },
    current_score: { type: 'integer', notNull: true },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = pgm => {
  pgm.dropTable('Score_Log');
};
