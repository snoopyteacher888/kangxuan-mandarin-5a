/* 第 3 課字詞練習（公開、不加密）。句子和解釋都是 Claude 自己寫的，沒有課本原文。
   生字、語詞：options 的第一個是正確答案（作答時會打亂）。 */
(function (root) {
  var d = {
    /* 理解提問的分類（照課本「閱讀理解提問」）：extract 提取訊息、infer 推論訊息、interpret 詮釋整合、evaluate 比較評估。只放題號，不放課文 */
    quizLevels: { qa: 'extract', qb: 'extract', qc: 'extract', qd: 'infer', qe: 'infer', qf: 'infer', qg: 'infer', qh: 'interpret',
      qi: 'evaluate', qj: 'evaluate', k1: 'interpret', k2: 'evaluate' },
    /* 詮釋整合、比較評估的鷹架：think 是「想一想」的兩個步驟（不說答案），why 是「老師教你」的說明。不放課文原句 */
    quizHelp: {
      qh: { think: ['讀第一段的時候，你知道是誰在爬嗎？', '一路猜到最後才知道答案，心裡會有什麼感覺？'], why: '作者先不說是誰，只寫它怎麼爬、吃什麼、怎麼面對風雨，讓我們一邊讀一邊猜。到最後才揭開答案，讀的人會覺得「原來是它」，又驚喜又有趣。' },
      qi: { think: ['攀岩高手的目標在哪裡？要往哪個方向才到得了？', '一句話說了很多次，是想讓人記住什麼？'], why: '攀岩高手的目標在很高的地方，只能一直往上。作者一再寫「向上」，就是在強調它不管遇到什麼，都一心要到達目標的決心。' },
      qj: { think: ['看一看最後一段的字，是怎麼排的？', '爬牆虎長大的時候，是往哪個方向長？'], why: '前面一直說它一心向上爬，最後把字排得一階一階往上，看起來就像爬牆虎沿著牆往上長，讓詩的樣子也和內容一樣。' }
    },
    /* 「說說看」改成選選看：good 兩個合理的想法（選哪一個都對）、bad 兩個不合理的，why 是老師教你的說明。不放課文原句 */
    talkChoices: {
      k1: { good: ['遇到困難不要放棄，要一步一步往前。', '有了目標，就要努力去完成。'], bad: ['遇到困難就躲起來，什麼都不做。', '爬牆很好玩，我也要去爬牆。'], why: '這首詩想告訴我們，遇到困難也要像爬牆虎一樣堅持往上。躲起來就是放棄了；真的去爬牆很危險，也不是詩想說的意思。' },
      k2: { good: ['跳繩一直跳不好，我會每天多練習幾次。', '比賽輸了，我會想想哪裡可以做得更好。'], bad: ['考不好就把考卷撕掉。', '輸了就說是別人害的，再也不參加。'], why: '題目問的是遇到挫折時怎麼學爬牆虎。多練習、找出可以改進的地方，就是不放棄、繼續往上。撕考卷、怪別人，都是在逃避。' }
    },
    hanzi: [
      { id: 'h-峭', combo: { layout: 'lr', parts: [['山', 'm', '山'], ['肖', 's', '']] }, char: '峭', zhuyin: 'ㄑㄧㄠˋ', radical: '山', strokes: 10, words: ['陡峭', '峭壁'], say: '峭，峭壁的峭', cloze: '＿壁', img: 'cliff.png', options: ['峭', '俏', '削', '消'], clue: '這個字的左邊是山字旁。', explain: '答案是「峭」，左邊是「山」；「俏」的左邊是單人旁，「削」的右邊是立刀旁。', parts: ['山', '肖'], story: '左邊是「山」，右邊的「肖」念起來像「峭」。又高又直、好像要倒下來的山壁，就是「峭壁」。', sentence: '海邊有一片又高又直的峭壁。', build: { layout: 'lr', show: ['？', '肖'], answer: '山', options: ['山', '亻', '氵', '木'], clue: '想一想：「俏」的左邊是人，又高又直的石壁，左邊放哪一個？' } },
      { id: 'h-勁', combo: { layout: 'lr', parts: [['巠', 's', ''], ['力', 'm', '力氣']] }, char: '勁', zhuyin: 'ㄐㄧㄥˋ', radical: '力', strokes: 9, words: ['強勁', '使勁'], say: '勁，使勁的勁', cloze: '使＿', img: 'push-hard.png', options: ['勁', '徑', '經', '頸'], clue: '這個字的右邊是「力」。', explain: '答案是「勁」，右邊是「力」；「徑」的左邊是雙人旁，「經」的左邊是糸字旁。', parts: ['巠', '力'], story: '左邊的「巠」念起來有點像「勁」，右邊是「力」。用很大的力氣，就是「使勁」。', sentence: '大家一起使勁，把大石頭推開了。', build: { layout: 'lr', show: ['巠', '？'], answer: '力', options: ['力', '彳', '糸', '頁'], clue: '想一想：推大石頭要用什麼？' } },
      { id: 'h-聳', combo: { layout: 'tb', parts: [['從', 's', ''], ['耳', 'm', '耳朵']] }, char: '聳', zhuyin: 'ㄙㄨㄥˇ', radical: '耳', strokes: 17, words: ['高聳', '聳肩'], say: '聳，聳肩的聳', cloze: '＿肩', img: 'shrug.png', options: ['聳', '從', '縱', '慫'], clue: '這個字的下面是「耳」。', explain: '答案是「聳」，下面是「耳」；「慫」的下面是「心」，「縱」的左邊是糸字旁。', parts: ['從', '耳'], story: '上面的「從」念起來像「聳」，下面是「耳」。把肩膀抬高到快碰到耳朵，就是「聳肩」；直直的、高高的，也叫「高聳」。', sentence: '我問他去哪裡，他聳了一下肩說不知道。', build: { layout: 'tb', show: ['從', '？'], answer: '耳', options: ['耳', '心', '糸', '手'], clue: '想一想：肩膀抬高，快要碰到頭上的哪個部分？' } },
      { id: 'h-飢', combo: { layout: 'lr', parts: [['食', 'm', '吃東西'], ['几', 's', '']] }, char: '飢', zhuyin: 'ㄐㄧ', radical: '食', strokes: 11, words: ['充飢', '飢餓'], say: '飢，飢餓的飢', cloze: '＿餓', img: 'hungry-boy.png', options: ['飢', '肌', '機', '磯'], clue: '這個字的左邊是食字旁。', explain: '答案是「飢」，左邊是食字旁；「肌」的左邊是肉字旁，是肌肉的肌。', parts: ['飠', '几'], story: '左邊的食字旁和吃東西有關，右邊的「几」念起來像「飢」。肚子空空的、很想吃東西，就是「飢餓」。', sentence: '爬完山，大家又累又飢餓。', build: { layout: 'lr', show: ['？', '几'], answer: '飠', options: ['飠', '月', '木', '口'], clue: '想一想：肚子餓和什麼有關？' } },
      { id: 'h-隱', combo: { layout: 'lr', parts: [['阝', 'm', '小山坡'], ['㥯', 's', '']] }, char: '隱', zhuyin: 'ㄧㄣˇ', radical: '阜', strokes: 17, words: ['隱形', '隱藏'], say: '隱，隱藏的隱', cloze: '＿藏', img: 'hidden-cat.png', options: ['隱', '穩', '癮', '急'], clue: '這個字的左邊是阜字旁。', explain: '答案是「隱」，左邊是阜字旁；「穩」的左邊是禾字旁，是安穩的穩。', parts: ['阝', '㥯'], story: '左邊的「阝」像小山坡，右邊念起來像「隱」。躲在山坡後面，別人就看不到，就是「隱藏」。', sentence: '小貓隱藏在草叢裡，只露出一條尾巴。', build: { layout: 'lr', show: ['？', '㥯'], answer: '阝', options: ['阝', '禾', '疒', '扌'], clue: '想一想：「穩」的左邊是稻子，躲在山坡後面，左邊放哪一個？' } },
      { id: 'h-扯', combo: { layout: 'lr', parts: [['扌', 'm', '手'], ['止', 's', '']] }, char: '扯', zhuyin: 'ㄔㄜˇ', radical: '手', strokes: 7, words: ['拉扯', '扯後腿'], say: '扯，拉扯的扯', cloze: '拉＿', img: 'tug-rope.png', options: ['扯', '址', '趾', '祉'], clue: '這個字的左邊是提手旁。', explain: '答案是「扯」，左邊是提手旁；「址」的左邊是土字旁，「趾」的左邊是足字旁。', parts: ['扌', '止'], story: '左邊是手，右邊的「止」念起來有點像「扯」。用手用力拉，就是「拉扯」。', sentence: '兩隻小狗在拉扯一條毛巾。', build: { layout: 'lr', show: ['？', '止'], answer: '扌', options: ['扌', '土', '足', '礻'], clue: '想一想：用力拉要用身體的哪個部分？' } },
      { id: 'h-銳', combo: { layout: 'lr', parts: [['金', 'm', '金屬'], ['兌', 's', '']] }, char: '銳', zhuyin: 'ㄖㄨㄟˋ', radical: '金', strokes: 15, words: ['尖銳', '銳利'], say: '銳，銳利的銳', cloze: '＿利', img: 'sharp-knife.png', options: ['銳', '蛻', '說', '悅'], clue: '這個字的左邊是金字旁。', explain: '答案是「銳」，左邊是金字旁；「蛻」的左邊是虫字旁，「說」的左邊是言字旁。', parts: ['金', '兌'], story: '左邊的「金」是金屬，右邊的「兌」念起來有點像「銳」。金屬磨得很尖、很利，一碰就會割傷，就是「銳利」。', sentence: '老鷹的爪子很銳利。', build: { layout: 'lr', show: ['？', '兌'], answer: '金', options: ['金', '虫', '言', '忄'], clue: '想一想：刀子是什麼做的？' } },
      { id: 'h-箭', combo: { layout: 'tb', parts: [['竹', 'm', '竹子'], ['前', 's', '']] }, char: '箭', zhuyin: 'ㄐㄧㄢˋ', radical: '竹', strokes: 15, words: ['冷箭', '弓箭'], say: '箭，弓箭的箭', cloze: '弓＿', img: 'bow-arrow.png', options: ['箭', '煎', '剪', '前'], clue: '這個字的上面是竹字頭。', explain: '答案是「箭」，上面是竹字頭；「煎」的下面是四點火，「剪」的下面是「刀」。', parts: ['竹', '前'], story: '上面的竹字頭是竹子，下面的「前」念起來像「箭」。用竹子做成、射出去會往前飛的東西，就是「箭」。', sentence: '他拉開弓，把箭射向遠方的靶子。', build: { layout: 'tb', show: ['？', '前'], answer: '竹', options: ['竹', '艹', '雨', '宀'], clue: '想一想：以前的箭是用什麼植物做的？' } },
      { id: 'h-韌', combo: { layout: 'lr', parts: [['韋', 'm', '皮革'], ['刃', 's', '']] }, char: '韌', zhuyin: 'ㄖㄣˋ', radical: '韋', strokes: 12, words: ['堅韌', '韌性'], say: '韌，韌性的韌', cloze: '＿性', img: 'rubber-band.png', options: ['韌', '忍', '刃', '紉'], clue: '這個字的左邊是「韋」。', explain: '答案是「韌」，左邊是「韋」；「忍」的下面是心，「紉」的左邊是糸字旁。', parts: ['韋', '刃'], story: '左邊的「韋」是皮革，右邊的「刃」念起來像「韌」。皮革軟軟的，用力拉也不會斷，就是「韌」；不容易斷、不容易放棄，叫「有韌性」。', sentence: '這條繩子很有韌性，怎麼拉都不會斷。', build: { layout: 'lr', show: ['？', '刃'], answer: '韋', options: ['韋', '糸', '心', '金'], clue: '想一想：軟軟又拉不斷的皮革，是哪一個？' } },
      { id: 'h-虯', combo: { layout: 'lr', parts: [['虫', 'm', '小蟲'], ['丩', 's', '']] }, char: '虯', zhuyin: 'ㄑㄧㄡˊ', radical: '虫', strokes: 8, words: ['虯鬚', '虯曲'], say: '虯，虯鬚的虯', cloze: '＿曲', img: 'curly-vine.png', options: ['虯', '糾', '叫', '收'], clue: '這個字的左邊是虫字旁。', explain: '答案是「虯」，左邊是虫字旁；「糾」的左邊是糸字旁，「叫」的左邊是口字旁。', parts: ['虫', '丩'], story: '左邊的「虫」像彎彎的小蟲，右邊的「丩」像捲在一起的線。捲來捲去、彎彎曲曲的樣子，就是「虯」。', sentence: '老樹的樹根虯曲的爬在地上。' },
      { id: 'h-鬚', combo: { layout: 'tb', parts: [['髟', 'm', '毛髮'], ['須', 's', '']] }, char: '鬚', zhuyin: 'ㄒㄩ', radical: '髟', strokes: 22, words: ['虯鬚', '鬍鬚'], say: '鬚，鬍鬚的鬚', cloze: '鬍＿', img: 'grandpa-beard.png', options: ['鬚', '須', '需', '鬆'], clue: '這個字的上面是「髟」，和頭髮有關。', explain: '答案是「鬚」，上面是「髟」；「須」沒有上面的部分，是必須的須。', parts: ['髟', '須'], story: '上面的「髟」和毛髮有關，下面的「須」念起來像「鬚」。長在下巴、嘴邊的毛，就是「鬍鬚」。', sentence: '爺爺留著白白的鬍鬚。', build: { layout: 'tb', show: ['？', '須'], answer: '髟', options: ['髟', '雨', '艹', '竹'], clue: '想一想：鬍子是毛髮，上面放和毛髮有關的哪一個？' } },
      { id: 'h-茂', combo: { layout: 'tb', parts: [['艹', 'm', '草'], ['戊', 's', '']] }, char: '茂', zhuyin: 'ㄇㄠˋ', radical: '艸', strokes: 9, words: ['繁茂', '茂盛'], say: '茂，茂盛的茂', cloze: '＿盛', img: 'lush-tree.png', options: ['茂', '戊', '茅', '芒'], clue: '這個字的上面是草字頭。', explain: '答案是「茂」，上面是草字頭；「茅」和「芒」的下面不一樣。', parts: ['艹', '戊'], story: '上面的草字頭是草，下面的「戊」念起來有點像「茂」。草和樹長得又多又密，就是「茂盛」。', sentence: '春天到了，樹葉長得很茂盛。', build: { layout: 'tb', show: ['？', '戊'], answer: '艹', options: ['艹', '竹', '雨', '宀'], clue: '想一想：長得又多又密的植物，上面放哪一個？' } },
      { id: 'h-止', combo: { type: '象形字', pict: '「止」像一隻腳的樣子，腳停住了不走，所以是「停下來」的意思。' }, char: '止', zhuyin: 'ㄓˇ', radical: '止', strokes: 4, words: ['休止', '停止'], say: '止，停止的止', cloze: '停＿', img: 'stop-sign.png', options: ['止', '正', '上', '土'], clue: '這個字像一隻停住的腳。', explain: '答案是「止」；「正」上面多一橫，「上」少了左邊一筆。', parts: ['止'], story: '「止」像一隻腳。腳站著不往前走了，就是「停止」。', sentence: '雨停止了，天空出現彩虹。' },
      { id: 'h-蔓', combo: { layout: 'tb', parts: [['艹', 'm', '草'], ['曼', 's', '']] }, char: '蔓', zhuyin: 'ㄇㄢˋ', radical: '艸', strokes: 15, words: ['蔓生', '蔓延'], say: '蔓，蔓延的蔓', cloze: '＿延', img: 'vine-wall.png', options: ['蔓', '曼', '漫', '慢'], clue: '這個字的上面是草字頭。', explain: '答案是「蔓」，上面是草字頭；「漫」的左邊是三點水，「慢」的左邊是豎心旁。', parts: ['艹', '曼'], story: '上面的草字頭是植物，下面的「曼」念起來像「蔓」。植物細細長長的莖，一直往外爬，就是「蔓延」。', sentence: '小火很快蔓延成一片大火。', build: { layout: 'tb', show: ['？', '曼'], answer: '艹', options: ['艹', '氵', '忄', '日'], clue: '想一想：會爬來爬去的植物，上面放哪一個？' } },
      { id: 'h-藉', combo: { layout: 'tb', parts: [['艹', 'm', '草'], ['耤', 's', '']] }, char: '藉', zhuyin: 'ㄐㄧㄝˋ', radical: '艸', strokes: 18, words: ['藉由', '藉口'], say: '藉，藉口的藉', cloze: '＿口', img: 'excuse-boy.png', options: ['藉', '籍', '借', '措'], clue: '這個字的上面是草字頭。', explain: '答案是「藉」，上面是草字頭；「籍」的上面是竹字頭，是書籍的籍。', parts: ['艹', '耤'], story: '上面的草字頭像墊在下面的草，下面念起來像「藉」。墊著、靠著別的東西，就是「藉」；為了不做事隨便找的理由，叫「藉口」。', sentence: '弟弟找藉口說肚子痛，不想寫功課。', build: { layout: 'tb', show: ['？', '耤'], answer: '艹', options: ['艹', '竹', '雨', '宀'], clue: '想一想：「籍」的上面是竹子，這個字上面是另一種植物。' } },
      { id: 'h-豐', combo: { type: '象形字', pict: '「豐」的下面是「豆」，是古時候放東西的盤子；上面裝得滿滿的。東西很多、很豐盛，就是「豐」。' }, char: '豐', zhuyin: 'ㄈㄥ', radical: '豆', strokes: 18, words: ['豐富', '豐收'], say: '豐，豐收的豐', cloze: '＿收', img: 'harvest.png', options: ['豐', '豊', '禮', '艷'], clue: '這個字的下面是「豆」，上面裝得滿滿的。', explain: '答案是「豐」；「禮」的左邊是示字旁，是禮物的禮。', parts: ['丰', '豆'], story: '下面的「豆」是古時候的盤子，上面的東西堆得滿滿的。東西很多，就是「豐富」；收成很多，就是「豐收」。', sentence: '今年稻米豐收，農夫好開心。' },
      { id: 'h-挫', combo: { layout: 'lr', parts: [['扌', 'm', '手'], ['坐', 's', '']] }, char: '挫', zhuyin: 'ㄘㄨㄛˋ', radical: '手', strokes: 10, words: ['挫折', '受挫'], say: '挫，挫折的挫', cloze: '受＿', img: 'fail-test.png', options: ['挫', '坐', '座', '剉'], clue: '這個字的左邊是提手旁。', explain: '答案是「挫」，左邊是提手旁；「座」的上面是广字頭，是座位的座。', parts: ['扌', '坐'], story: '左邊是手，右邊的「坐」念起來像「挫」。被手壓下去、做事不順利，就是「受挫」、「挫折」。', sentence: '比賽輸了，他覺得有點受挫。', build: { layout: 'lr', show: ['？', '坐'], answer: '扌', options: ['扌', '广', '刂', '亻'], clue: '想一想：被壓下去，左邊放和手有關的哪一個？' } },
      { id: 'h-折', combo: { layout: 'lr', parts: [['扌', 'm', '手'], ['斤', 's', '斧頭']] }, char: '折', zhuyin: 'ㄓㄜˊ', radical: '手', strokes: 7, words: ['挫折', '折斷'], say: '折，折斷的折', cloze: '＿斷', img: 'broken-branch.png', options: ['折', '拆', '析', '哲'], clue: '這個字的左邊是提手旁，右邊是「斤」。', explain: '答案是「折」；「拆」的右邊多一點，「析」的左邊是木字旁。', parts: ['扌', '斤'], story: '左邊是手，右邊的「斤」是斧頭。用手和斧頭把樹枝弄斷，就是「折斷」。', sentence: '大風把樹枝折斷了。', build: { layout: 'lr', show: ['？', '斤'], answer: '扌', options: ['扌', '木', '口', '氵'], clue: '想一想：「析」的左邊是木頭，用手弄斷，左邊放哪一個？' } }
    ],
    vocab: [
      { id: 'v-陡峭', cloze: true, clozeOptions: ['陡峭', '平坦', '寬大', '柔軟'], word: '陡峭', meaning: '山坡又高又斜，很難爬上去。', example: '這條山路很＿＿，我們要抓著繩子慢慢爬。', img: 'cliff.png', options: ['陡峭', '繁茂', '堅韌', '高聳'] },
      { id: 'v-強勁', cloze: true, clozeOptions: ['強勁', '微弱', '輕柔', '安靜'], word: '強勁', meaning: '力量很大。', example: '颱風帶來＿＿的大風，把招牌都吹歪了。', img: 'strong-wind.png', options: ['強勁', '尖銳', '陡峭', '豐富'] },
      { id: 'v-高聳', cloze: true, clozeOptions: ['高聳', '矮小', '倒塌', '彎曲'], word: '高聳', meaning: '直直往上長，好像要碰到天空。', example: '城市裡＿＿的大樓，一棟比一棟高。', img: 'tall-tower.png', options: ['高聳', '繁茂', '陡峭', '隱形'] },
      { id: 'v-充飢', cloze: true, clozeOptions: ['充飢', '減肥', '跑步', '睡覺'], word: '充飢', meaning: '吃一點東西，讓肚子不餓。', example: '午餐還沒好，我先吃一片餅乾＿＿。', img: 'snack-cookie.png', options: ['充飢', '挫折', '休止', '藉由'] },
      { id: 'v-隱形', cloze: true, clozeOptions: ['隱形', '巨大', '閃亮', '吵鬧'], word: '隱形', meaning: '藏起來，讓人看不見。', example: '故事裡的魔法斗篷，穿上就會＿＿，誰都看不到你。', img: 'magic-cloak.png', options: ['隱形', '尖銳', '強勁', '蔓生'] },
      { id: 'v-拉扯', cloze: true, clozeOptions: ['拉扯', '擁抱', '親吻', '撫摸'], word: '拉扯', meaning: '兩邊用力搶來搶去。', example: '兩個小朋友搶玩具，＿＿了好久。', img: 'tug-rope.png', options: ['拉扯', '蔓生', '休止', '充飢'] },
      { id: 'v-尖銳', cloze: true, clozeOptions: ['尖銳', '圓滑', '柔軟', '鈍鈍'], word: '尖銳', meaning: '末端細細的、很利，碰到會痛；聲音很刺耳也可以這樣說。', example: '這把剪刀很＿＿，使用時要小心。', img: 'sharp-knife.png', options: ['尖銳', '堅韌', '強勁', '高聳'] },
      { id: 'v-冷箭', cloze: true, clozeOptions: ['冷箭', '熱湯', '棉被', '帽子'], word: '冷箭', meaning: '偷偷射出來的武器；比喻在背後偷偷害人的手段。', example: '他當面笑嘻嘻，背後卻放＿＿說別人壞話。', img: 'bow-arrow.png', options: ['冷箭', '虯鬚', '挫折', '隱形'] },
      { id: 'v-堅韌', cloze: true, clozeOptions: ['堅韌', '脆弱', '易碎', '鬆散'], word: '堅韌', meaning: '很結實，用力拉也不會斷；比喻人的意志很強。', example: '這種麻繩又粗又＿＿，可以綁住很重的東西。', img: 'rubber-band.png', options: ['堅韌', '尖銳', '繁茂', '陡峭'] },
      { id: 'v-虯鬚', cloze: true, clozeOptions: ['虯鬚', '書包', '鞋子', '皮球'], word: '虯鬚', meaning: '彎彎捲捲的鬍子；也可以說植物捲捲的細莖。', example: '畫裡的老將軍留著一把＿＿，看起來好威風。', img: 'grandpa-beard.png', options: ['虯鬚', '冷箭', '豐富', '挫折'] },
      { id: 'v-繁茂', cloze: true, clozeOptions: ['繁茂', '枯黃', '光禿', '稀少'], word: '繁茂', meaning: '植物長得又多又密。', example: '公園的大樹枝葉＿＿，夏天在樹下好涼快。', img: 'lush-tree.png', options: ['繁茂', '高聳', '堅韌', '強勁'] },
      { id: 'v-休止', cloze: true, clozeOptions: ['休止', '開始', '出發', '繼續'], word: '休止', meaning: '停下來。', example: '海浪拍打岸邊，好像永遠不會＿＿。', img: 'waves-beach.png', options: ['休止', '充飢', '藉由', '拉扯'] },
      { id: 'v-蔓生', cloze: true, clozeOptions: ['蔓生', '倒下', '枯死', '凋謝'], word: '蔓生', meaning: '植物細長的莖，一直往旁邊或往上爬著長。', example: '牽牛花＿＿在圍牆上，開出一朵朵紫色的花。', img: 'vine-wall.png', options: ['蔓生', '休止', '隱形', '拉扯'] },
      { id: 'v-藉由', cloze: true, clozeOptions: ['藉由', '除了', '雖然', '如果'], word: '藉由', meaning: '靠著、透過。', example: '老師＿＿一段影片，讓我們認識海洋動物。', img: 'video-class.png', options: ['藉由', '充飢', '休止', '冷箭'] },
      { id: 'v-豐富', cloze: true, clozeOptions: ['豐富', '貧乏', '稀少', '空虛'], word: '豐富', meaning: '很多、種類很齊全。', example: '圖書館裡的書很＿＿，什麼都看得到。', img: 'library-books.png', options: ['豐富', '繁茂', '強勁', '尖銳'] },
      { id: 'v-挫折', cloze: true, clozeOptions: ['挫折', '成功', '獎品', '掌聲'], word: '挫折', meaning: '做事不順利、失敗了。', example: '遇到＿＿不要灰心，再試一次就好。', img: 'fail-test.png', options: ['挫折', '虯鬚', '冷箭', '藉由'] },
      { id: 'v-狂風暴雨', cloze: true, clozeOptions: ['狂風暴雨', '風和日麗', '晴空萬里', '春暖花開'], word: '狂風暴雨', meaning: '天氣非常惡劣，樹被吹倒、街上淹水。', example: '一場＿＿＿＿過後，路上到處都是斷掉的樹枝。', img: 'storm.png', options: ['狂風暴雨', '堅定不移', '繁茂', '陡峭'] },
      { id: 'v-堅定不移', cloze: true, clozeOptions: ['堅定不移', '三心二意', '半途而廢', '猶豫不決'], word: '堅定不移', meaning: '心意非常穩，從頭到尾都一樣，沒有動搖。', example: '他想當醫生的心意＿＿＿＿，每天都認真讀書。', img: 'climb-goal.png', options: ['堅定不移', '狂風暴雨', '堅韌', '豐富'] }
    ],
    /* 生字語詞：每個生字再學一個課本以外、孩子聽得懂的語詞 */
    charwords: [
      { id: 'cw-峭', char: '峭', img: 'cliff.png', charMeaning: '山又高又直。', word: '峭壁', meaning: '又高又直、像牆一樣的山壁。', example: '老鷹在＿＿上築了一個鳥巢。', options: ['峭壁', '使勁', '聳肩', '飢餓'] },
      { id: 'cw-勁', char: '勁', img: 'push-hard.png', charMeaning: '力氣。', word: '使勁', meaning: '用很大的力氣。', example: '我＿＿一拉，終於把抽屜打開了。', options: ['使勁', '隱藏', '銳利', '弓箭'] },
      { id: 'cw-聳', char: '聳', img: 'shrug.png', charMeaning: '往上抬高、高高的。', word: '聳肩', meaning: '把兩邊肩膀往上抬，表示不知道。', example: '問他答案，他＿＿＿說不知道。', options: ['聳肩', '峭壁', '鬍鬚', '停止'] },
      { id: 'cw-飢', char: '飢', img: 'hungry-boy.png', charMeaning: '肚子空空的。', word: '飢餓', meaning: '肚子很餓。', example: '一整天沒吃飯，他覺得好＿＿。', options: ['飢餓', '茂盛', '韌性', '受挫'] },
      { id: 'cw-隱', char: '隱', img: 'hidden-cat.png', charMeaning: '藏起來。', word: '隱藏', meaning: '藏起來，不讓人看到。', example: '寶藏＿＿在山洞的最深處。', options: ['隱藏', '拉扯', '蔓延', '藉口'] },
      { id: 'cw-扯', char: '扯', img: 'tug-rope.png', charMeaning: '用力拉。', word: '扯後腿', meaning: '拉住別人，讓事情做不好、拖累別人。', example: '大家都在努力，你不要＿＿＿＿＿。', options: ['扯後腿', '使勁', '豐收', '折斷'] },
      { id: 'cw-銳', char: '銳', img: 'sharp-knife.png', charMeaning: '尖、很利。', word: '銳利', meaning: '又尖又利，很容易割破東西。', example: '老鷹用＿＿的爪子抓住魚。', options: ['銳利', '飢餓', '峭壁', '停止'] },
      { id: 'cw-箭', char: '箭', img: 'bow-arrow.png', charMeaning: '射出去會往前飛的東西。', word: '弓箭', meaning: '用弓把箭射出去的武器。', example: '古時候的獵人用＿＿打獵。', options: ['弓箭', '鬍鬚', '藉口', '聳肩'] },
      { id: 'cw-韌', char: '韌', img: 'rubber-band.png', charMeaning: '拉不斷、很結實。', word: '韌性', meaning: '被拉、被壓也不容易斷；也比喻不容易放棄。', example: '竹子很有＿＿，大風吹也不會斷。', options: ['韌性', '豐收', '拉扯', '隱藏'] },
      { id: 'cw-虯', char: '虯', img: 'curly-vine.png', charMeaning: '彎彎曲曲。', word: '虯曲', meaning: '彎彎曲曲、捲來捲去。', example: '老榕樹的樹根＿＿的盤在地上。', options: ['虯曲', '茂盛', '銳利', '使勁'] },
      { id: 'cw-鬚', char: '鬚', img: 'grandpa-beard.png', charMeaning: '下巴和嘴邊的毛。', word: '鬍鬚', meaning: '長在男生下巴或嘴巴旁邊的毛。', example: '爸爸早上會刮＿＿。', options: ['鬍鬚', '弓箭', '峭壁', '停止'] },
      { id: 'cw-茂', char: '茂', img: 'lush-tree.png', charMeaning: '長得又多又好。', word: '茂盛', meaning: '植物長得又多又密，很有精神。', example: '雨下過以後，草地長得更＿＿了。', options: ['茂盛', '飢餓', '受挫', '聳肩'] },
      { id: 'cw-止', char: '止', img: 'stop-sign.png', charMeaning: '停下來。', word: '停止', meaning: '不再繼續，停下來。', example: '哨子一響，大家都＿＿跑步。', options: ['停止', '蔓延', '藉口', '韌性'] },
      { id: 'cw-蔓', char: '蔓', img: 'vine-wall.png', charMeaning: '植物細長的莖往外爬。', word: '蔓延', meaning: '像藤蔓一樣，一直往外擴大。', example: '火一下子就＿＿到整座森林。', options: ['蔓延', '隱藏', '停止', '弓箭'] },
      { id: 'cw-藉', char: '藉', img: 'excuse-boy.png', charMeaning: '靠著；找理由。', word: '藉口', meaning: '為了不做事，故意找出來的理由。', example: '他總是找＿＿，不想打掃。', options: ['藉口', '韌性', '鬍鬚', '飢餓'] },
      { id: 'cw-豐', char: '豐', img: 'harvest.png', charMeaning: '很多、很足夠。', word: '豐收', meaning: '農作物收成很多。', example: '今年雨水剛好，芒果大＿＿。', options: ['豐收', '使勁', '銳利', '虯曲'] },
      { id: 'cw-挫', char: '挫', img: 'fail-test.png', charMeaning: '不順利、失敗。', word: '受挫', meaning: '遇到失敗，心裡難過。', example: '比賽輸了，他有點＿＿，但沒有放棄。', options: ['受挫', '茂盛', '扯後腿', '峭壁'] },
      { id: 'cw-折', char: '折', img: 'broken-branch.png', charMeaning: '弄斷、彎下來。', word: '折斷', meaning: '把東西弄成兩段。', example: '颱風把路邊的樹枝都＿＿了。', options: ['折斷', '豐收', '停止', '隱藏'] }
    ],
    /* 生字變成語：課本延伸成語，解釋和例句改成孩子聽得懂的話 */
    idioms: [
      { id: 'i-疾風勁草', situationImg: 'id-strong-grass.png',
        anim: { bg: 'park', a: { wind: ['🌬️', 6, 30, 14], g1: ['🌱', 30, 76, 8], g2: ['🌾', 50, 72, 12], g3: ['🌱', 70, 76, 8], leaf: ['🍂', 30, 70, 7, 'h'], arm: ['💪', 50, 40, 10, 'h'] },
          s: [['一陣大風呼呼的吹過來，', [['wig', 'wind'], ['mv', 'wind', [30, 30, 1000]]]],
            ['小草都被吹得東倒西歪，', [['shake', 'g1'], ['shake', 'g3'], ['in', 'leaf'], ['mv', 'leaf', [90, 40, 900]]]],
            ['只有一株堅強的草，還是挺得直直的。', [['grow', 'g2', 1.3]]],
            ['遇到困難，才看得出誰最堅強。', [['in', 'arm'], ['pop', 'arm']]]] },
        idiom: '疾風勁草', char: '勁', meaning: '大風吹過，才知道哪些草最堅強；比喻遇到困難，才看得出誰最勇敢、最堅強。', example: '球隊落後很多分，隊長還是不放棄，真是疾風勁草。', situation: '大風把小草吹得東倒西歪，只有一株草還挺得直直的。',
        fill: { options: ['遇到困難他從不退縮，像＿＿＿＿一樣堅強。', '一點小事他就放棄，真是＿＿＿＿。'], clue: '提示：哪一句是遇到困難還是很堅強？', explain: '第一句用得對：遇到困難不退縮，很堅強。一點小事就放棄，剛好相反。' } },
      { id: 'i-隱惡揚善', situationImg: 'id-praise-good.png',
        anim: { bg: 'school', a: { kid: ['🧒', 30, 62, 12], friend: ['👦', 70, 62, 12], oops: ['💥', 70, 40, 8, 'h'], zip: ['🤫', 30, 62, 12, 'h', 'as:kid'], help: ['🤝', 70, 34, 10, 'h'], mega: ['📣', 30, 30, 10, 'h'], star: ['🌟', 50, 18, 10, 'h'] },
          s: [['同學不小心打破了杯子，', [['in', 'oops'], ['shake', 'friend']]],
            ['小華沒有到處說他的錯，', [['out', 'oops'], ['out', 'kid'], ['in', 'zip']]],
            ['可是同學幫助別人的好事，', [['in', 'help']]],
            ['小華卻大聲說給大家聽！', [['out', 'zip'], ['in', 'kid'], ['in', 'mega'], ['in', 'star']]]] },
        idiom: '隱惡揚善', char: '隱', meaning: '不到處說別人的缺點，卻常常稱讚別人的優點。', example: '他總是隱惡揚善，所以大家都喜歡跟他當朋友。', situation: '小華不會到處說同學的錯，卻常常把同學做的好事說給大家聽。',
        fill: { options: ['她從不說別人壞話，只稱讚別人的好，真是＿＿＿＿。', '他最喜歡到處說別人的缺點，一點也不＿＿＿＿。'], clue: '提示：哪一句是不說缺點、只說優點？', explain: '第一句用得對：不說壞話、只稱讚別人。到處說缺點，剛好相反。' } },
      { id: 'i-暗箭傷人', situationImg: 'id-sneaky.png',
        anim: { bg: 'night', a: { bush: ['🌳', 20, 52, 18], eyes: ['👀', 20, 46, 7], arrow: ['🏹', 26, 56, 8, 'h'], a2: ['➡️', 30, 56, 7, 'h'], boy: ['🧑', 76, 62, 12], hurt: ['😢', 76, 62, 12, 'h', 'as:boy'], warn: ['⚠️', 76, 26, 10, 'h'] },
          s: [['有人躲在樹叢裡，偷偷看著別人。', [['wig', 'eyes']]],
            ['他趁別人不注意，偷偷射出一支箭！', [['in', 'arrow'], ['in', 'a2'], ['mv', 'a2', [70, 56, 700]], ['out', 'a2']]],
            ['被射中的人，完全不知道是誰做的。', [['out', 'boy'], ['in', 'hurt'], ['in', 'warn']]],
            ['偷偷用壞方法害人，是不對的！', [['shake', 'warn']]]] },
        idiom: '暗箭傷人', char: '箭', meaning: '偷偷的用壞方法傷害別人。', example: '有什麼不滿可以當面說，千萬不要暗箭傷人。', situation: '有人躲在暗處，趁別人不注意的時候偷偷害他。',
        fill: { options: ['他表面上很友善，背地裡卻＿＿＿＿，說別人壞話。', '他有話都當面好好說，從不＿＿＿＿。'], clue: '提示：哪一句是偷偷用壞方法害人？', explain: '兩句的意思剛好相反。第一句用得對：背地裡偷偷說壞話，就是暗箭傷人。' } },
      { id: 'i-適可而止', situationImg: 'id-stop-game.png',
        anim: { bg: 'room', a: { pc: ['💻', 40, 56, 18], game: ['🎮', 64, 64, 11], clock: ['⏰', 82, 22, 10], stop: ['🛑', 40, 26, 10, 'h'], ball: ['🏀', 80, 70, 10, 'h'] },
          s: [['哥哥在玩電腦遊戲。', [['wig', 'game']]],
            ['玩了一下子，時間到了。', [['wig', 'clock']]],
            ['媽媽說該休息了，哥哥就把電腦關掉。', [['in', 'stop'], ['out', 'pc'], ['out', 'game']]],
            ['起來動一動，玩得剛剛好就停。', [['in', 'ball'], ['jump', 'ball']]]] },
        idiom: '適可而止', char: '止', meaning: '做到剛剛好就停下來，不要做得太過分。', example: '點心很好吃，可是要適可而止，不然吃不下晚餐。', situation: '哥哥玩電腦遊戲玩了一下子，媽媽說該休息了，哥哥就把電腦關掉，起來動一動。',
        fill: { options: ['開玩笑要＿＿＿＿，不要讓別人不舒服。', '他一直吃零食吃到肚子痛，真是＿＿＿＿。'], clue: '提示：哪一句是做到剛好就停下來？', explain: '第一句用得對：開玩笑要剛剛好。一直吃到肚子痛，就是沒有適可而止。' } },
      { id: 'i-羽毛未豐', situationImg: 'id-baby-bird.png',
        anim: { bg: 'sky', a: { tree: ['🌳', 30, 50, 24], nest: ['🪺', 36, 40, 10], chick: ['🐣', 36, 34, 7], bird: ['🐦', 80, 22, 10], fall: ['💫', 50, 50, 8, 'h'] },
          s: [['鳥巢裡有一隻剛出生的小鳥。', [['bob', 'chick']]],
            ['牠看到鳥媽媽在天上飛，也好想飛。', [['mv', 'bird', [60, 16, 1000]], ['jump', 'chick']]],
            ['可是牠的羽毛還沒長好，一飛就跌下來。', [['mv', 'chick', [46, 60, 700]], ['in', 'fall']]],
            ['能力還不夠，要再長大一點才行。', [['out', 'fall'], ['mv', 'chick', [36, 34, 900]]]]] },
        idiom: '羽毛未豐', char: '豐', meaning: '羽毛還沒長好；比喻年紀還小、能力還不夠。', example: '他才剛學游泳，羽毛未豐，還不能自己去深水區。', situation: '剛出生的小鳥羽毛還沒長好，想學鳥媽媽飛，一飛就跌了下來。',
        fill: { options: ['弟弟剛學騎車，＿＿＿＿，還不能自己騎上大馬路。', '他已經是游泳冠軍了，還說自己＿＿＿＿。'], clue: '提示：哪一句是能力還不夠？', explain: '第一句用得對：剛學騎車，能力還不夠。已經是冠軍，就不是羽毛未豐。' } },
      { id: 'i-百折不撓', situationImg: 'id-never-quit.png',
        anim: { bg: 'park', a: { kid: ['🧒', 20, 62, 12], fall: ['💥', 30, 76, 8, 'h'], flag: ['🏁', 86, 50, 11], n1: ['1️⃣', 20, 24, 7, 'h'], n2: ['2️⃣', 32, 24, 7, 'h'], n3: ['3️⃣', 44, 24, 7, 'h'], cup: ['🏆', 74, 26, 11, 'h'] },
          s: [['弟弟學溜直排輪，摔了一次，', [['in', 'fall'], ['in', 'n1'], ['shake', 'kid']]],
            ['又摔了第二次、第三次……', [['in', 'n2'], ['in', 'n3'], ['shake', 'kid']]],
            ['他每一次都馬上站起來，再試一次。', [['out', 'fall'], ['jump', 'kid']]],
            ['最後，他終於溜到終點了！', [['mv', 'kid', [76, 62, 1400]], ['in', 'cup']]]] },
        idiom: '百折不撓', char: '折', meaning: '遇到很多次失敗，還是不放棄、不低頭。', example: '他百折不撓，失敗了好多次，終於做出成功的實驗。', situation: '弟弟學溜直排輪摔了好幾次，每次都站起來再試，最後終於成功。',
        fill: { options: ['發明家失敗了一千次還是不放棄，真是＿＿＿＿。', '他試了一次不成功，就放棄了，一點也不＿＿＿＿。'], clue: '提示：哪一句是失敗很多次還不放棄？', explain: '第一句用得對：失敗一千次還不放棄。試一次就放棄，剛好相反。' } }
    ],
    /* 改錯字：sentence 是正確的句子，畫面上會把 char 換成 wrong；options 的第一個是正確的字。clue 只說語詞的意思，不能出現正確的字。 */
    fix: [
      { id: 'fx-峭', char: '峭', wrong: '俏', sentence: '海邊有一片又高又直的峭壁。', options: ['峭', '俏', '削'], clue: '這裡說的是又高又直的山壁，想一想，哪一個字有山字旁？', explain: '要改成「峭」。又高又直的山壁是「峭壁」；「俏」是俏皮的俏。' },
      { id: 'fx-勁', char: '勁', wrong: '徑', sentence: '大家一起使勁，把大石頭推開了。', options: ['勁', '徑', '經'], clue: '這裡是說用很大的力氣，想一想，哪一個字的右邊是「力」？', explain: '要改成「勁」。用力是「使勁」；「徑」是小徑的徑。' },
      { id: 'fx-聳', char: '聳', wrong: '慫', sentence: '我問他去哪裡，他聳了一下肩說不知道。', options: ['聳', '慫', '從'], clue: '這裡是說把肩膀抬高，想一想，哪一個字的下面是「耳」？', explain: '要改成「聳」。抬高肩膀是「聳肩」；「慫」的下面是心。' },
      { id: 'fx-飢', char: '飢', wrong: '肌', sentence: '爬完山，大家又累又飢餓。', options: ['飢', '肌', '機'], clue: '這裡是說肚子很餓，想一想，哪一個字有食字旁？', explain: '要改成「飢」。肚子餓是「飢餓」；「肌」是肌肉的肌。' },
      { id: 'fx-隱', char: '隱', wrong: '穩', sentence: '小貓隱藏在草叢裡，只露出一條尾巴。', options: ['隱', '穩', '急'], clue: '這裡是說藏起來，想一想，哪一個字有阜字旁？', explain: '要改成「隱」。藏起來是「隱藏」；「穩」是安穩的穩。' },
      { id: 'fx-扯', char: '扯', wrong: '址', sentence: '兩隻小狗在拉扯一條毛巾。', options: ['扯', '址', '趾'], clue: '這裡是說用力拉，想一想，哪一個字有提手旁？', explain: '要改成「扯」。用力拉是「拉扯」；「址」是地址的址。' },
      { id: 'fx-銳', char: '銳', wrong: '蛻', sentence: '老鷹的爪子很銳利。', options: ['銳', '蛻', '說'], clue: '這裡是說又尖又利，想一想，哪一個字有金字旁？', explain: '要改成「銳」。又尖又利是「銳利」；「蛻」是蛻皮的蛻。' },
      { id: 'fx-箭', char: '箭', wrong: '煎', sentence: '他拉開弓，把箭射向遠方的靶子。', options: ['箭', '煎', '剪'], clue: '這裡說的是用弓射出去的東西，想一想，哪一個字有竹字頭？', explain: '要改成「箭」。用弓射的是「箭」；「煎」是煎蛋的煎。' },
      { id: 'fx-韌', char: '韌', wrong: '忍', sentence: '這條繩子很有韌性，怎麼拉都不會斷。', options: ['韌', '忍', '紉'], clue: '這裡是說拉不斷、很結實，想一想，哪一個字的左邊是「韋」？', explain: '要改成「韌」。拉不斷是「韌性」；「忍」是忍耐的忍。' },
      { id: 'fx-虯', char: '虯', wrong: '糾', sentence: '老樹的樹根虯曲的爬在地上。', options: ['虯', '糾', '叫'], clue: '這裡是說彎彎曲曲，想一想，哪一個字有虫字旁？', explain: '要改成「虯」。彎彎曲曲是「虯曲」；「糾」是糾正的糾。' },
      { id: 'fx-鬚', char: '鬚', wrong: '須', sentence: '爺爺留著白白的鬍鬚。', options: ['鬚', '須', '需'], clue: '這裡說的是下巴上的毛，想一想，哪一個字上面和毛髮有關？', explain: '要改成「鬚」。下巴上的毛是「鬍鬚」；「須」是必須的須。' },
      { id: 'fx-茂', char: '茂', wrong: '戊', sentence: '春天到了，樹葉長得很茂盛。', options: ['茂', '戊', '茅'], clue: '這裡是說植物長得又多又密，想一想，哪一個字有草字頭？', explain: '要改成「茂」。長得又多又密是「茂盛」，有草字頭。' },
      { id: 'fx-止', char: '止', wrong: '正', sentence: '雨停止了，天空出現彩虹。', options: ['止', '正', '上'], clue: '這裡是說停下來，想一想，哪一個字像一隻停住的腳？', explain: '要改成「止」。停下來是「停止」；「正」是正確的正。' },
      { id: 'fx-蔓', char: '蔓', wrong: '漫', sentence: '小火很快蔓延成一片大火。', options: ['蔓', '漫', '慢'], clue: '這裡是說像爬藤植物一樣一直往外擴大，想一想，哪一個字有草字頭？', explain: '要改成「蔓」。往外擴大是「蔓延」；「漫」是漫畫的漫。' },
      { id: 'fx-藉', char: '藉', wrong: '籍', sentence: '弟弟找藉口說肚子痛，不想寫功課。', options: ['藉', '籍', '借'], clue: '這裡說的是故意找的理由，想一想，哪一個字有草字頭？', explain: '要改成「藉」。故意找的理由是「藉口」；「籍」是書籍的籍。' },
      { id: 'fx-豐', char: '豐', wrong: '禮', sentence: '今年稻米豐收，農夫好開心。', options: ['豐', '禮', '艷'], clue: '這裡是說收成很多，想一想，哪一個字的下面是「豆」？', explain: '要改成「豐」。收成很多是「豐收」；「禮」是禮物的禮。' },
      { id: 'fx-挫', char: '挫', wrong: '座', sentence: '比賽輸了，他覺得有點受挫。', options: ['挫', '座', '坐'], clue: '這裡是說遇到失敗、心裡難過，想一想，哪一個字有提手旁？', explain: '要改成「挫」。遇到失敗是「受挫」；「座」是座位的座。' },
      { id: 'fx-折', char: '折', wrong: '拆', sentence: '大風把樹枝折斷了。', options: ['折', '拆', '析'], clue: '這裡是說把樹枝弄成兩段，想一想，哪一個字的右邊是「斤」，沒有多一點？', explain: '要改成「折」。弄成兩段是「折斷」；「拆」是拆開的拆。' }
    ],
    similar: [
      { id: 's1', meaning: '「＿皮」是很可愛、喜歡開玩笑的樣子。', sentence: '妹妹＿皮的對我眨眨眼。', frame: '＿皮', options: ['俏', '峭'], answer: '俏', clue: '提示：這個字和人有關，左邊是單人旁。', explain: '答案是「俏」；「峭」是峭壁的峭，有山字旁。' },
      { id: 's2', meaning: '「＿鉛筆」是把鉛筆的頭弄尖。', sentence: '寫字前，我先把鉛筆＿尖。', frame: '＿尖', options: ['削', '峭'], answer: '削', clue: '提示：要用刀子，右邊是立刀旁。', explain: '答案是「削」；「峭」是峭壁的峭。' },
      { id: 's3', meaning: '「小＿」是小小的、窄窄的路。', sentence: '我們沿著一條小＿走到湖邊。', frame: '小＿', options: ['徑', '勁'], answer: '徑', clue: '提示：和走路有關，左邊是雙人旁。', explain: '答案是「徑」；「勁」是使勁的勁，右邊是「力」。' },
      { id: 's4', meaning: '「安＿」是平平安安、不搖晃。', sentence: '爸爸開車很安＿，我在車上睡著了。', frame: '安＿', options: ['穩', '隱'], answer: '穩', clue: '提示：這個字的左邊是禾字旁。', explain: '答案是「穩」；「隱」是隱藏的隱，有阜字旁。' },
      { id: 's5', meaning: '「地＿」是住的地方在哪條路幾號。', sentence: '寄信要寫清楚收信人的地＿。', frame: '地＿', options: ['址', '扯'], answer: '址', clue: '提示：和土地、地方有關，左邊是土字旁。', explain: '答案是「址」；「扯」是拉扯的扯，有提手旁。' },
      { id: 's6', meaning: '「腳＿」是腳上的手指頭。', sentence: '我光著腳，腳＿碰到冰冰的水。', frame: '腳＿', options: ['趾', '扯'], answer: '趾', clue: '提示：和腳有關，左邊是足字旁。', explain: '答案是「趾」；「扯」是拉扯的扯。' },
      { id: 's7', meaning: '「＿皮」是蛇、蟬長大時脫掉舊的外殼。', sentence: '蛇長大了，會把舊皮＿下來。', frame: '＿下', options: ['蛻', '銳'], answer: '蛻', clue: '提示：和蟲、蛇這些動物有關，左邊是虫字旁。', explain: '答案是「蛻」；「銳」是銳利的銳，有金字旁。' },
      { id: 's8', meaning: '「＿蛋」是把蛋放在鍋子裡用油煮熟。', sentence: '媽媽早上＿了一顆荷包蛋。', frame: '＿了', options: ['煎', '箭'], answer: '煎', clue: '提示：要用火，下面有四點。', explain: '答案是「煎」；「箭」是弓箭的箭，有竹字頭。' },
      { id: 's9', meaning: '「＿正」是把錯的地方改對。', sentence: '老師幫我＿正寫錯的字。', frame: '＿正', options: ['糾', '虯'], answer: '糾', clue: '提示：這個字的左邊是糸字旁。', explain: '答案是「糾」；「虯」是虯鬚的虯，有虫字旁。' },
      { id: 's10', meaning: '「＿確」是對的、沒有錯。', sentence: '這一題的答案完全＿確。', frame: '＿確', options: ['正', '止'], answer: '正', clue: '提示：這個字的上面多了一橫。', explain: '答案是「正」；「止」是停止的止。' },
      { id: 's11', meaning: '「書＿」是很多的書。', sentence: '圖書館收藏了很多書＿。', frame: '書＿', options: ['籍', '藉'], answer: '籍', clue: '提示：以前的書寫在竹片上，上面是竹字頭。', explain: '答案是「籍」；「藉」是藉口的藉，有草字頭。' },
      { id: 's12', meaning: '「＿開」是把東西打開、弄散。', sentence: '我小心的把禮物＿開。', frame: '＿開', options: ['拆', '折'], answer: '拆', clue: '提示：這個字的右邊多了一點。', explain: '答案是「拆」；「折」是折斷的折。' }
    ],
    listen: [
      { id: 'l1', text: '山坡又高又斜，要抓著繩子才爬得上去。', answer: 0, options: [{ text: '陡峭', img: 'cliff.png' }, { text: '繁茂', img: 'lush-tree.png' }, { text: '高聳', img: 'tall-tower.png' }, { text: '堅韌', img: 'rubber-band.png' }] },
      { id: 'l2', text: '大樓又直又高，好像要碰到天空。', answer: 0, options: [{ text: '高聳', img: 'tall-tower.png' }, { text: '陡峭', img: 'cliff.png' }, { text: '豐富', img: 'library-books.png' }, { text: '隱形', img: 'magic-cloak.png' }] },
      { id: 'l3', text: '肚子餓了，先吃一片餅乾。', answer: 0, options: [{ text: '充飢', img: 'snack-cookie.png' }, { text: '休止', img: 'waves-beach.png' }, { text: '挫折', img: 'fail-test.png' }, { text: '拉扯', img: 'tug-rope.png' }] },
      { id: 'l4', text: '穿上魔法斗篷，誰都看不到你。', answer: 0, options: [{ text: '隱形', img: 'magic-cloak.png' }, { text: '尖銳', img: 'sharp-knife.png' }, { text: '蔓生', img: 'vine-wall.png' }, { text: '強勁', img: 'strong-wind.png' }] },
      { id: 'l5', text: '這條繩子很結實，用力拉也不會斷。', answer: 0, options: [{ text: '堅韌', img: 'rubber-band.png' }, { text: '尖銳', img: 'sharp-knife.png' }, { text: '繁茂', img: 'lush-tree.png' }, { text: '陡峭', img: 'cliff.png' }] },
      { id: 'l6', text: '公園的大樹，葉子長得又多又密。', answer: 0, options: [{ text: '繁茂', img: 'lush-tree.png' }, { text: '高聳', img: 'tall-tower.png' }, { text: '豐富', img: 'library-books.png' }, { text: '蔓生', img: 'vine-wall.png' }] },
      { id: 'l7', text: '做事不順利、失敗了，心裡很難過。', answer: 0, options: [{ text: '挫折', img: 'fail-test.png' }, { text: '充飢', img: 'snack-cookie.png' }, { text: '藉由', img: 'video-class.png' }, { text: '冷箭', img: 'bow-arrow.png' }] },
      { id: 'l8', text: '又大又猛的颳風和下雨。', answer: 0, options: [{ text: '狂風暴雨', img: 'storm.png' }, { text: '堅定不移', img: 'climb-goal.png' }, { text: '強勁', img: 'strong-wind.png' }, { text: '繁茂', img: 'lush-tree.png' }] }
    ],
    /* ---------- 短語、句型、修辭（句子都是 Claude 自己寫的） ---------- */
    phrase: {
      /* 拼短語每一格下面寫要放什麼樣的詞 */
      fillLabels: { before: '做什麼', answer: '怎麼樣', noun: '什麼東西' },
      pickName: '看圖選一選', pickSay: '看圖，選出最適合的詞，說說看做了什麼、是什麼樣的東西。',
      /* 短語：做什麼＋怎麼樣＋的＋什麼東西（課本的例子是課文原句，這裡換成自己寫的） */
      intro: { example: '搭起溫暖的帳篷', img: 'pr-warm-tent.png',
        parts: [{ text: '搭起', role: '做什麼' }, { text: '溫暖', role: '怎麼樣' }, { text: '的' }, { text: '帳篷', role: '什麼東西' }],
        explain: '先說做什麼，再說東西的特色，加上「的」，最後說是什麼東西。' },
      pick: [
        { id: 'ph1', img: 'pr-sand-castle.png', before: '堆出', noun: '城堡', ask: '堆出什麼樣的城堡', look: '再看看圖片，這座沙城堡跟小朋友比起來怎麼樣？', options: ['高大', '苦澀', '冰冷', '吵鬧'], clue: '提示：沙城堡疊得比小朋友的頭還要上去。', explain: '答案是「高大」，完整的短語是「堆出高大的城堡」。' },
        { id: 'ph2', img: 'pr-paint-wall.png', before: '畫出', noun: '壁畫', ask: '畫出什麼樣的壁畫', look: '再看看圖片，牆上的畫有幾種顏色？', options: ['繽紛', '安靜', '苦澀', '冰冷'], clue: '提示：紅橙黃綠藍紫，五顏六色好熱鬧。', explain: '答案是「繽紛」，完整的短語是「畫出繽紛的壁畫」。' },
        { id: 'ph3', img: 'pr-hot-soup.png', before: '煮出', noun: '湯', ask: '煮出什麼樣的湯', look: '再看看圖片，湯是冷的還是熱的？', options: ['熱騰騰', '冷冰冰', '硬梆梆', '黑漆漆'], clue: '提示：碗上一直冒著白白的煙。', explain: '答案是「熱騰騰」，完整的短語是「煮出熱騰騰的湯」。' },
        { id: 'ph4', img: 'pr-strong-bridge.png', before: '蓋出', noun: '橋', ask: '蓋出什麼樣的橋', look: '再看看圖片，很多車子開過去，橋會不會壞？', options: ['堅固', '柔軟', '香甜', '吵鬧'], clue: '提示：大卡車開過去也穩穩的，不會搖晃。', explain: '答案是「堅固」，完整的短語是「蓋出堅固的橋」。' },
        { id: 'ph5', img: 'pr-story-book.png', before: '寫出', noun: '故事', ask: '寫出什麼樣的故事', look: '再看看圖片，小朋友聽故事時的表情怎麼樣？', options: ['有趣', '冰冷', '苦澀', '沉重'], clue: '提示：大家聽得哈哈大笑，還想再聽一次。', explain: '答案是「有趣」，完整的短語是「寫出有趣的故事」。' },
        { id: 'ph6', img: 'pr-big-kite.png', before: '做出', noun: '風箏', ask: '做出什麼樣的風箏', look: '再看看圖片，風箏跟爸爸比起來大不大？', options: ['巨大', '香甜', '吵鬧', '苦澀'], clue: '提示：風箏比爸爸還要高、還要寬。', explain: '答案是「巨大」，完整的短語是「做出巨大的風箏」。' },
        { id: 'ph7', img: 'pr-clean-room.png', before: '整理出', noun: '房間', ask: '整理出什麼樣的房間', look: '再看看圖片，房間裡有沒有亂丟的東西？', options: ['整齊', '吵鬧', '苦澀', '冰冷'], clue: '提示：書排好、被子摺好，地上什麼也沒有。', explain: '答案是「整齊」，完整的短語是「整理出整齊的房間」。' },
        { id: 'ph8', img: 'pr-sweet-cake.png', before: '烤出', noun: '蛋糕', ask: '烤出什麼樣的蛋糕', look: '再看看圖片，蛋糕吃起來怎麼樣？', options: ['香甜', '冰冷', '吵鬧', '粗糙'], clue: '提示：聞起來很誘人，吃起來像加了蜂蜜。', explain: '答案是「香甜」，完整的短語是「烤出香甜的蛋糕」。' }
      ],
      say: [],
      words: [
        { word: '陡峭', meaning: '山坡又高又斜，很難爬上去。', img: 'cliff.png' },
        { word: '繁茂', meaning: '植物長得又多又密。', img: 'lush-tree.png' },
        { word: '狂風暴雨', meaning: '天氣非常惡劣，樹被吹倒、街上淹水。', img: 'storm.png' },
        { word: '堅定不移', meaning: '心意非常穩，一點都不改變。', img: 'climb-goal.png' }
      ],
      choose: [
        { id: 'pw1', word: '陡峭', options: ['這段山路很陡峭，大家要小心慢慢走。', '操場平平的，非常陡峭。'], clue: '提示：想一想，「陡峭」是又高又斜，還是平平的？', explain: '第一句用得對：山路又高又斜，要小心。操場平平的，就不陡峭。' },
        { id: 'pw2', word: '繁茂', options: ['夏天的森林枝葉繁茂，陽光都照不進來。', '冬天的樹葉子掉光了，看起來很繁茂。'], clue: '提示：想一想，「繁茂」是葉子很多，還是很少？', explain: '第一句用得對：葉子又多又密。葉子掉光了，就不繁茂。' },
        { id: 'pw3', word: '狂風暴雨', options: ['一場狂風暴雨過後，路上到處是斷掉的樹枝。', '今天狂風暴雨，太陽好大，我們去海邊玩。'], clue: '提示：想一想，「狂風暴雨」的天氣是好還是壞？', explain: '第一句用得對：大風大雨吹斷樹枝。太陽很大是好天氣，不是狂風暴雨。' },
        { id: 'pw4', word: '堅定不移', options: ['不管多難，她想當畫家的心意都堅定不移。', '他一下想學鋼琴，一下想學游泳，真是堅定不移。'], clue: '提示：想一想，「堅定不移」是一直不變，還是一直改變？', explain: '第一句用得對：心意一直不變。一下想這個一下想那個，剛好相反。' }
      ],
      make: [
        { id: 'pm1', word: '陡峭', clue: '提示：想想看，你有沒有走過、看過很陡的路或山？', model: '爺爺家後面的山路很陡峭，我爬得氣喘吁吁。' },
        { id: 'pm2', word: '繁茂', clue: '提示：想想看，哪裡的植物長得又多又密？', model: '學校的榕樹長得很繁茂，像一把綠色的大傘。' },
        { id: 'pm3', word: '狂風暴雨', clue: '提示：想想看，颱風天外面是什麼樣子？', model: '颱風來時狂風暴雨，我們都待在家裡。' },
        { id: 'pm4', word: '堅定不移', clue: '提示：想想看，你有沒有一個很想做到、一直不放棄的目標？', model: '我想學會游泳的心堅定不移，每週都去練習。' }
      ]
    },
    pattern: [
      { key: 'xianzai', id: 'xz', title: '先……再……', img: 'xianzai.png',
        meaning: '先用「先」說第一件要做的事，再用「再」說接著做的事，順序不能換。',
        examples: ['放學回家，我先洗手，再吃點心。'],
        match: [
          { id: 'pt-xz-m1', img: 'pt-warm-up.png', front: '游泳前，要先做暖身運動，', options: ['再下水游泳。', '再去睡覺。', '再回家吃飯。'], clue: '提示：看看圖片，暖身完要做什麼？', explain: '答案是「再下水游泳」：先暖身，再游泳，順序不能換。' },
          { id: 'pt-xz-m2', img: 'pt-homework-play.png', front: '我先寫完功課，', options: ['再出去玩。', '再寫功課。', '再出生。'], clue: '提示：看看圖片，功課寫完了，接著做什麼？', explain: '答案是「再出去玩」：先寫功課，再出去玩。' },
          { id: 'pt-xz-m3', img: 'pt-wash-veg.png', front: '媽媽先把青菜洗乾淨，', options: ['再放進鍋子裡炒。', '再丟進垃圾桶。', '再拿去曬太陽。'], clue: '提示：看看圖片，洗好的青菜要怎麼處理？', explain: '答案是「再放進鍋子裡炒」：先洗，再炒。' }
        ],
        conj: [
          { id: 'pt-xz-c1', full: '過馬路要先看紅綠燈，再走斑馬線。', img: 'pt-cross-road.png', sentence: '過馬路要＿看紅綠燈，＿走斑馬線。', options: ['先……再……', '就算……也……', '雖然……可是……'], clue: '提示：兩件事有先後順序。數數看有幾個空格。', explain: '答案是「先……再……」：過馬路要先看紅綠燈，再走斑馬線。' },
          { id: 'pt-xz-c2', full: '我們先把種子種下，再每天澆水。', img: 'pt-plant-seed.png', sentence: '我們＿把種子種下，＿每天澆水。', options: ['先……再……', '就算……也……', '雖然……可是……'], clue: '提示：種子要先種，接著才澆水。數數看有幾個空格。', explain: '答案是「先……再……」：我們先把種子種下，再每天澆水。' }
        ],
        half: [
          { id: 'pt-xz-h1', front: '早上起床，我先刷牙洗臉，', clue: '提示：刷牙洗臉以後，你接著做什麼？記得要說「再」。', model: '再去吃早餐。' },
          { id: 'pt-xz-h2', front: '畫畫時，我先用鉛筆打草稿，', clue: '提示：打完草稿，接著做什麼？記得要說「再」。', model: '再塗上顏色。' }
        ],
        whole: [
          { id: 'pt-xz-w1', clue: '提示：先用「先」說第一件事，再用「再」說第二件事。想想看：你做一件事的順序是什麼？', model: '吃飯前，我先擺好碗筷，再請爸媽來吃飯。' }
        ] },
      { key: 'jiusuan', id: 'js', title: '就算……也……', img: 'jiusuan.png',
        meaning: '先用「就算」說一個困難的情況，再用「也」說不管怎樣都不會改變的事。',
        examples: ['就算外面下大雨，我也要準時去上學。'],
        match: [
          { id: 'pt-js-m1', img: 'pt-tired-run.png', front: '就算跑得很累，', options: ['他也要跑到終點。', '他也變成了小鳥。', '他也在家睡覺。'], clue: '提示：看看圖片，很累了，他還要不要繼續跑？', explain: '答案是「他也要跑到終點」：再累也不放棄。' },
          { id: 'pt-js-m2', img: 'pt-hard-puzzle.png', front: '就算題目很難，', options: ['我也要想出答案。', '我也會飛上天。', '我也不吃飯了。'], clue: '提示：題目很難，你還要不要想？', explain: '答案是「我也要想出答案」：再難也不放棄。' },
          { id: 'pt-js-m3', img: 'pt-cold-swim.png', front: '就算天氣很冷，', options: ['哥哥也照樣去晨跑。', '哥哥也變成雪人。', '哥哥也長出尾巴。'], clue: '提示：看看圖片，天氣冷，哥哥還有沒有出門運動？', explain: '答案是「哥哥也照樣去晨跑」：天冷也不改變。' }
        ],
        conj: [
          { id: 'pt-js-c1', full: '就算失敗很多次，我也不會放棄。', img: 'pt-try-again.png', sentence: '＿＿失敗很多次，我＿不會放棄。', options: ['就算……也……', '先……再……', '只要……就……'], clue: '提示：遇到困難，還是不改變。數數看有幾個空格。', explain: '答案是「就算……也……」：就算失敗很多次，我也不會放棄。' },
          { id: 'pt-js-c2', full: '就算只有一點點時間，她也會拿起書來讀。', img: 'pt-read-bus.png', sentence: '＿＿只有一點點時間，她＿會拿起書來讀。', options: ['就算……也……', '先……再……', '只要……就……'], clue: '提示：時間很少，她還是要讀書。數數看有幾個空格。', explain: '答案是「就算……也……」：就算只有一點點時間，她也會拿起書來讀。' }
        ],
        half: [
          { id: 'pt-js-h1', front: '就算路很遠，', clue: '提示：路很遠，你還是會做什麼？記得要說「也」。', model: '我也要去看外婆。' },
          { id: 'pt-js-h2', front: '就算別人笑我，', clue: '提示：別人笑你，你還是會怎麼做？記得要說「也」。', model: '我也要做對的事。' }
        ],
        whole: [
          { id: 'pt-js-w1', clue: '提示：先用「就算」說一個困難，再用「也」說你不會改變的事。想想看：有什麼事你一定要做到？', model: '就算再累，我也要把房間整理乾淨。' }
        ] }
    ],
    rhetoric: {
      cards: [
        { key: 'simile', name: '譬喻', meaning: '把一樣東西比成另一樣有相同地方的東西，讓人更容易想像。', example: '詩裡把陽光比成金色的麵條，把風比成看不見的繩子，把雨比成射過來的箭。',
          show: { sentence: '天上的雲像一群綿羊。' },
          yesno: [
            { id: 'rh-si-y1', sentence: '月光像一條銀色的毯子，蓋在湖面上。', answer: true, clue: '提示：這句話有沒有把月光比成另一樣東西？', explain: '是譬喻：把月光比成毯子。' },
            { id: 'rh-si-y2', sentence: '月亮出來了。', answer: false, clue: '提示：這句話有沒有把月亮比成別的東西？', explain: '不是譬喻：這句話只是說月亮出來了。' }
          ],
          pick: [
            { id: 'rh-si-p1', options: ['雨點像一顆顆小石子，打在屋頂上。', '外面在下雨。'], clue: '提示：哪一句把雨點比成另一樣東西？', explain: '「像一顆顆小石子」是譬喻。' },
            { id: 'rh-si-p2', options: ['藤蔓像一條綠色的繩子，爬滿了牆。', '牆上有藤蔓。'], clue: '提示：哪一句把藤蔓比成別的東西？', explain: '「像一條綠色的繩子」是譬喻。' },
            { id: 'rh-si-p3', options: ['山頂的白雪，像戴了一頂白帽子。', '山頂有雪。', '山很高。'], clue: '提示：哪一句用「像」把白雪比成別的東西？', explain: '「像戴了一頂白帽子」是譬喻。' },
            { id: 'rh-si-p4', options: ['夏天的太陽像一個大火爐。', '夏天很熱。', '太陽出來了。'], clue: '提示：哪一句把太陽比成另一樣東西？', explain: '「像一個大火爐」是譬喻。' },
            { id: 'rh-si-p5', options: ['露珠在葉子上，好像一粒粒小珍珠。', '葉子上有露珠。', '早上很涼。', '露珠在對我說早安。'], clue: '提示：哪一句用「好像」把露珠比成別的東西？', explain: '「好像一粒粒小珍珠」是譬喻。' },
            { id: 'rh-si-p6', options: ['風吹過稻田，稻子像金色的海浪。', '稻田裡有稻子。', '農夫在割稻。', '稻子在對我揮手。'], clue: '提示：哪一句把稻子比成另一樣東西？', explain: '「像金色的海浪」是譬喻。' }
          ] },
        { key: 'personify', name: '擬人', meaning: '把東西或動物當成人來寫，讓它們會說話、會笑、會做人做的事。', example: '詩裡寫風會「扯」後腿、雨會「刺」全身，好像風和雨是會動手的人。',
          show: { sentence: '小雨點在窗戶上跳舞。', mark: ['跳舞'] },
          yesno: [
            { id: 'rh-pe-y1', sentence: '太陽公公笑著叫我起床。', answer: true, mark: ['笑著叫我起床'], clue: '提示：這句話有沒有把太陽寫得像人一樣？', explain: '是擬人：太陽像人一樣會笑、會叫人。' },
            { id: 'rh-pe-y2', sentence: '太陽升起來了。', answer: false, clue: '提示：這句話裡的太陽，有沒有做人做的事？', explain: '不是擬人：這句話只是說太陽升起來。' }
          ],
          pick: [
            { id: 'rh-pe-p1', mark: ['推著'], options: ['北風推著我往前走。', '今天的風很大。'], clue: '提示：哪一句的風像人一樣會推？', explain: '「北風推著我」是擬人。' },
            { id: 'rh-pe-p2', mark: ['唱著歌'], options: ['小溪一路唱著歌往前流。', '小溪的水很清。'], clue: '提示：哪一句的小溪像人一樣會唱歌？', explain: '「小溪唱著歌」是擬人。' },
            { id: 'rh-pe-p3', mark: ['拉住'], options: ['樹枝拉住我的衣服，不讓我走。', '樹枝勾到我的衣服。', '我的衣服破了。'], clue: '提示：哪一句的樹枝像人一樣會拉人？', explain: '「樹枝拉住我的衣服，不讓我走」是擬人。' },
            { id: 'rh-pe-p4', mark: ['伸懶腰'], options: ['小草伸了個懶腰，醒過來了。', '小草長出來了。', '草地一片翠綠。'], clue: '提示：哪一句的小草像人一樣會伸懶腰？', explain: '「小草伸了個懶腰」是擬人。' },
            { id: 'rh-pe-p5', mark: ['偷偷'], options: ['月亮躲在雲後面偷偷看我。', '月亮被雲遮住了。', '晚上很黑。', '月亮像一個盤子。'], clue: '提示：哪一句的月亮像人一樣會躲、會看？', explain: '「月亮躲在雲後面偷偷看我」是擬人。' },
            { id: 'rh-pe-p6', mark: ['點點頭'], options: ['向日葵對著太陽點點頭。', '向日葵開花了。', '向日葵是黃色的。', '向日葵像一個小太陽。'], clue: '提示：哪一句的向日葵像人一樣會點頭？', explain: '「向日葵對著太陽點點頭」是擬人。' }
          ] }
      ],
      quiz: [
        { id: 'rh1', sentence: '彩虹像一座七彩的橋。', answer: '譬喻', clue: '提示：這句話有沒有把彩虹比成別的東西？', explain: '答案是「譬喻」：把彩虹比成橋。' },
        { id: 'rh2', sentence: '他的聲音甜得像蜂蜜。', answer: '譬喻', clue: '提示：這句話有沒有用「像」？', explain: '答案是「譬喻」：把聲音比成蜂蜜。' },
        { id: 'rh3', sentence: '花兒張開嘴巴喝雨水。', answer: '擬人', mark: ['張開嘴巴喝雨水'], clue: '提示：花會不會像人一樣做事？', explain: '答案是「擬人」：花像人一樣會喝水。' },
        { id: 'rh4', sentence: '風在窗外敲門。', answer: '擬人', mark: ['敲門'], clue: '提示：這句話有沒有把風寫得像人？', explain: '答案是「擬人」：風像人一樣會敲門。' }
      ]
    }
  };
  if (typeof module === 'object' && module.exports) module.exports = d;
  else { root.H3A_WORDS = root.H3A_WORDS || {}; root.H3A_WORDS.L03 = d; }
})(this);
