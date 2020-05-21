import {Student, Teacher, SchoolPersonFactory} from './personLib.js';
import {School} from './school.js';

// проинициализируем фабрику
const factory = new SchoolPersonFactory();

// создадим школу (если есть для нее фабрика, то тоже через фабрику) 
let school = new School();

// добавим в список школы студентов используйте те данные, которые у вас есть
// Vasia и пр. тут скорее для примера
// если методы называются по другому, поменяйте
// по желанию можно добавить больше
school.addHuman( factory.createStudent({ 
   name: 'Маша Иванова',
   university: 'УГАТУ',
   course: 2,
   birthDate: new Date(2000, 8, 4),
   photoUrl: 'img/ava1.jpg'
}) );
school.addHuman( factory.createStudent({ 
   name: 'Миша Петров',
   university: 'СурГУ',
   course: 3,
   birthDate: new Date(1999, 0, 1),
   photoUrl: 'img/ava0.jpg'
}) );
school.addHuman( factory.createTeacher({ 
   name: 'Илья Скворцоу',
   university: 'СПБГУ',
   workFrom: new Date(1950, 1, 1),
   birthDate: new Date(1897, 1, 1),
   photoUrl: 'img/ava2.jpg'
}) );

// отрисуем всех студентов в dom 
// если методы называются по другому, поменяйте
// точка монтирования document.body может быть изменена на любой другой элемент DOM
school.renderHuman(document.body);

// в итоге в на странице должны получить список студентов и учителей
// папка js будет содержать несколько файлов, минимум 3, а лучше больше