// criar pasta api
yarn create adonisjs `nome da pasta` -K=api


//start server
node ace serve --watch


// configurar o Lucid
node ace configure @adonisjs/lucid


node ace migration:run
node ace migration:rollback
