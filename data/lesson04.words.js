/* 第 4 課字詞練習（公開、不加密）。句子和解釋都是 Claude 自己寫的，沒有課本原文。
   生字、語詞：options 的第一個是正確答案（作答時會打亂）。 */
(function (root) {
  var d = {
    /* 理解提問的分類（照課本「閱讀理解提問」）：extract 提取訊息、infer 推論訊息、interpret 詮釋整合、evaluate 比較評估。只放題號，不放課文 */
    quizLevels: { qa: 'extract', qb: 'extract', qc: 'extract', qd: 'extract', qe: 'infer', qf: 'infer', qg: 'infer', qh: 'interpret',
      qi: 'evaluate', qj: 'evaluate', k1: 'interpret', k2: 'evaluate' },
    /* 詮釋整合、比較評估的鷹架：think 是「想一想」的兩個步驟（不說答案），why 是「老師教你」的說明。不放課文原句 */
    quizHelp: {
      qh: { think: ['地主讓窮人跟在後面撿麥穗，這是什麼樣的心？', '婦人彎著腰一直撿，累了也不停，這是什麼樣的態度？'], why: '有東西願意留給更需要的人，是「樂於分享」；再辛苦也不抱怨、認真做，是「任勞任怨」。畫家把這兩種態度都畫進畫裡。' },
      qi: { think: ['你沒看過這幅畫，讀了這一段，腦中有沒有出現畫面？', '作者寫了每個婦人的頭巾顏色和動作，是想讓你看到什麼？'], why: '作者把遠方的人、三個婦人的頭巾和動作都寫得很清楚，讀的人就算沒看過畫，也好像親眼看到。這一段是整課的重點，所以寫得特別仔細。' },
      qj: { think: ['畫裡的人有錢嗎？漂亮嗎？那為什麼還說這幅畫很美？', '除了眼睛看到的美，還有什麼也讓人感動？'], why: '畫裡的婦人很窮，衣服也很樸素，可是她們努力生活、不抱怨，別人也願意分享。作者想告訴我們，美不只在外表，人的善良和堅強也是美。' }
    },
    /* 「說說看」改成選選看：good 兩個合理的想法（選哪一個都對）、bad 兩個不合理的，why 是老師教你的說明。不放課文原句 */
    talkChoices: {
      k1: { good: ['同學忘記帶色筆，我把我的借給他用。', '我把看完的故事書，送給社區的小圖書館。'], bad: ['好吃的點心我要全部藏起來自己吃。', '同學跟我借橡皮擦，我假裝沒聽到。'], why: '題目問的是怎麼樂於分享。借色筆、送書，都是把自己有的東西分給需要的人。藏起來自己吃、裝作沒聽到，就是不願意分享。' },
      k2: { good: ['我覺得清潔隊員很任勞任怨，每天早早出門收垃圾。', '我覺得媽媽很任勞任怨，工作完回家還煮飯給我們吃。'], bad: ['我覺得弟弟很任勞任怨，因為他整天都在玩。', '我覺得那個常常抱怨的同學很任勞任怨。'], why: '任勞任怨是做事很辛苦也不抱怨。清潔隊員、媽媽都很辛苦又不抱怨。整天玩、常常抱怨，都不是任勞任怨。' }
    },
    hanzi: [
      { id: 'h-恆', combo: { layout: 'lr', parts: [['忄', 'm', '心'], ['亙', 's', '']] }, char: '恆', zhuyin: 'ㄏㄥˊ', radical: '心', strokes: 9, words: ['恆久', '恆心'], say: '恆，恆心的恆', cloze: '＿心', img: 'practice-piano.png', options: ['恆', '垣', '桓', '宣'], clue: '這個字的左邊是豎心旁。', explain: '答案是「恆」，左邊是豎心旁；「垣」的左邊是土字旁，「桓」的左邊是木字旁。', parts: ['忄', '亙'], story: '左邊的豎心旁和心意有關，右邊的「亙」有「從這頭到那頭、一直連著」的意思。心意一直不變，就是「恆心」。', sentence: '學琴要有恆心，每天都練一點。', build: { layout: 'lr', show: ['？', '亙'], answer: '忄', options: ['忄', '木', '土', '扌'], clue: '想一想：一直不放棄，是哪裡的想法？' } },
      { id: 'h-澄', combo: { layout: 'lr', parts: [['氵', 'm', '水'], ['登', 's', '']] }, char: '澄', zhuyin: 'ㄔㄥˊ', radical: '水', strokes: 15, words: ['黃澄澄', '澄清'], say: '澄，澄清的澄', cloze: '＿清', img: 'clear-lake.png', options: ['澄', '證', '燈', '登'], clue: '這個字的左邊是三點水。', explain: '答案是「澄」，左邊是三點水；「證」的左邊是言字旁，「燈」的左邊是火字旁。', parts: ['氵', '登'], story: '左邊是水，右邊的「登」念起來有點像「澄」。水靜靜的不動，變得很乾淨、看得到底，就是「澄清」。', sentence: '湖水很澄清，可以看到水底的小魚。', build: { layout: 'lr', show: ['？', '登'], answer: '氵', options: ['氵', '言', '火', '足'], clue: '想一想：湖裡清清的是什麼？' } },
      { id: 'h-穗', combo: { layout: 'lr', parts: [['禾', 'm', '稻子'], ['惠', 's', '']] }, char: '穗', zhuyin: 'ㄙㄨㄟˋ', radical: '禾', strokes: 17, words: ['稻穗', '麥穗'], say: '穗，麥穗的穗', cloze: '麥＿', img: 'rice-ear.png', options: ['穗', '惠', '穩', '德'], clue: '這個字的左邊是禾字旁。', explain: '答案是「穗」，左邊是禾字旁；「惠」沒有禾字旁，「德」的左邊是雙人旁。', parts: ['禾', '惠'], story: '左邊的「禾」是稻子、麥子，右邊的「惠」念起來有點像「穗」。稻子、麥子頂端一串一串的穀粒，就是「穗」。', sentence: '秋天到了，麥穗被太陽曬成金黃色。', build: { layout: 'lr', show: ['？', '惠'], answer: '禾', options: ['禾', '木', '米', '扌'], clue: '想一想：稻子、麥子是哪一類植物？' } },
      { id: 'h-養', combo: { layout: 'tb', parts: [['羊', 's', ''], ['食', 'm', '吃東西']] }, char: '養', zhuyin: 'ㄧㄤˇ', radical: '食', strokes: 15, words: ['養活', '飼養'], say: '養，飼養的養', cloze: '飼＿', img: 'feed-chick.png', options: ['養', '羨', '美', '善'], clue: '這個字的下面是「食」。', explain: '答案是「養」，下面是「食」；「美」的下面是「大」，「善」的下面是「口」。', parts: ['羊', '食'], story: '上面是「羊」，下面是「食」。給羊吃東西、好好照顧牠，就是「飼養」。', sentence: '我們班在教室後面飼養了兩隻小烏龜。', build: { layout: 'tb', show: ['羊', '？'], answer: '食', options: ['食', '心', '大', '口'], clue: '想一想：照顧動物，每天要給牠們什麼？' } },
      { id: 'h-源', combo: { layout: 'lr', parts: [['氵', 'm', '水'], ['原', 's', '']] }, char: '源', zhuyin: 'ㄩㄢˊ', radical: '水', strokes: 13, words: ['來源', '水源'], say: '源，水源的源', cloze: '水＿', img: 'spring-water.png', options: ['源', '原', '願', '員'], clue: '這個字的左邊是三點水。', explain: '答案是「源」，左邊是三點水；「原」沒有三點水，「願」的右邊是「頁」。', parts: ['氵', '原'], story: '左邊是水，右邊的「原」念起來像「源」。河水最開始流出來的地方，就是「水源」。', sentence: '山上的泉水是這條小溪的源頭。', build: { layout: 'lr', show: ['？', '原'], answer: '氵', options: ['氵', '糸', '亻', '頁'], clue: '想一想：小溪從山上流下來，左邊放哪一個？' } },
      { id: 'h-藝', combo: { type: '形聲字', pict: '上面是草字頭，中間的部分像一個人跪著、雙手在種樹苗，下面是「云」。會把植物種得好，是一種本領，所以「藝」是才能、技術。' }, char: '藝', zhuyin: 'ㄧˋ', radical: '艸', strokes: 19, words: ['藝術家', '才藝'], say: '藝，才藝的藝', cloze: '才＿', img: 'talent-show.png', options: ['藝', '勢', '熱', '執'], clue: '這個字的上面是草字頭。', explain: '答案是「藝」，上面是草字頭；「勢」的下面是力，「熱」的下面是四點火。', parts: ['艹', '埶', '云'], story: '以前把植物種得好，是一種了不起的本領。上面的草字頭是植物，中間像人在種樹。有本領、會表演，就是有「才藝」。', sentence: '妹妹的才藝是跳舞。' },
      { id: 'h-樸', combo: { layout: 'lr', parts: [['木', 'm', '木頭'], ['菐', 's', '']] }, char: '樸', zhuyin: 'ㄆㄨˊ', radical: '木', strokes: 16, words: ['樸實', '樸素'], say: '樸，樸素的樸', cloze: '＿素', img: 'plain-dress.png', options: ['樸', '撲', '僕', '噗'], clue: '這個字的左邊是木字旁。', explain: '答案是「樸」，左邊是木字旁；「撲」的左邊是提手旁，「僕」的左邊是單人旁。', parts: ['木', '菐'], story: '左邊的「木」是木頭，右邊念起來像「樸」。還沒上漆、雕花的木頭，自然簡單，就是「樸素」。', sentence: '奶奶的衣服很樸素，但是洗得很乾淨。', build: { layout: 'lr', show: ['？', '菐'], answer: '木', options: ['木', '扌', '亻', '口'], clue: '想一想：沒有上漆的桌子是什麼做的？' } },
      { id: 'h-堆', combo: { layout: 'lr', parts: [['土', 'm', '泥土'], ['隹', 's', '']] }, char: '堆', zhuyin: 'ㄉㄨㄟ', radical: '土', strokes: 11, words: ['堆積', '土堆'], say: '堆，土堆的堆', cloze: '土＿', img: 'sand-pile.png', options: ['堆', '推', '唯', '錐'], clue: '這個字的左邊是土字旁。', explain: '答案是「堆」，左邊是土字旁；「推」的左邊是提手旁，「唯」的左邊是口字旁。', parts: ['土', '隹'], story: '左邊是泥土，右邊的「隹」念起來有點像「堆」。把泥沙一層一層疊成小山，就是「土堆」。', sentence: '弟弟在沙坑裡堆了一座小山。', build: { layout: 'lr', show: ['？', '隹'], answer: '土', options: ['土', '扌', '口', '金'], clue: '想一想：沙子、泥巴疊成小山，左邊放哪一個？' } },
      { id: 'h-撿', combo: { layout: 'lr', parts: [['扌', 'm', '手'], ['僉', 's', '']] }, char: '撿', zhuyin: 'ㄐㄧㄢˇ', radical: '手', strokes: 16, words: ['撿拾', '撿起'], say: '撿，撿起的撿', cloze: '＿起', img: 'pick-trash.png', options: ['撿', '檢', '險', '臉'], clue: '這個字的左邊是提手旁。', explain: '答案是「撿」，左邊是提手旁；「檢」的左邊是木字旁，「險」的左邊是阜字旁。', parts: ['扌', '僉'], story: '左邊是手，右邊的「僉」念起來有點像「撿」。用手把地上的東西拿起來，就是「撿起」。', sentence: '我把地上的紙屑撿起來，丟進垃圾桶。', build: { layout: 'lr', show: ['？', '僉'], answer: '扌', options: ['扌', '木', '阝', '月'], clue: '想一想：把地上的東西拿起來，要用身體的哪個部分？' } },
      { id: 'h-巾', combo: { type: '象形字', pict: '「巾」像一塊布掛在棍子上，垂下來的樣子。' }, char: '巾', zhuyin: 'ㄐㄧㄣ', radical: '巾', strokes: 3, words: ['頭巾', '毛巾'], say: '巾，毛巾的巾', cloze: '毛＿', img: 'towel.png', options: ['巾', '中', '市', '布'], clue: '這個字中間的一豎，下面沒有出頭到上面。', explain: '答案是「巾」；「中」的一豎上下都出頭，「市」的上面多一點。', parts: ['巾'], story: '「巾」像一塊掛起來、垂下來的布。擦臉、擦手的布，就是「毛巾」。', sentence: '洗完臉，我用毛巾把臉擦乾。' },
      { id: 'h-痠', combo: { type: '形聲字', pict: '外面的「疒」和生病、不舒服有關，裡面的「夋」念起來像「痠」。身體累到又軟又不舒服，就是「痠」。' }, char: '痠', zhuyin: 'ㄙㄨㄢ', radical: '疒', strokes: 12, words: ['腰痠背痛', '痠痛'], say: '痠，痠痛的痠', cloze: '＿痛', img: 'sore-back.png', options: ['痠', '酸', '俊', '唆'], clue: '這個字的外面是病字旁。', explain: '答案是「痠」，外面是病字旁；「酸」的左邊是「酉」，是酸甜的酸。', parts: ['疒', '夋'], story: '外面的病字旁和身體不舒服有關，裡面念起來像「痠」。走了很久的路，腳又軟又不舒服，就是「痠痛」。', sentence: '爬了一整天的山，我的腳好痠。' },
      { id: 'h-素', combo: { type: '會意字', pict: '下面是「糸」，是絲線；上面像垂下來的樣子。還沒染上顏色的白色絲線，就是「素」，所以有簡單、不花俏的意思。' }, char: '素', zhuyin: 'ㄙㄨˋ', radical: '糸', strokes: 10, words: ['樸素', '吃素'], say: '素，吃素的素', cloze: '吃＿', img: 'veggie-meal.png', options: ['素', '索', '紫', '系'], clue: '這個字的下面是「糸」，上面像「主」少了一點。', explain: '答案是「素」；「索」的上面是「十」和一個蓋子，「紫」的上面是「此」。', parts: ['龶', '糸'], story: '下面的「糸」是絲線，還沒染色的白絲線，簡單又乾淨。只吃青菜、不吃肉，叫做「吃素」。', sentence: '外婆每個月有幾天吃素。' },
      { id: 'h-尊', combo: { layout: 'tb', parts: [['酋', 's', ''], ['寸', 'm', '手']] }, char: '尊', zhuyin: 'ㄗㄨㄣ', radical: '寸', strokes: 12, words: ['尊嚴', '尊敬'], say: '尊，尊敬的尊', cloze: '＿敬', img: 'bow-teacher.png', options: ['尊', '遵', '導', '奠'], clue: '這個字的下面是「寸」。', explain: '答案是「尊」，下面是「寸」；「遵」多了辵字旁，「奠」的下面是「大」。', parts: ['酋', '寸'], story: '上面的「酋」像一個酒杯，下面的「寸」是手。雙手捧著酒杯敬人，表示很看重對方，就是「尊敬」。', sentence: '我們要尊敬長輩。', build: { layout: 'tb', show: ['酋', '？'], answer: '寸', options: ['寸', '大', '心', '木'], clue: '想一想：捧著杯子敬人要用手，下面放代表手的哪一個？' } },
      { id: 'h-嚴', combo: { type: '形聲字', pict: '上面有兩個「口」，像大聲說話；下面念起來像「嚴」。說話很大聲、要求很多，就是「嚴」。' }, char: '嚴', zhuyin: 'ㄧㄢˊ', radical: '口', strokes: 20, words: ['尊嚴', '嚴格'], say: '嚴，嚴格的嚴', cloze: '＿格', img: 'strict-coach.png', options: ['嚴', '儼', '巖', '厭'], clue: '這個字的上面有兩個「口」。', explain: '答案是「嚴」；「儼」的左邊多了單人旁，「巖」的上面多了「山」。', parts: ['吅', '厂', '敢'], story: '上面兩個「口」像在大聲說話，下面念起來像「嚴」。說話大聲、要求一點都不放鬆，就是「嚴格」。', sentence: '教練很嚴格，練習時不准偷懶。' },
      { id: 'h-勞', combo: { type: '會意字', pict: '上面有兩個「火」，中間像一個蓋子，下面是「力」。天黑了還點著火、用力工作，很辛苦，就是「勞」。' }, char: '勞', zhuyin: 'ㄌㄠˊ', radical: '力', strokes: 12, words: ['任勞任怨', '勤勞'], say: '勞，勤勞的勞', cloze: '勤＿', img: 'hard-work.png', options: ['勞', '營', '榮', '螢'], clue: '這個字的下面是「力」。', explain: '答案是「勞」，下面是「力」；「營」的下面是兩個口，「榮」的下面是「木」。', parts: ['火', '火', '冖', '力'], story: '兩個火是晚上點的燈火，下面是「力」。天黑了還在用力工作，很辛苦，就是「勤勞」。', sentence: '爸爸很勤勞，每天一早就去上班。' },
      { id: 'h-怨', combo: { layout: 'tb', parts: [['夗', 's', ''], ['心', 'm', '心']] }, char: '怨', zhuyin: 'ㄩㄢˋ', radical: '心', strokes: 9, words: ['任勞任怨', '抱怨'], say: '怨，抱怨的怨', cloze: '抱＿', img: 'complain-kid.png', options: ['怨', '恕', '怒', '宛'], clue: '這個字的下面是「心」，上面是「夗」。', explain: '答案是「怨」，上面是「夗」；「恕」的上面是「如」，「怒」的上面是「奴」。', parts: ['夗', '心'], story: '上面的「夗」念起來有點像「怨」，下面是心。心裡不高興、一直說別人不好，就是「抱怨」。', sentence: '下雨不能出去玩，弟弟一直抱怨。', build: { layout: 'tb', show: ['夗', '？'], answer: '心', options: ['心', '木', '口', '力'], clue: '想一想：不滿、不高興，是哪裡的感覺？' } },
      { id: 'h-慷', combo: { layout: 'lr', parts: [['忄', 'm', '心'], ['康', 's', '']] }, char: '慷', zhuyin: 'ㄎㄤ', radical: '心', strokes: 14, words: ['慷慨', '慷慨大方'], say: '慷，慷慨的慷', cloze: '＿慨', img: 'share-snack.png', options: ['慷', '康', '糠', '慌'], clue: '這個字的左邊是豎心旁，右邊是「康」。', explain: '答案是「慷」；「康」沒有豎心旁，「慌」的右邊是「荒」。', parts: ['忄', '康'], story: '左邊的豎心旁和心意有關，右邊的「康」念起來像「慷」。心胸大方，願意分東西給別人，就是「慷慨」。', sentence: '哥哥很慷慨，把新玩具借給大家玩。', build: { layout: 'lr', show: ['？', '康'], answer: '忄', options: ['忄', '米', '扌', '口'], clue: '想一想：大方是一種心意，左邊放哪一個？' } },
      { id: 'h-慨', combo: { layout: 'lr', parts: [['忄', 'm', '心'], ['既', 's', '']] }, char: '慨', zhuyin: 'ㄎㄞˇ', radical: '心', strokes: 14, words: ['慷慨', '感慨'], say: '慨，感慨的慨', cloze: '感＿', img: 'old-photo.png', options: ['慨', '概', '既', '溉'], clue: '這個字的左邊是豎心旁。', explain: '答案是「慨」，左邊是豎心旁；「概」的左邊是木字旁，「溉」的左邊是三點水。', parts: ['忄', '既'], story: '左邊的豎心旁和心情有關，右邊的「既」念起來有點像「慨」。看到以前的照片，心裡有很多想法、輕輕嘆氣，就是「感慨」。', sentence: '爺爺看著老照片，感慨時間過得好快。', build: { layout: 'lr', show: ['？', '既'], answer: '忄', options: ['忄', '木', '氵', '扌'], clue: '想一想：心裡有很多想法，左邊放哪一個？' } },
      { id: 'h-滋', combo: { layout: 'lr', parts: [['氵', 'm', '水'], ['茲', 's', '']] }, char: '滋', zhuyin: 'ㄗ', radical: '水', strokes: 12, words: ['滋潤', '滋味'], say: '滋，滋味的滋', cloze: '＿味', img: 'watering-plant.png', options: ['滋', '磁', '慈', '茲'], clue: '這個字的左邊是三點水。', explain: '答案是「滋」，左邊是三點水；「磁」的左邊是石字旁，「慈」的下面是心。', parts: ['氵', '茲'], story: '左邊是水，右邊的「茲」念起來像「滋」。給植物喝水，讓它不乾、長得好，就是「滋潤」。', sentence: '這碗湯的滋味好鮮美。', build: { layout: 'lr', show: ['？', '茲'], answer: '氵', options: ['氵', '石', '心', '艹'], clue: '想一想：讓乾乾的東西變得溼溼的，要用什麼？' } }
    ],
    vocab: [
      { id: 'v-恆久', cloze: true, clozeOptions: ['恆久', '短暫', '一下', '片刻'], word: '恆久', meaning: '很長的時間都不改變。', example: '我們的友誼會＿＿不變。', img: 'old-friends.png', options: ['恆久', '樸實', '慷慨', '滋潤'] },
      { id: 'v-黃澄澄', cloze: true, clozeOptions: ['黃澄澄', '黑漆漆', '白茫茫', '灰濛濛'], word: '黃澄澄', meaning: '顏色金亮亮、很鮮明。', example: '樹上掛滿＿＿＿的柳丁。', img: 'orange-tree.png', options: ['黃澄澄', '恆久', '樸素', '掃視'] },
      { id: 'v-稻穗', cloze: true, clozeOptions: ['稻穗', '石頭', '鞋子', '雨傘'], word: '稻穗', meaning: '米的植物頂端，一串一串垂下來的穀粒。', example: '秋天的田裡，＿＿都彎下了腰。', img: 'rice-ear.png', options: ['稻穗', '頭巾', '來源', '尊嚴'] },
      { id: 'v-養活', cloze: true, clozeOptions: ['養活', '丟掉', '忘記', '趕走'], word: '養活', meaning: '給吃給住，照顧家人過日子。', example: '爸爸努力工作，＿＿一家人。', img: 'family-dinner.png', options: ['養活', '撿拾', '掃視', '堆積'] },
      { id: 'v-來源', cloze: true, clozeOptions: ['來源', '結束', '終點', '尾巴'], word: '來源', meaning: '事情開始的地方、出處。', example: '這個故事的＿＿，是一本很老的書。', img: 'old-book.png', options: ['來源', '稻穗', '代表作', '頭巾'] },
      { id: 'v-藝術家', cloze: true, clozeOptions: ['藝術家', '消防員', '郵差', '司機'], word: '藝術家', meaning: '會畫畫、雕刻、演奏，在美的事物上很有成就的人。', example: '這位＿＿＿用回收的瓶子做出一隻大恐龍。', img: 'painter.png', options: ['藝術家', '代表作', '尊嚴', '來源'] },
      { id: 'v-樸實', cloze: true, clozeOptions: ['樸實', '虛假', '驕傲', '花俏'], word: '樸實', meaning: '簡單自然，不花俏、不裝模作樣。', example: '鄉下的阿伯說話很＿＿，讓人覺得很親切。', img: 'farmer-smile.png', options: ['樸實', '慷慨', '恆久', '黃澄澄'] },
      { id: 'v-堆積', cloze: true, clozeOptions: ['堆積', '飛走', '融化', '消失'], word: '堆積', meaning: '一層一層疊在一起。', example: '倉庫裡＿＿了好多箱子。', img: 'sand-pile.png', options: ['堆積', '撿拾', '滋潤', '養活'] },
      { id: 'v-撿拾', cloze: true, clozeOptions: ['撿拾', '丟棄', '踩踏', '弄亂'], word: '撿拾', meaning: '從地上拿起來。', example: '我們到海邊＿＿漂亮的貝殼。', img: 'shell-beach.png', options: ['撿拾', '堆積', '掃視', '養活'] },
      { id: 'v-頭巾', cloze: true, clozeOptions: ['頭巾', '鞋子', '手套', '襪子'], word: '頭巾', meaning: '包在腦袋上的一塊布。', example: '奶奶下田時會綁上＿＿遮太陽。', img: 'scarf-head.png', options: ['頭巾', '稻穗', '來源', '尊嚴'] },
      { id: 'v-腰痠背痛', cloze: true, clozeOptions: ['腰痠背痛', '精神飽滿', '活蹦亂跳', '神清氣爽'], word: '腰痠背痛', meaning: '做了太多粗重的工作，身體後面又累又不舒服。', example: '搬了一整天的家，大家都＿＿＿＿。', img: 'sore-back.png', options: ['腰痠背痛', '任勞任怨', '黃澄澄', '恆久'] },
      { id: 'v-樸素', cloze: true, clozeOptions: ['樸素', '華麗', '閃亮', '鮮豔'], word: '樸素', meaning: '簡單、不華麗。', example: '她穿著一件＿＿的白裙子。', img: 'plain-dress.png', options: ['樸素', '慷慨', '恆久', '掃視'] },
      { id: 'v-尊嚴', cloze: true, clozeOptions: ['尊嚴', '玩具', '零錢', '點心'], word: '尊嚴', meaning: '每個人都應該被看重、不被看不起的價值。', example: '不可以取笑別人，要顧及別人的＿＿。', img: 'respect-friend.png', options: ['尊嚴', '來源', '頭巾', '稻穗'] },
      { id: 'v-任勞任怨', cloze: true, clozeOptions: ['任勞任怨', '好吃懶做', '半途而廢', '敷衍了事'], word: '任勞任怨', meaning: '再辛苦也不發牢騷，認真把事做好。', example: '清潔阿姨每天＿＿＿＿的打掃校園。', img: 'cleaner.png', options: ['任勞任怨', '腰痠背痛', '黃澄澄', '藝術家'] },
      { id: 'v-慷慨', cloze: true, clozeOptions: ['慷慨', '小氣', '自私', '吝嗇'], word: '慷慨', meaning: '大方，願意把東西分給別人。', example: '叔叔很＿＿，捐了很多書給學校。', img: 'share-snack.png', options: ['慷慨', '樸實', '恆久', '樸素'] },
      { id: 'v-滋潤', cloze: true, clozeOptions: ['滋潤', '曬乾', '燒焦', '弄破'], word: '滋潤', meaning: '給水分，讓東西不乾。', example: '一場春雨＿＿了乾乾的大地。', img: 'watering-plant.png', options: ['滋潤', '堆積', '撿拾', '養活'] },
      { id: 'v-代表作', cloze: true, clozeOptions: ['代表作', '垃圾桶', '鉛筆盒', '鬧鐘'], word: '代表作', meaning: '最能顯出一個人本領的畫或書。', example: '這幅向日葵是那位畫家的＿＿＿。', img: 'museum-painting.png', options: ['代表作', '藝術家', '來源', '尊嚴'] },
      { id: 'v-掃視', cloze: true, clozeOptions: ['掃視', '閉眼', '睡覺', '發呆'], word: '掃視', meaning: '眼睛很快的往四周看一遍。', example: '老師＿＿全班，看看誰還沒到。', img: 'look-around.png', options: ['掃視', '撿拾', '堆積', '滋潤'] }
    ],
    charwords: [
      { id: 'cw-恆', char: '恆', img: 'practice-piano.png', charMeaning: '長久不變。', word: '恆心', meaning: '一直做下去、不放棄的心意。', example: '練字要有＿＿，每天寫一點。', options: ['恆心', '澄清', '麥穗', '飼養'] },
      { id: 'cw-澄', char: '澄', img: 'clear-lake.png', charMeaning: '水很乾淨、看得到底。', word: '澄清', meaning: '水很乾淨；也指把事情說清楚。', example: '他站出來＿＿誤會，大家才知道真相。', options: ['澄清', '水源', '才藝', '土堆'] },
      { id: 'cw-穗', char: '穗', img: 'rice-ear.png', charMeaning: '植物頂端一串串的穀粒或花。', word: '麥穗', meaning: '麥子頂端一串串的穀粒。', example: '風一吹，田裡的＿＿輕輕搖動。', options: ['麥穗', '毛巾', '恆心', '抱怨'] },
      { id: 'cw-養', char: '養', img: 'feed-chick.png', charMeaning: '照顧、餵食。', word: '飼養', meaning: '餵東西給動物吃，照顧牠們。', example: '阿公在院子裡＿＿了一群雞。', options: ['飼養', '撿起', '吃素', '尊敬'] },
      { id: 'cw-源', char: '源', img: 'spring-water.png', charMeaning: '水流出來的地方；事情開始的地方。', word: '水源', meaning: '河水最開始流出來的地方。', example: '我們要保護＿＿，不能在河邊丟垃圾。', options: ['水源', '麥穗', '勤勞', '感慨'] },
      { id: 'cw-藝', char: '藝', img: 'talent-show.png', charMeaning: '本領、技術。', word: '才藝', meaning: '唱歌、跳舞、畫畫這些本領。', example: '班上同學在＿＿表演中各顯身手。', options: ['才藝', '痠痛', '嚴格', '土堆'] },
      { id: 'cw-樸', char: '樸', img: 'plain-dress.png', charMeaning: '簡單、自然。', word: '簡樸', meaning: '生活簡單，不浪費。', example: '外公的生活很＿＿，東西壞了都自己修。', options: ['簡樸', '嚴格', '滋味', '才藝'] },
      { id: 'cw-堆', char: '堆', img: 'sand-pile.png', charMeaning: '疊成一團。', word: '土堆', meaning: '泥土疊成的小山。', example: '小狗在＿＿上挖了一個洞。', options: ['土堆', '毛巾', '水源', '恆心'] },
      { id: 'cw-撿', char: '撿', img: 'pick-trash.png', charMeaning: '從地上拿起來。', word: '撿起', meaning: '把掉在地上的東西拿起來。', example: '鉛筆掉了，我彎腰把它＿＿。', options: ['撿起', '飼養', '抱怨', '吃素'] },
      { id: 'cw-巾', char: '巾', img: 'towel.png', charMeaning: '一塊布。', word: '毛巾', meaning: '擦臉、擦手用的軟布。', example: '運動完，我用＿＿擦汗。', options: ['毛巾', '麥穗', '土堆', '才藝'] },
      { id: 'cw-痠', char: '痠', img: 'sore-back.png', charMeaning: '身體累得又軟又不舒服。', word: '痠痛', meaning: '身體又累又不舒服。', example: '跑完步，我的腿好＿＿。', options: ['痠痛', '澄清', '尊敬', '滋味'] },
      { id: 'cw-素', char: '素', img: 'veggie-meal.png', charMeaning: '青菜做的食物；簡單。', word: '吃素', meaning: '只吃青菜、豆子，不吃肉。', example: '外婆＿＿，所以我們煮了一桌青菜。', options: ['吃素', '撿起', '飼養', '勤勞'] },
      { id: 'cw-尊', char: '尊', img: 'bow-teacher.png', charMeaning: '看重。', word: '尊敬', meaning: '很看重一個人，對他有禮貌。', example: '我們都很＿＿那位老醫生。', options: ['尊敬', '抱怨', '痠痛', '簡樸'] },
      { id: 'cw-嚴', char: '嚴', img: 'strict-coach.png', charMeaning: '要求很多、不放鬆。', word: '嚴格', meaning: '要求很高，一點都不放鬆。', example: '游泳隊的教練非常＿＿。', options: ['嚴格', '吃素', '毛巾', '水源'] },
      { id: 'cw-勞', char: '勞', img: 'hard-work.png', charMeaning: '辛苦工作。', word: '勤勞', meaning: '很認真、不偷懶的工作。', example: '螞蟻很＿＿，一直在搬食物。', options: ['勤勞', '才藝', '澄清', '土堆'] },
      { id: 'cw-怨', char: '怨', img: 'complain-kid.png', charMeaning: '不滿、不高興。', word: '抱怨', meaning: '心裡不滿，一直說別人或事情不好。', example: '他一直＿＿午餐太難吃。', options: ['抱怨', '尊敬', '恆心', '麥穗'] },
      { id: 'cw-慷', char: '慷', img: 'share-snack.png', charMeaning: '大方。', word: '慷慨', meaning: '很大方，願意分東西給別人。', example: '老闆很＿＿，多送我們一杯飲料。', options: ['慷慨', '痠痛', '吃素', '水源'] },
      { id: 'cw-慨', char: '慨', img: 'old-photo.png', charMeaning: '心裡有很多想法而嘆氣。', word: '感慨', meaning: '心裡有很多感觸，忍不住嘆氣。', example: '回到小時候的學校，媽媽很＿＿。', options: ['感慨', '飼養', '撿起', '嚴格'] },
      { id: 'cw-滋', char: '滋', img: 'watering-plant.png', charMeaning: '溼潤；味道。', word: '滋味', meaning: '吃起來的味道；也指心裡的感覺。', example: '第一次得獎的＿＿真好。', options: ['滋味', '簡樸', '勤勞', '毛巾'] }
    ],
    /* 生字變成語：課本延伸成語，解釋和例句改成孩子聽得懂的話 */
    idioms: [
      { id: 'i-養精蓄銳', situationImg: 'id-rest-early.png',
        anim: { bg: 'room', a: { bed: ['🛏️', 40, 60, 22], kid: ['🧒', 40, 52, 11], zz: ['💤', 56, 34, 9], moon: ['🌙', 82, 18, 10], sun: ['☀️', 82, 18, 11, 'h'], arm: ['💪', 60, 40, 10, 'h'], cup: ['🏆', 76, 50, 11, 'h'] },
          s: [['明天要比賽了，弟弟早早上床睡覺。', [['wig', 'zz']]],
            ['好好休息，把力氣存起來。', [['bob', 'kid']]],
            ['第二天早上，他精神飽滿的起床。', [['out', 'moon'], ['in', 'sun'], ['out', 'zz'], ['in', 'arm'], ['jump', 'kid']]],
            ['比賽時，他有滿滿的力氣！', [['in', 'cup'], ['pop', 'cup']]]] },
        idiom: '養精蓄銳', char: '養', meaning: '好好休息，把精神和力氣存起來，準備做大事。', example: '明天要去爬山，今晚我們早點睡，養精蓄銳。', situation: '弟弟比賽前一天早早睡覺，第二天精神飽滿。',
        fill: { options: ['考試前一天，我早早上床＿＿＿＿。', '他整晚熬夜打電動，真是＿＿＿＿。'], clue: '提示：哪一句是好好休息、存力氣？', explain: '第一句用得對：早早睡覺，就是把力氣存起來。熬夜打電動，剛好相反。' } },
      { id: 'i-飲水思源', situationImg: 'id-thank-teacher.png',
        anim: { bg: 'park', a: { mt: ['⛰️', 20, 40, 22], drop: ['💧', 26, 40, 8, 'h'], kid: ['🧒', 70, 62, 12], cup: ['🥛', 60, 60, 9], think: ['💭', 76, 36, 11, 'h'], heart: ['❤️', 76, 34, 8, 'h'] },
          s: [['小明喝了一杯清涼的水。', [['wig', 'cup']]],
            ['他想：這些水是從哪裡來的呢？', [['in', 'think']]],
            ['原來是從遠遠的山上流下來的。', [['in', 'drop'], ['mv', 'drop', [60, 58, 1200]], ['out', 'drop']]],
            ['喝水的時候，不忘記水從哪裡來。', [['out', 'think'], ['in', 'heart'], ['pop', 'heart']]]] },
        idiom: '飲水思源', char: '源', meaning: '喝水時想到水從哪裡來；比喻不忘記別人給我們的幫助。', example: '他當上醫生後飲水思源，常常回去看小學老師。', situation: '小明喝水時想到，水是從遠遠的山上流下來的。',
        fill: { options: ['長大後，他常回母校幫忙，真是＿＿＿＿。', '別人幫了他，他馬上就忘了，一點也不懂＿＿＿＿。'], clue: '提示：哪一句是不忘記別人的幫助？', explain: '第一句用得對：回母校幫忙，就是不忘本。馬上忘記別人的幫助，剛好相反。' } },
      { id: 'i-養尊處優', situationImg: 'id-lazy-prince.png',
        anim: { bg: 'room', a: { sofa: ['🛋️', 40, 62, 22], king: ['🤴', 40, 52, 12], cake: ['🍰', 86, 40, 9], grape: ['🍇', 86, 60, 9], crown: ['👑', 40, 36, 8, 'h'], broom: ['🧹', 70, 70, 10, 'h'], no: ['🙅', 40, 52, 12, 'h', 'as:king'] },
          s: [['王子每天坐在軟軟的沙發上。', [['in', 'crown']]],
            ['想吃什麼，就有人送到他面前。', [['mv', 'cake', [54, 46, 900]], ['mv', 'grape', [56, 60, 900]]]],
            ['叫他自己掃地，他說不要！', [['in', 'broom'], ['out', 'king'], ['in', 'no']]],
            ['過得太舒服，什麼都不想自己做。', [['shake', 'no']]]] },
        idiom: '養尊處優', char: '尊', meaning: '過著很舒服、被人照顧的生活，什麼都不用自己做。', example: '他從小養尊處優，連鞋帶都不會自己綁。', situation: '王子每天坐著，想吃什麼就有人送來，叫他自己掃地也不肯。',
        fill: { options: ['他在家＿＿＿＿，連衣服都不會自己摺。', '她每天幫忙做家事，過著＿＿＿＿的日子。'], clue: '提示：哪一句是過得很舒服、什麼都不自己做？', explain: '第一句用得對：什麼都靠別人。每天幫忙做家事，就不是養尊處優。' } },
      { id: 'i-義正辭嚴', situationImg: 'id-stop-bully.png',
        anim: { bg: 'school', a: { big: ['👦', 30, 62, 13], small: ['🧒', 50, 66, 10], sad: ['😢', 50, 66, 10, 'h', 'as:small'], girl: ['👧', 78, 62, 12], talk: ['🗯️', 66, 40, 11, 'h'], warn: ['⚠️', 30, 36, 9, 'h'], ok: ['😊', 50, 66, 10, 'h', 'as:small'] },
          s: [['有人在搶小同學的東西。', [['shake', 'big'], ['out', 'small'], ['in', 'sad']]],
            ['小美走過去，很正經的說：', [['mv', 'girl', [66, 62, 800]]]],
            ['「這樣做是不對的，請你還給他！」', [['in', 'talk'], ['in', 'warn'], ['shake', 'warn']]],
            ['她說得有道理，那個人只好把東西還回去。', [['mv', 'big', [10, 62, 900]], ['out', 'sad'], ['in', 'ok']]]] },
        idiom: '義正辭嚴', char: '嚴', meaning: '道理站得住，說話又很嚴肅、很有力。', example: '看到有人插隊，他義正辭嚴的請對方排到後面。', situation: '小美看到有人搶小同學的東西，很嚴肅的說這樣不對。',
        fill: { options: ['看到有人亂丟垃圾，他＿＿＿＿的請對方撿起來。', '他嘻嘻哈哈的開玩笑，說得＿＿＿＿。'], clue: '提示：哪一句是有道理、說話很嚴肅？', explain: '第一句用得對：有道理又很嚴肅的提醒別人。嘻嘻哈哈開玩笑，剛好相反。' } },
      { id: 'i-汗馬功勞', situationImg: 'id-team-hero.png',
        anim: { bg: 'park', a: { horse: ['🐎', 14, 62, 14], sweat: ['💦', 22, 46, 8, 'h'], flag: ['🏁', 84, 56, 11], cup: ['🏆', 70, 30, 11, 'h'], medal: ['🏅', 40, 34, 9, 'h'] },
          s: [['一匹馬載著東西，一路往前跑。', [['mv', 'horse', [44, 62, 1100]]]],
            ['跑得全身都是汗，還是不停下來。', [['in', 'sweat'], ['wig', 'sweat'], ['mv', 'horse', [72, 62, 900]]]],
            ['終於把東西送到了！', [['in', 'cup'], ['pop', 'cup']]],
            ['辛苦做出來的大功勞，大家都記得。', [['in', 'medal']]]] },
        idiom: '汗馬功勞', char: '勞', meaning: '辛辛苦苦做出來的大功勞。', example: '這次比賽能得第一名，守門員立下了汗馬功勞。', situation: '馬兒跑得全身是汗，終於把東西送到，立了大功。',
        fill: { options: ['班上得到整潔比賽冠軍，衛生股長立下了＿＿＿＿。', '他什麼都沒做，卻說自己有＿＿＿＿。'], clue: '提示：哪一句是辛苦做出的大功勞？', explain: '第一句用得對：衛生股長辛苦帶大家打掃，立了大功。什麼都沒做，就沒有功勞。' } },
      { id: 'i-怨聲載道', situationImg: 'id-road-work.png',
        anim: { bg: 'park', a: { work: ['🚧', 50, 62, 16], car1: ['🚗', 14, 70, 10], car2: ['🚙', 26, 70, 10], a1: ['😠', 20, 36, 9, 'h'], a2: ['😤', 50, 30, 9, 'h'], a3: ['😠', 80, 36, 9, 'h'], talk: ['💬', 66, 22, 9, 'h'] },
          s: [['馬路挖了好幾個月都沒修好。', [['shake', 'work']]],
            ['車子塞在路上，動也動不了。', [['wig', 'car1'], ['wig', 'car2']]],
            ['這裡的人不高興，那裡的人也在罵。', [['in', 'a1'], ['in', 'a2'], ['in', 'a3']]],
            ['到處都是抱怨的聲音！', [['in', 'talk'], ['shake', 'a2']]]] },
        idiom: '怨聲載道', char: '怨', meaning: '到處都是抱怨的聲音，大家都很不滿。', example: '停水好幾天，附近的居民怨聲載道。', situation: '馬路挖了好久都沒修好，車子塞住，大家都在抱怨。',
        fill: { options: ['電梯壞了一個月都沒修，住戶們＿＿＿＿。', '新公園蓋好了，大家都＿＿＿＿，開心得不得了。'], clue: '提示：哪一句是大家都在抱怨？', explain: '第一句用得對：電梯一直沒修，大家都不滿。開心得不得了，剛好相反。' } }
    ],
    /* 改錯字：sentence 是正確的句子，畫面上會把 char 換成 wrong；options 的第一個是正確的字。clue 只說語詞的意思，不能出現正確的字。 */
    fix: [
      { id: 'fx-恆', char: '恆', wrong: '垣', sentence: '做事要有恆心，不要做一半就放棄。', options: ['恆', '垣', '桓'], clue: '這裡是說一直做下去的心意，想一想，哪一個字有豎心旁？', explain: '要改成「恆」。一直做下去的心意是「恆心」；「垣」是牆。' },
      { id: 'fx-澄', char: '澄', wrong: '證', sentence: '湖水好澄清，連水底的石頭都看得見。', options: ['澄', '證', '燈'], clue: '這裡是說水很乾淨，想一想，哪一個字有三點水？', explain: '要改成「澄」。水很乾淨是「澄清」；「證」是證明的證。' },
      { id: 'fx-穗', char: '穗', wrong: '惠', sentence: '田裡的稻穗長得又大又飽滿。', options: ['穗', '惠', '穩'], clue: '這裡說的是稻子頂端一串串的穀粒，想一想，哪一個字有禾字旁？', explain: '要改成「穗」。稻子頂端的穀粒是「稻穗」；「惠」是優惠的惠。' },
      { id: 'fx-養', char: '養', wrong: '羨', sentence: '我家飼養了一隻小白兔。', options: ['養', '羨', '美'], clue: '這裡是說照顧動物、餵牠吃東西，想一想，哪一個字的下面是「食」？', explain: '要改成「養」。照顧動物是「飼養」；「羨」是羨慕的羨。' },
      { id: 'fx-源', char: '源', wrong: '原', sentence: '這條河的水源在高高的山上。', options: ['源', '原', '願'], clue: '這裡說的是河水最開始流出來的地方，想一想，哪一個字有三點水？', explain: '要改成「源」。河水開始的地方是「水源」；「原」是原來的原。' },
      { id: 'fx-藝', char: '藝', wrong: '勢', sentence: '這位藝術家用石頭雕出一隻大象。', options: ['藝', '勢', '熱'], clue: '這裡說的是很會創作美的作品的人，想一想，哪一個字有草字頭？', explain: '要改成「藝」。會創作的人是「藝術家」；「勢」是手勢的勢。' },
      { id: 'fx-樸', char: '樸', wrong: '撲', sentence: '阿嬤住在一間樸素的小屋裡。', options: ['樸', '撲', '僕'], clue: '這裡是說簡單、不華麗，想一想，哪一個字有木字旁？', explain: '要改成「樸」。簡單不華麗是「樸素」；「撲」是撲過去的撲。' },
      { id: 'fx-堆', char: '堆', wrong: '推', sentence: '院子裡有一堆落葉。', options: ['堆', '推', '唯'], clue: '這裡是說很多東西疊在一起，想一想，哪一個字有土字旁？', explain: '要改成「堆」。疊在一起的是「一堆」；「推」是推門的推。' },
      { id: 'fx-撿', char: '撿', wrong: '檢', sentence: '他把掉在地上的錢包撿起來，交給警察。', options: ['撿', '檢', '險'], clue: '這裡是說把東西從地上拿起來，想一想，哪一個字有提手旁？', explain: '要改成「撿」。從地上拿起來是「撿起來」；「檢」是檢查的檢。' },
      { id: 'fx-巾', char: '巾', wrong: '中', sentence: '我在脖子上圍了一條圍巾。', options: ['巾', '中', '市'], clue: '這裡說的是圍在脖子上保暖的布，想一想，哪一個字的一豎沒有往上出頭？', explain: '要改成「巾」。圍在脖子上的是「圍巾」；「中」是中間的中。' },
      { id: 'fx-痠', char: '痠', wrong: '酸', sentence: '打了一整天的球，我的手臂好痠。', options: ['痠', '酸', '俊'], clue: '這裡是說身體累得不舒服，想一想，哪一個字有病字旁？', explain: '要改成「痠」。身體累得不舒服是「痠」；「酸」是吃起來酸酸的酸。' },
      { id: 'fx-素', char: '素', wrong: '索', sentence: '她穿得很樸素，只有一件白襯衫。', options: ['素', '索', '紫'], clue: '這裡是說穿得簡單、不華麗，想一想，哪一個字的上面像「主」少了一點？', explain: '要改成「素」。簡單不華麗是「樸素」；「索」是繩索的索。' },
      { id: 'fx-尊', char: '尊', wrong: '遵', sentence: '我們要尊重每一個人。', options: ['尊', '遵', '導'], clue: '這裡是說看重別人，想一想，哪一個字沒有辵字旁？', explain: '要改成「尊」。看重別人是「尊重」；「遵」是遵守的遵。' },
      { id: 'fx-嚴', char: '嚴', wrong: '巖', sentence: '這位老師很嚴格，作業一定要寫完。', options: ['嚴', '巖', '儼'], clue: '這裡是說要求很高、不放鬆，想一想，哪一個字的上面沒有山？', explain: '要改成「嚴」。要求很高是「嚴格」；「巖」是山上的大石頭。' },
      { id: 'fx-勞', char: '勞', wrong: '榮', sentence: '農夫很辛勞，天還沒亮就下田。', options: ['勞', '榮', '營'], clue: '這裡是說很辛苦的工作，想一想，哪一個字的下面是「力」？', explain: '要改成「勞」。辛苦工作是「辛勞」；「榮」是光榮的榮。' },
      { id: 'fx-怨', char: '怨', wrong: '恕', sentence: '遇到困難不要抱怨，想辦法解決才重要。', options: ['怨', '恕', '怒'], clue: '這裡是說心裡不滿、一直說不好，想一想，哪一個字的上面是「夗」？', explain: '要改成「怨」。一直說不好是「抱怨」；「恕」是原諒的意思。' },
      { id: 'fx-慷', char: '慷', wrong: '康', sentence: '他很慷慨，常常請大家吃點心。', options: ['慷', '康', '慌'], clue: '這裡是說很大方，想一想，哪一個字有豎心旁？', explain: '要改成「慷」。大方是「慷慨」；「康」是健康的康。' },
      { id: 'fx-慨', char: '慨', wrong: '概', sentence: '看到小時候的玩具，媽媽好感慨。', options: ['慨', '概', '溉'], clue: '這裡是說心裡有很多感觸，想一想，哪一個字有豎心旁？', explain: '要改成「慨」。心裡有感觸是「感慨」；「概」是大概的概。' },
      { id: 'fx-滋', char: '滋', wrong: '磁', sentence: '雨水滋潤了乾乾的田地。', options: ['滋', '磁', '慈'], clue: '這裡是說給水分讓東西不乾，想一想，哪一個字有三點水？', explain: '要改成「滋」。給水分是「滋潤」；「磁」是磁鐵的磁。' }
    ],
    similar: [
      { id: 's1', meaning: '「＿明」是拿出東西，讓人知道是真的。', sentence: '他拿出照片＿明自己去過。', frame: '＿明', options: ['證', '澄'], answer: '證', clue: '提示：要用說的、拿出來給人看，左邊是言字旁。', explain: '答案是「證」；「澄」是澄清的澄，有三點水。' },
      { id: 's2', meaning: '「安＿」是很平、不會晃動。', sentence: '爸爸把梯子扶得很安＿。', frame: '安＿', options: ['穩', '穗'], answer: '穩', clue: '提示：這個字的右邊下面是「心」，上面是「爫」和「彐」。', explain: '答案是「穩」；「穗」是稻穗的穗，右邊是「惠」。' },
      { id: 's3', meaning: '「＿慕」是看到別人有好東西，自己也很想要。', sentence: '我好＿慕他有一隻小狗。', frame: '＿慕', options: ['羨', '養'], answer: '羨', clue: '提示：這個字的下面像流口水，是「次」。', explain: '答案是「羨」；「養」是飼養的養，下面是「食」。' },
      { id: 's4', meaning: '「＿來」是本來、一開始。', sentence: '這間教室＿來是圖書室。', frame: '＿來', options: ['原', '源'], answer: '原', clue: '提示：這個字沒有三點水。', explain: '答案是「原」；「源」是水源的源，有三點水。' },
      { id: 's5', meaning: '「手＿」是用手比出來的動作。', sentence: '老師用手＿叫我們安靜。', frame: '手＿', options: ['勢', '藝'], answer: '勢', clue: '提示：這個字的下面是「力」。', explain: '答案是「勢」；「藝」是才藝的藝，有草字頭。' },
      { id: 's6', meaning: '「＿開」是用手出力，讓門往前打開。', sentence: '我用力＿開沉重的大門。', frame: '＿開', options: ['推', '堆'], answer: '推', clue: '提示：要用手，左邊是提手旁。', explain: '答案是「推」；「堆」是一堆的堆，有土字旁。' },
      { id: 's7', meaning: '「＿查」是仔細看看有沒有問題。', sentence: '出門前要＿查書包有沒有帶齊。', frame: '＿查', options: ['檢', '撿'], answer: '檢', clue: '提示：這個字的左邊是木字旁。', explain: '答案是「檢」；「撿」是撿起的撿，有提手旁。' },
      { id: 's8', meaning: '「＿甜」是吃起來又有點刺激、又有點甜。', sentence: '這顆梅子吃起來＿甜，好開胃。', frame: '＿甜', options: ['酸', '痠'], answer: '酸', clue: '提示：和味道有關，左邊是「酉」。', explain: '答案是「酸」；「痠」是痠痛的痠，有病字旁。' },
      { id: 's9', meaning: '「＿守」是照著規定去做。', sentence: '大家都要＿守交通規則。', frame: '＿守', options: ['遵', '尊'], answer: '遵', clue: '提示：和走路、照著做有關，多了辵字旁。', explain: '答案是「遵」；「尊」是尊敬的尊，沒有辵字旁。' },
      { id: 's10', meaning: '「光＿」是很有面子、讓人驕傲。', sentence: '得到冠軍，全班都覺得很光＿。', frame: '光＿', options: ['榮', '勞'], answer: '榮', clue: '提示：這個字的下面是「木」。', explain: '答案是「榮」；「勞」是勤勞的勞，下面是「力」。' },
      { id: 's11', meaning: '「大＿」是差不多、不一定很準。', sentence: '這段路走路大＿要十分鐘。', frame: '大＿', options: ['概', '慨'], answer: '概', clue: '提示：這個字的左邊是木字旁。', explain: '答案是「概」；「慨」是感慨的慨，有豎心旁。' },
      { id: 's12', meaning: '「＿鐵」是會吸住鐵釘的東西。', sentence: '我用＿鐵把迴紋針吸起來。', frame: '＿鐵', options: ['磁', '滋'], answer: '磁', clue: '提示：這個字的左邊是石字旁。', explain: '答案是「磁」；「滋」是滋潤的滋，有三點水。' }
    ],
    listen: [
      { id: 'l1', text: '樹上的柳丁，顏色金亮亮的。', answer: 0, options: [{ text: '黃澄澄', img: 'orange-tree.png' }, { text: '樸素', img: 'plain-dress.png' }, { text: '恆久', img: 'old-friends.png' }, { text: '堆積', img: 'sand-pile.png' }] },
      { id: 'l2', text: '搬了一整天的東西，身體又累又不舒服。', answer: 0, options: [{ text: '腰痠背痛', img: 'sore-back.png' }, { text: '任勞任怨', img: 'cleaner.png' }, { text: '慷慨', img: 'share-snack.png' }, { text: '掃視', img: 'look-around.png' }] },
      { id: 'l3', text: '她很大方，把點心分給大家吃。', answer: 0, options: [{ text: '慷慨', img: 'share-snack.png' }, { text: '樸實', img: 'farmer-smile.png' }, { text: '撿拾', img: 'shell-beach.png' }, { text: '滋潤', img: 'watering-plant.png' }] },
      { id: 'l4', text: '我們到沙灘上，把漂亮的貝殼拿起來。', answer: 0, options: [{ text: '撿拾', img: 'shell-beach.png' }, { text: '堆積', img: 'sand-pile.png' }, { text: '養活', img: 'family-dinner.png' }, { text: '掃視', img: 'look-around.png' }] },
      { id: 'l5', text: '清潔阿姨每天辛苦打掃，從來不發牢騷。', answer: 0, options: [{ text: '任勞任怨', img: 'cleaner.png' }, { text: '腰痠背痛', img: 'sore-back.png' }, { text: '黃澄澄', img: 'orange-tree.png' }, { text: '藝術家', img: 'painter.png' }] },
      { id: 'l6', text: '春天的雨讓乾乾的土地喝飽了水。', answer: 0, options: [{ text: '滋潤', img: 'watering-plant.png' }, { text: '堆積', img: 'sand-pile.png' }, { text: '撿拾', img: 'shell-beach.png' }, { text: '慷慨', img: 'share-snack.png' }] },
      { id: 'l7', text: '老師的眼睛很快的往全班看一遍。', answer: 0, options: [{ text: '掃視', img: 'look-around.png' }, { text: '撿拾', img: 'shell-beach.png' }, { text: '養活', img: 'family-dinner.png' }, { text: '滋潤', img: 'watering-plant.png' }] },
      { id: 'l8', text: '她穿著簡單的白裙子，一點都不華麗。', answer: 0, options: [{ text: '樸素', img: 'plain-dress.png' }, { text: '慷慨', img: 'share-snack.png' }, { text: '恆久', img: 'old-friends.png' }, { text: '黃澄澄', img: 'orange-tree.png' }] }
    ],
    /* ---------- 短語、句型、修辭（句子都是 Claude 自己寫的） ---------- */
    phrase: {
      /* 拼短語每一格下面寫要放什麼樣的詞 */
      fillLabels: { before: '量詞', answer: '疊字', noun: '什麼東西' },
      pickName: '看圖選一選', pickSay: '看圖，選出最適合的疊字，說說看是什麼樣的東西。',
      /* 短語：量詞＋疊字＋的＋名詞（課本的例子是課文原句，這裡換成自己寫的） */
      intro: { example: '一碗熱呼呼的湯麵', img: 'pr-hot-noodle.png',
        parts: [{ text: '一碗', role: '量詞' }, { text: '熱呼呼', role: '疊字' }, { text: '的' }, { text: '湯麵', role: '什麼東西' }],
        explain: '先說數量，再用疊字說出東西的樣子，加上「的」，最後說是什麼東西。' },
      pick: [
        { id: 'ph1', img: 'pr-green-field.png', before: '一片', noun: '草地', ask: '一片什麼樣的草地', look: '再看看圖片，草地是什麼顏色？', options: ['綠油油', '黑漆漆', '白茫茫', '紅通通'], clue: '提示：春天的小草長得又嫩又鮮豔。', explain: '答案是「綠油油」，完整的短語是「一片綠油油的草地」。' },
        { id: 'ph2', img: 'pr-chubby-baby.png', before: '一個', noun: '小寶寶', ask: '一個什麼樣的小寶寶', look: '再看看圖片，小寶寶的臉和手臂怎麼樣？', options: ['胖嘟嘟', '瘦巴巴', '冷冰冰', '黑漆漆'], clue: '提示：臉頰圓圓的，手臂一節一節的。', explain: '答案是「胖嘟嘟」，完整的短語是「一個胖嘟嘟的小寶寶」。' },
        { id: 'ph3', img: 'pr-snow-field.png', before: '一片', noun: '雪地', ask: '一片什麼樣的雪地', look: '再看看圖片，雪地看起來怎麼樣？', options: ['白茫茫', '綠油油', '熱呼呼', '紅通通'], clue: '提示：放眼看去一大片，都是同一種淡淡的顏色。', explain: '答案是「白茫茫」，完整的短語是「一片白茫茫的雪地」。' },
        { id: 'ph4', img: 'pr-dark-cave.png', before: '一個', noun: '山洞', ask: '一個什麼樣的山洞', look: '再看看圖片，山洞裡亮不亮？', options: ['黑漆漆', '白茫茫', '亮晶晶', '綠油油'], clue: '提示：裡面一點光都沒有，什麼都看不到。', explain: '答案是「黑漆漆」，完整的短語是「一個黑漆漆的山洞」。' },
        { id: 'ph5', img: 'pr-red-berry.png', before: '一顆', noun: '草莓', ask: '一顆什麼樣的草莓', look: '再看看圖片，草莓是什麼顏色？', options: ['紅通通', '綠油油', '黑漆漆', '白茫茫'], clue: '提示：顏色像火一樣，看起來好好吃。', explain: '答案是「紅通通」，完整的短語是「一顆紅通通的草莓」。' },
        { id: 'ph6', img: 'pr-ice-drink.png', before: '一杯', noun: '飲料', ask: '一杯什麼樣的飲料', look: '再看看圖片，杯子裡放了什麼？', options: ['冷冰冰', '熱呼呼', '胖嘟嘟', '黑漆漆'], clue: '提示：杯子裡放了很多凍成塊的水，摸起來好涼。', explain: '答案是「冷冰冰」，完整的短語是「一杯冷冰冰的飲料」。' },
        { id: 'ph7', img: 'pr-shiny-star.png', before: '一顆', noun: '星星', ask: '一顆什麼樣的星星', look: '再看看圖片，星星會不會發光？', options: ['亮晶晶', '黑漆漆', '胖嘟嘟', '冷冰冰'], clue: '提示：在夜空中一閃一閃的。', explain: '答案是「亮晶晶」，完整的短語是「一顆亮晶晶的星星」。' },
        { id: 'ph8', img: 'pr-soft-bread.png', before: '一塊', noun: '麵包', ask: '一塊什麼樣的麵包', look: '再看看圖片，麵包摸起來怎麼樣？', options: ['軟綿綿', '硬梆梆', '冷冰冰', '黑漆漆'], clue: '提示：輕輕一壓就凹下去，像雲朵一樣。', explain: '答案是「軟綿綿」，完整的短語是「一塊軟綿綿的麵包」。' }
      ],
      say: [],
      words: [
        { word: '腰痠背痛', meaning: '做了太多粗重的工作，身體後面又累又不舒服。', img: 'sore-back.png' },
        { word: '任勞任怨', meaning: '再辛苦也不發牢騷，認真把事做好。', img: 'cleaner.png' },
        { word: '慷慨', meaning: '大方，願意把東西分給別人。', img: 'share-snack.png' },
        { word: '滋潤', meaning: '給水分，讓東西不乾。', img: 'watering-plant.png' }
      ],
      choose: [
        { id: 'pw1', word: '腰痠背痛', options: ['爺爺彎腰拔了一下午的草，覺得腰痠背痛。', '睡了一個好覺，我覺得腰痠背痛，精神好好。'], clue: '提示：想一想，「腰痠背痛」是舒服，還是不舒服？', explain: '第一句用得對：彎腰工作很久，身體會不舒服。睡飽精神好，就不是腰痠背痛。' },
        { id: 'pw2', word: '任勞任怨', options: ['志工阿姨任勞任怨，每週都來幫忙整理書。', '他做一點點事就一直抱怨，真是任勞任怨。'], clue: '提示：想一想，「任勞任怨」會不會抱怨？', explain: '第一句用得對：辛苦幫忙又不抱怨。一直抱怨，剛好相反。' },
        { id: 'pw3', word: '慷慨', options: ['他很慷慨，把自己的雨傘借給沒帶傘的同學。', '他很慷慨，一顆糖都不肯分給別人。'], clue: '提示：想一想，「慷慨」是大方，還是小氣？', explain: '第一句用得對：把傘借給別人很大方。一顆糖都不分，是小氣。' },
        { id: 'pw4', word: '滋潤', options: ['擦了護手霜，乾乾的手變得很滋潤。', '太陽把衣服曬得好滋潤，乾乾的好舒服。'], clue: '提示：想一想，「滋潤」是溼溼的，還是乾乾的？', explain: '第一句用得對：擦了護手霜，手就不乾了。曬乾的衣服，不是滋潤。' }
      ],
      make: [
        { id: 'pm1', word: '腰痠背痛', clue: '提示：想想看，誰做了什麼事，會讓身體又累又不舒服？', model: '媽媽打掃了一整天，晚上覺得腰痠背痛。' },
        { id: 'pm2', word: '任勞任怨', clue: '提示：想想看，你身邊有誰很辛苦卻從不抱怨？', model: '學校的工友伯伯任勞任怨，每天把校園整理得很乾淨。' },
        { id: 'pm3', word: '慷慨', clue: '提示：想想看，誰很大方的分東西給別人？', model: '鄰居奶奶很慷慨，常常把種的青菜送給我們。' },
        { id: 'pm4', word: '滋潤', clue: '提示：想想看，什麼東西乾乾的，需要水或乳液？', model: '下了一場雨，滋潤了院子裡的花草。' }
      ]
    },
    pattern: [
      { key: 'yaoshi', id: 'ys', title: '要是……那麼……', img: 'yaoshi.png',
        meaning: '先用「要是」假設一種情況，再用「那麼」說這種情況會帶來的結果。',
        examples: ['要是明天放晴，那麼我們就去野餐。'],
        match: [
          { id: 'pt-ys-m1', img: 'pt-rain-umbrella.png', front: '要是出門時下雨了，', options: ['那麼記得要撐傘。', '那麼記得要擦防晒乳。', '那麼記得要吃冰。'], clue: '提示：看看圖片，下雨時要帶什麼？', explain: '答案是「那麼記得要撐傘」：下雨了，就要撐傘。' },
          { id: 'pt-ys-m2', img: 'pt-tired-sleep.png', front: '要是你覺得很累，', options: ['那麼就早點休息吧。', '那麼就去跑十圈吧。', '那麼就整晚不睡吧。'], clue: '提示：看看圖片，累了應該做什麼？', explain: '答案是「那麼就早點休息吧」：累了就要休息。' },
          { id: 'pt-ys-m3', img: 'pt-hungry-eat.png', front: '要是肚子餓了，', options: ['那麼先吃一點水果。', '那麼先去游泳。', '那麼先把碗洗乾淨。'], clue: '提示：看看圖片，餓了要怎麼辦？', explain: '答案是「那麼先吃一點水果」：餓了就吃東西。' }
        ],
        conj: [
          { id: 'pt-ys-c1', full: '要是大家都隨手關燈，那麼就能省下很多電。', img: 'pt-light-off.png', sentence: '＿＿大家都隨手關燈，＿＿就能省下很多電。', options: ['要是……那麼……', '雖然……卻……', '先……再……'], clue: '提示：前面是假設，後面是結果。數數看有幾個空格。', explain: '答案是「要是……那麼……」：要是大家都隨手關燈，那麼就能省下很多電。' },
          { id: 'pt-ys-c2', full: '要是你有不懂的地方，那麼可以舉手問老師。', img: 'pt-raise-hand.png', sentence: '＿＿你有不懂的地方，＿＿可以舉手問老師。', options: ['要是……那麼……', '雖然……卻……', '先……再……'], clue: '提示：先假設有不懂的地方，再說怎麼辦。數數看有幾個空格。', explain: '答案是「要是……那麼……」：要是你有不懂的地方，那麼可以舉手問老師。' }
        ],
        half: [
          { id: 'pt-ys-h1', front: '要是我會飛，', clue: '提示：會飛的話，你想做什麼？記得要說「那麼」。', model: '那麼我要飛到山頂看日出。' },
          { id: 'pt-ys-h2', front: '要是明天停課一天，', clue: '提示：不用上課的話，你會做什麼？記得要說「那麼」。', model: '那麼我要去圖書館看書。' }
        ],
        whole: [
          { id: 'pt-ys-w1', clue: '提示：先用「要是」說一個假設，再用「那麼」說會有什麼結果。想想看：如果發生一件事，你會怎麼做？', model: '要是同學跌倒了，那麼我會扶他去健康中心。' }
        ] },
      { key: 'suiran', id: 'sr', title: '雖然……卻……', img: 'suiranque.png',
        meaning: '先用「雖然」說一件事，再用「卻」說出和想的不一樣、相反的結果。',
        examples: ['這隻小狗雖然很小，叫聲卻很大。'],
        match: [
          { id: 'pt-sr-m1', img: 'pt-small-ant.png', front: '螞蟻雖然很小，', options: ['卻能搬起很重的東西。', '卻是很小的動物。', '卻在地上爬。'], clue: '提示：看看圖片，螞蟻小小的，牠搬的東西怎麼樣？', explain: '答案是「卻能搬起很重的東西」：小小的身體，卻有大力氣，前後相反。' },
          { id: 'pt-sr-m2', img: 'pt-old-runner.png', front: '阿公雖然年紀大了，', options: ['卻每天去跑步。', '卻頭髮白白的。', '卻常常在休息。'], clue: '提示：看看圖片，年紀大了，阿公在做什麼？', explain: '答案是「卻每天去跑步」：年紀大，卻很有體力，前後相反。' },
          { id: 'pt-sr-m3', img: 'pt-ugly-tasty.png', front: '這顆芭樂雖然長得不好看，', options: ['卻非常香甜。', '卻有點醜醜的。', '卻放在桌上。'], clue: '提示：看看圖片，吃了一口的人表情怎麼樣？', explain: '答案是「卻非常香甜」：不好看，卻很好吃，前後相反。' }
        ],
        conj: [
          { id: 'pt-sr-c1', full: '弟弟雖然跌倒了，卻沒有哭。', img: 'pt-fall-brave.png', sentence: '弟弟＿＿跌倒了，＿沒有哭。', options: ['雖然……卻……', '要是……那麼……', '先……再……'], clue: '提示：跌倒了應該會哭，結果相反。數數看有幾個空格。', explain: '答案是「雖然……卻……」：弟弟雖然跌倒了，卻沒有哭。' },
          { id: 'pt-sr-c2', full: '外面雖然很冷，屋子裡卻很溫暖。', img: 'pt-warm-house.png', sentence: '外面＿＿很冷，屋子裡＿很溫暖。', options: ['雖然……卻……', '要是……那麼……', '先……再……'], clue: '提示：外面和屋子裡剛好相反。數數看有幾個空格。', explain: '答案是「雖然……卻……」：外面雖然很冷，屋子裡卻很溫暖。' }
        ],
        half: [
          { id: 'pt-sr-h1', front: '這本書雖然很厚，', clue: '提示：很厚的書，你讀起來覺得怎麼樣？記得要說「卻」。', model: '我卻一個晚上就看完了。' },
          { id: 'pt-sr-h2', front: '他雖然考了第一名，', clue: '提示：考第一名，他有沒有很驕傲？記得要說「卻」。', model: '卻一點也不驕傲。' }
        ],
        whole: [
          { id: 'pt-sr-w1', clue: '提示：先用「雖然」說一件事，再用「卻」說相反的結果。想想看：有什麼事和你想的不一樣？', model: '這碗湯雖然看起來很清淡，喝起來卻很鮮甜。' }
        ] }
    ],
    rhetoric: {
      cards: [
        { key: 'repeat', name: '類疊', meaning: '同一個字或詞連著重複，或隔開來重複說好幾次，讀起來有節奏，也讓人印象更深。', example: '課文用「黃澄澄」、「一串串」這樣重複的字，讓稻田的顏色和稻穗的多更清楚。',
          show: { sentence: '一朵朵白雲飄在藍藍的天上。', mark: ['一朵朵', '藍藍'] },
          yesno: [
            { id: 'rh-rp-y1', sentence: '一隻隻小鴨跟在媽媽後面。', answer: true, mark: ['一隻隻'], clue: '提示：找找看，有沒有同一個字重複出現？', explain: '是類疊：「一隻隻」重複了「隻」。' },
            { id: 'rh-rp-y2', sentence: '小鴨跟在媽媽後面。', answer: false, clue: '提示：找找看，有沒有同一個字或詞重複出現？', explain: '不是類疊：這句話沒有重複的字或詞。' }
          ],
          pick: [
            { id: 'rh-rp-p1', mark: ['一顆顆'], options: ['樹上結了一顆顆蘋果。', '樹上結了很多蘋果。'], clue: '提示：哪一句有同一個字連著說兩次？', explain: '「一顆顆」是類疊。' },
            { id: 'rh-rp-p2', mark: ['紅通通'], options: ['她的臉紅通通的。', '她的臉很紅。'], clue: '提示：哪一句有重複的字？', explain: '「紅通通」是類疊。' },
            { id: 'rh-rp-p3', mark: ['一步一步'], options: ['他一步一步爬上山頂。', '他爬上了山頂。', '山頂的風很大。'], clue: '提示：哪一句把同一個詞說了兩次？', explain: '「一步一步」是類疊。' },
            { id: 'rh-rp-p4', mark: ['亮晶晶'], options: ['夜空中有亮晶晶的星星。', '夜空中有一顆星。', '晚上天很黑。'], clue: '提示：哪一句有連著重複的字？', explain: '「亮晶晶」是類疊。' },
            { id: 'rh-rp-p5', mark: ['好香', '好香'], options: ['好香啊！真的好香啊！', '這朵花很香。', '花開了。', '我聞了一下花。'], clue: '提示：哪一句把同一句話說了兩次？', explain: '「好香啊」說了兩次，是類疊。' },
            { id: 'rh-rp-p6', mark: ['一片片'], options: ['一片片落葉飄下來。', '落葉飄下來。', '秋天到了。', '風吹落了葉子。'], clue: '提示：哪一句有同一個字連著出現？', explain: '「一片片」是類疊。' }
          ] },
        { key: 'parallel', name: '排比', meaning: '把三句或三句以上樣子差不多的話，一句接一句排在一起說，讀起來很有節奏，也很有氣勢。', example: '課文最後用三個「美在……」，一口氣說出這幅畫美在哪裡。',
          show: { sentence: '我愛春天的花，我愛夏天的海，我愛秋天的月。', mark: ['我愛春天的花', '我愛夏天的海', '我愛秋天的月'] },
          yesno: [
            { id: 'rh-pa-y1', sentence: '他會唱歌，他會跳舞，他會畫畫。', answer: true, mark: ['他會唱歌', '他會跳舞', '他會畫畫'], clue: '提示：有沒有三句樣子差不多的話排在一起？', explain: '是排比：「他會……」三句排在一起。' },
            { id: 'rh-pa-y2', sentence: '他會唱歌。', answer: false, clue: '提示：有沒有三句樣子差不多的話排在一起？', explain: '不是排比：只有一句話。' }
          ],
          pick: [
            { id: 'rh-pa-p1', mark: ['謝謝老師', '謝謝爸媽', '謝謝同學'], options: ['謝謝老師，謝謝爸媽，謝謝同學。', '我要感謝大家。'], clue: '提示：哪一句有三句樣子差不多的話？', explain: '三個「謝謝……」排在一起，是排比。' },
            { id: 'rh-pa-p2', mark: ['有的在跑', '有的在跳', '有的在笑'], options: ['操場上的同學，有的在跑，有的在跳，有的在笑。', '操場上有很多同學。'], clue: '提示：哪一句有三個「有的……」？', explain: '三個「有的……」排在一起，是排比。' },
            { id: 'rh-pa-p3', mark: ['山是綠的', '水是藍的', '花是紅的'], options: ['山是綠的，水是藍的，花是紅的。', '這裡的風景很美。', '我們去山上玩。'], clue: '提示：哪一句有三句樣子差不多的話？', explain: '三個「……是……的」排在一起，是排比。' },
            { id: 'rh-pa-p4', mark: ['要認真', '要專心', '要有恆心'], options: ['讀書要認真，要專心，要有恆心。', '讀書很重要。', '我喜歡讀書。'], clue: '提示：哪一句一口氣說了三個「要……」？', explain: '三個「要……」排在一起，是排比。' },
            { id: 'rh-pa-p5', mark: ['風在吹', '雨在下', '雷在響'], options: ['風在吹，雨在下，雷在響。', '外面下大雨。', '今天的天氣不好。', '雨點像珍珠。'], clue: '提示：哪一句有三句樣子差不多的話？', explain: '三個「……在……」排在一起，是排比。' },
            { id: 'rh-pa-p6', mark: ['美在顏色', '美在形狀', '美在香味'], options: ['這朵花美在顏色，美在形狀，美在香味。', '這朵花很美。', '花園裡有花。', '花像小喇叭。'], clue: '提示：哪一句有三個「美在……」？', explain: '三個「美在……」排在一起，是排比。' }
          ] }
      ],
      quiz: [
        { id: 'rh1', sentence: '一串串葡萄掛在架子上。', answer: '類疊', mark: ['一串串'], clue: '提示：這句話有沒有重複的字？', explain: '答案是「類疊」：「一串串」重複了「串」。' },
        { id: 'rh2', sentence: '妹妹的手軟綿綿的。', answer: '類疊', mark: ['軟綿綿'], clue: '提示：這句話有沒有連著重複的字？', explain: '答案是「類疊」：「軟綿綿」重複了「綿」。' },
        { id: 'rh3', sentence: '春天來了，花開了，草綠了，鳥叫了。', answer: '排比', mark: ['花開了', '草綠了', '鳥叫了'], clue: '提示：有沒有三句樣子差不多的話？', explain: '答案是「排比」：三句「……了」排在一起。' },
        { id: 'rh4', sentence: '我們要愛家人，愛朋友，愛土地。', answer: '排比', mark: ['愛家人', '愛朋友', '愛土地'], clue: '提示：有沒有三個樣子差不多的句子？', explain: '答案是「排比」：三個「愛……」排在一起。' }
      ]
    }
  };
  if (typeof module === 'object' && module.exports) module.exports = d;
  else { root.H3A_WORDS = root.H3A_WORDS || {}; root.H3A_WORDS.L04 = d; }
})(this);
