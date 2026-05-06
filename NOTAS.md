# Notas del Lab — PostgreSQL Avanzado

## Parte 8 — Reflexión

### 1. ¿Cuándo es contraproducente crear un índice? (pista: piensa en tablas con muchas escrituras)

Es contraproducente cuando una tabla recibe muchas inserciones, actualizaciones o eliminaciones frecuentes, porque cada escritura obliga a PostgreSQL a actualizar también el índice, ralentizando la operación.

### 2. ¿Qué diferencia hay entre RANK() y DENSE_RANK()? Pon un ejemplo con los datos de la base de datos.

RANK() asigna el número de posición contando cuántas filas hay por delante, por eso cuando hay empates el siguiente número se salta. DENSE_RANK() asigna el número de posición dentro de la secuencia de valores distintos, por eso nunca deja huecos aunque haya empates.

Por ejemplo, en la base de datos Dune y Blade Runner 2049 tienen la misma nota (8.0). Con RANK() la siguiente película (Arrival, 7.9) sería la posición 6 porque hay 5 filas por delante. Con DENSE_RANK() sería la posición 5 porque solo hay 4 valores distintos por delante.

### 3. ¿Por qué el trigger usa AFTER INSERT OR UPDATE OR DELETE en lugar de BEFORE?

El trigger usa AFTER en este lugar, porque al ser usado en auditoría y ser este un proceso que registra acontecimientos pasados, debe ejecutarse después de INSERT, UPDATE o DELETE, para poder registrarlos en el log.
