"use strict";

module.exports = function(sequelize, DataTypes) {
    var UserType = sequelize.define("UserType", {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
        name: {type: DataTypes.STRING},
        isActive: {type: DataTypes.BOOLEAN}
    });

    return UserType;
};