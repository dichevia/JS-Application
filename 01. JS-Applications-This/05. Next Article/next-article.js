function getArticleGenerator(articles) {
   const content = document.getElementById('content');
   return function(){
      if (articles.length>=1){
         let div = document.createElement('div');
         let article = document.createElement('article');
         article.textContent = `${articles[0]}`;
         div.appendChild(article);
         content.appendChild(div);
         articles.shift();
      }
   }
}
