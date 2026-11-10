const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs'); const path = require('node:path');
const { validateWords } = require('../../assets/core/wordsschema.js');
const { validateLesson } = require('../../assets/core/lessonschema.js');
const { locate } = require('../../assets/core/locate.js');
const W = require('../../data/lesson02.words.js');

const pendingImgs = (() => {
  const md = fs.readFileSync(path.join(__dirname, '../../docs/image-list.md'), 'utf8');
  return md.split(/\n## /).filter(sec => sec.split('\n')[0].includes('待生成'))
    .flatMap(sec => [...sec.matchAll(/`([a-z0-9-]+\.png)`/g)].map(m => m[1]));
})();
const imgOk = f => fs.existsSync(path.join(__dirname, '../../images/L02', f)) || pendingImgs.includes(f);

test('第 2 課字詞資料格式正確', () => { assert.deepEqual(validateWords(W), []); });
test('第 2 課 15 個生字都在課本語詞和生字語詞裡', () => {
  assert.equal(W.hanzi.map(h => h.char).join(''), '德乎血攝颱錄哀巒縱臍禍殘檳榔降鏟汙斷');
  const words = W.vocab.map(v => v.word).join('');
  W.hanzi.forEach(h => assert.ok(words.includes(h.char), h.char));
  assert.equal(W.charwords.map(c => c.char).join(''), W.hanzi.map(h => h.char).join(''));
  W.hanzi.forEach(h => assert.ok(h.parts.length && h.story && h.sentence.includes(h.char), h.id));
});
test('第 2 課生字挖空、線索不說答案', () => {
  for (const h of W.hanzi) { assert.ok(h.words.includes(h.cloze.replace('＿', h.char)), h.id); assert.ok(!h.clue.includes(h.char), h.id); }
  for (const s of W.similar) assert.ok(!s.clue.includes(s.answer), s.id);
  for (const v of W.vocab) assert.ok(!v.example.includes(v.word), v.id);
});
test('第 2 課圖片都在 images/L02，或列在待生成清單', () => {
  const p = W.phrase;
  const imgs = [...W.hanzi.map(h => h.img), ...W.vocab.map(v => v.img), ...W.charwords.map(c => c.img), ...W.idioms.map(x => x.situationImg),
    ...W.listen.flatMap(l => l.options.map(o => o.img)), p.intro.img, ...p.pick.map(x => x.img), ...p.say.map(x => x.img), ...p.words.map(x => x.img),
    ...W.pattern.flatMap(pt => [pt.img, ...pt.match.map(x => x.img), ...pt.conj.map(x => x.img)])];
  for (const f of imgs.filter(Boolean)) assert.ok(imgOk(f), f);
});
test('第 2 課修辭：譬喻、摹寫，每關 2 題是不是、6 題選選看', () => {
  assert.deepEqual(W.rhetoric.cards.map(c => c.key), ['simile', 'sense']);
  for (const c of W.rhetoric.cards) {
    assert.deepEqual(c.yesno.map(y => y.answer), [true, false], c.key);
    assert.deepEqual(c.pick.map(p => p.options.length), [2, 2, 3, 3, 4, 4], c.key);
  }
  for (const c of W.rhetoric.cards) assert.equal(W.rhetoric.quiz.filter(q => q.answer === c.name).length, 2, c.name);
  /* 疊字以外的選項不能有兩個一樣的字連在一起 */
  const aa = t => /(.)\1/.test(t.replace(/[，。！？、；]/g, ''));
  W.rhetoric.cards.forEach(c => c.pick.forEach(p => p.options.slice(1).forEach(o => assert.ok(!aa(o), p.id + ' ' + o))));
});
test('第 2 課公開資料裡沒有課文原句', () => {
  const all = JSON.stringify(W);
  ['一種飛船', '血液裡帶有', '天生的因子', '嚮往飛行', '從雲上探出頭', '飛上雲端', '二十多年來', '各個角落', '體力和眼力', '莫拉克', '催我趕緊', '安定的工作', '昂貴而困難', '長達三年', '美麗與哀愁', '如同翠玉', '縱谷又深又長', '像臍帶似的', '遠古以來', '潮水聲', '無聲無息，卻又', '農婦', '稻浪隨風擺動', '高樓林立', '一如甲蟲', '這就是我的家', '天災與人禍', '殘破的一面', '高山作物', '水土保持', '一鏟一鏟', '換取經濟', '被汙水染黑', '難治的病', '超抽地下水', '地層不斷', '多點美麗', '人禍卻能避免', '吳念真', '呵護我們的土地', '善待這塊土地', '九個大腳印', '腳踏實地愛臺灣', '走入你的心裡', '看見幸福', '淡淡的哀傷', '淺淺的思念', '溫馨而難忘', '艱苦而困難', '豐富而精采', '季節無聲無息', '光陰總是', '雪白的地毯', '工廠林立', '車水馬龍', '世代相傳', '繼承家業', '一夜致富', '耍小聰明', '借題發揮', '滿城風雨', '墾丁', '瑜伽', '市容', '改編成劇本', '堅定的信念', '持之以恆'].forEach(t => assert.ok(!all.includes(t), t));
});
test('第 2 課課文原稿（有的話）格式正確、依據句找得到', { skip: !fs.existsSync(path.join(__dirname, '../../content/lesson02.plain.json')) }, () => {
  const l = JSON.parse(fs.readFileSync(path.join(__dirname, '../../content/lesson02.plain.json'), 'utf8'));
  assert.deepEqual(validateLesson(l), []);
  assert.equal(l.paragraphs.length, 6);
  l.quiz.concat(l.testExtra, [l.storyMap.tail]).filter(q => !q.hints).forEach(q => assert.ok(locate(l, q.evidence).sentIds.length, q.id));
  l.storyMap.bones.forEach(b => assert.ok(locate(l, b.evidence).sentIds.length, b.id));
  const imgs = [l.storyMap.head.img, ...l.storyMap.bones.flatMap(b => b.cards.map(c => c.img)), ...l.storyMap.decoys.map(c => c.img),
    ...l.vocab.map(v => v.img), ...l.quiz.concat(l.testExtra).flatMap(q => q.options.map(o => o.img))];
  for (const f of imgs.filter(Boolean)) assert.ok(imgOk(f), f);
});
test('第 2 課句型：原本……但……、為了……、只有……才……', () => {
  assert.deepEqual(W.pattern.map(pt => pt.key), ['yuanbendan', 'weile', 'zhiyoucai']);
  const S = require('../../assets/core/speechcheck.js');
  for (const pt of W.pattern) for (const t of pt.examples.concat(pt.conj.map(c => c.full))) assert.equal(S.check({ kind: 'pattern', key: pt.key }, t).status, 'pending', t);
  for (const pt of W.pattern) for (const c of pt.conj) assert.equal(c.sentence.split('＿').join('').length + S.PATTERNS[pt.key].join('').length, c.full.length, c.id);
  /* 正確的接句不能明顯比別的選項長 */
  for (const pt of W.pattern) for (const m of pt.match) assert.ok(m.options[0].length <= Math.max(...m.options.slice(1).map(o => o.length)) + 2, m.id);
});
test('第 2 課短語的提示不和答案有一樣的字', () => {
  W.phrase.pick.concat((W.phrase.phrase2 || {}).pick || []).forEach(x => assert.ok(![...x.options[0]].some(c => x.clue.includes(c)), x.id + ' ' + x.clue));
});
test('第 2 課人事時地物：五個都有', () => { assert.deepEqual(W.wh.map(x => x.key).join(''), '人事時地物'); });
