let token = "";

const API = "https://online-learning-backend-xse4.onrender.com";

// Регистрация
async function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(API + "/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  document.getElementById("auth-msg").innerText = data.message || JSON.stringify(data);
}

// Логин
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(API + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.token) {
    token = data.token;
    document.getElementById("auth-msg").innerText = "Вход выполнен!";
    loadCourses();
  } else {
    document.getElementById("auth-msg").innerText = data.message;
  }
}

// Загрузка курсов
async function loadCourses() {
  const res = await fetch(API + "/courses");
  const courses = await res.json();

  const list = document.getElementById("course-list");
  list.innerHTML = "";

  courses.forEach(c => {
    const li = document.createElement("li");
    li.innerText = c.title;
    list.appendChild(li);
  });
}

// Добавление курса
async function addCourse() {
  const title = document.getElementById("course-title").value;

  if (!token) {
    alert("Сначала войдите!");
    return;
  }

  const res = await fetch(API + "/courses", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({ title })
  });

  await res.json();
  loadCourses();
}
