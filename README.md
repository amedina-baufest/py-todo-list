# TODO List API

Complete TODO list application with a REST API backend and modern web frontend.

## 📋 Project Structure

- **Backend:** FastAPI REST API con SQLAlchemy y SQLite
- **Frontend:** Vanilla HTML, CSS, and JavaScript with GitHub-inspired design

Los datos se almacenan en una base de datos SQLite en memoria, por lo que se reinician al detener el servidor.

## Requisitos

- Python 3.12+
- Navegador web moderno

## Instalación

```bash
pip install -r requirements.txt
```

## Ejecución

### Backend

```bash
python -m uvicorn app.main:app --reload
```

El servidor API se levanta en `http://localhost:8000`.

### Frontend

Abre `index.html` en tu navegador web, o usa un servidor local:

```bash
python -m http.server 3000
```

Luego abre `http://localhost:3000`

**Para documentación completa del frontend, ver [FRONTEND.md](FRONTEND.md)**

## Endpoints

| Método   | Ruta            | Descripción                                      |
|----------|-----------------|--------------------------------------------------|
| `POST`   | `/todos/`       | Crear un nuevo todo                              |
| `GET`    | `/todos/`       | Listar todos (filtro opcional `?completed=true`)  |
| `GET`    | `/todos/{id}`   | Obtener un todo por ID                           |
| `PUT`    | `/todos/{id}`   | Actualizar un todo                               |
| `DELETE` | `/todos/{id}`   | Eliminar un todo                                 |

## Ejemplos

Crear un todo:

```bash
curl -X POST http://localhost:8000/todos/ \
  -H "Content-Type: application/json" \
  -d '{"title": "Comprar leche", "description": "En el supermercado"}'
```

Listar todos:

```bash
curl http://localhost:8000/todos/
```

Actualizar un todo:

```bash
curl -X PUT http://localhost:8000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

Eliminar un todo:

```bash
curl -X DELETE http://localhost:8000/todos/1
```
