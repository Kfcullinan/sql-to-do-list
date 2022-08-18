console.log('Hello World');

$(document).ready(onReady);

function onReady() {
    getTasks();
}

function getTasks() {
    $.ajax({
        type: 'GET',
        url: '/task'
    }).then(function (response) {
        console.log(response);
        $('#tasksTableBody').empty();
        for (let i = 0; i <response.length; i++) {
            let tasks = response[i];
            $('#tasksTableBody').append(`
            <tr>
            <td>${tasks.id}</td>
            <td>${tasks.task}</td>
            <td>${tasks.completed}</td>


            
            `)
        }
    })
}