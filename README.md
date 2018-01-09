# Школа разработки интерфейсов - второе задание 

## Решение
- Gulp - task-runner для всего проекта
- Pug - шаблонизатор, используется для написания отдельных компонент, которые легко переиспользовать в разных частях проекта. 
- PostCSS - используется для удобной работы со стилями для каждой отдельной компоненты, из плагинов используются
  - [autoprefixer](https://github.com/postcss/autoprefixer)
  - [precss](https://github.com/jonathantneal/precss)
  - [gulp-concat-css](https://github.com/mariocasciaro/gulp-concat-css)
  - [postcss-utilities](https://github.com/ismamz/postcss-utilities)

## Структура проекта

> Собранный проект расположен в папке
```
/public
```
> Исходники проекта расположены в папке
```
/src
```
> Компоненты разделены на две категории:
  - units , которые реализуют минимальную функционалость и используются в разных частях приложения 
  - modules
```
  /components
    /modules
    /units
  /icons
  /layout
  /pages

```

## Запуск

```
yarn i
yarn dev
```
