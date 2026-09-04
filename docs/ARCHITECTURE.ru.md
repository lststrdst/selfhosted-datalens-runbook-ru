# Архитектура

```text
пользователь -> reverse proxy/TLS -> DataLens UI/API
                                      |-> Auth
                                      |-> UnitedStorage -> PostgreSQL metadata
                                      |-> MetaManager -> Temporal
                                      `-> read-only connector -> DWH
```

DataLens хранит описания книг, дашбордов, чартов и прав в PostgreSQL,
но не должен становиться ещё одним DWH. Бизнес-логика, календарь, MDM и
единицы измерения живут в версионируемых витринах.

## Границы

- коннектор DWH: отдельная учётная запись, только `SELECT`;
- секреты: вне Git, права `0600`, ротация и аудит;
- metadata PostgreSQL: отдельная копия и миграционный контроль;
- reverse proxy: единый hostname, TLS, лимит размера и таймауты;
- объекты DataLens: экспорт/импорт JSON не заменяет сверку формул.

## Поток публикации

```text
raw -> quality gates -> MDM -> presentation mart -> chart execution test
    -> TEST workbook -> business acceptance -> PROD workbook
```

Нельзя повышать объект в PROD только потому, что страница открывается.
Минимум: зерно, период, фильтр, единица, округление, права и контрольная сумма.
