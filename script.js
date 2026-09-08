// タスクを保存する配列
let tasks = [];


// HTMLの要素を取得
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const rouletteButton = document.getElementById("rouletteButton");
const result = document.getElementById("result");
const deleteAllButton = document.getElementById("deleteAllButton");


// タスクを追加する
addButton.addEventListener("click", function() {

    const taskText = taskInput.value;

    if (taskText === "") {
        alert("タスクを入力してください");
        return;
    }

    tasks.push(taskText);

    taskInput.value = "";

    displayTasks();

    saveTasks();

});


// タスクを画面に表示する
function displayTasks() {

    // いったん画面を空にする
    taskList.innerHTML = "";

    // タスクを1つずつ表示
    tasks.forEach(function(task, index) {

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task;

        const buttons = document.createElement("div");
        buttons.className = "task-buttons";

        const completeButton = document.createElement("button");
        completeButton.textContent = "完了";
        completeButton.className = "complete-button";

        completeButton.addEventListener("click", function() {

            tasks.splice(index, 1);

            displayTasks();

            saveTasks();

        });


        const deleteButton = document.createElement("button");
        deleteButton.textContent = "削除";
        deleteButton.className = "delete-button";

        deleteButton.addEventListener("click", function() {

            tasks.splice(index, 1);

            displayTasks();

            saveTasks();

        });


        buttons.appendChild(completeButton);
        buttons.appendChild(deleteButton);

        li.appendChild(span);
        li.appendChild(buttons);

        taskList.appendChild(li);

    });
}


// ルーレット
rouletteButton.addEventListener("click", function() {

    if (tasks.length === 0) {
        alert("まずタスクを追加してください");
        return;
    }

    const randomIndex = Math.floor(Math.random() * tasks.length);

    const selectedTask = tasks[randomIndex];

    result.textContent = "🎯 " + selectedTask;

});


// すべて削除
deleteAllButton.addEventListener("click", function() {

    tasks = [];

    displayTasks();

    saveTasks();

});

// Cookieにタスクを保存する
function saveTasks() {

    document.cookie =
        "tasks=" + encodeURIComponent(JSON.stringify(tasks)) +
        "; max-age=604800; path=/";

}


// Cookieからタスクを読み込む
function loadTasks() {

    const cookies = document.cookie.split("; ");

    for (let cookie of cookies) {

        const [name, value] = cookie.split("=");

        if (name === "tasks") {

            tasks = JSON.parse(decodeURIComponent(value));

        }

    }

    displayTasks();

}


// ページを開いたときにCookieを読み込む
loadTasks();s