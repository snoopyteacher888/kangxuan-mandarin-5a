/* 第 10 課字詞練習（公開、不加密）。句子和解釋都是 Claude 自己寫的，沒有課本原文。
   生字、語詞：options 的第一個是正確答案（作答時會打亂）。 */
(function (root) {
  var d = {
    /* 理解提問的分類（照課本「閱讀理解提問」）：extract 提取訊息、infer 推論訊息、interpret 詮釋整合、evaluate 比較評估。只放題號，不放課文 */
    quizLevels: { qa: 'extract', qb: 'extract', qc: 'extract', qd: 'infer', qe: 'infer', qf: 'infer', qg: 'infer', qh: 'interpret',
      qi: 'interpret', qj: 'evaluate', k1: 'interpret', k2: 'evaluate' },
    /* 詮釋整合、比較評估的鷹架：think 是「想一想」的兩個步驟（不說答案），why 是「老師教你」的說明。不放課文原句 */
    quizHelp: {
      qh: { think: ['詩人送走朋友，一回家就想到明年春天，這表示他心裡掛念著誰？', '如果你很捨不得一個朋友，會不會一分開就想著下次見面？'], why: '才剛送走朋友，就想著明年朋友會不會再來，表示詩人非常看重這個朋友，捨不得分開，很重感情。' },
      qi: { think: ['詩人在秋天的夜裡，一邊散步一邊做什麼？', '他聽到松果掉下來，想到了誰？'], why: '秋天的夜裡很安靜，詩人一邊散步一邊吟詩，聽到松果落地，就想到住在山裡的好朋友可能也還沒睡。這表示他心裡一直想著朋友。' },
      qj: { think: ['兩首詩都只有幾句？每句有幾個字？', '兩首詩都在說對誰的心情？'], why: '兩首詩都是四句、每句五個字，都在寫想念朋友的心情，也都是先寫看到的景色，再說出心裡的感情。' }
    },
    /* 「說說看」改成選選看：good 兩個合理的想法（選哪一個都對）、bad 兩個不合理的，why 是老師教你的說明。不放課文原句 */
    talkChoices: {
      k1: { good: ['好朋友轉學那天，我一回家就開始想他什麼時候會回來看我們。', '表姐回國外以後，我每次看到她送我的書就想起她。'], bad: ['朋友走了，我馬上就忘記他了。', '我沒有朋友，也不想要朋友。'], why: '題目問的是和詩人一樣想念朋友的經驗。朋友轉學、表姐出國後還一直想著他們，就是珍惜友情。馬上忘記、不想要朋友，都沒有回答到題目。' },
      k2: { good: ['看到下雪，我想起去年和爺爺一起堆雪人。', '聽到下雨聲，我想起和朋友一起踩水坑的日子。'], bad: ['看到下雪，我覺得天氣很冷。', '聽到下雨聲，我就去睡覺了。'], why: '題目問的是看到景物會想起什麼人或事。看到雪想起爺爺、聽到雨想起朋友，都是由景物引起的聯想。只說天氣冷、去睡覺，沒有聯想到人或事。' }
    },
    hanzi: [
      { id: 'h-唐', combo: { type: '形聲字', pict: '上面的「庚」念起來有點像「唐」，下面是「口」。本來是說大話的意思，後來成為一個朝代的名字。' }, char: '唐', zhuyin: 'ㄊㄤˊ', radical: '口', strokes: 10, words: ['唐朝', '荒唐'], say: '唐，荒唐的唐', cloze: '荒＿', img: 'silly-clown.png', options: ['唐', '庸', '康', '糖'], clue: '這個字的下面是「口」。', explain: '答案是「唐」，下面是「口」；「康」的下面是「水」的樣子，「糖」的左邊是米字旁。', parts: ['庚', '口'], story: '下面是嘴巴，本來是說大話、說得很誇張；說出不合理的話，就是「荒唐」。後來也是一個朝代的名字，叫「唐朝」。', sentence: '這個故事太荒唐了，大家都笑了。' },
      { id: 'h-恬', combo: { layout: 'lr', parts: [['忄', 'm', '心'], ['舌', 's', '']] }, char: '恬', zhuyin: 'ㄊㄧㄢˊ', radical: '心', strokes: 9, words: ['恬淡', '恬靜'], say: '恬，恬靜的恬', cloze: '＿靜', img: 'calm-lake-hut.png', options: ['恬', '括', '活', '話'], clue: '這個字的左邊是豎心旁。', explain: '答案是「恬」，左邊是豎心旁；「括」的左邊是提手旁，「活」的左邊是三點水。', parts: ['忄', '舌'], story: '左邊是心，右邊是「舌」。心裡平平靜靜，不吵也不鬧，就是「恬靜」。', sentence: '湖邊的小村莊好恬靜。', build: { layout: 'lr', show: ['？', '舌'], answer: '忄', options: ['忄', '扌', '氵', '言'], clue: '想一想：平靜是一種心情，左邊放哪一個？' } },
      { id: 'h-罷', combo: { layout: 'tb', parts: [['罒', 'm', '網子'], ['能', 's', '']] }, char: '罷', zhuyin: 'ㄅㄚˋ', radical: '网', strokes: 15, words: ['作罷', '罷工'], say: '罷，罷工的罷', cloze: '＿工', img: 'stop-work.png', options: ['罷', '羆', '熊', '能'], clue: '這個字的上面是「罒」。', explain: '答案是「罷」，上面是「罒」；「熊」的下面是四點火，「能」沒有「罒」。', parts: ['罒', '能'], story: '上面的「罒」是網子，下面是「能」。有本事的人被網子罩住，只好停下來不做，就是「罷」；大家停下工作不做，叫「罷工」。', sentence: '工人們決定罷工一天。', build: { layout: 'tb', show: ['罒', '？'], answer: '能', options: ['能', '心', '土', '糸'], clue: '想一想：有本事的人被網子罩住，下面放哪一個？' } },
      { id: 'h-暮', combo: { layout: 'tb', parts: [['莫', 's', ''], ['日', 'm', '太陽']] }, char: '暮', zhuyin: 'ㄇㄨˋ', radical: '日', strokes: 15, words: ['日暮', '暮色'], say: '暮，暮色的暮', cloze: '＿色', img: 'sunset.png', options: ['暮', '幕', '慕', '墓'], clue: '這個字的下面是「日」。', explain: '答案是「暮」，下面是「日」；「幕」的下面是「巾」，「慕」的下面是心，「墓」的下面是「土」。', parts: ['莫', '日'], story: '上面的「莫」像太陽掉進草叢裡，下面又加了一個「日」。太陽下山、天快黑了，就是「暮」；傍晚的景色叫「暮色」。', sentence: '暮色中，小鳥紛紛飛回樹林。', build: { layout: 'tb', show: ['莫', '？'], answer: '日', options: ['日', '巾', '心', '土'], clue: '想一想：太陽下山的時候，下面放哪一個？' } },
      { id: 'h-掩', combo: { layout: 'lr', parts: [['扌', 'm', '手'], ['奄', 's', '']] }, char: '掩', zhuyin: 'ㄧㄢˇ', radical: '手', strokes: 11, words: ['遮掩', '掩護'], say: '掩，遮掩的掩', cloze: '遮＿', img: 'cover-face.png', options: ['掩', '淹', '俺', '醃'], clue: '這個字的左邊是提手旁。', explain: '答案是「掩」，左邊是提手旁；「淹」的左邊是三點水，「醃」的左邊是「酉」。', parts: ['扌', '奄'], story: '左邊是手，右邊的「奄」念起來像「掩」。用手擋住、蓋起來，就是「遮掩」；把門輕輕關上，也叫「掩上」。', sentence: '妹妹害羞的用手遮掩臉。', build: { layout: 'lr', show: ['？', '奄'], answer: '扌', options: ['扌', '氵', '亻', '酉'], clue: '想一想：擋住臉要用身體的哪個部分？' } },
      { id: 'h-柴', combo: { layout: 'tb', parts: [['此', 's', ''], ['木', 'm', '木頭']] }, char: '柴', zhuyin: 'ㄔㄞˊ', radical: '木', strokes: 10, words: ['柴扉', '木柴'], say: '柴，木柴的柴', cloze: '木＿', img: 'firewood.png', options: ['柴', '此', '紫', '些'], clue: '這個字的下面是「木」。', explain: '答案是「柴」，下面是「木」；「紫」的下面是「糸」，「些」的下面是「二」。', parts: ['此', '木'], story: '上面的「此」念起來有點像「柴」，下面是「木」。撿來燒火用的樹枝，就是「木柴」。', sentence: '爺爺把木柴放進火爐裡。', build: { layout: 'tb', show: ['此', '？'], answer: '木', options: ['木', '糸', '二', '火'], clue: '想一想：燒火用的樹枝，下面放哪一個？' } },
      { id: 'h-扉', combo: { type: '形聲字', pict: '上面的「戶」是一扇門，下面的「非」像兩片門板左右打開。兩片打開的門板，就是「扉」。' }, char: '扉', zhuyin: 'ㄈㄟ', radical: '戶', strokes: 12, words: ['柴扉', '心扉'], say: '扉，心扉的扉', cloze: '心＿', img: 'open-heart-door.png', options: ['扉', '菲', '排', '輩'], clue: '這個字的上面是「戶」。', explain: '答案是「扉」，上面是「戶」；「菲」的上面是草字頭，「排」的左邊是提手旁。', parts: ['戶', '非'], story: '上面的「戶」是門，下面的「非」像左右兩片門板。門就是「扉」；把心裡的話說出來，叫「打開心扉」。', sentence: '新同學終於打開心扉，和大家一起玩。' },
      { id: 'h-歸', combo: { type: '會意字', pict: '左邊有「止」，像腳走回來；右邊的「帚」是掃把，是家裡的東西。走回有掃把的家，就是「歸」。' }, char: '歸', zhuyin: 'ㄍㄨㄟ', radical: '止', strokes: 18, words: ['歸來', '回歸'], say: '歸，回歸的歸', cloze: '回＿', img: 'home-return.png', options: ['歸', '帚', '婦', '掃'], clue: '這個字的右邊是「帚」，左邊有「止」。', explain: '答案是「歸」；「婦」的左邊是女字旁，「掃」的左邊是提手旁。', parts: ['𠂤', '止', '帚'], story: '左邊有腳在走，右邊是家裡的掃把。走回家，就是「歸」；回到原來的地方，叫「回歸」。', sentence: '小鳥傍晚都歸巢了。' },
      { id: 'h-畢', combo: { type: '象形字', pict: '「畢」本來像一個長柄的網子，上面是「田」。用網子把田裡的東西全部抓完，所以有「完、全部」的意思。' }, char: '畢', zhuyin: 'ㄅㄧˋ', radical: '田', strokes: 11, words: ['完畢', '畢業'], say: '畢，畢業的畢', cloze: '＿業', img: 'graduation.png', options: ['畢', '華', '單', '異'], clue: '這個字的上面是「田」，下面像「華」的下半。', explain: '答案是「畢」，上面是「田」；「華」的上面是草字頭，「單」的上面是兩個「口」。', parts: ['田', '𠦒'], story: '「畢」像一個長柄網子，把田裡的東西都抓完了。事情全部做完，就是「完畢」；讀完學校的課，叫「畢業」。', sentence: '哥哥今年國小畢業了。' },
      { id: 'h-陋', combo: { type: '形聲字', pict: '左邊的「阝」是土坡，右邊念起來像「陋」。住在又窄又小的土坡旁，房子很簡單，就是「陋」。' }, char: '陋', zhuyin: 'ㄌㄡˋ', radical: '阜', strokes: 9, words: ['簡陋', '醜陋'], say: '陋，醜陋的陋', cloze: '醜＿', img: 'shabby-hut.png', options: ['陋', '漏', '陌', '丙'], clue: '這個字的左邊是阜字旁。', explain: '答案是「陋」，左邊是阜字旁；「漏」的左邊是三點水，「陌」的右邊是「百」。', parts: ['阝', '㔷'], story: '左邊的阜字旁像土坡，右邊念起來像「陋」。房子又小又簡單，就是「簡陋」；很難看，叫「醜陋」。', sentence: '故事裡的怪物長得很醜陋，心地卻很善良。' },
      { id: 'h-傍', combo: { layout: 'lr', parts: [['亻', 'm', '人'], ['旁', 's', '']] }, char: '傍', zhuyin: 'ㄅㄤ', radical: '人', strokes: 12, words: ['傍晚', '依山傍水'], say: '傍，傍晚的傍', cloze: '＿晚', img: 'evening.png', options: ['傍', '旁', '榜', '磅'], clue: '這個字的左邊是單人旁，右邊是「旁」。', explain: '答案是「傍」；「旁」沒有單人旁，「榜」的左邊是木字旁。', parts: ['亻', '旁'], story: '左邊是人，右邊是「旁」。人靠在旁邊，就是「傍」；靠近晚上的時候，叫「傍晚」。', sentence: '傍晚的天空變成了橘紅色。', build: { layout: 'lr', show: ['？', '旁'], answer: '亻', options: ['亻', '木', '石', '扌'], clue: '想一想：人靠在旁邊，左邊放哪一個？' } },
      { id: 'h-確', combo: { layout: 'lr', parts: [['石', 'm', '石頭'], ['隺', 's', '']] }, char: '確', zhuyin: 'ㄑㄩㄝˋ', radical: '石', strokes: 15, words: ['確定', '正確'], say: '確，正確的確', cloze: '正＿', img: 'check-mark.png', options: ['確', '雀', '碰', '礁'], clue: '這個字的左邊是石字旁。', explain: '答案是「確」，左邊是石字旁；「雀」沒有石字旁，「碰」的右邊是「並」。', parts: ['石', '隺'], story: '左邊是石頭，右邊念起來像「確」。像石頭一樣堅硬、不會變，就是「確定」；對的、沒有錯，叫「正確」。', sentence: '這一題的答案完全正確。', build: { layout: 'lr', show: ['？', '隺'], answer: '石', options: ['石', '木', '金', '土'], clue: '想一想：堅硬不會變的東西，左邊放哪一個？' } },
      { id: 'h-閒', combo: { type: '會意字', pict: '外面是「門」，裡面是「月」。晚上從門縫看見月亮，表示有空可以慢慢欣賞，所以「閒」是有空、不忙。' }, char: '閒', zhuyin: 'ㄒㄧㄢˊ', radical: '門', strokes: 12, words: ['閒適', '悠閒'], say: '閒，悠閒的閒', cloze: '悠＿', img: 'hammock-moon.png', options: ['閒', '間', '問', '悶'], clue: '這個字的外面是「門」，裡面是「月」。', explain: '答案是「閒」，裡面是「月」；「間」的裡面是「日」，「問」的裡面是「口」。', parts: ['門', '月'], story: '從門縫看見月亮，表示有空慢慢欣賞。不忙、很放鬆，就是「悠閒」。', sentence: '週末早上，爸爸悠閒的喝著茶。' },
      { id: 'h-詠', combo: { layout: 'lr', parts: [['言', 'm', '說話'], ['永', 's', '']] }, char: '詠', zhuyin: 'ㄩㄥˇ', radical: '言', strokes: 12, words: ['吟詠', '歌詠'], say: '詠，歌詠的詠', cloze: '歌＿', img: 'recite-poem.png', options: ['詠', '泳', '永', '訴'], clue: '這個字的左邊是言字旁。', explain: '答案是「詠」，左邊是言字旁；「泳」的左邊是三點水，「訴」的右邊是「斥」。', parts: ['言', '永'], story: '左邊是說話，右邊的「永」是長長的。把聲音拉得長長的唱出來，就是「詠」；用歌聲讚美，叫「歌詠」。', sentence: '合唱團歌詠美麗的大自然。', build: { layout: 'lr', show: ['？', '永'], answer: '言', options: ['言', '氵', '口', '扌'], clue: '想一想：念詩、唱歌要用說話的哪一個？' } },
      { id: 'h-幽', combo: { type: '會意字', pict: '外面像一座山，裡面有兩個小小的「幺」。山裡面藏著小小的東西，看不清楚，所以「幽」是又深又安靜。' }, char: '幽', zhuyin: 'ㄧㄡ', radical: '幺', strokes: 9, words: ['幽人', '幽默'], say: '幽，幽默的幽', cloze: '＿默', img: 'quiet-forest.png', options: ['幽', '出', '山', '凶'], clue: '這個字的裡面有兩個「幺」。', explain: '答案是「幽」，裡面有兩個「幺」；「出」是兩個「山」疊起來，「凶」的裡面是叉叉。', parts: ['山', '幺', '幺'], story: '山裡面藏著小小的東西，又深又安靜。很少人去、很安靜的地方，就是「幽靜」。', sentence: '爸爸說話很幽默，大家都笑了。' },
      { id: 'h-眠', combo: { layout: 'lr', parts: [['目', 'm', '眼睛'], ['民', 's', '']] }, char: '眠', zhuyin: 'ㄇㄧㄢˊ', radical: '目', strokes: 10, words: ['入眠', '睡眠'], say: '眠，睡眠的眠', cloze: '睡＿', img: 'sleep-kid.png', options: ['眠', '民', '泯', '抿'], clue: '這個字的左邊是目字旁。', explain: '答案是「眠」，左邊是目字旁；「民」沒有偏旁，「泯」的左邊是三點水。', parts: ['目', '民'], story: '左邊是眼睛，右邊的「民」念起來像「眠」。閉上眼睛休息，就是「睡眠」。', sentence: '每天要有足夠的睡眠，才會長得高。', build: { layout: 'lr', show: ['？', '民'], answer: '目', options: ['目', '氵', '扌', '口'], clue: '想一想：睡覺時要閉上什麼？' } },
      { id: 'h-職', combo: { layout: 'lr', parts: [['耳', 'm', '耳朵'], ['戠', 's', '']] }, char: '職', zhuyin: 'ㄓˊ', radical: '耳', strokes: 18, words: ['官職', '職員'], say: '職，職員的職', cloze: '＿員', img: 'jobs.png', options: ['職', '識', '織', '熾'], clue: '這個字的左邊是「耳」。', explain: '答案是「職」，左邊是「耳」；「識」的左邊是言字旁，「織」的左邊是糸字旁。', parts: ['耳', '戠'], story: '左邊是耳朵，右邊念起來像「職」。用耳朵聽清楚交代的工作，把它做好，就是「職」；在公司工作的人，叫「職員」。', sentence: '銀行的職員很有禮貌。', build: { layout: 'lr', show: ['？', '戠'], answer: '耳', options: ['耳', '言', '糸', '火'], clue: '想一想：聽清楚交代的工作，要用身體的哪個部分？' } },
      { id: 'h-吟', combo: { layout: 'lr', parts: [['口', 'm', '嘴巴'], ['今', 's', '']] }, char: '吟', zhuyin: 'ㄧㄣˊ', radical: '口', strokes: 7, words: ['吟唱', '吟詩'], say: '吟，吟詩的吟', cloze: '＿詩', img: 'recite-poem.png', options: ['吟', '含', '今', '念'], clue: '這個字的左邊是口字旁。', explain: '答案是「吟」，左邊是口字旁；「含」的口在下面，「念」的下面是心。', parts: ['口', '今'], story: '左邊是嘴巴，右邊的「今」念起來像「吟」。用嘴巴拉長聲音念詩，就是「吟詩」。', sentence: '老師搖頭晃腦的吟詩給我們聽。', build: { layout: 'lr', show: ['？', '今'], answer: '口', options: ['口', '心', '亻', '扌'], clue: '想一想：念詩要用身體的哪個部分？' } },
      { id: 'h-曠', combo: { layout: 'lr', parts: [['日', 'm', '太陽'], ['廣', 's', '']] }, char: '曠', zhuyin: 'ㄎㄨㄤˋ', radical: '日', strokes: 19, words: ['空曠', '曠野'], say: '曠，曠野的曠', cloze: '＿野', img: 'wide-field.png', options: ['曠', '礦', '擴', '廣'], clue: '這個字的左邊是日字旁。', explain: '答案是「曠」，左邊是日字旁；「礦」的左邊是石字旁，「擴」的左邊是提手旁。', parts: ['日', '廣'], story: '左邊是太陽，右邊是「廣」。陽光照在又寬又大的地方，什麼都沒擋著，就是「空曠」；一大片寬廣的野地，叫「曠野」。', sentence: '曠野上只有一棵孤單的大樹。', build: { layout: 'lr', show: ['？', '廣'], answer: '日', options: ['日', '石', '扌', '金'], clue: '想一想：陽光照在寬廣的地方，左邊放哪一個？' } }
    ],
    vocab: [
      { id: 'v-唐朝', cloze: true, clozeOptions: ['唐朝', '明天', '昨天', '下週'], word: '唐朝', meaning: '中國古代一個很強盛的年代，出了很多詩人。', example: '這首詩是＿＿的詩人寫的。', img: 'old-poet.png', options: ['唐朝', '柴扉', '幽人', '官職'] },
      { id: 'v-恬淡', cloze: true, clozeOptions: ['恬淡', '吵鬧', '貪心', '急躁'], word: '恬淡', meaning: '心裡安安靜靜，不追求名利。', example: '爺爺退休後住在山上，過著＿＿的日子。', img: 'calm-lake-hut.png', options: ['恬淡', '空曠', '簡陋', '確定'] },
      { id: 'v-作罷', cloze: true, clozeOptions: ['作罷', '出發', '開始', '繼續'], word: '作罷', meaning: '不做了，取消。', example: '下大雨了，去海邊的計畫只好＿＿。', img: 'rain-cancel.png', options: ['作罷', '完畢', '確定', '遮掩'] },
      { id: 'v-日暮', cloze: true, clozeOptions: ['日暮', '清晨', '中午', '半夜'], word: '日暮', meaning: '太陽快下山的時候。', example: '＿＿時分，農夫扛著鋤頭回家。', img: 'sunset.png', options: ['日暮', '傍晚', '入眠', '歸來'] },
      { id: 'v-遮掩', cloze: true, clozeOptions: ['遮掩', '露出', '打開', '公開'], word: '遮掩', meaning: '擋起來，不讓人看見。', example: '雲朵＿＿了月亮，天空暗了下來。', img: 'cover-face.png', options: ['遮掩', '作罷', '吟詠', '確定'] },
      { id: 'v-柴扉', cloze: true, clozeOptions: ['柴扉', '鐵門', '電梯', '窗簾'], word: '柴扉', meaning: '用樹枝木頭做的簡單小門。', example: '山上的小屋只有一扇＿＿。', img: 'wood-gate.png', options: ['柴扉', '唐朝', '幽人', '官職'] },
      { id: 'v-歸來', cloze: true, clozeOptions: ['歸來', '離開', '出門', '逃走'], word: '歸來', meaning: '回到家裡。', example: '我們在門口等著爸爸出差＿＿。', img: 'home-return.png', options: ['歸來', '入眠', '作罷', '吟唱'] },
      { id: 'v-完畢', cloze: true, clozeOptions: ['完畢', '開始', '準備', '出發'], word: '完畢', meaning: '結束了，全部做好了。', example: '考試＿＿，請大家放下筆。', img: 'test-done.png', options: ['完畢', '作罷', '確定', '歸來'] },
      { id: 'v-簡陋', cloze: true, clozeOptions: ['簡陋', '豪華', '漂亮', '高級'], word: '簡陋', meaning: '很粗糙，東西很少、不精緻。', example: '他們在山上搭了一間＿＿的小屋。', img: 'shabby-hut.png', options: ['簡陋', '恬淡', '空曠', '閒適'] },
      { id: 'v-傍晚', cloze: true, clozeOptions: ['傍晚', '早晨', '中午', '半夜'], word: '傍晚', meaning: '太陽快下山、天快黑的時候。', example: '每天＿＿，媽媽都會帶我去公園散步。', img: 'evening.png', options: ['傍晚', '日暮', '唐朝', '入眠'] },
      { id: 'v-確定', cloze: true, clozeOptions: ['確定', '懷疑', '猜猜', '亂想'], word: '確定', meaning: '很清楚，一點都不懷疑。', example: '出門前，要＿＿門鎖好了。', img: 'check-mark.png', options: ['確定', '作罷', '遮掩', '完畢'] },
      { id: 'v-閒適', cloze: true, clozeOptions: ['閒適', '忙碌', '緊張', '辛苦'], word: '閒適', meaning: '輕鬆自在又舒服。', example: '小貓躺在陽光下，看起來好＿＿。', img: 'hammock-moon.png', options: ['閒適', '簡陋', '恬淡', '空曠'] },
      { id: 'v-吟詠', cloze: true, clozeOptions: ['吟詠', '吵架', '大哭', '尖叫'], word: '吟詠', meaning: '有節奏的念詩、唱詩。', example: '詩人站在月光下，＿＿著自己寫的詩。', img: 'recite-poem.png', options: ['吟詠', '吟唱', '遮掩', '歸來'] },
      { id: 'v-幽人', cloze: true, clozeOptions: ['幽人', '小偷', '警察', '店員'], word: '幽人', meaning: '住在山林裡、不愛熱鬧的隱居者。', example: '山中的＿＿每天看書、種菜，過得很自在。', img: 'hermit.png', options: ['幽人', '唐朝', '柴扉', '官職'] },
      { id: 'v-入眠', cloze: true, clozeOptions: ['入眠', '起床', '跑步', '吃飯'], word: '入眠', meaning: '睡著了。', example: '聽著輕柔的音樂，妹妹很快就＿＿了。', img: 'sleep-kid.png', options: ['入眠', '歸來', '吟唱', '作罷'] },
      { id: 'v-官職', cloze: true, clozeOptions: ['官職', '玩具', '書包', '點心'], word: '官職', meaning: '在政府裡做事的位子和名稱。', example: '古時候，讀書人常常考試爭取＿＿。', img: 'old-official.png', options: ['官職', '唐朝', '幽人', '柴扉'] },
      { id: 'v-吟唱', cloze: true, clozeOptions: ['吟唱', '吵鬧', '哭泣', '咳嗽'], word: '吟唱', meaning: '拉長聲音、有節奏的念出歌詞。', example: '大家一起＿＿古詩，聲音好好聽。', img: 'recite-poem.png', options: ['吟唱', '吟詠', '入眠', '遮掩'] },
      { id: 'v-空曠', cloze: true, clozeOptions: ['空曠', '擁擠', '狹窄', '熱鬧'], word: '空曠', meaning: '又寬又大，沒什麼東西擋著。', example: '下課後的操場好＿＿，只剩下幾隻鴿子。', img: 'wide-field.png', options: ['空曠', '簡陋', '閒適', '恬淡'] },
      { id: 'v-耐人尋味', cloze: true, clozeOptions: ['耐人尋味', '一目了然', '淺顯易懂', '平淡無奇'], word: '耐人尋味', meaning: '意思很深，值得一想再想。', example: '這個故事的結局＿＿＿＿，大家討論了好久。', img: 'thinking-kid.png', options: ['耐人尋味', '空曠', '恬淡', '確定'] }
    ],
    charwords: [
      { id: 'cw-唐', char: '唐', img: 'silly-clown.png', charMeaning: '誇張、不合理；朝代名。', word: '荒唐', meaning: '說話或做事很不合理，讓人覺得好笑。', example: '他說貓會開飛機，真是＿＿。', options: ['荒唐', '恬靜', '罷工', '暮色'] },
      { id: 'cw-恬', char: '恬', img: 'calm-lake-hut.png', charMeaning: '安靜。', word: '恬靜', meaning: '安安靜靜、很舒服。', example: '湖邊的小屋看起來好＿＿。', options: ['恬靜', '遮掩', '木柴', '心扉'] },
      { id: 'cw-罷', char: '罷', img: 'stop-work.png', charMeaning: '停下來；完畢。', word: '罷工', meaning: '工作的人一起停下工作不做。', example: '公車司機＿＿，大家只好走路上班。', options: ['罷工', '回歸', '畢業', '醜陋'] },
      { id: 'cw-暮', char: '暮', img: 'sunset.png', charMeaning: '太陽下山的時候。', word: '暮色', meaning: '傍晚的天色。', example: '＿＿中，遠方的山變成了深藍色。', options: ['暮色', '傍晚', '正確', '悠閒'] },
      { id: 'cw-掩', char: '掩', img: 'cover-face.png', charMeaning: '遮住、關上。', word: '掩護', meaning: '擋在前面保護別人。', example: '雞媽媽張開翅膀＿＿小雞。', options: ['掩護', '歌詠', '幽靜', '睡眠'] },
      { id: 'cw-柴', char: '柴', img: 'firewood.png', charMeaning: '燒火用的樹枝。', word: '木柴', meaning: '燒火用的木頭。', example: '露營時，我們撿了一堆＿＿。', options: ['木柴', '職員', '吟詩', '曠野'] },
      { id: 'cw-扉', char: '扉', img: 'open-heart-door.png', charMeaning: '門。', word: '心扉', meaning: '心裡的門；比喻內心。', example: '他終於打開＿＿，說出心裡的話。', options: ['心扉', '荒唐', '恬靜', '罷工'] },
      { id: 'cw-歸', char: '歸', img: 'home-return.png', charMeaning: '回去、回來。', word: '回歸', meaning: '回到原來的地方。', example: '小海龜長大後會＿＿出生的海灘。', options: ['回歸', '暮色', '掩護', '木柴'] },
      { id: 'cw-畢', char: '畢', img: 'graduation.png', charMeaning: '完、全部做完。', word: '畢業', meaning: '讀完學校的課程。', example: '姐姐今年國中＿＿。', options: ['畢業', '心扉', '回歸', '醜陋'] },
      { id: 'cw-陋', char: '陋', img: 'shabby-hut.png', charMeaning: '簡單、粗糙、不好看。', word: '醜陋', meaning: '很難看。', example: '童話裡的野獸外表＿＿，心地卻很善良。', options: ['醜陋', '傍晚', '正確', '悠閒'] },
      { id: 'cw-傍', char: '傍', img: 'evening.png', charMeaning: '靠近。', word: '依山傍水', meaning: '靠著山、挨著水，風景很好。', example: '這個小村莊＿＿＿＿，非常美麗。', options: ['依山傍水', '歌詠', '幽靜', '睡眠'] },
      { id: 'cw-確', char: '確', img: 'check-mark.png', charMeaning: '真實、肯定。', word: '正確', meaning: '對的，沒有錯。', example: '他的答案完全＿＿。', options: ['正確', '職員', '吟詩', '曠野'] },
      { id: 'cw-閒', char: '閒', img: 'hammock-moon.png', charMeaning: '有空、不忙。', word: '悠閒', meaning: '不忙、很輕鬆。', example: '星期天下午，我們＿＿的在公園散步。', options: ['悠閒', '荒唐', '恬靜', '罷工'] },
      { id: 'cw-詠', char: '詠', img: 'recite-poem.png', charMeaning: '拉長聲音唱、念。', word: '歌詠', meaning: '用歌聲或詩讚美。', example: '詩人用詩句＿＿美麗的月亮。', options: ['歌詠', '暮色', '掩護', '木柴'] },
      { id: 'cw-幽', char: '幽', img: 'quiet-forest.png', charMeaning: '深、安靜。', word: '幽靜', meaning: '很安靜，很少人來。', example: '森林深處好＿＿，只聽得到鳥叫。', options: ['幽靜', '心扉', '回歸', '畢業'] },
      { id: 'cw-眠', char: '眠', img: 'sleep-kid.png', charMeaning: '睡覺。', word: '睡眠', meaning: '睡覺休息。', example: '充足的＿＿讓人精神好。', options: ['睡眠', '醜陋', '依山傍水', '正確'] },
      { id: 'cw-職', char: '職', img: 'jobs.png', charMeaning: '工作。', word: '職員', meaning: '在公司或機關工作的人。', example: '郵局的＿＿幫我把包裹寄出去。', options: ['職員', '悠閒', '歌詠', '幽靜'] },
      { id: 'cw-吟', char: '吟', img: 'recite-poem.png', charMeaning: '拉長聲音念。', word: '吟詩', meaning: '拉長聲音念詩。', example: '爺爺最喜歡在月光下＿＿。', options: ['吟詩', '睡眠', '職員', '荒唐'] },
      { id: 'cw-曠', char: '曠', img: 'wide-field.png', charMeaning: '寬廣、空空的。', word: '曠野', meaning: '一大片寬廣的野地。', example: '一匹馬在＿＿上奔跑。', options: ['曠野', '恬靜', '罷工', '暮色'] }
    ],
    /* 生字變成語：課本延伸成語，解釋和例句改成孩子聽得懂的話 */
    idioms: [
      { id: 'i-欲罷不能', situationImg: 'id-cant-stop-book.png',
        anim: { bg: 'room', a: { kid: ['🧒', 40, 62, 12], book: ['📖', 52, 54, 10], moon: ['🌙', 82, 18, 10], clock: ['⏰', 18, 24, 9], star: ['✨', 52, 40, 8, 'h'] },
          s: [['弟弟拿起一本好看的故事書。', [['bob', 'book']]],
            ['看完一頁，又想看下一頁，', [['in', 'star'], ['wig', 'book']]],
            ['時間很晚了，他還是停不下來。', [['wig', 'clock'], ['bob', 'moon']]],
            ['想停卻停不下來，就是欲罷不能。', [['pop', 'star']]]] },
        idiom: '欲罷不能', char: '罷', meaning: '想要停下來，卻停不下來。', example: '這部卡通太好看了，我一集接一集，欲罷不能。', situation: '弟弟看故事書看到很晚，想停也停不下來。',
        fill: { options: ['這個遊戲太好玩了，大家玩得＿＿＿＿。', '這本書好無聊，他看了一頁就＿＿＿＿。'], clue: '提示：哪一句是想停卻停不下來？', explain: '第一句用得對：太好玩，停不下來。看一頁就不看了，剛好相反。' } },
      { id: 'i-朝三暮四', situationImg: 'id-change-mind.png',
        anim: { bg: 'school', a: { kid: ['🧒', 30, 62, 12], p: ['🎹', 70, 40, 10], b: ['⚽', 70, 40, 10, 'h'], d: ['🎨', 70, 40, 10, 'h'], q: ['❓', 30, 36, 9, 'h'] },
          s: [['早上，小強說他要學鋼琴。', [['bob', 'p']]],
            ['中午，他又改說要踢足球。', [['out', 'p'], ['in', 'b'], ['bob', 'b']]],
            ['晚上，他又想去學畫畫。', [['out', 'b'], ['in', 'd'], ['bob', 'd']]],
            ['想法一直變來變去，就是朝三暮四。', [['in', 'q'], ['shake', 'kid']]]] },
        idiom: '朝三暮四', char: '暮', meaning: '想法一直變來變去，拿不定主意。', example: '做事要有恆心，不能朝三暮四。', situation: '小強早上想學鋼琴，中午想踢足球，晚上又想學畫畫。',
        fill: { options: ['他一下想當醫生，一下想當老師，真是＿＿＿＿。', '她從小就想當畫家，從沒變過，一點也不＿＿＿＿。'], clue: '提示：哪一句是想法一直在變？', explain: '兩句意思相反。第一句用得對：想法變來變去。從沒變過，就不是朝三暮四。' } },
      { id: 'i-掩耳盜鈴', situationImg: 'id-cover-ears.png',
        anim: { bg: 'room', a: { man: ['🧑', 30, 62, 12], ears: ['🙉', 30, 62, 12, 'h', 'as:man'], bell: ['🔔', 66, 48, 11], ring: ['🎵', 66, 30, 8, 'h'], eye: ['👀', 86, 24, 9, 'h'] },
          s: [['有個人想偷走一個鈴鐺。', [['mv', 'man', [52, 62, 700]]]],
            ['鈴鐺一動，就叮噹叮噹響。', [['wig', 'bell'], ['in', 'ring']]],
            ['他把自己的耳朵摀住，以為別人也聽不到。', [['out', 'man'], ['in', 'ears']]],
            ['其實大家都聽到了！只是騙了自己。', [['in', 'eye'], ['shake', 'eye']]]] },
        idiom: '掩耳盜鈴', char: '掩', meaning: '自己騙自己，以為別人不知道。', example: '把考卷藏起來不給媽媽看，是掩耳盜鈴，成績還是一樣。', situation: '有人想偷鈴鐺，摀住自己的耳朵，以為別人也聽不到。',
        fill: { options: ['把打破的花瓶藏到床底下，以為沒人發現，真是＿＿＿＿。', '他打破花瓶後馬上誠實道歉，一點也不＿＿＿＿。'], clue: '提示：哪一句是自己騙自己？', explain: '第一句用得對：以為藏起來就沒人知道。誠實道歉，剛好相反。' } },
      { id: 'i-賓至如歸', situationImg: 'id-warm-host.png',
        anim: { bg: 'room', a: { host: ['👩', 30, 60, 13], guest: ['🧳', 86, 66, 10], tea: ['🍵', 50, 54, 8, 'h'], home: ['🏠', 70, 30, 12, 'h'], heart: ['💗', 70, 44, 8, 'h'] },
          s: [['客人提著行李來作客。', [['mv', 'guest', [70, 66, 800]]]],
            ['主人熱情的端茶、拿點心，', [['in', 'tea'], ['bob', 'tea']]],
            ['客人覺得好溫暖、好自在，', [['in', 'heart'], ['pop', 'heart']]],
            ['就像回到自己家一樣，這就是賓至如歸。', [['in', 'home']]]] },
        idiom: '賓至如歸', char: '歸', meaning: '客人來了，就像回到自己家一樣舒服。', example: '這家民宿的主人很親切，讓我們賓至如歸。', situation: '主人熱情的招待客人，客人覺得好像回到自己家。',
        fill: { options: ['阿姨熱情招待我們，讓大家＿＿＿＿。', '店員對客人很兇，大家覺得＿＿＿＿。'], clue: '提示：哪一句是客人覺得像在自己家？', explain: '第一句用得對：熱情招待，像回家一樣。店員很兇，就不是賓至如歸。' } },
      { id: 'i-孤陋寡聞', situationImg: 'id-frog-well.png',
        anim: { bg: 'park', a: { well: ['🕳️', 50, 66, 18], frog: ['🐸', 50, 62, 9], sky: ['☁️', 50, 20, 10], world: ['🌍', 84, 24, 12, 'h'], q: ['❓', 60, 46, 8, 'h'] },
          s: [['一隻青蛙住在小小的井底。', [['bob', 'frog']]],
            ['牠抬頭只看到一小塊天空。', [['bob', 'sky']]],
            ['牠以為世界只有這麼大。', [['in', 'q'], ['shake', 'frog']]],
            ['知道的東西很少，見識不夠，就是孤陋寡聞。', [['in', 'world']]]] },
        idiom: '孤陋寡聞', char: '陋', meaning: '知道的東西很少，見識很不夠。', example: '多讀書、多出去走走，才不會孤陋寡聞。', situation: '住在井底的青蛙只看到一小塊天空，以為世界只有這麼大。',
        fill: { options: ['他從不看新聞也不讀書，有點＿＿＿＿。', '她讀了很多書、去過很多地方，一點也不＿＿＿＿。'], clue: '提示：哪一句是知道的東西很少？', explain: '第一句用得對：不看新聞也不讀書，知道得少。讀很多書、去很多地方，剛好相反。' } },
      { id: 'i-心曠神怡', situationImg: 'id-sea-breeze.png',
        anim: { bg: 'sea', a: { kid: ['🧒', 30, 62, 12], sun: ['☀️', 80, 18, 11], wind: ['🍃', 10, 40, 8], gull: ['🕊️', 60, 26, 9], smile: ['😊', 30, 62, 12, 'h', 'as:kid'] },
          s: [['站在海邊，看著藍藍的大海。', [['bob', 'sun']]],
            ['涼涼的海風吹過來，', [['mv', 'wind', [40, 46, 1000]]]],
            ['海鷗在天上自由的飛。', [['mv', 'gull', [80, 30, 1000]]]],
            ['心情好開朗、好舒服，就是心曠神怡。', [['out', 'kid'], ['in', 'smile']]]] },
        idiom: '心曠神怡', char: '曠', meaning: '心情開朗，精神很舒服。', example: '爬到山頂看到美麗的風景，讓人心曠神怡。', situation: '站在海邊吹著海風，看著海鷗，心情好舒服。',
        fill: { options: ['走在綠油油的稻田邊，讓人＿＿＿＿。', '被困在又擠又熱的電梯裡，讓人＿＿＿＿。'], clue: '提示：哪一句是心情很舒服？', explain: '第一句用得對：稻田邊很舒服。困在又擠又熱的電梯，很難受，不是心曠神怡。' } }
    ],
    /* 改錯字：sentence 是正確的句子，畫面上會把 char 換成 wrong；options 的第一個是正確的字。clue 只說語詞的意思，不能出現正確的字。 */
    fix: [
      { id: 'fx-唐', char: '唐', wrong: '康', sentence: '這首詩是唐朝的詩人寫的。', options: ['唐', '康', '庸'], clue: '這裡說的是一個古代的朝代，想一想，哪一個字的下面是「口」？', explain: '要改成「唐」。古代的朝代是「唐朝」；「康」是健康的康。' },
      { id: 'fx-恬', char: '恬', wrong: '活', sentence: '鄉下的日子很恬靜。', options: ['恬', '活', '括'], clue: '這裡是說安安靜靜，想一想，哪一個字有豎心旁？', explain: '要改成「恬」。安安靜靜是「恬靜」；「活」是生活的活。' },
      { id: 'fx-罷', char: '罷', wrong: '能', sentence: '雨太大了，比賽只好作罷。', options: ['罷', '能', '熊'], clue: '這裡是說取消不做了，想一想，哪一個字的上面是「罒」？', explain: '要改成「罷」。取消不做是「作罷」；「能」是能力的能。' },
      { id: 'fx-暮', char: '暮', wrong: '幕', sentence: '暮色降臨，路燈一盞盞亮了。', options: ['暮', '幕', '墓'], clue: '這裡說的是傍晚的天色，想一想，哪一個字的下面是「日」？', explain: '要改成「暮」。傍晚的天色是「暮色」；「幕」是布幕的幕。' },
      { id: 'fx-掩', char: '掩', wrong: '淹', sentence: '他輕輕的把房門掩上。', options: ['掩', '淹', '俺'], clue: '這裡是說把門關上，想一想，哪一個字有提手旁？', explain: '要改成「掩」。關上門是「掩上」；「淹」是淹水的淹。' },
      { id: 'fx-柴', char: '柴', wrong: '紫', sentence: '奶奶用木柴生火煮飯。', options: ['柴', '紫', '此'], clue: '這裡說的是燒火用的木頭，想一想，哪一個字的下面是「木」？', explain: '要改成「柴」。燒火用的木頭是「木柴」；「紫」是紫色的紫。' },
      { id: 'fx-扉', char: '扉', wrong: '排', sentence: '老師溫柔的話，打開了他的心扉。', options: ['扉', '排', '菲'], clue: '這裡是說心裡的門，想一想，哪一個字的上面是「戶」？', explain: '要改成「扉」。心裡的門是「心扉」；「排」是排隊的排。' },
      { id: 'fx-歸', char: '歸', wrong: '掃', sentence: '天黑了，小鳥都歸巢了。', options: ['歸', '掃', '婦'], clue: '這裡是說回到窩裡，想一想，哪一個字的左邊有「止」？', explain: '要改成「歸」。回到窩裡是「歸巢」；「掃」是掃地的掃。' },
      { id: 'fx-畢', char: '畢', wrong: '華', sentence: '哥哥從大學畢業了。', options: ['畢', '華', '單'], clue: '這裡是說讀完學校的課程，想一想，哪一個字的上面是「田」？', explain: '要改成「畢」。讀完學校是「畢業」；「華」是中華的華。' },
      { id: 'fx-陋', char: '陋', wrong: '漏', sentence: '這間小屋很簡陋，只有一張床。', options: ['陋', '漏', '陌'], clue: '這裡是說很簡單、很粗糙，想一想，哪一個字有阜字旁？', explain: '要改成「陋」。很粗糙是「簡陋」；「漏」是漏水的漏。' },
      { id: 'fx-傍', char: '傍', wrong: '旁', sentence: '傍晚時，天邊出現了美麗的晚霞。', options: ['傍', '旁', '榜'], clue: '這裡說的是天快黑的時候，想一想，哪一個字有單人旁？', explain: '要改成「傍」。天快黑的時候是「傍晚」；「旁」是旁邊的旁。' },
      { id: 'fx-確', char: '確', wrong: '雀', sentence: '請確定每一題都寫完了。', options: ['確', '雀', '碰'], clue: '這裡是說很肯定，想一想，哪一個字有石字旁？', explain: '要改成「確」。很肯定是「確定」；「雀」是麻雀的雀。' },
      { id: 'fx-閒', char: '閒', wrong: '間', sentence: '暑假時，我過得很悠閒。', options: ['閒', '間', '問'], clue: '這裡是說不忙、很輕鬆，想一想，哪一個字的「門」裡面是「月」？', explain: '要改成「閒」。不忙是「悠閒」；「間」是時間的間。' },
      { id: 'fx-詠', char: '詠', wrong: '泳', sentence: '詩人吟詠著美麗的山水。', options: ['詠', '泳', '永'], clue: '這裡是說有節奏的念詩，想一想，哪一個字有言字旁？', explain: '要改成「詠」。念詩是「吟詠」；「泳」是游泳的泳。' },
      { id: 'fx-幽', char: '幽', wrong: '凶', sentence: '山谷裡又涼爽又幽靜。', options: ['幽', '凶', '出'], clue: '這裡是說很安靜，想一想，哪一個字的裡面有兩個「幺」？', explain: '要改成「幽」。很安靜是「幽靜」；「凶」是凶猛的凶。' },
      { id: 'fx-眠', char: '眠', wrong: '民', sentence: '熊在冬天要冬眠。', options: ['眠', '民', '抿'], clue: '這裡是說冬天的長長睡覺，想一想，哪一個字有目字旁？', explain: '要改成「眠」。冬天睡覺是「冬眠」；「民」是人民的民。' },
      { id: 'fx-職', char: '職', wrong: '識', sentence: '他的職業是消防員。', options: ['職', '識', '織'], clue: '這裡說的是做的工作，想一想，哪一個字的左邊是「耳」？', explain: '要改成「職」。做的工作是「職業」；「識」是認識的識。' },
      { id: 'fx-吟', char: '吟', wrong: '含', sentence: '詩人站在月下吟詩。', options: ['吟', '含', '念'], clue: '這裡是說拉長聲音念詩，想一想，哪一個字的「口」在左邊？', explain: '要改成「吟」。念詩是「吟詩」；「含」是含著的含。' },
      { id: 'fx-曠', char: '曠', wrong: '礦', sentence: '這片曠野上開滿了野花。', options: ['曠', '礦', '擴'], clue: '這裡說的是一大片寬廣的野地，想一想，哪一個字有日字旁？', explain: '要改成「曠」。寬廣的野地是「曠野」；「礦」是礦石的礦。' }
    ],
    similar: [
      { id: 's1', meaning: '「健＿」是身體很好，沒有生病。', sentence: '多運動，身體才會健＿。', frame: '健＿', options: ['康', '唐'], answer: '康', clue: '提示：這個字的下面不是「口」。', explain: '答案是「康」；「唐」是唐朝的唐，下面是「口」。' },
      { id: 's2', meaning: '「生＿」是每天過日子的樣子。', sentence: '鄉下的生＿很簡單。', frame: '生＿', options: ['活', '恬'], answer: '活', clue: '提示：這個字的左邊是三點水。', explain: '答案是「活」；「恬」是恬靜的恬，有豎心旁。' },
      { id: 's3', meaning: '「＿貓」是黑白相間、愛吃竹子的動物。', sentence: '動物園的＿貓正在吃竹子。', frame: '＿貓', options: ['熊', '罷'], answer: '熊', clue: '提示：這個字的下面是四點。', explain: '答案是「熊」；「罷」是罷工的罷。' },
      { id: 's4', meaning: '「開＿」是表演或活動開始。', sentence: '運動會的開＿典禮好熱鬧。', frame: '開＿', options: ['幕', '暮'], answer: '幕', clue: '提示：這個字的下面是「巾」。', explain: '答案是「幕」；「暮」是暮色的暮，下面是「日」。' },
      { id: 's5', meaning: '「＿水」是大水漫到路上或家裡。', sentence: '大雨讓馬路＿水了。', frame: '＿水', options: ['淹', '掩'], answer: '淹', clue: '提示：這個字的左邊是三點水。', explain: '答案是「淹」；「掩」是遮掩的掩，有提手旁。' },
      { id: 's6', meaning: '「＿色」是像葡萄那樣的顏色。', sentence: '她穿了一件＿色的裙子。', frame: '＿色', options: ['紫', '柴'], answer: '紫', clue: '提示：這個字的下面是「糸」。', explain: '答案是「紫」；「柴」是木柴的柴，下面是「木」。' },
      { id: 's7', meaning: '「＿隊」是一個接一個站好。', sentence: '大家＿隊上公車。', frame: '＿隊', options: ['排', '扉'], answer: '排', clue: '提示：這個字的左邊是提手旁。', explain: '答案是「排」；「扉」是心扉的扉。' },
      { id: 's8', meaning: '「＿地」是把地上的灰塵清乾淨。', sentence: '下課後，我們一起＿地。', frame: '＿地', options: ['掃', '歸'], answer: '掃', clue: '提示：這個字的左邊是提手旁。', explain: '答案是「掃」；「歸」是回歸的歸。' },
      { id: 's9', meaning: '「＿邊」是靠近的地方。', sentence: '我的座位在窗戶＿邊。', frame: '＿邊', options: ['旁', '傍'], answer: '旁', clue: '提示：這個字的左邊沒有「亻」。', explain: '答案是「旁」；「傍」是傍晚的傍。' },
      { id: 's10', meaning: '「時＿」是幾點幾分、多久。', sentence: '下課時＿到了。', frame: '時＿', options: ['間', '閒'], answer: '間', clue: '提示：這個字的「門」裡面是「日」。', explain: '答案是「間」；「閒」是悠閒的閒，裡面是「月」。' },
      { id: 's11', meaning: '「游＿」是在水裡划手踢腳前進。', sentence: '夏天我最喜歡去游＿。', frame: '游＿', options: ['泳', '詠'], answer: '泳', clue: '提示：和水有關，左邊是三點水。', explain: '答案是「泳」；「詠」是吟詠的詠，有言字旁。' },
      { id: 's12', meaning: '「認＿」是知道是誰、是什麼。', sentence: '我認＿這隻小狗的主人。', frame: '認＿', options: ['識', '職'], answer: '識', clue: '提示：這個字的左邊是言字旁。', explain: '答案是「識」；「職」是職員的職，左邊是「耳」。' }
    ],
    listen: [
      { id: 'l1', text: '太陽快下山、天快黑的時候。', answer: 0, options: [{ text: '傍晚', img: 'evening.png' }, { text: '唐朝', img: 'old-poet.png' }, { text: '入眠', img: 'sleep-kid.png' }, { text: '空曠', img: 'wide-field.png' }] },
      { id: 'l2', text: '用樹枝木頭做的簡單小門。', answer: 0, options: [{ text: '柴扉', img: 'wood-gate.png' }, { text: '官職', img: 'old-official.png' }, { text: '幽人', img: 'hermit.png' }, { text: '唐朝', img: 'old-poet.png' }] },
      { id: 'l3', text: '操場上只剩下幾隻鴿子，又寬又大。', answer: 0, options: [{ text: '空曠', img: 'wide-field.png' }, { text: '簡陋', img: 'shabby-hut.png' }, { text: '閒適', img: 'hammock-moon.png' }, { text: '確定', img: 'check-mark.png' }] },
      { id: 'l4', text: '下大雨，去海邊的計畫取消了。', answer: 0, options: [{ text: '作罷', img: 'rain-cancel.png' }, { text: '完畢', img: 'test-done.png' }, { text: '歸來', img: 'home-return.png' }, { text: '遮掩', img: 'cover-face.png' }] },
      { id: 'l5', text: '小屋很粗糙，只有一張床。', answer: 0, options: [{ text: '簡陋', img: 'shabby-hut.png' }, { text: '恬淡', img: 'calm-lake-hut.png' }, { text: '空曠', img: 'wide-field.png' }, { text: '確定', img: 'check-mark.png' }] },
      { id: 'l6', text: '聽著輕柔的音樂，妹妹睡著了。', answer: 0, options: [{ text: '入眠', img: 'sleep-kid.png' }, { text: '吟唱', img: 'recite-poem.png' }, { text: '歸來', img: 'home-return.png' }, { text: '作罷', img: 'rain-cancel.png' }] },
      { id: 'l7', text: '這個故事意思很深，讓人一想再想。', answer: 0, options: [{ text: '耐人尋味', img: 'thinking-kid.png' }, { text: '空曠', img: 'wide-field.png' }, { text: '恬淡', img: 'calm-lake-hut.png' }, { text: '閒適', img: 'hammock-moon.png' }] },
      { id: 'l8', text: '住在山林裡、不愛熱鬧的人。', answer: 0, options: [{ text: '幽人', img: 'hermit.png' }, { text: '官職', img: 'old-official.png' }, { text: '柴扉', img: 'wood-gate.png' }, { text: '唐朝', img: 'old-poet.png' }] }
    ],
    /* ---------- 短語、句型、修辭（句子都是 Claude 自己寫的） ---------- */
    phrase: {
      /* 拼短語每一格下面寫要放什麼樣的詞 */
      fillLabels: { before: '做出', answer: '怎麼樣', noun: '什麼東西' },
      pickName: '看圖選一選', pickSay: '看圖，選出最適合的詞，說說看做出了什麼樣的東西。',
      /* 短語：動詞＋出＋形容詞＋的＋名詞（課本的例子是課文原句，這裡換成自己寫的） */
      intro: { example: '說出溫暖的話', img: 'pr-kind-words.png',
        parts: [{ text: '說出', role: '做出' }, { text: '溫暖', role: '怎麼樣' }, { text: '的' }, { text: '話', role: '什麼東西' }],
        explain: '先說做了什麼，加上「出」，再說出東西的樣子，加上「的」，最後說是什麼東西。' },
      pick: [
        { id: 'ph1', img: 'pr-draw-mountain.png', before: '畫出', noun: '山水', ask: '畫出什麼樣的山水', look: '再看看圖片，畫裡的山和水看起來怎麼樣？', options: ['優美', '醜陋', '吵鬧', '苦澀'], clue: '提示：大家看了都說好漂亮，想去那裡走走。', explain: '答案是「優美」，完整的短語是「畫出優美的山水」。' },
        { id: 'ph2', img: 'pr-write-poem.png', before: '寫出', noun: '詩句', ask: '寫出什麼樣的詩句', look: '再看看圖片，讀詩的人表情怎麼樣？', options: ['感人', '無聊', '可怕', '吵鬧'], clue: '提示：讀完以後，奶奶擦了擦眼淚。', explain: '答案是「感人」，完整的短語是「寫出感人的詩句」。' },
        { id: 'ph3', img: 'pr-blow-bubble.png', before: '吹出', noun: '泡泡', ask: '吹出什麼樣的泡泡', look: '再看看圖片，泡泡有多大？', options: ['巨大', '迷你', '苦澀', '冰冷'], clue: '提示：比小朋友的頭還要寬好幾倍。', explain: '答案是「巨大」，完整的短語是「吹出巨大的泡泡」。' },
        { id: 'ph4', img: 'pr-play-music.png', before: '彈出', noun: '樂曲', ask: '彈出什麼樣的樂曲', look: '再看看圖片，大家聽了想做什麼？', options: ['輕快', '沉重', '苦澀', '冰冷'], clue: '提示：聽了讓人想跟著跳起舞來。', explain: '答案是「輕快」，完整的短語是「彈出輕快的樂曲」。' },
        { id: 'ph5', img: 'pr-knit-scarf.png', before: '織出', noun: '圍巾', ask: '織出什麼樣的圍巾', look: '再看看圖片，圍巾摸起來會是什麼感覺？', options: ['溫暖', '冰涼', '刺痛', '粗糙'], clue: '提示：冬天圍在脖子上，一點都不冷。', explain: '答案是「溫暖」，完整的短語是「織出溫暖的圍巾」。' },
        { id: 'ph6', img: 'pr-light-lamp.png', before: '點出', noun: '燈光', ask: '點出什麼樣的燈光', look: '再看看圖片，燈亮不亮？', options: ['明亮', '昏暗', '冰冷', '吵鬧'], clue: '提示：整個房間都照得清清楚楚。', explain: '答案是「明亮」，完整的短語是「點出明亮的燈光」。' },
        { id: 'ph7', img: 'pr-pick-fruit.png', before: '摘出', noun: '果子', ask: '摘出什麼樣的果子', look: '再看看圖片，果子看起來成熟了嗎？', options: ['飽滿', '乾癟', '發霉', '苦澀'], clue: '提示：圓滾滾的，好像要撐破皮了。', explain: '答案是「飽滿」，完整的短語是「摘出飽滿的果子」。' },
        { id: 'ph8', img: 'pr-sing-gentle.png', before: '唱出', noun: '搖籃曲', ask: '唱出什麼樣的搖籃曲', look: '再看看圖片，寶寶聽了怎麼樣？', options: ['柔和', '刺耳', '吵鬧', '可怕'], clue: '提示：寶寶聽著聽著就睡著了。', explain: '答案是「柔和」，完整的短語是「唱出柔和的搖籃曲」。' }
      ],
      say: [],
      words: [
        { word: '恬淡', meaning: '心裡安安靜靜，不追求名利。', img: 'calm-lake-hut.png' },
        { word: '耐人尋味', meaning: '意思很深，值得一想再想。', img: 'thinking-kid.png' },
        { word: '空曠', meaning: '又寬又大，沒什麼東西擋著。', img: 'wide-field.png' },
        { word: '確定', meaning: '很清楚，一點都不懷疑。', img: 'check-mark.png' }
      ],
      choose: [
        { id: 'pw1', word: '恬淡', options: ['外公住在山上種菜，過著恬淡的生活。', '他每天都想著賺大錢、搶第一，生活很恬淡。'], clue: '提示：想一想，「恬淡」是安靜不求名利，還是一直想搶？', explain: '第一句用得對：住山上種菜，很安靜。一直想賺錢搶第一，剛好相反。' },
        { id: 'pw2', word: '耐人尋味', options: ['這首詩只有短短四句，卻耐人尋味。', '這張紙上什麼都沒寫，真是耐人尋味。'], clue: '提示：想一想，「耐人尋味」是要有很深的意思嗎？', explain: '第一句用得對：短短的詩意思很深。白紙上什麼都沒有，沒有意思可以想。' },
        { id: 'pw3', word: '空曠', options: ['晚上的停車場很空曠，一輛車也沒有。', '電影院坐滿了人，非常空曠。'], clue: '提示：想一想，「空曠」是空空的，還是擠滿了？', explain: '第一句用得對：停車場空空的。坐滿了人，剛好相反。' },
        { id: 'pw4', word: '確定', options: ['我確定把作業放進書包了。', '我確定自己不知道，好像有，又好像沒有。'], clue: '提示：想一想，「確定」是很肯定，還是不知道？', explain: '第一句用得對：很肯定放進書包了。好像有又好像沒有，就是不確定。' }
      ],
      make: [
        { id: 'pm1', word: '恬淡', clue: '提示：想想看，誰過著安靜、不追求名利的生活？', model: '住在海邊的阿嬤每天看海、種花，生活很恬淡。' },
        { id: 'pm2', word: '耐人尋味', clue: '提示：想想看，有什麼故事或話讓你想了很久？', model: '老師說的那句話耐人尋味，我想了好幾天。' },
        { id: 'pm3', word: '空曠', clue: '提示：想想看，什麼地方又寬又大、沒有人？', model: '放學後的教室好空曠，只剩下我一個人。' },
        { id: 'pm4', word: '確定', clue: '提示：想想看，出門前要確定什麼事？', model: '出門前，我確定瓦斯已經關好了。' }
      ]
    },
    pattern: [
      { key: 'yibian2', id: 'yb', title: '一邊……一邊……', img: 'yibian10.png',
        meaning: '用兩個「一邊」，說出同一個人在同一個時候，做兩件事。',
        examples: ['爺爺一邊散步，一邊哼著歌。'],
        match: [
          { id: 'pt-yb-m1', img: 'pt-walk-sing.png', front: '妹妹一邊走路，', options: ['一邊唱著兒歌。', '一邊睡著了。', '一邊停下來。'], clue: '提示：看看圖片，妹妹走路時嘴巴在做什麼？', explain: '答案是「一邊唱著兒歌」：走路和唱歌同時做。' },
          { id: 'pt-yb-m2', img: 'pt-eat-read.png', front: '哥哥一邊吃早餐，', options: ['一邊看報紙。', '一邊吃早餐。', '一邊去上學。'], clue: '提示：看看圖片，哥哥吃早餐時手上拿著什麼？', explain: '答案是「一邊看報紙」：吃早餐和看報紙同時做。' },
          { id: 'pt-yb-m3', img: 'pt-cook-talk.png', front: '媽媽一邊煮菜，', options: ['一邊和我聊天。', '一邊在睡覺。', '一邊出門了。'], clue: '提示：看看圖片，媽媽煮菜時在跟誰說話？', explain: '答案是「一邊和我聊天」：煮菜和聊天同時做。' }
        ],
        conj: [
          { id: 'pt-yb-c1', full: '詩人一邊看月亮，一邊吟詩。', img: 'pt-moon-poem.png', sentence: '詩人＿＿看月亮，＿＿吟詩。', options: ['一邊……一邊……', '雖然……卻……', '如果……就……'], clue: '提示：同一個時候做兩件事。數數看有幾個空格。', explain: '答案是「一邊……一邊……」：詩人一邊看月亮，一邊吟詩。' },
          { id: 'pt-yb-c2', full: '我一邊寫功課，一邊聽音樂。', img: 'pt-homework-music.png', sentence: '我＿＿寫功課，＿＿聽音樂。', options: ['一邊……一邊……', '雖然……卻……', '如果……就……'], clue: '提示：寫功課和聽音樂同時做。數數看有幾個空格。', explain: '答案是「一邊……一邊……」：我一邊寫功課，一邊聽音樂。' }
        ],
        half: [
          { id: 'pt-yb-h1', front: '弟弟一邊洗澡，', clue: '提示：洗澡時，他還會同時做什麼？記得要說「一邊」。', model: '一邊玩小鴨子。' },
          { id: 'pt-yb-h2', front: '我們一邊爬山，', clue: '提示：爬山時，還可以同時做什麼？記得要說「一邊」。', model: '一邊欣賞路邊的風景。' }
        ],
        whole: [
          { id: 'pt-yb-w1', clue: '提示：用兩個「一邊」，說一個人同時做的兩件事。想想看：你常常同時做哪兩件事？', model: '我一邊吃點心，一邊看故事書。' }
        ] },
      { key: 'suiran', id: 'sr', title: '雖然……卻……', img: 'suiranque10.png',
        meaning: '先用「雖然」說一件事，再用「卻」說出和想的不一樣、相反的結果。',
        examples: ['這首詩雖然很短，意思卻很深。'],
        match: [
          { id: 'pt-sr-m1', img: 'pt-far-friend.png', front: '我們雖然住得很遠，', options: ['感情卻一直很好。', '住得卻很遠。', '卻是兩個人。'], clue: '提示：看看圖片，兩個人在視訊時表情怎麼樣？', explain: '答案是「感情卻一直很好」：住得遠，感情卻好，前後相反。' },
          { id: 'pt-sr-m2', img: 'pt-small-house.png', front: '這間小屋雖然很簡陋，', options: ['住起來卻很溫暖。', '卻是一間屋子。', '卻很簡陋。'], clue: '提示：看看圖片，屋子裡的人開心嗎？', explain: '答案是「住起來卻很溫暖」：簡陋，卻溫暖，前後相反。' },
          { id: 'pt-sr-m3', img: 'pt-tired-smile.png', front: '爸爸雖然工作很累，', options: ['卻還是陪我玩。', '卻工作很累。', '卻在工作。'], clue: '提示：看看圖片，爸爸回家後在做什麼？', explain: '答案是「卻還是陪我玩」：很累，卻還陪我玩，前後相反。' }
        ],
        conj: [
          { id: 'pt-sr-c1', full: '天氣雖然很冷，我的心卻暖暖的。', img: 'pt-cold-warm.png', sentence: '天氣＿＿很冷，我的心＿暖暖的。', options: ['雖然……卻……', '一邊……一邊……', '如果……就……'], clue: '提示：天氣冷，心卻是暖的，前後相反。數數看有幾個空格。', explain: '答案是「雖然……卻……」：天氣雖然很冷，我的心卻暖暖的。' },
          { id: 'pt-sr-c2', full: '他雖然年紀小，卻很懂事。', img: 'pt-young-help.png', sentence: '他＿＿年紀小，＿很懂事。', options: ['雖然……卻……', '一邊……一邊……', '如果……就……'], clue: '提示：年紀小，卻很懂事，前後相反。數數看有幾個空格。', explain: '答案是「雖然……卻……」：他雖然年紀小，卻很懂事。' }
        ],
        half: [
          { id: 'pt-sr-h1', front: '好朋友雖然搬家了，', clue: '提示：搬家了，你們還是怎麼樣？記得要說「卻」。', model: '我們卻常常寫信聯絡。' },
          { id: 'pt-sr-h2', front: '這首歌雖然很老了，', clue: '提示：歌很老，大家覺得怎麼樣？記得要說「卻」。', model: '卻還是很多人愛唱。' }
        ],
        whole: [
          { id: 'pt-sr-w1', clue: '提示：先用「雖然」說一件事，再用「卻」說相反的結果。想想看：有什麼事和你想的不一樣？', model: '雖然下著雨，大家的心情卻很好。' }
        ] }
    ],
    rhetoric: {
      cards: [
        { key: 'question', name: '設問', meaning: '用問句來說話，引起大家注意。有時自己問、自己回答；有時只問不答，答案就藏在問題裡。', example: '第一首詩最後問：朋友明年還會不會回來？這個問題沒有回答，卻讓人感受到詩人的盼望。',
          show: { sentence: '明年的春天，你還會來看我嗎？' },
          yesno: [
            { id: 'rh-qu-y1', sentence: '月亮這麼圓，遠方的你也在看嗎？', answer: true, clue: '提示：這句話是不是用問題來表達想念？', explain: '是設問：用問題說出對遠方朋友的想念。' },
            { id: 'rh-qu-y2', sentence: '今晚的月亮很圓。', answer: false, clue: '提示：這句話裡有沒有問題？', explain: '不是設問：這句話沒有用問句。' }
          ],
          pick: [
            { id: 'rh-qu-p1', options: ['老朋友，你過得好嗎？', '我很想念老朋友。'], clue: '提示：哪一句用問題來說話？', explain: '「你過得好嗎」是設問。' },
            { id: 'rh-qu-p2', options: ['誰不想念遠方的家人呢？', '我想念家人。'], clue: '提示：哪一句用問題來說話，答案藏在問題裡？', explain: '答案藏在問題裡：大家都想念家人，是設問。' },
            { id: 'rh-qu-p3', options: ['什麼是好朋友？就是常常想起你的人。', '他是我的朋友。', '我們一起玩。'], clue: '提示：哪一句先問再自己回答？', explain: '先問「什麼是好朋友」，再自己回答，是設問。' },
            { id: 'rh-qu-p4', options: ['秋天的夜晚，你聽到松果掉下來了嗎？', '秋天到了。', '樹上有松果。'], clue: '提示：哪一句用問題引起注意？', explain: '用問題引起注意，是設問。' },
            { id: 'rh-qu-p5', options: ['為什麼詩人睡不著？因為他想念朋友。', '詩人在散步。', '夜晚很涼。', '他寫了一首詩。'], clue: '提示：哪一句先問「為什麼」，再自己回答？', explain: '先問再答，是設問。' },
            { id: 'rh-qu-p6', options: ['還有什麼比老朋友更珍貴呢？', '老朋友很珍貴。', '我們認識很久了。', '他住在山上。'], clue: '提示：哪一句用問題來說話，答案藏在問題裡？', explain: '答案藏在問題裡：老朋友最珍貴，是設問。' }
          ] },
        { key: 'repeat', name: '類疊', meaning: '同一個字或詞連著重複，或隔開來重複說好幾次，讀起來有節奏，也讓人印象更深。', example: '課文說讀者會「細細」品味，把「細」說了兩次，表示讀得很慢、很仔細。',
          show: { sentence: '輕輕的風吹著，靜靜的夜晚到了。', mark: ['輕輕', '靜靜'] },
          yesno: [
            { id: 'rh-rp-y1', sentence: '他慢慢的走，慢慢的想。', answer: true, mark: ['慢慢的'], clue: '提示：找找看，有沒有同一個詞重複出現？', explain: '是類疊：「慢慢的」說了兩次，而且「慢」也連著重複。' },
            { id: 'rh-rp-y2', sentence: '他走在山路上。', answer: false, clue: '提示：找找看，有沒有同一個字或詞重複出現？', explain: '不是類疊：這句話沒有重複的字或詞。' }
          ],
          pick: [
            { id: 'rh-rp-p1', mark: ['一顆顆'], options: ['一顆顆松果掉在地上。', '松果掉在地上。'], clue: '提示：哪一句有連著重複的字？', explain: '「一顆顆」是類疊。' },
            { id: 'rh-rp-p2', mark: ['綠綠的'], options: ['春天的草綠綠的。', '春天的草是綠色的。'], clue: '提示：哪一句有重複的字？', explain: '「綠綠的」是類疊。' },
            { id: 'rh-rp-p3', mark: ['靜悄悄'], options: ['山上靜悄悄的。', '山上沒有人。', '山很高。'], clue: '提示：哪一句有連著重複的字？', explain: '「靜悄悄」是類疊。' },
            { id: 'rh-rp-p4', mark: ['想你', '想你'], options: ['想你，好想你。', '我記得你。', '你住在遠方。'], clue: '提示：哪一句把同一個詞說了兩次？', explain: '「想你」說了兩次，是類疊。' },
            { id: 'rh-rp-p5', mark: ['涼涼的'], options: ['秋天的風涼涼的。', '秋天到了。', '樹葉變黃了。', '風在唱歌。'], clue: '提示：哪一句有重複的字？', explain: '「涼涼的」是類疊。' },
            { id: 'rh-rp-p6', mark: ['一步一步'], options: ['他一步一步走下山。', '他走下山了。', '天黑了。', '路上有石頭。'], clue: '提示：哪一句把同一個詞說了兩次？', explain: '「一步一步」是類疊。' }
          ] }
      ],
      quiz: [
        { id: 'rh1', sentence: '遠方的朋友，你什麼時候回來？', answer: '設問', clue: '提示：這句話有沒有用問題說話？', explain: '答案是「設問」：用問題表達盼望。' },
        { id: 'rh2', sentence: '什麼最讓人想念？就是一起長大的朋友。', answer: '設問', clue: '提示：這句話是不是先問再答？', explain: '答案是「設問」：先問再自己回答。' },
        { id: 'rh3', sentence: '小溪嘩啦啦的流過山谷。', answer: '類疊', mark: ['嘩啦啦'], clue: '提示：這句話有沒有重複的字？', explain: '答案是「類疊」：「嘩啦啦」重複了「啦」。' },
        { id: 'rh4', sentence: '月光白白的，照在窗前。', answer: '類疊', mark: ['白白的'], clue: '提示：這句話有沒有連著重複的字？', explain: '答案是「類疊」：「白白的」重複了「白」。' }
      ]
    }
  };
  if (typeof module === 'object' && module.exports) module.exports = d;
  else { root.H3A_WORDS = root.H3A_WORDS || {}; root.H3A_WORDS.L10 = d; }
})(this);
