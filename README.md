<p align="center"><img src="https://cdn.discordapp.com/attachments/1252251630913458229/1256923064973918248/6f6ba218.webp?ex=66828853&is=668136d3&hm=3a55424c41a55d4b753cd32d910a5cee7e15b79cd4929b3bcb12ea5cfabbe259&?size=1024" alt="Banan logo" width="512" height="512"></p>
<h1 align="center">Banan Canvas</h1><p align="center">A Canvas extension for ForgeScript.</p>

<p align="center">
<a href="https://github.com/Project-Econome/Banan.canvas/"><img src="https://img.shields.io/github/package-json/v/Project-Econome/Banan.canvas/main?label=Project-Econome/Banan.canvas&color=5c16d4" alt="@econome/banan.canvas"></a>
<a href="https://github.com/tryforge/ForgeScript/"><img src="https://img.shields.io/github/package-json/v/tryforge/ForgeScript/main?label=@tryforge/forgescript&color=5c16d4" alt="@tryforge/forgescript"></a>
<a href="https://discord.gg/hcJgjzPvqb"><img src="https://img.shields.io/discord/739934735387721768?logo=discord" alt="Discord"></a>
</p>
<h2 align="center">Contents</h2>

1. Installation
   - [Installation](#Installation)
2. [Credits](#credits)
<br>

<h3 align="center">Installation</h3><hr>

1. Run the following command to install the required `npm packages`:
```bash
npm i github:Project-Econome/Banan.canvas
```
2. Now, in your client initialization:
```js
const { BananCanvas } = require("@econome/banan.canvas")

/* I'm assuming that the client can be an app or anything else */
const client = new ForgeClient({
    ...options // The options you currently have
    extensions: [
        new BananCanvas()
    ]
})
```
Congratulations, you have successfully setup Banan Canvas!



<h2 align="center">Credits</h2>

*Thanks for reading till the end and using Banan Canvas ;)* <br>
This package was made with love by [devlordduck](https://discord.com/users/1096717977304453160), an Epic Person who develops cool Canvas extensions.

Contributor | Contribution | Conatct
-|-|-
devlordduck|Main developer|[Discord](https://discord.com/users/1096717977304453160) [GitHub](https://github.com/LordexDuck3990)
fradz_lifez|Main Tester/ Ideas|[Discord](https://discord.com/users/838105973985771520) [GitHub](https://github.com/Project-Econome)

