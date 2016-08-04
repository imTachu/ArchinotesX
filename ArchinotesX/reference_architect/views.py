from django.http import HttpResponse
from django.shortcuts import render, render_to_response
from django.template import loader
from django.contrib.auth import authenticate, login, logout
from .models import Company,SQLSource
from django.contrib.auth.decorators import login_required
from django.template import RequestContext


def index(request):
    return render(request, 'reference_architect/index.html')


@login_required
def overview(request):
    return render(request, 'reference_architect/overview.html')

