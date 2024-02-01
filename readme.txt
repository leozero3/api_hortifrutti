documentação  adonisJS v5
https://v5-docs.adonisjs.com/guides/introduction

// criar pasta api
yarn create adonisjs  -K=api
npm init adonis-ts-app@latest `nome da pasta`
//

//start server
node ace serve --watch
//

// instalar e configurar o Lucid
npm i @adonisjs/lucid@18.4.0
node ace configure @adonisjs/lucid
//

//
node ace migration:run
node ace migration:fresh //forca o DB atualizar
node ace migration:rollback // apaga as tabelas

//
npm i @adonisjs/auth@8.2.3
node ace configure @adonisjs/auth
//

// Hashing
npm i phc-argon2
//
