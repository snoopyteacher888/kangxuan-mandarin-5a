/* 第 5 課字詞練習（公開、不加密）。句子和解釋都是 Claude 自己寫的，沒有課本原文。
   生字、語詞：options 的第一個是正確答案（作答時會打亂）。 */
(function (root) {
  var d = {
    /* 理解提問的分類（照課本「閱讀理解提問」）：extract 提取訊息、infer 推論訊息、interpret 詮釋整合、evaluate 比較評估。只放題號，不放課文 */
    quizLevels: { qa: 'extract', qb: 'extract', qc: 'extract', qd: 'extract', qe: 'extract', qf: 'infer', qg: 'infer', qh: 'infer',
      qi: 'interpret', qj: 'evaluate', k1: 'interpret', k2: 'evaluate' },
    /* 詮釋整合、比較評估的鷹架：think 是「想一想」的兩個步驟（不說答案），why 是「老師教你」的說明。不放課文原句 */
    quizHelp: {
      qi: { think: ['課文介紹了好幾個商標，每一個都說了它是怎麼來的、代表什麼？', '一個小小的圖案，能讓你知道一家公司的哪些事？'], why: '每個商標背後，都藏著公司的歷史、想做到的目標、賣什麼東西和有什麼特色。所以作者說，每個商標都有一個特別的故事，等我們去聽。' },
      qj: { think: ['好記的商標，能不能讓人一下子就記住這家店？', '如果東西不好用，只靠漂亮的商標，大家會不會一直買？'], why: '好的商標能讓人印象深刻、想要買看看，是很大的幫助。可是商品本身也要好，大家才會一直支持。兩樣都重要。' }
    },
    /* 「說說看」改成選選看：good 兩個合理的想法（選哪一個都對）、bad 兩個不合理的，why 是老師教你的說明。不放課文原句 */
    talkChoices: {
      k1: { good: ['我想開麵包店，商標畫一個戴廚師帽的小麵包，讓人一看就知道賣什麼。', '我想開書店，商標畫一本打開的書，上面飛出小鳥，代表讀書讓人自由。'], bad: ['我的商標要畫得亂七八糟，讓人看不懂。', '我不要商標，也不要店名。'], why: '題目問的是你會設計什麼商標。好的商標要讓人看得懂、記得住，還能說出店的特色。畫得看不懂、不要商標，都沒有回答到題目。' },
      k2: { good: ['會，看到熟悉的商標，我們會比較放心。', '有時候會，但我們還是會比較價錢和品質。'], bad: ['商標是什麼？我們家都不買東西。', '只要商標好看，東西壞了也沒關係。'], why: '題目問的是買東西時會不會受商標影響。熟悉的商標讓人放心，也可以一邊看商標一邊比品質。說不買東西、東西壞了也沒關係，都不合理。' }
    },
    hanzi: [
      { id: 'h-譽', combo: { layout: 'tb', parts: [['與', 's', ''], ['言', 'm', '說話']] }, char: '譽', zhuyin: 'ㄩˋ', radical: '言', strokes: 21, words: ['商譽', '名譽'], say: '譽，名譽的譽', cloze: '名＿', img: 'medal-honor.png', options: ['譽', '舉', '與', '興'], clue: '這個字的下面是「言」。', explain: '答案是「譽」，下面是「言」；「舉」的下面是「手」，「與」的下面沒有東西。', parts: ['與', '言'], story: '上面的「與」念起來像「譽」，下面的「言」是說話。大家都說你好，就是有好「名譽」。', sentence: '他誠實又熱心，在村子裡很有名譽。', build: { layout: 'tb', show: ['與', '？'], answer: '言', options: ['言', '手', '心', '貝'], clue: '想一想：好名聲是大家用嘴巴講出來的，下面放哪一個？' } },
      { id: 'h-務', combo: { layout: 'tb', parts: [['敄', 's', ''], ['力', 'm', '力氣']] }, char: '務', zhuyin: 'ㄨˋ', radical: '力', strokes: 11, words: ['服務', '任務'], say: '務，任務的務', cloze: '任＿', img: 'waiter-serve.png', options: ['務', '霧', '矛', '柔'], clue: '這個字的下面是「力」。', explain: '答案是「務」，下面是「力」；「霧」的上面多了雨字頭，「柔」的下面是「木」。', parts: ['敄', '力'], story: '上面的「敄」念起來像「務」，下面是「力」。用力把該做的事做好，就是完成「任務」。', sentence: '老師交給我一個任務：把作業簿發下去。', build: { layout: 'tb', show: ['敄', '？'], answer: '力', options: ['力', '心', '木', '口'], clue: '想一想：做事情要使出什麼？' } },
      { id: 'h-聯', combo: { type: '會意字', pict: '左邊是「耳」，右邊像一串絲線連在一起。以前把東西用線串起來，一個接一個，就是「聯」，所以有連在一起的意思。' }, char: '聯', zhuyin: 'ㄌㄧㄢˊ', radical: '耳', strokes: 17, words: ['關聯', '聯絡'], say: '聯，聯絡的聯', cloze: '＿絡', img: 'phone-call.png', options: ['聯', '連', '關', '職'], clue: '這個字的左邊是「耳」。', explain: '答案是「聯」，左邊是「耳」；「連」有辵字旁，「職」的右邊是「戠」。', parts: ['耳', '絲'], story: '左邊是耳朵，右邊像絲線一串一串連起來。打電話、傳訊息，讓大家連在一起，就是「聯絡」。', sentence: '我們用電話和外婆聯絡。' },
      { id: 'h-核', combo: { layout: 'lr', parts: [['木', 'm', '樹'], ['亥', 's', '']] }, char: '核', zhuyin: 'ㄏㄜˊ', radical: '木', strokes: 10, words: ['核准', '果核'], say: '核，果核的核', cloze: '果＿', img: 'peach-pit.png', options: ['核', '該', '刻', '孩'], clue: '這個字的左邊是木字旁。', explain: '答案是「核」，左邊是木字旁；「該」的左邊是言字旁，「孩」的左邊是子字旁。', parts: ['木', '亥'], story: '左邊的「木」是果樹，右邊的「亥」念起來有點像「核」。水果中間硬硬的種子，就是「果核」。', sentence: '吃完桃子，要把果核丟進垃圾桶。', build: { layout: 'lr', show: ['？', '亥'], answer: '木', options: ['木', '言', '刂', '子'], clue: '想一想：水果長在什麼上面？' } },
      { id: 'h-申', combo: { type: '象形字', pict: '「申」像天空中彎彎曲曲的閃電，往上下兩邊伸出去。後來借來當「說出來、提出來」的意思。' }, char: '申', zhuyin: 'ㄕㄣ', radical: '田', strokes: 5, words: ['申請', '申訴'], say: '申，申請的申', cloze: '＿請', img: 'fill-form.png', options: ['申', '由', '甲', '田'], clue: '這個字中間的一豎，上下都出頭。', explain: '答案是「申」，一豎上下都出頭；「由」只有上面出頭，「甲」只有下面出頭。', parts: ['申'], story: '「申」像閃電上下伸出去。把自己的需要說出來、寫下來交給別人，就是「申請」。', sentence: '哥哥填好表格，申請參加夏令營。' },
      { id: 'h-局', combo: { type: '會意字', pict: '上面的「尸」像一個人彎著身子，下面是「句」的樣子，像在一個小範圍裡做事。後來指辦事的地方，例如「郵局」。' }, char: '局', zhuyin: 'ㄐㄩˊ', radical: '尸', strokes: 7, words: ['智慧財產局', '郵局'], say: '局，郵局的局', cloze: '郵＿', img: 'post-office.png', options: ['局', '居', '屆', '句'], clue: '這個字的上面是「尸」，裡面像「句」。', explain: '答案是「局」；「居」的裡面是「古」，「屆」的裡面是「由」。', parts: ['尸', '句'], story: '上面的「尸」像一個屋頂，下面像在裡面辦事。寄信、領包裹的地方，就是「郵局」。', sentence: '媽媽到郵局寄包裹給阿姨。' },
      { id: 'h-松', combo: { layout: 'lr', parts: [['木', 'm', '樹'], ['公', 's', '']] }, char: '松', zhuyin: 'ㄙㄨㄥ', radical: '木', strokes: 8, words: ['松樹', '松鼠'], say: '松，松鼠的松', cloze: '＿鼠', img: 'squirrel.png', options: ['松', '公', '鬆', '訟'], clue: '這個字的左邊是木字旁，右邊是「公」。', explain: '答案是「松」；「鬆」的上面多了「髟」，「訟」的左邊是言字旁。', parts: ['木', '公'], story: '左邊是樹，右邊的「公」念起來像「松」。一年四季都綠綠的、葉子像針的樹，就是「松樹」；住在樹上的小動物叫「松鼠」。', sentence: '一隻松鼠抱著果子跳上樹枝。', build: { layout: 'lr', show: ['？', '公'], answer: '木', options: ['木', '言', '扌', '火'], clue: '想一想：這是一種植物，左邊放哪一個？' } },
      { id: 'h-註', combo: { layout: 'lr', parts: [['言', 'm', '說話'], ['主', 's', '']] }, char: '註', zhuyin: 'ㄓㄨˋ', radical: '言', strokes: 12, words: ['註冊', '註明'], say: '註，註明的註', cloze: '＿明', img: 'name-label.png', options: ['註', '住', '注', '柱'], clue: '這個字的左邊是言字旁。', explain: '答案是「註」，左邊是言字旁；「住」的左邊是單人旁，「注」的左邊是三點水。', parts: ['言', '主'], story: '左邊的「言」和說話、寫字有關，右邊的「主」念起來像「註」。把要說的話寫清楚，就是「註明」。', sentence: '請在作業本上註明班級和座號。', build: { layout: 'lr', show: ['？', '主'], answer: '言', options: ['言', '亻', '氵', '木'], clue: '想一想：把話寫下來，左邊放哪一個？' } },
      { id: 'h-冊', combo: { type: '象形字', pict: '「冊」像一片片竹片，用繩子串在一起。以前的書寫在竹片上，所以「冊」就是書本。' }, char: '冊', zhuyin: 'ㄘㄜˋ', radical: '冂', strokes: 5, words: ['註冊', '手冊'], say: '冊，手冊的冊', cloze: '手＿', img: 'handbook.png', options: ['冊', '再', '用', '冉'], clue: '這個字像竹片用繩子串起來。', explain: '答案是「冊」；「再」的上面多一橫，「用」的裡面不一樣。', parts: ['冊'], story: '「冊」像一片片竹片用繩子綁起來，就是古時候的書。現在一本一本的小書，也叫「手冊」。', sentence: '新生都拿到一本學校手冊。' },
      { id: 'h-企', combo: { layout: 'tb', parts: [['人', 'm', '人'], ['止', 's', '腳']] }, char: '企', zhuyin: 'ㄑㄧˇ', radical: '人', strokes: 6, words: ['企業', '企鵝'], say: '企，企鵝的企', cloze: '＿鵝', img: 'penguin.png', options: ['企', '正', '全', '介'], clue: '這個字的上面是「人」，下面是「止」。', explain: '答案是「企」；「全」的下面是「王」，「介」的下面是兩豎。', parts: ['人', '止'], story: '上面是「人」，下面的「止」是腳。一個人踮起腳尖，往遠方看，好像在盼望什麼，就是「企」。站得直直的「企鵝」，也用這個字。', sentence: '動物園的企鵝搖搖擺擺的走路。', build: { layout: 'tb', show: ['？', '止'], answer: '人', options: ['人', '山', '口', '土'], clue: '想一想：踮起腳尖站著的是誰？' } },
      { id: 'h-毅', combo: { type: '形聲字', pict: '左邊念起來像「毅」，右邊的「殳」像手拿著工具。手拿工具、一直做下去不放棄，就是「毅」。' }, char: '毅', zhuyin: 'ㄧˋ', radical: '殳', strokes: 15, words: ['堅毅不拔', '毅力'], say: '毅，毅力的毅', cloze: '＿力', img: 'climb-rope.png', options: ['毅', '殺', '設', '穀'], clue: '這個字的右邊是「殳」，左邊上面是「立」。', explain: '答案是「毅」，左邊上面是「立」；「殺」的左邊是「杀」，「設」的左邊是言字旁。', parts: ['豙', '殳'], story: '右邊的「殳」像手拿著工具在做事。一直做、不放棄，要有很強的「毅力」。', sentence: '他靠著毅力，每天跑步一年都沒停過。' },
      { id: 'h-歷', combo: { layout: 'tb', parts: [['厤', 's', ''], ['止', 'm', '腳']] }, char: '歷', zhuyin: 'ㄌㄧˋ', radical: '止', strokes: 16, words: ['歷經', '歷史'], say: '歷，歷史的歷', cloze: '＿史', img: 'history-museum.png', options: ['歷', '曆', '瀝', '壢'], clue: '這個字的下面是「止」。', explain: '答案是「歷」，下面是「止」；「曆」的下面是「日」，是日曆的曆。', parts: ['厤', '止'], story: '上面念起來像「歷」，下面的「止」是腳。用腳一步一步走過，就是「經歷」；以前發生過的事，叫「歷史」。', sentence: '這座古城有好幾百年的歷史。', build: { layout: 'tb', show: ['厤', '？'], answer: '止', options: ['止', '日', '木', '心'], clue: '想一想：走過、經過，要用到腳，下面放哪一個？' } },
      { id: 'h-英', combo: { layout: 'tb', parts: [['艹', 'm', '草'], ['央', 's', '']] }, char: '英', zhuyin: 'ㄧㄥ', radical: '艸', strokes: 9, words: ['英文', '英雄'], say: '英，英雄的英', cloze: '＿雄', img: 'hero-firefighter.png', options: ['英', '央', '映', '殃'], clue: '這個字的上面是草字頭。', explain: '答案是「英」，上面是草字頭；「映」的左邊是日字旁，「殃」的左邊是歹字旁。', parts: ['艹', '央'], story: '上面的草字頭是植物，下面的「央」念起來像「英」。「英」本來是最美的花，後來指最優秀的人，例如「英雄」。', sentence: '救人的消防員是大家心中的英雄。', build: { layout: 'tb', show: ['？', '央'], answer: '艹', options: ['艹', '日', '歹', '竹'], clue: '想一想：這個字本來是說美麗的花朵，上面放哪一個？' } },
      { id: 'h-銷', combo: { layout: 'lr', parts: [['金', 'm', '金屬'], ['肖', 's', '']] }, char: '銷', zhuyin: 'ㄒㄧㄠ', radical: '金', strokes: 15, words: ['銷售', '暢銷'], say: '銷，暢銷的銷', cloze: '暢＿', img: 'best-seller.png', options: ['銷', '消', '削', '宵'], clue: '這個字的左邊是金字旁。', explain: '答案是「銷」，左邊是金字旁；「消」的左邊是三點水，「削」的右邊是立刀旁。', parts: ['金', '肖'], story: '左邊的「金」是金屬，以前把金屬熔掉叫「銷」；右邊的「肖」念起來像「銷」。東西一下子就賣光，好像熔掉不見了，就是「暢銷」。', sentence: '這本故事書很暢銷，書店都賣光了。', build: { layout: 'lr', show: ['？', '肖'], answer: '金', options: ['金', '氵', '刂', '宀'], clue: '想一想：「消」的左邊是水，和熔化的礦物有關的是哪一個？' } },
      { id: 'h-售', combo: { layout: 'tb', parts: [['隹', 's', ''], ['口', 'm', '嘴巴']] }, char: '售', zhuyin: 'ㄕㄡˋ', radical: '口', strokes: 11, words: ['銷售', '售票'], say: '售，售票的售', cloze: '＿票', img: 'ticket-booth.png', options: ['售', '集', '隹', '焦'], clue: '這個字的下面是「口」。', explain: '答案是「售」，下面是「口」；「集」的下面是「木」，「焦」的下面是四點火。', parts: ['隹', '口'], story: '上面的「隹」念起來有點像「售」，下面是嘴巴。大聲叫賣，把東西賣出去，就是「售」。', sentence: '電影院的售票口排了好長的隊伍。', build: { layout: 'tb', show: ['隹', '？'], answer: '口', options: ['口', '木', '灬', '心'], clue: '想一想：大聲叫賣，要用身體的哪個部分？' } },
      { id: 'h-勝', combo: { type: '形聲字', pict: '左邊是「月」，右邊下面是「力」，上面念起來像「勝」。用盡力氣、比別人更強，就是「勝」。' }, char: '勝', zhuyin: 'ㄕㄥˋ', radical: '力', strokes: 12, words: ['勝出', '勝利'], say: '勝，勝利的勝', cloze: '＿利', img: 'winner-race.png', options: ['勝', '騰', '謄', '藤'], clue: '這個字的右邊下面是「力」。', explain: '答案是「勝」，右邊下面是「力」；「騰」的下面是「馬」，「藤」的上面是草字頭。', parts: ['月', '劵'], story: '右邊下面有「力」。用盡力氣比賽，最後贏了，就是「勝利」。', sentence: '我們班在拔河比賽中得到勝利。' },
      { id: 'h-霸', combo: { type: '形聲字', pict: '上面是雨字頭，下面是「革」和「月」。「霸」本來是月亮剛出來的樣子，後來借來指力量最強、能管住別人的人。' }, char: '霸', zhuyin: 'ㄅㄚˋ', radical: '雨', strokes: 21, words: ['霸主', '霸道'], say: '霸，霸道的霸', cloze: '＿道', img: 'bully-swing.png', options: ['霸', '壩', '露', '霧'], clue: '這個字的上面是雨字頭，下面有「革」和「月」。', explain: '答案是「霸」；「壩」的左邊多了土字旁，「露」的下面是「路」。', parts: ['雨', '革', '月'], story: '上面是雨字頭，下面有「革」和「月」。仗著自己力氣大、不講道理，就是「霸道」。', sentence: '他很霸道，總是搶別人的盪鞦韆。' },
      { id: 'h-項', combo: { layout: 'lr', parts: [['工', 's', ''], ['頁', 'm', '頭']] }, char: '項', zhuyin: 'ㄒㄧㄤˋ', radical: '頁', strokes: 12, words: ['項目', '項鍊'], say: '項，項鍊的項', cloze: '＿鍊', img: 'necklace.png', options: ['項', '頂', '須', '順'], clue: '這個字的左邊是「工」。', explain: '答案是「項」，左邊是「工」；「頂」的左邊是「丁」，「須」的左邊是三撇。', parts: ['工', '頁'], story: '左邊的「工」念起來有點像「項」，右邊的「頁」和頭有關。頭下面的脖子叫「項」，戴在脖子上的，就是「項鍊」。', sentence: '媽媽戴著一條珍珠項鍊。', build: { layout: 'lr', show: ['工', '？'], answer: '頁', options: ['頁', '力', '口', '隹'], clue: '想一想：脖子和頭有關，右邊放哪一個？' } }
    ],
    vocab: [
      { id: 'v-商譽', cloze: true, clozeOptions: ['商譽', '垃圾', '雨傘', '玩具'], word: '商譽', meaning: '一家店讓人信任的好名聲。', example: '這家老店幾十年來都誠實做生意，＿＿很好。', img: 'old-shop.png', options: ['商譽', '霸主', '項目', '企業'] },
      { id: 'v-服務', cloze: true, clozeOptions: ['服務', '吵架', '偷懶', '打瞌睡'], word: '服務', meaning: '幫別人做事、替人解決需要。', example: '這家餐廳的店員＿＿很親切。', img: 'waiter-serve.png', options: ['服務', '銷售', '申請', '註冊'] },
      { id: 'v-關聯', cloze: true, clozeOptions: ['關聯', '距離', '顏色', '聲音'], word: '關聯', meaning: '兩件事彼此有牽連、互相影響。', example: '多運動和身體健康有很大的＿＿。', img: 'puzzle-link.png', options: ['關聯', '項目', '商譽', '英文'] },
      { id: 'v-核准', cloze: true, clozeOptions: ['核准', '撕破', '丟掉', '忘記'], word: '核准', meaning: '仔細審查以後，同意了。', example: '學校＿＿了我們的社團成立申請。', img: 'stamp-ok.png', options: ['核准', '銷售', '勝出', '歷經'] },
      { id: 'v-申請', cloze: true, clozeOptions: ['申請', '拒絕', '丟棄', '偷拿'], word: '申請', meaning: '向有關單位提出要求，等對方同意。', example: '姐姐上網＿＿了一張借書證。', img: 'fill-form.png', options: ['申請', '核准', '服務', '銷售'] },
      { id: 'v-智慧財產局', cloze: true, clozeOptions: ['智慧財產局', '動物園', '游泳池', '菜市場'], word: '智慧財產局', meaning: '管理發明、商標、著作權利的政府機關。', example: '發明家把新發明送到＿＿＿＿＿，申請專利。', img: 'gov-office.png', options: ['智慧財產局', '企業', '霸主', '項目'] },
      { id: 'v-松樹', cloze: true, clozeOptions: ['松樹', '仙人掌', '玫瑰', '荷花'], word: '松樹', meaning: '一年四季都綠綠的、葉子像針的高大植物。', example: '冬天下雪了，山上的＿＿還是綠綠的。', img: 'pine-snow.png', options: ['松樹', '英文', '商譽', '項目'] },
      { id: 'v-註冊', cloze: true, clozeOptions: ['註冊', '吵鬧', '畫畫', '跳舞'], word: '註冊', meaning: '向有關機關登記，讓名字或東西受到保護。', example: '開學第一天，新生要先＿＿。', img: 'name-label.png', options: ['註冊', '申請', '服務', '勝出'] },
      { id: 'v-企業', cloze: true, clozeOptions: ['企業', '花朵', '小鳥', '月亮'], word: '企業', meaning: '做生意、生產東西的公司。', example: '這家＿＿請了一千多位員工。', img: 'office-building.png', options: ['企業', '霸主', '商譽', '松樹'] },
      { id: 'v-堅毅不拔', cloze: true, clozeOptions: ['堅毅不拔', '三心二意', '半途而廢', '垂頭喪氣'], word: '堅毅不拔', meaning: '意志很強，再大的困難也能撐住。', example: '登山隊員＿＿＿＿，終於爬上了最高峰。', img: 'climb-rope.png', options: ['堅毅不拔', '智慧財產局', '銷售', '歷經'] },
      { id: 'v-歷經', cloze: true, clozeOptions: ['歷經', '忘掉', '跳過', '躲開'], word: '歷經', meaning: '一次又一次的碰過、走過。', example: '這座老橋＿＿好幾次大地震，還是好好的。', img: 'old-bridge.png', options: ['歷經', '核准', '申請', '勝出'] },
      { id: 'v-英文', cloze: true, clozeOptions: ['英文', '數學', '體育', '美勞'], word: '英文', meaning: '美國等很多國家使用的語言，字母從A到Z。', example: '我會用＿＿說「早安」。', img: 'abc-blocks.png', options: ['英文', '項目', '松樹', '企業'] },
      { id: 'v-銷售', cloze: true, clozeOptions: ['銷售', '丟棄', '弄壞', '藏起'], word: '銷售', meaning: '把商品賣出去。', example: '這款新玩具一上市就＿＿一空。', img: 'best-seller.png', options: ['銷售', '服務', '註冊', '核准'] },
      { id: 'v-霸主', cloze: true, clozeOptions: ['霸主', '新手', '觀眾', '路人'], word: '霸主', meaning: '在某方面最強、最有勢力的人或團體。', example: '獅子是草原上的＿＿。', img: 'lion-king.png', options: ['霸主', '企業', '商譽', '英文'] },
      { id: 'v-項目', cloze: true, clozeOptions: ['項目', '天空', '小狗', '樹葉'], word: '項目', meaning: '一件一件分好的類別。', example: '運動會有跑步、跳遠等好多＿＿。', img: 'sports-day.png', options: ['項目', '霸主', '松樹', '商譽'] },
      { id: 'v-勝出', cloze: true, clozeOptions: ['勝出', '輸掉', '放棄', '缺席'], word: '勝出', meaning: '比賽或選拔中贏了。', example: '經過三輪比賽，她在演講比賽中＿＿。', img: 'winner-race.png', options: ['勝出', '歷經', '銷售', '申請'] },
      { id: 'v-斗大', cloze: true, clozeOptions: ['斗大', '細小', '模糊', '歪斜'], word: '斗大', meaning: '形容字寫得非常醒目、尺寸很驚人。', example: '店門口掛著一個＿＿的招牌字。', img: 'big-sign.png', options: ['斗大', '銷售', '勝出', '核准'] }
    ],
    charwords: [
      { id: 'cw-譽', char: '譽', img: 'medal-honor.png', charMeaning: '好名聲。', word: '名譽', meaning: '大家對一個人的好評價。', example: '說謊會讓人失去＿＿。', options: ['名譽', '任務', '果核', '郵局'] },
      { id: 'cw-務', char: '務', img: 'waiter-serve.png', charMeaning: '要做的事。', word: '任務', meaning: '交給你、一定要完成的事。', example: '隊長分配給每個人一項＿＿。', options: ['任務', '聯絡', '松鼠', '手冊'] },
      { id: 'cw-聯', char: '聯', img: 'phone-call.png', charMeaning: '連在一起。', word: '聯絡', meaning: '打電話或傳訊息，和別人保持往來。', example: '搬家以後，我還是常和老同學＿＿。', options: ['聯絡', '註明', '企鵝', '毅力'] },
      { id: 'cw-核', char: '核', img: 'peach-pit.png', charMeaning: '水果中間硬硬的種子。', word: '果核', meaning: '水果中間包著種子的硬殼。', example: '芒果的＿＿又大又扁。', options: ['果核', '名譽', '歷史', '英雄'] },
      { id: 'cw-申', char: '申', img: 'fill-form.png', charMeaning: '說出來、提出來。', word: '申訴', meaning: '覺得不公平時，向上面的人說明。', example: '他覺得被罰得不公平，向老師＿＿。', options: ['申訴', '郵局', '暢銷', '項鍊'] },
      { id: 'cw-局', char: '局', img: 'post-office.png', charMeaning: '辦事的地方。', word: '郵局', meaning: '寄信、寄包裹的地方。', example: '我到＿＿買了一張郵票。', options: ['郵局', '任務', '勝利', '霸道'] },
      { id: 'cw-松', char: '松', img: 'squirrel.png', charMeaning: '一種葉子像針的樹。', word: '松鼠', meaning: '尾巴毛茸茸、住在樹上的小動物。', example: '＿＿抱著果子，躲進樹洞裡。', options: ['松鼠', '果核', '手冊', '售票'] },
      { id: 'cw-註', char: '註', img: 'name-label.png', charMeaning: '寫清楚。', word: '註明', meaning: '把重要的事寫清楚。', example: '包裹上要＿＿收件人的電話。', options: ['註明', '聯絡', '名譽', '毅力'] },
      { id: 'cw-冊', char: '冊', img: 'handbook.png', charMeaning: '一本一本的書。', word: '手冊', meaning: '小小一本、寫著說明的書。', example: '看完說明＿＿，我就會組裝了。', options: ['手冊', '郵局', '企鵝', '暢銷'] },
      { id: 'cw-企', char: '企', img: 'penguin.png', charMeaning: '踮起腳尖盼望。', word: '企鵝', meaning: '住在很冷的地方、不會飛、很會游泳的鳥。', example: '＿＿在冰上排成一排走路。', options: ['企鵝', '松鼠', '任務', '歷史'] },
      { id: 'cw-毅', char: '毅', img: 'climb-rope.png', charMeaning: '堅定、不放棄。', word: '毅力', meaning: '一直做下去、不放棄的力量。', example: '學會游泳要靠＿＿，每天練習。', options: ['毅力', '名譽', '項鍊', '註明'] },
      { id: 'cw-歷', char: '歷', img: 'history-museum.png', charMeaning: '經過。', word: '歷史', meaning: '以前發生過的事。', example: '博物館裡有很多古老的＿＿文物。', options: ['歷史', '霸道', '售票', '果核'] },
      { id: 'cw-英', char: '英', img: 'hero-firefighter.png', charMeaning: '最優秀的。', word: '英雄', meaning: '勇敢又了不起、讓人佩服的人。', example: '冒險救人的他，是大家眼中的＿＿。', options: ['英雄', '手冊', '申訴', '毅力'] },
      { id: 'cw-銷', char: '銷', img: 'best-seller.png', charMeaning: '賣出去。', word: '暢銷', meaning: '賣得很好、很多人買。', example: '這款背包很＿＿，一下子就賣完了。', options: ['暢銷', '企鵝', '郵局', '聯絡'] },
      { id: 'cw-售', char: '售', img: 'ticket-booth.png', charMeaning: '賣。', word: '售票', meaning: '賣門票或車票。', example: '動物園的＿＿口九點才開。', options: ['售票', '歷史', '名譽', '松鼠'] },
      { id: 'cw-勝', char: '勝', img: 'winner-race.png', charMeaning: '贏。', word: '勝利', meaning: '在比賽或戰爭中贏了。', example: '大家一起努力，終於得到＿＿。', options: ['勝利', '果核', '註明', '任務'] },
      { id: 'cw-霸', char: '霸', img: 'bully-swing.png', charMeaning: '仗著力量大欺負人。', word: '霸道', meaning: '不講道理，只想要別人聽自己的。', example: '他很＿＿，玩遊戲一定要自己當老大。', options: ['霸道', '英雄', '暢銷', '手冊'] },
      { id: 'cw-項', char: '項', img: 'necklace.png', charMeaning: '脖子；一件一件的類別。', word: '項鍊', meaning: '戴在脖子上的裝飾品。', example: '姐姐戴上一條銀色＿＿。', options: ['項鍊', '售票', '申訴', '企鵝'] }
    ],
    /* 生字變成語：課本延伸成語，解釋和例句改成孩子聽得懂的話 */
    idioms: [
      { id: 'i-沽名釣譽', situationImg: 'id-show-off.png',
        anim: { bg: 'park', a: { man: ['🧑', 40, 62, 12], trash: ['🗑️', 62, 66, 10], cam: ['📸', 82, 40, 10, 'h'], star: ['🌟', 40, 30, 9, 'h'], bye: ['💨', 86, 40, 9, 'h'], sad: ['🤔', 40, 30, 9, 'h'] },
          s: [['有人拿著相機來拍照，', [['in', 'cam'], ['wig', 'cam']]],
            ['他馬上彎腰撿垃圾，還對鏡頭笑。', [['mv', 'man', [56, 62, 700]], ['in', 'star']]],
            ['拍照的人一走，他就不撿了。', [['out', 'cam'], ['in', 'bye'], ['out', 'star'], ['mv', 'man', [30, 62, 700]]]],
            ['他只是想要好名聲，不是真心做好事。', [['out', 'bye'], ['in', 'sad']]]] },
        idiom: '沽名釣譽', char: '譽', meaning: '故意做樣子給人看，只為了得到好名聲和稱讚。', example: '他只在老師面前才幫忙，真是沽名釣譽。', situation: '有人只在有人拍照時才撿垃圾，拍照的人走了就不撿了。',
        fill: { options: ['他捐錢只是為了上新聞，有點＿＿＿＿。', '她默默捐錢，從不讓人知道，真是＿＿＿＿。'], clue: '提示：哪一句是做樣子只為了好名聲？', explain: '第一句用得對：為了上新聞才捐錢，是做樣子。默默捐錢不讓人知道，不是沽名釣譽。' } },
      { id: 'i-當務之急', situationImg: 'id-turn-off-tap.png',
        anim: { bg: 'room', a: { tap: ['🚰', 20, 34, 12], w1: ['💧', 22, 50, 7, 'h'], w2: ['💦', 40, 72, 10, 'h'], kid: ['🧒', 70, 62, 12], toy: ['🧸', 50, 74, 9], bang: ['❗', 70, 36, 9, 'h'], ok: ['✅', 20, 16, 9, 'h'] },
          s: [['水龍頭沒關，水一直流，', [['in', 'w1'], ['bob', 'w1'], ['in', 'w2']]],
            ['地上淹水了，玩具也泡在水裡。', [['shake', 'toy']]],
            ['弟弟想：現在最急的是什麼？', [['in', 'bang'], ['shake', 'bang']]],
            ['先關掉水龍頭，再撿玩具！', [['mv', 'kid', [28, 50, 800]], ['out', 'w1'], ['out', 'w2'], ['in', 'ok']]]] },
        idiom: '當務之急', char: '務', meaning: '現在最急、最要先做的事。', example: '颱風快來了，當務之急是把窗戶關好。', situation: '水龍頭沒關，地上淹水了，弟弟先去關水龍頭。',
        fill: { options: ['同學受傷了，＿＿＿＿是先送他去健康中心。', '考試前一天，他的＿＿＿＿是先把漫畫看完。'], clue: '提示：哪一句說的事真的是最急、最該先做的？', explain: '第一句用得對：受傷要馬上處理。考試前一天看漫畫，不是最該先做的事。' } },
      { id: 'i-三令五申', situationImg: 'id-no-running.png',
        anim: { bg: 'school', a: { tch: ['🧑‍🏫', 20, 60, 13], kid: ['🏃', 70, 62, 12], w1: ['⚠️', 36, 30, 8, 'h'], w2: ['⚠️', 50, 24, 8, 'h'], w3: ['⚠️', 64, 30, 8, 'h'], stop: ['🛑', 70, 36, 9, 'h'] },
          s: [['老師說：「走廊不可以奔跑！」', [['in', 'w1'], ['shake', 'w1']]],
            ['第二天又說了一次，', [['in', 'w2'], ['shake', 'w2']]],
            ['第三天再說一次，說了好多遍。', [['in', 'w3'], ['shake', 'w3']]],
            ['一再提醒，就是怕大家受傷。', [['in', 'stop'], ['pop', 'stop']]]] },
        idiom: '三令五申', char: '申', meaning: '一次又一次的命令、提醒。', example: '媽媽三令五申，出門一定要戴安全帽。', situation: '老師一次又一次提醒大家，走廊不可以奔跑。',
        fill: { options: ['老師＿＿＿＿，上課不能玩手機。', '老師只說了一次，算是＿＿＿＿。'], clue: '提示：哪一句是一再提醒、說了好多次？', explain: '第一句用得對：老師一再提醒。只說了一次，就不是三令五申。' } },
      { id: 'i-歷歷在目', situationImg: 'id-photo-memory.png',
        anim: { bg: 'room', a: { kid: ['🧒', 30, 62, 12], pic: ['🖼️', 50, 56, 11], think: ['💭', 60, 30, 16, 'h'], beach: ['🏖️', 60, 30, 9, 'h'], fish: ['🐠', 70, 26, 6, 'h'], smile: ['😊', 30, 62, 12, 'h', 'as:kid'] },
          s: [['妹妹拿出去年旅行的照片。', [['wig', 'pic']]],
            ['看著看著，當時的畫面浮出來了，', [['in', 'think'], ['in', 'beach']]],
            ['沙灘、海浪、游來游去的魚，', [['in', 'fish'], ['bob', 'fish']]],
            ['一切都清清楚楚，好像就在眼前。', [['out', 'kid'], ['in', 'smile']]]] },
        idiom: '歷歷在目', char: '歷', meaning: '以前的事清清楚楚的，好像就在眼前。', example: '第一次上臺表演的情景，到現在還歷歷在目。', situation: '妹妹看著去年旅行的照片，海邊的畫面清清楚楚的出現在腦中。',
        fill: { options: ['畢業旅行的趣事，到現在還＿＿＿＿。', '那件事我早就忘得一乾二淨，真是＿＿＿＿。'], clue: '提示：哪一句是記得清清楚楚？', explain: '第一句用得對：到現在還記得很清楚。忘得一乾二淨，剛好相反。' } },
      { id: 'i-出奇制勝', situationImg: 'id-smart-race.png',
        anim: { bg: 'park', a: { rab: ['🐇', 20, 56, 11], tur: ['🐢', 20, 72, 11], board: ['🛹', 20, 80, 10, 'h'], flag: ['🏁', 88, 64, 11], idea: ['💡', 20, 50, 9, 'h'], cup: ['🏆', 80, 30, 11, 'h'] },
          s: [['兔子和烏龜要比賽跑步。', [['bob', 'rab'], ['bob', 'tur']]],
            ['烏龜想了一個別人想不到的辦法，', [['in', 'idea'], ['pop', 'idea']]],
            ['牠踩上滑板，咻的一聲滑出去！', [['out', 'idea'], ['in', 'board'], ['mv', 'tur', [82, 72, 900]], ['mv', 'board', [82, 80, 900]], ['mv', 'rab', [50, 56, 900]]]],
            ['用新奇的方法，贏得比賽。', [['in', 'cup'], ['pop', 'cup']]]] },
        idiom: '出奇制勝', char: '勝', meaning: '用別人想不到的新方法，得到勝利。', example: '我們隊用了一招新戰術，出奇制勝。', situation: '烏龜想出用滑板的新辦法，贏了兔子。',
        fill: { options: ['他用了一個大家都沒想到的方法，＿＿＿＿。', '他照著大家都會的老方法做，結果＿＿＿＿。'], clue: '提示：哪一句是用新奇的方法贏了？', explain: '第一句用得對：用沒人想到的方法贏了。照著老方法做，不是出奇制勝。' } },
      { id: 'i-橫行霸道', situationImg: 'id-crab-bully.png',
        anim: { bg: 'sea', a: { crab: ['🦀', 14, 70, 12], f1: ['🐟', 44, 62, 9], s1: ['🐚', 60, 76, 8], f2: ['🐠', 76, 60, 9], ang: ['💢', 14, 56, 8, 'h'], fly: ['💨', 60, 50, 9, 'h'] },
          s: [['一隻大螃蟹在海底橫著走。', [['in', 'ang'], ['mv', 'crab', [30, 70, 700]], ['mv', 'ang', [30, 56, 700]]]],
            ['牠擋住小魚的路，還把貝殼推開，', [['mv', 'crab', [56, 70, 700]], ['mv', 'ang', [56, 56, 700]], ['shake', 'f1'], ['mv', 's1', [70, 84, 500]]]],
            ['大家都被嚇跑了。', [['in', 'fly'], ['mv', 'f1', [10, 40, 700]], ['mv', 'f2', [96, 40, 700]]]],
            ['仗著力氣大不講理，就是橫行霸道。', [['shake', 'crab']]]] },
        idiom: '橫行霸道', char: '霸', meaning: '仗著自己力氣大，做事很兇、不講道理。', example: '他在班上橫行霸道，大家都不喜歡他。', situation: '大螃蟹在海底橫著走，擋路、推東西，把小魚都嚇跑了。',
        fill: { options: ['那個人插隊又罵人，＿＿＿＿，真不應該。', '他對每個人都很有禮貌，非常＿＿＿＿。'], clue: '提示：哪一句是很兇、不講道理？', explain: '第一句用得對：插隊又罵人，很不講理。很有禮貌，剛好相反。' } }
    ],
    /* 改錯字：sentence 是正確的句子，畫面上會把 char 換成 wrong；options 的第一個是正確的字。clue 只說語詞的意思，不能出現正確的字。 */
    fix: [
      { id: 'fx-譽', char: '譽', wrong: '舉', sentence: '說謊會傷害自己的名譽。', options: ['譽', '舉', '與'], clue: '這裡說的是一個人的好名聲，想一想，哪一個字的下面是「言」？', explain: '要改成「譽」。好名聲是「名譽」；「舉」是舉手的舉。' },
      { id: 'fx-務', char: '務', wrong: '霧', sentence: '店員熱心的為客人服務。', options: ['務', '霧', '柔'], clue: '這裡是說幫別人做事，想一想，哪一個字的下面是「力」？', explain: '要改成「務」。幫別人做事是「服務」；「霧」是起霧的霧。' },
      { id: 'fx-聯', char: '聯', wrong: '連', sentence: '畢業後，我們還是常常聯絡。', options: ['聯', '連', '關'], clue: '這裡是說和別人保持往來，想一想，哪一個字的左邊是「耳」？', explain: '要改成「聯」。保持往來是「聯絡」。' },
      { id: 'fx-核', char: '核', wrong: '該', sentence: '吃荔枝要小心，不要吞下果核。', options: ['核', '該', '孩'], clue: '這裡說的是水果中間的硬殼，想一想，哪一個字有木字旁？', explain: '要改成「核」。水果中間的硬殼是「果核」；「該」是應該的該。' },
      { id: 'fx-申', char: '申', wrong: '由', sentence: '爸爸上網申請了新的護照。', options: ['申', '由', '甲'], clue: '這裡是說提出要求，想一想，哪一個字中間的一豎上下都出頭？', explain: '要改成「申」。提出要求是「申請」；「由」是理由的由。' },
      { id: 'fx-局', char: '局', wrong: '居', sentence: '轉角那間郵局九點開門。', options: ['局', '居', '屆'], clue: '這裡說的是寄信的地方，想一想，哪一個字的裡面像「句」？', explain: '要改成「局」。寄信的地方是「郵局」；「居」是居住的居。' },
      { id: 'fx-松', char: '松', wrong: '鬆', sentence: '公園裡有一隻小松鼠在找果子。', options: ['松', '鬆', '公'], clue: '這裡說的是住在樹上、尾巴毛茸茸的小動物，想一想，哪一個字有木字旁？', explain: '要改成「松」。那種小動物是「松鼠」；「鬆」是輕鬆的鬆。' },
      { id: 'fx-註', char: '註', wrong: '注', sentence: '請在信封上註明寄件人的地址。', options: ['註', '注', '住'], clue: '這裡是說把事情寫清楚，想一想，哪一個字有言字旁？', explain: '要改成「註」。寫清楚是「註明」；「注」是注意的注。' },
      { id: 'fx-冊', char: '冊', wrong: '再', sentence: '這本旅遊手冊介紹了很多景點。', options: ['冊', '再', '用'], clue: '這裡說的是小小一本的說明書，想一想，哪一個字像竹片串起來？', explain: '要改成「冊」。小本的說明書是「手冊」；「再」是再見的再。' },
      { id: 'fx-企', char: '企', wrong: '正', sentence: '南極的企鵝不怕冷。', options: ['企', '正', '全'], clue: '這裡說的是住在南極、不會飛的鳥，想一想，哪一個字的上面是「人」？', explain: '要改成「企」。那種鳥是「企鵝」；「正」是正確的正。' },
      { id: 'fx-毅', char: '毅', wrong: '設', sentence: '他很有毅力，每天都練習寫書法。', options: ['毅', '設', '殺'], clue: '這裡是說一直做下去不放棄的力量，想一想，哪一個字左邊上面是「立」？', explain: '要改成「毅」。不放棄的力量是「毅力」；「設」是設計的設。' },
      { id: 'fx-歷', char: '歷', wrong: '曆', sentence: '這間廟已經有兩百年的歷史了。', options: ['歷', '曆', '瀝'], clue: '這裡說的是以前發生過的事，想一想，哪一個字的下面是「止」？', explain: '要改成「歷」。以前發生過的事是「歷史」；「曆」是日曆的曆。' },
      { id: 'fx-英', char: '英', wrong: '央', sentence: '救人的警察是城市裡的英雄。', options: ['英', '央', '映'], clue: '這裡說的是勇敢又了不起的人，想一想，哪一個字有草字頭？', explain: '要改成「英」。了不起的人是「英雄」；「央」是中央的央。' },
      { id: 'fx-銷', char: '銷', wrong: '消', sentence: '這款新文具非常暢銷。', options: ['銷', '消', '削'], clue: '這裡是說賣得很好，想一想，哪一個字有金字旁？', explain: '要改成「銷」。賣得很好是「暢銷」；「消」是消失的消。' },
      { id: 'fx-售', char: '售', wrong: '集', sentence: '火車站的售票機壞掉了。', options: ['售', '集', '焦'], clue: '這裡是說賣車票的機器，想一想，哪一個字的下面是「口」？', explain: '要改成「售」。賣車票是「售票」；「集」是集合的集。' },
      { id: 'fx-勝', char: '勝', wrong: '騰', sentence: '我們隊在最後一分鐘得到勝利。', options: ['勝', '騰', '藤'], clue: '這裡是說比賽贏了，想一想，哪一個字的右邊下面是「力」？', explain: '要改成「勝」。比賽贏了是「勝利」；「騰」的下面是馬。' },
      { id: 'fx-霸', char: '霸', wrong: '壩', sentence: '他太霸道了，大家都不想跟他玩。', options: ['霸', '壩', '露'], clue: '這裡是說不講道理、要別人聽他的，想一想，哪一個字沒有土字旁？', explain: '要改成「霸」。不講道理是「霸道」；「壩」是水壩的壩。' },
      { id: 'fx-項', char: '項', wrong: '頂', sentence: '奶奶送我一條漂亮的項鍊。', options: ['項', '頂', '須'], clue: '這裡說的是戴在脖子上的裝飾，想一想，哪一個字的左邊是「工」？', explain: '要改成「項」。戴在脖子上的是「項鍊」；「頂」是屋頂的頂。' }
    ],
    similar: [
      { id: 's1', meaning: '「＿手」是把手抬高。', sentence: '知道答案的人請＿手。', frame: '＿手', options: ['舉', '譽'], answer: '舉', clue: '提示：這個字的下面是「手」。', explain: '答案是「舉」；「譽」是名譽的譽，下面是「言」。' },
      { id: 's2', meaning: '「起＿」是空氣裡出現白白的小水滴，看不清楚遠方。', sentence: '早上起＿了，遠方的山都看不見。', frame: '起＿', options: ['霧', '務'], answer: '霧', clue: '提示：和天氣有關，上面是雨字頭。', explain: '答案是「霧」；「務」是服務的務。' },
      { id: 's3', meaning: '「＿續」是一個接著一個，沒有停。', sentence: '雨＿續下了三天。', frame: '＿續', options: ['連', '聯'], answer: '連', clue: '提示：這個字有辵字旁，裡面是「車」。', explain: '答案是「連」；「聯」是聯絡的聯，左邊是「耳」。' },
      { id: 's4', meaning: '「應＿」是本來就要這樣做。', sentence: '做錯事應＿要道歉。', frame: '應＿', options: ['該', '核'], answer: '該', clue: '提示：這個字的左邊是言字旁。', explain: '答案是「該」；「核」是果核的核，有木字旁。' },
      { id: 's5', meaning: '「理＿」是為什麼要這樣做的原因。', sentence: '他遲到的理＿是公車誤點。', frame: '理＿', options: ['由', '申'], answer: '由', clue: '提示：這個字中間的一豎只有上面出頭。', explain: '答案是「由」；「申」的一豎上下都出頭。' },
      { id: 's6', meaning: '「＿住」是住在某個地方。', sentence: '外公＿住在海邊的小鎮。', frame: '＿住', options: ['居', '局'], answer: '居', clue: '提示：這個字的裡面是「古」。', explain: '答案是「居」；「局」是郵局的局。' },
      { id: 's7', meaning: '「輕＿」是很舒服、不緊張。', sentence: '考完試，大家都覺得很輕＿。', frame: '輕＿', options: ['鬆', '松'], answer: '鬆', clue: '提示：這個字的上面和頭髮有關。', explain: '答案是「鬆」；「松」是松樹的松。' },
      { id: 's8', meaning: '「＿意」是專心的看、小心。', sentence: '過馬路要＿意來車。', frame: '＿意', options: ['注', '註'], answer: '注', clue: '提示：這個字的左邊是三點水。', explain: '答案是「注」；「註」是註明的註，有言字旁。' },
      { id: 's9', meaning: '「＿見」是分開時說的話。', sentence: '放學了，我跟老師說＿見。', frame: '＿見', options: ['再', '冊'], answer: '再', clue: '提示：這個字的上面多一橫。', explain: '答案是「再」；「冊」是手冊的冊。' },
      { id: 's10', meaning: '「日＿」是一張一張寫著日期的紙。', sentence: '我在日＿上圈出生日那一天。', frame: '日＿', options: ['曆', '歷'], answer: '曆', clue: '提示：和日子有關，下面是「日」。', explain: '答案是「曆」；「歷」是歷史的歷，下面是「止」。' },
      { id: 's11', meaning: '「＿失」是不見了。', sentence: '太陽出來，雪人慢慢＿失了。', frame: '＿失', options: ['消', '銷'], answer: '消', clue: '提示：和水有關，左邊是三點水。', explain: '答案是「消」；「銷」是銷售的銷，有金字旁。' },
      { id: 's12', meaning: '「屋＿」是房子最上面的地方。', sentence: '小貓爬到屋＿上曬太陽。', frame: '屋＿', options: ['頂', '項'], answer: '頂', clue: '提示：這個字的左邊是「丁」。', explain: '答案是「頂」；「項」是項鍊的項，左邊是「工」。' }
    ],
    listen: [
      { id: 'l1', text: '店員親切的幫客人拿東西、介紹商品。', answer: 0, options: [{ text: '服務', img: 'waiter-serve.png' }, { text: '銷售', img: 'best-seller.png' }, { text: '註冊', img: 'name-label.png' }, { text: '霸主', img: 'lion-king.png' }] },
      { id: 'l2', text: '向學校提出要求，等學校同意。', answer: 0, options: [{ text: '申請', img: 'fill-form.png' }, { text: '核准', img: 'stamp-ok.png' }, { text: '勝出', img: 'winner-race.png' }, { text: '歷經', img: 'old-bridge.png' }] },
      { id: 'l3', text: '仔細看過以後，蓋章同意了。', answer: 0, options: [{ text: '核准', img: 'stamp-ok.png' }, { text: '申請', img: 'fill-form.png' }, { text: '服務', img: 'waiter-serve.png' }, { text: '銷售', img: 'best-seller.png' }] },
      { id: 'l4', text: '獅子是草原上最強的動物。', answer: 0, options: [{ text: '霸主', img: 'lion-king.png' }, { text: '企業', img: 'office-building.png' }, { text: '商譽', img: 'old-shop.png' }, { text: '項目', img: 'sports-day.png' }] },
      { id: 'l5', text: '把店裡的商品賣出去。', answer: 0, options: [{ text: '銷售', img: 'best-seller.png' }, { text: '服務', img: 'waiter-serve.png' }, { text: '註冊', img: 'name-label.png' }, { text: '核准', img: 'stamp-ok.png' }] },
      { id: 'l6', text: '登山隊遇到大風雪，還是不放棄，一步一步往上爬。', answer: 0, options: [{ text: '堅毅不拔', img: 'climb-rope.png' }, { text: '歷經', img: 'old-bridge.png' }, { text: '斗大', img: 'big-sign.png' }, { text: '勝出', img: 'winner-race.png' }] },
      { id: 'l7', text: '這座老橋遇過好幾次大地震。', answer: 0, options: [{ text: '歷經', img: 'old-bridge.png' }, { text: '核准', img: 'stamp-ok.png' }, { text: '申請', img: 'fill-form.png' }, { text: '銷售', img: 'best-seller.png' }] },
      { id: 'l8', text: '比賽到最後，她贏得了第一名。', answer: 0, options: [{ text: '勝出', img: 'winner-race.png' }, { text: '歷經', img: 'old-bridge.png' }, { text: '服務', img: 'waiter-serve.png' }, { text: '註冊', img: 'name-label.png' }] }
    ],
    /* ---------- 短語、句型、修辭（句子都是 Claude 自己寫的） ---------- */
    phrase: {
      /* 拼短語每一格下面寫要放什麼樣的詞 */
      fillLabels: { before: '像什麼般', answer: '怎麼樣', noun: '什麼東西' },
      pickName: '看圖選一選', pickSay: '看圖，選出最適合的詞，說說看像什麼、是什麼樣的東西。',
      /* 短語：像＋名詞＋般＋形容詞＋的＋名詞（課本的例子是課文原句，這裡換成自己寫的） */
      intro: { example: '像小貓般溫柔的妹妹', img: 'pr-gentle-sister.png',
        parts: [{ text: '像小貓般', role: '像什麼般' }, { text: '溫柔', role: '怎麼樣' }, { text: '的' }, { text: '妹妹', role: '什麼東西' }],
        explain: '先用「像……般」找一樣東西來比，再說出它的樣子，加上「的」，最後說是什麼。' },
      pick: [
        { id: 'ph1', img: 'pr-soft-cloud.png', before: '像棉花般', noun: '雲朵', ask: '像棉花般什麼樣的雲朵', look: '再看看圖片，雲朵摸起來會是什麼感覺？', options: ['柔軟', '堅硬', '吵鬧', '苦澀'], clue: '提示：輕飄飄、蓬蓬的，好像一壓就凹下去。', explain: '答案是「柔軟」，完整的短語是「像棉花般柔軟的雲朵」。' },
        { id: 'ph2', img: 'pr-cold-hands.png', before: '像冰塊般', noun: '雙手', ask: '像冰塊般什麼樣的雙手', look: '再看看圖片，在雪地玩了很久，手摸起來怎麼樣？', options: ['冰冷', '溫暖', '香甜', '吵鬧'], clue: '提示：在雪地玩了很久，摸起來一點溫度也沒有。', explain: '答案是「冰冷」，完整的短語是「像冰塊般冰冷的雙手」。' },
        { id: 'ph3', img: 'pr-sweet-smile.png', before: '像蜂蜜般', noun: '笑容', ask: '像蜂蜜般什麼樣的笑容', look: '再看看圖片，這個笑容讓人覺得怎麼樣？', options: ['甜美', '苦澀', '冰冷', '粗糙'], clue: '提示：看了讓人心裡暖暖的、很舒服。', explain: '答案是「甜美」，完整的短語是「像蜂蜜般甜美的笑容」。' },
        { id: 'ph4', img: 'pr-fast-runner.png', before: '像獵豹般', noun: '身手', ask: '像獵豹般什麼樣的身手', look: '再看看圖片，他跑起來快不快？', options: ['敏捷', '緩慢', '柔軟', '安靜'], clue: '提示：一溜煙就跑到終點了。', explain: '答案是「敏捷」，完整的短語是「像獵豹般敏捷的身手」。' },
        { id: 'ph5', img: 'pr-bright-eyes.png', before: '像星星般', noun: '眼睛', ask: '像星星般什麼樣的眼睛', look: '再看看圖片，眼睛看起來怎麼樣？', options: ['閃亮', '黯淡', '粗糙', '吵鬧'], clue: '提示：一眨一眨，好像會發光。', explain: '答案是「閃亮」，完整的短語是「像星星般閃亮的眼睛」。' },
        { id: 'ph6', img: 'pr-tall-dad.png', before: '像大樹般', noun: '爸爸', ask: '像大樹般什麼樣的爸爸', look: '再看看圖片，爸爸跟小孩比起來怎麼樣？', options: ['高大', '矮小', '柔軟', '香甜'], clue: '提示：要抬頭才看得到他的臉。', explain: '答案是「高大」，完整的短語是「像大樹般高大的爸爸」。' },
        { id: 'ph7', img: 'pr-loud-clap.png', before: '像打雷般', noun: '掌聲', ask: '像打雷般什麼樣的掌聲', look: '再看看圖片，大家拍手的聲音大不大？', options: ['響亮', '微弱', '柔軟', '香甜'], clue: '提示：整個禮堂都在震動。', explain: '答案是「響亮」，完整的短語是「像打雷般響亮的掌聲」。' },
        { id: 'ph8', img: 'pr-calm-lake.png', before: '像鏡子般', noun: '湖面', ask: '像鏡子般什麼樣的湖面', look: '再看看圖片，湖面有沒有波浪？', options: ['平靜', '洶湧', '粗糙', '吵鬧'], clue: '提示：一點波紋都沒有，映出天上的雲。', explain: '答案是「平靜」，完整的短語是「像鏡子般平靜的湖面」。' }
      ],
      say: [],
      words: [
        { word: '堅毅不拔', meaning: '意志很強，再大的困難也能撐住。', img: 'climb-rope.png' },
        { word: '歷經', meaning: '一次又一次的碰過、走過。', img: 'old-bridge.png' },
        { word: '斗大', meaning: '形容字寫得非常醒目、尺寸很驚人。', img: 'big-sign.png' },
        { word: '銷售', meaning: '把商品賣出去。', img: 'best-seller.png' }
      ],
      choose: [
        { id: 'pw1', word: '堅毅不拔', options: ['他練跑受傷好幾次，仍然堅毅不拔，最後跑完全程。', '他遇到一點困難就放棄，真是堅毅不拔。'], clue: '提示：想一想，「堅毅不拔」是不放棄，還是放棄？', explain: '第一句用得對：受傷也不放棄。一點困難就放棄，剛好相反。' },
        { id: 'pw2', word: '歷經', options: ['小樹苗歷經風吹雨打，長成了大樹。', '我歷經了一下，就把門關上。'], clue: '提示：想一想，「歷經」後面接的是經過的事情嗎？', explain: '第一句用得對：經過風吹雨打。第二句「歷經了一下」說不通。' },
        { id: 'pw3', word: '斗大', options: ['海報上寫著斗大的「歡迎光臨」。', '螞蟻的眼睛斗大，要用放大鏡才看得到。'], clue: '提示：想一想，「斗大」是很大，還是很小？', explain: '第一句用得對：海報上的字很大。要用放大鏡才看得到，是很小。' },
        { id: 'pw4', word: '銷售', options: ['這家店專門銷售文具和書。', '我在家裡銷售了一個晚上的覺。'], clue: '提示：想一想，「銷售」是賣東西，還是別的事？', explain: '第一句用得對：店在賣文具和書。睡覺不能說成銷售。' }
      ],
      make: [
        { id: 'pm1', word: '堅毅不拔', clue: '提示：想想看，誰遇到困難也不放棄？', model: '奶奶生病後堅毅不拔的做復健，現在能自己走路了。' },
        { id: 'pm2', word: '歷經', clue: '提示：想想看，什麼東西經過了很多事？', model: '我們的球隊歷經十場比賽，終於拿到冠軍。' },
        { id: 'pm3', word: '斗大', clue: '提示：想想看，哪裡有很大、很醒目的字或東西？', model: '操場邊掛著斗大的布條，寫著運動會加油。' },
        { id: 'pm4', word: '銷售', clue: '提示：想想看，哪家店在賣什麼？', model: '夜市的攤販在銷售熱騰騰的烤玉米。' }
      ]
    },
    pattern: [
      { key: 'bingqie', id: 'bq', title: '……並且……', img: 'bingqie.png',
        meaning: '先說一件事，再用「並且」接著說同時也做的另一件事。',
        examples: ['姐姐把房間打掃乾淨，並且把書排整齊。'],
        match: [
          { id: 'pt-bq-m1', img: 'pt-wash-dish.png', front: '吃完飯，哥哥把碗洗乾淨，', options: ['並且把桌子擦好。', '並且把碗打破。', '並且忘了洗碗。'], clue: '提示：看看圖片，洗完碗，哥哥還做了什麼？', explain: '答案是「並且把桌子擦好」：洗碗，同時也擦桌子。' },
          { id: 'pt-bq-m2', img: 'pt-write-diary.png', front: '妹妹每天寫日記，', options: ['並且畫上小插圖。', '並且不寫日記。', '並且把日記丟掉。'], clue: '提示：看看圖片，日記本上除了字，還有什麼？', explain: '答案是「並且畫上小插圖」：寫日記，同時也畫圖。' },
          { id: 'pt-bq-m3', img: 'pt-plant-tree.png', front: '我們在校園種下小樹，', options: ['並且每天幫它澆水。', '並且把它拔起來。', '並且把它忘記。'], clue: '提示：看看圖片，種好樹以後還要做什麼？', explain: '答案是「並且每天幫它澆水」：種樹，也好好照顧它。' }
        ],
        conj: [
          { id: 'pt-bq-c1', full: '爸爸修好了腳踏車，並且幫輪胎打氣。', img: 'pt-fix-bike.png', sentence: '爸爸修好了腳踏車，＿＿幫輪胎打氣。', options: ['……並且……', '雖然……但……', '要是……那麼……'], clue: '提示：兩件事都做了，用哪一個詞接起來？數數看有幾個空格。', explain: '答案是「……並且……」：爸爸修好了腳踏車，並且幫輪胎打氣。' },
          { id: 'pt-bq-c2', full: '老師說完故事，並且請大家說說感想。', img: 'pt-story-time.png', sentence: '老師說完故事，＿＿請大家說說感想。', options: ['……並且……', '雖然……但……', '要是……那麼……'], clue: '提示：說完故事，還接著做另一件事。數數看有幾個空格。', explain: '答案是「……並且……」：老師說完故事，並且請大家說說感想。' }
        ],
        half: [
          { id: 'pt-bq-h1', front: '我寫完功課，', clue: '提示：寫完功課，你還會做什麼？記得要說「並且」。', model: '並且把書包整理好。' },
          { id: 'pt-bq-h2', front: '班長把教室的燈關掉，', clue: '提示：關完燈，班長還會做什麼？記得要說「並且」。', model: '並且把門鎖好。' }
        ],
        whole: [
          { id: 'pt-bq-w1', clue: '提示：先說一件事，再用「並且」說同時做的另一件事。想想看：你今天做了哪兩件事？', model: '早上我刷了牙，並且幫媽媽倒了垃圾。' }
        ] },
      { key: 'suirandan', id: 'sd', title: '雖然……但……', img: 'suirandan.png',
        meaning: '先用「雖然」說一件事，再用「但」說出和前面相反、不一樣的情形。',
        examples: ['外面雖然下著雨，但我們還是去上游泳課。'],
        match: [
          { id: 'pt-sd-m1', img: 'pt-small-dog.png', front: '這隻小狗雖然很小，', options: ['但是很勇敢。', '但是很小。', '但是是一隻狗。'], clue: '提示：看看圖片，小狗遇到大狗，牠怕不怕？', explain: '答案是「但是很勇敢」：個子小，卻很勇敢，前後相反。' },
          { id: 'pt-sd-m2', img: 'pt-hard-math.png', front: '這題數學雖然很難，', options: ['但我還是算出來了。', '但這題好難好難。', '但這是數學題目。'], clue: '提示：看看圖片，題目很難，他最後有沒有算出來？', explain: '答案是「但我還是算出來了」：很難，卻算出來了。' },
          { id: 'pt-sd-m3', img: 'pt-old-bag.png', front: '這個書包雖然很舊了，', options: ['但我還是很喜歡它。', '但它是一個書包。', '但它真的很舊。'], clue: '提示：看看圖片，小孩抱著舊書包，表情怎麼樣？', explain: '答案是「但我還是很喜歡它」：很舊，卻還是很喜歡。' }
        ],
        conj: [
          { id: 'pt-sd-c1', full: '雖然天氣很熱，但大家還是認真練球。', img: 'pt-hot-practice.png', sentence: '＿＿天氣很熱，＿大家還是認真練球。', options: ['雖然……但……', '……並且……', '要是……那麼……'], clue: '提示：天氣很熱，結果卻沒有偷懶。數數看有幾個空格。', explain: '答案是「雖然……但……」：雖然天氣很熱，但大家還是認真練球。' },
          { id: 'pt-sd-c2', full: '雖然他跌倒了，但他馬上站起來繼續跑。', img: 'pt-fall-run.png', sentence: '＿＿他跌倒了，＿他馬上站起來繼續跑。', options: ['雖然……但……', '……並且……', '要是……那麼……'], clue: '提示：跌倒了，卻沒有放棄。數數看有幾個空格。', explain: '答案是「雖然……但……」：雖然他跌倒了，但他馬上站起來繼續跑。' }
        ],
        half: [
          { id: 'pt-sd-h1', front: '雖然今天很冷，', clue: '提示：天氣冷，你還是做了什麼事？記得要說「但」。', model: '但我還是早早起床去上學。' },
          { id: 'pt-sd-h2', front: '雖然青菜不好吃，', clue: '提示：不好吃，你還是會怎麼做？記得要說「但」。', model: '但為了身體健康，我還是會吃。' }
        ],
        whole: [
          { id: 'pt-sd-w1', clue: '提示：先用「雖然」說一件事，再用「但」說相反的情形。想想看：有什麼事和你想的不一樣？', model: '雖然這家店很小，但東西很好吃。' }
        ] }
    ],
    rhetoric: {
      cards: [
        { key: 'question', name: '設問', meaning: '用問句來說話，引起大家注意。有時自己問、自己回答；有時只問不答，答案就藏在問題裡。', example: '課文一開始先問讀者：商標是不是最近才有的？接著自己回答：不是喔。',
          show: { sentence: '誰是我們班跑最快的人？就是小明。' },
          yesno: [
            { id: 'rh-qu-y1', sentence: '你知道月亮為什麼會變形狀嗎？讓我告訴你吧！', answer: true, clue: '提示：這句話是不是先問一個問題，引起大家注意？', explain: '是設問：先問一個問題，引起大家的好奇。' },
            { id: 'rh-qu-y2', sentence: '月亮每天的形狀都不一樣。', answer: false, clue: '提示：這句話裡有沒有問題？', explain: '不是設問：這句話沒有用問句。' }
          ],
          pick: [
            { id: 'rh-qu-p1', options: ['什麼東西有腳卻不會走？是桌子。', '桌子有四隻腳。'], clue: '提示：哪一句先問問題，再自己回答？', explain: '先問「什麼東西有腳卻不會走」，再回答，是設問。' },
            { id: 'rh-qu-p2', options: ['誰不想要一個快樂的暑假呢？', '暑假很快樂。'], clue: '提示：哪一句用問題來說話？', explain: '「誰不想要一個快樂的暑假呢」是設問：答案藏在問題裡。' },
            { id: 'rh-qu-p3', options: ['為什麼要早睡？因為身體需要休息。', '我每天九點睡覺。', '晚上要關燈。'], clue: '提示：哪一句先問「為什麼」，再自己回答？', explain: '先問再答，是設問。' },
            { id: 'rh-qu-p4', options: ['你聽過會說話的鸚鵡嗎？', '鸚鵡是一種鳥。', '鸚鵡的羽毛很漂亮。'], clue: '提示：哪一句用問題引起大家注意？', explain: '「你聽過會說話的鸚鵡嗎」是設問。' },
            { id: 'rh-qu-p5', options: ['這是誰畫的？原來是弟弟畫的。', '小明畫了一張畫。', '這張畫的顏色很多。', '畫上有一隻貓。'], clue: '提示：哪一句先問問題，再說出答案？', explain: '先問「這是誰畫的」，再回答，是設問。' },
            { id: 'rh-qu-p6', options: ['還有什麼比全家一起吃飯更開心呢？', '全家一起吃飯。', '晚餐有魚和湯。', '媽咪煮了晚餐。'], clue: '提示：哪一句用問題來說話，答案藏在問題裡？', explain: '答案藏在問題裡：全家一起吃飯最開心，是設問。' }
          ] },
        { key: 'simile', name: '譬喻', meaning: '把一樣東西比成另一樣有相同地方的東西，讓人更容易想像。', example: '課文把一個大大的字母比成兩扇打開的大門，好像在歡迎客人走進來。',
          show: { sentence: '彎彎的月亮像一條小船。' },
          yesno: [
            { id: 'rh-si-y1', sentence: '這把傘撐開來，像一朵大大的香菇。', answer: true, clue: '提示：這句話有沒有把傘比成另一樣東西？', explain: '是譬喻：把傘比成香菇。' },
            { id: 'rh-si-y2', sentence: '我撐開了一把傘。', answer: false, clue: '提示：這句話有沒有把傘比成別的東西？', explain: '不是譬喻：這句話只是說撐開了傘。' }
          ],
          pick: [
            { id: 'rh-si-p1', options: ['彩色的風箏像一隻大蝴蝶。', '天上有一個風箏。'], clue: '提示：哪一句把風箏比成另一樣東西？', explain: '「像一隻大蝴蝶」是譬喻。' },
            { id: 'rh-si-p2', options: ['操場上的跑道像一條紅色的絲帶。', '操場上有跑道。'], clue: '提示：哪一句把跑道比成別的東西？', explain: '「像一條紅色的絲帶」是譬喻。' },
            { id: 'rh-si-p3', options: ['路燈像一排站崗的士兵。', '路邊有很多路燈。', '晚上路燈會亮。'], clue: '提示：哪一句用「像」把路燈比成別的東西？', explain: '「像一排站崗的士兵」是譬喻。' },
            { id: 'rh-si-p4', options: ['弟弟的臉圓得像一顆蘋果。', '小弟的臉很圓。', '小弟在吃蘋果。'], clue: '提示：哪一句把臉比成另一樣東西？', explain: '「像一顆蘋果」是譬喻。' },
            { id: 'rh-si-p5', options: ['大樓的窗戶亮起來，好像一格一格的燈籠。', '大樓的燈亮了。', '晚上到了。', '大樓很高。'], clue: '提示：哪一句用「好像」把窗戶比成別的東西？', explain: '「好像一格一格的燈籠」是譬喻。' },
            { id: 'rh-si-p6', options: ['那個商標的線條，像一條飛起來的彩帶。', '那個商標很簡單。', '我看到一個商標。', '商標印在盒子上。'], clue: '提示：哪一句把線條比成另一樣東西？', explain: '「像一條飛起來的彩帶」是譬喻。' }
          ] }
      ],
      quiz: [
        { id: 'rh1', sentence: '你知道恐龍為什麼消失了嗎？', answer: '設問', clue: '提示：這句話有沒有用問題引起注意？', explain: '答案是「設問」：用問題引起大家的好奇。' },
        { id: 'rh2', sentence: '誰最愛吃糖？就是我的小妹。', answer: '設問', clue: '提示：這句話是不是先問再答？', explain: '答案是「設問」：先問「誰最愛吃糖」，再自己回答。' },
        { id: 'rh3', sentence: '天上的白雲像一團團棉花糖。', answer: '譬喻', clue: '提示：這句話有沒有把白雲比成別的東西？', explain: '答案是「譬喻」：把白雲比成棉花糖。' },
        { id: 'rh4', sentence: '小嬰兒的手軟得像麵團。', answer: '譬喻', clue: '提示：這句話有沒有用「像」？', explain: '答案是「譬喻」：把小手比成麵團。' }
      ]
    }
  };
  if (typeof module === 'object' && module.exports) module.exports = d;
  else { root.H3A_WORDS = root.H3A_WORDS || {}; root.H3A_WORDS.L05 = d; }
})(this);
