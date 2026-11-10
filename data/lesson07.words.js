/* 第 7 課字詞練習（公開、不加密）。句子和解釋都是 Claude 自己寫的，沒有課本原文。
   生字、語詞：options 的第一個是正確答案（作答時會打亂）。 */
(function (root) {
  var d = {
    /* 理解提問的分類（照課本「閱讀理解提問」）：extract 提取訊息、infer 推論訊息、interpret 詮釋整合、evaluate 比較評估。只放題號，不放課文 */
    quizLevels: { qa: 'extract', qb: 'extract', qc: 'extract', qd: 'extract', qe: 'infer', qf: 'infer', qg: 'infer', qh: 'interpret',
      qi: 'interpret', qj: 'evaluate', k1: 'interpret', k2: 'evaluate' },
    /* 詮釋整合、比較評估的鷹架：think 是「想一想」的兩個步驟（不說答案），why 是「老師教你」的說明。不放課文原句 */
    quizHelp: {
      qh: { think: ['飛機要怎麼樣才飛得穩？小鷹要在什麼地方練習才變得強壯？', '這兩件事有什麼一樣的地方？'], why: '飛機要迎著風才飛得平穩，小鷹要頂著強風練習，翅膀才會有力。兩件事都在說：遇到阻力不是壞事，反而能讓我們變得更強。' },
      qi: { think: ['小蜘蛛的網破了好多次，牠怎麼做？', '作者最後問我們學到什麼，答案藏在小蜘蛛的哪個動作裡？'], why: '小蜘蛛的網一直被弄破，牠卻不在意，破了就再織，一直堅持到織好。作者希望我們學牠：遇到挫折不放棄，堅持到底。' },
      qj: { think: ['一路順風的人生很輕鬆，可是能學到什麼？', '一路逆風的人生很辛苦，又能讓我們變成什麼樣的人？'], why: '兩種答案都可以，重要的是說出理由。有人想要順順利利；也有人覺得遇到困難才會變得更堅強，就像頂著風練飛的小鷹。' }
    },
    /* 「說說看」改成選選看：good 兩個合理的想法（選哪一個都對）、bad 兩個不合理的，why 是老師教你的說明。不放課文原句 */
    talkChoices: {
      k1: { good: ['跳繩一直跳不好，我就每天多練習，最後連跳了一百下。', '考試考不好，我把錯的題目重新做一遍，下次就進步了。'], bad: ['遇到困難，我就哭著不做了。', '我從來沒遇過任何困難，也不想說。'], why: '題目問的是你怎麼面對困難。多練習、把錯的地方改正，就像小蜘蛛破了又織。哭著放棄、不想回答，都沒有學到課文的道理。' },
      k2: { good: ['我想要一路逆風，因為困難能讓我變得更堅強。', '我想要一路順風，但遇到逆風時，我也會勇敢面對。'], bad: ['我只想每天睡覺，什麼都不要做。', '我希望別人都遇到困難，只有我順利。'], why: '題目問的是你希望人生順風還是逆風，並說出理由。兩種選擇都可以，只要理由合理。只想睡覺、希望別人倒楣，都不是好想法。' }
    },
    hanzi: [
      { id: 'h-逆', combo: { type: '形聲字', pict: '外面的辵字旁和走路有關，裡面的「屰」像一個倒過來的人。人倒著走、往相反的方向走，就是「逆」。' }, char: '逆', zhuyin: 'ㄋㄧˋ', radical: '辵', strokes: 10, words: ['逆風', '逆境'], say: '逆，逆境的逆', cloze: '＿境', img: 'headwind.png', options: ['逆', '朔', '送', '迎'], clue: '這個字有辵字旁，裡面像倒過來的人。', explain: '答案是「逆」；「送」的裡面是「关」，「迎」的裡面是「卬」。', parts: ['辶', '屰'], story: '辵字旁和走路有關，裡面像一個倒過來的人。往相反的方向走，就是「逆」；不順利的時候，叫「逆境」。', sentence: '騎腳踏車遇到逆風，踩起來好吃力。' },
      { id: 'h-穩', combo: { layout: 'lr', parts: [['禾', 'm', '稻穀'], ['㥯', 's', '']] }, char: '穩', zhuyin: 'ㄨㄣˇ', radical: '禾', strokes: 19, words: ['平穩', '穩定'], say: '穩，穩定的穩', cloze: '＿定', img: 'steady-tray.png', options: ['穩', '隱', '穗', '急'], clue: '這個字的左邊是禾字旁。', explain: '答案是「穩」，左邊是禾字旁；「隱」的左邊是阜字旁，「穗」的右邊是「惠」。', parts: ['禾', '㥯'], story: '左邊的「禾」是稻穀，右邊念起來像「穩」。把收成的稻穀堆得好好的，不會倒，就是「穩」。', sentence: '服務生把盤子端得很穩。', build: { layout: 'lr', show: ['？', '㥯'], answer: '禾', options: ['禾', '阝', '木', '扌'], clue: '想一想：把收成的穀子堆好，左邊放哪一個？' } },
      { id: 'h-憐', combo: { layout: 'lr', parts: [['忄', 'm', '心'], ['粦', 's', '']] }, char: '憐', zhuyin: 'ㄌㄧㄢˊ', radical: '心', strokes: 15, words: ['可憐', '憐惜'], say: '憐，憐惜的憐', cloze: '＿惜', img: 'hug-puppy.png', options: ['憐', '鄰', '磷', '麟'], clue: '這個字的左邊是豎心旁。', explain: '答案是「憐」，左邊是豎心旁；「鄰」的右邊是邑字旁，「磷」的左邊是石字旁。', parts: ['忄', '粦'], story: '左邊的豎心旁和心情有關，右邊的「粦」念起來像「憐」。看到別人受苦，心裡很不捨，就是「可憐」、「憐惜」。', sentence: '淋雨的小狗看起來好可憐。', build: { layout: 'lr', show: ['？', '粦'], answer: '忄', options: ['忄', '阝', '石', '鹿'], clue: '想一想：心疼、不捨是一種心情，左邊放哪一個？' } },
      { id: 'h-競', combo: { type: '會意字', pict: '左右兩邊各是一個人頭上頂著東西，兩個人並排站著，比誰比較強，就是「競」。' }, char: '競', zhuyin: 'ㄐㄧㄥˋ', radical: '立', strokes: 20, words: ['物競天擇', '競賽'], say: '競，競賽的競', cloze: '＿賽', img: 'race-kids.png', options: ['競', '竟', '境', '鏡'], clue: '這個字左右兩邊長得一樣。', explain: '答案是「競」，左右兩邊一樣；「竟」只有一半，「鏡」的左邊是金字旁。', parts: ['竞', '竞'], story: '左右兩邊一樣，像兩個人並排站著比賽。比誰比較厲害，就是「競賽」。', sentence: '學校舉辦了一場朗讀競賽。' },
      { id: 'h-抗', combo: { layout: 'lr', parts: [['扌', 'm', '手'], ['亢', 's', '']] }, char: '抗', zhuyin: 'ㄎㄤˋ', radical: '手', strokes: 7, words: ['對抗', '抵抗'], say: '抗，抵抗的抗', cloze: '抵＿', img: 'resist-wind.png', options: ['抗', '坑', '炕', '航'], clue: '這個字的左邊是提手旁。', explain: '答案是「抗」，左邊是提手旁；「坑」的左邊是土字旁，「航」的左邊是舟字旁。', parts: ['扌', '亢'], story: '左邊是手，右邊的「亢」念起來像「抗」。用手擋住、不讓對方進來，就是「抵抗」。', sentence: '多運動可以讓身體抵抗病菌。', build: { layout: 'lr', show: ['？', '亢'], answer: '扌', options: ['扌', '土', '火', '舟'], clue: '想一想：伸手擋住，要用身體的哪個部分？' } },
      { id: 'h-逸', combo: { type: '會意字', pict: '裡面是「兔」，外面是辵字旁。兔子一下子就跑走了，所以「逸」有逃走、輕鬆自在的意思。' }, char: '逸', zhuyin: 'ㄧˋ', radical: '辵', strokes: 12, words: ['好逸惡勞', '安逸'], say: '逸，安逸的逸', cloze: '安＿', img: 'hammock.png', options: ['逸', '免', '冤', '勉'], clue: '這個字的裡面是「兔」，外面是辵字旁。', explain: '答案是「逸」；「免」沒有辵字旁，「冤」的上面是禿寶蓋。', parts: ['辶', '兔'], story: '兔子一溜煙就跑走了，自由自在、不受管。生活輕鬆、不用辛苦，就是「安逸」。', sentence: '爺爺退休後，過著安逸的生活。' },
      { id: 'h-鄰', combo: { layout: 'lr', parts: [['粦', 's', ''], ['阝', 'm', '城鎮']] }, char: '鄰', zhuyin: 'ㄌㄧㄣˊ', radical: '邑', strokes: 15, words: ['鄰居', '鄰座'], say: '鄰，鄰居的鄰', cloze: '＿居', img: 'neighbor-wave.png', options: ['鄰', '憐', '磷', '麟'], clue: '這個字的右邊是邑字旁。', explain: '答案是「鄰」，右邊是邑字旁；「憐」的左邊是豎心旁。', parts: ['粦', '阝'], story: '左邊的「粦」念起來像「鄰」，右邊的阝在右邊，和城鎮、地方有關。住在旁邊的人家，就是「鄰居」。', sentence: '我家的鄰居養了一隻大白狗。', build: { layout: 'lr', show: ['粦', '？'], answer: '阝', options: ['阝', '忄', '石', '鹿'], clue: '想一想：住在附近的人家，和地方有關，右邊放哪一個？' } },
      { id: 'h-脈', combo: { layout: 'lr', parts: [['月', 'm', '身體'], ['𠂢', 's', '']] }, char: '脈', zhuyin: 'ㄇㄞˋ', radical: '肉', strokes: 10, words: ['脈絡', '山脈'], say: '脈，山脈的脈', cloze: '山＿', img: 'mountain-range.png', options: ['脈', '派', '旅', '衍'], clue: '這個字的左邊是肉字旁。', explain: '答案是「脈」，左邊是肉字旁；「派」的左邊是三點水。', parts: ['月', '𠂢'], story: '左邊的肉字旁和身體有關，右邊像河水分成好幾條。身體裡分成好多條的血管，叫「血脈」；一座連著一座的山，叫「山脈」。', sentence: '中央山脈是臺灣最長的山脈。' },
      { id: 'h-絡', combo: { layout: 'lr', parts: [['糸', 'm', '絲線'], ['各', 's', '']] }, char: '絡', zhuyin: 'ㄌㄨㄛˋ', radical: '糸', strokes: 12, words: ['脈絡', '聯絡'], say: '絡，聯絡的絡', cloze: '聯＿', img: 'phone-call.png', options: ['絡', '路', '洛', '落'], clue: '這個字的左邊是糸字旁。', explain: '答案是「絡」，左邊是糸字旁；「路」的左邊是足字旁，「洛」的左邊是三點水。', parts: ['糸', '各'], story: '左邊的「糸」是絲線，右邊的「各」念起來有點像「絡」。像絲線把大家連起來，就是「聯絡」。', sentence: '有事情要記得跟家人聯絡。', build: { layout: 'lr', show: ['？', '各'], answer: '糸', options: ['糸', '足', '氵', '艹'], clue: '想一想：像線一樣把大家連起來，左邊放哪一個？' } },
      { id: 'h-緻', combo: { layout: 'lr', parts: [['糸', 'm', '絲線'], ['致', 's', '']] }, char: '緻', zhuyin: 'ㄓˋ', radical: '糸', strokes: 16, words: ['精緻', '細緻'], say: '緻，細緻的緻', cloze: '細＿', img: 'fine-cake.png', options: ['緻', '致', '到', '至'], clue: '這個字的左邊是糸字旁。', explain: '答案是「緻」，左邊是糸字旁；「致」沒有糸字旁。', parts: ['糸', '致'], story: '左邊的「糸」是絲線，右邊的「致」念起來像「緻」。用細細的絲線，一針一針縫得很漂亮，就是「細緻」。', sentence: '這塊手帕上的花繡得好細緻。', build: { layout: 'lr', show: ['？', '致'], answer: '糸', options: ['糸', '金', '木', '氵'], clue: '想一想：一針一針縫出來，左邊放和線有關的哪一個？' } },
      { id: 'h-弱', combo: { type: '會意字', pict: '「弱」是兩個彎彎的「弓」，裡面還有羽毛。弓彎彎的、羽毛輕輕的，一點都不堅硬，就是「弱」。' }, char: '弱', zhuyin: 'ㄖㄨㄛˋ', radical: '弓', strokes: 10, words: ['脆弱', '弱小'], say: '弱，弱小的弱', cloze: '＿小', img: 'small-chick.png', options: ['弱', '羽', '粥', '溺'], clue: '這個字是兩個彎彎的「弓」，裡面有兩點。', explain: '答案是「弱」；「羽」裡面是兩點一挑，「粥」的中間是「米」。', parts: ['弓', '弓'], story: '兩個彎彎的弓，裡面有輕輕的羽毛，一點力氣都沒有，就是「弱」。剛出生的小雞很「弱小」。', sentence: '剛出生的小貓很弱小，需要好好照顧。' },
      { id: 'h-噴', combo: { layout: 'lr', parts: [['口', 'm', '嘴巴'], ['賁', 's', '']] }, char: '噴', zhuyin: 'ㄆㄣ', radical: '口', strokes: 15, words: ['噴嚏', '噴水'], say: '噴，噴水的噴', cloze: '＿水', img: 'fountain.png', options: ['噴', '墳', '憤', '賁'], clue: '這個字的左邊是口字旁。', explain: '答案是「噴」，左邊是口字旁；「墳」的左邊是土字旁，「憤」的左邊是豎心旁。', parts: ['口', '賁'], story: '左邊是嘴巴，右邊的「賁」念起來像「噴」。從嘴巴裡用力衝出來，就是「噴」；公園裡往上衝的水，叫「噴水池」。', sentence: '公園的噴水池好漂亮。', build: { layout: 'lr', show: ['？', '賁'], answer: '口', options: ['口', '土', '忄', '貝'], clue: '想一想：從嘴巴衝出來，左邊放哪一個？' } },
      { id: 'h-嚏', combo: { layout: 'lr', parts: [['口', 'm', '嘴巴'], ['疐', 's', '']] }, char: '嚏', zhuyin: 'ㄊㄧˋ', radical: '口', strokes: 17, words: ['噴嚏', '打噴嚏'], say: '嚏，噴嚏的嚏', cloze: '噴＿', img: 'sneeze.png', options: ['嚏', '啼', '蹄', '涕'], clue: '這個字的左邊是口字旁，右邊是「疐」。', explain: '答案是「嚏」；「啼」的右邊是「帝」，「涕」的左邊是三點水。', parts: ['口', '疐'], story: '左邊是嘴巴，右邊的「疐」念起來像「嚏」。鼻子一癢，「哈啾」一聲從嘴巴和鼻子衝出來，就是「噴嚏」。', sentence: '花粉讓我一直打噴嚏。', build: { layout: 'lr', show: ['？', '疐'], answer: '口', options: ['口', '足', '氵', '目'], clue: '想一想：哈啾一聲從哪裡出來？' } },
      { id: 'h-織', combo: { layout: 'lr', parts: [['糸', 'm', '絲線'], ['戠', 's', '']] }, char: '織', zhuyin: 'ㄓ', radical: '糸', strokes: 18, words: ['織網', '編織'], say: '織，編織的織', cloze: '編＿', img: 'knitting.png', options: ['織', '識', '職', '幟'], clue: '這個字的左邊是糸字旁。', explain: '答案是「織」，左邊是糸字旁；「識」的左邊是言字旁，「職」的左邊是「耳」。', parts: ['糸', '戠'], story: '左邊的「糸」是絲線，右邊念起來像「織」。把線一條一條交叉起來，做成布或網子，就是「編織」。', sentence: '奶奶用毛線編織了一條圍巾。', build: { layout: 'lr', show: ['？', '戠'], answer: '糸', options: ['糸', '言', '耳', '巾'], clue: '想一想：做毛衣、圍巾要用什麼？' } },
      { id: 'h-碌', combo: { layout: 'lr', parts: [['石', 'm', '石頭'], ['彔', 's', '']] }, char: '碌', zhuyin: 'ㄌㄨˋ', radical: '石', strokes: 13, words: ['忙碌', '庸碌'], say: '碌，忙碌的碌', cloze: '忙＿', img: 'busy-mom.png', options: ['碌', '錄', '綠', '祿'], clue: '這個字的左邊是石字旁。', explain: '答案是「碌」，左邊是石字旁；「錄」的左邊是金字旁，「綠」的左邊是糸字旁。', parts: ['石', '彔'], story: '左邊是石頭，右邊的「彔」念起來像「碌」。像搬石頭一樣做個不停，沒時間休息，就是「忙碌」。', sentence: '過年前，媽媽忙碌的打掃家裡。', build: { layout: 'lr', show: ['？', '彔'], answer: '石', options: ['石', '金', '糸', '示'], clue: '想一想：像搬沉重的東西一樣做個不停，左邊放哪一個？' } },
      { id: 'h-盎', combo: { layout: 'tb', parts: [['央', 's', ''], ['皿', 'm', '盆子']] }, char: '盎', zhuyin: 'ㄤˋ', radical: '皿', strokes: 10, words: ['興味盎然', '綠意盎然'], say: '盎，綠意盎然的盎', cloze: '綠意＿然', img: 'green-spring.png', options: ['盎', '央', '盆', '益'], clue: '這個字的上面是「央」，下面是「皿」。', explain: '答案是「盎」；「盆」的上面是「分」，「益」的上面不是「央」。', parts: ['央', '皿'], story: '下面的「皿」是盆子，上面的「央」念起來像「盎」。盆子裝得滿滿的，就像很濃、很多的樣子。春天到處綠綠的，叫「綠意盎然」。', sentence: '春天的公園綠意盎然。', build: { layout: 'tb', show: ['央', '？'], answer: '皿', options: ['皿', '心', '大', '土'], clue: '想一想：盆子、碗這一類的東西，下面放哪一個？' } },
      { id: 'h-膽', combo: { layout: 'lr', parts: [['月', 'm', '身體'], ['詹', 's', '']] }, char: '膽', zhuyin: 'ㄉㄢˇ', radical: '肉', strokes: 17, words: ['藝高膽大', '膽量'], say: '膽，膽量的膽', cloze: '＿量', img: 'scared-kid.png', options: ['膽', '擔', '瞻', '檐'], clue: '這個字的左邊是肉字旁。', explain: '答案是「膽」，左邊是肉字旁；「擔」的左邊是提手旁，「瞻」的左邊是目字旁。', parts: ['月', '詹'], story: '左邊的肉字旁和身體有關，右邊的「詹」念起來像「膽」。以前的人覺得勇氣藏在身體的膽裡，所以不怕叫「大膽」，容易怕叫「膽小」。', sentence: '弟弟很膽小，晚上不敢一個人睡。', build: { layout: 'lr', show: ['？', '詹'], answer: '月', options: ['月', '扌', '目', '木'], clue: '想一想：這是身體裡的器官，左邊放哪一個？' } },
      { id: 'h-圈', combo: { type: '形聲字', pict: '外面的「囗」像一個圍起來的框，裡面的「卷」念起來像「圈」。圍起來的圓，就是「圈」。' }, char: '圈', zhuyin: 'ㄑㄩㄢ', radical: '囗', strokes: 11, words: ['一圈圈', '圓圈'], say: '圈，圓圈的圈', cloze: '圓＿', img: 'circle-run.png', options: ['圈', '卷', '捲', '倦'], clue: '這個字的外面被「囗」圍起來。', explain: '答案是「圈」，外面有「囗」；「捲」的左邊是提手旁，「倦」的左邊是單人旁。', parts: ['囗', '卷'], story: '外面的「囗」圍成一個框，裡面念起來像「圈」。圍起來、轉一圈的圓形，就是「圓圈」。', sentence: '小朋友手牽手圍成一個大圓圈。' },
      { id: 'h-疲', combo: { type: '形聲字', pict: '外面的「疒」和生病、不舒服有關，裡面的「皮」念起來像「疲」。身體累到很不舒服，就是「疲」。' }, char: '疲', zhuyin: 'ㄆㄧˊ', radical: '疒', strokes: 10, words: ['精疲力盡', '疲倦'], say: '疲，疲倦的疲', cloze: '＿倦', img: 'tired-kid.png', options: ['疲', '波', '坡', '被'], clue: '這個字的外面是病字旁。', explain: '答案是「疲」，外面是病字旁；「波」的左邊是三點水，「坡」的左邊是土字旁。', parts: ['疒', '皮'], story: '外面的病字旁和身體不舒服有關，裡面的「皮」念起來像「疲」。玩了一整天，身體又累又想睡，就是「疲倦」。', sentence: '爬完山，大家都很疲倦。' }
    ],
    vocab: [
      { id: 'v-逆風', cloze: true, clozeOptions: ['逆風', '晴天', '彩虹', '月亮'], word: '逆風', meaning: '迎面吹過來的氣流，和前進的方向相反。', example: '今天＿＿，跑步變得好吃力。', img: 'headwind.png', options: ['逆風', '平穩', '鄰居', '脈絡'] },
      { id: 'v-平穩', cloze: true, clozeOptions: ['平穩', '搖晃', '顛簸', '傾斜'], word: '平穩', meaning: '不搖晃，很安定。', example: '司機開車很＿＿，乘客都睡著了。', img: 'steady-tray.png', options: ['平穩', '脆弱', '忙碌', '精緻'] },
      { id: 'v-可憐', cloze: true, clozeOptions: ['可憐', '可惡', '可笑', '可怕'], word: '可憐', meaning: '讓人覺得同情、心疼。', example: '那隻迷路的小狗看起來好＿＿。', img: 'hug-puppy.png', options: ['可憐', '平穩', '鄰居', '噴嚏'] },
      { id: 'v-物競天擇', cloze: true, clozeOptions: ['物競天擇', '風和日麗', '一模一樣', '人山人海'], word: '物競天擇', meaning: '各種生命互相爭生存，適應環境的才活得下來。', example: '在＿＿＿＿的大自然裡，動物都要努力找食物、躲敵人。', img: 'savanna.png', options: ['物競天擇', '好逸惡勞', '興味盎然', '精疲力盡'] },
      { id: 'v-對抗', cloze: true, clozeOptions: ['對抗', '投降', '睡覺', '逃跑'], word: '對抗', meaning: '雙方互相抵擋、硬碰硬。', example: '小螞蟻團結起來，＿＿比牠們大的甲蟲。', img: 'resist-wind.png', options: ['對抗', '織網', '忙碌', '可憐'] },
      { id: 'v-好逸惡勞', cloze: true, clozeOptions: ['好逸惡勞', '勤勤懇懇', '任勞任怨', '努力不懈'], word: '好逸惡勞', meaning: '只想輕鬆享受，討厭辛苦工作。', example: '他＿＿＿＿，每天只想躺著看電視。', img: 'hammock.png', options: ['好逸惡勞', '物競天擇', '藝高膽大', '聚精會神'] },
      { id: 'v-鄰居', cloze: true, clozeOptions: ['鄰居', '外星人', '恐龍', '機器人'], word: '鄰居', meaning: '住在附近的人家。', example: '隔壁的＿＿送來一盤水餃。', img: 'neighbor-wave.png', options: ['鄰居', '逆風', '噴嚏', '脈絡'] },
      { id: 'v-脈絡', cloze: true, clozeOptions: ['脈絡', '顏色', '香味', '聲音'], word: '脈絡', meaning: '事情的條理；也指身體裡的血管。', example: '這篇故事的＿＿很清楚，一下子就讀懂了。', img: 'leaf-veins.png', options: ['脈絡', '鄰居', '織網', '逆風'] },
      { id: 'v-精緻', cloze: true, clozeOptions: ['精緻', '粗糙', '破爛', '隨便'], word: '精緻', meaning: '做得很細、很漂亮。', example: '這個木雕做得好＿＿，連鳥的羽毛都刻出來了。', img: 'fine-cake.png', options: ['精緻', '脆弱', '平穩', '可憐'] },
      { id: 'v-脆弱', cloze: true, clozeOptions: ['脆弱', '堅固', '強壯', '結實'], word: '脆弱', meaning: '不堅固，很容易壞掉。', example: '蛋殼很＿＿，拿的時候要小心。', img: 'egg-crack.png', options: ['脆弱', '精緻', '忙碌', '平穩'] },
      { id: 'v-噴嚏', cloze: true, clozeOptions: ['噴嚏', '口哨', '歌聲', '笑話'], word: '噴嚏', meaning: '鼻子癢，忍不住「哈啾」一聲。', example: '灰塵飛進鼻子，我打了一個大＿＿。', img: 'sneeze.png', options: ['噴嚏', '鄰居', '逆風', '織網'] },
      { id: 'v-織網', cloze: true, clozeOptions: ['織網', '游泳', '唱歌', '下蛋'], word: '織網', meaning: '用細絲一條一條交叉，做出捕蟲的陷阱。', example: '蜘蛛在屋簷下＿＿，等小蟲飛過來。', img: 'spider-web.png', options: ['織網', '對抗', '噴嚏', '可憐'] },
      { id: 'v-忙碌', cloze: true, clozeOptions: ['忙碌', '悠閒', '無聊', '空閒'], word: '忙碌', meaning: '事情很多，沒有空休息。', example: '餐廳中午客人很多，店員都很＿＿。', img: 'busy-mom.png', options: ['忙碌', '精緻', '脆弱', '平穩'] },
      { id: 'v-興味盎然', cloze: true, clozeOptions: ['興味盎然', '無精打采', '昏昏欲睡', '垂頭喪氣'], word: '興味盎然', meaning: '覺得非常有趣、看得很起勁。', example: '弟弟＿＿＿＿的看著螞蟻搬家。', img: 'watch-ants.png', options: ['興味盎然', '精疲力盡', '好逸惡勞', '物競天擇'] },
      { id: 'v-藝高膽大', cloze: true, clozeOptions: ['藝高膽大', '膽小如鼠', '手忙腳亂', '笨手笨腳'], word: '藝高膽大', meaning: '本領很強，所以什麼都不怕。', example: '走鋼索的表演者＿＿＿＿，在高空中走得又快又穩。', img: 'tightrope.png', options: ['藝高膽大', '聚精會神', '興味盎然', '好逸惡勞'] },
      { id: 'v-一圈圈', cloze: true, clozeOptions: ['一圈圈', '一條條', '一片片', '一顆顆'], word: '一圈圈', meaning: '繞著中心轉了好幾回。', example: '我們繞著操場＿＿＿的慢跑。', img: 'circle-run.png', options: ['一圈圈', '織網', '鄰居', '脈絡'] },
      { id: 'v-精疲力盡', cloze: true, clozeOptions: ['精疲力盡', '精神飽滿', '神采奕奕', '活力十足'], word: '精疲力盡', meaning: '累壞了，連動一下都沒辦法。', example: '跑完馬拉松，大家都＿＿＿＿，坐在地上休息。', img: 'tired-kid.png', options: ['精疲力盡', '興味盎然', '藝高膽大', '物競天擇'] },
      { id: 'v-聚精會神', cloze: true, clozeOptions: ['聚精會神', '東張西望', '心不在焉', '三心二意'], word: '聚精會神', meaning: '非常專心。', example: '全班＿＿＿＿的聽老師說故事。', img: 'listen-story.png', options: ['聚精會神', '好逸惡勞', '精疲力盡', '藝高膽大'] }
    ],
    charwords: [
      { id: 'cw-逆', char: '逆', img: 'headwind.png', charMeaning: '相反、不順。', word: '逆境', meaning: '不順利、很困難的情況。', example: '在＿＿中不放棄，才能變得更堅強。', options: ['逆境', '穩定', '憐惜', '競賽'] },
      { id: 'cw-穩', char: '穩', img: 'steady-tray.png', charMeaning: '安定、不搖晃。', word: '穩定', meaning: '不變動、很安定。', example: '病人的情況已經＿＿下來了。', options: ['穩定', '抵抗', '安逸', '山脈'] },
      { id: 'cw-憐', char: '憐', img: 'hug-puppy.png', charMeaning: '同情、心疼。', word: '憐惜', meaning: '心疼、捨不得。', example: '看到受傷的小鳥，大家都很＿＿牠。', options: ['憐惜', '聯絡', '細緻', '弱小'] },
      { id: 'cw-競', char: '競', img: 'race-kids.png', charMeaning: '比賽、互相爭。', word: '競賽', meaning: '比賽，看誰比較厲害。', example: '我參加了學校的作文＿＿。', options: ['競賽', '噴水', '編織', '忙碌'] },
      { id: 'cw-抗', char: '抗', img: 'resist-wind.png', charMeaning: '擋住、對打。', word: '抵抗', meaning: '擋住，不讓對方進來。', example: '多吃蔬果可以＿＿感冒。', options: ['抵抗', '綠意', '膽小', '圓圈'] },
      { id: 'cw-逸', char: '逸', img: 'hammock.png', charMeaning: '輕鬆、自在。', word: '安逸', meaning: '生活輕鬆、舒服。', example: '小貓窩在沙發上，看起來好＿＿。', options: ['安逸', '疲倦', '逆境', '穩定'] },
      { id: 'cw-鄰', char: '鄰', img: 'neighbor-wave.png', charMeaning: '住在旁邊的人。', word: '鄰座', meaning: '坐在旁邊座位的人。', example: '我的＿＿同學借我一枝筆。', options: ['鄰座', '憐惜', '競賽', '抵抗'] },
      { id: 'cw-脈', char: '脈', img: 'mountain-range.png', charMeaning: '像血管一樣連成一條條的東西。', word: '山脈', meaning: '一座連著一座、排成長長一列的山。', example: '從飛機上往下看，＿＿像一條綠色的大龍。', options: ['山脈', '安逸', '鄰座', '聯絡'] },
      { id: 'cw-絡', char: '絡', img: 'phone-call.png', charMeaning: '連起來。', word: '聯絡', meaning: '和別人保持往來。', example: '出遠門時，要常常和家人＿＿。', options: ['聯絡', '細緻', '弱小', '噴水'] },
      { id: 'cw-緻', char: '緻', img: 'fine-cake.png', charMeaning: '很細、很精巧。', word: '細緻', meaning: '很細、很仔細，做得很漂亮。', example: '這件衣服的花紋很＿＿。', options: ['細緻', '編織', '忙碌', '綠意'] },
      { id: 'cw-弱', char: '弱', img: 'small-chick.png', charMeaning: '沒有力氣、不堅強。', word: '弱小', meaning: '又小又沒有力氣。', example: '我們要保護＿＿的小動物。', options: ['弱小', '膽小', '圓圈', '疲倦'] },
      { id: 'cw-噴', char: '噴', img: 'fountain.png', charMeaning: '用力衝出來。', word: '噴水', meaning: '水從洞口用力衝出來。', example: '大象用鼻子＿＿洗澡。', options: ['噴水', '逆境', '穩定', '憐惜'] },
      { id: 'cw-嚏', char: '嚏', img: 'sneeze.png', charMeaning: '鼻子癢時衝出來的氣。', word: '打噴嚏', meaning: '鼻子癢，「哈啾」一聲。', example: '感冒了，我一直＿＿＿。', options: ['打噴嚏', '競賽', '抵抗', '安逸'] },
      { id: 'cw-織', char: '織', img: 'knitting.png', charMeaning: '把線交叉做成布或網。', word: '編織', meaning: '把線或草交叉做成東西。', example: '阿嬤用竹子＿＿出一個籃子。', options: ['編織', '鄰座', '山脈', '聯絡'] },
      { id: 'cw-碌', char: '碌', img: 'busy-mom.png', charMeaning: '事情多、不得休息。', word: '忙碌', meaning: '事情很多，沒有空休息。', example: '爸爸工作很＿＿，常常很晚才回家。', options: ['忙碌', '細緻', '弱小', '噴水'] },
      { id: 'cw-盎', char: '盎', img: 'green-spring.png', charMeaning: '滿滿的、很濃的樣子。', word: '綠意盎然', meaning: '到處都綠綠的，充滿生氣。', example: '春天的山上＿＿＿＿。', options: ['綠意盎然', '打噴嚏', '編織', '忙碌'] },
      { id: 'cw-膽', char: '膽', img: 'scared-kid.png', charMeaning: '勇氣。', word: '膽小', meaning: '很容易害怕。', example: '妹妹很＿＿，看到蟑螂就尖叫。', options: ['膽小', '圓圈', '疲倦', '逆境'] },
      { id: 'cw-圈', char: '圈', img: 'circle-run.png', charMeaning: '圍起來的圓。', word: '圓圈', meaning: '圓圓的形狀。', example: '老師在對的答案上畫一個＿＿。', options: ['圓圈', '穩定', '憐惜', '競賽'] },
      { id: 'cw-疲', char: '疲', img: 'tired-kid.png', charMeaning: '很累。', word: '疲倦', meaning: '又累又想睡。', example: '熬夜以後，第二天覺得好＿＿。', options: ['疲倦', '抵抗', '安逸', '鄰座'] }
    ],
    /* 生字變成語：課本延伸成語，解釋和例句改成孩子聽得懂的話 */
    idioms: [
      { id: 'i-莫逆之交', situationImg: 'id-best-friends.png',
        anim: { bg: 'park', a: { a: ['🧒', 30, 62, 12], b: ['👦', 70, 62, 12], h1: ['💛', 50, 40, 9, 'h'], ball: ['⚽', 50, 74, 8, 'h'], umb: ['☂️', 50, 40, 12, 'h'], rain: ['🌧️', 50, 16, 12, 'h'] },
          s: [['小明和小華從小一起長大。', [['bob', 'a'], ['bob', 'b']]],
            ['開心時一起玩，', [['in', 'ball'], ['jump', 'ball']]],
            ['下雨了，兩人共撐一把傘。', [['out', 'ball'], ['in', 'rain'], ['in', 'umb'], ['mv', 'a', [42, 62, 600]], ['mv', 'b', [58, 62, 600]]]],
            ['心意相通的好朋友，就是莫逆之交。', [['out', 'rain'], ['out', 'umb'], ['in', 'h1'], ['pop', 'h1']]]] },
        idiom: '莫逆之交', char: '逆', meaning: '心意相通、感情非常好的朋友。', example: '爸爸和他的大學同學是莫逆之交，常常一起爬山。', situation: '小明和小華從小一起長大，開心時一起玩，下雨時一起撐傘。',
        fill: { options: ['他們兩人無話不談，是＿＿＿＿。', '他們兩人一見面就吵架，真是＿＿＿＿。'], clue: '提示：哪一句是感情很好的朋友？', explain: '第一句用得對：無話不談，感情很好。一見面就吵架，剛好相反。' } },
      { id: 'i-十拿九穩', situationImg: 'id-sure-shot.png',
        anim: { bg: 'park', a: { kid: ['🧒', 24, 62, 12], ball: ['🏀', 30, 50, 8], hoop: ['🥅', 80, 40, 14], ok: ['👌', 24, 36, 9, 'h'], star: ['🌟', 80, 20, 9, 'h'] },
          s: [['小強每天都練習投籃。', [['jump', 'kid']]],
            ['他一投，球就進了；再投，又進了。', [['mv', 'ball', [78, 38, 700]], ['in', 'star'], ['mv', 'ball', [30, 50, 400]]]],
            ['這一球，他很有把握！', [['in', 'ok'], ['pop', 'ok']]],
            ['做事非常有把握，就是十拿九穩。', [['mv', 'ball', [78, 38, 700]], ['pop', 'star']]]] },
        idiom: '十拿九穩', char: '穩', meaning: '很有把握，幾乎一定會成功。', example: '他準備得很充分，這次考試十拿九穩。', situation: '小強每天練習投籃，投一球進一球，很有把握。',
        fill: { options: ['他練習了好幾個月，這場比賽＿＿＿＿。', '他一次都沒練習過，卻覺得＿＿＿＿，結果輸了。'], clue: '提示：哪一句是真的很有把握？', explain: '第一句用得對：練習很久，所以很有把握。沒練習就覺得有把握，用錯了地方。' } },
      { id: 'i-同病相憐', situationImg: 'id-same-cold.png',
        anim: { bg: 'room', a: { a: ['🤧', 30, 60, 12], b: ['🤒', 70, 60, 12], med: ['💊', 50, 40, 8, 'h'], h1: ['🤝', 50, 60, 10, 'h'], heart: ['💗', 50, 30, 9, 'h'] },
          s: [['小美感冒了，一直打噴嚏。', [['shake', 'a']]],
            ['隔壁床的小芳也感冒發燒。', [['shake', 'b']]],
            ['兩人互相安慰，一起吃藥，', [['in', 'med'], ['in', 'h1']]],
            ['遇到一樣的困難，就互相同情、互相幫忙。', [['in', 'heart'], ['pop', 'heart']]]] },
        idiom: '同病相憐', char: '憐', meaning: '遇到一樣不好的事的人，互相同情、互相幫忙。', example: '兩個都忘了帶便當的同學同病相憐，就一起分麵包吃。', situation: '小美和小芳都感冒了，兩人互相安慰、一起吃藥。',
        fill: { options: ['我們兩個都扭傷了腳，＿＿＿＿，常常互相打氣。', '他考了一百分，我也考了一百分，我們＿＿＿＿。'], clue: '提示：哪一句是遇到一樣不好的事？', explain: '第一句用得對：兩人都扭傷腳。考一百分是好事，不能說同病相憐。' } },
      { id: 'i-分庭抗禮', situationImg: 'id-equal-team.png',
        anim: { bg: 'park', a: { a: ['🧒', 22, 62, 12], b: ['👧', 78, 62, 12], rope: ['🪢', 50, 64, 14], l: ['⚖️', 50, 30, 12, 'h'] },
          s: [['兩隊在拔河，', [['shake', 'rope']]],
            ['左邊拉一下，右邊也拉一下，', [['mv', 'rope', [44, 64, 400]], ['mv', 'rope', [56, 64, 400]], ['mv', 'rope', [50, 64, 400]]]],
            ['誰也拉不贏誰。', [['shake', 'a'], ['shake', 'b']]],
            ['兩邊力量一樣大，就是分庭抗禮。', [['in', 'l'], ['bob', 'l']]]] },
        idiom: '分庭抗禮', char: '抗', meaning: '雙方力量差不多，平起平坐，誰也不輸誰。', example: '這兩支球隊實力相當，在聯賽中分庭抗禮。', situation: '兩隊拔河，拉來拉去，誰也拉不贏誰。',
        fill: { options: ['這兩家店的麵包都很好吃，可以說是＿＿＿＿。', '冠軍隊一下子就贏了新手隊，雙方＿＿＿＿。'], clue: '提示：哪一句是兩邊差不多厲害？', explain: '第一句用得對：兩家店一樣好。一下子就贏了，表示差很多，不是分庭抗禮。' } },
      { id: 'i-絡繹不絕', situationImg: 'id-busy-shop.png',
        anim: { bg: 'park', a: { shop: ['🏪', 80, 52, 18], p1: ['🧑', 4, 66, 10], p2: ['👩', 4, 66, 10, 'h'], p3: ['👦', 4, 66, 10, 'h'], p4: ['👧', 4, 66, 10, 'h'] },
          s: [['新開的冰店前面，', [['bob', 'shop']]],
            ['一個客人走過來，', [['mv', 'p1', [64, 66, 800]]]],
            ['又一個，再一個，一直沒有停過。', [['in', 'p2'], ['mv', 'p2', [50, 66, 800]], ['in', 'p3'], ['mv', 'p3', [36, 66, 800]], ['in', 'p4'], ['mv', 'p4', [22, 66, 800]]]],
            ['人一個接一個不斷來，就是絡繹不絕。', [['jump', 'shop']]]] },
        idiom: '絡繹不絕', char: '絡', meaning: '人或車一個接一個，連續不斷。', example: '過年時，到廟裡拜拜的人絡繹不絕。', situation: '新開的冰店前，客人一個接一個來，一直沒停過。',
        fill: { options: ['假日的動物園，遊客＿＿＿＿。', '颱風天街上一個人也沒有，行人＿＿＿＿。'], clue: '提示：哪一句是人一個接一個不停的來？', explain: '第一句用得對：遊客一直來。一個人也沒有，不是絡繹不絕。' } },
      { id: 'i-弱肉強食', situationImg: 'id-food-chain.png',
        anim: { bg: 'sea', a: { s: ['🐟', 20, 60, 8], m: ['🐠', 50, 46, 11], b: ['🦈', 86, 34, 16], bang: ['💥', 50, 46, 9, 'h'] },
          s: [['大海裡，小魚游來游去。', [['bob', 's']]],
            ['中魚游過來，想吃小魚，', [['mv', 'm', [30, 56, 800]], ['mv', 's', [6, 76, 600]]]],
            ['大鯊魚又追著中魚跑！', [['mv', 'b', [44, 50, 800]], ['mv', 'm', [14, 70, 600]], ['in', 'bang']]],
            ['強的吃掉弱的，就是弱肉強食。', [['shake', 'b']]]] },
        idiom: '弱肉強食', char: '弱', meaning: '弱小的被強大的吃掉；比喻強的欺負弱的。', example: '大自然裡弱肉強食，小動物要很小心才能活下來。', situation: '大海裡，中魚追小魚，大鯊魚又追中魚。',
        fill: { options: ['草原上獅子追捕羚羊，是＿＿＿＿的世界。', '大家互相幫助、互相照顧，真是＿＿＿＿。'], clue: '提示：哪一句是強的吃掉弱的？', explain: '第一句用得對：獅子追捕羚羊。互相幫助，剛好相反。' } }
    ],
    /* 改錯字：sentence 是正確的句子，畫面上會把 char 換成 wrong；options 的第一個是正確的字。clue 只說語詞的意思，不能出現正確的字。 */
    fix: [
      { id: 'fx-逆', char: '逆', wrong: '送', sentence: '他在逆境中也不放棄。', options: ['逆', '送', '迎'], clue: '這裡是說不順利的情況，想一想，哪一個字裡面像倒過來的人？', explain: '要改成「逆」。不順利的情況是「逆境」；「送」是送禮的送。' },
      { id: 'fx-穩', char: '穩', wrong: '隱', sentence: '把花瓶放穩，才不會掉下來。', options: ['穩', '隱', '穗'], clue: '這裡是說放得安定、不搖晃，想一想，哪一個字有禾字旁？', explain: '要改成「穩」。不搖晃是「穩」；「隱」是隱藏的隱。' },
      { id: 'fx-憐', char: '憐', wrong: '鄰', sentence: '那隻流浪貓好可憐。', options: ['憐', '鄰', '磷'], clue: '這裡是說讓人同情、心疼，想一想，哪一個字有豎心旁？', explain: '要改成「憐」。讓人心疼是「可憐」；「鄰」是鄰居的鄰。' },
      { id: 'fx-競', char: '競', wrong: '竟', sentence: '我們班報名參加歌唱競賽。', options: ['競', '竟', '鏡'], clue: '這裡是說比賽，想一想，哪一個字左右兩邊一樣？', explain: '要改成「競」。比賽是「競賽」；「竟」是竟然的竟。' },
      { id: 'fx-抗', char: '抗', wrong: '坑', sentence: '多睡覺可以提高身體的抵抗力。', options: ['抗', '坑', '航'], clue: '這裡是說擋住病菌的力量，想一想，哪一個字有提手旁？', explain: '要改成「抗」。擋住病菌的力量是「抵抗力」；「坑」是土坑的坑。' },
      { id: 'fx-逸', char: '逸', wrong: '免', sentence: '小狗躺在陽光下，好安逸。', options: ['逸', '免', '冤'], clue: '這裡是說很輕鬆、舒服，想一想，哪一個字有辵字旁？', explain: '要改成「逸」。輕鬆舒服是「安逸」；「免」是免費的免。' },
      { id: 'fx-鄰', char: '鄰', wrong: '憐', sentence: '我們和鄰居常常互相幫忙。', options: ['鄰', '憐', '麟'], clue: '這裡說的是住在附近的人，想一想，哪一個字有邑字旁？', explain: '要改成「鄰」。住在附近的人是「鄰居」；「憐」是可憐的憐。' },
      { id: 'fx-脈', char: '脈', wrong: '派', sentence: '遠方的山脈連成一長排。', options: ['脈', '派', '旅'], clue: '這裡說的是連成一長列的山，想一想，哪一個字有肉字旁？', explain: '要改成「脈」。連成一列的山是「山脈」；「派」是派對的派。' },
      { id: 'fx-絡', char: '絡', wrong: '路', sentence: '到了以後記得聯絡我。', options: ['絡', '路', '落'], clue: '這裡是說和別人保持往來，想一想，哪一個字有糸字旁？', explain: '要改成「絡」。保持往來是「聯絡」；「路」是馬路的路。' },
      { id: 'fx-緻', char: '緻', wrong: '致', sentence: '這個蛋糕做得好精緻。', options: ['緻', '致', '至'], clue: '這裡是說做得很細、很漂亮，想一想，哪一個字有糸字旁？', explain: '要改成「緻」。做得很細是「精緻」；「致」沒有糸字旁。' },
      { id: 'fx-弱', char: '弱', wrong: '羽', sentence: '他生病以後，身體變得很虛弱。', options: ['弱', '羽', '粥'], clue: '這裡是說沒有力氣，想一想，哪一個字是兩個「弓」？', explain: '要改成「弱」。沒有力氣是「虛弱」；「羽」是羽毛的羽。' },
      { id: 'fx-噴', char: '噴', wrong: '憤', sentence: '鯨魚從頭頂噴出一道水柱。', options: ['噴', '憤', '墳'], clue: '這裡是說用力衝出來，想一想，哪一個字有口字旁？', explain: '要改成「噴」。水用力衝出來是「噴」；「憤」是生氣的意思。' },
      { id: 'fx-嚏', char: '嚏', wrong: '啼', sentence: '花粉讓我打了好幾個噴嚏。', options: ['嚏', '啼', '涕'], clue: '這裡是說鼻子癢的「哈啾」，想一想，哪一個字的右邊是「疐」？', explain: '要改成「嚏」。哈啾是「噴嚏」；「啼」是雞啼的啼。' },
      { id: 'fx-織', char: '織', wrong: '識', sentence: '蜘蛛在牆角織了一面網。', options: ['織', '識', '職'], clue: '這裡是說用絲做成網子，想一想，哪一個字有糸字旁？', explain: '要改成「織」。做成網子是「織網」；「識」是認識的識。' },
      { id: 'fx-碌', char: '碌', wrong: '錄', sentence: '農夫每天都很忙碌。', options: ['碌', '錄', '綠'], clue: '這裡是說事情多、沒空休息，想一想，哪一個字有石字旁？', explain: '要改成「碌」。沒空休息是「忙碌」；「錄」是錄音的錄。' },
      { id: 'fx-盎', char: '盎', wrong: '央', sentence: '他對恐龍的故事興味盎然。', options: ['盎', '央', '盆'], clue: '這裡是說覺得很有趣、很起勁，想一想，哪一個字的下面是「皿」？', explain: '要改成「盎」。很有趣是「興味盎然」；「央」是中央的央。' },
      { id: 'fx-膽', char: '膽', wrong: '擔', sentence: '哥哥膽子很大，敢抓蟑螂。', options: ['膽', '擔', '瞻'], clue: '這裡說的是勇氣，想一想，哪一個字有肉字旁？', explain: '要改成「膽」。勇氣是「膽子」；「擔」是擔心的擔。' },
      { id: 'fx-圈', char: '圈', wrong: '卷', sentence: '請在正確的答案上畫一個圓圈。', options: ['圈', '卷', '捲'], clue: '這裡說的是圓圓的形狀，想一想，哪一個字的外面有「囗」？', explain: '要改成「圈」。圓圓的形狀是「圓圈」；「卷」是考卷的卷。' },
      { id: 'fx-疲', char: '疲', wrong: '波', sentence: '工作了一整天，爸爸很疲倦。', options: ['疲', '波', '坡'], clue: '這裡是說又累又想睡，想一想，哪一個字有病字旁？', explain: '要改成「疲」。又累又想睡是「疲倦」；「波」是波浪的波。' }
    ],
    similar: [
      { id: 's1', meaning: '「＿禮」是把禮物拿給別人。', sentence: '生日時，我＿禮物給好朋友。', frame: '＿禮', options: ['送', '逆'], answer: '送', clue: '提示：這個字的裡面是「关」。', explain: '答案是「送」；「逆」是逆風的逆。' },
      { id: 's2', meaning: '「＿藏」是藏起來，不讓人看見。', sentence: '寶物被＿藏在山洞裡。', frame: '＿藏', options: ['隱', '穩'], answer: '隱', clue: '提示：這個字的左邊是阜字旁。', explain: '答案是「隱」；「穩」是平穩的穩，有禾字旁。' },
      { id: 's3', meaning: '「＿費」是不用付錢。', sentence: '今天參觀博物館＿費。', frame: '＿費', options: ['免', '逸'], answer: '免', clue: '提示：這個字沒有辵字旁。', explain: '答案是「免」；「逸」是安逸的逸。' },
      { id: 's4', meaning: '「水＿」是地上凹下去、積了水的洞。', sentence: '下雨後，路上有一個大水＿。', frame: '水＿', options: ['坑', '抗'], answer: '坑', clue: '提示：和地面有關，左邊是土字旁。', explain: '答案是「坑」；「抗」是抵抗的抗，有提手旁。' },
      { id: 's5', meaning: '「＿對」是很多人一起開心的聚會。', sentence: '我們為奶奶辦了生日＿對。', frame: '＿對', options: ['派', '脈'], answer: '派', clue: '提示：這個字的左邊是三點水。', explain: '答案是「派」；「脈」是山脈的脈，有肉字旁。' },
      { id: 's6', meaning: '「馬＿」是給車子和行人走的大街。', sentence: '過馬＿要看紅綠燈。', frame: '馬＿', options: ['路', '絡'], answer: '路', clue: '提示：和腳有關，左邊是足字旁。', explain: '答案是「路」；「絡」是聯絡的絡。' },
      { id: 's7', meaning: '「一＿」是大家的想法都一樣。', sentence: '大家一＿同意去動物園。', frame: '一＿', options: ['致', '緻'], answer: '致', clue: '提示：這個字沒有糸字旁。', explain: '答案是「致」；「緻」是精緻的緻。' },
      { id: 's8', meaning: '「認＿」是知道是誰、是什麼。', sentence: '我認＿這位新同學。', frame: '認＿', options: ['識', '織'], answer: '識', clue: '提示：和說話有關，左邊是言字旁。', explain: '答案是「識」；「織」是編織的織。' },
      { id: 's9', meaning: '「＿色」是像樹葉一樣的顏色。', sentence: '春天的草地是＿色的。', frame: '＿色', options: ['綠', '碌'], answer: '綠', clue: '提示：這個字的左邊是糸字旁。', explain: '答案是「綠」；「碌」是忙碌的碌，有石字旁。' },
      { id: 's10', meaning: '「＿心」是怕會發生不好的事。', sentence: '媽媽很＿心我會著涼。', frame: '＿心', options: ['擔', '膽'], answer: '擔', clue: '提示：這個字的左邊是提手旁。', explain: '答案是「擔」；「膽」是膽小的膽，有肉字旁。' },
      { id: 's11', meaning: '「考＿」是考試用的題目紙。', sentence: '老師發下數學考＿。', frame: '考＿', options: ['卷', '圈'], answer: '卷', clue: '提示：這個字的外面沒有框框。', explain: '答案是「卷」；「圈」是圓圈的圈，外面有「囗」。' },
      { id: 's12', meaning: '「＿浪」是海水一起一伏的樣子。', sentence: '海上的＿浪一陣一陣打過來。', frame: '＿浪', options: ['波', '疲'], answer: '波', clue: '提示：和水有關，左邊是三點水。', explain: '答案是「波」；「疲」是疲倦的疲，有病字旁。' }
    ],
    listen: [
      { id: 'l1', text: '風從前面迎面吹來，騎車好吃力。', answer: 0, options: [{ text: '逆風', img: 'headwind.png' }, { text: '平穩', img: 'steady-tray.png' }, { text: '噴嚏', img: 'sneeze.png' }, { text: '鄰居', img: 'neighbor-wave.png' }] },
      { id: 'l2', text: '蛋殼一碰就破，要小心拿。', answer: 0, options: [{ text: '脆弱', img: 'egg-crack.png' }, { text: '精緻', img: 'fine-cake.png' }, { text: '忙碌', img: 'busy-mom.png' }, { text: '可憐', img: 'hug-puppy.png' }] },
      { id: 'l3', text: '他只想躺著玩，什麼事都不想做。', answer: 0, options: [{ text: '好逸惡勞', img: 'hammock.png' }, { text: '物競天擇', img: 'savanna.png' }, { text: '聚精會神', img: 'listen-story.png' }, { text: '藝高膽大', img: 'tightrope.png' }] },
      { id: 'l4', text: '跑完馬拉松，累得一動也不能動。', answer: 0, options: [{ text: '精疲力盡', img: 'tired-kid.png' }, { text: '興味盎然', img: 'watch-ants.png' }, { text: '好逸惡勞', img: 'hammock.png' }, { text: '藝高膽大', img: 'tightrope.png' }] },
      { id: 'l5', text: '弟弟蹲在地上，很有興趣的看螞蟻搬家。', answer: 0, options: [{ text: '興味盎然', img: 'watch-ants.png' }, { text: '精疲力盡', img: 'tired-kid.png' }, { text: '物競天擇', img: 'savanna.png' }, { text: '好逸惡勞', img: 'hammock.png' }] },
      { id: 'l6', text: '鼻子好癢，「哈啾」一聲。', answer: 0, options: [{ text: '噴嚏', img: 'sneeze.png' }, { text: '逆風', img: 'headwind.png' }, { text: '織網', img: 'spider-web.png' }, { text: '脈絡', img: 'leaf-veins.png' }] },
      { id: 'l7', text: '走鋼索的人本領很強，一點都不怕。', answer: 0, options: [{ text: '藝高膽大', img: 'tightrope.png' }, { text: '聚精會神', img: 'listen-story.png' }, { text: '精疲力盡', img: 'tired-kid.png' }, { text: '興味盎然', img: 'watch-ants.png' }] },
      { id: 'l8', text: '全班安安靜靜，非常專心的聽故事。', answer: 0, options: [{ text: '聚精會神', img: 'listen-story.png' }, { text: '好逸惡勞', img: 'hammock.png' }, { text: '藝高膽大', img: 'tightrope.png' }, { text: '物競天擇', img: 'savanna.png' }] }
    ],
    /* ---------- 短語、句型、修辭（句子都是 Claude 自己寫的） ---------- */
    phrase: {
      /* 拼短語每一格下面寫要放什麼樣的詞 */
      fillLabels: { before: '最', answer: '怎麼樣', noun: '什麼東西' },
      pickName: '看圖選一選', pickSay: '看圖，選出最適合的詞，說說看「最」怎麼樣的東西。',
      /* 短語：最＋形容詞＋的＋名詞（課本的例子是課文原句，這裡換成自己寫的） */
      intro: { example: '最溫暖的被窩', img: 'pr-warm-bed.png',
        parts: [{ text: '最', role: '最' }, { text: '溫暖', role: '怎麼樣' }, { text: '的' }, { text: '被窩', role: '什麼東西' }],
        explain: '先說「最」，再說出東西的樣子，加上「的」，最後說是什麼東西。' },
      pick: [
        { id: 'ph1', img: 'pr-tall-mountain.png', before: '最', noun: '山峰', ask: '最什麼樣的山峰', look: '再看看圖片，這座山跟旁邊的山比起來怎麼樣？', options: ['高聳', '矮小', '柔軟', '安靜'], clue: '提示：山頂快碰到雲了，比旁邊每一座都突出。', explain: '答案是「高聳」，完整的短語是「最高聳的山峰」。' },
        { id: 'ph2', img: 'pr-cold-pole.png', before: '最', noun: '地方', ask: '最什麼樣的地方', look: '再看看圖片，這裡的人穿得怎麼樣？', options: ['寒冷', '炎熱', '吵鬧', '香甜'], clue: '提示：到處都是冰和雪，要穿得厚厚的。', explain: '答案是「寒冷」，完整的短語是「最寒冷的地方」。' },
        { id: 'ph3', img: 'pr-sweet-mango.png', before: '最', noun: '芒果', ask: '最什麼樣的芒果', look: '再看看圖片，吃芒果的人表情怎麼樣？', options: ['香甜', '苦澀', '堅硬', '冰冷'], clue: '提示：咬一口，嘴巴裡都是蜂蜜般的味道。', explain: '答案是「香甜」，完整的短語是「最香甜的芒果」。' },
        { id: 'ph4', img: 'pr-fast-cheetah.png', before: '最', noun: '動物', ask: '最什麼樣的動物', look: '再看看圖片，這隻獵豹跑得怎麼樣？', options: ['快速', '緩慢', '安靜', '柔軟'], clue: '提示：一眨眼就跑到很遠的地方。', explain: '答案是「快速」，完整的短語是「最快速的動物」。' },
        { id: 'ph5', img: 'pr-quiet-library.png', before: '最', noun: '角落', ask: '最什麼樣的角落', look: '再看看圖片，圖書館這裡吵不吵？', options: ['安靜', '吵鬧', '炎熱', '苦澀'], clue: '提示：連翻書的聲音都聽得見。', explain: '答案是「安靜」，完整的短語是「最安靜的角落」。' },
        { id: 'ph6', img: 'pr-brave-fireman.png', before: '最', noun: '消防員', ask: '最什麼樣的消防員', look: '再看看圖片，消防員遇到大火怕不怕？', options: ['勇敢', '膽小', '懶惰', '吵鬧'], clue: '提示：大火燒得很旺，他還是衝進去救人。', explain: '答案是「勇敢」，完整的短語是「最勇敢的消防員」。' },
        { id: 'ph7', img: 'pr-bright-star.png', before: '最', noun: '星星', ask: '最什麼樣的星星', look: '再看看圖片，哪一顆星星特別亮？', options: ['明亮', '黯淡', '柔軟', '香甜'], clue: '提示：一抬頭，第一眼就看到它在發光。', explain: '答案是「明亮」，完整的短語是「最明亮的星星」。' },
        { id: 'ph8', img: 'pr-old-tree.png', before: '最', noun: '大樹', ask: '最什麼樣的大樹', look: '再看看圖片，這棵樹的樹幹怎麼樣？', options: ['古老', '年輕', '吵鬧', '香甜'], clue: '提示：已經活了好幾百年，樹幹要好多人才抱得住。', explain: '答案是「古老」，完整的短語是「最古老的大樹」。' }
      ],
      say: [],
      words: [
        { word: '物競天擇', meaning: '各種生命互相爭生存，適應環境的才活得下來。', img: 'savanna.png' },
        { word: '好逸惡勞', meaning: '只想輕鬆享受，討厭辛苦工作。', img: 'hammock.png' },
        { word: '興味盎然', meaning: '覺得非常有趣、看得很起勁。', img: 'watch-ants.png' },
        { word: '精疲力盡', meaning: '累壞了，連動一下都沒辦法。', img: 'tired-kid.png' }
      ],
      choose: [
        { id: 'pw1', word: '物競天擇', options: ['物競天擇，能適應環境的動物才活得下來。', '物競天擇，我今天中午吃了便當。'], clue: '提示：想一想，「物競天擇」說的是大自然，還是吃午餐？', explain: '第一句用得對：說的是動物適應環境。吃便當和物競天擇沒有關係。' },
        { id: 'pw2', word: '好逸惡勞', options: ['他好逸惡勞，什麼家事都不肯做。', '她每天認真打掃，真是好逸惡勞。'], clue: '提示：想一想，「好逸惡勞」是愛偷懶，還是很勤勞？', explain: '第一句用得對：不肯做家事是愛偷懶。每天認真打掃，剛好相反。' },
        { id: 'pw3', word: '興味盎然', options: ['大家興味盎然的聽爺爺說故事。', '他無聊得打哈欠，看起來興味盎然。'], clue: '提示：想一想，「興味盎然」是很有興趣，還是很無聊？', explain: '第一句用得對：大家很有興趣的聽。打哈欠是無聊，剛好相反。' },
        { id: 'pw4', word: '精疲力盡', options: ['搬了一整天的家，大家都精疲力盡。', '睡了一個好覺，我起床時精疲力盡，精神好好。'], clue: '提示：想一想，「精疲力盡」是很累，還是很有精神？', explain: '第一句用得對：搬家搬得很累。睡飽了精神好，就不是精疲力盡。' }
      ],
      make: [
        { id: 'pm1', word: '物競天擇', clue: '提示：想想看，大自然的動物要怎麼活下來？', model: '在物競天擇的森林裡，跑得快的兔子比較不會被抓到。' },
        { id: 'pm2', word: '好逸惡勞', clue: '提示：想想看，只想玩、不想做事的人會怎麼樣？', model: '好逸惡勞的人，很難把事情做好。' },
        { id: 'pm3', word: '興味盎然', clue: '提示：想想看，你看什麼東西會看得很入迷？', model: '我興味盎然的看著水族箱裡的小丑魚。' },
        { id: 'pm4', word: '精疲力盡', clue: '提示：想想看，做了什麼事會讓你累壞了？', model: '玩了一整天的水，我回到家已經精疲力盡。' }
      ]
    },
    pattern: [
      { key: 'zhiyoucai', id: 'zc', title: '只有……才能……', img: 'zhiyoucai7.png',
        meaning: '先用「只有」說一定要做到的條件，再用「才能」說做到以後會有的結果。',
        examples: ['只有每天練習，才能把琴彈好。'],
        match: [
          { id: 'pt-zc-m1', img: 'pt-water-flower.png', front: '只有每天澆水，', options: ['花才能開得漂亮。', '花才會被拔掉。', '花才變成石頭。'], clue: '提示：看看圖片，每天澆水，花會怎麼樣？', explain: '答案是「花才能開得漂亮」：每天澆水是條件，花開得漂亮是結果。' },
          { id: 'pt-zc-m2', img: 'pt-study-hard.png', front: '只有認真複習，', options: ['才能考出好成績。', '才能睡一整天。', '才能忘記功課。'], clue: '提示：看看圖片，認真複習會有什麼結果？', explain: '答案是「才能考出好成績」：認真複習是條件，好成績是結果。' },
          { id: 'pt-zc-m3', img: 'pt-team-work.png', front: '只有大家一起合作，', options: ['才能贏得比賽。', '才能一個人玩。', '才能吵架。'], clue: '提示：看看圖片，大家合作，結果怎麼樣？', explain: '答案是「才能贏得比賽」：合作是條件，贏得比賽是結果。' }
        ],
        conj: [
          { id: 'pt-zc-c1', full: '只有勇敢面對困難，才能變得更堅強。', img: 'pt-brave-climb.png', sentence: '＿＿勇敢面對困難，＿能變得更堅強。', options: ['只有……才能……', '雖然……但……', '不僅……也……'], clue: '提示：前面是一定要做到的事，後面是結果。數數看有幾個空格。', explain: '答案是「只有……才能……」：只有勇敢面對困難，才能變得更堅強。' },
          { id: 'pt-zc-c2', full: '只有早點出門，才能趕上公車。', img: 'pt-catch-bus.png', sentence: '＿＿早點出門，＿能趕上公車。', options: ['只有……才能……', '雖然……但……', '不僅……也……'], clue: '提示：一定要早點出門，結果才趕得上。數數看有幾個空格。', explain: '答案是「只有……才能……」：只有早點出門，才能趕上公車。' }
        ],
        half: [
          { id: 'pt-zc-h1', front: '只有多讀書，', clue: '提示：多讀書會有什麼結果？記得要說「才能」。', model: '才能知道更多知識。' },
          { id: 'pt-zc-h2', front: '只有不放棄，', clue: '提示：不放棄會有什麼結果？記得要說「才能」。', model: '才能完成自己的夢想。' }
        ],
        whole: [
          { id: 'pt-zc-w1', clue: '提示：先用「只有」說一定要做到的事，再用「才能」說結果。想想看：要做好一件事，一定要先做到什麼？', model: '只有吃得健康，才能有強壯的身體。' }
        ] }
    ],
    rhetoric: {
      cards: [
        { key: 'simile', name: '譬喻', meaning: '把一樣東西比成另一樣有相同地方的東西，讓人更容易想像。', example: '課文把盪來盪去的小蜘蛛，比成在高空表演的特技人。',
          show: { sentence: '小蜘蛛像一個走鋼索的特技人。' },
          yesno: [
            { id: 'rh-si-y1', sentence: '老鷹張開翅膀，像一架滑翔的飛機。', answer: true, clue: '提示：這句話有沒有把老鷹比成另一樣東西？', explain: '是譬喻：把老鷹比成飛機。' },
            { id: 'rh-si-y2', sentence: '老鷹張開了翅膀。', answer: false, clue: '提示：這句話有沒有把老鷹比成別的東西？', explain: '不是譬喻：這句話只是說老鷹張開翅膀。' }
          ],
          pick: [
            { id: 'rh-si-p1', options: ['蜘蛛網像一張銀色的地圖。', '牆角有一張蜘蛛網。'], clue: '提示：哪一句把蜘蛛網比成另一樣東西？', explain: '「像一張銀色的地圖」是譬喻。' },
            { id: 'rh-si-p2', options: ['強風像一隻大手推著我。', '今天的風很強。'], clue: '提示：哪一句把強風比成別的東西？', explain: '「像一隻大手」是譬喻。' },
            { id: 'rh-si-p3', options: ['山上的雲海像白色的棉被。', '山上有雲。', '山很高。'], clue: '提示：哪一句用「像」把雲海比成別的東西？', explain: '「像白色的棉被」是譬喻。' },
            { id: 'rh-si-p4', options: ['他跑起來像一陣旋風。', '他跑得很快。', '他在操場跑步。'], clue: '提示：哪一句把他比成另一樣東西？', explain: '「像一陣旋風」是譬喻。' },
            { id: 'rh-si-p5', options: ['露珠掛在網上，好像一串小珍珠。', '網上有露珠。', '早上很涼。', '蜘蛛在網中間。'], clue: '提示：哪一句用「好像」把露珠比成別的東西？', explain: '「好像一串小珍珠」是譬喻。' },
            { id: 'rh-si-p6', options: ['沙漠熱得像一個大烤箱。', '沙漠很熱。', '沙漠裡有駱駝。', '沙漠很大。'], clue: '提示：哪一句把沙漠比成另一樣東西？', explain: '「像一個大烤箱」是譬喻。' }
          ] },
        { key: 'repeat', name: '類疊', meaning: '同一個字或詞連著重複，或隔開來重複說好幾次，讀起來有節奏，也讓人印象更深。', example: '課文寫小蜘蛛的網一破就再織，「織」和「破」一再重複出現，讓人感覺牠一直不放棄。',
          show: { sentence: '跌倒了又爬起來，爬起來又跌倒。', mark: ['跌倒', '爬起來'] },
          yesno: [
            { id: 'rh-rp-y1', sentence: '他寫了又擦，擦了又寫。', answer: true, mark: ['寫', '擦'], clue: '提示：找找看，有沒有同一個字重複出現？', explain: '是類疊：「寫」和「擦」都重複說了。' },
            { id: 'rh-rp-y2', sentence: '他把字寫好了。', answer: false, clue: '提示：找找看，有沒有同一個字或詞重複出現？', explain: '不是類疊：這句話沒有重複的字或詞。' }
          ],
          pick: [
            { id: 'rh-rp-p1', mark: ['飛過', '飛過'], options: ['小鳥飛過高山，飛過大海。', '小鳥在天上飛。'], clue: '提示：哪一句把同一個詞說了兩次？', explain: '「飛過」說了兩次，是類疊。' },
            { id: 'rh-rp-p2', mark: ['一次一次'], options: ['她一次一次的練習跳舞。', '她在練習跳舞。'], clue: '提示：哪一句有重複的詞？', explain: '「一次一次」是類疊。' },
            { id: 'rh-rp-p3', mark: ['小小的'], options: ['桌上有一隻小小的螞蟻。', '桌上有一隻螞蟻。', '螞蟻在爬。'], clue: '提示：哪一句有連著重複的字？', explain: '「小小的」是類疊。' },
            { id: 'rh-rp-p4', mark: ['堆了又倒', '倒了又堆'], options: ['積木堆了又倒，倒了又堆。', '積木倒了。', '我在玩積木。'], clue: '提示：哪一句把同樣的字反過來又說了一次？', explain: '「堆了又倒，倒了又堆」是類疊。' },
            { id: 'rh-rp-p5', mark: ['好累', '好累'], options: ['好累啊！真的好累啊！', '我很累。', '跑完步了。', '我想休息。'], clue: '提示：哪一句把同一句話說了兩次？', explain: '「好累啊」說了兩次，是類疊。' },
            { id: 'rh-rp-p6', mark: ['一圈圈'], options: ['小狗繞著院子一圈圈的跑。', '小狗在院子裡跑。', '院子很大。', '小狗跑累了。'], clue: '提示：哪一句有同一個字連著出現？', explain: '「一圈圈」是類疊。' }
          ] }
      ],
      quiz: [
        { id: 'rh1', sentence: '月亮像一個大玉盤。', answer: '譬喻', clue: '提示：這句話有沒有把月亮比成別的東西？', explain: '答案是「譬喻」：把月亮比成玉盤。' },
        { id: 'rh2', sentence: '他的聲音像打雷一樣大。', answer: '譬喻', clue: '提示：這句話有沒有用「像」？', explain: '答案是「譬喻」：把聲音比成打雷。' },
        { id: 'rh3', sentence: '我們走了又走，走了好久。', answer: '類疊', mark: ['走了又走'], clue: '提示：這句話有沒有重複的字？', explain: '答案是「類疊」：「走」重複說了好幾次。' },
        { id: 'rh4', sentence: '一朵朵白雲慢慢飄過。', answer: '類疊', mark: ['一朵朵'], clue: '提示：這句話有沒有連著重複的字？', explain: '答案是「類疊」：「一朵朵」重複了「朵」。' }
      ]
    }
  };
  if (typeof module === 'object' && module.exports) module.exports = d;
  else { root.H3A_WORDS = root.H3A_WORDS || {}; root.H3A_WORDS.L07 = d; }
})(this);
