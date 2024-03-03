import {search, download} from 'aptoide-scraper';
const handler = async (m, {conn, usedPrefix: prefix, command, text}) => {
 if (!text) throw `*[❗] Ingrese el nombre de la APK que quiera buscar.*`;
  try {    
    const searchA = await search(text);
    const data5 = await download(searchA[0].id);
    let response = `📲 *جاري تنزيل التطبيق* 📲\n\n📌 *الإسم:* ${data5.name}\n📦 *الملف:* ${data5.package}\n🕒 *تاريخ التحديث:* ${data5.lastup}\n📥 *الحجم:* ${data5.size}`
    await conn.sendMessage(m.chat, {image: {url: data5.icon}, caption: response}, {quoted: m});
 if (data5.size.includes('GB') || data5.size.replace(' MB', '') > 999) {
      return await conn.sendMessage(m.chat, {text: '*[ ⛔ ] El archivo es demasiado pesado por lo que no se enviará.*'}, {quoted: m});
    }
    await conn.sendMessage(m.chat, {document: {url: data5.dllink}, mimetype: 'application/vnd.android.package-archive', fileName: data5.name + '.apk', caption: null}, {quoted: m});
  } catch {
    throw `*[❗] خطأ، لم يتم ايجاد اي تطبيق بهذا الإسم.*`;
  }    
};
handler.command = /^(apkmod|apk|dapk2|aptoide|aptoidedl)$/i;
export default handler;
