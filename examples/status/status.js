(() => {
  const checks = [
    ['gateway', '/gateway-health', async (r) => r.ok && (await r.text()).trim() === 'ok'],
    ['datalens', '/auth/signin', async (r) => r.ok],
    ['metabase', '/metabase/api/health', async (r) => r.ok && (await r.json()).status === 'ok'],
  ];
  const run = async ([id, url, validate]) => {
    const node = document.getElementById(id);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    try {
      const response = await fetch(url, {cache:'no-store', credentials:'same-origin', signal:controller.signal});
      const ok = await validate(response);
      node.dataset.state = ok ? 'ok' : 'bad';
      node.querySelector('.badge').textContent = ok ? 'Работает' : `Ошибка HTTP ${response.status}`;
      return ok;
    } catch (_) {
      node.dataset.state = 'bad';
      node.querySelector('.badge').textContent = 'Недоступен';
      return false;
    } finally { clearTimeout(timer); }
  };
  const refresh = async () => {
    const result = await Promise.all(checks.map(run));
    const failed = result.filter((ok) => !ok).length;
    document.getElementById('summary').dataset.state = failed ? 'bad' : 'ok';
    document.getElementById('summary-text').textContent = failed ? `Есть проблемы: ${failed}` : 'Основные сервисы доступны';
    document.getElementById('updated').textContent = `Проверено: ${new Date().toLocaleString('ru-RU')}`;
  };
  refresh(); setInterval(refresh, 30000);
})();
