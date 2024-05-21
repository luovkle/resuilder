FROM python:3.11-slim-bookworm
RUN pip install pipenv
WORKDIR /app
ENV PIPENV_VENV_IN_PROJECT=1
COPY ["./Pipfile", "./Pipfile.lock", "/app/"]
RUN pipenv install
COPY ["./app", "/app/app/"]
EXPOSE 8000
CMD ["pipenv", "run", "prod"]
