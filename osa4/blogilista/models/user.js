const {DataTypes} = require('sequelize');
const {port, nodeEnvironment} = require('../utils/appconfig');
const {infolog, errorlog} = require('../utils/loggers');
const sequelize = require('../database/sequelizeconnection');
//const Blog = require('./blog');

const databaseTable = nodeEnvironment === 'test' ? 'testtableusers' : 'users';

// huutomerkki lisätty value.match()-komennon eteen. jos koodi ei toimi, muuta takaisin, että ilman huutomerkkiä tai poista kokonaan.
/*
function isValueString(value) {
  //const theValue = value;
  //infolog(theValue);
  if (typeof value === 'string' && value.match(/^(.){1,255}$/gi)) {
    return true;
  } else {
    return false;
  }
};
*/

const User = sequelize.define('user', {
  //id column/field can be removed from here, if the table users in database is re-altered/dropped and renewed with id as 'userid' or the column/field is re-SERIALized as 'userid'
  userid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true, 
      msg: 'Username is taken / must be unique'
    },
    validate: {
      len: {
        args: [3,255],
        msg: 'Username must be atleast 3 characters'
      },
      notNull: {
        msg: 'Username is required'
      },
      notEmpty: {
        msg: 'Provide username information'
      },
      is: {
        args: [/^([a-ö\-\_]){3,255}$/gi],
        /*
        custom(value) {
          return isValueString(value)
        },
        */
        msg: `Username must be a string, , allowed letters: 'a-ö' and characters: '-_'`
      }
    }
  },
  passwordhash: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Password is required'
      },
      notEmpty: {
        msg: 'Provide password information'
      },
      is: {
        args: [/^(.){3,255}$/gi],
        /*
        custom(value) {
          return isValueString(value)
        },*/
        msg: `Password must be a string, bcrypt's passwordhashing not working`
      }
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Name is required'
      },
      notEmpty: {
        msg: 'Provide name information'
      },
      is: {
        args: [/^([a-ö\-\_\s\.]){3,255}$/gi],
        msg: `Name must be a string, allowed: 'a-ö', 'space', '.', '-' and '_'`
      }
    }
  }/*,
  blogscreated: {
    type: DataTypes.VIRTUAL,
    get() {
      return (async () => {
        const results = await Blog.findAll({attributes: ['blogid', 'title', 'author', 'likes', 'createdbyuserid']});
        const mappedResults = results.map(async (blog) => {if (blog.dataValues.createdbyuserid === this.userid) {({...blog.dataValues})} else {return null;}}).filter(result => result !== null);
        return mappedResults;
      })();
    },
    set(value) {
      throw new Error(`Do not try to set the 'blogscreated' field's value! It is virtual field`);
    }
  }*/
  /* must add blogs-array as column/field for users-table on database, before this could work
  ,blogs: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: true,
    references: {
      model: Blog,
      key: 'id'
    }
  }
  */
}, {
  timestamps: false,
  tableName: databaseTable
});

//User.hasMany(Blog, {as: 'blogs', foreignKey: 'userid', sourceKey: 'userid'});
//User.hasMany(Blog);

module.exports = User;