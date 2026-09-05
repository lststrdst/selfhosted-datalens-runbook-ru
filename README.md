# Self-hosted DataLens: русский runbook

Обезличенный пример развёртывания и эксплуатации DataLens Open Source:
Docker Compose для одного хоста, Ansible для повторяемого деплоя и план
перехода на Kubernetes только при реальной потребности в HA.

Репозиторий не содержит данных компании, секретов, адресов серверов,
дампов или экспортов рабочих книг.

## Что внутри

- [архитектура и границы](docs/ARCHITECTURE.ru.md);
- [резервное копирование, восстановление и мониторинг](docs/OPERATIONS.ru.md);
- [пример Ansible](ansible/playbook.yml);
- [обезличенная страница статуса](examples/status/index.html) и
  [Nginx-фрагмент](examples/nginx-status.conf);
- [когда нужен Kubernetes](docs/KUBERNETES.ru.md).

## Быстрый старт через Ansible

1. Установить Docker Engine, Compose plugin и Ansible collection
   `community.docker`.
2. Скопировать `ansible/inventory.example.yml` в закрытый inventory.
3. В `ansible/playbook.yml` заменить `REPLACE_WITH_TESTED_TAG_OR_COMMIT`
   на проверенный tag или полный commit DataLens.
4. Хранить пароли в Ansible Vault или внешнем secret manager.
5. Запустить:

```bash
ansible-playbook -i inventory.yml ansible/playbook.yml --ask-vault-pass
```

Официальный `init.sh` DataLens сам генерирует первичные секреты. Перед первым
запуском изучите upstream: <https://github.com/datalens-tech/datalens>.

## Принципы

- BI читает DWH только read-only пользователем;
- PROD/тест/технические объекты разделены;
- рубли, штуки, проценты и период явно указаны в каждой мере;
- копия считается готовой только после restore-drill;
- секреты никогда не попадают в Git и CI-логи.

## Лицензия

MIT. См. [LICENSE](LICENSE).

---

© lststrdst — документация и примеры конфигурации.
