from django.http import HttpResponse
from django.template import loader

from .models import Company,SQLSource


def index(request):
    template = loader.get_template('reference_architect/index.html')
    return HttpResponse(template.render(request))

