import axios from 'axios';

export const createUser = async (username, email, password, interaction) => {
  try {
    const response = await axios.post('http://16.16.111.175:3000/app/webhook/user/create', {
      user_name: username,
      email: email,
      password: password,
    });

    if (response.status === 201) {
      return interaction.reply({ content: 'User successfully added to the database!' });
    } else {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
    return interaction.reply({
      content: `Error: ${message}`
    });
    }
};

export const handleCreateUser = async (interaction, username, email, password) => {
  if (!username || !email || !password) {
    return interaction.reply({
      content: 'Invalid input! Please provide all required fields.',
      ephemeral: true,
    });
  }

  await createUser(username, email, password, interaction);
};

export const getSubscriptionList = async (interaction, user_name) => {
    try {
      const response = await axios.get('http://16.16.111.175:3000/app/webhook/subscription/byusername',{
        params: { user_name: user_name }
      });          
      const serviceList = response.data.data
      .map(user => 
        `Service Name: ${user.serviceName}, Service Link: ${user.serviceLink}, Monthly Fee: ${user.monthlyFee},User Name: ${user.userId.user_name}, Email: ${user.userId.email}`
      )
      .join(', ');
      if (response.status === 200) {        
        return interaction.reply({ 
          content:`Services fetched successfully: ${serviceList}`        
        });
      } else {
        const message = response.data.message || 'Unexpected error occurred';
        return interaction.reply({
          content: `Error: ${message}`
        });
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
      return interaction.reply({
        content: `Error: ${message}`
      });
      }
  };

export const createService = async (user_name,serviceName, serviceLink, monthlyFee, startDate, interaction) => {
    try {      
      const response = await axios.post('http://16.16.111.175:3000/app/webhook/subscription/create', {
        user_name: user_name,
        serviceName: serviceName,
        serviceLink: serviceLink,
        monthlyFee: monthlyFee,
        startDate: startDate
      });
  
      if (response.status === 201) {
        return interaction.reply({ content: 'Service successfully added to the database!' });
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
      return interaction.reply({
        content: `Error: ${message}`
      });
      }
  };
