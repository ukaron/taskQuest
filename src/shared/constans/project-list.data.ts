import { IProject } from "../../features/project-list/models";

const testProjects: IProject[] = [
  {
    id: "project1",
    name: "Разработка сайта",
    tasks: [
      {
        id: "task1",
        title: "Создать макет главной страницы",
        status: "incomplete",
        priority: "high",
        subtasks: [
          { id: "subtask1", title: "Сделать набросок", status: "incomplete" },
          { id: "subtask2", title: "Добавить контент", status: "incomplete" },
        ],
      },
      {
        id: "task2",
        title: "Настроить сервер",
        status: "incomplete",
        priority: "medium",
        subtasks: [
          { id: "subtask1", title: "Выбрать хостинг", status: "incomplete" },
          { id: "subtask2", title: "Установить ПО", status: "incomplete" },
        ],
      },
      {
        id: "task3",
        title: "Верстка страницы контактов",
        status: "incomplete",
        priority: "low",
        subtasks: [
          { id: "subtask1", title: "Разметка", status: "incomplete" },
          { id: "subtask2", title: "Стилизация", status: "incomplete" },
        ],
      },
    ],
  },
  {
    id: "project2",
    name: "Мобильное приложение",
    tasks: [
      {
        id: "task1",
        title: "Создание макета приложения",
        status: "incomplete",
        priority: "high",
        subtasks: [
          { id: "subtask1", title: "Прототипирование", status: "incomplete" },
          { id: "subtask2", title: "Тестирование UX", status: "incomplete" },
        ],
      },
      {
        id: "task2",
        title: "Разработка API",
        status: "incomplete",
        priority: "medium",
        subtasks: [
          { id: "subtask1", title: "Проектирование API", status: "incomplete" },
          { id: "subtask2", title: "Реализация API", status: "incomplete" },
        ],
      },
      {
        id: "task3",
        title: "Тестирование приложения",
        status: "incomplete",
        priority: "low",
        subtasks: [
          { id: "subtask1", title: "Юнит-тесты", status: "incomplete" },
          {
            id: "subtask2",
            title: "Интеграционные тесты",
            status: "incomplete",
          },
        ],
      },
    ],
  },
  {
    id: "project3",
    name: "Обучение и развитие",
    tasks: [
      {
        id: "task1",
        title: "Изучение нового фреймворка",
        status: "incomplete",
        priority: "high",
        subtasks: [
          {
            id: "subtask1",
            title: "Чтение документации",
            status: "incomplete",
          },
          {
            id: "subtask2",
            title: "Практическое задание",
            status: "incomplete",
          },
        ],
      },
      {
        id: "task2",
        title: "Прохождение курса по UI/UX",
        status: "incomplete",
        priority: "medium",
        subtasks: [
          { id: "subtask1", title: "Лекции", status: "incomplete" },
          {
            id: "subtask2",
            title: "Практические задания",
            status: "incomplete",
          },
        ],
      },
      {
        id: "task3",
        title: "Изучение паттернов проектирования",
        status: "incomplete",
        priority: "low",
        subtasks: [
          { id: "subtask1", title: "Чтение книги", status: "incomplete" },
          {
            id: "subtask2",
            title: "Реализация примеров",
            status: "incomplete",
          },
        ],
      },
    ],
  },
];

export default testProjects;
