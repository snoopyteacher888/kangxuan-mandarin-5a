/* 第 8 課字詞練習（公開、不加密）。句子和解釋都是 Claude 自己寫的，沒有課本原文。
   生字、語詞：options 的第一個是正確答案（作答時會打亂）。 */
(function (root) {
  var d = {
    /* 理解提問的分類（照課本「閱讀理解提問」）：extract 提取訊息、infer 推論訊息、interpret 詮釋整合、evaluate 比較評估。只放題號，不放課文 */
    quizLevels: { qa: 'extract', qb: 'extract', qc: 'extract', qd: 'extract', qe: 'infer', qf: 'infer', qg: 'interpret', qh: 'interpret',
      qi: 'evaluate', qj: 'evaluate', k1: 'interpret', k2: 'evaluate' },
    /* 詮釋整合、比較評估的鷹架：think 是「想一想」的兩個步驟（不說答案），why 是「老師教你」的說明。不放課文原句 */
    quizHelp: {
      qg: { think: ['她說要拿起什麼東西，當作對抗壞人的工具？', '孩子、老師、書和筆加起來，是在說什麼？'], why: '她說書和筆才是最強的武器，孩子和老師加上書和筆，就是「教育」。她想告訴大家：讓每個人都能讀書，就能改變世界。' },
      qh: { think: ['作者先問「什麼是勇敢」，讀的人會不會停下來想一想？', '不知道害怕的人，是真的勇敢嗎？'], why: '作者用問句讓我們先自己想一想。接著告訴我們：什麼都不怕，有可能只是不懂危險；真正的勇敢，是心裡害怕卻還是願意去做對的事。' },
      qi: { think: ['她被攻擊以前、以後，心裡會不會怕？', '她害怕的時候，還是做了什麼事？'], why: '真正的勇敢不是完全不怕。她心裡可能也很害怕，卻還是站出來為沒機會讀書的女孩說話。害怕還願意為對的事前進，才是真正的勇敢。' },
      qj: { think: ['被不公平對待時，你可以找誰幫忙？', '你可以用什麼好方法，讓別人知道這樣不對？'], why: '遇到不公平，可以勇敢說出來、請大人幫忙，或用講道理的方式讓別人了解。不要用打人或罵人的方法，也不要只是默默忍耐。' }
    },
    /* 「說說看」改成選選看：good 兩個合理的想法（選哪一個都對）、bad 兩個不合理的，why 是老師教你的說明。不放課文原句 */
    talkChoices: {
      k1: { good: ['我會好好珍惜上學的機會，認真讀書。', '我會把看完的書捐出去，讓更多小朋友可以讀。'], bad: ['讀書好麻煩，不能上學也沒關係。', '我要把別人的書藏起來。'], why: '題目問的是讀完這課，你可以怎麼做。珍惜上學、分享書本，都是在支持「每個人都能讀書」。覺得不上學沒關係、藏別人的書，都不對。' },
      k2: { good: ['我會勇敢的告訴大家，男生女生都一樣重要。', '我會請老師和爸媽幫忙，一起想辦法。'], bad: ['我會去打那個人。', '我只會躲起來哭，什麼都不說。'], why: '遇到不公平的對待，可以勇敢說出來，或請大人幫忙。打人會讓事情更糟；只是躲起來，問題也不會解決。' }
    },
    hanzi: [
      { id: 'h-坦', combo: { layout: 'lr', parts: [['土', 'm', '土地'], ['旦', 's', '']] }, char: '坦', zhuyin: 'ㄊㄢˇ', radical: '土', strokes: 8, words: ['巴基斯坦', '平坦'], say: '坦，平坦的坦', cloze: '平＿', img: 'flat-road.png', options: ['坦', '但', '旦', '袒'], clue: '這個字的左邊是土字旁。', explain: '答案是「坦」，左邊是土字旁；「但」的左邊是單人旁，「袒」的左邊是衣字旁。', parts: ['土', '旦'], story: '左邊是土地，右邊的「旦」念起來像「坦」。土地平平的、沒有高低，就是「平坦」。', sentence: '這條腳踏車道又寬又平坦。', build: { layout: 'lr', show: ['？', '旦'], answer: '土', options: ['土', '亻', '扌', '衤'], clue: '想一想：平平的地面，左邊放哪一個？' } },
      { id: 'h-性', combo: { layout: 'lr', parts: [['忄', 'm', '心'], ['生', 's', '']] }, char: '性', zhuyin: 'ㄒㄧㄥˋ', radical: '心', strokes: 8, words: ['女性', '個性'], say: '性，個性的性', cloze: '個＿', img: 'kids-diff.png', options: ['性', '姓', '星', '牲'], clue: '這個字的左邊是豎心旁。', explain: '答案是「性」，左邊是豎心旁；「姓」的左邊是女字旁，「牲」的左邊是牛字旁。', parts: ['忄', '生'], story: '左邊是心，右邊是「生」。一個人生下來就有的心思和脾氣，就是「個性」。', sentence: '妹妹的個性很活潑。', build: { layout: 'lr', show: ['？', '生'], answer: '忄', options: ['忄', '女', '牛', '日'], clue: '想一想：脾氣、想法和哪裡有關？' } },
      { id: 'h-恐', combo: { layout: 'tb', parts: [['巩', 's', ''], ['心', 'm', '心']] }, char: '恐', zhuyin: 'ㄎㄨㄥˇ', radical: '心', strokes: 10, words: ['恐怖', '恐龍'], say: '恐，恐龍的恐', cloze: '＿龍', img: 'dinosaur.png', options: ['恐', '怒', '思', '怨'], clue: '這個字的下面是「心」，上面是「巩」。', explain: '答案是「恐」，上面是「巩」；「怒」的上面是「奴」，「思」的上面是「田」。', parts: ['巩', '心'], story: '上面的「巩」念起來像「恐」，下面是心。心裡很怕，就是「恐」；以前住在地球上的巨大爬蟲，叫「恐龍」。', sentence: '博物館裡有一副好大的恐龍骨頭。', build: { layout: 'tb', show: ['巩', '？'], answer: '心', options: ['心', '木', '土', '手'], clue: '想一想：害怕是一種感覺，下面放哪一個？' } },
      { id: 'h-怖', combo: { layout: 'lr', parts: [['忄', 'm', '心'], ['布', 's', '']] }, char: '怖', zhuyin: 'ㄅㄨˋ', radical: '心', strokes: 8, words: ['恐怖', '可怖'], say: '怖，恐怖的怖', cloze: '恐＿', img: 'haunted-house.png', options: ['怖', '佈', '布', '希'], clue: '這個字的左邊是豎心旁，右邊是「布」。', explain: '答案是「怖」；「佈」的左邊是單人旁，「布」沒有偏旁。', parts: ['忄', '布'], story: '左邊是心，右邊的「布」念起來像「怖」。心裡非常害怕，就是「恐怖」。', sentence: '這部電影太恐怖了，我不敢看。', build: { layout: 'lr', show: ['？', '布'], answer: '忄', options: ['忄', '亻', '扌', '木'], clue: '想一想：害怕是一種心情，左邊放哪一個？' } },
      { id: 'h-組', combo: { layout: 'lr', parts: [['糸', 'm', '絲線'], ['且', 's', '']] }, char: '組', zhuyin: 'ㄗㄨˇ', radical: '糸', strokes: 11, words: ['組織', '小組'], say: '組，小組的組', cloze: '小＿', img: 'group-work.png', options: ['組', '祖', '租', '阻'], clue: '這個字的左邊是糸字旁。', explain: '答案是「組」，左邊是糸字旁；「祖」的左邊是示字旁，「租」的左邊是禾字旁。', parts: ['糸', '且'], story: '左邊的「糸」是絲線，右邊的「且」念起來有點像「組」。用線把東西綁在一起，就是「組」；幾個人在一起做事，叫「小組」。', sentence: '我們這一小組要一起完成海報。', build: { layout: 'lr', show: ['？', '且'], answer: '糸', options: ['糸', '示', '禾', '阝'], clue: '想一想：用線把東西綁在一起，左邊放哪一個？' } },
      { id: 'h-占', combo: { type: '會意字', pict: '上面的「卜」是古人燒龜殼看裂紋，下面的「口」是說出來。看裂紋、說出好壞，就是「占卜」；後來也借來當「拿走、佔有」的意思。' }, char: '占', zhuyin: 'ㄓㄢˋ', radical: '卜', strokes: 5, words: ['霸占', '占領'], say: '占，占領的占', cloze: '＿領', img: 'flag-hill.png', options: ['占', '古', '卡', '由'], clue: '這個字的上面是「卜」，下面是「口」。', explain: '答案是「占」；「古」的上面是「十」，「卡」的中間是一橫。', parts: ['卜', '口'], story: '上面是「卜」，下面是「口」。搶先站上一塊地方，說這是我的，就是「占領」。', sentence: '小狗占領了整張沙發。' },
      { id: 'h-播', combo: { layout: 'lr', parts: [['扌', 'm', '手'], ['番', 's', '']] }, char: '播', zhuyin: 'ㄅㄛ', radical: '手', strokes: 15, words: ['廣播', '播種'], say: '播，廣播的播', cloze: '廣＿', img: 'radio-mic.png', options: ['播', '番', '翻', '蕃'], clue: '這個字的左邊是提手旁。', explain: '答案是「播」，左邊是提手旁；「翻」的右邊是「羽」，「蕃」的上面是草字頭。', parts: ['扌', '番'], story: '左邊是手，右邊的「番」念起來像「播」。用手把種子撒出去，就是「播種」；把聲音傳到很遠的地方，叫「廣播」。', sentence: '學校廣播請大家到操場集合。', build: { layout: 'lr', show: ['？', '番'], answer: '扌', options: ['扌', '羽', '艹', '木'], clue: '想一想：撒種子要用身體的哪個部分？' } },
      { id: 'h-控', combo: { layout: 'lr', parts: [['扌', 'm', '手'], ['空', 's', '']] }, char: '控', zhuyin: 'ㄎㄨㄥˋ', radical: '手', strokes: 11, words: ['控制', '遙控'], say: '控，遙控的控', cloze: '遙＿', img: 'remote-car.png', options: ['控', '空', '腔', '倥'], clue: '這個字的左邊是提手旁，右邊是「空」。', explain: '答案是「控」；「空」沒有偏旁，「腔」的左邊是肉字旁。', parts: ['扌', '空'], story: '左邊是手，右邊的「空」念起來像「控」。用手管住、讓東西照自己的意思動，就是「控制」；離得很遠也能控制，叫「遙控」。', sentence: '弟弟用遙控器讓小汽車轉彎。', build: { layout: 'lr', show: ['？', '空'], answer: '扌', options: ['扌', '月', '亻', '氵'], clue: '想一想：按遙控器要用身體的哪個部分？' } },
      { id: 'h-制', combo: { type: '會意字', pict: '右邊是立刀旁，左邊像一棵長了很多枝條的樹。用刀把多出來的樹枝修掉，管住它怎麼長，就是「制」。' }, char: '制', zhuyin: 'ㄓˋ', radical: '刀', strokes: 8, words: ['控制', '制服'], say: '制，制服的制', cloze: '＿服', img: 'uniform.png', options: ['制', '製', '刺', '剃'], clue: '這個字的右邊是立刀旁，下面沒有「衣」。', explain: '答案是「制」；「製」的下面多了「衣」，「刺」的左邊是「朿」。', parts: ['𠂒', '刂'], story: '右邊是刀，左邊像長滿枝條的樹。用刀修剪樹枝，讓它照規定長，就是「制」；學校規定大家穿的衣服，叫「制服」。', sentence: '星期一大家都要穿制服。' },
      { id: 'h-傷', combo: { type: '形聲字', pict: '左邊的單人旁是人，右邊念起來像「傷」。人被弄痛、弄破，就是「傷」。' }, char: '傷', zhuyin: 'ㄕㄤ', radical: '人', strokes: 13, words: ['受傷', '傷心'], say: '傷，傷心的傷', cloze: '＿心', img: 'sad-cry.png', options: ['傷', '場', '湯', '楊'], clue: '這個字的左邊是單人旁。', explain: '答案是「傷」，左邊是單人旁；「場」的左邊是土字旁，「湯」的左邊是三點水。', parts: ['亻', '𥏻'], story: '左邊是人，右邊念起來像「傷」。人被弄痛了是「受傷」；心裡很難過，叫「傷心」。', sentence: '小鳥飛走了，妹妹好傷心。' },
      { id: 'h-攻', combo: { layout: 'lr', parts: [['工', 's', ''], ['攵', 'm', '手拿東西']] }, char: '攻', zhuyin: 'ㄍㄨㄥ', radical: '攴', strokes: 7, words: ['攻擊', '進攻'], say: '攻，進攻的攻', cloze: '進＿', img: 'soccer-attack.png', options: ['攻', '功', '江', '紅'], clue: '這個字的右邊是反文旁。', explain: '答案是「攻」，右邊是反文旁；「功」的右邊是「力」，「江」的左邊是三點水。', parts: ['工', '攵'], story: '左邊的「工」念起來像「攻」，右邊的反文旁像手拿著棍子。拿著東西衝過去打，就是「進攻」。', sentence: '我們這一隊開始進攻，一下子就踢進一球。', build: { layout: 'lr', show: ['工', '？'], answer: '攵', options: ['攵', '力', '氵', '糸'], clue: '想一想：「功」的右邊是力，這個字右邊是像手拿東西的哪一個？' } },
      { id: 'h-擊', combo: { layout: 'tb', parts: [['毄', 's', ''], ['手', 'm', '手']] }, char: '擊', zhuyin: 'ㄐㄧˊ', radical: '手', strokes: 17, words: ['攻擊', '打擊'], say: '擊，打擊的擊', cloze: '打＿', img: 'baseball-hit.png', options: ['擊', '繫', '擎', '舉'], clue: '這個字的下面是「手」。', explain: '答案是「擊」，下面是「手」；「繫」的下面是「糸」，「擎」的上面是「敬」。', parts: ['毄', '手'], story: '上面念起來像「擊」，下面是手。用手用力打下去，就是「打擊」。', sentence: '他一棒打擊出去，球飛得好遠。', build: { layout: 'tb', show: ['毄', '？'], answer: '手', options: ['手', '糸', '言', '心'], clue: '想一想：用力打要用身體的哪個部分？' } },
      { id: 'h-權', combo: { layout: 'lr', parts: [['木', 'm', '木頭'], ['雚', 's', '']] }, char: '權', zhuyin: 'ㄑㄩㄢˊ', radical: '木', strokes: 22, words: ['受教權', '權利'], say: '權，權利的權', cloze: '＿利', img: 'vote-hand.png', options: ['權', '歡', '勸', '觀'], clue: '這個字的左邊是木字旁。', explain: '答案是「權」，左邊是木字旁；「歡」的右邊是「欠」，「勸」的右邊是「力」。', parts: ['木', '雚'], story: '左邊的「木」是木頭，以前的人用木頭做秤，秤出東西的輕重；右邊念起來像「權」。每個人都可以有、不能被拿走的東西，叫「權利」。', sentence: '每個小孩都有讀書的權利。', build: { layout: 'lr', show: ['？', '雚'], answer: '木', options: ['木', '欠', '力', '見'], clue: '想一想：以前用來秤東西的工具，是用什麼做的？' } },
      { id: 'h-脅', combo: { type: '形聲字', pict: '上面是三個「力」，下面是肉字旁。很多力量壓在身上，逼得人喘不過氣，就是「脅」。' }, char: '脅', zhuyin: 'ㄒㄧㄝˊ', radical: '肉', strokes: 10, words: ['威脅', '脅迫'], say: '脅，脅迫的脅', cloze: '＿迫', img: 'threat-shadow.png', options: ['脅', '協', '肋', '劦'], clue: '這個字的上面是三個「力」，下面是「月」。', explain: '答案是「脅」；「協」的左邊是「十」，「肋」只有一個「力」。', parts: ['劦', '月'], story: '上面三個「力」，像好多力量一起壓過來，下面是身體。用力量逼別人照著做，就是「脅迫」、「威脅」。', sentence: '大野狼威脅小豬把門打開。' },
      { id: 'h-復', combo: { layout: 'lr', parts: [['彳', 'm', '走路'], ['复', 's', '']] }, char: '復', zhuyin: 'ㄈㄨˋ', radical: '彳', strokes: 12, words: ['康復', '恢復'], say: '復，恢復的復', cloze: '恢＿', img: 'recover-walk.png', options: ['復', '複', '腹', '覆'], clue: '這個字的左邊是雙人旁。', explain: '答案是「復」，左邊是雙人旁；「複」的左邊是衣字旁，「腹」的左邊是肉字旁。', parts: ['彳', '复'], story: '左邊的雙人旁和走路有關，右邊的「复」是走回來。走回原來的地方、變回原來的樣子，就是「恢復」。', sentence: '休息一下，體力就恢復了。', build: { layout: 'lr', show: ['？', '复'], answer: '彳', options: ['彳', '衤', '月', '亻'], clue: '想一想：走回原來的地方，左邊放和走路有關的哪一個？' } },
      { id: 'h-武', combo: { type: '會意字', pict: '「武」是「止」和「戈」合在一起。「戈」是古時候的兵器，「止」是腳。拿著兵器往前走，就是「武」。' }, char: '武', zhuyin: 'ㄨˇ', radical: '止', strokes: 8, words: ['武器', '武術'], say: '武，武術的武', cloze: '＿術', img: 'kungfu-kid.png', options: ['武', '式', '試', '戒'], clue: '這個字的下面有「止」。', explain: '答案是「武」，下面有「止」；「式」的下面是「工」，「試」的左邊是言字旁。', parts: ['止', '戈'], story: '「戈」是古代的兵器，「止」是腳。拿著兵器往前走，就是「武」；打拳、練功夫，叫「武術」。', sentence: '哥哥每週六去學武術。' },
      { id: 'h-撼', combo: { layout: 'lr', parts: [['扌', 'm', '手'], ['感', 's', '']] }, char: '撼', zhuyin: 'ㄏㄢˋ', radical: '手', strokes: 16, words: ['震撼', '撼動'], say: '撼，撼動的撼', cloze: '＿動', img: 'shake-tree.png', options: ['撼', '憾', '感', '喊'], clue: '這個字的左邊是提手旁。', explain: '答案是「撼」，左邊是提手旁；「憾」的左邊是豎心旁，「喊」的左邊是口字旁。', parts: ['扌', '感'], story: '左邊是手，右邊的「感」念起來像「撼」。用手用力搖動，就是「撼動」；心裡被大大的搖動，叫「震撼」。', sentence: '強風撼動了整棵大樹。', build: { layout: 'lr', show: ['？', '感'], answer: '扌', options: ['扌', '忄', '口', '木'], clue: '想一想：用力搖動要用身體的哪個部分？' } },
      { id: 'h-懼', combo: { layout: 'lr', parts: [['忄', 'm', '心'], ['瞿', 's', '']] }, char: '懼', zhuyin: 'ㄐㄩˋ', radical: '心', strokes: 21, words: ['恐懼', '畏懼'], say: '懼，畏懼的懼', cloze: '畏＿', img: 'fear-dark.png', options: ['懼', '瞿', '擢', '曜'], clue: '這個字的左邊是豎心旁。', explain: '答案是「懼」，左邊是豎心旁；「瞿」沒有豎心旁，「擢」的左邊是提手旁。', parts: ['忄', '瞿'], story: '左邊是心，右邊的「瞿」像一隻鳥睜大兩隻眼睛，很緊張的看著四周。心裡很害怕，就是「恐懼」。', sentence: '他面對困難，一點也不畏懼。', build: { layout: 'lr', show: ['？', '瞿'], answer: '忄', options: ['忄', '扌', '目', '日'], clue: '想一想：害怕是一種心情，左邊放哪一個？' } }
    ],
    vocab: [
      { id: 'v-巴基斯坦', cloze: true, clozeOptions: ['巴基斯坦', '冰淇淋', '游泳池', '計程車'], word: '巴基斯坦', meaning: '在亞洲南部的一個國家。', example: '＿＿＿＿是亞洲的一個國家。', img: 'asia-map.png', options: ['巴基斯坦', '組織', '武器', '廣播'] },
      { id: 'v-女性', cloze: true, clozeOptions: ['女性', '小狗', '桌子', '汽車'], word: '女性', meaning: '和男生相對的另一半人，像媽媽、姐姐。', example: '這位＿＿科學家發明了新藥。', img: 'woman-scientist.png', options: ['女性', '組織', '武器', '受傷'] },
      { id: 'v-恐怖', cloze: true, clozeOptions: ['恐怖', '可愛', '溫柔', '美味'], word: '恐怖', meaning: '非常可怕，讓人害怕。', example: '鬼屋裡的聲音好＿＿，我嚇得大叫。', img: 'haunted-house.png', options: ['恐怖', '康復', '震撼', '控制'] },
      { id: 'v-組織', cloze: true, clozeOptions: ['組織', '花瓶', '書包', '雨傘'], word: '組織', meaning: '一群人為了同一個目標聚在一起成立的團體。', example: '這個＿＿專門幫助流浪動物找新家。', img: 'volunteer-group.png', options: ['組織', '女性', '廣播', '武器'] },
      { id: 'v-霸占', cloze: true, clozeOptions: ['霸占', '分享', '歸還', '送給'], word: '霸占', meaning: '仗著力量大，硬搶過來據為己有。', example: '他＿＿了溜滑梯，不讓別人玩。', img: 'hog-slide.png', options: ['霸占', '控制', '攻擊', '康復'] },
      { id: 'v-廣播', cloze: true, clozeOptions: ['廣播', '睡覺', '洗澡', '跳舞'], word: '廣播', meaning: '用電波把聲音傳出去，讓很多人聽到。', example: '火車站的＿＿說：列車快要進站了。', img: 'radio-mic.png', options: ['廣播', '組織', '女性', '武器'] },
      { id: 'v-控制', cloze: true, clozeOptions: ['控制', '放走', '弄丟', '忘記'], word: '控制', meaning: '管住、讓它照自己的意思。', example: '生氣的時候，要＿＿自己的脾氣。', img: 'remote-car.png', options: ['控制', '霸占', '震撼', '受傷'] },
      { id: 'v-受傷', cloze: true, clozeOptions: ['受傷', '長高', '睡著', '吃飽'], word: '受傷', meaning: '身體被弄痛、弄破。', example: '他跌倒＿＿了，膝蓋流了一點血。', img: 'band-aid-knee.png', options: ['受傷', '康復', '攻擊', '控制'] },
      { id: 'v-攻擊', cloze: true, clozeOptions: ['攻擊', '保護', '擁抱', '安慰'], word: '攻擊', meaning: '用力打過去、傷害對方。', example: '刺蝟遇到敵人＿＿，會把身體縮成一顆球。', img: 'hedgehog.png', options: ['攻擊', '控制', '康復', '霸占'] },
      { id: 'v-受教權', cloze: true, clozeOptions: ['受教權', '冰淇淋', '遊樂園', '腳踏車'], word: '受教權', meaning: '每個人都可以上學讀書，沒有人能奪走的保障。', example: '每個孩子都有＿＿＿，可以上學讀書。', img: 'kids-school.png', options: ['受教權', '組織', '武器', '廣播'] },
      { id: 'v-威脅', cloze: true, clozeOptions: ['威脅', '稱讚', '鼓勵', '感謝'], word: '威脅', meaning: '用可怕的話或行動嚇人，逼人照做。', example: '颱風帶來的大雨，＿＿到山下的村子。', img: 'threat-shadow.png', options: ['威脅', '控制', '攻擊', '康復'] },
      { id: 'v-康復', cloze: true, clozeOptions: ['康復', '生病', '受傷', '發燒'], word: '康復', meaning: '生病或受傷好了。', example: '奶奶的病已經＿＿了，可以出院回家。', img: 'recover-walk.png', options: ['康復', '受傷', '霸占', '震撼'] },
      { id: 'v-武器', cloze: true, clozeOptions: ['武器', '玩偶', '花朵', '糖果'], word: '武器', meaning: '用來打仗、攻擊的工具。', example: '古代的士兵拿著刀和盾當＿＿。', img: 'old-shield.png', options: ['武器', '組織', '女性', '廣播'] },
      { id: 'v-震撼', cloze: true, clozeOptions: ['震撼', '無聊', '普通', '平淡'], word: '震撼', meaning: '心裡受到很大的衝擊、很感動。', example: '第一次看到大瀑布，我的心好＿＿。', img: 'waterfall.png', options: ['震撼', '恐怖', '控制', '康復'] },
      { id: 'v-恐懼', cloze: true, clozeOptions: ['恐懼', '開心', '輕鬆', '得意'], word: '恐懼', meaning: '非常害怕。', example: '他對黑暗有一點＿＿，睡覺都要開小燈。', img: 'fear-dark.png', options: ['恐懼', '震撼', '康復', '威脅'] },
      { id: 'v-垂危', cloze: true, clozeOptions: ['垂危', '健康', '強壯', '活潑'], word: '垂危', meaning: '病得很重，快要死了。', example: '醫生努力搶救那位傷勢＿＿的病人。', img: 'hospital.png', options: ['垂危', '康復', '恐怖', '震撼'] },
      { id: 'v-不可思議', cloze: true, clozeOptions: ['不可思議', '理所當然', '平淡無奇', '一模一樣'], word: '不可思議', meaning: '奇怪得讓人沒辦法想通。', example: '魔術師把兔子變不見了，真是＿＿＿＿。', img: 'magic-show.png', options: ['不可思議', '受教權', '巴基斯坦', '恐懼'] }
    ],
    charwords: [
      { id: 'cw-坦', char: '坦', img: 'flat-road.png', charMeaning: '平平的。', word: '平坦', meaning: '地面平平的，沒有高低。', example: '這條路很＿＿，騎車好輕鬆。', options: ['平坦', '個性', '恐龍', '小組'] },
      { id: 'cw-性', char: '性', img: 'kids-diff.png', charMeaning: '生下來就有的樣子。', word: '個性', meaning: '一個人特別的脾氣和習慣。', example: '哥哥的＿＿很安靜，喜歡看書。', options: ['個性', '占領', '廣播', '遙控'] },
      { id: 'cw-恐', char: '恐', img: 'dinosaur.png', charMeaning: '害怕。', word: '恐龍', meaning: '很久以前住在地球上的巨大爬蟲動物。', example: '博物館裡有＿＿的化石。', options: ['恐龍', '制服', '傷心', '進攻'] },
      { id: 'cw-怖', char: '怖', img: 'haunted-house.png', charMeaning: '害怕。', word: '可怖', meaning: '讓人害怕。', example: '那個面具長得很＿＿。', options: ['可怖', '打擊', '權利', '脅迫'] },
      { id: 'cw-組', char: '組', img: 'group-work.png', charMeaning: '合在一起。', word: '小組', meaning: '幾個人分在一起做事的團體。', example: '我們這個＿＿負責畫海報。', options: ['小組', '恢復', '武術', '撼動'] },
      { id: 'cw-占', char: '占', img: 'flag-hill.png', charMeaning: '拿下、佔住。', word: '占領', meaning: '搶先佔住一個地方。', example: '螞蟻大軍＿＿了廚房的餅乾。', options: ['占領', '畏懼', '平坦', '個性'] },
      { id: 'cw-播', char: '播', img: 'radio-mic.png', charMeaning: '撒出去；傳出去。', word: '播種', meaning: '把種子撒到土裡。', example: '春天到了，農夫在田裡＿＿。', options: ['播種', '恐龍', '小組', '制服'] },
      { id: 'cw-控', char: '控', img: 'remote-car.png', charMeaning: '管住、操作。', word: '遙控', meaning: '離得很遠也能操作東西。', example: '我用＿＿器打開電視。', options: ['遙控', '傷心', '進攻', '打擊'] },
      { id: 'cw-制', char: '制', img: 'uniform.png', charMeaning: '規定。', word: '制服', meaning: '規定要穿的衣服。', example: '護理師穿著白色的＿＿。', options: ['制服', '權利', '脅迫', '恢復'] },
      { id: 'cw-傷', char: '傷', img: 'sad-cry.png', charMeaning: '受到傷害；難過。', word: '傷心', meaning: '心裡很難過。', example: '小狗走丟了，弟弟哭得好＿＿。', options: ['傷心', '武術', '撼動', '畏懼'] },
      { id: 'cw-攻', char: '攻', img: 'soccer-attack.png', charMeaning: '打過去。', word: '進攻', meaning: '往對方衝過去打。', example: '球隊開始＿＿，大家衝向球門。', options: ['進攻', '平坦', '個性', '恐龍'] },
      { id: 'cw-擊', char: '擊', img: 'baseball-hit.png', charMeaning: '用力打。', word: '打擊', meaning: '用力打；也指讓人很受挫。', example: '這次失敗對他是很大的＿＿。', options: ['打擊', '可怖', '小組', '占領'] },
      { id: 'cw-權', char: '權', img: 'vote-hand.png', charMeaning: '可以做某件事的保障。', word: '權利', meaning: '每個人都可以有、不能被拿走的東西。', example: '說出自己的想法，是每個人的＿＿。', options: ['權利', '播種', '遙控', '制服'] },
      { id: 'cw-脅', char: '脅', img: 'threat-shadow.png', charMeaning: '用力量逼人。', word: '脅迫', meaning: '用力量或可怕的話，逼人照著做。', example: '壞人＿＿店員打開保險箱。', options: ['脅迫', '傷心', '進攻', '打擊'] },
      { id: 'cw-復', char: '復', img: 'recover-walk.png', charMeaning: '回到原來的樣子。', word: '恢復', meaning: '變回原來的樣子。', example: '大雨停了，河水慢慢＿＿清澈。', options: ['恢復', '權利', '平坦', '個性'] },
      { id: 'cw-武', char: '武', img: 'kungfu-kid.png', charMeaning: '和打鬥、兵器有關。', word: '武術', meaning: '打拳、練功夫這一類的本領。', example: '他練了五年的＿＿，身手很好。', options: ['武術', '恐龍', '小組', '占領'] },
      { id: 'cw-撼', char: '撼', img: 'shake-tree.png', charMeaning: '用力搖動。', word: '撼動', meaning: '用力搖動；也指讓人心裡受到很大的衝擊。', example: '她的歌聲＿＿了每一位聽眾。', options: ['撼動', '播種', '遙控', '制服'] },
      { id: 'cw-懼', char: '懼', img: 'fear-dark.png', charMeaning: '害怕。', word: '畏懼', meaning: '害怕、不敢面對。', example: '他不＿＿困難，勇敢的往前走。', options: ['畏懼', '傷心', '進攻', '恢復'] }
    ],
    /* 生字變成語：課本延伸成語，解釋和例句改成孩子聽得懂的話 */
    idioms: [
      { id: 'i-爭先恐後', situationImg: 'id-rush-lunch.png',
        anim: { bg: 'school', a: { bell: ['🔔', 50, 18, 10], k1: ['🧒', 14, 66, 11], k2: ['👦', 26, 66, 11], k3: ['👧', 38, 66, 11], food: ['🍱', 86, 60, 12], run: ['💨', 10, 56, 8, 'h'] },
          s: [['午餐的鐘聲響了！', [['wig', 'bell']]],
            ['大家一起往前衝，', [['in', 'run'], ['mv', 'k3', [62, 66, 600]], ['mv', 'k2', [56, 66, 650]], ['mv', 'k1', [50, 66, 700]]]],
            ['每個人都想搶第一，怕自己落在後面。', [['shake', 'k1'], ['shake', 'k2'], ['shake', 'k3']]],
            ['搶著往前、怕落後，就是爭先恐後。', [['out', 'run'], ['pop', 'food']]]] },
        idiom: '爭先恐後', char: '恐', meaning: '搶著往前，怕自己落在別人後面。', example: '老師一問問題，大家爭先恐後的舉手。', situation: '午餐鐘聲一響，大家搶著衝去拿便當。',
        fill: { options: ['冰淇淋車一來，小朋友＿＿＿＿的跑去排隊。', '大家慢慢走，讓別人先過，真是＿＿＿＿。'], clue: '提示：哪一句是搶著往前、怕落後？', explain: '第一句用得對：小朋友搶著去排隊。慢慢走、讓別人先過，剛好相反。' } },
      { id: 'i-先發制人', situationImg: 'id-first-move.png',
        anim: { bg: 'park', a: { a: ['🧒', 24, 62, 12], b: ['👦', 76, 62, 12], ball: ['⚽', 50, 70, 9], goal: ['🥅', 92, 54, 12], go: ['⚡', 24, 40, 9, 'h'] },
          s: [['比賽一開始，兩隊都在看對方。', [['bob', 'a'], ['bob', 'b']]],
            ['小明搶先一步衝出去，', [['in', 'go'], ['mv', 'a', [46, 62, 500]]]],
            ['趁對方還沒準備好，就把球踢進去！', [['mv', 'ball', [90, 56, 600]], ['shake', 'goal']]],
            ['先動手，取得機會，就是先發制人。', [['pop', 'go']]]] },
        idiom: '先發制人', char: '制', meaning: '搶先一步行動，讓自己占上風。', example: '比賽一開始我們就先發制人，連進兩球。', situation: '小明在比賽一開始就搶先衝出去，把球踢進了。',
        fill: { options: ['辯論比賽一開始，他就＿＿＿＿，提出好幾個問題。', '他等到對方都做完了，才開始＿＿＿＿。'], clue: '提示：哪一句是搶先行動？', explain: '第一句用得對：一開始就搶先提問。等別人做完才開始，就不是搶先。' } },
      { id: 'i-傷天害理', situationImg: 'id-bad-deed.png',
        anim: { bg: 'park', a: { tree: ['🌳', 30, 54, 20], nest: ['🪺', 34, 42, 9], bird: ['🐦', 70, 22, 9], hand: ['✋', 60, 50, 10, 'h'], no: ['🚫', 34, 30, 12, 'h'] },
          s: [['樹上有一個小鳥的窩。', [['bob', 'nest']]],
            ['有人想把鳥窩拿走，', [['in', 'hand'], ['mv', 'hand', [40, 44, 700]]]],
            ['鳥媽媽急得飛來飛去。', [['mv', 'bird', [50, 30, 500]], ['shake', 'bird']]],
            ['做這種很壞、很沒良心的事，就是傷天害理。', [['in', 'no'], ['shake', 'no']]]] },
        idiom: '傷天害理', char: '傷', meaning: '做非常壞、很沒有良心的事。', example: '故意虐待小動物是傷天害理的行為。', situation: '有人想拿走小鳥的窩，讓鳥媽媽急得飛來飛去。',
        fill: { options: ['騙老人家的錢，是＿＿＿＿的事。', '他扶老奶奶過馬路，真是＿＿＿＿。'], clue: '提示：哪一句說的是很壞、沒良心的事？', explain: '第一句用得對：騙老人家的錢很壞。扶老奶奶過馬路是好事，不能用這個成語。' } },
      { id: 'i-無懈可擊', situationImg: 'id-perfect-goalie.png',
        anim: { bg: 'park', a: { keeper: ['🧤', 80, 56, 12], goal: ['🥅', 86, 54, 18], b1: ['⚽', 20, 66, 9], b2: ['⚽', 20, 66, 9, 'h'], shield: ['🛡️', 80, 30, 10, 'h'] },
          s: [['對手用力踢出一球，', [['mv', 'b1', [76, 56, 600]]]],
            ['守門員一下子就接住了。', [['shake', 'keeper'], ['out', 'b1']]],
            ['再踢一球，又被擋下來！', [['in', 'b2'], ['mv', 'b2', [78, 48, 600]], ['out', 'b2']]],
            ['完全找不到漏洞，就是無懈可擊。', [['in', 'shield'], ['pop', 'shield']]]] },
        idiom: '無懈可擊', char: '擊', meaning: '完全沒有漏洞，找不到可以挑毛病的地方。', example: '她的表演無懈可擊，評審都給了滿分。', situation: '守門員把每一球都擋下來，找不到漏洞。',
        fill: { options: ['他的報告寫得＿＿＿＿，老師完全挑不出錯。', '他的作業錯了一大堆，真是＿＿＿＿。'], clue: '提示：哪一句是完全沒有缺點？', explain: '第一句用得對：報告挑不出錯。錯了一大堆，剛好相反。' } },
      { id: 'i-權宜之計', situationImg: 'id-quick-fix.png',
        anim: { bg: 'park', a: { kid: ['🧒', 40, 62, 12], rain: ['🌧️', 40, 16, 14], book: ['📚', 40, 42, 10, 'h'], umb: ['☂️', 80, 40, 10, 'h'] },
          s: [['突然下大雨，弟弟忘了帶傘。', [['shake', 'rain'], ['shake', 'kid']]],
            ['他先把書包舉在頭上擋雨，', [['in', 'book'], ['bob', 'book']]],
            ['等到了店裡再買一把傘。', [['in', 'umb'], ['mv', 'kid', [70, 62, 800]], ['mv', 'book', [70, 42, 800]]]],
            ['暫時應付一下的辦法，就是權宜之計。', [['out', 'book'], ['mv', 'umb', [70, 40, 300]]]]] },
        idiom: '權宜之計', char: '權', meaning: '因為情況特別，暫時想出來應付的辦法。', example: '教室停電，老師先打開窗戶當權宜之計。', situation: '下大雨沒帶傘，弟弟先用書包擋雨，再去買傘。',
        fill: { options: ['鉛筆斷了，他先借同學的筆，這只是＿＿＿＿。', '他每天都用這個辦法，已經用了十年的＿＿＿＿。'], clue: '提示：哪一句是暫時應付一下的辦法？', explain: '第一句用得對：先借筆，是暫時的辦法。用了十年，就不是暫時的了。' } },
      { id: 'i-蚍蜉撼樹', situationImg: 'id-ant-tree.png',
        anim: { bg: 'park', a: { tree: ['🌳', 60, 46, 30], ant: ['🐜', 40, 74, 7], sweat: ['💦', 40, 64, 6, 'h'], lol: ['😅', 76, 24, 9, 'h'] },
          s: [['一隻小螞蟻來到大樹下。', [['mv', 'ant', [48, 74, 700]]]],
            ['牠說：「我要把這棵大樹搖倒！」', [['jump', 'ant']]],
            ['推呀推，大樹一動也不動。', [['in', 'sweat'], ['shake', 'ant']]],
            ['力量很小，卻想做太大的事，就是蚍蜉撼樹。', [['in', 'lol']]]] },
        idiom: '蚍蜉撼樹', char: '撼', meaning: '螞蟻想搖動大樹；比喻自己力量很小，卻想做做不到的大事。', example: '他才學了一天，就想打敗冠軍，真是蚍蜉撼樹。', situation: '一隻小螞蟻想把大樹搖倒，推了半天大樹一動也不動。',
        fill: { options: ['一年級的小朋友想跟大人比扛米袋，簡直是＿＿＿＿。', '大力士輕輕鬆鬆搬起大石頭，真是＿＿＿＿。'], clue: '提示：哪一句是力量很小卻想做太大的事？', explain: '第一句用得對：小朋友想贏大人，力量差太多。大力士本來就做得到，不是蚍蜉撼樹。' } }
    ],
    /* 改錯字：sentence 是正確的句子，畫面上會把 char 換成 wrong；options 的第一個是正確的字。clue 只說語詞的意思，不能出現正確的字。 */
    fix: [
      { id: 'fx-坦', char: '坦', wrong: '但', sentence: '操場的地面很平坦。', options: ['坦', '但', '旦'], clue: '這裡是說地面平平的，想一想，哪一個字有土字旁？', explain: '要改成「坦」。地面平平的是「平坦」；「但」是但是的但。' },
      { id: 'fx-性', char: '性', wrong: '姓', sentence: '每個人的個性都不一樣。', options: ['性', '姓', '星'], clue: '這裡說的是一個人的脾氣和習慣，想一想，哪一個字有豎心旁？', explain: '要改成「性」。脾氣和習慣是「個性」；「姓」是姓名的姓。' },
      { id: 'fx-恐', char: '恐', wrong: '怒', sentence: '弟弟最喜歡玩恐龍玩具。', options: ['恐', '怒', '思'], clue: '這裡說的是很久以前的巨大爬蟲，想一想，哪一個字的上面是「巩」？', explain: '要改成「恐」。巨大的爬蟲是「恐龍」；「怒」是生氣的意思。' },
      { id: 'fx-怖', char: '怖', wrong: '佈', sentence: '萬聖節的面具看起來很恐怖。', options: ['怖', '佈', '布'], clue: '這裡是說很可怕，想一想，哪一個字有豎心旁？', explain: '要改成「怖」。很可怕是「恐怖」；「佈」有單人旁。' },
      { id: 'fx-組', char: '組', wrong: '租', sentence: '老師把全班分成六個小組。', options: ['組', '租', '祖'], clue: '這裡說的是分在一起做事的人，想一想，哪一個字有糸字旁？', explain: '要改成「組」。分在一起做事的是「小組」；「租」是租房子的租。' },
      { id: 'fx-占', char: '占', wrong: '古', sentence: '貓咪占領了我的枕頭。', options: ['占', '古', '卡'], clue: '這裡是說搶先佔住，想一想，哪一個字的上面是「卜」？', explain: '要改成「占」。搶先佔住是「占領」；「古」是古代的古。' },
      { id: 'fx-播', char: '播', wrong: '翻', sentence: '電視正在播放卡通。', options: ['播', '翻', '番'], clue: '這裡是說把節目放出來給人看，想一想，哪一個字有提手旁？', explain: '要改成「播」。放節目是「播放」；「翻」是翻書的翻。' },
      { id: 'fx-控', char: '控', wrong: '空', sentence: '他用遙控器關掉冷氣。', options: ['控', '空', '腔'], clue: '這裡是說遠遠的就能操作，想一想，哪一個字有提手旁？', explain: '要改成「控」。遠遠操作是「遙控」；「空」是天空的空。' },
      { id: 'fx-制', char: '制', wrong: '製', sentence: '警察穿著藍色的制服。', options: ['制', '製', '刺'], clue: '這裡說的是規定要穿的衣服，想一想，哪一個字的下面沒有「衣」？', explain: '要改成「制」。規定要穿的衣服是「制服」；「製」是製作的製。' },
      { id: 'fx-傷', char: '傷', wrong: '湯', sentence: '騎車要戴安全帽，以免受傷。', options: ['傷', '湯', '場'], clue: '這裡是說身體被弄痛、弄破，想一想，哪一個字有單人旁？', explain: '要改成「傷」。身體被弄痛是「受傷」；「湯」是喝湯的湯。' },
      { id: 'fx-攻', char: '攻', wrong: '功', sentence: '我們一起進攻，終於踢進一球。', options: ['攻', '功', '江'], clue: '這裡是說往對方衝過去打，想一想，哪一個字的右邊是反文旁？', explain: '要改成「攻」。往前衝過去是「進攻」；「功」是功課的功。' },
      { id: 'fx-擊', char: '擊', wrong: '繫', sentence: '颱風來襲，很多樹被打擊得東倒西歪。', options: ['擊', '繫', '舉'], clue: '這裡是說用力打，想一想，哪一個字的下面是「手」？', explain: '要改成「擊」。用力打是「打擊」；「繫」是繫鞋帶的繫。' },
      { id: 'fx-權', char: '權', wrong: '歡', sentence: '小孩子也有說話的權利。', options: ['權', '歡', '勸'], clue: '這裡說的是不能被拿走的保障，想一想，哪一個字有木字旁？', explain: '要改成「權」。不能被拿走的保障是「權利」；「歡」是歡喜的歡。' },
      { id: 'fx-脅', char: '脅', wrong: '協', sentence: '我們不怕壞人的威脅。', options: ['脅', '協', '肋'], clue: '這裡是說用可怕的話嚇人，想一想，哪一個字的下面是「月」？', explain: '要改成「脅」。嚇人是「威脅」；「協」是協助的協。' },
      { id: 'fx-復', char: '復', wrong: '複', sentence: '他的身體已經完全康復了。', options: ['復', '複', '腹'], clue: '這裡是說病好了，想一想，哪一個字有雙人旁？', explain: '要改成「復」。病好了是「康復」；「複」是複習的複。' },
      { id: 'fx-武', char: '武', wrong: '式', sentence: '古代的將軍騎著馬，拿著武器。', options: ['武', '式', '試'], clue: '這裡說的是打仗用的工具，想一想，哪一個字的下面有「止」？', explain: '要改成「武」。打仗的工具是「武器」；「式」是方式的式。' },
      { id: 'fx-撼', char: '撼', wrong: '憾', sentence: '這場煙火秀讓人好震撼。', options: ['撼', '憾', '感'], clue: '這裡是說心裡受到很大的衝擊，想一想，哪一個字有提手旁？', explain: '要改成「撼」。受到衝擊是「震撼」；「憾」是遺憾的憾。' },
      { id: 'fx-懼', char: '懼', wrong: '瞿', sentence: '她勇敢的面對恐懼。', options: ['懼', '瞿', '擢'], clue: '這裡是說非常害怕，想一想，哪一個字有豎心旁？', explain: '要改成「懼」。非常害怕是「恐懼」。' }
    ],
    similar: [
      { id: 's1', meaning: '「＿是」是用在說出不一樣的想法時。', sentence: '我想出去玩，＿是外面在下雨。', frame: '＿是', options: ['但', '坦'], answer: '但', clue: '提示：這個字的左邊是單人旁。', explain: '答案是「但」；「坦」是平坦的坦，有土字旁。' },
      { id: 's2', meaning: '「＿名」是一個人的全名。', sentence: '請在考卷上寫好＿名。', frame: '＿名', options: ['姓', '性'], answer: '姓', clue: '提示：這個字的左邊是女字旁。', explain: '答案是「姓」；「性」是個性的性，有豎心旁。' },
      { id: 's3', meaning: '「＿考」是用心想一想。', sentence: '遇到難題要靜下心來＿考。', frame: '＿考', options: ['思', '恐'], answer: '思', clue: '提示：這個字的上面是「田」。', explain: '答案是「思」；「恐」是恐龍的恐，上面是「巩」。' },
      { id: 's4', meaning: '「＿偶」是用碎花料縫成的玩偶。', sentence: '奶奶幫我縫了一隻＿偶。', frame: '＿偶', options: ['布', '怖'], answer: '布', clue: '提示：這個字沒有偏旁。', explain: '答案是「布」；「怖」是恐怖的怖，有豎心旁。' },
      { id: 's5', meaning: '「＿房子」是付錢借別人的房子來住。', sentence: '叔叔在城市裡＿了一間小套房。', frame: '＿了', options: ['租', '組'], answer: '租', clue: '提示：這個字的左邊是禾字旁。', explain: '答案是「租」；「組」是小組的組。' },
      { id: 's6', meaning: '「＿代」是很久很久以前。', sentence: '＿代的人用毛筆寫字。', frame: '＿代', options: ['古', '占'], answer: '古', clue: '提示：這個字的上面是「十」。', explain: '答案是「古」；「占」是占領的占，上面是「卜」。' },
      { id: 's7', meaning: '「＿書」是把書打開來看。', sentence: '上課時，請把課本＿到第十頁。', frame: '＿到', options: ['翻', '播'], answer: '翻', clue: '提示：這個字的右邊是「羽」。', explain: '答案是「翻」；「播」是廣播的播，有提手旁。' },
      { id: 's8', meaning: '「天＿」是頭頂上藍藍的地方。', sentence: '晴朗的天＿沒有一片雲。', frame: '天＿', options: ['空', '控'], answer: '空', clue: '提示：這個字沒有偏旁。', explain: '答案是「空」；「控」是控制的控，有提手旁。' },
      { id: 's9', meaning: '「＿作」是把東西做出來。', sentence: '我們用紙箱＿作了一臺小車。', frame: '＿作', options: ['製', '制'], answer: '製', clue: '提示：這個字的下面有「衣」。', explain: '答案是「製」；「制」是制服的制。' },
      { id: 's10', meaning: '「喝＿」是把鍋裡煮好的熱汁喝下去。', sentence: '冬天喝一碗熱＿最舒服。', frame: '熱＿', options: ['湯', '傷'], answer: '湯', clue: '提示：這個字的左邊是三點水。', explain: '答案是「湯」；「傷」是受傷的傷，有單人旁。' },
      { id: 's11', meaning: '「＿課」是老師要我們回家做的作業。', sentence: '我先寫完＿課再去玩。', frame: '＿課', options: ['功', '攻'], answer: '功', clue: '提示：這個字的右邊是「力」。', explain: '答案是「功」；「攻」是進攻的攻，右邊是反文旁。' },
      { id: 's12', meaning: '「＿迎」是很開心的接待別人。', sentence: '大家熱烈＿迎新同學。', frame: '＿迎', options: ['歡', '權'], answer: '歡', clue: '提示：這個字的右邊是「欠」。', explain: '答案是「歡」；「權」是權利的權，有木字旁。' }
    ],
    listen: [
      { id: 'l1', text: '鬼屋裡黑黑的，還有奇怪的聲音，好可怕。', answer: 0, options: [{ text: '恐怖', img: 'haunted-house.png' }, { text: '震撼', img: 'waterfall.png' }, { text: '康復', img: 'recover-walk.png' }, { text: '控制', img: 'remote-car.png' }] },
      { id: 'l2', text: '奶奶的病好了，可以回家了。', answer: 0, options: [{ text: '康復', img: 'recover-walk.png' }, { text: '受傷', img: 'band-aid-knee.png' }, { text: '垂危', img: 'hospital.png' }, { text: '霸占', img: 'hog-slide.png' }] },
      { id: 'l3', text: '他一個人搶走溜滑梯，不讓別人玩。', answer: 0, options: [{ text: '霸占', img: 'hog-slide.png' }, { text: '控制', img: 'remote-car.png' }, { text: '攻擊', img: 'hedgehog.png' }, { text: '廣播', img: 'radio-mic.png' }] },
      { id: 'l4', text: '站在大瀑布前，心裡受到很大的衝擊。', answer: 0, options: [{ text: '震撼', img: 'waterfall.png' }, { text: '恐懼', img: 'fear-dark.png' }, { text: '威脅', img: 'threat-shadow.png' }, { text: '康復', img: 'recover-walk.png' }] },
      { id: 'l5', text: '火車站傳出聲音：列車快要進站了。', answer: 0, options: [{ text: '廣播', img: 'radio-mic.png' }, { text: '組織', img: 'volunteer-group.png' }, { text: '武器', img: 'old-shield.png' }, { text: '女性', img: 'woman-scientist.png' }] },
      { id: 'l6', text: '魔術師把兔子變不見了，大家都想不通。', answer: 0, options: [{ text: '不可思議', img: 'magic-show.png' }, { text: '受教權', img: 'kids-school.png' }, { text: '恐懼', img: 'fear-dark.png' }, { text: '垂危', img: 'hospital.png' }] },
      { id: 'l7', text: '每個孩子都可以上學讀書。', answer: 0, options: [{ text: '受教權', img: 'kids-school.png' }, { text: '組織', img: 'volunteer-group.png' }, { text: '廣播', img: 'radio-mic.png' }, { text: '武器', img: 'old-shield.png' }] },
      { id: 'l8', text: '晚上一個人在黑黑的房間，心裡非常害怕。', answer: 0, options: [{ text: '恐懼', img: 'fear-dark.png' }, { text: '震撼', img: 'waterfall.png' }, { text: '康復', img: 'recover-walk.png' }, { text: '控制', img: 'remote-car.png' }] }
    ],
    /* ---------- 短語、句型、修辭（句子都是 Claude 自己寫的） ---------- */
    phrase: {
      /* 拼短語每一格下面寫要放什麼樣的詞 */
      fillLabels: { before: '哪裡最', answer: '怎麼樣', noun: '什麼人或東西' },
      pickName: '看圖選一選', pickSay: '看圖，選出最適合的詞，說說看哪裡最怎麼樣的人或東西。',
      /* 短語：名詞＋最＋形容詞＋的＋名詞（課本的例子是課文原句，這裡換成自己寫的） */
      intro: { example: '全班最熱心的班長', img: 'pr-helpful-leader.png',
        parts: [{ text: '全班最', role: '哪裡最' }, { text: '熱心', role: '怎麼樣' }, { text: '的' }, { text: '班長', role: '什麼人或東西' }],
        explain: '先說在哪裡、和誰比，再說「最」怎麼樣，加上「的」，最後說是什麼人或東西。' },
      pick: [
        { id: 'ph1', img: 'pr-tall-boy.png', before: '全班最', noun: '男生', ask: '全班最什麼樣的男生', look: '再看看圖片，他跟同學比起來怎麼樣？', options: ['高大', '矮小', '安靜', '香甜'], clue: '提示：站在隊伍最後面，頭都超出別人一截。', explain: '答案是「高大」，完整的短語是「全班最高大的男生」。' },
        { id: 'ph2', img: 'pr-old-temple.png', before: '鎮上最', noun: '廟', ask: '鎮上最什麼樣的廟', look: '再看看圖片，這間廟看起來新不新？', options: ['古老', '嶄新', '吵鬧', '冰冷'], clue: '提示：已經蓋了三百多年，柱子都褪色了。', explain: '答案是「古老」，完整的短語是「鎮上最古老的廟」。' },
        { id: 'ph3', img: 'pr-sweet-shop.png', before: '夜市最', noun: '攤子', ask: '夜市最什麼樣的攤子', look: '再看看圖片，這個攤子前面排了多少人？', options: ['熱門', '冷清', '安靜', '苦澀'], clue: '提示：前面排了長長的隊伍，大家都想買。', explain: '答案是「熱門」，完整的短語是「夜市最熱門的攤子」。' },
        { id: 'ph4', img: 'pr-kind-nurse.png', before: '醫院最', noun: '護理師', ask: '醫院最什麼樣的護理師', look: '再看看圖片，她對病人的表情怎麼樣？', options: ['親切', '兇惡', '懶惰', '吵鬧'], clue: '提示：總是笑咪咪的，說話輕輕柔柔。', explain: '答案是「親切」，完整的短語是「醫院最親切的護理師」。' },
        { id: 'ph5', img: 'pr-fast-runner2.png', before: '學校最', noun: '選手', ask: '學校最什麼樣的選手', look: '再看看圖片，他跑第幾名？', options: ['快速', '緩慢', '膽小', '安靜'], clue: '提示：比賽時永遠第一個衝過終點。', explain: '答案是「快速」，完整的短語是「學校最快速的選手」。' },
        { id: 'ph6', img: 'pr-big-tree2.png', before: '公園最', noun: '榕樹', ask: '公園最什麼樣的榕樹', look: '再看看圖片，這棵樹有多大？', options: ['巨大', '迷你', '吵鬧', '香甜'], clue: '提示：樹蔭下可以坐五十個人。', explain: '答案是「巨大」，完整的短語是「公園最巨大的榕樹」。' },
        { id: 'ph7', img: 'pr-quiet-girl.png', before: '班上最', noun: '女生', ask: '班上最什麼樣的女生', look: '再看看圖片，她在做什麼？', options: ['文靜', '吵鬧', '兇惡', '冰冷'], clue: '提示：下課時總是坐在位子上看書，說話小小聲。', explain: '答案是「文靜」，完整的短語是「班上最文靜的女生」。' },
        { id: 'ph8', img: 'pr-brave-girl.png', before: '世界上最', noun: '女孩', ask: '世界上最什麼樣的女孩', look: '再看看圖片，她面對大怪獸怕不怕？', options: ['勇敢', '膽小', '懶惰', '吵鬧'], clue: '提示：心裡害怕，還是站出來保護大家。', explain: '答案是「勇敢」，完整的短語是「世界上最勇敢的女孩」。' }
      ],
      say: [],
      words: [
        { word: '垂危', meaning: '病得很重，快要死了。', img: 'hospital.png' },
        { word: '不可思議', meaning: '奇怪得讓人沒辦法想通。', img: 'magic-show.png' },
        { word: '震撼', meaning: '心裡受到很大的衝擊、很感動。', img: 'waterfall.png' },
        { word: '恐懼', meaning: '非常害怕。', img: 'fear-dark.png' }
      ],
      choose: [
        { id: 'pw1', word: '垂危', options: ['那隻受傷的小鹿情況垂危，獸醫趕快救牠。', '他今天精神很好，身體垂危。'], clue: '提示：想一想，「垂危」是很危險，還是很健康？', explain: '第一句用得對：小鹿傷得很重，很危險。精神很好，就不是垂危。' },
        { id: 'pw2', word: '不可思議', options: ['一隻小貓竟然會開門，真是不可思議。', '太陽每天從東邊升起，真是不可思議。'], clue: '提示：想一想，「不可思議」是很奇怪，還是很平常？', explain: '第一句用得對：小貓會開門很奇怪。太陽每天升起是很平常的事。' },
        { id: 'pw3', word: '震撼', options: ['看到大鯨魚跳出海面，大家都好震撼。', '看到一顆小石頭，大家都好震撼。'], clue: '提示：想一想，「震撼」是受到很大的衝擊，還是很普通？', explain: '第一句用得對：大鯨魚跳出海面讓人很驚奇。一顆小石頭很普通。' },
        { id: 'pw4', word: '恐懼', options: ['他對打雷很恐懼，常常摀住耳朵。', '他吃到最愛的蛋糕，覺得好恐懼。'], clue: '提示：想一想，「恐懼」是害怕，還是開心？', explain: '第一句用得對：打雷讓他很害怕。吃到最愛的蛋糕應該很開心。' }
      ],
      make: [
        { id: 'pm1', word: '垂危', clue: '提示：想想看，在新聞或故事裡，誰曾經病得很重？', model: '那位病情垂危的病人，被醫生救了回來。' },
        { id: 'pm2', word: '不可思議', clue: '提示：想想看，你看過什麼很奇妙、想不通的事？', model: '小小的種子能長成大樹，真是不可思議。' },
        { id: 'pm3', word: '震撼', clue: '提示：想想看，什麼東西讓你看了很感動、很驚訝？', model: '第一次看到滿天的星星，我覺得好震撼。' },
        { id: 'pm4', word: '恐懼', clue: '提示：想想看，你最害怕什麼？', model: '我對蟑螂很恐懼，一看到就跑走。' }
      ]
    },
    pattern: [
      { key: 'budanfaner', id: 'bf', title: '不但沒有……反而……', img: 'budanfaner.png',
        meaning: '先用「不但沒有」說本來以為會發生的事沒有發生，再用「反而」說出相反的結果。',
        examples: ['弟弟被雨淋溼了，不但沒有生氣，反而開心的踩水坑。'],
        match: [
          { id: 'pt-bf-m1', img: 'pt-lose-smile.png', front: '比賽輸了，他不但沒有哭，', options: ['反而笑著恭喜對手。', '反而哭得很大聲。', '反而輸了比賽。'], clue: '提示：看看圖片，他的表情是哭還是笑？', explain: '答案是「反而笑著恭喜對手」：沒有哭，卻笑了，前後相反。' },
          { id: 'pt-bf-m2', img: 'pt-medicine-better.png', front: '吃了藥，病不但沒有變好，', options: ['反而更嚴重了。', '反而好了。', '反而吃了藥。'], clue: '提示：看看圖片，生病的人看起來怎麼樣？', explain: '答案是「反而更嚴重了」：以為會變好，卻更嚴重，前後相反。' },
          { id: 'pt-bf-m3', img: 'pt-scold-help.png', front: '同學打翻了水，老師不但沒有罵他，', options: ['反而幫他擦乾淨。', '反而很生氣罵他。', '反而打翻了水。'], clue: '提示：看看圖片，老師在做什麼？', explain: '答案是「反而幫他擦乾淨」：沒有罵，還幫忙，前後相反。' }
        ],
        conj: [
          { id: 'pt-bf-c1', full: '弟弟被罵了，不但沒有哭，反而笑了出來。', img: 'pt-kid-laugh.png', sentence: '弟弟被罵了，＿＿＿有哭，＿＿笑了出來。', options: ['不但沒有……反而……', '縱使……卻……', '因為……所以……'], clue: '提示：以為會哭，結果相反。數數看有幾個空格。', explain: '答案是「不但沒有……反而……」：弟弟被罵了，不但沒有哭，反而笑了出來。' },
          { id: 'pt-bf-c2', full: '下了大雨，天氣不但沒有變涼，反而更悶熱了。', img: 'pt-hot-rain.png', sentence: '下了大雨，天氣＿＿＿有變涼，＿＿更悶熱了。', options: ['不但沒有……反而……', '縱使……卻……', '因為……所以……'], clue: '提示：以為會變涼，結果相反。數數看有幾個空格。', explain: '答案是「不但沒有……反而……」：下了大雨，天氣不但沒有變涼，反而更悶熱了。' }
        ],
        half: [
          { id: 'pt-bf-h1', front: '被球打到，他不但沒有生氣，', clue: '提示：沒有生氣，他做了什麼相反的事？記得要說「反而」。', model: '反而把球撿起來還給別人。' },
          { id: 'pt-bf-h2', front: '考試沒考好，姐姐不但沒有放棄，', clue: '提示：沒有放棄，她怎麼做？記得要說「反而」。', model: '反而更認真的讀書。' }
        ],
        whole: [
          { id: 'pt-bf-w1', clue: '提示：先用「不但沒有」說沒發生的事，再用「反而」說相反的結果。想想看：有什麼事的結果和你想的相反？', model: '小狗跌倒了，不但沒有哭叫，反而搖著尾巴爬起來。' }
        ] },
      { key: 'zongshique', id: 'zq', title: '縱使……卻……', img: 'zongshique.png',
        meaning: '先用「縱使」說一個困難的情況，再用「卻」說不管怎樣，還是做到的事。',
        examples: ['縱使外面很冷，他卻還是早起去晨跑。'],
        match: [
          { id: 'pt-zq-m1', img: 'pt-scared-stage.png', front: '縱使心裡很緊張，', options: ['她卻還是上臺了。', '她卻一直很緊張。', '她卻坐在臺下看。'], clue: '提示：看看圖片，她最後有沒有上臺？', explain: '答案是「她卻還是上臺了」：很緊張，還是做到了。' },
          { id: 'pt-zq-m2', img: 'pt-hurt-finish.png', front: '縱使腳受傷了，', options: ['他卻堅持跑到終點。', '他卻受傷了。', '他卻在床上睡覺。'], clue: '提示：看看圖片，他最後有沒有跑完？', explain: '答案是「他卻堅持跑到終點」：受傷了，還是做到了。' },
          { id: 'pt-zq-m3', img: 'pt-rain-deliver.png', front: '縱使雨下得很大，', options: ['郵差卻準時把信送到。', '雨卻下得很大。', '郵差卻在家看電視。'], clue: '提示：看看圖片，郵差有沒有送信？', explain: '答案是「郵差卻準時把信送到」：雨很大，還是做到了。' }
        ],
        conj: [
          { id: 'pt-zq-c1', full: '縱使大家都笑他，他卻一點也不放棄。', img: 'pt-laughed-at.png', sentence: '＿＿大家都笑他，他＿一點也不放棄。', options: ['縱使……卻……', '不但沒有……反而……', '因為……所以……'], clue: '提示：遇到困難，還是不放棄。數數看有幾個空格。', explain: '答案是「縱使……卻……」：縱使大家都笑他，他卻一點也不放棄。' },
          { id: 'pt-zq-c2', full: '縱使家裡很窮，她卻每天認真讀書。', img: 'pt-poor-study.png', sentence: '＿＿家裡很窮，她＿每天認真讀書。', options: ['縱使……卻……', '不但沒有……反而……', '因為……所以……'], clue: '提示：環境很困難，她還是做到了。數數看有幾個空格。', explain: '答案是「縱使……卻……」：縱使家裡很窮，她卻每天認真讀書。' }
        ],
        half: [
          { id: 'pt-zq-h1', front: '縱使功課很多，', clue: '提示：功課很多，你還是做到了什麼？記得要說「卻」。', model: '我卻每天都準時寫完。' },
          { id: 'pt-zq-h2', front: '縱使天氣很熱，', clue: '提示：天氣熱，大家還是做了什麼？記得要說「卻」。', model: '球員們卻還是認真練球。' }
        ],
        whole: [
          { id: 'pt-zq-w1', clue: '提示：先用「縱使」說一個困難，再用「卻」說還是做到的事。想想看：你有沒有遇到困難還是堅持下去的經驗？', model: '縱使跳繩一直跳不好，我卻每天都練習。' }
        ] }
    ],
    rhetoric: {
      cards: [
        { key: 'question', name: '設問', meaning: '用問句來說話，引起大家注意。有時自己問、自己回答；有時只問不答，答案就藏在問題裡。', example: '課文先問：什麼是勇敢？不害怕就是勇敢嗎？讓我們先想一想，再告訴我們答案。',
          show: { sentence: '什麼是真正的朋友？就是在你難過時陪著你的人。' },
          yesno: [
            { id: 'rh-qu-y1', sentence: '為什麼天空是藍色的？因為陽光被空氣打散了。', answer: true, clue: '提示：這句話是不是先問一個問題，再自己回答？', explain: '是設問：先問「為什麼天空是藍色的」，再自己回答。' },
            { id: 'rh-qu-y2', sentence: '天空是藍色的。', answer: false, clue: '提示：這句話裡有沒有問題？', explain: '不是設問：這句話沒有用問句。' }
          ],
          pick: [
            { id: 'rh-qu-p1', options: ['誰是我最好的朋友？就是小美。', '小美是我的朋友。'], clue: '提示：哪一句先問問題，再自己回答？', explain: '先問再答，是設問。' },
            { id: 'rh-qu-p2', options: ['有誰不想要一個和平的世界呢？', '世界要和平。'], clue: '提示：哪一句用問題來說話？', explain: '「有誰不想要一個和平的世界呢」是設問：答案藏在問題裡。' },
            { id: 'rh-qu-p3', options: ['勇敢是什麼？是害怕也不放棄。', '他很勇敢。', '她不怕黑。'], clue: '提示：哪一句先問「是什麼」，再自己回答？', explain: '先問再答，是設問。' },
            { id: 'rh-qu-p4', options: ['你知道一本書可以改變世界嗎？', '書很有用。', '我喜歡讀書。'], clue: '提示：哪一句用問題引起大家注意？', explain: '「你知道一本書可以改變世界嗎」是設問。' },
            { id: 'rh-qu-p5', options: ['為什麼要上學？因為讀書讓我們更聰明。', '我每天上學。', '學校很大。', '老師在上課。'], clue: '提示：哪一句先問問題，再說出答案？', explain: '先問「為什麼要上學」，再回答，是設問。' },
            { id: 'rh-qu-p6', options: ['還有什麼比讀書更快樂的呢？', '我喜歡讀書。', '圖書館有很多書。', '這本書很厚。'], clue: '提示：哪一句用問題來說話，答案藏在問題裡？', explain: '答案藏在問題裡：讀書最快樂，是設問。' }
          ] },
        { key: 'parallel', name: '排比', meaning: '把三句或三句以上樣子差不多的話，一句接一句排在一起說，讀起來很有節奏，也很有氣勢。', example: '課文用「不准……、不讓……、還不許……」，一口氣說出壞人的好多不合理規定。',
          show: { sentence: '我們要愛護家人，愛護朋友，愛護地球。', mark: ['愛護家人', '愛護朋友', '愛護地球'] },
          yesno: [
            { id: 'rh-pa-y1', sentence: '一本書、一枝筆、一位老師，就能點亮孩子的未來。', answer: true, mark: ['一本書', '一枝筆', '一位老師'], clue: '提示：有沒有三個樣子差不多的詞排在一起？', explain: '是排比：三個「一……」排在一起。' },
            { id: 'rh-pa-y2', sentence: '書能點亮孩子的未來。', answer: false, clue: '提示：有沒有三個樣子差不多的句子排在一起？', explain: '不是排比：只有一句話。' }
          ],
          pick: [
            { id: 'rh-pa-p1', mark: ['要勇敢', '要堅強', '要有希望'], options: ['遇到困難，要勇敢，要堅強，要有希望。', '遇到困難要努力。'], clue: '提示：哪一句一口氣說了三個「要……」？', explain: '三個「要……」排在一起，是排比。' },
            { id: 'rh-pa-p2', mark: ['不能上學', '不能工作', '不能唱歌'], options: ['那裡的女孩不能上學，不能工作，不能唱歌。', '那裡的女孩很辛苦。'], clue: '提示：哪一句有三個「不能……」？', explain: '三個「不能……」排在一起，是排比。' },
            { id: 'rh-pa-p3', mark: ['她讀書', '她寫字', '她演講'], options: ['她讀書，她寫字，她演講。', '她很認真。', '她是學生。'], clue: '提示：哪一句有三句樣子差不多的話？', explain: '三個「她……」排在一起，是排比。' },
            { id: 'rh-pa-p4', mark: ['為了自己', '為了朋友', '為了所有女孩'], options: ['她為了自己，為了朋友，為了所有女孩站出來。', '她站出來了。', '她是女孩。'], clue: '提示：哪一句一口氣說了三個「為了……」？', explain: '三個「為了……」排在一起，是排比。' },
            { id: 'rh-pa-p5', mark: ['有的拿書', '有的拿筆', '有的拿旗子'], options: ['大家有的拿書，有的拿筆，有的拿旗子。', '大家都來了。', '廣場上很熱鬧。', '旗子像一片海。'], clue: '提示：哪一句有三個「有的……」？', explain: '三個「有的……」排在一起，是排比。' },
            { id: 'rh-pa-p6', mark: ['讀書讓我聰明', '讀書讓我快樂', '讀書讓我勇敢'], options: ['讀書讓我聰明，讀書讓我快樂，讀書讓我勇敢。', '我喜歡讀書。', '讀書很重要。', '這是一本書。'], clue: '提示：哪一句有三個「讀書讓我……」？', explain: '三個「讀書讓我……」排在一起，是排比。' }
          ] }
      ],
      quiz: [
        { id: 'rh1', sentence: '你知道世界上有多少孩子不能上學嗎？', answer: '設問', clue: '提示：這句話有沒有用問題引起注意？', explain: '答案是「設問」：用問題引起大家的注意。' },
        { id: 'rh2', sentence: '什麼最珍貴？就是健康的身體。', answer: '設問', clue: '提示：這句話是不是先問再答？', explain: '答案是「設問」：先問「什麼最珍貴」，再自己回答。' },
        { id: 'rh3', sentence: '她勇敢，她堅強，她從不放棄。', answer: '排比', mark: ['她勇敢', '她堅強', '她從不放棄'], clue: '提示：有沒有三句樣子差不多的話？', explain: '答案是「排比」：三個「她……」排在一起。' },
        { id: 'rh4', sentence: '我愛上學，我愛讀書，我愛我的老師。', answer: '排比', mark: ['我愛上學', '我愛讀書', '我愛我的老師'], clue: '提示：有沒有三句樣子差不多的話？', explain: '答案是「排比」：三個「我愛……」排在一起。' }
      ]
    }
  };
  if (typeof module === 'object' && module.exports) module.exports = d;
  else { root.H3A_WORDS = root.H3A_WORDS || {}; root.H3A_WORDS.L08 = d; }
})(this);
