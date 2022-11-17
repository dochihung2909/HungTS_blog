const express = require('express');
const path = require('path') 
const app = express();
const port = 3000
const { engine } = require('express-handlebars')




// Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default'

                const icons = {
                    default: 'fa-solid fa-sort',
                    desc: 'fa-solid fa-arrow-down-short-wide',
                    asc: 'fa-solid fa-arrow-down-wide-short',
                }

                const types = {
                    default: 'desc',
                    desc: 'asc',
                    asc: 'desc',
                }

                const icon = icons[sortType]
                const type = types[sortType]

                return `<a href="?_sort&column=${field}&type=${type}"><i class="${icon}"></i></a>`
            },
        },
    }),
)

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

app.use(express.static(path.join(__dirname, 'public')))
