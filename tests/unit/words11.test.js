const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs'); const path = require('node:path');
const { validateWords } = require('../../assets/core/wordsschema.js');
const { validateLesson } = require('../../assets/core/lessonschema.js');
const { locate } = require('../../assets/core/locate.js');
const W = require('../../data/lesson11.words.js');

const pendingImgs = (() => {
  const md = fs.readFileSync(path.join(__dirname, '../../docs/image-list.md'), 'utf8');
  return md.split(/\n## /).filter(sec => sec.split('\n')[0].includes('待生成'))
    .flatMap(sec => [...sec.matchAll(/`([a-z0-9-]+\.png)`/g)].map(m => m[1]));
})();
const imgOk = f => fs.existsSync(path.join(__dirname, '../../images/L11', f)) || pendingImgs.includes(f);

test('第 11 課字詞資料格式正確', () => { assert.deepEqual(validateWords(W), []); });
test('第 11 課 19 個生字都在課本語詞和生字語詞裡', () => {
  assert.equal(W.hanzi.map(h => h.char).join(''), '駭疤痕罐咚碰傾寮營殺崇置奄翼祈禱吼喉嚨');
  const words = W.vocab.map(v => v.word).join('');
  W.hanzi.forEach(h => assert.ok(words.includes(h.char), h.char));
  assert.equal(W.charwords.map(c => c.char).join(''), W.hanzi.map(h => h.char).join(''));
  W.hanzi.forEach(h => assert.ok(h.parts.length && h.story && h.sentence.includes(h.char), h.id));
});
test('第 11 課生字挖空、線索不說答案', () => {
  for (const h of W.hanzi) { assert.ok(h.words.includes(h.cloze.replace('＿', h.char)), h.id); assert.ok(!h.clue.includes(h.char), h.id); }
  for (const s of W.similar) assert.ok(!s.clue.includes(s.answer), s.id);
  for (const v of W.vocab) assert.ok(!v.example.includes(v.word), v.id);
});
test('第 11 課圖片都在 images/L11，或列在待生成清單', () => {
  const p = W.phrase;
  const imgs = [...W.hanzi.map(h => h.img), ...W.vocab.map(v => v.img), ...W.charwords.map(c => c.img), ...W.idioms.map(x => x.situationImg),
    ...W.listen.flatMap(l => l.options.map(o => o.img)), p.intro.img, ...p.pick.map(x => x.img), ...p.say.map(x => x.img), ...p.words.map(x => x.img),
    ...W.pattern.flatMap(pt => [pt.img, ...pt.match.map(x => x.img), ...pt.conj.map(x => x.img)])];
  for (const f of imgs.filter(Boolean)) assert.ok(imgOk(f), f);
});
test('第 11 課修辭：類疊、設問，每關 2 題是不是、6 題選選看', () => {
  assert.deepEqual(W.rhetoric.cards.map(c => c.key), ['repeat', 'question']);
  for (const c of W.rhetoric.cards) {
    assert.deepEqual(c.yesno.map(y => y.answer), [true, false], c.key);
    assert.deepEqual(c.pick.map(p => p.options.length), [2, 2, 3, 3, 4, 4], c.key);
  }
  for (const c of W.rhetoric.cards) assert.equal(W.rhetoric.quiz.filter(q => q.answer === c.name).length, 2, c.name);
  /* 疊字以外的選項不能有兩個一樣的字連在一起 */
  const aa = t => /(.)\1/.test(t.replace(/[，。！？、；]/g, ''));
  W.rhetoric.cards.forEach(c => c.pick.forEach(p => p.options.slice(1).forEach(o => assert.ok(!aa(o), p.id + ' ' + o))));
});
test('第 11 課公開資料裡沒有課文原句', () => {
  const all = JSON.stringify(W);
  ['乜寇', '索克魯曼', '我的獵人爺爺', '儲嘉慧', '傳奇獵人', '身形高壯', '小米田', '綁滿鐵罐', '鐵罐咚咚作響', '巨木倒下', '碰運氣。', '卡斯卡斯', '眼睛都裝不下', '熟讀了山林', '大雨傾盆而下', '臨時的家', '窩在營火旁', '拔刀殺了', '黑熊抓傷', '忌殺黑熊', '食物短缺', '家族的沒落', '傳統禁忌', '棄置於山林', '塔克頓', '奄奄一息，不時', '痛苦的哀鳴', '背起小黑熊', '向上天祈禱', '回復原來的活力', '清了清喉嚨', '唱熊歌', '時高時低', '真正的收穫', '聽聞天地山川', '觀察野生動物的足跡'].forEach(t => assert.ok(!all.includes(t), t));
});
test('第 11 課課文原稿（有的話）格式正確、依據句找得到', { skip: !fs.existsSync(path.join(__dirname, '../../content/lesson11.plain.json')) }, () => {
  const l = JSON.parse(fs.readFileSync(path.join(__dirname, '../../content/lesson11.plain.json'), 'utf8'));
  assert.deepEqual(validateLesson(l), []);
  assert.equal(l.paragraphs.length, 10);
  l.quiz.concat(l.testExtra, [l.storyMap.tail]).filter(q => !q.hints).forEach(q => assert.ok(locate(l, q.evidence).sentIds.length, q.id));
  l.storyMap.bones.forEach(b => assert.ok(locate(l, b.evidence).sentIds.length, b.id));
  const imgs = [l.storyMap.head.img, ...l.storyMap.bones.flatMap(b => b.cards.map(c => c.img)), ...l.storyMap.decoys.map(c => c.img),
    ...l.vocab.map(v => v.img), ...l.quiz.concat(l.testExtra).flatMap(q => q.options.map(o => o.img))];
  for (const f of imgs.filter(Boolean)) assert.ok(imgOk(f), f);
});
test('第 11 課句型：時而……時而……、除了……還……甚至……', () => {
  assert.deepEqual(W.pattern.map(pt => pt.key), ['shierr', 'chulehaishenzhi']);
  const S = require('../../assets/core/speechcheck.js');
  for (const pt of W.pattern) for (const t of pt.examples.concat(pt.conj.map(c => c.full))) assert.equal(S.check({ kind: 'pattern', key: pt.key }, t).status, 'pending', t);
  for (const pt of W.pattern) for (const c of pt.conj) assert.equal(c.sentence.split('＿').join('').length + S.PATTERNS[pt.key].join('').length, c.full.length, c.id);
  /* 正確的接句不能明顯比別的選項長 */
  for (const pt of W.pattern) for (const m of pt.match) assert.ok(m.options[0].length <= Math.max(...m.options.slice(1).map(o => o.length)) + 2, m.id);
});
test('第 11 課短語的提示不和答案有一樣的字', () => {
  W.phrase.pick.concat((W.phrase.phrase2 || {}).pick || []).forEach(x => assert.ok(![...x.options[0]].some(c => x.clue.includes(c)), x.id + ' ' + x.clue));
});
