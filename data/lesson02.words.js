/* 第 2 課字詞練習（公開、不加密）。句子和解釋都是 Claude 自己寫的，沒有課本原文。
   生字、語詞：options 的第一個是正確答案（作答時會打亂）。 */
(function (root) {
  var d = {
    /* 人事時地物：選項第一個是答案；paras 是提示要用到的段落 */
    wh: [
      { id: 'wh-ren', key: '人', options: ['作者齊柏林', '一位開飛機的駕駛員', '一位種檳榔的農夫', '一位德國的科學家'], paras: [1, 2], why: '這一課是作者齊柏林自己說的故事。' },
      { id: 'wh-shi', key: '事', options: ['從天空拍攝臺灣，做成一部空拍影片', '開飛船到德國旅行', '在山上種很多檳榔樹', '寫一本介紹颱風的書'], paras: [2], why: '作者在天上拍攝臺灣，花了很多年完成一部空拍影片。' },
      { id: 'wh-time', key: '時', options: ['拍了二十幾年，四十七歲時更專心的拍', '只有一個下午', '過年放假的那一天', '他剛上小學的時候'], paras: [2], why: '作者拍了二十多年的臺灣，四十七歲時專心拍影片，拍了三年。' },
      { id: 'wh-di', key: '地', options: ['臺灣的天空，往下看整片土地', '德國的大城市', '南極的冰山上', '海底的珊瑚礁'], paras: [1, 3], why: '作者坐直升機飛到天上，往下看臺灣。' },
      { id: 'wh-wu', key: '物', options: ['直升機和空拍影片', '腳踏車和安全帽', '畫筆和圖畫紙', '鋼琴和樂譜'], paras: [1, 2], why: '作者坐直升機飛上天，拍出一部空拍影片。' }
    ],
    /* 理解提問的分類（照課本「閱讀理解提問」）：extract 提取訊息、infer 推論訊息、interpret 詮釋整合、evaluate 比較評估。只放題號，不放課文 */
    quizLevels: { qa: 'extract', qb: 'extract', qc: 'extract', qd: 'extract', qe: 'extract', qf: 'infer', qg: 'infer', qh: 'interpret',
      qi: 'evaluate', qj: 'evaluate', k1: 'interpret', k2: 'evaluate' },
    /* 詮釋整合、比較評估的鷹架：think 是「想一想」的兩個步驟（不說答案），why 是「老師教你」的說明。不放課文原句 */
    quizHelp: {
      qh: { think: ['寶寶在媽媽肚子裡，是靠什麼和媽媽連在一起的？', '河流從山上流到哪裡？它把哪兩個地方連起來？'], why: '臍帶把寶寶和媽媽連在一起，送營養給寶寶。河流從陸地流進大海，也把土地和海洋連在一起，所以作者把河流比成臍帶。' },
      qi: { think: ['先看到美麗的景色，心裡會有什麼感覺？', '接著知道美麗的地方被弄壞了，會不會想去保護它？'], why: '先讓我們看到臺灣有多美，我們會很喜歡它；再告訴我們它受傷了，我們就會更捨不得，更想去保護它。' },
      qj: { think: ['作者看到土地受傷，心裡有什麼感覺？', '最後作者希望大家一起做什麼？'], why: '作者看到臺灣很美，也看到臺灣受傷了。他希望每個人都一步一步、用行動愛護這塊土地，一起保護我們的家園。' }
    },
    /* 「說說看」改成選選看：good 兩個合理的想法（選哪一個都對）、bad 兩個不合理的，why 是老師教你的說明。不放課文原句 */
    talkChoices: {
      k1: { good: ['我出門會自己帶水壺，少用塑膠瓶。', '我會把垃圾分類，不亂丟。'], bad: ['我把垃圾丟進河裡。', '我讓水龍頭一直開著。'], why: '題目問的是怎麼讓家園更美好。少用塑膠、垃圾分類都在保護環境。把垃圾丟進河裡、浪費水，會讓土地更受傷。' },
      k2: { good: ['我想看我家附近的山，看看它有多綠。', '我想看海邊，看看海浪拍打沙灘的樣子。'], bad: ['我想在天上睡覺，什麼都不看。', '我想看電視卡通。'], why: '題目問的是從天上往下看，你想看的地方和原因。山和海邊都是從天上看得到的地方。睡覺、看電視，都沒有回答到題目。' }
    },
    hanzi: [
      { id: 'h-德', combo: { layout: 'lr', parts: [['彳', 'm', '走路'], ['㥁', 's', '']] }, char: '德', zhuyin: 'ㄉㄜˊ', radical: '彳', strokes: 15, words: ['德國', '品德'], say: '德，品德的德', cloze: '品＿', img: 'kind-help.png', options: ['德', '聽', '徳', '得'], clue: '這個字的左邊是雙人旁，右邊下面有「心」。', explain: '答案是「德」，右邊下面有「心」；「得」是得到的得，「聽」的左邊是耳。', parts: ['彳', '㥁'], story: '左邊的雙人旁和走路有關，右邊下面有一顆心。走正確的路、心地善良，就是「品德」好。', sentence: '他的品德很好，常常幫助同學。', build: { layout: 'lr', show: ['？', '㥁'], answer: '彳', options: ['彳', '耳', '扌', '亻'], clue: '想一想：「聽」的左邊是耳朵，和走路有關的雙人旁是哪一個？' } },
      { id: 'h-乎', combo: { type: '象形字', pict: '「乎」像一個人在說話，嘴巴吐出氣來，後來多用在句子裡，例如「似乎」、「幾乎」。' }, char: '乎', zhuyin: 'ㄏㄨ', radical: '丿', strokes: 5, words: ['似乎', '幾乎'], say: '乎，幾乎的乎', cloze: '幾＿', img: 'almost-full.png', options: ['乎', '平', '呼', '手'], clue: '這個字上面有一撇，中間有兩點。', explain: '答案是「乎」，上面多一撇；「平」上面沒有撇，是平地的平。', parts: ['乎'], story: '「乎」像說話時吐出來的一口氣。現在常放在別的字後面，例如「幾乎」、「似乎」。', sentence: '杯子裡的水幾乎滿出來了。' },
      { id: 'h-血', combo: { type: '象形字', pict: '「血」像一個盤子，上面有一滴紅紅的血。以前祭拜時會用盤子裝血，所以這個字長這樣。' }, char: '血', zhuyin: 'ㄒㄧㄝˇ', radical: '血', strokes: 6, words: ['血液', '流血'], say: '血，流血的血', cloze: '流＿', img: 'band-aid.png', options: ['血', '皿', '而', '恤'], clue: '這個字像一個盤子，上面多了一撇。', explain: '答案是「血」，「皿」的上面多一撇；「皿」是盤子、碗。', parts: ['丿', '皿'], story: '下面的「皿」是盤子，上面的一撇像一滴血。手指割傷了，會流出紅紅的血。', sentence: '弟弟跌倒，膝蓋流血了。' },
      { id: 'h-攝', combo: { layout: 'lr', parts: [['扌', 'm', '手'], ['聶', 's', '']] }, char: '攝', zhuyin: 'ㄕㄜˋ', radical: '手', strokes: 21, words: ['拍攝', '攝影'], say: '攝，攝影的攝', cloze: '＿影', img: 'camera.png', options: ['攝', '懾', '聶', '躡'], clue: '這個字的左邊是提手旁，右邊有三個「耳」。', explain: '答案是「攝」，左邊是提手旁；「懾」的左邊是豎心旁。', parts: ['扌', '聶'], story: '左邊是手，右邊的「聶」念起來有點像「攝」。用手拿著相機，把看到的東西收進照片裡，就是「攝影」。', sentence: '爸爸用相機攝影，拍下我們的笑容。', build: { layout: 'lr', show: ['？', '聶'], answer: '扌', options: ['扌', '忄', '足', '口'], clue: '想一想：拿相機要用身體的哪個部分？' } },
      { id: 'h-颱', combo: { layout: 'lr', parts: [['風', 'm', '風'], ['台', 's', '']] }, char: '颱', zhuyin: 'ㄊㄞˊ', radical: '風', strokes: 14, words: ['颱風', '防颱'], say: '颱，颱風的颱', cloze: '防＿', img: 'typhoon.png', options: ['颱', '台', '抬', '殆'], clue: '這個字的左邊是「風」。', explain: '答案是「颱」，左邊是「風」；「抬」是抬頭的抬，有提手旁。', parts: ['風', '台'], story: '左邊是「風」，右邊的「台」念起來像「颱」。夏天常常吹來又大又強的風雨，就是「颱風」。', sentence: '颱風快來了，大家要做好防颱準備。', build: { layout: 'lr', show: ['？', '台'], answer: '風', options: ['風', '扌', '歹', '口'], clue: '想一想：又大又強的暴雨，左邊放和吹動的空氣有關的哪一個？' } },
      { id: 'h-錄', combo: { layout: 'lr', parts: [['金', 'm', '金屬'], ['录', 's', '']] }, char: '錄', zhuyin: 'ㄌㄨˋ', radical: '金', strokes: 16, words: ['記錄', '錄音'], say: '錄，錄音的錄', cloze: '＿音', img: 'record-voice.png', options: ['錄', '綠', '碌', '祿'], clue: '這個字的左邊是金字旁。', explain: '答案是「錄」，左邊是「金」；「綠」的左邊是糸字旁，「碌」的左邊是石字旁。', parts: ['金', '录'], story: '左邊的「金」是金屬，以前把字刻在金屬上記下來；右邊的「录」念起來像「錄」。把事情或聲音留下來，就是「記錄」、「錄音」。', sentence: '我用手機錄音，把老師講的故事錄下來。', build: { layout: 'lr', show: ['？', '录'], answer: '金', options: ['金', '糸', '石', '示'], clue: '想一想：「綠」的左邊是絲線，以前把字刻在什麼上面？' } },
      { id: 'h-哀', combo: { type: '形聲字', pict: '外面像一件衣服，中間是一個「口」。人穿著衣服，張開嘴巴哭，就是很傷心的「哀」。' }, char: '哀', zhuyin: 'ㄞ', radical: '口', strokes: 9, words: ['哀愁', '悲哀'], say: '哀，悲哀的哀', cloze: '悲＿', img: 'sad-boy.png', options: ['哀', '衷', '衰', '袁'], clue: '這個字的中間是「口」。', explain: '答案是「哀」，中間是「口」；「衷」的中間是「中」，「衰」的中間不一樣。', parts: ['衣', '口'], story: '外面是「衣」，中間是嘴巴。穿著衣服，張開嘴巴大哭，好傷心，就是「悲哀」。', sentence: '小狗走丟了，妹妹好悲哀。' },
      { id: 'h-巒', combo: { layout: 'tb', parts: [['䜌', 's', ''], ['山', 'm', '山']] }, char: '巒', zhuyin: 'ㄌㄨㄢˊ', radical: '山', strokes: 22, words: ['山巒', '峰巒'], say: '巒，山巒的巒', cloze: '峰＿', img: 'mountains.png', options: ['巒', '戀', '彎', '蠻'], clue: '這個字的下面是「山」。', explain: '答案是「巒」，下面是「山」；「戀」的下面是心，「彎」的下面是弓。', parts: ['䜌', '山'], story: '上面念起來像「巒」，下面是「山」。一座接著一座、連在一起的山，就是「山巒」。', sentence: '遠方的峰巒一座接著一座。', build: { layout: 'tb', show: ['䜌', '？'], answer: '山', options: ['山', '心', '弓', '虫'], clue: '想一想：一座連著一座的是什麼？' } },
      { id: 'h-縱', combo: { layout: 'lr', parts: [['糸', 'm', '絲線'], ['從', 's', '']] }, char: '縱', zhuyin: 'ㄗㄨㄥˋ', radical: '糸', strokes: 17, words: ['縱谷', '縱隊'], say: '縱，縱隊的縱', cloze: '＿隊', img: 'line-up-long.png', options: ['縱', '從', '蹤', '總'], clue: '這個字的左邊是糸字旁。', explain: '答案是「縱」，左邊是糸字旁；「從」沒有糸字旁，「蹤」的左邊是足字旁。', parts: ['糸', '從'], story: '左邊的「糸」是絲線，右邊的「從」念起來像「縱」。像一條直直的長線，從前面排到後面，就是「縱隊」。', sentence: '同學們排成兩路縱隊走進禮堂。', build: { layout: 'lr', show: ['？', '從'], answer: '糸', options: ['糸', '足', '扌', '木'], clue: '想一想：一條直直的長線，左邊放和絲線有關的哪一個？' } },
      { id: 'h-臍', combo: { layout: 'lr', parts: [['月', 'm', '身體'], ['齊', 's', '']] }, char: '臍', zhuyin: 'ㄑㄧˊ', radical: '肉', strokes: 18, words: ['臍帶', '肚臍'], say: '臍，肚臍的臍', cloze: '肚＿', img: 'belly.png', options: ['臍', '濟', '擠', '齊'], clue: '這個字的左邊是肉字旁。', explain: '答案是「臍」，左邊是肉字旁；「擠」的左邊是提手旁，「濟」的左邊是三點水。', parts: ['月', '齊'], story: '左邊的肉字旁和身體有關，右邊的「齊」念起來像「臍」。肚子中間那個小小的洞，就是「肚臍」。', sentence: '弟弟掀起衣服，露出圓圓的肚臍。', build: { layout: 'lr', show: ['？', '齊'], answer: '月', options: ['月', '扌', '氵', '口'], clue: '想一想：「擠」的左邊是手，和身體有關的肉字旁是哪一個？' } },
      { id: 'h-禍', combo: { layout: 'lr', parts: [['礻', 'm', '祭拜'], ['咼', 's', '']] }, char: '禍', zhuyin: 'ㄏㄨㄛˋ', radical: '示', strokes: 14, words: ['人禍', '車禍'], say: '禍，車禍的禍', cloze: '車＿', img: 'car-crash.png', options: ['禍', '鍋', '蝸', '過'], clue: '這個字的左邊是示字旁。', explain: '答案是「禍」，左邊是示字旁；「鍋」的左邊是金字旁，「蝸」的左邊是虫字旁。', parts: ['礻', '咼'], story: '左邊的示字旁和祭拜有關，以前的人祈禱不要發生壞事；右邊念起來像「禍」。不好的事、災難，就是「禍」。', sentence: '過馬路要小心，才不會發生車禍。', build: { layout: 'lr', show: ['？', '咼'], answer: '礻', options: ['礻', '金', '虫', '辶'], clue: '想一想：「鍋」是金屬做的，壞事、災難左邊放哪一個？' } },
      { id: 'h-殘', combo: { layout: 'lr', parts: [['歹', 'm', '壞掉'], ['戔', 's', '']] }, char: '殘', zhuyin: 'ㄘㄢˊ', radical: '歹', strokes: 12, words: ['殘破', '殘缺'], say: '殘，殘缺的殘', cloze: '＿缺', img: 'broken-toy.png', options: ['殘', '踐', '錢', '淺'], clue: '這個字的左邊是歹字旁。', explain: '答案是「殘」，左邊是「歹」；「踐」的左邊是足字旁，「錢」的左邊是金字旁。', parts: ['歹', '戔'], story: '左邊的「歹」和壞掉有關，右邊的「戔」念起來像「殘」。東西壞掉、少了一部分，就是「殘缺」。', sentence: '這本舊書少了幾頁，已經殘缺不全。', build: { layout: 'lr', show: ['？', '戔'], answer: '歹', options: ['歹', '足', '金', '氵'], clue: '想一想：東西壞掉、不完整，左邊放哪一個？' } },
      { id: 'h-檳', combo: { layout: 'lr', parts: [['木', 'm', '樹'], ['賓', 's', '']] }, char: '檳', zhuyin: 'ㄅㄧㄣ', radical: '木', strokes: 18, words: ['檳榔', '檳榔樹'], say: '檳，檳榔的檳', cloze: '＿榔樹', img: 'betel-tree.png', options: ['檳', '濱', '賓', '鬢'], clue: '這個字的左邊是木字旁。', explain: '答案是「檳」，左邊是木字旁；「濱」的左邊是三點水，是海濱的濱。', parts: ['木', '賓'], story: '左邊的「木」是樹，右邊的「賓」念起來像「檳」。一種長得又高又直、像椰子樹的樹，就是「檳榔樹」。', sentence: '路邊有一排高高的檳榔樹。', build: { layout: 'lr', show: ['？', '賓'], answer: '木', options: ['木', '氵', '貝', '口'], clue: '想一想：這是一種植物，左邊放哪一個？' } },
      { id: 'h-榔', combo: { layout: 'lr', parts: [['木', 'm', '樹'], ['郎', 's', '']] }, char: '榔', zhuyin: 'ㄌㄤˊ', radical: '木', strokes: 13, words: ['檳榔', '榔頭'], say: '榔，榔頭的榔', cloze: '＿頭', img: 'hammer.png', options: ['榔', '郎', '廊', '朗'], clue: '這個字的左邊是木字旁。', explain: '答案是「榔」，左邊是木字旁；「廊」是走廊的廊，「朗」是朗讀的朗。', parts: ['木', '郎'], story: '左邊的「木」是木頭，右邊的「郎」念起來像「榔」。木頭把手、用來敲釘子的工具，叫「榔頭」。', sentence: '爸爸拿起榔頭，把釘子敲進木板。', build: { layout: 'lr', show: ['？', '郎'], answer: '木', options: ['木', '广', '月', '扌'], clue: '想一想：敲釘子工具的把手是用樹做的，左邊放哪一個？' } },
      { id: 'h-降', combo: { layout: 'lr', parts: [['阝', 'm', '小山坡'], ['夅', 's', '']] }, char: '降', zhuyin: 'ㄐㄧㄤˋ', radical: '阜', strokes: 9, words: ['降低', '下降'], say: '降，下降的降', cloze: '下＿', img: 'plane-landing.png', options: ['降', '絳', '洚', '隆'], clue: '這個字的左邊是阜字旁。', explain: '答案是「降」；「隆」是隆起的隆，右邊不一樣。', parts: ['阝', '夅'], story: '左邊的「阝」像小山坡，右邊的「夅」像兩隻腳往下走。從高的地方往下走，就是「下降」。', sentence: '飛機慢慢下降，停在機場。' },
      { id: 'h-鏟', combo: { layout: 'lr', parts: [['金', 'm', '金屬'], ['產', 's', '']] }, char: '鏟', zhuyin: 'ㄔㄢˇ', radical: '金', strokes: 19, words: ['一鏟', '鍋鏟'], say: '鏟，鍋鏟的鏟', cloze: '鍋＿', img: 'spatula.png', options: ['鏟', '產', '剷', '鏈'], clue: '這個字的左邊是金字旁。', explain: '答案是「鏟」，左邊是金字旁；「產」沒有金字旁，是生產的產。', parts: ['金', '產'], story: '左邊的「金」是金屬，右邊的「產」念起來像「鏟」。金屬做的、扁扁的工具，用來翻菜或挖土，就是「鏟子」、「鍋鏟」。', sentence: '媽媽拿著鍋鏟炒青菜。', build: { layout: 'lr', show: ['？', '產'], answer: '金', options: ['金', '木', '石', '扌'], clue: '想一想：炒菜的工具是什麼做的？' } },
      { id: 'h-汙', combo: { layout: 'lr', parts: [['氵', 'm', '水'], ['于', 's', '']] }, char: '汙', zhuyin: 'ㄨ', radical: '水', strokes: 6, words: ['汙水', '汙染'], say: '汙，汙染的汙', cloze: '＿染', img: 'dirty-river.png', options: ['汙', '污', '汗', '江'], clue: '這個字的左邊是三點水，右邊是「于」。', explain: '答案是「汙」，右邊是「于」；「汗」的右邊是「干」，「江」的右邊是「工」。', parts: ['氵', '于'], story: '左邊的三點水是水，右邊的「于」念起來像「汙」。水變得髒髒的，就是「汙水」；把乾淨的東西弄髒，就是「汙染」。', sentence: '工廠的髒水汙染了河流。', build: { layout: 'lr', show: ['氵', '？'], answer: '于', options: ['于', '干', '工', '千'], clue: '想一想：「汗」的右邊是干，這個字右邊的那一橫是彎的鉤。' } },
      { id: 'h-斷', combo: { layout: 'lr', parts: [['㡭', 'm', '絲'], ['斤', 's', '斧頭']] }, char: '斷', zhuyin: 'ㄉㄨㄢˋ', radical: '斤', strokes: 18, words: ['不斷', '切斷'], say: '斷，切斷的斷', cloze: '切＿', img: 'cut-rope.png', options: ['斷', '繼', '斯', '新'], clue: '這個字的右邊是「斤」，左邊像一團絲。', explain: '答案是「斷」；「繼」是繼續的繼，意思剛好相反；「新」的左邊不一樣。', parts: ['㡭', '斤'], story: '左邊像一團絲線，右邊的「斤」是斧頭。用斧頭把絲線砍開，就是「斷」；一直沒有停，叫「不斷」。', sentence: '剪刀一剪，繩子就斷了。' }
    ],
    vocab: [
      { id: 'v-德國', cloze: true, clozeOptions: ['德國', '冰箱', '森林', '學校'], word: '德國', meaning: '位在歐洲中間，首都是柏林的地方。', example: '叔叔要去＿＿工作，那裡在歐洲。', img: 'europe-map.png', options: ['德國', '颱風', '山巒', '檳榔'] },
      { id: 'v-似乎', cloze: true, clozeOptions: ['似乎', '一定', '絕對', '永遠'], word: '似乎', meaning: '好像。', example: '天空黑黑的，＿＿快要下雨了。', img: 'cloudy-sky.png', options: ['似乎', '不斷', '降低', '記錄'] },
      { id: 'v-血液', cloze: true, clozeOptions: ['血液', '汗水', '眼淚', '口水'], word: '血液', meaning: '在身體裡流動、紅紅的水，把養分送到全身。', example: '心臟像幫浦一樣，把＿＿送到身體每個地方。', img: 'heart-pump.png', options: ['血液', '汙水', '臍帶', '縱谷'] },
      { id: 'v-拍攝', cloze: true, clozeOptions: ['拍攝', '吃掉', '撕破', '洗澡'], word: '拍攝', meaning: '用相機把看到的東西錄成照片或影片。', example: '哥哥用手機＿＿了一段小狗玩球的影片。', img: 'camera.png', options: ['拍攝', '記錄', '降低', '似乎'] },
      { id: 'v-颱風', cloze: true, clozeOptions: ['颱風', '彩虹', '太陽', '月亮'], word: '颱風', meaning: '夏天常常來，雨很大、樹都被吹倒的天氣。', example: '＿＿來的時候，風很大、雨很大，不要出門。', img: 'typhoon.png', options: ['颱風', '山巒', '人禍', '血液'] },
      { id: 'v-記錄', cloze: true, clozeOptions: ['記錄', '忘記', '丟掉', '弄亂'], word: '記錄', meaning: '把看到、聽到的事寫下來，留著以後看。', example: '我每天把小豆苗長多高，＿＿在本子上。', img: 'bean-notes.png', options: ['記錄', '拍攝', '降低', '不斷'] },
      { id: 'v-哀愁', cloze: true, clozeOptions: ['哀愁', '開心', '興奮', '得意'], word: '哀愁', meaning: '心裡傷心又煩惱。', example: '看到森林被燒光，大家心裡都很＿＿。', img: 'sad-forest.png', options: ['哀愁', '殘破', '似乎', '林立'] },
      { id: 'v-山巒', cloze: true, clozeOptions: ['山巒', '沙漠', '池塘', '馬路'], word: '山巒', meaning: '一座接著一座、連在一起的高峰。', example: '從山頂往遠處看，綠色的＿＿一層又一層。', img: 'mountains.png', options: ['山巒', '縱谷', '颱風', '德國'] },
      { id: 'v-縱谷', cloze: true, clozeOptions: ['縱谷', '屋頂', '操場', '海島'], word: '縱谷', meaning: '夾在兩排山中間、又長又直的低地。', example: '火車沿著長長的＿＿往南開，兩邊都是高山。', img: 'valley.png', options: ['縱谷', '山巒', '汙水', '臍帶'] },
      { id: 'v-臍帶', cloze: true, clozeOptions: ['臍帶', '皮帶', '絲帶', '鞋帶'], word: '臍帶', meaning: '寶寶在媽媽肚子裡時，連著媽媽、送養分給寶寶的管子。', example: '寶寶在肚子裡，靠著＿＿從媽媽那裡得到營養。', img: 'mom-baby.png', options: ['臍帶', '血液', '縱谷', '檳榔'] },
      { id: 'v-人禍', cloze: true, clozeOptions: ['人禍', '好運', '禮物', '獎品'], word: '人禍', meaning: '不是大自然，是我們自己不小心造成的災難。', example: '亂丟菸蒂引起森林大火，這是＿＿，不是天災。', img: 'forest-fire.png', options: ['人禍', '颱風', '哀愁', '殘破'] },
      { id: 'v-殘破', cloze: true, clozeOptions: ['殘破', '嶄新', '漂亮', '完整'], word: '殘破', meaning: '東西壞掉、爛掉，不完整。', example: '颱風過後，路邊的招牌變得＿＿不堪。', img: 'broken-sign.png', options: ['殘破', '哀愁', '人禍', '林立'] },
      { id: 'v-檳榔', cloze: true, clozeOptions: ['檳榔', '香蕉', '蘋果', '葡萄'], word: '檳榔', meaning: '一種高高直直的樹結的果子，吃了對身體不好。', example: '醫生說常常吃＿＿，嘴巴容易生病。', img: 'betel-tree.png', options: ['檳榔', '血液', '德國', '汙水'] },
      { id: 'v-降低', cloze: true, clozeOptions: ['降低', '升高', '增加', '變多'], word: '降低', meaning: '從高的地方往下掉、變少。', example: '開了冷氣以後，房間的溫度慢慢＿＿了。', img: 'thermometer-down.png', options: ['降低', '記錄', '拍攝', '不斷'] },
      { id: 'v-汙水', cloze: true, clozeOptions: ['汙水', '清水', '果汁', '牛奶'], word: '汙水', meaning: '髒髒的、不能喝的液體。', example: '工廠把＿＿倒進河裡，魚都死光了。', img: 'dirty-river.png', options: ['汙水', '血液', '山巒', '臍帶'] },
      { id: 'v-不斷', cloze: true, clozeOptions: ['不斷', '偶爾', '很少', '從不'], word: '不斷', meaning: '一直都沒有停。', example: '表演好好笑，臺下的笑聲＿＿。', img: 'laugh-crowd.png', options: ['不斷', '似乎', '降低', '記錄'] },
      { id: 'v-鏟子', cloze: true, clozeOptions: ['鏟子', '杯子', '梳子', '筷子'], word: '鏟子', meaning: '扁扁的工具，用來挖土或翻東西。', example: '我拿著小＿＿，在沙灘上挖了一個洞。', img: 'sand-shovel.png', options: ['鏟子', '檳榔', '德國', '縱谷'] },
      { id: 'v-無聲無息', cloze: true, clozeOptions: ['無聲無息', '吵吵鬧鬧', '大聲喧譁', '叮叮咚咚'], word: '無聲無息', meaning: '安安靜靜，一點動靜也沒有。', example: '雪花在夜裡＿＿＿＿的落下來。', img: 'snow-night.png', options: ['無聲無息', '腳踏實地', '子子孫孫', '林立'] },
      { id: 'v-林立', cloze: true, clozeOptions: ['林立', '倒塌', '消失', '空曠'], word: '林立', meaning: '像樹木一樣，很多東西密密的站在一起。', example: '這條街上商店＿＿，什麼都買得到。', img: 'city-towers.png', options: ['林立', '殘破', '哀愁', '似乎'] },
      { id: 'v-子子孫孫', cloze: true, clozeOptions: ['子子孫孫', '左鄰右舍', '同班同學', '外國客人'], word: '子子孫孫', meaning: '一代又一代，以後出生的小孩和他們的小孩。', example: '爺爺種下這棵樹，希望＿＿＿＿都能在樹下乘涼。', img: 'family-tree-shade.png', options: ['子子孫孫', '無聲無息', '腳踏實地', '人禍'] },
      { id: 'v-腳踏實地', cloze: true, clozeOptions: ['腳踏實地', '好吃懶做', '只想不做', '馬馬虎虎'], word: '腳踏實地', meaning: '一步一步、認認真真的做事。', example: '想要成功，就要＿＿＿＿，不能只想不做。', img: 'step-by-step.png', options: ['腳踏實地', '無聲無息', '子子孫孫', '林立'] }
    ],
    /* 生字語詞：每個生字再學一個課本以外、孩子聽得懂的語詞 */
    charwords: [
      { id: 'cw-德', char: '德', img: 'kind-help.png', charMeaning: '好的品行。', word: '品德', meaning: '一個人做人做事好不好的樣子。', example: '他誠實又有禮貌，＿＿很好。', options: ['品德', '幾乎', '流血', '攝影'] },
      { id: 'cw-乎', char: '乎', img: 'almost-full.png', charMeaning: '放在別的字後面，常說「幾乎」、「似乎」。', word: '幾乎', meaning: '差一點點就到了、差不多全部。', example: '這次考試＿＿全班都考了一百分。', options: ['幾乎', '品德', '錄音', '車禍'] },
      { id: 'cw-血', char: '血', img: 'band-aid.png', charMeaning: '身體裡紅紅的液體。', word: '流血', meaning: '受傷了，血流出來。', example: '手指被紙割到，＿＿了。', options: ['流血', '肚臍', '下降', '鍋鏟'] },
      { id: 'cw-攝', char: '攝', img: 'camera.png', charMeaning: '用相機把東西拍下來。', word: '攝影', meaning: '用相機照相、拍影片。', example: '姐姐最喜歡拿相機到公園＿＿。', options: ['攝影', '錄音', '幾乎', '縱隊'] },
      { id: 'cw-颱', char: '颱', img: 'typhoon.png', charMeaning: '颱風，很大的暴風雨。', word: '防颱', meaning: '颱風來以前做好準備，保護大家的安全。', example: '颱風要來了，爸爸在窗戶貼上膠帶＿＿。', options: ['防颱', '品德', '汙染', '殘缺'] },
      { id: 'cw-錄', char: '錄', img: 'record-voice.png', charMeaning: '把聲音或事情留下來。', word: '錄音', meaning: '用機器把聲音錄下來，以後可以再聽。', example: '我把唱的歌＿＿下來，送給奶奶聽。', options: ['錄音', '攝影', '流血', '切斷'] },
      { id: 'cw-哀', char: '哀', img: 'sad-boy.png', charMeaning: '傷心。', word: '悲哀', meaning: '非常傷心、難過。', example: '聽到好朋友要搬家，我覺得好＿＿。', options: ['悲哀', '品德', '下降', '榔頭'] },
      { id: 'cw-巒', char: '巒', img: 'mountains.png', charMeaning: '連在一起的山。', word: '峰巒', meaning: '一座一座的山峰。', example: '雲霧飄過遠方的＿＿，好像一幅畫。', options: ['峰巒', '縱隊', '肚臍', '車禍'] },
      { id: 'cw-縱', char: '縱', img: 'line-up-long.png', charMeaning: '從前面到後面、直直的。', word: '縱隊', meaning: '一個接一個，從前排到後的長長隊伍。', example: '大家排成一路＿＿，一個接一個走進教室。', options: ['縱隊', '峰巒', '錄音', '防颱'] },
      { id: 'cw-臍', char: '臍', img: 'belly.png', charMeaning: '肚子中間的小洞。', word: '肚臍', meaning: '肚子中間那個小小的凹洞。', example: '小寶寶的＿＿圓圓的，好可愛。', options: ['肚臍', '流血', '鍋鏟', '品德'] },
      { id: 'cw-禍', char: '禍', img: 'car-crash.png', charMeaning: '壞事、災難。', word: '車禍', meaning: '車子撞到東西或人，發生的意外。', example: '騎腳踏車要戴安全帽，萬一發生＿＿才能保護頭。', options: ['車禍', '殘缺', '汙染', '幾乎'] },
      { id: 'cw-殘', char: '殘', img: 'broken-toy.png', charMeaning: '壞掉、不完整。', word: '殘缺', meaning: '少了一部分，不完整。', example: '這個玩具少了一個輪子，有點＿＿。', options: ['殘缺', '車禍', '下降', '攝影'] },
      { id: 'cw-檳', char: '檳', img: 'betel-tree.png', charMeaning: '檳榔樹的檳。', word: '檳榔樹', meaning: '長得又高又直、像椰子樹的一種樹。', example: '山坡上種滿了一排排的＿＿＿。', options: ['檳榔樹', '榔頭', '峰巒', '縱隊'] },
      { id: 'cw-榔', char: '榔', img: 'hammer.png', charMeaning: '檳榔的榔；榔頭的榔。', word: '榔頭', meaning: '用來敲釘子的工具，又叫鐵鎚。', example: '木匠用＿＿把釘子敲進木頭裡。', options: ['榔頭', '鍋鏟', '錄音', '肚臍'] },
      { id: 'cw-降', char: '降', img: 'plane-landing.png', charMeaning: '從高的地方往下。', word: '下降', meaning: '從高處往下掉、往下走。', example: '晚上的氣溫＿＿了，記得多穿一件衣服。', options: ['下降', '切斷', '汙染', '品德'] },
      { id: 'cw-鏟', char: '鏟', img: 'spatula.png', charMeaning: '扁扁的、用來挖或翻的工具。', word: '鍋鏟', meaning: '炒菜時用來翻菜的扁扁工具。', example: '媽媽拿著＿＿，在鍋子裡翻炒青菜。', options: ['鍋鏟', '榔頭', '防颱', '幾乎'] },
      { id: 'cw-汙', char: '汙', img: 'dirty-river.png', charMeaning: '髒髒的。', word: '汙染', meaning: '把乾淨的水、空氣或土地弄髒。', example: '亂丟垃圾會＿＿我們的環境。', options: ['汙染', '殘缺', '車禍', '峰巒'] },
      { id: 'cw-斷', char: '斷', img: 'cut-rope.png', charMeaning: '分開、斷開。', word: '切斷', meaning: '把東西分開成兩段。', example: '工人不小心＿＿了電線，整條街都停電了。', options: ['切斷', '下降', '攝影', '悲哀'] }
    ],
    /* 生字變成語：課本延伸成語，解釋和例句改成孩子聽得懂的話 */
    idioms: [
      { id: 'i-德高望重', situationImg: 'id-respect-elder.png',
        anim: { bg: 'park', a: { gp: ['👴', 50, 62, 13], k1: ['🧒', 22, 66, 10], k2: ['👧', 78, 66, 10], book: ['📖', 64, 50, 8, 'h'], heart: ['💖', 50, 22, 10, 'h'], star: ['🌟', 30, 24, 9, 'h'] },
          s: [['村子裡有一位老爺爺。', [['bob', 'gp']]],
            ['他很有學問，又常常幫助別人，', [['in', 'book'], ['in', 'star']]],
            ['大家有問題，都來問他的意見。', [['mv', 'k1', [36, 66, 900]], ['mv', 'k2', [66, 66, 900]], ['bow', 'k1'], ['bow', 'k2']]],
            ['品德好、名聲好，大家都很尊敬他。', [['in', 'heart'], ['pop', 'heart']]]] },
        idiom: '德高望重', char: '德', meaning: '品德很好，大家都很尊敬他。', example: '這位老校長德高望重，鎮上的人都很尊敬他。', situation: '村子裡的老爺爺很有學問，又常常幫助別人，大家有困難都去請教他。',
        fill: { options: ['老醫生行醫五十年，＿＿＿＿，大家都很尊敬他。', '他常常說謊、欺負別人，真是＿＿＿＿。'], clue: '提示：哪一句是品德好、大家都尊敬他？', explain: '第一句用得對：老醫生幫助很多人，大家尊敬他。說謊欺負人，就不會被尊敬。' } },
      { id: 'i-微乎其微', situationImg: 'id-tiny-chance.png',
        anim: { bg: 'sky', a: { cloud: ['☁️', 50, 20, 18], drop: ['💧', 50, 34, 4, 'h'], sun: ['☀️', 84, 16, 12], mag: ['🔍', 64, 44, 12, 'h'], ant: ['🐜', 50, 80, 4, 'h'] },
          s: [['天空只飄來一小片雲，', [['bob', 'cloud']]],
            ['只滴下一滴小小的雨，', [['in', 'drop'], ['mv', 'drop', [50, 80, 1000]], ['out', 'drop']]],
            ['小到要用放大鏡才看得到，', [['in', 'mag'], ['in', 'ant'], ['wig', 'mag']]],
            ['少到幾乎等於沒有。', [['pop', 'sun']]]] },
        idiom: '微乎其微', char: '乎', meaning: '非常非常少、非常非常小，幾乎沒有。', example: '天氣這麼晴朗，會下雨的機會微乎其微。', situation: '天空只有一小片雲，滴下一滴小小的雨，少到幾乎感覺不到。',
        fill: { options: ['沒有練習就想拿冠軍，機會＿＿＿＿。', '他每天認真練習，進步得很多，真是＿＿＿＿。'], clue: '提示：哪一句是非常非常少、幾乎沒有？', explain: '第一句用得對：沒練習，拿冠軍的機會幾乎沒有。進步很多，就不是很少很少。' } },
      { id: 'i-哀鴻遍野', situationImg: 'id-flood-birds.png',
        anim: { bg: 'farm', a: { rain: ['🌧️', 50, 14, 16], water: ['🌊', 50, 76, 26, 'h'], b1: ['🐦', 20, 40, 8], b2: ['🐦', 76, 46, 8], b3: ['🐦', 48, 30, 8], cry: ['💧', 30, 30, 7, 'h'], tent: ['⛺', 82, 70, 12, 'h'] },
          s: [['大雨一直下，洪水淹沒了田野。', [['bob', 'rain'], ['in', 'water']]],
            ['小鳥找不到家，到處飛來飛去，', [['mv', 'b1', [40, 24, 1000]], ['mv', 'b2', [60, 30, 1000]], ['wig', 'b3']]],
            ['到處都聽得到哀傷的叫聲。', [['in', 'cry'], ['shake', 'b1'], ['shake', 'b2']]],
            ['很多人也沒有家可以住，好可憐。', [['in', 'tent']]]] },
        idiom: '哀鴻遍野', char: '哀', meaning: '到處都是沒有家、很可憐的人。', example: '大地震以後，災區哀鴻遍野，大家都趕去幫忙。', situation: '大洪水淹沒了村莊，到處都是失去家園、哀傷哭泣的人。',
        fill: { options: ['大水災以後，災區＿＿＿＿，很多人沒地方住。', '過年的時候，家家戶戶開開心心，＿＿＿＿。'], clue: '提示：哪一句是到處都是可憐、沒有家的人？', explain: '第一句用得對：水災後很多人沒家可住。過年開開心心，剛好相反。' } },
      { id: 'i-抱殘守缺', situationImg: 'id-old-phone.png',
        anim: { bg: 'room', a: { man: ['👨', 26, 62, 13], old: ['☎️', 40, 52, 10], newp: ['📱', 74, 46, 10, 'h'], spark: ['✨', 82, 30, 8, 'h'], no: ['🚫', 74, 46, 13, 'h'] },
          s: [['叔叔的舊電話壞了一半，常常聽不清楚。', [['shake', 'old']]],
            ['大家拿來一支又好用又方便的新手機，', [['in', 'newp'], ['in', 'spark']]],
            ['可是叔叔說：「我只要用舊的！」', [['in', 'no']]],
            ['只守著舊東西，不肯改變。', [['mv', 'old', [36, 56, 600]], ['bob', 'old']]]] },
        idiom: '抱殘守缺', char: '殘', meaning: '只守著舊的、壞掉的東西或想法，不肯改變。', example: '時代一直在進步，我們不能抱殘守缺。', situation: '叔叔的舊電話壞了一半，大家拿新手機給他，他還是只肯用舊的。',
        fill: { options: ['有了更好的方法，他還是只肯用老辦法，真是＿＿＿＿。', '他很願意學習新東西，一點也不＿＿＿＿。'], clue: '提示：哪一句是只守著舊的，不肯改變？', explain: '第一句用得對：有更好的方法還不改，就是抱殘守缺。願意學新東西，剛好相反。' } },
      { id: 'i-同流合汙', situationImg: 'id-refuse-bad.png',
        anim: { bg: 'school', a: { b1: ['👦', 60, 64, 11], b2: ['🧑', 76, 64, 11], kid: ['🧒', 24, 64, 11], paint: ['🖍️', 68, 40, 8], wall: ['🧱', 86, 36, 12], no: ['🙅', 24, 30, 9, 'h'], ok: ['✅', 24, 30, 9, 'h'] },
          s: [['有兩個人在牆上亂塗鴉，', [['wig', 'paint']]],
            ['他們叫小明一起來畫，', [['mv', 'kid', [40, 64, 800]]]],
            ['小明搖搖頭：「做壞事，我才不要！」', [['mv', 'kid', [24, 64, 800]], ['in', 'no']]],
            ['跟著壞人一起做壞事，就叫同流合汙。', [['out', 'no'], ['in', 'ok']]]] },
        idiom: '同流合汙', char: '汙', meaning: '跟著壞人一起做壞事。', example: '他堅持做對的事，從不和做壞事的人同流合汙。', situation: '兩個人在牆上亂塗鴉，叫小明一起畫，小明拒絕，不跟他們一起做壞事。',
        fill: { options: ['他們要去偷摘水果，我不想跟他們＿＿＿＿。', '大家一起打掃教室，真是＿＿＿＿。'], clue: '提示：哪一句是跟著別人一起做壞事？', explain: '第一句用得對：偷摘水果是壞事，不跟他們一起做。一起打掃是好事，不是同流合汙。' } },
      { id: 'i-當機立斷', situationImg: 'id-quick-decide.png',
        anim: { bg: 'park', a: { cloud: ['⛈️', 70, 16, 16], lead: ['🧑', 40, 62, 12], flag: ['🚩', 20, 40, 10], idea: ['❗', 40, 22, 10, 'h'], arrow: ['↩️', 60, 40, 10, 'h'], ok: ['✅', 80, 60, 10, 'h'] },
          s: [['大家正在爬山，烏雲突然飄過來，', [['bob', 'cloud']]],
            ['隊長馬上想到：「要下大雨了！」', [['in', 'idea'], ['pop', 'idea']]],
            ['他一點也不猶豫，立刻決定下山，', [['out', 'idea'], ['in', 'arrow'], ['mv', 'lead', [76, 62, 1000]]]],
            ['大家都平安回來了！', [['in', 'ok']]]] },
        idiom: '當機立斷', char: '斷', meaning: '在要緊的時候，馬上做出決定，一點也不猶豫。', example: '看到小朋友跌進水裡，救生員當機立斷，馬上跳下去救人。', situation: '爬山時天氣突然變壞，隊長馬上決定帶大家下山，大家都平安回家。',
        fill: { options: ['看到煙冒出來，老師＿＿＿＿，馬上帶大家離開教室。', '他想了一整個星期，還是決定不了，一點也不＿＿＿＿。'], clue: '提示：哪一句是馬上做出決定？', explain: '第一句用得對：看到煙馬上決定離開。想了一星期還決定不了，就不是當機立斷。' } }
    ],
    /* 改錯字：sentence 是正確的句子，畫面上會把 char 換成 wrong；options 的第一個是正確的字。clue 只說語詞的意思，不能出現正確的字。 */
    fix: [
      { id: 'fx-德', char: '德', wrong: '得', sentence: '他的品德很好，常常幫助同學。', options: ['德', '得', '聽'], clue: '這裡是說一個人做人的樣子，想一想，哪一個字右邊下面有「心」？', explain: '要改成「德」。做人的樣子是「品德」；「得」是得到的得。' },
      { id: 'fx-乎', char: '乎', wrong: '平', sentence: '杯子裡的水幾乎滿出來了。', options: ['乎', '平', '呼'], clue: '這裡是說差不多、差一點點，想一想，哪一個字上面有一撇？', explain: '要改成「乎」。差一點點是「幾乎」；「平」是平地的平。' },
      { id: 'fx-血', char: '血', wrong: '皿', sentence: '弟弟跌倒，膝蓋流血了。', options: ['血', '皿', '而'], clue: '這裡是說受傷流出紅紅的東西，想一想，哪一個字比盤子多一撇？', explain: '要改成「血」。受傷流出來的是「血」；「皿」是盤子、碗。' },
      { id: 'fx-攝', char: '攝', wrong: '懾', sentence: '爸爸用相機攝影，拍下我們的笑容。', options: ['攝', '懾', '聶'], clue: '這裡是說用相機拍照，想一想，哪一個字有提手旁？', explain: '要改成「攝」。用相機拍照是「攝影」，有提手旁。' },
      { id: 'fx-颱', char: '颱', wrong: '抬', sentence: '颱風快來了，大家要做好準備。', options: ['颱', '抬', '台'], clue: '這裡說的是又大又強的暴風雨，想一想，哪一個字的左邊是「風」？', explain: '要改成「颱」。大暴風雨是「颱風」；「抬」是抬頭的抬。' },
      { id: 'fx-錄', char: '錄', wrong: '綠', sentence: '我用手機把老師講的故事錄下來。', options: ['錄', '綠', '碌'], clue: '這裡是說把聲音留下來，想一想，哪一個字有金字旁？', explain: '要改成「錄」。把聲音留下來是「錄」；「綠」是綠色的綠。' },
      { id: 'fx-哀', char: '哀', wrong: '衷', sentence: '小狗走丟了，妹妹好悲哀。', options: ['哀', '衷', '衰'], clue: '這裡是說非常傷心，想一想，哪一個字的中間是「口」？', explain: '要改成「哀」。非常傷心是「悲哀」；「衷」的中間是「中」。' },
      { id: 'fx-巒', char: '巒', wrong: '戀', sentence: '遠方的峰巒一座接著一座。', options: ['巒', '戀', '彎'], clue: '這裡說的是連在一起的山，想一想，哪一個字的下面是「山」？', explain: '要改成「巒」。連在一起的山是「峰巒」；「戀」的下面是心。' },
      { id: 'fx-縱', char: '縱', wrong: '從', sentence: '同學們排成兩路縱隊走進禮堂。', options: ['縱', '從', '蹤'], clue: '這裡說的是從前面排到後面的長隊伍，想一想，哪一個字有糸字旁？', explain: '要改成「縱」。前後排的長隊伍是「縱隊」；「從」沒有糸字旁。' },
      { id: 'fx-臍', char: '臍', wrong: '擠', sentence: '弟弟掀起衣服，露出圓圓的肚臍。', options: ['臍', '擠', '濟'], clue: '這裡說的是肚子中間的小洞，想一想，哪一個字有肉字旁？', explain: '要改成「臍」。肚子中間的小洞是「肚臍」；「擠」是擁擠的擠。' },
      { id: 'fx-禍', char: '禍', wrong: '鍋', sentence: '過馬路要小心，才不會發生車禍。', options: ['禍', '鍋', '蝸'], clue: '這裡說的是車子撞到的意外，想一想，哪一個字有示字旁？', explain: '要改成「禍」。車子撞到的意外是「車禍」；「鍋」是煮飯的鍋。' },
      { id: 'fx-殘', char: '殘', wrong: '錢', sentence: '這本舊書少了幾頁，已經殘缺不全。', options: ['殘', '錢', '踐'], clue: '這裡是說少了一部分、不完整，想一想，哪一個字有歹字旁？', explain: '要改成「殘」。不完整是「殘缺」；「錢」是金錢的錢。' },
      { id: 'fx-檳', char: '檳', wrong: '濱', sentence: '路邊有一排高高的檳榔樹。', options: ['檳', '濱', '賓'], clue: '這裡說的是一種又高又直的樹，想一想，哪一個字有木字旁？', explain: '要改成「檳」。這是一種樹，有木字旁；「濱」是海濱的濱。' },
      { id: 'fx-榔', char: '榔', wrong: '廊', sentence: '爸爸拿起榔頭，把釘子敲進木板。', options: ['榔', '廊', '朗'], clue: '這裡說的是敲釘子的工具，想一想，哪一個字有木字旁？', explain: '要改成「榔」。敲釘子的工具是「榔頭」；「廊」是走廊的廊。' },
      { id: 'fx-降', char: '降', wrong: '隆', sentence: '飛機慢慢下降，停在機場。', options: ['降', '隆', '絳'], clue: '這裡是說從高處往下，想一想，哪一個字的右邊像兩隻往下走的腳？', explain: '要改成「降」。往下是「下降」；「隆」是隆起的隆。' },
      { id: 'fx-鏟', char: '鏟', wrong: '產', sentence: '媽媽拿著鍋鏟炒青菜。', options: ['鏟', '產', '鏈'], clue: '這裡說的是炒菜的工具，想一想，哪一個字有金字旁？', explain: '要改成「鏟」。炒菜的工具是「鍋鏟」；「產」是生產的產。' },
      { id: 'fx-汙', char: '汙', wrong: '汗', sentence: '工廠的髒水汙染了河流。', options: ['汙', '汗', '江'], clue: '這裡是說把乾淨的東西弄髒，想一想，哪一個字的右邊是「于」？', explain: '要改成「汙」。弄髒是「汙染」；「汗」是流汗的汗。' },
      { id: 'fx-斷', char: '斷', wrong: '繼', sentence: '剪刀一剪，繩子就斷了。', options: ['斷', '繼', '新'], clue: '這裡是說繩子分成兩段，想一想，哪一個字的右邊是「斤」？', explain: '要改成「斷」。繩子分開是「斷」；「繼」是繼續的繼。' }
    ],
    similar: [
      { id: 's1', meaning: '「＿地」是沒有高低起伏的地。', sentence: '這一片＿地很適合踢足球。', frame: '＿地', options: ['平', '乎'], answer: '平', clue: '提示：這個字上面沒有一撇。', explain: '答案是「平」；「乎」是幾乎的乎，上面多一撇。' },
      { id: 's2', meaning: '「＿色」是像樹葉一樣的顏色。', sentence: '春天到了，樹上長出＿色的新葉。', frame: '＿色', options: ['綠', '錄'], answer: '綠', clue: '提示：這個字和絲線、顏色有關，左邊是糸字旁。', explain: '答案是「綠」；「錄」是錄音的錄，有金字旁。' },
      { id: 's3', meaning: '「忙＿」是事情很多、一直在忙。', sentence: '媽媽每天都很忙＿，又要上班又要煮飯。', frame: '忙＿', options: ['碌', '錄'], answer: '碌', clue: '提示：這個字的左邊是石字旁。', explain: '答案是「碌」；「錄」是記錄的錄。' },
      { id: 's4', meaning: '「由＿」是真心的、從心裡出來的。', sentence: '我由＿的謝謝幫助我的人。', frame: '由＿', options: ['衷', '哀'], answer: '衷', clue: '提示：這個字的中間是「中」。', explain: '答案是「衷」；「哀」是悲哀的哀，中間是「口」。' },
      { id: 's5', meaning: '「＿老」是年紀大、身體變弱。', sentence: '爺爺年紀大了，身體慢慢＿老。', frame: '＿老', options: ['衰', '哀'], answer: '衰', clue: '提示：這個字的中間不是「口」。', explain: '答案是「衰」；「哀」是悲哀的哀。' },
      { id: 's6', meaning: '「擁＿」是人很多、靠得緊緊的。', sentence: '下班時間，捷運上好擁＿。', frame: '擁＿', options: ['擠', '臍'], answer: '擠', clue: '提示：要用手推來推去，這個字有提手旁。', explain: '答案是「擠」；「臍」是肚臍的臍，有肉字旁。' },
      { id: 's7', meaning: '「＿子」是煮飯、煮湯的器具。', sentence: '奶奶用大＿子煮了一鍋湯。', frame: '＿子', options: ['鍋', '禍'], answer: '鍋', clue: '提示：這是金屬做的，左邊是金字旁。', explain: '答案是「鍋」；「禍」是車禍的禍，有示字旁。' },
      { id: 's8', meaning: '「＿牛」是背著殼、慢慢爬的小動物。', sentence: '下雨後，葉子上爬出一隻＿牛。', frame: '＿牛', options: ['蝸', '禍'], answer: '蝸', clue: '提示：這是一種小動物，左邊是虫字旁。', explain: '答案是「蝸」；「禍」是車禍的禍。' },
      { id: 's9', meaning: '「實＿」是說到就去做。', sentence: '說要做環保，就要真的去實＿。', frame: '實＿', options: ['踐', '殘'], answer: '踐', clue: '提示：要用腳去做，左邊是足字旁。', explain: '答案是「踐」；「殘」是殘缺的殘，有歹字旁。' },
      { id: 's10', meaning: '「海＿」是靠近大海的地方。', sentence: '我們住在海＿，每天都聽得到海浪聲。', frame: '海＿', options: ['濱', '檳'], answer: '濱', clue: '提示：靠近海水，左邊是三點水。', explain: '答案是「濱」；「檳」是檳榔的檳，有木字旁。' },
      { id: 's11', meaning: '「流＿」是天氣熱或運動後，身上流出的水。', sentence: '跑完步，我全身都是＿水。', frame: '＿水', options: ['汗', '汙'], answer: '汗', clue: '提示：這個字的右邊是「干」。', explain: '答案是「汗」；「汙」是汙水的汙，右邊是「于」。' },
      { id: 's12', meaning: '「＿續」是不要停，一直做下去。', sentence: '休息一下，我們再＿續寫功課。', frame: '＿續', options: ['繼', '斷'], answer: '繼', clue: '提示：這個字的左邊是糸字旁。', explain: '答案是「繼」；「斷」是切斷的斷，意思相反。' }
    ],
    listen: [
      { id: 'l1', text: '夏天常常來、又大又強的暴風雨。', answer: 0, options: [{ text: '颱風', img: 'typhoon.png' }, { text: '山巒', img: 'mountains.png' }, { text: '汙水', img: 'dirty-river.png' }, { text: '縱谷', img: 'valley.png' }] },
      { id: 'l2', text: '一座接著一座、連在一起的山。', answer: 0, options: [{ text: '山巒', img: 'mountains.png' }, { text: '縱谷', img: 'valley.png' }, { text: '颱風', img: 'typhoon.png' }, { text: '林立', img: 'city-towers.png' }] },
      { id: 'l3', text: '用攝影機把看到的東西錄下來。', answer: 0, options: [{ text: '拍攝', img: 'camera.png' }, { text: '記錄', img: 'bean-notes.png' }, { text: '降低', img: 'thermometer-down.png' }, { text: '不斷', img: 'laugh-crowd.png' }] },
      { id: 'l4', text: '髒髒的、不能喝的水。', answer: 0, options: [{ text: '汙水', img: 'dirty-river.png' }, { text: '血液', img: 'heart-pump.png' }, { text: '臍帶', img: 'mom-baby.png' }, { text: '檳榔', img: 'betel-tree.png' }] },
      { id: 'l5', text: '開了冷氣，溫度從高變低。', answer: 0, options: [{ text: '降低', img: 'thermometer-down.png' }, { text: '記錄', img: 'bean-notes.png' }, { text: '拍攝', img: 'camera.png' }, { text: '似乎', img: 'cloudy-sky.png' }] },
      { id: 'l6', text: '雪花在夜裡安安靜靜的落下，一點聲音也沒有。', answer: 0, options: [{ text: '無聲無息', img: 'snow-night.png' }, { text: '腳踏實地', img: 'step-by-step.png' }, { text: '林立', img: 'city-towers.png' }, { text: '子子孫孫', img: 'family-tree-shade.png' }] },
      { id: 'l7', text: '街上的高樓好多好多，像樹林一樣站在一起。', answer: 0, options: [{ text: '林立', img: 'city-towers.png' }, { text: '殘破', img: 'broken-sign.png' }, { text: '山巒', img: 'mountains.png' }, { text: '無聲無息', img: 'snow-night.png' }] },
      { id: 'l8', text: '一步一步、實實在在的認真做事。', answer: 0, options: [{ text: '腳踏實地', img: 'step-by-step.png' }, { text: '無聲無息', img: 'snow-night.png' }, { text: '子子孫孫', img: 'family-tree-shade.png' }, { text: '不斷', img: 'laugh-crowd.png' }] }
    ],
    /* ---------- 短語、句型、修辭（句子都是 Claude 自己寫的） ---------- */
    phrase: {
      /* 拼短語每一格下面寫要放什麼樣的詞 */
      fillLabels: { before: '', answer: '疊字', noun: '什麼東西' },
      pickName: '看圖選一選', pickSay: '看圖，選出最適合的疊字，說說看是什麼樣的東西。',
      /* 短語：疊字＋的＋名詞（課本的例子是課文原句，這裡換成自己寫的） */
      intro: { example: '甜甜的笑容', img: 'pr-sweet-smile.png',
        parts: [{ text: '甜甜', role: '疊字' }, { text: '的' }, { text: '笑容', role: '什麼東西' }],
        explain: '先用兩個一樣的字說出感覺，加上「的」，最後說是什麼東西。' },
      pick: [
        { id: 'ph1', img: 'pr-warm-sun.png', before: '', noun: '陽光', ask: '什麼樣的陽光', look: '再看看圖片，冬天曬太陽是什麼感覺？', options: ['暖暖', '冰冰', '黑黑', '吵吵'], clue: '提示：冬天曬著太陽，身體很舒服、熱熱的。', explain: '答案是「暖暖」，完整的短語是「暖暖的陽光」。' },
        { id: 'ph2', img: 'pr-cold-ice.png', before: '', noun: '冰塊', ask: '什麼樣的冰塊', look: '再看看圖片，摸到冰塊是什麼感覺？', options: ['涼涼', '燙燙', '軟軟', '香香'], clue: '提示：放在手心，好冷好冷。', explain: '答案是「涼涼」，完整的短語是「涼涼的冰塊」。' },
        { id: 'ph3', img: 'pr-soft-cloud.png', before: '', noun: '棉花糖', ask: '什麼樣的棉花糖', look: '再看看圖片，棉花糖摸起來怎麼樣？', options: ['軟軟', '硬硬', '尖尖', '苦苦'], clue: '提示：一捏就扁下去，好像雲朵。', explain: '答案是「軟軟」，完整的短語是「軟軟的棉花糖」。' },
        { id: 'ph4', img: 'pr-long-road.png', before: '', noun: '小路', ask: '什麼樣的小路', look: '再看看圖片，這條路走得完嗎？', options: ['長長', '圓圓', '甜甜', '亮亮'], clue: '提示：一直延伸到很遠很遠的地方。', explain: '答案是「長長」，完整的短語是「長長的小路」。' },
        { id: 'ph5', img: 'pr-red-apple.png', before: '', noun: '蘋果', ask: '什麼樣的蘋果', look: '再看看圖片，蘋果是什麼顏色？', options: ['紅紅', '藍藍', '黑黑', '灰灰'], clue: '提示：熟透了，顏色像消防車一樣。', explain: '答案是「紅紅」，完整的短語是「紅紅的蘋果」。' },
        { id: 'ph6', img: 'pr-fragrant-bread.png', before: '', noun: '麵包', ask: '什麼樣的麵包', look: '再看看圖片，剛烤好的麵包聞起來怎麼樣？', options: ['香香', '臭臭', '冰冰', '苦苦'], clue: '提示：還沒吃，鼻子就聞到好聞的味道。', explain: '答案是「香香」，完整的短語是「香香的麵包」。' },
        { id: 'ph7', img: 'pr-light-feather.png', before: '', noun: '羽毛', ask: '什麼樣的羽毛', look: '再看看圖片，羽毛會不會被風吹起來？', options: ['輕輕', '重重', '厚厚', '黏黏'], clue: '提示：吹一口氣，它就飄起來了。', explain: '答案是「輕輕」，完整的短語是「輕輕的羽毛」。' },
        { id: 'ph8', img: 'pr-quiet-night.png', before: '', noun: '夜晚', ask: '什麼樣的夜晚', look: '再看看圖片，晚上的森林有沒有聲音？', options: ['靜靜', '吵吵', '熱熱', '酸酸'], clue: '提示：大家都睡著了，一點聲音也沒有。', explain: '答案是「靜靜」，完整的短語是「靜靜的夜晚」。' }
      ],
      say: [],
      words: [
        { word: '無聲無息', meaning: '安安靜靜，一點動靜也沒有。', img: 'snow-night.png' },
        { word: '林立', meaning: '像樹林一樣，很多東西密密的站在一起。', img: 'city-towers.png' },
        { word: '子子孫孫', meaning: '一代又一代，以後的小孩和他們的小孩。', img: 'family-tree-shade.png' },
        { word: '腳踏實地', meaning: '一步一步、實實在在的認真做事。', img: 'step-by-step.png' }
      ],
      choose: [
        { id: 'pw1', word: '無聲無息', options: ['小貓無聲無息的走到我後面，嚇了我一跳。', '樂隊無聲無息的打鼓，吵得大家睡不著。'], clue: '提示：想一想，「無聲無息」是很安靜，還是很吵？', explain: '第一句用得對：小貓走路很安靜。打鼓吵得睡不著，就不是無聲無息。' },
        { id: 'pw2', word: '林立', options: ['市中心大樓林立，抬頭都看不到天空。', '這片草原上只有一棵樹，真是林立。'], clue: '提示：想一想，「林立」是很多，還是只有一個？', explain: '第一句用得對：高樓很多、密密的站著。只有一棵樹，就不是林立。' },
        { id: 'pw3', word: '子子孫孫', options: ['我們要保護地球，留給子子孫孫一個美麗的家。', '我昨天和子子孫孫一起去買早餐。'], clue: '提示：想一想，「子子孫孫」說的是以後一代又一代的人，還是一起去買早餐的人？', explain: '第一句用得對：保護地球，是為了以後的人。一起買早餐的人，不會說子子孫孫。' },
        { id: 'pw4', word: '腳踏實地', options: ['他腳踏實地，每天練習一點，終於學會了游泳。', '他整天只想著要成功，什麼都不做，真是腳踏實地。'], clue: '提示：想一想，「腳踏實地」是一步步認真做，還是只想不做？', explain: '第一句用得對：每天練習一點，一步步學會。只想不做，剛好相反。' }
      ],
      make: [
        { id: 'pm1', word: '無聲無息', clue: '提示：想想看，有什麼東西安安靜靜的就出現或不見了？', model: '下課時，我的鉛筆無聲無息的滾到桌子底下。' },
        { id: 'pm2', word: '林立', clue: '提示：想想看，哪裡有很多東西密密的站在一起？', model: '夜市裡攤販林立，好熱鬧。' },
        { id: 'pm3', word: '子子孫孫', clue: '提示：想想看，你想留什麼給以後的人？', model: '我們要愛護山林，讓子子孫孫都看得到綠色的大地。' },
        { id: 'pm4', word: '腳踏實地', clue: '提示：想想看，你想學會什麼？要怎麼一步一步做？', model: '我腳踏實地的每天背十個英文單字。' }
      ]
    },
    pattern: [
      { key: 'yuanbendan', id: 'yd', title: '原本……但……', img: 'yuanbendan.png',
        meaning: '先用「原本」說本來的想法或打算，再用「但」說後來發生了不一樣的事。',
        examples: ['原本我想去公園玩，但外面下起大雨，只好待在家裡。'],
        match: [
          { id: 'pt-yd-m1', img: 'pt-rain-picnic.png', front: '我們原本要去野餐，', options: ['但突然下起大雨。', '但我變成一隻鳥。', '但月亮掉下來。'], clue: '提示：看看圖片，天氣怎麼了？', explain: '答案是「但突然下起大雨」：本來要野餐，後來下雨了，跟打算的不一樣。' },
          { id: 'pt-yd-m2', img: 'pt-full-shelf.png', front: '我原本想買那本書，', options: ['但書已經賣完了。', '但書會自己飛。', '但書是一頭大象。'], clue: '提示：看看圖片，書架上的書還有嗎？', explain: '答案是「但書已經賣完了」：想買，結果沒有了。' },
          { id: 'pt-yd-m3', img: 'pt-sick-bed.png', front: '弟弟原本要參加比賽，', options: ['但他發燒了。', '但他長高十公尺。', '但比賽在月球。'], clue: '提示：看看圖片，弟弟怎麼了？', explain: '答案是「但他發燒了」：本來要比賽，後來生病了。' }
        ],
        conj: [
          { id: 'pt-yd-c1', full: '原本天氣很好，但下午突然颳起大風。', img: 'pt-windy.png', sentence: '＿＿天氣很好，＿下午突然颳起大風。', options: ['原本……但……', '只有……才……', '為了……'], clue: '提示：本來天氣好，後來變了，前後不一樣。數數看有幾個空格。', explain: '答案是「原本……但……」：原本天氣很好，但下午突然颳起大風。' },
          { id: 'pt-yd-c2', full: '我原本以為題目很難，但其實很簡單。', img: 'pt-easy-test.png', sentence: '我＿＿以為題目很難，＿其實很簡單。', options: ['原本……但……', '只有……才……', '為了……'], clue: '提示：本來以為很難，後來發現很簡單。數數看有幾個空格。', explain: '答案是「原本……但……」：我原本以為題目很難，但其實很簡單。' }
        ],
        half: [
          { id: 'pt-yd-h1', front: '我原本想睡晚一點，', clue: '提示：後來發生了什麼事，讓你沒辦法睡晚？記得要說「但」。', model: '但鬧鐘一大早就響了。' },
          { id: 'pt-yd-h2', front: '原本這條河很乾淨，', clue: '提示：後來河變得怎麼樣了？記得要說「但」。', model: '但現在被垃圾弄髒了。' }
        ],
        whole: [
          { id: 'pt-yd-w1', clue: '提示：先用「原本」說你本來的打算，再用「但」說後來不一樣的事。想想看：有沒有計畫被改變的時候？', model: '原本我們要去海邊，但颱風來了，只好待在家裡。' }
        ] },
      { key: 'weile', id: 'wl', title: '為了……', img: 'weile.png',
        meaning: '先用「為了」說想做到的事，再說為了做到，要怎麼做。',
        examples: ['為了身體健康，我每天早上都去跑步。'],
        match: [
          { id: 'pt-wl-m1', img: 'pt-study-hard.png', front: '為了考出好成績，', options: ['我每天認真複習。', '我每天整天玩。', '我把書丟掉。'], clue: '提示：看看圖片，想考好要怎麼做？', explain: '答案是「我每天認真複習」：為了考好，要認真讀書。' },
          { id: 'pt-wl-m2', img: 'pt-save-water.png', front: '為了節省用水，', options: ['我刷牙時關上水龍頭。', '我讓水一直流。', '我每天洗十次澡。'], clue: '提示：看看圖片，怎麼做才不會浪費水？', explain: '答案是「我刷牙時關上水龍頭」：關水龍頭就能省水。' },
          { id: 'pt-wl-m3', img: 'pt-early-bird.png', front: '為了不遲到，', options: ['我早上提早出門。', '我睡到中午。', '我走得很慢。'], clue: '提示：看看圖片，怎麼做才能準時到？', explain: '答案是「我早上提早出門」：早點出門就不會遲到。' }
        ],
        conj: [
          { id: 'pt-wl-c1', full: '為了保護眼睛，我看書時會開燈。', img: 'pt-desk-lamp.png', sentence: '＿＿保護眼睛，我看書時會開燈。', options: ['為了……', '原本……但……', '只有……才……'], clue: '提示：先說想做到的事，再說怎麼做。數數看有幾個空格。', explain: '答案是「為了……」：為了保護眼睛，我看書時會開燈。' },
          { id: 'pt-wl-c2', full: '為了讓河流變乾淨，大家一起去撿垃圾。', img: 'pt-river-clean.png', sentence: '＿＿讓河流變乾淨，大家一起去撿垃圾。', options: ['為了……', '原本……但……', '只有……才……'], clue: '提示：先說想做到的事，再說大家怎麼做。數數看有幾個空格。', explain: '答案是「為了……」：為了讓河流變乾淨，大家一起去撿垃圾。' }
        ],
        half: [
          { id: 'pt-wl-h1', front: '為了買一雙新球鞋，', clue: '提示：要怎麼做才買得到？', model: '我每天把零用錢存起來。' },
          { id: 'pt-wl-h2', front: '為了讓小樹長大，', clue: '提示：要怎麼照顧小樹？', model: '我每天幫它澆水。' }
        ],
        whole: [
          { id: 'pt-wl-w1', clue: '提示：先用「為了」說你想做到的事，再說你要怎麼做。想想看：你想把什麼事做好？', model: '為了學會游泳，我每個星期都去游泳池練習。' }
        ] },
      { key: 'zhiyoucai', id: 'yc', title: '只有……才……', img: 'zhiyoucai.png',
        meaning: '先用「只有」說一定要做到的事，再用「才」說做到以後才會有的結果。',
        examples: ['只有認真練習，才能把字寫得漂亮。'],
        match: [
          { id: 'pt-yc-m1', img: 'pt-seed-water.png', front: '只有每天澆水，', options: ['種子才會發芽。', '種子才會唱歌。', '種子才會跑步。'], clue: '提示：看看圖片，種子喝了水會怎麼樣？', explain: '答案是「種子才會發芽」：一定要澆水，種子才長得出來。' },
          { id: 'pt-yc-m2', img: 'pt-key-door.png', front: '只有拿對鑰匙，', options: ['才開得了門。', '才會下雪。', '才吃得飽。'], clue: '提示：看看圖片，要用什麼開門？', explain: '答案是「才開得了門」：要用對的鑰匙才開得了門。' },
          { id: 'pt-yc-m3', img: 'pt-team-pull.png', front: '只有大家一起用力，', options: ['才拉得動這輛車。', '才會變成恐龍。', '才不用睡覺。'], clue: '提示：看看圖片，車子很重，要怎麼做？', explain: '答案是「才拉得動這輛車」：一起用力才拉得動。' }
        ],
        conj: [
          { id: 'pt-yc-c1', full: '只有愛護環境，地球才會越來越美。', img: 'pt-earth-love.png', sentence: '＿＿愛護環境，地球＿會越來越美。', options: ['只有……才……', '原本……但……', '為了……'], clue: '提示：一定要做到一件事，才會有好結果。數數看有幾個空格。', explain: '答案是「只有……才……」：只有愛護環境，地球才會越來越美。' },
          { id: 'pt-yc-c2', full: '只有吃飽飯，你才有力氣上體育課。', img: 'pt-eat-energy.png', sentence: '＿＿吃飽飯，你＿有力氣上體育課。', options: ['只有……才……', '原本……但……', '為了……'], clue: '提示：一定要先吃飽，才有力氣。數數看有幾個空格。', explain: '答案是「只有……才……」：只有吃飽飯，你才有力氣上體育課。' }
        ],
        half: [
          { id: 'pt-yc-h1', front: '只有好好睡覺，', clue: '提示：睡飽了會怎麼樣？記得要說「才」。', model: '明天才有精神上課。' },
          { id: 'pt-yc-h2', front: '只有大家都排好隊，', clue: '提示：排好隊會有什麼好結果？記得要說「才」。', model: '才能很快吃到午餐。' }
        ],
        whole: [
          { id: 'pt-yc-w1', clue: '提示：先用「只有」說一定要做到的事，再用「才」說會有的結果。想想看：想做好一件事，一定要怎麼做？', model: '只有每天刷牙，牙齒才會健康。' }
        ] }
    ],
    rhetoric: {
      cards: [
        { key: 'simile', name: '譬喻', meaning: '把一樣東西比成另一樣有相同地方的東西，讓人更容易想像。常用「像」、「好像」、「如同」。', example: '課文把青綠的山比成翠玉，把連接土地和海洋的河流比成臍帶，也把路上小小的車子比成甲蟲。',
          show: { sentence: '天上的白雲像一團團棉花。' },
          yesno: [
            { id: 'rh-si-y1', sentence: '湖面平得如同一面鏡子。', answer: true, clue: '提示：這句話有沒有把湖面比成另一樣東西？', explain: '是譬喻：把平平的湖面比成鏡子。' },
            { id: 'rh-si-y2', sentence: '湖面很平靜。', answer: false, clue: '提示：這句話有沒有把湖面比成別的東西？', explain: '不是譬喻：這句話只是說湖面很平靜。' }
          ],
          pick: [
            { id: 'rh-si-p1', options: ['從山上往下看，房子小得像積木。', '山下有很多房子。'], clue: '提示：哪一句把房子比成另一樣東西？', explain: '「小得像積木」是譬喻：把房子比成積木。' },
            { id: 'rh-si-p2', options: ['彎彎的河流像一條藍色的絲帶。', '這條河流很長。'], clue: '提示：哪一句把河流比成別的東西？', explain: '「像一條藍色的絲帶」是譬喻。' },
            { id: 'rh-si-p3', options: ['稻田一片金黃，如同鋪了一層金子。', '稻田變黃了。', '農夫在割稻。'], clue: '提示：哪一句用「如同」把稻田比成別的東西？', explain: '「如同鋪了一層金子」是譬喻。' },
            { id: 'rh-si-p4', options: ['夜晚的城市燈火，好像天上的星。', '城市晚上有燈。', '晚上很安靜。'], clue: '提示：哪一句用「好像」把燈火比成別的東西？', explain: '「好像天上的星」是譬喻。' },
            { id: 'rh-si-p5', options: ['海浪像白色的花邊，鑲在沙灘上。', '海浪打上沙灘。', '沙灘上有貝殼。', '海浪在對我招手。'], clue: '提示：哪一句用「像」把海浪比成別的東西？', explain: '「像白色的花邊」是譬喻。' },
            { id: 'rh-si-p6', options: ['小島浮在海上，好像一片綠葉。', '海上有一座小島。', '小島上有樹。', '小島在海上睡覺。'], clue: '提示：哪一句把小島比成另一樣東西？', explain: '「好像一片綠葉」是譬喻。' }
          ] },
        { key: 'sense', name: '摹寫', meaning: '把看到、聽到、聞到、吃到、摸到的感覺，仔細的寫出來，讓人好像也感受到。', example: '課文寫出山的顏色、海浪的聲音、稻子擺動的樣子，把看到和聽到的寫得好清楚。',
          show: { sentence: '海浪嘩啦嘩啦的拍打著岩石。', mark: ['嘩啦嘩啦'] },
          yesno: [
            { id: 'rh-se-y1', sentence: '剛出爐的麵包，散發出濃濃的奶油香。', answer: true, mark: ['濃濃的奶油香'], clue: '提示：這句話有沒有寫出聞到的味道？', explain: '是摹寫：寫出聞到的香味。' },
            { id: 'rh-se-y2', sentence: '媽媽買了麵包。', answer: false, clue: '提示：這句話有沒有寫出看到、聞到、吃到的感覺？', explain: '不是摹寫：這句話只是說買了麵包。' }
          ],
          pick: [
            { id: 'rh-se-p1', mark: ['金黃色'], options: ['夕陽把海面染成一片金黃色。', '太陽下山了。'], clue: '提示：哪一句寫出了看到的顏色？', explain: '「染成一片金黃色」是摹寫：寫出看到的景色。' },
            { id: 'rh-se-p2', mark: ['沙沙'], options: ['風吹過樹林，葉子沙沙的響。', '今天有風。'], clue: '提示：哪一句寫出了聽到的聲音？', explain: '「葉子沙沙的響」是摹寫：寫出聽到的聲音。' },
            { id: 'rh-se-p3', mark: ['又酸又甜'], options: ['這顆橘子吃起來又酸又甜。', '我吃了一顆橘子。', '橘子是水果。'], clue: '提示：哪一句寫出了吃到的味道？', explain: '「又酸又甜」是摹寫：寫出吃到的味道。' },
            { id: 'rh-se-p4', mark: ['軟綿綿'], options: ['小貓的毛摸起來軟綿綿的。', '我有一隻小貓。', '小貓在睡覺。'], clue: '提示：哪一句寫出了摸到的感覺？', explain: '「軟綿綿」是摹寫：寫出摸到的感覺。' },
            { id: 'rh-se-p5', mark: ['清清', '一閃一閃'], options: ['清清的溪水裡，小魚的鱗片一閃一閃。', '溪裡有魚。', '我去溪邊玩。', '小魚像銀色的小星。'], clue: '提示：哪一句把看到的樣子寫得很仔細？', explain: '「清清的溪水」、「一閃一閃」是摹寫：寫出看到的樣子。' },
            { id: 'rh-se-p6', mark: ['熱呼呼', '香噴噴'], options: ['熱呼呼的湯麵，聞起來香噴噴的。', '晚餐吃湯麵。', '湯麵在碗裡。', '湯麵在對我微笑。'], clue: '提示：哪一句寫出了摸到的溫度和聞到的味道？', explain: '「熱呼呼」、「香噴噴」是摹寫。' }
          ] }
      ],
      quiz: [
        { id: 'rh1', sentence: '遠遠的山，看起來像一頭睡著的大象。', answer: '譬喻', clue: '提示：這句話有沒有把山比成別的東西？', explain: '答案是「譬喻」：把山比成大象。' },
        { id: 'rh2', sentence: '彎彎的月亮如同一艘小船。', answer: '譬喻', clue: '提示：這句話有沒有用「如同」？', explain: '答案是「譬喻」：把月亮比成小船。' },
        { id: 'rh3', sentence: '雨點滴答滴答的打在窗戶上。', answer: '摹寫', mark: ['滴答滴答'], clue: '提示：這句話有沒有寫出聽到的聲音？', explain: '答案是「摹寫」：寫出雨的聲音。' },
        { id: 'rh4', sentence: '花園裡飄來一陣淡淡的花香。', answer: '摹寫', mark: ['淡淡的花香'], clue: '提示：這句話有沒有寫出聞到的味道？', explain: '答案是「摹寫」：寫出聞到的香味。' }
      ]
    }
  };
  if (typeof module === 'object' && module.exports) module.exports = d;
  else { root.H3A_WORDS = root.H3A_WORDS || {}; root.H3A_WORDS.L02 = d; }
})(this);
