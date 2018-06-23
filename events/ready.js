const logger = require('../utils/logger');
const { version } = require('../../package.json');

module.exports = client => {
  let users = client.guilds.map(guild => guild.memberCount).reduce((a, b) => a + b);
  let channels = client.channels.size;
  let servers = client.guilds.size;

  client.user.setStatus('online');
  client.user.setGame(`${servers} Servers | v${version}`);
  logger.info(`Connected as ${client.user.tag}, ClientID: ${client.user.id}.`);
  logger.info(`Serving: ${users} users, ${channels} channels, ${servers} server(s).`);
  logger.info('Client ready.');
};
