exports.run = (client, message, args) => {
  let messagecount = parseInt(args.join(' '));

  message.channel.fetchMessages({
    limit: messagecount
  }).then(messages => message.channel.bulkDelete(messages));
};

exports.info = {
  name: 'clean',
  description: 'Cleans X amount of messages from a given channel.',
  usage: 'clean <number>'
};

exports.conf = {
  enabled: true,
  aliases: ['purge', 'prune', 'clear'],
  runIn: ['text', 'dm', 'group'],
  permLevel: 0
};
