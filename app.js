const MODEL_SCORE_URL = 'https://8000-i3vbxxg85gzky2hx9rirg-3b3f3f37.us5.manus.computer/score';
const form = document.querySelector('#score-form');
const queryInput = document.querySelector('#query');
const passageInput = document.querySelector('#passage');
const button = document.querySelector('#submit');
const message = document.querySelector('#message');
const result = document.querySelector('#result');
const scoreValue = document.querySelector('#score-value');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = queryInput.value.trim();
  const passage = passageInput.value.trim();
  result.hidden = true;
  message.className = 'message';

  if (!query || !passage) {
    message.textContent = '请先填写查询和段落。';
    message.classList.add('error');
    return;
  }

  button.disabled = true;
  button.textContent = '正在计算…';
  message.textContent = '正在请求模型，请稍候…';
  message.classList.add('loading');

  try {
    const response = await fetch(MODEL_SCORE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, passage }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || data.error || '模型请求失败，请稍后重试。');
    if (typeof data.score !== 'number' || !Number.isFinite(data.score) || data.score < 0 || data.score > 1) {
      throw new Error('模型返回了无法识别的分数，请稍后重试。');
    }
    scoreValue.textContent = (data.score * 200).toFixed(1);
    result.hidden = false;
    message.textContent = '计算完成。';
    message.className = 'message success';
  } catch (error) {
    message.textContent = error.message || '请求失败，请检查网络后重试。';
    message.className = 'message error';
  } finally {
    button.disabled = false;
    button.textContent = '计算分数';
  }
});
