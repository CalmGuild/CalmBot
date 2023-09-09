# Archival Notice
This project has been rewritten and is now found at [this repo](https://github.com/calmguild/calmguild)
This project will no longer be maintained 

# CalmBot

**Bot designed and built for serving [Calm Guild](https://discord.gg/calm)**

*Built by Miqhtie & Contributors*

![Calm Bot Icon](https://cdn.discordapp.com/avatars/745371828100399164/6d836fd5244d3309c63d9ed3cfbca85c.webp?size=320) 

<Badges>

[![Discord](https://img.shields.io/discord/501501905508237312?style=for-the-badge&label=discord)](https://discord.gg/calm)

[![License](https://img.shields.io/github/license/calmguild/calmbot-next?style=for-the-badge)](https://github.com/CalmGuild/CalmBot-next/blob/master/LICENSE)

## Contributing
Want to help make this project better? Feel free to clone & fork this project and make a pull request.

### **Setting up the dev enviorement**
After you clone this project, follow these steps to setup the dev enviorement

- **Install yarn** <br> This project uses yarn package manager instead of npm. To install yarn do `npm i yarn -g`

- **Install necessary modules** <br> Install all the libraries that are requried to run this project by running `yarn install`

- **Copy and fill out .env** <br> The dotenv file contains sensitive data such as your bot token. To run this project you must create one. First copy and paste the example.env file and rename it to .env. Then fill out all the fields within it.

- **Run the bot** <br> Now run the bot using the scripts defined in package.json. Use: <br> `yarn dev` to compile the bot in ts-node and run it in dev. Slower performance. <br> `yarn prod` to build the bot and output it in a build folder and run in from there. Performence meant for production. 

## Typescript
This bot uses typescript to help ease the development process with strict typings. Then it is compiled to javascript using ts-node. Read the typescript handbook [here](https://www.typescriptlang.org/docs/handbook/intro.html).

## License
This project is licensed under the [MIT license](https://opensource.org/licenses/MIT). 
