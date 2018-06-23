module.exports = member => {
  let guild = member.guild;

  // member.send('Welcome to our Discord server!');
  guild.defaultChannel.send(`${member.user}, Welcome to **${guild.name}**. Enjoy your stay! :tada:`);
};
