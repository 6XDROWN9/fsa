const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const logger = require('./utils/logger');

client.settings = require('./settings');

require('./utils/eventLoader')(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) logger.error(err);
  logger.info(`Loading a total of ${files.length} commands.`);
  files.forEach(file => {
    let cmd = require(`./commands/${file}`);
    logger.info(`Loading Command: ${cmd.info.name}.`);
    client.commands.set(cmd.info.name, cmd);
    cmd.conf.aliases.forEach(alias => {
      client.aliases.set(alias, cmd.info.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.info.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  /* This function should resolve to an ELEVATION level which
     is then sent to the command handler for verification*/
  let settings = client.settings[message.guild.id];
  let permlvl = 0;
  let mod_role = message.guild.roles.find('name', settings.modRole);
  if (mod_role && message.member.roles.has(mod_role.id)) permlvl = 2;
  let admin_role = message.guild.roles.find('name', settings.adminRole);
  if (admin_role && message.member.roles.has(admin_role.id)) permlvl = 3;
  if (message.author.id === settings.ownerid) permlvl = 4;
  return permlvl;
};

let regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', err => {
  logger.warn(err.replace(regToken, 'that was redacted'));
});

client.on('error', err => {
  logger.error(err.replace(regToken, 'that was redacted'));
});

process.on('unhandledRejection', err => {
  logger.error(`Uncaught Promise Error: \n${err.stack}`);
});

client.login(client.settings.token).catch(logger.error);
