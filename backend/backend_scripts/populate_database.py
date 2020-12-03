import requests
from requests.auth import HTTPBasicAuth
from django.contrib.auth import authenticate, login
import string
import random
from django.http import request


url_login = 'http://127.0.0.1:8000/admin/'


def login():
    """
    Note, this should be changed if a real password is used :)
    """
    s = requests.Session()
    login_request = s.request('POST', url_login,
                                    auth=HTTPBasicAuth('john', 'manard'))
    assert(login_request.status_code == 200)
    return login_request.cookies


def populate_database():
    for i in range(100):
        views = random.randint(0, 400000)
        form_data = {'header_text': ''.join(random.choices(string.ascii_uppercase + string.digits, k=5)),
                     'second_text': ''.join(random.choices(string.ascii_uppercase + string.digits, k=5)),
                     'button_rendered_link': ''.join(
                         random.choices(string.ascii_uppercase + string.digits, k=5)) + '.com',
                     'clicks': views // random.randint(10, 20),
                     'views': views}
        r = requests.post('http://127.0.0.1:8000/advertisements/', form_data, auth=HTTPBasicAuth('john',
                                                                                                 'manard'))
        print(r.status_code)


if __name__ == "__main__":
    populate_database()
