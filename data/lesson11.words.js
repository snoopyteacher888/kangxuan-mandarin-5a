/* 第 11 課字詞練習（公開、不加密）。句子和解釋都是 Claude 自己寫的，沒有課本原文。
   生字、語詞：options 的第一個是正確答案（作答時會打亂）。 */
(function (root) {
  var d = {
    /* 三個場景、動作的句子用三張圖（老師要求）：原本的圖 → 第一、二、三張（還沒上傳就先用原本那一張） */
    multiImg: {
      'pt-dog-tricks.png': ['pt-dog-tricks-1.png', 'pt-dog-tricks-2.png', 'pt-dog-tricks-3.png'],
      'pt-big-storm.png': ['pt-big-storm-1.png', 'pt-big-storm-2.png', 'pt-big-storm-3.png'],
      'pt-kind-girl.png': ['pt-kind-girl-1.png', 'pt-kind-girl-2.png', 'pt-kind-girl-3.png'],
      'pt-handy-grandpa.png': ['pt-handy-grandpa-1.png', 'pt-handy-grandpa-2.png', 'pt-handy-grandpa-3.png']
    },
    /* 理解提問的分類（照課本「閱讀理解提問」）：extract 提取訊息、infer 推論訊息、interpret 詮釋整合、evaluate 比較評估。只放題號，不放課文 */
    quizLevels: { qa: 'extract', qb: 'extract', qc: 'extract', qd: 'extract', qe: 'infer', qf: 'infer', qg: 'infer', qh: 'interpret',
      qi: 'interpret', qj: 'evaluate', k1: 'interpret', k2: 'evaluate' },
    /* 詮釋整合、比較評估的鷹架：think 是「想一想」的兩個步驟（不說答案），why 是「老師教你」的說明。不放課文原句 */
    quizHelp: {
      qh: { think: ['上山這一趟，他們有沒有打到獵物？', '奶奶為什麼說這次收穫很大？他們做了什麼事？'], why: '他們沒有打到獵物，卻救了一隻受傷的小黑熊，讓牠回到媽媽身邊。奶奶覺得愛護生命、和大自然好好相處，比打到獵物更珍貴。' },
      qi: { think: ['爺爺以前不得已傷害了黑熊，他心裡覺得驕傲嗎？', '這一次遇到受傷的小黑熊，爺爺怎麼做？'], why: '爺爺依照族人的傳統尊重黑熊，以前的事讓他一直放在心上。這次他整夜守護小黑熊、唱歌讓熊媽媽找到牠，表示他非常尊重生命、愛護山林。' },
      qj: { think: ['爺爺說小男孩也是「達駭黑熊」，是因為小男孩長得像熊嗎？', '小男孩這次做了什麼勇敢又善良的事？'], why: '小男孩小心的把受傷的小熊抱回去、幫忙救牠，和爺爺一樣勇敢又尊重生命。爺爺用這個名字稱讚他，表示他也長大了，懂得山林的智慧。' }
    },
    /* 「說說看」改成選選看：good 兩個合理的想法（選哪一個都對）、bad 兩個不合理的，why 是老師教你的說明。不放課文原句 */
    talkChoices: {
      k1: { good: ['去山上玩時，我不摘花、不亂丟垃圾。', '看到受傷的小動物，我會請大人一起幫忙。'], bad: ['看到小鳥，我就丟石頭嚇牠。', '山上的花很漂亮，我要全部摘回家。'], why: '題目問的是怎麼愛護山林和動物。不摘花、不丟垃圾、請大人幫忙救動物，都是好方法。丟石頭、把花摘光，都會傷害大自然。' },
      k2: { good: ['我覺得救小黑熊更珍貴，因為生命最重要。', '我覺得學到山林的知識也是很棒的收穫。'], bad: ['我覺得沒有打到獵物，這趟很失敗。', '我覺得黑熊很可怕，應該全部趕走。'], why: '題目問的是你覺得什麼才是最珍貴的收穫。救了小黑熊、學到山林智慧，都比獵物更珍貴。只看有沒有獵物、想趕走黑熊，都沒有讀懂課文。' }
    },
    hanzi: [
      { id: 'h-駭', combo: { layout: 'lr', parts: [['馬', 'm', '馬'], ['亥', 's', '']] }, char: '駭', zhuyin: 'ㄏㄞˋ', radical: '馬', strokes: 16, words: ['驚駭', '駭人'], say: '駭，駭人的駭', cloze: '＿人', img: 'scary-wave.png', options: ['駭', '該', '孩', '核'], clue: '這個字的左邊是「馬」。', explain: '答案是「駭」，左邊是「馬」；「該」的左邊是言字旁，「孩」的左邊是子字旁。', parts: ['馬', '亥'], story: '左邊是馬，右邊的「亥」念起來像「駭」。馬受到驚嚇，跳起來亂跑，就是「駭」；非常嚇人，叫「駭人」。', sentence: '颱風來時，海上的浪大得好駭人。', build: { layout: 'lr', show: ['？', '亥'], answer: '馬', options: ['馬', '言', '子', '木'], clue: '想一想：受到驚嚇會跳起來亂跑的是哪一種動物？' } },
      { id: 'h-疤', combo: { type: '形聲字', pict: '外面的「疒」和受傷、生病有關，裡面的「巴」念起來像「疤」。傷口好了以後留下的痕跡，就是「疤」。' }, char: '疤', zhuyin: 'ㄅㄚ', radical: '疒', strokes: 9, words: ['疤痕', '傷疤'], say: '疤，傷疤的疤', cloze: '傷＿', img: 'scar-arm.png', options: ['疤', '爸', '吧', '把'], clue: '這個字的外面是病字旁。', explain: '答案是「疤」，外面是病字旁；「爸」的上面是「父」，「把」的左邊是提手旁。', parts: ['疒', '巴'], story: '外面的病字旁和受傷有關，裡面的「巴」念起來像「疤」。傷口好了，皮膚上留下的痕跡，叫「傷疤」。', sentence: '哥哥的膝蓋上有一道小傷疤。' },
      { id: 'h-痕', combo: { type: '形聲字', pict: '外面的「疒」和受傷有關，裡面的「艮」念起來有點像「痕」。受傷後留下的印子，就是「痕」。' }, char: '痕', zhuyin: 'ㄏㄣˊ', radical: '疒', strokes: 11, words: ['疤痕', '痕跡'], say: '痕，痕跡的痕', cloze: '＿跡', img: 'footprints.png', options: ['痕', '狠', '根', '恨'], clue: '這個字的外面是病字旁。', explain: '答案是「痕」，外面是病字旁；「狠」的左邊是犬字旁，「根」的左邊是木字旁。', parts: ['疒', '艮'], story: '外面的病字旁和受傷有關，裡面念起來有點像「痕」。東西留下的印子，就是「痕跡」。', sentence: '雪地上留下一排小狗的腳印痕跡。' },
      { id: 'h-罐', combo: { layout: 'lr', parts: [['缶', 'm', '瓶罐'], ['雚', 's', '']] }, char: '罐', zhuyin: 'ㄍㄨㄢˋ', radical: '缶', strokes: 24, words: ['鐵罐', '罐頭'], say: '罐，罐頭的罐', cloze: '＿頭', img: 'can-food.png', options: ['罐', '灌', '觀', '權'], clue: '這個字的左邊是「缶」。', explain: '答案是「罐」，左邊是「缶」；「灌」的左邊是三點水，「權」的左邊是木字旁。', parts: ['缶', '雚'], story: '左邊的「缶」是裝東西的瓶罐，右邊念起來像「罐」。裝食物的鐵盒子，就是「罐頭」。', sentence: '媽媽打開一個玉米罐頭。', build: { layout: 'lr', show: ['？', '雚'], answer: '缶', options: ['缶', '氵', '見', '木'], clue: '想一想：裝東西的瓶瓶罐罐，左邊放哪一個？' } },
      { id: 'h-咚', combo: { layout: 'lr', parts: [['口', 'm', '聲音'], ['冬', 's', '']] }, char: '咚', zhuyin: 'ㄉㄨㄥ', radical: '口', strokes: 8, words: ['咚咚', '咚咚響'], say: '咚，咚咚響的咚', cloze: '＿咚', img: 'drum.png', options: ['咚', '冬', '疼', '終'], clue: '這個字的左邊是口字旁。', explain: '答案是「咚」，左邊是口字旁；「冬」沒有偏旁，「疼」的外面是病字旁。', parts: ['口', '冬'], story: '左邊的「口」表示聲音，右邊的「冬」念起來像「咚」。打鼓、敲東西的聲音，就是「咚咚」。', sentence: '鼓聲咚咚響，廟會開始了。', build: { layout: 'lr', show: ['？', '冬'], answer: '口', options: ['口', '冫', '疒', '糸'], clue: '想一想：表示聲音的字，左邊常常放哪一個？' } },
      { id: 'h-碰', combo: { layout: 'lr', parts: [['石', 'm', '石頭'], ['並', 's', '']] }, char: '碰', zhuyin: 'ㄆㄥˋ', radical: '石', strokes: 13, words: ['碰運氣', '碰撞'], say: '碰，碰撞的碰', cloze: '＿撞', img: 'bump-head.png', options: ['碰', '並', '砰', '拼'], clue: '這個字的左邊是石字旁。', explain: '答案是「碰」，左邊是石字旁；「拼」的左邊是提手旁，「砰」的右邊是「平」。', parts: ['石', '並'], story: '左邊是石頭，右邊的「並」念起來有點像「碰」。兩塊石頭撞在一起，就是「碰撞」。', sentence: '兩臺碰碰車碰撞在一起。', build: { layout: 'lr', show: ['？', '並'], answer: '石', options: ['石', '扌', '口', '木'], clue: '想一想：兩塊硬硬的東西撞在一起，左邊放哪一個？' } },
      { id: 'h-傾', combo: { layout: 'lr', parts: [['亻', 'm', '人'], ['頃', 's', '']] }, char: '傾', zhuyin: 'ㄑㄧㄥ', radical: '人', strokes: 13, words: ['傾盆', '傾聽'], say: '傾，傾聽的傾', cloze: '＿聽', img: 'listen-friend.png', options: ['傾', '頃', '穎', '頓'], clue: '這個字的左邊是單人旁。', explain: '答案是「傾」，左邊是單人旁；「頃」沒有單人旁，「頓」的左邊是「屯」。', parts: ['亻', '頃'], story: '左邊是人，右邊的「頃」像一個人歪著頭。人把身體歪向一邊，就是「傾」；把頭靠過去、仔細聽，叫「傾聽」。', sentence: '她專心的傾聽朋友說話。', build: { layout: 'lr', show: ['？', '頃'], answer: '亻', options: ['亻', '禾', '氵', '扌'], clue: '想一想：歪著身子仔細聽的是誰？' } },
      { id: 'h-寮', combo: { layout: 'tb', parts: [['宀', 'm', '房子'], ['尞', 's', '']] }, char: '寮', zhuyin: 'ㄌㄧㄠˊ', radical: '宀', strokes: 15, words: ['獵寮', '工寮'], say: '寮，工寮的寮', cloze: '工＿', img: 'hunter-hut.png', options: ['寮', '僚', '遼', '療'], clue: '這個字的上面是寶蓋頭。', explain: '答案是「寮」，上面是寶蓋頭；「療」的外面是病字旁，「遼」有辵字旁。', parts: ['宀', '尞'], story: '上面的寶蓋頭是房子，下面念起來像「寮」。臨時搭起來的小房子，就是「寮」；工人休息的小屋叫「工寮」。', sentence: '工人們在工寮裡吃午餐。', build: { layout: 'tb', show: ['？', '尞'], answer: '宀', options: ['宀', '亻', '辶', '疒'], clue: '想一想：臨時的小房子，上面放哪一個？' } },
      { id: 'h-營', combo: { type: '形聲字', pict: '上面有兩個「火」，中間像一個蓋子，下面是兩個「口」。晚上大家圍著火、住在一起的地方，就是「營」。' }, char: '營', zhuyin: 'ㄧㄥˊ', radical: '火', strokes: 17, words: ['營火', '露營'], say: '營，露營的營', cloze: '露＿', img: 'camping.png', options: ['營', '榮', '螢', '勞'], clue: '這個字的下面是兩個「口」。', explain: '答案是「營」，下面是兩個「口」；「榮」的下面是「木」，「螢」的下面是「虫」，「勞」的下面是「力」。', parts: ['火', '火', '冖', '呂'], story: '上面兩個火，下面兩個口。晚上大家圍著火，住在一起，就是「營」；在野外搭帳篷過夜，叫「露營」。', sentence: '暑假我們全家去山上露營。' },
      { id: 'h-殺', combo: { type: '會意字', pict: '右邊的「殳」像手拿著棍子，左邊是一隻被打的動物。用棍子打動物，就是「殺」。' }, char: '殺', zhuyin: 'ㄕㄚ', radical: '殳', strokes: 11, words: ['殺害', '殺蟲'], say: '殺，殺蟲的殺', cloze: '＿蟲', img: 'bug-spray.png', options: ['殺', '毅', '般', '投'], clue: '這個字的右邊是「殳」，左邊像打了叉的「木」。', explain: '答案是「殺」；「毅」的左邊上面是「立」，「般」的左邊是「舟」。', parts: ['杀', '殳'], story: '右邊的「殳」像手拿著棍子。用工具把蟲子打死，就是「殺蟲」。', sentence: '農夫用天然的方法殺蟲，保護菜園。' },
      { id: 'h-崇', combo: { layout: 'tb', parts: [['山', 'm', '山'], ['宗', 's', '']] }, char: '崇', zhuyin: 'ㄔㄨㄥˊ', radical: '山', strokes: 11, words: ['崇拜', '崇高'], say: '崇，崇高的崇', cloze: '＿高', img: 'high-mountain.png', options: ['崇', '祟', '宗', '宋'], clue: '這個字的上面是「山」。', explain: '答案是「崇」，上面是「山」；「祟」的上面是「出」，「宗」沒有「山」。', parts: ['山', '宗'], story: '上面是山，下面的「宗」念起來像「崇」。山又高又大，讓人抬頭看、很敬佩，就是「崇高」；很敬佩一個人，叫「崇拜」。', sentence: '消防員救人的精神很崇高。', build: { layout: 'tb', show: ['？', '宗'], answer: '山', options: ['山', '出', '土', '石'], clue: '想一想：又高又大、讓人抬頭看的，上面放哪一個？' } },
      { id: 'h-置', combo: { layout: 'tb', parts: [['罒', 'm', '網子'], ['直', 's', '']] }, char: '置', zhuyin: 'ㄓˋ', radical: '网', strokes: 13, words: ['棄置', '位置'], say: '置，位置的置', cloze: '位＿', img: 'seat-map.png', options: ['置', '直', '值', '植'], clue: '這個字的上面是「罒」。', explain: '答案是「置」，上面是「罒」；「值」的左邊是單人旁，「植」的左邊是木字旁。', parts: ['罒', '直'], story: '上面的「罒」是網子，下面是「直」。把東西擺得正正的，放在一個地方，就是「放置」；放的地方叫「位置」。', sentence: '請大家回到自己的位置坐好。', build: { layout: 'tb', show: ['罒', '？'], answer: '直', options: ['直', '能', '木', '心'], clue: '想一想：把東西擺得正正的，下面放哪一個？' } },
      { id: 'h-奄', combo: { type: '會意字', pict: '上面是「大」，下面像一個人被蓋住。大大的東西蓋在上面，喘不過氣，所以「奄奄一息」是快沒氣了。' }, char: '奄', zhuyin: 'ㄧㄢˇ', radical: '大', strokes: 8, words: ['奄奄一息', '氣息奄奄'], say: '奄，奄奄一息的奄', cloze: '＿奄一息', img: 'sick-bird.png', options: ['奄', '俺', '淹', '掩'], clue: '這個字沒有偏旁，上面是「大」。', explain: '答案是「奄」；「淹」的左邊是三點水，「掩」的左邊是提手旁。', parts: ['大', '电'], story: '上面是「大」，像有大東西壓著。快要沒有氣、非常虛弱，就是「奄奄一息」。', sentence: '這隻小鳥受了傷，奄奄一息。' },
      { id: 'h-翼', combo: { layout: 'tb', parts: [['羽', 'm', '羽毛'], ['異', 's', '']] }, char: '翼', zhuyin: 'ㄧˋ', radical: '羽', strokes: 17, words: ['小心翼翼', '機翼'], say: '翼，機翼的翼', cloze: '機＿', img: 'airplane-wing.png', options: ['翼', '冀', '異', '翅'], clue: '這個字的上面是「羽」。', explain: '答案是「翼」，上面是「羽」；「冀」的上面是「北」，「翅」的右邊是「羽」。', parts: ['羽', '異'], story: '上面的「羽」是羽毛，下面的「異」念起來像「翼」。鳥的翅膀就是「翼」；飛機兩邊像翅膀的地方，叫「機翼」。', sentence: '從窗戶可以看到飛機的機翼。', build: { layout: 'tb', show: ['羽', '？'], answer: '異', options: ['異', '田', '共', '毛'], clue: '想一想：上面是羽毛，下面念起來像這個字的是哪一個？' } },
      { id: 'h-祈', combo: { layout: 'lr', parts: [['礻', 'm', '祭拜'], ['斤', 's', '']] }, char: '祈', zhuyin: 'ㄑㄧˊ', radical: '示', strokes: 9, words: ['祈禱', '祈求'], say: '祈，祈求的祈', cloze: '＿求', img: 'pray-hands.png', options: ['祈', '折', '析', '新'], clue: '這個字的左邊是示字旁。', explain: '答案是「祈」，左邊是示字旁；「折」的左邊是提手旁，「析」的左邊是木字旁。', parts: ['礻', '斤'], story: '左邊的示字旁和祭拜有關，右邊的「斤」念起來有點像「祈」。向上天請求保佑，就是「祈求」。', sentence: '大家祈求今年風調雨順。', build: { layout: 'lr', show: ['？', '斤'], answer: '礻', options: ['礻', '扌', '木', '衤'], clue: '想一想：向上天請求，左邊放和祭拜有關的哪一個？' } },
      { id: 'h-禱', combo: { layout: 'lr', parts: [['礻', 'm', '祭拜'], ['壽', 's', '']] }, char: '禱', zhuyin: 'ㄉㄠˇ', radical: '示', strokes: 19, words: ['祈禱', '禱告'], say: '禱，禱告的禱', cloze: '＿告', img: 'pray-hands.png', options: ['禱', '濤', '壽', '籌'], clue: '這個字的左邊是示字旁。', explain: '答案是「禱」，左邊是示字旁；「濤」的左邊是三點水，「籌」的上面是竹字頭。', parts: ['礻', '壽'], story: '左邊的示字旁和祭拜有關，右邊的「壽」念起來有點像「禱」。雙手合起來，向上天說出心願，就是「禱告」。', sentence: '奶奶每天早上都會禱告。', build: { layout: 'lr', show: ['？', '壽'], answer: '礻', options: ['礻', '氵', '竹', '扌'], clue: '想一想：向上天說心願，左邊放和祭拜有關的哪一個？' } },
      { id: 'h-吼', combo: { layout: 'lr', parts: [['口', 'm', '嘴巴'], ['孔', 's', '']] }, char: '吼', zhuyin: 'ㄏㄡˇ', radical: '口', strokes: 7, words: ['吼聲', '怒吼'], say: '吼，怒吼的吼', cloze: '怒＿', img: 'lion-roar.png', options: ['吼', '孔', '叫', '吧'], clue: '這個字的左邊是口字旁，右邊是「孔」。', explain: '答案是「吼」；「叫」的右邊是「丩」，「吧」的右邊是「巴」。', parts: ['口', '孔'], story: '左邊是嘴巴，右邊的「孔」念起來像「吼」。張大嘴巴大聲叫，就是「吼」；生氣的大叫，叫「怒吼」。', sentence: '獅子發出一聲怒吼。', build: { layout: 'lr', show: ['？', '孔'], answer: '口', options: ['口', '扌', '氵', '木'], clue: '想一想：大聲叫要用身體的哪個部分？' } },
      { id: 'h-喉', combo: { layout: 'lr', parts: [['口', 'm', '嘴巴'], ['侯', 's', '']] }, char: '喉', zhuyin: 'ㄏㄡˊ', radical: '口', strokes: 12, words: ['喉嚨', '歌喉'], say: '喉，歌喉的喉', cloze: '歌＿', img: 'singer.png', options: ['喉', '猴', '候', '侯'], clue: '這個字的左邊是口字旁。', explain: '答案是「喉」，左邊是口字旁；「猴」的左邊是犬字旁，「候」的左邊是單人旁。', parts: ['口', '侯'], story: '左邊是嘴巴，右邊的「侯」念起來像「喉」。嘴巴裡面、發出聲音的地方，就是「喉嚨」；唱歌的聲音，叫「歌喉」。', sentence: '姐姐的歌喉很好，大家都愛聽她唱歌。', build: { layout: 'lr', show: ['？', '侯'], answer: '口', options: ['口', '犭', '亻', '木'], clue: '想一想：發出聲音的地方和身體哪個部分有關？' } },
      { id: 'h-嚨', combo: { layout: 'lr', parts: [['口', 'm', '嘴巴'], ['龍', 's', '']] }, char: '嚨', zhuyin: 'ㄌㄨㄥˊ', radical: '口', strokes: 19, words: ['喉嚨', '喉嚨痛'], say: '嚨，喉嚨的嚨', cloze: '喉＿', img: 'sore-throat.png', options: ['嚨', '龍', '籠', '聾'], clue: '這個字的左邊是口字旁，右邊是「龍」。', explain: '答案是「嚨」；「籠」的上面是竹字頭，「聾」的下面是「耳」。', parts: ['口', '龍'], story: '左邊是嘴巴，右邊的「龍」念起來像「嚨」。「喉」和「嚨」都有口字旁，合起來就是說話、吞東西的「喉嚨」。', sentence: '感冒了，我的喉嚨好痛。', build: { layout: 'lr', show: ['？', '龍'], answer: '口', options: ['口', '竹', '耳', '月'], clue: '想一想：和「喉」一樣，左邊放哪一個？' } }
    ],
    vocab: [
      { id: 'v-驚駭', cloze: true, clozeOptions: ['驚駭', '開心', '得意', '輕鬆'], word: '驚駭', meaning: '非常害怕，嚇了一大跳。', example: '看到大浪打上岸，大家都很＿＿。', img: 'scary-wave.png', options: ['驚駭', '崇拜', '祈禱', '傾盆'] },
      { id: 'v-疤痕', cloze: true, clozeOptions: ['疤痕', '花朵', '星星', '彩虹'], word: '疤痕', meaning: '傷口好了以後，皮膚上留下的印子。', example: '他手臂上有一道小時候跌倒留下的＿＿。', img: 'scar-arm.png', options: ['疤痕', '鐵罐', '獵寮', '營火'] },
      { id: 'v-鐵罐', cloze: true, clozeOptions: ['鐵罐', '枕頭', '棉被', '毛巾'], word: '鐵罐', meaning: '金屬做的圓形容器。', example: '他把＿＿洗乾淨，改成一個筆筒。', img: 'can-food.png', options: ['鐵罐', '疤痕', '喉嚨', '營火'] },
      { id: 'v-咚咚', cloze: true, clozeOptions: ['咚咚', '喵喵', '汪汪', '嘰嘰'], word: '咚咚', meaning: '打鼓、敲東西發出的聲音。', example: '鼓手用力敲鼓，鼓聲＿＿響。', img: 'drum.png', options: ['咚咚', '吼聲', '營火', '鐵罐'] },
      { id: 'v-碰運氣', cloze: true, clozeOptions: ['碰運氣', '吃早餐', '寫功課', '洗衣服'], word: '碰運氣', meaning: '沒有把握，只是試試看能不能成功。', example: '我不知道店有沒有開，只好去＿＿＿。', img: 'try-luck.png', options: ['碰運氣', '奄奄一息', '小心翼翼', '傾盆'] },
      { id: 'v-傾盆', cloze: true, clozeOptions: ['傾盆', '細細', '小小', '輕輕'], word: '傾盆', meaning: '雨下得又大又急，像整桶水倒下來。', example: '午後下起＿＿大雨，大家趕快跑去躲雨。', img: 'heavy-rain.png', options: ['傾盆', '驚駭', '崇拜', '祈禱'] },
      { id: 'v-獵寮', cloze: true, clozeOptions: ['獵寮', '大樓', '學校', '超市'], word: '獵寮', meaning: '上山抓野獸的人在山裡臨時住的小屋。', example: '下大雨了，獵人躲進山裡的＿＿。', img: 'hunter-hut.png', options: ['獵寮', '營火', '鐵罐', '疤痕'] },
      { id: 'v-營火', cloze: true, clozeOptions: ['營火', '冰塊', '雪人', '雨傘'], word: '營火', meaning: '晚上在野外過夜時，大家圍著取暖的柴堆。', example: '晚上，我們圍著＿＿唱歌、說故事。', img: 'camping.png', options: ['營火', '獵寮', '吼聲', '喉嚨'] },
      { id: 'v-殺害', cloze: true, clozeOptions: ['殺害', '保護', '照顧', '餵養'], word: '殺害', meaning: '奪走生命，讓牠死掉。', example: '我們不可以隨便＿＿野生動物。', img: 'protect-bear.png', options: ['殺害', '棄置', '祈禱', '崇拜'] },
      { id: 'v-崇拜', cloze: true, clozeOptions: ['崇拜', '討厭', '嘲笑', '欺負'], word: '崇拜', meaning: '非常敬佩、很看重。', example: '弟弟很＿＿那位棒球選手。', img: 'fan-hero.png', options: ['崇拜', '祈禱', '殺害', '驚駭'] },
      { id: 'v-棄置', cloze: true, clozeOptions: ['棄置', '收好', '修好', '珍惜'], word: '棄置', meaning: '丟在一旁，不再用它。', example: '路邊有一輛被＿＿很久的腳踏車。', img: 'old-bike.png', options: ['棄置', '殺害', '崇拜', '傾盆'] },
      { id: 'v-奄奄一息', cloze: true, clozeOptions: ['奄奄一息', '活蹦亂跳', '精神飽滿', '生龍活虎'], word: '奄奄一息', meaning: '只剩下很微弱的呼吸，非常虛弱。', example: '這條魚被沖上岸，已經＿＿＿＿。', img: 'sick-bird.png', options: ['奄奄一息', '小心翼翼', '碰運氣', '雜草叢生'] },
      { id: 'v-小心翼翼', cloze: true, clozeOptions: ['小心翼翼', '粗心大意', '隨隨便便', '馬馬虎虎'], word: '小心翼翼', meaning: '非常謹慎，一點都不敢馬虎。', example: '哥哥＿＿＿＿的捧著剛孵出來的小雞。', img: 'hold-chick.png', options: ['小心翼翼', '奄奄一息', '從天而降', '雜草叢生'] },
      { id: 'v-祈禱', cloze: true, clozeOptions: ['祈禱', '吵架', '偷懶', '大笑'], word: '祈禱', meaning: '雙手合起來，向上天說出心願。', example: '我們＿＿生病的奶奶快點好起來。', img: 'pray-hands.png', options: ['祈禱', '崇拜', '棄置', '殺害'] },
      { id: 'v-吼聲', cloze: true, clozeOptions: ['吼聲', '笑聲', '歌聲', '掌聲'], word: '吼聲', meaning: '動物或人生氣時用力大叫。', example: '森林裡傳來老虎的＿＿，大家都嚇了一跳。', img: 'lion-roar.png', options: ['吼聲', '咚咚', '營火', '喉嚨'] },
      { id: 'v-喉嚨', cloze: true, clozeOptions: ['喉嚨', '膝蓋', '腳趾', '手肘'], word: '喉嚨', meaning: '嘴巴裡面、說話和吞東西的地方。', example: '唱了一整天的歌，我的＿＿好乾。', img: 'sore-throat.png', options: ['喉嚨', '疤痕', '鐵罐', '獵寮'] },
      { id: 'v-雜草叢生', cloze: true, clozeOptions: ['雜草叢生', '寸草不生', '乾乾淨淨', '整整齊齊'], word: '雜草叢生', meaning: '野外的植物長得又多又亂。', example: '沒人住的老房子，院子裡＿＿＿＿。', img: 'weedy-yard.png', options: ['雜草叢生', '奄奄一息', '小心翼翼', '從天而降'] },
      { id: 'v-從天而降', cloze: true, clozeOptions: ['從天而降', '慢慢長大', '一模一樣', '早就知道'], word: '從天而降', meaning: '突然出現，讓人想不到。', example: '一場大雨＿＿＿＿，大家都來不及躲。', img: 'heavy-rain.png', options: ['從天而降', '雜草叢生', '碰運氣', '奄奄一息'] }
    ],
    charwords: [
      { id: 'cw-駭', char: '駭', img: 'scary-wave.png', charMeaning: '吃驚、害怕。', word: '駭人', meaning: '讓人非常害怕。', example: '那部電影的怪物長得好＿＿。', options: ['駭人', '傷疤', '痕跡', '罐頭'] },
      { id: 'cw-疤', char: '疤', img: 'scar-arm.png', charMeaning: '傷好了以後的印子。', word: '傷疤', meaning: '傷口好了留下的痕跡。', example: '他的手上有一道小＿＿。', options: ['傷疤', '咚咚響', '碰撞', '傾聽'] },
      { id: 'cw-痕', char: '痕', img: 'footprints.png', charMeaning: '留下的印子。', word: '痕跡', meaning: '東西留下的印子或記號。', example: '桌上還有杯子留下的水＿＿。', options: ['痕跡', '工寮', '露營', '殺蟲'] },
      { id: 'cw-罐', char: '罐', img: 'can-food.png', charMeaning: '圓圓的容器。', word: '罐頭', meaning: '裝在鐵盒子裡、可以放很久的食物。', example: '露營時，我們帶了幾個魚＿＿。', options: ['罐頭', '崇高', '位置', '機翼'] },
      { id: 'cw-咚', char: '咚', img: 'drum.png', charMeaning: '敲打的聲音。', word: '咚咚響', meaning: '敲打時發出咚咚的聲音。', example: '有人在敲門，門＿＿＿。', options: ['咚咚響', '祈求', '禱告', '怒吼'] },
      { id: 'cw-碰', char: '碰', img: 'bump-head.png', charMeaning: '撞到。', word: '碰撞', meaning: '兩樣東西撞在一起。', example: '下雨天路滑，兩臺車不小心＿＿了。', options: ['碰撞', '歌喉', '喉嚨痛', '駭人'] },
      { id: 'cw-傾', char: '傾', img: 'listen-friend.png', charMeaning: '歪向一邊；全部倒出來。', word: '傾聽', meaning: '仔細、專心的聽。', example: '好朋友難過時，我會靜靜的＿＿。', options: ['傾聽', '傷疤', '痕跡', '罐頭'] },
      { id: 'cw-寮', char: '寮', img: 'hunter-hut.png', charMeaning: '簡單的小屋。', word: '工寮', meaning: '工人休息的臨時小屋。', example: '工地旁邊搭了一間＿＿。', options: ['工寮', '咚咚響', '碰撞', '傾聽'] },
      { id: 'cw-營', char: '營', img: 'camping.png', charMeaning: '住的地方；野外搭的帳篷。', word: '露營', meaning: '在野外搭帳篷過夜。', example: '週末我們去河邊＿＿。', options: ['露營', '殺蟲', '崇高', '位置'] },
      { id: 'cw-殺', char: '殺', img: 'bug-spray.png', charMeaning: '讓生命死掉。', word: '殺蟲', meaning: '把害蟲弄死。', example: '農夫用辣椒水＿＿，不用農藥。', options: ['殺蟲', '機翼', '祈求', '禱告'] },
      { id: 'cw-崇', char: '崇', img: 'high-mountain.png', charMeaning: '高；敬佩。', word: '崇高', meaning: '非常高、非常偉大。', example: '醫生救人的精神很＿＿。', options: ['崇高', '怒吼', '歌喉', '喉嚨痛'] },
      { id: 'cw-置', char: '置', img: 'seat-map.png', charMeaning: '放。', word: '位置', meaning: '放東西或坐的地方。', example: '我把書放回原來的＿＿。', options: ['位置', '駭人', '傷疤', '痕跡'] },
      { id: 'cw-奄', char: '奄', img: 'sick-bird.png', charMeaning: '快沒氣的樣子。', word: '氣息奄奄', meaning: '呼吸很弱，快要沒氣了。', example: '受傷的小狗躺在路邊，＿＿＿＿。', options: ['氣息奄奄', '罐頭', '咚咚響', '碰撞'] },
      { id: 'cw-翼', char: '翼', img: 'airplane-wing.png', charMeaning: '翅膀。', word: '機翼', meaning: '飛機兩邊像翅膀的地方。', example: '飛機的＿＿又長又寬。', options: ['機翼', '傾聽', '工寮', '露營'] },
      { id: 'cw-祈', char: '祈', img: 'pray-hands.png', charMeaning: '向上天請求。', word: '祈求', meaning: '向上天請求保佑。', example: '漁夫出海前，＿＿平安回來。', options: ['祈求', '殺蟲', '崇高', '位置'] },
      { id: 'cw-禱', char: '禱', img: 'pray-hands.png', charMeaning: '向上天說心願。', word: '禱告', meaning: '向上天說出心裡的願望。', example: '睡覺前，他會安靜的＿＿。', options: ['禱告', '氣息奄奄', '機翼', '駭人'] },
      { id: 'cw-吼', char: '吼', img: 'lion-roar.png', charMeaning: '大聲叫。', word: '怒吼', meaning: '很生氣的大聲叫。', example: '大熊對著敵人＿＿。', options: ['怒吼', '傷疤', '痕跡', '罐頭'] },
      { id: 'cw-喉', char: '喉', img: 'singer.png', charMeaning: '發出聲音的地方。', word: '歌喉', meaning: '唱歌的聲音。', example: '她有一副好＿＿，唱歌好好聽。', options: ['歌喉', '咚咚響', '碰撞', '傾聽'] },
      { id: 'cw-嚨', char: '嚨', img: 'sore-throat.png', charMeaning: '喉嚨。', word: '喉嚨痛', meaning: '嘴巴裡面發痛、不舒服。', example: '吃太多炸雞，我覺得＿＿＿。', options: ['喉嚨痛', '工寮', '露營', '殺蟲'] }
    ],
    /* 生字變成語：課本延伸成語，解釋和例句改成孩子聽得懂的話 */
    idioms: [
      { id: 'i-驚濤駭浪', situationImg: 'id-big-waves.png',
        anim: { bg: 'sea', a: { boat: ['⛵', 40, 54, 14], w1: ['🌊', 20, 70, 16], w2: ['🌊', 70, 66, 18], storm: ['⛈️', 60, 16, 14], ok: ['🌈', 50, 20, 14, 'h'] },
          s: [['一艘小船在海上航行。', [['bob', 'boat']]],
            ['突然颳起大風，打起大浪，', [['shake', 'storm'], ['grow', 'w1', 1.3], ['grow', 'w2', 1.3]]],
            ['小船被浪打得搖來搖去。', [['shake', 'boat']]],
            ['又大又可怕的風浪，就是驚濤駭浪。', [['out', 'storm'], ['in', 'ok']]]] },
        idiom: '驚濤駭浪', char: '駭', meaning: '又大又可怕的風浪；也比喻非常危險的環境。', example: '船長帶著大家穿過驚濤駭浪，平安回到港口。', situation: '小船在海上遇到大風大浪，被打得搖來搖去。',
        fill: { options: ['漁船在＿＿＿＿中努力前進。', '今天海面平靜無波，一片＿＿＿＿。'], clue: '提示：哪一句說的是又大又可怕的風浪？', explain: '第一句用得對：漁船遇到大風浪。海面平靜無波，剛好相反。' } },
      { id: 'i-傾國傾城', situationImg: 'id-pretty-princess.png',
        anim: { bg: 'room', a: { pr: ['👸', 50, 56, 14], s1: ['✨', 36, 40, 8], s2: ['✨', 64, 40, 8], h1: ['😍', 20, 66, 10, 'h'], h2: ['😍', 80, 66, 10, 'h'] },
          s: [['舞會上走來一位公主。', [['bob', 'pr']]],
            ['她美麗得像會發光一樣，', [['pop', 's1'], ['pop', 's2']]],
            ['全場的人都看呆了。', [['in', 'h1'], ['in', 'h2']]],
            ['形容女子非常美麗，就是傾國傾城。', [['jump', 'pr']]]] },
        idiom: '傾國傾城', char: '傾', meaning: '形容女子非常美麗。', example: '故事裡的公主傾國傾城，大家都被她吸引。', situation: '舞會上走來一位美麗的公主，大家都看呆了。',
        fill: { options: ['童話裡的仙女長得＿＿＿＿。', '這隻小狗跑得好快，真是＿＿＿＿。'], clue: '提示：哪一句是在形容女子很美？', explain: '第一句用得對：形容仙女很美。小狗跑得快，和這個成語沒有關係。' } },
      { id: 'i-步步為營', situationImg: 'id-careful-steps.png',
        anim: { bg: 'park', a: { kid: ['🧒', 14, 62, 12], s1: ['🪨', 36, 70, 8], s2: ['🪨', 58, 70, 8], s3: ['🪨', 80, 70, 8], flag: ['🚩', 92, 52, 10], eye: ['👀', 14, 44, 7, 'h'] },
          s: [['小明要踩著石頭過小河。', [['in', 'eye']]],
            ['每踩一步，他都先看清楚，', [['mv', 'kid', [36, 62, 700]], ['mv', 'eye', [36, 44, 700]]]],
            ['確定站穩了，才走下一步。', [['mv', 'kid', [58, 62, 700]], ['mv', 'eye', [58, 44, 700]], ['mv', 'kid', [80, 62, 700]], ['mv', 'eye', [80, 44, 700]]]],
            ['每一步都很小心，就是步步為營。', [['pop', 'flag']]]] },
        idiom: '步步為營', char: '營', meaning: '每一步都很小心、做好準備。', example: '下棋時要步步為營，不能隨便亂走。', situation: '小明踩石頭過河，每一步都先看清楚、站穩了才走下一步。',
        fill: { options: ['登山隊在冰上＿＿＿＿，慢慢前進。', '他閉著眼睛亂跑，真是＿＿＿＿。'], clue: '提示：哪一句是每一步都很小心？', explain: '第一句用得對：在冰上小心前進。閉著眼睛亂跑，剛好相反。' } },
      { id: 'i-一笑置之', situationImg: 'id-laugh-off.png',
        anim: { bg: 'school', a: { a: ['👦', 30, 62, 12], b: ['🧒', 70, 62, 12], tease: ['💬', 40, 38, 9, 'h'], lol: ['😄', 70, 62, 12, 'h', 'as:b'] },
          s: [['同學開玩笑說小華的頭髮像鳥窩。', [['in', 'tease'], ['wig', 'tease']]],
            ['小華沒有生氣，', [['bob', 'b']]],
            ['他笑一笑，就不放在心上了。', [['out', 'tease'], ['out', 'b'], ['in', 'lol']]],
            ['笑一笑就不在意，就是一笑置之。', [['jump', 'lol']]]] },
        idiom: '一笑置之', char: '置', meaning: '笑一笑就不放在心上。', example: '別人開他玩笑，他總是一笑置之。', situation: '同學開玩笑說小華的頭髮像鳥窩，小華笑一笑就不在意了。',
        fill: { options: ['弟弟把我的畫說得很好笑，我＿＿＿＿。', '他一聽到別人開玩笑就大發脾氣，一點也不會＿＿＿＿。'], clue: '提示：哪一句是笑一笑就不在意？', explain: '兩句意思相反。第一句用得對：笑一笑就算了。大發脾氣，就不是一笑置之。' } },
      { id: 'i-如虎添翼', situationImg: 'id-tiger-wings.png',
        anim: { bg: 'park', a: { tiger: ['🐯', 30, 62, 14], wing: ['🪽', 30, 50, 10, 'h'], fly: ['💨', 20, 60, 8, 'h'], star: ['⭐', 80, 20, 9, 'h'] },
          s: [['老虎本來就很強壯。', [['jump', 'tiger']]],
            ['如果再給牠長出一對翅膀……', [['in', 'wing']]],
            ['牠就能飛上天，變得更厲害了！', [['in', 'fly'], ['mv', 'tiger', [70, 30, 900]], ['mv', 'wing', [70, 18, 900]]]],
            ['厲害的人又多了幫手，就是如虎添翼。', [['in', 'star']]]] },
        idiom: '如虎添翼', char: '翼', meaning: '本來就很厲害，又得到幫助，變得更強。', example: '球隊來了一位高手，真是如虎添翼。', situation: '強壯的老虎長出一對翅膀，能飛上天，變得更厲害。',
        fill: { options: ['他本來就很會畫畫，有了新畫筆更是＿＿＿＿。', '他把畫筆弄丟了，畫不出來，真是＿＿＿＿。'], clue: '提示：哪一句是厲害的人又多了幫助？', explain: '第一句用得對：會畫畫又有新畫筆。弄丟畫筆是少了幫助，不是如虎添翼。' } },
      { id: 'i-不翼而飛', situationImg: 'id-lost-pencil.png',
        anim: { bg: 'school', a: { desk: ['🪑', 50, 66, 14], pen: ['✏️', 50, 52, 8], kid: ['🧒', 20, 62, 12], q: ['❓', 20, 40, 9, 'h'], wing: ['🪶', 50, 40, 7, 'h'] },
          s: [['小美把鉛筆放在桌上。', [['bob', 'pen']]],
            ['下課回來一看，', [['mv', 'kid', [36, 62, 600]]]],
            ['鉛筆不見了！好像長了翅膀飛走一樣。', [['in', 'wing'], ['out', 'pen'], ['mv', 'wing', [70, 10, 800]], ['in', 'q']]],
            ['東西突然不見，就是不翼而飛。', [['shake', 'q']]]] },
        idiom: '不翼而飛', char: '翼', meaning: '東西突然不見了，好像長了翅膀飛走。', example: '我放在桌上的餅乾不翼而飛，原來是被小狗吃掉了。', situation: '小美放在桌上的鉛筆，下課回來就不見了。',
        fill: { options: ['剛買的橡皮擦一轉眼就＿＿＿＿。', '我的書包一直好好的在椅子上，＿＿＿＿。'], clue: '提示：哪一句是東西突然不見？', explain: '第一句用得對：橡皮擦突然不見。書包好好的在椅子上，沒有不見。' } }
    ],
    /* 改錯字：sentence 是正確的句子，畫面上會把 char 換成 wrong；options 的第一個是正確的字。clue 只說語詞的意思，不能出現正確的字。 */
    fix: [
      { id: 'fx-駭', char: '駭', wrong: '該', sentence: '火山爆發的樣子好駭人。', options: ['駭', '該', '孩'], clue: '這裡是說讓人很害怕，想一想，哪一個字的左邊是「馬」？', explain: '要改成「駭」。讓人害怕是「駭人」；「該」是應該的該。' },
      { id: 'fx-疤', char: '疤', wrong: '把', sentence: '他的額頭上有一道傷疤。', options: ['疤', '把', '爸'], clue: '這裡說的是傷好了留下的印子，想一想，哪一個字有病字旁？', explain: '要改成「疤」。傷好了的印子是「傷疤」；「把」是把手的把。' },
      { id: 'fx-痕', char: '痕', wrong: '根', sentence: '地上有一道輪胎的痕跡。', options: ['痕', '根', '狠'], clue: '這裡說的是留下的印子，想一想，哪一個字有病字旁？', explain: '要改成「痕」。留下的印子是「痕跡」；「根」是樹根的根。' },
      { id: 'fx-罐', char: '罐', wrong: '灌', sentence: '架子上擺了好多罐頭。', options: ['罐', '灌', '權'], clue: '這裡說的是裝在鐵盒裡的食物，想一想，哪一個字的左邊是「缶」？', explain: '要改成「罐」。鐵盒裡的食物是「罐頭」；「灌」是灌水的灌。' },
      { id: 'fx-咚', char: '咚', wrong: '冬', sentence: '我聽到門外傳來「咚」的一聲。', options: ['咚', '冬', '疼'], clue: '這裡是說敲打的聲音，想一想，哪一個字有口字旁？', explain: '要改成「咚」。敲打的聲音是「咚咚」；「冬」是冬天的冬。' },
      { id: 'fx-碰', char: '碰', wrong: '拼', sentence: '走路要看路，才不會碰到柱子。', options: ['碰', '拼', '並'], clue: '這裡是說撞到東西，想一想，哪一個字有石字旁？', explain: '要改成「碰」。撞到是「碰到」；「拼」是拼圖的拼。' },
      { id: 'fx-傾', char: '傾', wrong: '頃', sentence: '老師傾聽每一位同學的想法。', options: ['傾', '頃', '頓'], clue: '這裡是說專心的聽，想一想，哪一個字有單人旁？', explain: '要改成「傾」。專心聽是「傾聽」。' },
      { id: 'fx-寮', char: '寮', wrong: '療', sentence: '山上有一間獵人住的小寮屋。', options: ['寮', '療', '遼'], clue: '這裡說的是簡單的小屋，想一想，哪一個字的上面是寶蓋頭？', explain: '要改成「寮」。簡單的小屋是「寮屋」；「療」是治療的療。' },
      { id: 'fx-營', char: '營', wrong: '螢', sentence: '晚上大家圍著營火跳舞。', options: ['營', '螢', '榮'], clue: '這裡說的是晚上在野外過夜時燒的火，想一想，哪一個字的下面是兩個「口」？', explain: '要改成「營」。露營燒的火是「營火」；「螢」是螢火蟲的螢。' },
      { id: 'fx-殺', char: '殺', wrong: '般', sentence: '媽媽用熱水殺死砧板上的細菌。', options: ['殺', '般', '投'], clue: '這裡是說讓細菌死掉，想一想，哪一個字的右邊是「殳」，左邊不是「舟」？', explain: '要改成「殺」。讓細菌死掉是「殺死」；「般」是一般的般。' },
      { id: 'fx-崇', char: '崇', wrong: '宗', sentence: '小朋友都很崇拜那位太空人。', options: ['崇', '宗', '祟'], clue: '這裡是說非常敬佩，想一想，哪一個字的上面是「山」？', explain: '要改成「崇」。非常敬佩是「崇拜」；「宗」是祖宗的宗。' },
      { id: 'fx-置', char: '置', wrong: '值', sentence: '請把椅子放回原來的位置。', options: ['置', '值', '直'], clue: '這裡說的是放東西的地方，想一想，哪一個字的上面是「罒」？', explain: '要改成「置」。放東西的地方是「位置」；「值」是價值的值。' },
      { id: 'fx-翼', char: '翼', wrong: '異', sentence: '我從窗戶看到飛機的機翼。', options: ['翼', '異', '冀'], clue: '這裡說的是飛機兩邊像翅膀的地方，想一想，哪一個字的上面是「羽」？', explain: '要改成「翼」。飛機兩邊的是「機翼」；「異」是奇異的異。' },
      { id: 'fx-祈', char: '祈', wrong: '折', sentence: '大家為受傷的選手祈福。', options: ['祈', '折', '析'], clue: '這裡是說向上天請求保佑，想一想，哪一個字有示字旁？', explain: '要改成「祈」。請求保佑是「祈福」；「折」是折斷的折。' },
      { id: 'fx-禱', char: '禱', wrong: '濤', sentence: '他閉上眼睛默默禱告。', options: ['禱', '濤', '壽'], clue: '這裡是說向上天說心願，想一想，哪一個字有示字旁？', explain: '要改成「禱」。說心願是「禱告」；「濤」是波濤的濤。' },
      { id: 'fx-吼', char: '吼', wrong: '孔', sentence: '老虎發出可怕的吼聲。', options: ['吼', '孔', '叫'], clue: '這裡說的是大聲叫的聲音，想一想，哪一個字有口字旁？', explain: '要改成「吼」。大聲叫是「吼聲」；「孔」是孔雀的孔。' },
      { id: 'fx-喉', char: '喉', wrong: '猴', sentence: '多喝水，喉嚨才不會乾。', options: ['喉', '猴', '候'], clue: '這裡說的是嘴巴裡面發聲的地方，想一想，哪一個字有口字旁？', explain: '要改成「喉」。發聲的地方是「喉嚨」；「猴」是猴子的猴。' },
      { id: 'fx-嚨', char: '嚨', wrong: '龍', sentence: '感冒了，我的喉嚨好癢。', options: ['嚨', '龍', '籠'], clue: '這裡說的是嘴巴裡面發聲的地方，想一想，哪一個字有口字旁？', explain: '要改成「嚨」。發聲的地方是「喉嚨」；「龍」是恐龍的龍。' }
    ],
    similar: [
      { id: 's1', meaning: '「應＿」是本來就要這樣做。', sentence: '借了東西應＿要還。', frame: '應＿', options: ['該', '駭'], answer: '該', clue: '提示：這個字的左邊是言字旁。', explain: '答案是「該」；「駭」是駭人的駭，左邊是「馬」。' },
      { id: 's2', meaning: '「好＿」是答應別人時說的話。', sentence: '好＿，我們一起去。', frame: '好＿', options: ['吧', '疤'], answer: '吧', clue: '提示：這個字的左邊是口字旁。', explain: '答案是「吧」；「疤」是傷疤的疤，有病字旁。' },
      { id: 's3', meaning: '「樹＿」是樹長在土裡的部分。', sentence: '大樹的樹＿長得又深又長。', frame: '樹＿', options: ['根', '痕'], answer: '根', clue: '提示：這個字的左邊是木字旁。', explain: '答案是「根」；「痕」是痕跡的痕，有病字旁。' },
      { id: 's4', meaning: '「＿天」是一年裡最冷的季節。', sentence: '＿天到了，大家都穿上厚外套。', frame: '＿天', options: ['冬', '咚'], answer: '冬', clue: '提示：這個字沒有口字旁。', explain: '答案是「冬」；「咚」是咚咚響的咚。' },
      { id: 's5', meaning: '「＿且」是而且，用來接著說下一件事。', sentence: '他很聰明，＿且很用功。', frame: '＿且', options: ['並', '碰'], answer: '並', clue: '提示：這個字沒有石字旁。', explain: '答案是「並」；「碰」是碰撞的碰。' },
      { id: 's6', meaning: '「治＿」是幫生病的人把病醫好。', sentence: '醫生正在治＿受傷的病人。', frame: '治＿', options: ['療', '寮'], answer: '療', clue: '提示：和生病有關，外面是病字旁。', explain: '答案是「療」；「寮」是工寮的寮，上面是寶蓋頭。' },
      { id: 's7', meaning: '「＿火蟲」是晚上尾巴會發光的小蟲。', sentence: '夏天晚上，草叢裡有好多＿火蟲。', frame: '＿火', options: ['螢', '營'], answer: '螢', clue: '提示：這個字的下面是「虫」。', explain: '答案是「螢」；「營」是露營的營。' },
      { id: 's8', meaning: '「祖＿」是很早很早以前的家人。', sentence: '過年時，我們要祭拜祖＿。', frame: '祖＿', options: ['宗', '崇'], answer: '宗', clue: '提示：這個字的上面沒有「山」。', explain: '答案是「宗」；「崇」是崇拜的崇。' },
      { id: 's9', meaning: '「＿線」是不彎不曲的線。', sentence: '我用尺畫了一條＿線。', frame: '＿線', options: ['直', '置'], answer: '直', clue: '提示：這個字的上面沒有「罒」。', explain: '答案是「直」；「置」是位置的置。' },
      { id: 's10', meaning: '「＿斷」是把東西弄成兩截。', sentence: '強風把樹枝＿斷了。', frame: '＿斷', options: ['折', '祈'], answer: '折', clue: '提示：這個字的左邊是提手旁。', explain: '答案是「折」；「祈」是祈禱的祈，有示字旁。' },
      { id: 's11', meaning: '「＿子」是愛吃香蕉、很會爬樹的動物。', sentence: '動物園的＿子在樹上盪來盪去。', frame: '＿子', options: ['猴', '喉'], answer: '猴', clue: '提示：這是一種動物，左邊是犬字旁。', explain: '答案是「猴」；「喉」是喉嚨的喉，有口字旁。' },
      { id: 's12', meaning: '「恐＿」是很久以前住在地球上的巨大爬蟲。', sentence: '博物館裡有恐＿的骨頭。', frame: '恐＿', options: ['龍', '嚨'], answer: '龍', clue: '提示：這個字沒有口字旁。', explain: '答案是「龍」；「嚨」是喉嚨的嚨。' }
    ],
    listen: [
      { id: 'l1', text: '雨下得又大又急，像把一盆水倒下來。', answer: 0, options: [{ text: '傾盆', img: 'heavy-rain.png' }, { text: '驚駭', img: 'scary-wave.png' }, { text: '崇拜', img: 'fan-hero.png' }, { text: '祈禱', img: 'pray-hands.png' }] },
      { id: 'l2', text: '晚上露營時，大家圍著燒的火。', answer: 0, options: [{ text: '營火', img: 'camping.png' }, { text: '獵寮', img: 'hunter-hut.png' }, { text: '鐵罐', img: 'can-food.png' }, { text: '疤痕', img: 'scar-arm.png' }] },
      { id: 'l3', text: '這條魚被沖上岸，只剩下一點點氣。', answer: 0, options: [{ text: '奄奄一息', img: 'sick-bird.png' }, { text: '小心翼翼', img: 'hold-chick.png' }, { text: '雜草叢生', img: 'weedy-yard.png' }, { text: '碰運氣', img: 'try-luck.png' }] },
      { id: 'l4', text: '哥哥非常小心的捧著剛孵出來的小雞。', answer: 0, options: [{ text: '小心翼翼', img: 'hold-chick.png' }, { text: '奄奄一息', img: 'sick-bird.png' }, { text: '從天而降', img: 'heavy-rain.png' }, { text: '碰運氣', img: 'try-luck.png' }] },
      { id: 'l5', text: '弟弟非常敬佩那位棒球選手。', answer: 0, options: [{ text: '崇拜', img: 'fan-hero.png' }, { text: '祈禱', img: 'pray-hands.png' }, { text: '棄置', img: 'old-bike.png' }, { text: '驚駭', img: 'scary-wave.png' }] },
      { id: 'l6', text: '沒人住的院子裡，野草長得又多又亂。', answer: 0, options: [{ text: '雜草叢生', img: 'weedy-yard.png' }, { text: '奄奄一息', img: 'sick-bird.png' }, { text: '小心翼翼', img: 'hold-chick.png' }, { text: '從天而降', img: 'heavy-rain.png' }] },
      { id: 'l7', text: '雙手合起來，請上天保佑奶奶快點好起來。', answer: 0, options: [{ text: '祈禱', img: 'pray-hands.png' }, { text: '崇拜', img: 'fan-hero.png' }, { text: '殺害', img: 'protect-bear.png' }, { text: '棄置', img: 'old-bike.png' }] },
      { id: 'l8', text: '路邊有一輛很久沒人騎、被丟著的腳踏車。', answer: 0, options: [{ text: '棄置', img: 'old-bike.png' }, { text: '殺害', img: 'protect-bear.png' }, { text: '崇拜', img: 'fan-hero.png' }, { text: '傾盆', img: 'heavy-rain.png' }] }
    ],
    /* ---------- 短語、句型、修辭（句子都是 Claude 自己寫的） ---------- */
    phrase: {
      /* 拼短語每一格下面寫要放什麼樣的詞 */
      fillLabels: { before: '', answer: '什麼聲音', noun: '什麼東西' },
      pickName: '看圖選一選', pickSay: '看圖，選出最適合的聲音詞，說說看是什麼東西發出的聲音。',
      /* 短語：狀聲詞＋的＋名詞（課本的例子是課文原句，這裡換成自己寫的） */
      intro: { example: '嘩啦啦的雨聲', img: 'pr-rain-sound.png',
        parts: [{ text: '嘩啦啦', role: '什麼聲音' }, { text: '的' }, { text: '雨聲', role: '什麼東西' }],
        explain: '先用狀聲詞模仿聲音，加上「的」，再說是什麼東西發出的聲音。' },
      pick: [
        { id: 'ph1', img: 'pr-drum-sound.png', before: '', noun: '鼓聲', ask: '什麼樣的鼓聲', look: '再看看圖片，敲鼓會發出什麼聲音？', options: ['咚咚咚', '喵喵喵', '嘰嘰喳喳', '滴答滴答'], clue: '提示：鼓棒打在鼓面上，低低的、重重的。', explain: '答案是「咚咚咚」，完整的短語是「咚咚咚的鼓聲」。' },
        { id: 'ph2', img: 'pr-clock-sound.png', before: '', noun: '時鐘', ask: '什麼樣的時鐘', look: '再看看圖片，時鐘的秒針走動時會怎麼響？', options: ['滴答滴答', '咚咚咚', '汪汪汪', '轟隆隆'], clue: '提示：秒針一格一格走，聲音小小的。', explain: '答案是「滴答滴答」，完整的短語是「滴答滴答的時鐘」。' },
        { id: 'ph3', img: 'pr-bird-sound.png', before: '', noun: '小鳥', ask: '什麼樣的小鳥', look: '再看看圖片，樹上的小鳥在做什麼？', options: ['嘰嘰喳喳', '轟隆隆', '咚咚咚', '汪汪汪'], clue: '提示：一大群在樹上吵個不停。', explain: '答案是「嘰嘰喳喳」，完整的短語是「嘰嘰喳喳的小鳥」。' },
        { id: 'ph4', img: 'pr-thunder-sound.png', before: '', noun: '雷聲', ask: '什麼樣的雷聲', look: '再看看圖片，天空打雷會發出什麼聲音？', options: ['轟隆隆', '滴答滴答', '喵喵喵', '嘰嘰喳喳'], clue: '提示：又大又響，整個天空都在震動。', explain: '答案是「轟隆隆」，完整的短語是「轟隆隆的雷聲」。' },
        { id: 'ph5', img: 'pr-dog-sound.png', before: '', noun: '小狗', ask: '什麼樣的小狗', look: '再看看圖片，小狗看到陌生人會怎麼叫？', options: ['汪汪叫', '喵喵叫', '咕咕叫', '呱呱叫'], clue: '提示：搖著尾巴，對著門口一直吠個不停。', explain: '答案是「汪汪叫」，完整的短語是「汪汪叫的小狗」。' },
        { id: 'ph6', img: 'pr-river-sound.png', before: '', noun: '溪水', ask: '什麼樣的溪水', look: '再看看圖片，溪水流過石頭的聲音怎麼樣？', options: ['嘩啦啦', '轟隆隆', '汪汪汪', '咚咚咚'], clue: '提示：清清的水一直往前流，濺起小水花。', explain: '答案是「嘩啦啦」，完整的短語是「嘩啦啦的溪水」。' },
        { id: 'ph7', img: 'pr-frog-sound.png', before: '', noun: '青蛙', ask: '什麼樣的青蛙', look: '再看看圖片，池塘邊的青蛙在做什麼？', options: ['呱呱叫', '汪汪叫', '喵喵叫', '咕咕叫'], clue: '提示：夏天晚上，池塘邊一直傳來這種聲音。', explain: '答案是「呱呱叫」，完整的短語是「呱呱叫的青蛙」。' },
        { id: 'ph8', img: 'pr-cat-sound.png', before: '', noun: '小貓', ask: '什麼樣的小貓', look: '再看看圖片，小貓肚子餓了會怎麼叫？', options: ['喵喵叫', '汪汪叫', '呱呱叫', '咕咕叫'], clue: '提示：蹭著主人的腳，細細的討飯吃。', explain: '答案是「喵喵叫」，完整的短語是「喵喵叫的小貓」。' }
      ],
      say: [],
      words: [
        { word: '雜草叢生', meaning: '野外的植物長得又多又亂。', img: 'weedy-yard.png' },
        { word: '從天而降', meaning: '突然出現，讓人想不到。', img: 'heavy-rain.png' },
        { word: '奄奄一息', meaning: '只剩下很微弱的呼吸，非常虛弱。', img: 'sick-bird.png' },
        { word: '小心翼翼', meaning: '非常謹慎，一點都不敢馬虎。', img: 'hold-chick.png' }
      ],
      choose: [
        { id: 'pw1', word: '雜草叢生', options: ['好久沒人整理的花園，已經雜草叢生。', '剛剛整理好的草地，乾乾淨淨、雜草叢生。'], clue: '提示：想一想，「雜草叢生」是很亂，還是很整齊？', explain: '第一句用得對：沒整理的花園很亂。整理好的草地乾乾淨淨，剛好相反。' },
        { id: 'pw2', word: '從天而降', options: ['一顆籃球從天而降，差點砸到我。', '我每天走路去學校，真是從天而降。'], clue: '提示：想一想，「從天而降」是突然出現嗎？', explain: '第一句用得對：籃球突然掉下來。每天走路上學是平常的事。' },
        { id: 'pw3', word: '奄奄一息', options: ['那隻被困在網子裡的鳥已經奄奄一息。', '他剛跑完步，奄奄一息的大聲唱歌跳舞。'], clue: '提示：想一想，「奄奄一息」是很虛弱，還是很有精神？', explain: '第一句用得對：小鳥很虛弱。大聲唱歌跳舞很有精神，剛好相反。' },
        { id: 'pw4', word: '小心翼翼', options: ['妹妹小心翼翼的把蛋放進籃子裡。', '他小心翼翼的把杯子丟到地上摔破。'], clue: '提示：想一想，「小心翼翼」是很小心，還是很粗魯？', explain: '第一句用得對：很小心的放蛋。故意把杯子摔破，剛好相反。' }
      ],
      make: [
        { id: 'pm1', word: '雜草叢生', clue: '提示：想想看，什麼地方很久沒人整理？', model: '學校後面的空地雜草叢生，常常有蚊子。' },
        { id: 'pm2', word: '從天而降', clue: '提示：想想看，有什麼東西突然掉下來或出現？', model: '一陣大雨從天而降，大家趕快跑去躲雨。' },
        { id: 'pm3', word: '奄奄一息', clue: '提示：想想看，什麼東西虛弱得快不行了？', model: '忘了澆水的盆栽，已經奄奄一息。' },
        { id: 'pm4', word: '小心翼翼', clue: '提示：想想看，做什麼事要特別小心？', model: '我小心翼翼的把拼圖的最後一片放上去。' }
      ]
    },
    pattern: [
      { key: 'shierr', id: 'se', title: '時而……時而……', img: 'shierr.png',
        meaning: '用兩個「時而」，說出一下子這樣、一下子那樣，交替出現的情形。',
        examples: ['小貓時而跳上桌子，時而鑽進箱子。'],
        match: [
          { id: 'pt-se-m1', img: 'pt-weather-change.png', front: '今天的天氣時而晴天，', options: ['時而下起小雨。', '時而是晴天。', '時而在睡覺。'], clue: '提示：看看圖片，天上除了太陽，還有什麼？', explain: '答案是「時而下起小雨」：一下子晴，一下子下雨。' },
          { id: 'pt-se-m2', img: 'pt-baby-mood.png', front: '小寶寶時而大笑，', options: ['時而大哭。', '時而大笑。', '時而開車。'], clue: '提示：看看圖片，小寶寶的表情有哪兩種？', explain: '答案是「時而大哭」：一下子笑，一下子哭。' },
          { id: 'pt-se-m3', img: 'pt-music-change.png', front: '音樂時而輕柔，', options: ['時而熱鬧。', '時而輕柔。', '時而吃飯。'], clue: '提示：看看圖片，音樂有什麼不同的樣子？', explain: '答案是「時而熱鬧」：一下子輕柔，一下子熱鬧。' }
        ],
        conj: [
          { id: 'pt-se-c1', full: '風箏時而飛高，時而飛低。', img: 'pt-kite-up-down.png', sentence: '風箏＿＿飛高，＿＿飛低。', options: ['時而……時而……', '除了……還……甚至……', '雖然……但……'], clue: '提示：一下子高，一下子低，交替出現。數數看有幾個空格。', explain: '答案是「時而……時而……」：風箏時而飛高，時而飛低。' },
          { id: 'pt-se-c2', full: '爺爺時而看書，時而喝茶。', img: 'pt-grandpa-tea.png', sentence: '爺爺＿＿看書，＿＿喝茶。', options: ['時而……時而……', '除了……還……甚至……', '雖然……但……'], clue: '提示：一下子看書，一下子喝茶。數數看有幾個空格。', explain: '答案是「時而……時而……」：爺爺時而看書，時而喝茶。' }
        ],
        half: [
          { id: 'pt-se-h1', front: '小狗時而追著球跑，', clue: '提示：小狗一下子追球，一下子又做什麼？記得要說「時而」。', model: '時而躺在草地上休息。' },
          { id: 'pt-se-h2', front: '海浪時而輕輕拍打沙灘，', clue: '提示：海浪一下子很輕，一下子又怎麼樣？記得要說「時而」。', model: '時而用力打上岩石。' }
        ],
        whole: [
          { id: 'pt-se-w1', clue: '提示：用兩個「時而」，說一下子這樣、一下子那樣。想想看：有什麼東西會一直變來變去？', model: '天上的雲時而像棉花糖，時而像小綿羊。' }
        ] },
      { key: 'chulehaishenzhi', id: 'cs', title: '除了……還……甚至……', img: 'chulehaishenzhi.png',
        meaning: '先用「除了」說第一件事，再用「還」說第二件事，最後用「甚至」說出更讓人想不到的事。',
        examples: ['妹妹除了會唱歌，還會跳舞，甚至會彈鋼琴。'],
        match: [
          { id: 'pt-cs-m1', img: 'pt-dog-tricks.png', front: '我家的小狗除了會握手，還會轉圈，', options: ['甚至會幫忙拿報紙。', '甚至會握手。', '甚至是一隻狗。'], clue: '提示：看看圖片，小狗嘴裡叼著什麼？', explain: '答案是「甚至會幫忙拿報紙」：一件比一件厲害。' },
          { id: 'pt-cs-m2', img: 'pt-big-storm.png', front: '颱風除了帶來大雨，還吹倒了樹，', options: ['甚至讓整條街停電。', '甚至帶來大雨。', '甚至很小。'], clue: '提示：看看圖片，街上的燈還亮著嗎？', explain: '答案是「甚至讓整條街停電」：一件比一件嚴重。' },
          { id: 'pt-cs-m3', img: 'pt-kind-girl.png', front: '她除了幫媽媽洗碗，還幫忙掃地，', options: ['甚至煮了晚餐。', '甚至洗了碗。', '甚至在睡覺。'], clue: '提示：看看圖片，她在廚房還做了什麼？', explain: '答案是「甚至煮了晚餐」：做的事一件比一件多。' }
        ],
        conj: [
          { id: 'pt-cs-c1', full: '這家店除了賣麵包，還賣蛋糕，甚至賣冰淇淋。', img: 'pt-bakery.png', sentence: '這家店＿＿賣麵包，＿賣蛋糕，＿＿賣冰淇淋。', options: ['除了……還……甚至……', '時而……時而……', '雖然……但……'], clue: '提示：賣的東西一樣比一樣多。數數看有幾個空格。', explain: '答案是「除了……還……甚至……」：這家店除了賣麵包，還賣蛋糕，甚至賣冰淇淋。' },
          { id: 'pt-cs-c2', full: '爺爺除了會種菜，還會做木工，甚至會修理電視。', img: 'pt-handy-grandpa.png', sentence: '爺爺＿＿會種菜，＿會做木工，＿＿會修理電視。', options: ['除了……還……甚至……', '時而……時而……', '雖然……但……'], clue: '提示：爺爺會的本領一樣比一樣厲害。數數看有幾個空格。', explain: '答案是「除了……還……甚至……」：爺爺除了會種菜，還會做木工，甚至會修理電視。' }
        ],
        half: [
          { id: 'pt-cs-h1', front: '弟弟除了愛吃糖果，還愛吃餅乾，', clue: '提示：弟弟還愛吃什麼更誇張的？記得要說「甚至」。', model: '甚至半夜起來偷吃巧克力。' },
          { id: 'pt-cs-h2', front: '這座山上除了有猴子，還有山羌，', clue: '提示：山上還有什麼更少見的動物？記得要說「甚至」。', model: '甚至有黑熊出沒。' }
        ],
        whole: [
          { id: 'pt-cs-w1', clue: '提示：用「除了」、「還」、「甚至」說出三件事，最後一件最讓人想不到。想想看：誰會很多本領？', model: '我的姐姐除了會游泳，還會騎車，甚至會潛水。' }
        ] }
    ],
    rhetoric: {
      cards: [
        { key: 'repeat', name: '類疊', meaning: '同一個字或詞連著重複，或隔開來重複說好幾次，讀起來有節奏，也讓人印象更深。', example: '課文寫小黑熊的身體「微微」的動，又說牠「慢慢」醒來、「緩緩」起身，重複的字讓動作變得又輕又慢。',
          show: { sentence: '小貓慢慢的走，輕輕的跳。', mark: ['慢慢', '輕輕'] },
          yesno: [
            { id: 'rh-rp-y1', sentence: '鐵罐被風吹得咚咚咚的響。', answer: true, mark: ['咚咚咚'], clue: '提示：找找看，有沒有同一個字連著出現？', explain: '是類疊：「咚咚咚」重複了「咚」。' },
            { id: 'rh-rp-y2', sentence: '鐵罐被風吹倒了。', answer: false, clue: '提示：找找看，有沒有同一個字或詞重複出現？', explain: '不是類疊：這句話沒有重複的字或詞。' }
          ],
          pick: [
            { id: 'rh-rp-p1', mark: ['緩緩'], options: ['太陽緩緩的升起來。', '太陽升起來了。'], clue: '提示：哪一句有連著重複的字？', explain: '「緩緩」是類疊。' },
            { id: 'rh-rp-p2', mark: ['一棵棵'], options: ['山上有一棵棵高大的樹。', '山上有很多樹。'], clue: '提示：哪一句有重複的字？', explain: '「一棵棵」是類疊。' },
            { id: 'rh-rp-p3', mark: ['輕輕'], options: ['熊媽媽輕輕的抱著小熊。', '母熊抱著小熊。', '小熊醒來了。'], clue: '提示：哪一句有連著重複的字？', explain: '「輕輕」是類疊。' },
            { id: 'rh-rp-p4', mark: ['走呀走', '走呀走'], options: ['我們走呀走，走呀走，終於到了山頂。', '我們走到山頂。', '山上好冷。'], clue: '提示：哪一句把同一個詞說了好幾次？', explain: '「走呀走」說了兩次，是類疊。' },
            { id: 'rh-rp-p5', mark: ['閃閃'], options: ['夜空中的星星閃閃發亮。', '夜空中有一顆星。', '晚上很冷。', '星光像寶石。'], clue: '提示：哪一句有連著重複的字？', explain: '「閃閃」是類疊。' },
            { id: 'rh-rp-p6', mark: ['一步一步'], options: ['獵人一步一步走進森林。', '獵人走進森林。', '森林很暗。', '他帶著刀子。'], clue: '提示：哪一句把同一個詞說了兩次？', explain: '「一步一步」是類疊。' }
          ] },
        { key: 'question', name: '設問', meaning: '用問句來說話，引起大家注意。有時自己問、自己回答；有時只問不答，答案就藏在問題裡。', example: '課文最後，奶奶先問「有什麼收穫呢」，再說出救了小黑熊才是最好的收穫。',
          show: { sentence: '這趟旅行學到什麼？就是要愛護大自然。' },
          yesno: [
            { id: 'rh-qu-y1', sentence: '你知道黑熊胸前為什麼有白色的V字嗎？', answer: true, clue: '提示：這句話有沒有用問題引起注意？', explain: '是設問：用問題引起大家的好奇。' },
            { id: 'rh-qu-y2', sentence: '黑熊胸前有白色的V字。', answer: false, clue: '提示：這句話裡有沒有問題？', explain: '不是設問：這句話沒有用問句。' }
          ],
          pick: [
            { id: 'rh-qu-p1', options: ['誰是山林裡最厲害的獵人？就是爺爺。', '祖父是厲害的獵人。'], clue: '提示：哪一句先問再自己回答？', explain: '先問再答，是設問。' },
            { id: 'rh-qu-p2', options: ['有誰不愛這美麗的山林呢？', '山林很美麗。'], clue: '提示：哪一句用問題來說話，答案藏在問題裡？', explain: '答案藏在問題裡：大家都愛山林，是設問。' },
            { id: 'rh-qu-p3', options: ['為什麼要保護動物？因為牠們也是生命。', '我們要保護動物。', '動物很可愛。'], clue: '提示：哪一句先問「為什麼」，再自己回答？', explain: '先問再答，是設問。' },
            { id: 'rh-qu-p4', options: ['你聽過熊媽媽呼喚小熊的聲音嗎？', '母熊在叫小熊。', '小熊在睡覺。'], clue: '提示：哪一句用問題引起大家注意？', explain: '用問題引起注意，是設問。' },
            { id: 'rh-qu-p5', options: ['什麼是真正的勇敢？就是保護比自己弱小的生命。', '他很勇敢。', '小熊受傷了。', '祖父在唱歌。'], clue: '提示：哪一句先問問題，再說出答案？', explain: '先問「什麼是真正的勇敢」，再回答，是設問。' },
            { id: 'rh-qu-p6', options: ['還有什麼比救回一條生命更開心呢？', '小熊醒來了。', '我很開心。', '大家回家了。'], clue: '提示：哪一句用問題來說話，答案藏在問題裡？', explain: '答案藏在問題裡：救回生命最開心，是設問。' }
          ] }
      ],
      quiz: [
        { id: 'rh1', sentence: '小溪嘩啦嘩啦的流著。', answer: '類疊', mark: ['嘩啦嘩啦'], clue: '提示：這句話有沒有重複的詞？', explain: '答案是「類疊」：「嘩啦」說了兩次。' },
        { id: 'rh2', sentence: '樹葉輕輕的飄下來。', answer: '類疊', mark: ['輕輕'], clue: '提示：這句話有沒有連著重複的字？', explain: '答案是「類疊」：「輕輕」重複了「輕」。' },
        { id: 'rh3', sentence: '你知道為什麼獵人不殺黑熊嗎？', answer: '設問', clue: '提示：這句話有沒有用問題引起注意？', explain: '答案是「設問」：用問題引起大家的好奇。' },
        { id: 'rh4', sentence: '什麼最珍貴？就是每一個生命。', answer: '設問', clue: '提示：這句話是不是先問再答？', explain: '答案是「設問」：先問再自己回答。' }
      ]
    }
  };
  if (typeof module === 'object' && module.exports) module.exports = d;
  else { root.H3A_WORDS = root.H3A_WORDS || {}; root.H3A_WORDS.L11 = d; }
})(this);
