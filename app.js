import 'dotenv/config';
import { Client, GatewayIntentBits, Events } from 'discord.js'
import { handleCreateUser,createService,getSubscriptionList } from './webhook.js';

const client = new Client({
  intents:
    [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.on(Events.ClientReady, readyClient => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
})

client.on('messageCreate', async message => {
  if (message.author.bot) return;
  // if (message.content.startsWith('createuser')) {
  //   await handleCreateUser(message);
  // }

  message.reply({
    content: "Hii from bot"
  })
})

client.on('interactionCreate', async interaction => {
  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  } 
  if (interaction.commandName === 'ppcreateuser') {
    
    const username = interaction.options.getString('username');
    const email = interaction.options.getString('email');
    const password = interaction.options.getString('password');    
    await handleCreateUser(interaction, username, email, password);
  }
  if (interaction.commandName === 'ppcreateservice') {
    const userName = interaction.options.getString('user_name');
    const serviceName = interaction.options.getString('service_name');
    const serviceLink = interaction.options.getString('service_link');
    const monthlyFee = interaction.options.getString('monthly_fee');
    const startDate = interaction.options.getString('start_date');        
    await createService(userName,serviceName,serviceLink,monthlyFee,startDate,interaction);
  }
  if (interaction.commandName === 'ppgetuser') {
    const userName = interaction.options.getString('user_name');
    await getSubscriptionList(interaction,userName)
  }
});

client.login(process.env.DISCORD_TOKEN)
