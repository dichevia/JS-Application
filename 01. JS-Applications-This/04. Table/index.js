function solve(){
  let tbody = Array.from(document.querySelectorAll('tbody tr'));

 tbody.forEach(tr=>tr.addEventListener('click', function changeStyle(){
    if (tr.style.backgroundColor){
       tr.removeAttribute('style');
    }else{
       tbody.forEach(tr=>tr.removeAttribute('style'));
      tr.style.backgroundColor = "#413f5e";
    }
 }))
}
