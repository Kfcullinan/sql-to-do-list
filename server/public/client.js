console.log('Hello World');

$(document).ready(onReady);

function onReady() {
   $('#task-submit').on('click', sendTaskToServer);
    getTasks();
}

function sendTaskToServer() {
    $.ajax({
        type: 'POST',
        url: '/task',
        data: {
            task: $('#tasks').val(),
            completed: 'false',
        }
    }).then(function (response) {
        getTasks();
    }).catch(function (error) {
        console.log(error);
    })
}





function getTasks() {
    $.ajax({
        type: 'GET',
        url: '/task'
    }).then(function (response) {
        console.log('tasks:', response);
        $('#tasksTableBody').empty();
        for (let i = 0; i <response.length; i++) {
            let tasks = response[i];
            //todo: conditional styling
            console.log('task', tasks.task);
            $('#tasksTableBody').append(`
            <tr>
            <td>${tasks.id}</td>
            <td>${tasks.task}</td>
            <td>${tasks.completed}</td>
                <td>
                    <button class="task-completed" data-id="${tasks.id}">Delete</button>
                    </td>
            </tr>


            
            `)
        }
    })
}