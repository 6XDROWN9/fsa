const logger = require('../utils/logger');

module.exports = guild => {
  let client = guild.client;

  client.settings[guild.id] = {prefix: '!', modRole: 'Moderator', adminRole: 'Administrator'};
  logger.info(`Database created for ${guild.name}`);
};
