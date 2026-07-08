# DMS Portal Mockup — Render / Docker (repo độc lập)
FROM python:3.12-slim

WORKDIR /app

COPY mockups ./mockups
COPY server ./server
COPY scripts/run_local_server.py ./scripts/run_local_server.py

ENV APP_ENV=production
ENV APP_HOST=0.0.0.0
ENV MOCK_API_ENABLED=true

EXPOSE 10000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD python -c "import os,urllib.request; p=os.environ.get('PORT','10000'); urllib.request.urlopen(f'http://127.0.0.1:{p}/health')" || exit 1

CMD ["python", "scripts/run_local_server.py"]
