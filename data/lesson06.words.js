/* 第 6 課字詞練習（公開、不加密）。句子和解釋都是 Claude 自己寫的，沒有課本原文。
   生字、語詞：options 的第一個是正確答案（作答時會打亂）。 */
(function (root) {
  var d = {
    /* 理解提問的分類（照課本「閱讀理解提問」）：extract 提取訊息、infer 推論訊息、interpret 詮釋整合、evaluate 比較評估。只放題號，不放課文 */
    quizLevels: { qa: 'extract', qb: 'extract', qc: 'extract', qd: 'extract', qe: 'extract', qf: 'infer', qg: 'infer', qh: 'interpret',
      qi: 'interpret', qj: 'evaluate', k1: 'interpret', k2: 'evaluate' },
    /* 詮釋整合、比較評估的鷹架：think 是「想一想」的兩個步驟（不說答案），why 是「老師教你」的說明。不放課文原句 */
    quizHelp: {
      qh: { think: ['三家公司的作品，各有什麼讓人記住的地方？', '它們是不是都想出了別人還沒做過的事？'], why: '三家公司都敢嘗試新的方法：有的讓聲音和畫面一起出現，有的把溫暖的成長故事放進動畫，有的用電腦做出立體的畫面。願意創新、用心做好，是它們成功的原因。' },
      qi: { think: ['書上的故事是不會動的文字，動畫呢？', '「動」字加上引號，是想讓你特別注意什麼？'], why: '平常的故事是印在書上、靜靜的文字。動畫讓角色會跑、會說話、會唱歌，故事好像活了過來，所以作者說故事「動」起來了。' },
      qj: { think: ['你喜歡畫面很有感情、會讓人思考的動畫，還是畫面很立體、很新奇的動畫？', '說出你喜歡的原因，例如音樂、角色或故事。'], why: '兩種動畫都很棒，沒有標準答案。重要的是說清楚你喜歡哪一種，再說出理由，例如故事讓你感動，或畫面讓你驚奇。' }
    },
    /* 「說說看」改成選選看：good 兩個合理的想法（選哪一個都對）、bad 兩個不合理的，why 是老師教你的說明。不放課文原句 */
    talkChoices: {
      k1: { good: ['我最喜歡的動畫，主角遇到困難也不放棄，讓我很感動。', '我喜歡的動畫音樂很好聽，我常常一邊唱一邊跳。'], bad: ['動畫都很無聊，我從來不看，也不想說。', '我喜歡吃冰淇淋。'], why: '題目問的是你喜歡的動畫和原因。說出故事、角色或音樂哪裡讓你喜歡，就是好的回答。說都不看，或講吃冰淇淋，都沒有回答到題目。' },
      k2: { good: ['我想把奶奶說的故事做成動畫，讓大家都聽得到。', '我想把我家小狗的冒險畫成動畫，一定很好笑。'], bad: ['我想把作業本做成動畫，然後丟掉。', '我不知道什麼是故事。'], why: '題目問的是你想把什麼故事做成動畫。奶奶的故事、小狗的冒險，都是可以讓大家看得開心的故事。另外兩個沒有說出想做的故事。' }
    },
    hanzi: [
      { id: 'h-娛', combo: { layout: 'lr', parts: [['女', 'm', '女生'], ['吳', 's', '']] }, char: '娛', zhuyin: 'ㄩˊ', radical: '女', strokes: 10, words: ['娛樂', '自娛'], say: '娛，娛樂的娛', cloze: '＿樂', img: 'watch-cartoon.png', options: ['娛', '誤', '吳', '蜈'], clue: '這個字的左邊是女字旁。', explain: '答案是「娛」，左邊是女字旁；「誤」的左邊是言字旁，「蜈」的左邊是虫字旁。', parts: ['女', '吳'], story: '左邊是「女」，右邊的「吳」念起來像「娛」。以前女子唱歌跳舞讓大家開心，就是「娛樂」。', sentence: '週末看卡通是我最喜歡的娛樂。', build: { layout: 'lr', show: ['？', '吳'], answer: '女', options: ['女', '言', '口', '虫'], clue: '想一想：以前唱歌跳舞讓大家開心的是誰？' } },
      { id: 'h-汽', combo: { layout: 'lr', parts: [['氵', 'm', '水'], ['气', 's', '']] }, char: '汽', zhuyin: 'ㄑㄧˋ', radical: '水', strokes: 7, words: ['汽船', '汽車'], say: '汽，汽車的汽', cloze: '＿車', img: 'car-road.png', options: ['汽', '氣', '迄', '乞'], clue: '這個字的左邊是三點水。', explain: '答案是「汽」，左邊是三點水；「氣」的裡面是「米」，是空氣的氣。', parts: ['氵', '气'], story: '左邊是水，右邊的「气」是氣。水煮開會變成水蒸氣，以前的機器靠水蒸氣推動，所以有「汽船」、「汽車」。', sentence: '路口停了一輛紅色的汽車。', build: { layout: 'lr', show: ['？', '气'], answer: '氵', options: ['氵', '口', '扌', '米'], clue: '想一想：煮開會冒白煙的是什麼？' } },
      { id: 'h-哨', combo: { layout: 'lr', parts: [['口', 'm', '嘴巴'], ['肖', 's', '']] }, char: '哨', zhuyin: 'ㄕㄠˋ', radical: '口', strokes: 10, words: ['口哨', '哨子'], say: '哨，哨子的哨', cloze: '＿子', img: 'whistle.png', options: ['哨', '削', '消', '銷'], clue: '這個字的左邊是口字旁。', explain: '答案是「哨」，左邊是口字旁；「削」的右邊是立刀旁，「消」的左邊是三點水。', parts: ['口', '肖'], story: '左邊是嘴巴，右邊的「肖」念起來像「哨」。用嘴巴吹出尖尖的聲音，就是「口哨」；體育老師吹的是「哨子」。', sentence: '老師一吹哨子，大家馬上集合。', build: { layout: 'lr', show: ['？', '肖'], answer: '口', options: ['口', '刂', '氵', '金'], clue: '想一想：吹出聲音要用身體的哪個部分？' } },
      { id: 'h-典', combo: { type: '會意字', pict: '上面是「冊」，像一本用竹片串成的書；下面像一張桌子。把重要的書放在桌上供著，就是「典」，表示很重要、可以當標準的書。' }, char: '典', zhuyin: 'ㄉㄧㄢˇ', radical: '八', strokes: 8, words: ['經典', '字典'], say: '典，字典的典', cloze: '字＿', img: 'dictionary.png', options: ['典', '曲', '興', '共'], clue: '這個字的上面像「冊」，下面有兩點。', explain: '答案是「典」；「曲」的下面沒有兩點，「共」的上面是「廿」。', parts: ['冊', '丌'], story: '上面像一本書，下面像桌子。把重要的書放在桌上，大家都拿來查，就是「字典」。', sentence: '遇到不會的字，我就查字典。' },
      { id: 'h-框', combo: { layout: 'lr', parts: [['木', 'm', '木頭'], ['匡', 's', '']] }, char: '框', zhuyin: 'ㄎㄨㄤ', radical: '木', strokes: 10, words: ['框架', '相框'], say: '框，相框的框', cloze: '相＿', img: 'photo-frame.png', options: ['框', '眶', '筐', '匡'], clue: '這個字的左邊是木字旁。', explain: '答案是「框」，左邊是木字旁；「眶」的左邊是目字旁，「筐」的上面是竹字頭。', parts: ['木', '匡'], story: '左邊是木頭，右邊的「匡」像一個方方的框。用木頭圍成四邊、把照片裝進去，就是「相框」。', sentence: '我把全家福放進相框裡。', build: { layout: 'lr', show: ['？', '匡'], answer: '木', options: ['木', '目', '竹', '扌'], clue: '想一想：以前的相框是用什麼做的？' } },
      { id: 'h-劇', combo: { layout: 'lr', parts: [['豦', 's', ''], ['刂', 'm', '刀']] }, char: '劇', zhuyin: 'ㄐㄩˋ', radical: '刀', strokes: 15, words: ['劇情', '戲劇'], say: '劇，戲劇的劇', cloze: '戲＿', img: 'stage-play.png', options: ['劇', '據', '處', '遽'], clue: '這個字的右邊是立刀旁。', explain: '答案是「劇」，右邊是立刀旁；「據」的左邊是提手旁，「遽」有辵字旁。', parts: ['豦', '刂'], story: '左邊的「豦」念起來像「劇」，右邊是刀。以前的戲常常演打鬥，很激烈；在舞臺上演的故事，就是「戲劇」。', sentence: '我們班在畢業典禮上演了一齣戲劇。', build: { layout: 'lr', show: ['豦', '？'], answer: '刂', options: ['刂', '扌', '力', '攵'], clue: '想一想：「據」的左邊是手，這個字的右邊是一把什麼？' } },
      { id: 'h-父', combo: { type: '象形字', pict: '「父」像一隻手拿著一根棍子或斧頭在工作，以前在家裡做粗重工作、保護家人的是爸爸。' }, char: '父', zhuyin: 'ㄈㄨˋ', radical: '父', strokes: 4, words: ['父母', '父親'], say: '父，父親的父', cloze: '＿親', img: 'dad-hug.png', options: ['父', '交', '文', '叉'], clue: '這個字的上面是兩點，下面是交叉的一撇一捺。', explain: '答案是「父」；「交」的上面是一點一橫，「文」的上面是一點一橫。', parts: ['父'], story: '「父」像手拿工具在工作，保護全家的人就是爸爸，也叫「父親」。', sentence: '父親節那天，我送爸爸一張卡片。' },
      { id: 'h-責', combo: { layout: 'tb', parts: [['龶', 's', ''], ['貝', 'm', '錢']] }, char: '責', zhuyin: 'ㄗㄜˊ', radical: '貝', strokes: 11, words: ['負責', '責任'], say: '責，責任的責', cloze: '＿任', img: 'class-duty.png', options: ['責', '債', '漬', '積'], clue: '這個字的下面是「貝」，左邊沒有東西。', explain: '答案是「責」；「債」多了單人旁，「積」多了禾字旁。', parts: ['龶', '貝'], story: '下面的「貝」是錢，以前欠了錢，就一定要還。自己一定要做好的事，就是「責任」。', sentence: '照顧班上的盆栽，是我的責任。', build: { layout: 'tb', show: ['龶', '？'], answer: '貝', options: ['貝', '心', '口', '木'], clue: '想一想：以前欠了錢一定要還，和錢財有關的是哪一個？' } },
      { id: 'h-判', combo: { layout: 'lr', parts: [['半', 's', ''], ['刂', 'm', '刀']] }, char: '判', zhuyin: 'ㄆㄢˋ', radical: '刀', strokes: 7, words: ['判斷力', '裁判'], say: '判，裁判的判', cloze: '裁＿', img: 'referee.png', options: ['判', '伴', '拌', '畔'], clue: '這個字的右邊是立刀旁。', explain: '答案是「判」，右邊是立刀旁；「伴」的左邊是單人旁，「拌」的左邊是提手旁。', parts: ['半', '刂'], story: '左邊是「半」，右邊是刀。用刀把東西切成兩半，分得清清楚楚；分清楚對錯，就是「判斷」。比賽裡分出輸贏的人，叫「裁判」。', sentence: '裁判吹哨子，比賽開始了。', build: { layout: 'lr', show: ['半', '？'], answer: '刂', options: ['刂', '亻', '扌', '田'], clue: '想一想：把東西切成兩半，要用什麼工具？' } },
      { id: 'h-鳴', combo: { layout: 'lr', parts: [['口', 'm', '嘴巴'], ['鳥', 'm', '鳥']] }, char: '鳴', zhuyin: 'ㄇㄧㄥˊ', radical: '鳥', strokes: 14, words: ['共鳴', '鳥鳴'], say: '鳴，鳥鳴的鳴', cloze: '鳥＿', img: 'bird-sing.png', options: ['鳴', '嗚', '鳥', '烏'], clue: '這個字的右邊是「鳥」，左邊是「口」。', explain: '答案是「鳴」，右邊是「鳥」；「嗚」的右邊是「烏」，少了一橫。', parts: ['口', '鳥'], story: '左邊是嘴巴，右邊是鳥。鳥張開嘴巴唱歌，就是「鳴」。', sentence: '清晨的公園裡，到處都是鳥鳴聲。', build: { layout: 'lr', show: ['口', '？'], answer: '鳥', options: ['鳥', '馬', '魚', '牛'], clue: '想一想：早上在樹上唱歌的是哪一種動物？' } },
      { id: 'h-穎', combo: { type: '形聲字', pict: '左下是「禾」，像稻穗；右邊是「頃」的樣子。稻穗最尖端、最突出的地方叫「穎」，所以表現特別突出的人，叫「聰穎」。' }, char: '穎', zhuyin: 'ㄧㄥˇ', radical: '禾', strokes: 16, words: ['脫穎而出', '聰穎'], say: '穎，聰穎的穎', cloze: '聰＿', img: 'smart-kid.png', options: ['穎', '潁', '頃', '傾'], clue: '這個字的左下是「禾」。', explain: '答案是「穎」，左下是「禾」；「潁」的左下是「水」。', parts: ['匕', '禾', '頁'], story: '左下的「禾」是稻子。稻穗最尖、最突出的地方叫「穎」。很聰明、表現很突出，就是「聰穎」。', sentence: '她從小就很聰穎，什麼都學得很快。' },
      { id: 'h-獲', combo: { layout: 'lr', parts: [['犭', 'm', '狗'], ['蒦', 's', '']] }, char: '獲', zhuyin: 'ㄏㄨㄛˋ', radical: '犬', strokes: 17, words: ['榮獲', '捕獲'], say: '獲，捕獲的獲', cloze: '捕＿', img: 'trophy-win.png', options: ['獲', '穫', '護', '鑊'], clue: '這個字的左邊是犬字旁。', explain: '答案是「獲」，左邊是犬字旁；「穫」的左邊是禾字旁，是收穫的穫；「護」的左邊是言字旁。', parts: ['犭', '蒦'], story: '左邊的犬字旁是獵狗，右邊念起來像「獲」。以前帶著獵狗去打獵，抓到獵物，就是「獲得」。', sentence: '他努力練習，獲得了第一名。', build: { layout: 'lr', show: ['？', '蒦'], answer: '犭', options: ['犭', '禾', '言', '金'], clue: '想一想：以前打獵要帶哪一種動物？' } },
      { id: 'h-佳', combo: { layout: 'lr', parts: [['亻', 'm', '人'], ['圭', 's', '']] }, char: '佳', zhuyin: 'ㄐㄧㄚ', radical: '人', strokes: 8, words: ['最佳', '佳作'], say: '佳，佳作的佳', cloze: '＿作', img: 'best-drawing.png', options: ['佳', '住', '往', '挂'], clue: '這個字的左邊是單人旁，右邊是兩個「土」。', explain: '答案是「佳」，右邊是兩個「土」；「住」的右邊是「主」，「往」的左邊是雙人旁。', parts: ['亻', '圭'], story: '左邊是人，右邊的「圭」念起來有點像「佳」。很好、很美的人或東西，就是「佳」；寫得很好的作品叫「佳作」。', sentence: '我的圖畫得到佳作，好開心。', build: { layout: 'lr', show: ['？', '圭'], answer: '亻', options: ['亻', '土', '彳', '氵'], clue: '想一想：「往」的左邊是雙人旁，這個字的左邊少了一撇，是哪一個？' } },
      { id: 'h-膩', combo: { layout: 'lr', parts: [['月', 'm', '肉'], ['貳', 's', '']] }, char: '膩', zhuyin: 'ㄋㄧˋ', radical: '肉', strokes: 16, words: ['細膩', '油膩'], say: '膩，油膩的膩', cloze: '油＿', img: 'greasy-food.png', options: ['膩', '貳', '臘', '膚'], clue: '這個字的左邊是肉字旁，右邊是「貳」。', explain: '答案是「膩」；「臘」的右邊是「巤」，「膚」的上面是虎字頭。', parts: ['月', '貳'], story: '左邊的肉字旁和肉有關，右邊的「貳」念起來有點像「膩」。肥肥的肉吃太多，覺得油油的、吃不下，就是「油膩」。', sentence: '這盤炸雞太油膩了，我吃兩塊就飽了。', build: { layout: 'lr', show: ['？', '貳'], answer: '月', options: ['月', '貝', '扌', '氵'], clue: '想一想：肥肥的肉，左邊放和身體、肉有關的哪一個？' } },
      { id: 'h-效', combo: { layout: 'lr', parts: [['交', 's', ''], ['攵', 'm', '手拿東西']] }, char: '效', zhuyin: 'ㄒㄧㄠˋ', radical: '攴', strokes: 10, words: ['效果', '效法'], say: '效，效果的效', cloze: '＿果', img: 'medicine.png', options: ['效', '校', '郊', '較'], clue: '這個字的右邊是反文旁。', explain: '答案是「效」，右邊是反文旁；「校」的左邊是木字旁，「郊」的右邊是邑字旁。', parts: ['交', '攵'], story: '左邊的「交」念起來有點像「效」，右邊的反文旁像手拿著東西做事。照著做、學著做，就是「效法」；做了以後的成績，就是「效果」。', sentence: '這個藥的效果很好，我的感冒好多了。', build: { layout: 'lr', show: ['交', '？'], answer: '攵', options: ['攵', '木', '阝', '車'], clue: '想一想：「校」的左邊是木，這個字右邊是像手拿東西的哪一個？' } },
      { id: 'h-隊', combo: { type: '形聲字', pict: '左邊的「阝」是土坡，右邊念起來像「隊」。很多人沿著土坡排成一長列，就是「隊」。' }, char: '隊', zhuyin: 'ㄉㄨㄟˋ', radical: '阜', strokes: 12, words: ['團隊', '排隊'], say: '隊，排隊的隊', cloze: '排＿', img: 'line-up.png', options: ['隊', '墜', '遂', '逐'], clue: '這個字的左邊是阜字旁。', explain: '答案是「隊」，左邊是阜字旁；「墜」的下面多了「土」，「遂」有辵字旁。', parts: ['阝', '㒸'], story: '左邊的阜字旁像土坡。很多人排成一長列，就是「排隊」；一起合作的一群人，叫「團隊」。', sentence: '大家排隊上公車，不推也不擠。' },
      { id: 'h-益', combo: { type: '會意字', pict: '下面是「皿」，是盤子、碗；上面像橫著的水。水太多，從碗裡滿出來，就是「益」，所以有增加、更多的意思。' }, char: '益', zhuyin: 'ㄧˋ', radical: '皿', strokes: 10, words: ['精益求精', '利益'], say: '益，利益的益', cloze: '利＿', img: 'water-overflow.png', options: ['益', '盆', '盈', '監'], clue: '這個字的下面是「皿」，上面像「八」和一橫。', explain: '答案是「益」；「盆」的上面是「分」，「盈」的上面是「乃」和「又」。', parts: ['䒑', '八', '皿'], story: '下面的「皿」是碗，上面像水滿出來。東西越來越多，就是「益」；對大家有好處，叫「有益」。', sentence: '多吃青菜對身體有益。' },
      { id: 'h-貌', combo: { layout: 'lr', parts: [['豸', 'm', '野獸'], ['皃', 's', '']] }, char: '貌', zhuyin: 'ㄇㄠˋ', radical: '豸', strokes: 14, words: ['樣貌', '禮貌'], say: '貌，禮貌的貌', cloze: '禮＿', img: 'polite-bow.png', options: ['貌', '豹', '貓', '邈'], clue: '這個字的左邊是豸字旁，右邊是「皃」。', explain: '答案是「貌」；「豹」的右邊是「勺」，「貓」的右邊是「苗」。', parts: ['豸', '皃'], story: '右邊的「皃」像一個人的臉。臉長什麼樣子，就是「容貌」；對人有好的樣子和態度，就是「禮貌」。', sentence: '見到長輩要有禮貌，主動問好。', build: { layout: 'lr', show: ['？', '皃'], answer: '豸', options: ['豸', '犭', '亻', '辶'], clue: '想一想：「豹」的左邊是哪一個偏旁？' } },
      { id: 'h-官', combo: { type: '會意字', pict: '上面的「宀」是房子，下面像一層一層的臺階。在大房子裡辦公、管事的人，就是「官」。' }, char: '官', zhuyin: 'ㄍㄨㄢ', radical: '宀', strokes: 8, words: ['感官', '法官'], say: '官，法官的官', cloze: '法＿', img: 'judge.png', options: ['官', '管', '棺', '宮'], clue: '這個字的上面是寶蓋頭，沒有竹字頭。', explain: '答案是「官」；「管」的上面多了竹字頭，「宮」的下面是兩個「口」。', parts: ['宀', '㠯'], story: '上面的寶蓋頭是房子。在大房子裡辦公、管事的人，就是「官」；判斷誰對誰錯的人，叫「法官」。身體負責看、聽、聞的部位，叫「感官」。', sentence: '法官仔細聽完兩邊的說法。' },
      { id: 'h-增', combo: { layout: 'lr', parts: [['土', 'm', '泥土'], ['曾', 's', '']] }, char: '增', zhuyin: 'ㄗㄥ', radical: '土', strokes: 15, words: ['增加', '增長'], say: '增，增長的增', cloze: '＿長', img: 'growing-plant.png', options: ['增', '贈', '憎', '層'], clue: '這個字的左邊是土字旁。', explain: '答案是「增」，左邊是土字旁；「贈」的左邊是貝字旁，「層」的外面是「尸」。', parts: ['土', '曾'], story: '左邊是泥土，右邊的「曾」念起來像「增」。一直往上加土，土堆變得越來越高，就是「增加」。', sentence: '多讀書可以增長知識。', build: { layout: 'lr', show: ['？', '曾'], answer: '土', options: ['土', '貝', '忄', '尸'], clue: '想一想：一直加泥巴，泥堆越來越高，左邊放哪一個？' } }
    ],
    vocab: [
      { id: 'v-娛樂', cloze: true, clozeOptions: ['娛樂', '功課', '考試', '打掃'], word: '娛樂', meaning: '讓人開心、放鬆的活動。', example: '下棋是爺爺最喜歡的＿＿。', img: 'watch-cartoon.png', options: ['娛樂', '劇情', '效果', '團隊'] },
      { id: 'v-汽船', cloze: true, clozeOptions: ['汽船', '飛機', '火車', '腳踏車'], word: '汽船', meaning: '用機器帶動、在水上行駛的交通工具。', example: '我們坐＿＿到對岸的小島。', img: 'steamboat.png', options: ['汽船', '口哨', '父母', '框架'] },
      { id: 'v-口哨', cloze: true, clozeOptions: ['口哨', '鋼琴', '小鼓', '吉他'], word: '口哨', meaning: '嘴脣嘟起來吹氣，發出的尖尖聲音。', example: '哥哥一邊走路，一邊吹＿＿。', img: 'whistle-boy.png', options: ['口哨', '汽船', '感官', '劇情'] },
      { id: 'v-經典', cloze: true, clozeOptions: ['經典', '垃圾', '破舊', '無聊'], word: '經典', meaning: '做得非常好、可以流傳很久的作品。', example: '這部卡通是很多人心中的＿＿。', img: 'old-movie.png', options: ['經典', '框架', '效果', '樣貌'] },
      { id: 'v-框架', cloze: true, clozeOptions: ['框架', '花朵', '香味', '聲音'], word: '框架', meaning: '事情原本的格式和範圍。', example: '他的作文跳出了一般的＿＿，很有新意。', img: 'out-of-box.png', options: ['框架', '經典', '團隊', '感官'] },
      { id: 'v-劇情', cloze: true, clozeOptions: ['劇情', '鞋子', '天氣', '桌子'], word: '劇情', meaning: '故事或戲裡發生的事。', example: '這部電影的＿＿很感人，我看到哭了。', img: 'cinema-cry.png', options: ['劇情', '娛樂', '口哨', '效果'] },
      { id: 'v-父母', cloze: true, clozeOptions: ['父母', '老師', '鄰居', '店員'], word: '父母', meaning: '爸爸和媽媽。', example: '出門前要先告訴＿＿要去哪裡。', img: 'family-walk.png', options: ['父母', '團隊', '汽船', '樣貌'] },
      { id: 'v-負責', cloze: true, clozeOptions: ['負責', '偷懶', '逃避', '亂丟'], word: '負責', meaning: '把該做的事做好，出了問題也不推給別人。', example: '班長很＿＿，每天都把黑板擦乾淨。', img: 'class-duty.png', options: ['負責', '增加', '榮獲', '細膩'] },
      { id: 'v-判斷力', cloze: true, clozeOptions: ['判斷力', '肚子餓', '大聲公', '冰淇淋'], word: '判斷力', meaning: '分辨對錯、決定怎麼做的本領。', example: '遇到陌生人搭訕，要有好的＿＿＿，不能隨便跟他走。', img: 'think-choose.png', options: ['判斷力', '團隊', '感官', '劇情'] },
      { id: 'v-共鳴', cloze: true, clozeOptions: ['共鳴', '吵架', '打架', '生氣'], word: '共鳴', meaning: '聽了別人的話，心裡也有一樣的感受。', example: '他說出想家的心情，引起大家的＿＿。', img: 'nod-together.png', options: ['共鳴', '框架', '經典', '父母'] },
      { id: 'v-脫穎而出', cloze: true, clozeOptions: ['脫穎而出', '默默無聞', '半途而廢', '垂頭喪氣'], word: '脫穎而出', meaning: '本領比大家強，一下子就被看見。', example: '她在一百個參賽者中＿＿＿＿，得到冠軍。', img: 'stand-out.png', options: ['脫穎而出', '精益求精', '判斷力', '負責'] },
      { id: 'v-榮獲', cloze: true, clozeOptions: ['榮獲', '失去', '丟掉', '弄壞'], word: '榮獲', meaning: '很光彩的得到。', example: '我們學校的合唱團＿＿全國第一名。', img: 'trophy-win.png', options: ['榮獲', '增加', '負責', '細膩'] },
      { id: 'v-最佳', cloze: true, clozeOptions: ['最佳', '最差', '最慢', '最吵'], word: '最佳', meaning: '比其他的都好，排第一。', example: '他的演出得到＿＿表演獎。', img: 'best-drawing.png', options: ['最佳', '榮獲', '細膩', '增加'] },
      { id: 'v-細膩', cloze: true, clozeOptions: ['細膩', '粗心', '馬虎', '隨便'], word: '細膩', meaning: '很用心、很周到，連小地方都照顧到。', example: '這幅畫畫得很＿＿，連花瓣上的露水都畫出來了。', img: 'detail-paint.png', options: ['細膩', '榮獲', '娛樂', '經典'] },
      { id: 'v-效果', cloze: true, clozeOptions: ['效果', '名字', '顏色', '年紀'], word: '效果', meaning: '做了以後帶來的影響或成績。', example: '每天練習朗讀，＿＿真的很好。', img: 'medicine.png', options: ['效果', '框架', '團隊', '口哨'] },
      { id: 'v-團隊', cloze: true, clozeOptions: ['團隊', '一個人', '小貓', '玩具'], word: '團隊', meaning: '一群一起合作、為同一個目標努力的人。', example: '這座城堡是我們＿＿一起搭出來的。', img: 'team-build.png', options: ['團隊', '父母', '感官', '劇情'] },
      { id: 'v-精益求精', cloze: true, clozeOptions: ['精益求精', '馬馬虎虎', '得過且過', '敷衍了事'], word: '精益求精', meaning: '已經很好了，還要更努力做得更好。', example: '麵包師傅＿＿＿＿，每天都想做出更好吃的麵包。', img: 'baker.png', options: ['精益求精', '脫穎而出', '判斷力', '細膩'] },
      { id: 'v-樣貌', cloze: true, clozeOptions: ['樣貌', '聲音', '味道', '溫度'], word: '樣貌', meaning: '長相、外表。', example: '十年沒見，表哥的＿＿變了好多。', img: 'old-new-photo.png', options: ['樣貌', '效果', '經典', '汽船'] },
      { id: 'v-感官', cloze: true, clozeOptions: ['感官', '書包', '鉛筆', '球鞋'], word: '感官', meaning: '眼睛、耳朵、鼻子這些接收外面刺激的身體部位。', example: '看、聽、聞、嚐、摸，都要用到我們的＿＿。', img: 'five-senses.png', options: ['感官', '框架', '團隊', '娛樂'] },
      { id: 'v-增加', cloze: true, clozeOptions: ['增加', '減少', '消失', '用完'], word: '增加', meaning: '變得更多。', example: '多看書可以＿＿我們的知識。', img: 'growing-plant.png', options: ['增加', '榮獲', '負責', '細膩'] }
    ],
    charwords: [
      { id: 'cw-娛', char: '娛', img: 'watch-cartoon.png', charMeaning: '快樂、讓人開心。', word: '自娛', meaning: '自己讓自己開心。', example: '下雨天出不去，弟弟就畫畫＿＿。', options: ['自娛', '汽車', '哨子', '字典'] },
      { id: 'cw-汽', char: '汽', img: 'car-road.png', charMeaning: '水煮開變成的氣。', word: '汽車', meaning: '用引擎帶動、在路上跑的車子。', example: '爸爸開＿＿載我們去郊遊。', options: ['汽車', '相框', '戲劇', '父親'] },
      { id: 'cw-哨', char: '哨', img: 'whistle.png', charMeaning: '吹出尖尖聲音的東西。', word: '哨子', meaning: '吹氣會發出尖尖響聲的小東西。', example: '體育老師吹響＿＿，比賽開始。', options: ['哨子', '責任', '裁判', '鳥鳴'] },
      { id: 'cw-典', char: '典', img: 'dictionary.png', charMeaning: '重要、可以當標準的書。', word: '字典', meaning: '可以查字的讀音和意思的書。', example: '不會念的字，可以查＿＿。', options: ['字典', '聰穎', '獲得', '佳作'] },
      { id: 'cw-框', char: '框', img: 'photo-frame.png', charMeaning: '圍在四邊的架子。', word: '相框', meaning: '用來放照片的框子。', example: '媽媽把我的照片放進＿＿。', options: ['相框', '油膩', '效法', '排隊'] },
      { id: 'cw-劇', char: '劇', img: 'stage-play.png', charMeaning: '在舞臺上演的戲。', word: '戲劇', meaning: '演員在舞臺上把故事演出來。', example: '我們在成果發表會表演一齣＿＿。', options: ['戲劇', '有益', '禮貌', '法官'] },
      { id: 'cw-父', char: '父', img: 'dad-hug.png', charMeaning: '爸爸。', word: '父親', meaning: '爸爸。', example: '我的＿＿是一位消防員。', options: ['父親', '增長', '自娛', '汽車'] },
      { id: 'cw-責', char: '責', img: 'class-duty.png', charMeaning: '應該做好的事。', word: '責任', meaning: '自己一定要做好的事。', example: '照顧小狗是我的＿＿。', options: ['責任', '哨子', '字典', '相框'] },
      { id: 'cw-判', char: '判', img: 'referee.png', charMeaning: '分清楚對錯、輸贏。', word: '裁判', meaning: '比賽中判斷輸贏、管規則的人。', example: '＿＿舉起紅牌，那位球員只好下場。', options: ['裁判', '戲劇', '父親', '責任'] },
      { id: 'cw-鳴', char: '鳴', img: 'bird-sing.png', charMeaning: '鳥叫；發出聲音。', word: '鳥鳴', meaning: '小鳥的叫聲。', example: '早上一打開窗戶，就聽到清脆的＿＿。', options: ['鳥鳴', '裁判', '聰穎', '油膩'] },
      { id: 'cw-穎', char: '穎', img: 'smart-kid.png', charMeaning: '突出、聰明。', word: '聰穎', meaning: '很聰明，學東西很快。', example: '妹妹很＿＿，一教就會。', options: ['聰穎', '鳥鳴', '獲得', '佳作'] },
      { id: 'cw-獲', char: '獲', img: 'trophy-win.png', charMeaning: '得到。', word: '獲得', meaning: '得到。', example: '他的作品＿＿老師的稱讚。', options: ['獲得', '油膩', '排隊', '效法'] },
      { id: 'cw-佳', char: '佳', img: 'best-drawing.png', charMeaning: '很好、很美。', word: '佳作', meaning: '寫得或做得很好的作品。', example: '我的作文得到＿＿，被貼在公布欄上。', options: ['佳作', '聰穎', '禮貌', '有益'] },
      { id: 'cw-膩', char: '膩', img: 'greasy-food.png', charMeaning: '油太多；很細緻。', word: '油膩', meaning: '油太多，吃起來不清爽。', example: '這碗麵太＿＿了，我喝不下湯。', options: ['油膩', '法官', '增長', '自娛'] },
      { id: 'cw-效', char: '效', img: 'medicine.png', charMeaning: '照著做；成績。', word: '效法', meaning: '照著好的榜樣學。', example: '我們要＿＿他熱心助人的精神。', options: ['效法', '排隊', '字典', '汽車'] },
      { id: 'cw-隊', char: '隊', img: 'line-up.png', charMeaning: '排成一列的人。', word: '排隊', meaning: '一個接一個排成一列。', example: '買午餐要＿＿，不可以插隊。', options: ['排隊', '有益', '相框', '哨子'] },
      { id: 'cw-益', char: '益', img: 'water-overflow.png', charMeaning: '好處；更多。', word: '有益', meaning: '對人有好處。', example: '早睡早起對身體＿＿。', options: ['有益', '禮貌', '戲劇', '父親'] },
      { id: 'cw-貌', char: '貌', img: 'polite-bow.png', charMeaning: '樣子、外表。', word: '禮貌', meaning: '對人說話、做事的態度很好。', example: '他很有＿＿，見到人都會打招呼。', options: ['禮貌', '法官', '責任', '裁判'] },
      { id: 'cw-官', char: '官', img: 'judge.png', charMeaning: '管事的人；身體的器官。', word: '法官', meaning: '在法院判斷誰對誰錯的人。', example: '＿＿聽完雙方的說明，才做出判決。', options: ['法官', '增長', '鳥鳴', '聰穎'] },
      { id: 'cw-增', char: '增', img: 'growing-plant.png', charMeaning: '變多。', word: '增長', meaning: '一天一天變多、變大。', example: '出國旅行可以＿＿見識。', options: ['增長', '獲得', '佳作', '油膩'] }
    ],
    /* 生字變成語：課本延伸成語，解釋和例句改成孩子聽得懂的話 */
    idioms: [
      { id: 'i-引經據典', situationImg: 'id-quote-book.png',
        anim: { bg: 'school', a: { kid: ['🧒', 30, 62, 12], book: ['📖', 54, 54, 10], b2: ['📚', 70, 66, 11], talk: ['💬', 40, 34, 10, 'h'], star: ['🌟', 30, 20, 9, 'h'], clap: ['👏', 80, 40, 9, 'h'] },
          s: [['小華上臺說故事前，查了好多本書。', [['wig', 'b2'], ['wig', 'book']]],
            ['說話時，他常常說：書上這樣寫……', [['in', 'talk'], ['bob', 'book']]],
            ['每一句都找得到根據，', [['in', 'star']]],
            ['大家都覺得他說得很有道理！', [['in', 'clap'], ['pop', 'clap']]]] },
        idiom: '引經據典', char: '典', meaning: '說話或寫文章時，引用書上的話來當根據。', example: '他寫報告時引經據典，讓人很信服。', situation: '小華上臺說話前查了很多書，說的每一句都有根據。',
        fill: { options: ['老師上課＿＿＿＿，講了很多古書上的故事。', '他沒看過任何書，只是隨口亂說，真是＿＿＿＿。'], clue: '提示：哪一句是引用書上的話當根據？', explain: '第一句用得對：老師引用古書當根據。隨口亂說沒有根據，不是引經據典。' } },
      { id: 'i-責無旁貸', situationImg: 'id-my-duty.png',
        anim: { bg: 'school', a: { kid: ['🧒', 30, 62, 12], plant: ['🪴', 66, 62, 12], wilt: ['🥀', 66, 62, 12, 'h', 'as:plant'], can: ['🚿', 44, 40, 10, 'h'], drop: ['💧', 60, 46, 7, 'h'], ok: ['✅', 66, 30, 9, 'h'] },
          s: [['班上的盆栽交給小明照顧。', [['bob', 'plant']]],
            ['今天大家都忙，盆栽快枯了。', [['out', 'plant'], ['in', 'wilt'], ['shake', 'wilt']]],
            ['小明說：這是我的事，我來！', [['in', 'can'], ['in', 'drop'], ['bob', 'drop']]],
            ['自己的責任，一定自己做好。', [['out', 'drop'], ['out', 'wilt'], ['in', 'plant'], ['in', 'ok']]]] },
        idiom: '責無旁貸', char: '責', meaning: '自己該做的事，沒有理由推給別人。', example: '保護環境，每個人都責無旁貸。', situation: '盆栽是小明負責的，快枯了，他馬上去澆水。',
        fill: { options: ['我是值日生，擦黑板是我＿＿＿＿的工作。', '這是他的工作，他卻推給別人，真是＿＿＿＿。'], clue: '提示：哪一句是自己的事自己做，不推給別人？', explain: '第一句用得對：值日生擦黑板是自己的責任。推給別人，就不是責無旁貸。' } },
      { id: 'i-孤掌難鳴', situationImg: 'id-one-hand.png',
        anim: { bg: 'park', a: { kid: ['🧒', 30, 62, 12], box: ['📦', 52, 66, 16], sweat: ['💦', 40, 44, 8, 'h'], k2: ['👦', 86, 62, 12, 'h'], k3: ['👧', 86, 62, 12, 'h'], ok: ['🙌', 52, 36, 10, 'h'] },
          s: [['弟弟想自己搬一個大箱子。', [['shake', 'box']]],
            ['他用盡力氣，箱子還是不動。', [['in', 'sweat'], ['shake', 'kid']]],
            ['一個人的力量太小，做不成事。', [['wig', 'sweat']]],
            ['朋友一起來幫忙，馬上就搬好了！', [['out', 'sweat'], ['in', 'k2'], ['mv', 'k2', [70, 62, 700]], ['in', 'ok']]]] },
        idiom: '孤掌難鳴', char: '鳴', meaning: '一隻手拍不響；比喻一個人力量太小，很難把事做成。', example: '打掃整個操場，一個人孤掌難鳴，大家要一起來。', situation: '弟弟一個人搬不動大箱子，朋友來幫忙才搬好。',
        fill: { options: ['要辦好園遊會，一個人＿＿＿＿，需要大家幫忙。', '這件事一個人就做得完，根本不是＿＿＿＿。'], clue: '提示：哪一句是說一個人力量太小？', explain: '第一句用得對：辦園遊會一個人做不來。一個人就做得完的事，就不是孤掌難鳴。' } },
      { id: 'i-漸入佳境', situationImg: 'id-better-piano.png',
        anim: { bg: 'room', a: { kid: ['🧒', 30, 62, 12], piano: ['🎹', 54, 62, 16], n1: ['🎵', 54, 40, 7, 'h'], n2: ['🎶', 66, 32, 8, 'h'], n3: ['🎶', 78, 24, 10, 'h'], sad: ['😣', 30, 40, 8, 'h'], smile: ['😄', 30, 40, 9, 'h'] },
          s: [['剛開始學琴，彈得斷斷續續的。', [['in', 'sad'], ['in', 'n1']]],
            ['每天練習，越彈越順。', [['in', 'n2'], ['bob', 'n2']]],
            ['到後來，好聽的音樂一直流出來！', [['in', 'n3'], ['bob', 'n3'], ['out', 'sad'], ['in', 'smile']]],
            ['事情一點一點變得越來越好。', [['jump', 'kid']]]] },
        idiom: '漸入佳境', char: '佳', meaning: '情況一點一點變好，越來越有趣、越來越順。', example: '這本書前面有點無聊，後面漸入佳境，好看極了。', situation: '剛開始學琴彈得不好，每天練習，越彈越好聽。',
        fill: { options: ['他的游泳越練越好，＿＿＿＿。', '他越練越差，真是＿＿＿＿。'], clue: '提示：哪一句是越來越好？', explain: '第一句用得對：越練越好。越練越差，剛好相反。' } },
      { id: 'i-上行下效', situationImg: 'id-follow-leader.png',
        anim: { bg: 'room', a: { mom: ['👩', 30, 56, 14], kid: ['🧒', 66, 64, 11], book: ['📖', 40, 50, 8, 'h'], book2: ['📖', 74, 58, 7, 'h'], heart: ['💗', 50, 26, 9, 'h'] },
          s: [['媽媽每天晚上都會拿起書來讀。', [['in', 'book'], ['bob', 'book']]],
            ['弟弟看到了，', [['bob', 'kid']]],
            ['也學媽媽，拿起書來讀。', [['in', 'book2'], ['bob', 'book2']]],
            ['大人怎麼做，小孩就跟著學。', [['in', 'heart']]]] },
        idiom: '上行下效', char: '效', meaning: '上面的人怎麼做，下面的人就跟著學。', example: '老師每天準時到校，上行下效，同學們也不遲到了。', situation: '媽媽每天讀書，弟弟看到了也跟著讀。',
        fill: { options: ['班長帶頭撿垃圾，＿＿＿＿，大家也一起撿。', '大家各做各的，沒有人學別人，真是＿＿＿＿。'], clue: '提示：哪一句是有人帶頭、大家跟著學？', explain: '第一句用得對：班長帶頭，大家跟著學。各做各的，不是上行下效。' } },
      { id: 'i-以貌取人', situationImg: 'id-dont-judge.png',
        anim: { bg: 'park', a: { old: ['🧓', 30, 60, 13], kid: ['🧒', 70, 62, 12], hmm: ['🤨', 70, 40, 8, 'h'], help: ['🤝', 50, 40, 10, 'h'], wow: ['😲', 70, 40, 8, 'h'], star: ['⭐', 30, 34, 9, 'h'] },
          s: [['一位穿著舊衣服的老爺爺坐在公園。', [['bob', 'old']]],
            ['小強覺得他看起來怪怪的，不想理他。', [['in', 'hmm'], ['mv', 'kid', [84, 62, 700]]]],
            ['後來小強迷路了，竟然是老爺爺熱心帶他回家。', [['out', 'hmm'], ['mv', 'kid', [56, 62, 700]], ['in', 'help'], ['in', 'star']]],
            ['不能只看外表，就決定一個人好不好。', [['in', 'wow']]]] },
        idiom: '以貌取人', char: '貌', meaning: '只看一個人的長相、穿著，就決定他好不好。', example: '交朋友要看心，不可以以貌取人。', situation: '小強看老爺爺穿舊衣服就不理他，後來才發現老爺爺很熱心。',
        fill: { options: ['他只因為新同學穿舊鞋就不跟他玩，這是＿＿＿＿。', '她認真了解每個人的個性，真是＿＿＿＿。'], clue: '提示：哪一句是只看外表就決定一個人？', explain: '第一句用得對：只看鞋子就不跟人玩，是以貌取人。認真了解每個人，剛好相反。' } }
    ],
    /* 改錯字：sentence 是正確的句子，畫面上會把 char 換成 wrong；options 的第一個是正確的字。clue 只說語詞的意思，不能出現正確的字。 */
    fix: [
      { id: 'fx-娛', char: '娛', wrong: '誤', sentence: '看漫畫是他最喜歡的娛樂。', options: ['娛', '誤', '吳'], clue: '這裡是說讓人開心的活動，想一想，哪一個字有女字旁？', explain: '要改成「娛」。讓人開心的活動是「娛樂」；「誤」是錯誤的誤。' },
      { id: 'fx-汽', char: '汽', wrong: '氣', sentence: '停車場停滿了汽車。', options: ['汽', '氣', '乞'], clue: '這裡說的是路上跑的車子，想一想，哪一個字有三點水？', explain: '要改成「汽」。路上跑的車是「汽車」；「氣」是空氣的氣。' },
      { id: 'fx-哨', char: '哨', wrong: '消', sentence: '老師的哨子聲一響，大家都停下來。', options: ['哨', '消', '削'], clue: '這裡說的是吹了會響的小東西，想一想，哪一個字有口字旁？', explain: '要改成「哨」。吹了會響的是「哨子」；「消」是消失的消。' },
      { id: 'fx-典', char: '典', wrong: '曲', sentence: '這本字典是外公送我的。', options: ['典', '曲', '共'], clue: '這裡說的是查字的書，想一想，哪一個字的下面有兩點？', explain: '要改成「典」。查字的書是「字典」；「曲」是歌曲的曲。' },
      { id: 'fx-框', char: '框', wrong: '眶', sentence: '牆上掛著一個木頭相框。', options: ['框', '眶', '筐'], clue: '這裡說的是放照片的東西，想一想，哪一個字有木字旁？', explain: '要改成「框」。放照片的是「相框」；「眶」是眼眶的眶。' },
      { id: 'fx-劇', char: '劇', wrong: '據', sentence: '這部卡通的劇情好精采。', options: ['劇', '據', '處'], clue: '這裡說的是故事裡發生的事，想一想，哪一個字有立刀旁？', explain: '要改成「劇」。故事裡發生的事是「劇情」；「據」是根據的據。' },
      { id: 'fx-父', char: '父', wrong: '交', sentence: '我的父親每天早上送我上學。', options: ['父', '交', '文'], clue: '這裡說的是爸爸，想一想，哪一個字的上面是兩點？', explain: '要改成「父」。爸爸是「父親」；「交」是交朋友的交。' },
      { id: 'fx-責', char: '責', wrong: '債', sentence: '做錯事要勇敢負責。', options: ['責', '債', '積'], clue: '這裡是說把該做的事做好，想一想，哪一個字沒有單人旁？', explain: '要改成「責」。把該做的事做好是「負責」；「債」是欠債的債。' },
      { id: 'fx-判', char: '判', wrong: '伴', sentence: '比賽時要聽裁判的話。', options: ['判', '伴', '拌'], clue: '這裡說的是比賽中決定輸贏的人，想一想，哪一個字有立刀旁？', explain: '要改成「判」。判斷輸贏的人是「裁判」；「伴」是同伴的伴。' },
      { id: 'fx-鳴', char: '鳴', wrong: '嗚', sentence: '樹林裡傳來好聽的鳥鳴。', options: ['鳴', '嗚', '烏'], clue: '這裡說的是小鳥的叫聲，想一想，哪一個字的右邊是「鳥」？', explain: '要改成「鳴」。小鳥的叫聲是「鳥鳴」；「嗚」是哭聲嗚嗚的嗚。' },
      { id: 'fx-穎', char: '穎', wrong: '潁', sentence: '這個聰穎的孩子很會解謎題。', options: ['穎', '潁', '頃'], clue: '這裡是說很聰明，想一想，哪一個字的左下是「禾」？', explain: '要改成「穎」。很聰明是「聰穎」；「潁」的左下是水。' },
      { id: 'fx-獲', char: '獲', wrong: '護', sentence: '他獲得了一張獎狀。', options: ['獲', '護', '穫'], clue: '這裡是說得到，想一想，哪一個字有犬字旁？', explain: '要改成「獲」。得到是「獲得」；「護」是保護的護。' },
      { id: 'fx-佳', char: '佳', wrong: '住', sentence: '這次的作品裡，你的畫最佳。', options: ['佳', '住', '往'], clue: '這裡是說最好，想一想，哪一個字的右邊是兩個「土」？', explain: '要改成「佳」。最好是「最佳」；「住」是居住的住。' },
      { id: 'fx-膩', char: '膩', wrong: '貳', sentence: '炸薯條吃多了覺得好油膩。', options: ['膩', '貳', '膚'], clue: '這裡是說油太多、不清爽，想一想，哪一個字有肉字旁？', explain: '要改成「膩」。油太多是「油膩」；「貳」是數字二的大寫。' },
      { id: 'fx-效', char: '效', wrong: '校', sentence: '這種洗衣粉的效果很好。', options: ['效', '校', '較'], clue: '這裡是說做了以後的成績，想一想，哪一個字的右邊是反文旁？', explain: '要改成「效」。做了以後的成績是「效果」；「校」是學校的校。' },
      { id: 'fx-隊', char: '隊', wrong: '墜', sentence: '我們的籃球隊得到冠軍。', options: ['隊', '墜', '遂'], clue: '這裡說的是一起比賽的一群人，想一想，哪一個字的下面沒有「土」？', explain: '要改成「隊」。一起比賽的一群人是「球隊」；「墜」是掉下來的意思。' },
      { id: 'fx-益', char: '益', wrong: '盆', sentence: '讀好書對我們很有益。', options: ['益', '盆', '盈'], clue: '這裡是說有好處，想一想，哪一個字的上面不是「分」？', explain: '要改成「益」。有好處是「有益」；「盆」是臉盆的盆。' },
      { id: 'fx-貌', char: '貌', wrong: '豹', sentence: '他說話很有禮貌。', options: ['貌', '豹', '貓'], clue: '這裡是說對人的態度很好，想一想，哪一個字的右邊是「皃」？', explain: '要改成「貌」。態度很好是「禮貌」；「豹」是花豹的豹。' },
      { id: 'fx-官', char: '官', wrong: '宮', sentence: '法官認真聽每個人的說法。', options: ['官', '宮', '管'], clue: '這裡說的是在法院判斷對錯的人，想一想，哪一個字的下面不是兩個「口」？', explain: '要改成「官」。在法院判斷對錯的是「法官」；「宮」是皇宮的宮。' },
      { id: 'fx-增', char: '增', wrong: '層', sentence: '每天跳繩，可以增強體力。', options: ['增', '層', '贈'], clue: '這裡是說讓體力變得更強，想一想，哪一個字有土字旁？', explain: '要改成「增」。變得更強是「增強」；「層」是樓層的層。' }
    ],
    similar: [
      { id: 's1', meaning: '「錯＿」是不對的地方。', sentence: '請把考卷上的錯＿訂正好。', frame: '錯＿', options: ['誤', '娛'], answer: '誤', clue: '提示：和說話、寫字有關，左邊是言字旁。', explain: '答案是「誤」；「娛」是娛樂的娛，有女字旁。' },
      { id: 's2', meaning: '「空＿」是我們每天呼吸的東西。', sentence: '森林裡的空＿好新鮮。', frame: '空＿', options: ['氣', '汽'], answer: '氣', clue: '提示：這個字的裡面是「米」。', explain: '答案是「氣」；「汽」是汽車的汽，有三點水。' },
      { id: 's3', meaning: '「＿失」是不見了。', sentence: '彩虹一下子就＿失了。', frame: '＿失', options: ['消', '哨'], answer: '消', clue: '提示：這個字的左邊是三點水。', explain: '答案是「消」；「哨」是哨子的哨，有口字旁。' },
      { id: 's4', meaning: '「歌＿」是可以唱的一首一首的音樂。', sentence: '這首歌＿很好聽。', frame: '歌＿', options: ['曲', '典'], answer: '曲', clue: '提示：這個字的下面沒有兩點。', explain: '答案是「曲」；「典」是字典的典。' },
      { id: 's5', meaning: '「眼＿」是眼睛四周的地方。', sentence: '她感動得眼＿都紅了。', frame: '眼＿', options: ['眶', '框'], answer: '眶', clue: '提示：和眼睛有關，左邊是目字旁。', explain: '答案是「眶」；「框」是相框的框，有木字旁。' },
      { id: 's6', meaning: '「根＿」是說話、做事的理由和來源。', sentence: '你這樣說，有什麼根＿嗎？', frame: '根＿', options: ['據', '劇'], answer: '據', clue: '提示：這個字的左邊是提手旁。', explain: '答案是「據」；「劇」是戲劇的劇，有立刀旁。' },
      { id: 's7', meaning: '「＿朋友」是和別人變成好朋友。', sentence: '我在新學校＿到很多好朋友。', frame: '＿到', options: ['交', '父'], answer: '交', clue: '提示：這個字的上面是一點一橫。', explain: '答案是「交」；「父」是父親的父，上面是兩點。' },
      { id: 's8', meaning: '「欠＿」是跟別人借了錢還沒還。', sentence: '借了錢要記得還，不要欠＿。', frame: '欠＿', options: ['債', '責'], answer: '債', clue: '提示：這個字的左邊是單人旁。', explain: '答案是「債」；「責」是責任的責。' },
      { id: 's9', meaning: '「同＿」是一起做事、一起玩的人。', sentence: '我和同＿一起完成了作品。', frame: '同＿', options: ['伴', '判'], answer: '伴', clue: '提示：和人有關，左邊是單人旁。', explain: '答案是「伴」；「判」是裁判的判，有立刀旁。' },
      { id: 's10', meaning: '「＿鴉」是全身黑黑的鳥。', sentence: '電線上停著一隻＿鴉。', frame: '＿鴉', options: ['烏', '鳴'], answer: '烏', clue: '提示：這個字比「鳥」少了一橫，沒有口字旁。', explain: '答案是「烏」；「鳴」是鳥鳴的鳴。' },
      { id: 's11', meaning: '「學＿」是上課讀書的地方。', sentence: '我每天走路去學＿。', frame: '學＿', options: ['校', '效'], answer: '校', clue: '提示：這個字的左邊是木字旁。', explain: '答案是「校」；「效」是效果的效，右邊是反文旁。' },
      { id: 's12', meaning: '「十＿」是大樓的第十樓。', sentence: '我家住在大樓的第十＿。', frame: '十＿', options: ['層', '增'], answer: '層', clue: '提示：這個字的外面是「尸」。', explain: '答案是「層」；「增」是增加的增，有土字旁。' }
    ],
    listen: [
      { id: 'l1', text: '下課後看一部卡通，讓自己放鬆一下。', answer: 0, options: [{ text: '娛樂', img: 'watch-cartoon.png' }, { text: '負責', img: 'class-duty.png' }, { text: '團隊', img: 'team-build.png' }, { text: '框架', img: 'out-of-box.png' }] },
      { id: 'l2', text: '在一百個人裡面，她的表現最突出。', answer: 0, options: [{ text: '脫穎而出', img: 'stand-out.png' }, { text: '精益求精', img: 'baker.png' }, { text: '判斷力', img: 'think-choose.png' }, { text: '共鳴', img: 'nod-together.png' }] },
      { id: 'l3', text: '畫家連花瓣上的小水珠都畫出來了。', answer: 0, options: [{ text: '細膩', img: 'detail-paint.png' }, { text: '娛樂', img: 'watch-cartoon.png' }, { text: '增加', img: 'growing-plant.png' }, { text: '榮獲', img: 'trophy-win.png' }] },
      { id: 'l4', text: '大家一起合作，搭出一座大城堡。', answer: 0, options: [{ text: '團隊', img: 'team-build.png' }, { text: '父母', img: 'family-walk.png' }, { text: '感官', img: 'five-senses.png' }, { text: '汽船', img: 'steamboat.png' }] },
      { id: 'l5', text: '眼睛看、耳朵聽、鼻子聞。', answer: 0, options: [{ text: '感官', img: 'five-senses.png' }, { text: '團隊', img: 'team-build.png' }, { text: '口哨', img: 'whistle-boy.png' }, { text: '效果', img: 'medicine.png' }] },
      { id: 'l6', text: '麵包已經很好吃了，師傅還想做得更好。', answer: 0, options: [{ text: '精益求精', img: 'baker.png' }, { text: '脫穎而出', img: 'stand-out.png' }, { text: '負責', img: 'class-duty.png' }, { text: '經典', img: 'old-movie.png' }] },
      { id: 'l7', text: '他說出想家的心情，大家也有一樣的感覺。', answer: 0, options: [{ text: '共鳴', img: 'nod-together.png' }, { text: '劇情', img: 'cinema-cry.png' }, { text: '框架', img: 'out-of-box.png' }, { text: '樣貌', img: 'old-new-photo.png' }] },
      { id: 'l8', text: '哥哥一邊走路，一邊嘟起嘴巴吹出聲音。', answer: 0, options: [{ text: '口哨', img: 'whistle-boy.png' }, { text: '汽船', img: 'steamboat.png' }, { text: '感官', img: 'five-senses.png' }, { text: '娛樂', img: 'watch-cartoon.png' }] }
    ],
    /* ---------- 短語、句型、修辭（句子都是 Claude 自己寫的） ---------- */
    phrase: {
      /* 拼短語每一格下面寫要放什麼樣的詞 */
      fillLabels: { before: '', answer: '怎麼樣', noun: '什麼東西' },
      pickName: '看圖選一選', pickSay: '看圖，選出最適合的詞，說說看是什麼樣的東西。',
      /* 短語：形容詞＋的＋名詞（課本的例子是課文原句，這裡換成自己寫的） */
      intro: { example: '有趣的卡通人物', img: 'pr-funny-cartoon.png',
        parts: [{ text: '有趣', role: '怎麼樣' }, { text: '的' }, { text: '卡通人物', role: '什麼東西' }],
        explain: '先說出東西的樣子或特色，加上「的」，再說是什麼東西。' },
      pick: [
        { id: 'ph1', img: 'pr-bright-stage.png', before: '', noun: '舞臺', ask: '什麼樣的舞臺', look: '再看看圖片，舞臺上的燈光怎麼樣？', options: ['明亮', '昏暗', '安靜', '冰冷'], clue: '提示：燈全部打開，連角落都看得清清楚楚。', explain: '答案是「明亮」，完整的短語是「明亮的舞臺」。' },
        { id: 'ph2', img: 'pr-cheerful-song.png', before: '', noun: '歌聲', ask: '什麼樣的歌聲', look: '再看看圖片，唱歌的人表情怎麼樣？', options: ['輕快', '沉重', '苦澀', '冰冷'], clue: '提示：聽了讓人想跟著跳起舞來。', explain: '答案是「輕快」，完整的短語是「輕快的歌聲」。' },
        { id: 'ph3', img: 'pr-brave-hero.png', before: '', noun: '主角', ask: '什麼樣的主角', look: '再看看圖片，主角遇到怪獸怕不怕？', options: ['勇敢', '膽小', '懶惰', '安靜'], clue: '提示：遇到大怪獸，還是站在最前面保護大家。', explain: '答案是「勇敢」，完整的短語是「勇敢的主角」。' },
        { id: 'ph4', img: 'pr-cozy-room.png', before: '', noun: '小屋', ask: '什麼樣的小屋', look: '再看看圖片，小屋裡讓人覺得怎麼樣？', options: ['溫暖', '寒冷', '吵鬧', '破舊'], clue: '提示：壁爐燒著火，坐在裡面好舒服。', explain: '答案是「溫暖」，完整的短語是「溫暖的小屋」。' },
        { id: 'ph5', img: 'pr-colorful-garden.png', before: '', noun: '花園', ask: '什麼樣的花園', look: '再看看圖片，花園裡有幾種顏色？', options: ['繽紛', '灰暗', '冷清', '乾枯'], clue: '提示：紅橙黃綠藍紫，什麼顏色的花都有。', explain: '答案是「繽紛」，完整的短語是「繽紛的花園」。' },
        { id: 'ph6', img: 'pr-mystery-forest.png', before: '', noun: '森林', ask: '什麼樣的森林', look: '再看看圖片，森林裡有沒有奇怪的光？', options: ['神祕', '普通', '熱鬧', '乾淨'], clue: '提示：霧濛濛的，好像藏著不為人知的事。', explain: '答案是「神祕」，完整的短語是「神祕的森林」。' },
        { id: 'ph7', img: 'pr-moving-ending.png', before: '', noun: '結局', ask: '什麼樣的結局', look: '再看看圖片，看電影的人有沒有流眼淚？', options: ['感人', '無聊', '可怕', '吵鬧'], clue: '提示：大家看完都紅了眼眶。', explain: '答案是「感人」，完整的短語是「感人的結局」。' },
        { id: 'ph8', img: 'pr-huge-robot.png', before: '', noun: '機器人', ask: '什麼樣的機器人', look: '再看看圖片，機器人跟大樓比起來怎麼樣？', options: ['巨大', '迷你', '柔軟', '香甜'], clue: '提示：比旁邊的高樓還要高。', explain: '答案是「巨大」，完整的短語是「巨大的機器人」。' }
      ],
      say: [],
      words: [
        { word: '不可或缺', meaning: '一定要有，少了不行。', img: 'water-plant.png' },
        { word: '不假思索', meaning: '不用想，馬上就說出來或做出來。', img: 'quick-answer.png' },
        { word: '舉世聞名', meaning: '全世界的人都知道，非常有名。', img: 'world-famous.png' },
        { word: '獨具一格', meaning: '有自己特別的風格，和別人都不一樣。', img: 'unique-hat.png' }
      ],
      choose: [
        { id: 'pw1', word: '不可或缺', options: ['水是植物生長不可或缺的東西。', '這顆小石頭不可或缺，丟掉也沒關係。'], clue: '提示：想一想，「不可或缺」是一定要有，還是可有可無？', explain: '第一句用得對：植物一定要有水。丟掉也沒關係，就不是不可或缺。' },
        { id: 'pw2', word: '不假思索', options: ['老師一問，他不假思索就說出了答案。', '他想了整整一個小時，不假思索的說出答案。'], clue: '提示：想一想，「不假思索」是馬上回答，還是想很久？', explain: '第一句用得對：馬上就說出答案。想了一個小時，就不是不假思索。' },
        { id: 'pw3', word: '舉世聞名', options: ['這座高塔舉世聞名，每天都有很多遊客。', '這家小店舉世聞名，只有隔壁鄰居知道。'], clue: '提示：想一想，「舉世聞名」是很多人知道，還是很少人知道？', explain: '第一句用得對：很多遊客來看。只有鄰居知道，就不是舉世聞名。' },
        { id: 'pw4', word: '獨具一格', options: ['他的畫獨具一格，一看就知道是他畫的。', '他的畫和大家的一模一樣，真是獨具一格。'], clue: '提示：想一想，「獨具一格」是和別人一樣，還是不一樣？', explain: '第一句用得對：一看就知道是他畫的。和大家一模一樣，剛好相反。' }
      ],
      make: [
        { id: 'pm1', word: '不可或缺', clue: '提示：想想看，生活中有什麼是一定要有的？', model: '睡眠是我們每天不可或缺的事。' },
        { id: 'pm2', word: '不假思索', clue: '提示：想想看，什麼問題你可以馬上回答？', model: '問我最愛吃什麼，我不假思索就說是水餃。' },
        { id: 'pm3', word: '舉世聞名', clue: '提示：想想看，有什麼地方或東西全世界都知道？', model: '萬里長城舉世聞名，很多人都想去看看。' },
        { id: 'pm4', word: '獨具一格', clue: '提示：想想看，誰的作品或打扮很特別？', model: '姐姐的穿搭獨具一格，總是讓人眼睛一亮。' }
      ]
    },
    pattern: [
      { key: 'youyu', id: 'yy', title: '由於……因此……', img: 'youyu.png',
        meaning: '先用「由於」說原因，再用「因此」說出這個原因帶來的結果。',
        examples: ['由於昨晚下了大雨，因此操場溼溼的。'],
        match: [
          { id: 'pt-yy-m1', img: 'pt-late-sleep.png', front: '由於昨晚太晚睡，', options: ['因此今天上課打瞌睡。', '因此今天精神很好。', '因此昨天很早睡。'], clue: '提示：看看圖片，太晚睡，今天會怎麼樣？', explain: '答案是「因此今天上課打瞌睡」：太晚睡是原因，打瞌睡是結果。' },
          { id: 'pt-yy-m2', img: 'pt-practice-win.png', front: '由於她每天練習，', options: ['因此比賽得了第一名。', '因此她每天練習。', '因此她忘了比賽。'], clue: '提示：看看圖片，每天練習，比賽結果怎麼樣？', explain: '答案是「因此比賽得了第一名」：練習是原因，得獎是結果。' },
          { id: 'pt-yy-m3', img: 'pt-forgot-umbrella.png', front: '由於忘了帶雨傘，', options: ['因此全身都淋溼了。', '因此天氣很晴朗。', '因此帶了雨傘。'], clue: '提示：看看圖片，沒帶傘遇到下雨，會怎麼樣？', explain: '答案是「因此全身都淋溼了」：沒帶傘是原因，淋溼是結果。' }
        ],
        conj: [
          { id: 'pt-yy-c1', full: '由於大家一起努力，因此教室變得好乾淨。', img: 'pt-clean-class.png', sentence: '＿＿大家一起努力，＿＿教室變得好乾淨。', options: ['由於……因此……', '不僅……也……', '雖然……但……'], clue: '提示：前面是原因，後面是結果。數數看有幾個空格。', explain: '答案是「由於……因此……」：由於大家一起努力，因此教室變得好乾淨。' },
          { id: 'pt-yy-c2', full: '由於路上塞車，因此爸爸晚到了。', img: 'pt-traffic.png', sentence: '＿＿路上塞車，＿＿爸爸晚到了。', options: ['由於……因此……', '不僅……也……', '雖然……但……'], clue: '提示：塞車是原因，晚到是結果。數數看有幾個空格。', explain: '答案是「由於……因此……」：由於路上塞車，因此爸爸晚到了。' }
        ],
        half: [
          { id: 'pt-yy-h1', front: '由於今天是我的生日，', clue: '提示：生日那天會發生什麼事？記得要說「因此」。', model: '因此媽媽買了一個大蛋糕。' },
          { id: 'pt-yy-h2', front: '由於弟弟沒吃早餐，', clue: '提示：沒吃早餐，會怎麼樣？記得要說「因此」。', model: '因此到了中午肚子好餓。' }
        ],
        whole: [
          { id: 'pt-yy-w1', clue: '提示：先用「由於」說原因，再用「因此」說結果。想想看：最近有什麼事是因為某個原因發生的？', model: '由於天氣變冷了，因此我穿上了外套。' }
        ] },
      { key: 'bujinye', id: 'bj', title: '不僅……也……', img: 'bujinye.png',
        meaning: '先用「不僅」說一件事，再用「也」說出更多的另一件事，表示不只一樣。',
        examples: ['這家店的麵包不僅好吃，價錢也很便宜。'],
        match: [
          { id: 'pt-bj-m1', img: 'pt-sing-dance.png', front: '姐姐不僅會唱歌，', options: ['也很會跳舞。', '也不會唱歌。', '也是一個人。'], clue: '提示：看看圖片，姐姐除了唱歌，還在做什麼？', explain: '答案是「也很會跳舞」：唱歌和跳舞都會，不只一樣。' },
          { id: 'pt-bj-m2', img: 'pt-kind-doctor.png', front: '這位醫生不僅醫術好，', options: ['也對病人很親切。', '也是一位醫生。', '也常常生病。'], clue: '提示：看看圖片，醫生對病人的態度怎麼樣？', explain: '答案是「也對病人很親切」：醫術好，又親切。' },
          { id: 'pt-bj-m3', img: 'pt-park-fun.png', front: '這座公園不僅很大，', options: ['也有好玩的設施。', '也是一座公園。', '也一點都不大。'], clue: '提示：看看圖片，公園裡除了很大，還有什麼？', explain: '答案是「也有好玩的設施」：又大又好玩。' }
        ],
        conj: [
          { id: 'pt-bj-c1', full: '運動不僅讓身體健康，也讓心情變好。', img: 'pt-run-happy.png', sentence: '運動＿＿讓身體健康，＿讓心情變好。', options: ['不僅……也……', '由於……因此……', '雖然……但……'], clue: '提示：運動有兩個好處。數數看有幾個空格。', explain: '答案是「不僅……也……」：運動不僅讓身體健康，也讓心情變好。' },
          { id: 'pt-bj-c2', full: '這本書不僅有趣，也教了我很多知識。', img: 'pt-fun-book.png', sentence: '這本書＿＿有趣，＿教了我很多知識。', options: ['不僅……也……', '由於……因此……', '雖然……但……'], clue: '提示：這本書有兩個優點。數數看有幾個空格。', explain: '答案是「不僅……也……」：這本書不僅有趣，也教了我很多知識。' }
        ],
        half: [
          { id: 'pt-bj-h1', front: '我的好朋友不僅很聰明，', clue: '提示：好朋友還有什麼優點？記得要說「也」。', model: '也很樂意幫助別人。' },
          { id: 'pt-bj-h2', front: '這部動畫不僅畫面漂亮，', clue: '提示：這部動畫還有什麼好的地方？記得要說「也」。', model: '音樂也很好聽。' }
        ],
        whole: [
          { id: 'pt-bj-w1', clue: '提示：先用「不僅」說一件事，再用「也」說另一件事。想想看：有什麼人或東西有兩個優點？', model: '我的老師不僅很溫柔，也很會說故事。' }
        ] }
    ],
    rhetoric: {
      cards: [
        { key: 'parallel', name: '排比', meaning: '把三句或三句以上樣子差不多的話，一句接一句排在一起說，讀起來很有節奏，也很有氣勢。', example: '課文用三個「在……時」，一口氣說出動畫主角怎麼一步一步長大。',
          show: { sentence: '在家裡，我是好孩子；在學校，我是好學生；在路上，我是好公民。', mark: ['在家裡', '在學校', '在路上'] },
          yesno: [
            { id: 'rh-pa-y1', sentence: '春天花開，夏天蟬叫，秋天葉落。', answer: true, mark: ['春天花開', '夏天蟬叫', '秋天葉落'], clue: '提示：有沒有三句樣子差不多的話排在一起？', explain: '是排比：三句「……天……」排在一起。' },
            { id: 'rh-pa-y2', sentence: '春天到了，花開了。', answer: false, clue: '提示：有沒有三句樣子差不多的話排在一起？', explain: '不是排比：沒有三句樣子差不多的話。' }
          ],
          pick: [
            { id: 'rh-pa-p1', mark: ['他會畫畫', '他會唱歌', '他會跳舞'], options: ['他會畫畫，他會唱歌，他會跳舞。', '他會做很多事。'], clue: '提示：哪一句有三句樣子差不多的話？', explain: '三個「他會……」排在一起，是排比。' },
            { id: 'rh-pa-p2', mark: ['有的在讀書', '有的在畫圖', '有的在下棋'], options: ['教室裡，有的在讀書，有的在畫圖，有的在下棋。', '教室裡有很多人。'], clue: '提示：哪一句有三個「有的……」？', explain: '三個「有的……」排在一起，是排比。' },
            { id: 'rh-pa-p3', mark: ['要認真聽', '要大聲讀', '要用心寫'], options: ['上課要認真聽，要大聲讀，要用心寫。', '上課要認真。', '我喜歡上課。'], clue: '提示：哪一句一口氣說了三個「要……」？', explain: '三個「要……」排在一起，是排比。' },
            { id: 'rh-pa-p4', mark: ['謝謝你的笑容', '謝謝你的鼓勵', '謝謝你的陪伴'], options: ['謝謝你的笑容，謝謝你的鼓勵，謝謝你的陪伴。', '我很開心。', '你是我的好朋友。'], clue: '提示：哪一句有三句樣子差不多的話？', explain: '三個「謝謝你的……」排在一起，是排比。' },
            { id: 'rh-pa-p5', mark: ['天是藍的', '雲是白的', '草是綠的'], options: ['天是藍的，雲是白的，草是綠的。', '今天的天氣很好。', '我在草地上玩。', '雲像棉花糖。'], clue: '提示：哪一句有三句樣子差不多的話？', explain: '三個「……是……的」排在一起，是排比。' },
            { id: 'rh-pa-p6', mark: ['動畫讓我笑', '動畫讓我哭', '動畫讓我思考'], options: ['動畫讓我笑，動畫讓我哭，動畫讓我思考。', '我喜歡看動畫。', '動畫很好看。', '這部動畫很長。'], clue: '提示：哪一句有三個「動畫讓我……」？', explain: '三個「動畫讓我……」排在一起，是排比。' }
          ] },
        { key: 'personify', name: '擬人', meaning: '把東西或動物當成人來寫，讓它們會說話、會笑、會做人做的事。', example: '課文說一隻吹口哨的小老鼠，讓觀眾的心像冰一樣被暖暖的融掉了，好像小老鼠是會讓人感動的人。',
          show: { sentence: '鬧鐘大聲叫我起床。', mark: ['叫我起床'] },
          yesno: [
            { id: 'rh-pe-y1', sentence: '小草從土裡探出頭來，好奇的看著世界。', answer: true, mark: ['探出頭來', '好奇的看著'], clue: '提示：這句話有沒有把小草寫得像人一樣？', explain: '是擬人：小草像人一樣會探頭、會好奇。' },
            { id: 'rh-pe-y2', sentence: '小草從土裡長出來了。', answer: false, clue: '提示：這句話裡的小草，有沒有做人做的事？', explain: '不是擬人：這句話只是說小草長出來。' }
          ],
          pick: [
            { id: 'rh-pe-p1', mark: ['眨著眼睛'], options: ['星星在夜空中眨著眼睛。', '晚上的天空有星。'], clue: '提示：哪一句的星星像人一樣會眨眼？', explain: '「星星眨著眼睛」是擬人。' },
            { id: 'rh-pe-p2', mark: ['生氣的大吼'], options: ['雷公生氣的大吼了一聲。', '外面在打雷。'], clue: '提示：哪一句的雷像人一樣會生氣？', explain: '「雷公生氣的大吼」是擬人。' },
            { id: 'rh-pe-p3', mark: ['跳起舞來'], options: ['風一吹，樹葉跳起舞來。', '風一吹，樹葉動了。', '樹上有葉子。'], clue: '提示：哪一句的樹葉像人一樣會跳舞？', explain: '「樹葉跳起舞來」是擬人。' },
            { id: 'rh-pe-p4', mark: ['張開手臂'], options: ['大樹張開手臂，為我們遮太陽。', '大樹很高。', '樹下很涼。'], clue: '提示：哪一句的大樹像人一樣有手臂？', explain: '「大樹張開手臂」是擬人。' },
            { id: 'rh-pe-p5', mark: ['偷偷溜進'], options: ['陽光偷偷溜進我的房間。', '太陽出來了。', '房間有窗戶。', '陽光像金色的絲線。'], clue: '提示：哪一句的陽光像人一樣會偷偷溜進來？', explain: '「陽光偷偷溜進」是擬人。' },
            { id: 'rh-pe-p6', mark: ['唱著歌'], options: ['小雨點在屋頂上唱著歌。', '外面在下雨。', '屋頂是紅色的。', '雨點像珍珠。'], clue: '提示：哪一句的雨點像人一樣會唱歌？', explain: '「雨點唱著歌」是擬人。' }
          ] }
      ],
      quiz: [
        { id: 'rh1', sentence: '我愛爸爸，我愛媽媽，我愛我的家。', answer: '排比', mark: ['我愛爸爸', '我愛媽媽', '我愛我的家'], clue: '提示：有沒有三句樣子差不多的話？', explain: '答案是「排比」：三個「我愛……」排在一起。' },
        { id: 'rh2', sentence: '鳥在唱，花在笑，蝴蝶在跳舞。', answer: '排比', mark: ['鳥在唱', '花在笑', '蝴蝶在跳舞'], clue: '提示：有沒有三句樣子差不多的話？', explain: '答案是「排比」：三個「……在……」排在一起。' },
        { id: 'rh3', sentence: '月亮躲進雲裡睡覺了。', answer: '擬人', mark: ['躲進雲裡睡覺'], clue: '提示：月亮會不會像人一樣做事？', explain: '答案是「擬人」：月亮像人一樣會躲、會睡覺。' },
        { id: 'rh4', sentence: '小河一路哼著歌往前跑。', answer: '擬人', mark: ['哼著歌'], clue: '提示：這句話有沒有把小河寫得像人？', explain: '答案是「擬人」：小河像人一樣會哼歌。' }
      ]
    }
  };
  if (typeof module === 'object' && module.exports) module.exports = d;
  else { root.H3A_WORDS = root.H3A_WORDS || {}; root.H3A_WORDS.L06 = d; }
})(this);
