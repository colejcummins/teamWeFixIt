from django.views.generic import ListView
from .models import Post


class HomePageView(ListView):
    # internally, ListView returns an object called object_list
    # that we want to display in our template
    # explicitly define which model we are using
    model = Post
    # template reference
    template_name = 'home.html'
    # rename objects list to something more specific
    context_object_name = 'all_posts_list'
    