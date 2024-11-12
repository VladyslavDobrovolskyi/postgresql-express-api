#!/bin/sh

# Укажите количество пользователей, которые нужно создать
n=10

# Запускаем команду create-user n раз
for i in $(seq 1 $n); do
  npm run create-user
done
