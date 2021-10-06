// export default function(article = [], action) {
//     if(action.type == 'addArticle') {
//         var newArticle = [...article]
//         var find =  newArticle.find(e => e.title == action.title)
//         if (find == undefined) {
//             newArticle.push({title: action.title, content: action.content, description: action.description, image: action.image})
//         }
//         return newArticle;
//     } else if (action.type == 'deleteArticle') {
//         var newArticle = [...article]
//         newArticle = newArticle.filter(e => e.title != action.title)
//         return newArticle
//     }else {
//         return article;
//     }
// }