import requests
from django.contrib.auth import authenticate, login
import string
import random
from django.http import request


url_login = 'http://127.0.0.1:8000/admin/login/?next=/admin/'


def login():
    """
    Note, this should be changed if a real password is used :)
    """
    user = authenticate(username=request.POST.get('username'), password=request.POST.get('password'))
    if user:
        login(request, user)
        print("Logged In")
    print("Not Logged In")


def populate_database():
    token = login()
    for i in range(100):
        views = random.randint(0, 400000)
        form_data = {'header_text': ''.join(random.choices(string.ascii_uppercase + string.digits, k=5)),
                     'second_text': ''.join(random.choices(string.ascii_uppercase + string.digits, k=5)),
                     'button_rendered_link': ''.join(
                         random.choices(string.ascii_uppercase + string.digits, k=5)) + '.com',
                     'clicks': views // random.randint(10, 20),
                     'views': views,
                     'csrfmiddlewaretoken': token}
        r = requests.post('http://127.0.0.1:8000/advertisements/', form_data)
        print(r.status_code)


if __name__ == "__main__":
    populate_database()
