### Zadanie testowe

## SOLUTION

Do wykonania zadania zdecydowałem się na użycie bibliotek axios do komunikacji z API, oraz zod do customowej walidacji formularza. Brałem po uwagę również skorzystanie z bibliotek takich jak React Hook Form i React Query, z których bardzo lubię korzystać. W przypadku zadania rekrutacyjnego zdecydowałem się jednak na pokazanie trochę więcej kodu a mniej znajomości bibliotek.

Krótki opis:

- do stworzenia formularza użyłem komponentów kontrolowanych przy użyciu useState,
- korzystając z zoda zrobiłem walidację z customowymi wiadomościami,
- enkapsulacja logiki związanej z formularzem do customowych hooków,
- reużywalne inputy,
- podstawowy error handling przy komunikacji z API

## TODO

- Sforkuj (sklonuj) projek lub pobierz i wrzuć na swojego Githuba lub Gitlaba

- Link do gotowego zadania prześlij do nas na adres: rekru@diagnostyka.digital

- Pobierz dane potrzebne do wypełnienia Select **Wydział** z zewnętrznego źródła
  `https://ddh-front-default-rtdb.europe-west1.firebasedatabase.app/departments.json`,
  do API prześlij `id` i do wyświetlania użyj atrybutu `name`

- Napisz walidację dla wszystkich pól (wszystkie pola są wymagane)

- Do wysyłki danch wykorzystaj endpoint: `https://ddh-front-default-rtdb.europe-west1.firebasedatabase.app/users.json`

- Wyświetl komunikat "Dane zostały poprawnie zapisane" po poprawnym zapisie danych

- Na zadanie przeznacz maksymalnie 2 godziny

## Resources

- Wykorzystaj [Bootstrap](https://getbootstrap.com/docs/) do stylowania elementów
