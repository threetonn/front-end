export const client = {
  id: 1,
  role: "client",
  name: "Тест",
  surname: "Овый",
  patronymic: "Пользователь",
  subscription: {
    id: 1,
    type: "basic",
    title: "Базовый",
    price: 60,
    list: ["Бассейн", "Спа", "Ванна", "Телевизор"],
  },
  phone: 89905553535,
  gender: { ru: "Мужской", en: "male" },
  image: null,
  email: "test-client@example.com",
  birthday: "1999-12-12",
};

export const trainer = {
  id: 1,
  role: "trainer",
  name: "Тест",
  surname: "Овый",
  patronymic: "Тренер",
  subscription: 1,
  phone: 89905553535,
  gender: { ru: "Мужской", en: "male" },
  image: null,
  email: "test-trainer@example.com",
  birthday: "1999-12-12",
  bio: "Какой-то крутой тренер!",
  workout_type: [],
};

export const manager = {
  id: 1,
  role: "manager",
  name: "Тест",
  surname: "Овый",
  patronymic: "Менеджер",
  subscription: 1,
  phone: 89905553535,
  gender: { ru: "Мужской", en: "male" },
  image: null,
  email: "test-manager@example.com",
  birthday: "1999-12-12",
};
