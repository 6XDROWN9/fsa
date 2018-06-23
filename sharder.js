'use strict';

const { ShardingManager } = require('discord.js');
const { token } = require('./settings.json');
const logger = require('./utils/logger');
const Manager = new ShardingManager('./app.js', {
  totalShards: 'auto',
  respawn: true,
  shardArgs: [],
  token: token
});

Manager.on('launch', shard => {
  logger.debug(`Launched Shard ${shard.id}`)
});

Manager.spawn().catch(err => {
  logger.error(err);
});
