const {DataTypes} = require('sequelize');
//const dburi = require('../database/dbconfig');
const {port, nodeEnvironment} = require('../utils/appconfig');
const {infolog, errorlog} = require('../utils/loggers');
const User = require('./user');

const sequelize = require('../database/sequelizeconnection');
//databaseTable on joko tietokannan testitaulu tai developmentissa käytettävä taulu. <-- tämä ratkaisu, koska renderiin ei saa kahta ilmaista tietokantaa,
//mutta voi tehdä tauluja niin monta kuin haluaa samaan tietokantaan
//infolog(nodeEnvironment);
const databaseTable = nodeEnvironment === 'test' ? 'testtableblogs' : 'blogs';
//infolog(databaseTable);

//const sequelize = new Sequelize(dburi, {
/*logging: false,*/
//});
// logging disabloidaan, koska ei haluta seurata sequelizen komentoja consolissa.
// tämä voi olla hyvä ominaisuus kehittämisen aikana

(async () => {
	infolog('Testing database connection...');
	return await sequelize
		.authenticate()
		.then(() => infolog('Connected to the PostgreSQL database, test successful'))
		.catch((error) => errorlog('Unable to connect:', error));
})();

// custom validator, joka kutsutaan Blog-modelin validate kohdassa customs-validointina.
/*
function isString(value) {
  if (typeof value !== 'string') {
    throw new Error('Only string format allowed.');
  }
};
*/

// huutomerkki lisätty value.match()-komennon eteen. jos koodi ei toimi, muuta takaisin, että ilman huutomerkkiä tai poista kokonaan.
/*
function isValueString(value) {
  if (typeof value !== 'string' && !value.match(/^(.){1,255}$/gi)) {
    return false;
  } else {
    return true;
  }
};
*/

const Blog = sequelize.define(
	'blog',
	{
		//id column/field can be removed from here, if the table users in database is re-altered/dropped and renewed with id as 'blogid' or the column/field is re-SERIALized as 'blogid'
		blogid: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Title is required',
				},
				notEmpty: {
					msg: 'Provide title information',
				},
				is: {
					args: /^(.){1,255}$/gi,
					msg: 'Title must be a string',
				},
			},
			//validate: {
			// custom validatessa voidaan kutsua yksi tai useampaa eri customoitua validatea funktioina isString()-funktion lisäksi
			//customs(value) {
			//isString(value);
			//}
			/* tai sen sisälle voidaan suoraan tehdä custom validate nimi vaihdettu siinä: isTitleString(), muuten täysin sama logiikka ja toimivuus
      isTitleString(value) {
        if (typeof value !== 'string') {
        throw new Error('Only string format allowed.');
        }
      }
      */
			//}
		},
		author: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Author is required',
				},
				notEmpty: {
					msg: 'Provide author information',
				},
				is: {
					args: /^(.){1,255}$/gi,
					msg: 'Author must be a string',
				},
			},
			/*validate: {
      customs(value) {
        isString(value);
      }
    }*/
		},
		url: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isUrl: {
					require_protocol: true,
					msg: 'Must be formated as url',
				},
				notNull: {
					msg: 'Url is required',
				},
				notEmpty: {
					msg: 'Provide url information',
				},
				is: {
					args: /^(.){1,255}$/gi,
					msg: 'Url must be a string',
				},
			},
		},
		likes: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isInt: true,
				notNull: {
					msg: 'Likes information is required',
				},
				notEmpty: {
					msg: 'Provide count of likes',
				},
			},
		},
		whohasliked: {
			type: DataTypes.ARRAY(DataTypes.INTEGER),
		},
		createdbyuser: {
			type: DataTypes.VIRTUAL,
			get() {
				if (
					this.createdbyuserid !== null &&
					typeof this.createdbyuserid === 'number' /* && this.createdbyuserid.toString().match(/^(\d{1,255})/gi)*/
				) {
					return (async () => {
						//infolog(this.createdbyuserid);
						const result = User.findOne({
							attributes: ['userid', 'username', 'name'],
							where: {userid: this.createdbyuserid},
						});
						return result;
					})();
				} else {
					return null;
				}
			},
			set(value) {
				throw new Error(`Do not try to set the 'createdbyuser' field's value! It is virtual field`);
			},
		},
		comments: {
			type: DataTypes.ARRAY(DataTypes.STRING),
		} /*,
  createdbyuserid: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      isInt: true
    },
    references: {
      model: User,
      key: 'id'
    }
  }*/ /*,
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      isInt: true
    }
  }*/,
	},
	{
		// model options
		// createdAt: false,
		// updatedAt: false,
		// timestamps sisältää molemmat createdAt ja updatedAt, joten sitä on parempi käyttää kuin molempia erikseen tässä tarkoituksessa, kun halutaan molemmat pois käytöstä
		timestamps: false,
		tableName: databaseTable,
	}
);

// allowNull: true, koska vanhoja blogeja ilman useria.

Blog.belongsTo(User, {
	foreignKey: {
		name: 'createdbyuserid',
		type: DataTypes.INTEGER,
		allowNull: true,
		validate: {
			isInt: true,
		},
		/*,
    references: {
      model: User,
      key: 'userid'
    }*/
	},
	targetKey: 'userid',
});
//User.hasMany(Blog);
//User.hasMany(Blog, {as: 'blogs', foreignKey: 'userid', sourceKey: 'createdbyuserid'});
/*
User.hasMany(Blog, {
  foreignKey: {
    name: 'createdbyuserid',
    type: DataTypes.INTEGER,
    references: {
      model: Blog,
      key: 'createdbyuserid'
    },
  }
});
*/

//User.hasMany(Blog);
/*
Blog.hasOne(User, {
  foreignKey: {
    name: 'createdbyuserid',
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      isInt: true
    },
    references: {
      model: User,
      key: 'id'
    }
  }
});
*/

module.exports = Blog;

/*
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connnection has been made');
  } catch (error) {
    console.log('Unable to connect:', error);
  }
})();
*/
