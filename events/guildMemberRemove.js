module.exports = member => {
  let guild = member.guild;

  if (member.id === member.client.user.id) return;
  guild.defaultChannel.send(`**${member.user}** just left **${guild.name}**. :wave:`);
};
