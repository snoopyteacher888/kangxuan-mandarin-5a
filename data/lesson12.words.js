/* 第 12 課字詞練習（公開、不加密）。句子和解釋都是 Claude 自己寫的，沒有課本原文。
   生字、語詞：options 的第一個是正確答案（作答時會打亂）。 */
(function (root) {
  var d = {
    /* 理解提問的分類（照課本「閱讀理解提問」）：extract 提取訊息、infer 推論訊息、interpret 詮釋整合、evaluate 比較評估。只放題號，不放課文 */
    quizLevels: { qa: 'extract', qb: 'extract', qc: 'extract', qd: 'extract', qe: 'infer', qf: 'infer', qg: 'interpret', qh: 'interpret',
      qi: 'evaluate', qj: 'evaluate', k1: 'interpret', k2: 'evaluate' },
    /* 詮釋整合、比較評估的鷹架：think 是「想一想」的兩個步驟（不說答案），why 是「老師教你」的說明。不放課文原句 */
    quizHelp: {
      qg: { think: ['他剛被沖上岸、遇到地震、小船差點翻掉時，心情各是怎樣？', '後來他學會蓋房子、烤麵包，心情又變成怎樣？'], why: '他一開始很害怕、很難過，遇到危險時驚慌又努力求生；慢慢學會照顧自己以後，變得樂觀、快樂，甚至覺得自己像國王。心情是從害怕慢慢變成滿足。' },
      qh: { think: ['他在島上做出了哪些東西？', '整座島上，誰在管理一切？'], why: '他靠自己蓋房子、種田、做麵包，整座島的土地、海洋和動物都陪著他，他想要什麼都能自己做到，所以覺得自己就像這裡的國王。' },
      qi: { think: ['遇到船沉了、地震、急流，他有沒有放棄？', '他沒學過木工、打獵，最後怎麼樣？'], why: '他勇敢、不放棄，遇到困難就想辦法解決；沒學過的事也願意學，而且很樂觀。這些都是值得我們學習的地方。' },
      qj: { think: ['在一個人的小島上，突然看到別人的腳印，他會怎麼想？', '他可能高興，也可能害怕，為什麼？'], why: '可能很高興終於有人了，也可能害怕是危險的人。兩種想法都合理，只要說出理由就可以。' }
    },
    /* 「說說看」改成選選看：good 兩個合理的想法（選哪一個都對）、bad 兩個不合理的，why 是老師教你的說明。不放課文原句 */
    talkChoices: {
      k1: { good: ['我會先找乾淨的水和食物，再搭一個可以擋雨的地方。', '我會在沙灘上寫大大的求救字，等船經過。'], bad: ['我會一直哭，什麼都不做。', '我會跳進海裡游回家。'], why: '題目問的是被困在荒島要怎麼辦。先找水、食物、住的地方，或想辦法求救，都是聰明的做法。一直哭、直接游回家，都沒辦法活下來。' },
      k2: { good: ['我學到遇到困難不要放棄，要自己想辦法。', '我學到要樂觀，就算只有一個人也能過得很好。'], bad: ['我學到不要聽爸媽的話，自己跑去冒險。', '我學到出海很可怕，什麼事都不要做。'], why: '題目問的是從故事學到什麼。勇敢、不放棄、樂觀，都是他身上值得學的地方。不聽爸媽的話、什麼都不做，都不是好的學習。' }
    },
    hanzi: [
      { id: 'h-烈', combo: { layout: 'tb', parts: [['列', 's', ''], ['灬', 'm', '火']] }, char: '烈', zhuyin: 'ㄌㄧㄝˋ', radical: '火', strokes: 10, words: ['劇烈', '熱烈'], say: '烈，熱烈的烈', cloze: '熱＿', img: 'cheer-crowd.png', options: ['烈', '列', '例', '裂'], clue: '這個字的下面是四點火。', explain: '答案是「烈」，下面是四點火；「列」沒有四點，「裂」的下面是「衣」。', parts: ['列', '灬'], story: '上面的「列」念起來像「烈」，下面是火。火燒得又大又猛，就是「烈」；大家很有精神的歡迎，叫「熱烈」。', sentence: '同學們熱烈的鼓掌。', build: { layout: 'tb', show: ['列', '？'], answer: '灬', options: ['灬', '衣', '亻', '心'], clue: '想一想：燒得很旺的東西，下面放哪一個？' } },
      { id: 'h-暈', combo: { layout: 'tb', parts: [['日', 'm', '太陽'], ['軍', 's', '']] }, char: '暈', zhuyin: 'ㄩㄣ', radical: '日', strokes: 13, words: ['暈船', '頭暈'], say: '暈，頭暈的暈', cloze: '頭＿', img: 'dizzy.png', options: ['暈', '運', '揮', '渾'], clue: '這個字的上面是「日」，下面是「軍」。', explain: '答案是「暈」；「運」有辵字旁，「揮」的左邊是提手旁，「渾」的左邊是三點水。', parts: ['日', '軍'], story: '上面是太陽，下面的「軍」念起來有點像「暈」。太陽旁邊一圈模模糊糊的光，就是「暈」；頭昏昏的、站不穩，叫「頭暈」。', sentence: '轉了好幾圈，我覺得頭好暈。', build: { layout: 'tb', show: ['日', '？'], answer: '軍', options: ['軍', '車', '正', '生'], clue: '想一想：上面是太陽，下面念起來像這個字的是哪一個？' } },
      { id: 'h-昏', combo: { layout: 'tb', parts: [['氏', 's', ''], ['日', 'm', '太陽']] }, char: '昏', zhuyin: 'ㄏㄨㄣ', radical: '日', strokes: 8, words: ['黃昏', '昏倒'], say: '昏，昏倒的昏', cloze: '＿倒', img: 'faint.png', options: ['昏', '婚', '混', '唇'], clue: '這個字的上面是「氏」，下面是「日」。', explain: '答案是「昏」；「婚」的左邊是女字旁，「混」的左邊是三點水。', parts: ['氏', '日'], story: '下面的太陽往下沉，天色暗暗的，就是「昏」；太陽快下山的時候，叫「黃昏」。人暈過去、什麼都不知道，叫「昏倒」。', sentence: '太熱了，有人在操場上昏倒。', build: { layout: 'tb', show: ['氏', '？'], answer: '日', options: ['日', '口', '心', '目'], clue: '想一想：天色變暗是因為什麼下山了？' } },
      { id: 'h-艙', combo: { layout: 'lr', parts: [['舟', 'm', '船'], ['倉', 's', '']] }, char: '艙', zhuyin: 'ㄘㄤ', radical: '舟', strokes: 16, words: ['船艙', '機艙'], say: '艙，機艙的艙', cloze: '機＿', img: 'plane-cabin.png', options: ['艙', '倉', '槍', '搶'], clue: '這個字的左邊是舟字旁。', explain: '答案是「艙」，左邊是舟字旁；「槍」的左邊是木字旁，「搶」的左邊是提手旁。', parts: ['舟', '倉'], story: '左邊的「舟」是船，右邊的「倉」是放東西的倉庫。船裡面放東西、住人的地方，就是「船艙」；飛機裡面坐人的地方，叫「機艙」。', sentence: '我們走進機艙，找到自己的座位。', build: { layout: 'lr', show: ['？', '倉'], answer: '舟', options: ['舟', '木', '扌', '口'], clue: '想一想：船裡面的空間，左邊放哪一個？' } },
      { id: 'h-途', combo: { type: '形聲字', pict: '外面的辵字旁和走路有關，裡面的「余」念起來有點像「途」。走的路，就是「途」。' }, char: '途', zhuyin: 'ㄊㄨˊ', radical: '辵', strokes: 11, words: ['途中', '路途'], say: '途，路途的途', cloze: '路＿', img: 'long-road.png', options: ['途', '塗', '徐', '余'], clue: '這個字有辵字旁。', explain: '答案是「途」，有辵字旁；「塗」的下面是「土」，「徐」的左邊是雙人旁。', parts: ['辶', '余'], story: '辵字旁和走路有關，裡面的「余」念起來有點像「途」。要走的路，就是「路途」。', sentence: '去外婆家的路途很遠。' },
      { id: 'h-捲', combo: { layout: 'lr', parts: [['扌', 'm', '手'], ['卷', 's', '']] }, char: '捲', zhuyin: 'ㄐㄩㄢˇ', radical: '手', strokes: 11, words: ['捲起', '捲髮'], say: '捲，捲髮的捲', cloze: '＿髮', img: 'curly-hair.png', options: ['捲', '卷', '倦', '圈'], clue: '這個字的左邊是提手旁。', explain: '答案是「捲」，左邊是提手旁；「倦」的左邊是單人旁，「圈」的外面是「囗」。', parts: ['扌', '卷'], story: '左邊是手，右邊的「卷」念起來像「捲」。用手把東西轉成圓筒，就是「捲」；彎彎曲曲的頭髮，叫「捲髮」。', sentence: '妹妹有一頭可愛的捲髮。', build: { layout: 'lr', show: ['？', '卷'], answer: '扌', options: ['扌', '亻', '囗', '木'], clue: '想一想：把紙轉成圓筒，要用身體的哪個部分？' } },
      { id: 'h-喪', combo: { type: '會意字', pict: '「喪」上面有兩個「口」，像人在哭；下面像一個人走掉了。有人離開了，大家難過得哭，就是「喪」，也有失去的意思。' }, char: '喪', zhuyin: 'ㄙㄤˋ', radical: '口', strokes: 12, words: ['喪氣', '垂頭喪氣'], say: '喪，喪氣的喪', cloze: '＿氣', img: 'sad-slump.png', options: ['喪', '衰', '哀', '表'], clue: '這個字的上面有兩個「口」。', explain: '答案是「喪」，上面有兩個「口」；「哀」的中間只有一個「口」，「衰」沒有「口」。', parts: ['吅', '𧘇'], story: '上面兩個「口」像在哭。失去了重要的東西，提不起勁，就是「喪氣」。', sentence: '輸了比賽，大家都很喪氣。' },
      { id: 'h-獸', combo: { type: '形聲字', pict: '右邊是「犬」，和動物有關；左邊念起來像「獸」。四隻腳、身上有毛的動物，就是「獸」。' }, char: '獸', zhuyin: 'ㄕㄡˋ', radical: '犬', strokes: 19, words: ['野獸', '怪獸'], say: '獸，怪獸的獸', cloze: '怪＿', img: 'monster.png', options: ['獸', '戰', '單', '默'], clue: '這個字的右邊是「犬」。', explain: '答案是「獸」，右邊是「犬」；「戰」的右邊是「戈」，「默」的左邊是「黑」。', parts: ['嘼', '犬'], story: '右邊的「犬」和動物有關。山林裡沒人養、身上有毛的動物，就是「野獸」；故事裡奇怪的大動物，叫「怪獸」。', sentence: '卡通裡的怪獸噴出了火。' },
      { id: 'h-渾', combo: { layout: 'lr', parts: [['氵', 'm', '水'], ['軍', 's', '']] }, char: '渾', zhuyin: 'ㄏㄨㄣˊ', radical: '水', strokes: 12, words: ['渾身', '渾濁'], say: '渾，渾濁的渾', cloze: '＿濁', img: 'muddy-water.png', options: ['渾', '揮', '運', '暈'], clue: '這個字的左邊是三點水。', explain: '答案是「渾」，左邊是三點水；「揮」的左邊是提手旁，「運」有辵字旁。', parts: ['氵', '軍'], story: '左邊是水，右邊的「軍」念起來有點像「渾」。水攪得到處都是泥沙，看不清楚，就是「渾濁」；從頭到腳全部，叫「渾身」。', sentence: '大雨過後，河水變得好渾濁。', build: { layout: 'lr', show: ['？', '軍'], answer: '氵', options: ['氵', '扌', '辶', '日'], clue: '想一想：攪得都是泥沙的是什麼？' } },
      { id: 'h-擱', combo: { layout: 'lr', parts: [['扌', 'm', '手'], ['閣', 's', '']] }, char: '擱', zhuyin: 'ㄍㄜ', radical: '手', strokes: 17, words: ['擱淺', '擱置'], say: '擱，擱置的擱', cloze: '＿置', img: 'shelf-box.png', options: ['擱', '閣', '胳', '格'], clue: '這個字的左邊是提手旁。', explain: '答案是「擱」，左邊是提手旁；「閣」沒有偏旁，「格」的左邊是木字旁。', parts: ['扌', '閣'], story: '左邊是手，右邊的「閣」念起來像「擱」。用手把東西放著，先不管它，就是「擱置」；船卡住動不了，叫「擱淺」。', sentence: '這件事先擱置，明天再討論。', build: { layout: 'lr', show: ['？', '閣'], answer: '扌', options: ['扌', '月', '木', '口'], clue: '想一想：把東西放著，要用身體的哪個部分？' } },
      { id: 'h-礁', combo: { layout: 'lr', parts: [['石', 'm', '石頭'], ['焦', 's', '']] }, char: '礁', zhuyin: 'ㄐㄧㄠ', radical: '石', strokes: 17, words: ['礁岩', '珊瑚礁'], say: '礁，珊瑚礁的礁', cloze: '珊瑚＿', img: 'coral-reef.png', options: ['礁', '焦', '瞧', '樵'], clue: '這個字的左邊是石字旁。', explain: '答案是「礁」，左邊是石字旁；「瞧」的左邊是目字旁，「樵」的左邊是木字旁。', parts: ['石', '焦'], story: '左邊是石頭，右邊的「焦」念起來像「礁」。海裡藏在水下或露出水面的石頭，就是「礁」；珊瑚長成的，叫「珊瑚礁」。', sentence: '小丑魚在珊瑚礁裡游來游去。', build: { layout: 'lr', show: ['？', '焦'], answer: '石', options: ['石', '目', '木', '火'], clue: '想一想：海裡硬硬的岩塊，左邊放哪一個？' } },
      { id: 'h-筏', combo: { layout: 'tb', parts: [['竹', 'm', '竹子'], ['伐', 's', '']] }, char: '筏', zhuyin: 'ㄈㄚˊ', radical: '竹', strokes: 12, words: ['木筏', '竹筏'], say: '筏，竹筏的筏', cloze: '竹＿', img: 'raft.png', options: ['筏', '伐', '閥', '代'], clue: '這個字的上面是竹字頭。', explain: '答案是「筏」，上面是竹字頭；「伐」沒有竹字頭，「閥」的外面是「門」。', parts: ['竹', '伐'], story: '上面是竹子，下面的「伐」念起來像「筏」。把一根根竹子綁在一起，浮在水上，就是「竹筏」。', sentence: '我們坐著竹筏在河上慢慢漂。', build: { layout: 'tb', show: ['？', '伐'], answer: '竹', options: ['竹', '艹', '門', '雨'], clue: '想一想：用來綁成小船的是什麼植物？' } },
      { id: 'h-塌', combo: { type: '形聲字', pict: '左邊是「土」，右邊念起來像「塌」。泥土和牆一下子垮下來，就是「塌」。' }, char: '塌', zhuyin: 'ㄊㄚ', radical: '土', strokes: 13, words: ['倒塌', '坍塌'], say: '塌，倒塌的塌', cloze: '倒＿', img: 'collapsed-wall.png', options: ['塌', '場', '榻', '楊'], clue: '這個字的左邊是土字旁。', explain: '答案是「塌」，左邊是土字旁；「場」的右邊是「昜」，「榻」的左邊是木字旁。', parts: ['土', '𣊫'], story: '左邊是泥土，右邊念起來像「塌」。牆或房子整個垮下來，就是「倒塌」。', sentence: '舊房子的牆在大雨中倒塌了。' },
      { id: 'h-捏', combo: { type: '形聲字', pict: '左邊是提手旁，右邊念起來像「捏」。用手指把東西壓一壓、做出形狀，就是「捏」。' }, char: '捏', zhuyin: 'ㄋㄧㄝ', radical: '手', strokes: 10, words: ['捏成', '捏泥巴'], say: '捏，捏泥巴的捏', cloze: '＿泥巴', img: 'clay.png', options: ['捏', '涅', '程', '理'], clue: '這個字的左邊是提手旁。', explain: '答案是「捏」，左邊是提手旁；「涅」的左邊是三點水，「程」的左邊是禾字旁。', parts: ['扌', '圼'], story: '左邊是手，用手指把軟軟的東西壓出形狀，就是「捏」；把黏土做成小動物，叫「捏黏土」。', sentence: '弟弟把黏土捏成一隻小兔子。' },
      { id: 'h-燒', combo: { layout: 'lr', parts: [['火', 'm', '火'], ['堯', 's', '']] }, char: '燒', zhuyin: 'ㄕㄠ', radical: '火', strokes: 16, words: ['燃燒', '發燒'], say: '燒，發燒的燒', cloze: '發＿', img: 'fever-kid.png', options: ['燒', '曉', '繞', '澆'], clue: '這個字的左邊是火字旁。', explain: '答案是「燒」，左邊是火字旁；「曉」的左邊是日字旁，「澆」的左邊是三點水。', parts: ['火', '堯'], story: '左邊是火，右邊的「堯」念起來有點像「燒」。著火、冒出火焰，就是「燃燒」；身體熱得像火在燒，叫「發燒」。', sentence: '弟弟發燒了，額頭好燙。', build: { layout: 'lr', show: ['？', '堯'], answer: '火', options: ['火', '日', '糸', '氵'], clue: '想一想：會冒出焰光，左邊放哪一個？' } },
      { id: 'h-臼', combo: { type: '象形字', pict: '「臼」像一個裡面凹下去的容器，可以把米、麥放在裡面搗碎。' }, char: '臼', zhuyin: 'ㄐㄧㄡˋ', radical: '臼', strokes: 6, words: ['木臼', '石臼'], say: '臼，石臼的臼', cloze: '石＿', img: 'mortar.png', options: ['臼', '白', '日', '舊'], clue: '這個字像一個凹下去的容器，中間有兩橫，上面開口。', explain: '答案是「臼」；「白」的上面有一撇，「日」是太陽。', parts: ['臼'], story: '「臼」像一個凹下去的大碗，把穀子放進去用木棒搗碎。用石頭做的，叫「石臼」。', sentence: '阿嬤用石臼把花生搗碎。' },
      { id: 'h-烤', combo: { layout: 'lr', parts: [['火', 'm', '火'], ['考', 's', '']] }, char: '烤', zhuyin: 'ㄎㄠˇ', radical: '火', strokes: 10, words: ['烤爐', '烤肉'], say: '烤，烤肉的烤', cloze: '＿肉', img: 'bbq.png', options: ['烤', '考', '拷', '銬'], clue: '這個字的左邊是火字旁。', explain: '答案是「烤」，左邊是火字旁；「考」沒有偏旁，「拷」的左邊是提手旁。', parts: ['火', '考'], story: '左邊是火，右邊的「考」念起來像「烤」。把食物放在火旁邊慢慢加熱，就是「烤」；中秋節大家一起「烤肉」。', sentence: '中秋節，我們全家在院子裡烤肉。', build: { layout: 'lr', show: ['？', '考'], answer: '火', options: ['火', '扌', '金', '木'], clue: '想一想：把食物加熱，要靠什麼？' } },
      { id: 'h-爐', combo: { layout: 'lr', parts: [['火', 'm', '火'], ['盧', 's', '']] }, char: '爐', zhuyin: 'ㄌㄨˊ', radical: '火', strokes: 20, words: ['烤爐', '火爐'], say: '爐，火爐的爐', cloze: '火＿', img: 'fireplace.png', options: ['爐', '蘆', '驢', '廬'], clue: '這個字的左邊是火字旁。', explain: '答案是「爐」，左邊是火字旁；「蘆」的上面是草字頭，「驢」的左邊是「馬」。', parts: ['火', '盧'], story: '左邊是火，右邊的「盧」念起來像「爐」。裝著火、用來煮東西或取暖的器具，就是「火爐」。', sentence: '冬天，大家圍著火爐取暖。', build: { layout: 'lr', show: ['？', '盧'], answer: '火', options: ['火', '艹', '馬', '广'], clue: '想一想：取暖的器具裡面裝著什麼？' } },
      { id: 'h-欲', combo: { layout: 'lr', parts: [['谷', 's', ''], ['欠', 'm', '張口']] }, char: '欲', zhuyin: 'ㄩˋ', radical: '欠', strokes: 11, words: ['躍躍欲試', '食欲'], say: '欲，食欲的欲', cloze: '食＿', img: 'hungry-food.png', options: ['欲', '浴', '俗', '裕'], clue: '這個字的右邊是「欠」。', explain: '答案是「欲」，右邊是「欠」；「浴」的左邊是三點水，「俗」的左邊是單人旁。', parts: ['谷', '欠'], story: '右邊的「欠」像一個人張大嘴巴，左邊的「谷」念起來有點像「欲」。張大嘴巴很想要，就是「欲」；很想吃東西，叫「食欲」好。', sentence: '聞到飯菜香，我的食欲都來了。', build: { layout: 'lr', show: ['谷', '？'], answer: '欠', options: ['欠', '氵', '亻', '衤'], clue: '想一想：像一個人張大嘴巴的是哪一個？' } }
    ],
    vocab: [
      { id: 'v-劇烈', cloze: true, clozeOptions: ['劇烈', '輕微', '溫和', '緩慢'], word: '劇烈', meaning: '非常猛、非常強。', example: '剛吃飽不要做＿＿的運動。', img: 'shaking-ship.png', options: ['劇烈', '渾身', '擱淺', '倒塌'] },
      { id: 'v-暈船', cloze: true, clozeOptions: ['暈船', '吃飯', '唱歌', '跑步'], word: '暈船', meaning: '坐在水上交通工具裡，被晃得頭昏想吐。', example: '海浪很大，我＿＿了，一直想吐。', img: 'seasick.png', options: ['暈船', '黃昏', '途中', '野獸'] },
      { id: 'v-黃昏', cloze: true, clozeOptions: ['黃昏', '清晨', '中午', '半夜'], word: '黃昏', meaning: '太陽快下山、天快黑的時候。', example: '＿＿時，天空被夕陽染成橘紅色。', img: 'sunset.png', options: ['黃昏', '途中', '船艙', '礁岩'] },
      { id: 'v-船艙', cloze: true, clozeOptions: ['船艙', '屋頂', '操場', '公園'], word: '船艙', meaning: '水上交通工具裡面，住人或放貨物的空間。', example: '下雨了，大家都躲進＿＿裡。', img: 'ship-cabin.png', options: ['船艙', '木筏', '礁岩', '烤爐'] },
      { id: 'v-途中', cloze: true, clozeOptions: ['途中', '家裡', '床上', '桌下'], word: '途中', meaning: '在路上，還沒到的時候。', example: '去學校的＿＿，我看到一隻小貓。', img: 'long-road.png', options: ['途中', '黃昏', '渾身', '野獸'] },
      { id: 'v-捲起', cloze: true, clozeOptions: ['捲起', '攤平', '放下', '撕破'], word: '捲起', meaning: '把東西轉成圓筒狀；也指被大風大浪帶上去。', example: '大浪＿＿了沙灘上的拖鞋。', img: 'big-wave.png', options: ['捲起', '擱淺', '倒塌', '燃燒'] },
      { id: 'v-喪氣', cloze: true, clozeOptions: ['喪氣', '開心', '得意', '興奮'], word: '喪氣', meaning: '覺得沒希望，提不起勁。', example: '一次失敗不要＿＿，再試一次就好。', img: 'sad-slump.png', options: ['喪氣', '劇烈', '渾身', '暈船'] },
      { id: 'v-野獸', cloze: true, clozeOptions: ['野獸', '小魚', '書包', '花瓶'], word: '野獸', meaning: '山林裡沒人養、會傷人的動物。', example: '晚上的森林裡，可能有＿＿出沒。', img: 'wild-wolf.png', options: ['野獸', '木筏', '烤爐', '船艙'] },
      { id: 'v-渾身', cloze: true, clozeOptions: ['渾身', '一點', '半個', '沒有'], word: '渾身', meaning: '從頭到腳，全部。', example: '他在雨中跑步，＿＿都溼透了。', img: 'wet-kid.png', options: ['渾身', '途中', '黃昏', '劇烈'] },
      { id: 'v-擱淺', cloze: true, clozeOptions: ['擱淺', '飛翔', '奔跑', '跳舞'], word: '擱淺', meaning: '船卡在水很少的地方或石頭上，動不了。', example: '退潮後，一艘小船＿＿在沙灘上。', img: 'stuck-boat.png', options: ['擱淺', '捲起', '倒塌', '燃燒'] },
      { id: 'v-礁岩', cloze: true, clozeOptions: ['礁岩', '棉花', '枕頭', '蛋糕'], word: '礁岩', meaning: '海裡藏在水下或露出水面的大石頭。', example: '退潮時，海邊露出一大片＿＿。', img: 'coral-reef.png', options: ['礁岩', '木筏', '烤爐', '木臼'] },
      { id: 'v-木筏', cloze: true, clozeOptions: ['木筏', '飛機', '火車', '汽車'], word: '木筏', meaning: '用一根根樹幹綁在一起，浮在水上的交通工具。', example: '他們用＿＿把食物運過河。', img: 'raft.png', options: ['木筏', '船艙', '礁岩', '烤爐'] },
      { id: 'v-倒塌', cloze: true, clozeOptions: ['倒塌', '蓋好', '修好', '站穩'], word: '倒塌', meaning: '整個垮下來。', example: '地震時，有些老房子＿＿了。', img: 'collapsed-wall.png', options: ['倒塌', '擱淺', '捲起', '燃燒'] },
      { id: 'v-捏成', cloze: true, clozeOptions: ['捏成', '吃掉', '丟掉', '弄丟'], word: '捏成', meaning: '用手指壓出形狀。', example: '我把黏土＿＿一隻小狗。', img: 'clay.png', options: ['捏成', '燃燒', '倒塌', '擱淺'] },
      { id: 'v-燃燒', cloze: true, clozeOptions: ['燃燒', '結冰', '融化', '下雨'], word: '燃燒', meaning: '著火、冒出火焰。', example: '營火在黑夜裡熊熊＿＿。', img: 'campfire.png', options: ['燃燒', '捏成', '捲起', '倒塌'] },
      { id: 'v-木臼', cloze: true, clozeOptions: ['木臼', '電視', '冰箱', '手機'], word: '木臼', meaning: '用樹幹挖成、用來搗碎穀物的器具。', example: '以前的人用＿＿把米搗成粉。', img: 'mortar.png', options: ['木臼', '烤爐', '木筏', '船艙'] },
      { id: 'v-烤爐', cloze: true, clozeOptions: ['烤爐', '雨傘', '書桌', '掃把'], word: '烤爐', meaning: '用火加熱、做麵包和燻肉的設備。', example: '麵包剛從＿＿拿出來，香噴噴的。', img: 'oven-bread.png', options: ['烤爐', '木臼', '礁岩', '船艙'] },
      { id: 'v-躍躍欲試', cloze: true, clozeOptions: ['躍躍欲試', '興趣缺缺', '垂頭喪氣', '無精打采'], word: '躍躍欲試', meaning: '心裡癢癢的，很想動手做做看。', example: '看到新的攀岩牆，大家都＿＿＿＿。', img: 'eager-kids.png', options: ['躍躍欲試', '死裡逃生', '自給自足', '劇烈'] },
      { id: 'v-死裡逃生', cloze: true, clozeOptions: ['死裡逃生', '一帆風順', '平安無事', '輕而易舉'], word: '死裡逃生', meaning: '從非常危險的情況中活了下來。', example: '他從火場中＿＿＿＿，大家都鬆了一口氣。', img: 'rescue-fire.png', options: ['死裡逃生', '躍躍欲試', '自給自足', '渾身'] },
      { id: 'v-自給自足', cloze: true, clozeOptions: ['自給自足', '坐享其成', '依賴別人', '四處借錢'], word: '自給自足', meaning: '需要的東西都靠雙手做出來，不用靠別人。', example: '山上的農家種菜、養雞，過著＿＿＿＿的生活。', img: 'farm-life.png', options: ['自給自足', '死裡逃生', '躍躍欲試', '喪氣'] }
    ],
    charwords: [
      { id: 'cw-烈', char: '烈', img: 'cheer-crowd.png', charMeaning: '很猛、很強。', word: '熱烈', meaning: '很有精神、很熱情。', example: '大家＿＿的歡迎新同學。', options: ['熱烈', '頭暈', '昏倒', '機艙'] },
      { id: 'cw-暈', char: '暈', img: 'dizzy.png', charMeaning: '頭昏昏的。', word: '頭暈', meaning: '頭昏昏的、站不穩。', example: '太陽太大了，我覺得＿＿。', options: ['頭暈', '路途', '捲髮', '怪獸'] },
      { id: 'cw-昏', char: '昏', img: 'faint.png', charMeaning: '天色暗；失去知覺。', word: '昏倒', meaning: '暈過去，倒在地上。', example: '他太累了，差點＿＿。', options: ['昏倒', '渾濁', '擱置', '竹筏'] },
      { id: 'cw-艙', char: '艙', img: 'plane-cabin.png', charMeaning: '船或飛機裡面的空間。', word: '機艙', meaning: '飛機裡面坐人的地方。', example: '我們走進＿＿，扣好安全帶。', options: ['機艙', '倒塌', '發燒', '石臼'] },
      { id: 'cw-途', char: '途', img: 'long-road.png', charMeaning: '路。', word: '路途', meaning: '要走的路。', example: '這段＿＿很遠，要坐三個小時的車。', options: ['路途', '烤肉', '火爐', '食欲'] },
      { id: 'cw-捲', char: '捲', img: 'curly-hair.png', charMeaning: '彎曲成圓筒。', word: '捲髮', meaning: '彎彎曲曲的頭髮。', example: '她有一頭金色的＿＿。', options: ['捲髮', '熱烈', '頭暈', '昏倒'] },
      { id: 'cw-喪', char: '喪', img: 'sad-slump.png', charMeaning: '失去；難過。', word: '垂頭喪氣', meaning: '低著頭，很失望、沒精神。', example: '比賽輸了，他＿＿＿＿的走回家。', options: ['垂頭喪氣', '機艙', '路途', '捲髮'] },
      { id: 'cw-獸', char: '獸', img: 'monster.png', charMeaning: '有毛、四隻腳的動物。', word: '怪獸', meaning: '故事裡奇怪又巨大的動物。', example: '電影裡的＿＿把大樓推倒了。', options: ['怪獸', '渾濁', '擱置', '竹筏'] },
      { id: 'cw-渾', char: '渾', img: 'muddy-water.png', charMeaning: '不清楚；全部。', word: '渾濁', meaning: '水裡都是泥沙，看不清楚。', example: '颱風過後，溪水變得很＿＿。', options: ['渾濁', '倒塌', '發燒', '石臼'] },
      { id: 'cw-擱', char: '擱', img: 'shelf-box.png', charMeaning: '放著。', word: '擱置', meaning: '放著先不處理。', example: '這個計畫因為下雨被＿＿了。', options: ['擱置', '烤肉', '火爐', '食欲'] },
      { id: 'cw-礁', char: '礁', img: 'coral-reef.png', charMeaning: '海裡的岩石。', word: '珊瑚礁', meaning: '珊瑚長成、像石頭一樣的地方。', example: '潛水時，我們看到美麗的＿＿＿。', options: ['珊瑚礁', '熱烈', '頭暈', '昏倒'] },
      { id: 'cw-筏', char: '筏', img: 'raft.png', charMeaning: '綁在一起浮在水上的竹木。', word: '竹筏', meaning: '用竹子綁成、浮在水上的小船。', example: '漁夫撐著＿＿到河中央捕魚。', options: ['竹筏', '機艙', '路途', '捲髮'] },
      { id: 'cw-塌', char: '塌', img: 'collapsed-wall.png', charMeaning: '垮下來。', word: '倒塌', meaning: '整個垮下來。', example: '強風把舊圍牆吹得＿＿了。', options: ['倒塌', '怪獸', '渾濁', '擱置'] },
      { id: 'cw-捏', char: '捏', img: 'clay.png', charMeaning: '用手指壓出形狀。', word: '捏泥巴', meaning: '用手把泥巴壓出形狀。', example: '弟弟在院子裡＿＿＿，弄得滿手髒髒的。', options: ['捏泥巴', '珊瑚礁', '竹筏', '倒塌'] },
      { id: 'cw-燒', char: '燒', img: 'fever-kid.png', charMeaning: '著火；身體很熱。', word: '發燒', meaning: '身體的溫度變得太高。', example: '弟弟＿＿了，媽媽帶他去看醫生。', options: ['發燒', '烤肉', '火爐', '食欲'] },
      { id: 'cw-臼', char: '臼', img: 'mortar.png', charMeaning: '搗東西的凹形容器。', word: '石臼', meaning: '用石頭做的、用來搗東西的器具。', example: '阿公用＿＿把糯米搗成麻糬。', options: ['石臼', '熱烈', '頭暈', '昏倒'] },
      { id: 'cw-烤', char: '烤', img: 'bbq.png', charMeaning: '放在火旁加熱。', word: '烤肉', meaning: '把肉放在火上烤熟。', example: '中秋節晚上，大家一起＿＿。', options: ['烤肉', '機艙', '路途', '捲髮'] },
      { id: 'cw-爐', char: '爐', img: 'fireplace.png', charMeaning: '裝火的器具。', word: '火爐', meaning: '裝著火、用來取暖或煮東西的器具。', example: '冬天晚上，一家人圍著＿＿聊天。', options: ['火爐', '怪獸', '渾濁', '擱置'] },
      { id: 'cw-欲', char: '欲', img: 'hungry-food.png', charMeaning: '想要。', word: '食欲', meaning: '想吃東西的感覺。', example: '生病時，他一點＿＿都沒有。', options: ['食欲', '珊瑚礁', '竹筏', '倒塌'] }
    ],
    /* 生字變成語：課本延伸成語，解釋和例句改成孩子聽得懂的話 */
    idioms: [
      { id: 'i-老馬識途', situationImg: 'id-old-horse.png',
        anim: { bg: 'park', a: { horse: ['🐴', 20, 62, 13], kid: ['🧒', 34, 66, 10], fog: ['🌫️', 50, 40, 16], home: ['🏠', 86, 56, 13], q: ['❓', 34, 46, 8, 'h'] },
          s: [['起大霧了，小明找不到回家的路。', [['in', 'q'], ['wig', 'fog']]],
            ['他騎著家裡的老馬，', [['mv', 'kid', [22, 54, 500]]]],
            ['老馬記得路，一步一步往前走。', [['out', 'q'], ['mv', 'horse', [70, 62, 1300]], ['mv', 'kid', [72, 54, 1300]]]],
            ['平安回到家了！有經驗的就是不一樣。', [['out', 'fog'], ['pop', 'home']]]] },
        idiom: '老馬識途', char: '途', meaning: '老馬認得走過的路；比喻有經驗的人，做事比較熟悉。', example: '爺爺在這裡住了五十年，老馬識途，帶我們找到了小吃店。', situation: '起大霧時，家裡的老馬記得路，把小明平安載回家。',
        fill: { options: ['導遊來過這座山很多次，＿＿＿＿，帶我們走捷徑。', '他第一次來這個城市，什麼都不熟，真是＿＿＿＿。'], clue: '提示：哪一句是有經驗、很熟悉？', explain: '第一句用得對：來過很多次，很熟悉。第一次來、什麼都不熟，剛好相反。' } },
      { id: 'i-捲土重來', situationImg: 'id-try-again-team.png',
        anim: { bg: 'park', a: { team: ['🧑‍🤝‍🧑', 30, 62, 14], sad: ['😞', 30, 40, 9], gym: ['🏋️', 60, 62, 12, 'h'], cup: ['🏆', 80, 30, 12, 'h'] },
          s: [['去年的比賽，我們這隊輸了。', [['shake', 'sad']]],
            ['大家沒有放棄，', [['out', 'sad']]],
            ['每天一起練習，越來越強。', [['in', 'gym'], ['jump', 'gym']]],
            ['今年再來比一次，終於贏了！這就是捲土重來。', [['in', 'cup'], ['pop', 'cup']]]] },
        idiom: '捲土重來', char: '捲', meaning: '失敗以後，重新準備好，再來一次。', example: '他這次考不好，下次一定會捲土重來。', situation: '去年比賽輸了，大家每天練習，今年再比一次終於贏了。',
        fill: { options: ['輸了冠軍賽，球隊苦練一年後＿＿＿＿。', '他一直都贏，從來沒輸過，所以要＿＿＿＿。'], clue: '提示：哪一句是失敗後重新再來？', explain: '第一句用得對：輸了以後苦練再來。從來沒輸過，就不需要捲土重來。' } },
      { id: 'i-垂頭喪氣', situationImg: 'id-head-down.png',
        anim: { bg: 'school', a: { kid: ['🧒', 50, 62, 13], paper: ['📄', 70, 50, 9], x: ['❌', 70, 44, 7], cloud: ['🌧️', 50, 30, 12, 'h'], sad: ['😞', 50, 62, 13, 'h', 'as:kid'] },
          s: [['小華拿到考卷，', [['bob', 'paper']]],
            ['上面有好多個叉叉。', [['shake', 'x']]],
            ['他低著頭，一句話也不說，', [['out', 'kid'], ['in', 'sad'], ['in', 'cloud']]],
            ['低著頭、沒精神，就是垂頭喪氣。', [['wig', 'cloud']]]] },
        idiom: '垂頭喪氣', char: '喪', meaning: '低著頭，很失望、很沒精神的樣子。', example: '輸了比賽，大家垂頭喪氣的走回休息室。', situation: '小華的考卷上有好多叉叉，他低著頭一句話也不說。',
        fill: { options: ['遊戲輸了，弟弟＿＿＿＿的坐在角落。', '他拿到第一名，＿＿＿＿的跳了起來。'], clue: '提示：哪一句是很失望、沒精神？', explain: '第一句用得對：輸了遊戲很失望。拿到第一名開心得跳起來，剛好相反。' } },
      { id: 'i-困獸猶鬥', situationImg: 'id-cornered-cat.png',
        anim: { bg: 'room', a: { cat: ['🐱', 20, 62, 11], dog: ['🐕', 60, 62, 13], wall: ['🧱', 8, 56, 14], hiss: ['💢', 20, 46, 8, 'h'] },
          s: [['一隻小貓被大狗追到牆角。', [['mv', 'dog', [40, 62, 700]], ['shake', 'cat']]],
            ['已經沒有地方可以逃了。', [['wig', 'wall']]],
            ['小貓卻弓起背，大聲哈氣，', [['in', 'hiss'], ['jump', 'cat']]],
            ['沒有退路還是拚命抵抗，就是困獸猶鬥。', [['mv', 'dog', [70, 62, 600]], ['pop', 'hiss']]]] },
        idiom: '困獸猶鬥', char: '獸', meaning: '被困住的動物還是會拚命抵抗；比喻在很危險的時候，仍然努力反抗。', example: '比賽最後一分鐘，落後的隊伍困獸猶鬥，拚命想扳回一分。', situation: '小貓被大狗追到牆角，沒有退路，還是弓起背拚命抵抗。',
        fill: { options: ['被圍住的小老鼠＿＿＿＿，竟然咬了貓一口。', '他什麼危險都沒遇到，在家睡覺，真是＿＿＿＿。'], clue: '提示：哪一句是在危險中拚命抵抗？', explain: '第一句用得對：被圍住還拚命反抗。在家睡覺沒有危險，不是困獸猶鬥。' } },
      { id: 'i-死心塌地', situationImg: 'id-loyal-dog.png',
        anim: { bg: 'park', a: { dog: ['🐕', 40, 64, 12], door: ['🚪', 70, 54, 14], sun: ['☀️', 86, 16, 10], moon: ['🌙', 86, 16, 10, 'h'], heart: ['❤️', 40, 46, 8, 'h'] },
          s: [['主人出門了，小狗坐在門口等。', [['bob', 'dog']]],
            ['從早上等到晚上，', [['out', 'sun'], ['in', 'moon']]],
            ['不管多久，牠都不離開。', [['in', 'heart'], ['pop', 'heart']]],
            ['心意定了，一點都不改變，就是死心塌地。', [['jump', 'dog']]]] },
        idiom: '死心塌地', char: '塌', meaning: '心意已經決定，一點都不改變。', example: '小狗死心塌地的跟著主人，從不離開。', situation: '主人出門了，小狗從早到晚坐在門口等，一點都不離開。',
        fill: { options: ['他＿＿＿＿的支持這支球隊，輸了也不換。', '他一下支持這隊，一下支持那隊，一點也不＿＿＿＿。'], clue: '提示：哪一句是心意不改變？', explain: '兩句意思相反。第一句用得對：輸了也不換，心意不變。換來換去，就不是死心塌地。' } },
      { id: 'i-另起爐灶', situationImg: 'id-new-start.png',
        anim: { bg: 'room', a: { kid: ['🧒', 20, 62, 12], tower: ['🧱', 50, 56, 14], boom: ['💥', 50, 50, 12, 'h'], newt: ['🏰', 80, 54, 14, 'h'], idea: ['💡', 20, 40, 9, 'h'] },
          s: [['弟弟用積木堆城堡，', [['grow', 'tower', 1.3]]],
            ['可是堆歪了，整個倒下來！', [['in', 'boom'], ['out', 'tower']]],
            ['他想：不如換個地方，重新開始。', [['out', 'boom'], ['in', 'idea']]],
            ['放下舊的，重新再做，就是另起爐灶。', [['in', 'newt'], ['pop', 'newt']]]] },
        idiom: '另起爐灶', char: '爐', meaning: '放下原來的，重新開始做。', example: '原本的計畫行不通，我們只好另起爐灶。', situation: '弟弟的積木城堡倒了，他換個地方重新開始堆。',
        fill: { options: ['這篇作文寫偏了題，他決定＿＿＿＿，重新寫一篇。', '他照著原來的做法繼續做，沒有＿＿＿＿。'], clue: '提示：哪一句是放下舊的、重新開始？', explain: '兩句意思相反。第一句用得對：重新寫一篇。照原來的繼續做，就不是另起爐灶。' } }
    ],
    /* 改錯字：sentence 是正確的句子，畫面上會把 char 換成 wrong；options 的第一個是正確的字。clue 只說語詞的意思，不能出現正確的字。 */
    fix: [
      { id: 'fx-烈', char: '烈', wrong: '列', sentence: '大家熱烈的歡迎校長。', options: ['烈', '列', '裂'], clue: '這裡是說很熱情、很有精神，想一想，哪一個字的下面是四點火？', explain: '要改成「烈」。很熱情是「熱烈」；「列」是排列的列。' },
      { id: 'fx-暈', char: '暈', wrong: '運', sentence: '坐車太久，我覺得頭暈。', options: ['暈', '運', '揮'], clue: '這裡是說頭昏昏的，想一想，哪一個字的上面是「日」？', explain: '要改成「暈」。頭昏昏的是「頭暈」；「運」是運動的運。' },
      { id: 'fx-昏', char: '昏', wrong: '婚', sentence: '黃昏時，天空變成了橘紅色。', options: ['昏', '婚', '混'], clue: '這裡說的是天快黑的時候，想一想，哪一個字沒有女字旁？', explain: '要改成「昏」。天快黑的時候是「黃昏」；「婚」是結婚的婚。' },
      { id: 'fx-艙', char: '艙', wrong: '倉', sentence: '大家坐在機艙裡等飛機起飛。', options: ['艙', '倉', '槍'], clue: '這裡說的是飛機裡面的空間，想一想，哪一個字有舟字旁？', explain: '要改成「艙」。飛機裡面是「機艙」；「倉」是倉庫的倉。' },
      { id: 'fx-途', char: '途', wrong: '塗', sentence: '在旅行途中，我們拍了很多照片。', options: ['途', '塗', '徐'], clue: '這裡是說在路上，想一想，哪一個字有辵字旁？', explain: '要改成「途」。在路上是「途中」；「塗」是塗鴉的塗。' },
      { id: 'fx-捲', char: '捲', wrong: '卷', sentence: '請把海報捲起來，放進紙筒。', options: ['捲', '卷', '倦'], clue: '這裡是說把東西轉成圓筒，想一想，哪一個字有提手旁？', explain: '要改成「捲」。轉成圓筒是「捲起來」；「卷」是考卷的卷。' },
      { id: 'fx-喪', char: '喪', wrong: '哀', sentence: '失敗了別喪氣，下次會更好。', options: ['喪', '哀', '衰'], clue: '這裡是說覺得沒希望，想一想，哪一個字的上面有兩個「口」？', explain: '要改成「喪」。沒希望是「喪氣」；「哀」是哀傷的哀。' },
      { id: 'fx-獸', char: '獸', wrong: '默', sentence: '森林裡住著很多野獸。', options: ['獸', '默', '戰'], clue: '這裡說的是山林裡的動物，想一想，哪一個字的右邊是「犬」？', explain: '要改成「獸」。山林裡的動物是「野獸」；「默」是沉默的默。' },
      { id: 'fx-渾', char: '渾', wrong: '揮', sentence: '跑完步，我渾身都是汗。', options: ['渾', '揮', '運'], clue: '這裡是說從頭到腳，想一想，哪一個字有三點水？', explain: '要改成「渾」。從頭到腳是「渾身」；「揮」是揮手的揮。' },
      { id: 'fx-擱', char: '擱', wrong: '格', sentence: '一隻鯨魚擱淺在沙灘上。', options: ['擱', '格', '閣'], clue: '這裡是說卡在淺的地方動不了，想一想，哪一個字有提手旁？', explain: '要改成「擱」。卡住動不了是「擱淺」；「格」是格子的格。' },
      { id: 'fx-礁', char: '礁', wrong: '焦', sentence: '船長小心避開海裡的礁石。', options: ['礁', '焦', '瞧'], clue: '這裡說的是海裡的石頭，想一想，哪一個字有石字旁？', explain: '要改成「礁」。海裡的石頭是「礁石」；「焦」是燒焦的焦。' },
      { id: 'fx-筏', char: '筏', wrong: '伐', sentence: '我們坐竹筏遊覽河流。', options: ['筏', '伐', '代'], clue: '這裡說的是竹子綁成的小船，想一想，哪一個字有竹字頭？', explain: '要改成「筏」。竹子綁成的小船是「竹筏」；「伐」是砍伐的伐。' },
      { id: 'fx-塌', char: '塌', wrong: '場', sentence: '地震讓老房子倒塌了。', options: ['塌', '場', '榻'], clue: '這裡是說整個垮下來，想一想，哪一個字的右邊不是「昜」？', explain: '要改成「塌」。垮下來是「倒塌」；「場」是操場的場。' },
      { id: 'fx-捏', char: '捏', wrong: '程', sentence: '我用黏土捏了一隻小烏龜。', options: ['捏', '程', '理'], clue: '這裡是說用手指壓出形狀，想一想，哪一個字有提手旁？', explain: '要改成「捏」。壓出形狀是「捏」；「程」是課程的程。' },
      { id: 'fx-燒', char: '燒', wrong: '澆', sentence: '木柴在火爐裡燒得劈啪響。', options: ['燒', '澆', '曉'], clue: '這裡是說著火，想一想，哪一個字有火字旁？', explain: '要改成「燒」。著火是「燒」；「澆」是澆花的澆。' },
      { id: 'fx-臼', char: '臼', wrong: '白', sentence: '奶奶用石臼搗碎芝麻。', options: ['臼', '白', '舊'], clue: '這裡說的是搗東西的石頭器具，想一想，哪一個字上面沒有一撇？', explain: '要改成「臼」。搗東西的器具是「石臼」；「白」是白色的白。' },
      { id: 'fx-烤', char: '烤', wrong: '考', sentence: '爸爸在院子裡烤玉米。', options: ['烤', '考', '拷'], clue: '這裡是說用火把食物弄熟，想一想，哪一個字有火字旁？', explain: '要改成「烤」。用火弄熟是「烤」；「考」是考試的考。' },
      { id: 'fx-爐', char: '爐', wrong: '蘆', sentence: '冬天大家圍著火爐取暖。', options: ['爐', '蘆', '驢'], clue: '這裡說的是裝火取暖的器具，想一想，哪一個字有火字旁？', explain: '要改成「爐」。取暖的器具是「火爐」；「蘆」是蘆葦的蘆。' },
      { id: 'fx-欲', char: '欲', wrong: '浴', sentence: '運動完，我的食欲特別好。', options: ['欲', '浴', '俗'], clue: '這裡是說想吃東西的感覺，想一想，哪一個字的右邊是「欠」？', explain: '要改成「欲」。想吃東西是「食欲」；「浴」是浴室的浴。' }
    ],
    similar: [
      { id: 's1', meaning: '「排＿」是按照順序排好。', sentence: '大家按照高矮排＿整齊。', frame: '排＿', options: ['列', '烈'], answer: '列', clue: '提示：這個字的下面沒有四點。', explain: '答案是「列」；「烈」是熱烈的烈，下面有四點火。' },
      { id: 's2', meaning: '「＿動」是活動身體、流汗。', sentence: '每天＿動，身體才會健康。', frame: '＿動', options: ['運', '暈'], answer: '運', clue: '提示：這個字有辵字旁。', explain: '答案是「運」；「暈」是頭暈的暈。' },
      { id: 's3', meaning: '「結＿」是兩個人變成一家人。', sentence: '表哥下個月要結＿了。', frame: '結＿', options: ['婚', '昏'], answer: '婚', clue: '提示：這個字的左邊是女字旁。', explain: '答案是「婚」；「昏」是黃昏的昏。' },
      { id: 's4', meaning: '「＿庫」是放很多貨物的大房子。', sentence: '貨物都放在＿庫裡。', frame: '＿庫', options: ['倉', '艙'], answer: '倉', clue: '提示：這個字沒有舟字旁。', explain: '答案是「倉」；「艙」是船艙的艙。' },
      { id: 's5', meaning: '「＿鴉」是在牆上或紙上隨意畫畫。', sentence: '不可以在牆上＿鴉。', frame: '＿鴉', options: ['塗', '途'], answer: '塗', clue: '提示：這個字的下面是「土」。', explain: '答案是「塗」；「途」是路途的途，有辵字旁。' },
      { id: 's6', meaning: '「考＿」是考試用的題目紙。', sentence: '老師發下國語考＿。', frame: '考＿', options: ['卷', '捲'], answer: '卷', clue: '提示：這個字沒有提手旁。', explain: '答案是「卷」；「捲」是捲髮的捲。' },
      { id: 's7', meaning: '「悲＿」是非常傷心難過。', sentence: '聽到這個消息，大家都很悲＿。', frame: '悲＿', options: ['哀', '喪'], answer: '哀', clue: '提示：這個字的中間只有一個「口」。', explain: '答案是「哀」；「喪」是喪氣的喪。' },
      { id: 's8', meaning: '「沉＿」是不說話。', sentence: '他低著頭，一直沉＿著。', frame: '沉＿', options: ['默', '獸'], answer: '默', clue: '提示：這個字的左邊是「黑」。', explain: '答案是「默」；「獸」是野獸的獸。' },
      { id: 's9', meaning: '「＿手」是把手舉起來左右搖。', sentence: '我向火車上的奶奶＿手說再見。', frame: '＿手', options: ['揮', '渾'], answer: '揮', clue: '提示：這個字的左邊是提手旁。', explain: '答案是「揮」；「渾」是渾身的渾，有三點水。' },
      { id: 's10', meaning: '「表＿」是畫成一個個小方框、用來填資料的紙。', sentence: '請把報名表＿填好。', frame: '表＿', options: ['格', '擱'], answer: '格', clue: '提示：這個字的左邊是木字旁。', explain: '答案是「格」；「擱」是擱淺的擱，有提手旁。' },
      { id: 's11', meaning: '「＿花」是把水倒在花上。', sentence: '我每天幫院子裡的花＿水。', frame: '＿水', options: ['澆', '燒'], answer: '澆', clue: '提示：這個字的左邊是三點水。', explain: '答案是「澆」；「燒」是發燒的燒，有火字旁。' },
      { id: 's12', meaning: '「＿室」是洗澡的房間。', sentence: '洗完澡，要把＿室擦乾。', frame: '＿室', options: ['浴', '欲'], answer: '浴', clue: '提示：這個字的左邊是三點水。', explain: '答案是「浴」；「欲」是食欲的欲。' }
    ],
    listen: [
      { id: 'l1', text: '坐船時被晃得頭昏，一直想吐。', answer: 0, options: [{ text: '暈船', img: 'seasick.png' }, { text: '黃昏', img: 'sunset.png' }, { text: '途中', img: 'long-road.png' }, { text: '野獸', img: 'wild-wolf.png' }] },
      { id: 'l2', text: '退潮後，小船卡在沙灘上動不了。', answer: 0, options: [{ text: '擱淺', img: 'stuck-boat.png' }, { text: '倒塌', img: 'collapsed-wall.png' }, { text: '捲起', img: 'big-wave.png' }, { text: '燃燒', img: 'campfire.png' }] },
      { id: 'l3', text: '用一根根樹幹綁在一起，浮在水上的交通工具。', answer: 0, options: [{ text: '木筏', img: 'raft.png' }, { text: '船艙', img: 'ship-cabin.png' }, { text: '烤爐', img: 'oven-bread.png' }, { text: '木臼', img: 'mortar.png' }] },
      { id: 'l4', text: '地震時，老房子整個垮下來了。', answer: 0, options: [{ text: '倒塌', img: 'collapsed-wall.png' }, { text: '擱淺', img: 'stuck-boat.png' }, { text: '燃燒', img: 'campfire.png' }, { text: '捏成', img: 'clay.png' }] },
      { id: 'l5', text: '他在雨中跑步，從頭到腳都溼透了。', answer: 0, options: [{ text: '渾身', img: 'wet-kid.png' }, { text: '途中', img: 'long-road.png' }, { text: '劇烈', img: 'shaking-ship.png' }, { text: '喪氣', img: 'sad-slump.png' }] },
      { id: 'l6', text: '看到新的溜滑梯，大家心裡癢癢的，很想玩玩看。', answer: 0, options: [{ text: '躍躍欲試', img: 'eager-kids.png' }, { text: '死裡逃生', img: 'rescue-fire.png' }, { text: '自給自足', img: 'farm-life.png' }, { text: '喪氣', img: 'sad-slump.png' }] },
      { id: 'l7', text: '山上的農家自己種菜、養雞，不用靠別人。', answer: 0, options: [{ text: '自給自足', img: 'farm-life.png' }, { text: '躍躍欲試', img: 'eager-kids.png' }, { text: '死裡逃生', img: 'rescue-fire.png' }, { text: '渾身', img: 'wet-kid.png' }] },
      { id: 'l8', text: '他從火場中被救出來，平安活了下來。', answer: 0, options: [{ text: '死裡逃生', img: 'rescue-fire.png' }, { text: '自給自足', img: 'farm-life.png' }, { text: '躍躍欲試', img: 'eager-kids.png' }, { text: '倒塌', img: 'collapsed-wall.png' }] }
    ],
    /* ---------- 短語、句型、修辭（句子都是 Claude 自己寫的） ---------- */
    phrase: {
      /* 拼短語每一格下面寫要放什麼樣的詞 */
      fillLabels: { before: '量詞', answer: '怎麼樣', noun: '什麼東西' },
      pickName: '看圖選一選', pickSay: '看圖，選出最適合的詞，說說看是什麼樣的東西。',
      /* 短語：量詞＋形容詞＋的＋名詞（課本的例子是課文原句，這裡換成自己寫的） */
      intro: { example: '一片湛藍的大海', img: 'pr-blue-sea.png',
        parts: [{ text: '一片', role: '量詞' }, { text: '湛藍', role: '怎麼樣' }, { text: '的' }, { text: '大海', role: '什麼東西' }],
        explain: '先說數量，再說出東西的樣子，加上「的」，最後說是什麼東西。' },
      pick: [
        { id: 'ph1', img: 'pr-round-moon.png', before: '一輪', noun: '月亮', ask: '一輪什麼樣的月亮', look: '再看看圖片，月亮是什麼形狀？', options: ['圓滿', '破碎', '細瘦', '昏暗'], clue: '提示：中秋節晚上，像一個大盤子掛在天上。', explain: '答案是「圓滿」，完整的短語是「一輪圓滿的月亮」。' },
        { id: 'ph2', img: 'pr-tall-palm.png', before: '一棵', noun: '椰子樹', ask: '一棵什麼樣的椰子樹', look: '再看看圖片，這棵樹跟旁邊的小屋比起來怎麼樣？', options: ['高大', '矮小', '枯黃', '彎曲'], clue: '提示：比旁邊的小屋長出好幾倍。', explain: '答案是「高大」，完整的短語是「一棵高大的椰子樹」。' },
        { id: 'ph3', img: 'pr-clear-stream.png', before: '一條', noun: '小溪', ask: '一條什麼樣的小溪', look: '再看看圖片，溪水看得到底嗎？', options: ['清澈', '渾濁', '乾枯', '吵鬧'], clue: '提示：連水底的小石頭都看得明明白白。', explain: '答案是「清澈」，完整的短語是「一條清澈的小溪」。' },
        { id: 'ph4', img: 'pr-soft-beach.png', before: '一片', noun: '沙灘', ask: '一片什麼樣的沙灘', look: '再看看圖片，沙子踩起來會是什麼感覺？', options: ['柔軟', '堅硬', '冰冷', '刺痛'], clue: '提示：光著腳踩上去，腳都陷進去了。', explain: '答案是「柔軟」，完整的短語是「一片柔軟的沙灘」。' },
        { id: 'ph5', img: 'pr-cozy-hut.png', before: '一間', noun: '木屋', ask: '一間什麼樣的木屋', look: '再看看圖片，木屋裡讓人覺得怎麼樣？', options: ['溫暖', '寒冷', '破爛', '吵鬧'], clue: '提示：屋裡燒著火，外面下雪也不怕。', explain: '答案是「溫暖」，完整的短語是「一間溫暖的木屋」。' },
        { id: 'ph6', img: 'pr-loyal-dog.png', before: '一隻', noun: '小狗', ask: '一隻什麼樣的小狗', look: '再看看圖片，小狗對主人怎麼樣？', options: ['忠心', '兇惡', '懶惰', '膽小'], clue: '提示：主人走到哪裡，牠就跟到哪裡。', explain: '答案是「忠心」，完整的短語是「一隻忠心的小狗」。' },
        { id: 'ph7', img: 'pr-hot-bread.png', before: '一條', noun: '麵包', ask: '一條什麼樣的麵包', look: '再看看圖片，麵包剛出爐聞起來怎麼樣？', options: ['香噴噴', '臭兮兮', '冷冰冰', '溼答答'], clue: '提示：還沒咬，就聞到好棒的味道。', explain: '答案是「香噴噴」，完整的短語是「一條香噴噴的麵包」。' },
        { id: 'ph8', img: 'pr-huge-wave.png', before: '一道', noun: '海浪', ask: '一道什麼樣的海浪', look: '再看看圖片，海浪跟船比起來怎麼樣？', options: ['巨大', '迷你', '平靜', '溫柔'], clue: '提示：比整艘船還要高。', explain: '答案是「巨大」，完整的短語是「一道巨大的海浪」。' }
      ],
      say: [],
      words: [
        { word: '死裡逃生', meaning: '從非常危險的情況中活了下來。', img: 'rescue-fire.png' },
        { word: '自給自足', meaning: '需要的東西都靠雙手做出來，不用靠別人。', img: 'farm-life.png' },
        { word: '躍躍欲試', meaning: '心裡癢癢的，很想動手做做看。', img: 'eager-kids.png' },
        { word: '渾身', meaning: '從頭到腳，全部。', img: 'wet-kid.png' }
      ],
      choose: [
        { id: 'pw1', word: '死裡逃生', options: ['車子差點撞到他，他真是死裡逃生。', '他在家吃點心，真是死裡逃生。'], clue: '提示：想一想，「死裡逃生」是遇到很大的危險嗎？', explain: '第一句用得對：差點被車撞，很危險。在家吃點心沒有危險。' },
        { id: 'pw2', word: '自給自足', options: ['爺爺自己種菜、養雞，過著自給自足的生活。', '他每樣東西都要跟別人借，真是自給自足。'], clue: '提示：想一想，「自給自足」是靠自己，還是靠別人？', explain: '第一句用得對：自己種菜養雞。每樣都跟別人借，剛好相反。' },
        { id: 'pw3', word: '躍躍欲試', options: ['看到新的攀岩牆，弟弟躍躍欲試。', '他一點都不想玩，躍躍欲試的躲在旁邊。'], clue: '提示：想一想，「躍躍欲試」是很想試，還是不想試？', explain: '第一句用得對：很想試試看。一點都不想玩，剛好相反。' },
        { id: 'pw4', word: '渾身', options: ['跑完馬拉松，他渾身都是汗。', '他渾身只有左手的小指頭受傷。'], clue: '提示：想一想，「渾身」是全身，還是一小部分？', explain: '第一句用得對：全身都是汗。只有一根小指頭，不能說渾身。' }
      ],
      make: [
        { id: 'pm1', word: '死裡逃生', clue: '提示：想想看，故事或新聞裡誰遇過很大的危險？', model: '登山客遇到山崩，幸好死裡逃生。' },
        { id: 'pm2', word: '自給自足', clue: '提示：想想看，誰的生活需要的東西都自己做？', model: '小島上的居民捕魚、種菜，過著自給自足的日子。' },
        { id: 'pm3', word: '躍躍欲試', clue: '提示：想想看，看到什麼新東西你很想試試看？', model: '看到哥哥的新滑板，我躍躍欲試。' },
        { id: 'pm4', word: '渾身', clue: '提示：想想看，什麼時候全身都很不舒服或很髒？', model: '在泥巴地玩了一下午，我渾身都髒兮兮的。' }
      ]
    },
    pattern: [
      { key: 'suiranreng', id: 'sn', title: '雖然……仍……', img: 'suiranreng.png',
        meaning: '先用「雖然」說遇到的困難，再用「仍」說還是繼續做的事。',
        examples: ['雖然下著大雨，郵差仍準時把信送到。'],
        match: [
          { id: 'pt-sn-m1', img: 'pt-tired-climb.png', front: '雖然爬得很累，', options: ['他仍一步步往山頂走。', '他仍覺得很累。', '他仍在山下睡覺。'], clue: '提示：看看圖片，他最後有沒有繼續爬？', explain: '答案是「他仍一步步往山頂走」：很累，還是繼續做。' },
          { id: 'pt-sn-m2', img: 'pt-cold-swim2.png', front: '雖然水很冰，', options: ['選手仍跳下去練習。', '水仍然很冰。', '選手仍在吃冰。'], clue: '提示：看看圖片，選手有沒有下水？', explain: '答案是「選手仍跳下去練習」：水冰，還是練習。' },
          { id: 'pt-sn-m3', img: 'pt-sick-study.png', front: '雖然感冒了，', options: ['姐姐仍寫完功課。', '姐姐仍然感冒。', '姐姐仍去打球。'], clue: '提示：看看圖片，姐姐在書桌前做什麼？', explain: '答案是「姐姐仍寫完功課」：生病了，還是把功課寫完。' }
        ],
        conj: [
          { id: 'pt-sn-c1', full: '雖然沒有人幫忙，他仍自己搭好了帳篷。', img: 'pt-tent.png', sentence: '＿＿沒有人幫忙，他＿自己搭好了帳篷。', options: ['雖然……仍……', '……於是……', '只有……才能……'], clue: '提示：遇到困難，還是做到了。數數看有幾個空格。', explain: '答案是「雖然……仍……」：雖然沒有人幫忙，他仍自己搭好了帳篷。' },
          { id: 'pt-sn-c2', full: '雖然失敗了好幾次，她仍不放棄。', img: 'pt-try-again2.png', sentence: '＿＿失敗了好幾次，她＿不放棄。', options: ['雖然……仍……', '……於是……', '只有……才能……'], clue: '提示：失敗很多次，還是繼續。數數看有幾個空格。', explain: '答案是「雖然……仍……」：雖然失敗了好幾次，她仍不放棄。' }
        ],
        half: [
          { id: 'pt-sn-h1', front: '雖然天色已經暗了，', clue: '提示：天黑了，大家還在做什麼？記得要說「仍」。', model: '球員們仍在操場上練球。' },
          { id: 'pt-sn-h2', front: '雖然腳很痛，', clue: '提示：腳痛，他還是做了什麼？記得要說「仍」。', model: '他仍跑完了比賽。' }
        ],
        whole: [
          { id: 'pt-sn-w1', clue: '提示：先用「雖然」說困難，再用「仍」說還是繼續做的事。想想看：你有沒有遇到困難還是堅持的經驗？', model: '雖然數學題目很難，我仍一題一題算完。' }
        ] },
      { key: 'yushi', id: 'ys', title: '……於是……', img: 'yushi.png',
        meaning: '先說一件事，再用「於是」接著說因為這件事而做的下一件事。',
        examples: ['天空突然下起雨，於是我們躲進騎樓。'],
        match: [
          { id: 'pt-ys-m1', img: 'pt-hungry-kid.png', front: '弟弟肚子餓了，', options: ['於是拿了一個麵包吃。', '於是肚子餓了。', '於是去睡覺不吃東西。'], clue: '提示：看看圖片，肚子餓了，弟弟接著做什麼？', explain: '答案是「於是拿了一個麵包吃」：肚子餓，接著去吃東西。' },
          { id: 'pt-ys-m2', img: 'pt-dark-room.png', front: '房間太暗了，', options: ['於是我打開電燈。', '於是房間很暗。', '於是我閉上眼睛。'], clue: '提示：看看圖片，房間暗，要做什麼？', explain: '答案是「於是我打開電燈」：太暗，接著開燈。' },
          { id: 'pt-ys-m3', img: 'pt-dirty-shoes.png', front: '鞋子沾滿了泥巴，', options: ['於是我把它洗乾淨。', '於是鞋子很髒。', '於是我穿去睡覺。'], clue: '提示：看看圖片，髒鞋子接著要怎麼處理？', explain: '答案是「於是我把它洗乾淨」：鞋子髒，接著去洗。' }
        ],
        conj: [
          { id: 'pt-ys-c1', full: '公車遲遲不來，於是我們決定走路回家。', img: 'pt-walk-home.png', sentence: '公車遲遲不來，＿＿我們決定走路回家。', options: ['……於是……', '雖然……仍……', '只有……才能……'], clue: '提示：因為前面的事，接著做下一件事。數數看有幾個空格。', explain: '答案是「……於是……」：公車遲遲不來，於是我們決定走路回家。' },
          { id: 'pt-ys-c2', full: '他想學游泳，於是報名了游泳課。', img: 'pt-swim-class.png', sentence: '他想學游泳，＿＿報名了游泳課。', options: ['……於是……', '雖然……仍……', '只有……才能……'], clue: '提示：想學游泳，接著做了什麼？數數看有幾個空格。', explain: '答案是「……於是……」：他想學游泳，於是報名了游泳課。' }
        ],
        half: [
          { id: 'pt-ys-h1', front: '外面颳起大風，', clue: '提示：颳大風了，你接著會做什麼？記得要說「於是」。', model: '於是我把窗戶關好。' },
          { id: 'pt-ys-h2', front: '小狗一直對著門口叫，', clue: '提示：小狗一直叫，你接著做什麼？記得要說「於是」。', model: '於是我去開門看看是誰。' }
        ],
        whole: [
          { id: 'pt-ys-w1', clue: '提示：先說一件事，再用「於是」說接著做的事。想想看：今天發生了什麼事，你接著怎麼做？', model: '今天放學時下雨了，於是我撐開雨傘走回家。' }
        ] }
    ],
    rhetoric: {
      cards: [
        { key: 'sense', name: '摹寫', meaning: '把看到、聽到、聞到、吃到、摸到的感覺，仔細的寫出來，讓人好像也感受到。', example: '課文寫出夕陽的顏色、海浪的光和天上的雲彩，把看到的海上景色寫得好清楚。',
          show: { sentence: '夕陽把海面染成一片金黃，海鷗在空中嘎嘎叫。', mark: ['一片金黃', '嘎嘎叫'] },
          yesno: [
            { id: 'rh-se-y1', sentence: '剛烤好的麵包，飄出一陣暖暖的麥香。', answer: true, mark: ['暖暖的麥香'], clue: '提示：這句話有沒有寫出聞到的味道？', explain: '是摹寫：寫出聞到的香味。' },
            { id: 'rh-se-y2', sentence: '他烤了麵包。', answer: false, clue: '提示：這句話有沒有寫出看到、聞到、吃到的感覺？', explain: '不是摹寫：這句話只是說烤了麵包。' }
          ],
          pick: [
            { id: 'rh-se-p1', mark: ['火紅'], options: ['天邊掛著一顆火紅的太陽。', '太陽出來了。'], clue: '提示：哪一句寫出了看到的顏色？', explain: '「火紅的太陽」是摹寫：寫出看到的顏色。' },
            { id: 'rh-se-p2', mark: ['嘩啦嘩啦'], options: ['海浪嘩啦嘩啦的打在岩石上。', '海上有浪。'], clue: '提示：哪一句寫出了聽到的聲音？', explain: '「嘩啦嘩啦」是摹寫：寫出聽到的聲音。' },
            { id: 'rh-se-p3', mark: ['又鹹又澀'], options: ['海水喝起來又鹹又澀。', '這是海水。', '他喝了水。'], clue: '提示：哪一句寫出了吃到、喝到的味道？', explain: '「又鹹又澀」是摹寫：寫出嚐到的味道。' },
            { id: 'rh-se-p4', mark: ['刺刺的'], options: ['沙子被太陽曬得燙燙的、刺刺的。', '沙灘上有沙子。', '天氣很好。'], clue: '提示：哪一句寫出了摸到的感覺？', explain: '「燙燙的、刺刺的」是摹寫：寫出摸到的感覺。' },
            { id: 'rh-se-p5', mark: ['濃濃的煙味'], options: ['營火燒起來，空氣中飄著濃濃的煙味。', '他生了火。', '晚上到了。', '火像一條紅龍。'], clue: '提示：哪一句寫出了聞到的味道？', explain: '「濃濃的煙味」是摹寫：寫出聞到的味道。' },
            { id: 'rh-se-p6', mark: ['沙沙'], options: ['風吹過椰子樹，葉子沙沙響。', '島上有椰子樹。', '風很大。', '樹在對我揮手。'], clue: '提示：哪一句寫出了聽到的聲音？', explain: '「葉子沙沙響」是摹寫：寫出聽到的聲音。' }
          ] },
        { key: 'question', name: '設問', meaning: '用問句來說話，引起大家注意。有時自己問、自己回答；有時只問不答，答案就藏在問題裡。', example: '主角被沖上岸後問自己：這裡有沒有別人？有沒有可怕的動物？讓讀者也跟著緊張起來。',
          show: { sentence: '這是哪裡？我怎麼會在這裡？' },
          yesno: [
            { id: 'rh-qu-y1', sentence: '島上會不會有其他人呢？', answer: true, clue: '提示：這句話有沒有用問題來說話？', explain: '是設問：用問題說出心裡的疑惑。' },
            { id: 'rh-qu-y2', sentence: '島上只有我一個人。', answer: false, clue: '提示：這句話裡有沒有問題？', explain: '不是設問：這句話沒有用問句。' }
          ],
          pick: [
            { id: 'rh-qu-p1', options: ['我該怎麼辦呢？只能靠自己了！', '我要靠自己。'], clue: '提示：哪一句先問再自己回答？', explain: '先問「我該怎麼辦呢」，再回答，是設問。' },
            { id: 'rh-qu-p2', options: ['誰不想回到溫暖的家呢？', '我想回家。'], clue: '提示：哪一句用問題來說話，答案藏在問題裡？', explain: '答案藏在問題裡：大家都想回家，是設問。' },
            { id: 'rh-qu-p3', options: ['這是誰的腳印？難道島上還有別人？', '沙灘上有腳印。', '他走在沙灘上。'], clue: '提示：哪一句用問題引起注意？', explain: '用問題引起好奇，是設問。' },
            { id: 'rh-qu-p4', options: ['為什麼要蓋木屋？因為山洞不安全。', '他蓋了木屋。', '山洞很暗。'], clue: '提示：哪一句先問「為什麼」，再自己回答？', explain: '先問再答，是設問。' },
            { id: 'rh-qu-p5', options: ['你敢一個人住在荒島上嗎？', '荒島上沒有人。', '他住在島上。', '島上有樹。'], clue: '提示：哪一句用問題來說話？', explain: '「你敢一個人住在荒島上嗎」是設問。' },
            { id: 'rh-qu-p6', options: ['還有什麼比活下來更幸運呢？', '他活下來了。', '船沉了。', '他游上岸。'], clue: '提示：哪一句用問題來說話，答案藏在問題裡？', explain: '答案藏在問題裡：活下來最幸運，是設問。' }
          ] }
      ],
      quiz: [
        { id: 'rh1', sentence: '烤爐裡的麵包發出陣陣香氣。', answer: '摹寫', mark: ['陣陣香氣'], clue: '提示：這句話有沒有寫出聞到的味道？', explain: '答案是「摹寫」：寫出聞到的香味。' },
        { id: 'rh2', sentence: '雷聲轟隆隆的響個不停。', answer: '摹寫', mark: ['轟隆隆'], clue: '提示：這句話有沒有寫出聽到的聲音？', explain: '答案是「摹寫」：寫出雷的聲音。' },
        { id: 'rh3', sentence: '這座島上，到底藏著什麼祕密？', answer: '設問', clue: '提示：這句話有沒有用問題引起注意？', explain: '答案是「設問」：用問題引起大家的好奇。' },
        { id: 'rh4', sentence: '什麼最重要？就是不放棄的心。', answer: '設問', clue: '提示：這句話是不是先問再答？', explain: '答案是「設問」：先問再自己回答。' }
      ]
    }
  };
  if (typeof module === 'object' && module.exports) module.exports = d;
  else { root.H3A_WORDS = root.H3A_WORDS || {}; root.H3A_WORDS.L12 = d; }
})(this);
