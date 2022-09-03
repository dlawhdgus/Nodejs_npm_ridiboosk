document.querySelectorAll('#user-list tr').forEach(function(el){
    el.addEventListener('click',function () {
        var id = el.querySelector('td').textContent;
        getComment(id);
    });
});

function getUser() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status === 200) {
            var sers = JSON.parse(xhr.responseText);
            console.log(users);
            var tbody = document.querySelector('#user-list tbody');
            tbody.innerHTML = '';
            users.map(function(user){
                var row = document.createElement('tr');
                row.addEventListener('click',function () {
                    getComment(user._id);
                });
                var td = document.createElement('td');
                td.textContent = user._id;
                row.appendChild(td);
                td = document.createElement('td');
                td.textContent = user.name;
                row.appendChild(td);
                td = document.createElement('td');
                td.textContent = user.age;
                row.appendChild(td);
                td = document.createElement('td');
                td.textContent = user.married ?'기혼':'미혼';
                row.appendChild(td);
                tbody.appendChild(row);
            });
        } else {
            console.error(xhr.responseText);
        }
    };
    xhr.open('GET','/users');
    xhr.send();
}
//댓글 로딩
function getComment(id) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if(xhr.status === 200) {
            var comment = JSON.parse(xhr.responseText);
            var tbody = document.querySelector('#comment-list tbody');
            tbody.innerHTML ='';
            comments.map(function (comment) {
                var row = document.createElement('tr');
                var td = document.createElement('td');
                td.textContent = comment._id;
                row.appendChild(td);
                td = document.createElement('td');
                td.textContent = user.name;
                row.appendChild(td);
                td = document.createElement('td');
                td.textContent(td);
                row.appendChild(td);
                var edit = document.createElement('button');
                edit.textContent = '수정';
                edit.addEventListener('click', function() {
                    var newComment = prompt('바꿀내용을 입력해주세요.');
                    if(!newComment) {
                        return alert('내용을 반드시 입력하셔야 합니다.');
                    }
                    var xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                        if( xhr.status === 200) {
                            console.log(xhr.responseText);
                            getComment(id);
                        } else {
                            console.log(xhr.responseText);
                        }
                    };
                    xhr.open('PATCH','/comments/'+comment._id);
                    xhr.setRequestHeader('Content-Type','application/json');
                    xhr.send(JSON.stringify({ comment: newComment }));
                });
                var remove = document.createElement('button');
                remove.textContent = '삭제';
                remove.addEventListener('click', function() {
                    var xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                        if(xhr.status === 200) {
                            console.log(xhr.responseText);
                            getComment(id);
                        } else {
                            console.error(xhr.responseText);
                        }
                    };
                    xhr.open('DELETE','/comments/'+ comment._id);
                    xhr.send();
                });
                td = document.createElement('td');
                td.appendChild(edit);
                row.appendChild(td);
                td = document.createElement('td');
                td.appendChild(remove);
                row.appendChild(td);
                tbody.appendChild(row);
            });
        } else {
            console.error(xhr.responseText);
        }
    };
    xhr.open('GET','/comments/' + id);
    xhr.send();
}
//사용자 등록 시
document.getElementById('user-form').addEventListener('submit', function(e) {
    e.preventDefault();
    var name = e.target.username.value

})