"use strict";

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
        name: {type: DataTypes.STRING},
        email:{type: DataTypes.STRING},
        isActive: {type: DataTypes.BOOLEAN}
    });

    return User;
};