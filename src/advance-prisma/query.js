import {prisma} from './../utils/prisma-clients.js';

//advance prisma queries
//include similar quesry on get all books api
const printData = async () => {
    const books = await prisma.books.findMany({
        include: {
            Genres:true,
            BooksAuthors: {
                include:{Authors:true}
            }
        },
    });
    console.log(books);
};

printData();

//find book which is published after year 2015, genre:horror, pages:greater 300
//example of finding different by using where condition 

//to check less thann or greater than we have lte and gte
const books = prisma.books.findMany({
    where: {
        OR: [
            {
                published_date: {
                    gte: new Date(2015)
                }
            },
            {
                Genres: {
                    some: {
                        name: "horror"
                    }
                }
            },
            {
                pages: {
                    gt: 300
                }
            }
        ],
        AND:[
            {
                cover_image:{
                    not:null
                }
            },
            {
                title:{
                    include:"hello"
                }
            }
        ]
    }
})