/* 第 9 課字詞練習（公開、不加密）。句子和解釋都是 Claude 自己寫的，沒有課本原文。
   生字、語詞：options 的第一個是正確答案（作答時會打亂）。 */
(function (root) {
  var d = {
    /* 理解提問的分類（照課本「閱讀理解提問」）：extract 提取訊息、infer 推論訊息、interpret 詮釋整合、evaluate 比較評估。只放題號，不放課文 */
    quizLevels: { qa: 'extract', qb: 'extract', qc: 'extract', qd: 'extract', qe: 'infer', qf: 'infer', qg: 'interpret', qh: 'interpret',
      qi: 'evaluate', qj: 'evaluate', k1: 'interpret', k2: 'evaluate' },
    /* 詮釋整合、比較評估的鷹架：think 是「想一想」的兩個步驟（不說答案），why 是「老師教你」的說明。不放課文原句 */
    quizHelp: {
      qg: { think: ['拳擊手一路上遇到哪些困難？', '她最後有沒有放棄？得到了什麼？'], why: '她比賽輸過、生過重病，還是一直練習，第三次參加終於得獎。她的例子告訴我們：堅持不放棄，把挫折變成力量，就能慢慢成長。' },
      qh: { think: ['仙人掌、落葉樹、椰子，各用什麼方法活下來？', '它們是不是都改變了自己，來適應不好的環境？'], why: '仙人掌把水存在粗粗的莖裡，落葉樹在冬天落葉存養分，椰子靠厚皮在海上漂流。它們都接受環境的挫折、改變自己，所以能在逆境中活下來。' },
      qi: { think: ['第一段每個問題都給你兩個選擇，讀的時候你會不會想一想自己會選哪一個？', '作者想讓你一開始就思考什麼事？'], why: '每個問題都有兩個選擇，讓讀者一邊讀一邊想：如果是我，會怎麼做？這樣可以引起興趣，也讓讀者先想想面對困難的態度。' },
      qj: { think: ['只說道理，和舉一個真實的人當例子，哪一個比較讓人相信？', '一句有名的話，能不能幫作者把意思說得更有力？'], why: '舉真實人物的例子，讓道理變得具體、讓人相信；引用科學家的名言，又讓文章更有說服力。兩種方法都讓讀者更能接受「在挫折中成長」的想法。' }
    },
    /* 「說說看」改成選選看：good 兩個合理的想法（選哪一個都對）、bad 兩個不合理的，why 是老師教你的說明。不放課文原句 */
    talkChoices: {
      k1: { good: ['比賽輸了，我會找出原因，下次再努力。', '學游泳一直沉下去，我就每天多練習一點。'], bad: ['失敗一次我就永遠不做了。', '都是別人害我失敗的。'], why: '題目問的是你怎麼面對挫折。找原因、多練習，就是把挫折變成前進的力量。永遠不做、怪別人，都沒有讓自己成長。' },
      k2: { good: ['我覺得那句名言很對，困難讓人變強。', '我同意，因為我考不好以後更認真，反而進步了。'], bad: ['被打會痛，所以這句話是錯的。', '我不知道鐵是什麼。'], why: '這句話是比喻：遇到困難像被敲打，卻能讓人更有力量。說出同不同意和自己的例子，就是好的回答。只想到真的被打、不知道鐵，都沒有讀懂比喻。' }
    },
    hanzi: [
      { id: 'h-維', combo: { layout: 'lr', parts: [['糸', 'm', '繩子'], ['隹', 's', '']] }, char: '維', zhuyin: 'ㄨㄟˊ', radical: '糸', strokes: 14, words: ['維持', '維修'], say: '維，維修的維', cloze: '＿修', img: 'repair-bike.png', options: ['維', '唯', '惟', '堆'], clue: '這個字的左邊是糸字旁。', explain: '答案是「維」，左邊是糸字旁；「唯」的左邊是口字旁，「堆」的左邊是土字旁。', parts: ['糸', '隹'], story: '左邊的「糸」是繩子，右邊的「隹」念起來有點像「維」。用繩子綁好、讓東西保持原樣，就是「維持」；把壞掉的東西修好，叫「維修」。', sentence: '爸爸把壞掉的腳踏車拿去維修。', build: { layout: 'lr', show: ['？', '隹'], answer: '糸', options: ['糸', '口', '忄', '土'], clue: '想一想：用繩子把東西綁好，左邊放哪一個？' } },
      { id: 'h-戰', combo: { layout: 'lr', parts: [['單', 's', ''], ['戈', 'm', '兵器']] }, char: '戰', zhuyin: 'ㄓㄢˋ', radical: '戈', strokes: 16, words: ['奮戰', '戰爭'], say: '戰，戰爭的戰', cloze: '＿爭', img: 'knight-toy.png', options: ['戰', '獸', '單', '戲'], clue: '這個字的右邊是「戈」。', explain: '答案是「戰」，右邊是「戈」；「獸」的右邊是「犬」，「戲」的左邊是「虛」。', parts: ['單', '戈'], story: '左邊的「單」念起來有點像「戰」，右邊的「戈」是古代的兵器。拿著兵器互相打，就是「戰爭」。', sentence: '我們希望世界上不再有戰爭。', build: { layout: 'lr', show: ['單', '？'], answer: '戈', options: ['戈', '犬', '口', '弓'], clue: '想一想：古代打仗用的兵器是哪一個？' } },
      { id: 'h-崎', combo: { layout: 'lr', parts: [['山', 'm', '山'], ['奇', 's', '']] }, char: '崎', zhuyin: 'ㄑㄧˊ', radical: '山', strokes: 11, words: ['崎嶇', '崎嶇不平'], say: '崎，崎嶇的崎', cloze: '＿嶇', img: 'rocky-path.png', options: ['崎', '騎', '奇', '寄'], clue: '這個字的左邊是山字旁。', explain: '答案是「崎」，左邊是山字旁；「騎」的左邊是「馬」，「寄」的上面是寶蓋頭。', parts: ['山', '奇'], story: '左邊是山，右邊的「奇」念起來像「崎」。山路高高低低、很難走，就是「崎嶇」。', sentence: '這條山路崎嶇不平，要小心走。', build: { layout: 'lr', show: ['？', '奇'], answer: '山', options: ['山', '馬', '宀', '石'], clue: '想一想：高高低低的路在哪裡？' } },
      { id: 'h-嶇', combo: { layout: 'lr', parts: [['山', 'm', '山'], ['區', 's', '']] }, char: '嶇', zhuyin: 'ㄑㄩ', radical: '山', strokes: 14, words: ['崎嶇', '崎嶇難行'], say: '嶇，崎嶇的嶇', cloze: '崎＿', img: 'rocky-path.png', options: ['嶇', '驅', '區', '樞'], clue: '這個字的左邊是山字旁，右邊是「區」。', explain: '答案是「嶇」；「驅」的左邊是「馬」，「樞」的左邊是木字旁。', parts: ['山', '區'], story: '左邊是山，右邊的「區」念起來像「嶇」。「崎」和「嶇」兩個字都有山，合起來就是山路很難走的「崎嶇」。', sentence: '我們沿著崎嶇的小路爬上山頂。', build: { layout: 'lr', show: ['？', '區'], answer: '山', options: ['山', '馬', '木', '扌'], clue: '想一想：和「崎」一樣，左邊放哪一個？' } },
      { id: 'h-拳', combo: { layout: 'tb', parts: [['龹', 's', ''], ['手', 'm', '手']] }, char: '拳', zhuyin: 'ㄑㄩㄢˊ', radical: '手', strokes: 10, words: ['拳擊', '拳頭'], say: '拳，拳頭的拳', cloze: '＿頭', img: 'fist.png', options: ['拳', '卷', '券', '眷'], clue: '這個字的下面是「手」。', explain: '答案是「拳」，下面是「手」；「券」的下面是「刀」，「眷」的下面是「目」。', parts: ['龹', '手'], story: '上面念起來像「拳」，下面是手。把手指頭握緊，就是「拳頭」。', sentence: '他握緊拳頭，給自己加油。', build: { layout: 'tb', show: ['龹', '？'], answer: '手', options: ['手', '刀', '目', '力'], clue: '想一想：五根指頭握緊，下面放哪一個？' } },
      { id: 'h-癌', combo: { type: '形聲字', pict: '外面的「疒」和生病有關，裡面有三個「口」和「山」，像身體裡長出一塊一塊硬硬的東西。這是一種很嚴重的病。' }, char: '癌', zhuyin: 'ㄞˊ', radical: '疒', strokes: 17, words: ['癌症', '癌細胞'], say: '癌，癌症的癌', cloze: '＿症', img: 'doctor-check.png', options: ['癌', '瘤', '疤', '痕'], clue: '這個字的外面是病字旁，裡面有三個「口」。', explain: '答案是「癌」；「瘤」的裡面是「留」，「疤」的裡面是「巴」。', parts: ['疒', '嵒'], story: '外面的病字旁和生病有關，裡面像一塊一塊硬硬的石頭。身體裡長出不好的東西，是一種很嚴重的病，叫「癌症」。', sentence: '醫生說，早點檢查可以發現癌症。' },
      { id: 'h-症', combo: { type: '形聲字', pict: '外面的「疒」和生病有關，裡面的「正」念起來像「症」。生病時身體出現的樣子，就是「症」。' }, char: '症', zhuyin: 'ㄓㄥˋ', radical: '疒', strokes: 10, words: ['癌症', '症狀'], say: '症，症狀的症', cloze: '＿狀', img: 'fever-kid.png', options: ['症', '證', '政', '征'], clue: '這個字的外面是病字旁。', explain: '答案是「症」，外面是病字旁；「證」的左邊是言字旁，「政」的右邊是反文旁。', parts: ['疒', '正'], story: '外面的病字旁和生病有關，裡面的「正」念起來像「症」。生病時發燒、咳嗽，這些身體的樣子叫「症狀」。', sentence: '感冒的症狀有咳嗽和流鼻水。' },
      { id: 'h-銅', combo: { layout: 'lr', parts: [['金', 'm', '金屬'], ['同', 's', '']] }, char: '銅', zhuyin: 'ㄊㄨㄥˊ', radical: '金', strokes: 14, words: ['銅牌', '銅板'], say: '銅，銅板的銅', cloze: '＿板', img: 'coins.png', options: ['銅', '洞', '桐', '筒'], clue: '這個字的左邊是金字旁。', explain: '答案是「銅」，左邊是金字旁；「洞」的左邊是三點水，「筒」的上面是竹字頭。', parts: ['金', '同'], story: '左邊的「金」是金屬，右邊的「同」念起來像「銅」。一種黃黃的金屬叫「銅」，做成的零錢叫「銅板」。', sentence: '我把銅板存進小豬撲滿裡。', build: { layout: 'lr', show: ['？', '同'], answer: '金', options: ['金', '氵', '木', '竹'], clue: '想一想：零錢是什麼做的？' } },
      { id: 'h-牌', combo: { layout: 'lr', parts: [['片', 'm', '木片'], ['卑', 's', '']] }, char: '牌', zhuyin: 'ㄆㄞˊ', radical: '片', strokes: 12, words: ['銅牌', '招牌'], say: '牌，招牌的牌', cloze: '招＿', img: 'shop-sign.png', options: ['牌', '碑', '啤', '脾'], clue: '這個字的左邊是「片」。', explain: '答案是「牌」，左邊是「片」；「碑」的左邊是石字旁，「啤」的左邊是口字旁。', parts: ['片', '卑'], story: '左邊的「片」是一片木板，右邊的「卑」念起來像「牌」。在木板上寫字、掛在店門口，就是「招牌」。', sentence: '這家店的招牌好大。', build: { layout: 'lr', show: ['？', '卑'], answer: '片', options: ['片', '石', '口', '月'], clue: '想一想：招牌是在一塊什麼上寫字？' } },
      { id: 'h-屢', combo: { type: '形聲字', pict: '上面的「尸」像屋頂，裡面的「婁」念起來像「屢」。一次又一次，就是「屢」。' }, char: '屢', zhuyin: 'ㄌㄩˇ', radical: '尸', strokes: 14, words: ['屢屢', '屢次'], say: '屢，屢次的屢', cloze: '＿次', img: 'try-many.png', options: ['屢', '婁', '縷', '樓'], clue: '這個字的上面是「尸」。', explain: '答案是「屢」，上面是「尸」；「縷」的左邊是糸字旁，「樓」的左邊是木字旁。', parts: ['尸', '婁'], story: '上面的「尸」像屋頂，裡面的「婁」念起來像「屢」。一次又一次，就是「屢次」。', sentence: '他屢次失敗，還是不放棄。' },
      { id: 'h-減', combo: { layout: 'lr', parts: [['氵', 'm', '水'], ['咸', 's', '']] }, char: '減', zhuyin: 'ㄐㄧㄢˇ', radical: '水', strokes: 12, words: ['減少', '減法'], say: '減，減法的減', cloze: '＿法', img: 'math-minus.png', options: ['減', '喊', '鹹', '感'], clue: '這個字的左邊是三點水。', explain: '答案是「減」，左邊是三點水；「喊」的左邊是口字旁，「感」的下面是心。', parts: ['氵', '咸'], story: '左邊是水，右邊的「咸」念起來像「減」。水一直流走，越來越少，就是「減少」。', sentence: '十減三等於七。', build: { layout: 'lr', show: ['？', '咸'], answer: '氵', options: ['氵', '口', '鹵', '心'], clue: '想一想：杯子裡的什麼會越流越少？' } },
      { id: 'h-予', combo: { type: '象形字', pict: '「予」像兩隻手互相傳遞一樣東西，所以有「給」的意思。' }, char: '予', zhuyin: 'ㄩˇ', radical: '亅', strokes: 4, words: ['給予', '授予'], say: '予，給予的予', cloze: '給＿', img: 'give-gift.png', options: ['予', '矛', '子', '了'], clue: '這個字比「矛」少一撇。', explain: '答案是「予」；「矛」多一撇，「子」的上面沒有交叉。', parts: ['予'], story: '「予」像把東西從一隻手傳到另一隻手。把東西交給別人，就是「給予」。', sentence: '謝謝你給予我這麼多幫助。' },
      { id: 'h-幼', combo: { layout: 'lr', parts: [['幺', 's', '小'], ['力', 'm', '力氣']] }, char: '幼', zhuyin: 'ㄧㄡˋ', radical: '幺', strokes: 5, words: ['幼芽', '幼兒'], say: '幼，幼兒的幼', cloze: '＿兒', img: 'toddler.png', options: ['幼', '幻', '幺', '劫'], clue: '這個字的左邊是「幺」，右邊是「力」。', explain: '答案是「幼」；「幻」的右邊不是「力」，「劫」的左邊是「去」。', parts: ['幺', '力'], story: '左邊的「幺」是小小的，右邊是力氣。力氣還很小的時候，就是「幼小」；年紀很小的孩子，叫「幼兒」。', sentence: '弟弟今年上幼兒園了。', build: { layout: 'lr', show: ['幺', '？'], answer: '力', options: ['力', '刀', '子', '又'], clue: '想一想：小小的身體，使出全身的勁，右邊放哪一個？' } },
      { id: 'h-椰', combo: { layout: 'lr', parts: [['木', 'm', '樹'], ['耶', 's', '']] }, char: '椰', zhuyin: 'ㄧㄝˊ', radical: '木', strokes: 13, words: ['椰子', '椰子樹'], say: '椰，椰子的椰', cloze: '＿子', img: 'coconut.png', options: ['椰', '爺', '耶', '揶'], clue: '這個字的左邊是木字旁。', explain: '答案是「椰」，左邊是木字旁；「爺」的上面是「父」，「揶」的左邊是提手旁。', parts: ['木', '耶'], story: '左邊是樹，右邊的「耶」念起來像「椰」。海邊又高又直、結著大大果實的樹，就是「椰子樹」。', sentence: '海邊的椰子樹隨風搖擺。', build: { layout: 'lr', show: ['？', '耶'], answer: '木', options: ['木', '父', '扌', '口'], clue: '想一想：這是一種植物，左邊放哪一個？' } },
      { id: 'h-即', combo: { type: '會意字', pict: '左邊像一碗裝滿的飯，右邊像一個人跪坐著。人靠近飯碗、馬上要吃了，所以「即」有馬上、靠近的意思。' }, char: '即', zhuyin: 'ㄐㄧˊ', radical: '卩', strokes: 9, words: ['即使', '立即'], say: '即，立即的即', cloze: '立＿', img: 'run-now.png', options: ['即', '既', '卻', '節'], clue: '這個字的右邊是「卩」，左邊像「良」少一撇。', explain: '答案是「即」；「既」的右邊是「旡」，「卻」的左邊是「去」。', parts: ['皀', '卩'], story: '左邊像一碗飯，右邊像一個跪坐的人。人靠近飯碗、馬上就要吃，所以「即」是馬上；「立即」就是立刻。', sentence: '聽到鈴聲，大家立即排好隊。' },
      { id: 'h-腐', combo: { type: '形聲字', pict: '上面的「府」念起來像「腐」，下面是「肉」。肉放太久，就會壞掉發臭，就是「腐」。' }, char: '腐', zhuyin: 'ㄈㄨˇ', radical: '肉', strokes: 14, words: ['腐爛', '豆腐'], say: '腐，豆腐的腐', cloze: '豆＿', img: 'tofu.png', options: ['腐', '府', '俯', '付'], clue: '這個字的下面是「肉」。', explain: '答案是「腐」，下面是「肉」；「府」沒有「肉」，「俯」的左邊是單人旁。', parts: ['府', '肉'], story: '上面的「府」念起來像「腐」，下面是肉。肉放太久會壞掉，叫「腐爛」；軟軟白白、黃豆做的食物，叫「豆腐」。', sentence: '媽媽煮了一鍋豆腐湯。' },
      { id: 'h-衝', combo: { type: '形聲字', pict: '外面的「行」是十字路口，中間的「重」念起來像「衝」。在路上用很大的力量往前跑，就是「衝」。' }, char: '衝', zhuyin: 'ㄔㄨㄥ', radical: '行', strokes: 15, words: ['衝擊', '衝刺'], say: '衝，衝刺的衝', cloze: '＿刺', img: 'sprint.png', options: ['衝', '衡', '衛', '街'], clue: '這個字的外面是「行」，中間是「重」。', explain: '答案是「衝」；「衡」的中間是「奐」的樣子，「衛」的中間是「韋」，「街」的中間是「圭」。', parts: ['彳', '重', '亍'], story: '外面的「行」是路口，中間的「重」念起來像「衝」。在跑道上用盡全力往前跑，就是「衝刺」。', sentence: '最後一圈，他用力衝刺到終點。' },
      { id: 'h-鍛', combo: { layout: 'lr', parts: [['金', 'm', '金屬'], ['段', 's', '']] }, char: '鍛', zhuyin: 'ㄉㄨㄢˋ', radical: '金', strokes: 17, words: ['鍛造', '鍛鍊'], say: '鍛，鍛造的鍛', cloze: '＿造', img: 'blacksmith.png', options: ['鍛', '段', '緞', '煅'], clue: '這個字的左邊是金字旁。', explain: '答案是「鍛」，左邊是金字旁；「緞」的左邊是糸字旁，「段」沒有偏旁。', parts: ['金', '段'], story: '左邊的「金」是金屬，右邊的「段」念起來像「鍛」。把燒紅的金屬一下一下敲打，做成工具，就是「鍛造」。', sentence: '鐵匠用力敲打，鍛造出一把好刀。', build: { layout: 'lr', show: ['？', '段'], answer: '金', options: ['金', '糸', '火', '木'], clue: '想一想：鐵匠敲打的是什麼？' } },
      { id: 'h-鍊', combo: { layout: 'lr', parts: [['金', 'm', '金屬'], ['柬', 's', '']] }, char: '鍊', zhuyin: 'ㄌㄧㄢˋ', radical: '金', strokes: 17, words: ['鍛鍊', '項鍊'], say: '鍊，項鍊的鍊', cloze: '項＿', img: 'necklace.png', options: ['鍊', '練', '煉', '揀'], clue: '這個字的左邊是金字旁。', explain: '答案是「鍊」，左邊是金字旁；「練」的左邊是糸字旁，「煉」的左邊是火字旁。', parts: ['金', '柬'], story: '左邊的「金」是金屬，右邊的「柬」念起來有點像「鍊」。金屬一環一環接起來，戴在脖子上，就是「項鍊」。', sentence: '姐姐戴上一條銀色的項鍊。', build: { layout: 'lr', show: ['？', '柬'], answer: '金', options: ['金', '糸', '火', '扌'], clue: '想一想：銀色的項鍊是什麼做的？' } }
    ],
    vocab: [
      { id: 'v-維持', cloze: true, clozeOptions: ['維持', '打破', '丟掉', '改掉'], word: '維持', meaning: '讓情況一直一樣，不改變。', example: '每天運動可以＿＿身體健康。', img: 'jogging.png', options: ['維持', '減少', '給予', '奮戰'] },
      { id: 'v-奮戰', cloze: true, clozeOptions: ['奮戰', '睡覺', '投降', '偷懶'], word: '奮戰', meaning: '用盡全力和困難對抗。', example: '消防員和大火＿＿了一整夜。', img: 'firefighter-hose.png', options: ['奮戰', '維持', '腐爛', '屢屢'] },
      { id: 'v-崎嶇', cloze: true, clozeOptions: ['崎嶇', '平坦', '寬敞', '筆直'], word: '崎嶇', meaning: '山路高高低低、不平；也比喻遇到很多困難。', example: '這條山路很＿＿，車子開得很慢。', img: 'rocky-path.png', options: ['崎嶇', '腐爛', '屢屢', '即使'] },
      { id: 'v-拳擊', cloze: true, clozeOptions: ['拳擊', '跳繩', '游泳', '跳舞'], word: '拳擊', meaning: '兩個人戴上厚手套，互相出手比賽的運動。', example: '她每天練習＿＿，希望參加比賽。', img: 'boxing-glove.png', options: ['拳擊', '銅牌', '椰子', '幼芽'] },
      { id: 'v-癌症', cloze: true, clozeOptions: ['癌症', '彩虹', '玩具', '蛋糕'], word: '癌症', meaning: '一種很嚴重、很難醫好的疾病。', example: '舅舅得了＿＿，但他很勇敢的接受治療。', img: 'doctor-check.png', options: ['癌症', '拳擊', '銅牌', '椰子'] },
      { id: 'v-銅牌', cloze: true, clozeOptions: ['銅牌', '鉛筆', '雨傘', '背包'], word: '銅牌', meaning: '比賽得到第三名的獎章。', example: '她在跳遠比賽得到第三名，拿到一面＿＿。', img: 'bronze-medal.png', options: ['銅牌', '拳擊', '癌症', '幼芽'] },
      { id: 'v-屢屢', cloze: true, clozeOptions: ['屢屢', '從不', '沒有', '很少'], word: '屢屢', meaning: '一次又一次，常常。', example: '他＿＿遲到，被老師提醒了好幾次。', img: 'try-many.png', options: ['屢屢', '即使', '維持', '奮戰'] },
      { id: 'v-減少', cloze: true, clozeOptions: ['減少', '增加', '變多', '堆滿'], word: '減少', meaning: '數量變得比原來低。', example: '隨手關燈可以＿＿用電。', img: 'light-off.png', options: ['減少', '給予', '維持', '衝擊'] },
      { id: 'v-給予', cloze: true, clozeOptions: ['給予', '搶走', '偷拿', '拿回'], word: '給予', meaning: '把東西交到別人手上。', example: '老師＿＿我很多鼓勵。', img: 'give-gift.png', options: ['給予', '減少', '腐爛', '維持'] },
      { id: 'v-幼芽', cloze: true, clozeOptions: ['幼芽', '石頭', '落葉', '枯枝'], word: '幼芽', meaning: '剛冒出來、小小的嫩葉。', example: '春天一到，樹枝上長出了綠綠的＿＿。', img: 'sprout.png', options: ['幼芽', '椰子', '銅牌', '拳擊'] },
      { id: 'v-椰子', cloze: true, clozeOptions: ['椰子', '香蕉', '葡萄', '蘋果'], word: '椰子', meaning: '長在海邊高樹上、殼很硬、裡面有汁的大果實。', example: '我用吸管喝＿＿水，好清涼。', img: 'coconut.png', options: ['椰子', '幼芽', '銅牌', '癌症'] },
      { id: 'v-即使', cloze: true, clozeOptions: ['即使', '因為', '所以', '然後'], word: '即使', meaning: '就算是。', example: '＿＿下雨，比賽也照常舉行。', img: 'rain-race.png', options: ['即使', '屢屢', '維持', '奮戰'] },
      { id: 'v-腐爛', cloze: true, clozeOptions: ['腐爛', '新鮮', '漂亮', '香甜'], word: '腐爛', meaning: '東西放太久，壞掉發臭。', example: '放了好幾天的香蕉，已經＿＿了。', img: 'rotten-banana.png', options: ['腐爛', '崎嶇', '減少', '給予'] },
      { id: 'v-衝擊', cloze: true, clozeOptions: ['衝擊', '幫助', '安慰', '照顧'], word: '衝擊', meaning: '很大的影響，像被重重撞了一下。', example: '颱風帶來的大雨，對農作物造成很大的＿＿。', img: 'storm-farm.png', options: ['衝擊', '維持', '給予', '減少'] },
      { id: 'v-鍛造', cloze: true, clozeOptions: ['鍛造', '吃掉', '畫畫', '唱出'], word: '鍛造', meaning: '把金屬燒紅，用力敲打做成器具。', example: '鐵匠＿＿出一把鋒利的菜刀。', img: 'blacksmith.png', options: ['鍛造', '鍛鍊', '奮戰', '維持'] },
      { id: 'v-鍛鍊', cloze: true, clozeOptions: ['鍛鍊', '偷懶', '放棄', '躺平'], word: '鍛鍊', meaning: '用很多練習讓身體或心變得更強。', example: '爬山可以＿＿我們的體力。', img: 'jogging.png', options: ['鍛鍊', '鍛造', '腐爛', '屢屢'] },
      { id: 'v-勇往直前', cloze: true, clozeOptions: ['勇往直前', '畏首畏尾', '半途而廢', '原地踏步'], word: '勇往直前', meaning: '不害怕，朝著目標衝過去。', example: '不管遇到什麼困難，我們都要＿＿＿＿。', img: 'sprint.png', options: ['勇往直前', '東山再起', '鍛鍊', '衝擊'] },
      { id: 'v-東山再起', cloze: true, clozeOptions: ['東山再起', '一蹶不振', '垂頭喪氣', '一敗塗地'], word: '東山再起', meaning: '失敗以後，重新振作，又成功了。', example: '這家餐廳關門後重新開張，終於＿＿＿＿。', img: 'shop-reopen.png', options: ['東山再起', '勇往直前', '屢屢', '即使'] }
    ],
    charwords: [
      { id: 'cw-維', char: '維', img: 'repair-bike.png', charMeaning: '保持；修好。', word: '維修', meaning: '把壞掉的東西修好。', example: '電梯正在＿＿，我們走樓梯吧。', options: ['維修', '戰爭', '拳頭', '症狀'] },
      { id: 'cw-戰', char: '戰', img: 'knight-toy.png', charMeaning: '打仗、比賽。', word: '戰爭', meaning: '國家或團體之間打仗。', example: '我們都希望世界沒有＿＿。', options: ['戰爭', '銅板', '招牌', '屢次'] },
      { id: 'cw-崎', char: '崎', img: 'rocky-path.png', charMeaning: '山路不平。', word: '崎嶇', meaning: '山路高高低低、很難走。', example: '這條＿＿的小路，要走好久。', options: ['崎嶇', '減法', '幼兒', '椰子'] },
      { id: 'cw-嶇', char: '嶇', img: 'rocky-path.png', charMeaning: '山路不平。', word: '崎嶇難行', meaning: '路高低不平，很難走。', example: '下過大雨，山路變得＿＿＿＿。', options: ['崎嶇難行', '立即', '豆腐', '衝刺'] },
      { id: 'cw-拳', char: '拳', img: 'fist.png', charMeaning: '握緊的手。', word: '拳頭', meaning: '五根手指握緊的手。', example: '他握緊＿＿，告訴自己要加油。', options: ['拳頭', '鍛造', '項鍊', '維修'] },
      { id: 'cw-癌', char: '癌', img: 'doctor-check.png', charMeaning: '一種很嚴重的病。', word: '癌細胞', meaning: '身體裡長得不正常、會傷害身體的小細胞。', example: '醫生用藥物消滅＿＿＿。', options: ['癌細胞', '戰爭', '拳頭', '銅板'] },
      { id: 'cw-症', char: '症', img: 'fever-kid.png', charMeaning: '生病時身體的樣子。', word: '症狀', meaning: '生病時身體出現的不舒服。', example: '發燒和咳嗽是感冒的＿＿。', options: ['症狀', '招牌', '屢次', '減法'] },
      { id: 'cw-銅', char: '銅', img: 'coins.png', charMeaning: '一種黃黃的金屬。', word: '銅板', meaning: '金屬做的零錢。', example: '我用三個＿＿買了一枝鉛筆。', options: ['銅板', '幼兒', '椰子', '立即'] },
      { id: 'cw-牌', char: '牌', img: 'shop-sign.png', charMeaning: '寫字的板子。', word: '招牌', meaning: '掛在店門口，寫著店名的板子。', example: '這家麵店的＿＿很顯眼。', options: ['招牌', '豆腐', '衝刺', '鍛造'] },
      { id: 'cw-屢', char: '屢', img: 'try-many.png', charMeaning: '一次又一次。', word: '屢次', meaning: '好幾次。', example: '他＿＿幫助同學，大家都很感謝他。', options: ['屢次', '項鍊', '維修', '戰爭'] },
      { id: 'cw-減', char: '減', img: 'math-minus.png', charMeaning: '變少；拿掉。', word: '減法', meaning: '把數字拿掉一些的算法。', example: '十減四是一題＿＿。', options: ['減法', '拳頭', '症狀', '銅板'] },
      { id: 'cw-予', char: '予', img: 'give-gift.png', charMeaning: '給。', word: '授予', meaning: '正式的交給、頒給。', example: '校長＿＿他一張獎狀。', options: ['授予', '招牌', '屢次', '幼兒'] },
      { id: 'cw-幼', char: '幼', img: 'toddler.png', charMeaning: '年紀小。', word: '幼兒', meaning: '年紀很小的孩子。', example: '這座公園有專給＿＿玩的溜滑梯。', options: ['幼兒', '椰子', '立即', '豆腐'] },
      { id: 'cw-椰', char: '椰', img: 'coconut.png', charMeaning: '一種海邊的樹。', word: '椰子樹', meaning: '長在海邊、又高又直的大樹。', example: '海灘上種了一排＿＿＿。', options: ['椰子樹', '衝刺', '鍛造', '項鍊'] },
      { id: 'cw-即', char: '即', img: 'run-now.png', charMeaning: '馬上。', word: '立即', meaning: '馬上、立刻。', example: '發生地震時，要＿＿躲到桌子下。', options: ['立即', '維修', '戰爭', '拳頭'] },
      { id: 'cw-腐', char: '腐', img: 'tofu.png', charMeaning: '壞掉；豆子做的軟食物。', word: '豆腐', meaning: '黃豆做成、白白軟軟的食物。', example: '晚餐有一盤麻婆＿＿。', options: ['豆腐', '症狀', '銅板', '招牌'] },
      { id: 'cw-衝', char: '衝', img: 'sprint.png', charMeaning: '用很大的力量往前。', word: '衝刺', meaning: '用盡全力往前跑。', example: '最後一百公尺，大家都在＿＿。', options: ['衝刺', '屢次', '減法', '幼兒'] },
      { id: 'cw-鍛', char: '鍛', img: 'blacksmith.png', charMeaning: '把金屬燒紅敲打。', word: '鍛造', meaning: '把金屬燒紅敲打，做成器具。', example: '這把鐵鎚是用鐵＿＿出來的。', options: ['鍛造', '椰子樹', '立即', '豆腐'] },
      { id: 'cw-鍊', char: '鍊', img: 'necklace.png', charMeaning: '金屬環連成的繩子；磨練。', word: '項鍊', meaning: '戴在脖子上的裝飾品。', example: '媽媽生日時，爸爸送她一條＿＿。', options: ['項鍊', '衝刺', '維修', '戰爭'] }
    ],
    /* 生字變成語：課本延伸成語，解釋和例句改成孩子聽得懂的話 */
    idioms: [
      { id: 'i-進退維谷', situationImg: 'id-stuck-bridge.png',
        anim: { bg: 'park', a: { kid: ['🧒', 50, 56, 12], dog: ['🐕', 86, 62, 11], mud: ['🟫', 14, 66, 12], q: ['❓', 50, 34, 9, 'h'] },
          s: [['小明走在一條窄窄的小路上。', [['bob', 'kid']]],
            ['前面有一隻大狗擋住，', [['shake', 'dog']]],
            ['後面是一大片爛泥巴。', [['wig', 'mud']]],
            ['往前不行，往後也不行，就是進退維谷。', [['in', 'q'], ['shake', 'kid']]]] },
        idiom: '進退維谷', char: '維', meaning: '往前也不行，往後也不行，不知道怎麼辦才好。', example: '一邊是朋友，一邊是規定，他覺得進退維谷。', situation: '前面有大狗擋路，後面是爛泥巴，小明不知道該往哪裡走。',
        fill: { options: ['答應了兩個朋友同一天去玩，他現在＿＿＿＿。', '他想去哪裡就去哪裡，一點也不＿＿＿＿。'], clue: '提示：哪一句是怎麼做都不行、很為難？', explain: '第一句用得對：兩邊都答應了，很為難。想去哪就去哪，就沒有為難。' } },
      { id: 'i-戰戰兢兢', situationImg: 'id-carry-cup.png',
        anim: { bg: 'room', a: { kid: ['🧒', 20, 62, 12], cup: ['🍵', 28, 48, 8], table: ['🪑', 80, 66, 12], sweat: ['💦', 14, 44, 7, 'h'] },
          s: [['弟弟要把一杯滿滿的熱茶端給爺爺。', [['bob', 'cup']]],
            ['他走得好慢好慢，', [['in', 'sweat'], ['mv', 'kid', [44, 62, 1200]], ['mv', 'cup', [52, 48, 1200]]]],
            ['眼睛一直盯著杯子，很怕打翻。', [['shake', 'cup']]],
            ['非常小心、怕出錯，就是戰戰兢兢。', [['mv', 'kid', [66, 62, 900]], ['mv', 'cup', [74, 48, 900]]]]] },
        idiom: '戰戰兢兢', char: '戰', meaning: '非常小心、很怕出錯的樣子。', example: '第一次上臺表演，她戰戰兢兢的拿著麥克風。', situation: '弟弟端著滿滿的熱茶，走得好慢，很怕打翻。',
        fill: { options: ['他＿＿＿＿的捧著奶奶的古董花瓶。', '他蹦蹦跳跳、隨隨便便，真是＿＿＿＿。'], clue: '提示：哪一句是非常小心的樣子？', explain: '第一句用得對：捧著古董花瓶要很小心。蹦蹦跳跳很隨便，剛好相反。' } },
      { id: 'i-赤手空拳', situationImg: 'id-bare-hands.png',
        anim: { bg: 'park', a: { kid: ['🧒', 30, 62, 12], hand: ['🙌', 30, 40, 10], box: ['📦', 70, 66, 12], seed: ['🌱', 70, 74, 8, 'h'], tree: ['🌳', 70, 56, 18, 'h'] },
          s: [['小華什麼工具都沒有，', [['shake', 'hand']]],
            ['只用兩隻手挖土、種下小樹苗。', [['in', 'seed'], ['mv', 'kid', [56, 62, 700]]]],
            ['每天照顧，小樹越長越大，', [['out', 'seed'], ['in', 'tree'], ['bob', 'tree']]],
            ['沒有任何依靠，也能做成事，就是赤手空拳。', [['jump', 'kid']]]] },
        idiom: '赤手空拳', char: '拳', meaning: '手裡什麼都沒有；比喻沒有任何依靠，靠自己打拚。', example: '爺爺年輕時赤手空拳到城市打拚，開了一家小店。', situation: '小華沒有工具，只用雙手種樹，每天照顧，小樹長大了。',
        fill: { options: ['他沒有錢也沒有人幫忙，＿＿＿＿開了一家麵包店。', '他有爸媽和很多朋友幫忙，算是＿＿＿＿。'], clue: '提示：哪一句是沒有任何依靠，只靠自己？', explain: '第一句用得對：沒錢也沒人幫，靠自己。有很多人幫忙，就不是赤手空拳。' } },
      { id: 'i-對症下藥', situationImg: 'id-right-medicine.png',
        anim: { bg: 'room', a: { doc: ['🧑‍⚕️', 26, 60, 13], kid: ['🤒', 70, 60, 12], look: ['🔍', 50, 40, 9, 'h'], med: ['💊', 50, 46, 8, 'h'], ok: ['😊', 70, 60, 12, 'h', 'as:kid'] },
          s: [['小美生病了，去看醫生。', [['shake', 'kid']]],
            ['醫生仔細檢查，找出生病的原因。', [['in', 'look'], ['wig', 'look']]],
            ['再開出適合她的藥。', [['out', 'look'], ['in', 'med'], ['mv', 'med', [66, 50, 700]]]],
            ['找出問題，用對方法解決，就是對症下藥。', [['out', 'med'], ['out', 'kid'], ['in', 'ok']]]] },
        idiom: '對症下藥', char: '症', meaning: '找出問題在哪裡，再用對的方法解決。', example: '老師找出他算錯的原因，對症下藥，他的數學就進步了。', situation: '醫生找出小美生病的原因，開出適合的藥。',
        fill: { options: ['找出成績變差的原因，再＿＿＿＿，就能進步。', '他不管什麼原因，隨便亂試，一點也不是＿＿＿＿。'], clue: '提示：哪一句是找出問題，再用對方法？', explain: '第一句用得對：先找原因再解決。隨便亂試，就不是對症下藥。' } },
      { id: 'i-扶老攜幼', situationImg: 'id-family-trip.png',
        anim: { bg: 'park', a: { old: ['👵', 20, 60, 12], mom: ['👩', 38, 60, 13], baby: ['👶', 56, 64, 9], flag: ['🎏', 86, 40, 12] },
          s: [['過年了，全家要一起出遊。', [['bob', 'flag']]],
            ['媽媽一手扶著奶奶，', [['mv', 'old', [28, 60, 500]]]],
            ['一手牽著小寶寶，', [['mv', 'baby', [48, 64, 500]]]],
            ['扶著老人、牽著小孩，大家一起出發，就是扶老攜幼。', [['mv', 'old', [56, 60, 1000]], ['mv', 'mom', [66, 60, 1000]], ['mv', 'baby', [76, 64, 1000]]]]] },
        idiom: '扶老攜幼', char: '幼', meaning: '扶著老人、牽著小孩；指一家大小一起出動。', example: '元宵節晚上，大家扶老攜幼去看花燈。', situation: '過年時，媽媽扶著奶奶、牽著小寶寶，全家一起出遊。',
        fill: { options: ['國慶煙火那晚，很多人＿＿＿＿到河邊觀賞。', '只有哥哥一個人去買東西，真是＿＿＿＿。'], clue: '提示：哪一句是一家大小一起出動？', explain: '第一句用得對：很多家庭帶著老人小孩一起去。只有一個人去，就不是扶老攜幼。' } },
      { id: 'i-一觸即發', situationImg: 'id-balloon-pop.png',
        anim: { bg: 'room', a: { bal: ['🎈', 50, 40, 18], pin: ['📌', 80, 40, 8], boom: ['💥', 50, 40, 16, 'h'], warn: ['⚠️', 50, 14, 9, 'h'] },
          s: [['一顆吹得好大好大的氣球。', [['grow', 'bal', 1.3]]],
            ['旁邊有一根尖尖的圖釘。', [['wig', 'pin'], ['in', 'warn']]],
            ['只要輕輕碰一下……', [['mv', 'pin', [62, 40, 900]]]],
            ['「砰！」碰一下就馬上爆開，就是一觸即發。', [['out', 'bal'], ['in', 'boom'], ['shake', 'boom']]]] },
        idiom: '一觸即發', char: '即', meaning: '輕輕一碰就馬上發生；形容情況非常緊張。', example: '兩隊比數很接近，場上的氣氛一觸即發。', situation: '吹得好大的氣球旁有一根圖釘，輕輕一碰就爆開。',
        fill: { options: ['兩隻狗互相瞪著，氣氛＿＿＿＿。', '大家都在安靜的睡午覺，氣氛＿＿＿＿。'], clue: '提示：哪一句是氣氛很緊張？', explain: '第一句用得對：兩隻狗互瞪很緊張。安靜睡午覺，一點都不緊張。' } }
    ],
    /* 改錯字：sentence 是正確的句子，畫面上會把 char 換成 wrong；options 的第一個是正確的字。clue 只說語詞的意思，不能出現正確的字。 */
    fix: [
      { id: 'fx-維', char: '維', wrong: '唯', sentence: '冷氣壞了，要請人來維修。', options: ['維', '唯', '堆'], clue: '這裡是說把壞掉的東西修好，想一想，哪一個字有糸字旁？', explain: '要改成「維」。修好東西是「維修」；「唯」是唯一的唯。' },
      { id: 'fx-戰', char: '戰', wrong: '獸', sentence: '球員們為了冠軍奮戰到最後。', options: ['戰', '獸', '單'], clue: '這裡是說用盡全力對抗，想一想，哪一個字的右邊是「戈」？', explain: '要改成「戰」。用盡全力對抗是「奮戰」；「獸」是野獸的獸。' },
      { id: 'fx-崎', char: '崎', wrong: '騎', sentence: '這條崎嶇的山路很難走。', options: ['崎', '騎', '奇'], clue: '這裡是說山路高低不平，想一想，哪一個字有山字旁？', explain: '要改成「崎」。山路不平是「崎嶇」；「騎」是騎馬的騎。' },
      { id: 'fx-嶇', char: '嶇', wrong: '驅', sentence: '路很崎嶇，大家要牽好手。', options: ['嶇', '驅', '區'], clue: '這裡是說路高低不平，想一想，哪一個字有山字旁？', explain: '要改成「嶇」。路不平是「崎嶇」；「驅」是驅趕的驅。' },
      { id: 'fx-拳', char: '拳', wrong: '券', sentence: '哥哥在學打拳擊。', options: ['拳', '券', '卷'], clue: '這裡說的是一種戴手套比賽的運動，想一想，哪一個字的下面是「手」？', explain: '要改成「拳」。那種運動是「拳擊」；「券」是禮券的券。' },
      { id: 'fx-癌', char: '癌', wrong: '瘤', sentence: '醫生正在研究治療癌症的新藥。', options: ['癌', '瘤', '疤'], clue: '這裡說的是一種很嚴重的病，想一想，哪一個字的裡面有三個「口」？', explain: '要改成「癌」。很嚴重的病是「癌症」。' },
      { id: 'fx-症', char: '症', wrong: '證', sentence: '流鼻水是感冒的症狀之一。', options: ['症', '證', '政'], clue: '這裡說的是生病時身體的樣子，想一想，哪一個字有病字旁？', explain: '要改成「症」。生病時的樣子是「症狀」；「證」是證明的證。' },
      { id: 'fx-銅', char: '銅', wrong: '洞', sentence: '口袋裡只剩下兩個銅板。', options: ['銅', '洞', '筒'], clue: '這裡說的是金屬做的零錢，想一想，哪一個字有金字旁？', explain: '要改成「銅」。零錢是「銅板」；「洞」是山洞的洞。' },
      { id: 'fx-牌', char: '牌', wrong: '碑', sentence: '這家店的招牌閃閃發亮。', options: ['牌', '碑', '啤'], clue: '這裡說的是掛在店門口的板子，想一想，哪一個字的左邊是「片」？', explain: '要改成「牌」。店門口的板子是「招牌」；「碑」是石碑的碑。' },
      { id: 'fx-屢', char: '屢', wrong: '樓', sentence: '他屢次得到全校第一名。', options: ['屢', '樓', '縷'], clue: '這裡是說好幾次，想一想，哪一個字的上面是「尸」？', explain: '要改成「屢」。好幾次是「屢次」；「樓」是樓梯的樓。' },
      { id: 'fx-減', char: '減', wrong: '喊', sentence: '多走路可以減少空氣汙染。', options: ['減', '喊', '感'], clue: '這裡是說變得更少，想一想，哪一個字有三點水？', explain: '要改成「減」。變少是「減少」；「喊」是大喊的喊。' },
      { id: 'fx-予', char: '予', wrong: '矛', sentence: '老師給予我們很多鼓勵。', options: ['予', '矛', '子'], clue: '這裡是說把東西交給別人，想一想，哪一個字比「矛」少一撇？', explain: '要改成「予」。交給別人是「給予」；「矛」是長矛的矛。' },
      { id: 'fx-幼', char: '幼', wrong: '幻', sentence: '妹妹在幼兒園學唱歌。', options: ['幼', '幻', '劫'], clue: '這裡說的是年紀很小的孩子讀的學校，想一想，哪一個字的右邊是「力」？', explain: '要改成「幼」。小孩子讀的是「幼兒園」；「幻」是幻想的幻。' },
      { id: 'fx-椰', char: '椰', wrong: '爺', sentence: '夏天喝一杯椰子水好清涼。', options: ['椰', '爺', '耶'], clue: '這裡說的是海邊大樹上的果實，想一想，哪一個字有木字旁？', explain: '要改成「椰」。那種果實是「椰子」；「爺」是爺爺的爺。' },
      { id: 'fx-即', char: '即', wrong: '既', sentence: '聽到火災警報，大家立即往外跑。', options: ['即', '既', '節'], clue: '這裡是說馬上，想一想，哪一個字的右邊是「卩」？', explain: '要改成「即」。馬上是「立即」；「既」是既然的既。' },
      { id: 'fx-腐', char: '腐', wrong: '府', sentence: '我最喜歡吃滷豆腐。', options: ['腐', '府', '俯'], clue: '這裡說的是黃豆做的白白軟軟的食物，想一想，哪一個字的下面是「肉」？', explain: '要改成「腐」。黃豆做的食物是「豆腐」；「府」是政府的府。' },
      { id: 'fx-衝', char: '衝', wrong: '衛', sentence: '比賽最後，他用力衝向終點。', options: ['衝', '衛', '衡'], clue: '這裡是說用盡全力往前跑，想一想，哪一個字的中間是「重」？', explain: '要改成「衝」。用全力往前跑是「衝」；「衛」是衛生的衛。' },
      { id: 'fx-鍛', char: '鍛', wrong: '緞', sentence: '工人用火燒鐵，再用力鍛造。', options: ['鍛', '緞', '段'], clue: '這裡是說把燒紅的金屬敲打成器具，想一想，哪一個字有金字旁？', explain: '要改成「鍛」。敲打金屬是「鍛造」；「緞」是綢緞的緞。' },
      { id: 'fx-鍊', char: '鍊', wrong: '練', sentence: '這條金項鍊是奶奶送的。', options: ['鍊', '練', '煉'], clue: '這裡說的是戴在脖子上的裝飾，想一想，哪一個字有金字旁？', explain: '要改成「鍊」。戴在脖子上的是「項鍊」；「練」是練習的練。' }
    ],
    similar: [
      { id: 's1', meaning: '「＿一」是只有這一個。', sentence: '他是班上＿一會彈琴的人。', frame: '＿一', options: ['唯', '維'], answer: '唯', clue: '提示：這個字的左邊是口字旁。', explain: '答案是「唯」；「維」是維修的維，有糸字旁。' },
      { id: 's2', meaning: '「遊＿」是好玩的活動。', sentence: '下課時，我們一起玩遊＿。', frame: '遊＿', options: ['戲', '戰'], answer: '戲', clue: '提示：這個字的左邊是「虛」。', explain: '答案是「戲」；「戰」是戰爭的戰。' },
      { id: 's3', meaning: '「＿車」是坐在腳踏車上踩著走。', sentence: '假日我們去河濱＿車。', frame: '＿車', options: ['騎', '崎'], answer: '騎', clue: '提示：以前坐在動物身上走，左邊是「馬」。', explain: '答案是「騎」；「崎」是崎嶇的崎，有山字旁。' },
      { id: 's4', meaning: '「地＿」是一塊一塊分好的地方。', sentence: '這個地＿常常下雨。', frame: '地＿', options: ['區', '嶇'], answer: '區', clue: '提示：這個字沒有偏旁。', explain: '答案是「區」；「嶇」是崎嶇的嶇，有山字旁。' },
      { id: 's5', meaning: '「禮＿」是可以拿來換東西的紙。', sentence: '我用禮＿換了一本書。', frame: '禮＿', options: ['券', '拳'], answer: '券', clue: '提示：這個字的下面是「刀」。', explain: '答案是「券」；「拳」是拳頭的拳，下面是「手」。' },
      { id: 's6', meaning: '「山＿」是山裡面空空的大窟窿。', sentence: '我們打著手電筒走進山＿。', frame: '山＿', options: ['洞', '銅'], answer: '洞', clue: '提示：這個字的左邊是三點水。', explain: '答案是「洞」；「銅」是銅板的銅，有金字旁。' },
      { id: 's7', meaning: '「＿氣」是一個人生氣、高興的個性。', sentence: '爺爺的＿氣很好，從來不生氣。', frame: '＿氣', options: ['脾', '牌'], answer: '脾', clue: '提示：這個字的左邊是肉字旁。', explain: '答案是「脾」；「牌」是招牌的牌。' },
      { id: 's8', meaning: '「＿梯」是讓人走上走下的臺階。', sentence: '我們走＿梯到三樓。', frame: '＿梯', options: ['樓', '屢'], answer: '樓', clue: '提示：這個字的左邊是木字旁。', explain: '答案是「樓」；「屢」是屢次的屢。' },
      { id: 's9', meaning: '「大＿」是用很大的聲音叫。', sentence: '他大＿一聲：「小心！」', frame: '大＿', options: ['喊', '減'], answer: '喊', clue: '提示：要用嘴巴，左邊是口字旁。', explain: '答案是「喊」；「減」是減少的減。' },
      { id: 's10', meaning: '「＿盾」是兩件事互相衝突、說不通。', sentence: '他說的話前後＿盾。', frame: '＿盾', options: ['矛', '予'], answer: '矛', clue: '提示：這個字比「予」多一撇。', explain: '答案是「矛」；「予」是給予的予。' },
      { id: 's11', meaning: '「＿想」是想像不是真的事。', sentence: '我常常＿想自己會飛。', frame: '＿想', options: ['幻', '幼'], answer: '幻', clue: '提示：這個字的右邊不是「力」。', explain: '答案是「幻」；「幼」是幼兒的幼。' },
      { id: 's12', meaning: '「＿誕節」是十二月二十五日的節日。', sentence: '＿誕節到了，到處都是閃亮的燈。', frame: '＿誕', options: ['耶', '椰'], answer: '耶', clue: '提示：這個字沒有木字旁。', explain: '答案是「耶」；「椰」是椰子的椰，有木字旁。' }
    ],
    listen: [
      { id: 'l1', text: '山路高高低低，很難走。', answer: 0, options: [{ text: '崎嶇', img: 'rocky-path.png' }, { text: '腐爛', img: 'rotten-banana.png' }, { text: '屢屢', img: 'try-many.png' }, { text: '減少', img: 'light-off.png' }] },
      { id: 'l2', text: '香蕉放太久，變黑發臭了。', answer: 0, options: [{ text: '腐爛', img: 'rotten-banana.png' }, { text: '崎嶇', img: 'rocky-path.png' }, { text: '給予', img: 'give-gift.png' }, { text: '維持', img: 'jogging.png' }] },
      { id: 'l3', text: '比賽得到第三名的獎章。', answer: 0, options: [{ text: '銅牌', img: 'bronze-medal.png' }, { text: '拳擊', img: 'boxing-glove.png' }, { text: '椰子', img: 'coconut.png' }, { text: '幼芽', img: 'sprout.png' }] },
      { id: 'l4', text: '春天到了，樹枝上冒出小小的嫩葉。', answer: 0, options: [{ text: '幼芽', img: 'sprout.png' }, { text: '椰子', img: 'coconut.png' }, { text: '銅牌', img: 'bronze-medal.png' }, { text: '癌症', img: 'doctor-check.png' }] },
      { id: 'l5', text: '一次又一次的遲到。', answer: 0, options: [{ text: '屢屢', img: 'try-many.png' }, { text: '即使', img: 'rain-race.png' }, { text: '維持', img: 'jogging.png' }, { text: '奮戰', img: 'firefighter-hose.png' }] },
      { id: 'l6', text: '失敗以後，他重新站起來，又成功了。', answer: 0, options: [{ text: '東山再起', img: 'shop-reopen.png' }, { text: '勇往直前', img: 'sprint.png' }, { text: '鍛鍊', img: 'jogging.png' }, { text: '衝擊', img: 'storm-farm.png' }] },
      { id: 'l7', text: '鐵匠把燒紅的鐵敲成一把刀。', answer: 0, options: [{ text: '鍛造', img: 'blacksmith.png' }, { text: '鍛鍊', img: 'jogging.png' }, { text: '奮戰', img: 'firefighter-hose.png' }, { text: '給予', img: 'give-gift.png' }] },
      { id: 'l8', text: '消防員和大火對抗了一整夜。', answer: 0, options: [{ text: '奮戰', img: 'firefighter-hose.png' }, { text: '維持', img: 'jogging.png' }, { text: '減少', img: 'light-off.png' }, { text: '腐爛', img: 'rotten-banana.png' }] }
    ],
    /* ---------- 短語、句型、修辭（句子都是 Claude 自己寫的） ---------- */
    phrase: {
      /* 拼短語每一格下面寫要放什麼樣的詞 */
      fillLabels: { before: '做出', answer: '怎麼樣', noun: '什麼東西' },
      pickName: '看圖選一選', pickSay: '看圖，選出最適合的詞，說說看做出了什麼樣的東西。',
      /* 短語：動詞＋出＋形容詞＋的＋名詞（課本的例子是課文原句，這裡換成自己寫的） */
      intro: { example: '練出強壯的身體', img: 'pr-strong-body.png',
        parts: [{ text: '練出', role: '做出' }, { text: '強壯', role: '怎麼樣' }, { text: '的' }, { text: '身體', role: '什麼東西' }],
        explain: '先說做了什麼，加上「出」，再說出東西的樣子，加上「的」，最後說是什麼東西。' },
      pick: [
        { id: 'ph1', img: 'pr-paint-bright.png', before: '畫出', noun: '彩虹', ask: '畫出什麼樣的彩虹', look: '再看看圖片，彩虹有幾種顏色？', options: ['美麗', '灰暗', '冰冷', '粗糙'], clue: '提示：七種顏色排在一起，大家都說好好看。', explain: '答案是「美麗」，完整的短語是「畫出美麗的彩虹」。' },
        { id: 'ph2', img: 'pr-bake-bread.png', before: '烤出', noun: '麵包', ask: '烤出什麼樣的麵包', look: '再看看圖片，麵包聞起來怎麼樣？', options: ['香噴噴', '臭兮兮', '冷冰冰', '溼答答'], clue: '提示：還沒進門，就聞到好棒的味道。', explain: '答案是「香噴噴」，完整的短語是「烤出香噴噴的麵包」。' },
        { id: 'ph3', img: 'pr-sing-song.png', before: '唱出', noun: '歌聲', ask: '唱出什麼樣的歌聲', look: '再看看圖片，大家聽了表情怎麼樣？', options: ['動聽', '刺耳', '沙啞', '吵鬧'], clue: '提示：大家閉著眼睛微笑，好陶醉。', explain: '答案是「動聽」，完整的短語是「唱出動聽的歌聲」。' },
        { id: 'ph4', img: 'pr-build-house.png', before: '蓋出', noun: '房子', ask: '蓋出什麼樣的房子', look: '再看看圖片，大風吹來房子會不會倒？', options: ['堅固', '脆弱', '破爛', '歪斜'], clue: '提示：颱風來了也穩穩的，一點都不晃。', explain: '答案是「堅固」，完整的短語是「蓋出堅固的房子」。' },
        { id: 'ph5', img: 'pr-write-story.png', before: '寫出', noun: '故事', ask: '寫出什麼樣的故事', look: '再看看圖片，讀故事的人有沒有流眼淚？', options: ['感人', '無聊', '可怕', '吵鬧'], clue: '提示：讀完以後，大家都紅了眼眶。', explain: '答案是「感人」，完整的短語是「寫出感人的故事」。' },
        { id: 'ph6', img: 'pr-cook-soup.png', before: '煮出', noun: '湯', ask: '煮出什麼樣的湯', look: '再看看圖片，湯喝起來怎麼樣？', options: ['鮮美', '苦澀', '冰冷', '粗糙'], clue: '提示：喝一口，嘴巴裡都是海產的好味道。', explain: '答案是「鮮美」，完整的短語是「煮出鮮美的湯」。' },
        { id: 'ph7', img: 'pr-grow-flower.png', before: '種出', noun: '花朵', ask: '種出什麼樣的花朵', look: '再看看圖片，花開得怎麼樣？', options: ['鮮豔', '枯黃', '灰暗', '冰冷'], clue: '提示：紅通通的，遠遠就看得到。', explain: '答案是「鮮豔」，完整的短語是「種出鮮豔的花朵」。' },
        { id: 'ph8', img: 'pr-make-kite.png', before: '做出', noun: '風箏', ask: '做出什麼樣的風箏', look: '再看看圖片，風箏跟小朋友比起來大不大？', options: ['巨大', '迷你', '冰冷', '苦澀'], clue: '提示：要三個小朋友一起才抬得動。', explain: '答案是「巨大」，完整的短語是「做出巨大的風箏」。' }
      ],
      say: [],
      words: [
        { word: '勇往直前', meaning: '不害怕，朝著目標衝過去。', img: 'sprint.png' },
        { word: '東山再起', meaning: '失敗以後，重新振作，又成功了。', img: 'shop-reopen.png' },
        { word: '屢屢', meaning: '一次又一次，常常。', img: 'try-many.png' },
        { word: '衝擊', meaning: '很大的影響，像被重重撞了一下。', img: 'storm-farm.png' }
      ],
      choose: [
        { id: 'pw1', word: '勇往直前', options: ['遇到困難，我們要勇往直前，不要退縮。', '他一看到困難就躲起來，真是勇往直前。'], clue: '提示：想一想，「勇往直前」是不怕，還是躲起來？', explain: '第一句用得對：不怕困難、往前走。躲起來，剛好相反。' },
        { id: 'pw2', word: '東山再起', options: ['球隊去年輸了，今年努力練習，終於東山再起。', '他一直都是第一名，從來沒輸過，真是東山再起。'], clue: '提示：想一想，「東山再起」是失敗以後再成功嗎？', explain: '第一句用得對：輸了以後又贏回來。從來沒輸過，就不是東山再起。' },
        { id: 'pw3', word: '屢屢', options: ['他屢屢忘記帶作業，被老師提醒好幾次。', '他屢屢只做了一次。'], clue: '提示：想一想，「屢屢」是很多次，還是一次？', explain: '第一句用得對：好幾次忘記帶作業。只做一次，不能說屢屢。' },
        { id: 'pw4', word: '衝擊', options: ['停電帶給醫院很大的衝擊。', '吃了一顆糖，帶給我很大的衝擊。'], clue: '提示：想一想，「衝擊」是很大的影響，還是很小的事？', explain: '第一句用得對：停電對醫院影響很大。吃一顆糖是小事。' }
      ],
      make: [
        { id: 'pm1', word: '勇往直前', clue: '提示：想想看，你有什麼目標要勇敢去做？', model: '為了跑完全程，我勇往直前，不停下腳步。' },
        { id: 'pm2', word: '東山再起', clue: '提示：想想看，誰失敗過又重新成功？', model: '那位選手受傷後努力復健，終於東山再起。' },
        { id: 'pm3', word: '屢屢', clue: '提示：想想看，有什麼事一次又一次的發生？', model: '弟弟屢屢把玩具弄丟，媽媽好頭痛。' },
        { id: 'pm4', word: '衝擊', clue: '提示：想想看，什麼事帶來很大的影響？', model: '大地震對這座城市造成很大的衝擊。' }
      ]
    },
    pattern: [
      { key: 'shenzhi', id: 'sz', title: '……甚至……', img: 'shenzhi.png',
        meaning: '先說一件事，再用「甚至」說出程度更進一步、更讓人想不到的事。',
        examples: ['他很喜歡看書，甚至吃飯時也拿著書。'],
        match: [
          { id: 'pt-sz-m1', img: 'pt-cold-day.png', front: '今天好冷，', options: ['甚至下起雪來了。', '甚至很熱。', '甚至出太陽。'], clue: '提示：看看圖片，天氣冷到什麼程度？', explain: '答案是「甚至下起雪來了」：冷到下雪，程度更進一步。' },
          { id: 'pt-sz-m2', img: 'pt-love-dog.png', front: '妹妹很喜歡小狗，', options: ['甚至晚上抱著牠睡。', '甚至很怕狗。', '甚至不理小狗。'], clue: '提示：看看圖片，妹妹喜歡到什麼程度？', explain: '答案是「甚至晚上抱著牠睡」：喜歡到抱著睡。' },
          { id: 'pt-sz-m3', img: 'pt-busy-dad.png', front: '爸爸工作很忙，', options: ['甚至週末也要加班。', '甚至很閒。', '甚至每天都休息。'], clue: '提示：看看圖片，爸爸週末在做什麼？', explain: '答案是「甚至週末也要加班」：忙到週末也工作。' }
        ],
        conj: [
          { id: 'pt-sz-c1', full: '這題很難，甚至老師也想了很久。', img: 'pt-hard-q.png', sentence: '這題很難，＿＿老師也想了很久。', options: ['……甚至……', '如果……就……', '雖然……但……'], clue: '提示：難到連老師也要想很久，程度更進一步。數數看有幾個空格。', explain: '答案是「……甚至……」：這題很難，甚至老師也想了很久。' },
          { id: 'pt-sz-c2', full: '他的歌唱得很好，甚至得到了全國冠軍。', img: 'pt-sing-win.png', sentence: '他的歌唱得很好，＿＿得到了全國冠軍。', options: ['……甚至……', '如果……就……', '雖然……但……'], clue: '提示：唱得好到得冠軍。數數看有幾個空格。', explain: '答案是「……甚至……」：他的歌唱得很好，甚至得到了全國冠軍。' }
        ],
        half: [
          { id: 'pt-sz-h1', front: '弟弟很愛吃冰淇淋，', clue: '提示：愛吃到什麼程度？記得要說「甚至」。', model: '甚至冬天也要吃。' },
          { id: 'pt-sz-h2', front: '這場雨下得很大，', clue: '提示：雨大到發生什麼事？記得要說「甚至」。', model: '甚至淹到路面。' }
        ],
        whole: [
          { id: 'pt-sz-w1', clue: '提示：先說一件事，再用「甚至」說更進一步的事。想想看：有什麼事程度很誇張？', model: '他很怕黑，甚至睡覺都要開著燈。' }
        ] },
      { key: 'ruguojiu', id: 'rj', title: '如果……就……', img: 'ruguojiu.png',
        meaning: '先用「如果」說一種假設的情況，再用「就」說出這種情況會有的結果。',
        examples: ['如果明天放晴，我們就去爬山。'],
        match: [
          { id: 'pt-rj-m1', img: 'pt-sunny-picnic.png', front: '如果明天天氣好，', options: ['我們就去野餐。', '我們就不出門。', '我們就淋雨。'], clue: '提示：看看圖片，天氣好適合做什麼？', explain: '答案是「我們就去野餐」：天氣好是假設，去野餐是結果。' },
          { id: 'pt-rj-m2', img: 'pt-no-water.png', front: '如果植物沒有水，', options: ['就會慢慢枯死。', '就會長得更高。', '就會開更多花。'], clue: '提示：看看圖片，沒有水的植物會怎麼樣？', explain: '答案是「就會慢慢枯死」：沒有水是假設，枯死是結果。' },
          { id: 'pt-rj-m3', img: 'pt-practice-more.png', front: '如果你每天練習，', options: ['就會越來越進步。', '就會越來越退步。', '就會忘光光。'], clue: '提示：看看圖片，每天練習會怎麼樣？', explain: '答案是「就會越來越進步」：每天練習，就會進步。' }
        ],
        conj: [
          { id: 'pt-rj-c1', full: '如果大家都不亂丟垃圾，街道就會很乾淨。', img: 'pt-clean-street.png', sentence: '＿＿大家都不亂丟垃圾，街道＿會很乾淨。', options: ['如果……就……', '……甚至……', '雖然……但……'], clue: '提示：前面是假設，後面是結果。數數看有幾個空格。', explain: '答案是「如果……就……」：如果大家都不亂丟垃圾，街道就會很乾淨。' },
          { id: 'pt-rj-c2', full: '如果遇到困難，我就向老師請教。', img: 'pt-ask-teacher.png', sentence: '＿＿遇到困難，我＿向老師請教。', options: ['如果……就……', '……甚至……', '雖然……但……'], clue: '提示：先假設遇到困難，再說怎麼做。數數看有幾個空格。', explain: '答案是「如果……就……」：如果遇到困難，我就向老師請教。' }
        ],
        half: [
          { id: 'pt-rj-h1', front: '如果我有一隻小狗，', clue: '提示：有小狗的話，你會做什麼？記得要說「就」。', model: '我就每天帶牠去散步。' },
          { id: 'pt-rj-h2', front: '如果考試考不好，', clue: '提示：考不好的話，你會怎麼做？記得要說「就」。', model: '我就把錯的地方再練習一次。' }
        ],
        whole: [
          { id: 'pt-rj-w1', clue: '提示：先用「如果」說一個假設，再用「就」說結果。想想看：如果發生一件事，會怎麼樣？', model: '如果明天放假，我就去圖書館看書。' }
        ] }
    ],
    rhetoric: {
      cards: [
        { key: 'question', name: '設問', meaning: '用問句來說話，引起大家注意。有時自己問、自己回答；有時只問不答，答案就藏在問題裡。', example: '課文一開始連問了三個問題，每個都給兩個選擇，讓我們先想想自己會怎麼做。',
          show: { sentence: '遇到下雨天，你會待在家裡，還是撐傘出門？' },
          yesno: [
            { id: 'rh-qu-y1', sentence: '你會選擇放棄，還是再試一次？', answer: true, clue: '提示：這句話有沒有用問題讓人想一想？', explain: '是設問：用問題讓讀者想一想自己會怎麼選。' },
            { id: 'rh-qu-y2', sentence: '我選擇再試一次。', answer: false, clue: '提示：這句話裡有沒有問題？', explain: '不是設問：這句話沒有用問句。' }
          ],
          pick: [
            { id: 'rh-qu-p1', options: ['失敗了，你會哭，還是會笑？', '失敗了也沒關係。'], clue: '提示：哪一句用問題來說話？', explain: '「你會哭，還是會笑」是設問。' },
            { id: 'rh-qu-p2', options: ['什麼是成功？就是不放棄的人。', '他成功了。'], clue: '提示：哪一句先問再答？', explain: '先問「什麼是成功」，再自己回答，是設問。' },
            { id: 'rh-qu-p3', options: ['誰沒有失敗過呢？', '他失敗了一次。', '比賽結束了。'], clue: '提示：哪一句用問題來說話，答案藏在問題裡？', explain: '「誰沒有失敗過呢」是設問：每個人都失敗過。' },
            { id: 'rh-qu-p4', options: ['仙人掌為什麼不怕熱？因為它會存水。', '仙人掌長在沙漠。', '沙漠很熱。'], clue: '提示：哪一句先問「為什麼」，再自己回答？', explain: '先問再答，是設問。' },
            { id: 'rh-qu-p5', options: ['你想當一棵小草，還是一棵大樹？', '大樹很高。', '小草很矮。', '樹下很涼。'], clue: '提示：哪一句用問題讓人想一想？', explain: '用問題讓人想一想，是設問。' },
            { id: 'rh-qu-p6', options: ['還有什麼比堅持更重要呢？', '堅持很重要。', '他一直練習。', '他很努力。'], clue: '提示：哪一句用問題來說話，答案藏在問題裡？', explain: '答案藏在問題裡：堅持最重要，是設問。' }
          ] },
        { key: 'parallel', name: '排比', meaning: '把三句或三句以上樣子差不多的話，一句接一句排在一起說，讀起來很有節奏，也很有氣勢。', example: '課文一口氣用三個「你會……，還是……？」，問題一個接一個，很有力量。',
          show: { sentence: '跌倒了，要站起來；失敗了，要再試試；難過了，要笑一笑。', mark: ['要站起來', '要再試試', '要笑一笑'] },
          yesno: [
            { id: 'rh-pa-y1', sentence: '仙人掌會存水，落葉樹會落葉，椰子會漂流。', answer: true, mark: ['仙人掌會存水', '落葉樹會落葉', '椰子會漂流'], clue: '提示：有沒有三句樣子差不多的話排在一起？', explain: '是排比：三句「……會……」排在一起。' },
            { id: 'rh-pa-y2', sentence: '仙人掌會存水。', answer: false, clue: '提示：有沒有三句樣子差不多的話排在一起？', explain: '不是排比：只有一句話。' }
          ],
          pick: [
            { id: 'rh-pa-p1', mark: ['不怕冷', '不怕熱', '不怕累'], options: ['他不怕冷，不怕熱，不怕累。', '他很勇敢。'], clue: '提示：哪一句一口氣說了三個「不怕……」？', explain: '三個「不怕……」排在一起，是排比。' },
            { id: 'rh-pa-p2', mark: ['要勇敢', '要堅持', '要相信自己'], options: ['遇到挫折，要勇敢，要堅持，要相信自己。', '遇到挫折要努力。'], clue: '提示：哪一句有三個「要……」？', explain: '三個「要……」排在一起，是排比。' },
            { id: 'rh-pa-p3', mark: ['他練跑步', '他練跳遠', '他練游泳'], options: ['他練跑步，他練跳遠，他練游泳。', '他很愛運動。', '他是選手。'], clue: '提示：哪一句有三句樣子差不多的話？', explain: '三個「他練……」排在一起，是排比。' },
            { id: 'rh-pa-p4', mark: ['風吹不倒', '雨打不倒', '雪壓不倒'], options: ['小草風吹不倒，雨打不倒，雪壓不倒。', '小草很堅強。', '外面在颳風。'], clue: '提示：哪一句一口氣說了三個「……不倒」？', explain: '三個「……不倒」排在一起，是排比。' },
            { id: 'rh-pa-p5', mark: ['有的在哭', '有的在笑', '有的在加油'], options: ['比賽結束，有的在哭，有的在笑，有的在加油。', '比賽結束了。', '大家都很累。', '觀眾像海浪。'], clue: '提示：哪一句有三個「有的……」？', explain: '三個「有的……」排在一起，是排比。' },
            { id: 'rh-pa-p6', mark: ['挫折讓我長大', '挫折讓我堅強', '挫折讓我勇敢'], options: ['挫折讓我長大，挫折讓我堅強，挫折讓我勇敢。', '我遇到挫折。', '挫折很難受。', '我不怕挫折。'], clue: '提示：哪一句有三個「挫折讓我……」？', explain: '三個「挫折讓我……」排在一起，是排比。' }
          ] }
      ],
      quiz: [
        { id: 'rh1', sentence: '你要當一個逃避的人，還是一個勇敢的人？', answer: '設問', clue: '提示：這句話有沒有用問題讓人想一想？', explain: '答案是「設問」：用問題讓讀者想一想。' },
        { id: 'rh2', sentence: '為什麼要運動？因為運動讓身體健康。', answer: '設問', clue: '提示：這句話是不是先問再答？', explain: '答案是「設問」：先問再自己回答。' },
        { id: 'rh3', sentence: '我愛春天的花，我愛夏天的海，我愛冬天的雪。', answer: '排比', mark: ['我愛春天的花', '我愛夏天的海', '我愛冬天的雪'], clue: '提示：有沒有三句樣子差不多的話？', explain: '答案是「排比」：三個「我愛……」排在一起。' },
        { id: 'rh4', sentence: '他努力讀書，努力運動，努力幫助別人。', answer: '排比', mark: ['努力讀書', '努力運動', '努力幫助別人'], clue: '提示：有沒有三個樣子差不多的句子？', explain: '答案是「排比」：三個「努力……」排在一起。' }
      ]
    }
  };
  if (typeof module === 'object' && module.exports) module.exports = d;
  else { root.H3A_WORDS = root.H3A_WORDS || {}; root.H3A_WORDS.L09 = d; }
})(this);
