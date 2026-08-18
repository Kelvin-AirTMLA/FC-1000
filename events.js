import { Client, GatewayIntentBits, Events } from 'discord.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers // Required to detect new members
    ],
});

// FIX: Changed 'clientReady' to Events.ClientReady (or just 'ready')
client.once(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Run this when a new member joins
client.on(Events.GuildMemberAdd, async member => {
    try {
        const welcomeChannelId = '1538155423616471050';

        // Fetch the channel directly to ensure it isn't missing from cache
        const channel = await member.guild.channels.fetch(welcomeChannelId);

        if (!channel) return;

        const message = await channel.send(`
Hey ${member}! Welcome to the FicCrunch Discord! Saw you join from BetaList. Are you currently working on an open-source project, or just checking out developer tools? Great to have you here!

If you have a spare second, grab a public GitHub issue you've been trying to parse and paste it into the app (https://www.ficcrunch.com/). Let me know what you think of how the app helps you!

You can also head to the feedback page of the website and send a form to us. Also, we have 13 seats left in the LifeTime Pro group. If you'd like to join, you can go ahead.

Still thrilled to have you in the community! 🙌🏽
## 🐙 ANNOUNCING: The Nightmare Repo Hunt! 

Since FicCrunch was built to save programmers from drowning in messy GitHub issues and terrifying nested threads, let's turn it into a competition. 


### 🎯 Your Mission:
Find the absolute most chaotic, over-engineered, or deeply nested public GitHub issue thread or PR on the internet. 

### 🛠️ How to Play:
1. Hunt down a notoriously messy public GitHub issue link (think massive frameworks, legacy tools, or complex bugs).
2. Paste that link into https://ficcrunch.com
3. Take a screenshot of the resulting visual graph and drop it right here in this channel!

### 🏆 The Prize:
The member who submits the graph with the most insane "spaghetti monster" layout wins a permanent, custom Discord role: **👑 Master Graph Hunter**.
`);

message.edit(`
    Hey ${member}! Welcome to the FicCrunch Discord! Saw you join from BetaList. Are you currently working on an open-source project, or just checking out developer tools? Great to have you here!
    
    If you have a spare second, grab a public GitHub issue you've been trying to parse and paste it into the app (https://www.ficcrunch.com/). Let me know what you think of how the app helps you!
    
    You can also head to the feedback page of the website and send a form to us. Also, we have 13 seats left in the LifeTime Pro group. If you'd like to join, you can go ahead.
    
    Still thrilled to have you in the community! 🙌🏽
    ## 🐙 ANNOUNCING: The Nightmare Repo Hunt! 
    
    Since FicCrunch was built to save programmers from drowning in messy GitHub issues and terrifying nested threads, let's turn it into a competition. 
    
    
    ### 🎯 Your Mission:
    Find the absolute most chaotic, over-engineered, or deeply nested public GitHub issue thread or PR on the internet. 
    
    ### 🛠️ How to Play:
    1. Hunt down a notoriously messy public GitHub issue link (think massive frameworks, legacy tools, or complex bugs).
    2. Paste that link into https://ficcrunch.com
    3. Take a screenshot of the resulting visual graph and drop it right here in this channel!
    
    ### 🏆 The Prize:
    The member who submits the graph with the most insane "spaghetti monster" layout wins a permanent, custom Discord role: **👑 Master Graph Hunter**.
    `);

await message.edit()
    } catch (error) {
        console.error("Error in guildMemberAdd:", error);
    }
});

export function initDiscordBot() {
    if (!process.env.DISCORD_TOKEN) {
        console.error('Error: DISCORD_TOKEN is not defined.');
        process.exit(1);
    }
    client.login(process.env.DISCORD_TOKEN);

    const mockMember = {
        id: '123456789012345678',
        user: {
            id: '123456789012345678',
            tag: 'MockUser#0001',
            send: async (msg) => console.log(`Mock DM: ${msg}`),
        },
        guild: {
            id: '876543210987654321',
            name: 'Mock Server',
            channels: {
                fetch: async (channelId) => ({
                    send: async (msg) => console.log(`Mock Channel Message to ${channelId}:${msg}`),
                }),
                cache: {
                    get: (channelId) => ({
                        send: async (msg) => console.log(`Mock Channel Message: ${msg}`),
                    }),
                },
            },
        },
    };

    // Test your event logic
    client.emit('guildMemberAdd', mockMember);
}
