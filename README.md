# game-life

Demo: https://jsfiddle.net/vz7r41b8/

Сценарий работы:

1) В поле "Size Field" вводим размер поля от 10 до 50
2) ЛКМ по клеткам поля выставляем значения
3) Нажимаем кнопку "Start", запускается процесс вычисления, который реализован по правилам (Взял из https://life.written.ru/):
  - У каждой клетки 8 соседних клеток.
  - В каждой клетке может жить существо.
  - Существо с двумя или тремя соседями выживает в следующем поколении, иначе погибает от одиночества или перенаселённости.
  - В пустой клетке с тремя соседями в следующем поколении рождается существо.
  
  В момент вычисления, становится невозможным редактирование поля, очистка и изменение размера поля
4) При нажатии на кнопку "Stop", процесс вычисления останавливается  
