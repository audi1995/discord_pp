
import pkg from 'discord.js';
const { REST, Routes,SlashCommandBuilder } = pkg; 
import 'dotenv/config';

const commands = [
  new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with Pong!'),

new SlashCommandBuilder()
  .setName('ppcreateuser')
  .setDescription('Create a new user')
  .addStringOption(option => option.setName('username').setDescription('Username of the user').setRequired(true))
  .addStringOption(option => option.setName('email').setDescription('Email of the user').setRequired(true))
  .addStringOption(option => option.setName('password').setDescription('Password of the user').setRequired(true)),

  new SlashCommandBuilder()
  .setName('ppcreateservice')
  .setDescription('Create a new service')
  .addStringOption(option => option.setName('user_name').setDescription('UserName ').setRequired(true))
  .addStringOption(option => option.setName('service_name').setDescription('Service Name').setRequired(true))
  .addStringOption(option => option.setName('service_link').setDescription('Service Link of the service').setRequired(true))
  .addStringOption(option => option.setName('monthly_fee').setDescription('Monthly fee of the user').setRequired(true))
  .addStringOption(option => option.setName('start_date').setDescription('Start Date of service').setRequired(false)),

new SlashCommandBuilder()
  .setName('ppgetuser')
  .setDescription('Get the list of all service of user')
  .addStringOption(option => option.setName('user_name').setDescription('UserName of the user').setRequired(true))
].map(command => command.toJSON()); 


const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async ()=>{
  try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID),
    { body: commands }
  );

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}}
)();