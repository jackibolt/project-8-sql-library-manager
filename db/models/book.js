
const Sequelize = require('sequelize');

module.exports = sequelize => {
    
    class Book extends Sequelize.Model {}

    Book.init({
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Please provide a book title"
                },
                notEmpty: {
                    msg: "Please provide a book title"
                },
            }
        },
        author: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Please provide an author"
                },
                notEmpty: {
                    msg: "Please provide an author"
                },
            }
        },
        genre: {
            type: Sequelize.STRING,
        },
        year: {
            type: Sequelize.INTEGER,
        },
    }, {
        sequelize
    })

    return Book;
}