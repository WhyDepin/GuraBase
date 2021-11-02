const {
	MessageType
} = require("@adiwajshing/baileys");
const fs = require("fs-extra")

const { getBuffer } = require('../lib/functions')
const { color, bgcolor } = require('../lib/warna')
join = '\`\`\`New Member\`\`\` \n \`\`\`Nama :\`\`\` \n \`\`\`Askot : \`\`\` \n \`\`\`Umur :\`\`\` \n \`\`\`Status :\`\`\` \n\n - [ Welcome👋 ] -'
leave = '_*Sayonara....👋*_'

teks = `${join}`
let setting = JSON.parse(fs.readFileSync('./setting.json'))

module.exports = welcome = async (gura, anu) => {
	    const welkom = JSON.parse(fs.readFileSync('./database/welcome.json'))
	    const isWelcome = welkom.includes(anu.jid)
	    if (!isWelcome) return
		try {
			    mem = anu.participants[0]
			    console.log(anu)
                try {
                pp_user = await gura.getProfilePicture(mem)
                } catch (e) {
                pp_user = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
                try {
                pp_grup = await gura.getProfilePicture(anu.jid)
                } catch (e) {
                pp_grup = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
            if (anu.action == 'add' && mem.includes(gura.user.jid)) {
            gura.sendMessage(anu.jid, 'Halo! Terima Kasih sudah Mengundangku, Jika ingin Menggunakan Bot Ketik .menu', 'conversation')
            }
             if (anu.action == 'add' && !mem.includes(gura.user.jid)) {
             if (!welkom.includes(anu.jid)) return
                mdata = await gura.groupMetadata(anu.jid)
           
                memeg = mdata.participants.length
            	num = anu.participants[0]
                let v = gura.contacts[num] || { notify: num.replace(/@.+/, '') }
                anu_user = v.vname || v.notify || num.split('@')[0]
            buff = await getBuffer(`https://telegra.ph/file/2c3712bb64e7628deb9e7.jpg`)
        buttons = [

          { buttonId: `${setting.prefix}hai`, buttonText: { displayText: "Yahaha Beban👋" }, type: 1 },

        ];

        imageMsg = (

          await gura.prepareMessageMedia(buff, "imageMessage", {

            thumbnail: buff,

          })

        ).imageMessage;

        buttonsMessage = {

          contentText: `${join}`,

          footerText: "Welcome message By depin",

          imageMessage: imageMsg,

          buttons: buttons,

          headerType: 4,

        };

        prep = await gura.prepareMessageFromContent(

          mdata.id,

          { buttonsMessage },

          {}

        );

        gura.relayWAMessage(prep);

      }

      if (anu.action == "remove" && !mem.includes(gura.user.jid)) {

        mdata = await gura.groupMetadata(anu.jid);

        num = anu.participants[0];

        let w = gura.contacts[num] || { notify: num.replace(/@.+/, "") };

        anu_user = w.vname || w.notify || num.split("@")[0];

        memeg = mdata.participants.length;

        out = `${leave}`;

        buff = await getBuffer(`https://telegra.ph/file/f71ed1ba19a1eb5bde914.jpg`)
            
        buttons = [

          { buttonId: `${setting.prefix}oke`, buttonText: { displayText: "Hina Kutu" }, type: 1 },];

        imageMsg = (

          await gura.prepareMessageMedia(buff, "imageMessage", {

            thumbnail: buff,

          })

        ).imageMessage;

        buttonsMessage = {

          contentText: `${out}`,

          footerText: "Leave Message By Depin",

          imageMessage: imageMsg,

          buttons: buttons,

          headerType: 4,

        };

        prep = await gura.prepareMessageFromContent(

          mdata.id,

          { buttonsMessage },

          {}

        );

        gura.relayWAMessage(prep);
        }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	}
