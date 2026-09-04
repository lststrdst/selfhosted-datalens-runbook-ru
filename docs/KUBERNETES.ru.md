# Ansible или Kubernetes

## По умолчанию: Ansible + Docker Compose

Этот вариант проще для небольшой BI-команды. Ansible делает деплой
повторяемым, а резервный хост и restore-drill дают понятное восстановление.

## Kubernetes оправдан, когда

- есть минимум три worker-узла и команда эксплуатации;
- PostgreSQL и DWH уже вынесены во внешние HA-сервисы;
- есть ingress, cert-manager, secret manager, логи и метрики;
- бизнесу нужны горизонтальное масштабирование и согласованный SLO.

Один DataLens-хост в одноузловом Kubernetes не становится HA. Официальный Helm chart:
<https://github.com/datalens-tech/helm>.
