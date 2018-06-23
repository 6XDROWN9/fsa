module.exports = (guild, user) => {
  let logChannel = guild.channels.find('name', 'server-log');
  if (logChannel) guild.channels.get(logChannel.id).send(`${user.username} was just banned!`);
};
