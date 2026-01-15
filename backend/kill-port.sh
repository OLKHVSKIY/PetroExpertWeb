#!/bin/bash
# Скрипт для остановки процесса на порту 5000

PORT=${1:-5000}
PID=$(lsof -ti:$PORT)

if [ -z "$PID" ]; then
    echo "Порт $PORT свободен"
else
    echo "Останавливаю процесс $PID на порту $PORT..."
    kill -9 $PID
    sleep 1
    if lsof -ti:$PORT > /dev/null 2>&1; then
        echo "Не удалось остановить процесс"
    else
        echo "Порт $PORT освобожден"
    fi
fi
