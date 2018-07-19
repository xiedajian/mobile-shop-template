
//向列表追加  list为数组
function addEleToList(list) {
    if (list.length === 0) return;
    var len = list.length;
    //添加记录
    var ul = document.querySelector('.mui-content');
    // var length = ul.querySelectorAll('div').length;
    //添加文档碎片   ，碎片避免多次整平渲染
    var fragment = document.createDocumentFragment();
    var li;
    for (var i = 0; i < len; i++) {
        li = document.createElement('div');
        li.className = 'list';
        li.innerHTML = '收货地址'+(i+1);
        fragment.appendChild(li);
    }
    // return fragment;
    // ul.insertBefore(fragment, ul.firstChild);
    ul.appendChild(fragment);
}