'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Phones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number: {
        type: Sequelize.STRING
      },
      ddd: {
        type: Sequelize.STRING
      },
      userId: {  
        allowNull: false,  
        type: Sequelize.INTEGER,  
        onDelete: 'CASCADE',  
        references: {  
          model: 'Users',  
          key: 'id'  
        }  
      }
      ,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Phones');
  }
};