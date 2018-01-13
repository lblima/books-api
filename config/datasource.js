import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';

let database = null;

const loadModels = (sequelize) => {
    const dir = path.join(__dirname, '../models');
    let models = [];

    fs.readdirSync(dir).forEach(file => {
        const modelDir = path.join(dir, file);
        const model = sequelize.import(modelDir);
        
        models[model.name] = model;
    });

    return models;
}

export default (app) => {

    if (!database) {
        const sequelize = new Sequelize(
                  app.config.database,
                  app.config.username,
                  app.config.password,
                  app.config.params
              );
        
        database = {
            sequelize,
            Sequelize,
            models: {}
        }

        database.models = loadModels(sequelize);

        sequelize.sync().done(() => database);
    }
    
    return database;
}