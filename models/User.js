"use strict";

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
        email: {type: DataTypes.STRING, unique:true},
        password:{type: DataTypes.STRING},
        skey:{type: DataTypes.STRING},
        emailVerified: {type: DataTypes.BOOLEAN},
        isActive: {type: DataTypes.BOOLEAN}
    });

    return User;
};