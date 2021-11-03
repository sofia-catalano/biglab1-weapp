import dayjs from "dayjs";

const TASKS = [
   // id, description, important, private, deadline
  {id: '1', description: 'Complete Lab 3', isUrgent: false, isPrivate: true, deadline: dayjs('2021-04-26T14:30:00') },
  {id: '2', description: 'Buy some groceries', isUrgent: false, isPrivate: false, deadline: dayjs('2021-04-27T14:00:00') },
  {id: '3', description: 'Read a good book!', isUrgent: true, isPrivate: true},
  {id: '4', description: 'Complete Lab 2', isUrgent: false, isPrivate: true, deadline: dayjs('2021-03-25T21:30:00') },
];

export {TASKS};