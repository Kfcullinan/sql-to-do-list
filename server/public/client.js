console.log('Hello World');

$(document).ready(onReady);

function onReady() {
   $('#task-submit').on('click', sendTaskToServer);
   $('#tasksTableBody').on('click', '.deleteButton', deleteClickListener);
   // $('#tasksTableBody').on('click', '.updateButton', updateTaskButton);
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
            let taskClass = ''; //default is no styling
            if (tasks.completed) {
            taskClass = 'task-complete' //if complete apply css
            }
            console.log('task', tasks.task);
            $('#tasksTableBody').append(`
            <tr class="${taskClass}">
            <td>${tasks.id}</td>
            <td>${tasks.task}</td>
            <td>${tasks.completed}</td>
                <td>
                   <button type="button" class="updateButton" data-id="${tasks.id}">Task Completed?</button>
                    <button class="deleteButton" data-id="${tasks.id}">Delete</button>
                    </td>
            </tr>


            
            `)
        }
    })
}

//delete button created
function deleteClickListener() {
    console.log('delete button clicked');
    $.ajax({
        method: 'DELETE',
        url: '/task/' + $(this).data().id
    }).then(() => {
       
        getTasks()
    });
};